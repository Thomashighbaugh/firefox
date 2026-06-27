# fx-autoconfig — Firefox UserChrome.js Manager

**Source:** https://github.com/MrOtherGuy/fx-autoconfig
**Version:** 0.10.15 (boot.sys.mjs)
**License:** MPL-2.0
**Author:** MrOtherGuy
**Stars:** 434 | **Forks:** 27
**Harvested:** 2026-06-19

## NixOS Integration Note

**NixOS handles all installation.** Both the fx-autoconfig program files (`config.js`, `config-prefs.js`) and the profile directory contents (`chrome/utils/boot.sys.mjs`, `chrome/utils/fs.sys.mjs`, `chrome/utils/utils.sys.mjs`, `chrome/utils/uc_api.sys.mjs`, `chrome/utils/chrome.manifest`) are provisioned declaratively via the NixOS config. This project **only** provides the content that goes into the `chrome/JS/`, `chrome/CSS/`, and `chrome/resources/` subdirectories (the user scripts, styles, and assets). Never install or manage fx-autoconfig or the profile chrome directory yourself — Nix does all of that.

## Overview

fx-autoconfig is a toolkit that loads arbitrary JavaScript files in Firefox browser context via Firefox's built-in autoconfig functionality. It is the backbone of the Higgs Boson Firefox Theme (this project), enabling `.uc.js`, `.uc.mjs`, `.sys.mjs`, and `.uc.css` file loading.

## Architecture

### Two-Part Installation

1. **Program files** (`program/config.js` + `defaults/pref/config-prefs.js`) — go into the Firefox binary installation directory. Tells Firefox to load `boot.sys.mjs` from the profile's `chrome/utils/` directory. Affects ALL profiles using that Firefox executable.

2. **Profile files** (`profile/chrome/`) — go into the Firefox profile directory:
   - `chrome/utils/boot.sys.mjs` — The main loader module
   - `chrome/utils/utils.sys.mjs` — Collection of helper functions
   - `chrome/utils/fs.sys.mjs` — File system operations
   - `chrome/utils/uc_api.sys.mjs` — Public API for scripts (new in 0.10.0)
   - `chrome/utils/chrome.manifest` — Registers chrome:// protocol paths
   - `chrome/JS/` — User scripts directory
   - `chrome/CSS/` — User style sheets directory
   - `chrome/resources/` — Static assets directory

### Chrome URI Registration (from chrome.manifest)

| Chrome URI | File System Path |
|---|---|
| `chrome://userchromejs/content/` | `chrome/utils/` |
| `chrome://userscripts/content/` | `chrome/JS/` |
| `chrome://userchrome/content/` | `chrome/resources/` |
| `chrome://userstyles/skin/` | `chrome/CSS/` |

## Script Types

| Extension | Type | Scope | When It Runs |
|---|---|---|---|
| `.uc.js` | Classic script (legacy) | Per-window, synchronous | `DOMContentLoaded` of each window |
| `.uc.mjs` | ES6 module script (new in 0.8) | Per-window, async module | `DOMContentLoaded` via `module_loader.mjs` |
| `.sys.mjs` | Background module | Global, one-time | At startup, before any window exists |
| `.uc.css` | Style sheet (new in 0.8.5) | Per-window or global | Author or Agent mode |

## Script Loading Lifecycle

1. `config.js` (program) → Firefox autoconfig → loads `boot.sys.mjs` from profile
2. `boot.sys.mjs` `init()` scans `JS/` dir for `.uc.js`, `.uc.mjs`, `.sys.mjs` files
3. `.sys.mjs` files → `ChromeUtils.importESModule()` immediately (background)
4. `.uc.css` files → `sss.loadAndRegisterSheet()` for agent mode, `preloadSheet()` for author
5. `boot.sys.mjs` observes `domwindowopened` → listens for `DOMContentLoaded`
6. On `DOMContentLoaded`: injects `.uc.js` via `loadSubScriptWithOptions()`, loads `.uc.mjs` via `module_loader.mjs`, injects author styles via `addSheet()`

## UserScript Headers

Every script file must start with a `// ==UserScript==` block:

```
// ==UserScript==
// @name           My Script
// @description    What this does
// @author         YourName
// @version        1.0
// @include        main
// @exclude        chrome://browser/content/places/places.xhtml
// @loadOrder      5
// @onlyonce
// @ignorecache
// @backgroundmodule    (deprecated in 0.10.0, use .sys.mjs instead)
// @startup        objName   (deprecated in 0.10.0)
// @stylemode      agent_sheet   (styles only)
// @usefileuri                 (styles only)
// @long-description
// @WindowActor    ActorName      (experimental, requires pref)
// @WindowActorMatches ["about:newtab"]  (experimental)
// ==/UserScript==
```

### Key Headers

| Header | Purpose | Default |
|---|---|---|
| `@include` | Target document URL pattern | `main` (browser.xhtml) |
| `@exclude` | Exclude document URL pattern | none |
| `@loadOrder` | Injection priority (0-∞) | `10` |
| `@onlyonce` | Execute only in first matching window | false |
| `@ignorecache` | Always read from disk (dev only) | false |
| `@stylemode` | `author_sheet` or `agent_sheet` (CSS only) | `author_sheet` |
| `@backgroundmodule` | Load as background module (.uc.js only, deprecated) | false |
| `@WindowActor` | Name for experimental JS Window Actor | null |
| `@WindowActorMatches` | URL patterns for actor (requires @WindowActor) | null |

**Include patterns:**
- `main` → `chrome://browser/content/browser.xhtml` (Firefox) or `chrome://messenger/content/messenger.xhtml` (Thunderbird)
- `*` → any document
- Specific chrome URLs → e.g., `chrome://browser/content/places/places.xhtml`

## UC_API Reference

The `UC_API` namespace is available on all window objects and can be imported in module scripts via:
```js
import * as UC_API from "chrome://userchromejs/content/uc_api.sys.mjs";
```

### Namespaces

| Namespace | Purpose |
|---|---|
| `UC_API.FileSystem` | File I/O — read/write files, directory listing |
| `UC_API.Hotkeys` | Keyboard shortcut registration |
| `UC_API.Notifications` | Browser notification bar (not OS notifications) |
| `UC_API.Prefs` | Read/write Firefox preferences |
| `UC_API.Runtime` | Browser/loader info, restart, startup promises |
| `UC_API.Scripts` | Script metadata, toggle, reload styles |
| `UC_API.SharedStorage` | In-memory cross-script data sharing |
| `UC_API.Utils` | DOM helpers (createElement, createWidget, loadURI) |
| `UC_API.Windows` | Window iteration, lifecycle callbacks |
| `UC_API.Experimental.WindowActors` | IPC with child processes (requires pref) |

### FileSystem API

```js
// Result types: RESULT_FILE, RESULT_DIRECTORY, RESULT_ERROR, RESULT_CONTENT
let result = UC_API.FileSystem.getEntry("myfile.txt");
result.isFile() / isDirectory() / isError() / isContent()
result.content()     // string (CONTENT type)
result.entry()       // nsIFile (FILE/DIRECTORY type)
result.read()        // Promise<string> (async read, FILE type)
result.readSync()    // string (sync read, FILE type)
result.fileURI       // string path
result.entries()     // iterator over nsIFile (DIRECTORY type)
result.showInFileManager()

// Static methods
UC_API.FileSystem.readFile("name")        // Promise<FileSystemResult>
UC_API.FileSystem.readFileSync("name")    // FileSystemResult
UC_API.FileSystem.readJSON("name")        // Promise<Object|null>
UC_API.FileSystem.writeFile("name",content) // Promise<bytes>
UC_API.FileSystem.chromeDir()             // FileSystemResult
UC_API.FileSystem.IO.readUTF8(path)       // proxied IOUtils (auto-prefixed to resources/)
```

### Hotkeys API

```js
let hotkey = UC_API.Hotkeys.define({
  id: "myHotkey",
  modifiers: "ctrl shift",
  key: "G",
  command: (window, event) => { /* ... */ }
});
hotkey.autoAttach({suppressOriginal: true});  // adds to all windows
hotkey.attachToWindow(window);                // adds to specific window
hotkey.suppressOriginalKey(window);           // disables built-in key
```

### Prefs API

```js
UC_API.Prefs.set("pref.name", "value");   // set pref (type-safe)
let pref = UC_API.Prefs.get("pref.name"); // Pref object
pref.value       // current value (or null)
pref.exists()    // boolean
pref.hasUserValue()
pref.reset()
pref.type        // "string"|"boolean"|"number"|"invalid"

// Listen for pref changes
let listener = UC_API.Prefs.addListener("prefPrefix", callback);
UC_API.Prefs.removeListener(listener);
```

### Windows API

```js
UC_API.Windows.getAll(onlyBrowsers)           // Array<Window>
UC_API.Windows.forEach(callback, onlyBrowsers) // iterate
UC_API.Windows.getLastFocused(windowType)     // Window
UC_API.Windows.isBrowserWindow(window)        // boolean
UC_API.Windows.onCreated(callback)            // window lifecycle
UC_API.Windows.waitWindowLoading(window)      // Promise
```

### Runtime API

```js
UC_API.Runtime.appVariant         // "Firefox" | "Thunderbird"
UC_API.Runtime.brandName          // "Firefox Nightly" etc.
UC_API.Runtime.loaderVersion      // version string from boot.sys.mjs
UC_API.Runtime.restart(clearCache) // restart browser
UC_API.Runtime.startupFinished()  // Promise — resolves after all windows restored
```

### SharedStorage API

```js
UC_API.SharedStorage.MyData = value;   // set
UC_API.SharedStorage.MyData === value; // get
UC_API.SharedStorage.clear();          // clear all
UC_API.SharedStorage.onChanged.addListener(callback); // watch changes
```

### Utils API

```js
UC_API.Utils.createElement(document, "menuitem", {id:"x",label:"y"}) // XUL element
UC_API.Utils.createWidget({id:"mybtn", type:"toolbarbutton", label:"Click", callback: fn})
UC_API.Utils.escapeXUL(string)     // escape XUL markup
UC_API.Utils.loadURI(window, {url:"about:config", where:"tab"})  // navigate
```

## Key Preferences

| Pref | Type | Default | Purpose |
|---|---|---|---|
| `userChromeJS.enabled` | bool | true | Master toggle for all scripts |
| `userChromeJS.scriptsDisabled` | string | "" | Comma-separated list of disabled script filenames |
| `userChromeJS.persistent_domcontent_callback` | bool | false | Inject scripts into sub-documents too |
| `userChromeJS.gBrowser_hack.enabled` | bool | false | Enable gBrowser workaround for broken startup |
| `userChromeJS.gBrowser_hack.required` | bool | false | Set by loader when startup was broken |
| `userChromeJS.allowUnsafeWrites` | bool | false | Allow FileSystem.writeFile outside resources/ |
| `userChromeJS.experimental.enabled` | bool | false | Enable WindowActors and experimental features |
| `userChromeJS.firstRunShown` | bool | — | Set after first-run notification shown |
| `userChromeJS.updates.update-check.enabled` | bool | false | Auto-check for loader updates |

## Important Notes for Script Development

1. **gBrowser availability**: `gBrowser` may not exist at script execution time. Use `UC_API.Runtime.startupFinished().then(...)` or the `_gBrowser` fallback. If startup breaks, set `userChromeJS.gBrowser_hack.enabled` to `true`.

2. **Caching**: Scripts are cached in Firefox's startup cache. Changes to `.uc.js` files won't take effect in new windows unless you clear startup cache (via `about:support` → "Clear startup cache" button, or delete `StartupCache/` folder in the profile's local directory). Use `@ignorecache` during development (requires one cache clear first).

3. **Chrome URI filenames**: Must start with `[a-zA-Z0-9]` due to `chrome://` URI normalization.

4. **Module import caveat**: Importing `uc_api.sys.mjs` via `import` gives a DIFFERENT instance than `window.UC_API`. Use `ChromeUtils.importESModule()` to get the initialized API when importing from `.uc.mjs` modules.

5. **No build system**: Files are loaded directly by Firefox — no bundler, transpiler, or task runner needed.

6. **Testing**: Manual — restart Firefox (or use the "Restart" button added by boot.sys.mjs to Tools > userScripts menu).

## NixOS Declares Everything

**This project never installs fx-autoconfig or manages profile files.** NixOS handles both:

1. **Program files** (`config.js` + `config-prefs.js`) — injected via `programs.firefox.autoConfig` in the NixOS config.
2. **Profile directory** (`chrome/utils/*`) — provisioned by the NixOS module that deploys this repository into `~/.mozilla/firefox/*.default-release/chrome/`.

Reference NixOS config:
```nix
programs.firefox = {
  enable = true;
  # fx-autoconfig program files
  autoConfig = builtins.readFile (builtins.fetchurl {
    url = "https://raw.githubusercontent.com/MrOtherGuy/fx-autoconfig/master/program/config.js";
    sha256 = "1mx679fbc4d9x4bnqajqx5a95y1lfasvf90pbqkh9sm3ch945p40";
  });
};
```

## What This Project Provides (Only)

This repository provides content for the three subdirectories that Nix copies into the Firefox profile's `chrome/` directory:

| Dir | This Project's Source | Purpose |
|---|---|---|
| `chrome/JS/` | `./JS/` | User scripts (.uc.js, .uc.mjs) and second sidebar framework |
| `chrome/CSS/` | `./CSS/` | Style sheets (.uc.css) |
| `chrome/resources/` | `./resources/` | Static assets (icons, wallpapers, textures) |
| `chrome/utils/` | — | **Managed by Nix** — never touch fx-autoconfig files here |
| `userChrome.css` | `./userChrome.css` | Standard Firefox UI CSS (root of chrome/) |
| `userContent.css` | `./userContent.css` | Standard Firefox content CSS (root of chrome/) |

## Related Files in This Project

- All `JS/*.uc.js` files — Standalone enhancement scripts
- `JS/second_sidebar.uc.mjs` — Main entry for second sidebar framework (ES6 module)
- `CSS/*.uc.css` — Style sheets loaded by fx-autoconfig
- `userChrome.css` — Standard Firefox userChrome.css (NOT loaded by fx-autoconfig loader)
- `userContent.css` — Standard Firefox userContent.css (NOT loaded by fx-autoconfig loader)