// ==UserScript==
// @name           UI Animations
// @description    Ambient motion and micro-interactions adapted from render.js (Zen) to Firefox chrome — shared motion tokens plus a radial "fan" reveal for the tab-group editor colour swatches.
// @author         Thomas Leon Highbaugh
// @version        1.0.0
// @homepageURL    https://github.com/SehajveerSingh2005/render.js
// @include        main
// ==/UserScript==

/*
 * Adapter, not a port. render.js animates Zen's `#zen-workspaces-button` into a
 * radial fan on hover. Firefox has no workspace switcher, but the tab-group
 * editor renders exactly nine circular colour swatches in a row — the same
 * shape a card-fan wants. This takes render.js's `layoutFan` maths (arc grows
 * with item count, capped; radius grows per item; items distributed across the
 * arc) and applies it to those swatches. The CSS look (glow, scale, tokens)
 * lives in CSS/chrome/animations.css.
 */

(function () {
  "use strict";

  const PREF = {
    enabled: "userchrome.animations.enabled",
    fan: "userchrome.animations.tabGroupFan",
    speed: "userchrome.animations.speed",
  };
  const DEFAULTS = { enabled: true, fan: true, speed: "0.45s" };

  function opts() {
    const o = { ...DEFAULTS };
    try {
      o.enabled = Services.prefs.getBoolPref(PREF.enabled, o.enabled);
      o.fan = Services.prefs.getBoolPref(PREF.fan, o.fan);
      o.speed = Services.prefs.getStringPref(PREF.speed, o.speed);
    } catch (_) {
      /* keep defaults */
    }
    return o;
  }

  const prefersReducedMotion = () => {
    try {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (_) {
      return false;
    }
  };

  /* Push the speed token + kill-switch into :root so CSS and JS stay in sync. */
  function applyTokens() {
    const root = document.documentElement;
    try {
      const o = opts();
      root.setAttribute("uc-animations", o.enabled ? "on" : "off");
      if (o.enabled) root.style.setProperty("--uc-motion-speed", o.speed);
    } catch (_) {
      /* ignore */
    }
  }

  /* ===== Fan geometry (ported from render.js workspace.uc.mjs) ===== */
  const FAN = {
    baseArc: Math.PI * 0.6, // ~108°
    arcGrowth: Math.PI * 0.08,
    maxArc: Math.PI * 0.95, // ~170°
    baseRadius: 34,
    radiusGrowth: 2.6,
    tilt: 0.35, // gentle card-fan rotation
  };

  function layoutFan(container) {
    const items = [...container.querySelectorAll(".tab-group-editor-swatch")];
    const count = items.length;
    if (!count) return;

    const arc = Math.min(FAN.baseArc + count * FAN.arcGrowth, FAN.maxArc);
    const radius = FAN.baseRadius + count * FAN.radiusGrowth;
    const start = -Math.PI / 2 - arc / 2;
    const end = -Math.PI / 2 + arc / 2;

    items.forEach((el, i) => {
      const angle =
        count === 1
          ? -Math.PI / 2
          : start + ((i + 0.5) / count) * (end - start);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const rot = (angle + Math.PI / 2) * FAN.tilt;
      // Write transform as important so JS owns it (the theme stylesheet sets
      // `transition ... !important` but never a resting transform).
      el.style.setProperty(
        "transform",
        `translate(${x}px, ${y}px) rotate(${rot}rad) scale(1)`,
        "important",
      );
    });
    container.setAttribute("fan-open", "true");
  }

  function resetFan(container) {
    if (!container) return;
    for (const el of container.querySelectorAll(".tab-group-editor-swatch")) {
      el.style.removeProperty("transform");
    }
    container.removeAttribute("fan-open");
  }

  /* ===== Wire the editor (swatches are rebuilt every time it opens) ===== */
  function wireContainer(container) {
    if (container.__ucFanWired) return;
    container.__ucFanWired = true;

    const open = () => {
      const o = opts();
      if (!o.enabled || !o.fan || prefersReducedMotion()) return;
      applyTokens();
      layoutFan(container);
    };
    const close = () => resetFan(container);

    container.addEventListener("mouseenter", open);
    container.addEventListener("mouseleave", close);
    container.addEventListener("focusin", open);
    container.addEventListener("focusout", close);

    // Re-layout while hovered as the swatch list changes (colour picked, etc.).
    new MutationObserver(() => {
      if (container.matches(":hover")) layoutFan(container);
    }).observe(container, { childList: true });
  }

  function scan() {
    const editor = document.getElementById("tab-group-editor");
    if (!editor) return false;
    const container = editor.querySelector(".tab-group-editor-swatches");
    if (container) wireContainer(container);
    return true;
  }

  function init() {
    applyTokens();
    if (scan()) return;
    // The editor may be lit up after startup; poll briefly, then stop.
    let tries = 0;
    const timer = setInterval(() => {
      if (scan() || ++tries > 40) clearInterval(timer);
    }, 500);
  }

  const prefObserver = {
    observe() {
      applyTokens();
      const container = document.querySelector(
        "#tab-group-editor .tab-group-editor-swatches",
      );
      if (!opts().enabled) resetFan(container);
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
    resetFan(
      document.querySelector("#tab-group-editor .tab-group-editor-swatches"),
    );
  });

  /* Public API (mirrors render.js's exposure). */
  window.UiAnimations = { layoutFan, resetFan };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    setTimeout(init, 100);
  }
})();