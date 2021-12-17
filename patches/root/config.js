// skip 1st line
try {
  
  let {
  classes: Cc,
  interfaces: Ci,
  manager: Cm,
  utils: Cu
  } = Components;

  function traverseToMainProfile(str) {
    let dir = Cc["@mozilla.org/file/directory_service;1"]
        .getService(Ci.nsIProperties)
        .get(str, Ci.nsIFile);
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
  
  let cmanifest = traverseToMainProfile('UChrm');
  cmanifest.append('utils');
  cmanifest.append('chrome.manifest');
  
  if(cmanifest.exists()){
    Cm.QueryInterface(Ci.nsIComponentRegistrar).autoRegister(cmanifest);
    Cu.import('chrome://userchromejs/content/boot.jsm');
  }

} catch(ex) {};