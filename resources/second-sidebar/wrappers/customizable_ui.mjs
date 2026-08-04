/**
 * @typedef {Object} WidgetInstance
 * @property {HTMLElement} node
 */

/**
 * @typedef {Object} Widget
 * @property {Array<WidgetInstance>} instances
 * @property {function(Window):WidgetInstance} forWindow
 */

/**
 * @typedef {Object} WidgetInstance
 * @property {HTMLElement} node
 */

/**
 * @typedef {Object} Widget
 * @property {Array<WidgetInstance>} instances
 * @property {function(Window):WidgetInstance} forWindow
 */

export class CustomizableUIWrapper {
  static TYPE_TOOLBAR = "toolbar";
  static TYPE_PANEL = "panel";

  static get #CUI() {
    try {
      if (typeof CustomizableUI !== "undefined") return CustomizableUI;
      return null;
    } catch { return null; }
  }

  static registerArea(
    id,
    {
      type = this.TYPE_TOOLBAR,
      defaultCollapsed = false,
      overflowable = false,
      defaultPlacements = [],
    } = {},
  ) {
    if (!this.#CUI) return;
    this.#CUI.registerArea(id, {
      type,
      defaultCollapsed,
      overflowable,
      defaultPlacements,
    });
  }

  /**
   *
   * @param {HTMLElement} node
   */
  static registerToolbarNode(node) {
    if (!this.#CUI) return;
    this.#CUI.registerToolbarNode(node);
  }

  /**
   *
   * @param {object} properties
   * @param {string} properties.id
   * @param {string} properties.type
   * @param {boolean} properties.localized
   * @param {function(HTMLElement):void} properties.onCreated
   * @param {function(MouseEvent):void} properties.onClick
   * @returns {object}
   */
  static createWidget({
    id,
    type = "button",
    localized = false,
    onCreated,
    onClick,
  }) {
    if (!this.#CUI) return null;
    return this.#CUI.createWidget({
      id,
      type,
      localized,
      onCreated,
      onClick,
    });
  }

  /**
   *
   * @param {string} id
   * @returns {Widget}
   */
  static getWidget(id) {
    if (!this.#CUI) return null;
    return this.#CUI.getWidget(id);
  }

  /**
   *
   * @param {string} id
   */
  static destroyWidget(id) {
    if (!this.#CUI) return;
    this.#CUI.destroyWidget(id);
  }

  /**
   *
   * @param {string} id
   * @param {string} area
   * @param {number} position
   */
  static addWidgetToArea(id, area, position) {
    if (!this.#CUI) return;
    this.#CUI.addWidgetToArea(id, area, position);
  }

  /**
   *
   * @param {string} id
   * @returns {object}
   */
  static getPlacementOfWidget(id) {
    if (!this.#CUI) return null;
    return this.#CUI.getPlacementOfWidget(id);
  }
}
