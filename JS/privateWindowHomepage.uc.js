// ==UserScript==
// @name           Private Window Homepage
// @version        2.0.0
// @author         aminomancer (rewritten for fx-autoconfig)
// @homepage       https://github.com/aminomancer/uc.css.js
// @description    Makes private windows respect the configured homepage / new
// tab page instead of always landing on about:privatebrowsing.
// @include        main
// @onlyonce
// ==/UserScript==

/**
 * Rewritten without the previous `Function.prototype.toSource()` + `eval()`
 * patch of `OpenBrowserWindow`. On current Firefox `OpenBrowserWindow(options)`
 * is just a thin wrapper over `BrowserWindowTracker.openWindow`, so the old
 * source-rewrite regex targeted code that no longer exists and silently did
 * nothing. Instead we observe new windows finishing their delayed startup and,
 * *only* when a private window landed on the default `about:privatebrowsing`,
 * navigate its first tab to the configured startup page.
 */

(function () {
  "use strict";

  const PRIVATE_HOME = "about:privatebrowsing";

  /**
   * Resolve the user's configured startup page, mirroring the semantics of
   * `browser.startup.page`:
   *   0 = blank, 1 = home page, 2 = last session, 3 = home page (resume).
   * Returns null when the user wants a blank/session page, so we leave the
   * native private-window behaviour untouched in those cases.
   */
  function getStartupURL() {
    try {
      const page = Services.prefs.getIntPref("browser.startup.page", 1);
      if (page !== 1 && page !== 3) {
        return null;
      }
      const home = Services.prefs.getStringPref(
        "browser.startup.homepage",
        "",
      );
      if (!home || home === "about:blank") {
        return null;
      }
      return home;
    } catch (e) {
      return null;
    }
  }

  function applyToPrivateWindow(win) {
    try {
      if (!win || !win.gBrowser || !PrivateBrowsingUtils.isWindowPrivate(win)) {
        return;
      }
      const url = getStartupURL();
      if (!url) {
        return;
      }
      const browser = win.gBrowser.selectedBrowser;
      // Only replace the *default* landing page; leave an explicit
      // about:privatebrowsing navigation (or any other page) alone.
      if (browser?.currentURI?.spec !== PRIVATE_HOME) {
        return;
      }
      win.gBrowser.loadURI(url, {
        triggeringPrincipal: Services.scriptSecurityManager.getSystemPrincipal(),
      });
    } catch (e) {
      console.error(e);
    }
  }

  // `browser-delayed-startup-finished` fires once per chrome window, with the
  // window as the subject. Registered once (this script is @onlyonce) and left
  // in place for the session.
  Services.obs.addObserver(
    {
      observe(subject) {
        applyToPrivateWindow(subject);
      },
    },
    "browser-delayed-startup-finished",
  );
})();
