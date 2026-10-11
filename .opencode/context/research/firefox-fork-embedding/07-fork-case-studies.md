---
title: "07 — Fork case studies"
type: research
tags: [firefox-fork, librewolf, zen, floorp, midori, amelia, pulse, dot-browser]
created: 2026-10-11
updated: 2026-10-11
---

# 07 — Fork case studies

How real Gecko forks embed customisation, and what each implies for compile cost and rebase pain.

> This file holds **deep dives** on the forks whose build/convention details matter most for this
> theme. For the full list of every Firefox/Gecko fork (active mainline, Goanna/UXP, mobile,
> discontinued, config-only) see **[10-forks-catalogue.md](10-forks-catalogue.md)**.

## 7.1 LibreWolf — thin patches + AutoConfig

- Source: `codeberg.org/librewolf/source` (also forge mirrors). A `Makefile` + `lw/` scripts fetch a
  Firefox **tarball**, apply a **patch stack** (~40 patches in `patches/`), then `mach build`.
- Patches are behavioural/privacy (JXL, telemetry, UA string, pingsender, `autoconfig-setEnv`,
  `moz-configure`, `moz-official`, `mozilla_dirs`, …), not a UI framework.
- Prefs come from a separate **settings** repo as `librewolf.cfg` (AutoConfig `pref`/`lockPref`) +
  `defaults/pref` + `policies.json`. A `wolf.cfg`/`policies.json` ship alongside.
- Build: `./mach build` / `./mach package` (full compile — it patches C++), or `make build`.
- **Lesson:** the closest prior art to "layer a theme/config onto stock Firefox". Its theming is
  minimal; this theme would add an author-origin CSS layer + a JS loader here.

## 7.2 Zen — full source fork + mods system

- `zen-browser/desktop`: full fork (~44k★), custom `src/zen/` (`workspaces/`, `compact-mode/`,
  `glance/`, `common/ZenUIManager.mjs`, `tabs/`), root `prefs/*.yaml`, and `src/browser/` holding
  **patches to Firefox files** (e.g. `browser.xhtml`).
- Build tool: **Surfer** (`zen-browser/surfer`), also used by Dot Browser lineage. Heavy (C++).
- Patch workflow: edit files under an `engine/` dir, `npm run export <path>` → `npm run import`.
- **Mods**: `src/zen/mods/ZenMods.mjs` loads `<profile>/chrome/zen-themes/<id>/chrome.css` +
  `preferences.json`, registered in `<profile>/zen-themes.json`; theme store folders need
  `chrome.css`, optional `preferences.json`, `README.md`, preview PNG, `theme.json`.
- Mod prefs are read in CSS via `@media (-moz-pref("theme.x"))` and `var(--mod-...)` / `:has()` on
  generated ids (`#theme-<Sanitized-Name>`).
- **Lesson:** even a heavy fork keeps a **userChrome-CSS mod layer** for user customisation —
  author-origin baked CSS + a user-origin mod overlay coexist. Our theme can be the baked layer.

## 7.3 Floorp / Noraneko — 5-layer overlay + build phases

- Repo is the **overlay**, not Firefox source: 5 layers = patched Gecko → ESM modules → bridge →
  SolidJS chrome → React pages.
- `feles-build` (Deno) orchestrates: `dev` (HMR), `build --phase before-mach` (assets) +
  `build --phase after-mach` (post-build injection), `stage`, `misc patch`.
- Source patches live in `.github/patches/floorp-runtime/common/`, validated against a locked source
  commit (`floorp-runtime.lock.json`); a `crates/nora-inject` and root `moz.build`/`gecko` dir.
- Pref overrides in `static/gecko/pref/override.ini`.
- Ships a built-in **userChromeCSS Loader** (so profile CSS still works inside the fork) and uses
  **Lepton** as the theming base.
- **Lesson:** the "before-mach / after-mach" split is exactly how you inject theme assets without
  editing upstream files deeply. Runtime changes must be *patches*, not live edits to a checkout.

## 7.4 Midori / Amelia — mach wrapper + branding

- Midori (Astian) built by **Amelia** (`@goastian/amelia`), a TypeScript wrapper over `mach`:
  fetch source → apply branding/patches (`patches.sh`) → package per platform.
- Amelia resolves `browser/extensions/moz.build` (fallback `app.mozbuild`), performs a Tor
  preflight before `mach package`, and skips addon git-init under CI.
- Lineage: Amelia ← Surfer (Zen) ← Gluon ← melon (Dot Browser).
- Midori ships themes via `browser/extensions/` and uses the same `userChrome.css` + modular
  `CSS/` + `JS/ *.uc.js` layout as this theme.

## 7.5 Pulse / Dot Browser / Waterfox

- Pulse Browser: `gluon`/`melon`-derived build tooling (HMR-first Firefox fork).
- Dot Browser: origin of the `melon` → `gluon` lineage.
- Waterfox: long-running fork; owns its patch set and build; heavier than needed for this purpose.

## 7.6 Prefs-only stacks (no fork)

**Betterfox** and **arkenfox** deliver most "feel" changes as `user.js` + AutoConfig, no fork and no
compile. They cannot express chrome layout CSS, so they complement rather than replace the theme.

## 7.7 Comparison

| Fork | Approach | Compile | CSS origin | JS loader | Rebase cost |
| ---- | -------- | ------- | ---------- | --------- | ----------- |
| LibreWolf | tarball + ~40 patches + `.cfg` | full (C++) | patched chrome + user | rare | medium |
| Zen | full fork + mods | full | author + user mods | native `.mjs` | high |
| Floorp | overlay + before/after-mach | full/hybrid | author + user loader | native + loader | medium |
| Midori/Amelia | `mach` wrapper + branding | full | author + user | user `.uc.js` | medium |
| **This theme (proposed)** | **additive author CSS + vendored loader** | **artifact (none)** | **author** | **vendored/native** | **low** |

## Sources

codeberg librewolf/source + patches; zen-browser/desktop + docs (code-structure, live-editing, mods);
Floorp-Projects/Floorp + AGENTS.md + docs; goastian/amelia + midori-desktop; context
`research/{floorp,midori-desktop,goastian-amelia,zen-custom-js}`.
