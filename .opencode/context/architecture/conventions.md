---
title: "Higgs Boson — Coding Conventions"
type: entity
tags: [firefox-theme, conventions, coding-style, naming]
created: 2026-07-19
updated: 2026-07-19
status: active
---

# Coding Conventions: Higgs Boson Firefox Theme

## File Naming

| Category | Convention | Examples |
|----------|-----------|----------|
| CSS modules | kebab-case | `tabs.css`, `context-menu.css` |
| Root .uc.js | mixed: camelCase + snake_case + 1 PascalCase outlier | `extendedStatusbar.uc.js` (camelCase), `quick_tabs.uc.js` (snake_case), `AboutConfigMultipleSelection.uc.js` (PascalCase outlier) |
| .mjs modules | snake_case | `sidebar_decorator.mjs`, `browser_elements.mjs` |
| .sys.mjs modules | **mixed**: camelCase (upstream `userChromeAgentAuthorSheetLoader.sys.mjs`) + lowercase (`boot.sys.mjs`, `fs.sys.mjs`, `utils.sys.mjs`) + snake_case (`uc_api.sys.mjs`) | See `utils/` for local lowercase convention |
| XUL base files | short element names | `button.mjs`, `toolbar.mjs`, `widget.mjs` |

## Code Style

- **Indentation**: 2 spaces
- **Quotes**: single (JS), mixed (CSS)
- **Semicolons**: required
- **Trailing commas**: all (multiline objects/arrays)
- **Brace style**: same-line
- **Variable declaration**: generational split — older `.uc.js` scripts use `var`, newer/refactored scripts (`AboutConfigMultipleSelection.uc.js`) use `let`/`const` + `"use strict"`.

## Naming Conventions

| Pattern | Convention | Examples |
|---------|-----------|----------|
| Variables | camelCase (newer), snake_case or PascalCase (older) | `sidebarSettings`, `compact_buttons`, `appversion` (var) |
| Functions | camelCase | `inject()`, `decorate()`, `loadSettingsAndState()` |
| Classes | PascalCase | `SidebarMain`, `WebPanelButton` |
| Enums | PascalCase (name), UPPER_SNAKE_CASE (members), snake_case string values | `WebPanelEvents.EDIT_WEB_PANEL_URL` → `"edit_web_panel_url"` |
| Constants | UPPER_SNAKE_CASE | `PREF`, `MODULE_URLS`, `FALLBACK_ICON` |
| Private fields | TC39 `#methodName` | `#createSidebar`, `#setupListeners` |
| Wrappers | `*Wrapper` suffix | `CustomizableUIWrapper`, `PreferencesWrapper` |
| Controllers | `*Controller` suffix (most) — emerging exceptions: `*Collapser`, `*Mover`, `*Resizer` | `SidebarController`, `SidebarMainCollapser`, `SidebarMover`, `SidebarResizer` |
| Patchers | `*Patcher` suffix | `CustomizeModePatcher`, `UrlbarInputPatcher` |

## JS Patterns

- **Module system**: ES6 `.mjs` (named exports only, no default exports)
- **Standalone scripts**: IIFE pattern `(function() { 'use strict'; ... })()`
- **Class pattern**: `constructor` + `#private` methods + fluent API (return `this`) — all setters chainable
- **Lazy getters**: `static get #CUI() { try { ... return X } catch { return null } }`
- **Cleanup**: `window.addEventListener('unload', cleanup, { once: true })`
- **Static factory**: `static create()` for complex initialization
- **No barrel files** in component modules — exception: `sidebar_controllers.mjs` acts as a registry, and `sidebar_decorator.mjs` concatenates CSS-in-JS modules

## CSS Patterns

- **Import order**: `common → chrome/content → specific`
- **Import style**: `@import url(...)` in entry files
- **Variable prefix**: `--firefoxcss-*`
- **!important**: pervasive (required for Firefox cascade override)
- **Namespacing**: `@namespace url(...)` (no `xul` alias); both XUL and HTML namespaces used across `CSS/chrome/`, `CSS/content/`, and `resources/userChrome.ag.css`/`.au.css`
- **Page scoping**: `@-moz-document url-prefix()`
- **Header comments**: ASCII art `/*===== SECTION =====*/`
- **Light/dark pairs**: `light-dark(#color1, #color2)` function (currently in `tabs.css`, likely to spread)
- **Preference-gated rules**: `@media -moz-pref("sidebar.verticalTabs") { ... }` for feature flags (15 matches across 5 CSS files)
- **Native CSS nesting**: `&` parent selector (used in `resources/second-sidebar/css/sidebar_main.mjs`)
- **CSS-in-JS template literals**: sidebar CSS stored as exported `const SIDEBAR_X_CSS = \`...\`` strings in `resources/second-sidebar/css/*.mjs`, then concatenated in `sidebar_decorator.mjs` and injected as a `<style>` tag

## Error Handling

- **Style**: `try/catch` with `console.error`
- **Promises**: `.catch(console.error)` (used in patchers)
- **Non-fatal messages**: `console.warn()` (22 matches — much more prevalent than `console.error`)
- **Custom errors**: none
- **Null safety**: optional chaining `?.` and nullish coalescing `??` used extensively throughout second-sidebar code

## Documentation

- **JSDoc**: Minimal — `@param {type}` with types only, no descriptions
- **Script headers**: `// ==UserScript== @name ... // ==/UserScript==`
- **CSS sections**: ASCII art separators
- **No TODO/FIXME convention**: sporadic `/* FIX IT */` in CSS

## Git Conventions

- **Branch naming**: single-word or adjective (`master`, `imperative`)
- **Commit style**: Conventional Commits (`fix:`, `update(css):`)
- **No pre-commit hooks**
