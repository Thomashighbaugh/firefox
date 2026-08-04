---
title: "Higgs Boson — Architecture Analysis"
type: entity
tags: [firefox-theme, architecture, analysis, entry-points, data-flow]
created: 2026-07-19
updated: 2026-07-28
status: active
---

# Architecture Analysis: Higgs Boson Firefox Theme

> **Refresh 2026-07-28**: `@import` counts corrected (18, not 15); 3 new `.uc.js` scripts documented; 2 `.sys.mjs` background loaders added; second-sidebar relocated from `JS/second_sidebar/` to `resources/second-sidebar/` with chrome:// URI scheme; 14 new XUL components; CSS variables expanded.

## Entry Points (Three-Layer Loading)

### 1. `userChrome.css` — Browser Chrome Styling
Loaded automatically by Firefox. **`userChrome.css` is a symlink** to `CSS/userChrome.uc.css` (tracked by git). 18 `@import` statements:
`common/variables → common/colors → chrome/*.css` (layout, colors, urlbar, tabs, window-controls, context-menu, bookmarks, buttons, url-auto-hide, linux-support, customization, vertical-tabs, theme, statuspanel, containers, icons)

### 2. `userContent.css` — Internal Page Styling
Same `@import` pattern (also a symlink to `CSS/userContent.uc.css`): `common/colors → common/variables → content/*.css` (private-browsing, new-tab, firefox-view, about-addons, about-config, settings-pages, image-viewer)

### 3. `second_sidebar.uc.mjs` — Second Sidebar JS
Loaded by fx-autoconfig's module loader. Imports now use **`chrome://secondsidebar/content/...`** scheme (registered in `utils/chrome.manifest` as `content secondsidebar ../resources/second-sidebar/`). 4-phase bootstrap:
1. **SidebarInjector.inject()** — load settings, create DOM, build controllers
2. **SidebarDecorator.decorate()** — inject CSS, apply initial collapsed state
3. **CustomizeModePatcher.patch()** — string-patch Firefox's CustomizeMode.sys.mjs
4. **window.addEventListener("unload", cleanup)** — destroy controllers

## Module Structure

### CSS Layer — 27 files
- `common/variables.css` — 17+ core CSS custom properties (includes `@media not -moz-pref("sidebar.verticalTabs")` block with `--tab-block-margin`, `--tab-min-height`, `--tabstrip-min-height`)
- `common/colors.css` — 531 lines, dark+light media blocks, 100+ color vars
- `chrome/*.css` — 16 component files
- `content/*.css` — 7 page-specific files

### JavaScript Layer — 18 .uc.js + 2 .sys.mjs + 1 .uc.mjs
- **Standalone `.uc.js`** (18): IIFE pattern, `CustomizableUI.createWidget()`, `window.addEventListener("unload")`. Includes 3 new since last analysis: `quick_tabs.uc.js` (floating browser containers), `tabGroupColorPicker.uc.js`, `tabGroupFolderToggle.uc.js`.
- **`.sys.mjs` background modules** (2): `userChromeAgentAuthorSheetLoader.sys.mjs` loads `.ag.css`/`.au.css` as agent/author sheets; `userChromeDevtoolsSheetLoader.sys.mjs` loads stylesheets into browser toolbox windows. Loaded by fx-autoconfig's background module system.
- **`second_sidebar.uc.mjs`** (1): ES module entry, imports 4 classes via `chrome://secondsidebar/content/...` URIs.
- **`tabContextMenuNavigation.uc.js` was removed** in commit `139c69f`. `JS/AGENTS.md` still references it — stale.

### Second Sidebar Subsystem — relocated to `resources/second-sidebar/`, 161 files

| Subdirectory | Count | Purpose |
|---|---|---|
| `xul/base/` | 31 | Fluent XUL element wrappers |
| `xul/` | 37 (+14 since last analysis) | Composed XUL components |
| `controllers/` | 21 | Feature logic |
| `wrappers/` | 28 | Firefox API facades |
| `css/` | 12 | CSS-as-JS modules |
| `patchers/` | 4 | Runtime Firefox patching |
| `settings/` | 8 | Preference-backed persistence |
| `utils/` | 10 | Cross-cutting utilities |

**14 new XUL components** since last analysis: `after_splitter`, `geometry_hint`, `notification_badge`, `open_link_as_temp_web_panel`, `open_link_as_web_panel`, `popup_body`, `sidebar_box`, `sidebar_box_filler`, `sidebar_collapse_button`, `sidebar_main_menupopup`, `sidebar_main_popup_settings`, `sidebar_splitter_pinned`, `sidebar_wrapper`, `web_panel_menupopup`.

## CSS Variable Flow

```
Firefox system color prefs
    ↓ (!important)
CSS/common/colors.css  (--firefoxcss-main-bg-color, etc.)
    ↓
CSS/common/variables.css  (--firefoxcss-border-radius, etc.)
    ↓
CSS/chrome/*.css + CSS/content/*.css  (use var(--firefoxcss-*))
    ↓
CSS/chrome/colors.css  (maps --firefoxcss-* → Firefox native --lwt-* with !important)
```

Light/dark mode via `@media (prefers-color-scheme: dark/light)` blocks.

## Sidebar Initialization Flow

```
second_sidebar.uc.mjs
  ├── ContextualIdentityServiceWrapper.ensureDataReady()
  ├── SidebarInjector.inject()
  │   ├── SidebarSettings.load()
  │   ├── WebPanelsSettings.load()
  │   ├── SidebarElements.create()  → XUL DOM tree
  │   └── SidebarControllers.create()  → 17 controllers
  ├── SidebarDecorator.decorate()  → inject CSS style element
  └── CustomizeModePatcher.patch()  → hot-reload Firefox module
```

## Key Patterns

- **Fluent XUL Wrapper API**: All setters return `this` for chaining
- **Static Factory / Registry**: `SidebarElements.create()`, `SidebarControllers.create()` instantiate everything
- **CSS-as-JS Modules**: Sidebar CSS stored as template string exports in `.mjs` files
- **Runtime Module Patching**: `fetch()` → `String.replaceAll()` → temp file → dynamic `import()` → cleanup
- **Firefox API Wrappers**: 28 wrapper classes with try/catch guards and null-safety
- **UserScript Headers**: `// ==UserScript== @include main // ==/UserScript==`

## Architecture Risks

### High Priority
1. **`!important` cascade** — ~80 declarations in colors.css, fragile to Firefox changes
2. **Runtime module patching** — string-replacement of Firefox source, breaks on version updates
3. **Sidebar monolithic instantiation** — failure in any constructor blocks entire sidebar

### Medium Priority
4. **No test coverage** — 0 tests across 311 files, 22k lines
5. **Circular reference risk** — constructor order in factory pattern is undocumented
6. **CSS duplication** — sidebar CSS duplicates --firefoxcss-* variables

### Low Priority
7. **No build/reload workflow** — full Firefox restart required for JS changes
8. **XUL base framework duplication** — 31 files reimplementing DOM operations
