/*
 * dump-selectors.js — Firefox DOM / CSSOM Selector Dumper
 * =========================================================
 *
 * Run from Browser Toolbox (Ctrl+Shift+Alt+I → Console tab).
 *
 * Collects CSS selectors from THREE sources:
 *   1. CSSOM rules      — declared selectors from chrome:// & resource:// stylesheets
 *   2. DOM elements      — ID and class selectors derived from the live DOM tree
 *   3. Inline <style>    — selectors from <style> tags embedded in the document
 *
 * Writes a sorted, deduplicated .txt file to the XDG Desktop directory
 * (or $HOME as fallback).
 *
 * ── Options ─────────────────────────────────────────────────────────────────
 * Set INCLUDE_ALL_STYLESHEETS = true to scan ALL stylesheets (not just
 * chrome:// and resource://). WARNING: this produces many more selectors.
 *
 * Set INCLUDE_ATTRIBUTE_VALUES = true to generate [attr="value"] selectors
 * for every attribute. This is VERY noisy — off by default.
 * ─────────────────────────────────────────────────────────────────────────────
 */

(function () {
  "use strict";

  const INCLUDE_ALL_STYLESHEETS = false;
  const INCLUDE_ATTRIBUTE_VALUES = false;

  /* ── helpers ────────────────────────────────────────────────── */

  function ts() { return new Date().toLocaleTimeString(); }
  function iso() { return new Date().toISOString().slice(0, 10); }
  function log(m) { console.log(`[${ts()}] ${m}`); }
  function warn(m) { console.warn(`[${ts()}] ${m}`); }

  /* ── 1. CSSOM: selectorText from stylesheet rules ───────────── */

  function collectCSSOMSelectors() {
    const selectors = new Set();

    function walkRules(rules) {
      for (const rule of rules) {
        try {
          if (rule.selectorText) {
            for (const part of rule.selectorText.split(",")) {
              const sel = part.trim();
              if (sel) selectors.add(sel);
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
          if (!sheet.cssRules) continue;

          const href = sheet.href || "";
          if (!INCLUDE_ALL_STYLESHEETS) {
            if (!href.startsWith("chrome://") && !href.startsWith("resource://"))
              continue;
          }

          walkRules(sheet.cssRules);
        } catch (_) {}
      }
    } catch (e) {
      warn("stylesheet iteration: " + e);
    }

    return selectors;
  }

  /* ── 2. DOM-derived selectors ───────────────────────────────── */

  function collectDOMSelectors() {
    const selectors = new Set();

    function walk(el) {
      if (el.nodeType !== 1) return;

      if (el.id) selectors.add("#" + el.id);
      for (const cls of el.classList) selectors.add("." + cls);
      for (const attr of el.attributes) {
        selectors.add("[" + attr.name + "]");
        if (INCLUDE_ATTRIBUTE_VALUES)
          selectors.add("[" + attr.name + '="' + attr.value + '"]');
      }
      for (const child of el.children) walk(child);
    }

    walk(document.documentElement);

    (function walkShadow(host) {
      if (!host.shadowRoot) return;
      walk(host.shadowRoot);
      for (const el of host.shadowRoot.querySelectorAll("*")) {
        if (el.shadowRoot) walkShadow(el);
      }
    })(document.documentElement);

    return selectors;
  }

  /* ── 3. Inline <style> tag selectors ────────────────────────── */

  function collectInlineStyleSelectors() {
    const selectors = new Set();

    for (const style of document.querySelectorAll("style")) {
      try {
        const sheet = style.sheet;
        if (!sheet || !sheet.cssRules) continue;

        (function walk(rules) {
          for (const rule of rules) {
            try {
              if (rule.selectorText) {
                for (const p of rule.selectorText.split(",")) {
                  const s = p.trim();
                  if (s) selectors.add(s);
                }
              }
              if (rule.cssRules) walk(rule.cssRules);
            } catch (_) {}
          }
        })(sheet.cssRules);
      } catch (_) {}
    }

    return selectors;
  }

  /* ── 4. File writer ─────────────────────────────────────────── */

  function writeTextFile(filePath, content) {
    const file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsIFile);
    file.initWithPath(filePath);

    const parent = file.parent;
    if (parent && !parent.exists()) {
      parent.create(Ci.nsIFile.DIRECTORY_TYPE, 0o755);
    }

    const bytes = new TextEncoder().encode(content);

    const stream = Cc["@mozilla.org/network/file-output-stream;1"]
      .createInstance(Ci.nsIFileOutputStream);
    stream.init(file, 0x02 | 0x08 | 0x20, 0o666, 0);
    stream.write(bytes, bytes.length);
    stream.flush();
    stream.close();

    if (!file.exists()) throw new Error("File was not created after write");
    if (file.fileSize === 0) throw new Error("File is empty after write");
  }

  /* ── 5. Main ────────────────────────────────────────────────── */

  try {
    log("Collecting CSSOM selectors from stylesheets...");
    const cssomSelectors = collectCSSOMSelectors();
    log("  → " + cssomSelectors.size + " selectors from CSSOM");

    log("Collecting DOM-derived selectors...");
    const domSelectors = collectDOMSelectors();
    log("  → " + domSelectors.size + " selectors from DOM");

    log("Collecting inline <style> selectors...");
    const inlineSelectors = collectInlineStyleSelectors();
    log("  → " + inlineSelectors.size + " selectors from inline <style>");

    const allSelectors = new Set([...cssomSelectors, ...domSelectors, ...inlineSelectors]);
    const sorted = [...allSelectors].sort();

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
    const fileName = "dom-selectors-" + tsFile + ".txt";
    const filePath = baseDir + "/" + fileName;

    // Build content
    const header =
      "# Firefox CSS Selectors — " + iso() + "\n" +
      "# Generated: " + new Date().toLocaleString() + "\n" +
      "# Total:     " + allSelectors.size + "\n" +
      "# CSSOM:     " + cssomSelectors.size + "  (chrome:// resource://)\n" +
      "# DOM:       " + domSelectors.size + "  (IDs, classes, attributes)\n" +
      "# Inline:    " + inlineSelectors.size + "  (<style> tags)\n" +
      "# Options:   includeAll=" + INCLUDE_ALL_STYLESHEETS +
      ", includeAttrValues=" + INCLUDE_ATTRIBUTE_VALUES + "\n" +
      "# ───────────────────────────────────────────\n\n";

    const content = header + sorted.join("\n") + "\n";

    log("Writing " + allSelectors.size + " selectors → " + filePath);
    log("  baseDir resolved to: " + baseDir);
    log("  content size: " + content.length + " bytes (encoded)");

    writeTextFile(filePath, content);

    // Re-stat to confirm
    const verify = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsIFile);
    verify.initWithPath(filePath);
    log("✓ Done — " + filePath);
    log("  exists=" + verify.exists() + " size=" + verify.fileSize);

    console.log("");
    console.log("  CSSOM selectors:   " + cssomSelectors.size);
    console.log("  DOM selectors:     " + domSelectors.size);
    console.log("  Inline selectors:  " + inlineSelectors.size);
    console.log("  Union (total):     " + allSelectors.size);
    const preview = sorted.slice(0, 20).join(", ");
    console.log("  First 20:          " + preview + (sorted.length > 20 ? ", …" : ""));
  } catch (e) {
    console.error("dump-selectors.js crashed:", e);
    console.error("  stack:", e.stack || "(no stack)");
  }
})();
