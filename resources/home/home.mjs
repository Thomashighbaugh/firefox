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

/**
 * @param {object} opts
 * @param {string} opts.title
 * @param {string} [opts.url]
 * @param {string} [opts.image]
 * @param {string[]} [opts.badges]
 * @param {() => void} [opts.onActivate]
 * @param {() => void} [opts.onClose]
 * @param {Array<{label:string, onSelect:() => void, disabled?:boolean}>} [opts.menu]
 */
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

/* ------------------------------------------------------------ card context menus */

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
  ];
  if (tab.hidden) {
    items.unshift({ label: "Unhide Tab", onSelect: () => gb.showTab?.(tab) ?? (tab.hidden = false) });
  }
  items.push(
    { label: "Close Tab", onSelect: () => gb.removeTab(tab) },
    { label: "Close Other Tabs", onSelect: () => gb.removeAllTabsBut(tab) },
  );
  return items;
}

function closedMenu(entry) {
  return [
    { label: "Restore Tab", onSelect: () => lazy.SessionStore.undoCloseById(entry.closedId) },
    { label: "Copy URL", onSelect: () => copyToClipboard(entry.url ?? "") },
  ];
}

function syncedMenu(tab, win) {
  return [
    { label: "Open on This Device", onSelect: () => openUrl(tab.url, win) },
    { label: "Copy URL", onSelect: () => copyToClipboard(tab.url ?? "") },
  ];
}

/* ------------------------------------------------------------ context menu UI */

const menuEl = $("#context-menu");

function openContextMenu(x, y, items) {
  menuEl.textContent = "";
  for (const item of items) {
    const btn = document.createElement("button");
    btn.className = "context-menu-item";
    btn.type = "button";
    btn.setAttribute("role", "menuitem");
    btn.textContent = item.label;
    if (item.disabled) {
      btn.disabled = true;
    } else {
      btn.addEventListener("click", () => {
        hideContextMenu();
        item.onSelect();
      });
    }
    menuEl.appendChild(btn);
  }
  menuEl.hidden = false;
  // Keep on-screen.
  const rect = menuEl.getBoundingClientRect();
  menuEl.style.left = `${Math.min(x, window.innerWidth - rect.width - 8)}px`;
  menuEl.style.top = `${Math.min(y, window.innerHeight - rect.height - 8)}px`;
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
  grid.closest(".panel").dataset.count = String(tabs.length);
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

function groupsOf(win) {
  const map = new Map();
  for (const tab of win.gBrowser.tabs) {
    const g = tab.group;
    if (!g) continue;
    if (!map.has(g.id)) map.set(g.id, { group: g, tabs: [] });
    map.get(g.id).tabs.push(tab);
  }
  return [...map.values()];
}

function renderGroups(win) {
  const container = $("#groups");
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
        {
          label: "Ungroup Tabs",
          onSelect: () => group.ungroupTabs?.(),
        },
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
        menu: closedMenu(entry),
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
  for (const card of $$(".card, .group", active)) {
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
  renderHidden(win);
  renderGroups(win);
  renderClosed(win);
  renderDevices(win);
  applyFilter();
}

function observe(win) {
  const gb = win.gBrowser;
  if (gb?.tabContainer) {
    for (const ev of ["TabOpen", "TabClose", "TabSelect", "TabMove", "TabAttrModified", "TabGroupChange", "TabGroupRemoved"]) {
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
}
