// Library page: Bookmarks, History, Downloads and Tab Groups in one about-style
// page, with checkbox multi-select and bulk management.
// Runs as a privileged chrome:// document.

const lazy = {};
ChromeUtils.defineESModuleGetters(lazy, {
  PlacesUtils: "resource://gre/modules/PlacesUtils.sys.mjs",
  Downloads: "resource://gre/modules/Downloads.sys.mjs",
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

const FALLBACK_ICON = "chrome://global/skin/icons/defaultFavicon.svg";

/** Delete a file from disk (ignore a missing file). */
async function deleteFile(path) {
  if (!path) return;
  try {
    await IOUtils.remove(path, { ignoreAbsent: true });
  } catch (e) {
    /* ignore */
  }
}

/**
 * Remove a download. Cancels it first when still in progress (so the file is
 * released), optionally deletes the file, then drops it from the list.
 * @param {object} dl
 * @param {boolean} deleteFileToo
 */
async function removeDownload(dl, deleteFileToo) {
  const finished = dl.succeeded || dl.canceled || dl.error;
  if (!finished) {
    try {
      await dl.cancel();
    } catch (e) {
      /* already finished / not cancellable */
    }
  }
  if (deleteFileToo) {
    await deleteFile(dl.target?.path);
  }
  try {
    const list = await lazy.Downloads.getList(lazy.Downloads.ALL);
    await list.remove(dl);
  } catch (e) {
    /* ignore */
  }
}

/* -------------------------------------------------------------- places SQL */

async function sqlRows(query, mapper) {
  const db = await lazy.PlacesUtils.promiseDBConnection();
  const rows = await db.execute(query);
  return rows.map(mapper);
}

const MICROS = 1000;
const formatDate = (us) => (us ? new Date(us / MICROS).toLocaleString() : "");

/* -------------------------------------------------------------- selection */

/** view -> Set of selected keys */
const selection = new Map();
const viewKeys = new Map();

const selFor = (view) => {
  if (!selection.has(view)) selection.set(view, new Set());
  return selection.get(view);
};

function updateBulkbar(view) {
  const n = selFor(view).size;
  $("#bulk-count").textContent = `${n} selected`;
  $("#bulk-delete").disabled = n === 0;
  $("#bulk-delete-files").disabled = n === 0;
  $("#bulk-clear").disabled = n === 0;
  const keys = viewKeys.get(view) ?? [];
  const all = keys.length > 0 && keys.every((k) => selFor(view).has(k));
  $("#select-all").checked = all;
  $("#select-all").indeterminate = n > 0 && !all;
}

/* -------------------------------------------------------------- row builder */

function buildRow({ key, title, url, image, meta, onOpen, onDelete, onDeleteFile, extraActions }) {
  const li = document.createElement("li");
  li.className = "row";
  li.dataset.key = key;
  li.dataset.text = `${title ?? ""} ${url ?? ""} ${meta ?? ""}`.toLowerCase();

  const check = document.createElement("input");
  check.type = "checkbox";
  check.className = "row-check";
  check.addEventListener("change", () => {
    const view = currentView;
    if (check.checked) selFor(view).add(key);
    else selFor(view).delete(key);
    updateBulkbar(view);
  });
  li.appendChild(check);

  const icon = document.createElement("img");
  icon.className = "row-icon";
  icon.alt = "";
  icon.src = image || FALLBACK_ICON;
  li.appendChild(icon);

  const main = document.createElement("div");
  main.className = "row-main";
  const t = document.createElement("div");
  t.className = "row-title";
  t.textContent = title || url || "(untitled)";
  main.appendChild(t);
  if (url) {
    const u = document.createElement("div");
    u.className = "row-url";
    u.textContent = url;
    main.appendChild(u);
  }
  li.appendChild(main);

  if (meta) {
    const m = document.createElement("div");
    m.className = "row-meta";
    m.textContent = meta;
    li.appendChild(m);
  }

  const actions = document.createElement("div");
  actions.className = "row-actions";
  if (extraActions) {
    for (const { label, title: tip, fn } of extraActions) {
      const b = document.createElement("button");
      b.className = "row-btn";
      b.type = "button";
      b.textContent = label;
      if (tip) b.title = tip;
      b.addEventListener("click", fn);
      actions.appendChild(b);
    }
  }
  if (onOpen) {
    const open = document.createElement("button");
    open.className = "row-btn";
    open.type = "button";
    open.textContent = "Open";
    open.addEventListener("click", onOpen);
    actions.appendChild(open);
  }
  if (onDelete) {
    const del = document.createElement("button");
    del.className = "row-btn row-danger";
    del.type = "button";
    del.textContent = "Delete";
    del.addEventListener("click", onDelete);
    actions.appendChild(del);
  }
  if (onDeleteFile) {
    const delFile = document.createElement("button");
    delFile.className = "row-btn row-danger";
    delFile.type = "button";
    delFile.textContent = "Delete file";
    delFile.title = "Delete the downloaded file from disk as well";
    delFile.addEventListener("click", onDeleteFile);
    actions.appendChild(delFile);
  }
  li.appendChild(actions);

  li.addEventListener("click", (e) => {
    if (e.target.closest("button, input")) return;
    check.checked = !check.checked;
    check.dispatchEvent(new Event("change"));
  });

  return li;
}

function renderRows(listId, emptyKey, rows, view) {
  const list = $(listId);
  list.textContent = "";
  for (const row of rows) list.appendChild(row);
  $(`[data-empty=${emptyKey}]`).hidden = rows.length > 0;
  viewKeys.set(view, rows.map((r) => r.dataset.key));
  selFor(view).clear();
  if (view === currentView) updateBulkbar(view);
}

/* -------------------------------------------------------------- renderers */

function openUrl(url, win) {
  if (url) win.openTrustedLinkIn(url, "tab");
}

async function renderBookmarks(win) {
  const rows = await sqlRows(
    `SELECT b.guid AS guid, p.url AS url, b.title AS title, b.dateAdded AS dateAdded
       FROM moz_bookmarks b JOIN moz_places p ON b.fk = p.id
      WHERE b.type = 1
      ORDER BY b.dateAdded DESC LIMIT 1000`,
    (r) => ({
      key: r.getResultByName("guid"),
      url: r.getResultByName("url"),
      title: r.getResultByName("title"),
      date: r.getResultByName("dateAdded"),
    }),
  );
  renderRows(
    "#rows-bookmarks",
    "bookmarks",
    rows.map((b) =>
      buildRow({
        key: b.key,
        title: b.title,
        url: b.url,
        meta: formatDate(b.date),
        onOpen: () => openUrl(b.url, win),
        onDelete: async () => {
          await lazy.PlacesUtils.bookmarks.remove(b.key);
          renderBookmarks(win);
        },
      }),
    ),
    "bookmarks",
  );
  setNavCount("bookmarks", rows.length);
}

async function renderHistory(win) {
  const rows = await sqlRows(
    `SELECT p.url AS url, p.title AS title, p.last_visit_date AS lastVisit
       FROM moz_places p
      WHERE p.hidden = 0 AND p.last_visit_date IS NOT NULL
      ORDER BY p.last_visit_date DESC LIMIT 1000`,
    (r) => ({
      key: r.getResultByName("url"),
      url: r.getResultByName("url"),
      title: r.getResultByName("title"),
      lastVisit: r.getResultByName("lastVisit"),
    }),
  );
  renderRows(
    "#rows-history",
    "history",
    rows.map((h) =>
      buildRow({
        key: h.key,
        title: h.title,
        url: h.url,
        meta: formatDate(h.lastVisit),
        onOpen: () => openUrl(h.url, win),
        onDelete: async () => {
          await lazy.PlacesUtils.history.remove(h.url);
          renderHistory(win);
        },
      }),
    ),
    "history",
  );
  setNavCount("history", rows.length);
}

async function renderDownloads(win) {
  let downloads = [];
  try {
    const list = await lazy.Downloads.getList(lazy.Downloads.ALL);
    downloads = await list.getAll();
  } catch (e) {
    downloads = [];
  }
  const list = $("#rows-downloads");
  list.textContent = "";
  const rows = [];
  for (const dl of downloads) {
    const path = dl.target?.path ?? "";
    const name = path.split(/[\\/]/).pop() || path;
    const sourceUrl = dl.source?.url ?? "";
    const failedOrIncomplete = !!dl.error || (!dl.succeeded && !dl.canceled);
    rows.push(
      buildRow({
        key: path || String(dl.id),
        title: name,
        url: path,
        meta: dl.error ? "failed" : dl.succeeded ? "complete" : "incomplete",
        extraActions: [
          // Retry restarts a failed/incomplete download (Download.start()).
          ...(failedOrIncomplete
            ? [{
                label: "Retry",
                title: "Restart this download",
                fn: async () => {
                  try {
                    await dl.start();
                  } catch (e) {
                    /* ignore */
                  }
                  renderDownloads(win);
                },
              }]
            : []),
          // Copy the original download URL to the clipboard.
          ...(sourceUrl
            ? [{
                label: "Copy link",
                title: sourceUrl,
                fn: () => {
                  try {
                    Cc["@mozilla.org/widget/clipboardhelper;1"]
                      .getService(Ci.nsIClipboardHelper)
                      .copyString(sourceUrl);
                  } catch (e) {
                    /* ignore */
                  }
                },
              }]
            : []),
        ],
        onOpen: () => dl.launch?.().catch(() => {}),
        onDelete: async () => {
          await removeDownload(dl, false);
          renderDownloads(win);
        },
        onDeleteFile: async () => {
          await removeDownload(dl, true);
          renderDownloads(win);
        },
      }),
    );
  }
  for (const row of rows) list.appendChild(row);
  $("[data-empty=downloads]").hidden = rows.length > 0;
  viewKeys.set("downloads", rows.map((r) => r.dataset.key));
  selFor("downloads").clear();
  if (currentView === "downloads") updateBulkbar("downloads");
  setNavCount("downloads", rows.length);
}

function groupsOf(win) {
  const set = new Set();
  const container = win.gBrowser?.tabContainer;
  if (container) for (const g of container.querySelectorAll("tab-group")) set.add(g);
  for (const g of win.document.querySelectorAll("tab-group")) set.add(g);
  for (const t of win.gBrowser?.tabs ?? []) if (t.group) set.add(t.group);
  const out = [];
  for (const group of set) {
    const tabs = [...group.tabs];
    if (tabs.length) out.push({ group, tabs });
  }
  return out;
}

function renderGroups(win) {
  const container = $("#groups");
  container.textContent = "";
  const groups = groupsOf(win);
  for (const { group, tabs } of groups) {
    const section = document.createElement("section");
    section.className = "group";
    const head = document.createElement("div");
    head.className = "group-head";
    const h = document.createElement("h3");
    h.className = "group-title";
    h.textContent = group.name || "Group";
    const count = document.createElement("span");
    count.className = "group-count";
    count.textContent = `${tabs.length}`;
    head.append(h, count);
    section.appendChild(head);
    const list = document.createElement("ul");
    list.className = "rows";
    for (const tab of tabs) {
      list.appendChild(
        buildRow({
          key: tab.linkedBrowser?.currentURI?.spec ?? tab.label,
          title: tab.label,
          url: tab.linkedBrowser?.currentURI?.spec ?? "",
          image: tab.image,
          onOpen: () => {
            if (tab.hidden) tab.hidden = false;
            win.gBrowser.selectedTab = tab;
            win.focus();
          },
          onDelete: () => win.gBrowser.removeTab(tab),
        }),
      );
    }
    section.appendChild(list);
    container.appendChild(section);
  }
  $("[data-empty=groups]").hidden = groups.length > 0;
  setNavCount("groups", groups.length);
}

/* -------------------------------------------------------------- bulk delete */

async function bulkDelete(view, win, deleteFiles = false) {
  const keys = [...selFor(view)];
  if (!keys.length) return;
  if (view === "bookmarks") {
    for (const guid of keys) {
      try {
        await lazy.PlacesUtils.bookmarks.remove(guid);
      } catch (e) {
        /* ignore */
      }
    }
    await renderBookmarks(win);
  } else if (view === "history") {
    try {
      await lazy.PlacesUtils.history.remove(keys);
    } catch (e) {
      /* ignore */
    }
    await renderHistory(win);
  } else if (view === "downloads") {
    const list = await lazy.Downloads.getList(lazy.Downloads.ALL);
    const all = await list.getAll();
    for (const dl of all) {
      const path = dl.target?.path ?? String(dl.id);
      if (keys.includes(path)) {
        await removeDownload(dl, deleteFiles);
      }
    }
    await renderDownloads(win);
  } else if (view === "groups") {
    // Not applicable: use per-row Delete on the group's tabs.
  }
}

/* -------------------------------------------------------------- nav + filter */

let currentView = "bookmarks";

function setNavCount(view, n) {
  const btn = $(`.tab-nav-item[data-view="${view}"]`);
  if (btn) btn.dataset.count = String(n);
}

function selectView(view) {
  currentView = view;
  for (const btn of $$(".tab-nav-item")) {
    btn.setAttribute("aria-selected", String(btn.dataset.view === view));
  }
  for (const panel of $$(".panel")) {
    panel.hidden = panel.dataset.panel !== view;
  }
  $("#bulkbar").hidden = view === "groups";
  $("#bulk-delete-files").hidden = view !== "downloads";
  applyFilter();
  updateBulkbar(view);
}

function applyFilter() {
  const q = $("#lib-search").value.trim().toLowerCase();
  const active = $(".panel:not([hidden])") ?? $(".panel");
  for (const row of $$(".row", active)) {
    row.hidden = q !== "" && !(row.dataset.text ?? "").includes(q);
  }
}

/* -------------------------------------------------------------- lifecycle */

function refresh(win) {
  renderBookmarks(win);
  renderHistory(win);
  renderDownloads(win);
  renderGroups(win);
}

for (const btn of $$(".tab-nav-item")) {
  btn.addEventListener("click", () => selectView(btn.dataset.view));
}
$("#lib-search").addEventListener("input", applyFilter);
$("#bulk-delete").addEventListener("click", () => bulkDelete(currentView, getChromeWindow()));
$("#bulk-delete-files").addEventListener("click", () =>
  bulkDelete(currentView, getChromeWindow(), true),
);
$("#bulk-clear").addEventListener("click", () => {
  selFor(currentView).clear();
  for (const c of $$(".row-check", $(`.panel[data-panel="${currentView}"]`))) c.checked = false;
  updateBulkbar(currentView);
});
$("#select-all").addEventListener("change", () => {
  const view = currentView;
  const on = $("#select-all").checked;
  selFor(view).clear();
  if (on) for (const k of viewKeys.get(view) ?? []) selFor(view).add(k);
  for (const c of $$(".row-check", $(`.panel[data-panel="${view}"]`))) c.checked = on;
  updateBulkbar(view);
});

const win = getChromeWindow();
if (win) refresh(win);
const initialView = (location.hash || "").replace(/^#/, "");
selectView(["bookmarks", "history", "downloads", "groups"].includes(initialView) ? initialView : "bookmarks");
window.addEventListener("hashchange", () => {
  const v = (location.hash || "").replace(/^#/, "");
  if (["bookmarks", "history", "downloads", "groups"].includes(v)) selectView(v);
});
