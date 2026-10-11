---
title: "08 — Maintenance, rebasing & dev loop"
type: research
tags: [firefox-fork, rebase, patches, devtools, testing, hmr]
created: 2026-10-11
updated: 2026-10-11
---

# 08 — Maintenance, rebasing & dev loop

## 8.1 Upstream sync

- Track `mozilla-unified` (hg) or the git mirror; for artifact builds use **git-cinnabar**.
- Pin a base: forks commonly track a specific ESR or release (Zen "built using Firefox 156.0",
  Floorp pins a `floorp-runtime.lock.json` commit).
- `mk_add_options AUTOCLOBBER=1` auto-wipes the objdir when an upstream pull invalidates it.

## 8.2 Patch-stack management

| Tool/pattern | Used by |
| ------------ | ------- |
| `git format-patch` / `git am`, or `hg export`/`hg import` | general |
| `git-patchtree.sh patches/...` | LibreWolf |
| `npm run export <path>` / `npm run import` on an `engine/` checkout | Zen |
| `.github/patches/<common>/` validated against a lock file | Floorp |
| `patches.sh` shell driver over `mach` | Midori/Amelia |

Rules of thumb:

1. **Prefer additive files + a one-line hook** over edits *inside* upstream files. An `@import`
   line in `browser.css` conflicts rarely; editing the middle of `browser.xhtml` conflicts often.
2. Keep each patch single-purpose so a 3-way merge is trivial.
3. Lock the base revision so CI can detect drift.

## 8.3 Dev loop (no recompile)

| Goal | Command |
| ---- | ------- |
| Rebuild local JS/CSS/assets | `./mach build faster` |
| Run | `./mach run` |
| Launch with a clean startup cache | `./mach run -- -purgecaches` (or delete `startupCache`) |
| Chrome devtools | Browser Toolbox `Ctrl+Shift+Alt+I` (`devtools.chrome.enabled`) |
| Live-edit a sheet | Style Editor → edit → Save (applies immediately) |
| Inspect a window's DOM/CSS | Browser Toolbox → Inspector |
| Debug content without sandbox | `MOZ_DISABLE_CONTENT_SANDBOX=1` (dev only — triggers the "sandbox disabled" banner) |

HMR: Floorp uses Vite dev servers (ports 5173–5186) with a retry bridge that loads
`chrome://noraneko/content/core.js` in prod and `http://localhost:5181/loader/index.ts` in dev.
Zen documents live `userChrome.css` editing via the Style Editor.

## 8.4 Testing

| Type | Command / entry |
| ---- | --------------- |
| Browser-chrome mochitests | `./mach test browser/...` / `mach mochitest --flavor=browser` |
| XPCShell | `./mach test path/to/xpcshell` |
| Marionette / WebDriver | `./mach marionette`, geckodriver |
| GTests | `./mach gtest 'Pattern.*'` |
| Lint | `./mach lint <path> [--fix]` |
| Try push | `./mach try fuzzy -q "'repackage 'flatpak !shippable"` |

Artifact builds support mochitest, xpcshell and Marionette-based tests. In-browser harnesses
(Floorp's colocated `runAllTests`, Zen's) run inside the real browser via Marionette.

## 8.5 ESM

`.sys.mjs` is the current module system (`ChromeUtils.importESModule`,
`defineESModuleGetters`); the JSM→ESM compatibility layer auto-redirects old imports and
`./mach esmify` helps convert. Target `.sys.mjs` for any new fork JS.

## 8.6 Where this theme's files map

| Theme file(s) | Fork destination |
| ------------- | ---------------- |
| `CSS/userChrome.uc.css` + `CSS/chrome/*` + `CSS/common/*` | end of `browser/themes/*/browser.css` (or `higgs-theme.css` + `@import`) |
| `CSS/userContent.uc.css` + `CSS/content/*` | appended to each target page's built-in sheet |
| `JS/*.uc.js` / `*.uc.mjs` | `browser/base/content/` as `.sys.mjs`, or vendored fx-autoconfig loader |
| prefs (currently NixOS/AutoConfig) | `browser/app/profile/firefox.js` |
| `resources/` (icons, wallpaper, second-sidebar) | `jar.mn`-registered `chrome://`/`resource://` assets |

## Sources

firefox-source-docs `contributing/contribution_quickref`, `tools/try`, `testing/browser-chrome`,
`testing/xpcshell`, `build/buildsystem/flatpak`; Zen docs; Floorp AGENTS.md; libreWolf README.
