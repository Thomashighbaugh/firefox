import { PrefsWrapper } from "../utils/prefs.mjs";

export class ShortcutsController {
  constructor() {
    this._registeredShortcuts = new Map();
  }

  registerShortcuts(userConfig) {
    const customShortcuts = userConfig?.customShortcuts || {};
    
    for (const [commandKey, shortcutStr] of Object.entries(customShortcuts)) {
      this.addShortcut(commandKey, shortcutStr);
    }
    
    PrefsWrapper.debugLog(
      `Registered ${this._registeredShortcuts.size} keyboard shortcuts`
    );
  }

  addShortcut(commandKey, shortcutStr) {
    if (!shortcutStr) return;

    try {
      const key = document.createXULElement("key");
      key.id = `command-palette-key-${commandKey}`;
      
      const parts = shortcutStr.split("+").map((p) => p.trim().toLowerCase());
      const keyChar = parts.pop();
      
      if (parts.includes("ctrl") || parts.includes("control")) {
        key.setAttribute("modifiers", "accel");
      }
      if (parts.includes("shift")) {
        key.setAttribute("modifiers", (key.getAttribute("modifiers") || "") + " shift");
      }
      if (parts.includes("alt")) {
        key.setAttribute("modifiers", (key.getAttribute("modifiers") || "") + " alt");
      }
      
      key.setAttribute("key", keyChar);
      key.addEventListener("command", () => {
        const commandEl = document.getElementById(commandKey);
        if (commandEl && !commandEl.disabled) {
          commandEl.doCommand();
        }
      });
      
      const keyset = document.getElementById("mainKeyset");
      if (keyset) {
        keyset.appendChild(key);
        this._registeredShortcuts.set(commandKey, key);
      }
    } catch (e) {
      PrefsWrapper.debugError(`Failed to register shortcut for ${commandKey}:`, e);
    }
  }

  removeShortcut(commandKey) {
    const key = this._registeredShortcuts.get(commandKey);
    if (key) {
      key.remove();
      this._registeredShortcuts.delete(commandKey);
    }
  }
}
