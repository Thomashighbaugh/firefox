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
 * Generates commands for extension management
 * @returns {Promise<Array<object>>}
 */
export async function generateExtensionCommands() {
  const addons = await AddonManager.getAddonsByTypes(["extension"]);
  return addons
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
