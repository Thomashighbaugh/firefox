# Gjoa — Firefox Source Fork Research

**Source:** https://github.com/tompassarelli/gjoa  
**Fetched:** 2026-06-27  
**Stars:** 5 | **Forks:** 0 | **Commits:** 380 | **Releases:** 8 (latest v0.4.0)

---

## Overview

Gjoa is a **Firefox source fork** (built on Firefox 152) where the power-user extension stack is native. Ad/tracker blocking, forced dark mode, vertical/tree tabs, workspaces, vim navigation, session history, and egress auditing live in the browser chrome and engine — not in extensions, content scripts, or autoconfig hacks.

**Successor to Palefox** — Palefox v0.43.0 was the final release of the userscript-bundle line. Gjoa inherits Palefox's goals (keyboard-first chrome, tree tabs, hash-pinned loader) but implements them as compiled-in source instead of runtime-loaded `.uc.js`.

**Author:** tompassarelli  
**License:** MPL-2.0 (same as Firefox)  
**Language:** Beagle (typed Clojure subset) → compiled to JS/.sys.mjs

---

## Architecture

### Build System

Gjoa is a **source-level fork** — it patches Firefox's source tree and rebuilds from source using Nix.

```bash
bun run init                    # download mozilla-central + apply overlays
nix build .#gjoa --impure       # personal build — LTO + -march=native
nix build .#gjoa-dev --impure   # dev variant — fast, no LTO, CPU-portable
```

### Build Lanes (conflict cadence)

| Lane | Scope | Time | Tool |
|------|-------|------|------|
| Lane 1 | Chrome JS/CSS | ~1s, no rebuild | `gjoa sync` + restart |
| Lane 2 | `.sys.mjs` overlay / patch / branding | ~30s | `mach build faster` |
| Lane 3 | C++/Rust / version bump / configure flags | 30-60 min | Full mach or nix |

**Hard rule:** Default new code to chrome bundles (Lane 1). Conflict cadence rises with seam depth.

### Repo Layout

```
gjoa.json            project config — version of record, branding, URLs
flake.nix            Nix build (dev + release variants)
src/gjoa/            source overlays — chrome UI (.bjs/.css), engine actors, prefs, branding, loader
  chrome/bjs/        Beagle source compiled to chrome JS
    blocking/        Ad/tracker blocking (network, cosmetic, scriptlet)
    dark-mode/       Gecko-native pre-paint dark mode
    tabs/            Tree-style tabs + vim keymap + session history
    spaces/          Workspaces (tab partitioning)
    drawer/          Sidebar drawer + floating urlbar
    security/        Security freshness gate
  browser/components/gjoa/content/
    newtab/          Custom new-tab / home page
    settings/        about:gjoa settings page
    sovereignty/     about:sovereignty egress audit
patches/             Surgical patches against stock Firefox source (engine half)
tools/               Firefox-source prep, release tooling, test harness, audits
  sovereignty/       AST-based egress audit tool
  bench/             Benchmark harnesses
  scripts/           Preflight gates, build scripts
configs/             Branding assets + pinned source/compiler refs
  branding/gjoa/     Custom logo, about: pages
  beagle.ref         Pinned Beagle compiler SHA
docs/                Deep-dive documentation
  ARCHITECTURE.md    Map, rebuild ladder, decision tree
  daily-loop.md      Command cheatsheet
  stewardship/       Maintenance manifesto (testing, security, performance)
```

### Beagle Language

Gjoa is written in [Beagle](https://github.com/Autonymy/beagle) — a typed Clojure subset compiled to chrome JS and a native loader baked into `omni.ja`. Advantages:

- Compile-time macros
- One typed language across chrome / loader / tooling / tests / prefs
- Machine-checked effect discipline (`BEAGLE_PURITY=error`)
- Engine patches anchored by declared structural dependencies (preflight gate catches upstream refactors)
- Source queryable as a call graph (`who-calls`, `blast-radius`, `leverage`)

---

## Features

| Feature | Native Mechanism | Source |
|---------|-----------------|--------|
| Ad/tracker blocking | FF152's in-tree `adblock-rust` driven as full content blocker | `blocking/`, `content-classifier/` |
| Dark mode | Gecko-native pre-paint inversion + `prefers-color-scheme` override | `dark-mode/`, patches |
| Tree-style tabs + vim | Chrome bundle over `gBrowser`; tree state as per-tab metadata | `tabs/` |
| Workspaces | Tabs partitioned into named spaces, survive session restore | `spaces/` |
| Sidebar drawer + floating urlbar | Drawer chrome over the tab sidebar | `drawer/` |
| Session history | Append-only SQLite log + FTS5 full-text index | `tabs/history.bjs`, patches |
| Custom new-tab / home | Forced-dark navigator page via redirector | `newtab/`, patches |

### Blocking (Native, Not Extension)

FF152 ships Brave's `adblock-rust` in-tree but only for tracker annotation. Gjoa drives it as a full content blocker across three layers:
- **Network** — requests killed before they leave the browser
- **Cosmetic** — element-hiding as a single `USER_SHEET`
- **Scriptlets** — sandboxed, curated-only

### Dark Mode (Respects the Site)

- Pages with native dark CSS keep it
- Themeless pages darkened by engine pre-paint (no white flash)
- Curated registry + per-site overrides
- Gecko-native levers: `prefers-color-scheme` override + engine luminance-inversion flag

### Keyboard Surface

- Tab tree is modal-vim-driven (motion, indent/swap, leader chords, `/` filter, `:` ex-commands)
- Fully remappable in `about:vim` or via `:bind`
- Tabs partition into named workspaces that survive session restore
- Workspace changes auto-save to searchable history (SQLite + FTS5)

---

## Sovereignty & Control

- **`about:gjoa`** — single settings page (content blocking, dark mode, privacy profiles, reversible features dashboard)
- **`about:sovereignty`** — egress audit: source-derived list of every network contact point, generated by static AST audit
- **Reversible by design** — every disabled feature stays present and flippable
- **Security freshness gate** — probes Mozilla's `firefox_versions.json` on startup + hourly; full major behind = quit, point-release behind = warn

---

## Development Workflow

```bash
bun test                  # unit tests (happy-dom)
bun run test:integration  # headless Marionette tests
bun run preflight         # 23 pre-build gates (A-W)
bun run status            # operational dashboard
```

Preflight gates catch patch / jar / eval / surface-contract breakage before a multi-hour compile. The gate registry is **generated** in `docs/stewardship/topology.md` (Gate T fails on docs↔machinery drift).

---

## Relevance to Shadowfox

| Aspect | Gjoa | Shadowfox |
|--------|------|-----------|
| **Approach** | Firefox source fork (compiled-in) | CSS + userChrome.js overlay |
| **Scope** | Full browser (blocking, dark mode, tabs, workspaces, vim) | UI customization only |
| **Build** | Nix + mach (30-60 min cold) | No build system |
| **Language** | Beagle (typed Clojure) → compiled JS | CSS + raw JS (.uc.js) |
| **Target** | Firefox 152 (specific version) | Any Firefox version |
| **Loader** | Native (baked into omni.ja) | fx-autoconfig |
| **Testing** | Unit + Marionette + preflight gates | Manual |
| **Status** | Active development (v0.4.0) | Active |

**Key lessons for Shadowfox:**

1. **Source fork vs overlay** — Gjoa is the ultimate expression of the "native" approach. It can do things Shadowfox cannot (swap storage backends, patch internals, add C++/Rust components). But it requires a 30-60 minute build and targets a specific Firefox version. Shadowfox's overlay approach is lighter but more constrained.

2. **Beagle language** — Gjoa's choice of Beagle (typed Clojure) is a deliberate edge for compile-time macros, effect discipline, and call-graph querying. This is a very different philosophy from Shadowfox's raw CSS/JS.

3. **Preflight gates** — 23 automated checks that run before a build, catching patch drift, eval breakage, and security issues. Shadowfox has no equivalent.

4. **Egress audit** — `about:sovereignty` is a unique feature: a source-derived list of every network contact point. Shadowfox could adopt a simpler version (a documented list of what contacts what).

5. **Reversible by design** — Every disabled feature stays present and flippable. Shadowfox could adopt this philosophy for its UI modifications.

6. **Security freshness gate** — Probes for stale builds. Shadowfox could adopt a version-checking mechanism.

7. **Workspaces** — Tab partitioning that survives session restore. Shadowfox's second sidebar system could integrate with this concept.

8. **Build lanes** — Gjoa's Lane 1/2/3 conflict cadence model is a useful framework for thinking about where to make changes. Shadowfox operates entirely in "Lane 1" territory (CSS/JS overlay, no rebuild needed).

---

## Comparison: Palefox → Gjoa

| Aspect | Palefox | Gjoa |
|--------|---------|------|
| **Type** | Userscript bundle (.uc.js) | Firefox source fork |
| **Build** | Bun → .uc.js | Nix + mach → full Firefox binary |
| **Language** | TypeScript | Beagle (typed Clojure) |
| **Loader** | fx-autoconfig | Native (baked into omni.ja) |
| **Blocking** | None | Native adblock-rust |
| **Dark mode** | None | Gecko-native pre-paint |
| **Workspaces** | None | Named tab spaces |
| **Egress audit** | None | about:sovereignty |
| **Status** | Superseded (v0.43.0 final) | Active (v0.4.0) |
| **Stars** | 70 | 5 |
