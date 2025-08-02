// ==UserScript==
// @name           Extended Statusbar
// @description    A customizable Statusbar with link location preview
// @include        main
// @author         Thomas Leon Highbaugh
// @author         ARIS
// @author         py
// @version        2.1.2 (modified for userchrome.js)
// @homepageURL    https://addons.mozilla.org/en-US/firefox/addon/extended-statusbar/
// ==/UserScript==

/**
 * Extended Statusbar for Firefox (userChromeJS version)
 *
 * This script adds a customizable statusbar (addonbar) to Firefox, with link preview and support for toolbar buttons.
 * Optimized for use with fx-autoconfig and userChromeJS.
 *
 * Features:
 * - Adds a persistent addonbar at the bottom of the browser window.
 * - Supports compact mode for smaller toolbar buttons.
 * - Keyboard shortcut (Ctrl+/ or Cmd+/) to toggle the addonbar.
 * - Remembers visibility state across sessions.
 * - Fixes for downloads button and compatibility with modern Firefox.
 *
 * Usage:
 * - Place this script in your userChrome.js or userChromeJS scripts folder.
 * - Requires fx-autoconfig or userChromeJS loader.
 *
 * Tested with Firefox 91+ (may require adjustments for future versions).
 */

var appversion = parseInt(Services.appinfo.version, 10);

// Set to true for compact toolbar buttons
var compact_buttons = false;

var AddAddonbar = {
  /**
   * Initializes the addonbar and injects required CSS and UI elements.
   */
  init: function () {
    if (location != "chrome://browser/content/browser.xhtml") return;

    // Workaround for blank tab attribute
    try {
      if (gBrowser.selectedBrowser.getAttribute("blank"))
        gBrowser.selectedBrowser.removeAttribute("blank");
    } catch (e) {}

    // Ensure addonbar is enabled in preferences
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

    // Inject CSS for addonbar styling
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
            border-radius: 6px 6px 0 0;
			background-color: #0c0c0c !important;
			background-image: var(--toolbar-bgimage) !important;
			-moz-window-dragging: no-drag !important;
		  }
		  :root[lwtheme] #addonbar {
   			background-color: #0c0c0c !important;
        	background-image: var(--toolbar-bgimage) !important;
		  }
		  :root[lwtheme][lwtheme-image='true'] #addonbar {
			background-image: var(--lwt-header-image) !important;
            background-color: #0c0c0c !important;
			background-position: 0vw 50vh !important;
		  }
		  /* autohide add-on bar in fullscreen mode */
		  #main-window[sizemode='fullscreen']:not([inDOMFullscreen='true']) #addonbar {
			visibility: visible !important;
			display: block !important;
			height: 1px !important;
			max-height: 1px !important;
            background-color: #0c0c0c !important;
        	background-image: var(--toolbar-bgimage) !important;
          }
		  #main-window[sizemode='fullscreen']:not([inDOMFullscreen='true']) #addonbar:hover {
			min-height: 26px !important;
			height: 26px !important;
			max-height: 26px !important;
            background-color: #0c0c0c !important;
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

    // Create and insert the addonbar toolbar if it doesn't exist
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

        // Register the area for CustomizableUI
        CustomizableUI.registerArea("addonbar", { legacy: true });

        // Register again after a delay (workaround for initialization timing)
        setTimeout(function () {
          CustomizableUI.registerArea("addonbar", { legacy: true });
        }, 2000);

        CustomizableUI.registerToolbarNode(tb_addonbar);

        // Keyboard shortcut: Ctrl+/ (Win/Linux) or Cmd+/ (macOS) to toggle addonbar
        var key = document.createXULElement("key");
        key.id = "key_toggleAddonBar";
        key.setAttribute("key", "/");
        key.setAttribute("modifiers", "accel");
        key.addEventListener("command", () => {
          var newAddonBar = document.getElementById("addonbar");
          setToolbarVisibility(newAddonBar, newAddonBar.collapsed);
          Services.prefs
            .getBranch("browser.addonbar.")
            .setBoolPref("enabled", !newAddonBar.collapsed);
        });
        document.getElementById("mainKeyset").appendChild(key);

        // Set toolbar visibility based on preference
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

// Initialization: run after DOMContentLoaded and after a delay for reliability
document.addEventListener("DOMContentLoaded", () => AddAddonbar.init(), false);
setTimeout(function () {
  AddAddonbar.init();
}, 2000);

/**
 * Fix for downloads button on addonbar.
 * Ensures compatibility with scripts expecting 'navigator-toolbox' by patching them to use 'addonbar'.
 * See: https://github.com/Aris-t2/CustomJSforFx/issues/125#issuecomment-2506613776
 */
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
