(function () {
  let vars = new Set();

  function collectFromComputed(el) {
    let styles = getComputedStyle(el);

    for (let i = 0; i < styles.length; i++) {
      let prop = styles[i];
      if (prop.startsWith("--")) {
        vars.add(prop);
      }
    }
  }

  function walk(node) {
    if (node.nodeType !== 1) return;

    try {
      collectFromComputed(node);
    } catch (e) {}

    for (let child of node.children) {
      walk(child);
    }
  }

  // Start from the browser UI root
  walk(document.documentElement);

  let content = [...vars].sort().join("\n");

  if (!content) {
    console.warn("No variables found — ensure you're in Browser Toolbox.");
  }

  let blob = new Blob([content], { type: "text/plain" });
  let a = document.createElement("a");

  a.download = "firefox_all_active_css_variables.txt";
  a.href = URL.createObjectURL(blob);

  document.documentElement.appendChild(a);
  a.click();
  document.documentElement.removeChild(a);

  URL.revokeObjectURL(a.href);

  console.log(`Exported ${vars.size} active CSS variables`);
})();
