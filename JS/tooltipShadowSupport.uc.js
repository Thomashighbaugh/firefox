// ==UserScript==
// @name           Tooltip Shadow Support
// @version        1.0
// @author         aminomancer
// @homepage       https://github.com/aminomancer/uc.css.js
// @description    This script enhances tooltip styling by enabling box shadows
// and borders on tooltips with awkward structures, like those using -moz-popup.
// It does this by placing tooltips inside another container, allowing for
// visible shadows and borders. Note that for native-anonymous tooltips,
// userChrome.ag.css must be edited directly. To disable borders, avoid this
// script and set userChrome.css.remove-tooltip-borders to true in about:config.
// ==/UserScript==

(function () {
  function create(aDoc, tag, props, isHTML = false) {
    let el = isHTML ? aDoc.createElement(tag) : aDoc.createXULElement(tag);
    for (let prop in props) el.setAttribute(prop, props[prop]);
    return el;
  }
  [
    document.getElementById("back-button-tooltip"),
    document.getElementById("forward-button-tooltip"),
  ].forEach((tip) => {
    let box = create(document, "vbox", {
      id: tip.id + "-box",
      class: "uc-tooltip-box",
      flex: 1,
    });
    Array.from(tip.children).forEach((elt) => box.appendChild(elt));
    tip.appendChild(box);
    tip.setAttribute("shadow-support", true);
  });
  document.documentElement.setAttribute("tooltip-shadow-support", true);
})();
