// ==UserScript==
// @name            Sidebar Main Overflow
// @description     Force vertical-tabs tools/extensions launcher into overflow-only mode and blend the overflow group with the sidebar.
// @author          Higgs Boson Theme
// @include         main
// @run-at          startup
// ==/UserScript==

(function () {
  "use strict";

  const CSS = `
    .tools-and-extensions:not(.overflow-button) {
      display: none !important;
    }

    .tools-and-extensions.overflow-button {
      background: none !important;
    }

    .buttons-wrapper {
      background: transparent !important;
    }

    .more-tools-button .button-background {
      background: transparent !important;
    }
  `;

  function injectStyle(host) {
    if (!host || !host.shadowRoot) {
      return false;
    }
    if (host.shadowRoot.querySelector("style[data-uc-sidebar-main-overflow]")) {
      return true;
    }
    const style = document.createElement("style");
    style.dataset.ucSidebarMainOverflow = "";
    style.textContent = CSS;
    host.shadowRoot.appendChild(style);
    return true;
  }

  function attempt() {
    const host = document.getElementById("sidebar-main");
    if (injectStyle(host)) {
      return true;
    }
    return false;
  }

  if (attempt()) {
    return;
  }

  const observer = new MutationObserver(() => {
    if (attempt()) {
      observer.disconnect();
    }
  });
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
  window.addEventListener("unload", () => observer.disconnect(), { once: true });
})();
