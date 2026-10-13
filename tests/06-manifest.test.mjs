// 06 — chrome.manifest registrations point at real directories, and the
//      required packages are present.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { rel, REPO } from "./lib/scan.mjs";

const MANIFEST = `${REPO}/utils/chrome.manifest`;
const src = fs.readFileSync(MANIFEST, "utf8");

test("chrome.manifest entries resolve to real directories", () => {
  const bad = [];
  for (const line of src.split("\n")) {
    if (/^\s*(#|$)/.test(line)) continue;
    const m = line.match(/^\s*(content|skin|locale)\s+(\S+)\s+(?:\S+\s+)?(\S+)\s*$/);
    if (!m) continue;
    const target = path.resolve(path.dirname(MANIFEST), m[3]);
    if (!fs.existsSync(target)) bad.push(`${line.trim()} -> ${rel(target)}`);
  }
  assert.deepEqual(bad, [], `\n${bad.join("\n")}`);
});

test("required chrome packages are registered", () => {
  for (const pkg of ["userchromejs", "userscripts", "userstyles", "userchrome", "secondsidebar"]) {
    assert.match(src, new RegExp(`\\b${pkg}\\b`), `missing registration for "${pkg}"`);
  }
});

test("secondsidebar content points at resources/second-sidebar", () => {
  assert.match(src, /content\s+secondsidebar\s+\.\.\/resources\/second-sidebar\//);
});
