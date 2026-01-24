export class PrefsWrapper {
  static MOD_NAME = "command-palette";
  static DEBUG_MODE = "command-palette.debug-mode";
  static PREFIX = "command-palette.prefix";
  static PREFIX_REQUIRED = "command-palette.prefix-required";
  static MAX_COMMANDS = "command-palette.max-commands";
  static MAX_COMMANDS_PREFIX = "command-palette.max-commands-prefix";
  static MIN_QUERY_LENGTH = "command-palette.min-query-length";
  static MIN_SCORE_THRESHOLD = "command-palette.min-score-threshold";
  static DYNAMIC_ABOUT_PAGES = "command-palette.dynamic.about-pages";
  static DYNAMIC_SEARCH_ENGINES = "command-palette.dynamic.search-engines";
  static DYNAMIC_EXTENSIONS = "command-palette.dynamic.extensions";
  static DYNAMIC_CONTAINER_TABS = "command-palette.dynamic.container-tabs";
  static COMMAND_SETTINGS_FILE = "command-palette.settings-file-path";

  static defaultValues = {
    [PrefsWrapper.PREFIX_REQUIRED]: false,
    [PrefsWrapper.PREFIX]: ":",
    [PrefsWrapper.DEBUG_MODE]: false,
    [PrefsWrapper.MAX_COMMANDS]: 3,
    [PrefsWrapper.MAX_COMMANDS_PREFIX]: 50,
    [PrefsWrapper.MIN_QUERY_LENGTH]: 3,
    [PrefsWrapper.MIN_SCORE_THRESHOLD]: 150,
    [PrefsWrapper.DYNAMIC_ABOUT_PAGES]: false,
    [PrefsWrapper.DYNAMIC_SEARCH_ENGINES]: true,
    [PrefsWrapper.DYNAMIC_EXTENSIONS]: false,
    [PrefsWrapper.DYNAMIC_CONTAINER_TABS]: false,
    [PrefsWrapper.COMMAND_SETTINGS_FILE]: "chrome/command-palette-settings.json",
  };

  static getPref(prefName, defaultValue = null) {
    try {
      if (defaultValue === null && this.defaultValues[prefName] !== undefined) {
        defaultValue = this.defaultValues[prefName];
      }

      if (typeof defaultValue === "boolean") {
        return Services.prefs.getBoolPref(prefName, defaultValue);
      } else if (typeof defaultValue === "number") {
        return Services.prefs.getIntPref(prefName, defaultValue);
      } else {
        return Services.prefs.getStringPref(prefName, defaultValue || "");
      }
    } catch (e) {
      this.debugError(`Error getting pref ${prefName}:`, e);
      return defaultValue;
    }
  }

  static setPref(prefName, value) {
    try {
      if (typeof value === "boolean") {
        Services.prefs.setBoolPref(prefName, value);
      } else if (typeof value === "number") {
        Services.prefs.setIntPref(prefName, value);
      } else {
        Services.prefs.setStringPref(prefName, String(value));
      }
    } catch (e) {
      this.debugError(`Error setting pref ${prefName}:`, e);
    }
  }

  static prefHasUserValue(prefName) {
    return Services.prefs.prefHasUserValue(prefName);
  }

  static debugLog(...args) {
    if (this.getPref(this.DEBUG_MODE)) {
      console.log(`[${this.MOD_NAME}]`, ...args);
    }
  }

  static debugError(...args) {
    if (this.getPref(this.DEBUG_MODE)) {
      console.error(`[${this.MOD_NAME}]`, ...args);
    }
  }

  // Convenience getters
  static get prefix() {
    return this.getPref(this.PREFIX);
  }

  static get prefixRequired() {
    return this.getPref(this.PREFIX_REQUIRED);
  }

  static get maxCommands() {
    return this.getPref(this.MAX_COMMANDS);
  }

  static get maxCommandsPrefix() {
    return this.getPref(this.MAX_COMMANDS_PREFIX);
  }

  static get minQueryLength() {
    return this.getPref(this.MIN_QUERY_LENGTH);
  }

  static get minScoreThreshold() {
    return this.getPref(this.MIN_SCORE_THRESHOLD);
  }

  static get commandSettingsFile() {
    return this.getPref(this.COMMAND_SETTINGS_FILE);
  }
}
