// userchrome.css usercontent.css activate
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);

// Proton Enabled
user_pref("browser.proton.enabled", true);

// Proton Tooltip
user_pref("browser.proton.places-tooltip.enabled", true);

// Fill SVG Color
user_pref("svg.context-properties.content.enabled", true);



// CSS Blur Filter
user_pref("layout.css.backdrop-filter.enabled", true);

// Restore Compact Mode
user_pref("browser.compactmode.show", true);

// about:home Search Bar
user_pref("browser.newtabpage.activity-stream.improvesearch.handoffToAwesomebar", false);


// Integrated calculator at urlbar
user_pref("browser.urlbar.suggest.calculator", true);

// Integrated unit convertor at urlbar
user_pref("browser.urlbar.unitConversion.enabled", true);

// required prefs

user_pref("layout.css.moz-document.content.enabled", true);
user_pref("layout.css.xul-box-display-values.content.enabled", true);
user_pref("layout.css.xul-display-values.content.enabled", true);


// prevent bugs that would otherwise be caused by the custom scrollbars in the user-agent sheet
user_pref("layout.css.cached-scrollbar-styles.enabled", false);

// allow stylesheets to modify trees in system pages viewed in regular tabs
user_pref("layout.css.xul-tree-pseudos.content.enabled", true);
// allow the color-mix() CSS function
user_pref("layout.css.color-mix.enabled", true);
// other CSS features

// avoid native styling
user_pref("browser.display.windows.non_native_menus", 1);

user_pref("widget.non-native-theme.win.scrollbar.use-system-size", false);
user_pref("widget.content.allow-gtk-dark-theme", true);
// keep "all tabs" menu available at all times, useful for all tabs menu expansion pack

// Background for selected <option> elements and others
user_pref("ui.selecteditem", "#2F303d");
// Text color for selected <option> elements and others
user_pref("ui.selecteditemtext", "#8b9cbe");


user_pref("browser.display.use_system_colors", false);
user_pref("browser.display.focus_ring_style", 0);
user_pref("browser.display.focus_ring_width", 0);
user_pref("browser.startup.blankWindow", false);
user_pref("browser.startup.preXulSkeletonUI", false);
user_pref("browser.tabs.tabMinWidth", 90);
user_pref("browser.urlbar.accessibility.tabToSearch.announceResults", false);
user_pref("browser.urlbar.richSuggestions.tail", false);
user_pref("browser.urlbar.searchTips", false);
user_pref("browser.urlbar.trimURLs", false);
user_pref("full-screen-api.transition-duration.enter", "0 0");
user_pref("full-screen-api.transition-duration.leave", "0 0");
user_pref("full-screen-api.warning.delay", -1);
user_pref("full-screen-api.warning.timeout", 0);
user_pref("prompts.contentPromptSubDialog", true);

user_pref("ui.prefersReducedMotion", 0);
user_pref("ui.submenuDelay", 100);
user_pref("ui.tooltipDelay", 300);
user_pref("ui.key.menuAccessKeyFocuses", false);

user_pref("reader.color_scheme", "dark");
user_pref("browser.anchor_color", "#8b9cbe");
user_pref("browser.active_color", "#b2bfd9");
user_pref("browser.visited_color", "#b2bfd9");
user_pref("ui.textHighlightBackground", "#555e70");
user_pref("ui.textHighlightForeground", "#f4f4f7");
user_pref("ui.textSelectBackground", "#f4f4f7");
user_pref("ui.textSelectAttentionBackground", "#FF00aa");
user_pref("ui.textSelectAttentionForeground", "#f4f4f7");
user_pref("ui.textSelectDisabledBackground", "#555e70");
user_pref("ui.textSelectBackgroundAttention", "#8b9cbe");
user_pref("ui.textSelectBackgroundDisabled", "#555e70");
user_pref("ui.SpellCheckerUnderline", "#8b9cbe");

user_pref("ui.IMERawInputBackground", "#1b1d24");
user_pref("ui.IMESelectedRawTextBackground", "#1b1d24");

user_pref("gfx.font_rendering.cleartype_params.cleartype_level", 100);
user_pref("gfx.font_rendering.cleartype_params.force_gdi_classic_for_families", "");
user_pref("gfx.font_rendering.cleartype_params.force_gdi_classic_max_size", 6);
user_pref("gfx.font_rendering.cleartype_params.pixel_structure", 1);
user_pref("gfx.font_rendering.cleartype_params.rendering_mode", 5);
user_pref("gfx.font_rendering.directwrite.use_gdi_table_loading", false);


user_pref("userChrome.tabs.new-loading-spinner-animation", true);
user_pref("userChrome.tabs.pinned-tabs.close-buttons.disabled", true);
user_pref("userChrome.urlbar-results.hide-help-button", true);

// these are more subjective prefs, but they're important ones
// display the all tabs menu in reverse order (newer tabs on top, like history)
user_pref("userChrome.tabs.all-tabs-menu.reverse-order", true);


// replace UI font with SF Pro, the system font for macOS.
// recommended for all operating systems, but not required.
// must have the fonts installed. check the repo's readme for more details.
user_pref("userChrome.css.mac-ui-fonts", true);

// custom wikipedia dark mode theme
user_pref("userChrome.css.wikipedia.dark-theme-enabled", true);

// Enable popups from plugins, useful for dictionary add-on I
// use and other reasons, addons should change this themselves
// I would think but don't/can't
user_pref("privacy.popups.disable_from_plugins", 0);



// Don't reveal your internal IP when WebRTC is enabled
user_pref("media.peerconnection.ice.no_host", true);




// prevent names of plugins from leaking


// hardware acceleration

user_pref("layers.offmainthreadcomposition.async-animations", true);

user_pref("html5.offmainthread", true);
user_pref("gfx.webrender.all", true);
user_pref("gfx.webrender.enabled", true);
// below solves issue of freezing and stuttering
user_pref("layers.acceleration.force-enabled", true);

// disable annoying web notifications
user_pref("dom.webnotifications.enabled", false);

//Disable battery api
user_pref("dom.battery.enabled", false);

//disable speech recognition
user_pref("media.webspeech.recognition.enable", false);

// disable sensors
user_pref("device.sensors.enabled", false);

// Disable gamepad API to prevent USB device enumeration
user_pref("dom.gamepad.enabled", false);

// When webGL is enabled, do not expose information about the graphics driver
user_pref("webgl.enable-debug-renderer-info", false);

// Disable face detection
user_pref("camera.control.face_detection.enabled", false);

// Disable GeoIP lookup on your address to set default search engine region
user_pref("browser.search.countryCode", "US");
user_pref("browser.search.region", "US");
user_pref("browser.search.geoip.url", " ");

// Set Accept-Language HTTP header to en-US regardless of Firefox localization
user_pref("intl.accept_languages", "en-US, en");

// Prevent leaking application locale/date format using JavaScript
user_pref("javascript.use_us_english_locale", true);

// Disable sending reports of tab crashes to Mozilla (about:tabcrashed), don't nag user about unsent crash reports
user_pref("browser.tabs.crashReporting.sendReport", false);
user_pref("browser.crashReports.unsubmittedCheck.enabled", false);
user_pref("breakpad.reportURL", "");

// Disable the UITour backend
user_pref("browser.uitour.enabled", false);

// Disable collection/sending of the health report (healthreport.sqlite*)
user_pref("datareporting.healthreport.uploadEnabled", false);
user_pref("datareporting.healthreport.service.enabled", false);
user_pref("datareporting.policy.dataSubmissionEnabled", false);
// "Allow Firefox to make personalized extension recommendations"
user_pref("browser.discovery.enabled", false);

// Do not create screenshots of visited pages (relates to the "new tab page" feature)
user_pref("browser.pagethumbnails.capturing_disabled", true);

// Disable the "new tab page" feature and show a blank tab instead
user_pref("browser.newtabpage.enabled", false);
user_pref("browser.newtab.url", "https://startpage-zwei.vercel.app/");


// Disable Activity Stream
user_pref("browser.newtabpage.activity-stream.enabled", false);
user_pref("browser.newtabpage.activity-stream.feeds.sections", false);
user_pref("browser.newtabpage.activity-stream.feeds.snippets", false);
user_pref("browser.newtabpage.activity-stream.feeds.section.topstories", false);
user_pref("browser.newtabpage.activity-stream.feeds.telemetry", false);
user_pref("browser.newtabpage.activity-stream.telemetry", false);
user_pref("browser.newtabpage.activity-stream.feeds.system.topsites", false);
user_pref("browser.newtabpage.activity-stream.feeds.topsites", false);
user_pref(
    "browser.newtabpage.activity-stream.newNewtabExperience.enabled",
    false
);
user_pref("browser.newtabpage.activity-stream.showSponsored", false);
user_pref("browser.newtabpage.activity-stream.showSponsoredTopSites", false);

// Disable new tab tile ads & preload
user_pref("browser.newtabpage.enhanced", false);
user_pref("browser.newtab.preload", false);
user_pref("browser.newtabpage.directory.ping", "");
user_pref("browser.newtabpage.directory.source", "data:text/plain,{}");

// For preventing geologic location logging
user_pref("geo.provider.network.logging.enabled", false);

// Disable remote debugging
user_pref("devtools.debugger.remote-enabled", false);
user_pref("devtools.chrome.enabled", false);
user_pref("devtools.debugger.force-local", true);

// Disable Mozilla telemetry/experiments
user_pref("toolkit.telemetry.enabled", false);
user_pref("toolkit.telemetry.unified", false);
user_pref("toolkit.telemetry.archive.enabled", false);
user_pref("experiments.supported", false);
user_pref("experiments.enabled", false);
user_pref("experiments.manifest.uri", "");



// Make devtools dark like everything else
user_pref("devtools.theme", "dark");

// allow variants of GTK themes (Linux)
user_pref("widget.content.allow-gtk-dark-theme", true);

// Set my GTK theme to be Firefox's
user_pref("widget.content.gtk-theme-override", "Dhumavati-White-Dark");

// Stop the stupid "be careful lol" warning for about:config
user_pref("browser.aboutConfig.showWarning", false);

// keep "all tabs" menu available at all times, useful for all tabs menu expansion pack
user_pref("browser.tabs.tabmanager.enabled", true);


// other CSS features
user_pref("layout.css.moz-outline-radius.enabled", true);

// When Finding Highlight all words on that page
user_pref("findbar.highlightAll", true);

// Dim the rest of the page if the above matches some term, seems like a bad plan but helps cue the eyes
user_pref("findbar.modalHighlight", true);

// Disable Pocket (since I don't use it anyway thanks to osmos::memo replacing it and bookmarks)
user_pref("extensions.pocket.enabled", false);

// Enable WebM
user_pref("media.mediasource.webm.enabled", true);
//
// Disable Flash Since Its Not Used Anymore Anyway
user_pref("plugin.state.flash", 0);


// Create menu in tab bar enabling tab management from a list (useless given the present right sidebar which does as much)
user_pref("browser.tabs.tabmanager.enabled", false);
//  Allow porting over GTK theme directly (was false but TODO, does setting it true help at all?)
user_pref("browser.display.use_system_colors", true);
user_pref("layout.css.moz-document.content.enabled", true);
user_pref("browser.display.focus_ring_width", 0);
user_pref("browser.display.windows.non_native_menus", 1);

// Enable the visual refresh of Firefox UI (disable if porting CSS from before, this config is using it as the base its CSS modifies so its on)
user_pref("browser.proton.places-tooltip.enabled", true);
user_pref("browser.startup.blankWindow", false);
user_pref("browser.startup.preXulSkeletonUI", false);
user_pref("widget.disable-native-theme-for-content", true);




user_pref("reader.color_scheme", "dark");


// Delay before displaying submenu
user_pref("ui.submenuDelay", 0);
user_pref("ui.prefersReducedMotion", 0);
user_pref("ui.tooltipDelay", 0);

//When using arrow keys to navigate a menu, don't even focus that which is disable
user_pref("ui.skipNavigatingDisabledMenuItem", 1);

// Double Underline Spelling Errors for Visual Cue Purpose http://kb.mozillazine.org/Ui.SpellCheckerUnderlineStyle
user_pref("ui.SpellCheckerUnderlineStyle", 4);





// Insure this is set for the sake of not being blinded
user_pref("ui.systemUsesDarkTheme", 1);


// Enable popups from plugins, useful for dictionary add-on I
// use and other reasons, addons should change this themselves
// I would think but don't/can't
user_pref("privacy.popups.disable_from_plugins", 0);


// Enable extensions to work on Mozilla's pages
// May Not Work When Loaded From Here, But Kept Here As Record Anyway

user_pref("privacy.resistFingerprinting.block_mozAddonManager", true);
user_pref("extensions.webextensions.restrictedDomains", "blank");
