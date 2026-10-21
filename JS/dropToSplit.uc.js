// ==UserScript==
// @name           Drop to Split
// @description    Drag a tab onto the content area and drop it on the left/right
//                 half to split it with the current tab (native 2-pane split view).
//                 Adds a "Split with current tab" item to the tab context menu.
// @include        main
// @onlyonce
// ==/UserScript==

// Lane 1 (stock Firefox 157). Detaching a tab to a new window happens on `dragend`
// (fired on the tab strip), NOT on a content-area `drop`. So drop-to-split must
// intercept `dragend`, decide the side from the drop position over the content
// area, and call `gBrowser.addTabSplitView` before the native detach runs.
// 2×2 grid is deferred to the fork — native split view is 2-pane.

(function () {
  "use strict";

  if (location.href !== "chrome://browser/content/browser.xhtml") return;

  const PREF = "userchrome.dropToSplit.enabled";
  const XULNS = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";

  const prefOn = () => {
    try {
      return Services.prefs.getBoolPref(PREF, true);
    } catch (e) {
      return true;
    }
  };

  /* --------------------------- dragged tab tracking --------------------------- */
  let draggedTab = null;
  let dropSide = null; // "left" | "right" | null — set by dragover, used on dragend
  let overlay = null;

  function onStripDragStart(e) {
    const tab = e.target?.closest?.("tab");
    draggedTab = tab || null;
  }

  /* ------------------------------ drop overlay ------------------------------- */
  function buildOverlay() {
    const tabbox = document.getElementById("tabbrowser-tabbox");
    if (!tabbox) return null;
    overlay = document.createXULElement("vbox");
    overlay.id = "dropToSplitOverlay";
    overlay.setAttribute("hidden", "true");
    overlay.setAttribute("pack", "center");
    const row = document.createXULElement("hbox");
    row.setAttribute("flex", "1");
    row.style.cssText = "display:flex;flex:1;pointer-events:none;";
    const mk = (label, side) => {
      const z = document.createXULElement("vbox");
      z.className = "dropToSplitZone";
      z.dataset.side = side;
      z.setAttribute("flex", "1");
      z.setAttribute("pack", "center");
      z.setAttribute("align", "center");
      z.style.cssText =
        "flex:1;display:flex;align-items:center;justify-content:center;" +
        "background:rgba(20,120,255,0.12);border:2px dashed rgba(120,180,255,0.55);margin:4px;border-radius:8px;";
      const l = document.createXULElement("label");
      l.value = label;
      l.style.cssText = "color:#bcd6ff;font-size:1.1em;pointer-events:none;";
      z.appendChild(l);
      return z;
    };
    row.appendChild(mk("◀ Split left", "left"));
    row.appendChild(mk("Split right ▶", "right"));
    overlay.appendChild(row);
    overlay.style.cssText =
      "position:relative;display:flex;pointer-events:none;" +
      "background:transparent;z-index:5;";
    tabbox.appendChild(overlay);
    return overlay;
  }

  function showOverlay() {
    if (!overlay) overlay = buildOverlay();
    if (overlay) overlay.removeAttribute("hidden");
  }
  function hideOverlay() {
    overlay?.setAttribute("hidden", "true");
  }

  // Which side of the content area is the cursor over (during dragover)?
  function sideFromClientX(clientX) {
    const panels = document.getElementById("tabbrowser-tabpanels");
    if (!panels) return null;
    const r = panels.getBoundingClientRect();
    if (clientX < r.left || clientX > r.right) return null;
    return clientX < r.left + r.width / 2 ? "left" : "right";
  }

  function onContentDragOver(e) {
    if (!draggedTab || !prefOn()) return;
    // Only when the drag is actually over the content area.
    const panels = document.getElementById("tabbrowser-tabpanels");
    if (!panels) return;
    const r = panels.getBoundingClientRect();
    const over =
      e.clientX >= r.left && e.clientX <= r.right &&
      e.clientY >= r.top && e.clientY <= r.bottom;
    if (!over) {
      dropSide = null;
      hideOverlay();
      return;
    }
    showOverlay();
    dropSide = sideFromClientX(e.clientX);
  }

  /* ------------------------------- split action ------------------------------- */
  function doSplit(side) {
    const tab = draggedTab;
    if (!tab || !window.gBrowser) return;
    const cur = gBrowser.selectedTab;
    if (tab === cur || tab.pinned) return;
    // Order determines left/right in the native split view.
    const tabs = side === "left" ? [tab, cur] : [cur, tab];
    try {
      gBrowser.addTabSplitView(tabs, { trigger: "drop" });
    } catch (e) {
      try { gBrowser.addTabSplitView(tabs, {}); } catch (e2) { /* give up */ }
    }
  }

  // Detach-to-new-window happens in this same event. We run first (capture) and,
  // if the drop landed on a content zone, split and mark the drop so the native
  // handler skips the detach.
  function onStripDragEnd(e) {
    const side = dropSide;
    const tab = draggedTab;
    hideOverlay();
    dropSide = null;
    if (tab && side && prefOn()) {
      doSplit(side);
      // Prevent the native detach: signal "handled" on the dataTransfer.
      try {
        if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
      } catch (e2) { /* noop */ }
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
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
    const anchor = menu.querySelector("#context_moveSplitViewToNewGroup, #context_unPinTab");
    menu.insertBefore(item, anchor ? anchor.nextSibling : null);
    menu.addEventListener("popupshowing", onMenuShowing);
  }

  function onMenuShowing() {
    const item = document.getElementById(MENU_ID);
    if (!item) return;
    const tab = window.TabContextMenu?.contextTab;
    item.hidden = !(tab && tab !== gBrowser.selectedTab && !tab.pinned && !tab.splitview);
  }

  /* --------------------------------- lifecycle -------------------------------- */
  function init() {
    const strip = gBrowser.tabContainer;
    const content = document.getElementById("browser");
    if (!strip || !content) return;

    strip.addEventListener("dragstart", onStripDragStart, true);
    // Capture-phase dragend so we act before the native detach handler.
    strip.addEventListener("dragend", onStripDragEnd, true);
    content.addEventListener("dragover", onContentDragOver, true);
    content.addEventListener("drop", (e) => {
      // If a drop somehow fires on content (shouldn't for tabs), treat as handled.
      if (draggedTab && prefOn()) {
        hideOverlay();
        const side = dropSide || sideFromClientX(e.clientX);
        if (side) {
          doSplit(side);
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
        }
        dropSide = null;
        draggedTab = null;
      }
    }, true);

    buildMenuItem();
  }

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
      document.getElementById("browser")?.removeEventListener("dragover", onContentDragOver, true);
    } catch (e) { /* noop */ }
  }, { once: true });
})();
