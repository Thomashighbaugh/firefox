
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
