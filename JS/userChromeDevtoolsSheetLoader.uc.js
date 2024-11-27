// ==UserScript==
// @name           Browser Toolbox Stylesheet Loader
// @version        2.1
// @author         aminomancer
// @homepage       https://github.com/aminomancer
// @description    Load userChrome and userContent stylesheets into Browser Toolbox windows
// @backgroundmodule
// ==/UserScript==

const { Services, Ci, Cc } = Components.utils.import(
  "resource://gre/modules/Services.jsm",
);

class ToolboxProcessSheetLoader {
  constructor() {
    Services.obs.addObserver(this, "domwindowopened", false);
    this.regex = /^chrome:(\/\/devtools\/.*.html.*)/i;
    this.lastSubject = null;
  }

  traverseToMainProfile(win, str) {
    let dir = Services.dirsvc.get(str, win.Ci.nsIFile);
    if (!dir.exists()) {
      let toAddChrome = false;
      while (dir.target.includes("chrome_debugger_profile")) {
        dir = dir.parent;
        toAddChrome = true;
      }
      if (toAddChrome) dir.append("chrome");
    }
    return dir;
  }

  getChromePath(win) {
    return Services.io
      .getProtocolHandler("file")
      .QueryInterface(win.Ci.nsIFileProtocolHandler)
      .getURLSpecFromDir(this.traverseToMainProfile(win, "UChrm"));
  }

  loadSheet(win, path, name, type) {
    const sss = win.Cc["@mozilla.org/content/style-sheet-service;1"].getService(
      win.Ci.nsIStyleSheetService,
    );
    try {
      sss.loadAndRegisterSheet(Services.io.newURI(path + name), sss[type]);
    } catch (e) {}
  }

  unloadSheet(win, path, name, type) {
    const sss = win.Cc["@mozilla.org/content/style-sheet-service;1"].getService(
      win.Ci.nsIStyleSheetService,
    );
    try {
      sss.unegisterSheet(Services.io.newURI(path + name), sss[type]);
    } catch (e) {}
  }

  observe(sub) {
    if (this.lastSubject === sub) return;
    this.lastSubject = sub;
    sub.addEventListener("DOMContentLoaded", this, { once: true });
  }

  handleEvent(e) {
    switch (e.type) {
      case "DOMContentLoaded":
        this._onContentLoaded(e);
        break;
      case "uninit":
        this._onWindowUninit(e);
        break;
    }
  }

  _onContentLoaded(e) {
    const document = e.target;
    const win = document.defaultView;
    this.lastSubject.removeEventListener("DOMContentLoaded", this);
    if (
      !Services.dirsvc
        .get("UChrm", Ci.nsIFile)
        .target.includes("chrome_debugger_profile") ||
      !this.regex.test(win.location.href)
    )
      return;
    const path = this.getChromePath(win);
    this.loadSheet(win, path, "userChrome.css", "AUTHOR_SHEET");
    this.loadSheet(win, path, "userContent.css", "USER_SHEET");
    win.addEventListener("uninit", this);
  }

  _onWindowUninit(e) {
    const win = e.target;
    if (
      !Services.dirsvc
        .get("UChrm", Ci.nsIFile)
        .target.includes("chrome_debugger_profile") ||
      !this.regex.test(win.location.href)
    )
      return;
    const path = this.getChromePath(win);
    this.unloadSheet(win, path, "userChrome.css", "AUTHOR_SHEET");
    this.unloadSheet(win, path, "userContent.css", "USER_SHEET");
    win.removeEventListener("uninit", this);
  }
}

new ToolboxProcessSheetLoader();
