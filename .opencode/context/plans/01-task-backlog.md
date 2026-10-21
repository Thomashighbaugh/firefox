---
title: "Task backlog — 9 tasks before fork work"
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

**Status: ✅ complete 2026-10-13, smoke-tested.** 163 → 99 files (−39%); 13,662 → 11,837 lines (−13%). All stages C1–C8 done (C2 resolved by C1). Verified static: all modules parse, 277 relative imports resolve (0 dangling), `chrome://` entry chain intact, no `instanceof`/`constructor.name`, no refs to deleted modules. Smoke-tested in live Firefox via daily use.

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

### Measured condensation inventory (2026-10-12 recon)

**163 files · 13,662 lines** (≈9,410 code · 4,252 comment/blank). **No `instanceof` anywhere** → all
wrapper classes can become factories.

| # | Target | Now | After | Saves | Risk |
| - | ------ | --- | ----- | ----- | ---- |
| C1 | `xul/base/*` — 25 of 30 are pure `super({tag})` aliases | 30 files / 1,896 ln | 1 `elements.mjs` factory + generic setters on `XULElement` | ~29 files / ~1,300 ln | low | **✅ done** — base 30→10; 63 imports collapsed |
| C2 | `utils/xul.mjs` `createX()` duplicates the base classes | 2 layers | 1 | ~150 ln | low | **✅ resolved by C1** — `elements.mjs` = raw factories; `utils/xul.mjs` = distinct composition layer that imports it (no longer duplicate) |
| C3 | `css/*.mjs` — 12 CSS-in-JS template-string modules | 12 files / 873 ln | 1 `second-sidebar.css` asset, injected once | ~11 files | low-med | **✅ done 2026-10-12** — `css/` 12→1, output byte-identical, dead `css/sidebar.mjs` removed || C4 | Popups share a scaffold + repeat `listenXButtonClick` ~20× | 4–8 files / ~1,400 ln | 1 `PopupPanel` base + declarative descriptor + `onLeftClick` | ~5 files / ~500 ln | med | **✅ done** — `PopupPanel` + `onLeftClick`; all 5 popups migrated (New/Delete/More/Edit/SidebarMainPopupSettings) |
| C5 | Popup controllers are 1:1 with popups (420 ln wiring) | 4 files | 1 `WebPanelDialogs` | ~3 files / ~300 ln | med | **✅ done 2026-10-13** — 5→1 `web_panel_dialogs.mjs` |
| C6 | `wrappers/*` — 20+ are 4–22 ln single-method delegates | 28 files / 893 ln | ~4 grouped modules | ~24 files | low | **✅ done 2026-10-12** — 28→3 (`services`/`window`/`customizable_ui`) |
| C7 | `settings/*` tiny state modules merge into parents | 8 files / 552 ln | ~3 files | ~5 files | low | **✅ done 2026-10-12** — 8→3 (`settings`/`web_panel_settings`/`web_panels_settings`) |
| C8 | Redundant JSDoc (boilerplate `@param` on one-liners) | 4,252 ln | — | ~1,500–2,000 ln | none | **✅ done 2026-10-13** — 325 pure `@param`/`@returns` blocks removed (−1,418 ln); `@type`/prose kept |

**Projected: ~163 → ~60 files; ~13.7k → ~8k lines (~7k after JSDoc trim), identical DOM.**

**Execution order (each stage gated by the DOM snapshot):**
0. Harness — `JS/_dev_sidebar_snapshot.uc.js`: serialise the sidebar subtree (tag/`id`/`class`/`is`/
   attrs/order) + computed styles to the console/clipboard.
1. **C1 + C2** — the elements layer (biggest win, purely mechanical).
2. **C6 + C7** — wrappers/settings grouping.
3. **C3** — CSS asset.
4. **C4 + C5** — popups + controllers.
5. **C8** — JSDoc trim last (cosmetic).

### Original proposed approach (still valid)

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

**Status: ✅ implemented 2026-10-14, smoke-tested** (homepage confirmed working live 2026-10-20).

**Goal:** replace the home + new-tab pages with a full page built from the **existing All Tabs Menu**,
plus the **Firefox View** elements (hidden tabs, tabs from other devices, recently closed).

**Delivered:**
- `resources/home/{home.html,home.mjs,home.css}` → `chrome://userchrome/content/home/home.html`.
- Sections: Open Tabs (all `gBrowser.tabs`, incl. `tab.hidden`; switch/close), Tabs from Other
  Devices (`SyncedTabs.getTabClients()`), Recently Closed (`SessionStore.getClosedTabData()` → restore).
- Live search filter; observers for `TabOpen/Close/Select/Move/AttrModified`,
  `sessionstore-closed-objects-changed`, `services.sync.tabs.changed`.
- Wiring: `JS/homeRedirect.uc.js` (`about:newtab` → page; pref `userchrome.home.newtab.enabled` default
  true); home via `browser.startup.homepage`. Fork will patch `AboutNewTab.sys.mjs` (Lane 2) instead.
- Chrome window resolved via `window.browsingContext` (same pattern as `about:firefoxview`).

**Original approach (for reference):**
- Register a privileged page `about:higgs-home` (or `about:newtab` override). Since
  `browser.newtab.url` is gone, use a bundled WebExtension `chrome_url_overrides.newtab`, **or** patch
  `AboutNewTab.sys.mjs` in the fork (Lane 2).
- Data sources: `gBrowser.tabs` (incl. hidden), `SyncedTabs.sys.mjs` (other devices),
  `SessionStore.getClosedTabData()` (recently closed) — the same APIs Firefox View uses.
- Reuse `JS/allTabsMenuExpansionPack.uc.js` for the tab list rendering.
- Pref: `userchrome.home.mode = allTabsMenu` (see roadmap §00.5).

**Acceptance:** home + new tab both render the page; hidden/synced/closed sections work; opening a
tab from any section works; falls back to stock new tab if the pref is off.

---

## Task 3 — Workspaces — REMOVED, folded into native Tab Groups

**Status: ❌ removed 2026-10-20.** The `Workspaces` branding layer was cut. Rationale: it was a
confusing extra name over functionality Firefox already has, and its hide/collapse logic fought
SessionStore. What survives is **native tab groups** on their own terms — no hiding, no switching,
no parallel concept of a "workspace" or "Session". The Home page's **Groups** view (nav tab)
supersedes the old **Workspaces** view, and the tab context menu's **Add to Tab Group** supersedes
**Move to Workspace**.

**Removed:** `JS/workspaces.uc.js` (deleted); the Home page **Workspaces** nav view, its renderer,
and the `Move to Workspace` submenu; `userchrome.workspaces.active` pref; the `Ctrl+Alt+1…9/0`
hotkeys; the Workspaces section in `.documentation/preferences.md`.

**Kept:** native tab groups (collapse/expand via the group header context menu in the **Groups**
view), the **Add to Tab Group** submenu on every Home-page row, and the Groups nav view.

---

## Task 4 — Library overhaul → `about:` page (P2)

**Status: ✅ implemented 2026-10-15, smoke-tested** (in daily use).

**Delivered:**
- `resources/library/{library.html,library.mjs,library.css}` → `chrome://userchrome/content/library/library.html`.
- Views: **Bookmarks** (`moz_bookmarks` SQL → `PlacesUtils.bookmarks.remove`), **History**
  (`moz_places` SQL → `PlacesUtils.history.remove`), **Downloads** (`Downloads.getList(ALL)` →
  `list.remove`), **Tab Groups** (native groups → per-tab Open/Close).
- **Batch management**: per-row checkbox, select-all (indeterminate), live "N selected", bulk
  delete per view, clear; per-row Open/Delete; search filter.
- Wiring: `JS/libraryRedirect.uc.js` repoints `#library-button` + app-menu Library entry to the page
  (pref `userchrome.library.page.enabled`). The fork can register `about:higgs-library` (Lane 2).

**Original approach (for reference):**
- New privileged `about:` page (Lit/React or plain, matching the fork's stack).
- Sections: Bookmarks (Places), History (Places), **Downloads** (`Downloads` API),
  **Tab Groups** (native groups).
- Batch ops: multi-select (checkbox + shift-range), bulk delete/move/tag, undo.
- Retire/repoint the Library toolbar button + `Alt+B`-style entry to the page.

**Acceptance:** all four sections functional; batch select/delete/move works; the old popup is no
longer the default Library target.

---

## Task 5 — QuickTabs Search from selected text (P3)

**Status: ✅ implemented 2026-10-19, smoke-tested** (in daily use).

**Delivered:**
- `JS/quick_tabs_search.uc.js` — with text selected, opens a Quick Tab at the **default engine's**
  results. Right-click menu item ("Search in Quick Tab …", shown only with a selection, placed after
  the native `context-searchselect`) + hotkey.
- Query via `Services.search.defaultEngine.getSubmission(text, null, "contextmenu").uri.spec`.
- Selection read chrome-side via `SelectionUtils.getSelectionDetails(browser.documentGlobal)`; the
  menu path uses `gContextMenu.selectedText` / `isTextSelected`.
- Prefs: `userchrome.quicktabs.search.enabled`, `.key` (default `S`), `.modifiers` (default `accel alt`),
  `.menu`; live rebinding via a pref observer. Falls back to a normal tab if QuickTabs is absent.
- Exposes `window.QuickTabsSearch`.

**Note on the hotkey:** roadmap §00.5 proposed `Ctrl+Shift+S`, but that is Firefox's **Screenshot**
(Firefox View / `Browser:Screenshot`) in FF157 — the default is therefore **`Ctrl+Alt+S`** (verified
free in `browser.xhtml`), rebindable via `userchrome.quicktabs.search.key`/`.modifiers`.

**Original approach (for reference):**
- Extend the existing QuickTabs mod; add a `contextmenu`/`gContextMenu` handler + hotkey.

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
- Prefs `userchrome.split.dropToSplit`, `userchrome.split.grid4`.

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

## Task 8 — Logins & Passwords page (P3)

**Status: ✅ implemented 2026-10-21** (page + redirect; needs live smoke test).

**Delivered:**
- `resources/logins/{logins.html,logins.mjs,logins.css}` → `chrome://userchrome/content/logins/logins.html`.
- Full management: search, sort (site/username/last-used/created/times-used/password-changed),
  age/usage quick-filters (never used, 90/180/365-day stale), per-row reveal/edit/copy/delete,
  right-click context menu, add/edit dialog.
- **Batch suite:** checkbox multi-select + select-all + clear, bulk delete, bulk export-selected.
- **Export:** CSV (via Firefox's own `LoginExport.exportAsCSV` → import-compatible), JSON (full
  metadata incl. guid/timestamps/timesUsed), and HTML (human-readable, HTML-escaped, with a
  plaintext-warning banner). **Import:** CSV (via `LoginCSVImport.importFromCSV`) + JSON.
- **Auth:** password reveal / copy / export gated behind `LoginHelper.requestReauth`
  (OS/primary-password, 5-min expiry), matching about:logins. Delete does not re-auth (same as
  Firefox).
- Wiring: `JS/loginsRedirect.uc.js` patches `LoginHelper.openPasswordManager` (the single choke
  point for the app-menu Passwords button, context-menu "Manage Passwords", toolbar, autocomplete
  footers), pref `userchrome.logins.page.enabled`. Fork can register `about:higgs-logins` (Lane 2).

**Acceptance:** all sections functional; batch select/delete/export works; export→import round-trips;
reveal/export prompt for OS/primary auth; stock about:logins reachable when the pref is off.

---

## Task 9 — Full documentation + screen-recorded GIF demos (P3)

**Status: ⬜ not started.**

**Goal:** bring the project's docs to a complete, current state and produce a screen-recorded
**GIF demo for every user-facing feature**, so the README and per-feature docs show each feature
working — not just describe it.

**Scope:**
- **Docs pass:** audit + refresh `README.md`, `AGENTS.md` (root + subsystem), `.documentation/`
  (preferences.md, javascript-modules.md, CHANGELOG.md), and per-component docs so every script,
  page (Home, Library, Logins), pref (`userchrome.*`), and hotkey is documented and current. Fill
  the gaps left by the recent feature work (Logins page, QuickTabs search, Home/Library redirects).
- **GIF demos:** for each feature, record a short screen capture of the interaction, then convert
  to an optimized, looping GIF. Candidates: vertical tabs, second sidebar web panels, Home/new-tab
  page (all 5 views), Library page (4 views + batch ops), Logins page (reveal/auth + batch ops +
  export), QuickTabs (+ search-from-selection), tab groups / collapse, restart button, toolbar
  customizations, animations.
- **Wire-in:** embed each GIF alongside its feature section in the README / docs; store the source
  recordings + the GIFs under `.documentation/demos/` (or a `docs/assets/` dir).

**Tooling (to decide at build time):**
- Record: `wf-recorder` / `obs` / `peek` (Wayland on Sway — confirm what works on this machine).
- Convert/optimize: `ffmpeg` (`-vf "fps=…,scale=…:flags=lanczos,palettegen/paletteuse"`) or `gifski`
  for better quality/size. Keep each GIF short (<10 s), small (<2 MB), and looping.

**Acceptance:** every documented feature has a current doc entry; every user-facing feature has a
linked GIF that actually shows the interaction; GIFs are committed under a demos/assets dir and
referenced from README/docs; total added repo weight stays reasonable.

---

## Summary table

| # | Task | Priority | Lane impact |
| - | ---- | -------- | ----------- |
| 1 | Second-sidebar refactor | **P1** | chrome JS (Lane 1) |
| 2 | All-Tabs-Menu home/new-tab | P2 | page + pref (Lane 1/2) | ✅ done |
| 3 | ~~Workspaces~~ → native Tab Groups | P2 | chrome JS | ❌ removed (folded into Groups) |
| 4 | Library → `about:` page | P2 | page + Places/Downloads | ✅ done |
| 5 | QuickTabs Search | P3 | chrome JS (Lane 1) | ✅ done |
| 6 | Drop-to-split + 2×2 | P3 | chrome JS, maybe patch |
| 7 | Shortcut cheat-sheet | P3 | chrome JS + registry |
| 8 | Logins & Passwords page | P3 | page + LoginManager | ✅ done |
| 9 | Docs + GIF demos | P3 | docs + screen capture |
