---
title: "Sine Store — Unpublished / Staged Mods"
type: source-summary
tags: [userchrome, uc-js, sine, theme-store, sine-store, zylaah, darsh-a]
created: 2026-10-12
updated: 2026-10-12
source: https://github.com/Darsh-A/sine-store
status: active
---

# Sine Store — Unpublished / Staged Mods

Scripts present in the [`Darsh-A/sine-store`](https://github.com/Darsh-A/sine-store)
working repository but **absent from the live marketplace registry** at
<https://sineorg.github.io/store/marketplace.json>.

**Commit pinned:** `af2d57ce55af1d620e1fa20d9fb2aa0fc1153b2c` — all 16 URLs verified `HTTP 200`.

---

## Undocumented Mod — 10 Scripts in One File

`mods/53cfe9d6-9079-46f8-b42f-453c46ebf0fa/mod.uc.js` — a 1,650-line combined
bundle. No `theme.json`, no registry entry, UUID-only directory name. The file's own
header states it "combines all the provided userChrome.js scripts into a single file
for easier management", preserving each script's logic with one edit: replacing
`.vertical-pinned-tabs-container-separator` with `.pinned-tabs-container-separator`.

Each block retains a full `==UserScript==` header with `@name` and `@namespace`,
which makes them cleanly separable:

| # | `@name` | `@namespace` | Purpose |
|--:|---------|--------------|---------|
| 1 | Dynamic URLBar Background Height | — | Adjusts `#browser::before` height to match `.urlbarView` height. Gated on `browser.tabs.allow_transparent_browser`. |
| 2 | Zen Global URL Bar Scroller | — | Custom scrolling behaviour for the global URL bar. |
| 3 | Tab Explode Animation | — | Tab-close particle effect — overlaps the published *Tab Closing Bubble Animation* mod. |
| 4 | permission-box-possition-fix | `zenPermissionBoxGranterPostionFix` | Repositions the permission notification box. |
| 5 | zen-media-coverart-enhanced-bg-wrapper-hoverfix | `zenMediaCoverArtEnhancedBgWrapperHoverFix` | Zen media-session cover-art background/hover fix. |
| 6 | zen-workspace-button-wave-animation | `zenWorkspaceButtonAnimation` | Wave animation on the workspace button. |
| 7 | CompactmodeSidebarWidthFix | `psuedobgwidthfix` | Fixes sidebar width in compact mode. |
| 8 | GradientOpacitydjuster | `variableopacity` | Adjusts gradient opacity variables. |
| 9 | Zen Top Position Globalizer | `globalizier` | Globalizes the Zen top-bar position value. |
| 10 | Zen Mdia Player Peak height | `height` | Media player peak height correction. |

- [`mods/53cfe9d6-9079-46f8-b42f-453c46ebf0fa/mod.uc.js`](https://raw.githubusercontent.com/Darsh-A/sine-store/af2d57ce55af1d620e1fa20d9fb2aa0fc1153b2c/mods/53cfe9d6-9079-46f8-b42f-453c46ebf0fa/mod.uc.js)

> **Note the naming defects** — `permission-box-possition-fix` (typo in `possi`),
> `psuedobgwidthfix`, `variableopacity`, `globalizier`, and `Zen Mdia Player`
> (typo for *Media*). These are unpolished, unlike the curated store entries.

---

## Staged But Not Published

| Mod | File | Purpose |
|-----|------|---------|
| **Zen Live Calendar** | [`mods/zen-live-calendar/live-calendar.uc.mjs`](https://raw.githubusercontent.com/Darsh-A/sine-store/af2d57ce55af1d620e1fa20d9fb2aa0fc1153b2c/mods/zen-live-calendar/live-calendar.uc.mjs) | Arc-style always-visible calendar in the sidebar. Upstream `Vertex-Mods/zen-auto-wallpaper` sibling org entry. |
| **AI TabGroups** | [`mods/ai-tabgroups-zenbrowser/tab-sort-clear.uc.js`](https://raw.githubusercontent.com/Darsh-A/sine-store/af2d57ce55af1d620e1fa20d9fb2aa0fc1153b2c/mods/ai-tabgroups-zenbrowser/tab-sort-clear.uc.js) | Clears AI tab-group sort state. Pairs with `clear.uc.js` in the standalone repo (see [`03-darsh-a-standalone.md`](03-darsh-a-standalone.md)). |

---

## Legacy / Pre-Refactor Builds

Superseded by the live-registry versions but historically interesting — they show
what these mods looked like before modular decomposition.

| Mod | File | Note |
|-----|------|------|
| Nebula (flat layout) | [`mods/Nebula/Nebula.uc.js`](https://raw.githubusercontent.com/Darsh-A/sine-store/af2d57ce55af1d620e1fa20d9fb2aa0fc1153b2c/mods/Nebula/Nebula.uc.js) | Registry now uses `js/nebula.uc.js` |
| Zen Tidy Downloads (legacy) | [`mods/zen-tidy-downloads/zen-stuff.uc.js`](https://raw.githubusercontent.com/Darsh-A/sine-store/af2d57ce55af1d620e1fa20d9fb2aa0fc1153b2c/mods/zen-tidy-downloads/zen-stuff.uc.js) | Pre-10-module build |
| Search Engine Select | [`mods/search-engine-select/seach-engine-select.uc.js`](https://raw.githubusercontent.com/Darsh-A/sine-store/af2d57ce55af1d620e1fa20d9fb2aa0fc1153b2c/mods/search-engine-select/seach-engine-select.uc.js) | Filename typo `seach-`; registry version is `search-engine-select.uc.js` |
| Advanced Tab Groups | [`mods/advanced-tab-groups/advanced-tab-groups.uc.js`](https://raw.githubusercontent.com/Darsh-A/sine-store/af2d57ce55af1d620e1fa20d9fb2aa0fc1153b2c/mods/advanced-tab-groups/advanced-tab-groups.uc.js) | Single-file build; registry adds `folder-look.uc.js` |
| Browse Bot | [`mods/browse-bot/browse-bot.uc.js`](https://raw.githubusercontent.com/Darsh-A/sine-store/af2d57ce55af1d620e1fa20d9fb2aa0fc1153b2c/mods/browse-bot/browse-bot.uc.js) | `.uc.js` build; registry ships `.uc.mjs` |
| Floating Sidebar | [`mods/floating-sidebar/floating-sidebar.uc.js`](https://raw.githubusercontent.com/Darsh-A/sine-store/af2d57ce55af1d620e1fa20d9fb2aa0fc1153b2c/mods/floating-sidebar/floating-sidebar.uc.js) | Matches registry |
| Quick Search | [`mods/quick-search-zen-browser/quicksearch.uc.js`](https://raw.githubusercontent.com/Darsh-A/sine-store/af2d57ce55af1d620e1fa20d9fb2aa0fc1153b2c/mods/quick-search-zen-browser/quicksearch.uc.js) | Filename `quicksearch`; registry uses `quickSearch.uc.js` |
| Quick Tabs | [`mods/quick-tabs/Quick_Tabs.uc.js`](https://raw.githubusercontent.com/Darsh-A/sine-store/af2d57ce55af1d620e1fa20d9fb2aa0fc1153b2c/mods/quick-tabs/Quick_Tabs.uc.js) | **Already ported** as `JS/quick_tabs.uc.js` |
| Search Keyboard Shortcuts | [`mods/settings-shortcuts-search/settings-shortcuts-search.uc.js`](https://raw.githubusercontent.com/Darsh-A/sine-store/af2d57ce55af1d620e1fa20d9fb2aa0fc1153b2c/mods/settings-shortcuts-search/settings-shortcuts-search.uc.js) | Matches registry |
| Tab Rename | [`mods/tab-rename-zen-browser/tab-rename.uc.js`](https://raw.githubusercontent.com/Darsh-A/sine-store/af2d57ce55af1d620e1fa20d9fb2aa0fc1153b2c/mods/tab-rename-zen-browser/tab-rename.uc.js) | Staged; not in live registry |
| Zen Command Palette | [`mods/zen-command-palette/zen-command-palette.uc.js`](https://raw.githubusercontent.com/Darsh-A/sine-store/af2d57ce55af1d620e1fa20d9fb2aa0fc1153b2c/mods/zen-command-palette/zen-command-palette.uc.js) | Matches registry |
| Zen Drop Link | [`mods/zen-drop-link/file.uc.js`](https://raw.githubusercontent.com/Darsh-A/sine-store/af2d57ce55af1d620e1fa20d9fb2aa0fc1153b2c/mods/zen-drop-link/file.uc.js) | Matches registry |

---

## Path Corrections

The initial tree walk of this repo produced two wrong paths, caught by HTTP
probing. Corrected here:

| Wrong path | Correct path |
|------------|--------------|
| `mods/ai-tabgroups-zenbrowser/clear.uc.js` | Not in this repo — it lives at the root of [`Darsh-A/Ai-TabGroups-ZenBrowser`](https://github.com/Darsh-A/Ai-TabGroups-ZenBrowser) |
| `mods/tab-rename-zenbrowser/tab-rename.uc.js` | `mods/tab-rename-zen-browser/tab-rename.uc.js` (note `-browser` suffix) |

**Lesson:** never transcribe paths from a truncated directory listing — probe each
URL before recording it.