//vertical_addonbar.uc.js
//Right + Single column only

(function () {
  if (location != "chrome://browser/content/browser.xul" && location != "chrome://browser/content/browser.xhtml") {
    return;
  }

  const toolbar = document.createElement("toolbar");
  toolbar.id = "vertical-toolbar";
  const props = {
    customizable: true,
    mode: "icons",
    context: "toolbar-context-menu"
  };
  Object.entries(props).forEach(
    ([key, value]) => toolbar.setAttribute(key, value)
  );

  const toolbox = document.createElement("toolbox");
  toolbox.id = "vertical-toolbar-toolbox";
  const navToolBox = document.getElementById("navigator-toolbox");
  navToolBox.parentNode.insertBefore(toolbox, navToolBox.nextSibling);
  toolbox.appendChild(toolbar);
  CustomizableUI.registerArea("vertical-toolbar", {
    legacy: true
  });
  CustomizableUI.registerToolbarNode(toolbar);

  const css = `
/* Change the below to the color you need,
you can find a color picker to hex code in this link:
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Colors/Color_picker_tool */

:root {
  --vt-width: 20px; /* Not yet to plus the space */
  --vt-space-width: 10px; /* Add extra width to the vertical toolbar, so that it won't look tied and crowded */
  --vt-space-height: 5px; /* Vertical space between the buttons */
  --vt-button-padding: 10px; /* Basically increase the size of the buttons, should be smaller than space-width/2 in most cases */
  --vt-color: rgb(32, 32, 32); /* Background color of the tooldbar */
  --vt-hover-color: rgba(122, 122, 122, 0.5);
  --vt-active-color: rgba(222, 122, 122, 0.5);
  --vt-active-hover-color: rgba(155, 122, 122, 0.5);

  --vt-space-width-total: calc(var(--vt-space-width) * 2); /* Don't change this */
}

/* If you harly see the icon,
due to its color matchs the toolbar color, try this *//*
#vertical-toolbar toolbarbutton {
  filter: invert(65%) !important;
}
/*---*/

#content-deck {
  border-right: calc(var(--vt-space-width-total) + var(--vt-width)) solid var(--vt-color) !important;
}

#main-window[inFullscreen="true"] #content-deck {
border-right: 0 !important;
}

#main-window[inFullscreen="true"] #vertical-toolbar-toolbox {
  visibility: collapse !important;
}

#vertical-toolbar-toolbox {
  position: fixed;
  direction: rtl;
  right: calc(var(--vt-width) + var(--vt-space-width-total));
  height: calc(var(--vt-width) + var(--vt-space-width-total));
  transform-origin: top right;
  transform: rotate(-90deg);
  background-color: var(--vt-color);
  display: inline-flex;
  flex-direction: row;
}

#vertical-toolbar {
  position: relative;
  -moz-appearance: toolbar !important;
  display: inline-flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-content: space-evenly;
  align-items: center;
  flex: 0 0 auto;
}

#vertical-toolbar toolbarbutton {
  -moz-appearance: toolbarbutton !important;
  --toolbarbutton-inner-padding: var(--vt-button-padding) !important;
  --toolbarbutton-outer-padding: 0px !important;
  --toolbarbutton-hover-background: var(--vt-hover-color) !important;
  --toolbarbutton-active-background: var(--vt-active-color) !important;
  transform: rotate(90deg);
  transform-origin: 50% 50%;
  flex: 0 0 auto;
  margin: 0 var(--vt-space-height) !important;
}

#vertical-toolbar .toolbaritem-combined-buttons {
  display: inline-flex !important;
  justify-content: center;
  align-items: center;
}

#vertical-toolbar .toolbaritem-combined-buttons toolbarbutton {
  flex: 0 1 auto;
}

#vertical-toolbar toolbarbutton:hover {
  --toolbarbutton-active-background: var(--vt-active-hover-color) !important;
}

#vertical-toolbar-toolbox {
  overflow-x: scroll;
  overflow-y: hidden;
}

#vertical-toolbar-toolbox scrollbar {
  display: none !important;
}`;

  const sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
  const uri = makeURI("data:text/css;charset=UTF=8," + encodeURIComponent(css));
  sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);

  function scrollAlter() {
    "use strict";

    const contentDeck = document.getElementById("content-deck");

    toolbox.addEventListener("DOMMouseScroll", function (e) {
      const delta = Math.max(-1, Math.min(1, -e.detail));
      toolbox.scrollLeft += (delta * 40); //Change this value if you find the vertical scrolling is too fast or too slow
      if (toolbox.style.width != contentDeck.clientHeight + "px") {
        toolbox.style.width = contentDeck.clientHeight + "px";
      }
      e.preventDefault();
    }, false);

    window.addEventListener("resize", function () {
      toolbox.style.width = contentDeck.clientHeight + "px";
    });
  }
  scrollAlter();
})();
