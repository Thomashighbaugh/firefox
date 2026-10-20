// ==UserScript==
// @name           Workspaces (native tab-group based)
// @description    Zen-style, per-window workspaces built on Firefox's native tab groups. A workspace is a tab group plus a catch-all "Session" for ungrouped tabs. Switching is mutually exclusive and uses native group collapse (NOT hideTab), so every tab stays in the session and survives restart/crash. Collapse state is persisted natively by SessionStore.
// @author         Thomas Leon Highbaugh
// @version        2.0.0
// @include        main
// ==/UserScript==

(function () {
  "use strict";

  const SESSION_ID = "__session__";
  const SESSION_NAME = "Session";

  const debug = (...a) => {
    if (Services.prefs.getBoolPref("userchrome.home.debug", false)) {
      console.log("[workspaces]", ...a);
    }
  };

  function groupElements() {
    const container = gBrowser.tabContainer;
    const set = new Set();
    if (container) for (const g of container.querySelectorAll("tab-group")) set.add(g);
    for (const t of gBrowser.tabs) if (t.group) set.add(t.group);
    return [...set];
  }

  /** All workspaces in THIS window: one per tab group, plus the catch-all "Session". */
  function list() {
    const groups = groupElements();
    const out = groups.map((g) => ({
      id: g.id,
      name: g.name || "Workspace",
      color: g.color,
      kind: "group",
      collapsed: g.collapsed,
      tabs: [...g.tabs],
      group: g,
    }));
    const ungrouped = [...gBrowser.tabs].filter((t) => !t.group);
    out.push({
      id: SESSION_ID,
      name: SESSION_NAME,
      kind: "session",
      collapsed: groups.length > 0 && groups.every((g) => g.collapsed),
      tabs: ungrouped,
    });
    return out;
  }

  /**
   * The active workspace of THIS window. Derived from live state (there is no
   * global pref): the single expanded group is active; if every group is
   * collapsed, the catch-all "Session" is active. If more than one group is
   * expanded (drift), the one holding the selected tab wins.
   */
  function activeId() {
    const groups = groupElements();
    const expanded = groups.filter((g) => !g.collapsed);
    if (!expanded.length) return SESSION_ID;
    if (expanded.length === 1) return expanded[0].id;
    const sel = gBrowser.selectedTab;
    const withSel = expanded.find((g) => sel && sel.group && sel.group.id === g.id);
    return (withSel ?? expanded[0]).id;
  }

  /** Collapse every group except `keepId` (null = collapse all). Never hides. */
  function collapseOthers(keepId) {
    for (const g of groupElements()) {
      const shouldCollapse = g.id !== keepId;
      if (g.collapsed !== shouldCollapse) g.collapsed = shouldCollapse;
    }
  }

  /** Ensure at most one group is expanded (mutual exclusion). Collapse-only, so
   *  it is always session-safe. */
  function normalizeExclusivity() {
    const groups = groupElements();
    const expanded = groups.filter((g) => !g.collapsed);
    if (expanded.length <= 1) return;
    const sel = gBrowser.selectedTab;
    const keep =
      expanded.find((g) => sel && sel.group && sel.group.id === g.id) ?? expanded[0];
    collapseOthers(keep.id);
    debug("normalized exclusivity -> keeping", keep.id);
  }

  /**
   * Switch to a workspace in this window: expand it, collapse the rest.
   * `SESSION_ID` collapses every group (ungrouped tabs remain visible).
   * Session-safe: uses native group collapse, never hideTab.
   */
  function switchTo(id) {
    if (id === SESSION_ID) {
      collapseOthers(null);
    } else {
      const groups = groupElements();
      const target = groups.find((g) => g.id === id);
      if (!target) return;
      collapseOthers(id);
      // If the selected tab is now inside a collapsed group, surface one of the
      // target group's tabs so the window is not left on a hidden selection.
      const sel = gBrowser.selectedTab;
      if (sel && sel.group && sel.group.id !== id) {
        const pick = target.tabs[0] ?? [...gBrowser.tabs].find((t) => t.pinned);
        if (pick) gBrowser.selectedTab = pick;
      }
    }
    debug("switched to", id, "(active =", activeId() + ")");
  }

  /** Create a workspace (tab group) containing the current tab. */
  function create(name = "") {
    const tab = gBrowser.selectedTab;
    if (!tab) return null;
    const group = gBrowser.addTabGroup([tab], { label: name });
    if (group) switchTo(group.id);
    return group;
  }

  /** Move `tab` into the workspace `id`. SESSION_ID ungroups it. */
  function moveTab(tab, id) {
    if (!tab) return;
    try {
      if (id === SESSION_ID) {
        if (tab.group) gBrowser.ungroupTab(tab);
      } else {
        const group = groupElements().find((g) => g.id === id);
        if (group) group.addTabs([tab]);
      }
      // Keep the moved tab visible if it landed in the active workspace.
      if (id !== SESSION_ID && id === activeId()) {
        tab.group.collapsed = false;
      }
    } catch (e) {
      debug("moveTab failed:", e);
    }
  }

  /** Keep new tabs inside the active workspace. */
  function onTabOpen(event) {
    const tab = event.target;
    if (tab.pinned) return;
    const id = activeId();
    if (id === SESSION_ID) return;
    const group = groupElements().find((g) => g.id === id);
    if (group && !tab.group) {
      try {
        group.addTabs([tab]);
      } catch (e) {
        /* ignore */
      }
    }
  }

  /** On restore: do NOT hide anything. Only normalize drift so at most one group
   *  is expanded. Collapse state itself is restored natively by SessionStore. */
  function apply() {
    normalizeExclusivity();
    debug("apply: active =", activeId());
  }

  function onKey(event) {
    if (!event.ctrlKey || !event.altKey) return;
    const m = /^Digit([0-9])$/.exec(event.code);
    if (!m) return;
    event.preventDefault();
    event.stopPropagation();
    if (m[1] === "0") {
      switchTo(SESSION_ID);
      return;
    }
    const groups = list().filter((w) => w.kind === "group");
    const target = groups[parseInt(m[1], 10) - 1];
    if (target) switchTo(target.id);
  }

  gBrowser.tabContainer.addEventListener("TabOpen", onTabOpen);
  window.addEventListener("keydown", onKey, true);

  const restoredObserver = {
    observe() {
      apply();
    },
  };
  Services.obs.addObserver(restoredObserver, "sessionstore-windows-restored");

  window.HiggsWorkspaces = {
    list,
    switchTo,
    create,
    moveTab,
    apply,
    activeId,
    SESSION_ID,
    SESSION_NAME,
  };

  // If the window already finished startup (script loaded late), apply now.
  if (window.gBrowserInit?.delayedStartupFinished) {
    apply();
  }

  window.addEventListener(
    "unload",
    () => {
      gBrowser.tabContainer.removeEventListener("TabOpen", onTabOpen);
      window.removeEventListener("keydown", onKey, true);
      Services.obs.removeObserver(restoredObserver, "sessionstore-windows-restored");
      delete window.HiggsWorkspaces;
    },
    { once: true },
  );
})();