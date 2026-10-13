// Consolidated module — merged from the former wrappers/*.mjs files.
import { Browser } from "../xul/base/browser.mjs";
import { Tab } from "../xul/base/tab.mjs";
import { TabPanelsWrapper, DialogBoxWrapper } from "./services.mjs";
import { XULElement } from "../xul/base/xul_element.mjs";

export class SessionStoreWrapper {
  static get raw() {
    return SessionStore;
  }
  static maybeDontRestoreTabs(window) {
    this.raw.maybeDontRestoreTabs(window.raw);
  }

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

  get currentURI() {
    return this.raw.currentURI;
  }

  get tabs() {
    return this.raw.tabs.map((tab) => new Tab({ element: tab }));
  }

  get selectedTab() {
    if (!this.raw?.selectedTab) return null;
    return new Tab({ element: this.raw.selectedTab });
  }

  set selectedTab(tab) {
    this.raw.selectedTab = tab.getXUL();
  }

  get selectedBrowser() {
    return new Browser({ element: this.raw.selectedBrowser });
  }

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

  addTab(url, options) {
    return new Tab({ element: this.raw.addTab(url, options) });
  }

  removeTab(tab) {
    this.raw.removeTab(tab.getXUL());
  }

  selectTabAtIndex(index) {
    this.raw.selectTabAtIndex(index);
  }

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

  get raw() {
    return this.#window;
  }

  get id() {
    return this.raw.__SSi;
  }

  get name() {
    return this.raw.name;
  }

  get gBrowser() {
    return this.#gBrowser;
  }

  get gDialogBox() {
    return this.#gDialogBox;
  }

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

  get fullScreen() {
    return this.raw.fullScreen;
  }

  get mozInnerScreenX() {
    return this.raw.mozInnerScreenX;
  }

  get mozInnerScreenY() {
    return this.raw.mozInnerScreenY;
  }

  dispatchEvent(event) {
    return this.raw.dispatchEvent(event);
  }

  addEventListener(type, listener) {
    this.raw.addEventListener(type, listener);
  }

  removeEventListener(type, listener) {
    this.raw.removeEventListener(type, listener);
  }

  relinkTreeOwner() {
    this.raw.docShell.treeOwner
      .QueryInterface(Ci.nsIInterfaceRequestor)
      .getInterface(Ci.nsIAppWindow).XULBrowserWindow =
      this.raw.XULBrowserWindow;
  }

  getComputedStyle(element) {
    return this.#window.getComputedStyle(element.getXUL());
  }

  static isEqual(lhs, rhs) {
    return lhs.#window === rhs.#window;
  }
}

export class WindowManagerWrapper {
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

  static getWindowByName(name) {
    return new WindowWrapper(this.raw.getWindowByName(name));
  }

  static get raw() {
    return Services.ww;
  }
}
