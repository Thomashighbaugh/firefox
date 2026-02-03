/**
 * Dynamic command generators
 * Creates commands based on current browser state
 */

/**
 * Generates commands for opening "about:" pages
 * @returns {Promise<Array<object>>}
 */
export async function generateAboutPageCommands() {
  const aboutPages = [
    { page: "preferences", icon: "chrome://browser/skin/settings.svg" },
    { page: "config", icon: "chrome://browser/skin/settings.svg" },
    { page: "newtab", icon: "chrome://browser/skin/home.svg" },
    { page: "addons", icon: "chrome://mozapps/skin/extensions/extension.svg" },
    { page: "downloads", icon: "chrome://browser/skin/downloads/downloads.svg" },
    { page: "debugging" },
    { page: "logins" },
    { page: "memory" },
    { page: "processes" },
    { page: "profiles" },
    { page: "support", icon: "chrome://browser/skin/help.svg" },
    { page: "home", icon: "chrome://browser/skin/home.svg" },
    { page: "networking" },
    { page: "privatebrowsing", icon: "chrome://browser/skin/private-browsing.svg" },
    { page: "profiling" },
    { page: "protections" },
    { page: "telemetry" },
  ];

  return aboutPages.map((aboutPage) => ({
    key: `about:${aboutPage.page}`,
    label: `Open about:${aboutPage.page}`,
    command: () => window.switchToTabHavingURI(`about:${aboutPage.page}`, true),
    condition: () => !!window.switchToTabHavingURI,
    icon: aboutPage.icon || "chrome://browser/skin/tab.svg",
    tags: ["about", "internal", aboutPage.page],
  }));
}

/**
 * Generates commands for changing search engines
 * @returns {Promise<Array<object>>}
 */
export async function generateSearchEngineCommands() {
  if (!Services.search) return [];

  const engines = await Services.search.getVisibleEngines();
  return engines.map((engine) => {
    const engineName = engine.name;
    return {
      key: `search:${engineName}`,
      label: `Search with: ${engineName}`,
      command: () => {
        if (window.gURLBar) {
          window.gURLBar.value = "";
          window.gURLBar.searchMode = {
            engineName,
            entry: "oneoff",
          };
          window.gURLBar.focus();
        }
      },
      condition: () => {
        const currentEngineName =
          window.gURLBar?.searchMode?.engineName ||
          Services.search.defaultEngine?.name;
        return currentEngineName !== engineName;
      },
      icon: engine.iconURI?.spec || "chrome://browser/skin/search.svg",
      tags: ["search", "engine", engineName.toLowerCase()],
    };
  });
}

/**
 * Generates commands for extension management and keyboard shortcuts
 * @returns {Promise<Array<object>>}
 */
export async function generateExtensionCommands() {
  const commands = [];
  
  // Standard extension options commands
  const addons = await AddonManager.getAddonsByTypes(["extension"]);
  const optionCommands = addons
    .filter((addon) => addon.isActive && !addon.isSystem && addon.optionsURL)
    .map((addon) => ({
      key: `extension:${addon.id}`,
      label: `Extension Options: ${addon.name}`,
      command: () =>
        window.BrowserAddonUI?.openAddonsMgr(
          "addons://detail/" + encodeURIComponent(addon.id) + "/preferences"
        ),
      icon: addon.iconURL || "chrome://mozapps/skin/extensions/extension.svg",
      tags: ["extension", "addon", "options", addon.name.toLowerCase()],
    }));
    
  commands.push(...optionCommands);

  // Extension keyboard commands - use WebExtensionPolicy global
  try {
    // WebExtensionPolicy is available globally in chrome context
    const policies = WebExtensionPolicy.getActiveExtensions();
    
    for (const policy of policies) {
      // Skip system extensions and those without extension object
      if (!policy.extension) continue;
      
      // Get commands from manifest
      const manifestCommands = policy.extension.manifest?.commands;
      if (!manifestCommands) continue;
      
      for (const [cmdName, cmdDef] of Object.entries(manifestCommands)) {
        // Skip _execute_browser_action and similar internal commands unless they have descriptions
        const isInternalCommand = cmdName.startsWith("_execute_");
        const description = cmdDef.description || (isInternalCommand ? cmdName.replace(/_/g, " ").replace(/^execute /, "") : cmdName);
        
        // Get current shortcut (may differ from suggested_key if user changed it)
        let currentShortcut = null;
        try {
          if (policy.extension.shortcuts) {
            const shortcutInfo = policy.extension.shortcuts.get(cmdName);
            currentShortcut = shortcutInfo?.shortcut;
          }
        } catch (e) {
          // Fallback to suggested_key from manifest
        }
        
        if (!currentShortcut && cmdDef.suggested_key) {
          currentShortcut = cmdDef.suggested_key.default || 
                           cmdDef.suggested_key.linux ||
                           cmdDef.suggested_key.mac ||
                           cmdDef.suggested_key.windows;
        }
        
        const extensionName = policy.name || policy.id;
        const extensionIcon = policy.extension.manifest?.icons 
          ? policy.extension.baseURI?.resolve(
              policy.extension.manifest.icons["16"] || 
              policy.extension.manifest.icons["32"] ||
              Object.values(policy.extension.manifest.icons)[0]
            )
          : "chrome://mozapps/skin/extensions/extension.svg";
        
        commands.push({
          key: `ext-cmd:${policy.id}:${cmdName}`,
          label: `${extensionName}: ${description}`,
          category: "Extension",
          command: () => executeExtensionCommand(policy, cmdName, currentShortcut),
          icon: extensionIcon,
          tags: ["extension", "shortcut", "command", extensionName.toLowerCase(), cmdName.toLowerCase()],
          shortcutHint: currentShortcut || null,
        });
      }
    }
  } catch (e) {
    console.error("[command-palette] Error generating extension keyboard commands:", e);
  }

  return commands;
}

/**
 * Execute an extension command by triggering the command event
 * @param {WebExtensionPolicy} policy - The extension policy
 * @param {string} commandName - The command name to execute
 * @param {string|null} shortcut - The keyboard shortcut (for fallback)
 */
function executeExtensionCommand(policy, commandName, shortcut) {
  try {
    // Method 1: Use the extension's command API directly
    if (policy.extension?.commands) {
      // The commands module has an internal method to trigger commands
      const commandsAPI = policy.extension.commands;
      
      // Try to emit the command event directly
      if (typeof commandsAPI.emit === "function") {
        commandsAPI.emit("command", commandName);
        return;
      }
      
      // Alternative: trigger via onCommand
      if (typeof commandsAPI.onCommand?.fire === "function") {
        commandsAPI.onCommand.fire(commandName);
        return;
      }
    }
    
    // Method 2: Use ExtensionParent to broadcast the command
    try {
      const { ExtensionParent } = ChromeUtils.importESModule(
        "resource://gre/modules/ExtensionParent.sys.mjs"
      );
      
      const extension = ExtensionParent.GlobalManager.getExtension(policy.id);
      if (extension) {
        // Emit command event to the extension
        extension.emit("command", commandName);
        return;
      }
    } catch (e) {
      // ExtensionParent import failed, try next method
    }
    
    // Method 3: Handle special commands directly
    if (commandName === "_execute_browser_action" || commandName === "_execute_action") {
      // Open the extension's browser action popup
      const widget = window.CustomizableUI?.getWidget(`${policy.id}-browser-action`);
      if (widget?.forWindow) {
        const node = widget.forWindow(window)?.node;
        if (node) {
          node.click();
          return;
        }
      }
      // Try unified extension button
      const unifiedButton = document.getElementById(`unified-extensions-button`);
      if (unifiedButton) {
        // Find the extension in the unified panel and click it
        unifiedButton.click();
        setTimeout(() => {
          const extItem = document.querySelector(
            `[data-extensionid="${policy.id}"]`
          );
          if (extItem) extItem.click();
        }, 100);
        return;
      }
    }
    
    if (commandName === "_execute_page_action") {
      const pageActionButton = document.getElementById(`pageAction-urlbar-${policy.id}`);
      if (pageActionButton) {
        pageActionButton.click();
        return;
      }
    }
    
    if (commandName === "_execute_sidebar_action") {
      window.SidebarController?.toggle(`webext-sidebar-${policy.id}`);
      return;
    }
    
    // Method 4: Simulate the keyboard shortcut if available
    if (shortcut) {
      simulateShortcut(shortcut);
      return;
    }
    
    // Fallback: Show notification that command couldn't be executed
    console.warn(`[command-palette] Could not execute extension command: ${policy.name}:${commandName}`);
    
  } catch (e) {
    console.error(`[command-palette] Error executing extension command ${commandName}:`, e);
  }
}

/**
 * Simulate a keyboard shortcut by dispatching key events
 * @param {string} shortcut - Shortcut string like "Ctrl+Shift+S"
 */
function simulateShortcut(shortcut) {
  const parts = shortcut.split("+").map(p => p.trim().toLowerCase());
  const key = parts.pop();
  
  const eventInit = {
    bubbles: true,
    cancelable: true,
    ctrlKey: parts.includes("ctrl") || parts.includes("control") || parts.includes("accel"),
    altKey: parts.includes("alt"),
    shiftKey: parts.includes("shift"),
    metaKey: parts.includes("meta") || parts.includes("command"),
  };
  
  // Determine the key code
  let keyCode = key.toUpperCase().charCodeAt(0);
  let keyValue = key;
  
  // Handle special keys
  const specialKeys = {
    "f1": ["F1", 112], "f2": ["F2", 113], "f3": ["F3", 114], "f4": ["F4", 115],
    "f5": ["F5", 116], "f6": ["F6", 117], "f7": ["F7", 118], "f8": ["F8", 119],
    "f9": ["F9", 120], "f10": ["F10", 121], "f11": ["F11", 122], "f12": ["F12", 123],
    "space": [" ", 32], "enter": ["Enter", 13], "tab": ["Tab", 9],
    "escape": ["Escape", 27], "esc": ["Escape", 27],
    "up": ["ArrowUp", 38], "down": ["ArrowDown", 40],
    "left": ["ArrowLeft", 37], "right": ["ArrowRight", 39],
    "home": ["Home", 36], "end": ["End", 35],
    "pageup": ["PageUp", 33], "pagedown": ["PageDown", 34],
    "insert": ["Insert", 45], "delete": ["Delete", 46],
    "comma": [",", 188], "period": [".", 190],
  };
  
  if (specialKeys[key]) {
    [keyValue, keyCode] = specialKeys[key];
  }
  
  const event = new KeyboardEvent("keydown", {
    ...eventInit,
    key: keyValue,
    code: `Key${key.toUpperCase()}`,
    keyCode: keyCode,
  });
  
  document.documentElement.dispatchEvent(event);
}

/**
 * Generates commands for opening tabs in different containers
 * @returns {Promise<Array<object>>}
 */
export async function generateContainerTabCommands() {
  if (!window.ContextualIdentityService) {
    return [];
  }

  const commands = [];
  const identities = window.ContextualIdentityService.getPublicIdentities();

  if (!identities || identities.length === 0) {
    return commands;
  }

  identities.forEach((identity) => {
    commands.push({
      key: `container-tab:${identity.userContextId}`,
      label: `Open in Container: ${identity.name}`,
      command: () => {
        const currentTab = window.gBrowser.selectedTab;
        if (currentTab && currentTab.linkedBrowser) {
          const url = currentTab.linkedBrowser.currentURI.spec;
          window.openTrustedLinkIn(url, "tab", {
            userContextId: identity.userContextId,
            relatedToCurrent: true,
            triggeringPrincipal:
              Services.scriptSecurityManager.getSystemPrincipal(),
          });
          window.gBrowser.removeTab(currentTab);
        }
      },
      icon: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><circle cx="8" cy="8" r="7" fill="${identity.color}"/></svg>`,
      tags: ["container", "tab", "open", identity.name.toLowerCase()],
      condition: () => {
        const currentTab = window.gBrowser.selectedTab;
        return (
          currentTab &&
          (currentTab.userContextId || 0) !== identity.userContextId
        );
      },
    });
  });

  return commands;
}

/**
 * Generates commands for custom user-defined commands
 * @returns {Promise<Array<object>>}
 */
export async function generateCustomCommands(storage) {
  const settings = storage?.getSettings() || {};
  const customCommands = settings.customCommands || [];

  return customCommands.map((cmd) => ({
    key: `custom:${cmd.key || cmd.label}`,
    label: cmd.label,
    command: cmd.command ? new Function(cmd.command) : null,
    icon: cmd.icon || "chrome://browser/skin/tab.svg",
    tags: cmd.tags || ["custom"],
    isCustom: true,
  }));
}
