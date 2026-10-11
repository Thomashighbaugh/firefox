---
title: "Embedding the Higgs Boson theme + userChrome.js into a Firefox fork"
type: research
tags: [firefox-fork, build-system, userchrome, autoconfig, artifact-build, theming, jar-mn, omnijar]
created: 2026-10-11
updated: 2026-10-11
status: active
sources:
  - https://firefox-source-docs.mozilla.org/build/buildsystem/jar-manifests.html
  - https://firefox-source-docs.mozilla.org/contributing/build/artifact_builds.html
  - https://firefox-source-docs.mozilla.org/browser/BrowserStartup.html
  - https://firefox-source-docs.mozilla.org/jsloader/jsloader-api.html
  - https://support.mozilla.org/en-US/kb/customizing-firefox-using-autoconfig
  - https://github.com/MrOtherGuy/fx-autoconfig
  - https://codeberg.org/librewolf/source
  - https://github.com/zen-browser/desktop
  - https://github.com/Floorp-Projects/Floorp
  - https://github.com/goastian/amelia
---

# Embedding the theme + userChrome.js into a Firefox fork

**Question answered:** what is the most seamless (least compilation-time) way to bake
`CSS/` (userChrome + userContent) and `JS/*.uc.js` / `*.uc.mjs` into a Firefox fork so
they ship as part of the browser instead of being installed per-profile.

---

## TL;DR — recommendation

There are two viable strategies, and they are not mutually exclusive:

| | **A. Overlay distribution** (no compile) | **B. Source fork + artifact build** (minimal compile) |
| --- | --- | --- |
| Firefox C++/Rust compilation | **None** | **None** (`--enable-artifact-builds`) |
| Turnaround after an edit | seconds (no build step) | `./mach build faster` → seconds; `./mach run` to test |
| How CSS/JS ship | install-dir `defaults/pref` + `config.js` (AutoConfig) + files in the install dir / `distribution/` | files committed into the source tree, packaged into `omni.ja` |
| Text survives | none | full (editable, `jar.mn`, i18n) |
| Best for | personal / NixOS / repackaging | a real distributable fork |

**The single most important build fact:** if you are not touching C++/Rust, use
**artifact builds**. `./mach build faster` then only rebuilds local JS, CSS and packaged
assets — no compilation at all. A full `mach build` of Gecko is 30 min–hours; the artifact
path is seconds.

**The single most important styling fact:** CSS committed into the tree is loaded at
**author origin**. That is the origin that beats Firefox's own built-in stylesheets. Embedding
the theme as author CSS **eliminates the `!important` arms race** that a profile
`userChrome.css` (user origin) forces you into. This is the structural fix for the class of
breakage seen with the FF157 `about:addons` regression.

---

## Current state (this repo / NixOS)

The theme is currently consumed the **overlay** way, and is already ~80% of "embedded":

- NixOS Home-Manager overrides the Firefox package to inject fx-autoconfig's `config.js`
  via `extraPrefsFiles` (`modules/home-manager/programs/firefox.nix:22-44`).
- The profile `chrome/` dir is symlinked to this repo
  (`linkFirefoxChrome`, `firefox.nix:384-392`).
- `toolkit.legacyUserProfileCustomizations.stylesheets = true` is set (`firefox.nix:249`).

So the *runtime plumbing* already exists. "Embedding into a fork" means replacing the
**per-profile symlink + AutoConfig-in-install-dir** with files that live in the browser tree.

---

## The four things to embed

A Firefox front-end is four distinct surfaces. They embed differently:

| Surface | What the theme has today | Author-origin home in a fork |
| --- | --- | --- |
| **Browser chrome CSS** | `userChrome.css` → `CSS/userChrome.uc.css` + `CSS/chrome/*`, `CSS/common/*` | appended to / `@import`ed from `browser/themes/{linux,windows,macos}/browser.css` |
| **Content-page CSS** | `userContent.css` → `CSS/content/*` | edit the built-in stylesheets for the target pages directly (e.g. `toolkit/…/mozapps/extensions/aboutaddons.css`) or add a themed sheet to the same `jar.mn` |
| **Privileged JS** | `JS/*.uc.js` / `.uc.mjs` via fx-autoconfig | a `.sys.mjs` imported from `browser/base/content/browser.js`, or a `browser-before-ui-startup` startup-category entry |
| **Prefs** | profile prefs / AutoConfig `config.js` | `browser/app/profile/firefox.js` (and `modules/libpref/init/StaticPrefList.yaml` for static prefs) |

---

## Option A — Overlay distribution (zero compilation)

Ship the same three ingredients the Linux distros ship, but inside the fork's package:

1. **`defaults/pref/autoconfig.js`** in the install dir (LF endings, must start with a
   comment):
   ```
   // autoconfig loader
   pref("general.config.filename", "config.js");
   pref("general.config.obscure_value", 0);
   ```
2. **`config.js`** at the install-dir root (fx-autoconfig's `program/config.js`, or a merged
   equivalent). It registers `chrome.manifest` overrides and boosts `boot.sys.mjs`, which
   loads `.uc.js` / `.uc.mjs` / `.sys.mjs` from the profile's `chrome/`.
3. **Theme files** in the profile `chrome/` dir (or a `distribution/`-shipped default profile).

**Precedence gotcha:** on Linux, prefer `distribution/defaults/pref/*.js` (packaged into the
install dir) over `defaults/pref` when building a repackage, because `distribution/` is the
sanctioned place for distro-provided defaults and survives profile resets. Verify against your
packager (mach `repackage`/`package`) — `distribution/` is copied to the install root.

**Pros:** no build at all; this is exactly what fx-autoconfig + NixOS already do.
**Cons:** the chrome dir is still user/profile-scoped → still **user origin** → still needs
`!important`. AutoConfig also *disables* the sandbox for `config.js`
(`general.config.sandbox_enabled`) and is a known malware vector; forks like LibreWolf patch
around that.

---

## Option B — Source fork + artifact build (recommended for a real fork)

### B0. Bootstrap (one time)

```bash
git clone https://github.com/mozilla-firefox/firefox   # or hg mozilla-unified
cd firefox
./mach --no-interactive bootstrap --application-choice=browser
```

`.mozconfig`:
```
ac_add_options --enable-artifact-builds
mk_add_options MOZ_OBJDIR=@TOPSRCDIR@/obj-artifact
# optional, speeds repeat builds further:
ac_add_options --with-ccache=sccache
```

`--enable-artifact-builds` downloads prebuilt Gecko binaries and **skips all C++/Rust
compilation**. If you ever *do* need to compile Gecko, you're in a different (slow) mode.

### B1. Bootstrap loop

| Goal | Command |
| --- | --- |
| Rebuild local JS/CSS/assets only (no compile) | `./mach build faster` |
| Normal (still no compile in artifact mode) | `./mach build` |
| Run the built browser | `./mach run` |
| Produce a distributable | `./mach package` |
| Nuke objdir after upstream rebase | `./mach clobber` |

`./mach build faster` is documented as "only builds local JS, CSS and packaged files" — this
is the shortest feedback loop and the answer to "least compilation time".

### B2. Embed the chrome CSS (author origin — wins without `!important`)

Firefox references its chrome sheets from `browser/base/content/browser.xhtml`, e.g.
`chrome://browser/skin/browser.css`. The file on disk is
`browser/themes/{linux,windows,macos}/browser.css` and is already registered in that
directory's `jar.mn`.

**Least-effort embedding (no new files, no `jar.mn` edit):** append the theme's chrome CSS to
`browser/themes/linux/browser.css` (and the `windows`/`macos` siblings). Because it is now
**author-origin** and later in source order, it overrides built-ins without `!important`.

**Cleaner embedding:** add `browser/themes/linux/higgs-theme.css`, register it in
`browser/themes/linux/jar.mn`, and `@import url("chrome://browser/skin/higgs-theme.css");`
at the end of `browser.css`. This keeps the theme diff isolated for easy upstream rebasing.

> Note: the theme's `CSS/chrome/*.css` are currently wrapped in
> `@-moz-document url-prefix(chrome://)` guards. When embedded at author origin those guards
> are still fine, but the `!important` flags can be **dropped** — that is the whole point.

### B3. Embed the content-page CSS

`userContent.css` styles **separate documents** (`about:addons`, `about:config`, new tab,
`about:preferences`, …). In a fork you don't need a user sheet at all — edit the pages' own
built-in stylesheets, which are author origin:

- `about:addons` → `toolkit/chrome/toolkit/content/mozapps/extensions/aboutaddons.css`
- `about:config` → `toolkit/chrome/toolkit/content/global/config.css`
- New tab → `browser/components/newtab/…` (`activity-stream.css`) — *check the current
  path; newtab has moved between `browser/components/newtab` and builtin-addons*
- `about:preferences` → `browser/themes/shared/preferences/*.css` + `browser/components/preferences/*`
- Private browsing / Firefox View → their component dirs

Because these are author origin, the FF157 `#main > addon-list > section` and
`.card-heading-image` fixes become **plain additions** rather than `!important` overrides.

> If you prefer to keep the theme's `CSS/content/*` files as-is, you can append them to the
> corresponding built-in file (same trick as B2) — but note they already contain
> `@-moz-document` guards, which will now be redundant but harmless.

### B4. Embed the JS

The theme's scripts are classic `.uc.js` loaded by fx-autoconfig. Three fork-native options,
least- to most-invasive:

1. **Vendor fx-autoconfig's boot module.** Drop `boot.sys.mjs` (+ `fs.jsm`, `utils.sys.mjs`,
   `uc_api.sys.mjs`) into the tree (e.g. `browser/base/content/userchrome/`), register them in
   `jar.mn`, and import once at startup. `.uc.js` files then load unchanged — the existing
   scripts keep working. Lowest migration cost.
2. **Native `.sys.mjs` port.** Convert each `.uc.js` to an ES module under
   `browser/base/content/` and import it from `browser/base/content/browser.js`, or register it
   via the startup category system (`browser-window-domcontentloaded`,
   `browser-before-ui-startup`, etc. — see `Browser Startup` docs). Cleanest long-term, most work.
3. **Legacy `loadSubScript`.** In `browser.js`:
   `Services.scriptloader.loadSubScript("chrome://browser/content/higgs/bootstrap.uc.js", this);`
   Fast hack; runs once per browser window.

For scripts that must run **before** the first window, use the `browser-before-ui-startup`
startup category (sparingly — it delays startup).

### B5. Embed the prefs

Move the AutoConfig `pref()` lines into `browser/app/profile/firefox.js` (defaults) or a
fork-owned file registered there. Static/compile-time prefs go in
`modules/libpref/init/StaticPrefList.yaml`. This removes the AutoConfig dependency entirely
(and the sandbox caveat).

---

## Comparison (seamlessness × compile time)

| Method | Compile cost | Origin of CSS | `!important` needed? | Upstream rebase cost |
| --- | --- | --- | --- | --- |
| Profile `chrome/` + `toolkit.legacyUserProfileCustomizations` | 0 | user | **yes** | n/a |
| AutoConfig + `config.js` (current NixOS) | 0 | user | **yes** | n/a |
| Built-in static theme (`browser/themes/addons/*`) | 0 | author | n/a | none — **but colors only** |
| **Append `@import` to `browser.css`, artifact build** | **~0** (`mach build faster`) | **author** | **no** | small (1 line + 1 file) |
| Patch built-in page sheets, artifact build | ~0 | author | **no** | medium (edits inside upstream files) |
| `.sys.mjs` JS port, artifact build | ~0 | n/a | n/a | medium |
| Full source fork (Zen/Floorp style) | heavy (C++/Rust) | author | no | high (large patch stack) |

---

## What real forks do (evidence)

- **LibreWolf** — patch stack (`codeberg.org/librewolf/source`, ~40 patches) + a
  `librewolf.cfg` AutoConfig file + `defaults/pref` prefs. Theming/behavior is layered as
  patches over upstream; the `.cfg` handles prefs. **Overlay + thin patches, no bespoke UI
  framework.**
- **Zen Browser** — full source fork (`zen-browser/desktop`, ~44k★), C++/JS, custom
  `zen/` patch layer, ships "Zen Mods" (CSS) and "Zen Themes". Built with **Surfer**
  (`zen-browser/surfer`). Heavy build; the opposite of "least compilation".
- **Floorp** — 5-layer fork: patched Gecko + ESM modules + Vite/SolidJS chrome + React pages,
  built with `feles-build`. Notably ships a **built-in userChromeCSS loader**, i.e. it keeps the
  overlay path available *inside* the fork.
- **Midori (Astian)** — Firefox fork built with **Amelia** (`@goastian/amelia`), a TypeScript
  wrapper over `mach`; source-fetch + branding patches + multi-platform package. The
  `patches.sh` + template pattern is the closest prior art to "layer this theme onto upstream
  via `mach`".
- **fx-autoconfig / xiaoxiaoflood / benzBrake loaders** — the ecosystem of *runtime* loaders.
  These are what you'd vendor (B4 option 1) if you don't want to port scripts to `.sys.mjs`.

---

## Pitfalls / maintenance notes

1. **`jar.mn` is mandatory for new files.** Anything not registered in a `jar.mn` under a
   `JAR_MANIFESTS` dir will not be packaged into `omni.ja`. Appending to an existing,
   already-registered file avoids this entirely.
2. **Don't hand-edit `omni.ja`.** It's a preprocessed jar; edit the source tree and let
   `mach` repack. (`unzip` reads it with a "extra bytes" warning; do not write it back.)
3. **Author-origin CSS still loses to `!important`.** Firefox's built-ins occasionally use
   `!important` (e.g. `*|*[hidden] { display: none !important }`). Rare, but budget for it.
4. **Nova / redesign flags.** Many FF157+ layout changes are gated behind
   `@media -moz-pref("browser.nova.enabled")` or `browser.nova.enabled`. In a fork you control
   the default; decide whether to pin `browser.nova.enabled=false` to freeze the old UI.
5. **Upstream rebase.** Prefer additive files (`higgs-theme.css` + a 1-line `@import`) over
   edits *inside* upstream files; the latter conflicts on every merge.
6. **Signing/updates/channel.** A real fork needs `browser/branding/`, an update channel, and
   signing. Out of scope for theming but blocks "shippable".
7. **AutoConfig caveats (Option A).** `config.js` runs unsandboxed and is a malware vector;
   forks that keep it either lock it down or replace it with a compiled-in loader (Option B4).
8. **`mach build faster` scope.** It only rebuilds local JS/CSS/packaged files. C++/Rust edits
   require artifact-mode to be dropped and a real build.

---

## Decision

- **If the goal is "my machine, ship nothing":** stay on the current NixOS AutoConfig overlay
  (Option A). It already works; the only cost is the `!important` layer.
- **If the goal is "a distributable fork where the theme is intrinsic":** use **Option B with
  artifact builds** — append `@import`'d author CSS to `browser.css`, patch the target
  `about:*` sheets, port/vendor the JS as `.sys.mjs` or vendored loader, and move prefs into
  `firefox.js`. `./mach build faster` makes iteration essentially free, and author-origin CSS
  removes the entire `!important` problem class.
