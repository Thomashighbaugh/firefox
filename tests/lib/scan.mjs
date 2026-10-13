// Shared static scanners for the theme test suite.
import fs from "node:fs";
import path from "node:path";

export const REPO = path.resolve(import.meta.dirname, "..", "..");

export function listFiles(dir, exts, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) listFiles(p, exts, out);
    else if (exts.some((x) => e.name.endsWith(x))) out.push(p);
  }
  return out;
}

export const rel = (p) => path.relative(REPO, p).split(path.sep).join("/");

const IMPORT_RE = /^import\s*\{([^}]*)\}\s*from\s*"([^"]+)"\s*;?/;
const SIDE_RE = /^import\s*"([^"]+)"\s*;?/;

/** Parse ESM import statements from source. */
export function parseImports(src) {
  const out = [];
  for (const line of src.split("\n")) {
    if (!/^import\b/.test(line)) continue;
    const m = line.match(IMPORT_RE);
    const s = !m && line.match(SIDE_RE);
    if (m) out.push({ names: m[1].split(",").map((x) => x.trim()).filter(Boolean), spec: m[2], side: false });
    else if (s) out.push({ names: [], spec: s[1], side: true });
  }
  return out;
}

/** Parse exported names from source. */
export function parseExports(src) {
  const names = new Set();
  for (const m of src.matchAll(
    /^export\s+(?:default\s+)?(?:async\s+)?(?:const|let|var|class|function)\s*\*?\s*([A-Za-z_$][\w$]*)/gm,
  ))
    names.add(m[1]);
  for (const m of src.matchAll(/^export\s*\{([^}]*)\}/gm)) {
    for (const part of m[1].split(",")) {
      const n = part.split(/\s+as\s+/).pop().trim();
      if (n) names.add(n);
    }
  }
  if (/^export\s+default\b/m.test(src)) names.add("default");
  return names;
}

/** Tags passed to defineElement()/createXULElement()/document.createElement(). */
export function parseElementTags(src) {
  const tags = [];
  for (const m of src.matchAll(/defineElement\(\s*"([^"]+)"/g)) tags.push(m[1]);
  for (const m of src.matchAll(/createXULElement\(\s*"([^"]+)"/g)) tags.push(m[1]);
  for (const m of src.matchAll(/document\.createElement\(\s*"([^"]+)"/g)) tags.push(m[1]);
  return tags;
}

/** Resolve a relative specifier from an importer file to an absolute path. */
export function resolveSpec(importerAbs, spec) {
  return path.resolve(path.dirname(importerAbs), spec);
}

/** Find the matching `}` for the `{` at index `open` (string-aware enough for JS). */
export function matchBrace(src, open) {
  let depth = 0;
  for (let i = open; i < src.length; i++) {
    const c = src[i];
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}
