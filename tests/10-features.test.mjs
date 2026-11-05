// 10 — feature-level regression guards for the recently-added scripts.
//
// These pin the FF157-API decisions that fixed two regressions, so a future
// "cleanup" can't silently reintroduce the broken patterns:
//   - quick_tabs_search.uc.js must use the SearchService singleton, not the
//     removed Services.search, and must read the selection from a source that
//     works for remote content.
//   - homeRedirect.uc.js must drive the custom new-tab page via the sanctioned
//     AboutNewTab.newTabURL override, not a progress-listener redirect that
//     NewTabPagePreloading bypasses.
//   - uiAnimations.uc.js must own the motion tokens and the kill-switch it
//     writes onto :root.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { rel, REPO } from "./lib/scan.mjs";

const qt = fs.readFileSync(`${REPO}/JS/quick_tabs_search.uc.js`, "utf8");

// Lines that are actual code (a `//`-comment or `/*`-block line is excluded) —
// lets us assert an API is used without tripping on a comment that names it.
const codeLines = (src) =>
  src
    .split("\n")
    .filter((l) => !/^\s*(\/\/|\/\*|\*)/.test(l))
    .join("\n");
const home = fs.readFileSync(`${REPO}/JS/homeRedirect.uc.js`, "utf8");
const anim = fs.readFileSync(`${REPO}/JS/uiAnimations.uc.js`, "utf8");
const animCss = fs.readFileSync(`${REPO}/CSS/chrome/animations.css`, "utf8");
const vars = fs.readFileSync(`${REPO}/CSS/common/variables.css`, "utf8");

/* ------------------------- quick_tabs_search.uc.js ------------------------- */

test("quicktabs search uses SearchService singleton, not Services.search", () => {
  // Check only real code lines — a comment may legitimately name the old API.
  assert.ok(
    !/\bServices\.search\b/.test(codeLines(qt)),
    "Services.search was removed in FF157 — use the SearchService module",
  );
  assert.match(qt, /SearchService:\s*"moz-src:\/\/\/toolkit\/components\/search\/SearchService\.sys\.mjs"/);
  assert.match(qt, /await\s+lazy\.SearchService\.init\(\)/);
  assert.match(qt, /lazy\.SearchService\.defaultEngine/);
  assert.match(qt, /\.getSubmission\(/);
});

test("quicktabs search selection path handles remote content", () => {
  // browser.documentGlobal is the *chrome* window; remote selections need the
  // gContextMenu snapshot or a JSWindowActor query.
  assert.match(qt, /gContextMenu\?\.selectedText/);
  assert.match(qt, /getActor\(\s*"ContextMenu"/s);
  assert.match(qt, /sendQuery\(\s*"QT:GetSelection"/);
});

test("quicktabs search hotkey defaults to Ctrl+Alt+S (not Ctrl+Shift+S)", () => {
  // Ctrl+Shift+S is Firefox's screenshot key; it must not be the default.
  const key = qt.match(/key:\s*"([^"]+)"/)?.[1];
  const mods = qt.match(/modifiers:\s*"([^"]+)"/)?.[1];
  assert.equal(key, "S");
  assert.equal(mods, "accel alt");
});

test("quicktabs search registers its menu item + key and exposes the API", () => {
  assert.match(qt, /"qt-context-search-menuitem"/);
  assert.match(qt, /"qt-key-search-selection"/);
  assert.match(qt, /window\.QuickTabsSearch\s*=/);
});

/* --------------------------- homeRedirect.uc.js ---------------------------- */

test("homeRedirect overrides via AboutNewTab.newTabURL (not a redirect listener)", () => {
  assert.match(home, /AboutNewTab:\s*"resource:\/\/\/modules\/AboutNewTab\.sys\.mjs"/);
  assert.match(home, /lazy\.AboutNewTab\.newTabURL\s*=\s*HOME/);
  // The whole point of the rewrite: no tab progress listener, no TabOpen hook,
  // no per-browser loadURI — the override is resolved centrally.
  assert.ok(
    !/addTabsProgressListener|onLocationChange|TabOpen/.test(home),
    "progress-listener/TabOpen redirect is bypassed by NewTabPagePreloading",
  );
});

test("homeRedirect reset path uses resetNewTabURL and only when it owns the value", () => {
  assert.match(home, /lazy\.AboutNewTab\.resetNewTabURL\(\)/);
  // Only reset if the current override is ours, so we never clobber an
  // extension-controlled new-tab page.
  assert.match(home, /lazy\.AboutNewTab\.newTabURL\s*===\s*HOME/);
});

test("homeRedirect re-applies on pref change and unloads cleanly", () => {
  assert.match(home, /Services\.prefs\.addObserver\(PREF, prefObserver\)/);
  assert.match(home, /Services\.prefs\.removeObserver\(PREF, prefObserver\)/);
  assert.match(home, /addEventListener\(\s*"unload"/);
});

test("homeRedirect target file exists and is the module home page", () => {
  const target = `${REPO}/resources/home/home.html`;
  assert.ok(fs.existsSync(target), "homeRedirect points at resources/home/home.html");
  const html = fs.readFileSync(target, "utf8");
  assert.match(html, /<script\s+type="module"\s+src="home\.mjs"/);
});

/* --------------------------- uiAnimations.uc.js ---------------------------- */

test("uiAnimations motion tokens are declared in CSS and consumed by animations.css", () => {
  // The JS only writes --uc-motion-speed live; the ease/glow tokens are pure CSS.
  assert.match(anim, /setProperty\(\s*"--uc-motion-speed"/);
  for (const token of ["--uc-motion-speed", "--uc-motion-ease", "--uc-motion-glow-spread"]) {
    assert.ok(vars.includes(token), `variables.css declares ${token}`);
    assert.ok(animCss.includes(`var(${token}`), `animations.css consumes var(${token})`);
  }
});

test("uiAnimations kill-switch writes the uc-animations attribute", () => {
  assert.match(anim, /setAttribute\(\s*"uc-animations"/);
  assert.match(animCss, /:root\[uc-animations="off"\]/);
});

test("uiAnimations honours prefers-reduced-motion", () => {
  assert.match(anim, /prefers-reduced-motion:\s*reduce/);
  assert.match(animCss, /@media\s*\(prefers-reduced-motion/);
});

test("uiAnimations writes the fan transform with !important (CSS can't override it)", () => {
  assert.match(anim, /setProperty\(\s*"transform",\s*value,\s*"important"\s*\)/);
});

/* ------------------------- logins page + redirect ------------------------- */

const loginsPage = fs.readFileSync(`${REPO}/resources/logins/logins.mjs`, "utf8");
const loginsRedirect = fs.readFileSync(`${REPO}/JS/loginsRedirect.uc.js`, "utf8");

test("logins page exists and is wired for privileged access", () => {
  assert.ok(fs.existsSync(`${REPO}/resources/logins/logins.html`), "logins.html exists");
  assert.ok(fs.existsSync(`${REPO}/resources/logins/logins.css`), "logins.css exists");
  // Uses the privileged LoginManager service.
  assert.match(loginsPage, /Services\.logins/);
  assert.match(loginsPage, /getAllLogins/);
});

test("logins page gates password reveal and export behind re-auth", () => {
  // Both reveal and export must route through requireAuth -> requestReauth.
  assert.match(loginsPage, /requestReauth/);
  assert.match(loginsPage, /requireAuth/);
  const authCalls = (loginsPage.match(/await requireAuth\(\)/g) || []).length;
  assert.ok(authCalls >= 2, "reveal + copy + export all require auth");
});

test("logins page supports CSV, JSON and HTML export", () => {
  for (const fmt of ["csv", "json", "html"]) {
    assert.match(loginsPage, new RegExp(`["']${fmt}["']`), `export format "${fmt}" present`);
  }
  // CSV uses Firefox's own exporter for import-compatibility.
  assert.match(loginsPage, /LoginExport\.exportAsCSV/);
  // HTML export escapes values (no password -> markup injection).
  assert.match(loginsPage, /escapeHtml/);
});

test("logins page import handles CSV and JSON", () => {
  assert.match(loginsPage, /LoginCSVImport\.importFromCSV/);
  assert.match(loginsPage, /JSON\.parse/);
});

test("logins page has the full batch suite", () => {
  // select-all, bulk delete, bulk export, age/usage filters, sorting.
  for (const id of ["select-all", "bulk-delete", "bulk-export", "age-filter", "sort"]) {
    assert.match(loginsPage, new RegExp(`#${id}`), `#${id} wired`);
  }
  assert.match(loginsPage, /removeLoginAsync/);
  assert.match(loginsPage, /timesUsed/);
  assert.match(loginsPage, /timeLastUsed/);
});

test("loginsRedirect patches the single openPasswordManager choke point", () => {
  assert.match(loginsRedirect, /openPasswordManager/);
  // Keeps an unpatch path and restores the original.
  assert.match(loginsRedirect, /__loginsPageOriginal/);
  assert.match(loginsRedirect, /userchrome\.logins\.page\.enabled/);
  // Points at the new page.
  assert.match(loginsRedirect, /chrome:\/\/userchrome\/content\/logins\/logins\.html/);
});

/* ------------------------- library downloads manager ------------------------- */

const lib = fs.readFileSync(`${REPO}/resources/library/library.mjs`, "utf8");

test("downloads rows support retry of failed/incomplete downloads", () => {
  // Download.start() restarts a failed/canceled/incomplete download.
  assert.match(lib, /dl\.start\(\)/);
  assert.match(lib, /Retry/);
});

test("downloads rows can copy the download link", () => {
  // The original source URL is copied to the clipboard.
  assert.match(lib, /dl\.source\?\.url/);
  assert.match(lib, /Copy link/);
  assert.match(lib, /nsIClipboardHelper|clipboardhelper/);
});

/* ------------------------------- drop to split ------------------------------- */

const dts = fs.readFileSync(`${REPO}/JS/dropToSplit.uc.js`, "utf8");

test("drop-to-split creates a native split view via gBrowser.addTabSplitView", () => {
  assert.match(dts, /addTabSplitView/);
});

test("drop-to-split has content-area left/right drop zones", () => {
  assert.match(dts, /mk\([^)]*"left"\)/);
  assert.match(dts, /mk\([^)]*"right"\)/);
  assert.match(dts, /z\.dataset\.side\s*=\s*side/);
});

test("drop-to-split adds a tab context-menu item", () => {
  assert.match(dts, /tabContextMenu/);
  assert.match(dts, /dropToSplit-context-item/);
});

test("drop-to-split is behind the userchrome.dropToSplit.enabled pref", () => {
  assert.match(dts, /userchrome\.dropToSplit\.enabled/);
});

/* --------------------------- shortcut cheat-sheet --------------------------- */

const scs = fs.readFileSync(`${REPO}/JS/shortcutCheatsheet.uc.js`, "utf8");

test("shortcut cheatsheet exposes a registry and enumerates XUL keys", () => {
  assert.match(scs, /window\.HiggsShortcuts\s*=/);
  assert.match(scs, /register\(entry\)/);
  assert.match(scs, /querySelectorAll\("keyset key"\)/);
});

test("shortcut cheatsheet includes second-sidebar bindings from prefs", () => {
  assert.match(scs, /second-sidebar\.settings/);
  assert.match(scs, /second-sidebar\.web-panels/);
  assert.match(scs, /sidebarWidgetShortcut/);
  assert.match(scs, /lastWebPanelShortcut/);
});

test("shortcut cheatsheet adds a toolbar button and a searchable panel", () => {
  assert.match(scs, /CustomizableUI\.createWidget/);
  assert.match(scs, /higgs-shortcut-cheatsheet-panel/);
  assert.match(scs, /addEventListener\("input", renderList\)/);
  assert.match(scs, /openPopup/);
});

test("shortcut cheatsheet rows invoke their binding", () => {
  assert.match(scs, /invokeEntry/);
  assert.match(scs, /doCommand/);
  assert.match(scs, /dispatchShortcut/);
});

test("shortcut cheatsheet is behind userchrome.shortcuts.* prefs", () => {
  assert.match(scs, /userchrome\.shortcuts\.button/);
  assert.match(scs, /userchrome\.shortcuts\.hotkey/);
  assert.match(scs, /Ctrl\+Alt\+K/);
  assert.match(
    fs.readFileSync(`${REPO}/userChrome.css`, "utf8"),
    /CSS\/chrome\/shortcut-cheatsheet\.css/,
  );
});

/* ---------------------- about-page cards + chrome alignment ---------------------- */

const libCss = fs.readFileSync(`${REPO}/resources/library/library.css`, "utf8");
const loginsCss = fs.readFileSync(
  `${REPO}/resources/logins/logins.css`,
  "utf8",
);

test("library and logins use the about:addons card grid", () => {
  for (const css of [libCss, loginsCss]) {
    assert.match(css, /\.rows\s*\{[^}]*grid-template-columns:\s*repeat\(auto-fill/);
    assert.match(css, /\.row\s*\{[^}]*grid-template-columns:\s*auto auto minmax\(0,\s*1fr\) auto/);
  }
});

test("sidebar More tools panel is wide and distinct from the extensions grid", () => {
  const bo = fs.readFileSync(`${REPO}/CSS/chrome/buttons.css`, "utf8");
  assert.match(bo, /#sidebar-tools-overflow\s*\{[^}]*width:\s*min\(40em/);
  assert.match(bo, /#tools-overflow-list\s*\{[^}]*grid-template-columns:\s*repeat\(auto-fit/);
  assert.match(bo, /#appmenu-moreTools\s+\.panel-subview-body/);
});

test("status bar reuses the sidebar gradient's end colour", () => {
  const colors = fs.readFileSync(`${REPO}/CSS/common/colors.css`, "utf8");
  assert.match(colors, /--firefoxcss-sidebar-end-bg-color/);
  assert.match(
    fs.readFileSync(`${REPO}/JS/extendedStatusbar.uc.js`, "utf8"),
    /var\(--firefoxcss-sidebar-end-bg-color,\s*var\(--in-content-page-background\)\)/,
  );
});

test("second-sidebar web panels share the tab button metrics", () => {
  const sb = fs.readFileSync(
    `${REPO}/resources/second-sidebar/css/second_sidebar.mjs`,
    "utf8",
  );
  assert.match(sb, /\.toolbarbutton-1,\s*\n\s*\.sb2-main-button\s*\{/);
  assert.match(sb, /min-height:\s*var\(--tab-min-height\)\s*!important/);
  assert.match(
    sb,
    /width:\s*var\(--tab-collapsed-background-width, var\(--tab-min-height\)\)\s*!important/,
  );
  assert.match(
    sb,
    /--sb2-main-padding:\s*var\(--tab-margin-inline-inner, var\(--space-medium, 12px\)\)/,
  );
});

test("first toolbar button is centred on the vertical tab icon axis", () => {
  const vt = fs.readFileSync(`${REPO}/CSS/chrome/vertical-tabs.css`, "utf8");
  assert.match(vt, /--tab-margin-inline-inner/);
  assert.doesNotMatch(vt, /--tab-inner-inline-margin/);
  assert.match(vt, /--tab-collapsed-background-width/);
  assert.match(vt, /#PanelUI-menu-button\s*\{[^}]*padding-inline-end/);
});

test("vertical tabs meet the top bar with squared viewport corners", () => {
  const files = [
    fs.readFileSync(`${REPO}/CSS/chrome/colors.css`, "utf8"),
    fs.readFileSync(`${REPO}/CSS/chrome/vertical-tabs.css`, "utf8"),
    fs.readFileSync(`${REPO}/CSS/chrome/theme.css`, "utf8"),
  ];
  for (const css of files) {
    assert.match(css, /\.browserSidebarContainer\s*\{[^}]*border-radius:\s*0/);
  }
});

test("native vertical-tabs tools/extensions overflow is forced to the chevron group", () => {
  assert.ok(fs.existsSync(`${REPO}/JS/sidebarMainOverflow.uc.mjs`));
  const script = fs.readFileSync(`${REPO}/JS/sidebarMainOverflow.uc.mjs`, "utf8");
  assert.match(script, /\.tools-and-extensions:not\(\.overflow-button\)\s*\{[^}]*display:\s*none/);
  assert.match(script, /overflow-button/);
  const vt = fs.readFileSync(`${REPO}/CSS/chrome/vertical-tabs.css`, "utf8");
  assert.match(vt, /#sidebar-main::part\(overflow-button\)/);
});

test("second sidebar button rhythm matches native vertical tabs pitch", () => {
  const sb = fs.readFileSync(
    `${REPO}/resources/second-sidebar/css/second_sidebar.mjs`,
    "utf8",
  );
  assert.match(
    sb,
    /gap:\s*calc\(2 \* var\(--tab-margin-block-vertical, 2px\)\)/,
  );
  assert.doesNotMatch(sb, /--tab-block-margin/);
});
