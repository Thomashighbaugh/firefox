---
title: "Sine Marketplace — Mods Shipping .uc.js"
type: source-summary
tags: [userchrome, uc-js, sine, theme-store, mods, catalogue, natsumi, zen-browser]
created: 2026-10-12
updated: 2026-10-12
source: https://sineorg.github.io/store/marketplace.json
status: active
---

# Sine Marketplace — Mods Shipping `.uc.js`

**41 of the 70** mods in the Sine marketplace are JS-backed. Links below are
**commit-pinned raw URLs** — every one verified `HTTP 200` against the exact file
contents, so they resolve immutably rather than drifting with branch heads.

Registry: <https://sineorg.github.io/store/marketplace.json>

---

## Workspace & Tab Organization

### Advanced Tab Groups
Rebuilds Zen's native tab-folder and tab-group system into real groupable containers:
nested groups, per-group collapse, and a separate pass that restyles folder
appearance so groups read visually distinct from ordinary folders.

- [`advanced-tab-groups.uc.js`](https://raw.githubusercontent.com/Vertex-Mods/Advanced-Tab-Groups/cd3d2e4fc29a0226db096651d646f9724831719a/advanced-tab-groups.uc.js)
- [`folder-look.uc.js`](https://raw.githubusercontent.com/Vertex-Mods/Advanced-Tab-Groups/cd3d2e4fc29a0226db096651d646f9724831719a/folder-look.uc.js)

### Zen Library
Adds a unified library front-end with five independent feature modules —
downloads, history, media, saved spaces, page boosts — all mounted into one
sidebar shell. Closest structural analogue to this project's
`resources/second-sidebar/` controller split.

- [`ZenLibrary.uc.js`](https://raw.githubusercontent.com/12th-devs/Zen-Library/cd0cf2c0eb963cababf33e68ef260ae4d8cb518d/ZenLibrary.uc.js) — core shell
- [`features/Downloads.uc.js`](https://raw.githubusercontent.com/12th-devs/Zen-Library/cd0cf2c0eb963cababf33e68ef260ae4d8cb518d/features/Downloads.uc.js)
- [`features/History.uc.js`](https://raw.githubusercontent.com/12th-devs/Zen-Library/cd0cf2c0eb963cababf33e68ef260ae4d8cb518d/features/History.uc.js)
- [`features/Media.uc.js`](https://raw.githubusercontent.com/12th-devs/Zen-Library/cd0cf2c0eb963cababf33e68ef260ae4d8cb518d/features/Media.uc.js)
- [`features/Spaces.uc.js`](https://raw.githubusercontent.com/12th-devs/Zen-Library/cd0cf2c0eb963cababf33e68ef260ae4d8cb518d/features/Spaces.uc.js)
- [`features/Boosts.uc.js`](https://raw.githubusercontent.com/12th-devs/Zen-Library/cd0cf2c0eb963cababf33e68ef260ae4d8cb518d/features/Boosts.uc.js)

### Zen Notes
Single-note sidebar widget with a three-layer decomposition: storage/preference/state
model, an HTML sanitizer + content-tree normalizer for rich text, and a DOM/lifecycle
UI layer. Drag-to-resize, links, colour schemes.

- [`zen-notes-core.uc.js`](https://raw.githubusercontent.com/jjspscl/zen-notes/be820c7525013f31eaeae15e2c2e2de0a33b7a11/zen-notes-core.uc.js)
- [`zen-notes-editor.uc.js`](https://raw.githubusercontent.com/jjspscl/zen-notes/be820c7525013f31eaeae15e2c2e2de0a33b7a11/zen-notes-editor.uc.js)
- [`zen-notes-ui.uc.js`](https://raw.githubusercontent.com/jjspscl/zen-notes/be820c7525013f31eaeae15e2c2e2de0a33b7a11/zen-notes-ui.uc.js)

### Zen Folder Tree Connectors
Draws the elbow/line connector graphics between parent folders and child tabs, so
hierarchy is readable without relying on indentation alone.

- [`ZenFolderTreeConnectors.uc.js`](https://raw.githubusercontent.com/JustAdumbPrsn/ZenFolderTreeConnectors/912af66a325928af0365bb1a4fa70317a3891ed3/ZenFolderTreeConnectors.uc.js)

### SuperPins
Reworks pinned-tab/Essentials UX — sizing, hit targets, and interaction behaviour
of the pinned surface.

- [`dist/patches.uc.mjs`](https://raw.githubusercontent.com/CosmoCreeper/Zen-Themes/88639a2587d076925baa33d4af3c867499da526e/SuperPins/dist/patches.uc.mjs)

### Tidy Pinned Tabs
Shortens pinned-tab titles via Mistral / OpenAI / OpenRouter / Gemini / local Ollama;
Shift-click the icon to revert. Four files, clean utils/ai/hooks split.

- [`rename-pinned-tabs.uc.js`](https://raw.githubusercontent.com/Zylaah/tidy-pinned-tabs/a9ceafa98ca3348f6988b7ab03085e5742f3f626/rename-pinned-tabs.uc.js)
- [`modules/rename-pinned/rename-pinned-utils.uc.js`](https://raw.githubusercontent.com/Zylaah/tidy-pinned-tabs/a9ceafa98ca3348f6988b7ab03085e5742f3f626/modules/rename-pinned/rename-pinned-utils.uc.js)
- [`modules/rename-pinned/rename-pinned-ai.uc.js`](https://raw.githubusercontent.com/Zylaah/tidy-pinned-tabs/a9ceafa98ca3348f6988b7ab03085e5742f3f626/modules/rename-pinned/rename-pinned-ai.uc.js)
- [`modules/rename-pinned/rename-pinned-hooks.uc.js`](https://raw.githubusercontent.com/Zylaah/tidy-pinned-tabs/a9ceafa98ca3348f6988b7ab03085e5742f3f626/modules/rename-pinned/rename-pinned-hooks.uc.js)

### Tidy Pinned Folders
Collapses open sibling folders when a new folder opens, keeping the pinned area
from fanning out.

- [`scripts/tidy-pinned-folders.uc.js`](https://raw.githubusercontent.com/dehyde/sine-mods/3a4e1e2401632c4e28323588543a5b89b324f19a/mods/sine-tidy-pinned-folders/scripts/tidy-pinned-folders.uc.js)

### Focus Space
Live stopwatch rendered into the active workspace indicator showing dwell time in
the current space, plus a stacked ratio bar at the sidebar foot.

- [`focus-space.uc.mjs`](https://raw.githubusercontent.com/Zebeqo/Zen-Focus-Space/bca925fcfdd876712a8624161175e00b0de76122/focus-space.uc.mjs)

---

## Tab Sorting, Search & Command Interfaces

### Zen Command Palette
Raycast/Arc-style extensible command launcher integrated into the URL bar — runs
commands without leaving the omnibox.

- [`zen-command-palette.uc.js`](https://raw.githubusercontent.com/Vertex-Mods/Zen-Command-Palette/708c42875511a8eb57960a6482284b6af8ca32f2/zen-command-palette.uc.js)

### ZenTabPalette
Keyboard-driven search-and-organize palette for open tabs: smart-query and regex
matching, bulk move to folders/groups/workspaces, bookmarking, history filtering,
settings.

- [`tab-filter.uc.js`](https://raw.githubusercontent.com/juhamikael/ZenTabPalette/243bedd20ae391f830ec7b153d3e7223c312de1b/tab-filter.uc.js)

### Zen Tidy Tabs
One-click tab sort driven by Firefox's built-in local AI, rendering results as
styled groups.

- [`tidy-tabs.uc.js`](https://raw.githubusercontent.com/Vertex-Mods/Zen-Tidy-Tabs/b9214f70b2f60f74019a5e9c76decdd46839742b/tidy-tabs.uc.js)

### Zen Tab Wand
Two-stage tab tidy — deterministic domain rules first, then an AI engine (built-in
or Ollama) for whatever the rules miss.

- [`auto-organize.uc.mjs`](https://raw.githubusercontent.com/flantig/Zen-Tab-Wand/8c098c7c3b18da7839ee04c273b3ae3a7e08439d/auto-organize.uc.mjs)

### Quick Search
Floating search container that runs a query without navigating away from the
current tab.

- [`quickSearch.uc.js`](https://raw.githubusercontent.com/Darsh-A/Quick-Search-Zen-Browser/4c05eb1c462434cf06887ca4038c029ea22847c4/quickSearch.uc.js)

### Reopen Closed Tabs Menu
Popup menu to browse and restore recently closed tabs, with a toolbar button and
keyboard shortcut.

- [`reopen-closed-tabs.uc.js`](https://raw.githubusercontent.com/Vertex-Mods/Reopen-Closed-Tabs-Menu/855279aeab8f004e057bdfcc692dbac5a0c39846/reopen-closed-tabs.uc.js)

### Zen's Missing Hotkeys
Registers the two tab shortcuts Zen omits — "close tabs below" and "close other
tabs" — each unbound by default and configurable via a settings UI injected into
`about:preferences`.

- [`zen-missing-hotkeys.uc.js`](https://raw.githubusercontent.com/JiPaix/zen-missing-hotkeys/3d1efb490a636468066ef72e686dd3d0dc0ab5ac/zen-missing-hotkeys.uc.js)

### Search Keyboard Shortcuts
Adds search/filter boxes to the keyboard-shortcuts pane inside Settings. Targets
`about:preferences`, **not** `browser.xhtml`.

- [`settings-shortcuts-search.uc.js`](https://raw.githubusercontent.com/Vertex-Mods/Search-Keyboard-Shortcuts/07ecd0a4de9f2599fbeda03426abb2b0cdbb47d3/settings-shortcuts-search.uc.js)

### Zen Drop Link to Split
Drag-and-drop a link onto a tab to open a split view directly from it.

- [`file.uc.js`](https://raw.githubusercontent.com/octaviusz/zen-drop-link/06d15bc792d76439f27e12c265c0ce952691d483/file.uc.js)

---

## Downloads & File Handling

### Tidy Downloads
AI-renames completed downloads. The most thoroughly decomposed mod in the store —
ten files separating utils, state store, downloads-API adapter, toasts, file ops,
AI renaming, model config, download UI, and tooltip.

- [`tidy-downloads.uc.js`](https://raw.githubusercontent.com/Vertex-Mods/Zen-Tidy-Downloads/e2cd5ab43088a4fe9b156d1501c7adb2d8f48e2e/tidy-downloads.uc.js) — entry point
- [`tidy-downloads-utils.uc.js`](https://raw.githubusercontent.com/Vertex-Mods/Zen-Tidy-Downloads/e2cd5ab43088a4fe9b156d1501c7adb2d8f48e2e/modules/tidy-downloads/tidy-downloads-utils.uc.js)
- [`tidy-downloads-store.uc.js`](https://raw.githubusercontent.com/Vertex-Mods/Zen-Tidy-Downloads/e2cd5ab43088a4fe9b156d1501c7adb2d8f48e2e/modules/tidy-downloads/tidy-downloads-store.uc.js)
- [`tidy-downloads-downloads-adapter.uc.js`](https://raw.githubusercontent.com/Vertex-Mods/Zen-Tidy-Downloads/e2cd5ab43088a4fe9b156d1501c7adb2d8f48e2e/modules/tidy-downloads/tidy-downloads-downloads-adapter.uc.js)
- [`tidy-downloads-toasts.uc.js`](https://raw.githubusercontent.com/Vertex-Mods/Zen-Tidy-Downloads/e2cd5ab43088a4fe9b156d1501c7adb2d8f48e2e/modules/tidy-downloads/tidy-downloads-toasts.uc.js)
- [`tidy-downloads-fileops.uc.js`](https://raw.githubusercontent.com/Vertex-Mods/Zen-Tidy-Downloads/e2cd5ab43088a4fe9b156d1501c7adb2d8f48e2e/modules/tidy-downloads/tidy-downloads-fileops.uc.js)
- [`tidy-downloads-ai-rename.uc.js`](https://raw.githubusercontent.com/Vertex-Mods/Zen-Tidy-Downloads/e2cd5ab43088a4fe9b156d1501c7adb2d8f48e2e/modules/tidy-downloads/tidy-downloads-ai-rename.uc.js)
- [`tidy-downloads-ai-models.uc.js`](https://raw.githubusercontent.com/Vertex-Mods/Zen-Tidy-Downloads/e2cd5ab43088a4fe9b156d1501c7adb2d8f48e2e/modules/tidy-downloads/tidy-downloads-ai-models.uc.js)
- [`tidy-downloads-download-ui.uc.js`](https://raw.githubusercontent.com/Vertex-Mods/Zen-Tidy-Downloads/e2cd5ab43088a4fe9b156d1501c7adb2d8f48e2e/modules/tidy-downloads/tidy-downloads-download-ui.uc.js)
- [`tidy-downloads-tooltip.uc.js`](https://raw.githubusercontent.com/Vertex-Mods/Zen-Tidy-Downloads/e2cd5ab43088a4fe9b156d1501c7adb2d8f48e2e/modules/tidy-downloads/tidy-downloads-tooltip.uc.js)

---

## URL Bar, Search & Page-Awareness

### Blended Addressbar
Page-aware URL bar that samples the active site's dominant colour and blends it
into Zen's chrome.

- [`blended-bar.uc.js`](https://raw.githubusercontent.com/kkugot/blended-addressbar/0c46d944dba736df75697165810550bc64e5888c/blended-bar.uc.js)

### Zen Page Tint
Adaptive chrome colour driven by the active page. Notably well-engineered: single
rAF-coalesced sampler, per-origin LRU cache, explicit anti-retry-storm and
anti-per-tab-paint-cascade design.

- [`tint.uc.js`](https://raw.githubusercontent.com/caezium/zen-page-tint/a7125c0f4d52121edf81ac9f5f662308b74a8446/tint.uc.js)

### Search Engine Select
Floating engine-switcher UI injected directly onto search results pages.

- [`search-engine-select.uc.js`](https://raw.githubusercontent.com/Vertex-Mods/Search-Engine-Select/269f0baf8949f3064f5a3522ef0bfe675b2d53cd/search-engine-select.uc.js)

### Zen Site Appearance Toggle
Draggable toolbar button that toggles a site's dark/light mode, with per-workspace
defaults.

- [`sine/JS/zen-colorscheme-toggle.uc.js`](https://raw.githubusercontent.com/ravenothere/Zen-Site-Appearance-Toggle/0865ed237d0a9960f149d5f8f47d02144a60e0b9/sine/JS/zen-colorscheme-toggle.uc.js)

---

## Sidebar, Windows & Containers

### Little Zen
Runtime backport of Zen's native "Little Zen" popup window — a compact
tab/container switcher, reconstructed for versions that lack it.

- [`littleZen.uc.js`](https://raw.githubusercontent.com/12th-devs/little-zen/96d94d5e1769f78f91880c7047d5af495fd17716/littleZen.uc.js)

### Floating Sidebar
Makes the sidebar floatable and adds pin/unpin state. Lightweight — directly
relevant to this project's `JS/sidebarWidth.uc.js`.

- [`floating-sidebar.uc.js`](https://raw.githubusercontent.com/Vertex-Mods/Floating-Sidebar/f9dd3fa508e221cd8246c029e64e5c604bc4c7ee/floating-sidebar.uc.js)

### Open in Container Window
Adds "Open in New Container Window" to both bookmark and link context menus,
auto-resolving the right workspace container from the URL or current tab.

- [`openInContainerWindow.uc.js`](https://raw.githubusercontent.com/t4nk3rchu/open-in-container-window/63e90c5b4c2d0dd7361f35ca4e2acc2c59232382/openInContainerWindow.uc.js)

### Zen Proxy Divider
Draggable horizontal divider in the sidebar: tabs above use the browser's proxy,
tabs below bypass it. **The only mod declaring a dual `@include`** (`browser.xhtml`
**and** `browser.xul`) — relevant to the header parser in `JS/AGENTS.md`.

- [`zen-proxy-divider.uc.mjs`](https://raw.githubusercontent.com/greeeenie/zen-proxy-sections/aeacb44855b0e4b142b2d042c3636c4312db5efe/zen-proxy-divider.uc.mjs)

### Zen Auto Wallpaper
Syncs the active workspace's wallpaper to the current workspace automatically.

- [`zen-auto-wallpaper.uc.mjs`](https://raw.githubusercontent.com/Vertex-Mods/zen-auto-wallpaper/0679fca413b38bc53e49ad0be7a05209c3b7e1ed/zen-auto-wallpaper.uc.mjs)

---

## Media, PiP & Video

### Zenslop
Live video preview of the currently-playing video, rendered above the existing
media controls.

- [`main.uc.js`](https://raw.githubusercontent.com/Firebolt9907/Zenslop/b5ce39ede14a09c0095aa822ea380cbca8d236f0/main.uc.js)

### Auto-PiP-Setting
Injects an automatic picture-in-picture toggle into the unified panel.

- [`zen-auto-pip-setting.uc.js`](https://raw.githubusercontent.com/Zylaah/zen-mods/dc4bccbaa20bba53c1c71a9057aa36aec0324e8c/auto-pip/zen-auto-pip-setting.uc.js)

---

## Statusbar, Toasts & Notifications

### Widget Statusbar
Configurable widget-based bottom status bar for Zen — a substantially richer
status surface than this project's `JS/extendedStatusbar.uc.js`.

- [`main.uc.js`](https://raw.githubusercontent.com/danperks/zen-widget-statusbar/a24d3d650f3282315392a4f6de558669f5f0ba14/main.uc.js)

### Workspace Toast
Intercepts workspace switches and raises a toast carrying the workspace icon and
name — only fires in `onlysidebar` mode where the switch is otherwise invisible.

- [`chrome.uc.js`](https://raw.githubusercontent.com/Nelkit/zen-workspace-toast/54bc7739182eadfcce3831bfaf0303c8de940e78/chrome.uc.js)

### Tab Closing Bubble Animation
Bubble-explosion particle animation on tab or tab-group close.

- [`tab_explode_animation.uc.js`](https://raw.githubusercontent.com/Zylaah/bubble-pop-deleting/96afe0bda3c01c84b8bdcc6f0e150f7c63c37d9d/tab_explode_animation.uc.js)

---

## Context Menu & Theming Engines

### Context Menu Icons
Adds icons to context-menu entries and introduces menu folding — collapsing
redundant item groups into expandable subsections.

- [`JS/CMI-fold_menu.uc.js`](https://raw.githubusercontent.com/Starry-AXQG/Context-Menu-Icons/71750239d6fd114800989d91f2567cd4c47635e9/JS/CMI-fold_menu.uc.js)

### BetterZenGradientPicker
Full overhaul of the theme gradient picker, shipped with a separate first-run
welcome/promo script.

- [`BetterZenGradientPicker.uc.js`](https://raw.githubusercontent.com/JustAdumbPrsn/BetterZenGradientPicker/4cb5ef0c6390fb4f720da27aa1f29b7d0726c2e6/BetterZenGradientPicker.uc.js)
- [`welcome.uc.js`](https://raw.githubusercontent.com/JustAdumbPrsn/BetterZenGradientPicker/4cb5ef0c6390fb4f720da27aa1f29b7d0726c2e6/welcome.uc.js)

### Arc 2.0
Arc-style theme whose JS layer handles the behavioural half — plus an unexpected
bonus: a standalone system-module PDF inversion utility.

- [`arc.uc.js`](https://raw.githubusercontent.com/YashjitPal/Arc-2.0/d35e73dd2069e5402ca7121b970fbfad817c6c50/arc.uc.js)
- [`invertPDF.sys.mjs`](https://raw.githubusercontent.com/YashjitPal/Arc-2.0/d35e73dd2069e5402ca7121b970fbfad817c6c50/invertPDF.sys.mjs)

### Nebula
Central runtime script driving the Nebula visual theme — not merely styling, but
active UI behaviour.

- [`js/nebula.uc.js`](https://raw.githubusercontent.com/JustADumbPrsn/Zen-Nebula/31ba4a3bde77391e173a6a3460d9fb0ab9bca8a0/js/nebula.uc.js)

### Zia
Dia-inspired rebuild: page card layout, site-coloured toolbar, redesigned sidebar —
behaviour handled in JS rather than CSS alone.

- [`zia.uc.js`](https://raw.githubusercontent.com/z1n-k/zia/ec48a6fd93ec2bd92b3491f320f1df7833c0c08a/zia.uc.js)

### Render.js
Animation and life-cycle layer making workspace transitions feel continuous
rather than instant.

- [`workspace.uc.mjs`](https://raw.githubusercontent.com/SehajveerSingh2005/render.js/d6e8b82a5aec931a0bce3b1d536eeb1b0910e876/workspace.uc.mjs)

### Browse Bot
Transforms the standard Zen findbar into a floating, AI-powered chat interface
(Gemini / Mistral / Claude). Arc-inspired.

- [`browse-bot.uc.mjs`](https://raw.githubusercontent.com/Vertex-Mods/Browse-Bot/2a01fd5047fb939e2e87e46f425404003bcbb352/browse-bot.uc.mjs)

---

## Already Ported

### ~~Quick Tabs~~
Floating browser containers for opening links without losing focus.
**This project already has it** as `JS/quick_tabs.uc.js` (a Darsh-A port).

- ~~[`Quick_Tabs.uc.js`](https://raw.githubusercontent.com/Darsh-A/Quick-Tab/71b8e25cfee756a798b4e4d092159a5cd32f162e/Quick_Tabs.uc.js)~~ — upstream source

---

## Natsumi Browser — Full Browser Fork

A complete browser shell rather than a mod. Its `natsumi/scripts/` tree holds
**47 files: 35 `.uc.mjs` + 12 `.sys.mjs`** (4 of the `.sys.mjs` are `JSWindowActor`
parent/child pairs). 36 of the most relevant are enumerated below.

**Fork targets:** Zen, Floorp, Firefox, Waterfox, LibreWolf.
**Commit:** `d4e53042f3cd840babc38a2bc754225511f640b3`

Its `JSWindowActor` parent/child architecture is the single most valuable
architectural reference in this entire inventory for this project's work.

> **Not enumerated here** (11 remaining): `preferences-shortcuts.uc.mjs`,
> `reset-tab-style.sys.mjs`, `shortcut-actions.sys.mjs`, and the four actors
> `actors/NatsumiGlimpse{Child,Parent}.sys.mjs` +
> `actors/NatsumiWeb{Child,Parent}.sys.mjs`.

### Feature Modules

| Area | Modules |
|------|---------|
| URL bar | [`urlbar.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/urlbar.uc.mjs) |
| Split view | [`split-view.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/split-view.uc.mjs) |
| Workspaces | [`workspaces.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/workspaces.uc.mjs) |
| Sidebar panels | [`panel-sidebar.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/panel-sidebar.uc.mjs) |
| Shortcuts | [`shortcuts.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/shortcuts.uc.mjs) · [`sidebar-actions.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/sidebar-actions.uc.mjs) |
| Bento grid / glance | [`bento.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/bento.uc.mjs) · [`glimpse.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/glimpse.uc.mjs) |
| Pinned tabs | [`pinned-tabs.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/pinned-tabs.uc.mjs) |
| Toolbars | [`toolbars.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/toolbars.uc.mjs) · [`single-toolbar.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/single-toolbar.uc.mjs) |
| Compact mode | [`compact-mode.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/compact-mode.uc.mjs) |
| Tab animations | [`tab-animations.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/tab-animations.uc.mjs) |
| Media / PiP | [`pip.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/pip.uc.mjs) · [`miniplayer.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/miniplayer.uc.mjs) |
| Addon manager | [`addons.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/addons.uc.mjs) |

### Preferences UI

- [`preferences.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/preferences.uc.mjs)
- [`preferences-about.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/preferences-about.uc.mjs)
- [`preferences-sidebar.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/preferences-sidebar.uc.mjs)
- [`preferences-shortcuts.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/preferences-shortcuts.uc.mjs)

### Injection Plumbing

The closest analogue to this project's `utils/boot.sys.mjs` +
`utils/uc_api.sys.mjs` layer.

- [`injector.sys.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/injector.sys.mjs)
- [`css-injector.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/css-injector.uc.mjs)
- [`patches.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/patches.uc.mjs)
- [`postload.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/postload.uc.mjs)

### Theming Engine

- [`theme-builder.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/theme-builder.uc.mjs)
- [`custom-theme.sys.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/custom-theme.sys.mjs)
- [`fonts.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/fonts.uc.mjs)

### Runtime Services

- [`updater.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/updater.uc.mjs)
- [`version.sys.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/version.sys.mjs)
- [`files.sys.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/files.sys.mjs)
- [`detect-fork.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/detect-fork.uc.mjs)

### Miscellaneous

- [`meow.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/meow.uc.mjs)
- [`robots.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/robots.uc.mjs)
- [`web.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/web.uc.mjs)
- [`browser-separation.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/browser-separation.uc.mjs)
- [`natsumi-welcome.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/natsumi-welcome.uc.mjs)
- [`notifications-parent.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/notifications-parent.uc.mjs)
- [`notifications.sys.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/notifications.sys.mjs)

### Floorp-Specific

- [`floorp-gestures.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/floorp-gestures.uc.mjs)
- [`floorp-modules.sys.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/floorp-modules.sys.mjs) — background module, not `.uc.mjs`
- [`floorp-tab-style.uc.mjs`](https://raw.githubusercontent.com/greeeen-dev/natsumi-browser/d4e53042f3cd840babc38a2bc754225511f640b3/natsumi/scripts/floorp-tab-style.uc.mjs)

### Actors (`.sys.mjs`, not in registry — from tree walk)

These implement the `JSWindowActor` parent/child split:

```
natsumi/scripts/actors/NatsumiGlimpseChild.sys.mjs
natsumi/scripts/actors/NatsumiGlimpseParent.sys.mjs
natsumi/scripts/actors/NatsumiWebChild.sys.mjs
natsumi/scripts/actors/NatsumiWebParent.sys.mjs
```

The remaining unenumerated files are `reset-tab-style.sys.mjs` and
`shortcut-actions.sys.mjs`.

---

## Link Provenance Notes

- All marketplace URLs pinned to the commit SHA recorded in the registry. 62/62 verified `HTTP 200`.
- **Live Calendar** is in [`02-sine-store-unpublished.md`](02-sine-store-unpublished.md) — branch-ref link, no recorded SHA.
- **Natsumi**: the registry lists only the bare directory `natsumi/scripts/`, which
  cannot be fetched over `raw.githubusercontent.com` (returned `404` while all 62
  siblings returned `200`). Resolved by walking the pinned commit tree via the
  GitHub API: **47 files total — 35 `.uc.mjs` + 12 `.sys.mjs`**. 36 are enumerated
  above (34 `.uc.mjs` + 6 `.sys.mjs`); the other 11 are listed as "not enumerated".

## Link Verification

All 172 unique `raw.githubusercontent.com` URLs across this research directory were
probed and returned `HTTP 200`.

Three link errors were caught by that sweep and corrected — all three were
extensions transcribed wrongly from the tree-walk listing:

| Wrong | Correct |
|-------|---------|
| `natsumi/scripts/floorp-modules.uc.mjs` | `floorp-modules.sys.mjs` |
| `natsumi/scripts/notifications.uc.mjs` | `notifications-parent.uc.mjs` + `notifications.sys.mjs` |
| `mods/ai-tabgroups-zenbrowser/clear.uc.js` | Not in that repo — root of `Darsh-A/Ai-TabGroups-ZenBrowser` |
| `mods/tab-rename-zenbrowser/tab-rename.uc.js` | `mods/tab-rename-zen-browser/tab-rename.uc.js` |