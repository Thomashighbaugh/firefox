// Minimal fake Firefox chrome environment for loading theme ES modules in Node.
// Installs globals (document, window, Services, …) and exposes loadThemeModule().
import { pathToFileURL } from "node:url";
import path from "node:path";

const REPO = path.resolve(import.meta.dirname, "..", "..");

class FakeClassList {
  constructor() {
    this._set = new Set();
  }
  add(...c) {
    c.forEach((x) => this._set.add(x));
  }
  remove(...c) {
    c.forEach((x) => this._set.delete(x));
  }
  contains(c) {
    return this._set.has(c);
  }
  toggle(c, force) {
    const on = force === undefined ? !this._set.has(c) : !!force;
    if (on) this._set.add(c);
    else this._set.delete(c);
    return on;
  }
  get value() {
    return [...this._set].join(" ");
  }
}

export class FakeElement {
  constructor(tag, { xul = false } = {}) {
    this.localName = tag;
    this.tagName = xul ? tag : tag.toUpperCase();
    this.isXUL = xul;
    this.attributes = new Map();
    this.classList = new FakeClassList();
    this.children = [];
    this.parentElement = null;
    this.listeners = new Map();
    this.textContent = "";
    this.innerText = "";
    this.pressed = undefined;
    this._style = new Map();
    this.style = {
      setProperty: (k, v) => this._style.set(k, v),
      getPropertyValue: (k) => this._style.get(k) ?? "",
      removeProperty: (k) => this._style.delete(k),
    };
    this._focused = false;
  }
  setAttribute(n, v) {
    this.attributes.set(n, String(v));
  }
  getAttribute(n) {
    return this.attributes.has(n) ? this.attributes.get(n) : null;
  }
  hasAttribute(n) {
    return this.attributes.has(n);
  }
  removeAttribute(n) {
    this.attributes.delete(n);
  }
  toggleAttribute(n, force) {
    const on = force === undefined ? !this.hasAttribute(n) : !!force;
    if (on) this.setAttribute(n, "");
    else this.removeAttribute(n);
    return on;
  }
  get id() {
    return this.attributes.get("id") ?? "";
  }
  set id(v) {
    this.setAttribute("id", v);
  }
  get src() {
    return this.attributes.get("src") ?? "";
  }
  set src(v) {
    this.setAttribute("src", v);
  }
  get value() {
    return this.attributes.get("value") ?? "";
  }
  set value(v) {
    this.setAttribute("value", v);
  }
  get firstChild() {
    return this.children[0] ?? null;
  }
  get nextSibling() {
    if (!this.parentElement) return null;
    const i = this.parentElement.children.indexOf(this);
    return this.parentElement.children[i + 1] ?? null;
  }
  get ownerDocument() {
    return globalThis.document;
  }
  get screenX() {
    return 0;
  }
  get screenY() {
    return 0;
  }
  appendChild(c) {
    if (c.parentElement) c.remove();
    c.parentElement = this;
    this.children.push(c);
    return c;
  }
  insertBefore(c, ref) {
    if (c.parentElement) c.remove();
    c.parentElement = this;
    const i = ref ? this.children.indexOf(ref) : this.children.length;
    this.children.splice(i < 0 ? this.children.length : i, 0, c);
    return c;
  }
  remove() {
    if (this.parentElement) {
      const i = this.parentElement.children.indexOf(this);
      if (i >= 0) this.parentElement.children.splice(i, 1);
      this.parentElement = null;
    }
  }
  addEventListener(t, cb) {
    if (!this.listeners.has(t)) this.listeners.set(t, []);
    this.listeners.get(t).push(cb);
  }
  removeEventListener(t, cb) {
    const a = this.listeners.get(t) ?? [];
    const i = a.indexOf(cb);
    if (i >= 0) a.splice(i, 1);
  }
  dispatchEvent(e) {
    (this.listeners.get(e.type) ?? []).forEach((cb) => cb(e));
    return true;
  }
  focus() {
    this._focused = true;
    globalThis.document.activeElement = this;
  }
  getBoundingClientRect() {
    return { x: 0, y: 0, width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0 };
  }
  contains(el) {
    return this === el || this.children.some((c) => c.contains(el));
  }
  setPointerCapture() {}
  releasePointerCapture() {}
  querySelector(sel) {
    return this.#match(sel)[0] ?? null;
  }
  querySelectorAll(sel) {
    return this.#match(sel);
  }
  #match(sel) {
    const out = [];
    const visit = (node) => {
      for (const c of node.children) {
        if (matches(c, sel)) out.push(c);
        visit(c);
      }
    };
    visit(this);
    return out;
  }
}

function matches(el, sel) {
  if (sel.startsWith("#")) return el.id === sel.slice(1);
  if (sel.startsWith(".")) return el.classList.contains(sel.slice(1));
  return el.localName === sel;
}

function installEnv() {
  const head = new FakeElement("head");
  const document = {
    createElement: (tag) => new FakeElement(tag),
    createXULElement: (tag) => new FakeElement(tag, { xul: true }),
    createDocumentFragment: () => new FakeElement("#fragment"),
    querySelector: (sel) => (sel === "head" ? head : null),
    querySelectorAll: () => [],
    getElementById: () => null,
    activeElement: null,
    head,
  };
  globalThis.document = document;

  const deepStub = (name) => {
    const f = function () {};
    return new Proxy(f, {
      get(t, p) {
        if (p === Symbol.toPrimitive) return () => name;
        if (p === "toString") return () => `[stub ${name}]`;
        return deepStub(`${name}.${String(p)}`);
      },
      apply: () => deepStub(`${name}()`),
      construct: () => deepStub(name),
    });
  };

  for (const g of [
    "window",
    "Services",
    "ChromeUtils",
    "XPCOMUtils",
    "Cu",
    "Ci",
    "Cc",
    "Components",
    "AppConstants",
    "IOUtils",
    "PathUtils",
    "NetUtil",
    "SessionStore",
    "gBrowser",
    "CustomizableUI",
    "ZoomManager",
    "Cc",
    "OS",
    "PrivateBrowsingUtils",
    "PlacesUtils",
    "AddonManager",
  ]) {
    if (!(g in globalThis)) globalThis[g] = deepStub(g);
  }
  globalThis.window = globalThis.window ?? { addEventListener() {}, removeEventListener() {} };
  return { document, FakeElement };
}

installEnv();

/** Import a theme module (path relative to the repo root) with the fake env installed. */
export async function loadThemeModule(rel) {
  const abs = path.join(REPO, rel);
  return import(pathToFileURL(abs).href);
}

export { REPO };
