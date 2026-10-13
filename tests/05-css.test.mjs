// 05 — CSS files parse (balanced braces) and @import targets resolve.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { listFiles, rel, REPO } from "./lib/scan.mjs";

const files = listFiles(`${REPO}/CSS`, [".css"]);

function stripCss(src) {
  return src.replace(/\/\*[\s\S]*?\*\//g, "");
}

test("every CSS file has balanced braces", () => {
  const bad = [];
  for (const f of files) {
    const src = stripCss(fs.readFileSync(f, "utf8"));
    let depth = 0;
    for (const c of src) {
      if (c === "{") depth++;
      else if (c === "}") depth--;
      if (depth < 0) break;
    }
    if (depth !== 0) bad.push(`${rel(f)} (balance ${depth})`);
  }
  assert.deepEqual(bad, [], `\n${bad.join("\n")}`);
});

test("every CSS @import target resolves", () => {
  const bad = [];
  let count = 0;
  for (const f of files) {
    const src = stripCss(fs.readFileSync(f, "utf8"));
    for (const m of src.matchAll(/@import\s+url\(\s*["']?([^"')]+)["']?\s*\)/g)) {
      count++;
      const spec = m[1];
      const candidates = [path.resolve(path.dirname(f), spec), path.resolve(REPO, spec)];
      if (!candidates.some((c) => fs.existsSync(c))) bad.push(`${rel(f)} -> ${spec}`);
    }
  }
  assert.ok(count > 10, `only found ${count} @imports`);
  assert.deepEqual(bad, [], `\n${bad.join("\n")}`);
});

test("entry stylesheets exist (userChrome.css / userContent.css)", () => {
  assert.ok(fs.existsSync(`${REPO}/CSS/userChrome.uc.css`));
  assert.ok(fs.existsSync(`${REPO}/CSS/userContent.uc.css`));
});
