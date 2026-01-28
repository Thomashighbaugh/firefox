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
    // Try to register the provider; UrlbarProviderManager may not be
    // available immediately during startup, so retry a few times with
    // a short delay.
    const maxAttempts = 10;
    const delayMs = 500;

    const tryRegister = (attempt = 1) => {
      try {
        if (window.UrlbarProviderManager && this.paletteProvider) {
          window.UrlbarProviderManager.registerProvider(
            this.paletteProvider.provider
          );
          console.log("Command palette provider registered with urlbar");
          return true;
        }

        if (attempt < maxAttempts) {
          console.log(
            `UrlbarProviderManager not ready yet (attempt ${attempt}), retrying in ${delayMs}ms...`
          );
          setTimeout(() => tryRegister(attempt + 1), delayMs);
          return false;
        }

        console.warn(
          "UrlbarProviderManager unavailable; failed to register command palette provider"
        );
        return false;
      } catch (e) {
        console.error("Failed to register command palette provider:", e);
        return false;
      }
    };

    tryRegister();
  }
}
