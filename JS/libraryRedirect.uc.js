// ==UserScript==
// @name           Library Page Redirect
// @description    Repoints the Library toolbar button, the app-menu Library entries, and the "Show All History" / "Show All Bookmarks" commands (menu + Ctrl+Shift+H / Ctrl+Shift+O) to the theme's Library page instead of the popup / Places organizer window.
// @author         Thomas Leon Highbaugh
// @version        1.1.0
// @include        main
// ==/UserScript==

(function () {
  "use strict";

  const PREF = "higgs.library.page.enabled";
  const BASE = "chrome://userchrome/content/library/library.html";
  const SYSTEM = Services.scriptSecurityManager.getSystemPrincipal();
  const CLICK_TRIGGERS =
    "#library-button, #appMenu-library-button, #appMenu-libraryView-library-button";

  const enabled = () => Services.prefs.getBoolPref(PREF, true);

  /** Open (or focus) the Library page, optionally on a specific view. */
  function openLibrary(view) {
    const url = view ? `${BASE}#${view}` : BASE;
    for (const tab of gBrowser.tabs) {
      const spec = tab.linkedBrowser?.currentURI?.spec ?? "";
      if (spec.startsWith(BASE)) {
        gBrowser.selectedTab = tab;
        try {
          tab.linkedBrowser.loadURI(Services.io.newURI(url), {
            triggeringPrincipal: SYSTEM,
          });
        } catch (e) {
          /* ignore */
        }
        window.focus();
        return;
      }
    }
    gBrowser.addTab(url, { triggeringPrincipal: SYSTEM });
  }

  function viewForCommand(id) {
    if (id === "Browser:ShowAllHistory") return "history";
    if (id === "Browser:ShowAllBookmarks") return "bookmarks";
    return null;
  }

  function onClick(event) {
    if (!enabled()) return;
    if (!event.target.closest(CLICK_TRIGGERS)) return;
    event.preventDefault();
    event.stopPropagation();
    openLibrary(null);
  }

  // "Show All History" / "Show All Bookmarks" route through <command> elements;
  // intercepting the command event catches the menu items and the shortcuts.
  function onCommand(event) {
    if (!enabled()) return;
    const target = event.target;
    const id = target?.id || target?.getAttribute?.("command");
    const view = viewForCommand(id);
    if (!view) return;
    event.preventDefault();
    event.stopPropagation();
    openLibrary(view);
  }

  window.addEventListener("click", onClick, true);
  document.addEventListener("command", onCommand, true);
  window.addEventListener(
    "unload",
    () => {
      window.removeEventListener("click", onClick, true);
      document.removeEventListener("command", onCommand, true);
    },
    { once: true },
  );
})();
