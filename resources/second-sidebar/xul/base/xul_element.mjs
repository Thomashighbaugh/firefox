export class XULElement {
  /**
   *
   * @param {object} params
   * @param {string?} params.tag
   * @param {string?} params.id
   * @param {Array<string>} params.classList
   * @param {boolean} params.isXUL
   * @param {HTMLElement?} params.element
   */
  constructor({
    tag = null,
    id = null,
    classList = [],
    isXUL = true,
    element = null,
  } = {}) {
    /**@type {HTMLElement} */
    this.element = null;
    if (element !== null) {
      this.element = element;
    } else {
      this.element = isXUL
        ? document.createXULElement(tag)
        : document.createElement(tag);
    }
    if (id !== null) {
      this.element.id = id;
    }
    if (classList.length > 0) {
      this.element.classList.add(...classList);
    }
  }

  get id() {
    return this.element.id;
  }

  addClass(className) {
    this.element.classList.add(className);
    return this;
  }

  hasClass(className) {
    return this.element.classList.contains(className);
  }

  getXUL() {
    return this.element;
  }

  show() {
    return this.removeAttribute("hidden");
  }

  hide() {
    return this.setAttribute("hidden", true);
  }

  toggleHidden(force) {
    return this.toggleAttribute("hidden", force);
  }

  hidden() {
    return this.getAttributeBool("hidden");
  }

  /**
   *
   * @param {string} selector
   * @returns {XULElement?}
   */
  querySelector(selector) {
    const element = this.element.querySelector(selector);
    if (element) {
      return new XULElement({ element });
    }
    return null;
  }

  /**
   *
   * @param {string} selector
   * @returns {XULElement[]}
   */
  querySelectorAll(selector) {
    const elements = this.element.querySelectorAll(selector);
    let xulElements = [];
    for (const element of elements) {
      xulElements.push(new XULElement({ element }));
    }
    return xulElements;
  }

  appendChild(child) {
    this.element.appendChild(child.getXUL());
    return this;
  }

  prependChild(child) {
    this.element.insertBefore(child.getXUL(), this.element.firstChild);
    return this;
  }

  appendChildren(...children) {
    children.forEach((child) => this.appendChild(child));
    return this;
  }

  insertBefore(node, child) {
    this.element.insertBefore(node.getXUL(), child.getXUL());
    return this;
  }

  insertAfter(node, child) {
    this.element.insertBefore(node.getXUL(), child.getXUL().nextSibling);
    return this;
  }

  setAttribute(name, value) {
    this.element.setAttribute(name, value);
    return this;
  }

  setAttributes(attributes = {}) {
    for (const [key, value] of Object.entries(attributes)) {
      this.setAttribute(key, value);
    }
    return this;
  }

  hasAttribute(name) {
    return this.element.hasAttribute(name);
  }

  getAttribute(name) {
    return this.element.getAttribute(name);
  }

  getAttributeBool(name) {
    const value = this.element.getAttribute(name);
    return value === "true" || value === "";
  }

  removeAttribute(name) {
    this.element.removeAttribute(name);
    return this;
  }

  removeAttributes(names) {
    names.forEach((name) => this.removeAttribute(name));
    return this;
  }

  toggleAttribute(name, force) {
    this.element.toggleAttribute(name, force);
    return this;
  }

  getBoundingClientRect() {
    return this.element.getBoundingClientRect();
  }

  focus() {
    this.element.focus();
    return this;
  }

  setContext(context) {
    return this.setAttribute("context", context);
  }

  getProperty(property) {
    return this.element.style.getPropertyValue(property);
  }

  setProperty(property, value) {
    this.element.style.setProperty(property, value);
    return this;
  }

  removeProperty(property) {
    this.element.style.removeProperty(property);
    return this;
  }

  setInnerText(text) {
    this.element.innerText = text;
    return this;
  }

  setInnerHtml(html) {
    this.element.innerHTML = html;
    return this;
  }

  addEventListener(event, callback) {
    this.element.addEventListener(event, callback);
    return this;
  }

  removeEventListener(event, callback) {
    this.element.removeEventListener(event, callback);
    return this;
  }

  dispatchEvent(event) {
    this.element.dispatchEvent(event);
    return this;
  }

  contains(element) {
    return this.element.contains(element.getXUL());
  }

  containsHTML(element) {
    return this.element.contains(element);
  }

  setPointerCapture(pointerId) {
    this.element.setPointerCapture(pointerId);
    return this;
  }

  releasePointerCapture(pointerId) {
    this.element.releasePointerCapture(pointerId);
    return this;
  }

  get ownerDocument() {
    return this.element.ownerDocument;
  }

  get tagName() {
    return this.element.tagName;
  }

  /**
   *
   * @returns {XULElement?}
   */
  get parentElement() {
    return this.element.parentElement
      ? new XULElement({ element: this.element.parentElement })
      : null;
  }

  get screenX() {
    return this.element.screenX;
  }

  get screenY() {
    return this.element.screenY;
  }

  remove() {
    this.element.remove();
    return this;
  }

  // ---- generic setters (absorbed from the former per-element wrapper classes) ----

  setText(text) {
    this.element.textContent = text;
    return this;
  }

  getText() {
    return this.element.textContent;
  }

  setSrc(src) {
    this.element.src = src;
    return this;
  }

  setLabel(label) {
    return this.setAttribute("label", label);
  }

  setType(type) {
    return this.setAttribute("type", type);
  }

  setMode(value) {
    return this.setAttribute("mode", value);
  }

  setResizeBefore(value) {
    return this.setAttribute("resizebefore", value);
  }

  setResizeAfter(value) {
    return this.setAttribute("resizeafter", value);
  }

  setFontSize(value) {
    return this.setProperty("font-size", value);
  }

  getPressed() {
    return this.element.pressed;
  }

  setPressed(value) {
    this.element.pressed = value;
    return this;
  }

  /**
   * @param {boolean} value
   * @returns {XULElement}
   */
  setDisabled(value) {
    if (value) {
      this.setAttribute("disabled", true);
    } else {
      this.removeAttribute("disabled");
    }
    return this;
  }

  isPanelOpen() {
    return this.getAttributeBool("panelopen");
  }
}
