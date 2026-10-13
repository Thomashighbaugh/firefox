// 08 — userChrome.js / userChrome.mjs scripts have well-formed fx-autoconfig headers.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { listFiles, rel, REPO } from "./lib/scan.mjs";

const files = listFiles(`${REPO}/JS`, [".uc.js", ".uc.mjs"]);
const ALLOWED_INCLUDE = /^(main|\*|about:|chrome:\/\/|resource:\/\/)/;

test("every .uc.js / .uc.mjs has a UserScript header", () => {
  const bad = [];
  for (const f of files) {
    const src = fs.readFileSync(f, "utf8");
    if (!src.startsWith("// ==UserScript==")) bad.push(`${rel(f)}: missing "// ==UserScript==" opener`);
    if (!/\/\/ ==\/UserScript==/.test(src)) bad.push(`${rel(f)}: missing "// ==/UserScript==" closer`);
    if (!/^\/\/\s*@name\b/m.test(src)) bad.push(`${rel(f)}: missing @name`);
  }
  assert.ok(files.length > 10, `only found ${files.length} scripts`);
  assert.deepEqual(bad, [], `\n${bad.join("\n")}`);
});

test("@include targets are valid fx-autoconfig aliases / URLs", () => {
  const bad = [];
  for (const f of files) {
    const src = fs.readFileSync(f, "utf8");
    for (const m of src.matchAll(/^\/\/\s*@include\s+(.+)$/gm)) {
      const target = m[1].trim();
      if (!ALLOWED_INCLUDE.test(target)) bad.push(`${rel(f)}: @include ${target}`);
    }
  }
  assert.deepEqual(bad, [], `\n${bad.join("\n")}`);
});

test("second_sidebar.uc.mjs entry imports resolve (chrome://secondsidebar)", () => {
  const src = fs.readFileSync(`${REPO}/JS/second_sidebar.uc.mjs`, "utf8");
  assert.match(src, /chrome:\/\/secondsidebar\/content\//);
});
