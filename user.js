// Enabled for User Chrome
user_pref("svg.context-properties.content.enabled", true);
user_perf("toolkit.legacyUserProfileCustomizations.stylesheets", true);

// Don't reveal your internal IP when WebRTC is enabled (Firefox >= 42)
user_pref("media.peerconnection.ice.no_host", true); // Firefox >= 52

// prevent names of plugins from leaking
user_perf("plugins.enumerable_names", "blank");

// hardware acceleration
user_perf("layers.offmainthreadcomposition.enabled", true);
user_perf("layers.offmainthreadcomposition.async-animations", true);
user_perf("layers.async-video.enabled", true);
user_perf("html5.offmainthread", true);
user_pref("gfx.webrender.all", true);
user_pref("gfx.webrender.enabled", true);

// disable those annoying web notifications
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
user_pref("browser.search.geoip.url", "");

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
user_pref("browser.newtab.url", "https://startpage-rho.vercel.app/");

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
