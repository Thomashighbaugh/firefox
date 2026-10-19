// ==UserScript==
// @name           Library Page Redirect
// @description    Repoints every Library entry point to the theme's Library page instead of the legacy Places organizer window or downloads popup: the Library toolbar button, the app-menu Library entries, the History/Bookmarks "Show All" commands (menu + Ctrl+Shift+H / Ctrl+Shift+O), the Downloads command (Ctrl+Shift+J), and — as a catch-all — PlacesCommandHook.showPlacesOrganizer itself.
// @author         Thomas Leon Highbaugh
// @version        1.2.0
// @include        main
// ==/UserScript==

(function () {
  "use strict";

  const PREF = "userchrome.library.page.enabled";
  const BASE = "chrome://userchrome/content/library/library.html";
  const SYSTEM = Services.scriptSecurityManager.getSystemPrincipal();
  const VIEWS = ["bookmarks", "history", "downloads", "groups"];
  const CLICK_TRIGGERS =
    "#library-button, #appMenu-library-button, #appMenu-libraryView-library-button, #appMenu-library-downloads-button, #appMenu-downloads-button";
  const COMMAND_VIEWS = {
    "Browser:ShowAllHistory": "history",
    "Browser:ShowAllBookmarks": "bookmarks",
    "Tools:Downloads": "downloads",
  };
  const ORGANIZER_VIEWS = {
    History: "history",
    Downloads: "downloads",
    BookmarksMenu: "bookmarks",
    BookmarksToolbar: "bookmarks",
    UnfiledBookmarks: "bookmarks",
    AllBookmarks: "bookmarks",
  };

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

  function onClick(event) {
    if (!enabled()) return;
    if (!event.target.closest(CLICK_TRIGGERS)) return;
    event.preventDefault();
    event.stopPropagation();
    openLibrary(null);
  }

  // Menu items and keyboard shortcuts route through <command> elements.
  function onCommand(event) {
    if (!enabled()) return;
    const target = event.target;
    const id = target?.id || target?.getAttribute?.("command");
    const view = COMMAND_VIEWS[id];
    if (!view) return;
    event.preventDefault();
    event.stopPropagation();
    openLibrary(view);
  }

  // Catch-all: every remaining path into the legacy Places organizer window
  // (including the downloads popup footer and the bookmark-folder commands)
  // funnels through PlacesCommandHook.showPlacesOrganizer.
  function patch() {
    const hook = window.PlacesCommandHook;
    if (hook && !hook.__libraryPagePatched) {
      hook.showPlacesOrganizer = function (item) {
        if (!enabled()) return;
        openLibrary(ORGANIZER_VIEWS[item] ?? "bookmarks");
      };
      hook.__libraryPagePatched = true;
    }

    const panel = window.DownloadsPanel;
    if (panel && !panel.__libraryPagePatched) {
      panel.showDownloadsHistory = function () {
        if (!enabled()) return;
        this.hidePanel?.();
        openLibrary("downloads");
      };
      panel.__libraryPagePatched = true;
    }
  }

  function boot() {
    patch();
    // The browser subscripts may define these after we run; retry briefly.
    let tries = 0;
    const timer = setInterval(() => {
      patch();
      if ((window.PlacesCommandHook?.__libraryPagePatched && window.DownloadsPanel?.__libraryPagePatched) || ++tries > 40) {
        clearInterval(timer);
      }
    }, 250);
  }

  window.addEventListener("click", onClick, true);
  document.addEventListener("command", onCommand, true);
  if (document.readyState === "complete") boot();
  else window.addEventListener("load", boot, { once: true });

  window.addEventListener(
    "unload",
    () => {
      window.removeEventListener("click", onClick, true);
      document.removeEventListener("command", onCommand, true);
    },
    { once: true },
  );
})();