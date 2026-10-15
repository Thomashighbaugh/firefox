// ==UserScript==
// @name           Workspaces (native tab-group based)
// @description    Zen-style workspaces built on Firefox's native tab groups. A catch-all "Session" workspace holds ungrouped tabs; switching shows one workspace's tabs and hides the rest. Durable across sessions via a pref.
// @author         Thomas Leon Highbaugh
// @version        1.0.0
// @include        main
// ==/UserScript==

(function () {
  "use strict";

  const ACTIVE_PREF = "higgs.workspaces.active";
  const SESSION_ID = "__session__";
  const SESSION_NAME = "Session";

  const debug = (...a) => {
    if (Services.prefs.getBoolPref("higgs.home.debug", false)) {
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

  /** All workspaces: one per tab group, plus the catch-all "Session". */
  function list() {
    const out = groupElements().map((g) => ({
      id: g.id,
      name: g.name || "Workspace",
      color: g.color,
      kind: "group",
      tabs: [...g.tabs],
      group: g,
    }));
    const ungrouped = [...gBrowser.tabs].filter((t) => !t.group && !t.pinned);
    out.push({
      id: SESSION_ID,
      name: SESSION_NAME,
      kind: "session",
      tabs: ungrouped,
    });
    return out;
  }

  const activeId = () => Services.prefs.getStringPref(ACTIVE_PREF, SESSION_ID);

  /** Switch to a workspace: show its tabs, hide everything else. */
  function switchTo(id) {
    for (const tab of gBrowser.tabs) {
      if (tab.pinned) continue; // pinned tabs live in every workspace
      const inTarget =
        id === SESSION_ID ? !tab.group : tab.group && tab.group.id === id;
      if (inTarget) {
        if (tab.hidden) gBrowser.showTab(tab);
      } else if (!tab.hidden) {
        gBrowser.hideTab(tab, "workspaces");
      }
    }
    Services.prefs.setStringPref(ACTIVE_PREF, id);
    debug("switched to", id);
  }

  /** Create a workspace (tab group) containing the current tab. */
  function create(name = "") {
    const tab = gBrowser.selectedTab;
    if (!tab) return null;
    const group = gBrowser.addTabGroup([tab], { label: name });
    return group;
  }

  /** Keep new tabs inside the active workspace. */
  function onTabOpen(event) {
    const tab = event.target;
    const id = activeId();
    if (id === SESSION_ID || tab.pinned) return;
    const group = groupElements().find((g) => g.id === id);
    if (group && !tab.group) {
      try {
        group.addTabs([tab]);
      } catch (e) {
        /* ignore */
      }
    }
  }

  function apply() {
    switchTo(activeId());
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
