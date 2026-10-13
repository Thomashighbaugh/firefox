// 02 — every relative import resolves to a real file; every chrome:// theme
//      import maps to a file via utils/chrome.manifest.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { listFiles, rel, REPO, parseImports, resolveSpec } from "./lib/scan.mjs";

const files = [
  ...listFiles(`${REPO}/JS`, [".js", ".mjs"]),
  ...listFiles(`${REPO}/utils`, [".mjs"]),
  ...listFiles(`${REPO}/resources`, [".mjs"]),
];

test("every relative import resolves", () => {
  const bad = [];
  let count = 0;
  for (const f of files) {
    for (const imp of parseImports(fs.readFileSync(f, "utf8"))) {
      if (!imp.spec.startsWith(".")) continue;
      count++;
      if (!fs.existsSync(resolveSpec(f, imp.spec))) bad.push(`${rel(f)} -> ${imp.spec}`);
    }
  }
  assert.ok(count > 100, `only checked ${count} relative imports`);
  assert.deepEqual(bad, [], `\n${bad.join("\n")}`);
});

test("chrome://secondsidebar/ + chrome://userscripts/ imports map to real files", () => {
  // Parse the chrome.manifest registration.
  const manifest = fs.readFileSync(`${REPO}/utils/chrome.manifest`, "utf8");
  const map = {};
  for (const line of manifest.split("\n")) {
    const m = line.match(/^\s*(content|skin)\s+(\S+)\s+(?:\S+\s+)?(\S+)\s*$/);
    if (m) map[m[2]] = m[3];
  }
  const bad = [];
  for (const f of files) {
    for (const imp of parseImports(fs.readFileSync(f, "utf8"))) {
      const m = imp.spec.match(/^chrome:\/\/([^/]+)\/(?:content|skin)\/(.+)$/);
      if (!m) continue;
      const base = map[m[1]];
      if (!base) {
        bad.push(`${rel(f)} -> ${imp.spec} (no manifest entry for "${m[1]}")`);
        continue;
      }
      const target = path.resolve(`${REPO}/utils`, base, m[2]);
      if (!fs.existsSync(target)) bad.push(`${rel(f)} -> ${imp.spec} (missing ${rel(target)})`);
    }
  }
  assert.deepEqual(bad, [], `\n${bad.join("\n")}`);
});
