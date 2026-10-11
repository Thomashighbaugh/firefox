// ==UserScript==
// @name           About:config Multiple Selection
// @version        2.1.0
// @description    Multi-select rows in about:config (with a checkbox per row) and copy them as user_pref() lines
// @author         NightsoN (rewritten for fx-autoconfig / Firefox 157)
// @include        main
// ==/UserScript==

/**
 * `about:config` is one of the privileged internal pages the *parent* process
 * displays, loaded inside a tab's <browser>. fx-autoconfig only sees top-level
 * windows (it observes `domwindowopened`), so no `@include about:config` can
 * reach it. Because it is parent-process, this browser-window script reaches it
 * through `<browser>.contentDocument`.
 *
 * Adds a checkbox as the first cell of every pref row, plus Ctrl/Cmd-click and
 * Shift-click multi-selection, Ctrl+C and a toolbar button that copy the
 * selection as user_pref(...) lines. Selection is tracked by pref name so it
 * survives the table being rebuilt when the search filter changes.
 */

(function () {
  "use strict";

  const installed = new WeakSet();

  function getConfigDoc(browser) {
    if (!browser || browser.isRemoteBrowser) {
      return null;
    }
    let doc;
    try {
      doc = browser.contentDocument;
    } catch (e) {
      return null;
    }
    if (!doc?.location?.href?.startsWith("about:config")) {
      return null;
    }
    return doc;
  }

  function waitForTable(browser, tries = 0) {
    const doc = getConfigDoc(browser);
    if (!doc || installed.has(doc)) {
      return;
    }
    if (doc.getElementById("prefs")) {
      install(doc);
    } else if (tries < 300) {
      // The table is built after DOMContentLoaded, and not until the first-run
      // warning is dismissed.
      setTimeout(() => waitForTable(browser, tries + 1), 200);
    }
  }

  function install(doc) {
    installed.add(doc);

    const win = doc.defaultView;
    const table = doc.getElementById("prefs");
    if (!table) {
      return;
    }

    const selectedNames = new Set();
    let lastRow = null;

    const clipboard = () =>
      Cc["@mozilla.org/widget/clipboardhelper;1"].getService(
        Ci.nsIClipboardHelper,
      );
    const prefName = (row) => row.querySelector("th")?.textContent?.trim() || "";

    function formatPref(name) {
      const P = Services.prefs;
      try {
        switch (P.getPrefType(name)) {
          case Ci.nsIPrefBranch.PREF_BOOL:
            return `user_pref(${JSON.stringify(name)}, ${P.getBoolPref(name)});`;
          case Ci.nsIPrefBranch.PREF_INT:
            return `user_pref(${JSON.stringify(name)}, ${P.getIntPref(name)});`;
          case Ci.nsIPrefBranch.PREF_STRING:
            return `user_pref(${JSON.stringify(name)}, ${JSON.stringify(
              P.getStringPref(name),
            )});`;
        }
      } catch (e) {
        // Pref disappeared between selection and copy.
      }
      return null;
    }

    function isPrefRow(row) {
      return (
        row.tagName === "TR" &&
        !row.classList.contains("add") &&
        !!row.querySelector("th") &&
        !!row.querySelector("td.cell-value")
      );
    }

    function applyRowState(row, on) {
      if (on) {
        row.style.outline = "2px solid Highlight";
        row.style.outlineOffset = "-2px";
        row.style.backgroundColor = "rgba(0, 120, 215, 0.12)";
      } else {
        row.style.removeProperty("outline");
        row.style.removeProperty("outline-offset");
        row.style.removeProperty("background-color");
      }
    }

    /**
     * Ensure the row starts with a selection cell (a checkbox for pref rows,
     * an empty cell for the "add new pref" row so the fixed table layout stays
     * aligned). Returns the cell.
     */
    function ensureSelectCell(row, withCheckbox) {
      let cell = row.querySelector(":scope > td.uc-select-cell");
      if (!cell) {
        cell = doc.createElement("td");
        cell.className = "uc-select-cell";
        cell.style.cssText =
          "width:28px;padding:0 8px;text-align:center;vertical-align:middle;";

        if (withCheckbox) {
          cell.style.cursor = "pointer";
          const checkbox = doc.createElement("input");
          checkbox.type = "checkbox";
          checkbox.className = "uc-select-checkbox";
          checkbox.title = "Select this preference";
          // Don't let the click reach the row (which would start editing).
          checkbox.addEventListener("click", (e) => e.stopPropagation());
          checkbox.addEventListener("change", () => {
            const name = prefName(row);
            if (!name) {
              return;
            }
            if (checkbox.checked) {
              selectedNames.add(name);
            } else {
              selectedNames.delete(name);
            }
            applyRowState(row, checkbox.checked);
          });
          cell.appendChild(checkbox);
        }

        row.insertBefore(cell, row.firstChild);
      }
      return cell;
    }

    function syncRow(row) {
      if (!isPrefRow(row)) {
        return;
      }
      const cell = ensureSelectCell(row, true);
      const checkbox = cell.querySelector("input");
      const name = prefName(row);
      const on = !!name && selectedNames.has(name);
      checkbox.checked = on;
      applyRowState(row, on);
    }

    function syncAll() {
      for (const row of table.querySelectorAll("tr")) {
        if (row.tagName !== "TR") {
          continue;
        }
        if (row.classList.contains("add")) {
          ensureSelectCell(row, false);
          continue;
        }
        syncRow(row);
      }
    }

    function setSelected(row, on) {
      const name = prefName(row);
      if (!name) {
        return;
      }
      if (on) {
        selectedNames.add(name);
      } else {
        selectedNames.delete(name);
      }
      syncRow(row);
    }

    function clearSelection() {
      selectedNames.clear();
      lastRow = null;
      syncAll();
    }

    function copySelection() {
      const text = Array.from(selectedNames)
        .map(formatPref)
        .filter(Boolean)
        .join("\n");
      if (text) {
        clipboard().copyString(text);
      }
    }

    function onTableClick(event) {
      if (event.target.closest("button, input, label, a, select")) {
        return;
      }
      const row = event.target.closest("tr");
      if (!row || !table.contains(row) || !isPrefRow(row)) {
        return;
      }
      const name = prefName(row);
      const on = !!name && selectedNames.has(name);

      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
        setSelected(row, !on);
        lastRow = row;
      } else if (event.shiftKey && lastRow && table.contains(lastRow)) {
        const rows = Array.from(table.querySelectorAll("tr")).filter(isPrefRow);
        const a = rows.indexOf(lastRow);
        const b = rows.indexOf(row);
        if (a >= 0 && b >= 0) {
          selectedNames.clear();
          for (let i = Math.min(a, b); i <= Math.max(a, b); i++) {
            const n = prefName(rows[i]);
            if (n) {
              selectedNames.add(n);
            }
          }
          lastRow = row;
          syncAll();
        }
      } else if (!on) {
        clearSelection();
        lastRow = row;
      }
    }

    function onKeyDown(event) {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "c" &&
        selectedNames.size
      ) {
        event.preventDefault();
        event.stopPropagation();
        copySelection();
      } else if (event.key === "Escape") {
        clearSelection();
      }
    }

    table.addEventListener("click", onTableClick);
    doc.addEventListener("keydown", onKeyDown, true);

    // Keep checkboxes in sync as rows are added/rebuilt and clear the selection
    // when the search filter changes.
    const observer = new win.MutationObserver(() => syncAll());
    observer.observe(table, { childList: true, subtree: true });

    const search = doc.getElementById("about-config-search");
    const onSearch = () => clearSelection();
    search?.addEventListener("input", onSearch);

    const toolbar = doc.getElementById("toolbar");
    if (toolbar && !doc.getElementById("uc-multiselect-copy")) {
      const button = doc.createElement("button");
      button.id = "uc-multiselect-copy";
      button.textContent = "Copy as user_pref()";
      button.title =
        "Copy the selected prefs as user_pref(...) lines (Ctrl+click or tick checkboxes to multi-select)";
      button.addEventListener("click", (e) => {
        e.preventDefault();
        copySelection();
      });
      toolbar.appendChild(button);
    }

    syncAll();

    win.addEventListener(
      "unload",
      () => {
        observer.disconnect();
        table.removeEventListener("click", onTableClick);
        doc.removeEventListener("keydown", onKeyDown, true);
        search?.removeEventListener("input", onSearch);
        clearSelection();
      },
      { once: true },
    );
  }

  const progressListener = {
    onLocationChange(browser, _webProgress, _request, location) {
      if (location?.spec?.startsWith("about:config")) {
        waitForTable(browser);
      }
    },
  };

  gBrowser.addTabsProgressListener(progressListener);

  for (const tab of gBrowser.tabs) {
    const browser = tab.linkedBrowser;
    if (getConfigDoc(browser)) {
      waitForTable(browser);
    }
  }

  window.addEventListener(
    "unload",
    () => gBrowser.removeTabsProgressListener(progressListener),
    { once: true },
  );
})();
