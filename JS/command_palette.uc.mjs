// ==UserScript==
// @name            Command Palette for Firefox
// @description     VS Code-style command palette with fuzzy search, customizable commands, and keyboard shortcuts
// @author          Adapted from Zen Browser command-palette by BibekBhusal0
// @homepageURL     https://github.com/BibekBhusal0/zen-custom-js
// ==/UserScript==

import { PaletteInjector } from "./command_palette/palette_injector.mjs";

const run = () => {
  console.log("Command Palette initialization...");
  PaletteInjector.inject();
};

if (typeof UC_API !== "undefined") {
  UC_API.Runtime.startupFinished().then(run);
} else {
  delayedStartupPromise.then(run);
}
