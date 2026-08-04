// ==UserScript==
// @name           Tab Group Color Picker
// @description    Adds a right-click color picker to Firefox's native tab-group editor swatches to override group accent colors.
// @include        main
// @author         Higgs Boson (adapted from Better Advanced Tab Groups)
// @version        1.0.0
// @homepageURL    https://github.com/ThomasLeonHighbaugh/higgs-boson-firefox-theme
// ==/UserScript==

(function () {
  "use strict";

  const INIT_ATTR = "data-tab-group-color-picker-initialized";

  /**
   * TabGroupColorPicker is currently a disabled placeholder. The original design
   * opened a hidden HTML5 color input from inside the tab-group editor popup,
   * but that reliably captures all mouse/keyboard input on Firefox 152+ and
   * locks up the chrome window. A safe implementation would need a non-native
   * color picker injected as a sibling panel. For now the script only logs a
   * warning when the user right-clicks a swatch, preserving the hook.
   */
  class TabGroupColorPicker {
    constructor() {
      this.currentRadio = null;
      this.observer = null;
      this.init();
    }

    init() {
      if (document.documentElement.hasAttribute(INIT_ATTR)) return;
      this.#startObserver();
      document.documentElement.setAttribute(INIT_ATTR, "true");
    }

    /* ===== Wire right-click handlers on every swatch label =====
       NOTE: The native color picker dialog is disabled by default. On Firefox
       152+ opening a hidden <input type="color"> from inside a XUL popup while
       that popup has focus reliably captures all mouse/keyboard input and locks
       up the chrome window. A non-native color picker UI could be added later,
       but for safety the handler is now a no-op placeholder. */
    #addSwatchHandlers(swatchContainer) {
      if (swatchContainer.dataset.colorPickerReady === "true") return;
      swatchContainer.dataset.colorPickerReady = "true";

      const labels = swatchContainer.querySelectorAll(".tab-group-editor-swatch");
      labels.forEach((label) => {
        label.addEventListener("contextmenu", (event) => {
          event.preventDefault();
          event.stopPropagation();
          console.warn(
            "[TabGroupColorPicker] Native color picker is disabled to avoid input lock-up. " +
              "Edit the --tab-group-color-* CSS variables manually if needed."
          );
        });
      });
    }

    /* ===== Watch for the swatches container being added ===== */
    #startObserver() {
      const popupSet = document.getElementById("mainPopupSet");
      if (!popupSet) return;

      const existing = popupSet.querySelector(".tab-group-editor-swatches");
      if (existing) this.#addSwatchHandlers(existing);

      this.observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (
              node.nodeType === Node.ELEMENT_NODE &&
              node.classList &&
              node.classList.contains("tab-group-editor-swatches")
            ) {
              this.#addSwatchHandlers(node);
              return;
            }
          }
        }
      });

      this.observer.observe(popupSet, { childList: true, subtree: true });
    }

    destroy() {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
      document.documentElement.removeAttribute(INIT_ATTR);
    }
  }

  /* ===== Bootstrap ===== */
  function initWhenReady() {
    if (!document.getElementById("mainPopupSet")) {
      requestAnimationFrame(initWhenReady);
      return;
    }
    window.tabGroupColorPicker = new TabGroupColorPicker();
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    initWhenReady();
  } else {
    document.addEventListener("DOMContentLoaded", initWhenReady, { once: true });
  }

  window.addEventListener(
    "unload",
    () => {
      if (window.tabGroupColorPicker) {
        window.tabGroupColorPicker.destroy();
        delete window.tabGroupColorPicker;
      }
    },
    { once: true },
  );
})();
