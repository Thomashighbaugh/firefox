import { PaletteOverlay } from "./xul/palette_overlay.mjs";
import { SettingsButton } from "./xul/settings_button.mjs";
import { SettingsModal } from "./xul/settings_modal.mjs";

export class PaletteElements {
  static paletteOverlay = null;
  static settingsButton = null;
  static settingsModal = null;

  static create() {
    console.log("Creating command palette overlay...");
    this.paletteOverlay = PaletteOverlay.create();

    console.log("Creating settings button widget...");
    this.settingsButton = new SettingsButton();

    console.log("Creating settings modal...");
    this.settingsModal = new SettingsModal();
  }

  static loadUserConfig(userConfig) {
    if (this.paletteOverlay) {
      this.paletteOverlay.loadUserConfig(userConfig);
    }
  }

  static clearCache() {
    if (this.paletteOverlay) {
      this.paletteOverlay.clearCache();
    }
  }
}
