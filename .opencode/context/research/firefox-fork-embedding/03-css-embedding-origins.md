---
title: "03 — CSS embedding & cascade origins"
type: research
tags: [firefox-fork, css, origin, nsIStyleSheetService, author-sheet, design-tokens]
created: 2026-10-11
updated: 2026-10-11
---

# 03 — CSS embedding & cascade origins

## 3.1 The origin problem (why profile CSS needs `!important`)

Cascade order, lowest → highest precedence:

```
1. UA normal           (html.css, forms.css, ua.css)
2. user normal         (userChrome.css, userContent.css loaded as user sheets)
3. author normal       (Firefox's own browser.css, aboutaddons.css, …)
4. author !important
5. user !important      ← a profile userChrome.css can only win here
6. UA !important
7. transitions
```

So a **user-origin** stylesheet cannot beat an author declaration without `!important`, *regardless
of specificity*. That is why this theme is littered with `!important` and why the FF157
`#main > addon-list > section { display:flex }` addition silently overrode it.

**A stylesheet compiled into the tree is author origin** — same tier as Firefox's own CSS, later in
source order → wins by normal cascade rules, no `!important` needed. This is the single biggest
reason to embed rather than profile-install.

## 3.2 nsIStyleSheetService (runtime registration, still user/agent origin)

`@mozilla.org/content/style-sheet-service;1` — constants:

| Constant | Value | Placement in cascade |
| -------- | ----- | -------------------- |
| `AGENT_SHEET` | 0 | after `ua.css` (higher than ua.css) |
| `USER_SHEET` | 1 | **before** `userContent.css`/`userChrome.css` (lower than them) |
| `AUTHOR_SHEET` | 2 | author tier |

```js
const sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
const uri = Services.io.newURI("chrome://browser/content/higgs.css");
sss.loadAndRegisterSheet(uri, Ci.nsIStyleSheetService.AGENT_SHEET);
// sheetRegistered(uri, type) / unregisterSheet(uri, type)
```

Sheets added this way **take effect on all documents, including already-loaded ones, immediately**.
The relative order of two sheets of the same type is undefined. Loading a `USER_SHEET` still means
you are below `userChrome.css` and below author sheets → still need `!important` against author CSS.
`AGENT_SHEET` is above `ua.css` but still **below author normal**, so it also needs `!important`
against author sheets.

> Practical fork answer: don't register at runtime — put the CSS in the tree (author origin). Use
> `nsIStyleSheetService` only for toggleable/optional layers where you accept `!important`.

## 3.3 Chrome sheets (the browser UI)

- `browser/browser.xhtml` links its sheets; classic XUL documents use
  `<?xml-stylesheet href="chrome://browser/skin/browser.css" type="text/css"?>` and
  `<?xml-stylesheet href="chrome://global/skin/global.css">`.
- Skins: `chrome://browser/skin/…` resolves into `browser/themes/<os>/` (skin registered in
  `browser/themes/<os>/jar.mn`); shared sheets in `browser/themes/shared/`; toolkit chrome in
  `toolkit/themes/<os>/` and `toolkit/themes/shared/global/`.
- Design tokens: `toolkit/themes/shared/design-system/tokens-*.css` define the `--*` variables;
  `common-shared.css` + `global.css` are the roots.

### Two embedding shapes

**(a) Least-effort — append to an existing registered sheet.** Put the theme's chrome CSS at the
end of `browser/themes/linux/browser.css` (and `windows`/`macos`). No `jar.mn` edit; author origin;
later source order → wins.

**(b) Clean — additive file + one-line import.**
```css
/* browser/themes/linux/browser.css (end) */
@import url("chrome://browser/skin/higgs-theme.css");
```
Add `skin/higgs-theme.css (higgs-theme.css)` to `browser/themes/linux/jar.mn`. One file + one line
= cheap upstream rebases. Do the same per-OS or put the body in a shared sheet and import per-OS.

Because the theme's existing `CSS/chrome/*.css` are wrapped in
`@-moz-document url-prefix(chrome://)`, those guards remain valid but become redundant; the
`!important` flags can be dropped.

## 3.4 Content-page sheets (userContent equivalent)

`userContent.css` targets **separate documents** (`about:addons`, `about:config`, new tab,
`about:preferences`, `about:privatebrowsing`, Firefox View). In a fork, edit each page's own
built-in CSS — author origin, so the FF157 fixes become plain additions:

| Page | Sheet |
| ---- | ----- |
| `about:addons` | `toolkit/chrome/toolkit/content/mozapps/extensions/aboutaddons.css` |
| `about:config` | `toolkit/chrome/toolkit/content/global/config.css` |
| new tab | `browser/components/newtab/…` (packaged as builtin-addons; `activity-stream.css`) |
| `about:preferences` | `browser/themes/shared/preferences/*.css` + `browser/components/preferences/*` |
| `about:privatebrowsing` | its component dir |
| Firefox View | `browser/components/firefoxview/*` |

Alternative if you want to keep `CSS/content/*` verbatim: append them to the corresponding built-in
sheet (same trick as 3.3a). The `@-moz-document` guards become redundant but harmless.

### If you must style *web content* (arbitrary sites)

There is no author-origin hook for third-party pages. Use
`nsIStyleSheetService.loadAndRegisterSheet(uri, USER_SHEET)` (all documents) or an
`AGENT_SHEET`. `userContent.css` itself is loaded as a user sheet.

## 3.5 Token mapping

Lightweight themes / built-in themes drive chrome colours through `ThemeVariableMap.sys.mjs`, which
maps LWT properties → CSS variables, e.g. `--toolbar-background-color` ← `toolbar`,
`--tab-selected-textcolor` ← `tab_text`, `--sidebar-background-color` ← `sidebar`. `ThemeContentPropertyList`
covers in-content (`ntp_background`, `sidebar`, `ai_background_color`, …). A fork's theme can either
set these variables directly in CSS or provide a built-in theme that supplies them.

## 3.6 Debugging CSS in a build

- **Browser Toolbox**: `Ctrl+Shift+Alt+I` (enable `devtools.chrome.enabled` / browser-toolbox pref).
- **Style Editor**: live-edit a loaded sheet and Save (Zen documents this for `userChrome.css`;
  works on any linked sheet).
- Purge caches on restart: `firefox -purgecaches` (or delete `startupCache`).
- Inspect computed rules to discover the internal selectors/variables to target.

## Sources

`nsIStyleSheetService.idl` (searchfox), firefox-source-docs `code-quality/coding-style/css_guidelines`,
`browser/themes/ThemeVariableMap.sys.mjs`, MDN theme/theme_experiment, Zen live-editing guide.
