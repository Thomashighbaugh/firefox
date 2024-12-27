// ==UserScript==
// @name           Private Window Homepage @version        1.0
// @author         aminomancer
// @homepage  https://github.com/aminomancer/uc.css.js
// @description    This script modifies
// the default behavior of private windows in Firefox. Instead of opening the
// first tab to about:privatebrowsing, it allows private windows to respect the
// user's homepage and new tab page preferences, similar to ordinary windows.
// ==/UserScript==

(function () {
  function init() {
    window.og_OpenBrowserWindow = OpenBrowserWindow;
    eval(
      `OpenBrowserWindow = ` +
        OpenBrowserWindow.toSource().replace(
          /\N*\s*if \(\!PrivateBrowsingUtils\.permanentPrivateBrowsing\) {\s*.*\s*defaultArgs \= \"about\:privatebrowsing\"\;\s*\}/gm,
          ``,
        ),
    );
  }
  if (gBrowserInit.delayedStartupFinished) init();
  else {
    let delayedListener = (subject, topic) => {
      if (topic == "browser-delayed-startup-finished" && subject == window) {
        Services.obs.removeObserver(delayedListener, topic);
        init();
      }
    };
    Services.obs.addObserver(
      delayedListener,
      "browser-delayed-startup-finished",
    );
  }
})();
