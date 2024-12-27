// ==UserScript==
// @name           Autocomplete Popup Styler
// @version        1.0
// @author         aminomancer
// @homepage       https://github.com/aminomancer/uc.css.js
// @description    Sets `anchored-on-panel` on #PopupAutoComplete when it opens on a panel,
// so we can give it a brighter background color.
// @license        This Source Code Form is subject to the terms of the Creative Commons Attribution-NonCommercial-ShareAlike International License, v. 4.0. If a copy of the CC BY-NC-SA 4.0 was not distributed with this file, You can obtain one at http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
// ==/UserScript==

(function () {
  class AutocompletePopupStyler {
    constructor() {
      this.autocomplete.addEventListener("popupshowing", this);
    }
    handleEvent(_e) {
      this.autocomplete.toggleAttribute("anchored-on-panel", this.sameBG);
    }
    get sameBG() {
      if (!this.autocomplete.anchorNode) return false;
      return (
        getComputedStyle(this.panelShadowContent).backgroundColor ===
        getComputedStyle(this.autocomplete).backgroundColor
      );
    }
    get autocomplete() {
      return (
        this._autocomplete ||
        (this._autocomplete = document.getElementById("PopupAutoComplete"))
      );
    }
    get panelShadowContent() {
      return this.autocomplete.anchorNode
        ?.closest("panel")
        .shadowRoot.querySelector(`[part="content"]`);
    }
  }

  if (gBrowserInit.delayedStartupFinished) new AutocompletePopupStyler();
  else {
    let delayedListener = (subject, topic) => {
      if (topic == "browser-delayed-startup-finished" && subject == window) {
        Services.obs.removeObserver(delayedListener, topic);
        new AutocompletePopupStyler();
      }
    };
    Services.obs.addObserver(
      delayedListener,
      "browser-delayed-startup-finished",
    );
  }
})();
