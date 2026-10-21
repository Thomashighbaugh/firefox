// ==UserScript==
// @name           Logins Page Redirect
// @description    Repoints every password-manager entry point (app menu Passwords button, context menu "Manage Passwords", toolbar, autocomplete footers) to the theme's Logins & Passwords page instead of the stock about:logins. All of these funnel through LoginHelper.openPasswordManager, which this patches.
// @author         Thomas Leon Highbaugh
// @version        1.0.0
// @include        main
// ==/UserScript==

(function () {
  "use strict";

  const PREF = "userchrome.logins.page.enabled";
  const PAGE = "chrome://userchrome/content/logins/logins.html";
  const SYSTEM = Services.scriptSecurityManager.getSystemPrincipal();

  const lazy = {};
  ChromeUtils.defineESModuleGetters(lazy, {
    LoginHelper: "resource://gre/modules/LoginHelper.sys.mjs",
  });

  const enabled = () => Services.prefs.getBoolPref(PREF, true);

  /** Open (or focus) the Logins page. */
  function openLogins() {
    for (const tab of gBrowser.tabs) {
      if ((tab.linkedBrowser?.currentURI?.spec ?? "").startsWith(PAGE)) {
        gBrowser.selectedTab = tab;
        window.focus();
        return;
      }
    }
    gBrowser.addTab(PAGE, { triggeringPrincipal: SYSTEM });
  }

  function patch() {
    const helper = lazy.LoginHelper;
    if (!helper || helper.__loginsPagePatched) return;
    const original = helper.openPasswordManager;
    helper.openPasswordManager = function (window, options) {
      if (!enabled()) {
        return original.call(this, window, options);
      }
      openLogins();
    };
    helper.__loginsPagePatched = true;
    helper.__loginsPageOriginal = original;
  }

  function unpatch() {
    const helper = lazy.LoginHelper;
    if (helper?.__loginsPagePatched) {
      helper.openPasswordManager = helper.__loginsPageOriginal;
      delete helper.__loginsPagePatched;
      delete helper.__loginsPageOriginal;
    }
  }

  // Apply on boot and retry briefly (LoginHelper may be defined after we run).
  patch();
  let tries = 0;
  const timer = setInterval(() => {
    patch();
    if (lazy.LoginHelper?.__loginsPagePatched || ++tries > 40) clearInterval(timer);
  }, 250);

  window.addEventListener("unload", unpatch, { once: true });
})();
