import { XULElement } from "./xul_element.mjs";

export class Input extends XULElement {
  constructor({ id = null, classList = [] } = {}) {
    super({ tag: "input", id, classList, isXUL: false });
  }

  setType(type) {
    this.element.type = type;
    return this;
  }

  setValue(value) {
    this.element.value = value;
    return this;
  }

  getValue() {
    return this.element.value;
  }

  setBackgroundImage(image) {
    this.element.style.backgroundImage = `url("${image}")`;
    return this;
  }

  setPlaceholder(placeholder) {
    this.element.placeholder = placeholder;
    return this;
  }
}
