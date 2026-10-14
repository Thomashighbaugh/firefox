// Home / new-tab page: All-Tabs-Menu content + Firefox View sections.
// Runs as a privileged chrome:// document. Reuses the same data sources as
// about:firefoxview (gBrowser, SyncedTabs, SessionStore).

const lazy = {};
ChromeUtils.defineESModuleGetters(lazy, {
  SyncedTabs: "resource://services-sync/SyncedTabs.sys.mjs",
  SessionStore: "moz-src:///browser/components/sessionstore/SessionStore.sys.mjs",
});

const $ = (sel) => document.querySelector(sel);

/** The browser chrome window hosting this page. */
function getChromeWindow() {
  const bc = window.browsingContext;
  return (
    bc?.topChromeWindow ??
    bc?.embedderWindowGlobal?.browsingContext?.window ??
    Services.wm.getMostRecentWindow("navigator:browser")
  );
}

const isHiddenTab = (tab) => tab.hidden || tab.getAttribute("hidden") === "true";

function openUrl(url) {
  const win = getChromeWindow();
  if (win?.openTrustedLinkIn) {
    win.openTrustedLinkIn(url, "tab");
  } else {
    win?.gBrowser?.addTab(url, { triggeringPrincipal: Services.scriptSecurityManager.getSystemPrincipal() });
  }
}

/* ------------------------------------------------------------------ rows */

function makeRow({ title, url, image, badges = [], actions = [] }) {
  const li = document.createElement("li");
  li.className = "home-row";
  li.dataset.text = `${title ?? ""} ${url ?? ""}`.toLowerCase();

  const icon = document.createElement("img");
  icon.className = "home-row-icon";
  icon.alt = "";
  icon.src = image || "chrome://global/skin/icons/defaultFavicon.svg";
  li.appendChild(icon);

  const main = document.createElement("div");
  main.className = "home-row-main";
  const t = document.createElement("div");
  t.className = "home-row-title";
  t.textContent = title || url || "(untitled)";
  main.appendChild(t);
  if (url) {
    const u = document.createElement("div");
    u.className = "home-row-url";
    u.textContent = url;
    main.appendChild(u);
  }
  li.appendChild(main);

  if (badges.length) {
    const b = document.createElement("div");
    b.className = "home-row-badges";
    for (const label of badges) {
      const s = document.createElement("span");
      s.className = "home-badge";
      s.textContent = label;
      b.appendChild(s);
    }
    li.appendChild(b);
  }

  const acts = document.createElement("div");
  acts.className = "home-row-actions";
  for (const { label, title: atitle, onClick } of actions) {
    const btn = document.createElement("button");
    btn.className = "home-row-action";
    btn.type = "button";
    btn.textContent = label;
    if (atitle) btn.title = atitle;
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    });
    acts.appendChild(btn);
  }
  li.appendChild(acts);
  return li;
}

/* -------------------------------------------------------------- sections */

function renderOpenTabs() {
  const win = getChromeWindow();
  const gBrowser = win?.gBrowser;
  const list = $("#list-open");
  list.textContent = "";
  if (!gBrowser) return;

  const tabs = [...gBrowser.tabs];
  let hiddenCount = 0;
  for (const tab of tabs) {
    const hidden = isHiddenTab(tab);
    if (hidden) hiddenCount++;
    const url = tab.linkedBrowser?.currentURI?.spec ?? "";
    const badges = [];
    if (hidden) badges.push("hidden");
    if (tab.pinned) badges.push("pinned");
    if (tab.selected) badges.push("current");
    list.appendChild(
      makeRow({
        title: tab.label,
        url,
        image: tab.image,
        badges,
        actions: [
          {
            label: "Switch",
            title: "Switch to this tab",
            onClick: () => {
              gBrowser.selectedTab = tab;
              win.focus();
            },
          },
          {
            label: "Close",
            title: "Close this tab",
            onClick: () => gBrowser.removeTab(tab),
          },
        ],
      }),
    );
  }
  $("#section-open .home-count").textContent = hiddenCount
    ? `${tabs.length} (${hiddenCount} hidden)`
    : `${tabs.length}`;
  $("[data-empty=open]").hidden = tabs.length > 0;
}

function renderRecentlyClosed() {
  const win = getChromeWindow();
  const list = $("#list-closed");
  list.textContent = "";
  let entries = [];
  try {
    entries = lazy.SessionStore.getClosedTabData(win) ?? [];
  } catch (e) {
    entries = [];
  }
  for (const entry of entries) {
    list.appendChild(
      makeRow({
        title: entry.title,
        url: entry.url,
        image: entry.image,
        badges: ["closed"],
        actions: [
          {
            label: "Restore",
            title: "Restore this tab",
            onClick: () => lazy.SessionStore.undoCloseById(entry.closedId),
          },
        ],
      }),
    );
  }
  $("#section-closed .home-count").textContent = `${entries.length}`;
  $("[data-empty=closed]").hidden = entries.length > 0;
}

async function renderSyncedTabs() {
  const list = $("#list-devices");
  list.textContent = "";
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
    const heading = document.createElement("li");
    heading.className = "home-device";
    heading.textContent = client.name || client.id || "Device";
    heading.dataset.text = (client.name || "").toLowerCase();
    list.appendChild(heading);
    for (const tab of tabs) {
      total++;
      list.appendChild(
        makeRow({
          title: tab.title,
          url: tab.url,
          image: tab.icon,
          badges: ["synced"],
          actions: [
            {
              label: "Open",
              title: "Open on this device",
              onClick: () => openUrl(tab.url),
            },
          ],
        }),
      );
    }
  }
  $("#section-devices .home-count").textContent = `${total}`;
  $("[data-empty=devices]").hidden = total > 0;
}

/* ---------------------------------------------------------------- filter */

function applyFilter() {
  const q = $("#home-search").value.trim().toLowerCase();
  for (const row of document.querySelectorAll(".home-row, .home-device")) {
    const text = row.dataset.text ?? "";
    row.hidden = q !== "" && !text.includes(q);
  }
  // Hide a device heading if all of its following rows are hidden.
  for (const heading of document.querySelectorAll(".home-device")) {
    let sibling = heading.nextElementSibling;
    let any = false;
    while (sibling && !sibling.classList.contains("home-device")) {
      if (!sibling.hidden) any = true;
      sibling = sibling.nextElementSibling;
    }
    heading.hidden = !any;
  }
}

/* -------------------------------------------------------------- lifecycle */

async function refresh() {
  renderOpenTabs();
  renderRecentlyClosed();
  await renderSyncedTabs();
  applyFilter();
}

function observe() {
  const win = getChromeWindow();
  const gBrowser = win?.gBrowser;
  if (gBrowser?.tabContainer) {
    for (const ev of ["TabOpen", "TabClose", "TabSelect", "TabMove", "TabAttrModified"]) {
      gBrowser.tabContainer.addEventListener(ev, renderOpenTabs);
    }
  }
  Services.obs.addObserver(renderRecentlyClosed, "sessionstore-closed-objects-changed");
  Services.obs.addObserver(() => renderSyncedTabs().then(applyFilter), "services.sync.tabs.changed");
}

$("#home-search").addEventListener("input", applyFilter);
window.addEventListener("unload", () => {
  Services.obs.removeObserver(renderRecentlyClosed, "sessionstore-closed-objects-changed");
});

observe();
refresh();
