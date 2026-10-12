---
title: "Darsh-A Standalone Zen Repos"
type: source-summary
tags: [userchrome, uc-js, zen-browser, darsh-a, quick-search, quick-tabs, sine]
created: 2026-10-12
updated: 2026-10-12
source: https://github.com/Darsh-A
status: active
---

# Darsh-A — Standalone Zen Repos

`[BibekBhusal0 / Vertex-Mods](https://github.com/Vertex-Mods)` aside, **Darsh-A** is
the most prolific individual `.uc.js` author in the Zen ecosystem. Some of their work
reaches the Sine store; the rest lives only in standalone repos.

This project has already ported one of theirs — `JS/quick_tabs.uc.js` derives from
`Darsh-A/Quick-Tab`. See [[quick-tabs]].

---

## Not Store-Packaged

| Repo | File | Purpose |
|------|------|---------|
| [`ZBar-Zen`](https://github.com/Darsh-A/ZBar-Zen) | [`command_bar.uc.js`](https://raw.githubusercontent.com/Darsh-A/ZBar-Zen/main/command_bar.uc.js) | Command bar for the Zen URL bar — rapid command entry. |
| [`Custom-Commands-Zen-Browser`](https://github.com/Darsh-A/Custom-Commands-Zen-Browser) | [`customUrlbarCommands.sys.mjs`](https://raw.githubusercontent.com/Darsh-A/Custom-Commands-Zen-Browser/main/customUrlbarCommands.sys.mjs) | User-definable custom commands in the URL bar. Declared as a **`.sys.mjs`** background module — same class as this project's `userChromeDevtoolsSheetLoader.sys.mjs`. |
| [`Tab-Rename_Zen-Browser`](https://github.com/Darsh-A/Tab-Rename_Zen-Browser) | [`tab_rename.uc.js`](https://raw.githubusercontent.com/Darsh-A/Tab-Rename_Zen-Browser/main/tab_rename.uc.js) | Adds a **right-click** tab-rename menu item, replacing Zen's double-click rename — which conflicts with this project's `tabGroupFolderToggle.uc.js` folder-toggle behaviour. |
| [`Compact_Mode_Zen-Browser`](https://github.com/Darsh-A/Compact_Mode_Zen-Browser) | [`Compact_Sidebar.uc.js`](https://raw.githubusercontent.com/Darsh-A/Compact_Mode_Zen-Browser/main/Compact_Sidebar.uc.js) | Adds a topbar toggle for Compact Mode. |

---

## Ai-TabGroups-ZenBrowser

Two-file mod that sorts temporary/background tabs into AI-generated tab groups for a
cleaner sidebar. The highest-star standalone Zen script found in this survey.

- [`clear.uc.js`](https://raw.githubusercontent.com/Darsh-A/Ai-TabGroups-ZenBrowser/main/clear.uc.js) — clears sort state
- [`tab_sort_clear.uc.js`](https://raw.githubusercontent.com/Darsh-A/Ai-TabGroups-ZenBrowser/main/tab_sort_clear.uc.js) — staged variant, also in [the Sine store](02-sine-store-unpublished.md)

---

## Already Reaching the Store

| Repo | Store entry |
|------|-------------|
| [`Quick-Tab`](https://github.com/Darsh-A/Quick-Tab) | Sine *Quick Tabs* — **already ported** here |
| [`Quick-Search-Zen-Browser`](https://github.com/Darsh-A/Quick-Search-Zen-Browser) | Sine *Quick Search* |
| [`sine-store`](https://github.com/Darsh-A/sine-store) | Staging repo — see [02](02-sine-store-unpublished.md) |

---

## Related Authors

`Darsh-A` also maintains [`sine-store`](https://github.com/Darsh-A/sine-store), the
repo from which the live Sine marketplace registry is served at
`sineorg.github.io/store/marketplace.json` — making them effectively a Sine
marketplace steward alongside [`CosmoCreeper/Sine`](https://github.com/CosmoCreeper/Sine)
(the theme manager itself).

Several other Darsh-A mods have direct overlap with this project's existing work:

| Darsh-A mod | Overlaps with |
|-------------|---------------|
| `Tab-Rename_Zen-Browser` | `JS/tabGroupFolderToggle.uc.js` (dblclick conflict) |
| `Compact_Mode_Zen-Browser` | `JS/quick_tabs.uc.js` taskbar + compact sidebar |
| `ZBar-Zen` | `JS/allTabsMenuExpansionPack.uc.js` menu expansion |
| `Custom-Commands-Zen-Browser` | URL bar patchers in `resources/second-sidebar/patchers/urlbar_input_patcher.mjs` |