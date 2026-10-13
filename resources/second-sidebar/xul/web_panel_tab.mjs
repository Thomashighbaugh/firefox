import { Tab } from "./base/tab.mjs";
import { WebPanelBrowser } from "./web_panel_browser.mjs";

export class WebPanelTab extends Tab {
  constructor(element) {
    super({ element });
  }

  static fromTab(tab) {
    if (!tab) return null;
    return new WebPanelTab(tab.getXUL());
  }

  get linkedBrowser() {
    return new WebPanelBrowser(this.element.linkedBrowser);
  }

  get uuid() {
    return this.getAttribute("uuid");
  }

  set uuid(uuid) {
    this.setAttribute("uuid", uuid);
  }

  isEmpty() {
    return !this.uuid;
  }

  addTabBrowserInsertedListener(callback) {
    this.addEventListener("TabBrowserInserted", () => callback());
  }

  addTabCloseListener(callback) {
    this.addEventListener("TabClose", () => callback());
  }

  /**
   *
   * @param {function(boolean, boolean, boolean, boolean, boolean, boolean):void} callback
   */
  addTabAttrModifiedListener(callback) {
    this.addEventListener("TabAttrModified", (event) => {
      const changed = event.detail?.changed ?? [];
      const soundplaying = changed.includes("soundplaying");
      const muted = changed.includes("muted");
      const image = changed.includes("image");
      const busy = changed.includes("busy");
      const progress = changed.includes("progress");
      const label = changed.includes("label");
      callback(soundplaying, muted, image, busy, progress, label);
    });
  }
}
