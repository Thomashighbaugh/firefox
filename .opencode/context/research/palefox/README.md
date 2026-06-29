# Palefox — Firefox Customization Research

**Source:** https://github.com/tompassarelli/palefox  
**Fetched:** 2026-06-27  
**Status:** Superseded by Gjoa (source fork), v0.43.0 final release

---

## Overview

Palefox is a chrome-privileged userscript bundle for Firefox that rewrites the sidebar to host a tree-tab panel with vim keybindings, plus drawer-level chrome restructuring (compact mode, urlbar relocation, etc.). It runs via [fx-autoconfig](https://github.com/MrOtherGuy/fx-autoconfig) and scripts execute in Firefox's privileged scope (access to `gBrowser`, `Services`, `ChromeUtils`, raw XUL elements).

**No longer actively developed** — development moved to a Firefox source fork: [github.com/tompassarelli/gjoa](https://github.com/tompassarelli/gjoa). The userscript bundle hit hard ceilings (couldn't swap storage backend for FTS5 search, couldn't patch internals, chrome API ABI moved between Firefox releases).

---

## Key Features

- **Vim & Emacs keys** — modal navigation, refile, search, no mouse needed
- **Tree tabs** — deep nesting, groups, multi-select, drag-and-drop
- **Horizontal mode** — same tree, laid across the top instead
- **Compact mode** — sidebar autohides offscreen, springs out on left-edge hover
- **Collapse layout** — icons-only strip, toolbox returns to horizontal
- **Sidebar button** — left-click toggles compact, right-click for layout menu
- **Floating urlbar** — expands past the sidebar when focused
- **HTTP warning** — delayed banner avoids false alarms on redirects
- **Draggable sidebar** — grab window from empty sidebar space (floating WMs)
- **Theme-respecting** — uses Firefox's native CSS variables, works with any theme

---

## Architecture

### Repo Layout

```
src/tabs/        palefox-tabs.uc.js — sidebar tree-tab panel
  index.ts         orchestrator (wires factories, owns init)
  vim.ts           keymap, ex-mode, picker, search, blacklist
  rows.ts          row DOM creation / sync / visibility (factory)
  drag.ts          drag-and-drop (factory)
  layout.ts        panel positioning (factory)
  menu.ts          context menu (factory)
  events.ts        TabOpen/Close/Move/Select wiring
  history.ts       SQLite temporal substrate (events, sessions, retention)
  snapshot.ts      tree → envelope helpers + makeSaver
  content-focus.ts cross-process editable-element detection bridge
  helpers.ts       pure tree walks (treeData, levelOf, subtreeRows, …)
  state.ts         shared mutable singletons + WeakMaps
  types.ts         Tab, TreeData, Group, Row, SavedNode
  constants.ts     INDENT, CHORD_TIMEOUT, etc.
  log.ts           createLogger() — pfx.debug-gated
  *.test.ts        Tier 1 unit tests (bun test)

src/drawer/      palefox-drawer.uc.js — chrome restructuring
  index.ts         thin orchestrator — wires factories, runs the Ctrl+L keymap
  layout.ts        toolbox/urlbar reparenting + width sync + width pref (factory)
  drag-overlay.ts  -moz-window-dragging overlay over empty sidebar space (factory)
  banner.ts        HTTP not-secure warning banner (factory)
  compact.ts       compact-mode state machine (factory)
  urlbar.ts        floating urlbar + Ctrl+J/K suggestion nav (factory)
  sidebar-button.ts  custom #pfx-sidebar-button + context menu (factory)

src/firefox/     Firefox adapter layer — typed wrappers around chrome globals
  tabs.ts          gBrowser tab ops (allTabs / selectedTab / pinTab / …)
  prefs.ts         Services.prefs get/set/observe
  observers.ts     Services.obs add/remove/notify
  files.ts         IOUtils + PathUtils + profile-relative helpers
  dom.ts           createXULElement factories typed by tag
  window.ts        well-known chrome IDs + system principal + ESM loader

src/platform/    Palefox semantic platform layer (the capability API)
  index.ts         exports `Palefox` namespace; one per chrome window
  scheduler.ts     central scheduler with markDirty/flush/diag
  tabs-reconciler.ts  bridges Firefox tab events into the scheduler
  window.ts        PalefoxWindow facade (`Palefox.windows.current()`)
  window-tabs.ts   `WindowTabsAPI` — list/selected/pin/close/etc.

chrome/
  JS/*.uc.js              BUILT — do NOT hand-edit
  palefox.css             core theme + aggregator (@imports sub-files)
  palefox-<name>.css      per-area sheets
  userChrome.css          Firefox entry point (only imports palefox.css + user.css)
  user.css                user-owned, not overwritten
```

### Module Conventions

Three kinds of TS module:

1. **Factory modules** (common for >150-line files) — expose curated API backed by private state. Required layout: INTERFACE section (types + API) then IMPLEMENTATION section (private state + functions). Reference: `src/drawer/compact.ts`
2. **Utility / pure-function modules** (`helpers.ts`) — every export IS the interface. Use thematic subsections.
3. **Orchestrator / entry-point modules** (`tabs/index.ts`, `drawer/index.ts`) — wires factories, runs init. No INTERFACE markers.

### State Sharing

- `src/tabs/state.ts` — WeakMaps + Sets + Arrays exported as named consts (`treeOf`, `rowOf`, `movingTabs`, `selection`, `savedTabQueue`, `closedTabs`)
- A `state` object holds singletons: `panel`, `spacer`, `pinnedContainer`, `contextTab`, `cursor`, `nextTabId`
- Cross-module wiring uses factory pattern with `let` declarations + thunks for circular dependencies

### Firefox Adapter Layer

- New feature code talks to `Palefox.windows.current().*` (semantic layer in `src/platform/`) or `src/firefox/<adapter>.ts`
- Raw `gBrowser` / `Services` / `gURLBar` access outside the adapter layer is forbidden
- Live state is window-scoped, persisted is global
- Mutations are synchronous; reconcile is microtask-deferred

---

## Theming & Colors

### Palette (defined in `chrome/palefox.css`)

| Variable | Light | Dark | Used by |
|----------|-------|------|---------|
| `--pfx-bg` | `#f9f9fb` | `#1c1b22` | Sidebar, navigator-toolbox, tab panel, pinned area |
| `--pfx-bg-elevated` | `#ffffff` | `#2b2a33` | Reserved for hover/selected surfaces |
| `--pfx-bg-popout` | `#f9f9fb` | `#1c1b22` | Horizontal-mode tree popout cells |
| `--pfx-fg` | `#15141a` | `#fbfbfe` | Reserved for text-color overrides |
| `--pfx-fg-muted` | `#5b5b66` | `#b0b0bb` | Reserved for dimmed text |
| `--pfx-border` | `rgba(0,0,0,0.12)` | `rgba(255,255,255,0.12)` | Reserved for dividers |
| `--pfx-accent` | `#0061e0` | `#00ddff` | Reserved for highlights |

### Why Custom Palette

On Linux, Firefox's `--sidebar-background-color` falls back to GTK's `-moz-sidebar` system token, which on non-Adwaita/minimal compositor setups (KDE without breeze-gtk, Hyprland with no GTK theme) resolves to a **transparent alpha-0 value**. With compositors that apply blur to non-opaque pixels, the desktop shows through the sidebar.

Palefox stamps its palette over every Firefox theme variable the chrome surfaces read — toolbar, LWT base, toolbar buttons, urlbar, sidebar, tabs, separators, popups.

### Opting Back In

Set `pfx.theme.useSystem=true` in `about:config` to inherit from Firefox's theme chain. Risky on Linux with the GTK transparency bug.

### Customization

User overrides go in `chrome/user.css` (never overwritten on update).

---

## about:config Prefs

| Pref | Default | Description |
|------|---------|-------------|
| `pfx.sidebar.compact` | `false` | Autohide sidebar, reveal on left-edge hover |
| `pfx.sidebar.menuBar` | `false` | Show the menu bar |
| `pfx.sidebar.newTab` | `false` | Show new tab button in sidebar |
| `pfx.sidebar.width` | `300` | Sidebar width in pixels |
| `pfx.tabs.newTabPosition` | `"root"` | Where new tabs appear: `"root"`, `"child"`, `"sibling"` |
| `pfx.view.draggable-sidebar` | `true` | Drag window from empty sidebar space |
| `pfx.toolbar.tabsBelowNavBar` | `false` | Horizontal mode: tabs below nav-bar |
| `pfx.toolbar.newTabButton` | `false` | Show toolbar + new-tab button |
| `pfx.urlbar.float` | `false` | Float urlbar as top-layer overlay when focused |
| `pfx.debug` | `false` | Write timestamped event logs to `<profile>/palefox-debug.log` |
| `pfx.theme.useSystem` | `false` | Opt into Firefox's theme chain |

---

## Build & Test

```bash
bun run dev         # build + watch
bun run build       # one-shot production build
bun run typecheck   # tsc --noEmit
bun test            # pure-function unit tests (Tier 1)
bun run test:integration  # Tier 3 Marionette tests
```

- `chrome/JS/*.uc.js` are generated — edit `src/` and run `bun run build`
- Type errors do NOT fail the build — run `bun run typecheck` separately
- Testing tiers: Tier 1 (unit), Tier 2 (happy-dom mocks), Tier 3 (Marionette), Tier 4 (AI iteration loop)

---

## Relevance to Higgs Boson Firefox Theme

Palefox is a **competing/complementary project** to the Higgs Boson Firefox Theme in this repo. Key differences:

| Aspect | Higgs Boson | Palefox |
|--------|-------------|---------|
| Approach | CSS + userChrome.js scripts | TypeScript → compiled .uc.js |
| Sidebar | Second sidebar system (Vivaldi/Floorp-style web panels) | Tree tabs with vim keybindings |
| Build | No formal build system | Bun-based build pipeline |
| Testing | Manual | Tiered (unit, happy-dom, Marionette) |
| Status | Active | Superseded by Gjoa |
| Language | CSS + JS (.uc.js) | TypeScript (compiled to .uc.js) |
| Architecture | Modular CSS + standalone scripts | Factory pattern with adapter layers |

Palefox's **theming approach** (custom `--pfx-*` palette, shielding against Firefox theme variable leaks, `light-dark()` for system scheme) is directly applicable to Higgs Boson. The **compact mode state machine** and **sidebar button** patterns are also worth studying.

---

## Key Lessons for Higgs Boson

1. **Theme variable shielding** — Palefox stamps over every Firefox theme variable to prevent GTK transparency leaks. Higgs Boson could adopt a similar `--hb-*` palette approach.
2. **Factory pattern** — Palefox's INTERFACE/IMPLEMENTATION split in factory modules is a clean pattern for complex JS modules.
3. **Firefox adapter layer** — Abstracting raw chrome globals behind typed wrappers makes the codebase more resilient to Firefox API changes.
4. **Compact mode** — Palefox's compact mode state machine (autohide sidebar, spring animation, left-edge hover) is a reference implementation.
5. **user.css** — Never-overwritten user override file is a good pattern for user customizations.
