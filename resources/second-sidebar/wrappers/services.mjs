// Consolidated module — merged from the former wrappers/*.mjs files.
import { Browser } from "../xul/base/browser.mjs";

export class AppConstantsWrapper {
  /**@type {string} */
  static BROWSER_CHROME_URL = AppConstants.BROWSER_CHROME_URL;
}

export class BrowserCommandsWrapper {
  static tryToCloseWindow(event) {
    BrowserCommands.tryToCloseWindow(event);
  }
}

export class ChromeRegistry {
  static #raw = Cc["@mozilla.org/chrome/chrome-registry;1"].getService(
    Ci.nsIChromeRegistry,
  );

  static convertChromeURL(url) {
    const uri = NetUtilWrapper.newURI(url);
    return this.#raw.convertChromeURL(uri);
  }
}

/**
 * @typedef {Object} QueryInterface
 */

export class ChromeUtilsWrapper {
  static generateQI(interfaces) {
    return ChromeUtils.generateQI(interfaces);
  }
}

export class ClipboardHelperWrapper {
  static clipboardHelper = Cc[
    "@mozilla.org/widget/clipboardhelper;1"
  ].getService(Ci.nsIClipboardHelper);

  static copyString(value) {
    this.clipboardHelper.copyString(value);
  }
}

/**
 * @typedef {Object} PublicIdentity
 * @property {number} userContextId
 * @property {string} name
 * @property {boolean} public
 * @property {string} color
 * @property {string} icon
 */

export class ContextualIdentityServiceWrapper {
  static ensureDataReady() {
    ContextualIdentityService.ensureDataReady();
  }

  static getPublicUserContextIds() {
    return ContextualIdentityService.getPublicUserContextIds();
  }

  static getPublicIdentityFromId(userContextId) {
    return ContextualIdentityService.getPublicIdentityFromId(userContextId);
  }

  static getUserContextLabel(userContextId) {
    return ContextualIdentityService.getUserContextLabel(userContextId);
  }
}

export class DialogBoxWrapper {
  #gDialogBox;

  constructor(gDialogBox) {
    this.#gDialogBox = gDialogBox;
  }

  get raw() {
    return this.#gDialogBox;
  }

  closeDialog() {
    this.raw.dialog.close();
  }
}

/**
 * @typedef {Object} URI
 * @property {string} scheme
 * @property {string} host
 * @property {string} spec
 * @property {string} specIgnoringRef
 */

export class FaviconsWrapper {
  static setDefaultIconURIPreferredSize(value) {
    Favicons.setDefaultIconURIPreferredSize(value);
  }

  /**
   *
   * @param {URI} uri
   * @param {function(URI):void} callback
   */
  static getFaviconURLForPage(uri, callback) {
    if ("getFaviconURLForPage" in Favicons) {
      Favicons.getFaviconURLForPage(uri, callback);
    } else {
      Favicons.getFaviconForPage(uri).then((favicon) =>
        callback(favicon ? favicon.uri : null),
      );
    }
  }
}

export class FileProtocolHandler {
  static #raw = Services.io
    .getProtocolHandler("file")
    .QueryInterface(Ci.nsIFileProtocolHandler);

  static getURLSpecFromDir(dir) {
    return this.#raw.getURLSpecFromDir(dir);
  }
}

export class gCustomizeModeWrapper {
  static enter() {
    gCustomizeMode.enter();
  }

  static get _customizing() {
    return gCustomizeMode._customizing;
  }

  static unwrapToolbarItem(wrapper) {
    gCustomizeMode.unwrapToolbarItem(wrapper);
  }
}

export const OPEN_URL_IN = {
  TAB: "tab",
  BACKGROUND_TAB: "tabshifted",
};

/**
 *
 * @param {string} url
 * @param {OPEN_URL_IN} where
 */
export const openTrustedLinkInWrapper = (url, where) => {
  openTrustedLinkIn(url, where);
};

export class gNavToolboxWrapper {
  static addEventListener(type, listener) {
    gNavToolbox.addEventListener(type, listener);
  }
}

export class IOUtilsWrapper {
  /**
   *
   * @param {string} path
   * @param {string} data
   */
  static async writeUTF8(path, data) {
    const options = { tmpPath: path + ".tmp" };
    await IOUtils.writeUTF8(path, data, options);
  }

  /**
   *
   * @param {string} path
   */
  static async remove(path) {
    await IOUtils.remove(path);
  }
}

/**
 * @typedef {Object} URI
 * @property {string} scheme
 * @property {string} host
 * @property {string} spec
 * @property {string} specIgnoringRef
 */

export class NetUtilWrapper {
  static newURI(url) {
    return NetUtil.newURI(url);
  }
}

export class ObserversWrapper {
  /**
   * @typedef {Object} Observer
   * @property {function(object, string):void} observe
   */

  static addObserver(observer, topic) {
    Services.obs.addObserver(observer, topic);
  }

  static removeObserver(observer, topic) {
    Services.obs.removeObserver(observer, topic);
  }

  static notifyObservers(subject, topic) {
    Services.obs.notifyObservers(subject, topic);
  }
}

export class PathUtilsWrapper {
  static split(path) {
    return PathUtils.split(path);
  }

  static join(parts) {
    return PathUtils.join(...parts);
  }
}

export class PreferencesWrapper {
  static prefHasUserValue(pref) {
    return Services.prefs.prefHasUserValue(pref);
  }

  static getStringPref(pref) {
    return Services.prefs.getStringPref(pref);
  }

  static setStringPref(pref, value) {
    return Services.prefs.setStringPref(pref, value);
  }

  static getBoolPref(pref) {
    return Services.prefs.getBoolPref(pref);
  }

  static setBoolPref(pref, value) {
    return Services.prefs.setBoolPref(pref, value);
  }
}

export class ScriptSecurityManagerWrapper {
  /**@type {number} */
  static DEFAULT_USER_CONTEXT_ID =
    Services.scriptSecurityManager.DEFAULT_USER_CONTEXT_ID;

  static getSystemPrincipal() {
    return Services.scriptSecurityManager.getSystemPrincipal();
  }
}

export class SearchService {
  /**
   *
   * @param {string} query
   * @returns {Promise<string?>}
   */
  static async getDefaulSubmissionUrl(query) {
    const defaultEngine = Services.search.defaultEngine;
    if (!defaultEngine) return null;
    const submission = await defaultEngine.getSubmission(query);
    return submission.uri.spec;
  }
}

export class SidebarControllerWrapper {
  static get _positionStart() {
    return SidebarController._positionStart;
  }

  static reversePosition() {
    SidebarController.reversePosition();
  }
}

export class TabPanelsWrapper {
  #tabpanels;

  constructor(tabpanels) {
    this.#tabpanels = tabpanels;
  }

  get raw() {
    return this.#tabpanels;
  }

  addEventListener(type, callback) {
    this.raw.addEventListener(type, callback);
  }
}

export class ZoomManagerWrapper {
  /**@type {number} */
  static MIN = ZoomManager.MIN;
  /**@type {number} */
  static MAX = ZoomManager.MAX;

  static getZoomForBrowser(browser) {
    return ZoomManager.getZoomForBrowser(browser.getXUL());
  }

  static setZoomForBrowser(browser, value) {
    return ZoomManager.setZoomForBrowser(browser.getXUL(), value);
  }

  static get zoomValues() {
    return ZoomManager.zoomValues;
  }

  static snap(value) {
    return ZoomManager.snap(value);
  }
}
