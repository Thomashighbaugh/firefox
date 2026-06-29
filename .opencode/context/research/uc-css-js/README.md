# uc.css.js (duskFox) — Firefox Theme & Scripts Research

**Source:** https://github.com/aminomancer/uc.css.js  
**Fetched:** 2026-06-27  
**Stars:** 379 | **Forks:** 26 | **Commits:** 1,246

---

## Overview

uc.css.js (duskFox) is a **dark indigo CSS theme for Firefox** and a large collection of privileged scripts to add new buttons, menus, behaviors, and opinionated features. It's intended for use with fx-autoconfig since it uses JavaScript to implement functional features beyond what CSS alone can achieve.

**Author:** aminomancer  
**License:** CC BY-NC-SA 4.0 (Creative Commons NonCommercial)  
**Target:** Firefox Nightly (updated weekly to keep up with mozilla-central)

---

## Architecture

### Repo Layout

```
Root level CSS files (uc-*.css) — modular stylesheets for each UI area
├── uc-globals.css          — Global CSS variables and base styles
├── uc-variables.css        — Theme color variables
├── uc-app-menu.css         — App menu (hamburger) styling
├── uc-bookmarks.css        — Bookmarks toolbar/menu styling
├── uc-context-menus.css    — Context menu styling
├── uc-context-menu-icons.css — Icons for context menu items
├── uc-ctrl-tab.css         — Ctrl+Tab panel styling
├── uc-extensions.css       — Extension UI styling
├── uc-findbar.css          — Findbar styling
├── uc-fullscreen.css       — Fullscreen mode styling
├── uc-misc.css             — Miscellaneous UI styling
├── uc-navbar.css           — Navbar styling
├── uc-panels.css           — Panel styling
├── uc-popups.css           — Popup styling
├── uc-search-mode-icons.css — Search engine icons
├── uc-search-one-offs.css  — One-off search buttons
├── uc-sidebar.css          — Sidebar styling
├── uc-tabs-bar.css         — Tab bar styling
├── uc-tabs.css             — Individual tab styling
├── uc-unified-extensions.css — Unified extensions button
├── uc-urlbar.css           — Urlbar styling
├── uc-urlbar-results.css   — Urlbar results styling
├── userChrome.css          — Main entry point
├── userChrome.ag.css       — Agent stylesheet (loaded by script)
├── userChrome.au.css       — Author stylesheet (loaded by script)
├── userContent.css         — Content area styling
├── custom-chrome.css       — User overrides (never overwritten)
│
JS/                        — Privileged scripts (.uc.js and .sys.mjs)
├── aboutUserChrome.sys.mjs — Script manager at about:userchrome
├── aboutCfg.sys.mjs       — Old-school about:config at about:cfg
├── appMenuAboutConfigButton.uc.js
├── appMenuMods.uc.js      — Restart button, separators
├── allTabsMenuExpansionPack.uc.js
├── verticalTabsPane.uc.js  — Vertical tabs (deprecated, Firefox has built-in now)
├── atoolboxButton.uc.js   — Devtools toolbox button
├── bookmarksPopupShadowRoot.uc.js
├── bookmarksMenuAndButtonShortcuts.uc.js
├── browserChromeBookmarkKeywords.uc.js
├── clearDownloadsButton.uc.js
├── contextMenuMods.uc.js
├── copyCurrentUrlHotkey.uc.js
├── debugExtensionInToolbarContextMenu.uc.js
├── extensionOptionsPanel.uc.js
├── extensionStylesheetLoader.sys.mjs  — ✨ Required for addon theming
├── eyedropperButton.uc.js
├── invertPDFButton.sys.mjs
├── findbarMods.uc.js       — ✨ Compact floating findbar
├── fixTitlebarTooltips.uc.js  — ✨ Fix titlebar button tooltips
├── floatingSidebarResizer.uc.js  — ✨ Floating sidebar support
├── fluentRevealTabs.uc.js  — Windows 10 spotlight effect on tabs
├── fluentRevealNavbar.uc.js  — Spotlight effect on navbar buttons
├── fullscreenHotkey.uc.js
├── autoHideNavbarSupport.uc.js  — ✨ Smooth navbar hide in fullscreen
├── hideTrackingProtectionIconOnCustomNewTabPage.uc.js  — ✨
├── enterInUrlbarToRefresh.uc.js
├── letCtrlWClosePinnedTabs.uc.js
├── navbarToolbarButtonSlider.uc.js  — ✨ Scrollable toolbar buttons
├── oneClickOneOffSearchButtons.uc.js  — ✨ Restore old search behavior
├── openBookmarksHistoryEtcInNewTabs.uc.js
├── openBookmarkInContainerTab.uc.js
├── openLinkInUnloadedTab.uc.js
├── privateTabs.uc.js
├── privateWindowHomepage.uc.js
├── removeSearchEngineAliasFormatting.uc.js  — ✨
├── restoreTabSoundButton.uc.js  — ✨ Pre-Proton tab sound button
├── scrollingSearchOneOffs.uc.js  — ✨
├── searchModeIndicatorIcons.uc.js  — ✨ Search engine icons in urlbar
├── searchModeOneOffs.uc.js
├── sessionRestoreMods.uc.js
├── tabContextMenuMods.uc.js
├── tabScrollShortcut.uc.js
├── unreadTabMods.uc.js
├── updateNotificationSlayer.uc.js
├── urlbarMods.uc.js
├── userChromeStylesheetLoader.sys.mjs  — ✨ Agent/author sheet loader
├── userChromeStylesheetLoader.browser-toolbox.sys.mjs  — Devtools styling
├── windowMods.uc.js
│
resources/                 — Icons, content stylesheets, script overrides
├── icons/                 — Custom SVG icons
├── in-content/            — Content area stylesheets
├── layout/                — Layout CSS (uc-low-globals.css)
├── script-override/       — Script overrides (tabMods.uc.js)
├── aboutuserchrome/       — about:userchrome page resources
│
prefs/                     — user.js preset files
├── required.js            — Minimum prefs for functionality
├── recommended.js         — Recommended prefs including aesthetic choices
│
utils/
├── chrome.manifest        — Override chrome:// URIs (icons, scripts, stylesheets)
│
extensions/                — Bundled addons
├── search-extensions/     — Custom search engine addons
│
experimental/              — Experimental/in-development scripts
```

### Key Technical Concepts

1. **Three customization layers:**
   - **Stylesheets** (`.css`) — Visual customization of existing elements
   - **Scripts** (`.uc.js`, `.sys.mjs`) — Functional customization, new elements, dynamic behavior
   - **Manifest** (`.manifest`) — Override `chrome://` URIs to replace icons, scripts, stylesheets at the source

2. **Agent & Author sheets** — `userChrome.ag.css` and `userChrome.au.css` are special stylesheets loaded by a script (not Firefox natively). They allow:
   - CSS syntax forbidden to user sheets (e.g., `::part()` pseudo-element)
   - Styling native-anonymous content (tooltips, scrollbars)
   - Overriding vanilla style rules without `!important`

3. **Chrome manifest overrides** — The `chrome.manifest` file redirects `chrome://` URIs from Firefox's built-in files to custom versions. This allows:
   - Replacing icons that can't be changed via CSS (e.g., `<image src="chrome://global/skin/icons/icon.svg">`)
   - Modifying internal scripts and stylesheets (e.g., `arrowscrollbox.css` for scrollbutton styling)
   - Restoring pre-Proton tab sound icons

---

## Design Philosophy

- **Dark indigo/slate** color scheme (not boring dark gray)
- **Compactness** similar to Firefox's Photon UI
- **Pre-Proton icon restoration** — mix of old Firefox icons, Google Material icons, and custom icons
- **Animations restored** — Proton removed most UI animations; this theme brings them back
- **Floating findbar** — ~400x40px panel floating over content (VS Code-inspired)
- **Not for low-end hardware** — animations and effects assume capable hardware
- **Nightly-only** — updated weekly to track mozilla-central

---

## Key Scripts for Shadowfox

| Script | Purpose | Relevance |
|--------|---------|-----------|
| `autoHideNavbarSupport.uc.js` | Smooth navbar hide in fullscreen | Directly applicable to four-edge auto-hide concept |
| `floatingSidebarResizer.uc.js` | Floating sidebar that doesn't flex content | Sidebar auto-hide pattern |
| `navbarToolbarButtonSlider.uc.js` | Scrollable toolbar buttons | Toolbar space management |
| `findbarMods.uc.js` | Compact floating findbar | UI density pattern |
| `verticalTabsPane.uc.js` | Vertical tabs (deprecated) | Tree tabs reference |
| `userChromeStylesheetLoader.sys.mjs` | Loads agent/author sheets | CSS architecture pattern |
| `extensionStylesheetLoader.sys.mjs` | Styles addon documents by extension ID | Cross-extension theming |
| `restoreTabSoundButton.uc.js` | Pre-Proton tab sound button | Chrome manifest override pattern |

---

## Theming Approach

### Color System
- Colors defined in `uc-globals.css`, `uc-variables.css`, and `resources/layout/uc-low-globals.css`
- Dark indigo primary, slate grays, purple accents
- User overrides in `custom-chrome.css` (never overwritten on update)
- Content overrides in `resources/in-content/custom-content.css`

### Chrome Manifest Overrides
The `chrome.manifest` file is a central part of the theme. It overrides:
- Icons (`chrome://global/skin/icons/`, `chrome://browser/skin/`)
- Internal scripts (`tabbrowser-tab.js` for sound button restoration)
- Internal stylesheets (`arrowscrollbox.css` for scrollbutton styling)

This is a **more powerful approach** than CSS-only theming because it replaces resources at the source rather than trying to override them after the fact.

### Extension Theming
The `extensionStylesheetLoader.sys.mjs` script allows styling addon documents by extension ID (static) rather than by random `moz-extension://` URL. This enables clean selectors like `:root[uc-extension-id="..."] body {...}` instead of fragile `@-moz-document url("moz-extension://random-uuid/popup.html")`.

---

## Relevance to Shadowfox

| Aspect | uc.css.js (duskFox) | Shadowfox |
|--------|---------------------|-----------|
| **Approach** | CSS + JS + chrome manifest overrides | CSS + userChrome.js |
| **Scope** | Full theme (colors, icons, scripts) | UI customization |
| **Target** | Firefox Nightly only | Any Firefox version |
| **Loader** | fx-autoconfig (required) | fx-autoconfig (required) |
| **Scripts** | 40+ privileged scripts | 15 standalone scripts |
| **Manifest** | Heavy use of chrome.manifest overrides | Not used |
| **CSS files** | 25+ modular stylesheets | 15 modular CSS files |
| **Update cadence** | Weekly (Nightly tracking) | Manual |

**Key lessons for Shadowfox:**

1. **Chrome manifest overrides** — The most powerful technique in this repo. Replacing `chrome://` URIs at the source level allows changes impossible with CSS alone. Shadowfox could adopt this for its icon system.

2. **Agent/Author sheets** — `userChrome.ag.css` and `userChrome.au.css` provide CSS capabilities that normal `userChrome.css` lacks. The `::part()` pseudo-element access and native-anonymous content styling are directly applicable to Shadowfox's second sidebar system.

3. **Modular CSS organization** — 25+ `uc-*.css` files, each focused on one UI area. Shadowfox already follows a similar pattern.

4. **Extension theming by ID** — The extensionStylesheetLoader pattern for styling addon documents by static extension ID is a clean approach Shadowfox could adopt.

5. **Floating findbar** — The compact, floating findbar pattern (400x40px, VS Code-inspired) is a good reference for Shadowfox's UI density goals.

6. **Auto-hide navbar** — The `autoHideNavbarSupport.uc.js` script's approach to smooth navbar hide in fullscreen is directly applicable to Shadowfox's four-edge auto-hide concept.

7. **Custom prefs** — Extensive use of `userChrome.*` prefs in `about:config` for user customization. Shadowfox could adopt a similar `sfx.*` pref namespace.

8. **Nightly-only vs ESR** — duskFox targets Nightly and updates weekly. Shadowfox could target ESR for stability (like Konform) or Nightly for latest features.

---

## Build & Tooling

- **ESLint** + **Prettier** + Mozilla's ESLint plugin for linting/formatting
- **Parcel** (`.parcelrc` present) for bundling
- **stylelint** for CSS linting
- **No formal build step** for the theme itself — files are used directly from the `chrome` folder
- **Release packages** available but source is always more up-to-date
