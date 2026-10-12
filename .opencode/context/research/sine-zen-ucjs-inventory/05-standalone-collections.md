---
title: "Standalone uc.js Collections (Non-Zen, Portable)"
type: source-summary
tags: [userchrome, uc-js, collections, portable, vanilla-firefox, toolbar-buttons, downloads]
created: 2026-10-12
updated: 2026-10-12
source: https://github.com/rhubarbshoelaces/firefox-scripts
status: active
---

# Standalone `.uc.js` Collections (Non-Zen, Portable)

**49 scripts across 5 collections** that are **not** Zen-coupled. Unlike the Sine
mods (most of which carry `fork: ['zen']` and target Zen-internal selectors), these
target vanilla Firefox chrome and would load directly into this project via
fx-autoconfig without adaptation.

Every link is commit-pinned and verified `HTTP 200`.

---

## rhubarbshoelaces/firefox-scripts — 17 files

**Commit:** `dd6470392ca3078bca3c764b03ca0203e1185182`

A toolbar-button framework plus a family of ready-made buttons. Every script is
**entirely self-contained** — icons are baked into the code, so a single file drop-in
works.

### Framework

- [`ButtonFactory.uc.js`](https://raw.githubusercontent.com/rhubarbshoelaces/firefox-scripts/dd6470392ca3078bca3c764b03ca0203e1185182/ButtonFactory.uc.js) — shared toolbar-button construction framework. **Worth evaluating** against this project's `CustomizableUI.createWidget()` usage in `JS/restart_button.uc.js`.

### Service Buttons (10)

| File | Target |
|------|--------|
| [`CustomButton_FindbarToggle.uc.js`](https://raw.githubusercontent.com/rhubarbshoelaces/firefox-scripts/dd6470392ca3078bca3c764b03ca0203e1185182/CustomButton_FindbarToggle.uc.js) | Find-bar visibility toggle |
| [`CustomButton_Google.uc.js`](https://raw.githubusercontent.com/rhubarbshoelaces/firefox-scripts/dd6470392ca3078bca3c764b03ca0203e1185182/CustomButton_Google.uc.js) | Google |
| [`CustomButton_Gmail.uc.js`](https://raw.githubusercontent.com/rhubarbshoelaces/firefox-scripts/dd6470392ca3078bca3c764b03ca0203e1185182/CustomButton_Gmail.uc.js) | Gmail |
| [`CustomButton_GoogleMaps.uc.js`](https://raw.githubusercontent.com/rhubarbshoelaces/firefox-scripts/dd6470392ca3078bca3c764b03ca0203e1185182/CustomButton_GoogleMaps.uc.js) | Google Maps |
| [`CustomButton_GoogleNews.uc.js`](https://raw.githubusercontent.com/rhubarbshoelaces/firefox-scripts/dd6470392ca3078bca3c764b03ca0203e1185182/CustomButton_GoogleNews.uc.js) | Google News |
| [`CustomButton_NYTimes.uc.js`](https://raw.githubusercontent.com/rhubarbshoelaces/firefox-scripts/dd6470392ca3078bca3c764b03ca0203e1185182/CustomButton_NYTimes.uc.js) | NY Times |
| [`CustomButton_Reddit.uc.js`](https://raw.githubusercontent.com/rhubarbshoelaces/firefox-scripts/dd6470392ca3078bca3c764b03ca0203e1185182/CustomButton_Reddit.uc.js) | Reddit |
| [`CustomButton_WashingtonPost.uc.js`](https://raw.githubusercontent.com/rhubarbshoelaces/firefox-scripts/dd6470392ca3078bca3c764b03ca0203e1185182/CustomButton_WashingtonPost.uc.js) | Washington Post |
| [`CustomButton_Wikipedia.uc.js`](https://raw.githubusercontent.com/rhubarbshoelaces/firefox-scripts/dd6470392ca3078bca3c764b03ca0203e1185182/CustomButton_Wikipedia.uc.js) | Wikipedia |
| [`CustomButton_GoUp.uc.js`](https://raw.githubusercontent.com/rhubarbshoelaces/firefox-scripts/dd6470392ca3078bca3c764b03ca0203e1185182/CustomButton_GoUp.uc.js) | Parent-directory navigation |

### Navigation & Behaviour (6)

| File | Purpose |
|------|---------|
| [`Navigation_BackTrack.uc.js`](https://raw.githubusercontent.com/rhubarbshoelaces/firefox-scripts/dd6470392ca3078bca3c764b03ca0203e1185182/Navigation_BackTrack.uc.js) | Back-navigation history tracking |
| [`Navigation_CloseUnclose.uc.js`](https://raw.githubusercontent.com/rhubarbshoelaces/firefox-scripts/dd6470392ca3078bca3c764b03ca0203e1185182/Navigation_CloseUnclose.uc.js) | Reopen the last-closed tab |
| [`Navigation_ReloadPlus.uc.js`](https://raw.githubusercontent.com/rhubarbshoelaces/firefox-scripts/dd6470392ca3078bca3c764b03ca0203e1185182/Navigation_ReloadPlus.uc.js) | Hard-reload bypassing cache |
| [`MileWideBack.uc.js`](https://raw.githubusercontent.com/rhubarbshoelaces/firefox-scripts/dd6470392ca3078bca3c764b03ca0203e1185182/MileWideBack.uc.js) | Widen the back-button click target |
| [`Split_Tab_Tweaks.uc.js`](https://raw.githubusercontent.com/rhubarbshoelaces/firefox-scripts/dd6470392ca3078bca3c764b03ca0203e1185182/Split_Tab_Tweaks.uc.js) | Native split-view tab tweaks |
| [`Windows-StyleContextNavigation.uc.js`](https://raw.githubusercontent.com/rhubarbshoelaces/firefox-scripts/dd6470392ca3078bca3c764b03ca0203e1185182/Windows-StyleContextNavigation.uc.js) | Windows-native context-menu navigation keys |

### Utility

- [`UserChromeJS_Folder_Organizer.uc.js`](https://raw.githubusercontent.com/rhubarbshoelaces/firefox-scripts/dd6470392ca3078bca3c764b03ca0203e1185182/UserChromeJS_Folder_Organizer.uc.js) — sorts/enables/disables `.uc.js` scripts by folder, directly relevant to this project's `JS/` organisation

---

## tortious/MintyFox — 14 files

**Commit:** `1cf7800c0164a26688cad15fb4e8dd949343394b` (branch `master`)
Path prefix: `userChrome.js/`

| File | Purpose | Overlaps this project? |
|------|---------|------------------------|
| [`Restart-Panelbutton.uc.js`](https://raw.githubusercontent.com/tortious/MintyFox/1cf7800c0164a26688cad15fb4e8dd949343394b/userChrome.js/Restart-Panelbutton.uc.js) | Restart button as a panel widget | **Yes** — `JS/restart_button.uc.js` |
| [`RestartFirefoxButton_Movable.uc.js`](https://raw.githubusercontent.com/tortious/MintyFox/1cf7800c0164a26688cad15fb4e8dd949343394b/userChrome.js/RestartFirefoxButton_Movable.uc.js) | Draggable restart button | **Yes** — `JS/restart_button.uc.js` |
| [`aboutconfig-button.uc.js`](https://raw.githubusercontent.com/tortious/MintyFox/1cf7800c0164a26688cad15fb4e8dd949343394b/userChrome.js/aboutconfig-button.uc.js) | Toolbar button opening `about:config` | Related to `JS/AboutConfigMultipleSelection.uc.js` |
| [`browsertoolbox.uc.js`](https://raw.githubusercontent.com/tortious/MintyFox/1cf7800c0164a26688cad15fb4e8dd949343394b/userChrome.js/browsertoolbox.uc.js) | Open Browser Toolbox | **Yes** — `JS/userChromeDevtoolsSheetLoader.sys.mjs` |
| [`MovableMenuButton.uc.js`](https://raw.githubusercontent.com/tortious/MintyFox/1cf7800c0164a26688cad15fb4e8dd949343394b/userChrome.js/MovableMenuButton.uc.js) | Draggable hamburger menu button | **Yes** — `JS/allTabsMenuExpansionPack.uc.js` |
| [`Buttons_hamburger-menu-keyboard-shortcut.uc.js`](https://raw.githubusercontent.com/tortious/MintyFox/1cf7800c0164a26688cad15fb4e8dd949343394b/userChrome.js/Buttons_hamburger-menu-keyboard-shortcut.uc.js) | Hamburger-menu shortcut | **Yes** — menu work |
| [`closeothertabs.uc.js`](https://raw.githubusercontent.com/tortious/MintyFox/1cf7800c0164a26688cad15fb4e8dd949343394b/userChrome.js/closeothertabs.uc.js) | Close all other tabs | Related to Sine *Zen's Missing Hotkeys* |
| [`dblclickDuplicateTab.uc.js`](https://raw.githubusercontent.com/tortious/MintyFox/1cf7800c0164a26688cad15fb4e8dd949343394b/userChrome.js/dblclickDuplicateTab.uc.js) | Double-click duplicates a tab | **Novel** |
| [`jsOff.uc.js`](https://raw.githubusercontent.com/tortious/MintyFox/1cf7800c0164a26688cad15fb4e8dd949343394b/userChrome.js/jsOff.uc.js) | Toggle JavaScript for a site | **Novel** |
| [`open-chromefolder.uc.js`](https://raw.githubusercontent.com/tortious/MintyFox/1cf7800c0164a26688cad15fb4e8dd949343394b/userChrome.js/open-chromefolder.uc.js) | Open the profile `chrome/` directory | **Novel** — useful for this project's own dev loop |
| [`bottomtoolbar.uc.js`](https://raw.githubusercontent.com/tortious/MintyFox/1cf7800c0164a26688cad15fb4e8dd949343394b/userChrome.js/bottomtoolbar.uc.js) | Bottom toolbar placement | Related to `CSS/chrome/layout.css` |
| [`AutoplaySwitch.uc.js`](https://raw.githubusercontent.com/tortious/MintyFox/1cf7800c0164a26688cad15fb4e8dd949343394b/userChrome.js/AutoplaySwitch.uc.js) | Toggle media autoplay | **Novel** |
| [`moveButton.uc.js`](https://raw.githubusercontent.com/tortious/MintyFox/1cf7800c0164a26688cad15fb4e8dd949343394b/userChrome.js/moveButton.uc.js) | Generic movable button utility | Novel utility |
| [`preferences-button.uc.js`](https://raw.githubusercontent.com/tortious/MintyFox/1cf7800c0164a26688cad15fb4e8dd949343394b/userChrome.js/preferences-button.uc.js) | Toolbar button opening Settings | **Novel** |

---

## zephyrer/userChromeJS — 11 files

**Commit:** `231c4da9d6b809a299de73f04387d1640b412235` (branch `master`)

| File | Purpose | Relevance |
|------|---------|-----------|
| [`tabLock_mod2.uc.js`](https://raw.githubusercontent.com/zephyrer/userChromeJS/231c4da9d6b809a299de73f04387d1640b412235/tabLock_mod2.uc.js) | Lock tabs against closing | **Novel** — no tab-locking anywhere in this project |
| [`tabProtect_mod2.uc.js`](https://raw.githubusercontent.com/zephyrer/userChromeJS/231c4da9d6b809a299de73f04387d1640b412235/tabProtect_mod2.uc.js) | Protect tabs from unloading | **Novel** — distinct from `JS/openLinkInUnloadedTab.uc.js` |
| [`discardTab.uc.js`](https://raw.githubusercontent.com/zephyrer/userChromeJS/231c4da9d6b809a299de73f04387d1640b412235/discardTab.uc.js) | Discard (unload) a tab | Closest existing analogue to `JS/minimizeMemory.uc.js` |
| [`copy_link_text-1.0-fx.uc.js`](https://raw.githubusercontent.com/zephyrer/userChromeJS/231c4da9d6b809a299de73f04387d1640b412235/copy_link_text-1.0-fx.uc.js) | Copy link text | Related to `extendedStatusbar.uc.js` link preview |
| [`tabRX.uc.js`](https://raw.githubusercontent.com/zephyrer/userChromeJS/231c4da9d6b809a299de73f04387d1640b412235/tabRX.uc.js) | Tab close/reopen behaviour | Related to `JS/allTabsMenuExpansionPack.uc.js` |
| [`tabRemoveX.uc.js`](https://raw.githubusercontent.com/zephyrer/userChromeJS/231c4da9d6b809a299de73f04387d1640b412235/tabRemoveX.uc.js) | Remove tab close buttons | Overlaps Zen *Remove Tab X* |
| [`tabDblclick.uc.js`](https://raw.githubusercontent.com/zephyrer/userChromeJS/231c4da9d6b809a299de73f04387d1640b412235/tabDblclick.uc.js) | Tab double-click behaviour | **Conflicts** with `JS/tabGroupFolderToggle.uc.js` |
| [`floatBkMenubar.uc.js`](https://raw.githubusercontent.com/zephyrer/userChromeJS/231c4da9d6b809a299de73f04387d1640b412235/floatBkMenubar.uc.js) | Floating bookmarks menubar | Related to `CSS/chrome/bookmarks.css` |
| [`autoopenBookmarkDetailsPane.uc.js`](https://raw.githubusercontent.com/zephyrer/userChromeJS/231c4da9d6b809a299de73f04387d1640b412235/autoopenBookmarkDetailsPane.uc.js) | Auto-open bookmark details | **Novel** |
| [`autoPopup.uc.js`](https://raw.githubusercontent.com/zephyrer/userChromeJS/231c4da9d6b809a299de73f04387d1640b412235/autoPopup.uc.js) | Automatic popup handling | General utility |
| [`000-ucx.uc.js`](https://raw.githubusercontent.com/zephyrer/userChromeJS/231c4da9d6b809a299de73f04387d1640b412235/000-ucx.uc.js) | Loader/overlay framework | Historical loader pattern |
| [`appmenuRestartFirefox.uc.js`](https://raw.githubusercontent.com/zephyrer/userChromeJS/231c4da9d6b809a299de73f04387d1640b412235/appmenuRestartFirefox.uc.js) | Restart item in app menu | **Yes** — `JS/restart_item_in_menu.uc.js` |

---

## benzBrake/Firefox-downloadPlus.uc.js — 6 files

**Commit:** `1c92b143867f180108d233c54f45d4be401b4244`

Download-management enhancements. The only substantial download tooling found in this
survey beyond Vertex-Mods' *Tidy Downloads*.

| File | Purpose |
|------|---------|
| [`downloadPlus_Fx136.uc.js`](https://raw.githubusercontent.com/benzBrake/Firefox-downloadPlus.uc.js/1c92b143867f180108d233c54f45d4be401b4244/downloadPlus_Fx136.uc.js) | **Current version** — download enhancements for Firefox 136+ |
| [`saveAs.uc.js`](https://raw.githubusercontent.com/benzBrake/Firefox-downloadPlus.uc.js/1c92b143867f180108d233c54f45d4be401b4244/saveAs.uc.js) | Save-page-as handling |
| [`removeFileFromDownloadManager.uc.js`](https://raw.githubusercontent.com/benzBrake/Firefox-downloadPlus.uc.js/1c92b143867f180108d233c54f45d4be401b4244/removeFileFromDownloadManager.uc.js) | Remove entries from the download manager |
| [`downloadSoundPlay_Fx26.uc.js`](https://raw.githubusercontent.com/benzBrake/Firefox-downloadPlus.uc.js/1c92b143867f180108d233c54f45d4be401b4244/downloadSoundPlay_Fx26.uc.js) | Completion sound on download |
| [`FlashGot.uc.js`](https://raw.githubusercontent.com/benzBrake/Firefox-downloadPlus.uc.js/1c92b143867f180108d233c54f45d4be401b4244/FlashGot.uc.js) | FlashGot integration (legacy) |
| [`downloadPlus_ff98.uc.js`](https://raw.githubusercontent.com/benzBrake/Firefox-downloadPlus.uc.js/1c92b143867f180108d233c54f45d4be401b4244/downloadPlus_ff98.uc.js) | Legacy Firefox 98 build |

---

## 01-1/sine-mod-search — 1 file

**Commit:** `d149ccabbe0857768465365ad91a615231a36457`

- [`sine-mod-search.uc.js`](https://raw.githubusercontent.com/01-1/sine-mod-search/d149ccabbe0857768465365ad91a615231a36457/sine-mod-search.uc.js)

Searches **installed Sine mods** by name, settings text, and preference keys.
**Directly relevant to this project** — it introspects the installed mod
preference surface, which is the same `uc_api.sys.mjs` pref layer this project
writes through in `utils/uc_api.sys.mjs`. Useful as a model if this project ever
wants a settings-search UI over its own `resources/second-sidebar/settings/`.

---

## fx-autoconfig Reference

[`MrOtherGuy/fx-autoconfig`](https://github.com/MrOtherGuy/fx-autoconfig) ships two
production scripts this project already vendors equivalents of:

- `JS/userChrome_au_css.uc.js` → this project's `JS/userChromeAgentAuthorSheetLoader.sys.mjs`
- `JS/userChrome_ag_css.sys.mjs` → same

The repo's `test_profile/chrome/tests/` directory contains **17 `.uc.js`/`.sys.mjs`/
`.uc.mjs` conformance scripts** (plus 4 more under `test_tb_profile/`) — a
ready-made test suite for the `==UserScript==` header contract documented in
`JS/AGENTS.md`, including `x_disabled_script.uc.js`, `test_manifest.uc.js`,
`legacy_tests.uc.js`, `test_mjs.uc.mjs`, and a `TestActor/` parent/child pair.
Default branch is `master`, not `main`.

## Related Context

- [[fx-autoconfig]] — the loader this project runs on
- [[userchrome-ideas-brainstorm]] — feature backlog; `tabLock`, `tabProtect`, and `sine-mod-search` all map to ideas there
- [[firefox-fork-embedding/11-userchrome-ecosystem]] — the broader 97-repo catalogue including `xiaoxiaoflood/firefox-scripts` and `aminomancer/uc.css.js`