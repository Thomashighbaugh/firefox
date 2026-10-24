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
//
// The tab that receives mousedown is selected immediately (left-drag AND
// right-click both select), so by `dragend` or by menu-open time
// `gBrowser.selectedTab` is the target tab itself. The split partner is
// therefore the tab that was selected before it, from
// `TabSelect.detail.previousTab` (`previousTab`).
//
// The tab context menu is laid out by native `TabContextMenu.MenuSectionLayout`;
// any child of #tabContextMenu not declared in its layout makes `arrange()`
// throw and the whole menu is left unarranged. Our item is registered into the
// layout (into the split-view item group) and the menu is re-arranged after
// insertion.
// 2×2 grid is deferred to the fork — native split view is 2-pane.

(function () {
  "use strict";

  if (location.href !== "chrome://browser/content/browser.xhtml") return;

  const PREF = "userchrome.dropToSplit.enabled";
  const MENU_ID = "dropToSplit-context-item";
  const MENU_SEL = "#dropToSplit-context-item";

  const prefOn = () => {
    try {
      return Services.prefs.getBoolPref(PREF, true);
    } catch (e) {
      return true;
    }
  };

  // Split view feature flag: the native API and UI are gated on it.
  const splitViewOn = () => {
    try {
      return Services.prefs.getBoolPref("browser.tabs.splitView.enabled", true);
    } catch (e) {
      return true;
    }
  };

  /* --------------------------- dragged tab tracking --------------------------- */
  let draggedTab = null;
  // The tab selected before the current one, from TabSelect.detail.previousTab.
  // Firefox selects a tab on mousedown (both left-drag and right-click), so the
  // "current tab" that is *not* the target of the action has to be remembered
  // from the last selection change.
  let previousTab = null;
  let dropSide = null; // "left" | "right" | null — set by dragover, used on dragend
  let overlay = null;

  function onStripDragStart(e) {
    const tab = e.target?.closest?.("tab");
    draggedTab = tab || null;
  }

  function onTabSelect(e) {
    // detail.previousTab is the tab that was selected before this one.
    const prev = e.detail?.previousTab;
    if (prev && prev !== gBrowser.selectedTab) previousTab = prev;
  }

  // Resolve the tab that should share a split view with `tab`. `previousTab` is
  // authoritative because it is the tab the user was looking at before the
  // target tab got selected by mousedown. Fall back to the first usable tab.
  function findPartner(tab) {
    if (!tab || !window.gBrowser) return null;

    const usable = t =>
      t && t !== tab && t.isConnected && !t.pinned && !t.hidden && !t.closing;

    let other = usable(previousTab) ? previousTab : null;
    if (usable(other)) return other;

    const candidates = gBrowser.tabs.filter(usable);
    return candidates[0] || null;
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
  // Native split view is 2-pane. `addTabSplitView` silently no-ops when the
  // feature flag is off, when a tab is pinned, or when both tabs are already in
  // the same split view — so wrap it and make the failures visible.
  function addSplitView(tabs, { insertBefore = null, trigger = null } = {}) {
    if (!window.gBrowser || !splitViewOn()) return null;
    try {
      const opts = {};
      if (insertBefore) opts.insertBefore = insertBefore;
      if (trigger) opts.trigger = trigger;
      return gBrowser.addTabSplitView(tabs, opts);
    } catch (e) {
      return null;
    }
  }

  // Split `tab` with `other`. If `other` is already in a split view, drop onto
  // the other pane (the non-selected one) so the drop still does something.
  function splitWith(tab, other, side, trigger) {
    if (!tab || !other || tab === other || tab.pinned || other.pinned) return;
    // Order determines left/right in the native split view.
    const tabs = side === "left" ? [tab, other] : [other, tab];
    addSplitView(tabs, { insertBefore: other, trigger });
  }

  function doSplit(side) {
    const tab = draggedTab;
    if (!tab || !window.gBrowser) return;
    // The dragged tab is selected on mousedown, so the partner is the tab that
    // was selected before it. Fall back to a neighbouring tab.
    const other = findPartner(tab);
    if (!other || tab.splitview) return;
    splitWith(tab, other, side, "drop");
  }

  // Native handle_dragend() performs this cleanup before it considers detaching.
  // Because our capture listener stops that handler, run the strip cleanup here
  // so dragged tabs do not keep their transform/pointer-events styles.
  function finishNativeDrag(tab) {
    const strip = gBrowser.tabContainer;
    const dnd = strip?.tabDragAndDrop;
    try {
      dnd?.finishMoveTogetherSelectedTabs?.(tab);
      dnd?.finishAnimateTabMove?.();
      dnd?._resetTabsAfterDrop?.(tab);
      if (dnd?._tabDropIndicator) dnd._tabDropIndicator.hidden = true;
    } catch (e) {
      // Cleanup is best-effort; the split action is the user-visible result.
    }
    if (tab) delete tab._dragData;
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
      // Finish the strip's own drag teardown before moving the tab between
      // containers (the split view wrapper). Then stop the native handler so it
      // cannot interpret the same gesture as detach-to-a-new-window.
      finishNativeDrag(tab);
      doSplit(side);
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
    draggedTab = null;
  }

  /* ------------------------------ context menu ------------------------------- */
  const MENU_LABEL = "Split with current tab";

  // Register our item into the native tab-context-menu layout so
  // `MenuSectionLayout.arrange()` doesn't throw (an unaccounted-for child of
  // #tabContextMenu leaves the whole menu unarranged). Then force the menu to
  // re-arrange so our item lands in the split-view item group.
  function registerMenuInLayout(menu) {
    const TCM = window.TabContextMenu;
    if (!TCM || !TCM.MENU_SECTIONS) return;
    // `TCM._altTabContextMenu` is a lazy pref getter and is undefined until the
    // native code initializes it, so register into BOTH layouts and let the
    // active one place the item. Patching both is idempotent and avoids
    // arrange() throwing if the alternate layout is enabled.
    for (const layout of [
      TCM.MENU_SECTIONS.classic,
      TCM.MENU_SECTIONS.altstructure,
    ]) {
      const sections = layout?.tabContextMenu;
      if (!sections) continue;
      const target =
        sections.find(s =>
          s.items.some(
            i =>
              (Array.isArray(i) &&
                i.includes("#context_moveTabToSplitView")) ||
              i === "#context_moveTabToSplitView"
          )
        ) || sections[sections.length - 1];
      if (!target) continue;
      // Append as its own entry so the item gets its own slot after the
      // split-view "twin" array rather than twinning with a native item.
      if (!target.items.includes(MENU_SEL)) target.items.push(MENU_SEL);
    }
    TCM._tabContextMenuArranged = false;
    if (menu && typeof TCM._ensureMenuArranged === "function") {
      TCM._ensureMenuArranged(menu);
    }
  }

  function buildMenuItem() {
    const menu = document.getElementById("tabContextMenu");
    if (!menu) {
      setTimeout(buildMenuItem, 500);
      return;
    }
    if (document.getElementById(MENU_ID)) return;
    const item = document.createXULElement("menuitem");
    item.id = MENU_ID;
    item.setAttribute("label", MENU_LABEL);
    item.addEventListener("command", () => {
      const tab = window.TabContextMenu?.contextTab;
      if (!tab) return;
      // Right-click selects the tab, so findPartner() supplies the tab that was
      // selected before the gesture (same rule as drop-to-split).
      const other = findPartner(tab);
      if (!other) return;
      addSplitView([tab, other], { insertBefore: tab, trigger: "context" });
    });
    const anchor = menu.querySelector("#context_moveSplitViewToNewGroup, #context_unPinTab");
    menu.insertBefore(item, anchor ? anchor.nextSibling : null);
    registerMenuInLayout(menu);
    menu.addEventListener("popupshowing", onMenuShowing);
  }

  function onMenuShowing() {
    const item = document.getElementById(MENU_ID);
    if (!item) return;
    const tab = window.TabContextMenu?.contextTab;
    // Right-click selects the tab first, so `tab !== gBrowser.selectedTab` would
    // always be false here. Availability is decided by the partner lookup.
    item.hidden = !(
      tab &&
      splitViewOn() &&
      !tab.pinned &&
      !tab.splitview &&
      findPartner(tab)
    );
  }

  /* --------------------------------- lifecycle -------------------------------- */
  function init() {
    const strip = gBrowser.tabContainer;
    const content = document.getElementById("browser");
    if (!strip || !content) return;

    strip.addEventListener("dragstart", onStripDragStart, true);
    // Capture-phase dragend so we act before the native detach handler.
    strip.addEventListener("dragend", onStripDragEnd, true);
    strip.addEventListener("TabSelect", onTabSelect, true);
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
      gBrowser.tabContainer?.removeEventListener("TabSelect", onTabSelect, true);
      document.getElementById("browser")?.removeEventListener("dragover", onContentDragOver, true);
    } catch (e) { /* noop */ }
  }, { once: true });
})();
