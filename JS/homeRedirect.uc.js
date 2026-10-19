// ==UserScript==
// @name           Home / New Tab Redirect
// @description    Loads the custom Home page (All-Tabs-Menu content + Firefox View sections) for new tabs. The fork will instead patch AboutNewTab.sys.mjs; this keeps the behaviour working on stock Firefox in the meantime.
// @author         Thomas Leon Highbaugh
// @version        1.2.0
// @include        main
// ==/UserScript==

(function () {
  "use strict";

  const lazy = {};
  ChromeUtils.defineESModuleGetters(lazy, {
    AboutNewTab: "resource:///modules/AboutNewTab.sys.mjs",
  });

  const PREF = "userchrome.home.newtab.enabled";
  const DEBUG_PREF = "userchrome.home.debug";
  const HOME = "chrome://userchrome/content/home/home.html";
  const NATIVE = "about:newtab";

  const debug = (...args) => {
    if (Services.prefs.getBoolPref(DEBUG_PREF, false)) {
      console.log("[homeRedirect]", ...args);
    }
  };
  const enabled = () => Services.prefs.getBoolPref(PREF, true);

  function apply() {
    try {
      if (enabled()) {
        // Sanctioned FF157 override: setting newTabURL flips newTabURLOverridden,
        // which both serves the page for new tabs and disables the new-tab
        // preloader (so no about:newtab preload swap bypasses it).
        lazy.AboutNewTab.newTabURL = HOME;
        debug("newTabURL ->", HOME);
      } else if (lazy.AboutNewTab.newTabURL === HOME) {
        lazy.AboutNewTab.resetNewTabURL();
        debug("reset to", NATIVE);
      }
    } catch (e) {
      console.error("[homeRedirect] apply failed:", e);
    }
  }

  apply();

  const prefObserver = { observe: apply };
  try {
    Services.prefs.addObserver(PREF, prefObserver);
  } catch (e) {
    /* ignore */
  }

  window.addEventListener(
    "unload",
    () => {
      try {
        Services.prefs.removeObserver(PREF, prefObserver);
      } catch (e) {
        /* ignore */
      }
    },
    { once: true },
  );
})();
