// ==UserScript==
// @name           Drop to Split
// @description    Drag a tab onto the content area and drop it on the left/right
//                 half to split it with the current tab (native 2-pane split view).
//                 Adds a "Split with…" item to the tab context menu too.
// @include        main
// @onlyonce
// ==/UserScript==

// Lane 1 (stock Firefox 157). Drop-to-split uses content-area drop zones that
// appear while a tab is being dragged over the page; dropping on the left half
// splits the dragged tab to the left of the current tab, right half to the right.
// 2×2 grid is deferred to the fork (Lane 2/3) — native split view is 2-pane.

(function () {
  "use strict";

  if (location.href !== "chrome://browser/content/browser.xhtml") return;

  const PREF = "userchrome.dropToSplit.enabled";
  const XULNS = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";
  const DROP_TYPE = "application/x-moz-tabbrowser-tab";

  const prefOn = () => {
    try {
      return Services.prefs.getBoolPref(PREF, true);
    } catch (e) {
      return true;
    }
  };

  /* --------------------------- dragged tab tracking --------------------------- */
  let draggedTab = null;

  function onStripDragStart(e) {
    // Capture phase on the tab strip: record the tab being dragged.
    const tab = e.target?.closest?.("tab");
    if (tab) draggedTab = tab;
  }
  function onStripDragEnd() {
    // Clear after the drag resolves (drop or cancel).
    draggedTab = null;
    hideOverlay();
  }

  /* ------------------------------ drop overlay ------------------------------ */
  let overlay = null;
  let zoneEl = null;

  function buildOverlay() {
    const host = document.getElementById("browser");
    if (!host) return null;
    overlay = document.createXULElement("box");
    overlay.id = "dropToSplitOverlay";
    overlay.setAttribute("hidden", "true");
    overlay.style.cssText =
      "position:relative;display:flex;" +
      "-moz-window-dragging:no-drag;";
    const mk = (label) => {
      const z = document.createXULElement("vbox");
      z.className = "dropToSplitZone";
      z.setAttribute("flex", "1");
      z.style.cssText =
        "flex:1;display:flex;align-items:center;justify-content:center;" +
        "background:rgba(0,0,0,0.25);border:2px dashed rgba(255,255,255,0.4);";
      const l = document.createXULElement("label");
      l.value = label;
      l.style.cssText = "color:#fff;font-size:1.2em;pointer-events:none;";
      z.appendChild(l);
      return z;
    };
    const left = mk("Split left");
    const right = mk("Split right");
    left.dataset.side = "left";
    right.dataset.side = "right";
    overlay.appendChild(left);
    overlay.appendChild(right);
    host.appendChild(overlay);
    return overlay;
  }

  function showOverlay() {
    if (!overlay) overlay = buildOverlay();
    if (overlay) overlay.removeAttribute("hidden");
  }
  function hideOverlay() {
    overlay?.setAttribute("hidden", "true");
  }

  function zoneFromEvent(e) {
    const z = e.target?.closest?.(".dropToSplitZone");
    return z || null;
  }

  /* ------------------------------- split action ------------------------------- */
  function splitTabs(tab, side) {
    if (!tab || !window.gBrowser) return;
    const cur = gBrowser.selectedTab;
    if (tab === cur) return;
    // Native split view: order determines left/right.
    const tabs = side === "left" ? [tab, cur] : [cur, tab];
    try {
      gBrowser.addTabSplitView(tabs, { trigger: "drop" });
    } catch (e) {
      // Fall back: adopt the dragged tab next to the current one, then split.
      try {
        gBrowser.addTabSplitView(tabs, {});
      } catch (e2) { /* give up */ }
    }
  }

  function onContentDragOver(e) {
    // Only react while a tab drag is in progress over the content area.
    if (!draggedTab) return;
    const dt = e.dataTransfer;
    if (dt && !dt.mozTypesAt?.(0)?.length && !dt.types?.includes(DROP_TYPE)) {
      // still show zones; detection is via draggedTab, not dataTransfer types
    }
    showOverlay();
    const z = zoneFromEvent(e);
    if (z) {
      zoneEl = z;
      dt && (dt.dropEffect = "move");
      e.preventDefault();
    } else {
      zoneEl = null;
    }
  }

  function onContentDrop(e) {
    if (!draggedTab) return;
    const z = zoneFromEvent(e);
    hideOverlay();
    if (!z) return;
    e.preventDefault();
    e.stopPropagation();
    splitTabs(draggedTab, z.dataset.side);
    draggedTab = null;
  }

  /* ------------------------------ context menu ------------------------------- */
  const MENU_ID = "dropToSplit-context-item";

  function buildMenuItem() {
    const menu = document.getElementById("tabContextMenu");
    if (!menu || document.getElementById(MENU_ID)) return;
    const item = document.createXULElement("menuitem");
    item.id = MENU_ID;
    item.setAttribute("label", "Split with current tab");
    item.addEventListener("command", () => {
      const tab = window.TabContextMenu?.contextTab;
      if (tab && tab !== gBrowser.selectedTab) {
        try {
          gBrowser.addTabSplitView([gBrowser.selectedTab, tab], { trigger: "context" });
        } catch (e) { /* noop */ }
      }
    });
    // Insert near the native split items if present, else append.
    const anchor = menu.querySelector("#context_moveSplitViewToNewGroup, #context_unPinTab");
    menu.insertBefore(item, anchor ? anchor.nextSibling : null);
    menu.addEventListener("popupshowing", onMenuShowing);
  }

  function onMenuShowing() {
    const item = document.getElementById(MENU_ID);
    if (!item) return;
    const tab = window.TabContextMenu?.contextTab;
    // Only show for a real, non-current, non-pinned tab.
    const show = !!tab && tab !== gBrowser.selectedTab && !tab.pinned && !tab.splitview;
    item.hidden = !show;
  }

  /* --------------------------------- lifecycle -------------------------------- */
  function init() {
    if (!prefOn()) return;
    const strip = gBrowser.tabContainer;
    const content = document.getElementById("browser");
    if (!strip || !content) return;

    strip.addEventListener("dragstart", onStripDragStart, true);
    strip.addEventListener("dragend", onStripDragEnd, true);
    content.addEventListener("dragover", onContentDragOver, true);
    content.addEventListener("drop", onContentDrop, true);
    content.addEventListener("dragleave", (e) => {
      if (e.target === content) hideOverlay();
    }, true);

    buildMenuItem();
  }

  // gBrowser may not be ready at parse time.
  if (window.gBrowser?.tabContainer) {
    init();
  } else {
    Services.obs.addObserver(function obs(subject) {
      if (subject === window && window.gBrowser?.tabContainer) {
        Services.obs.removeObserver(obs, "browser-delayed-startup-finished");
        init();
      }
    }, "browser-delayed-startup-finished");
  }

  window.addEventListener("unload", () => {
    try {
      gBrowser.tabContainer?.removeEventListener("dragstart", onStripDragStart, true);
      gBrowser.tabContainer?.removeEventListener("dragend", onStripDragEnd, true);
      const content = document.getElementById("browser");
      content?.removeEventListener("dragover", onContentDragOver, true);
      content?.removeEventListener("drop", onContentDrop, true);
    } catch (e) { /* noop */ }
  }, { once: true });
})();
