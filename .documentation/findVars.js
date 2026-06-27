/*
 * findVars.js — Firefox CSS Variables Dumper
 * ============================================
 *
 * Run from Browser Toolbox (Ctrl+Shift+Alt+I → Console tab).
 *
 * Collects ALL Firefox CSS custom properties (--*) from:
 *   1. CSSOM declarations — every --* property defined in loaded stylesheets
 *   2. Computed styles    — every --* property resolved on elements in the DOM
 *
 * Output includes the computed value for each variable where available.
 * Writes a sorted, deduplicated .txt file to the XDG Desktop directory
 * (or $HOME as fallback).
 */

(function () {
  "use strict";

  /* ── helpers ────────────────────────────────────────────────── */

  function ts() { return new Date().toLocaleTimeString(); }
  function iso() { return new Date().toISOString().slice(0, 10); }
  function log(m) { console.log(`[${ts()}] ${m}`); }
  function warn(m) { console.warn(`[${ts()}] ${m}`); }

  /* ── 1. CSSOM: declared variable names from stylesheets ────── */

  function collectDeclaredNames() {
    const names = new Set();

    function walkRules(rules) {
      for (const rule of rules) {
        try {
          if (rule.style) {
            for (let i = 0; i < rule.style.length; i++) {
              const p = rule.style[i];
              if (p.startsWith("--")) names.add(p);
            }
          }
          if (rule.cssRules) walkRules(rule.cssRules);
        } catch (_) {}
      }
    }

    try {
      const sheets = document.styleSheets;
      for (let i = 0; i < sheets.length; i++) {
        try {
          const sheet = sheets[i];
          if (sheet.cssRules) walkRules(sheet.cssRules);
        } catch (_) {}
      }
    } catch (e) {
      warn("stylesheet iteration: " + e);
    }

    return names;
  }

  /* ── 2. Computed values from DOM elements ───────────────────── */

  function collectComputedValues() {
    const values = new Map(); // name → first-seen computed value

    function walk(node) {
      if (node.nodeType !== 1) return;
      try {
        const styles = getComputedStyle(node);
        for (let i = 0; i < styles.length; i++) {
          const prop = styles[i];
          if (prop.startsWith("--") && !values.has(prop)) {
            values.set(prop, styles.getPropertyValue(prop));
          }
        }
      } catch (_) {}
      for (const child of node.children) walk(child);
    }

    walk(document.documentElement);

    (function walkShadow(host) {
      if (!host.shadowRoot) return;
      walk(host.shadowRoot);
      for (const el of host.shadowRoot.querySelectorAll("*")) {
        if (el.shadowRoot) walkShadow(el);
      }
    })(document.documentElement);

    return values;
  }

  /* ── 3. File writer ─────────────────────────────────────────── */

  function writeTextFile(filePath, content) {
    const file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsIFile);
    file.initWithPath(filePath);

    const parent = file.parent;
    if (parent && !parent.exists()) {
      parent.create(Ci.nsIFile.DIRECTORY_TYPE, 0o755);
    }

    // TextEncoder IS available in the toolbox sandbox — confirmed working.
    const bytes = new TextEncoder().encode(content);

    const stream = Cc["@mozilla.org/network/file-output-stream;1"]
      .createInstance(Ci.nsIFileOutputStream);
    stream.init(file, 0x02 | 0x08 | 0x20, 0o666, 0);
    stream.write(bytes, bytes.length);
    stream.flush();
    stream.close();
  }

  /* ── 4. Main ────────────────────────────────────────────────── */

  try {
    log("Scanning declared CSS variables from stylesheets...");
    const declaredNames = collectDeclaredNames();
    log("  → " + declaredNames.size + " declared variable names found");

    log("Scanning computed CSS variables from DOM...");
    const computedValues = collectComputedValues();
    log("  → " + computedValues.size + " variables with computed values");

    // Union: all known variable names
    const allNames = new Set([...declaredNames, ...computedValues.keys()]);
    const sorted = [...allNames].sort();

    // Resolve values: prefer computed, fall back to root getComputedStyle,
    // then mark as <unresolved>
    const rootStyles = getComputedStyle(document.documentElement);
    let resolvedCount = 0;
    let unresolvedCount = 0;

    const lines = sorted.map((name) => {
      let value;
      if (computedValues.has(name)) {
        value = computedValues.get(name);
      } else {
        value = rootStyles.getPropertyValue(name).trim();
        if (!value) {
          value = "<unresolved>";
          unresolvedCount++;
          return name + "    " + value;
        }
      }
      resolvedCount++;
      return name + "    " + value;
    });

    // Determine output path
    let baseDir;
    try {
      baseDir = Services.dirsvc.get("Desk", Ci.nsIFile).path;
    } catch (_) {
      try {
        baseDir = Services.dirsvc.get("Home", Ci.nsIFile).path;
      } catch (_) {
        baseDir = ".";
      }
    }

    const tsFile = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    const fileName = "fx-css-variables-" + tsFile + ".txt";
    const filePath = baseDir + "/" + fileName;

    // Build content with metadata header
    const header =
      "# Firefox CSS Variables — " + iso() + "\n" +
      "# Generated: " + new Date().toLocaleString() + "\n" +
      "# Total:       " + allNames.size + "\n" +
      "# Declared:    " + declaredNames.size + "  (stylesheet CSSOM)\n" +
      "# Computed:    " + computedValues.size + "  (DOM getComputedStyle)\n" +
      "# Resolved:    " + resolvedCount + "  (with values in output)\n" +
      "# Unresolved:  " + unresolvedCount + "  (no computed value found)\n" +
      "# ───────────────────────────────────────────\n" +
      "# Format: --variable-name    computed-value\n\n";

    const content = header + lines.join("\n") + "\n";

    log("Writing " + allNames.size + " variables → " + filePath);
    log("  baseDir: " + baseDir);

    writeTextFile(filePath, content);

    log("✓ Done — " + filePath);

    console.log("");
    console.log("  Declared names:   " + declaredNames.size);
    console.log("  Computed values:  " + computedValues.size);
    console.log("  Union (total):    " + allNames.size);
    console.log("  Resolved:         " + resolvedCount);
    console.log("  Unresolved:       " + unresolvedCount);
    if (sorted.length > 0) {
      console.log("");
      console.log("  First 10 entries:");
      console.log("    " + lines.slice(0, 10).join("\n    "));
    }
  } catch (e) {
    console.error("findVars.js crashed:", e);
    console.error("  stack:", e.stack || "(no stack)");
  }
})();
