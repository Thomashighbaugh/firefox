// Logins & Passwords page: full password management — list, search, sort,
// age/usage filters, per-row reveal/edit/copy, checkbox batch select with
// bulk delete + bulk export, import (CSV/JSON), and export (CSV/JSON/HTML).
// Runs as a privileged chrome:// document. Password reveal and export are
// gated behind OS/primary-password re-auth, matching Firefox's about:logins.

const lazy = {};
ChromeUtils.defineESModuleGetters(lazy, {
  LoginHelper: "resource://gre/modules/LoginHelper.sys.mjs",
  LoginExport: "resource://gre/modules/LoginExport.sys.mjs",
  LoginCSVImport: "resource://gre/modules/LoginCSVImport.sys.mjs",
  AppConstants: "resource://gre/modules/AppConstants.sys.mjs",
});

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const DAY = 24 * 60 * 60 * 1000;
const DAY_MS = DAY;
const AUTH_TIMEOUT_MS = 5 * 60 * 1000; // 5 min, matches about:logins
let authExpirationTime = Number.NEGATIVE_INFINITY;

const FALLBACK_ICON = "chrome://global/skin/icons/defaultFavicon.svg";
const logins = Services.logins;

function getChromeWindow() {
  const bc = window.browsingContext;
  return (
    bc?.topChromeWindow ??
    bc?.embedderWindowGlobal?.browsingContext?.window ??
    Services.wm.getMostRecentWindow("navigator:browser")
  );
}

/* ------------------------------------------------------------ auth gate */

/**
 * Prompt OS/primary-password re-auth unless a recent auth is still valid.
 * Returns true when authorized. Mirrors AboutLoginsParent.
 */
async function requireAuth() {
  const win = getChromeWindow();
  const browser = win?.gBrowser?.selectedBrowser ?? null;
  try {
    const { isAuthorized } = await lazy.LoginHelper.requestReauth(
      browser,
      authExpirationTime,
      "Enter your account password to manage logins and passwords.",
      "Logins & Passwords",
      "pwmgr",
    );
    if (isAuthorized) authExpirationTime = Date.now() + AUTH_TIMEOUT_MS;
    return !!isAuthorized;
  } catch (e) {
    console.error("[logins] reauth failed:", e);
    return false;
  }
}

/* ------------------------------------------------------------ data */

/** Vanilla copies of all logins (guid included). */
let allLogins = [];

async function loadLogins() {
  try {
    const list = await logins.getAllLogins();
    allLogins = list.map((l) => lazy.LoginHelper.loginToVanillaObject(l));
  } catch (e) {
    console.error("[logins] getAllLogins failed:", e);
    allLogins = [];
  }
  return allLogins;
}

/** Look up the live nsILoginInfo for a guid (needed for remove/modify). */
async function findLoginByGuid(guid) {
  const list = await logins.getAllLogins();
  return list.find((l) => l.guid === guid) ?? null;
}

/* ------------------------------------------------------------ selection */

const selection = new Set();

function updateBulkbar() {
  const n = selection.size;
  $("#bulk-count").textContent = `${n} selected`;
  $("#bulk-delete").disabled = n === 0;
  $("#bulk-export").disabled = n === 0;
  $("#bulk-clear").disabled = n === 0;
  const keys = currentKeys();
  const all = keys.length > 0 && keys.every((k) => selection.has(k));
  $("#select-all").checked = all;
  $("#select-all").indeterminate = n > 0 && !all;
}

/* ------------------------------------------------------------ sort/filter */

let sortKey = "origin";
let ageFilter = "all";

function currentKeys() {
  return filteredLogins().map((l) => l.guid);
}

function matchesAge(l) {
  const now = Date.now();
  switch (ageFilter) {
    case "never-used":
      return (l.timesUsed ?? 0) === 0;
    case "stale-90":
      return now - (l.timeLastUsed ?? l.timeCreated ?? 0) > 90 * DAY_MS;
    case "stale-180":
      return now - (l.timeLastUsed ?? l.timeCreated ?? 0) > 180 * DAY_MS;
    case "stale-365":
      return now - (l.timeLastUsed ?? l.timeCreated ?? 0) > 365 * DAY_MS;
    default:
      return true;
  }
}

function matchesQuery(l) {
  const q = $("#logins-search").value.trim().toLowerCase();
  if (!q) return true;
  return `${l.origin} ${l.username}`.toLowerCase().includes(q);
}

function filteredLogins() {
  const dir = sortKey === "origin" || sortKey === "username" ? 1 : -1;
  const out = allLogins.filter((l) => matchesAge(l) && matchesQuery(l));
  out.sort((a, b) => {
    let av = a[sortKey] ?? "";
    let bv = b[sortKey] ?? "";
    if (typeof av === "string") {
      av = av.toLowerCase();
      bv = String(bv).toLowerCase();
      return av < bv ? -dir : av > bv ? dir : 0;
    }
    return (av - bv) * dir;
  });
  return out;
}

const fmtDate = (ms) => (ms ? new Date(ms).toLocaleDateString() : "—");

/* ------------------------------------------------------------ rows */

const revealed = new Set(); // guids whose password is currently shown

function hostOf(origin) {
  try {
    return new URL(origin).host || origin;
  } catch {
    return origin;
  }
}

function faviconFor(origin) {
  // Use the origin's favicon via the page-icon protocol; fall back to default.
  try {
    return `page-icon:${new URL(origin).prePath}`;
  } catch {
    return FALLBACK_ICON;
  }
}

function buildRow(l) {
  const li = document.createElement("li");
  li.className = "row";
  li.dataset.key = l.guid;
  li.dataset.text = `${l.origin} ${l.username}`.toLowerCase();

  const check = document.createElement("input");
  check.type = "checkbox";
  check.className = "row-check";
  check.checked = selection.has(l.guid);
  check.addEventListener("change", () => {
    if (check.checked) selection.add(l.guid);
    else selection.delete(l.guid);
    updateBulkbar();
  });
  li.appendChild(check);

  const icon = document.createElement("img");
  icon.className = "row-icon";
  icon.alt = "";
  icon.src = FALLBACK_ICON;
  icon.addEventListener("error", () => (icon.src = FALLBACK_ICON), { once: true });
  li.appendChild(icon);

  const main = document.createElement("div");
  main.className = "row-main";

  const top = document.createElement("div");
  top.className = "row-top";
  const t = document.createElement("span");
  t.className = "row-title";
  t.textContent = hostOf(l.origin);
  top.appendChild(t);
  const u = document.createElement("span");
  u.className = "row-user";
  u.textContent = l.username || "(no username)";
  top.appendChild(u);
  main.appendChild(top);

  // password line (masked until revealed)
  const pw = document.createElement("div");
  pw.className = "row-password";
  const isRevealed = revealed.has(l.guid);
  pw.textContent = isRevealed ? l.password : "••••••••••";
  main.appendChild(pw);

  const meta = document.createElement("div");
  meta.className = "row-meta";
  meta.textContent =
    `last used ${fmtDate(l.timeLastUsed)} · used ${l.timesUsed ?? 0}×` +
    ` · created ${fmtDate(l.timeCreated)} · changed ${fmtDate(l.timePasswordChanged)}`;
  main.appendChild(meta);
  li.appendChild(main);

  const actions = document.createElement("div");
  actions.className = "row-actions";

  const mkBtn = (cls, text, title, fn, danger = false) => {
    const b = document.createElement("button");
    b.className = "row-btn" + (cls ? ` ${cls}` : "") + (danger ? " row-danger" : "");
    b.type = "button";
    b.textContent = text;
    if (title) b.title = title;
    b.addEventListener("click", (e) => {
      e.stopPropagation();
      fn();
    });
    actions.appendChild(b);
    return b;
  };

  mkBtn("", isRevealed ? "Hide" : "Show", "Show/hide password (requires sign-in)", async () => {
    if (revealed.has(l.guid)) {
      revealed.delete(l.guid);
      renderRows();
      return;
    }
    if (await requireAuth()) {
      revealed.add(l.guid);
      renderRows();
    }
  });
  mkBtn("", "Copy", "Copy password (requires sign-in)", async () => {
    if (!(await requireAuth())) return;
    try {
      Cc["@mozilla.org/widget/clipboardhelper;1"]
        .getService(Ci.nsIClipboardHelper)
        .copyString(l.password);
    } catch (e) {
      /* ignore */
    }
  });
  mkBtn("", "Edit", "Edit this login", () => openDialog(l));
  mkBtn("", "Delete", "Delete this login", async () => {
    await deleteGuids([l.guid]);
  }, true);

  li.appendChild(actions);

  li.addEventListener("click", (e) => {
    if (e.target.closest("button, input")) return;
    check.checked = !check.checked;
    check.dispatchEvent(new Event("change"));
  });

  // right-click context menu
  li.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    e.stopPropagation();
    openContextMenu(e.clientX, e.clientY, [
      { label: "Copy username", onSelect: () => copy(l.username) },
      {
        label: "Copy password",
        onSelect: async () => {
          if (await requireAuth()) copy(l.password);
        },
      },
      { label: "Open site", onSelect: () => openUrl(l.origin) },
      { label: "Edit…", onSelect: () => openDialog(l) },
      { label: "Delete", onSelect: () => deleteGuids([l.guid]) },
    ]);
  });

  return li;
}

function renderRows() {
  const list = $("#rows");
  list.textContent = "";
  const filtered = filteredLogins();
  for (const l of filtered) list.appendChild(buildRow(l));
  $("#empty").hidden = filtered.length > 0;
  updateBulkbar();
}

function copy(text) {
  try {
    Cc["@mozilla.org/widget/clipboardhelper;1"]
      .getService(Ci.nsIClipboardHelper)
      .copyString(text ?? "");
  } catch (e) {
    /* ignore */
  }
}

function openUrl(url) {
  const win = getChromeWindow();
  if (url && win) win.openTrustedLinkIn(url, "tab");
}

/* ------------------------------------------------------------ context menu */

const menuEl = $("#context-menu");
function openContextMenu(x, y, items) {
  menuEl.textContent = "";
  for (const item of items) {
    const btn = document.createElement("button");
    btn.className = "context-menu-item";
    btn.type = "button";
    btn.textContent = item.label;
    btn.addEventListener("click", () => {
      hideContextMenu();
      item.onSelect();
    });
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
document.addEventListener("keydown", (e) => e.key === "Escape" && hideContextMenu());
window.addEventListener("blur", hideContextMenu);

/* ------------------------------------------------------------ delete */

async function deleteGuids(guids) {
  if (!guids.length) return;
  for (const guid of guids) {
    try {
      const login = await findLoginByGuid(guid);
      if (login) await logins.removeLoginAsync(login);
    } catch (e) {
      console.error("[logins] remove failed for", guid, e);
    }
  }
  for (const g of guids) {
    selection.delete(g);
    revealed.delete(g);
  }
  await loadLogins();
  renderRows();
}

/* ------------------------------------------------------------ export */

function escapeHtml(s) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const EXPORT_COLUMNS = [
  "origin",
  "username",
  "password",
  "httpRealm",
  "formActionOrigin",
  "guid",
  "timeCreated",
  "timeLastUsed",
  "timePasswordChanged",
  "timesUsed",
];

function toJSON(vanilla) {
  return JSON.stringify({ version: 1, logins: vanilla }, null, 2);
}

function toHTML(vanilla) {
  const rows = vanilla
    .map(
      (l) => `<tr>
  <td><a href="${escapeHtml(l.origin)}">${escapeHtml(hostOf(l.origin))}</a></td>
  <td>${escapeHtml(l.origin)}</td>
  <td>${escapeHtml(l.username)}</td>
  <td><code>${escapeHtml(l.password)}</code></td>
  <td>${fmtDate(l.timeCreated)}</td>
  <td>${fmtDate(l.timeLastUsed)}</td>
  <td>${l.timesUsed ?? 0}</td>
</tr>`,
    )
    .join("\n");
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"/>
<meta name="color-scheme" content="light dark"/>
<title>Exported logins — ${new Date().toISOString()}</title>
<style>
  body{font:14px/1.5 system-ui,sans-serif;margin:2rem;color:CanvasText;background:Canvas}
  h1{font-size:1.3rem}
  .warn{color:#b3261e;font-weight:600}
  table{border-collapse:collapse;width:100%}
  th,td{border:1px solid #8884;padding:.4rem .6rem;text-align:left;vertical-align:top}
  th{background:color-mix(in srgb,CanvasText 8%,Canvas)}
  td code{word-break:break-all}
</style></head><body>
<h1>Exported logins</h1>
<p class="warn">This file contains your passwords in plain text. Store it somewhere safe and delete it when done.</p>
<p>${vanilla.length} logins · exported ${new Date().toLocaleString()}</p>
<table>
<thead><tr><th>Site</th><th>URL</th><th>Username</th><th>Password</th><th>Created</th><th>Last used</th><th>Used</th></tr></thead>
<tbody>
${rows}
</tbody></table>
</body></html>
`;
}

/** Pick a destination path, then write the export. */
async function pickSavePath(defaultName, filterLabel, ext) {
  const win = getChromeWindow();
  const fp = Cc["@mozilla.org/filepicker;1"].createInstance(Ci.nsIFilePicker);
  fp.init(win?.browsingContext ?? window.browsingContext, "Export logins", Ci.nsIFilePicker.modeSave);
  fp.defaultString = defaultName;
  fp.appendFilter(filterLabel, `*.${ext}`);
  const result = await new Promise((resolve) => fp.open(resolve));
  if (result !== Ci.nsIFilePicker.returnOK && result !== Ci.nsIFilePicker.returnReplace) {
    return null;
  }
  let path = fp.file.path;
  if (!path.toLowerCase().endsWith(`.${ext}`)) path += `.${ext}`;
  return path;
}

async function exportLogins(format, guids = null) {
  if (!(await requireAuth())) return;
  await loadLogins();
  const chosen = guids ? allLogins.filter((l) => guids.includes(l.guid)) : allLogins;
  if (!chosen.length) return;

  if (format === "csv") {
    // Firefox's own exporter keeps import-compatibility.
    const path = await pickSavePath("logins.csv", "CSV", "csv");
    if (!path) return;
    const real = [];
    for (const l of chosen) {
      const r = await findLoginByGuid(l.guid);
      if (r) real.push(r);
    }
    await lazy.LoginExport.exportAsCSV(path, real);
  } else if (format === "json") {
    const path = await pickSavePath("logins.json", "JSON", "json");
    if (!path) return;
    const vanilla = chosen.map((l) => {
      const o = {};
      for (const c of EXPORT_COLUMNS) o[c] = l[c];
      return o;
    });
    await IOUtils.writeUTF8(path, toJSON(vanilla), { tmpPath: path + ".tmp" });
  } else if (format === "html") {
    const path = await pickSavePath("logins.html", "HTML", "html");
    if (!path) return;
    await IOUtils.writeUTF8(path, toHTML(chosen), { tmpPath: path + ".tmp" });
  }
}

/* ------------------------------------------------------------ import */

async function importLogins() {
  const win = getChromeWindow();
  const fp = Cc["@mozilla.org/filepicker;1"].createInstance(Ci.nsIFilePicker);
  fp.init(win?.browsingContext ?? window.browsingContext, "Import logins", Ci.nsIFilePicker.modeOpen);
  fp.appendFilter("Logins (CSV / JSON)", "*.csv;*.json");
  fp.appendFilter("CSV", "*.csv");
  fp.appendFilter("JSON", "*.json");
  const result = await new Promise((resolve) => fp.open(resolve));
  if (result !== Ci.nsIFilePicker.returnOK) return;
  const path = fp.file.path;

  try {
    if (path.toLowerCase().endsWith(".json")) {
      const text = await IOUtils.readUTF8(path);
      const data = JSON.parse(text);
      const arr = Array.isArray(data) ? data : data.logins ?? [];
      const vanilla = arr.map((o) => lazy.LoginHelper.vanillaObjectToLogin({
        origin: o.origin ?? o.url ?? "",
        formActionOrigin: o.formActionOrigin ?? null,
        httpRealm: o.httpRealm ?? null,
        username: o.username ?? "",
        password: o.password ?? "",
        usernameField: o.usernameField ?? "",
        passwordField: o.passwordField ?? "",
        guid: o.guid, // may collide; addLoginsAsync regenerates on conflict
        timeCreated: o.timeCreated ?? Date.now(),
        timeLastUsed: o.timeLastUsed ?? Date.now(),
        timePasswordChanged: o.timePasswordChanged ?? Date.now(),
        timesUsed: o.timesUsed ?? 0,
      }));
      await logins.addLogins(vanilla);
    } else {
      await lazy.LoginCSVImport.importFromCSV(path);
    }
  } catch (e) {
    console.error("[logins] import failed:", e);
  }
  await loadLogins();
  renderRows();
}

/* ------------------------------------------------------------ add / edit */

let editingGuid = null;

function openDialog(login = null) {
  editingGuid = login?.guid ?? null;
  $("#dialog-title").textContent = login ? "Edit login" : "Add login";
  $("#f-origin").value = login?.origin ?? "";
  $("#f-username").value = login?.username ?? "";
  $("#f-password").value = login?.password ?? "";
  $("#f-password").type = "password";
  $("#dialog-backdrop").hidden = false;
  $("#f-origin").focus();
}
function closeDialog() {
  $("#dialog-backdrop").hidden = true;
  editingGuid = null;
}

async function saveDialog() {
  const origin = $("#f-origin").value.trim();
  const username = $("#f-username").value;
  const password = $("#f-password").value;
  if (!origin || !password) return;

  try {
    if (editingGuid) {
      const old = await findLoginByGuid(editingGuid);
      if (old) {
        const updated = lazy.LoginHelper.vanillaObjectToLogin({
          ...lazy.LoginHelper.loginToVanillaObject(old),
          origin,
          username,
          password,
          timePasswordChanged: Date.now(),
        });
        await logins.modifyLoginAsync(old, updated);
      }
    } else {
      const login = Cc["@mozilla.org/login-manager/loginInfo;1"].createInstance(Ci.nsILoginInfo);
      login.init(origin, null, null, username, password, "", "");
      await logins.addLoginAsync(login);
    }
  } catch (e) {
    console.error("[logins] save failed:", e);
  }
  closeDialog();
  await loadLogins();
  renderRows();
}

/* ------------------------------------------------------------ wiring */

function toggleMenu(el) {
  const wasHidden = el.hidden;
  for (const m of $$(".menu")) m.hidden = true;
  el.hidden = !wasHidden;
}

for (const btn of $$("#export-menu .menu-item")) {
  btn.addEventListener("click", () => {
    $("#export-menu").hidden = true;
    exportLogins(btn.dataset.format);
  });
}
for (const btn of $$("#bulk-export-menu .menu-item")) {
  btn.addEventListener("click", () => {
    $("#bulk-export-menu").hidden = true;
    exportLogins(btn.dataset.format, [...selection]);
  });
}
$("#export-btn").addEventListener("click", (e) => {
  e.stopPropagation();
  toggleMenu($("#export-menu"));
});
$("#bulk-export").addEventListener("click", (e) => {
  e.stopPropagation();
  toggleMenu($("#bulk-export-menu"));
});
document.addEventListener("click", () => {
  for (const m of $$(".menu")) m.hidden = true;
});

$("#import-btn").addEventListener("click", importLogins);
$("#add-btn").addEventListener("click", () => openDialog());
$("#dialog-cancel").addEventListener("click", closeDialog);
$("#dialog-save").addEventListener("click", saveDialog);
$("#dialog-backdrop").addEventListener("click", (e) => {
  if (e.target === $("#dialog-backdrop")) closeDialog();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !$("#dialog-backdrop").hidden) closeDialog();
});

$("#logins-search").addEventListener("input", renderRows);
$("#sort").addEventListener("change", () => {
  sortKey = $("#sort").value;
  renderRows();
});
$("#age-filter").addEventListener("change", () => {
  ageFilter = $("#age-filter").value;
  renderRows();
});

$("#bulk-delete").addEventListener("click", () => deleteGuids([...selection]));
$("#bulk-clear").addEventListener("click", () => {
  selection.clear();
  for (const c of $$(".row-check")) c.checked = false;
  updateBulkbar();
});
$("#select-all").addEventListener("change", () => {
  const on = $("#select-all").checked;
  selection.clear();
  if (on) for (const k of currentKeys()) selection.add(k);
  for (const c of $$(".row-check")) c.checked = on;
  updateBulkbar();
});

/* ------------------------------------------------------------ init */

(async () => {
  await loadLogins();
  renderRows();
  // Live update when logins change elsewhere (sync, prompt-save, etc.)
  Services.obs.addObserver(() => {
    loadLogins().then(renderRows);
  }, "passwordmgr-storage-changed");
})();
