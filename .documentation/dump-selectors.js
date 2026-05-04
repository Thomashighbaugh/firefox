(function () {
  let selectors = new Set();

  // ---------- 1. CSSOM (declared selectors) ----------
  function extractRules(rules) {
    for (let rule of rules) {
      try {
        if (rule.selectorText) {
          for (let part of rule.selectorText.split(",")) {
            let sel = part.trim();
            if (sel) selectors.add(sel);
          }
        }

        if (rule.cssRules) {
          extractRules(rule.cssRules);
        }
      } catch (e) {}
    }
  }

  for (let sheet of document.styleSheets) {
    try {
      let href = sheet.href;

      if (
        href &&
        (href.startsWith("chrome://") || href.startsWith("resource://"))
      ) {
        extractRules(sheet.cssRules);
      }
    } catch (e) {}
  }

  // ---------- 2. DOM-derived selectors (VERY IMPORTANT) ----------
  function walk(el) {
    if (el.nodeType !== 1) return;

    // ID selector
    if (el.id) {
      selectors.add(`#${el.id}`);
    }

    // Class selectors
    for (let cls of el.classList) {
      selectors.add(`.${cls}`);
    }

    // Attribute selectors
    for (let attr of el.attributes) {
      selectors.add(`[${attr.name}]`);
      selectors.add(`[${attr.name}="${attr.value}"]`);
    }

    for (let child of el.children) {
      walk(child);
    }
  }

  walk(document.documentElement);

  // ---------- 3. Inline <style> tags ----------
  for (let style of document.querySelectorAll("style")) {
    try {
      let sheet = style.sheet;
      if (sheet && sheet.cssRules) {
        extractRules(sheet.cssRules);
      }
    } catch (e) {}
  }

  // ---------- Output ----------
  let content = [...selectors].sort().join("\n");

  let blob = new Blob([content], { type: "text/plain" });
  let a = document.createElement("a");

  a.download = "firefox_max_selectors.txt";
  a.href = URL.createObjectURL(blob);

  document.documentElement.appendChild(a);
  a.click();
  document.documentElement.removeChild(a);

  URL.revokeObjectURL(a.href);

  console.log(`Exported ${selectors.size} selectors (max coverage mode)`);
})();
