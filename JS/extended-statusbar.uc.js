// ==UserScript==
// @name           Extended Statusbar
// @description    A customizable Statusbar with link location preview
// @include        main
// @author         py (modified by)
// @version        2.1.2 (modified for userchrome.js)
// @homepageURL    https://addons.mozilla.org/en-US/firefox/addon/extended-statusbar/
// ==/UserScript==

var appversion = parseInt(Services.appinfo.version);

var compact_buttons = false; // reduced toolbar height and smaller buttons

var AddAddonbar = {
  init: function () {
    if (location != "chrome://browser/content/browser.xhtml") return;

    /* blank tab workaround */
    try {
      if (gBrowser.selectedBrowser.getAttribute("blank"))
        gBrowser.selectedBrowser.removeAttribute("blank");
    } catch (e) {}

    try {
      Services.prefs
        .getDefaultBranch("browser.addonbar.")
        .setBoolPref("enabled", true);
    } catch (e) {}

    var addonbar_label = "Add-on Bar";
    var compact_buttons_code = "";

    if (compact_buttons)
      compact_buttons_code = `
		#addonbar toolbarbutton .toolbarbutton-icon {
		  padding: 0 !important;
		  width: 16px !important;
		  height: 16px !important;
		}
		#addonbar .toolbarbutton-badge-stack {
		  padding: 0 !important;
		  margin: 0 !important;
		  width: 16px !important;
		  min-width: 16px !important;
		  height: 16px !important;
		  min-height: 16px !important;
		}
		#addonbar toolbarbutton .toolbarbutton-badge {
		  margin-top: 0px !important;
		  font-size: 5pt !important;
		  min-width: unset !important;
		  min-height: unset !important;
		  margin-inline-start: 0px !important;
		  margin-inline-end: 0px !important;
		}
		#addonbar .toolbaritem-combined-buttons {
		  margin-inline: 0px !important;
		}
		#addonbar toolbarbutton {
		  padding: 0 !important;
		}
	  `;

    // style sheet
    Components.classes["@mozilla.org/content/style-sheet-service;1"]
      .getService(Components.interfaces.nsIStyleSheetService)
      .loadAndRegisterSheet(
        Services.io.newURI(
          "data:text/css;charset=utf-8," +
            encodeURIComponent(
              `
		  #addonbar toolbarpaletteitem[place=toolbar][id^=wrapper-customizableui-special-spring],
		  #addonbar toolbarspring {
			-moz-box-flex: 1 !important;
			min-width: unset !important;
			width: unset !important;
			max-width: unset !important;
		  }
		  #main-window[customizing] #addonbar {
			outline: 1px dashed !important;
			outline-offset: -2px !important;
		  }
		  #addonbar {
			border-top: 1px solid var(--sidebar-border-color,rgba(0,0,0,0.1)) !important;
              border-radius: 6px 6px 0 0;
			background-color: var(--toolbar-bgcolor) !important;
			background-image: var(--toolbar-bgimage) !important;
			-moz-window-dragging: no-drag !important;
		  }
		  :root[lwtheme] #addonbar {
   			background-color: var(--toolbar-bgcolor) !important;
        	background-image: var(--toolbar-bgimage) !important;

		  }
		  :root[lwtheme][lwtheme-image='true'] #addonbar {
			background: var(--lwt-header-image) !important;
			background-position: 0vw 50vh !important;
		  }
		  /* autohide add-on bar in fullscreen mode */
		  #main-window[sizemode='fullscreen']:not([inDOMFullscreen='true']) #addonbar {
			visibility: visible !important;
			display: block !important;
			height: 1px !important;
			max-height: 1px !important;
			background-color: var(--toolbar-bgcolor) !important;
        	background-image: var(--toolbar-bgimage) !important;

          }
		  #main-window[sizemode='fullscreen']:not([inDOMFullscreen='true']) #addonbar:hover {
			min-height: 26px !important;
			height: 26px !important;
			max-height: 26px !important;
          	bbbackground-color: var(--toolbar-bgcolor) !important;
        	background-image: var(--toolbar-bgimage) !important;

		  }
		  #unified-extensions-button[hidden]{
			visibility: visible !important;
			display: flex !important;
		  }
		  ` +
                compact_buttons_code +
                `
	  `,
            ),
          null,
          null,
        ),
        Components.classes[
          "@mozilla.org/content/style-sheet-service;1"
        ].getService(Components.interfaces.nsIStyleSheetService).AGENT_SHEET,
      );

    // toolbar
    try {
      if (document.getElementById("addonbar") == null) {
        var tb_addonbar = document.createXULElement("toolbar");
        tb_addonbar.setAttribute("id", "addonbar");
        tb_addonbar.setAttribute("collapsed", "false");
        tb_addonbar.setAttribute("toolbarname", addonbar_label);
        tb_addonbar.setAttribute("defaultset", "spring,spring");
        tb_addonbar.setAttribute("customizable", "true");
        tb_addonbar.setAttribute("mode", "icons");
        tb_addonbar.setAttribute("iconsize", "small");
        tb_addonbar.setAttribute("context", "toolbar-context-menu");
        tb_addonbar.setAttribute("lockiconsize", "true");
        tb_addonbar.setAttribute(
          "class",
          "toolbar-primary chromeclass-toolbar browser-toolbar customization-target",
        );

        document.getElementById("browser").parentNode.appendChild(tb_addonbar);
        tb_addonbar.insertBefore(
          document.querySelector("#statuspanel"),
          tb_addonbar.firstChild,
        );

        CustomizableUI.registerArea("addonbar", { legacy: true });

        setTimeout(function () {
          CustomizableUI.registerArea("addonbar", { legacy: true });
        }, 2000);

        CustomizableUI.registerToolbarNode(tb_addonbar);

        // 'Ctr + /' on Windows/Linux or 'Cmd + /' on macOS to toggle add-on bar
        var key = document.createXULElement("key");
        key.id = "key_toggleAddonBar";
        key.setAttribute("key", "/");
        key.setAttribute("modifiers", "accel");
        /*key.setAttribute('oncommand',`
			var newAddonBar = document.getElementById('addonbar');
			setToolbarVisibility(newAddonBar, newAddonBar.collapsed);
			Services.prefs.getBranch('browser.addonbar.').setBoolPref('enabled',!newAddonBar.collapsed);
		  `);*/
        key.addEventListener("command", () => {
          var newAddonBar = document.getElementById("addonbar");
          setToolbarVisibility(newAddonBar, newAddonBar.collapsed);
          Services.prefs
            .getBranch("browser.addonbar.")
            .setBoolPref("enabled", !newAddonBar.collapsed);
        });
        document.getElementById("mainKeyset").appendChild(key);

        try {
          setToolbarVisibility(
            document.getElementById("addonbar"),
            Services.prefs
              .getBranch("browser.addonbar.")
              .getBoolPref("enabled"),
          );
        } catch (e) {}
      }
    } catch (e) {}
  },
};

/* initialization delay workaround */
document.addEventListener("DOMContentLoaded", AddAddonbar.init(), false);
/* Use the below code instead of the one above this line, if issues occur */
setTimeout(function () {
  AddAddonbar.init();
}, 2000);

/* fix for downloads button on add-on bar - thanks to dimdamin */
/* https://github.com/Aris-t2/CustomJSforFx/issues/125#issuecomment-2506613776 */
(async (url) =>
  !location.href.startsWith(url) ||
  (await delayedStartupPromise) ||
  (async (scrNT, nTjs) => {
    if (scrNT.length >= 1) {
      nTjs.uri = "data:application/x-javascript;charset=UTF-8,";
      nTjs.res = await fetch(scrNT[0].src);
      nTjs.src = (await nTjs.res.text())
        .replace(/navigator-toolbox/, "addonbar")
        .replace(/widget-overflow/, "addonbar");
      (
        await ChromeUtils.compileScript(nTjs.uri + encodeURIComponent(nTjs.src))
      ).executeInGlobal(this);
    }
  })(
    document
      .getElementById("navigator-toolbox")
      .querySelectorAll(":scope > script"),
    {},
  ))("chrome://browser/content/browser.x");
