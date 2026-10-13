# Theme tests

Node-based validation for the theme's JS and XUL. No dependencies — uses the
built-in `node:test` runner. **Does not require Firefox.**

```bash
npm test                 # or: node --test tests/
node --test tests/07-dom.test.mjs   # a single file
```

## What is covered

| File | Validates |
| ---- | --------- |
| `01-parse.test.mjs` | every `.uc.js` / `.uc.mjs` / `.sys.mjs` / `.mjs` in `JS/`, `utils/`, `resources/` parses |
| `02-imports.test.mjs` | every relative import resolves; every `chrome://` import maps to a real file via `utils/chrome.manifest` |
| `03-exports.test.mjs` | every named import exists as an export of its target module |
| `04-xul.test.mjs` | every element the theme creates (`defineElement` / `createXULElement` / `createElement`) is a known XUL/HTML/custom tag |
| `05-css.test.mjs` | CSS files have balanced braces; every `@import` target resolves |
| `06-manifest.test.mjs` | `chrome.manifest` entries resolve; required packages registered |
| `07-dom.test.mjs` | loads the element/popup modules against a **fake chrome environment** and asserts the produced DOM (tags, namespaces, classes, attributes, ordering) |
| `08-userscripts.test.mjs` | `.uc.js` / `.uc.mjs` have well-formed `==UserScript==` headers with valid `@include` targets |
| `09-integrity.test.mjs` | LF line endings / no BOM; no `eval()`/`toSource()`; all popups extend `PopupPanel`; `userChrome.css`/`userContent.css` symlinks; only the entry imports `chrome://secondsidebar` |

## Fake chrome environment

`lib/chrome-env.mjs` installs a minimal fake `document` (`createXULElement` /
`createElement`), a `FakeElement` with the DOM surface the theme uses
(attributes, classList, children, events, style, `pressed`, `src`, …), and
permissive stubs for `Services`, `ChromeUtils`, `CustomizableUI`, `ZoomManager`,
etc. `loadThemeModule(rel)` imports a theme module with that env in place.

Only the *pure* modules (element factories, `utils/xul.mjs`, `PopupPanel`) are
loadable this way — modules that touch live browser state (`gBrowser`,
`SidebarElements`, controllers) are covered statically by tests 01–03.

## Scope / limits

These tests prove **static correctness and DOM-shape correctness**, not runtime
behaviour in a live browser. Popup wiring, event flows, and CSS cascade still
need a manual smoke test in Firefox.

## Found so far

- `JS/minimizeMemory.uc.js` had CRLF line endings (fx-autoconfig expects LF) — fixed.
- `.opencode/context/research/sine-zen-ucjs-inventory/inventory.csv` had CRLF — fixed.

