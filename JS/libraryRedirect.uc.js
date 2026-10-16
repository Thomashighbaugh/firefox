// ==UserScript==
// @name           Library Page Redirect
// @description    Repoints the toolbar Library button (and the app-menu Library entry) to the theme's Library page (bookmarks + history + downloads + tab groups) instead of the popup.
// @author         Thomas Leon Highbaugh
// @version        1.0.0
// @include        main
// ==/UserScript==

(function () {
  "use strict";

  const PREF = "higgs.library.page.enabled";
  const PAGE = "chrome://userchrome/content/library/library.html";
  const SYSTEM = Services.scriptSecurityManager.getSystemPrincipal();
  const TRIGGERS = "#library-button, #appMenu-library-button, #appMenu-libraryView-library-button";

  function onClick(event) {
    const trigger = event.target.closest(TRIGGERS);
    if (!trigger) {
      return;
    }
    if (!Services.prefs.getBoolPref(PREF, true)) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    gBrowser.addTab(PAGE, { triggeringPrincipal: SYSTEM });
  }

  window.addEventListener("click", onClick, true);
  window.addEventListener(
    "unload",
    () => window.removeEventListener("click", onClick, true),
    { once: true },
  );
})();
