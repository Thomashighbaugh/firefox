---
title: "01 — Build system & artifact builds"
type: research
tags: [firefox-fork, mach, mozconfig, artifact-build, incremental]
created: 2026-10-11
updated: 2026-10-11
---

# 01 — Build system & artifact builds

## 1.1 Getting the source

| Repo | Notes |
| ---- | ----- |
| `hg clone https://hg.mozilla.org/mozilla-unified` | Canonical. Mercurial with gecko-dev history. Needed for full builds and for `git-cinnabar`. |
| `git clone https://github.com/mozilla-firefox/firefox` | Official GitHub mirror (read-only, `main`). |
| `git clone` + **git-cinnabar** | Required for **artifact builds from git**. Artifact builds are only supported for Mercurial clones *or* git clones made with git-cinnabar. |

```bash
# one-time
./mach --no-interactive bootstrap --application-choice=browser
#   → choose "Firefox for Desktop Artifact Mode" if you are NOT touching C++/Rust
```

Bootstrap installs toolchains into `~/.mozbuild` (`$MOZBUILD_STATE_PATH`).

## 1.2 mozconfig

`mozconfig` lives at the top of the source tree (or `~/.mozconfig` / `$MOZCONFIG`). Two directive
kinds:

- `ac_add_options …` → passed to **configure** (`--enable-*`, `--disable-*`, `--with-*`).
- `mk_add_options …` → passed to the **build backend** (`MOZ_OBJDIR`, `AUTOCLOBBER`).

### Artifact-mode mozconfig (the "least compilation time" answer)

```
# object dir
mk_add_options MOZ_OBJDIR=@TOPSRCDIR@/obj-artifact

# download prebuilt Gecko instead of compiling it
ac_add_options --enable-artifact-builds

# optional: debug artifacts + symbols
# ac_add_options --enable-debug
# ac_add_options --enable-artifact-build-symbols

# rebuild automatically after upstream pulls break the objdir
# mk_add_options AUTOCLOBBER=1
```

Artifact mode = two parts: `--disable-compile-environment` + the `mach artifact` command that
downloads/caches. The cache is `$MOZBUILD_STATE_PATH/package-frontend` (usually
`~/.mozbuild/package-frontend`).

## 1.3 What artifact mode CAN and CANNOT change

**Supported** (rebuild with `./mach build faster`, no compiler):

- JavaScript, `(X)HTML`, CSS
- string `.properties` and Fluent `.ftl`
- Android Java resources/strings
- `Scalars.yaml` / `Events.yaml` telemetry additions

**Not supported** (require dropping artifact mode and compiling):

- C, C++, or Rust source — "if it's compiled to machine code, it can't be changed"
- `histograms.json` histogram definitions
- WebIDL definitions (even JS-implemented ones) — not *yet*
- Some build-system configuration/definition changes
- Non-desktop/Firefox products (Thunderbird has separate support)

> Consequence for a theme: **everything the theme needs is JS/CSS/HTML/prefs — all artifact-safe.**
> There is no reason to ever compile Gecko for a pure front-end fork.

## 1.4 Commands

| Command | Effect | Cost |
| ------- | ------ | ---- |
| `./mach build faster` | "builds" local JS, CSS and packaged (images/assets) files only | seconds |
| `./mach build` | artifact: fetch/place artifacts + package local files; compiled: full build | seconds (artifact) / minutes–hours (compiled) |
| `./mach build path/to/subdir` | scoped build | seconds |
| `./mach run` | launch the built browser | — |
| `./mach package` | produce a distributable under `obj-*/dist/` | — |
| `./mach clobber` | wipe the objdir | — |
| `./mach configure` | rerun configure (needed for `--disable-compile-environment` tricks) | — |
| `./mach artifact install --verbose` | show/perform artifact download | — |
| `./mach artifact` | query/print the artifact cache | — |
| `./mach build installers-$AB_CD` | single-locale repack installer | — |
| `./mach package-multi-locale --locales de it zh-TW` | multi-locale package | — |
| `./mach repackage <fmt>` | see §06 | — |

`./mach build faster` is explicitly documented as: *"only builds local JS, CSS and packaged
(e.g. images and other asset) files."*

## 1.5 Pinning artifacts

| Env var | Purpose |
| ------- | ------- |
| `MOZ_ARTIFACT_REVISION=<rev>` | only accept artifacts from that revision (preferred; also pulls sibling/test artifacts) |
| `MOZ_ARTIFACT_FILE=/abs/path/firefox.tar.xz` | build against a package you produced with `mach package` |
| `MOZ_ARTIFACT_URL=…` | build against a hosted package |

`MOZ_ARTIFACT_FILE`/`URL` provide only the package — not test artifacts / XPT data.

## 1.6 Compiled builds (only if you must touch C++/Rust)

- Artifact performance knobs: `ac_add_options --with-ccache=sccache`, `export RUSTC_WRAPPER=sccache`.
- Unified builds: several `.cpp` are concatenated into `Unified_cpp_*.cpp`; a change recompiles the
  whole unified file, not just your file.
- Incremental link: after recompiling objects you can relink `libxul.so` and repackage — e.g. a
  documented workflow recompiles the 10 unified objects touching `FFmpegVideoDecoder.cpp`, relinks
  `toolkit/library/build`, strips, and rebuilds the `.deb` in ~2 min vs ~3.5 h for a full
  `dpkg-buildpackage`. (Rust and `moz.build` changes always force a full rebuild.)
- `--disable-sandbox` / `--disable-content-sandbox` exist for slimming, but avoid for a shipped fork.

## 1.7 Where a theme's changes land (all artifact-safe)

| Change | Tree location |
| ------ | ------------- |
| chrome CSS | `browser/themes/{linux,windows,macos,shared}/*.css` |
| content-page CSS | the page's own component CSS (e.g. `toolkit/.../mozapps/extensions/aboutaddons.css`) |
| privileged JS | `browser/base/content/*` / `browser/components/*` / a registered `.sys.mjs` |
| prefs | `browser/app/profile/firefox.js`, `modules/libpref/init/StaticPrefList.yaml` |
| built-in theme | `browser/themes/addons/<id>/` |

## Sources

firefox-source-docs: `contributing/build/artifact_builds`, `setup/linux_build`, `mach`, `build/buildsystem/preprocessor`,
`build/buildsystem/locales`; Sky1-Linux/firefox-sky1 incremental-rebuild notes.
