// ==UserScript==
// @name           Agent/Author Sheet Loader
// @version        2.6
// @author         aminomancer
// @homepage       https://github.com/aminomancer
// @description    Load *.ag.css as agent, *.au.css as author, and *.us.css as
// user sheets. Capable of loading stylesheets into browser toolbox windows,
// excluding userChrome.css/userContent.css. Use
// userChromeDevtoolsSheetLoader.uc.js for those.
// @backgroundmodule
// ==/UserScript==

const { Services, Ci } = Components.utils.import(
  "resource://gre/modules/Services.jsm",
);

(async () => {
  const sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(
    Ci.nsIStyleSheetService,
  );

  function traverseToMainProfile(str) {
    let dir = Services.dirsvc.get(str, Ci.nsIFile);
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

  const chromeDir = traverseToMainProfile("UChrm");
  if (!chromeDir.exists()) return;

  for (let entry of chromeDir.directoryEntries) {
    const file = entry.QueryInterface(Ci.nsIFile);
    const name = file.leafName;
    if (!file.isFile() || !/\.(?:au|ag|us)\.css$/i.test(name)) continue;

    const typePrefix = name.split(".")[1];
    let type, typeString;
    switch (typePrefix) {
      case "au":
        type = sss.AUTHOR_SHEET;
        typeString = "author sheet";
        break;
      case "ag":
        type = sss.AGENT_SHEET;
        typeString = "agent sheet";
        break;
      case "us":
        type = sss.USER_SHEET;
        typeString = "user sheet";
        break;
    }

    const uri = Services.io
      .getProtocolHandler("file")
      .QueryInterface(Ci.nsIFileProtocolHandler)
      .getURLSpecFromDir(file.parent);
    try {
      sss.loadAndRegisterSheet(Services.io.newURI(uri + name), type);
      console.info(`Loaded ${typeString}: ${name}`);
    } catch (e) {
      console.error(`Could not load ${name}: ${e.name}`);
    }
  }
})();
