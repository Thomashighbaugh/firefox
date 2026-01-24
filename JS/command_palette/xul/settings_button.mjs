/**
 * Settings Button Widget
 * CustomizableUI toolbar button to open settings modal
 */

import { PaletteElements } from "../palette_elements.mjs";

export class SettingsButton {
  constructor() {
    this.widgetId = "command-palette-settings-button";
    this.#createWidget();
  }

  #createWidget() {
    try {
      // Check if widget already exists
      const existingWidget = CustomizableUI.getWidget(this.widgetId);
      if (existingWidget) {
        console.log("Command palette settings button already exists");
        return;
      }

      CustomizableUI.createWidget({
        id: this.widgetId,
        type: "button",
        defaultArea: CustomizableUI.AREA_NAVBAR,
        label: "Command Palette Settings",
        tooltiptext: "Open Command Palette Settings",
        onCommand: (event) => {
          this.#onClick(event);
        },
        onCreated: (button) => {
          this.#setupButton(button);
        },
      });

      console.log("Command palette settings button created");
    } catch (e) {
      console.error("Failed to create settings button widget:", e);
    }
  }

  #setupButton(button) {
    if (!button) return;

    // Set icon
    button.setAttribute(
      "image",
      "chrome://global/skin/icons/settings.svg"
    );
    button.classList.add("toolbarbutton-1", "chromeclass-toolbar-additional");
  }

  #onClick(event) {
    // Open settings modal
    if (PaletteElements.settingsModal) {
      PaletteElements.settingsModal.show();
    } else {
      console.error("Settings modal not initialized");
    }
  }

  destroy() {
    try {
      CustomizableUI.destroyWidget(this.widgetId);
      console.log("Command palette settings button destroyed");
    } catch (e) {
      console.error("Failed to destroy settings button:", e);
    }
  }
}
