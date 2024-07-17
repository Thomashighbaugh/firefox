/* ------------------------------------------------- */
/* ------------------------------------------------- */
/* ------------------------------------------------- */
//  enable stylesheets
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);
// enable proton
user_pref("browser.proton.enabled", true);
user_pref("browser.proton.places-tooltip.enabled", true);
// required for author sheets
user_pref("layout.css.moz-document.content.enabled", true);
user_pref("layout.css.xul-box-display-values.content.enabled", true);
user_pref("layout.css.xul-display-values.content.enabled", true);
// required for icons with data URLs
user_pref("svg.context-properties.content.enabled", true);
// required for acrylic gaussian blur
user_pref("layout.css.backdrop-filter.enabled", true);
// prevent bugs that would otherwise be caused by the custom scrollbars in the user-agent sheet
user_pref("layout.css.cached-scrollbar-styles.enabled", false);
// 𝗻𝗼 𝗯𝗹𝗶𝗻𝗱𝗶𝗻𝗴, 𝗻𝗼 𝘁𝗲𝘅𝘁 𝗜 𝗰𝗮𝗻'𝘁 𝗿𝗲𝗮𝗱
user_pref("browser.startup.blankWindow", false);
user_pref("browser.startup.preXulSkeletonUI", false);
user_pref("ui.systemUsesDarkTheme", 1);
// svg optimizations
user_pref("gfx.webrender.svg-images", true);
// allow stylesheets to modify trees in system pages viewed in regular tabs
user_pref("layout.css.xul-tree-pseudos.content.enabled", true);
// allow the color-mix() CSS function
user_pref("layout.css.color-mix.enabled", true);
// other CSS features
user_pref("layout.css.moz-outline-radius.enabled", true);
// avoid native styling
user_pref("browser.display.windows.non_native_menus", 1);
user_pref("widget.disable-native-theme-for-content", true);
user_pref("widget.non-native-theme.win.scrollbar.use-system-size", false);
// keep "all tabs" menu available at all times, useful for all tabs menu expansion pack
user_pref("browser.tabs.tabmanager.enabled", true);

// Enable popups from plugins, useful for dictionary add-on I
// use and other reasons, addons should change this themselves
// I would think but don't/can't
user_pref("privacy.popups.disable_from_plugins", 0);

// Enable Global Privacy Control functionality thus enriching others being creepy less
user_pref("privacy.globalprivacycontrol.enabled", true);
user_pref("privacy.globalprivacycontrol.functionality.enabled", true);
// install addon from file > find the .zip file
user_pref("xpinstall.signatures.required", false);
user_pref("extensions.autoDisableScopes", 0);
//// functionality oriented prefs
user_pref("browser.shell.checkDefaultBrowser", false);
user_pref("browser.startup.homepage_override.mstone", "ignore");
user_pref("browser.display.use_system_colors", false);
user_pref("browser.privatebrowsing.enable-new-indicator", false);

// font settings
user_pref("layout.css.font-visibility.private", 3);
user_pref("layout.css.font-visibility.resistFingerprinting", 3);
// disable telemetry since we're modding firefox
user_pref("toolkit.telemetry.enabled", false);
user_pref("browser.discovery.enabled", false);
user_pref("app.shield.optoutstudies.enabled", false);
user_pref("datareporting.healthreport.documentServerURI", "http://%(server)s/healthreport/");
user_pref("datareporting.healthreport.uploadEnabled", false);
user_pref("datareporting.policy.dataSubmissionPolicyBypassNotification", true);
user_pref("browser.crashReports.unsubmittedCheck.autoSubmit2", false);
//// make the theme work properly
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);
user_pref("browser.proton.places-tooltip.enabled", true);
user_pref("layout.css.moz-document.content.enabled", true);


//       ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
//       ┃                                                              ┃
//       ┃                       Ultima Settings                        ┃
//       ┃                                                              ┃
//       ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

//     ─────────────────────────────── tabs ───────────────────────────────

user_pref("ultima.tabs.size.xs", false);
user_pref("ultima.tabs.size.s", false);
user_pref("ultima.tabs.size.l", true);
user_pref("ultima.tabs.autohide", true);
user_pref("ultima.tabs.closetabsbutton", true);
user_pref("ultima.tabs.vertical.hide", false);
user_pref("ultima.tabs.vertical.onlyprivate", false);

//     ───────────────────────────── sidebar ───────────────────────────
user_pref("ultima.sidebar.autohide", true);
user_pref("ultima.sidebery.autohide", false);

//     ────────────────────── extension theme on-off ──────────────────────

user_pref("ultima.theme.extensions", true);

//     ───────────────────────────── url bar ───────────────────────────

user_pref("ultima.urlbar.suggestions", true);
user_pref("ultima.urlbar.centered", true);
user_pref("ultima.urlbar.hidebuttons", false);

//     ───────────────────────── alternate styles ─────────────────────────

user_pref("ultima.xstyle.containertabs.i", false);
user_pref("ultima.xstyle.containertabs.ii", false);
user_pref("ultima.xstyle.containertabs.iii", true);
user_pref("ultima.xstyle.squared", false);
user_pref(
  "ultima.xstyle.lwtheme",
  false
); /* Experimental. To counter addon themes that use unusual color variables. */

//     ─────────────────────────── OS specific ─────────────────────────
user_pref("ultima.OS.mac", false);
user_pref("ultima.OS.linux", true);
user_pref("ultima.OS.gnome", true);
user_pref("ultima.OS.gnomedecorations", true); /*Experimental*/
user_pref("ultima.OS.kde", false);
user_pref("ultima.OS.kdedecorations", false);

//     ────────────────────────────── other ────────────────────────────
user_pref("browser.aboutConfig.showWarning", false);
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);
user_pref("devtools.debugger.remote-enabled", true);
user_pref("devtools.chrome.enabled", true);
user_pref("devtools.debugger.prompt-connection", false);
user_pref("svg.context-properties.content.enabled", true);
user_pref("toolkit.tabbox.switchByScrolling", false);
