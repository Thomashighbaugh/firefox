// ==UserScript==
// @name           Home / New Tab Redirect
// @description    Loads the custom Home page (All-Tabs-Menu content + Firefox View sections) for new tabs. The fork will instead patch AboutNewTab.sys.mjs; this keeps the behaviour working on stock Firefox in the meantime.
// @author         Thomas Leon Highbaugh
// @version        1.1.0
// @include        main
// ==/UserScript==

(function () {
  "use strict";

  const PREF = "higgs.home.newtab.enabled";
  const DEBUG_PREF = "higgs.home.debug";
  const HOME = "chrome://userchrome/content/home/home.html";
  // `about:home` (the home button / startup page) and `about:newtab`.
  const TARGETS = new Set(["about:newtab", "about:home"]);

  const SYSTEM = Services.scriptSecurityManager.getSystemPrincipal();
  const HOME_URI = Services.io.newURI(HOME);

  const debug = (...args) => {
    if (Services.prefs.getBoolPref(DEBUG_PREF, false)) {
      console.log("[homeRedirect]", ...args);
    }
  };

  const listener = {
    onLocationChange(browser, webProgress, request, uri) {
      if (!uri || !gBrowser.getTabForBrowser(browser)) {
        return;
      }
      if (!TARGETS.has(uri.spec)) {
        return;
      }
      if (!Services.prefs.getBoolPref(PREF, true)) {
        return;
      }
      const spec = uri.spec;
      debug("saw", spec);
      // Defer: navigating synchronously from inside onLocationChange is
      // unreliable. Re-check that the browser is still on the target first.
      Services.tm.dispatchToMainThread(() => {
        if (browser.currentURI?.spec !== spec) {
          return;
        }
        debug("redirecting", spec, "->", HOME);
        try {
          browser.loadURI(HOME_URI, { triggeringPrincipal: SYSTEM });
        } catch (e) {
          console.error("[homeRedirect] loadURI failed:", e);
        }
      });
    },
  };

  gBrowser.addTabsProgressListener(listener);
  debug("installed");
  window.addEventListener(
    "unload",
    () => gBrowser.removeTabsProgressListener(listener),
    { once: true },
  );
})();
