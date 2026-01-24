import { PaletteProvider } from "./xul/palette_provider.mjs";
import { SettingsButton } from "./xul/settings_button.mjs";
import { SettingsModal } from "./xul/settings_modal.mjs";

export class PaletteElements {
  static paletteProvider = null;
  static settingsButton = null;
  static settingsModal = null;

  static create() {
    console.log("Creating command palette provider...");
    this.paletteProvider = new PaletteProvider();

    console.log("Creating settings button widget...");
    this.settingsButton = new SettingsButton();

    console.log("Creating settings modal...");
    this.settingsModal = new SettingsModal();

    // Register palette provider with urlbar
    this.#registerProvider();
  }

  static #registerProvider() {
    try {
      // Register custom urlbar provider
      if (window.UrlbarProviderManager && this.paletteProvider) {
        window.UrlbarProviderManager.registerProvider(
          this.paletteProvider.provider
        );
        console.log("Command palette provider registered with urlbar");
      }
    } catch (e) {
      console.error("Failed to register command palette provider:", e);
    }
  }
}
