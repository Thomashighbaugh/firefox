// Home / new-tab page: All-Tabs-Menu content + Firefox View sections, as a
// tab-panel with a 5-column card grid. Runs as a privileged chrome:// document
// and reuses the same data sources as about:firefoxview.

const lazy = {};
ChromeUtils.defineESModuleGetters(lazy, {
  SyncedTabs: "resource://services-sync/SyncedTabs.sys.mjs",
  SessionStore: "moz-src:///browser/components/sessionstore/SessionStore.sys.mjs",
});

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function getChromeWindow() {
  const bc = window.browsingContext;
  return (
    bc?.topChromeWindow ??
    bc?.embedderWindowGlobal?.browsingContext?.window ??
    Services.wm.getMostRecentWindow("navigator:browser")
  );
}

function copyToClipboard(text) {
  try {
    Components.classes["@mozilla.org/widget/clipboardhelper;1"]
      .getService(Components.interfaces.nsIClipboardHelper)
      .copyString(text);
  } catch (e) {
    /* ignore */
  }
}

const FALLBACK_ICON = "chrome://global/skin/icons/defaultFavicon.svg";

/* ------------------------------------------------------------ card builder */

function buildCard({ title, url, image, badges = [], onActivate, onClose, menu }) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.text = `${title ?? ""} ${url ?? ""}`.toLowerCase();

  const icon = document.createElement("img");
  icon.className = "card-icon";
  icon.alt = "";
  icon.src = image || FALLBACK_ICON;
  card.appendChild(icon);

  const main = document.createElement("div");
  main.className = "card-main";
  const t = document.createElement("div");
  t.className = "card-title";
  t.textContent = title || url || "(untitled)";
  main.appendChild(t);
  if (url) {
    const u = document.createElement("div");
    u.className = "card-url";
    u.textContent = url;
    main.appendChild(u);
  }
  card.appendChild(main);

  if (badges.length) {
    const b = document.createElement("div");
    b.className = "card-badges";
    for (const label of badges) {
      const s = document.createElement("span");
      s.className = "badge";
      s.textContent = label;
      b.appendChild(s);
    }
    card.appendChild(b);
  }

  if (onClose) {
    const close = document.createElement("button");
    close.className = "card-close";
    close.type = "button";
    close.title = "Close tab";
    close.setAttribute("aria-label", "Close tab");
    close.textContent = "✕";
    close.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    });
    card.appendChild(close);
  }

  if (onActivate) {
    card.classList.add("card-activatable");
    card.addEventListener("click", (e) => {
      if (e.target.closest(".card-close")) return;
      onActivate();
    });
  }

  if (menu && menu.length) {
    card.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      e.stopPropagation();
      openContextMenu(e.clientX, e.clientY, menu);
    });
  }

  return card;
}

/* ------------------------------------------------------------ context menu UI */

const menuEl = $("#context-menu");

/**
 * @param {number} x
 * @param {number} y
 * @param {Array<{label:string, onSelect?:()=>void, disabled?:boolean, submenu?:Array}>} items
 * @param {Array|null} backItems  parent items (renders a "Back" entry when set)
 */
function openContextMenu(x, y, items, backItems = null) {
  menuEl.textContent = "";
  if (backItems) {
    const back = document.createElement("button");
    back.className = "context-menu-item context-menu-nav";
    back.type = "button";
    back.textContent = "‹ Back";
    back.addEventListener("click", () => openContextMenu(x, y, backItems));
    menuEl.appendChild(back);
    menuEl.appendChild(document.createElement("hr"));
  }
  for (const item of items) {
    const btn = document.createElement("button");
    btn.className = "context-menu-item";
    btn.type = "button";
    btn.setAttribute("role", "menuitem");
    btn.textContent = item.label;
    if (item.submenu) {
      btn.classList.add("has-submenu");
    }
    if (item.disabled) {
      btn.disabled = true;
    } else if (item.submenu) {
      btn.addEventListener("click", () => openContextMenu(x, y, item.submenu, items));
    } else {
      btn.addEventListener("click", () => {
        hideContextMenu();
        item.onSelect();
      });
    }
    menuEl.appendChild(btn);
  }
  menuEl.hidden = false;
  const rect = menuEl.getBoundingClientRect();
  menuEl.style.left = `${Math.max(4, Math.min(x, window.innerWidth - rect.width - 8))}px`;
  menuEl.style.top = `${Math.max(4, Math.min(y, window.innerHeight - rect.height - 8))}px`;
}

function hideContextMenu() {
  menuEl.hidden = true;
}

document.addEventListener("click", hideContextMenu);
document.addEventListener("contextmenu", (e) => {
  if (!e.target.closest(".card")) hideContextMenu();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") hideContextMenu();
});
window.addEventListener("blur", hideContextMenu);

/* ------------------------------------------------------------ actions */

function activate(tab, win) {
  if (tab.hidden) tab.hidden = false;
  win.gBrowser.selectedTab = tab;
  win.focus();
}

function openUrl(url, win) {
  if (!url) return;
  win.openTrustedLinkIn(url, "tab");
}

/** Restore a closed entry and return the new tab (or []). */
function restoreEntry(entry, win) {
  const res = lazy.SessionStore.undoCloseById(entry.closedId, win);
  const tab = res?.linkedBrowser ? res : win.gBrowser.selectedTab;
  return tab ? [tab] : [];
}

/** Open a synced URL as a new tab and return it (or []). */
function openSynced(url, win) {
  if (!url) return [];
  const tab = win.gBrowser.addTrustedTab(url);
  return tab ? [tab] : [];
}

/* ------------------------------------------------------------ tab groups */

function groupsOf(win) {
  // Collect <tab-group> elements from every plausible source so this works
  // regardless of layout (horizontal / vertical / re-parented strip).
  const set = new Set();
  const container = win.gBrowser?.tabContainer;
  if (container) {
    for (const g of container.querySelectorAll("tab-group")) set.add(g);
  }
  for (const g of win.document.querySelectorAll("tab-group")) set.add(g);
  for (const tab of win.gBrowser?.tabs ?? []) {
    if (tab.group) set.add(tab.group);
  }
  const out = [];
  for (const group of set) {
    const tabs = [...group.tabs];
    if (tabs.length) out.push({ group, tabs });
  }
  return out;
}

/**
 * Create a group for `tabs` and open the native tab-group editor so it can be
 * named. Passing a user-triggered metrics context makes Firefox dispatch
 * `TabGroupCreateByUser`, which opens the editor itself; we also open it
 * explicitly as a fallback.
 */
function createGroupWithEditor(win, tabs) {
  const gb = win.gBrowser;
  let metricsContext = null;
  try {
    metricsContext = gb.TabMetrics.userTriggeredContext(
      gb.TabMetrics.METRIC_SOURCE.TAB_MENU,
    );
  } catch (e) {
    metricsContext = null;
  }
  const group = gb.addTabGroup(tabs, metricsContext ? { metricsContext } : {});
  if (!group) {
    return;
  }
  Services.tm.dispatchToMainThread(() => {
    try {
      if (gb.tabGroupMenu?.panel?.state === "closed") {
        gb.tabGroupMenu.openCreateModal(group);
      }
    } catch (e) {
      /* ignore */
    }
  });
}

/**
 * Submenu that adds the resolved tab(s) to an existing group or a new one.
 * @param {object} win
 * @param {() => object[]} resolveTabs  returns the tab(s) to group
 */
function addToGroupSubmenu(win, resolveTabs) {
  const items = groupsOf(win).map(({ group }) => ({
    label: group.name || "Group",
    onSelect: () => {
      const tabs = resolveTabs();
      if (tabs.length) group.addTabs(tabs);
    },
  }));
  items.push({
    label: "New Group…",
    onSelect: () => {
      const tabs = resolveTabs();
      if (tabs.length) createGroupWithEditor(win, tabs);
    },
  });
  return { label: "Add to Tab Group", submenu: items };
}

/**
 * Submenu that moves the resolved tab(s) into a workspace (of this window).
 * Workspaces are the native tab groups plus the catch-all "Session".
 * @param {object} win
 * @param {() => object[]} resolveTabs  returns the tab(s) to move
 */
function moveToWorkspaceSubmenu(win, resolveTabs) {
  const api = win.HiggsWorkspaces;
  if (!api) return null;
  const active = api.activeId();
  const items = api.list().map((w) => ({
    label: `${w.name}${w.id === active ? "  ✓" : ""}`,
    onSelect: () => {
      for (const tab of resolveTabs()) api.moveTab(tab, w.id);
    },
  }));
  items.push({
    label: "New Workspace…",
    onSelect: () => {
      const tabs = resolveTabs();
      if (!tabs.length) return;
      const group = win.gBrowser.addTabGroup(tabs, {});
      const gb = win.gBrowser;
      Services.tm.dispatchToMainThread(() => {
        try {
          if (group && gb.tabGroupMenu?.panel?.state === "closed") {
            gb.tabGroupMenu.openCreateModal(group);
          }
        } catch (e) {
          /* ignore */
        }
      });
    },
  });
  return { label: "Move to Workspace", submenu: items };
}

/* ------------------------------------------------------------ per-source menus */

function tabMenu(tab, win) {
  const gb = win.gBrowser;
  const onTop = !!tab.pinned;
  const items = [
    { label: "Switch to Tab", onSelect: () => activate(tab, win) },
    { label: "Reload", onSelect: () => gb.reloadTab(tab) },
    { label: "Duplicate", onSelect: () => gb.duplicateTab(tab) },
    {
      label: onTop ? "Unpin Tab" : "Pin Tab",
      onSelect: () => (onTop ? gb.unpinTab(tab) : gb.pinTab(tab)),
    },
    { label: "Move to New Window", onSelect: () => gb.replaceTabWithWindow(tab) },
    {
      label: tab.muted ? "Unmute Tab" : "Mute Tab",
      onSelect: () => tab.toggleMuteAudio(),
    },
    { label: "Copy URL", onSelect: () => copyToClipboard(tab.linkedBrowser?.currentURI?.spec ?? "") },
    addToGroupSubmenu(win, () => [tab]),
  ];
  const wsMenu = moveToWorkspaceSubmenu(win, () => [tab]);
  if (wsMenu) items.push(wsMenu);
  if (tab.hidden) {
    items.unshift({
      label: "Unhide Tab",
      onSelect: () => (gb.showTab ? gb.showTab(tab) : (tab.hidden = false)),
    });
  }
  items.push(
    { label: "Close Tab", onSelect: () => gb.removeTab(tab) },
    { label: "Close Other Tabs", onSelect: () => gb.removeAllTabsBut(tab) },
  );
  return items;
}

function closedMenu(entry, win) {
  const items = [
    { label: "Restore Tab", onSelect: () => lazy.SessionStore.undoCloseById(entry.closedId) },
    addToGroupSubmenu(win, () => restoreEntry(entry, win)),
    { label: "Copy URL", onSelect: () => copyToClipboard(entry.url ?? "") },
  ];
  const wsMenu = moveToWorkspaceSubmenu(win, () => restoreEntry(entry, win));
  if (wsMenu) items.push(wsMenu);
  return items;
}

function syncedMenu(tab, win) {
  const items = [
    { label: "Open on This Device", onSelect: () => openUrl(tab.url, win) },
    addToGroupSubmenu(win, () => openSynced(tab.url, win)),
    { label: "Copy URL", onSelect: () => copyToClipboard(tab.url ?? "") },
  ];
  const wsMenu = moveToWorkspaceSubmenu(win, () => openSynced(tab.url, win));
  if (wsMenu) items.push(wsMenu);
  return items;
}

/* ------------------------------------------------------------ renderers */

const isHidden = (tab) => tab.hidden || tab.getAttribute("hidden") === "true";

function makeTabCard(tab, win) {
  const url = tab.linkedBrowser?.currentURI?.spec ?? "";
  const badges = [];
  if (tab.pinned) badges.push("pinned");
  if (tab.selected) badges.push("current");
  if (tab.muted) badges.push("muted");
  if (tab.group) badges.push(tab.group.name || "group");
  return buildCard({
    title: tab.label,
    url,
    image: tab.image,
    badges,
    onActivate: () => activate(tab, win),
    onClose: () => win.gBrowser.removeTab(tab),
    menu: tabMenu(tab, win),
  });
}

function renderGrid(gridId, emptyKey, tabs, win) {
  const grid = $(gridId);
  grid.textContent = "";
  for (const tab of tabs) grid.appendChild(makeTabCard(tab, win));
  $(`[data-empty=${emptyKey}]`).hidden = tabs.length > 0;
}

function renderOpen(win) {
  const tabs = [...win.gBrowser.tabs];
  renderGrid("#grid-open", "open", tabs, win);
  setNavCount("open", tabs.length);
}

function renderHidden(win) {
  const tabs = [...win.gBrowser.tabs].filter(isHidden);
  renderGrid("#grid-hidden", "hidden", tabs, win);
  setNavCount("hidden", tabs.length);
}

function renderWorkspaces(win) {
  const container = $("#workspaces");
  container.textContent = "";
  const api = win.HiggsWorkspaces;
  if (!api) {
    $("[data-empty=workspaces]").hidden = false;
    setNavCount("workspaces", 0);
    return;
  }
  const active = api.activeId();
  const workspaces = api.list();
  for (const w of workspaces) {
    const section = document.createElement("section");
    section.className = "group workspace" + (w.id === active ? " workspace-active" : "");
    section.dataset.text = (w.name ?? "").toLowerCase();

    const head = document.createElement("div");
    head.className = "group-head";
    const dot = document.createElement("span");
    dot.className = "group-dot";
    if (w.color) dot.dataset.color = w.color;
    const h = document.createElement("h3");
    h.className = "group-title";
    h.textContent = w.name;
    const count = document.createElement("span");
    count.className = "group-count";
    count.textContent = `${w.tabs.length}`;
    const sw = document.createElement("button");
    sw.className = "workspace-switch";
    sw.type = "button";
    sw.textContent = w.id === active ? "Active" : "Switch";
    sw.disabled = w.id === active;
    sw.addEventListener("click", () => api.switchTo(w.id));
    head.append(dot, h, count, sw);
    section.appendChild(head);

    const grid = document.createElement("div");
    grid.className = "grid";
    for (const tab of w.tabs) grid.appendChild(makeTabCard(tab, win));
    section.appendChild(grid);
    container.appendChild(section);
  }
  $("[data-empty=workspaces]").hidden = workspaces.length > 0;
  setNavCount("workspaces", workspaces.length);
}

function renderGroups(win) {  const container = $("#groups");
  container.textContent = "";
  const groups = groupsOf(win);
  for (const { group, tabs } of groups) {
    const section = document.createElement("section");
    section.className = "group";
    section.dataset.text = (group.name ?? "").toLowerCase();

    const head = document.createElement("div");
    head.className = "group-head";
    const dot = document.createElement("span");
    dot.className = "group-dot";
    if (group.color) dot.dataset.color = group.color;
    const h = document.createElement("h3");
    h.className = "group-title";
    h.textContent = group.name || "Group";
    const count = document.createElement("span");
    count.className = "group-count";
    count.textContent = `${tabs.length}`;
    head.append(dot, h, count);
    head.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      openContextMenu(e.clientX, e.clientY, [
        {
          label: group.collapsed ? "Expand Group" : "Collapse Group",
          onSelect: () => (group.collapsed = !group.collapsed),
        },
        { label: "Ungroup Tabs", onSelect: () => group.ungroupTabs?.() },
        {
          label: "Close Group",
          onSelect: () => [...group.tabs].forEach((t) => win.gBrowser.removeTab(t)),
        },
      ]);
    });
    section.appendChild(head);

    const grid = document.createElement("div");
    grid.className = "grid";
    for (const tab of tabs) grid.appendChild(makeTabCard(tab, win));
    section.appendChild(grid);
    container.appendChild(section);
  }
  $("[data-empty=groups]").hidden = groups.length > 0;
  setNavCount("groups", groups.length);
}

async function renderDevices(win) {
  const container = $("#devices");
  container.textContent = "";
  let clients = [];
  try {
    clients = (await lazy.SyncedTabs.getTabClients()) ?? [];
  } catch (e) {
    clients = [];
  }
  let total = 0;
  for (const client of clients) {
    const tabs = client.tabs ?? [];
    if (!tabs.length) continue;
    const section = document.createElement("section");
    section.className = "group";
    section.dataset.text = (client.name ?? "").toLowerCase();
    const head = document.createElement("div");
    head.className = "group-head";
    const h = document.createElement("h3");
    h.className = "group-title";
    h.textContent = client.name || client.id || "Device";
    const count = document.createElement("span");
    count.className = "group-count";
    count.textContent = `${tabs.length}`;
    head.append(h, count);
    section.appendChild(head);
    const grid = document.createElement("div");
    grid.className = "grid";
    for (const tab of tabs) {
      total++;
      grid.appendChild(
        buildCard({
          title: tab.title,
          url: tab.url,
          image: tab.icon,
          badges: ["synced"],
          onActivate: () => openUrl(tab.url, win),
          menu: syncedMenu(tab, win),
        }),
      );
    }
    section.appendChild(grid);
    container.appendChild(section);
  }
  $("[data-empty=devices]").hidden = total > 0;
  setNavCount("devices", total);
}

function renderClosed(win) {
  let entries = [];
  try {
    entries = lazy.SessionStore.getClosedTabData(win) ?? [];
  } catch (e) {
    entries = [];
  }
  const grid = $("#grid-closed");
  grid.textContent = "";
  for (const entry of entries) {
    grid.appendChild(
      buildCard({
        title: entry.title,
        url: entry.url,
        image: entry.image,
        badges: ["closed"],
        onActivate: () => lazy.SessionStore.undoCloseById(entry.closedId),
        menu: closedMenu(entry, win),
      }),
    );
  }
  $("[data-empty=closed]").hidden = entries.length > 0;
  setNavCount("closed", entries.length);
}

/* ------------------------------------------------------------ nav + filter */

function setNavCount(view, n) {
  const btn = $(`.tab-nav-item[data-view="${view}"]`);
  if (btn) btn.dataset.count = String(n);
}

function selectView(view) {
  for (const btn of $$(".tab-nav-item")) {
    btn.setAttribute("aria-selected", String(btn.dataset.view === view));
  }
  for (const panel of $$(".panel")) {
    panel.hidden = panel.dataset.panel !== view;
  }
  applyFilter();
}

function applyFilter() {
  const q = $("#home-search").value.trim().toLowerCase();
  const active = $(".panel:not([hidden])") ?? $(".panel");
  for (const card of $$(".card", active)) {
    card.hidden = q !== "" && !(card.dataset.text ?? "").includes(q);
  }
  for (const group of $$(".group", active)) {
    const grid = group.querySelector(".grid");
    const any = grid ? $$(".card", grid).some((c) => !c.hidden) : false;
    group.hidden = q !== "" && !any && !(group.dataset.text ?? "").includes(q);
  }
}

/* ------------------------------------------------------------ lifecycle */

function refresh(win) {
  renderOpen(win);
  renderWorkspaces(win);
  renderHidden(win);
  renderGroups(win);
  renderClosed(win);
  renderDevices(win);
  applyFilter();
  if (Services.prefs.getBoolPref("userchrome.home.debug", false)) {
    const tabs = [...win.gBrowser.tabs];
    console.log("[home] refresh", {
      open: tabs.length,
      hidden: tabs.filter(isHidden).length,
      groups: groupsOf(win).length,
      groupEls: win.gBrowser.tabContainer?.querySelectorAll("tab-group").length,
    });
  }
}

function observe(win) {
  const gb = win.gBrowser;
  if (gb?.tabContainer) {
    for (const ev of [
      "TabOpen",
      "TabClose",
      "TabSelect",
      "TabMove",
      "TabAttrModified",
      "TabHide",
      "TabShow",
      "TabGroupChange",
      "TabGroupRemoved",
      "TabGroupCreateByUser",
      "TabGroupUpdate",
    ]) {
      gb.tabContainer.addEventListener(ev, () => refresh(win));
    }
  }
  Services.obs.addObserver(() => refresh(win), "sessionstore-closed-objects-changed");
  Services.obs.addObserver(() => renderDevices(win).then(applyFilter), "services.sync.tabs.changed");
}

for (const btn of $$(".tab-nav-item")) {
  btn.addEventListener("click", () => selectView(btn.dataset.view));
}
$("#home-search").addEventListener("input", applyFilter);

const win = getChromeWindow();
if (win) {
  observe(win);
  refresh(win);
  // Re-render once the window has settled (groups / hidden tabs may populate
  // slightly after this page loads).
  Services.tm.dispatchToMainThread(() => refresh(win));
}
