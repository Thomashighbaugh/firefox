// ==UserScript==
// @name            userChromeJS Manager
// @include         main
// @author          Thomas Leon Highbaugh
// @author          xiaoxiaoflood
// @description     This script provides a user interface for managing
//                  userChromeJS scripts in Firefox. It has been optimized for use with fx-autoconfig, which loads userChromeJS scripts as the browser starts. The manager allows enabling/disabling scripts, editing,uninstalling, and restarting the browser.
//
// @onlyonce
// ==/UserScript==

// This version is also documented with code comments that illuminate its functionality for ease of reading
UC.rebuild = {
  // Preference keys for UI options
  PREF_TOOLSBUTTON: "userChromeJS.showtoolbutton",
  PREF_OPENWITHSYSTEMDEFAULT: "userChromeJS.openWithSystemDefault",

  // Stores custom menu elements to be injected
  menues: [],

  /**
   * Handler for the userChromeJS options popup menu.
   * Dynamically populates the menu with script entries and toggles.
   */
  onpopup: function (event) {
    let document = event.target.ownerDocument;

    if (event.target != document.getElementById("userChromejs_options")) return;

    // Remove old script entries
    while (document.getElementById("uc-menuseparator").nextSibling) {
      document.getElementById("uc-menuseparator").nextSibling.remove();
    }

    let enabled = xPref.get(_uc.PREF_ENABLED);

    // Add global enable/disable menu item
    let mi = event.target.appendChild(
      this.elBuilder(document, "menuitem", {
        label: enabled ? "Enabled" : "Disabled (click to Enable)",
        oncommand: "xPref.set(_uc.PREF_ENABLED, " + !enabled + ");",
        type: "checkbox",
        checked: enabled,
      }),
    );

    // Add separator if there are multiple scripts
    if (Object.keys(_uc.scripts).length > 1)
      event.target.appendChild(this.elBuilder(document, "menuseparator"));

    // Add menu items for each user script
    Object.values(_uc.scripts)
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((script) => {
        if (script.filename === _uc.ALWAYSEXECUTE) {
          return;
        }

        mi = event.target.appendChild(
          this.elBuilder(document, "menuitem", {
            label: script.name ? script.name : script.filename,
            onclick: "UC.rebuild.clickScriptMenu(event)",
            onmouseup: "UC.rebuild.shouldPreventHide(event)",
            type: "checkbox",
            checked: script.isEnabled,
            class: "userChromejs_script",
            restartless: !!script.shutdown,
          }),
        );
        mi.filename = script.filename;
        let homepage =
          script.homepageURL ||
          script.downloadURL ||
          script.updateURL ||
          script.reviewURL;
        if (homepage) mi.setAttribute("homeURL", homepage);
        mi.setAttribute(
          "tooltiptext",
          `
        Left-Click: Enable/Disable
        Middle-Click: Enable/Disable and keep this menu open
        Right-Click: Edit
        Ctrl + Left-Click: Reload Script
        Ctrl + Middle-Click: Open Homepage
        Ctrl + Right-Click: Uninstall
      `.replace(/^\n| {2,}/g, "") +
            (script.description ? "\nDescription: " + script.description : "") +
            (homepage ? "\nHomepage: " + homepage : ""),
        );

        event.target.appendChild(mi);
      });

    // Update label for switching display mode
    document
      .getElementById("showToolsMenu")
      .setAttribute(
        "label",
        "Switch to " +
          (this.showToolButton
            ? "button in Navigation Bar"
            : "item in Tools Menu"),
      );
  },

  /**
   * Handler for the hamburger (app) menu popup.
   * Populates the panel with script toggles and actions.
   */
  onHamPopup: function (aEvent) {
    const enabledMenuItem = aEvent.target.querySelector(
      "#appMenu-userChromeJS-enabled",
    );
    enabledMenuItem.checked = xPref.get(_uc.PREF_ENABLED);

    // Remove old script entries
    const scriptsSeparator = aEvent.target.querySelector(
      "#appMenu-userChromeJS-scriptsSeparator",
    );
    while (scriptsSeparator.nextSibling) {
      scriptsSeparator.nextSibling.remove();
    }

    // Add menu items for each user script
    let scriptMenuItems = [];
    Object.values(_uc.scripts)
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((script) => {
        if (_uc.ALWAYSEXECUTE.includes(script.filename)) return;

        let scriptMenuItem = UC.rebuild.createMenuItem(
          scriptsSeparator.ownerDocument,
          null,
          null,
          script.name ? script.name : script.filename,
        );
        scriptMenuItem.setAttribute(
          "onclick",
          "UC.rebuild.clickScriptMenu(event)",
        );
        scriptMenuItem.type = "checkbox";
        scriptMenuItem.checked = script.isEnabled;
        scriptMenuItem.setAttribute("restartless", !!script.shutdown);
        scriptMenuItem.filename = script.filename;
        let homepage =
          script.homepageURL ||
          script.downloadURL ||
          script.updateURL ||
          script.reviewURL;
        if (homepage) scriptMenuItem.setAttribute("homeURL", homepage);
        scriptMenuItem.setAttribute(
          "tooltiptext",
          `
        Left-Click: Enable/Disable
        Middle-Click: Enable/Disable and keep this menu open
        Right-Click: Edit
        Ctrl + Left-Click: Reload Script
        Ctrl + Middle-Click: Open Homepage
        Ctrl + Right-Click: Uninstall
      `.replace(/^\n| {2,}/g, "") +
            (script.description ? "\nDescription: " + script.description : "") +
            (homepage ? "\nHomepage: " + homepage : ""),
        );
        scriptMenuItems.push(scriptMenuItem);
      });

    scriptsSeparator.parentElement.append(...scriptMenuItems);
  },

  /**
   * Handles clicks on script menu items.
   * Supports enabling/disabling, editing, uninstalling, and opening homepages.
   */
  clickScriptMenu: function (event) {
    const { target } = event;
    const { gBrowser } = event.view;
    const script = _uc.scripts[target.filename];
    switch (event.button) {
      case 0: // Left click: toggle enable/disable
        this.toggleScript(script);
        if (event.ctrlKey) this.toggleScript(script);
        break;
      case 1: // Middle click: toggle and keep menu open, or open homepage
        if (event.ctrlKey) {
          let url = target.getAttribute("homeURL");
          if (url) {
            gBrowser.addTab(url, {
              triggeringPrincipal:
                Services.scriptSecurityManager.createNullPrincipal({}),
            });
          }
        } else {
          this.toggleScript(script);
          if (target.tagName === "toolbarbutton")
            target.setAttribute("checked", script.isEnabled);
        }
        break;
      case 2: // Right click: edit or uninstall
        if (event.ctrlKey) this.uninstall(script);
        else this.launchEditor(script);
    }
  },

  /**
   * Prevents the menu from closing on middle click.
   */
  shouldPreventHide: function (event) {
    if (event.button == 1 && !event.ctrlKey) {
      const menuitem = event.target;
      menuitem.setAttribute("closemenu", "none");
      menuitem.parentNode.addEventListener(
        "popuphidden",
        () => {
          menuitem.removeAttribute("closemenu");
        },
        { once: true },
      );
    }
  },

  /**
   * Launches the script file in the user's preferred editor or system default.
   */
  launchEditor: function (script) {
    let editor = xPref.get("view_source.editor.path");
    let useSystemDefault = xPref.get(this.PREF_OPENWITHSYSTEMDEFAULT);
    if (!editor && !useSystemDefault) {
      let obj = { value: "C:\\WINDOWS\\system32\\notepad.exe" };
      if (
        Services.prompt.prompt(
          null,
          "userChromeJS",
          "Editor not defined. Paste the full path of your text editor or click cancel to use system default.",
          obj,
          null,
          { value: 0 },
        )
      ) {
        editor = obj.value;
        xPref.set("view_source.editor.path", editor);
      } else
        useSystemDefault = xPref.set(this.PREF_OPENWITHSYSTEMDEFAULT, true);
    }
    if (useSystemDefault) {
      script.file.launch();
    } else {
      let editorArgs = [];
      let args = Services.prefs.getCharPref("view_source.editor.args");
      if (args) {
        // Parse arguments, supporting quoted strings
        const argumentRE = /"([^"]+)"|(\S+)/g;
        let match;
        while ((match = argumentRE.exec(args))) {
          editorArgs.push(match[1] || match[2]);
        }
      }
      editorArgs.push(script.file.path);
      try {
        let appfile = Cc["@mozilla.org/file/local;1"].createInstance(
          Ci.nsIFile,
        );
        appfile.initWithPath(editor);
        let process = Cc["@mozilla.org/process/util;1"].createInstance(
          Ci.nsIProcess,
        );
        process.init(appfile);
        process.run(false, editorArgs, editorArgs.length, {});
      } catch {
        alert(
          "Can't open the editor. Go to about:config and set editor's path in view_source.editor.path.",
        );
      }
    }
  },

  /**
   * Restarts Firefox, invalidating caches.
   */
  restart: function () {
    Services.appinfo.invalidateCachesOnRestart();

    let cancelQuit = Cc["@mozilla.org/supports-PRBool;1"].createInstance(
      Ci.nsISupportsPRBool,
    );
    Services.obs.notifyObservers(
      cancelQuit,
      "quit-application-requested",
      "restart",
    );

    if (cancelQuit.data) return;

    if (Services.appinfo.inSafeMode)
      Services.startup.restartInSafeMode(Ci.nsIAppStartup.eAttemptQuit);
    else
      Services.startup.quit(
        Ci.nsIAppStartup.eAttemptQuit | Ci.nsIAppStartup.eRestart,
      );
  },

  /**
   * Enables or disables a script and loads/unloads it as needed.
   */
  toggleScript: function (script) {
    if (script.isEnabled) {
      xPref.set(
        _uc.PREF_SCRIPTSDISABLED,
        script.filename + "," + xPref.get(_uc.PREF_SCRIPTSDISABLED),
      );
    } else {
      xPref.set(
        _uc.PREF_SCRIPTSDISABLED,
        xPref
          .get(_uc.PREF_SCRIPTSDISABLED)
          .replace(
            new RegExp("^" + script.filename + ",|," + script.filename),
            "",
          ),
      );
    }

    if (
      xPref.get(_uc.PREF_ENABLED) &&
      script.isEnabled &&
      !_uc.everLoaded.includes(script.id)
    ) {
      this.install(script);
    } else if (script.isRunning && !!script.shutdown) {
      this.shutdown(script);
    }
  },

  /**
   * Switches between toolbar button and tools menu item for the manager UI.
   */
  toggleUI: function (byaboutconfig = false, startup = false) {
    this.showToolButton = xPref.get(this.PREF_TOOLSBUTTON);
    if (!byaboutconfig && !startup) {
      this.showToolButton = xPref.set(
        this.PREF_TOOLSBUTTON,
        !this.showToolButton,
      );
    }

    _uc.windows((doc) => {
      doc.getElementById("userChromebtnMenu").hidden = this.showToolButton;
      doc.getElementById("userChromejs_Tools_Menu").hidden =
        !this.showToolButton;
      if (this.showToolButton) {
        doc
          .getElementById("userChromejs_Tools_Menu")
          .appendChild(doc.getElementById("userChromejs_options"));
      } else if (!startup) {
        doc
          .getElementById("userChromebtnMenu")
          .appendChild(doc.getElementById("userChromejs_options"));
      }
    });
  },

  /**
   * Creates a toolbarbutton menu item for the hamburger menu.
   */
  createMenuItem: function (doc, id, icon, label, command) {
    const menuItem = doc.createXULElement("toolbarbutton");
    menuItem.className = "subviewbutton subviewbutton-iconic";
    if (id) menuItem.id = "appMenu-userChromeJS-" + id;
    menuItem.label = label;
    menuItem.style.listStyleImage = icon;
    if (command) menuItem.setAttribute("oncommand", command);
    return menuItem;
  },

  /**
   * Loads a script into all open windows where it matches.
   */
  install: function (script) {
    script = _uc.getScriptData(script.file);
    Services.obs.notifyObservers(null, "startupcache-invalidate");
    _uc.windows((doc, win, loc) => {
      if (win._uc && script.regex.test(loc.href)) {
        _uc.loadScript(script, win);
      }
    }, false);
  },

  /**
   * Uninstalls a script, removing its file and disabling it.
   */
  uninstall: function (script) {
    if (
      !Services.prompt.confirm(
        null,
        "userChromeJS",
        "Do you want to uninstall this script? The file will be deleted.",
      )
    )
      return;

    this.shutdown(script);
    script.file.remove(false);
    xPref.set(
      _uc.PREF_SCRIPTSDISABLED,
      xPref
        .get(_uc.PREF_SCRIPTSDISABLED)
        .replace(
          new RegExp("^" + script.filename + ",|," + script.filename),
          "",
        ),
    );
  },

  /**
   * Calls the shutdown handler for a script, if present.
   */
  shutdown: function (script) {
    if (script.shutdown) {
      _uc.windows((doc, win, loc) => {
        if (script.regex.test(loc.href)) {
          try {
            eval(script.shutdown);
          } catch (ex) {
            Cu.reportError(ex);
          }
          if (script.onlyonce) return true;
        }
      }, false);
      script.isRunning = false;
    }
  },

  /**
   * Utility for creating XUL elements with properties.
   */
  elBuilder: function (doc, tag, props) {
    let el = doc.createXULElement(tag);
    for (let p in props) {
      el.setAttribute(p, props[p]);
    }
    return el;
  },

  /**
   * Injects custom CSS for the manager UI.
   */
  setStyle: function () {
    _uc.sss.loadAndRegisterSheet(
      Services.io.newURI(
        "data:text/css;charset=UTF-8," +
          encodeURIComponent(`
      @-moz-document url('${_uc.BROWSERCHROME}') {
        #userChromejs_options menuitem[restartless="true"] {
          color: blue;
        }
        #userChromejs_restartApp {
          padding-right: 4px;
        }
        #userChromejs_restartApp > .menu-iconic-left {
          margin-inline-end: 0 !important;
          padding-inline-end: 0 !important;
        }

        #userChromejs_openChromeFolder {
          padding-inline-start: 12px;
        }

        #userChromejs_restartApp > .menu-accel-container {
          display: none;
        }

        /* bug 1828413: checkbox is only rendering on mouseover/mouseout */
        menuitem[type="checkbox"][checked="true"] .menu-iconic-icon {
          appearance: checkbox !important;
        }

        @media (-moz-platform: windows) {
          #userChromejs_openChromeFolder {
            padding-block: 0.5em;
          }
          #userChromejs_restartApp {
            padding: 0 8px !important;
          }
          #userChromejs_restartApp > .menu-iconic-left {
            padding-top: 0;
          }
        }

        @media (-moz-platform: linux) {
          #userChromejs_restartApp {
            padding-right: 4px !important;
          }
        }
      }
    `),
      ),
      _uc.sss.USER_SHEET,
    );
  },

  /**
   * Initializes the manager UI and listeners.
   * Should be called once at startup by fx-autoconfig.
   */
  init: function () {
    this.setStyle();
    this.showToolButton = xPref.get(this.PREF_TOOLSBUTTON);
    if (this.showToolButton === undefined) {
      this.showToolButton = xPref.set(this.PREF_TOOLSBUTTON, false, true);
    }

    // Listen for UI toggle preference changes
    xPref.addListener(this.PREF_TOOLSBUTTON, function () {
      UC.rebuild.toggleUI(true);
    });

    // Listen for global enable/disable changes
    xPref.addListener(_uc.PREF_ENABLED, function (value) {
      Object.values(_uc.scripts).forEach((script) => {
        if (script.filename == _uc.ALWAYSEXECUTE) return;
        if (value && script.isEnabled && !_uc.everLoaded.includes(script.id)) {
          UC.rebuild.install(script);
        } else if (!value && script.isRunning && !!script.shutdown) {
          UC.rebuild.shutdown(script);
        }
      });
    });

    // Add toolbar button or menu item depending on platform
    if (AppConstants.MOZ_APP_NAME !== "thunderbird") {
      const { CustomizableUI } = window;
      CustomizableUI.createWidget({
        id: "userChromebtnMenu",
        type: "custom",
        defaultArea: CustomizableUI.AREA_NAVBAR,
        onBuild: (doc) => {
          this.createPanel(doc);
          return this.createButton(doc);
        },
      });
    } else {
      this.createPanel(window.document);
    }
  },

  /**
   * Creates the toolbar button and menu for the manager.
   */
  createButton(aDocument) {
    let toolbaritem = UC.rebuild.elBuilder(aDocument, "toolbarbutton", {
      id: "userChromebtnMenu",
      label: "userChromeJS",
      tooltiptext: "userChromeJS Manager",
      type: "menu",
      class: "toolbarbutton-1 chromeclass-toolbar-additional",
      style:
        "list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABeSURBVDhPY6AKSCms+x+SkPMfREOFwACXOAYYNQBVITrGJQ7CUO0IA0jFUO0QA3BhkEJs4iAM1Y4bgBTBDIAKkQYGlwHYMFQZbgBSBDIAF4Yqww3QbUTHUGWUAAYGAEyi7ERKirMnAAAAAElFTkSuQmCC)",
    });

    let mp = UC.rebuild.elBuilder(aDocument, "menupopup", {
      id: "userChromejs_options",
      onpopupshowing: "UC.rebuild.onpopup(event);",
      oncontextmenu: "event.preventDefault();",
    });
    toolbaritem.appendChild(mp);

    let mg = mp.appendChild(aDocument.createXULElement("menugroup"));
    mg.setAttribute("id", "uc-menugroup");

    // Open chrome directory menu item
    let mi1 = UC.rebuild.elBuilder(aDocument, "menuitem", {
      id: "userChromejs_openChromeFolder",
      label: "Open chrome directory",
      class: "menuitem-iconic",
      flex: "1",
      style:
        "list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABe0lEQVQ4jc3N2ytDARwH8J83/wRKefU3zFBCSnlQSnkQpSiFFLk8OMQmxLBZLos2I7ckM3PmMmEredF23Ma2GrPjkuFsvh7mstTqnDff+jx+v1+ifxEZ43zPYFyIld3FHWYxzlRRA5mdXFi3c4vpvbuo3TvU6z2CnHEKf4djRd9bLYnyDldkYtuPqZ1b0TIYF2StlkTK6eaQ080ht+eLgkPeH/nflGc/8hRRVNB7BuVaAGPWILRsDCsfl4bl0bMaQGHfOaho4AL9pns0GPyo04vTYPCjz3SP4sELUInqEkObPNoXA5IMmoMoHbkClWncUG8/QLnOS6K2PqJc6wZVjl9jyvYMtfVJEp3tGVWTN6Bq3Q2M9hBmDl4kMTpCqJ32gOr1XmHp+BUrJ2+SLB2/onHWK1DLvG95lOU/Nk4FbLnCcbHcL/OpgFGWj7Qt+AxUo7an12qOHM1Gb6R5zgcxmozecLVq31YxvJ9GRJRARElElExEKSIlf3USPgHT/mSv7iPTOwAAAABJRU5ErkJggg==)",
      oncommand: "Services.dirsvc.get('UChrm', Ci.nsIFile).launch();",
    });
    mg.appendChild(mi1);

    // Restart browser menu item
    let tb = UC.rebuild.elBuilder(aDocument, "menuitem", {
      id: "userChromejs_restartApp",
      class: "menuitem-iconic",
      tooltiptext: "Restart " + _uc.BROWSERNAME,
      style:
        "list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB20lEQVQ4jY2Tv2sUURDHZ/bX7eW0ChJBRFKIRRCRIEHuzVvfrYmkSiFXSSoLERERy5B/wcIuqG9mN5VecUWwCqkOEQsLKysLsQgSxEJEgsVYeJfsHXuY4tvN9zMzzHxBVXFS8Gy1kRaZi8U+iCV7HIq73Xqez9XWThoDsRvg6QDY6Ji8+RMK9dLSztcCoMhnkc27YxPth0I7oVAPhT5WYD9ScfkYALYWYxQa/OvU/h5ztg5bi3G1U2vbXUFPb4fT/EzELRwBYraPRvSE7eW6XVUV4en1JjLtARtFoYGqInRfd0Nk8wXYaCzZ/WnmkZrengc2v4GNNr1bglPiFoaj/5orV1r/A6gqhkI9YKMB0yY0OF9GsV/jIts9iVlVMeJscwhgOKmpqoDpGNDg5YuB0HYg9lUotINCuxFn/bN+9czUFZj6wEYDsRsQle7W+NPQ/uhEdUpLOw/cPgQ2OlPcvAoJZ90qICnc2tQzlist9GYAbDRk2lNVhFDs3YmXPUjkxp3JR2qWbgk9fRj9S+Olu6SqCJHYJ+DN5xnOryHT+wrsG7J9g0x9ZPup2iAS1z6aKi076+mLzoVRmKJpYeL2YSC2aBadc1PTOB7n3AXe3guYHiberZ0u8tm62r99Gyd0lo7sIAAAAABJRU5ErkJggg==)",
      oncommand: "UC.rebuild.restart();",
    });
    mg.appendChild(tb);

    // Settings menu
    let mn = UC.rebuild.elBuilder(aDocument, "menu", {
      id: "uc-manageMenu",
      label: "Settings",
      class: "menuitem-iconic",
      style:
        "list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADJUlEQVQ4ja1TS0wTQRgean0/ovFgTDxpjDc9Gg8mvSrnKhFSC8VpCuyyu22Xbdm2s7Rdt48t7kIhEJEIYiKKphZK0CoRLVYlHiAEFYMng4+bF6nUjgfbuiocTPwuM5P83/d/8z8AWAMIIX3xWvHHCYxG44a1OOuCIIhd2rfZbN7yTwIURe0+D8lAbSO3aLI21xgMBn2dzXbQZLM/MNkcEwRNnyw6rFhTAEK4ESGkc/L8IacgY1Hpw1xbbLWBFT5QrRe/+GM92Bfpxg4Xkotf3LSuGAAA1DcypC/cnWuL9a5yQQXzUifmApewR4pjUenLESzKQAi3rUmmaXqrpYF0WBqYDrtXynnDceyR1JW7E5Opqcwz9Ul2pr+zb+gdF2jHnlAnvkC6piw2WmikHCeKEj+dmWDTuSZXEPsiXdgb6Sr4o/HlV4uLZ5LJZDnz0tLSkeE7YyMt/nbcFuvBrqCCqyGdhhBuLAtF2jvE1osd+UCsZ8Xhi3yfnMqYNYZ1pcB0Or1X6bm64BLVvCcczwflrrcsy+4sBVaMjo7u6R248ZDiJaz0Ds4PDAxs1woAAIDBYNADAMBIIsU6BRm7RWUlm31x+rduAQCAEFICDkEu+MTYuMZJGUajcQNCQBeU2ivZNrng8ssfNYNb7FQ9caCusSUrRLsLFtL9ppogdhUnuCxWSniursHnFtWCwyvlqmttNUA7U1bSeYnxSNgXin91CtFCdT1hLwkghPSltYAQ7rcy/LI3HM+7RaUAKfdnjuP2lB0NjyQq3X45R7eK2ImiuIkV8mdNVsZspnaXYqpq4XGzjXneIsjY7g1hkvPjvsHhm9o6AlVVN2ezL6oyz2fsATn+yemLYModxDWQfm2luAmTjXlsaXbnWvwxTPNS4XZy/Nrj6em6ZDJ57Lc50mJyKlNDugLfPJKaY4UovsB4MeEKYE+oI0/z4mr3laFUKpXa/BfxV3uRHgCg43n/YZITvtfTPEYh9f1Y+tGDy4M3X1oZTx4yXsyjYFhT/PV3DSG0Y3Z+oen6rcT92fn5Uwgh3dzc3L7xe5P9T57OXE4kEkfXJf8P/ABlOH7kn81/zwAAAABJRU5ErkJggg==)",
    });
    mp.appendChild(mn);

    let mp2 = mn.appendChild(aDocument.createXULElement("menupopup"));

    // Switch display mode menu item
    let mi2 = UC.rebuild.elBuilder(aDocument, "menuitem", {
      id: "showToolsMenu",
      label: "Switch display mode",
      class: "menuitem-iconic",
      style:
        "list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADdklEQVQ4jXWTbUwUdADG/7zccZ6lQ/pgcDJEEEGBO8/hmLQY9mKOmFvyEi93IIISSSMGxx0Hw0QKJJCOI3CxGM0IhEASjDsQ1lgdRuqcE4N0RznTjPFSDGJwvz64nOX6bc+35+XTI8R/KRXOG6LFwcAEj+7d2b4PI3L8ltQZiuuKaGmp5yER8JT/Sco/0e+JylP1xNfuXTrWEU/+BQ26Pi3vnk8ioyWG10pU9lj9S4VjY2Pyp4cbcxP36PyW83tTKBnMwDhwiCJrGkXWVIzWNIoH0ikezCTxTBRROcG9k5O2dY/Dp5qKwyN0W5aMgxkYLKkYrakYB7XorAnorPEUWOLJ749D159E6dBRIj7cRIhW8fmj5dJI16jc4L78vhQK+zUYrCkUDrxJtS0P6+12hu3dDNu7sNw+R8vVahK+2E1onQyvHOE4YIyIFOv3i7gEU+RyoUVD2dBbXL9v46tbLRiHkum8cYbv7SNcsdsA6L/RTVCVMzvNMkJq5GyMF50iMNnDktV2gNPfGrj3xxT/MDL1NcXDSRgGEzh+6TArLNM+2sy2SkFYgxxVnZwtWdK7Iizbe67hu3Lml2bAAQ6H43HJ+IOrvDeiRdunYmFllnOXWwioEuxqlKGskxGgk/4lIt7xX6keLsJ06QSnLAbG719jaXmJin4d+t5UDraGENOhYGFlnq4fWlHXyon6dCORTV5s1UkdQpn+/ERa66tkdu0jpTOcb36+yIO5GcJN7rzS5kHPZAe/LPzK7Moq9/6cY2LWzs2Htzjc+gbe2U4zwnO/c2XQcRlq81p2mASt45/x4+/TKKsk7GoW7DuroGein99WYRqYnJsn5eM4fIwueGucrojgrPW+vkekUyEmN7bXCppvtnFnEYoHijhxWU/yhRcIa1xLzWg9vT9d48X31XiXCALL3AjUuhcIIYSI0ccU+BgEwSZX3u49Qr2tjXrblzSMnueD4QZebtqGss4FZYUH/icFoSY5Co3T3cT6LHchhBCx5thnFAnSi0FlMnbUSgg46UxguQtBFS4EV7qhrn0WtXkNyjo3Qj+Ss/moZHF7uvvr//qC37EN6xSxLmf98iSOkBoZKvMadtY/ksosR2mSE1Qmw0cjsXunuUT/7yO9tK57vZMl7ZuzpHf8C6SLW/XSVf9cybRPquvopmRng2emeO5J/98W5fyDGAVpggAAAABJRU5ErkJggg==)",
      oncommand: "UC.rebuild.toggleUI();",
    });
    mp2.appendChild(mi2);

    // Separator for script entries
    let sep = mp.appendChild(aDocument.createXULElement("menuseparator"));
    sep.setAttribute("id", "uc-menuseparator");

    // Tools menu entry for the manager
    let mi = UC.rebuild.elBuilder(aDocument, "menu", {
      id: "userChromejs_Tools_Menu",
      label: "userChromeJS Manager",
      tooltiptext: "UC Script Manager",
      class: "menu-iconic",
      image:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABeSURBVDhPY6AKSCms+x+SkPMfREOFwACXOAYYNQBVITrGJQ7CUO0IA0jFUO0QA3BhkEJs4iAM1Y4bgBTBDIAKkQYGlwHYMFQZbgBSBDIAF4Yqww3QbUTHUGWUAAYGAEyi7ERKirMnAAAAAElFTkSuQmCC",
    });
    aDocument
      .getElementById(
        AppConstants.MOZ_APP_NAME !== "thunderbird"
          ? "devToolsSeparator"
          : "prefSep",
      )
      .insertAdjacentElement("afterend", mi); //taskPopup

    // Insert custom menus if any
    let menupopup = aDocument.getElementById("userChromejs_options");
    UC.rebuild.menues.forEach((menu) => {
      menupopup.insertBefore(
        menu,
        aDocument.getElementById("uc-menuseparator"),
      );
    });

    // Ensure UI state is correct after startup
    aDocument.defaultView.setTimeout(
      () => UC.rebuild.toggleUI(false, true),
      1000,
    );

    return toolbaritem;
  },

  /**
   * Creates the hamburger menu panel for the manager.
   */
  createPanel(aDocument) {
    const viewCache =
      aDocument.getElementById("appMenu-viewCache")?.content ||
      aDocument.getElementById("appMenu-multiView");

    if (viewCache) {
      const userChromeJsPanel = aDocument.createXULElement("panelview");
      userChromeJsPanel.id = "appMenu-userChromeJsView";
      userChromeJsPanel.className = "PanelUI-subView";
      userChromeJsPanel.addEventListener("ViewShowing", UC.rebuild.onHamPopup);
      const subviewBody = aDocument.createXULElement("vbox");
      subviewBody.className = "panel-subview-body";
      subviewBody.appendChild(
        UC.rebuild.createMenuItem(
          aDocument,
          "openChrome",
          "url(chrome://browser/skin/folder.svg)",
          "Open chrome directory",
          "Services.dirsvc.get('UChrm', Ci.nsIFile).launch();",
        ),
      );
      subviewBody.appendChild(
        UC.rebuild.createMenuItem(
          aDocument,
          "restart",
          "url(chrome://browser/skin/reload.svg)",
          "Restart " + _uc.BROWSERNAME,
          "UC.rebuild.restart();",
        ),
      );
      subviewBody.appendChild(aDocument.createXULElement("toolbarseparator"));
      const enabledMenuItem = UC.rebuild.createMenuItem(
        aDocument,
        "enabled",
        null,
        "Enabled",
        "xPref.set(_uc.PREF_ENABLED, !!this.checked)",
      );
      enabledMenuItem.type = "checkbox";
      subviewBody.appendChild(enabledMenuItem);
      const scriptsSeparator = aDocument.createXULElement("toolbarseparator");
      scriptsSeparator.id = "appMenu-userChromeJS-scriptsSeparator";
      subviewBody.appendChild(scriptsSeparator);
      userChromeJsPanel.appendChild(subviewBody);
      viewCache.appendChild(userChromeJsPanel);

      // Add entry to open the panel from the hamburger menu
      const scriptsButton = aDocument.createXULElement("toolbarbutton");
      scriptsButton.id = "appMenu-userChromeJS-button";
      scriptsButton.className =
        "subviewbutton subviewbutton-iconic subviewbutton-nav";
      scriptsButton.label = "User Scripts";
      scriptsButton.style.listStyleImage =
        "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABeSURBVDhPY6AKSCms+x+SkPMfREOFwACXOAYYNQBVITrGJQ7CUO0IA0jFUO0QA3BhkEJs4iAM1Y4bgBTBDIAKkQYGlwHYMFQZbgBSBDIAF4Yqww3QbUTHUGWUAAYGAEyi7ERKirMnAAAAAElFTkSuQmCC)";
      scriptsButton.setAttribute("closemenu", "none");
      scriptsButton.setAttribute(
        "oncommand",
        "PanelUI.showSubView('appMenu-userChromeJsView', this)",
      );

      const addonsButton =
        aDocument.getElementById("appMenu-extensions-themes-button") ??
        aDocument.getElementById("appmenu_addons") ??
        viewCache.querySelector("#appMenu-extensions-themes-button");
      addonsButton.parentElement.insertBefore(scriptsButton, addonsButton);
    }
  },
};

// Initialize the manager at startup (called by fx-autoconfig)
UC.rebuild.init();
