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
 * radial fan on hover: the maths distributes the *non-active* children across an
 * arc that grows with their count (capped), at a radius that grows per item, and
 * leaves the active child anchored. Firefox has no workspace switcher, but the
 * tab-group editor renders exactly nine circular colour swatches in a row — the
 * same shape a card-fan wants, with the checked swatch as the natural anchor.
 *
 * The CSS look (glow, transitions, tokens) lives in CSS/chrome/animations.css.
 * JS owns every `transform` on the swatches and writes it `important`, so it wins
 * over the stylesheet's `!important` transitions.
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

  /* ===== Fan geometry (ported from render.js workspace.uc.mjs `layoutFan`) ===== */
  const FAN = {
    baseArc: Math.PI * 0.6, // ~108°
    arcGrowth: Math.PI * 0.08, // arc grows per item
    maxArc: Math.PI * 0.95, // ~170° cap
    baseRadius: 34,
    radiusGrowth: 2.6,
    tilt: 0.35, // gentle card-fan rotation
    hoverScale: 1.4,
  };

  const setTf = (el, value) =>
    el.style.setProperty("transform", value, "important");

  function layoutFan(container, hovered) {
    const all = [...container.querySelectorAll(".tab-group-editor-swatch")];
    if (!all.length) return;

    // The checked swatch is the anchor: it keeps its slot, as in render.js.
    const active = container.querySelector(
      "input:checked + .tab-group-editor-swatch",
    );
    const items = all.filter((el) => el !== active);
    if (active) active.style.removeProperty("transform");

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
      const scale = el === hovered ? FAN.hoverScale : 1;
      setTf(
        el,
        `translate(${x}px, ${y}px) rotate(${rot}rad) scale(${scale})`,
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
    container.__ucFanHovered = null;
  }

  /* ===== Wire the editor (swatches are rebuilt every time it opens) ===== */
  function wireContainer(container) {
    if (container.__ucFanWired) return;
    container.__ucFanWired = true;

    const open = () => {
      const o = opts();
      if (!o.enabled || !o.fan || prefersReducedMotion()) return;
      applyTokens();
      layoutFan(container, container.__ucFanHovered);
    };
    const close = () => resetFan(container);

    container.addEventListener("mouseenter", open);
    container.addEventListener("mouseleave", close);
    container.addEventListener("focusin", open);
    container.addEventListener("focusout", close);

    // Hovering one swatch pops it out of the fan.
    container.addEventListener("mouseover", (e) => {
      const s = e.target?.closest?.(".tab-group-editor-swatch");
      if (!s || s === container.__ucFanHovered) return;
      container.__ucFanHovered = s;
      if (container.hasAttribute("fan-open")) layoutFan(container, s);
    });

    // Re-layout while hovered as the swatch list changes (colour picked, etc.).
    new MutationObserver(() => {
      if (container.matches(":hover")) {
        layoutFan(container, container.__ucFanHovered);
      }
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

  /* Public API. */
  window.UiAnimations = { layoutFan, resetFan };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    setTimeout(init, 100);
  }
})();