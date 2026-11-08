// ==UserScript==
// @name           Home / New Tab Redirect
// @description    Loads the custom Home page (All-Tabs-Menu content + Firefox View sections) for new tabs AND as the homepage: new tabs go through AboutNewTab.newTabURL, the startup page and home button through browser.startup.homepage — but only while that pref is still the stock default (a homepage the user configured themselves is never touched; disabling the feature restores the default). The fork will instead patch AboutNewTab.sys.mjs; this keeps the behaviour working on stock Firefox in the meantime.
// @author         Thomas Leon Highbaugh
// @version        1.3.0
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
  const HOMEPAGE_PREF = "browser.startup.homepage";
  const HOMEPAGE_DEFAULT = "about:home";

  const debug = (...args) => {
    if (Services.prefs.getBoolPref(DEBUG_PREF, false)) {
      console.log("[homeRedirect]", ...args);
    }
  };
  const enabled = () => Services.prefs.getBoolPref(PREF, true);

  function setOverride() {
    // init() first so a later init() can't race us: once initialised, the
    // toggleActivityStream(true) guard (_newTabURLOverridden) already sees our
    // override and won't reset _newTabURL back to about:newtab.
    if (!lazy.AboutNewTab.initialized) {
      lazy.AboutNewTab.init();
    }
    lazy.AboutNewTab.newTabURL = HOME;
    debug("newTabURL ->", HOME, "| now:", lazy.AboutNewTab.newTabURL);
  }

  function apply() {
    try {
      if (enabled()) {
        setOverride();
      } else if (lazy.AboutNewTab.newTabURL === HOME) {
        lazy.AboutNewTab.resetNewTabURL();
        debug("reset to", NATIVE);
      }
    } catch (e) {
      console.error("[homeRedirect] apply failed:", e);
    }
    applyHomepage();
  }

  /**
   * True while browser.startup.homepage carries no user decision of its own:
   * no user value at all, the built-in default, or a value this script set.
   * A homepage the user configured themselves is never touched.
   */
  function homepageIsOurs() {
    if (!Services.prefs.prefHasUserValue(HOMEPAGE_PREF)) {
      return true;
    }
    const value = Services.prefs.getStringPref(HOMEPAGE_PREF);
    return value === HOMEPAGE_DEFAULT || value === HOME;
  }

  /**
   * about:home is a separate channel from about:newtab: the startup page and
   * the home button read browser.startup.homepage and the stock activity
   * stream serves it, ignoring the AboutNewTab.newTabURL override. Point the
   * pref at the custom Home page while it is still the stock default; restore
   * the default when the feature is disabled.
   */
  function applyHomepage() {
    try {
      if (enabled()) {
        if (
          homepageIsOurs() &&
          Services.prefs.getStringPref(HOMEPAGE_PREF, "") !== HOME
        ) {
          Services.prefs.setStringPref(HOMEPAGE_PREF, HOME);
          debug("homepage ->", HOME);
        }
      } else if (
        Services.prefs.prefHasUserValue(HOMEPAGE_PREF) &&
        Services.prefs.getStringPref(HOMEPAGE_PREF) === HOME
      ) {
        Services.prefs.clearUserPref(HOMEPAGE_PREF);
        debug("homepage restored to default");
      }
    } catch (e) {
      console.error("[homeRedirect] homepage apply failed:", e);
    }
  }

  // Re-assert if something else changes the new-tab URL away from Home while
  // we're enabled (e.g. an extension or a later toggleActivityStream).
  const urlObserver = {
    observe(_subject, _topic, data) {
      if (enabled() && data !== HOME) {
        debug("newtab-url-changed to", data, "-> re-asserting", HOME);
        apply();
      }
    },
  };

  apply();

  const prefObserver = { observe: apply };
  try {
    Services.prefs.addObserver(PREF, prefObserver);
    Services.obs.addObserver(urlObserver, "newtab-url-changed");
  } catch (e) {
    /* ignore */
  }

  window.addEventListener(
    "unload",
    () => {
      try {
        Services.prefs.removeObserver(PREF, prefObserver);
        Services.obs.removeObserver(urlObserver, "newtab-url-changed");
      } catch (e) {
        /* ignore */
      }
    },
    { once: true },
  );
})();
