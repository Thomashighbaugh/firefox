import { PaletteElements } from "./palette_elements.mjs";
import { PaletteControllers } from "./palette_controllers.mjs";
import { PaletteSettings } from "./settings/palette_settings.mjs";
import { CommandStorage } from "./utils/storage.mjs";

export class PaletteInjector {
  static inject() {
    try {
      console.log("Loading command palette CSS...");
      this.#loadCSS();

      console.log("Loading command palette settings...");
      const settings = PaletteSettings.load();

      console.log("Creating command palette elements...");
      PaletteElements.create();

      console.log("Building command palette controllers...");
      PaletteControllers.create();

      console.log("Loading user configuration...");
      CommandStorage.loadSettings().then((userConfig) => {
        PaletteControllers.searchController.loadUserConfig(userConfig);
        PaletteControllers.shortcutsController.registerShortcuts(userConfig);
      });

      console.log("Command Palette loaded successfully");
      return true;
    } catch (e) {
      console.error("Failed to inject command palette:", e);
      return false;
    }
  }

  static #loadCSS() {
    const cssPath = "chrome/JS/command_palette/css/palette.css";
    const sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(
      Ci.nsIStyleSheetService
    );
    const uri = Services.io.newURI(
      `${Services.io.newFileURI(Services.dirsvc.get("UChrm", Ci.nsIFile)).spec}${cssPath}`
    );

    if (!sss.sheetRegistered(uri, sss.AUTHOR_SHEET)) {
      sss.loadAndRegisterSheet(uri, sss.AUTHOR_SHEET);
      console.log("Command palette CSS loaded");
    }
  }
}
