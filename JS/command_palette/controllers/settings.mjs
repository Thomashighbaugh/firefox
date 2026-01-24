import { PaletteElements } from "../palette_elements.mjs";
import { staticCommands } from "../commands/static_commands.mjs";
import { PrefsWrapper } from "../utils/prefs.mjs";
import { CommandStorage } from "../utils/storage.mjs";

export class SettingsController {
  constructor() {
    this.commandsCache = null;
  }

  showSettings() {
    if (PaletteElements.settingsModal) {
      PaletteElements.settingsModal.show();
    }
  }

  hideSettings() {
    if (PaletteElements.settingsModal) {
      PaletteElements.settingsModal.hide();
    }
  }

  async getAllCommands() {
    if (this.commandsCache) {
      return this.commandsCache;
    }

    const commands = [...staticCommands];

    this.commandsCache = commands;
    return commands;
  }

  async loadSettings() {
    return await CommandStorage.loadSettings();
  }

  async saveSettings(settingsData) {
    await CommandStorage.saveSettings(settingsData);
  }

  validateCustomCommand(cmd) {
    if (!cmd.key || !cmd.label) {
      return { valid: false, error: "Command must have key and label" };
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(cmd.key)) {
      return {
        valid: false,
        error: "Command key must be alphanumeric with - or _",
      };
    }

    if (cmd.command) {
      try {
        new Function(cmd.command);
      } catch (e) {
        return {
          valid: false,
          error: `Invalid command code: ${e.message}`,
        };
      }
    }

    return { valid: true };
  }

  detectShortcutConflicts(shortcut, currentCommandKey) {
    const allCommands = this.getAllCommands();
    const settings = CommandStorage.getSettings();

    for (const cmd of allCommands) {
      if (cmd.key === currentCommandKey) continue;

      const cmdShortcut = settings.customShortcuts?.[cmd.key] || cmd.shortcut;
      if (cmdShortcut === shortcut) {
        return {
          conflict: true,
          conflictingCommand: cmd.label,
        };
      }
    }

    return { conflict: false };
  }

  async savePreference(prefName, value) {
    try {
      const prefType = typeof value;

      if (prefType === "boolean") {
        Services.prefs.setBoolPref(prefName, value);
      } else if (prefType === "number") {
        Services.prefs.setIntPref(prefName, value);
      } else {
        Services.prefs.setStringPref(prefName, String(value));
      }

      PrefsWrapper.debugLog(`Saved preference ${prefName} = ${value}`);
      return true;
    } catch (e) {
      PrefsWrapper.debugError(`Failed to save preference ${prefName}:`, e);
      return false;
    }
  }

  async loadPreference(prefName, defaultValue) {
    try {
      const prefType = typeof defaultValue;

      if (prefType === "boolean") {
        return Services.prefs.getBoolPref(prefName, defaultValue);
      } else if (prefType === "number") {
        return Services.prefs.getIntPref(prefName, defaultValue);
      } else {
        return Services.prefs.getStringPref(prefName, String(defaultValue));
      }
    } catch (e) {
      PrefsWrapper.debugError(`Failed to load preference ${prefName}:`, e);
      return defaultValue;
    }
  }
}
