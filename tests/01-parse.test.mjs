// 01 — every JS / ESM / sys module parses.
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { listFiles, rel, REPO } from "./lib/scan.mjs";

const files = [
  ...listFiles(`${REPO}/JS`, [".js", ".mjs"]),
  ...listFiles(`${REPO}/utils`, [".mjs", ".js"]),
  ...listFiles(`${REPO}/resources`, [".mjs", ".js"]),
];

test("theme has JS files to validate", () => {
  assert.ok(files.length > 50, `only found ${files.length} JS files`);
});

test("every JS/ESM module parses", () => {
  const failures = [];
  for (const f of files) {
    try {
      execFileSync("node", ["--check", f], { stdio: "pipe" });
    } catch (e) {
      const msg = (e.stderr?.toString() || e.message).split("\n").slice(0, 3).join(" ").trim();
      failures.push(`${rel(f)}: ${msg}`);
    }
  }
  assert.deepEqual(failures, [], `\n${failures.join("\n")}`);
});
