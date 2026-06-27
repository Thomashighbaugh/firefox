// ==UserScript==
// @name           About:config Multiple Selection
// @version        0.4
// @description    Allow multiple selection on about:config and copy prefs as user_pref() format
// @namespace      https://github.com/nightson/
// @author         NightsoN
// @include        chrome://browser/content/browser.xul
// ==/UserScript==

(function () {
  "use strict";

  const NS = "AboutConfigMultiSelect";

  /* ── helpers ──────────────────────────────────────────────────── */

  /**
   * Determine whether a pref value needs quoting for user_pref() output.
   * Strings need quotes; booleans and numbers do not.
   */
  function needsQuotes(raw) {
    if (raw === "true" || raw === "false") return false;
    if (/^-?\d+(\.\d+)?$/.test(raw)) return false;
    return true;
  }

  /**
   * Return a singleton gClipboardHelper.
   */
  function clipboard() {
    return Cc["@mozilla.org/widget/clipboardhelper;1"].getService(
      Ci.nsIClipboardHelper,
    );
  }

  /**
   * Build the user_pref("key", value) text for a pref entry.
   */
  function formatAsUserPref(prefCol, valueCol) {
    if (needsQuotes(valueCol)) {
      return `user_pref("${prefCol}", "${valueCol}");`;
    }
    return `user_pref("${prefCol}", ${valueCol});`;
  }

  /* ── XUL tree path (legacy about:config) ─────────────────────── */

  function initXULTreeMode(doc, win) {
    const configTree = doc.getElementById("configTree");
    if (!configTree) return false;

    configTree.setAttribute("seltype", "multiple");

    const ns = {
      getSelected() {
        const arr = [];
        const rangeCount = win.view.selection.getRangeCount();
        for (let i = 0; i < rangeCount; i++) {
          const start = {},
            end = {};
          win.view.selection.getRangeAt(i, start, end);
          for (let k = start.value; k <= end.value; k++) {
            arr.push(win.gPrefView[k]);
          }
        }
        return arr;
      },

      ResetSelected() {
        this.getSelected().forEach((i) =>
          Services.prefs.clearUserPref(i.prefCol),
        );
      },

      copyPref() {
        clipboard().copyString(
          this.getSelected()
            .map((i) => `${i.prefCol};${i.valueCol}`)
            .join("\n"),
        );
      },

      copyName() {
        clipboard().copyString(
          this.getSelected()
            .map((i) => i.prefCol)
            .join("\n"),
        );
      },

      copyValue() {
        clipboard().copyString(
          this.getSelected()
            .map((i) => i.valueCol)
            .join("\n"),
        );
      },

      copyAsFunction() {
        clipboard().copyString(
          this.getSelected()
            .map((i) => formatAsUserPref(i.prefCol, i.valueCol))
            .join("\n"),
        );
      },

      destroy() {
        configTree.removeAttribute("seltype");
        const item = doc.getElementById(NS + "_copyAsFunction");
        if (item) item.remove();
        delete win[NS];
      },
    };

    win[NS] = ns;
    addContextMenuItem(doc, ns);
    return true;
  }

  /* ── HTML table path (modern about:config, Firefox 115+) ─────── */

  function initHTMLTableMode(doc, win) {
    const table =
      doc.querySelector("table.prefs-table") ||
      doc.querySelector("table") ||
      doc.querySelector("richlistbox");
    if (!table) return false;

    const SELECTED_CLASS = "about-config-multi-selected";
    const selectedRows = new Set();

    /* ---- helpers ---- */

    function getRowData(row) {
      const th = row.querySelector("th");
      const valCell = row.querySelector(".cell-value") || row.cells?.[1];
      const typeCell = row.querySelector(".cell-status") || row.cells?.[2];
      return {
        prefCol: (th || row.cells?.[0])?.textContent?.trim() || "",
        valueCol: valCell?.textContent?.trim() || "",
        typeCol: typeCell?.textContent?.trim() || "",
      };
    }

    function setRowSelected(row, selected) {
      if (selected) {
        selectedRows.add(row);
        row.classList.add(SELECTED_CLASS);
      } else {
        selectedRows.delete(row);
        row.classList.remove(SELECTED_CLASS);
      }
    }

    function clearSelection() {
      selectedRows.forEach((r) => r.classList.remove(SELECTED_CLASS));
      selectedRows.clear();
    }

    /* ---- click handling for multi-select ---- */

    function onTableClick(event) {
      const row = event.target.closest("tr");
      if (!row) return;

      // Ignore thead, "add new pref" rows, and clicks on action buttons
      if (
        row.closest("thead") ||
        row.parentElement?.tagName === "THEAD" ||
        row.classList.contains("add") ||
        event.target.closest("button, .button-edit, .button-reset, .button-toggle, .button-delete, .button-save")
      ) {
        return;
      }

      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
        setRowSelected(row, !selectedRows.has(row));
      } else if (event.shiftKey && selectedRows.size > 0) {
        const rows = Array.from(table.querySelectorAll("tbody tr"));
        const lastRow = Array.from(selectedRows).pop();
        const lastIdx = rows.indexOf(lastRow);
        const currentIdx = rows.indexOf(row);
        if (lastIdx >= 0 && currentIdx >= 0) {
          const [start, end] =
            lastIdx < currentIdx
              ? [lastIdx, currentIdx]
              : [currentIdx, lastIdx];
          clearSelection();
          rows.slice(start, end + 1).forEach((r) => setRowSelected(r, true));
        }
      } else {
        // Ignore plain clicks — let the native click-through happen for editing.
        // Only clear selection if clicking outside any currently selected row.
        if (!selectedRows.has(row)) {
          clearSelection();
        }
      }
    }

    table.addEventListener("click", onTableClick);

    /* ---- namespace ---- */

    const ns = {
      getSelected() {
        return Array.from(selectedRows).map(getRowData);
      },

      ResetSelected() {
        this.getSelected().forEach((i) =>
          Services.prefs.clearUserPref(i.prefCol),
        );
      },

      copyPref() {
        clipboard().copyString(
          this.getSelected()
            .map((i) => `${i.prefCol};${i.valueCol}`)
            .join("\n"),
        );
      },

      copyName() {
        clipboard().copyString(
          this.getSelected()
            .map((i) => i.prefCol)
            .join("\n"),
        );
      },

      copyValue() {
        clipboard().copyString(
          this.getSelected()
            .map((i) => i.valueCol)
            .join("\n"),
        );
      },

      copyAsFunction() {
        clipboard().copyString(
          this.getSelected()
            .map((i) => formatAsUserPref(i.prefCol, i.valueCol))
            .join("\n"),
        );
      },

      destroy() {
        table.removeEventListener("click", onTableClick);
        clearSelection();
        const item = doc.getElementById(NS + "_copyAsFunction");
        if (item) item.remove();
        delete win[NS];
      },
    };

    win[NS] = ns;
    addContextMenuItem(doc, ns);
    injectSelectionCSS(doc);
    return true;
  }

  /* ── context menu ────────────────────────────────────────────── */

  function addContextMenuItem(doc, ns) {
    const contextMenu = doc.getElementById("configContext");
    const copyValueItem = doc.getElementById("copyValue");

    // If the context menu or insertion anchor is missing, bail silently.
    if (!contextMenu || !copyValueItem) return;

    // Avoid duplicates if the script is somehow loaded twice
    if (doc.getElementById(NS + "_copyAsFunction")) return;

    const menuitem = doc.createElement("menuitem");
    menuitem.id = NS + "_copyAsFunction";
    menuitem.setAttribute("label", "Copy as user_pref()");
    menuitem.setAttribute("accesskey", "u");

    menuitem.addEventListener("command", () => {
      const sel = ns.getSelected();
      if (sel.length === 0) return;
      clipboard().copyString(
        sel
          .map((i) => formatAsUserPref(i.prefCol, i.valueCol))
          .join("\n"),
      );
    });

    contextMenu.insertBefore(menuitem, copyValueItem.nextSibling);
  }

  /* ── selection highlight CSS for HTML mode ───────────────────── */

  function injectSelectionCSS(doc) {
    const styleId = NS + "_style";
    if (doc.getElementById(styleId)) return;

    const style = doc.createElementNS(
      "http://www.w3.org/1999/xhtml",
      "style",
    );
    style.id = styleId;
    style.textContent = `
      tr.${NS}-multi-selected,
      tr.${NS}-multi-selected:hover {
        outline: 2px solid Highlight !important;
        outline-offset: -2px !important;
        background-color: rgba(0, 120, 215, 0.12) !important;
      }
    `;
    doc.head?.appendChild(style);
  }

  /* ── entry point ─────────────────────────────────────────────── */

  window.addEventListener(
    "DOMContentLoaded",
    (event) => {
      const doc = event.target;
      if (!doc || !doc.location?.href?.startsWith("about:config")) return;
      const win = doc.defaultView;
      if (!win) return;

      // XUL tree path first; fall back to HTML table path
      if (!initXULTreeMode(doc, win)) {
        initHTMLTableMode(doc, win);
      }
    },
    true,
  );

  /* ── cleanup ─────────────────────────────────────────────────── */

  window.addEventListener(
    "unload",
    () => {
      const ns = window[NS];
      if (ns && typeof ns.destroy === "function") {
        ns.destroy();
      }
    },
    { once: true },
  );
})();
