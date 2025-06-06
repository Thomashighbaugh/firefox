// ==UserScript==
// @name           Firefox Sidebar Width 
// @version        1.0
// @author         aminought
// @homepage       https://github.com/aminought/firefox-sidebar-width/tree/master
// @description    This script allows the user to save the width of their 
//sidebars. Each panel now has its own width, which changes when switching. 
// ==/UserScript==
    (function sidebar_width() {
  "use strict";

  // Interval timeout in milliseconds for checking DOM readiness
  const TIMEOUT = 1000;
  // Preference key for storing sidebar widths
  const PREF = "sidebar.widths";

  /**
   * SidebarWidth manages the persistence and restoration of sidebar widths
   * for different sidebar panels in the browser UI.
   */
  class SidebarWidth {
    constructor() {
      // Load or initialize sidebar widths for each sidebar command
      this.sidebarWidths = this.initWidth();
      // Set up event listeners for sidebar resize and show events
      this.addEventListeners();
    }

    /**
     * Initializes the sidebar widths from preferences or defaults.
     * @returns {Object} Mapping of sidebarcommand to width
     */
    initWidth() {
      try {
        // Attempt to load saved widths from preferences
        return JSON.parse(Services.prefs.getStringPref(PREF));
      } catch (error) {
        // If not found, initialize widths for all sidebars to current width
        const sidebars = Array.from(SidebarController.sidebars.keys());
        return Object.fromEntries(
          sidebars.map((sidebar) => [sidebar, this.width])
        );
      }
    }

    /**
     * Adds event listeners for sidebar resize and show events.
     */
    addEventListeners() {
      // Save width when sidebar is resized
      SidebarController._box.addEventListener("resize", () => this.saveWidth());
      // Restore width when a sidebar is shown
      addEventListener("SidebarShown", () => this.restoreWidth());
    }

    /**
     * Saves the current width of the active sidebar to preferences.
     */
    saveWidth() {
      // Only save if the width has changed
      if (
        this.command in this.sidebarWidths &&
        this.sidebarWidths[this.command] === this.width
      )
        return;
      this.sidebarWidths[this.command] = this.width;
      Services.prefs.setStringPref(PREF, JSON.stringify(this.sidebarWidths));
    }

    /**
     * Restores the width of the active sidebar from preferences.
     */
    restoreWidth() {
      SidebarController._box.style.width = this.sidebarWidths[this.command];
    }

    /**
     * Gets the current width of the sidebar.
     */
    get width() {
      return SidebarController._box.style.width;
    }

    /**
     * Gets the current sidebarcommand attribute.
     */
    get command() {
      return SidebarController._box.getAttribute("sidebarcommand");
    }
  }

  // Wait for the browser DOM to be ready before initializing SidebarWidth
  var interval = setInterval(() => {
    if (document.querySelector("#browser")) {
      window.sidebarWidth = new SidebarWidth();
      clearInterval(interval);
    }
  }, TIMEOUT);
})();

