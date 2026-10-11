---
title: "04 — JS injection & startup"
type: research
tags: [firefox-fork, javascript, startup, actors, fx-autoconfig, esm]
created: 2026-10-11
updated: 2026-10-11
---

# 04 — JS injection & startup

Firefox removed native `userChrome.js` long ago. Every "userChrome.js" solution is a loader layered
on one of the mechanisms below. For a fork, pick the least-invasive one that covers the theme.

## 4.1 Rule zero

Mozilla's own guidance: *"The first rule of running code during startup is: don't."* Prefer lazy
initialisation. If you must run at startup, register a **category manager entry** in
`browser/components/BrowserComponents.manifest`.

## 4.2 Startup categories (full list, in fire)

**Per-application** (once):
`browser-before-ui-startup` (avoid — delays first paint) · `browser-first-window-ready` ·
`browser-idle-startup` (**preferred**) · `browser-best-effort-idle-startup` (may not run at all).

**Per-window** (each browser window):
`browser-window-before-initial-xul-layout-document-preparation` ·
`browser-window-before-initial-xul-layout` · `browser-window-domcontentloaded-before-tabbrowser` ·
`browser-window-domcontentloaded-tabbrowser` (**internal**) · `browser-window-domcontentloaded`
(**preferred**) · `browser-window-load-before-sessionstore-init` · `browser-window-load` ·
`browser-window-delayed-startup` · `browser-window-sessionstore-initialized` ·
`browser-window-idle-tasks` · `browser-window-location-change` · `browser-window-unload-begin` ·
`browser-window-unload` (**preferred for teardown**) · `browser-window-unload-delayed-startup` ·
`browser-window-unload-tabbrowser` (**internal**) · `browser-window-final-unload`.

Other hooks: `sessionstore-windows-restored` observer, `BrowserGlue._onWindowsRestored`.

## 4.3 Loading mechanisms

```js
// classic script, synchronous, into a global
Services.scriptloader.loadSubScript("chrome://browser/content/higgs/bootstrap.uc.js", this);

// async compile + execute
const s = await ChromeUtils.compileScript("resource://…/thing.js");
s.executeInGlobal(targetGlobal);

// ESM (preferred modern import)
const { Utils } = ChromeUtils.importESModule("resource://…/mod.sys.mjs");
ChromeUtils.defineESModuleGetters(lazy, { Foo: "resource://…/foo.sys.mjs" });
```

`browser/base/content/browser.js` (or a `.sys.mjs` it imports) is the usual place to bootstrap a
loader once per window. Window actors (`ChromeUtils.registerWindowActor`) are the structured way to
run code in each window and in content processes.

## 4.4 fx-autoconfig (what this theme uses today)

Relies on **AutoConfig** (see §05), not a build change.

`program/` (goes in the **install dir**, next to the binary):
- `config.js` — the AutoConfig entry; registers `chrome.manifest` overrides and starts the loader.
- `defaults/pref/config-prefs.js` — sets `general.config.filename` etc.
- `chrome.manifest` — maps `chrome://userscripts/…` etc.
- `boot.sys.mjs` — the loader (sync, once at startup); watches for windows.
- `fs.jsm`, `utils.sys.mjs`, `uc_api.sys.mjs` — helpers (`UC_API` is the supported script interface;
  `_ucUtils` is deprecated since 0.10.0).

`profile/chrome/` holds the scripts:
- `<name>.uc.js` — classic; synchronously injected into target documents.
- `<name>.uc.mjs` — loaded as an ES6 module, asynchronously.
- `<name>.sys.mjs` — loaded once at startup in the global context.

Script metadata (`@include main`, `@include chrome://browser/content/places/places.xhtml`, `*` for
any window) selects targets; `main` = `chrome://browser/content/browser.xhtml`.

Agent vs author sheets: the loader can inject **agent** sheets (global) or **author** sheets
(per-document). Note the security warning in the README: anything that can write `boot.sys.mjs` or
add script files gains arbitrary code execution without elevation.

## 4.5 Rival loaders (all AutoConfig-based)

| Loader | Notes |
| ------ | ----- |
| `MrOtherGuy/fx-autoconfig` | the one this theme uses; `UC_API`; `.uc.js`/`.uc.mjs`/`.sys.mjs` |
| `xiaoxiaoflood/firefox-scripts` | `userChrome.jsm`, `xPref.jsm`, `ucUtils`; `_uc`/`xPref` compat |
| `benzBrake/userChrome.js-Loader` | alice0775-derived; bootstrap loader, custom actors, content scripts, ESM, signature bypass; cross-env `UC`/`_uc`/`xPref` |
| `alice0775/userChrome.js` | historical reference environment |
| `Endor8/userChrome.js` | large script collection |

## 4.6 Embedding into a fork — three options

1. **Vendor the loader (lowest migration cost).** Drop `boot.sys.mjs` (+`fs.jsm`, `utils.sys.mjs`,
   `uc_api.sys.mjs`) into e.g. `browser/base/content/userchrome/`, register in `jar.mn`, import once
   at startup. Existing `.uc.js` scripts run unchanged.
2. **Port to `.sys.mjs`** under `browser/base/content/` and import from `browser.js`, or register a
   startup category. Cleanest long-term; the theme's ~18 scripts need rewriting but the module
   system is native.
3. **One-off `loadSubScript`** in `browser.js` for a bootstrap file that then loads the rest. Fast
   hack; runs once per window.

## 4.7 ESMification

Firefox migrated JSM → `.sys.mjs` ES modules (`ChromeUtils.importESModule` / `defineESModuleGetters`),
with a compatibility shim that auto-redirects old `.jsm` imports; `./mach esmify` helps convert.
Most modern loaders expose `UC_API` precisely because the old `_uc`/`xPref` symbols were removed.
Plan the fork's JS on `.sys.mjs`, not `_uc`.

## Sources

firefox-source-docs `browser/BrowserStartup`, `jsloader/jsloader-api`, `browser/CategoryManagerIndirection`;
MrOtherGuy/fx-autoconfig README; xiaoxiaoflood/firefox-scripts; benzBrake/userChrome.js-Loader; context
`research/firefox-esmification`.
