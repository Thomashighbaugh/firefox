// ==UserScript==
// @name           Home / New Tab Redirect
// @description    Loads the custom Home page (All-Tabs-Menu content + Firefox View sections) for new tabs. The fork will instead patch AboutNewTab.sys.mjs; this keeps the behaviour working on stock Firefox in the meantime.
// @author         Thomas Leon Highbaugh
// @version        1.2.0
// @include        main
// ==/UserScript==

(function () {
  "use strict";

  const PREF = "higgs.home.newtab.enabled";
  const DEBUG_PREF = "higgs.home.debug";
  const HOME = "chrome://userchrome/content/home/home.html";
  // `about:newtab` (new tabs) and `about:home` (home button / startup page).
  const TARGETS = new Set(["about:newtab", "about:home"]);

  const SYSTEM = Services.scriptSecurityManager.getSystemPrincipal();
  const HOME_URI = Services.io.newURI(HOME);

  const debug = (...args) => {
    if (Services.prefs.getBoolPref(DEBUG_PREF, false)) {
      console.log("[homeRedirect]", ...args);
    }
  };
  const enabled = () => Services.prefs.getBoolPref(PREF, true);

  // Firefox preloads about:newtab in a detached browser and swaps it into a new
  // tab *without* firing a fresh onLocationChange, so a progress listener alone
  // never sees it. Disabling the preload makes the normal navigation path fire;
  // the TabOpen hook below also covers the preloaded case regardless.
  try {
    if (Services.prefs.getBoolPref("browser.newtab.preload", false)) {
      Services.prefs.setBoolPref("browser.newtab.preload", false);
    }
  } catch (e) {
    /* ignore */
  }

  function redirect(browser) {
    const spec = browser?.currentURI?.spec;
    if (!TARGETS.has(spec)) {
      return false;
    }
    debug("redirecting", spec, "->", HOME);
    try {
      browser.loadURI(HOME_URI, { triggeringPrincipal: SYSTEM });
      return true;
    } catch (e) {
      console.error("[homeRedirect] loadURI failed:", e);
      return false;
    }
  }

  // New tab (covers the preloaded-browser swap): defer so the browser is attached.
  gBrowser.tabContainer.addEventListener("TabOpen", (event) => {
    if (!enabled()) {
      return;
    }
    const { linkedBrowser } = event.target;
    setTimeout(() => redirect(linkedBrowser), 0);
  });

  // Navigations to about:newtab / about:home in any tab.
  const listener = {
    onLocationChange(browser, webProgress, request, uri) {
      if (!uri || !gBrowser.getTabForBrowser(browser)) {
        return;
      }
      if (!TARGETS.has(uri.spec) || !enabled()) {
        return;
      }
      Services.tm.dispatchToMainThread(() => redirect(browser));
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
