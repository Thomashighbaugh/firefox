import { PrefsWrapper } from "./prefs.mjs";

const DEFAULTS = {
  hiddenCommands: [],
  customIcons: {},
  customShortcuts: {},
  toolbarButtons: [],
  customCommands: [],
};

let _settings = null;

export class CommandStorage {
  static _getFilePath() {
    const relativePath = PrefsWrapper.commandSettingsFile;
    if (!relativePath) {
      PrefsWrapper.debugError("Settings file path preference is not set.");
      return null;
    }
    try {
      const profileDir = Services.dirsvc.get("ProfD", Ci.nsIFile);
      const file = profileDir.clone();
      const pathParts = relativePath.split(/[/\\]/);
      for (const part of pathParts) {
        if (part) file.append(part);
      }
      return file.path;
    } catch (e) {
      PrefsWrapper.debugError("Could not construct file path:", e);
      return null;
    }
  }

  static async loadSettings() {
    if (_settings) return _settings;

    const path = this._getFilePath();
    if (!path) {
      _settings = { ...DEFAULTS };
      return _settings;
    }

    try {
      if (await IOUtils.exists(path)) {
        const content = await IOUtils.readJSON(path);
        _settings = { ...DEFAULTS, ...content };
        PrefsWrapper.debugLog("Command palette settings loaded from", path);
      } else {
        PrefsWrapper.debugLog(
          "No settings file found at",
          path,
          ". Using defaults."
        );
        _settings = { ...DEFAULTS };
      }
    } catch (e) {
      PrefsWrapper.debugError("Error loading command palette settings:", e);
      _settings = { ...DEFAULTS };
    }
    return _settings;
  }

  static async saveSettings(newSettings) {
    const path = this._getFilePath();
    if (!path) {
      PrefsWrapper.debugError(
        "Settings file path preference is not set. Cannot save."
      );
      return;
    }

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(JSON.stringify(newSettings, null, 2));
      await IOUtils.write(path, data, { tmpPath: path + ".tmp" });

      _settings = newSettings;
      PrefsWrapper.debugLog("Command palette settings saved to", path);
    } catch (e) {
      PrefsWrapper.debugError("Error saving command palette settings:", e);
    }
  }

  static getSettings() {
    return _settings || DEFAULTS;
  }

  static reset() {
    _settings = null;
  }
}
