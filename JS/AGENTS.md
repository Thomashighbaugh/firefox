# AGENTS.md - Root-Level UserChrome.js Scripts

**Context:** 15 standalone .uc.js scripts, each adding specific Firefox enhancements.

## OVERVIEW
Standalone UserChrome.js scripts loaded by fx-autoconfig. Each script is self-contained and adds one feature (statusbar, restart button, PDF tools, etc.).

## SCRIPTS BY CATEGORY

| Category | Script | Purpose |
|----------|--------|---------|
| **UI Components** | `extendedStatusbar.uc.js` | Customizable statusbar with link preview |
| | `restart_button.uc.js` | Restart button in toolbar (left-click: normal, middle-click: clear cache) |
| | `restart_item_in_menu.uc.js` | Restart item in menu |
| **Tab Management** | `tabContextMenuNavigation.uc.js` | Tab context menu enhancements |
| | `openLinkInUnloadedTab.uc.js` | Open links without loading |
| | `allTabsMenuExpansionPack.uc.js` | Enhanced all-tabs menu |
| **Content Tools** | `pdfTools.uc.js` | PDF.js viewer enhancements |
| | `privateWindowHomepage.uc.js` | Custom homepage for private windows |
| | `newTabUrlInAboutConfig.uc.js` | New tab URL configuration |
| **System** | `minimizeMemory.uc.js` | Memory optimization |
| | `rebuild_userChrome.uc.js` | Rebuild userChrome.css |
| | `space_and_separator_restorer.uc.js` | Restore spacing in UI |
| **Styling** | `autocompletePopupStyler.uc.js` | Style autocomplete popup |
| | `tooltipShadowSupport.uc.js` | Tooltip shadow effects |
| | `sidebarWidth.uc.js` | Sidebar width management |

## CONVENTIONS

### UserScript Headers
Two header formats used:
- `// ==UserScript==` (newer, recommended): Multi-line with @name, @description, @author, @version, @homepageURL
- `// ==UserChromeJS==`: Older format with similar fields
- Inline comments: Some scripts use simple comment headers

### Script Structure
- IIFE pattern: Most scripts wrap in `(function() { ... })()` for isolation
- CustomizableUI widgets: Toolbar buttons via `CustomizableUI.createWidget()`
- Event listeners: Attached to browser windows or specific elements
- Firefox APIs: Direct access to Components, Services, ChromeUtils

### Loading
- Loaded by fx-autoconfig at browser startup
- No explicit initialization call needed
- Scripts run in browser chrome context (full privileges)

## NOTES
- **Standalone:** Each script independent, can be removed individually
- **No dependencies:** Scripts don't import from each other (except `second_sidebar.uc.mjs`)
- **Manual restart:** Most changes require Firefox restart via restart button
- **Testing:** Disable script by renaming extension or moving file
