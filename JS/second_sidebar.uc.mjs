// ==UserScript==
// @name            Second Sidebar for Firefox
// @description     A Firefox userChrome.js script that brings a second sidebar with web panels like in Vivaldi/Edge/Floorp but better
// @author          aminought
// @homepageURL     https://github.com/aminought/firefox-second-sidebar
// ==/UserScript==

import { BrowserElements } from "chrome://secondsidebar/content/browser_elements.mjs";
import { ContextualIdentityServiceWrapper } from "chrome://secondsidebar/content/wrappers/contextual_identity_service.mjs";
import { CustomizeModePatcher } from "chrome://secondsidebar/content/patchers/customize_mode_patcher.mjs";
import { SidebarDecorator } from "chrome://secondsidebar/content/sidebar_decorator.mjs";
import { SidebarInjector } from "chrome://secondsidebar/content/sidebar_injector.mjs";

const run = () => {
  if (BrowserElements.root.hasClass("sb2-webpanels-window")) return;
  ContextualIdentityServiceWrapper.ensureDataReady();
  if (SidebarInjector.inject()) {
    SidebarDecorator.decorate();
    CustomizeModePatcher.patch();
  }
};

const cleanup = () => {
  SidebarControllers.destroy();
};

const runAfterStartup = () => {
  if (window.gBrowserInit?.delayedStartupFinished) {
    run();
  } else if (typeof delayedStartupPromise !== "undefined") {
    delayedStartupPromise.then(run);
  } else if (typeof UC_API !== "undefined") {
    UC_API.Runtime.startupFinished().then(run);
  }
};

if (
  document.readyState === "loading" &&
  typeof delayedStartupPromise === "undefined"
) {
  window.addEventListener("DOMContentLoaded", runAfterStartup, { once: true });
} else {
  runAfterStartup();
}

window.addEventListener("unload", cleanup, { once: true });
