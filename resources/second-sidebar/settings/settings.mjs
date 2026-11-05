// Consolidated module — merged from the former settings/*.mjs files.
import { PreferencesWrapper } from "../wrappers/services.mjs";

export class Settings {
  /**
   *
   * @param {string} pref
   * @returns {Object | Array<Object> | null}
   */
  static load(pref) {
    const value = PreferencesWrapper.prefHasUserValue(pref)
      ? JSON.parse(PreferencesWrapper.getStringPref(pref))
      : null;
    console.log(`Loaded pref "${pref}":`, value);
    return value;
  }

  static save(pref, value) {
    console.log(`Saving pref "${pref}":`, value);
    PreferencesWrapper.setStringPref(pref, JSON.stringify(value));
  }
}

const PREF = "second-sidebar.settings";

/**
 * Schema version stamped into the saved settings. Bump when the meaning of a
 * stored value changes so load() can migrate old profiles exactly once.
 *
 * v2: padding default changed from the fixed "xxsmall" space token to
 * "default" (match the tab strip's --tab-margin-inline-inner inset). Profiles
 * carrying the old default are migrated; a deliberately re-chosen "xxsmall"
 * saved under v2 or later is left alone.
 */
const SETTINGS_VERSION = 2;

export class SidebarSettings {
  /**
   *
   * @param {object} params
   * @param {string} params.position
   * @param {string} params.padding
   * @param {string} params.newWebPanelPosition
   * @param {string} params.defaultFloatingOffset
   * @param {boolean} params.autoHideBackButton
   * @param {boolean} params.autoHideForwardButton
   * @param {string} params.containerBorder
   * @param {string} params.tooltip
   * @param {boolean} params.tooltipFullUrl
   * @param {boolean} params.autoHideSidebar
   * @param {string} params.autoHideSidebarBehavior
   * @param {boolean} params.sidebarWidgetHideWebPanel
   * @param {string} params.sidebarWidgetShortcut
   * @param {string} params.lastWebPanelShortcut
   * @param {boolean} params.hideSidebarAnimated
   * @param {boolean} params.hideToolbarAnimated
   * @param {boolean} params.enableSidebarBoxHint
   */
  constructor({
    position = "right",
    padding = "default",
    newWebPanelPosition = "before",
    defaultFloatingOffset = "small",
    autoHideBackButton = false,
    autoHideForwardButton = false,
    containerBorder = "left",
    tooltip = "titleandurl",
    tooltipFullUrl = false,
    autoHideSidebar = false,
    autoHideSidebarBehavior = "inline",
    sidebarWidgetHideWebPanel = false,
    sidebarWidgetShortcut = "",
    lastWebPanelShortcut = "",
    hideSidebarAnimated = true,
    hideToolbarAnimated = true,
    enableSidebarBoxHint = false,
  }) {
    this.position = position;
    this.padding = padding;
    this.newWebPanelPosition = newWebPanelPosition;
    this.defaultFloatingOffset = defaultFloatingOffset;
    this.autoHideBackButton = autoHideBackButton;
    this.autoHideForwardButton = autoHideForwardButton;
    this.containerBorder = containerBorder;
    this.autoHideSidebar = autoHideSidebar;
    this.autoHideSidebarBehavior = autoHideSidebarBehavior;
    this.sidebarWidgetHideWebPanel = sidebarWidgetHideWebPanel;
    this.sidebarWidgetShortcut = sidebarWidgetShortcut;
    this.lastWebPanelShortcut = lastWebPanelShortcut;
    this.tooltip = tooltip;
    this.tooltipFullUrl = tooltipFullUrl;
    this.hideSidebarAnimated = hideSidebarAnimated;
    this.hideToolbarAnimated = hideToolbarAnimated;
    this.enableSidebarBoxHint = enableSidebarBoxHint;
  }

  /**
   *
   * @returns {SidebarSettings}
   */
  static load() {
    const pref = Settings.load(PREF) ?? {};
    const version = Number(pref.settingsVersion ?? 1);
    if (version < 2 && pref.padding === "xxsmall") {
      // Legacy default: the old code force-persisted "xxsmall" (2px) on every
      // profile, so it cannot be told apart from an explicit choice made
      // before "Same as Tabs" existed. Treat it as the new default.
      pref.padding = "default";
    }
    return new SidebarSettings(pref);
  }

  save() {
    Settings.save(PREF, {
      settingsVersion: SETTINGS_VERSION,
      position: this.position,
      padding: this.padding,
      newWebPanelPosition: this.newWebPanelPosition,
      defaultFloatingOffset: this.defaultFloatingOffset,
      autoHideBackButton: this.autoHideBackButton,
      autoHideForwardButton: this.autoHideForwardButton,
      containerBorder: this.containerBorder,
      tooltip: this.tooltip,
      tooltipFullUrl: this.tooltipFullUrl,
      autoHideSidebar: this.autoHideSidebar,
      autoHideSidebarBehavior: this.autoHideSidebarBehavior,
      sidebarWidgetHideWebPanel: this.sidebarWidgetHideWebPanel,
      sidebarWidgetShortcut: this.sidebarWidgetShortcut,
      lastWebPanelShortcut: this.lastWebPanelShortcut,
      hideSidebarAnimated: this.hideSidebarAnimated,
      hideToolbarAnimated: this.hideToolbarAnimated,
      enableSidebarBoxHint: this.enableSidebarBoxHint,
    });
  }
}
