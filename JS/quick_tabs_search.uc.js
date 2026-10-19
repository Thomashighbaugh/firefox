// ==UserScript==
// @name           Quick Tabs — Search Selection
// @description    With text selected, a hotkey (Ctrl+Alt+S) or the right-click menu opens a Quick Tab searching the default engine for that text. Complements quick_tabs.uc.js.
// @author         Thomas Leon Highbaugh
// @version        1.0.0
// @include        main
// ==/UserScript==

(function () {
  "use strict";

  const lazy = {};
  // FF157 removed Services.search; the search service is now an importable
  // singleton module. SelectionUtils still lives at the legacy resource URI.
  ChromeUtils.defineESModuleGetters(lazy, {
    SearchService: "moz-src:///toolkit/components/search/SearchService.sys.mjs",
    SelectionUtils: "resource://gre/modules/SelectionUtils.sys.mjs",
  });

  /* ===== Configuration (prefs override these at runtime) ===== */
  const DEFAULT_OPTS = {
    enabled: true,
    key: "S",
    modifiers: "accel alt",
    menuEnabled: true,
  };

  const PREF = {
    enabled: "userchrome.quicktabs.search.enabled",
    key: "userchrome.quicktabs.search.key",
    modifiers: "userchrome.quicktabs.search.modifiers",
    menu: "userchrome.quicktabs.search.menu",
  };

  const MENU_ID = "qt-context-search-menuitem";
  const KEY_ID = "qt-key-search-selection";

  function readOpts() {
    const o = Object.assign({}, DEFAULT_OPTS);
    try {
      o.enabled = Services.prefs.getBoolPref(PREF.enabled, o.enabled);
      o.key = Services.prefs.getStringPref(PREF.key, o.key);
      o.modifiers = Services.prefs.getStringPref(PREF.modifiers, o.modifiers);
      o.menuEnabled = Services.prefs.getBoolPref(PREF.menu, o.menuEnabled);
    } catch (_) {
      /* keep defaults */
    }
    return o;
  }

  /* ===== Selected text ===== */
  // `browser.documentGlobal` is the *chrome* window, not the content window,
  // so getSelectionDetails only works against a same-process (privileged) page.
  // For remote content we ask the ContextMenu child actor over IPC.
  function getSelectedText() {
    try {
      if (gContextMenu?.isTextSelected && gContextMenu.selectedText) {
        return gContextMenu.selectedText.trim();
      }
      const browser = gBrowser?.selectedBrowser;
      if (!browser || !browser.isRemoteBrowser) {
        const info = lazy.SelectionUtils.getSelectionDetails(
          browser?.documentGlobal ?? window,
        );
        const text = (info?.text ?? "").trim();
        if (text) return text;
      }
      return "";
    } catch (_) {
      return "";
    }
  }

  async function getSelectedTextRemote() {
    try {
      const actor =
        gBrowser?.selectedBrowser?.browsingContext?.currentWindowGlobal?.getActor(
          "ContextMenu",
        );
      if (!actor) return "";
      return (await actor.sendQuery("QT:GetSelection", {})) ?? "";
    } catch (_) {
      return "";
    }
  }

  /* ===== Default-engine submission URL for a query ===== */
  async function searchUrlFor(text) {
    try {
      // Wait for init so `defaultEngine` doesn't throw before it's ready.
      await lazy.SearchService.init();
      const engine = lazy.SearchService.defaultEngine;
      if (!engine) return null;
      const submission = engine.getSubmission(text, null, "contextmenu");
      return submission?.uri?.spec ?? null;
    } catch (_) {
      return null;
    }
  }

  /* ===== Open a Quick Tab at the results page ===== */
  async function openSearchQuickTab(text, remoteFallback) {
    let query = (text || "").trim();
    if (!query && typeof remoteFallback === "function") {
      query = (await remoteFallback()) || "";
    }
    if (!query) return false;
    const url = await searchUrlFor(query);
    if (!url) return false;

    const host = window.QuickTabs;
    if (!host || typeof host.open !== "function") {
      // Fall back to a normal tab if the QuickTabs mod is not loaded.
      gBrowser.addTab(url, {
        triggeringPrincipal: Services.scriptSecurityManager.getSystemPrincipal(),
      });
      return true;
    }
    const title = query.length > 30 ? query.slice(0, 27) + "..." : query;
    return !!host.open(url, title);
  }

  /* ===== Context-menu item ===== */
  function addContextMenuItem(opts) {
    const menu = document.getElementById("contentAreaContextMenu");
    if (!menu) {
      setTimeout(() => addContextMenuItem(opts), 500);
      return;
    }
    if (document.getElementById(MENU_ID)) return;

    const item = document.createXULElement("menuitem");
    item.id = MENU_ID;
    item.setAttribute("label", "Search in Quick Tab");
    item.setAttribute("accesskey", "Q");
    item.setAttribute("hidden", "true");

    // Place it right after the native "Search … for …" item, if present.
    const anchor =
      document.getElementById("context-searchselect") ||
      document.getElementById("context-sep-selectall") ||
      menu.firstElementChild;
    if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(item, anchor.nextSibling);
    else menu.appendChild(item);

    item.addEventListener("command", () => {
      const text = (gContextMenu && gContextMenu.selectedText) || getSelectedText();
      openSearchQuickTab(text, () => getSelectedTextRemote());
    });

    menu.addEventListener("popupshowing", () => {
      const mi = document.getElementById(MENU_ID);
      if (!mi) return;
      const o = readOpts();
      const hasSelection = !!(gContextMenu && gContextMenu.isTextSelected);
      mi.hidden = !o.enabled || !o.menuEnabled || !hasSelection;
      if (!mi.hidden && gContextMenu?.selectedText) {
        const t = gContextMenu.selectedText.trim();
        mi.setAttribute(
          "label",
          t.length > 20 ? `Search in Quick Tab for "${t.slice(0, 17)}…"` : `Search in Quick Tab for "${t}"`,
        );
      }
    });
  }

  /* ===== Hotkey (XUL <key>, rebindable via prefs) ===== */
  let currentKeyEl = null;
  function installHotkey(opts) {
    if (currentKeyEl?.parentNode) currentKeyEl.remove();
    currentKeyEl = null;
    if (!opts.enabled) return;

    const keyset = document.getElementById("mainKeyset") || document.querySelector("keyset");
    if (!keyset) return;

    const keyEl = document.createXULElement("key");
    keyEl.id = KEY_ID;
    keyEl.setAttribute("key", opts.key);
    if (opts.modifiers) keyEl.setAttribute("modifiers", opts.modifiers);
    keyEl.addEventListener("command", () => {
      if (!readOpts().enabled) return;
      openSearchQuickTab(getSelectedText(), () => getSelectedTextRemote());
    });
    keyset.appendChild(keyEl);
    currentKeyEl = keyEl;
  }

  /* ===== Pref observer (live rebinding) ===== */
  const prefObserver = {
    observe() {
      const o = readOpts();
      installHotkey(o);
      const mi = document.getElementById(MENU_ID);
      if (mi && !o.enabled) mi.hidden = true;
    },
  };

  /* ===== Init / teardown ===== */
  function init() {
    addContextMenuItem(readOpts());
    installHotkey(readOpts());
    try {
      Services.prefs.addObserver("userchrome.quicktabs.search.", prefObserver);
    } catch (_) {
      /* ignore */
    }
  }

  window.addEventListener("unload", () => {
    try {
      Services.prefs.removeObserver("userchrome.quicktabs.search.", prefObserver);
    } catch (_) {
      /* ignore */
    }
    if (currentKeyEl?.parentNode) currentKeyEl.remove();
    document.getElementById(MENU_ID)?.remove();
  });

  /* ===== Public API ===== */
  window.QuickTabsSearch = {
    searchSelection: () =>
      openSearchQuickTab(getSelectedText(), () => getSelectedTextRemote()),
    matches: (text) => searchUrlFor(text),
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    setTimeout(init, 100);
  }
})();