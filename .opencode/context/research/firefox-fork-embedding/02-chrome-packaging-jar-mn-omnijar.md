---
title: "02 — Chrome packaging: jar.mn, moz.build, chrome.manifest, omni.ja"
type: research
tags: [firefox-fork, jar-mn, mozbuild, chrome-manifest, omnijar, chrome-registration]
created: 2026-10-11
updated: 2026-10-11
---

# 02 — Chrome packaging

Everything that ships in the browser UI is packaged into **`omni.ja`** (one in `browser/`, one in
`toolkit/`). `omni.ja` is produced from **JAR manifests (`jar.mn`)**.

## 2.1 jar.mn — shipping files

Declared in `moz.build` via `JAR_MANIFESTS`. Processed when the directory is built. It is run
through the **text preprocessor**; add `#filter substitution` at the top to expand `@VARS@` (e.g.
`@AB_CD@`).

```mn
browser.jar:
  content/browser/thing.js   (thing.js)     # dest (source)
  skin/thing.css                              # same-dir → parentheses/source optional
  * content/browser/preprocessed.js (raw.js)  # '*' → run through preprocessor (#ifdef/#endif)
```

| Feature | Syntax |
| ------- | ------ |
| Heading names the jar | `browser.jar:` |
| dest (source) | `path/in/jar (tree/path)` |
| same-dir omission | source+parens optional |
| absolute source (from tree root) | `content/x.js (dom/x/x.js)` |
| preprocess a file | leading `*` |
| variable substitution | `#filter substitution` + `@VAR@` |
| base path | `[localization] @AB_CD@.jar:` |
| localized source (`%` = en-US by default, else `l10n/<locale>/`) | `toolkit (%toolkit/**/*.ftl)` |
| wildcards | `**/*.ftl`, `alpenglow/*.svg` |
| chrome registration | leading `%`, inside a jar definition |
| extension-style manifest | `USE_EXTENSION_MANIFEST = 1` in `moz.build` → single `chrome.manifest` |

Example (built-in themes registration):

```mn
browser.jar:
  %  resource builtin-themes %content/builtin-themes/
  content/builtin-themes/alpenglow/manifest.json (alpenglow/manifest.json)
```

→ loadable as `resource://builtin-themes/alpenglow/preview.svg`.

**Rule:** a file that is not in a `jar.mn` is not packaged. Appending to an already-registered
file (e.g. `browser.css`) avoids touching `jar.mn` at all.

## 2.2 chrome.manifest instructions

Firefox reads a root `chrome.manifest` at startup; secondary manifests are loaded with `manifest`.

| Instruction | Meaning |
| ----------- | ------- |
| `content <pkg> <dir>` | registers `chrome://<pkg>/content/…` |
| `locale <pkg> <locale> <dir>` | registers `chrome://<pkg>/locale/…` |
| `skin <pkg> <skinname> <dir>` | registers `chrome://<pkg>/skin/…`; best-fit skin chosen by pref |
| `resource <name> <target>` | registers `resource://<name>/…` |
| `override <chrome-url> <replacement>` | replace an existing chrome:// resource |
| `overlay …` (legacy XUL overlays) | historical; XUL overlays are gone from modern Firefox |
| `style <url> <dir>` | SeaMonkey-only |
| `component` / `contract` / `category` | XPCOM registration |

Lines are parsed individually; unparsable lines are ignored with a warning. The root manifest in
`browser/` is generated from the `jar.mn` files.

Skins are the standard mechanism for chrome themes: `browser/themes/<os>/jar.mn` contains e.g.
`% skin browser classic/1.0 %skin/`, so `chrome://browser/skin/browser.css` resolves into the
active skin. `browser/themes/shared/` holds cross-platform sheets.

## 2.3 omni.ja

- Two archives: `<install>/omni.ja` (toolkit) and `<install>/browser/omni.ja` (browser front-end).
- Built by `mach` from source. In release builds it also contains the pref data files
  (`all.js`, `firefox.js`, `StaticPrefList`-generated) and localized chrome.
- `unzip` can *read* it (emits a "extra bytes at beginning or within zipfile" / bad-central-directory
  warning — this is the omnijar optimization, expected). **Never write it back**; `unzip -l/-p` for
  inspection only, then edit source and let `mach` repack.
- Verifying what shipped: `unzip -l omni.ja | grep <file>`.

## 2.4 Built-in themes (theme-as-addon)

A real "built-in theme" that appears in `about:addons`:

1. `browser/themes/addons/<id>/manifest.json` (a WebExtension `theme` manifest) + assets.
2. Register in `browser/themes/addons/jar.mn` (`resource builtin-themes`, `content/builtin-themes/…`).
3. Listed via `BuiltInThemeConfig.sys.mjs`; the packaging list is `built_in_addons.json`.
4. Colour/image keys map to chrome CSS variables via `ThemeVariableMap.sys.mjs`
   (e.g. `--toolbar-background-color`, `--tab-selected-textcolor`, `--sidebar-background-color`).

Limitation: a built-in theme only drives **colour/image/properties variables**. It cannot express
arbitrary layout CSS — which is exactly what this theme is. So built-in themes are *not* a
substitute for embedding `CSS/chrome/*`; they are a complement (brand colours) — see §03 for the
real chrome-CSS path, and `theme_experiment` for expanding what a theme can touch.

## 2.5 theme_experiment (Firefox-only)

`manifest.json` → `"theme_experiment": { "stylesheet": "style.css", "colors": {"reload_button": "--reload-button-color"} }`
lets a static theme map **arbitrary internal CSS selectors** to theme properties:

```css
/* style.css */
#reload-button { fill: var(--reload-button-color); }
```
```json
"theme": { "colors": { "reload_button": "orange" } }
```

Without a stylesheet, only pre-existing internal Firefox CSS variables can be remapped. This is the
only sanctioned way for a *distribution extension* to reach chrome selectors — still limited to the
variables you declare, and still Firefox-only.

## Sources

firefox-source-docs `build/buildsystem/jar-manifests`, `build/buildsystem/chrome-registration`,
`mozpack.chrome` API, `browser/themes/ThemeVariableMap.sys.mjs`, MDN `theme_experiment`.
