---
title: "Fork roadmap — Gjoa-style 3-lane Higgs fork"
type: plan
tags: [fork, roadmap, lanes, branding, beagle, prefs, hotkeys]
created: 2026-10-12
updated: 2026-10-12
status: planning
---

# 00 — Fork roadmap: Gjoa-style 3 lanes

## 00.1 Goal

A **Linux-only Firefox fork** that ships the theme + userChrome.js + all features as one executable,
with a dev loop that never recompiles Gecko for chrome work. Reference model:
[`../research/firefox-fork-embedding/12-special-attention.md`](../research/firefox-fork-embedding/12-special-attention.md)
§12.3 (Gjoa) and
[`13-lane1-dev-loop.md`](../research/firefox-fork-embedding/13-lane1-dev-loop.md).

## 00.2 The three lanes (adopt verbatim)

| Lane | Scope | Loop | Cost |
| ---- | ----- | ---- | ---- |
| **1** | chrome JS + CSS (the theme's `JS/*.uc.js`, `CSS/*`) | `higgs sync` + `higgs hotreload` | **~1 s, no rebuild** |
| **2** | `.sys.mjs` overlay / patch / branding / prefs | `higgs build` (= `mach build faster`) | ~30 s |
| **3** | C++/Rust / version bump / configure | full `mach`/`nix` build | 30–60 min |

Rule (from Gjoa): *"choose the cheapest lane that owns the behaviour — ask 'can this be chrome JS?'
before any source patch."* Release is **not a lane** — it is CI-built on a tag.

**Lane 1 mechanism (recap):** a tiny `HiggsLoader.sys.mjs` baked once into `omni.ja` (Lane 2) reads
`<install_root>/higgs-dev/` (symlinked to `dist/chrome/`) and injects scripts/CSS; production falls
back to `chrome://higgs/content/`. See file 13 for the loader sketch + `bin/higgs` CLI.

## 00.3 Open decision — Branding (retire "Higgs Boson")

The fork needs its own identity (Gjoa has `gjoa.json` + `configs/branding/` + `browser/branding/<name>/`).

To decide:
- **Name** (retire "Higgs Boson" — too long, and "Higgs" alone collides with the physics joke). Criteria:
  short (≤ 8 chars), pronounceable, no existing browser collision, nameable `appId`/`binaryName`.
- **Files to create:** `higgs.json` (rename `name/binaryName/appId/vendor/displayVersion/branding/urls`
  — mirror `gjoa.json`), `configs/branding/<name>/{content,branding.nsi,icons}`, and
  `browser/branding/<name>/` (via `--with-branding`).
- **Retire:** the current `AGENTS.md` title, `resources/icons/firefox*.svg` branding, `.documentation`
  references, NixOS `firefox.nix` comments.

Deliverable: a 1-page branding spec + the `higgs.json` skeleton.

## 00.4 Open decision — Language (a Beagle alternative)

Requirement: **more utility than plain JS, but still hot-reloadable** (must emit chrome JS/ESM that
Lane 1 can swap).

Context: Gjoa authors in **Beagle** — `tompassarelli/beagle`, "an independent statically typed Lisp
derived from Clojure", compiled via Racket, with hosted **Clojure / JavaScript / Nix** profiles.
Beagle is the reference but is one author's young toolchain (24★).

Candidates:

| Option | Utility over JS | Hot-reload fit | Notes |
| ------ | --------------- | -------------- | ----- |
| **ReScript** | sound static types, ADTs, pattern matching, fast compiler | **excellent** — watch mode rebuilds in tens of ms, clean ESM output, TS interop | `rescript` npm, 7.4k★; gradual adoption; no lock-in |
| **ClojureScript** | Lisp/Clojure semantics, immutability, macros | good — fast incremental builds, but heavier runtime/analysis | 9.4k★; closest in spirit to Beagle |
| **TypeScript** | structural types, tooling | excellent (esbuild/tsc watch) | baseline; least "additional utility" |
| **Beagle** | Beagle's typed Lisp + Nix profile | good (Gjoa proves it: `gjoa sync` ~1 s) | matches the reference model exactly; small community |
| **Hoot / Scheme→WASM** | Scheme | poor for chrome JS (WASM not chrome-privileged) | reject |
| **Clojure (JVM) / others** | — | poor | reject |

**Recommendation to validate in a spike:** **ReScript** as the default (fastest, typed, plain-ESM
output, zero runtime lock-in), with **Beagle** kept as the "match Gjoa exactly" option and
**ClojureScript** as the Lisp-purist option. Spike = port *one* module (e.g. the QuickTabs search
handler) to each of ReScript + Beagle, measure `sync` time and output shape, then decide.

Deliverable: a 1-page comparison + the spike result.

## 00.5 Open decision — Prefs + hotkeys surface

Every component needs an `about:config` toggle and a rebindable hotkey. Proposed namespace:
**`higgs.*`** (mirror Palefox's `pfx.*` and Zen's `zen.*`).

| Component | Pref | Default hotkey (proposal) |
| --------- | ---- | ------------------------- |
| UI front-end components (master switch) | `higgs.ui.enabled` | — |
| Status bar | `higgs.statusbar.enabled` | `Ctrl+/` toggle |
| Second sidebar | `higgs.secondSidebar.enabled` | `Ctrl+B` (or `Alt+B`) |
| Top bar (toolbar) | `higgs.topbar.enabled` | `Ctrl+Shift+B` |
| QuickTabs | `higgs.quicktabs.enabled` | `Ctrl+Alt+Q` |
| All-Tabs-Menu as home/new-tab | `higgs.home.mode` = `allTabsMenu` | — |
| QuickTabs Search (sel. text) | `higgs.quicktabs.search.enabled` | `Ctrl+Shift+S` |
| Tab-drop split | `higgs.split.dropToSplit` | — |
| 4-way split | `higgs.split.grid4` | — |
| Shortcut cheat-sheet button | `higgs.shortcuts.button` | `Ctrl+Alt+K` |

Deliverable: a `higgs.*` pref schema + a `Shortcuts` registry design (one place that owns all
bindings, so the task-7 cheat-sheet can enumerate them).

## 00.6 Order of work

1. **Finish the theme itself** (task backlog — §01), still on the current overlay. Refactors/features
   are cheaper to iterate before the fork exists.
2. Decide **branding + language** (§00.3/§00.4) with spikes.
3. Stand up the fork skeleton: `higgs.json`, `src/` overlay, 2 loader patches, `bin/higgs` CLI,
   one bake build → **Lane 1 live**.
4. Migrate the theme into the overlay (chrome CSS `%include`, components, prefs) — Lane 2.
5. Wire CI release (tag → build → AppImage/deb/rpm).
