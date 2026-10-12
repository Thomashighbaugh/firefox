---
title: "12 — SPECIAL ATTENTION: Midori patch system, Palefox, Gjoa, Hilal"
type: research
tags: [special-attention, midori, amelia, patches, palefox, gjoa, hilal, loader-security, linux-build]
created: 2026-10-11
updated: 2026-10-11
---

# 12 — SPECIAL ATTENTION LIST

Four repos that matter most for **turning this theme into a Linux-only executable** rather than a
profile overlay. Read alongside [07](07-fork-case-studies.md) and [10](10-forks-catalogue.md).

- **goastian/midori-desktop** (`dev`) — the patch system. **Answer to "could this incorporate the
  scripts?" is yes — §12.1.4.**
- **tompassarelli/palefox** — defunct; the fx-autoconfig coupling + attack-surface reduction.
- **tompassarelli/gjoa** — the source-fork replacement; the **build-lane model**.
- **VastSea0/hilal-browser** — new; custom Rust patch manager + **Android build**.

---

## 12.1 Midori (`goastian/midori-desktop`, branch `dev`)

### 12.1.1 The model: overlay tree + per-file patches

`src/` **mirrors the Firefox tree**. Two ways to change things:

| Want | Do |
| ---- | -- |
| **Add new code** | put it at the mirrored path, e.g. `src/browser/components/higgs-sidebar/` |
| **Modify upstream** | put `<filename>.patch` next to a mirror, e.g. `src/browser/components/moz-build.patch` |

Patches are plain `git diff` with `a/`/`b/` prefixes. `scripts/recalculate-patches.sh` regenerates
them from the live `engine/` state (tracked files via `git diff`, new files via
`git diff --no-index /dev/null`), with safety checks so an unapplied engine doesn't destroy patches.

### 12.1.2 Build system (Amelia + npm scripts)

`amelia.json` drives everything (product/version, addons, brands). Amelia itself is patched by
`patches/@goastian+amelia+1.11.27.patch`. Key scripts:

```bash
npm run init                 # download (patch-amelia.sh) + import + bootstrap
npm run import               # amelia import  → applies src/ overlay + *.patch into engine/
npm run export               # amelia export
npm run recalculate-patches  # regenerate *.patch from engine/ diff
npm run build:linux-x64      # cross-env AMELIA_PLATFORM=linux AMELIA_COMPAT=x86_64 amelia build
npm run package:linux-x64    # prepare_l10n + amelia package
npm run package:linux-x64-formats   # scripts/package-linux.sh → deb/rpm/AppImage
npm run browser              # amelia run
```

Workflow: `npm run import` → edit `engine/` (or edit `src/` and re-import) → `recalculate-patches`.

### 12.1.3 The theme hook already exists (proof)

Midori **already embeds a userChrome theme** (`datguypiko/Firefox-Mod-Blur`) exactly the way this
theme needs:

- `src/browser/themes/custom/shared/` → `modblur.inc.css` (44 KB), `shared.inc.css` (63 KB),
  `modblur-assets/`, `MODBLUR-UPSTREAM.md`
- `src/browser/themes/custom/linux/linux.inc.css` (per-OS include)
- `src/browser/themes/linux/browser-css.patch` adds:
  ```diff
  +%include ../custom/linux/linux.inc.css
  ```
- `src/browser/themes/linux/jar-mn.patch` flips the sheet to **preprocessed**:
  ```diff
  -  skin/classic/browser/browser.css
  +* skin/classic/browser/browser.css
  ```

That `*` is what makes `%include` (a build-time preprocessor directive, not CSS `@import`) resolve.
Prefs are embedded too: `src/browser/app/profile/{midori-browser.js,firefox-js.patch,
firefox.js-Midori.patch}` plus Betterfox-derived `Fastfox/Memoryfox/Peskyfox/Securefox/Smoothfox.js`.

### 12.1.4 Could this system incorporate the scripts? — **Yes**

Midori ships **17 native chrome components** under `src/browser/components/`
(`autohide, blocker, center, cws, gradient, lifecycle, memory, msidebar, profilemigration, setup,
shortcuts, sync, tabprotect, tabsleep, verticaltabs, webapps, workspace`), registered by
`src/browser/components/moz-build.patch`:

```diff
+DIRS += ["autohide", "blocker", …, "verticaltabs", "webapps", "workspace"]
```

and wired from `BrowserGlue.sys.mjs` via `BrowserGlue-sys-mjs.patch` (lazy ES-module getters + new
observer cases), with per-file patches like `src/browser/actors/ContextMenuChild-sys-mjs.patch` and
`src/browser/base/content/browser-init-js.patch`.

**Exact mapping for this theme → Midori's system:**

| This theme | Midori destination |
| ---------- | ------------------ |
| `CSS/chrome/*` + `CSS/common/*` | `src/browser/themes/custom/shared/higgs.inc.css` (+ `custom/linux/linux.inc.css`) |
| `CSS/userChrome.uc.css` | becomes the `%include` line in `browser.css` (via a `browser-css.patch`) |
| `CSS/content/*` | patch the target page sheets, or a `custom/shared/higgs-content.inc.css` `%include`d where the page already includes a shared sheet |
| `JS/*.uc.js` (18 scripts) | **convert to `src/browser/components/higgs-<feature>/*.sys.mjs`** + per-component `moz.build`, `DIRS +=` via `moz-build.patch`, wire from `BrowserGlue.sys.mjs` patch |
| `resources/second-sidebar/` (100+ files) | a single `src/browser/components/higgs-sidebar/` component (own `jar.mn` + resources) |
| `resources/{icons,wallpaper,texture}` | `src/browser/themes/custom/shared/higgs-assets/` (mirrors `modblur-assets/`) |
| prefs | `src/browser/app/profile/higgs.js` (mirrors `midori-browser.js`) |
| `utils/chrome.manifest` | `% resource higgs %content/higgs/` in the component's `jar.mn` |

**Two routes for the JS:**
1. **Native (recommended, removes the attack surface):** port each `.uc.js` to a component
   `.sys.mjs` (the `@include`/`@onlyonce` metadata becomes explicit registration). This is how Midori
   ships all its features — no AutoConfig, no privileged userscript loader.
2. **Vendored loader (fastest migration):** keep the scripts verbatim and add a `src/` component that
   carries fx-autoconfig's `boot.sys.mjs` + a `chrome/` dir, wired from `BrowserGlue`. Less work, but
   keeps the AutoConfig-style risk (see Palefox §12.2).

**Linux-only build:** drop the win/mac scripts; use only
`npm run build:linux-x64` + `npm run package:linux-x64-formats` → `.deb` / `.rpm` / **AppImage**
(the single-file "web browser executable" you want). Add a `dist/chrome/` hot-reload loop (Gjoa's
`gjoa sync`, §12.3) for iteration without a full build.

---

## 12.2 Palefox (`tompassarelli/palefox`) — defunct, security ideas worth stealing

- **What it was:** a **chrome-privileged userscript bundle** run via **fx-autoconfig**. TypeScript in
  `src/{tabs,drawer,firefox,platform}/` → built `.uc.js` in `chrome/JS/` (built artefacts, not
  hand-edited). `chrome/palefox.css` is an aggregator that `@import`s sub-files; `program/` carries
  `config.generated.js` / `config.template.js` / `defaults/`.
- **The coupling you flagged:** it *is* the fx-autoconfig lineage — the git history couples it to the
  loader. It's the fullest worked example of this theme's exact shape (privileged scripts + CSS).
- **Attack-surface reduction (the good idea):** vanilla fx-autoconfig leaves a **local-write attack
  vector** — anything that can write `boot.sys.mjs` or drop a `.uc.js` gets code execution. Palefox
  ships a **hash-pinned loader** that closes it: `tools/{firefox-canary.ts, firefox-pin.json,
  generate-bootstrap.ts}` pin the Firefox version and verify the loader. Threat model:
  `docs/dev/loader-pipeline.md`. **This theme should adopt the same pinning if it keeps any loader.**
- **Why it died (the ceilings):** couldn't swap the storage backend for FTS5 search, couldn't patch
  internals, and the chrome API ABI moved between Firefox releases. → the argument for a **source
  fork** over a runtime bundle.
- **Reusable bits:** `--pfx-*` CSS palette; a `user.css` override that is never overwritten; `pfx.*`
  prefs; TypeScript→`.uc.js` build pipeline; Nix/Home-Manager install path.

---

## 12.3 Gjoa (`tompassarelli/gjoa`) — the replacement; the lane model

- **What it is:** Firefox source fork authored in **Beagle** (`.bjs` → JS / `.sys.mjs`). Native
  blocking, dark mode, tree tabs, workspaces, vim nav, session history, egress audit — all in chrome.
- **Build lanes — copy this vocabulary:**
  | Lane | Scope | Loop |
  | ---- | ----- | ---- |
  | **1** | chrome JS/CSS (`gjoa sync` + restart) | **~1 s, no rebuild** — default for new code |
  | **2** | `.sys.mjs` overlay / patch / branding | `mach build faster`, ~30 s |
  | **3** | C++/Rust / version / configure | long full `mach`/`nix` build |
  Release is **CI-built on a `vX.Y.Z` tag** (not a lane). Hard rule: *"Choose the cheapest lane that
  owns the behavior"* — ask "can this be chrome JS?" before any source patch.
- **Registration mechanism (directly relevant):** `patches/0001-browser-components-mozbuild-include-gjoa.patch`
  and `patches/0002-browser-glue-import-gjoa-loader.patch` — i.e. **exactly** the Midori pattern
  (`DIRS +=` in `browser/components/moz.build` + import from `BrowserGlue`). Plus
  `0007-enable-sqlite-fts5.patch` (the capability Palefox couldn't get).
- **Dev loop:** `bun run init` → `nix build .#gjoa-quickbuild --impure`; iterate with
  `gjoa sync` + `gjoa hotreload` (Beagle → `dist/chrome/JS/`, CSS → `dist/chrome/CSS/`); verify with
  `bun run preflight`, `bun test`, `bun run test:integration`.
- **Security stewardship (worth copying):** `tools/security/`, `configs/security-patches.json`,
  `security-mitigations.json`, `provenance-identity.json`, generated gate registry, "don't rebuild to
  verify" rule.
- **For this theme:** Gjoa is the closest *maintained* template for "source fork with a fast
  chrome-only iteration loop". Its Lane 1 (`sync`+`hotreload`) is the answer to "how do I iterate the
  theme in a fork without a 30-min build".

---

## 12.4 Hilal (`VastSea0/hilal-browser`) — new, Android, own patch manager

- **What it is:** experimental Firefox fork, alpha, **previously "Huma Browser"**. Base
  **Firefox 157.0a1** (`FIREFOX_COMMIT`, `upstream.lock` with `firefox_version = "157.0a1"`).
- **Its own patch manager:** a **Rust tool `hil/`**:
  ```bash
  cargo build --release --manifest-path hil/Cargo.toml
  ```
  Overlay dir is **`changes/`** (mirrors Firefox paths, e.g.
  `changes/browser/base/content/hilal/…`, `changes/browser/branding/hilal/…`). Patch verification in
  `.github/workflows/verify-patches.yml`. So it's a **third** patch-overlay system (Midori=Amelia,
  Gjoa=Beagle/patches, Hilal=`hil`).
- **Platforms:** `mozconfigs/{linux,macos,windows,flatpak,base}` **and Android**
  (`mozconfigs/android-{arm,arm64,x86,x86_64}`, `android/` Gradle project). Flathub submodule.
- **Features relevant to this theme:** vertical sidebar tabs, **Tahoe translucent sidebar / floating
  toolbar / site-aware window colors**, compact mode with auto-hiding toolbar, workspaces,
  **per-site custom CSS + element zapper**, accent/gradient + automatic color extraction from pages,
  uBlock default, Turkish localization, `manifest.toml` + `changes/`.
- **For this theme:** Hilal is the modern, Android-capable, small-footprint fork whose
  `changes/` overlay + `hil` tool is a lighter alternative to Midori's Amelia. If a mobile variant is
  ever wanted, Hilal (not Zen/Floorp) is the base that already has the Android plumbing.

---

## 12.5 Distribution model — what this means for you

Your position: the theme's **scripts and CSS are coupled**, the current "distribution model" is
"this repo is part of my NixOS config", and you'd rather have **one Linux executable** with
everything bound in (no macOS/Windows ambition, no Zen-style mod marketplace).

The four repos give three concrete Linux paths:

| Path | Template | Output | Iteration |
| ---- | -------- | ------ | --------- |
| **A. Midori/Amelia fork** | `goastian/midori-desktop` | `.deb`/`.rpm`/**AppImage** | `npm run import` + recalc-patches |
| **B. Gjoa-style source fork** | `tompassarelli/gjoa` | `.tar.xz`/**AppImage** | **Lane 1** `sync`+`hotreload` (~1 s) |
| **C. Hilal-style fork** | `VastSea0/hilal-browser` | flatpak + desktop | `hil` patch manager |

All three = "Linux-only executable with theme + scripts baked in". **B (Gjoa lanes)** gives the
fastest theme iteration; **A (Midori)** is the most turnkey for embedding an existing userChrome theme
(it already does it with ModBlur); **C (Hilal)** is the leanest and the only one with Android.

NixOS note: none of these are `pkgs.firefox.override` — they are **source forks built with
`mach`/nix**. On this machine that means a real Firefox build pipeline (30 GB+, hours for a full
build) plus a `nix build` wrapper (Gjoa's flake is the model), *not* the current
`extraPrefsFiles` + `chrome/` symlink.

## Sources

`gh api` reads of `goastian/midori-desktop@dev` (`src/`, `patches/`, `scripts/`, `package.json`,
`amelia.json`, `src/browser/{themes,c components,app/profile,base/content,actors,extensions}` and the
`browser-css.patch`/`jar-mn.patch`/`moz-build.patch`/`BuiltInThemeConfig`/`BrowserGlue`/`moz-configure`
patches), `tompassarelli/palefox` (README, CLAUDE.md, `src/`,`program/`,`tools/`,`chrome/`,`docs/`),
`tompassarelli/gjoa` (README, AGENTS.md, `patches/`,`src/`,`tools/`,`configs/`,`docs/`),
`VastSea0/hilal-browser` (README, `.gitmodules`, `FIREFOX_COMMIT`, `upstream.lock`, `hil/`,`android/`,
`mozconfigs/`). All fetched 2026-10-11.
