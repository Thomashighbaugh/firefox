let EXPORTED_SYMBOLS = ["xPref"];

const { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");

var xPref = {
  get: function (prefPath, def = false, valueIfUndefined, setDefault = true) {
    let sPrefs = def ? Services.prefs.getDefaultBranch(null) : Services.prefs;

    try {
      switch (sPrefs.getPrefType(prefPath)) {
        case 0:
          if (valueIfUndefined != undefined) return this.set(prefPath, valueIfUndefined, setDefault);
          else return undefined;
        case 32:
          return sPrefs.getStringPref(prefPath);
        case 64:let EXPORTED_SYMBOLS = ['xPref'];

        const {Services} = ChromeUtils.import('resource://gre/modules/Services.jsm');
        
        var xPref = {
          // Returns the preference value, whatever the type, but not
// tested with complex types like nsIFile, I don't know how to detect
// a preference like that, in fact I've never seen one
          get: function (prefPath, def = false) {
            let sPrefs = def ?
                           Services.prefs.getDefaultBranch(null) :
                           Services.prefs;
        
            try {
              switch (sPrefs.getPrefType(prefPath)) {
                case 0:
                  return undefined;
                case 32:
                  return sPrefs.getStringPref(prefPath);
                case 64:
                  return sPrefs.getIntPref(prefPath);
                case 128:
                  return sPrefs.getBoolPref(prefPath);
              }
            } catch (ex) {
              return undefined;
            }
            return;
          },
        
          set: function (prefPath, value, def = false) {
            let sPrefs = def ?
                           Services.prefs.getDefaultBranch(null) :
                           Services.prefs;
        
            switch (typeof value) {
              case 'string':
                return sPrefs.setCharPref(prefPath, value) || value;
              case 'number':
                return sPrefs.setIntPref(prefPath, value) || value;
              case 'boolean':
                return sPrefs.setBoolPref(prefPath, value) || value;
            }
            return;
          },
        
          lock: function (prefPath, value) {
            let sPrefs = Services.prefs;
            xPref.lockedBackupDef[prefPath] = xPref.get(prefPath, true);
            if (sPrefs.prefIsLocked(prefPath))
              sPrefs.unlockPref(prefPath);
        
            xPref.set(prefPath, value, true);
            sPrefs.lockPref(prefPath);
          },
        
          lockedBackupDef: {},
        
          unlock: function (prefPath) {
            Services.prefs.unlockPref(prefPath);
            let bkp = xPref.lockedBackupDef[prefPath];
            if (bkp == undefined)
              Services.prefs.deleteBranch(prefPath);
            else
              xPref.set(prefPath, bkp, true);
          },
        
          clear: Services.prefs.clearUserPref,
        
          // Detects changes in preference and returns:
// return[0]: changed preference value
// return[1]: changed preference name
// Save call in a var if you want to stop it later
          addListener: function (prefPath, trat) {
            this.observer = function (aSubject, aTopic, prefPath) {
              return trat(xPref.get(prefPath), prefPath);
            }
        
            Services.prefs.addObserver(prefPath, this.observer);
            return {
              prefPath: prefPath,
              observer: this.observer
            };
          },
        
          // close pref observer
// Just need to pass the var defined when added
          removeListener: function (obs) {
            Services.prefs.removeObserver(obs.prefPath, obs.observer);
          }
        }
          return sPrefs.getIntPref(prefPath);
        case 128:
          return sPrefs.getBoolPref(prefPath);
      }
    } catch (ex) {
      return undefined;
    }
    return;
  },

  set: function (prefPath, value, def = false) {
    let sPrefs = def ? Services.prefs.getDefaultBranch(null) : Services.prefs;

    switch (typeof value) {
      case "string":
        return sPrefs.setCharPref(prefPath, value) || value;
      case "number":
        return sPrefs.setIntPref(prefPath, value) || value;
      case "boolean":
        return sPrefs.setBoolPref(prefPath, value) || value;
    }
    return;
  },

  lock: function (prefPath, value) {
    let sPrefs = Services.prefs;
    this.lockedBackupDef[prefPath] = this.get(prefPath, true);
    if (sPrefs.prefIsLocked(prefPath)) sPrefs.unlockPref(prefPath);

    this.set(prefPath, value, true);
    sPrefs.lockPref(prefPath);
  },

  lockedBackupDef: {},

  unlock: function (prefPath) {
    Services.prefs.unlockPref(prefPath);
    let bkp = this.lockedBackupDef[prefPath];
    if (bkp == undefined) Services.prefs.deleteBranch(prefPath);
    else this.set(prefPath, bkp, true);
  },

  clear: Services.prefs.clearUserPref,

  addListener: function (prefPath, trat) {
    this.observer = function (aSubject, aTopic, prefPath) {
      return trat(xPref.get(prefPath), prefPath);
    };

    Services.prefs.addObserver(prefPath, this.observer);
    return {
      prefPath: prefPath,
      observer: this.observer,
    };
  },

  removeListener: function (obs) {
    Services.prefs.removeObserver(obs.prefPath, obs.observer);
  },
};
