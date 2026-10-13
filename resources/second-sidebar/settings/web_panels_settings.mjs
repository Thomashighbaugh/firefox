// Consolidated module — merged from the former settings/*.mjs files.
import { Settings } from "./settings.mjs";
import { WebPanelSettings } from "./web_panel_settings.mjs";

const PREF = "second-sidebar.web-panels";

export class WebPanelsSettings {
  /**@type {Array<WebPanelSettings} */
  #webPanels = [];

  constructor(webPanels) {
    this.#webPanels = webPanels;
  }

  get webPanels() {
    return this.#webPanels;
  }

  /**
   *
   * @param {string} sidebarPosition
   * @param {string} defaultFloatingOffset
   * @returns {WebPanelsSettings}
   */
  static load(sidebarPosition, defaultFloatingOffset) {
    const pref = Settings.load(PREF) ?? [];

    return new WebPanelsSettings(
      pref.map((webPanelPref) =>
        WebPanelSettings.fromObject(
          sidebarPosition,
          `var(--space-${defaultFloatingOffset})`,
          webPanelPref,
        ),
      ),
    );
  }

  save() {
    Settings.save(
      PREF,
      this.#webPanels.map((webPanel) => webPanel.toObject()),
    );
  }
}

export class WebPanelState {
  constructor(uuid, { lastUrl = null } = {}) {
    this.uuid = uuid;
    this.lastUrl = lastUrl;
  }

  /**
   *
   * @param {object} object
   * @returns {WebPanelState}
   */
  static fromObject(object) {
    return new WebPanelState(object.uuid, {
      lastUrl: object.lastUrl,
    });
  }

  /**
   *
   * @returns {object}
   */
  toObject() {
    return {
      uuid: this.uuid,
      lastUrl: this.lastUrl,
    };
  }
}

const PREF_STATE = "second-sidebar.web-panels-state";

export class WebPanelsState {
  constructor(webPanelsState) {
    this.webPanelsState = webPanelsState;
  }

  /**
   *
   * @returns {WebPanelsState}
   */
  static load() {
    const pref = Settings.load(PREF_STATE) ?? [];

    return new WebPanelsState(
      pref.map((webPanelStatePref) =>
        WebPanelState.fromObject(webPanelStatePref),
      ),
    );
  }

  save() {
    Settings.save(
      PREF_STATE,
      this.webPanelsState.map((webPanelState) => webPanelState.toObject()),
    );
  }
}
