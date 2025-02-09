// ==UserScript==
// @name           Extended Statusbar
// @description    A customizable Statusbar with link location preview
// @include        main
// @author         py (modified by)
// @version        2.1.2 (modified for userchrome.js)
// @homepageURL    https://addons.mozilla.org/en-US/firefox/addon/extended-statusbar/
// ==/UserScript==

(function () {
  // Create the status bar - now a customizable toolbar
  const toolbar = UC_API.Utils.createElement("toolbar");
  toolbar.setAttribute("id", "ESB_toolbar");
  toolbar.setAttribute("toolbarname", "Extended Statusbar");
  toolbar.setAttribute("customizable", "true");
  toolbar.setAttribute("mode", "icons");
  toolbar.setAttribute("iconsize", "small");
  toolbar.setAttribute("defaulticonsize", "small");
  toolbar.setAttribute("context", "toolbar-context-menu");
  toolbar.setAttribute("fullscreentoolbar", "true");
  toolbar.setAttribute("toolboxid", "navigator-toolbox"); // Add toolboxid attribute
  toolbar.setAttribute("data-widget-type", "toolbar");
  toolbar.setAttribute("label", "Extended Status Bar");

  // Create an element for displaying the hovered link URL
  const urlBox = document.createElement("toolbaritem");
  urlBox.setAttribute("id", "esb-url-box");
  urlBox.setAttribute("flex", "1");
  urlBox.setAttribute("width", "50%");

  const urlLabel = document.createElement("label");
  urlLabel.setAttribute("id", "esb-url-label");
  urlLabel.setAttribute("value", "");
  urlLabel.setAttribute("flex", "1");
  urlBox.appendChild(urlLabel);
  toolbar.appendChild(urlBox);

  // Get references to the status bar
  const statusBar = document.getElementById("status-bar");

  // Insert the toolbar into the status bar
  statusBar.appendChild(toolbar);

  // Ensure the status bar is visible and its visibility persists (status-bar is usually visible by default)
  // No need to set toolboxid on status-bar, it's fixed.
  // No need to persist collapsed on status-bar, it's usually not collapsible by default.

  // NEW: Get the current set of items on the status bar (status-bar might not use currentset directly, toolbars within might)
  // However, for toolbars inside status-bar, currentset might still be relevant for customization.
  let currentSet = statusBar.getAttribute("currentset");
  if (!currentSet) {
    currentSet = ""; // Initialize if null
  }
  currentSet = currentSet.split(",");

  // Add the new toolbar's ID to the current set if it's not already there
  if (!currentSet.includes("ESB_toolbar")) {
    currentSet.push("ESB_toolbar");
    statusBar.setAttribute("currentset", currentSet.join(","));
    // Persist changes to the status bar or its children if needed.
    // Services.xulStore.persist(statusBar, "currentset"); // Persisting on status-bar might not be directly effective.
    // Persisting on the toolbar itself might be more relevant for its position within status-bar if status-bar manages children like toolbars via currentset.
    Services.xulStore.persist(toolbar, "currentset"); // Try persisting on the toolbar itself.
  }

  // Function to update the displayed URL
  function showLinkLocation(event) {
    let link = event.target.closest("a[href]");
    if (!link) {
      link = event.target.closest("area[href]"); // Also check for area elements in image maps
    }
    if (link) {
      urlLabel.value = link.href;
      urlLabel.style.visibility = "visible";
    } else {
      urlLabel.value = "";
      urlLabel.style.visibility = "hidden";
    }
  }

  // Add event listeners to show/hide the URL on hover. Attach to document for wider coverage.
  document.addEventListener("mouseover", showLinkLocation);
  document.addEventListener("mouseout", showLinkLocation);
})();
