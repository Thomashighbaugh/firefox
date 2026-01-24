# AGENTS.md - Higgs Boson Firefox Theme

**Generated:** 2026-01-24 11:19:00  
**Commit:** 76b6ee6  
**Branch:** master

## OVERVIEW
Comprehensive Firefox customization: vertical tabs, custom toolbars, advanced second sidebar system (Vivaldi/Floorp-style web panels). 311 files, 22k lines, heavily modular.

## STRUCTURE
```
firefox-theme/
├── userChrome.css          # Entry: browser UI styling
├── userContent.css         # Entry: web content styling
├── JS/                     # UserChrome.js scripts + second_sidebar module
│   ├── *.uc.js            # 15 standalone enhancement scripts
│   ├── second_sidebar.uc.mjs  # Main entry for sidebar system
│   └── second_sidebar/    # 100+ file sidebar framework (SEE JS/second_sidebar/AGENTS.md)
├── css/                    # Modular CSS (SEE css/AGENTS.md)
│   ├── chrome/            # Browser UI (15 files: tabs, toolbar, bookmarks, etc.)
│   ├── content/           # Web content pages (about:*, new tab, etc.)
│   └── common/            # Variables, colors, shared assets
├── resources/             # Static assets (icons, textures, notifications)
└── utils/                 # Build/development utilities
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| **Modify browser UI appearance** | `css/chrome/*.css` | Tabs, toolbar, bookmarks, context menus |
| **Modify web content styling** | `css/content/*.css` | about:* pages, new tab, private browsing |
| **Change colors/variables** | `css/common/colors.css`, `css/common/variables.css` | CSS custom properties |
| **Add browser functionality** | `JS/*.uc.js` | Standalone scripts (statusbar, restart button, etc.) |
| **Modify second sidebar** | `JS/second_sidebar/` | Web panels system (see subsystem AGENTS.md) |
| **Create XUL UI elements** | `JS/second_sidebar/xul/` | Component framework for browser UI |
| **Adjust icons/assets** | `css/common/assets/icons/`, `resources/` | Theme assets |

## CONVENTIONS

### File Extensions
- `.uc.js` - Standalone UserChrome.js scripts (15 files in JS/)
- `.uc.mjs` - ES6 module entry point (`second_sidebar.uc.mjs`)
- `.mjs` - ES6 modules (internal, imported by .uc.mjs)
- `.css` - Standard CSS (imports via `@import url(...)`)

### JavaScript Modules
- ES6 modules with relative imports: `import { X } from "./path/file.mjs"`
- Class-based: PascalCase classes, private methods `#methodName`
- UserScript headers for .uc.js/.uc.mjs entries (see JS/AGENTS.md)
- Static factory pattern: `static create()` for complex initialization
- Wrapper classes for Firefox internals (Ci, Cu, Services)

### CSS Organization
- Import order: `common → chrome/content → specific`
- Firefox-specific: `@-moz-document url-prefix(chrome://)` wrapper for userChrome
- XUL namespace: `@namespace xul url("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul");`
- `!important` common (Firefox cascade override)
- Custom properties: `var(--property-name)` for theming

### Naming Patterns
- XUL components: `SidebarMain`, `WebPanelButton` (PascalCase)
- Wrappers: `*Wrapper` suffix (e.g., `CustomizableUIWrapper`)
- Controllers: `*Controller` suffix
- Patchers: `*Patcher` suffix (modify Firefox behavior)

## BUILD/TEST/LINT

**No formal build system.** Firefox loads directly from profile's `chrome/` directory.

**Testing:** Manually restart Firefox (Ctrl+Shift+R or restart button added by `JS/restart_button.uc.js`)

**Linting:** Disabled (`/* eslint-disable */` in files)

**Dependencies:** Requires [fx-autoconfig](https://github.com/MrOtherGuy/fx-autoconfig) for .uc.js/.uc.mjs script loading

## ANTI-PATTERNS

None explicitly documented. Code follows standard Firefox userChrome.js conventions.

## NOTES

- **NixOS Integration:** "imperative" branch for non-declarative installations
- **Monorepo Structure:** `second_sidebar/` is effectively a standalone project (100+ files, own architecture)
- **Firefox Versions:** Tested on 100+ (stable, ESR, beta, nightly)
- **Deep Nesting:** Max depth 6 (JS/second_sidebar/xul/base/*), intentional module isolation
- **Large Files:** 12 files >500 lines (mainly comprehensive components)
- **No Automated Tests:** Manual verification only

## SUBSYSTEM DOCS

- `JS/AGENTS.md` - Root-level UserChrome.js scripts
- `JS/second_sidebar/AGENTS.md` - Second sidebar architecture
- `JS/second_sidebar/xul/AGENTS.md` - XUL component framework
- `JS/second_sidebar/xul/base/AGENTS.md` - Base XUL element wrappers
- `css/AGENTS.md` - CSS module organization
