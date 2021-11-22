// ##################################################################### 
//   USER.JS
// ##################################################################### 
// Provides user preferences to browser without reliance on 
// Firefox Sync alone. 
// ##################################################################### 
// Enable User Chrome
user_pref("svg.context-properties.content.enabled", true);
user_perf("toolkit.legacyUserProfileCustomizations.stylesheets", true);

// Don't reveal your internal IP when WebRTC is enabled
user_pref("media.peerconnection.ice.no_host", true);

// enable proton
user_pref("browser.proton.enabled", true);
user_pref("browser.proton.places-tooltip.enabled", true);

// prevent names of plugins from leaking
user_perf("plugins.enumerable_names", "blank");

// hardware acceleration
user_perf("layers.offmainthreadcomposition.enabled", true);
user_perf("layers.offmainthreadcomposition.async-animations", true);
user_perf("layers.async-video.enabled", true);
user_perf("html5.offmainthread", true);
user_pref("gfx.webrender.all", true);
user_pref("gfx.webrender.enabled", true);
// below soles issue of freezing and stuttering
user_perf("layers.acceleration.force - enabled", true);

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

// Disable Snippets

// Disable Activity Stream
user_pref("browser.newtabpage.activity-stream.enabled", false);
user_pref("browser.newtabpage.activity-stream.feeds.sections", false);
user_pref("browser.newtabpage.activity-stream.feeds.snippets", false);
user_perf("browser.newtabpage.activity-stream.feeds.system.topstories", false);
user_perf("browser.newtabpage.activity-stream.feeds.telemetry", false);
user_perf("browser.newtabpage.activity-stream.feeds.system.topsites", false);
user_perf("browser.newtabpage.activity-stream.feeds.topsites", false);
user_perf(
  "browser.newtabpage.activity-stream.newNewtabExperience.enabled",
  false
);
user_perf("browser.newtabpage.activity-stream.showSponsored", false);
user_perf("browser.newtabpage.activity-stream.showSponsoredTopSites", false);

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

//Ensure the addons can render popups so my dictionary works
user_pref("privacy.popups.disable_from_plugins", "0");
user_pref("ui.popup.disable_autohide", true);
user_pref("devtools.performance.popup.feature-flag", true);
user_perf("devtools.popup.disable_autohide", true);

// theme perferences
//################################################################

// insure the toolbar is dark
user_pref("browser.theme.toolbar-theme", "0");

// Make devtools dark like everything else
user_perf("devtools.theme", "dark");

// allow variants of GTK themes (Linux)
user_perf("widget.content.allow-gtk-dark-theme", true);

// Allow alternative scrollbars with GTK theme
user_perf("widget.gtk.alt-theme.scrollbar", true);
user_perf("widget.non-native-theme.gtk.scrollbar.allow-buttons", true);

// Set my GTK theme to be Firefox's
user_perf("widget.content.gtk-theme-override", "Dhumavati-White-Dark");

// Stop the stupid "be careful lol" warning for about:config
user_perfs("browser.aboutConfig.showWarning", false);

// keep "all tabs" menu available at all times, useful for all tabs menu expansion pack
user_pref("browser.tabs.tabmanager.enabled", true);

// allow stylesheets to modify trees in system pages viewed in regular tabs
user_pref("layout.css.xul-tree-pseudos.content.enabled", true);

// allow the color-mix() CSS function
user_pref("layout.css.color-mix.enabled", true);

// other CSS features
user_pref("layout.css.moz-outline-radius.enabled", true);

// When double-clicking a word on a page, only copy the word itself, not the space character next to it
user_pref("layout.word_select.eat_space_to_next_word", false);

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

// TODO remove if safe
//user_perf("browser.tabs.tabMinWidth", 90);
//user_perf("browser.tabs.tabmanager.enabled", true);

// Create menu in tab bar enabling tab management from a list (useless given the present right sidebar which does as much)
user_perf("browser.tabs.tabmanager.enabled", false);
//  Allow porting over GTK theme directly (was false but TODO, does setting it true help at all?)
user_perf("browser.display.use_system_colors", true);
user_perf("browser.display.focus_ring_style", 0);
user_perf("browser.display.focus_ring_width", 0);
user_perf("browser.display.windows.non_native_menus", 1);

// Enable the visual refresh of Firefox UI (disable if porting CSS from before, this config is using it as the base its CSS modifies so its on)
user_perf("browser.proton.places-tooltip.enabled", true);
user_perf("browser.startup.blankWindow", false);
user_perf("browser.startup.preXulSkeletonUI", false);
user_perf("browser.tabs.tabmanager.enabled", true);
user_pref("widget.disable-native-theme-for-content", true);



user_perf("browser.urlbar.accessibility.tabToSearch.announceResults", false);
user_perf("browser.urlbar.richSuggestions.tail", false);
user_perf("browser.urlbar.searchTips", false);
// Don't make copying the url more of a pain than it needs to be
user_perf("browser.urlbar.trimURLs", false);

// Enable XUL, which we need for the patches this config applies
user_perf("layout.css.xul-display-values.content.enabled", true);
user_perf("layout.css.xul-tree-pseudos.content.enabled", true);
user_perf("reader.color_scheme", "dark");

// make single direction scroll more useful
user_perf("mousewheel.autodir.enabled", true);
user_perf("prompts.contentPromptSubDialog", true);

// make firefox play nice with tiling window manager
user_perf("ui.key.menuAccessKeyFocuses", false);

// Delay before displaying submenu
user_perf("ui.submenuDelay", 50);
user_perf("ui.prefersReducedMotion", 0);
user_perf("ui.tooltipDelay", 50);

//When using arrow keys to navigate a menu, don't even focus that which is disable
user_perf("ui.skipNavigatingDisabledMenuItem", 1);

// Double Underline Spelling Errors for Visual Cue Purpose http://kb.mozillazine.org/Ui.SpellCheckerUnderlineStyle
user_perf("ui.SpellCheckerUnderlineStyle", 4);

// More situating of the css and js especially enabling xul stuff
user_perf("layout.css.backdrop-filter.enabled", true);
user_perf("layout.css.cached-scrollbar-styles.enabled", false);
user_perf("layout.css.moz-document.content.enabled", true);
user_perf("layout.css.xul-box-display-values.content.enabled", true);

// Insure this is set for the sake of not being blinded
user_pref("ui.systemUsesDarkTheme", 1);

// UI 
user_pref("ui.selecteditem", "#2F303d");
user_pref("ui.selecteditemtext", "#F4F4F7CC");

// Enable popups from plugins, useful for dictionary add-on I
// use and other reasons, addons should change this themselves
// I would think but don't/can't
user_perf("privacy.popups.disable_from_plugins", 0);

