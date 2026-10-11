// ==UserScript==
// @name           All Tabs Menu Expansion Pack
// @version        3.0.0
// @author         aminomancer (rewritten for fx-autoconfig / Firefox 157)
// @homepageURL    https://github.com/aminomancer
// @long-description
// @description
/*
Adds the pieces the vanilla "all tabs" menu still lacks on current Firefox:

 - Reverses the order of tabs in the all-tabs menu (newest on top) when the
   boolean pref `userChrome.tabs.all-tabs-menu.reverse-order` is true.
 - Marks unloaded / pending tabs in the menu (`pending="true"` on the row) so
   they can be dimmed, matching the `pending` attribute used by the tab bar.
 - Marks pinned tabs (`pinned="true"`) and container tabs (`usercontextid`)
   on menu rows for styling.

REWRITE NOTES
The previous version patched Firefox internals -- `TabsList`'s `_populate` /
`_addTab`, the `PanelView` tree walkers and `PictureInPicture` -- by
string-rewriting their own function source through
`Function.prototype.toSource()` + `eval()`. Two things made that unworkable:

 1. `TabsPanel` moved from `resource:///modules/TabsList.sys.mjs` to
    `moz-src:///browser/components/tabbrowser/TabsList.sys.mjs`, and the
    internal source those regexes matched no longer exists, so the patches
    silently did nothing (or produced broken functions).
 2. The menu itself gained native close buttons, mute buttons, container
    stripes, sound indicators, drag-and-drop and multi-select, so most of the
    old hacks are obsolete.

This rewrite never calls `eval` and only wraps the current methods.
*/
// @include        main
// @onlyonce
// ==/UserScript==

(function () {
  "use strict";

  const REVERSE_PREF = "userChrome.tabs.all-tabs-menu.reverse-order";
  const TABS_LIST_MODULE =
    "moz-src:///browser/components/tabbrowser/TabsList.sys.mjs";

  const lazy = {};
  Object.defineProperty(lazy, "TabsPanel", {
    get() {
      let panel;
      try {
        panel = ChromeUtils.importESModule(TABS_LIST_MODULE).TabsPanel;
      } catch (e) {
        console.error("[ATMEP] could not load TabsList.sys.mjs", e);
        return null;
      }
      Object.defineProperty(lazy, "TabsPanel", {
        value: panel,
        configurable: true,
      });
      return panel;
    },
    configurable: true,
  });

  function prefBool(name, fallback = false) {
    try {
      return Services.prefs.getBoolPref(name);
    } catch (e) {
      return fallback;
    }
  }

  /**
   * Add state attributes the vanilla menu doesn't expose, and reverse the
   * order when requested.
   * @param {object} panel - a TabsPanel instance
   */
  function decoratePanel(panel) {
    const container = panel?.containerNode;
    if (!container) {
      return;
    }
    for (const row of container.querySelectorAll(":scope > .all-tabs-item")) {
      const tab = row._tab;
      if (!tab) {
        continue;
      }
      const pending =
        tab.hasAttribute("pending") || !tab.linkedBrowser?.browsingContext;
      row.toggleAttribute("pending", pending);
      row.toggleAttribute("pinned", !!tab.pinned);
      if (tab.userContextId) {
        row.setAttribute("usercontextid", String(tab.userContextId));
      }
    }
    if (prefBool(REVERSE_PREF)) {
      reverseChildren(container);
    }
  }

  function reverseChildren(container) {
    const children = Array.from(container.children);
    for (let i = children.length - 1; i >= 0; i--) {
      container.appendChild(children[i]);
    }
  }

  /**
   * Wrap the current `_populate` / `_addTab` methods. Both are implemented on
   * `TabsPanel`/`TabsListBase`; wrapping the prototype affects every window's
   * panel because the prototype is shared.
   * @param {Function} TabsPanel
   */
  function patchPanelClass(TabsPanel) {
    const proto = TabsPanel.prototype;
    if (proto.__ucATMEPPatched) {
      return;
    }

    const originalPopulate = proto._populate;
    proto._populate = function ucATMEP_populate(...args) {
      const rv = originalPopulate.apply(this, args);
      decoratePanel(this);
      return rv;
    };

    const originalAddTab = proto._addTab;
    if (typeof originalAddTab === "function") {
      proto._addTab = function ucATMEP_addTab(...args) {
        const rv = originalAddTab.apply(this, args);
        decoratePanel(this);
        return rv;
      };
    }

    Object.defineProperty(proto, "__ucATMEPPatched", { value: true });
  }

  function onPrefChange() {
    const panel = gTabsPanel?.allTabsPanel;
    if (panel) {
      decoratePanel(panel);
    }
  }

  // Injected the same way the original did: a data: sheet registered through
  // the style-sheet service, guarded so it is only ever registered once.
  function registerSheet() {
    const sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(
      Ci.nsIStyleSheetService,
    );
    const css = `
      .all-tabs-item[pending="true"] > .all-tabs-button { opacity: .55; }
      .all-tabs-item[pinned="true"] > .all-tabs-button {
        font-weight: 600;
        border-inline-start: 2px solid currentColor;
      }
    `;
    const uri = Services.io.newURI(
      "data:text/css;charset=utf-8," + encodeURIComponent(css),
      null,
      null,
    );
    if (!sss.sheetRegistered(uri, sss.AUTHOR_SHEET)) {
      sss.loadAndRegisterSheet(uri, sss.AUTHOR_SHEET);
    }
  }

  function init() {
    if (typeof gTabsPanel === "undefined") {
      return;
    }
    const { TabsPanel } = lazy;
    if (!TabsPanel) {
      console.warn("[ATMEP] TabsPanel unavailable; not patching.");
      return;
    }
    patchPanelClass(TabsPanel);
    registerSheet();
    Services.prefs.addObserver(REVERSE_PREF, onPrefChange);
  }

  if (gBrowserInit?.delayedStartupFinished) {
    init();
  } else {
    const onDelayedStartup = (subject, topic) => {
      if (topic !== "browser-delayed-startup-finished" || subject !== window) {
        return;
      }
      Services.obs.removeObserver(onDelayedStartup, topic);
      init();
    };
    Services.obs.addObserver(onDelayedStartup, "browser-delayed-startup-finished");
  }
})();
