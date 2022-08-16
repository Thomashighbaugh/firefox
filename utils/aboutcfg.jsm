let EXPORTED_SYMBOLS = [];

/*** register an about:cfg page ...
 *
 * We're not just faking it, this makes it a bona-fide about: page.
 * That means you can navigate to it by just typing about:cfg in the urlbar, and the identity icon will show it as a secure system page rather than a local file.
 * And about:cfg will even show up on the about:about page!
 *
 * This technically also makes using the aboutconfig module safer, because it denies the document access to some privileged stuff that it would have with a chrome:// URI.
 *
 * Optionally edit the config.xhtml file and remove line 13: title="about:config".
 * That line sets the tab title to about:config, which (with this script) isn't necessary or desirable since we're changing the URL to about:cfg.
 * Without the title attribute, Firefox will automatically set the title to the tab's URL, which is about:cfg.
 *
 * Big THANKS to @aminomancer ( https://github.com/aminomancer/ )
 *
 ***/

(() => {
  const { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");
  let { classes: Cc, interfaces: Ci, manager: Cm, utils: Cu, results: Cr } = Components;
  const registrar = Cm.QueryInterface(Ci.nsIComponentRegistrar);

  let dir = Services.dirsvc.get("UChrm", Ci.nsIFile);
  let appendFn = (nm) => dir.append(nm);

  ["utils", "aboutconfig", "config.xhtml"].forEach(appendFn);
  if (!dir.exists()) return;

  // generate a unique ID on every app launch. protection against the very unlikely possibility that a
  // future update adds a component with the same class ID, which would break the script.
  function generateFreeCID() {
    let uuid = Components.ID(
      Cc["@mozilla.org/uuid-generator;1"]
        .getService(Ci.nsIUUIDGenerator)
        .generateUUID()
        .toString()
    );
    // I can't tell whether generateUUID is guaranteed to produce a unique ID, or just a random ID.
    // so I add this loop to regenerate it in the extremely unlikely (or potentially impossible)
    // event that the UUID is already registered as a CID.
    while (registrar.isCIDRegistered(uuid)) {
      uuid = Components.ID(
        Cc["@mozilla.org/uuid-generator;1"]
          .getService(Ci.nsIUUIDGenerator)
          .generateUUID()
          .toString()
      );
    }
    return uuid;
  }

  const urlString = 'chrome://userchromejs/content/aboutconfig/config.xhtml';

  function VintageAboutConfig() {}

  VintageAboutConfig.prototype = {
    get uri() {
      if (!urlString) return null;
      return this._uri || (this._uri = Services.io.newURI(urlString));
    },
    newChannel: function (_uri, loadInfo) {
      const ch = Services.io.newChannelFromURIWithLoadInfo(this.uri, loadInfo);
      ch.owner = Services.scriptSecurityManager.getSystemPrincipal();
      return ch;
    },
    getURIFlags: function (_uri) {
      return Ci.nsIAboutModule.ALLOW_SCRIPT | Ci.nsIAboutModule.IS_SECURE_CHROME_UI;
    },
    getChromeURI: function (_uri) {
      return this.uri;
    },
    QueryInterface: ChromeUtils.generateQI(["nsIAboutModule"]),
  };

  var AboutModuleFactory = {
    createInstance(aOuter, aIID) {
      if (aOuter) {
        throw Components.Exception("", Cr.NS_ERROR_NO_AGGREGATION);
      }
      return new VintageAboutConfig().QueryInterface(aIID);
    },
    QueryInterface: ChromeUtils.generateQI(["nsIFactory"]),
  };

  registrar.registerFactory(
    generateFreeCID(),
    'about:cfg',
    '@mozilla.org/network/protocol/about;1?what=cfg',
    AboutModuleFactory
  );

})();
