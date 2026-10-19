# AGENTS.md - Root-Level UserChrome.js Scripts

**Context:** 16 standalone .uc.js scripts + 2 .sys.mjs background modules + 1 .uc.mjs module entry. Each .uc.js adds a specific Firefox enhancement. `AboutConfigMultipleSelection.uc.js` reaches about:config via `<browser>.contentDocument` because about:config is parent-process but lives in a tab `<browser>`, so the loader never sees it as a top-level window.

## OVERVIEW
Standalone UserChrome.js scripts loaded by fx-autoconfig. Each script is self-contained and adds one feature (statusbar, restart button, PDF tools, etc.).

## SCRIPTS BY CATEGORY

| Category | Script | Purpose |
|----------|--------|---------|
| **UI Components** | `extendedStatusbar.uc.js` | Customizable statusbar with link preview |
| | `restart_button.uc.js` | Restart button in toolbar (left-click: normal, middle-click: clear cache) |
| | `restart_item_in_menu.uc.js` | Restart item in menu |
| **Tab Management** | `openLinkInUnloadedTab.uc.js` | Open links without loading |
| | `allTabsMenuExpansionPack.uc.js` | Reverse all-tabs order + mark pending/pinned/container rows (eval-free FF157 rewrite) |
| | `tabGroupColorPicker.uc.js` | Disabled placeholder for tab-group accent color override |
| | `tabGroupFolderToggle.uc.js` | Group/folder toggle for native tab groups |
| **Quick Tabs** | `quick_tabs.uc.js` | Floating browser containers (Darsh-A port) with taskbar, drag-drop, context menus |
| | `quick_tabs_search.uc.js` | Selected text → Quick Tab at the default engine's results (right-click item + `Ctrl+Alt+S`; prefs `userchrome.quicktabs.search.*`) |
| **Content Tools** | `pdfTools.uc.js` | pdf.js viewer: download each page as an image (`@include resource://pdf.js/web/viewer.html*`) |
| | `privateWindowHomepage.uc.js` | Private windows respect the configured homepage instead of about:privatebrowsing |
| **System** | `minimizeMemory.uc.js` | Memory optimization |
| | `space_and_separator_restorer.uc.js` | Restore spacing in UI |
| **Styling** | `autocompletePopupStyler.uc.js` | Style autocomplete popup |
| | `uiAnimations.uc.js` | render.js-inspired motion: tab-group swatch fan, root motion tokens (`userchrome.animations.*`) |
| | `tooltipShadowSupport.uc.js` | Tooltip shadow effects |
| | `sidebarWidth.uc.js` | Sidebar width management |
| **Developer Tools** | `AboutConfigMultipleSelection.uc.js` | Checkbox-per-row multi-select + copy as `user_pref()` on about:config (reaches the parent-process tab document via `contentDocument`) |

## Background Modules (.sys.mjs)

| File | Purpose |
|------|---------|
| `userChromeAgentAuthorSheetLoader.sys.mjs` | Loads `*.ag.css` / `*.au.css` as agent/author sheets |
| `userChromeDevtoolsSheetLoader.sys.mjs` | Loads stylesheets into browser toolbox windows |

## CONVENTIONS

### UserScript Headers
fx-autoconfig only parses the `// ==UserScript==` … `// ==/UserScript==` block
(`extractScriptHeader()` in `utils/utils.sys.mjs`). Any other block
(`==UserChromeJS==`) or no block at all means the header is empty, so the script
gets no `@include` and falls back to the default target (`main`, i.e.
`browser.xhtml`). Every script must therefore use `// ==UserScript==` and declare
its `@include` explicitly.

### Script Structure
- IIFE pattern: Most scripts wrap in `(function() { ... })()` for isolation
- Namespace pattern: Scripts expose a single namespace on `window` (e.g. `window.sidebarWidth`, `window.AboutConfigMultiSelect`)
- Unload cleanup: All scripts include `window.addEventListener("unload", ...)` to remove listeners, timers, and DOM nodes
- CustomizableUI widgets: Toolbar buttons via `CustomizableUI.createWidget()`
- Event listeners: Attached to browser windows or specific elements; stored references for later removal
- Firefox APIs: Direct access to Components, Services, ChromeUtils

### Loading
- Loaded by fx-autoconfig at browser startup
- No explicit initialization call needed
- Scripts run in browser chrome context (full privileges)

## NOTES
- **Standalone:** Each script independent, can be removed individually
- **No dependencies:** Scripts don't import from each other (except `second_sidebar.uc.mjs`, which loads its modules via `chrome://secondsidebar/content/`)
- **Manual restart:** Most changes require Firefox restart via restart button
- **Testing:** Disable script by renaming extension or moving file
