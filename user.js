// Enabled for User Chrome
user_pref("svg.context-properties.content.enabled", true);
user_perf("toolkit.legacyUserProfileCustomizations.stylesheets", true);
//
user_pref("layout.css.backdrop-filter.enabled", true);

// Don't reveal your internal IP when WebRTC is enabled (Firefox >= 42)
// https://wiki.mozilla.org/Media/WebRTC/Privacy
// https://github.com/beefproject/beef/wiki/Module%3A-Get-Internal-IP-WebRTC
user_pref("media.peerconnection.ice.no_host", true); // Firefox >= 52

// prevent names of plugins from leaking
user_perf("plugins.enumerable_names", "blank");
//speed up animations
user_perf("layout.frame_rate.precise", true);

// force hardware acceleration
user_perf("layers.offmainthreadcomposition.enabled", true);
user_perf("layers.offmainthreadcomposition.async-animations", true);
user_perf("layers.async-video.enabled", true);
user_perf("html5.offmainthread", true);
user_pref("layers.acceleration.force-enabled", true);
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
// https://bugzilla.mozilla.org/show_bug.cgi?id=1171228
// https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_debug_renderer_info
user_pref("webgl.enable-debug-renderer-info", false);

// Disable face detection
user_pref("camera.control.face_detection.enabled", false);

// Disable GeoIP lookup on your address to set default search engine region
// https://trac.torproject.org/projects/tor/ticket/16254
// https://support.mozilla.org/en-US/kb/how-stop-firefox-making-automatic-connections#w_geolocation-for-default-search-engine
user_pref("browser.search.countryCode", "US");
user_pref("browser.search.region", "US");
user_pref("browser.search.geoip.url", "");

// Set Accept-Language HTTP header to en-US regardless of Firefox localization
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
user_pref("intl.accept_languages", "en-US, en");

// Prevent leaking application locale/date format using JavaScript
// https://bugzilla.mozilla.org/show_bug.cgi?id=867501
// https://hg.mozilla.org/mozilla-central/rev/52d635f2b33d
user_pref("javascript.use_us_english_locale", true);

// Disable sending reports of tab crashes to Mozilla (about:tabcrashed), don't nag user about unsent crash reports
// https://hg.mozilla.org/mozilla-central/file/tip/browser/app/profile/firefox.js
user_pref("browser.tabs.crashReporting.sendReport", false);
user_pref("browser.crashReports.unsubmittedCheck.enabled", false);
user_pref("breakpad.reportURL", "");

// Disable the UITour backend
// https://trac.torproject.org/projects/tor/ticket/19047#comment:3
user_pref("browser.uitour.enabled", false);

// Disable collection/sending of the health report (healthreport.sqlite*)
// https://support.mozilla.org/en-US/kb/firefox-health-report-understand-your-browser-perf
// https://gecko.readthedocs.org/en/latest/toolkit/components/telemetry/telemetry/preferences.html
user_pref("datareporting.healthreport.uploadEnabled", false);
user_pref("datareporting.healthreport.service.enabled", false);
user_pref("datareporting.policy.dataSubmissionEnabled", false);
// "Allow Firefox to make personalized extension recommendations"
user_pref("browser.discovery.enabled", false);

// Do not create screenshots of visited pages (relates to the "new tab page" feature)
// https://support.mozilla.org/en-US/questions/973320
// https://developer.mozilla.org/en-US/docs/Mozilla/Preferences/Preference_reference/browser.pagethumbnails.capturing_disabled
user_pref("browser.pagethumbnails.capturing_disabled", true);

// Disable the "new tab page" feature and show a blank tab instead
// https://wiki.mozilla.org/Privacy/Reviews/New_Tab
// https://support.mozilla.org/en-US/kb/new-tab-page-show-hide-and-customize-top-sites#w_how-do-i-turn-the-new-tab-page-off
user_pref("browser.newtabpage.enabled", false);
user_pref("browser.newtab.url", "https://startpage-rho.vercel.app/");

// Disable Snippets
// https://wiki.mozilla.org/Firefox/Projects/Firefox_Start/Snippet_Service
// https://support.mozilla.org/en-US/kb/snippets-firefox-faq
user_pref("browser.newtabpage.activity-stream.feeds.snippets", false);

// Disable Activity Stream
// https://wiki.mozilla.org/Firefox/Activity_Stream
user_pref("browser.newtabpage.activity-stream.enabled", false);

// Disable new tab tile ads & preload
user_pref("browser.newtabpage.enhanced", false);
user_pref("browser.newtab.preload", false);
user_pref("browser.newtabpage.directory.ping", "");
user_pref("browser.newtabpage.directory.source", "data:text/plain,{}");

user_pref("geo.provider.network.logging.enabled", false);

// Disable remote debugging
// https://developer.mozilla.org/en-US/docs/Tools/Remote_Debugging/Debugging_Firefox_Desktop
// https://developer.mozilla.org/en-US/docs/Tools/Tools_Toolbox#Advanced_settings
user_pref("devtools.debugger.remote-enabled", false);
user_pref("devtools.chrome.enabled", false);
user_pref("devtools.debugger.force-local", true);

// Disable Mozilla telemetry/experiments
// https://wiki.mozilla.org/Platform/Features/Telemetry
// https://wiki.mozilla.org/Privacy/Reviews/Telemetry
// https://wiki.mozilla.org/Telemetry
// https://www.mozilla.org/en-US/legal/privacy/firefox.html#telemetry
// https://support.mozilla.org/t5/Firefox-crashes/Mozilla-Crash-Reporter/ta-p/1715
// https://wiki.mozilla.org/Security/Reviews/Firefox6/ReviewNotes/telemetry
// https://gecko.readthedocs.io/en/latest/browser/experiments/experiments/manifest.html
// https://wiki.mozilla.org/Telemetry/Experiments
// https://support.mozilla.org/en-US/questions/1197144
// https://firefox-source-docs.mozilla.org/toolkit/components/telemetry/telemetry/internals/preferences.html#id1
user_pref("toolkit.telemetry.enabled", false);
user_pref("toolkit.telemetry.unified", false);
user_pref("toolkit.telemetry.archive.enabled", false);
user_pref("experiments.supported", false);
user_pref("experiments.enabled", false);
user_pref("experiments.manifest.uri", "");

//Ensure the addons can render popups so my dictionary works
user_pref("privacy.popups.disable_from_plugins", "0");
user_pref("ui.popup.disable_autohide", true);
