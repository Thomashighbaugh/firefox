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
        PaletteElements.loadUserConfig(userConfig);
        PaletteControllers.shortcutsController?.registerShortcuts(userConfig);
      });

      console.log("Command Palette loaded successfully");
      return true;
    } catch (e) {
      console.error("Failed to inject command palette:", e);
      return false;
    }
  }

  static #loadCSS() {
    const sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(
      Ci.nsIStyleSheetService
    );
    const chromeDir = Services.dirsvc.get("UChrm", Ci.nsIFile);
    const cssFile = chromeDir.clone();
    cssFile.append("JS");
    cssFile.append("command_palette");
    cssFile.append("css");
    cssFile.append("palette.css");
    
    const uri = Services.io.newFileURI(cssFile);

    if (!sss.sheetRegistered(uri, sss.AUTHOR_SHEET)) {
      sss.loadAndRegisterSheet(uri, sss.AUTHOR_SHEET);
      console.log("Command palette CSS loaded");
    }
  }
}
