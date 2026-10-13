import { XULElement } from "./xul_element.mjs";

export class MenuList extends XULElement {
  constructor({ id = null, classList = [] } = {}) {
    super({ tag: "menulist", id, classList });
  }

  setValue(value) {
    this.element.value = value;
    return this;
  }

  getValue() {
    return this.element.value;
  }

  appendItem(label, value) {
    this.element.appendItem(label, value);
    return this;
  }

  removeAllItems() {
    this.element.removeAllItems();
    return this;
  }

  getLastMenuItemXUL() {
    return this.element.menupopup.lastChild;
  }
}
