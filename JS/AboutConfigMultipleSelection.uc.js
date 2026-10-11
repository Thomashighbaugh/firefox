// ==UserScript==
// @name           About:config Multiple Selection
// @version        1.0.0
// @description    Multi-select rows in about:config and copy them as user_pref() lines
// @author         NightsoN (rewritten for fx-autoconfig / Firefox 157)
// @include        about:config*
// ==/UserScript==

/**
 * Rewrite notes
 * -------------
 * The previous version declared `@include chrome://browser/content/browser.xul`
 * (browser.xul no longer exists) and tried to catch about:config's
 * `DOMContentLoaded` from the browser window, which cannot work because
 * about:config is its own document. It also inserted a menuitem into a
 * `#configContext` context menu that modern about:config no longer has.
 *
 * This version targets the about:config document directly. It adds Ctrl/Cmd
 * click and Shift click multi-selection over the prefs table, provides a
 * toolbar button and Ctrl+C to copy the selection as `user_pref(...)` lines,
 * and uses inline styling for the selection highlight (no stylesheet).
 */

(function () {
  "use strict";

  const SELECTED_OUTLINE = "2px solid Highlight";
  const SELECTED_BG = "rgba(0, 120, 215, 0.12)";

  const selectedRows = new Set();
  let table = null;
  let lastRow = null;

  /* ── helpers ──────────────────────────────────────────────────── */

  function prefName(row) {
    return row.querySelector("th")?.textContent?.trim() || "";
  }

  function clipboard() {
    return Cc["@mozilla.org/widget/clipboardhelper;1"].getService(
      Ci.nsIClipboardHelper,
    );
  }

  /**
   * Build a `user_pref("name", value);` string from the *live* pref store so
   * the exact value and type are used (the table cell may be abbreviated).
   * @param {string} name
   * @returns {string?}
   */
  function formatPref(name) {
    const P = Services.prefs;
    try {
      switch (P.getPrefType(name)) {
        case P.PREF_BOOL:
          return `user_pref(${JSON.stringify(name)}, ${P.getBoolPref(name)});`;
        case P.PREF_INT:
          return `user_pref(${JSON.stringify(name)}, ${P.getIntPref(name)});`;
        case P.PREF_STRING:
          return `user_pref(${JSON.stringify(name)}, ${JSON.stringify(
            P.getStringPref(name),
          )});`;
      }
    } catch (e) {
      // Pref disappeared between selection and copy.
    }
    return null;
  }

  /* ── selection ────────────────────────────────────────────────── */

  function setSelected(row, on) {
    if (on) {
      selectedRows.add(row);
      row.style.outline = SELECTED_OUTLINE;
      row.style.outlineOffset = "-2px";
      row.style.backgroundColor = SELECTED_BG;
    } else {
      selectedRows.delete(row);
      row.style.removeProperty("outline");
      row.style.removeProperty("outline-offset");
      row.style.removeProperty("background-color");
    }
  }

  function clearSelection() {
    for (const row of selectedRows) {
      setSelected(row, false);
    }
    selectedRows.clear();
    lastRow = null;
  }

  function onTableClick(event) {
    // Never interfere with the row's own controls (edit/reset/toggle/save).
    if (event.target.closest("button, input, label, a, select")) {
      return;
    }
    const row = event.target.closest("tr");
    if (!row || !table.contains(row)) {
      return;
    }

    if (event.ctrlKey || event.metaKey) {
      event.preventDefault();
      setSelected(row, !selectedRows.has(row));
      lastRow = row;
    } else if (event.shiftKey && lastRow && table.contains(lastRow)) {
      const rows = Array.from(table.querySelectorAll("tr"));
      const a = rows.indexOf(lastRow);
      const b = rows.indexOf(row);
      if (a >= 0 && b >= 0) {
        clearSelection();
        rows
          .slice(Math.min(a, b), Math.max(a, b) + 1)
          .forEach((r) => setSelected(r, true));
        lastRow = row;
      }
    } else if (!selectedRows.has(row)) {
      clearSelection();
      lastRow = row;
    }
  }

  /* ── copy ─────────────────────────────────────────────────────── */

  function copySelection() {
    const names = Array.from(selectedRows).map(prefName).filter(Boolean);
    if (!names.length) {
      return;
    }
    const text = names
      .map((n) => formatPref(n))
      .filter(Boolean)
      .join("\n");
    if (text) {
      clipboard().copyString(text);
    }
  }

  function onKeyDown(event) {
    if (
      (event.ctrlKey || event.metaKey) &&
      event.key.toLowerCase() === "c" &&
      selectedRows.size
    ) {
      event.preventDefault();
      event.stopPropagation();
      copySelection();
    } else if (event.key === "Escape") {
      clearSelection();
    }
  }

  /* ── UI ───────────────────────────────────────────────────────── */

  function addToolbarButton(doc) {
    if (doc.getElementById("uc-multiselect-copy")) {
      return;
    }
    const toolbar = doc.getElementById("toolbar");
    if (!toolbar) {
      return;
    }
    const button = doc.createElement("button");
    button.id = "uc-multiselect-copy";
    button.textContent = "Copy as user_pref()";
    button.title =
      "Copy the selected prefs as user_pref(...) lines (Ctrl+click to multi-select)";
    button.addEventListener("click", (e) => {
      e.preventDefault();
      copySelection();
    });
    toolbar.appendChild(button);
  }

  /* ── bootstrap ────────────────────────────────────────────────── */

  function init(doc) {
    table = doc.getElementById("prefs");
    if (!table) {
      return false;
    }
    table.addEventListener("click", onTableClick);
    doc.addEventListener("keydown", onKeyDown, true);
    addToolbarButton(doc);

    // The table is rebuilt whenever the search filter changes; drop selection
    // to avoid holding detached rows.
    const observer = new MutationObserver(() => clearSelection());
    observer.observe(table, { childList: true });

    doc.defaultView.addEventListener(
      "unload",
      () => {
        observer.disconnect();
        table?.removeEventListener("click", onTableClick);
        doc.removeEventListener("keydown", onKeyDown, true);
        clearSelection();
      },
      { once: true },
    );
    return true;
  }

  // The prefs table only exists after the first-run warning is dismissed and
  // about:config has finished building the page, so poll for it.
  let retries = 0;
  function whenReady() {
    if (document.getElementById("prefs")) {
      init(document);
      return;
    }
    if (++retries < 100) {
      setTimeout(whenReady, 100);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", whenReady, { once: true });
  } else {
    whenReady();
  }
})();
