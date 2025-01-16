// ==UserScript==
// @name           Extended Statusbar
// @description    A customizable Statusbar with link location preview
// @include        main
// @author         Thomas Leon Highbaugh
// @version        0.0.1
// @homepageURL   https://github.com/Thomashighbaugh/firefox
// ==/UserScript==

(function () {
  // Create the status bar - now a customizable toolbar
  const toolbar = UC_API.Utils.createElement(document, "toolbar", {
    id: "ESB_toolbar",
    mode: "icons",
    iconsize: "small",
    defaulticonsize: "small",
    toolbarname: "Extended Statusbar",
    customizable: "true",
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

  // Add the status bar to the main window
  document.getElementById("browser-bottombox").appendChild(toolbar);

  // Create an element for displaying the hovered link URL
  const urlBox = UC_API.Utils.createElement(document, "toolbaritem", {
    id: "esb-url-box",
    flex: "1",
  });

  const urlLabel = UC_API.Utils.createElement(document, "label", {
    id: "esb-url-label",
    value: "",
  });
  urlBox.appendChild(urlLabel);
  toolbar.appendChild(urlBox);

  // Move the toolbar to the addon bar
  document.getElementById("addon-bar").appendChild(toolbar);

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
