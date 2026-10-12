// Consolidated module — merged from the former wrappers/*.mjs files.
import { Browser } from "../xul/base/browser.mjs";
import { Tab } from "../xul/base/tab.mjs";
import { TabPanelsWrapper, DialogBoxWrapper } from "./services.mjs";
import { XULElement } from "../xul/base/xul_element.mjs";

export class SessionStoreWrapper {
  static get raw() {
    return SessionStore;
  }
  /**
   *
   * @param {WindowWrapper} window
   */
  static maybeDontRestoreTabs(window) {
    this.raw.maybeDontRestoreTabs(window.raw);
  }

  /**
   *
   * @returns {number}
   */
  static getWindowsCount() {
    return this.raw.getWindows().length;
  }
}

/**
 * @typedef {Object} URI
 * @property {string} scheme
 * @property {string} host
 * @property {string} spec
 * @property {string} specIgnoringRef
 */

/**
 * @typedef {Object} BrowserForTab
 * @property {HTMLElement} browser
 */

export class TabBrowserWrapper {
  #gBrowser;

  constructor(gBrowser) {
    this.#gBrowser = gBrowser;
  }

  get raw() {
    return this.#gBrowser;
  }

  /**
   * @returns {URI}
   */
  get currentURI() {
    return this.raw.currentURI;
  }

  /**
   * @returns {Array<Tab>}
   */
  get tabs() {
    return this.raw.tabs.map((tab) => new Tab({ element: tab }));
  }

  /**
   * @returns {Tab?}
   */
  get selectedTab() {
    if (!this.raw?.selectedTab) return null;
    return new Tab({ element: this.raw.selectedTab });
  }

  /**
   * @param {Tab} tab
   */
  set selectedTab(tab) {
    this.raw.selectedTab = tab.getXUL();
  }

  /**
   * @returns {Browser}
   */
  get selectedBrowser() {
    return new Browser({ element: this.raw.selectedBrowser });
  }

  /**
   * @returns {TabPanelsWrapper}
   */
  get tabpanels() {
    return new TabPanelsWrapper(this.raw.tabpanels);
  }

  /**
   *
   * @param {Tab} tab
   * @returns {Browser}
   */
  getBrowserForTab(tab) {
    return new Browser({
      element: this.raw.getBrowserForTab(tab.getXUL()),
    });
  }

  /**
   *
   * @param {Browser} browser
   * @returns {Tab}
   */
  getTabForBrowser(browser) {
    return new Tab({
      element: this.raw.getTabForBrowser(browser.getXUL()),
    });
  }

  /**
   *
   * @param {string} url
   * @param {object} options
   * @param {number} options.triggeringPrincipal
   * @returns {Tab}
   */
  addTab(url, options) {
    return new Tab({ element: this.raw.addTab(url, options) });
  }

  /**
   *
   * @param {Tab} tab
   */
  removeTab(tab) {
    this.raw.removeTab(tab.getXUL());
  }

  /**
   *
   * @param {number} index
   */
  selectTabAtIndex(index) {
    this.raw.selectTabAtIndex(index);
  }

  /**
   *
   * @param {string} type
   * @param {function(Event):void} callback
   */
  addEventListener(type, callback) {
    this.raw.addEventListener(type, callback);
  }
}

export class WindowWrapper {
  #window;
  #gBrowser;
  #gDialogBox;

  /**
   *
   * @param {Window} chromeWindow
   */
  constructor(chromeWindow = null) {
    this.#window = chromeWindow ?? window;
    this.#gBrowser = new TabBrowserWrapper(this.raw.gBrowser);
    this.#gDialogBox = new DialogBoxWrapper(this.raw.gDialogBox);
  }

  /**
   * @returns {Window}
   */
  get raw() {
    return this.#window;
  }

  /**
   * @returns {string}
   */
  get id() {
    return this.raw.__SSi;
  }

  /**
   * @returns {string}
   */
  get name() {
    return this.raw.name;
  }

  /**
   * @returns {TabBrowserWrapper}
   */
  get gBrowser() {
    return this.#gBrowser;
  }

  /**
   * @returns {DialogBoxWrapper}
   */
  get gDialogBox() {
    return this.#gDialogBox;
  }

  /**
   * @returns {Document?}
   */
  get document() {
    return this.raw.document;
  }

  /**
   * @returns {XULElement?}
   */
  get documentElement() {
    const documentElement = this.document?.documentElement;
    if (documentElement) {
      return new XULElement({ element: documentElement });
    }
    return null;
  }

  /**
   * @returns {boolean}
   */
  get fullScreen() {
    return this.raw.fullScreen;
  }

  /**
   * @returns {number}
   */
  get mozInnerScreenX() {
    return this.raw.mozInnerScreenX;
  }

  /**
   * @returns {number}
   */
  get mozInnerScreenY() {
    return this.raw.mozInnerScreenY;
  }

  /**
   *
   * @param {Event} event
   * @returns {boolean}
   */
  dispatchEvent(event) {
    return this.raw.dispatchEvent(event);
  }

  /**
   *
   * @param {string} type
   * @param {function(Event):any} listener
   */
  addEventListener(type, listener) {
    this.raw.addEventListener(type, listener);
  }

  /**
   *
   * @param {string} type
   * @param {function(Event):any} listener
   */
  removeEventListener(type, listener) {
    this.raw.removeEventListener(type, listener);
  }

  relinkTreeOwner() {
    this.raw.docShell.treeOwner
      .QueryInterface(Ci.nsIInterfaceRequestor)
      .getInterface(Ci.nsIAppWindow).XULBrowserWindow =
      this.raw.XULBrowserWindow;
  }

  /**
   *
   * @param {XULElement} element
   * @returns {CSSStyleDeclaration}
   */
  getComputedStyle(element) {
    return this.#window.getComputedStyle(element.getXUL());
  }

  /**
   * @param {WindowWrapper} lhs
   * @param {WindowWrapper} rhs
   * @returns {boolean}
   */
  static isEqual(lhs, rhs) {
    return lhs.#window === rhs.#window;
  }
}

export class WindowManagerWrapper {
  /**
   *
   * @returns {WindowWrapper}
   */
  static getMostRecentBrowserWindow() {
    return new WindowWrapper(Services.wm.getMostRecentBrowserWindow());
  }
}

export class WindowWatcherWrapper {
  /**
   *
   * @returns {Array<WindowWrapper>}
   */
  static getWindowEnumerator() {
    return Array.from(this.raw.getWindowEnumerator()).map(
      (window) => new WindowWrapper(window),
    );
  }

  /**
   *
   * @param {string} name
   * @returns {WindowWrapper}
   */
  static getWindowByName(name) {
    return new WindowWrapper(this.raw.getWindowByName(name));
  }

  static get raw() {
    return Services.ww;
  }
}
