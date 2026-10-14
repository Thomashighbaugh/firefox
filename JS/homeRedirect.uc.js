// ==UserScript==
// @name           Home / New Tab Redirect
// @description    Loads the custom Home page (All-Tabs-Menu content + Firefox View sections) for new tabs. The fork will instead patch AboutNewTab.sys.mjs; this keeps the behaviour working on stock Firefox in the meantime.
// @author         Thomas Leon Highbaugh
// @version        1.0.0
// @include        main
// ==/UserScript==

(function () {
  "use strict";

  const PREF = "higgs.home.newtab.enabled";
  if (!Services.prefs.getBoolPref(PREF, true)) {
    return;
  }

  const HOME = "chrome://userchrome/content/home/home.xhtml";
  const REDIRECT_SPECS = new Set(["about:newtab"]);

  const listener = {
    onLocationChange(browser, webProgress, request, uri) {
      if (!webProgress.isTopLevel || !uri) {
        return;
      }
      if (!REDIRECT_SPECS.has(uri.spec)) {
        return;
      }
      browser.loadURI(Services.io.newURI(HOME), {
        triggeringPrincipal:
          Services.scriptSecurityManager.getSystemPrincipal(),
      });
    },
  };

  gBrowser.addTabsProgressListener(listener);
  window.addEventListener(
    "unload",
    () => gBrowser.removeTabsProgressListener(listener),
    { once: true },
  );
})();
