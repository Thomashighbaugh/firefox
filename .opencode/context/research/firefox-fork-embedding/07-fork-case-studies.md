---
title: "07 — Fork deep-dives (build recipe + exact embed steps)"
type: research
tags: [firefox-fork, deep-dive, build, embed, librewolf, zen, floorp, waterfox, tor, uxp]
created: 2026-10-11
updated: 2026-10-11
---

# 07 — Fork deep-dives

Per-fork **build recipe** + **exact embed steps** for this theme. Full fork list:
[10-forks-catalogue.md](10-forks-catalogue.md). Ecosystem repos (themes/scripts/tools):
[11-userchrome-ecosystem.md](11-userchrome-ecosystem.md). **Special-attention deep analysis**
(Midori patch system, Palefox, Gjoa, Hilal): [12-special-attention.md](12-special-attention.md).

## How to read each deep-dive

- **Base** — upstream lineage + where the source lives.
- **Build** — the literal commands/build tool.
- **Theming hook** — what mechanism the fork already offers for CSS/JS.
- **Embed (this theme)** — numbered, concrete steps: where `CSS/chrome`, `CSS/content`,
  `JS/*.uc.js`, prefs, and `resources/` go.
- **Gotchas** — what bites.

The universal embed map (repeat per fork):

| Theme artefact | Destination |
| -------------- | ----------- |
| `CSS/userChrome.uc.css` + `CSS/chrome/*` + `CSS/common/*` | end of `browser/themes/*/browser.css`, or `higgs-theme.css` + `@import` |
| `CSS/userContent.uc.css` + `CSS/content/*` | the matching built-in page sheet (e.g. `…/mozapps/extensions/aboutaddons.css`) |
| `JS/*.uc.js` / `*.uc.mjs` | vendored fx-autoconfig loader **or** ported `.sys.mjs` imported from `browser/base/content/browser.js` |
| prefs (currently AutoConfig/NixOS) | `browser/app/profile/firefox.js` |
| `resources/` (icons, wallpaper, second-sidebar) | `jar.mn`-registered `chrome://`/`resource://` assets |

---

## 7.1 LibreWolf

- **Base:** Firefox **ESR** + ~40 patches. Source: `codeberg.org/librewolf/source` (git), plus a
  separate **settings** repo (`librewolf.cfg`, `policies.json`).
- **Build:**
  ```bash
  git clone --recursive https://codeberg.org/librewolf/source librewolf-source
  cd librewolf-source && make dir && make bootstrap   # one-time
  make fetch          # download Firefox tarball for the pinned version
  make build          # apply patches + ./mach build
  make package        # or: make run
  ```
  Internals: `Makefile` + `scripts/` + `patches/` (+ `lw/`) fetch a tarball and apply patches with
  `git-patchtree.sh`. New patch: `git diff > ../mypatch.patch`, add to `patches.txt`.
- **Theming hook:** none first-class (privacy-focused); UI customisation is left to profile
  `userChrome.css`. Prefs via `librewolf.cfg` (AutoConfig).
- **Embed (this theme):**
  1. Add `patches/` entry adding `@import url("chrome://browser/skin/higgs.css");` to
     `browser/themes/linux/browser.css` (author origin).
  2. Ship `higgs.css` via the `browser/themes/linux/jar.mn` pattern (see §02).
  3. For `CSS/content/*`, patch the target `about:*` sheets in the same patch.
  4. JS: add a patch that vendors fx-autoconfig's `boot.sys.mjs` into
     `browser/base/content/` and imports it from `browser.js` — **or** keep the existing
     install-dir AutoConfig (LibreWolf already ships one; fx-autoconfig README warns to *merge*
     `config.js` with an existing AutoConfig).
  5. Prefs → append to the settings repo's `librewolf.cfg` (keeps the fork's idiom).
- **Gotchas:** C++ patches mean a full compile. `autoconfig-setEnv.patch` exists because
  `MOZILLA_OFFICIAL` breaks AutoConfig. `moz-configure.patch` fixes the profile dir on FF137+.

## 7.2 Zen Browser

- **Base:** full Firefox fork (156 in 2026). `zen-browser/desktop`; `src/zen/` features,
  `src/browser/` patched Firefox files, root `prefs/*.yaml`.
- **Build:** **Surfer** (`zen-browser/surfer`). Workflow: `npm run init` creates an `engine/`
  checkout; edit there; `npm run export <path>` → `npm run import`. Heavy (C++).
- **Theming hook:** **Zen Mods** — `<profile>/chrome/zen-themes/<id>/chrome.css` +
  `preferences.json`, registered in `<profile>/zen-themes.json`, loaded by
  `src/zen/mods/ZenMods.mjs`. Prefs read in CSS via `@media (-moz-pref("theme.x"))`,
  `var(--mod-…)`, and `:has(#theme-<Name>[attr])`. Live edit via Style Editor.
- **Embed (this theme):** two routes.
  - **Baked (recommended):** put chrome CSS in Zen's own chrome sheets via patch
    (`src/browser/…browser.css` @import), so it is author origin and Zen-Mod-independent.
  - **Mod (fast):** package the theme as a Zen Mod — `chrome.css` + `preferences.json` +
    `theme.json` — and drop in `chrome/zen-themes/higgs/`. This is user origin → needs `!important`.
  1. Decide baked vs mod (baked for a shipped look; mod for optional).
  2. `.uc.js`: Zen already loads user scripts; port to `.sys.mjs` under `src/zen/` for a baked fork.
  3. Prefs → `prefs/higgs.yaml` (Zen's YAML pref format).
- **Gotchas:** mods are user origin (`!important`); `zen-themes.json` + `preferences` field must
  both exist or prefs are ignored; folder id must equal mod id; dots → hyphens in attr/var names.

## 7.3 Floorp / Noraneko

- **Base:** overlay repo over patched Gecko (`Floorp-Projects/Floorp`); Firefox 12x.
- **Build:** `feles-build` (Deno):
  ```bash
  deno install
  deno task feles-build dev                        # HMR dev
  deno task feles-build build --phase before-mach  # production assets
  deno task feles-build build --phase after-mach   # post-build injection
  deno task feles-build misc patch                 # manage Firefox patches
  ```
- **Theming hook:** built-in **userChromeCSS Loader** + **Lepton** base; pref overrides in
  `static/gecko/pref/override.ini`; source patches in `.github/patches/…` validated by
  `floorp-runtime.lock.json`.
- **Embed (this theme):**
  1. Put `CSS/chrome/*` in the **after-mach** injection step (or a `browser-features/chrome/`
     feature) so it lands in the packaged chrome.
  2. `CSS/content/*` via a patch to the target page sheets.
  3. JS → a `browser-features/chrome/common/<name>/index.ts` feature (auto-discovered via
     `import.meta.glob("./*/index.ts")`) or a `.sys.mts` module + Window Actor.
  4. Prefs → `static/gecko/pref/override.ini` or a feature pref.
- **Gotchas:** runtime changes must be **patches**, not edits to a sibling checkout; changes needing
  native recompilation can't ride the source-patch step alone.

## 7.4 Waterfox

- **Base:** Firefox, vendor BrowserWorks Ltd (6.6.x/6.7.x 2026). `github.com/BrowserWorks/waterfox`.
- **Build:** own source repo → standard `./mach build` / `./mach package`. Checkout the matching
  Firefox tag, apply Waterfox's changes, compile.
- **Theming hook:** none first-class; profile `userChrome.css` + prefs. Ships built-in ad blocker +
  feed manager (about:feeds).
- **Embed (this theme):** treat as a plain Firefox source fork:
  1. `@import` chrome CSS in `browser/themes/*/browser.css`.
  2. Patch `CSS/content/*` into the page sheets.
  3. Vendor/port the JS loader.
  4. Prefs → `browser/app/profile/firefox.js`.
- **Gotchas:** full compile; Android app in same org (Feb-2026 menu redesign broke some forks'
  Android UIs — worth tracking if going mobile).

## 7.5 Mercury (Alex313031)

- **Base:** Firefox + compiler optimisations (AVX/AES/LTO/PGO) + patches from LibreWolf, Waterfox,
  Ghostery, BetterFox, GNU IceCat. `Alex313031/Mercury`; also `Mercury-Win7` (ESR115).
- **Build:** scripted:
  ```bash
  ./bootstrap.sh && ./setup.sh && ./build.sh && ./package.sh
  ```
  `mozconfigs/` holds the optimisation flags; `patches/` + `PATCHES.md`; `build.sh` is the entry.
- **Theming hook:** none first-class.
- **Embed (this theme):** add a `patches/` entry for the `browser.css` @import + page sheets; port JS;
  prefs into `firefox.js`. It already aggregates other forks' patches, so a theme patch fits the idiom.
- **Gotchas:** local research notes it looks **dormant** (last release ~v129, Sep 2024) — good as a
  patch source, questionable as a live base.

## 7.6 CachyOS Browser

- **Base:** **LibreWolf-based**, CachyOS distro. `CachyOS/CachyOS-Browser-Common`.
- **Build:** patches + PKGBUILD; mold linker, `-march=native`, LTO, PGO.
- **Theming hook:** none; inherits LibreWolf's.
- **Embed (this theme):** same as LibreWolf (patch-based). Add `about-dialog.patch`-style entries for
  the theme.
- **Gotchas:** distribution-specific packaging; not a portable base.

## 7.7 Konform Browser

- **Base:** Firefox **ESR**, forked from LibreWolf. `codeberg.org/konform-browser/source`.
- **Build:**
  ```bash
  # Makefile + scripts/
  make fetch           # Firefox source archive for `ffbuild` version
  make build           # scripts/apply-patches.py + mach
  ```
  Patches grouped by origin: `patches/kon` (Konform), `patches/moz-backports/{esrXXX-next,rXXX}`,
  `patches/sed-patches` (LibreWolf), `patches/tb` (Tor), `patches/wf` (Waterfox). `patches.txt`
  defines order; `check-patchfail.sh` validates.
- **Theming hook:** `themes/` (CSS/SCSS chrome overrides) + custom `browser/components/`.
- **Embed (this theme):** it already has a `themes/` dir — drop the chrome CSS there or via the
  `browser.css` @import patch; page CSS via patches; JS via a vendored loader; prefs in the settings
  repo.
- **Gotchas:** ESR-pinned (140.x) — verify `about:*` markup against that ESR, not tip-of-tree.

## 7.8 Midori (Astian)

- **Base:** Firefox (Astian/`goastian`); built by **Amelia**.
- **Build:** `@goastian/amelia` (TS over `mach`): fetch source → branding/patches (`patches.sh`) →
  package. `npm run self` / `self:ci-safe`.
- **Theming hook:** ships themes via `browser/extensions/`; the repo uses the **same
  `userChrome.css` + modular `CSS/` + `JS/ *.uc.js` layout as this theme**.
- **Embed (this theme):**
  1. Add a branding-layer patch importing chrome CSS into `browser.css`.
  2. Copy `CSS/content/*` into the page sheets via the same patch set.
  3. Drop `JS/*.uc.js` into `browser/extensions/` packaging path (Midori's idiom) or vendor a loader.
  4. Prefs → branding patch.
- **Gotchas:** Amelia is prerelease; `browser/extensions/moz.build` resolution falls back to
  `app.mozbuild`; Tor preflight runs before `mach package`.

## 7.9 Tor Browser

- **Base:** Firefox **ESR** (140.x) + Tor Uplift + patches. Built by **`tor-browser-build`** using
  **rbm** (Reproducible Build Manager).
- **Build:** per the Tor Browser build guide (`gitlab.torproject.org/tpo/applications/tor-browser`);
  `make -C tor-browser-build`; artifacts reproducible; `000-tor-browser.js` holds prefs;
  commit/bug-id discipline (`fixup! TB 40562: …`). Never rebranded Firefox branding.
- **Theming hook:** native; Letterboxing, RFP; UI is upstream Firefox chrome + patches.
- **Embed (this theme):** **not recommended as a host** — Tor's threat model (uniformity,
  anti-fingerprinting) is actively opposed to per-user UI theming, and a theme is a fingerprinting
  vector. If used at all, only for a **separate, clearly-distinct** build, never the Tor Browser
  brand. Forks that need Tor + theming should start from **Mullvad Browser** instead.
- **Gotchas:** reproducible builds (no nondeterminism); audits; no arbitrary chrome edits without
  breaking reproducibility reviews.

## 7.10 Mullvad Browser

- **Base:** **Tor Browser minus Tor** (Mullvad × Tor Project). `mullvad/mullvad-browser` (readme-only
  main; source in Tor GitLab); signed by Tor Browser Developers.
- **Build:** follow the Tor Browser build instructions; `rebase mullvad-browser build changes onto
  main` per tor-browser-build.
- **Theming hook:** none; inherits Tor Browser's uniformity stance.
- **Embed (this theme):** same caveat as Tor — theming fights anti-fingerprinting. A "Higgs-Mullvad"
  would be a distinct product, not a reskin.
- **Gotchas:** shared build system with Tor; VPN-oriented, not customisable-UI-oriented.

## 7.11 GNU IceCat / GNU IceWeasel

- **Base:** debranded Firefox (FSF/GNU). Packaged primarily for **Guix**.
- **Build:** Guix package definitions building Firefox with GNU branding + LibreJS.
- **Theming hook:** none first-class.
- **Embed (this theme):** patch like any Firefox source fork (chrome @import + page sheets + JS + prefs).
- **Gotchas:** Guix-centric toolchain; "IceWeasel" is used for the GNU debranded Firefox *and*
  historically for Debian's (now reverted) rebrand — disambiguate.

## 7.12 SeaMonkey / UXP family (Pale Moon, Basilisk, K-Meleon, Epyrus, Interlink, AlbusLuna)

- **Base:** **Goanna / UXP** (hard fork of mozilla-central at ESR-52), or SeaMonkey's own old Gecko.
- **Build:** UXP: build the platform, then the app against `platform/` (submodule). Pale Moon repo is
  comm-central-style with UXP as a git submodule. Basilisk: `repo.palemoon.org/Basilisk-Dev/Basilisk`
  + UXP tarball (AUR recipe shows both tarballs). AlbusLuna: one `bash` script builds the bundle.
- **Theming hook:** **Complete Themes** (XUL/XPCOM) — a *different, richer* theming model than modern
  Firefox (can replace all chrome). NPAPI + XUL extensions supported.
- **Embed (this theme):** **not applicable** — this theme targets modern `about:*` pages, `browser.xhtml`,
  design tokens, and `border-radius`-style CSS. UXP is a different front-end era. A UXP port would be
  a rewrite, not an embed.
- **Gotchas:** no modern Gecko tracking; different manifests and `jar.mn` era.

## 7.13 Glide Browser

- **Base:** Firefox 153b1 fork, TypeScript. `glide-browser/glide`.
- **Build:** own; NixOS flake (`glide-browser/glide.nix`) + flatpak. Compile required.
- **Theming hook:** TypeScript config, modal keymaps, per-site keymaps.
- **Embed (this theme):** treat as a Firefox source fork (chrome @import + sheets + JS/prefs). The
  TS config layer can gate theme features.
- **Gotchas:** keyboard-first UI may collide with theme layout assumptions; Gemini support adds its
  own surfaces.

## 7.14 Gjoa (and Palefox)

- **Base:** Firefox 152 source fork. `tompassarelli/gjoa`; **Palefox** (`v0.43.0`) is the prior
  userscript-bundle line it supersedes.
- **Build:**
  ```bash
  bun run init                 # download mozilla-central + apply overlays
  nix build .#gjoa --impure    # LTO + -march=native
  nix build .#gjoa-dev --impure# fast, CPU-portable
  ```
  Written in **Beagle** (typed Clojure subset) → compiled to `.sys.mjs`.
- **Theming hook:** **native** — adblock, dark mode, tree tabs, workspaces, vim nav, session
  history, egress audit live in chrome/engine, not `.uc.js`.
- **Embed (this theme):** follow the "native `.sys.mjs`" path (§04 option 2): convert `JS/*.uc.js` to
  Beagle/`.sys.mjs`; chrome CSS into the overlay's `browser.css`; prefs into the overlay.
- **Gotchas:** Beagle toolchain; Nix-centric; Palefox's **hash-pinned loader** is the security-hardened
  pattern worth copying if you keep a loader.

## 7.15 Pulse Browser (+ Gluon)

- **Base:** experimental Firefox fork. `pulse-browser/browser`; **gluon** is the reusable build tool
  (also `melon`/`gluon` lineage from Dot Browser).
- **Build:** gluon (HMR-first). `pulse-browser-avx` = compiler-optimised variant.
- **Theming hook:** HMR dev loop.
- **Embed (this theme):** chrome @import + sheets + JS/prefs; use gluon's HMR to iterate the theme.
- **Gotchas:** experimental/dormant cadence; treat as technique reference.

## 7.16 Dot Browser (dormant)

- **Base:** Firefox fork; `dothq/browser-desktop`; build tool **`melon`**.
- **Theming hook:** custom UI via **JSWindowActors** (`Dot*Child/Parent.sys.mjs`) — a clean IPC
  pattern for chrome↔content features (see `research/dot-browser/actors.md`).
- **Embed (this theme):** reference for the actor pattern (useful for the second-sidebar IPC), but
  the fork itself is dormant.

## 7.17 Mobile (GeckoView) — Fennec F-Droid, Mull → IronFox, Iceraven, Waterfox Android

- **Base:** GeckoView + Android Components (Fenix). Build docs: `./mach --no-interactive bootstrap
  --application-choice="GeckoView/Firefox for Android"` (+ **Artifact Mode** to skip C++).
- **Build (Fennec F-Droid / Mull):** F-Droid `fdroidserver` builds; Mull is a fork of `fennec-build`
  that compiles all of Fenix without prebuilts, removes proprietary blobs, and applies arkenfox +
  Tor-Uplift prefs; `fdroid build us.spotco.fennec_dos:VERCODE`.
- **Theming hook:** none — the front-end is Android/Compose, **not** `browser.xhtml`/CSS.
- **Embed (this theme):** **`CSS/chrome/*` does not port.** A mobile variant would need a separate
  Compose theme (colours from `ThemeVariableMap`-equivalent tokens). Not a target for this theme.
- **Gotchas:** Feb-2026 menu redesign broke some Android forks; IronFox supersedes Mull.

## 7.18 Prefs-only stacks (no fork)

**arkenfox**, **Betterfox**, **Librefox (intika)**, and enterprise `policies.json` deliver behaviour
changes without a fork or compile. They cannot express chrome layout CSS — complementary, not
alternatives.

## 7.19 Hilal Browser

- **Base:** experimental Firefox fork, alpha, previously "Huma Browser". `VastSea0/hilal-browser`;
  base **Firefox 157.0a1** (`FIREFOX_COMMIT` + `upstream.lock`).
- **Build:** its own **Rust patch manager `hil/`**:
  ```bash
  cargo build --release --manifest-path hil/Cargo.toml
  # overlay dir is `changes/` (mirrors Firefox paths)
  ```
  `mozconfigs/{linux,macos,windows,flatpak,base}` **and Android**
  (`mozconfigs/android-*`, `android/` Gradle). Patch verification in
  `.github/workflows/verify-patches.yml`.
- **Theming hook:** vertical sidebar tabs, Tahoe translucent UI, compact mode, per-site custom CSS +
  element zapper, accent/gradient extraction. Overlay in `changes/browser/{base/content/hilal,
  branding/hilal}/`.
- **Embed (this theme):** `CSS/chrome/*` → `changes/…/browser.css` include; page CSS → patch target
  sheets; JS → `changes/` component modules (or a vendored loader); prefs → `changes/browser/app/profile/`.
- **Gotchas:** alpha; `hil` is bespoke (not Amelia) so follow its docs; best Linux+Android template.

## 7.20 Decision matrix

| Fork | Compile | Theming model | Best for this theme |
| ---- | ------- | ------------- | ------------------- |
| LibreWolf | full | patches + user | ESR stability, patch idiom |
| Zen | full | mods + baked | modern UI framework |
| Floorp | full/hybrid | user loader + before/after-mach | asset injection |
| Waterfox | full | plain fork | minimal bake-in |
| Mercury | full | patches | compiler opts + patch source |
| CachyOS | full | LibreWolf-based | distro packaging |
| Konform | full | `themes/` dir | ESR + patch-by-origin |
| Midori | full | same layout as us | closest structural match |
| Tor / Mullvad | full | none | **avoid** (fingerprinting) |
| UXP family | full | Complete Themes | **not applicable** |
| Mobile forks | full | Compose | **not applicable** |
| **Stock FF + artifact build** | **none** | **author CSS** | **fastest iteration (recommended)** |

## Sources

codeberg librewolf/source; zen-browser/desktop + docs; Floorp-Projects/Floorp + AGENTS.md;
BrowserWorks/waterfox; Alex313031/Mercury; CachyOS-Browser-Common; codeberg konform-browser/source;
goastian/amelia + midori-desktop; Tor `tor-browser-build`/rbm + Tor blog; mullvad/mullvad-browser;
Wikipedia Gecko/UXP/Fennec; repo.palemoon.org UXP; albusluna.org; glide-browser/glide;
tompassarelli/gjoa + palefox; pulse-browser/gluon; dothq/browser-desktop; divested-mobile/mull-fenix;
local `research/{floorp,midori-desktop,goastian-amelia,mercury,gjoa,glide-browser,cachyos-browser,palefox,dot-browser,konform,zen-custom-js}`.
