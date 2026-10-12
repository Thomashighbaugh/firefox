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

  /**
   *
   * @param {string} pref
   * @param {Object | Array<Object>} value
   */
  static save(pref, value) {
    console.log(`Saving pref "${pref}":`, value);
    PreferencesWrapper.setStringPref(pref, JSON.stringify(value));
  }
}

const PREF = "second-sidebar.settings";

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
    padding = "xxsmall",
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
    return new SidebarSettings({
      position: pref.position,
      padding: pref.padding,
      newWebPanelPosition: pref.newWebPanelPosition,
      defaultFloatingOffset: pref.defaultFloatingOffset,
      autoHideBackButton: pref.autoHideBackButton,
      autoHideForwardButton: pref.autoHideForwardButton,
      containerBorder: pref.containerBorder,
      tooltip: pref.tooltip,
      tooltipFullUrl: pref.tooltipFullUrl,
      autoHideSidebar: pref.autoHideSidebar,
      autoHideSidebarBehavior: pref.autoHideSidebarBehavior,
      sidebarWidgetHideWebPanel: pref.sidebarWidgetHideWebPanel,
      sidebarWidgetShortcut: pref.sidebarWidgetShortcut,
      lastWebPanelShortcut: pref.lastWebPanelShortcut,
      hideSidebarAnimated: pref.hideSidebarAnimated,
      hideToolbarAnimated: pref.hideToolbarAnimated,
      enableSidebarBoxHint: pref.enableSidebarBoxHint,
    });
  }

  save() {
    Settings.save(PREF, {
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
