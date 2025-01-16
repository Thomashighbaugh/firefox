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
  const toolbar = UC_API.Utils.createElement(document, "toolbar", {
    id: "ESB_toolbar",
    toolbarname: "Extended Statusbar",
    customizable: "true",
    mode: "icons",
    iconsize: "small",
    defaulticonsize: "small",
    context: "toolbar-context-menu",
    fullscreentoolbar: "true",
  });

  // Make it customizable
  toolbar.setAttribute("customizable", "true");
  toolbar.setAttribute("mode", "icons");
  toolbar.setAttribute("iconsize", "small");
  toolbar.setAttribute("defaulticonsize", "small");
  toolbar.setAttribute("toolboxid", "navigator-toolbox");
  toolbar.setAttribute("data-widget-type", "toolbar");
  toolbar.setAttribute("label", "Extended Status Bar");

  // Create an element for displaying the hovered link URL
  const urlBox = UC_API.Utils.createElement(document, "toolbaritem", {
    id: "esb-url-box",
    flex: "1",
    width: "100%",
  });

  const urlLabel = UC_API.Utils.createElement(document, "label", {
    id: "esb-url-label",
    value: "",
    flex: "1",
  });
  urlBox.appendChild(urlLabel);
  toolbar.appendChild(urlBox);

  // Get references to the addon bar
  const addonBar = document.getElementById("addon-bar");

  // Insert the toolbar into the addon bar
  addonBar.appendChild(toolbar);

  // Ensure the addon bar is visible and its visibility persists
  addonBar.setAttribute("toolboxid", "navigator-toolbox");
  addonBar.setAttribute("persist", "collapsed");
  addonBar.collapsed = false;

  // NEW: Get the current set of items on the addon bar
  let currentSet = addonBar.getAttribute("currentset").split(",");

  // Add the new toolbar's ID to the current set if it's not already there
  if (!currentSet.includes("ESB_toolbar")) {
    currentSet.push("ESB_toolbar");
    addonBar.setAttribute("currentset", currentSet.join(","));
    // Persist changes to the addon bar
    Services.xulStore.persist(addonBar, "currentset");
  }

  // Function to update the displayed URL
  function showLinkLocation(event) {
    const link = event.target.closest("a[href]");
    if (link) {
      urlLabel.value = link.href;
      urlLabel.style.visibility = "visible";
    } else {
      urlLabel.value = "";
      urlLabel.style.visibility = "hidden";
    }
  }

  // Add event listeners to show/hide the URL on hover
  window.addEventListener("mouseover", showLinkLocation);
  window.addEventListener("mouseout", showLinkLocation);
})();
