---
title: "13 — Implementing a Gjoa-style Lane 1 dev loop for this theme"
type: research
tags: [lane1, dev-loop, hotreload, loader, gjoa, source-fork, chrome-bundle]
created: 2026-10-12
updated: 2026-10-12
---

# 13 — Implementing a "Lane 1" dev loop (≈1 s, no rebuild)

What Gjoa's **Lane 1** actually is, and what the Higgs Boson equivalent would look like.
Read with [12-special-attention.md](12-special-attention.md) §12.3.

---

## 13.1 What Lane 1 actually is (from Gjoa's source)

Gjoa's own words: *"Lane 1 = chrome Beagle/CSS, no rebuild, seconds."* The mechanism has four parts:

1. **A loader baked once into `omni.ja`.**
   `src/gjoa/browser/components/gjoa/GjoaLoader.bjs` → `GjoaLoader.sys.mjs`, registered by
   `patches/0001-…mozbuild-include-gjoa.patch` (`DIRS += ["gjoa"]`) and imported from
   `BrowserGlue.sys.mjs` by `patches/0002-browser-glue-import-gjoa-loader.patch`.
   The loader runs at app-startup and injects chrome scripts/styles.

2. **A writable dev directory next to the binary.**
   The loader looks for `<install_root>/gjoa-dev/` (holding `JS/` and `CSS/`). If present, it loads
   from there; otherwise it falls back to the baked `chrome://gjoa/content/…`. The install root here
   is the **mach objdir** (`engine/obj-x86_64-pc-linux-gnu/dist/bin/`) — writable, unlike nix's
   sealed `/nix/store` `omni.ja`.

3. **`gjoa sync` = build the bundle + symlink it in.**
   - `chrome:dist` → compiles `src/gjoa/chrome/bjs/**/*.bjs` → `dist/chrome/JS/*.uc.js`, stages
     `src/gjoa/chrome/css/*` → `dist/chrome/CSS/`, writes a **stamp file**.
   - `chrome:install` → `rm` + `symlink dist/chrome → <objdir>/dist/bin/gjoa-dev`
     (symlink, not copy, so later `chrome:dist` alone updates the running install), plus refreshes
     loose `src/gjoa/toolkit/` overlays and recompiles the loader if stale.
   - The loader **watches the stamp file** and hot-reloads the running chrome when it changes
     ("never stale by construction").

4. **`gjoa hotreload` = relaunch the mach binary** with `GJOA_DEV_LOADER=1` (~1 s). `gjoa watch` =
   `bun --watch` rebundle-on-save.

So "no rebuild" = **the content is never baked into `omni.ja`; only the tiny loader is.** Production
flips to the baked `chrome://gjoa/content/` path automatically.

---

## 13.2 The Higgs equivalent

The theme already has a zero-build loop — but it's the *profile* path
(`~/.mozilla/firefox/<p>/chrome` → this repo, `toolkit.legacyUserProfileCustomizations`). That loop
is **user origin** (needs `!important`) and needs AutoConfig for the JS. Lane 1 replaces it with:

```
                     ┌─────────────────────────────────────────────┐
  edit ──► higgs sync │  dist/chrome/{JS,CSS,resources}              │
                     │   └─ symlink ─► <objdir>/dist/bin/higgs-dev/ │  (writable)
                     └─────────────────────────────────────────────┘
                                        │  read at startup (dev mode)
                                        ▼
     HiggsLoader.sys.mjs  (baked once into omni.ja via a patch)  ──► browser chrome
                                        │
                              higgs hotreload  (relaunch mach binary, ~1 s)
```

The **only new Firefox code** is a small loader; everything else is the theme as-is.

---

## 13.3 Concrete artifacts to create

### (a) The loader — `src/browser/components/higgs/HiggsLoader.sys.mjs`

Adapts fx-autoconfig's `boot.sys.mjs` idea, but reads a **dev dir** and registers author/agent CSS.
Sketched behaviour:

```js
// runs once at startup (registered from BrowserGlue) + per window
const DEV = PathUtils.join(Services.dirsvc.get("XREExeF", Ci.nsIFile).path, "..", "higgs-dev");
const loadFrom = (await IOUtils.exists(DEV)) ? DEV : "chrome://higgs/content";

// per browser window: inject JS, honour the theme's @include/@onlyonce headers
Services.obs.addObserver(win => {
  if (win.location.href !== "chrome://browser/content/browser.xhtml") return;
  for (const { url, onlyonce } of scriptsIn(loadFrom)) {
    Services.scriptloader.loadSubScript(url, onlyonce ? { window: win } : win);
  }
  for (const css of cssIn(loadFrom)) {
    const uri = Services.io.newURI(css);
    if (!sss.sheetRegistered(uri, sss.AGENT_SHEET)) sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);
  }
}, "domwindowopened");
```

- Register `chrome://higgs/` via `jar.mn` (`% content higgs %content/higgs/`) so the production path
  works; dev path bypasses it.
- Keep the theme's `// ==UserScript==` headers (the loader parses `@include`, `@onlyonce`) — so the
  18 `.uc.js` run **unchanged**.
- CSS: register as `AGENT_SHEET`/`USER_SHEET` at runtime (still user origin) **or** — better — for the
  *baked* path append to `browser.css` (author origin). For the *dev* path you accept agent/user
  origin + `!important`; the bake is the release.

### (b) Two patches (Lane 2, applied once)

```diff
# patches/0001-browser-components-mozbuild-include-higgs.patch
 DIRS += [
     …
 ]
+DIRS += ["higgs"]
```

```diff
# patches/0002-browser-glue-import-higgs-loader.patch
   setTimeout: "resource://gre/modules/Timer.sys.mjs",
+  HiggsLoader: "resource:///modules/HiggsLoader.sys.mjs",
```
…and a call to `lazy.HiggsLoader.init()` in `_beforeUIStartup()`.

Plus `src/browser/components/higgs/moz.build` and `jar.mn` (mirror Midori/Gjoa).

### (c) The CLI — `bin/higgs` (bash or bun, ~100 lines)

```bash
#!/usr/bin/env bash
# higgs — Lane 1 dev loop for the Higgs Boson theme
REPO=$(cd "$(dirname "$0")/.." && pwd)
OBJ="$REPO/engine/obj-x86_64-pc-linux-gnu/dist/bin"
BIN="$OBJ/higgs"          # or firefox
case "${1:-}" in
  sync)
    rm -rf "$REPO/dist/chrome"; mkdir -p "$REPO/dist/chrome"/{JS,CSS,resources}
    cat "$REPO"/JS/*.uc.js > "$REPO/dist/chrome/JS/higgs.uc.js"   # or concat per-file
    cp -r "$REPO"/CSS/*   "$REPO/dist/chrome/CSS/"
    cp -r "$REPO"/resources/* "$REPO/dist/chrome/resources/"
    date +%s%N > "$REPO/dist/chrome/.stamp"                        # loader watches this
    rm -rf "$OBJ/higgs-dev"; ln -s "$REPO/dist/chrome" "$OBJ/higgs-dev"
    echo "✓ synced ($(du -sh "$REPO/dist/chrome" | cut -f1))" ;;
  hotreload) HIGGS_DEV_LOADER=1 exec "$BIN" "$@" ;;               # relaunch, ~1 s
  watch)  while inotifywait -rq -e modify,create,delete "$REPO/JS" "$REPO/CSS"; do "$0" sync; done ;;
  build)  (cd "$REPO/engine" && ./mach build faster) ;;           # Lane 2
  *) echo "usage: higgs {sync|hotreload|watch|build}"; exit 1 ;;
esac
```

### (d) One-time bake

```bash
# in the fork checkout
./mach bootstrap && ./mach build          # bakes HiggsLoader into omni.ja (Lane 3, hours)
# thereafter:
higgs sync && higgs hotreload             # Lane 1 (~1 s)
```

---

## 13.4 The resulting dev loop

| | Current (NixOS profile overlay) | Lane 1 (source fork) |
| - | ------------------------------- | -------------------- |
| Edit CSS/JS → see it | restart Firefox | `higgs sync` + `higgs hotreload` (~1 s) |
| CSS origin | **user** → `!important` everywhere | dev = user/agent; **baked = author** |
| JS loader | AutoConfig in install dir (system principal) | baked loader reading a dev dir |
| Firefox rebuild needed | never | **never** for chrome JS/CSS (only for the one-time loader bake) |
| Hot-swap | no | CSS can live-reload (stamp watcher); JS on window reload/relaunch |

---

## 13.5 What Lane 1 can and cannot touch

**Can (no rebuild):** the theme's `JS/*.uc.js`, `CSS/chrome/*`, `CSS/common/*`, `CSS/content/*`
(staged as files), `resources/*` **if** the loader/`chrome.manifest` can point at the dev dir.

**Cannot (Lane 2, `mach build faster` ~30 s):** anything baked into `omni.ja` — prefs
(`firefox.js`), `jar.mn` changes, `chrome.manifest` registrations, the loader itself, branding.

**Cannot (Lane 3, full build):** C++/Rust, `moz.build` structure, version bumps.

**Hard part for this theme:** `resources/second-sidebar/` is **ES modules loaded via `chrome://`**
(100+ `.mjs`, `utils/chrome.manifest`). ESM import caches + chrome registration don't hot-swap
cleanly. Recommendation: **bake `resources/second-sidebar/` into `omni.ja` (Lane 2)** and keep only
`JS/*.uc.js` + `CSS/*` in the Lane 1 dev dir. The second sidebar changes rarely; the chrome CSS/JS
changes constantly — put the fast-changing parts in Lane 1, the stable subsystem in Lane 2.

---

## 13.6 Security (don't skip this)

Lane 1 moves the loader from an **install-dir AutoConfig** (system principal, user-writable install
root) to a **baked loader reading `<install_root>/higgs-dev/`**:

- Gate dev mode behind an **env var** (`HIGGS_DEV_LOADER=1`) exactly like Gjoa's `GJOA_DEV_LOADER`,
  so a production install can't accidentally load a dev dir.
- In production the install root is root-owned, so only root can create `higgs-dev/` — same trust
  boundary Gjoa documents.
- If you keep any loader, adopt **Palefox's hash-pinning** (`firefox-pin.json` + a generated
  bootstrap) so a local write can't silently change what the loader executes (see §12.2).
- This is strictly **less** surface than the current setup: no AutoConfig, no
  `general.config.sandbox_enabled` flip, no profile `chrome/`.

---

## 13.7 Effort

| Piece | Size |
| ----- | ---- |
| `HiggsLoader.sys.mjs` (adapt fx-autoconfig `boot.sys.mjs`) | ~150–250 lines |
| 2 patches (`moz.build` DIRS + `BrowserGlue` import) + `moz.build` + `jar.mn` | small |
| `bin/higgs` CLI | ~100 lines |
| One-time `mach build` to bake the loader | hours (one-off) |
| Theme changes | **none** — `JS/*.uc.js` + `CSS/*` run as-is |

Net: a few hundred lines of new Firefox-adjacent code and one long build, after which the theme's
edit→see loop is ~1 second and the CSS is author-origin in release. That is the concrete shape of
"implementing Lane 1" for this repo.

## Sources

`gh api` reads of `tompassarelli/gjoa`: `bin/gjoa`, `tools/chrome-bundle/{dist,install}.bjs`,
`tools/dev-loop/detach.sh`, `package.json` (`chrome:dist`/`chrome:install`/`chrome:watch`), `gjoa.json`,
`docs/daily-loop.md`, `docs/ARCHITECTURE.md`, `patches/0001-…`/`0002-…`; plus
[12-special-attention.md](12-special-attention.md) and [04-js-injection-and-startup.md](04-js-injection-and-startup.md).
