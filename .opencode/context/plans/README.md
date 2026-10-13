# Plans — Higgs Boson theme → Linux Firefox fork

Durable plan/backlog for turning this repo from a NixOS profile overlay into a **Linux-only Firefox
fork with a Gjoa-style 3-lane dev loop**. Research that feeds these plans lives in
[`../research/firefox-fork-embedding/`](../research/firefox-fork-embedding/) (files 01–13).

**Status:** planning. No fork work started. Task backlog is the ordered work list.

## Files

| File | What |
| ---- | ---- |
| [00-fork-3-lane-roadmap.md](00-fork-3-lane-roadmap.md) | the 3-lane fork plan + the **open decisions to hammer out first** (branding, language, prefs/hotkeys) |
| [01-task-backlog.md](01-task-backlog.md) | the 8 feature/refactor tasks, each with approach + acceptance criteria |

## Work products already produced (this session)

All in `../research/firefox-fork-embedding/`:

| # | Work product |
| - | ------------ |
| 01 | build system & artifact builds |
| 02 | jar.mn / omni.ja / chrome.manifest packaging |
| 03 | CSS cascade origins & `nsIStyleSheetService` |
| 04 | JS injection & startup categories |
| 05 | prefs & policies |
| 06 | packaging / `mach repackage` / NixOS |
| 07 | per-fork deep-dives (build recipe + embed steps) |
| 08 | maintenance / rebase / dev loop |
| 09 | security & pitfalls |
| 10 | exhaustive fork catalogue |
| 11 | 97-repo userChrome ecosystem |
| 12 | **special attention** (Midori patch system, Palefox, Gjoa, Hilal) |
| 13 | **Lane 1 implementation walkthrough** |
| — | `CSS/content/about-addons.css` fixes (FF157 grid + card image), `CSS/chrome/icons.css` guard — committed |
| — | **Test suite** (`tests/`, `npm test`) — 27 tests validating JS + XUL (parse, imports, exports, element tags, CSS, manifest, DOM shape, UserScript headers, integrity). Found + fixed a CRLF defect in `JS/minimizeMemory.uc.js`. |

## Decision log

| Date | Decision | Status |
| ---- | -------- | ------ |
| 2026-10-12 | Target = **Linux-only executable** (no macOS/Windows ambition) | accepted |
| 2026-10-12 | Adopt **Gjoa-style 3 lanes** (Lane 1 chrome JS/CSS ~1 s · Lane 2 `.sys.mjs`/patch ~30 s · Lane 3 C++/Rust full) | accepted |
| 2026-10-12 | Distribution model changes from "repo is part of my NixOS config" to "one bound executable" | accepted |
| 2026-10-12 | **Retire "Higgs Boson" branding** | open — name TBD (§00.3) |
| 2026-10-12 | Choose a **Beagle alternative** (typed, hot-reloadable) | open — spike TBD (§00.4) |
| 2026-10-12 | Pref namespace + hotkey system for components | open — matrix TBD (§00.5) |
