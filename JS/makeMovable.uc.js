// // ==UserScript==
// // @name     Make movable
// // @description     Makes extensions and menu buttons customizable
// // ==/UserScript==
//
// (function () {
//   try {
//     // extensions button wrapper
//     UC_API.Utils.createWidget({
//       id: "movable-extensions-button",
//       label: "Extensions button",
//       image: "chrome://mozapps/skin/extensions/extension.svg",
//       type: "toolbaritem",
//     });
//   } catch (e) {
//     console.error("Error creating movable-extensions-button:", e);
//   }
//
//   try {
//     // menu button wrapper
//     UC_API.Utils.createWidget({
//       id: "movable-menu-button",
//       label: "Menu button",
//       image: "chrome://browser/skin/menu.svg",
//       type: "toolbaritem",
//     });
//   } catch (e) {
//     console.error("Error creating movable-menu-button:", e);
//   }
//
//   function main(win) {
//     if (win.document.documentElement.getAttribute("chromehidden") != "") return; // return if window is not full
//
//     win.UC_API.Windows.waitWindowLoading(win).then((window) => {
//       const doc = window.document;
//       function $(id) {
//         return doc.getElementById(id);
//       }
//
//       function initButtons() {
//         const extBtn = $("movable-extensions-button");
//         const unifiedExtBtn = $("unified-extensions-button");
//         const menuBtn = $("movable-menu-button");
//         const panelMenuBtn = $("PanelUI-menu-button");
//         const panelUIButton = $("PanelUI-button");
//
//         if (extBtn && unifiedExtBtn) {
//           if (!isChild(extBtn, "unified-extensions-button")) {
//             extBtn.appendChild(unifiedExtBtn);
//           }
//         } else if (panelUIButton && unifiedExtBtn) {
//           panelUIButton.appendChild(unifiedExtBtn);
//         }
//
//         if (menuBtn && panelMenuBtn) {
//           if (!isChild(menuBtn, "PanelUI-menu-button")) {
//             menuBtn.appendChild(panelMenuBtn);
//           }
//         } else if (panelUIButton && panelMenuBtn) {
//           panelUIButton.appendChild(panelMenuBtn);
//         }
//       }
//
//       function prepareCustomize() {
//         const panelUIButton = $("PanelUI-button");
//         const panelMenuBtn = $("PanelUI-menu-button");
//         const unifiedExtBtn = $("unified-extensions-button");
//         if (panelUIButton && panelMenuBtn) {
//           panelUIButton.appendChild(panelMenuBtn);
//         }
//         if (panelUIButton && unifiedExtBtn) {
//           panelUIButton.appendChild(unifiedExtBtn);
//         }
//       }
//
//       function isInUI(id) {
//         for (let target of doc.querySelectorAll(".customization-target")) {
//           if (isChild(target, id)) {
//             return true;
//           }
//         }
//         return false;
//       }
//
//       function isChild(parent, id) {
//         if (!parent) return false;
//         return !!parent.querySelector(`#${id}`);
//       }
//
//       initButtons();
//       window.gNavToolbox.addEventListener(
//         "customizationstarting",
//         prepareCustomize,
//       );
//       window.gNavToolbox.addEventListener("aftercustomization", initButtons);
//     });
//   }
//
//   // run
//   main(window);
// })();
