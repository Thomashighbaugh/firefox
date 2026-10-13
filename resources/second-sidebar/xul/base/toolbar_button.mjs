import { XULElement } from "./xul_element.mjs";

export class ToolbarButton extends XULElement {
  constructor({ id = null, classList = [], element } = {}) {
    super({ tag: "toolbarbutton", id, classList, element });
  }

  setIcon(url) {
    return this.setAttribute("image", url);
  }

  getIcon() {
    return this.getAttribute("image");
  }

  setLabel(text) {
    this.setAttribute("label", text);
    return this;
  }

  /**
   *
   * @param {boolean} value
   * @returns {ToolbarButton}
   */
  setBadged(value) {
    if (value) {
      this.setAttribute("badged", true);
    } else {
      this.removeAttribute("badged");
    }
    return true;
  }

  setType(value) {
    return this.setAttribute("type", value);
  }

  setTooltipText(text) {
    return this.setAttribute("tooltiptext", text);
  }

  isOpen() {
    return this.getAttributeBool("open");
  }

  /**
   *
   * @param {boolean} value
   * @returns {ToolbarButton}
   */
  setOpen(value) {
    if (value) {
      this.setAttribute("open", value);
    } else {
      this.removeAttribute("open");
    }
    return this;
  }

  /**
   *
   * @param {boolean} value
   * @returns {ToolbarButton}
   */
  setUnloaded(value) {
    if (value) {
      this.setAttribute("unloaded", value);
    } else {
      this.removeAttribute("unloaded");
    }
    return this;
  }

  /**
   *
   * @param {boolean} value
   * @returns {ToolbarButton}
   */
  setDisabled(value) {
    if (value) {
      this.setAttribute("disabled", true);
    } else {
      this.removeAttribute("disabled");
    }
    return true;
  }

  isDisabled() {
    return this.getAttributeBool("disabled");
  }

  /**
   *
   * @param {boolean} value
   * @returns {ToolbarButton}
   */
  setChecked(value) {
    if (value) {
      this.setAttribute("checked", true);
    } else {
      this.removeAttribute("checked");
    }
    return true;
  }

  isChecked() {
    return this.getAttributeBool("checked");
  }

  getImageXUL() {
    return this.element.querySelector("image");
  }

  getBadgeStackXUL() {
    return this.element.querySelector(".toolbarbutton-badge-stack");
  }
}
