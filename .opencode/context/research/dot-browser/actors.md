# Dot Browser — JSWindowActor Reference

**Source:** https://github.com/dothq/browser-desktop/tree/nightly/actors  
**Date consumed:** 2026-06-27  
**Branch:** nightly

## Overview

Firefox JSWindowActor (Fission-compatible) actors for the **Dot Browser** — a Firefox fork with custom UI. Each actor handles browser↔content process IPC for a specific feature area.

---

## File Inventory

### Click Handling

| File | Type | Exports |
|------|------|---------|
| `DotClickHandlerChild.sys.mjs` | Child | `DotClickHandlerChild extends JSWindowActorChild` |
| `DotClickHandlerParent.sys.mjs` | Parent | `DotClickHandlerParent extends JSWindowActorParent` |

**Child:** Empty class — no custom behavior defined yet.  
**Parent:** Empty class — no custom behavior defined yet.

---

### Context Menu

| File | Type | Exports |
|------|------|---------|
| `DotContextMenuChild.sys.mjs` | Child | `DotContextMenuChild extends JSWindowActorChild` |
| `DotContextMenuParent.sys.mjs` | Parent | `DotContextMenuParent extends JSWindowActorParent` |

**Child** — Handles two events:
- `contextmenu` DOM event → captures context data (`createContext()`), sends `contextmenu` async message with `ContentDOMReference`, screen coords, and context object.
- `ContextMenu::Launch` custom event → collects XUL `<menupopup>` items from the event bubble path, clones them into a constructed `#constructed-context-menu`, opens at screen position.

Dependencies: `ContentDOMReference`, `DOMUtils`, `BrowserCustomizableShared`.

**Parent** — Receives `contextmenu` message:
- Resolves target via `ContentDOMReference.resolve()`.
- Falls back to `embedderElement` or `topChromeWindow`.
- Dispatches a `ContextMenu::Launch` custom event on the resolved target.

---

### DevTools

| File | Type | Exports |
|------|------|---------|
| `DotDevToolsChild.sys.mjs` | Child | `DotDevToolsChild extends JSWindowActorChild` |

Injects `chrome://dot/content/devtools/devtools.css` as an **AUTHOR_SHEET** into content documents. Triggered on `DOMDocElementInserted` and `DOMContentLoaded`.

---

### Gecko Commands

| File | Type | Exports |
|------|------|---------|
| `DotGeckoCommandsChild.sys.mjs` | Child | `GeckoCommandsChild extends JSWindowActorChild` |

Manages copy/cut state based on focus and selection:
- `hasSelection` getter checks `contentWindow.getSelection()`.
- On `focus`/`blur` of HTMLInputElement, updates `_canCopy` / `_canCut` and sends `GeckoCommands:CommandUpdate` to parent.
- `receiveMessage`: handles `GeckoCommands:ExecuteCommand` → calls `docShell.doCommand()`.

---

### Link Handling (Favicons)

| File | Type | Exports |
|------|------|---------|
| `DotLinkHandlerParent.sys.mjs` | Parent | `LinkHandlerParent extends JSWindowActorParent` |

Handles favicon / tab icon lifecycle:
- `Link:LoadingIcon` → sets `pendingicon` attribute on tab.
- `Link:SetIcon` → validates icon URL via security check, stores via `PlacesUIUtils.loadFavicon`, updates tab icon.
- `Link:SetFailedIcon` → clears `pendingicon` attribute.

Dependencies: `PlacesUIUtils`.

---

### Link Status (Hover)

| File | Type | Exports |
|------|------|---------|
| `DotLinkStatusChild.sys.mjs` | Child | `LinkStatusChild extends JSWindowActorChild` |
| `DotLinkStatusParent.sys.mjs` | Parent | `LinkStatusParent extends JSWindowActorParent` |

**Child:**
- `mousemove` → sends `LinkStatus:OverLink` with href.
- `mouseout` → sends `LinkStatus:OverLink` with null after 10ms debounce (avoids flicker when moving between links).
- Deduplicates same-href events.

**Parent:**
- `LinkStatus:OverLink` → sets overLink status via `gDot.status.setTabStatus()` or `gDot.status.setStatus()`, depending on whether a tab can be resolved.

Dependencies: `BrowserUtils`, `Timer`.

---

### Prompts

| File | Type | Exports |
|------|------|---------|
| `DotPromptParent.sys.mjs` | Parent | `PromptParent extends JSWindowActorParent` |

Routes prompt modals based on modal type:
- `MODAL_TYPE_CONTENT` / `MODAL_TYPE_TAB` → `BrowserContentPrompts`
- `MODAL_TYPE_WINDOW` → `BrowserWindowPrompts`
- `MODAL_TYPE_INTERNAL_WINDOW` → `BrowserChromePrompts`

Gets the chrome window via `browsingContext.top.embedderElement?.ownerGlobal` or `topChromeWindow`.

Dependencies: `BrowserWindowPrompts`, `BrowserContentPrompts`, `BrowserChromePrompts`, `PromptUtils`.

---

### Tooltips

| File | Type | Exports |
|------|------|---------|
| `DotTooltipListenerChild.sys.mjs` | Child | `DotTooltipListenerChild extends JSWindowActorChild` |

Comprehensive tooltip implementation (~280 lines):
- Replaces `nsXULTooltipListener` for custom Dot UI.
- **Two display locations:** Floating (default, 500ms delay) / Statusbar (100ms delay).
- **Auto-hide:** Hides on wheel, mousedown, mouseup, keydown (modifier-aware), dragstart.
- **Mouse movement tolerance:** 7px tolerance before hiding floating tooltips.
- **`noautohide` attribute:** Tooltip can opt out of auto-hiding.
- **Tooltip discovery:** Walks shadow DOM via `DOMUtils.shadowClosest()` looking for `[tooltip]` attribute.
- **Tooltip anchors:** Supports `tooltipanchor` attribute for anchor-based positioning.
- **Trigger node tracking:** Sets `tooltipopen` attribute on trigger node while tooltip is shown.
- Adds listeners on `DOMContentLoaded`.

Dependencies: `Timer`, `AppConstants`, `DOMUtils`.

---

### UA Styles

| File | Type | Exports |
|------|------|---------|
| `DotUAStylesChild.sys.mjs` | Child | `DotUAStylesChild extends JSWindowActorChild` |

Injects `chrome://dot/skin/tooltip.css` as an **AGENT_SHEET** into content documents. Triggered on `DOMDocElementInserted` and `DOMContentLoaded`.

---

## Build System

`moz.build` registers all 12 `.sys.mjs` files into `FINAL_TARGET_FILES.actors`.

---

## Patterns & Conventions

1. **Naming:** `Dot{Feature}{Role}.sys.mjs` — consistent prefix `Dot`, role suffix `Child`/`Parent`.
2. **IPC:** Child sends async messages via `sendAsyncMessage()`; parent handles via `receiveMessage()`.
3. **Chrome Window Resolution:** `browsingContext.top.embedderElement?.ownerGlobal` or `topChromeWindow`.
4. **Tab Access via gDot:** `win.gDot.tabs.getTabForWebContents(browser)`.
5. **No ESM imports from Dot modules** — all actors import only from Firefox core (`resource://gre/`).
6. **System principal stylesheet injection** via `windowUtils.loadSheetUsingURIString()`.
7. **TypeScript JSDoc annotations** referencing `third_party/dothq/gecko-types/lib`.
