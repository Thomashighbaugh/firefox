user_pref("browser.shell.checkDefaultBrowser", false);

user_pref("browser.startup.page", 1);

user_pref("browser.newtabpage.enabled", false);
user_pref("browser.newtab.preload", false);
user_pref("browser.newtabpage.activity-stream.feeds.telemetry", false);
user_pref("browser.newtabpage.activity-stream.telemetry", false);
user_pref("browser.newtabpage.activity-stream.telemetry.ping.endpoint", "");
user_pref("browser.newtabpage.activity-stream.asrouter.providers.snippets", "");
user_pref("browser.newtabpage.activity-stream.feeds.snippets", false);
user_pref("browser.newtabpage.activity-stream.feeds.section.topstories", false);

user_pref("browser.search.region", "US"); // [HIDDEN PREF]
user_pref("browser.search.geoip.url", "");
user_pref("browser.search.geoSpecificDefaults", false);
user_pref("browser.search.geoSpecificDefaults.url", "");
user_pref("intl.accept_languages", "en-US, en");
user_pref("javascript.use_us_english_locale", true); // [HIDDEN PREF]
user_pref("intl.regional_prefs.use_os_locales", false);

user_pref("geo.provider.use_gpsd", false); // [LINUX]

user_pref("app.update.auto", false);
user_pref("extensions.htmlaboutaddons.discover.enabled", false);
user_pref("extensions.htmlaboutaddons.recommendations.enabled", false);

user_pref("toolkit.telemetry.unified", false);
user_pref("toolkit.telemetry.enabled", false); // see [NOTE] above FF58+
user_pref("toolkit.telemetry.server", "data:,");
user_pref("toolkit.telemetry.archive.enabled", false);
user_pref("toolkit.telemetry.newProfilePing.enabled", false); // [FF55+]
user_pref("toolkit.telemetry.shutdownPingSender.enabled", false); // [FF55+]
user_pref("toolkit.telemetry.updatePing.enabled", false); // [FF56+]
user_pref("toolkit.telemetry.bhrPing.enabled", false); // [FF57+] Background Hang Reporter
user_pref("toolkit.telemetry.firstShutdownPing.enabled", false); // [FF57+]
user_pref("toolkit.telemetry.hybridContent.enabled", false); // [FF59+]
user_pref("toolkit.telemetry.coverage.opt-out", true); // [HIDDEN PREF]
user_pref("toolkit.coverage.opt-out", true); // [FF64+] [HIDDEN PREF]
user_pref("toolkit.coverage.endpoint.base", "");

user_pref("datareporting.healthreport.uploadEnabled", false);
user_pref("datareporting.policy.dataSubmissionEnabled", false);
user_pref("app.shield.optoutstudies.enabled", false);

user_pref("browser.discovery.enabled", false);
user_pref("breakpad.reportURL", "");
user_pref("browser.tabs.crashReporting.sendReport", false); // [FF44+]
user_pref("browser.crashReports.unsubmittedCheck.enabled", false); // [FF51+]

user_pref("browser.crashReports.unsubmittedCheck.autoSubmit2", false); // [FF58+]
user_pref("captivedetect.canonicalURL", "");
user_pref("network.captive-portal-service.enabled", false); // [FF52+]
user_pref("network.connectivity-service.enabled", false);

user_pref("extensions.blocklist.enabled", true); // [DEFAULT: true]
user_pref("app.normandy.enabled", false);
user_pref("app.normandy.api_url", "");
user_pref("extensions.webcompat-reporter.enabled", false);

user_pref("network.proxy.socks_remote_dns", true);

user_pref("browser.fixup.alternate.enabled", false);
user_pref("browser.urlbar.trimURLs", false);
user_pref("layout.css.visited_links_enabled", false);
user_pref("browser.search.suggest.enabled", false);
user_pref("browser.urlbar.suggest.searches", false);

user_pref("network.auth.subresource-http-auth-allow", 1);

user_pref("browser.cache.disk.enable", false);
user_pref("browser.cache.disk_cache_ssl", false);
user_pref("browser.sessionstore.privacy_level", 2);
user_pref("browser.shell.shortcutFavicons", false);
user_pref("alerts.showFavicons", false); // [DEFAULT: false]

user_pref("security.ssl.require_safe_negotiation", true);
user_pref("security.ssl.errorReporting.automatic", false);
user_pref("security.ssl.errorReporting.enabled", false);
user_pref("security.ssl.errorReporting.url", "");
user_pref("security.ssl.enable_ocsp_stapling", true);
user_pref("security.OCSP.enabled", 1);
user_pref("security.OCSP.require", true);

user_pref("security.family_safety.mode", 0);
user_pref("security.cert_pinning.enforcement_level", 2);

user_pref("browser.xul.error_pages.expert_bad_cert", true);
user_pref("security.insecure_connection_icon.enabled", true); // [FF59+]
user_pref("security.insecure_connection_text.enabled", true); // [FF60+]
user_pref("network.http.referer.hideOnionSource", true);
user_pref("privacy.donottrackheader.enabled", true);

user_pref("plugins.click_to_play", true);
user_pref("plugin.sessionPermissionNow.intervalInMinutes", 0);
user_pref("plugin.state.flash", 0);

user_pref("media.peerconnection.enabled", false);
user_pref("media.peerconnection.ice.default_address_only", true);
user_pref("media.peerconnection.ice.no_host", true); // [FF51+]
user_pref("media.block-autoplay-until-in-foreground", true); // [DEFAULT: true]

user_pref("dom.targetBlankNoOpener.enabled", true);

user_pref("accessibility.force_disabled", 1);
user_pref("beacon.enabled", false);
user_pref("browser.helperApps.deleteTempFileOnExit", true);
user_pref("browser.uitour.enabled", false);
user_pref("browser.uitour.url", "");

user_pref("devtools.chrome.enabled", false);
user_pref("devtools.debugger.remote-enabled", false);
user_pref("devtools.webide.enabled", false);
user_pref("devtools.webide.autoinstallADBExtension", false); // [FF64+]
user_pref("network.http.redirection-limit", 10);
user_pref("permissions.manager.defaultsUrl", "");
user_pref("browser.download.useDownloadDir", false);
user_pref("browser.download.hide_plugins_without_extensions", false);

user_pref("extensions.webextensions.restrictedDomains", "");
user_pref("security.csp.enable", true); // [DEFAULT: true]
user_pref("security.dialog_enable_delay", 700);

user_pref("network.cookie.cookieBehavior", 1);

user_pref("network.cookie.thirdparty.sessionOnly", true);
user_pref("network.cookie.thirdparty.nonsecureSessionOnly", true); // [FF58+]

user_pref("dom.indexedDB.enabled", true); // [DEFAULT: true]
user_pref("browser.cache.offline.enable", false);

user_pref("offline-apps.allow_by_default", false);

user_pref("privacy.resistFingerprinting", true);
user_pref("browser.startup.blankWindow", false);
user_pref("browser.tabs.warnOnClose", false);
user_pref("browser.tabs.warnOnCloseOtherTabs", false);
user_pref("browser.tabs.warnOnOpen", false);
user_pref("full-screen-api.warning.delay", 0);
user_pref("full-screen-api.warning.timeout", 0);
user_pref("general.warnOnAboutConfig", false);
user_pref("browser.aboutConfig.showWarning", false); // [FF67+]

user_pref("browser.download.autohideButton", false); // [FF57+]
user_pref("toolkit.cosmeticAnimations.enabled", false); // [FF55+]
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true); // [FF68+] allow userChrome/userContent

user_pref("browser.tabs.loadBookmarksInTabs", true); // open bookmarks in a new tab [FF57+]
user_pref("general.autoScroll", false); // middle-click enabling auto-scrolling [WINDOWS] [MAC]

user_pref("browser.onboarding.enabled", false);

user_pref("media.peerconnection.turn.disable", false);
user_pref("media.peerconnection.use_document_iceservers", false);
user_pref("media.peerconnection.video.enabled", false);

user_pref("privacy.trackingprotection.fingerprinting.enabled", true);
user_pref("privacy.trackingprotection.cryptomining.enabled", true);
user_pref("privacy.trackingprotection.enabled", true);

user_pref("browser.safebrowsing.malware.enabled", false);
user_pref("browser.safebrowsing.phishing.enabled", false);

user_pref("browser.sessionstore.max_tabs_undo", 0);

user_pref("dom.battery.enabled", false);
user_pref("dom.event.clipboardevents.enabled", false);

user_pref("geo.enabled", false);

user_pref("network.cookie.lifetimePolicy", 2);
user_pref("network.http.referer.trimmingPolicy", 2);
user_pref("network.http.referer.XOriginPolicy", 2);
user_pref("network.http.referer.XOriginTrimmingPolicy", 2);

user_pref(
  "extensions.blocklist.url",
  "https://blocklists.settings.services.mozilla.com/v1/blocklist/3/%20/%20/"
);

user_pref("keyword.enabled", true);

user_pref("privacy.resistFingerprinting.letterboxing", false);

user_pref("privacy.clearOnShutdown.history", false);

user_pref("places.history.enabled", true);

// Firefox/Profile on RAM (ArchLinux wiki)
user_pref("browser.cache.memory.capacity", -1);
