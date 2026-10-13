import { NetUtilWrapper, ScriptSecurityManagerWrapper, ZoomManagerWrapper } from "../../wrappers/services.mjs";
import { XULElement } from "./xul_element.mjs";
export class Browser extends XULElement {
  static ZOOM_DELTA = 0.1;
  constructor({ id = null, classList = [], element } = {}) {
    super({ tag: "browser", id, classList, element });
  }

  get contentDocument() {
    return this.element.contentDocument;
  }

  getCurrentUrl() {
    return this.element.currentURI.spec;
  }

  /**
   *
   * @param {object} progressListener
   * @returns {Browser}
   */
  addProgressListener(progressListener) {
    this.element.addProgressListener(
      progressListener,
      Ci.nsIWebProgress.NOTIFY_ALL,
    );
    return this;
  }

  /**
   *
   * @returns {boolean}
   */
  canGoBack() {
    try {
      return this.element.canGoBack;
    } catch (error) {
      console.log("Failed to get canGoBack:", error);
      return false;
    }
  }

  goBack() {
    this.element.goBack();
    return this;
  }

  /**
   *
   * @returns {boolean}
   */
  canGoForward() {
    try {
      return this.element.canGoForward;
    } catch (error) {
      console.log("Failed to get canForward:", error);
      return false;
    }
  }

  goForward() {
    this.element.goForward();
    return this;
  }

  reload() {
    this.element.reload();
    return this;
  }

  /**
   *
   * @param {string} url
   * @returns {Browser}
   */
  go(url) {
    this.element.loadURI(NetUtilWrapper.newURI(url), {
      triggeringPrincipal: ScriptSecurityManagerWrapper.getSystemPrincipal(),
    });

    return this;
  }

  getZoom() {
    return ZoomManagerWrapper.getZoomForBrowser(this);
  }

  setZoom(value) {
    ZoomManagerWrapper.setZoomForBrowser(this, value);
    return this;
  }

  getTitle() {
    return this.element.contentTitle;
  }

  /**
   *
   * @param {string} userAgent
   * @returns {Browser}
   */
  setCustomUserAgent(userAgent) {
    const browsingContext = this.element.browsingContext;
    if (browsingContext && userAgent !== browsingContext.customUserAgent) {
      browsingContext.customUserAgent = userAgent;
    }
    return this;
  }
}
