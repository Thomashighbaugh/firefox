// ==UserScript==
// @name     Make movable
// @description     Makes extensions and menu buttons customizable
// ==/UserScript==

(function () {
  try {
    // extensions button wrapper
    UC_API.Utils.createWidget({
      id: "movable-extensions-button",
      label: "Extensions button",
      image: "chrome://mozapps/skin/extensions/extension.svg",
      type: "toolbaritem",
    });
  } catch (e) {}

  try {
    // menu button wrapper
    UC_API.Utils.createWidget({
      id: "movable-menu-button",
      label: "Menu button",
      image: "chrome://browser/skin/menu.svg",
      type: "toolbaritem",
    });
  } catch (e) {}

  function main(window) {
    if (window.document.documentElement.getAttribute("chromehidden") != "")
      return; // return if window is not full

    window.UC_API.Windows.waitWindowLoading(window).then((window) => {
      initButtons();
      window.gNavToolbox.addEventListener(
        "customizationstarting",
        prepareCustomize,
      );
      window.gNavToolbox.addEventListener("aftercustomization", initButtons);
    });
  }

  const doc = window.document;
  function $(id) {
    return doc.getElementById(id);
  }

  function initButtons() {
    if (isInUI("movable-extensions-button")) {
      if (
        !isChild($("movable-extensions-button"), "unified-extensions-button")
      ) {
        $("movable-extensions-button").appendChild(
          $("unified-extensions-button"),
        );
      }
    } else $("PanelUI-button").appendChild($("unified-extensions-button"));

    if (isInUI("movable-menu-button")) {
      if (!isChild($("movable-menu-button"), "PanelUI-menu-button")) {
        $("movable-menu-button").appendChild($("PanelUI-menu-button"));
      }
    } else $("PanelUI-button").appendChild($("PanelUI-menu-button"));
  }

  function prepareCustomize() {
    $("PanelUI-button").appendChild($("PanelUI-menu-button"));
    $("PanelUI-button").appendChild($("unified-extensions-button"));
  }

  function isInUI(id) {
    for (let target of doc.querySelectorAll(".customization-target")) {
      if (isChild(target, id)) {
        return true;
      }
    }
    return false;
  }

  function isChild(parent, id) {
    return !!parent.querySelector(`#${id}`);
  }

  // run
  main(window);
})();
