// 09 — integrity invariants: line endings, banned APIs, symlinks, refactor contract.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { listFiles, rel, REPO } from "./lib/scan.mjs";

const codeFiles = [
  ...listFiles(`${REPO}/JS`, [".js", ".mjs"]),
  ...listFiles(`${REPO}/utils`, [".mjs"]),
  ...listFiles(`${REPO}/resources`, [".mjs"]),
  ...listFiles(`${REPO}/CSS`, [".css"]),
  `${REPO}/utils/chrome.manifest`,
];

test("all source files use LF line endings and have no BOM", () => {
  const bad = [];
  for (const f of codeFiles) {
    const buf = fs.readFileSync(f);
    if (buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) bad.push(`${rel(f)}: BOM`);
    if (buf.includes(0x0d)) bad.push(`${rel(f)}: CRLF`);
  }
  assert.deepEqual(bad, [], `\n${bad.join("\n")}`);
});

const stripComments = (s) =>
  s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");

test("no eval() / toSource() in theme JS (comments ignored)", () => {
  const bad = [];
  const files = [...listFiles(`${REPO}/JS`, [".js", ".mjs"]), ...listFiles(`${REPO}/resources`, [".mjs"])];
  for (const f of files) {
    const src = stripComments(fs.readFileSync(f, "utf8"));
    if (/\beval\s*\(/.test(src)) bad.push(`${rel(f)}: eval(`);
    if (/\.toSource\s*\(/.test(src)) bad.push(`${rel(f)}: toSource(`);
  }
  assert.deepEqual(bad, [], `\n${bad.join("\n")}`);
});

test("all web-panel popups extend PopupPanel", () => {
  for (const p of [
    "web_panel_popup_new",
    "web_panel_popup_delete",
    "web_panel_popup_more",
    "web_panel_popup_edit",
    "sidebar_main_popup_settings",
  ]) {
    const src = fs.readFileSync(`${REPO}/resources/second-sidebar/xul/${p}.mjs`, "utf8");
    assert.match(src, /extends PopupPanel/, `${p}.mjs should extend PopupPanel`);
  }
});

test("userChrome.css / userContent.css are symlinks into CSS/", () => {
  for (const name of ["userChrome.css", "userContent.css"]) {
    const p = `${REPO}/${name}`;
    assert.ok(fs.lstatSync(p).isSymbolicLink(), `${name} should be a symlink`);
    assert.match(fs.readlinkSync(p), /^CSS\//, `${name} should target CSS/`);
  }
});

test("the second-sidebar entry is the only module importing chrome://secondsidebar", () => {
  const importers = listFiles(`${REPO}/resources`, [".mjs"])
    .concat(listFiles(`${REPO}/JS`, [".mjs"]))
    .filter((f) => /from\s+"chrome:\/\/secondsidebar\//.test(fs.readFileSync(f, "utf8")));
  assert.deepEqual(importers.map(rel), ["JS/second_sidebar.uc.mjs"]);
});
