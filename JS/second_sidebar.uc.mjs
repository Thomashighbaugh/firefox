// ==UserScript==
// @name            Second Sidebar for Firefox
// @description     A Firefox userChrome.js script for adding a second sidebar with web panels like in Vivaldi/Floorp/Zen.
// @author          aminought
// @homepageURL     https://github.com/aminought/firefox-second-sidebar
// ==/UserScript==

import { SidebarDecorator } from "./second_sidebar/sidebar_decorator.mjs";
import { SidebarInjector } from "./second_sidebar/sidebar_injector.mjs";

const run = () => {
  SidebarInjector.inject();
  SidebarDecorator.decorate();
};

UC_API.Runtime.startupFinished().then(run);
