// ==UserScript==
// @name           UI Animations
// @description    Ambient motion and micro-interactions adapted from render.js (Zen) to Firefox chrome — shared motion tokens. The tab-group colour swatch fan was removed: elements you need to click must not fly away under the cursor.
// @author         Thomas Leon Highbaugh
// @version        1.1.0
// @homepageURL    https://github.com/SehajveerSingh2005/render.js
// @include        main
// ==/UserScript==

/*
 * Shared motion tokens for Firefox chrome, adapted from render.js (Zen).
 * JS owns nothing animated any more: it only writes --uc-motion-speed and the
 * uc-animations attribute so CSS transitions stay in sync with the user's prefs.
 * The CSS look (swatch glow, transitions, tokens) lives in
 * CSS/chrome/animations.css.
 */

(function () {
  "use strict";

  const PREF = {
    enabled: "userchrome.animations.enabled",
    speed: "userchrome.animations.speed",
  };
  const DEFAULTS = { enabled: true, speed: "0.45s" };

  function opts() {
    const o = { ...DEFAULTS };
    try {
      o.enabled = Services.prefs.getBoolPref(PREF.enabled, o.enabled);
      o.speed = Services.prefs.getStringPref(PREF.speed, o.speed);
    } catch (_) {
      /* keep defaults */
    }
    return o;
  }

  /* Push the speed token + kill-switch onto :root so CSS and JS stay in sync.
     (A bare `-moz-pref()` on an *unset* pref reads false, so CSS cannot safely
     gate on the pref itself — hence the attribute.) */
  function applyTokens() {
    try {
      const o = opts();
      const root = document.documentElement;
      root.setAttribute("uc-animations", o.enabled ? "on" : "off");
      if (o.enabled) root.style.setProperty("--uc-motion-speed", o.speed);
    } catch (_) {
      /* ignore */
    }
  }

  /* ===== Wire the editor — removed: tab-group colour swatch fan.
     Swatches must stay where they are so they can be clicked. ===== */

  function init() {
    applyTokens();
  }

  const prefObserver = {
    observe() {
      applyTokens();
    },
  };

  try {
    Services.prefs.addObserver("userchrome.animations.", prefObserver);
  } catch (_) {
    /* ignore */
  }

  window.addEventListener("unload", () => {
    try {
      Services.prefs.removeObserver("userchrome.animations.", prefObserver);
    } catch (_) {
      /* ignore */
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    setTimeout(init, 100);
  }
})();