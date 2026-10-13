// 03 — every named import exists as an export of its target module.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { listFiles, rel, REPO, parseImports, parseExports, resolveSpec } from "./lib/scan.mjs";

const files = listFiles(`${REPO}/resources`, [".mjs"]).concat(
  listFiles(`${REPO}/JS`, [".mjs"]),
);

test("named imports resolve to declared exports", () => {
  const bad = [];
  let checked = 0;
  for (const f of files) {
    for (const imp of parseImports(fs.readFileSync(f, "utf8"))) {
      if (!imp.spec.startsWith(".") || imp.names.length === 0) continue;
      const target = resolveSpec(f, imp.spec);
      if (!fs.existsSync(target)) continue; // covered by test 02
      const exports = parseExports(fs.readFileSync(target, "utf8"));
      if (/^export\s+\*/m.test(fs.readFileSync(target, "utf8"))) continue;
      for (const n of imp.names) {
        checked++;
        if (!exports.has(n)) bad.push(`${rel(f)} imports { ${n} } — not exported by ${rel(target)}`);
      }
    }
  }
  assert.ok(checked > 100, `only checked ${checked} named imports`);
  assert.deepEqual(bad, [], `\n${bad.join("\n")}`);
});
