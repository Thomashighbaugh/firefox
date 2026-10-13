import { Widget } from "./widget.mjs";
import { XULElement } from "./xul_element.mjs";
export class Panel extends XULElement {
  constructor({ id = null, classList = [] } = {}) {
    super({ tag: "panel", id, classList: [...classList, "panel-no-padding"] });
    this.setAttribute("level", "top");
  }

  setType(type) {
    return this.setAttribute("type", type);
  }

  setRole(role) {
    return this.setAttribute("role", role);
  }

  hidePopup() {
    this.element.hidePopup();
    return this;
  }

  openPopup(target, position = "start_before") {
    this.element.openPopup(target.getXUL(), position);
    return this;
  }

  openPopupAtScreen(screenX, screenY) {
    this.element.openPopupAtScreen(screenX, screenY);
    return this;
  }

  moveToAnchor(target, position = "start_before") {
    this.element.moveToAnchor(target.getXUL(), position);
    return this;
  }

  isPanelOpen() {
    return this.getAttributeBool("panelopen");
  }

  getState() {
    return this.element.state;
  }
}
