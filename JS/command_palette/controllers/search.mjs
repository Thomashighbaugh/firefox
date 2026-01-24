import { PaletteElements } from "../palette_elements.mjs";
import { FuzzySearch } from "../utils/fuzzy_search.mjs";
import { PrefsWrapper } from "../utils/prefs.mjs";

export class SearchController {
  constructor() {
    this._userConfig = {};
  }

  loadUserConfig(config) {
    this._userConfig = config || {};
    if (PaletteElements.paletteProvider) {
      PaletteElements.paletteProvider.loadUserConfig(config);
    }
  }

  clearCache() {
    if (PaletteElements.paletteProvider) {
      PaletteElements.paletteProvider.clearCache();
    }
  }
}
