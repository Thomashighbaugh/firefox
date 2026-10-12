---
title: "Task backlog — 8 tasks before fork work"
type: plan
tags: [backlog, refactor, second-sidebar, newtab, workspaces, library, quicktabs, split-tabs, shortcuts, passwords]
created: 2026-10-12
updated: 2026-10-12
status: planning
---

# 01 — Task backlog

Ordered work list. These run **before** (and partly feed) the fork migration. Do them on the current
overlay so iteration stays cheap.

Legend: **P1** = do first · **P2** = next · **P3** = after fork skeleton exists.

---

## Task 1 — Refactor the second-sidebar subsystem (P1)

**Goal:** cut the complexity of `resources/second-sidebar/` dramatically **without any user-visible
change** to UI or interactions.

**Current state (measured):** **163 files, ~13,981 lines**, 158 `.mjs`.

| Dir | Files | Note |
| --- | ----- | ---- |
| `xul/` | 70 | incl. `xul/base/` ~30 tiny element wrappers |
| `wrappers/` | 28 | Firefox API wrappers |
| `controllers/` | 21 | |
| `css/` | 12 | |
| `utils/` | 11 | |
| `settings/` | 8 | |
| `patchers/` | 4 | |
| `icons/` | 2 | |
| top-level entries | ~7 | `sidebar_elements`, `sidebar_controllers`, `sidebar_injector`, `sidebar_decorator`, `browser_elements`, `customize_mode_patcher` |

Known smells (from `AGENTS.md` + code):
- **Monolithic creation:** `sidebar_elements.mjs` builds 30+ components in one pass.
- **Implicit global registry:** components stored as static props (`SidebarElements.sidebarMain = …`);
  controllers likewise (`SidebarControllers.*`).
- **1:1 boilerplate:** ~30 `xul/base/*` wrappers and 8 `web_panel_*` popups are near-duplicates.
- **Import-cycle risk:** static-property wiring + `chrome://` imports.

**Proposed approach (mechanical, behaviour-preserving):**
1. **Freeze the contract first.** Build a **DOM snapshot harness**: after `SidebarElements.create()`,
   serialise the produced subtree (tag/`id`/`class`/`is`/`style` attrs, order). Snapshot before the
   refactor; assert byte-identical after each stage. This is the "looks and works the exact same"
   guarantee. (Marionette or a browser-console dump.)
2. **Data-drive the base elements.** Replace `xul/base/*` (~30 classes) with **one**
   `XULElement` factory + a declarative descriptor table (tag, attrs, default props). Target:
   ~30 files → 2–3.
3. **Collapse the 8 `web_panel_*` popups** (new/edit/more/delete + menupopup) into **one parameterised
   `WebPanelPopup(mode)`** driven by a descriptor. Target: ~8 → 1–2.
4. **Replace the static-property registry** with an explicit **context object** passed to
   `create(ctx)` (removes implicit globals + cycle risk). No behaviour change.
5. **Merge trivial controllers** that only forward to a popup (new/edit/more/delete) into the popup
   module; keep the event bus (`events.mjs`) as the single cross-module channel.
6. **Prune dead code:** grep for unreferenced exports before deleting; only remove what is provably
   unused.
7. Keep the **public entry** (`JS/second_sidebar.uc.mjs`) and the **chrome:// module paths** stable
   where possible (or provide re-export shims) so other scripts don't break.

**Target:** ~163 → **~60–80 files**, ~14k → **~7–9k lines**, **identical DOM**.

**Acceptance:** DOM snapshot diff = empty; all web-panel flows (new/edit/delete/more, resize,
collapse, splitter, shortcuts, container tabs, customize mode) manually pass; no new console errors.

**Risks:** hidden coupling via static props; the DOM snapshot must cover dynamically-added nodes.

---

## Task 2 — All-Tabs-Menu as home / new-tab page (P2)

**Goal:** replace the home + new-tab pages with a full page built from the **existing All Tabs Menu**,
plus the **Firefox View** elements (hidden tabs, tabs from other devices, recently closed).

**Approach:**
- Register a privileged page `about:higgs-home` (or `about:newtab` override). Since
  `browser.newtab.url` is gone, use a bundled WebExtension `chrome_url_overrides.newtab`, **or** patch
  `AboutNewTab.sys.mjs` in the fork (Lane 2).
- Data sources: `gBrowser.tabs` (incl. hidden), `SyncedTabs.sys.mjs` (other devices),
  `SessionStore.getClosedTabData()` (recently closed) — the same APIs Firefox View uses.
- Reuse `JS/allTabsMenuExpansionPack.uc.js` for the tab list rendering.
- Pref: `higgs.home.mode = allTabsMenu` (see roadmap §00.5).

**Acceptance:** home + new tab both render the page; hidden/synced/closed sections work; opening a
tab from any section works; falls back to stock new tab if the pref is off.

---

## Task 3 — Session-durable Workspaces over Firefox Tab Groups (P2)

**Goal:** Zen-style workspaces implemented as **Firefox Tab Groups**, switchable, durable across
sessions, with a catch-all "session" workspace for ungrouped tabs.

**Approach:**
- A workspace **is** a tab group (`browser.tabs.groups`). A controller maps `groupId → workspace`.
- Switching: activate the target group's tabs and move/hide the rest; on switch, **ungrouped tabs go
  to the catch-all workspace** so nothing is lost.
- Durability: rely on native Tab Groups + `SessionStore` persistence; add a small pref-backed index
  (`higgs.workspaces.*`) for naming/order.
- Expose via hotkey + `about:config`.

**Acceptance:** create/rename/switch workspaces; restart restores the active workspace and members;
ungrouped tabs survive a switch; no tab loss.

**Dependencies:** native Tab Groups available (FF137+; this machine is FF157).

---

## Task 4 — Library overhaul → `about:` page (P2)

**Goal:** replace the Library popup/panel (bookmarks & history) with a modern **`about:higgs-library`**
page that also includes **downloads** and **tab groups**, with **robust batch management**.

**Approach:**
- New privileged `about:` page (Lit/React or plain, matching the fork's stack).
- Sections: Bookmarks (Places), History (Places), **Downloads** (`Downloads` API),
  **Tab Groups** (native groups).
- Batch ops: multi-select (checkbox + shift-range), bulk delete/move/tag, undo.
- Retire/repoint the Library toolbar button + `Alt+B`-style entry to the page.

**Acceptance:** all four sections functional; batch select/delete/move works; the old popup is no
longer the default Library target.

---

## Task 5 — QuickTabs Search from selected text (P3)

**Goal:** with text selected, a hotkey + context-menu item opens a QuickTab searching the **default
engine** for that text.

**Approach:**
- Extend the existing QuickTabs mod; add a `contextmenu`/`gContextMenu` handler + hotkey.
- Query: `Services.search.defaultEngine.getSubmission(text, null, "contextmenu").uri.spec`.
- Pref `higgs.quicktabs.search.enabled`, hotkey `Ctrl+Shift+S` (roadmap §00.5).

**Acceptance:** selected text → QuickTab opens at the default engine's results; menu item appears only
with a selection; hotkey rebindable.

---

## Task 6 — Drop-to-split + 4-way splits (P3)

**Goal:** dropping a tab on the content area triggers split view; extend split view to a **2×2 grid**.

**Approach:**
- Native split view exists (`browser.tabs.splitView.enabled` is already set on this machine) — it
  supports **2 panes**. Drop-to-split: intercept drag-drop on `#tabbrowser-tabpanels` and call the
  split API.
- **2×2 grid** is not native: needs either two stacked split-views, or a custom grid container that
  hosts 4 `<browser>`s. This is a real feature — plan a prototype before committing.
- Prefs `higgs.split.dropToSplit`, `higgs.split.grid4`.

**Acceptance:** dropping a tab on content splits it; 4-way grid renders and is interactive; unsplit
restores cleanly.

**Risks:** the 2×2 grid may require patching `tabbrowser` (Lane 2/3) — scope it in a spike.

---

## Task 7 — Shortcut cheat-sheet toolbar button with search (P3)

**Goal:** a toolbar icon opening a searchable panel of **all currently configured shortcuts**.

**Approach:**
- Build a **single shortcut registry** (roadmap §00.5) that every component registers into.
- The button renders that registry; a search box filters; rebinding UI optional (later).
- Sources: the fork's own bindings + the second-sidebar `Shortcuts` controller + Firefox command
  keys (`<key>` elements on the main keyset).

**Acceptance:** panel lists every active binding (incl. user-remapped); search filters live; clicking
a row can invoke the action.

**Dependency:** the shortcut registry from roadmap §00.5 must exist first.

---

## Task 8 — `about:passwords` batch management (P3)

**Goal:** redesign `about:logins` to allow **batch modification** — e.g. checkbox-select and delete
unused/old passwords.

**Approach:**
- `about:logins` is a Lit app in `browser/components/aboutlogins/`. Two routes:
  - **Patch it in-tree** (Lane 2) to add checkboxes + bulk delete.
  - **New page** using `nsILoginManager` (`getAllLoginsAsync`, `removeLogin`) for full control.
- "Old/unused" heuristics: `timeLastUsed` / `timeCreated` / `timesUsed` (exposed by LoginManager) +
  filters.

**Acceptance:** select multiple logins → bulk delete; sort/filter by age/use; confirmation + undo
where possible; no per-item round-trips for bulk ops.

---

## Summary table

| # | Task | Priority | Lane impact |
| - | ---- | -------- | ----------- |
| 1 | Second-sidebar refactor | **P1** | chrome JS (Lane 1) |
| 2 | All-Tabs-Menu home/new-tab | P2 | page + pref (Lane 1/2) |
| 3 | Durable workspaces via Tab Groups | P2 | chrome JS + prefs |
| 4 | Library → `about:` page | P2 | page + Places/Downloads |
| 5 | QuickTabs Search | P3 | chrome JS (Lane 1) |
| 6 | Drop-to-split + 2×2 | P3 | chrome JS, maybe patch |
| 7 | Shortcut cheat-sheet | P3 | chrome JS + registry |
| 8 | about:passwords batch | P3 | in-tree patch or new page |
