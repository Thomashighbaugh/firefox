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
