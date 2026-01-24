import { PrefsWrapper } from "../utils/prefs.mjs";

export class PaletteSettings {
  static load() {
    return {
      prefix: PrefsWrapper.prefix,
      prefixRequired: PrefsWrapper.prefixRequired,
      maxCommands: PrefsWrapper.maxCommands,
      maxCommandsPrefix: PrefsWrapper.maxCommandsPrefix,
      minQueryLength: PrefsWrapper.minQueryLength,
      minScoreThreshold: PrefsWrapper.minScoreThreshold,
      dynamicAboutPages: PrefsWrapper.getPref(PrefsWrapper.DYNAMIC_ABOUT_PAGES),
      dynamicSearchEngines: PrefsWrapper.getPref(
        PrefsWrapper.DYNAMIC_SEARCH_ENGINES
      ),
      dynamicExtensions: PrefsWrapper.getPref(PrefsWrapper.DYNAMIC_EXTENSIONS),
      dynamicContainerTabs: PrefsWrapper.getPref(
        PrefsWrapper.DYNAMIC_CONTAINER_TABS
      ),
    };
  }
}
