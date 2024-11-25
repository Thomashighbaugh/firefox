Components.utils.importESModule("resource:///modules/CustomizableUI.sys.mjs");
var { Services } = Components.utils.import(
  "resource://gre/modules/Services.jsm",
  {},
);
var appversion = parseInt(Services.appinfo.version);

var compact_buttons = false; // reduced toolbar height and smaller buttons

var AddStatusbar = {
  init: function () {
    if (
      appversion >= 76 &&
      location != "chrome://browser/content/browser.xhtml"
    )
      return;

    /* blank tab workaround */
    try {
      if (gBrowser.selectedBrowser.getAttribute("blank"))
        gBrowser.selectedBrowser.removeAttribute("blank");
    } catch (e) {}

    try {
      Services.prefs
        .getDefaultBranch("browser.statusbar.")
        .setBoolPref("enabled", true);
    } catch (e) {}

    var statusbar_label = "Statusbar";
    var compact_buttons_code = "";

    if (compact_buttons)
      compact_buttons_code =
        "\
		#statusbar toolbarbutton .toolbarbutton-icon { \
		  padding: 0 !important; \
		  width: 16px !important; \
		  height: 16px !important; \
		} \
		#statusbar .toolbarbutton-badge-stack { \
		  padding: 0 !important; \
		  margin: 0 !important; \
		  width: 16px !important; \
		  min-width: 16px !important; \
		  height: 16px !important; \
		  min-height: 16px !important; \
		} \
		#statusbar toolbarbutton .toolbarbutton-badge { \
		  margin-top: 0px !important; \
		  font-size:10px !important; \
		} \
	  ";

    // style sheet
    Components.classes["@mozilla.org/content/style-sheet-service;1"]
      .getService(Components.interfaces.nsIStyleSheetService)
      .loadAndRegisterSheet(
        Services.io.newURI(
          "data:text/css;charset=utf-8," +
            encodeURIComponent(
              '\
		  \
		  #statusbar toolbarpaletteitem[place=toolbar][id^=wrapper-customizableui-special-spring],\
		  #statusbar toolbarspring {\
			-moz-box-flex: 1 !important;\
			min-width: 100% !important;\
			width: unset !important;\
			max-width: unset !important;\
		  }\
		  #main-window[customizing] #statusbar { \
			outline: 1px dashed !important; \
			outline-offset: -2px !important; \
		  } \
		  #statusbar { \
			border-top: 1.5px solid var(--sidebar-border-color,rgba(0,0,0,0.3)) !important; \
			min-height: 20px !important;\
			background-color: var(--window-color); \
			background-image: var(--toolbar-bgimage); \
			-moz-window-dragging: no-drag !important; \
		  }\
		  #main-window:-moz-lwtheme #statusbar { \
			background: var(--lwt-accent-color) !important; \
		  }\
		  #main-window[lwtheme-image="true"]:-moz-lwtheme #statusbar { \
			background: var(--lwt-header-image) !important; \
			background-position: 0vw 50vh !important; \
		  }\
		  /* autohide add-on bar in fullscreen mode */ \
		  #main-window[sizemode="fullscreen"]:not([inDOMFullscreen="true"]) #statusbar {\
			visibility: visible !important; \
			display: block !important; \
			min-height: 1px !important; \
			height: 1px !important; \
			max-height: 1px !important; \
		  } \
		  #main-window[sizemode="fullscreen"]:not([inDOMFullscreen="true"]) #statusbar:hover {\
			min-height: 24px !important; \
			height: 24px !important; \
			max-height: 24px !important; \
		  } \
		  ' +
                compact_buttons_code +
                "\
	  ",
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
      if (document.getElementById("statusbar") == null) {
        var tb_statusbar = document.createXULElement("toolbar");
        if (appversion <= 62) tb_statusbar = document.createElement("toolbar");
        tb_statusbar.setAttribute("id", "statusbar");
        tb_statusbar.setAttribute("collapsed", "false");
        tb_statusbar.setAttribute("toolbarname", statusbar_label);
        tb_statusbar.setAttribute("defaultset", "spring,spring");
        tb_statusbar.setAttribute("customizable", "true");
        tb_statusbar.setAttribute("mode", "icons");
        tb_statusbar.setAttribute("iconsize", "small");
        tb_statusbar.setAttribute("context", "toolbar-context-menu");
        tb_statusbar.setAttribute("lockiconsize", "true");
        tb_statusbar.setAttribute(
          "class",
          "toolbar-primary chromeclass-toolbar browser-toolbar customization-target",
        );

        document.getElementById("browser-bottombox").appendChild(tb_statusbar);

        CustomizableUI.registerArea("statusbar", { legacy: true });

        if (appversion >= 65) {
          CustomizableUI.registerToolbarNode(tb_statusbar);
        }

        // 'Ctr + /' on Windows/Linux or 'Cmd + /' on macOS to toggle add-on bar
        var key = document.createXULElement("key");
        if (appversion < 69) key = document.createElement("key");
        key.id = "key_toggleStatusBar";
        key.setAttribute("key", "/");
        key.setAttribute("modifiers", "accel");
        key.setAttribute(
          "oncommand",
          'var newStatusbar = document.getElementById("statusbar"); setToolbarVisibility(newStatusbar, newStatusbar.collapsed);Services.prefs.getBranch("browser.statusbar.").setBoolPref("enabled",!newStatusbar.collapsed)',
        );
        document.getElementById("mainKeyset").appendChild(key);

        try {
          setToolbarVisibility(
            document.getElementById("statusbar"),
            Services.prefs
              .getBranch("browser.statusbar.")
              .getBoolPref("enabled"),
          );
        } catch (e) {}
      }
    } catch (e) {}
  },
};

/* initialization delay workaround */
document.addEventListener("DOMContentLoaded", AddStatusbar.init(), false);
/* Use the below code instead of the one above this line, if issues occur */
/*
setTimeout(function(){
  AddStatusbar.init();
},2000);
*/
