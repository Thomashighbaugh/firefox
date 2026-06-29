# Floorp Browser — Firefox Fork Research

**Source:** https://github.com/Floorp-Projects/Floorp  
**Fetched:** 2026-06-27  
**Stars:** 8,200 | **Forks:** 255 | **Commits:** 1,466 | **Releases:** 149 (latest v12.15.2, Jun 2026)

---

## Overview

Floorp is a **Firefox-based browser** ("Noraneko") built on top of the Gecko engine. It's the most popular and sophisticated Firefox derivative in this research set — a full production browser with corporate sponsors (CubeSoft, 1Password, SignPath), Apple notarization, Windows code signing, and a 24-person contributor team.

**Author:** Floorp Projects (lead: Ryosuke-Asano)  
**License:** MPL-2.0  
**Website:** https://floorp.app  
**Target:** Windows, macOS, Linux (x86_64 + AArch64)

---

## Architecture (5 Layers)

```
Firefox Base  <- patched Gecko, pref overrides (static/gecko/pref/override.ini)
     |
ESM Modules   <- .sys.mts files with direct Firefox API access, Window Actors
     |
Bridge        <- startup scripts that load features from Vite dev servers (HTTP) or chrome://noraneko/ (prod)
     |
Chrome UI     <- SolidJS -> XUL via custom solid-xul renderer, auto-discovered by import.meta.glob
     |
Pages         <- React + Tailwind full-page UIs (settings, new tab, welcome, notes, etc.)
```

The bridge (`bridge/startup/src/chrome_root.ts`) is the bootstrap: in dev/test mode it loads from `http://localhost:5181/loader/index.ts` with retry logic; in production it loads `chrome://noraneko/content/core.js`.

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Runtime** | Deno 2.x (primary), Node.js 22 (some pages) | Build tooling |
| **Browser Chrome UI** | SolidJS + `@nora/solid-xul` | Custom XUL renderer via `solid-js/universal` |
| **Settings/Pages** | React + Tailwind CSS | Full-page UIs |
| **Build** | Vite via custom `feles-build` system | HMR, production builds |
| **Language** | TypeScript (strict, no `any`) | All code |
| **Testing** | In-browser Marionette | Tests run inside actual Firefox |
| **Dev CLI** | `dev-tool` (Marionette protocol) | Browser inspection, eval, screenshot |

---

## Build System

```bash
deno install                        # Install dependencies
deno task feles-build dev           # Dev mode with HMR (ports 5173-5186)
deno task feles-build build         # Production build (two-phase)
deno task feles-build stage         # Staging build
deno task feles-build test          # Launch browser with Marionette
deno task feles-build misc patch    # Manage Firefox source patches
deno task test                      # Run unit tests (in-browser)
deno task dev-tool                  # Browser inspection CLI
```

### Dev Server Ports
- 5173: Main features
- 5174-5177: Other pages
- 5178: Settings pages
- 5181: Feature loader (bridge)
- 5186: New tab page

---

## Feature System

### Auto-Discovery
`browser-features/chrome/common/mod.ts` uses `import.meta.glob("./*/index.ts")` -- adding a directory with an `index.ts` under `common/` is sufficient. No manual registration needed.

### File Placement

| What | Where | Framework |
|------|-------|-----------|
| Browser UI feature | `browser-features/chrome/common/{name}/` | SolidJS |
| Firefox API module | `browser-features/modules/modules/{name}.sys.mts` | Firefox ESM |
| Settings page | `browser-features/pages-settings/src/app/{name}/` | React |
| Actor (IPC) | `browser-features/modules/actors/{Name}Parent|Child.sys.mts` | Firefox ESM |

### SolidJS Pattern (Browser Chrome)

```typescript
import { noraComponent, NoraComponentBase } from "#features-chrome/utils/base";
import { render } from "@nora/solid-xul";
import { createSignal } from "solid-js";

@noraComponent(import.meta.hot)
export default class MyFeature extends NoraComponentBase {
  init(): void { /* ... */ }
}
```

- `@noraComponent(import.meta.hot)` decorator for HMR support
- `createSignal` / `createMemo` for reactive state
- Custom `solid-xul` renderer uses `document.createXULElement()` via `solid-js/universal`

---

## Dev-Tool CLI

`deno task dev-tool` communicates via **Marionette protocol** (Firefox's TCP-based WebDriver):

```bash
deno task dev-tool start              # Start dev server + browser
deno task dev-tool stop               # Kill all dev processes
deno task dev-tool status             # Check connection
deno task dev-tool eval "..."         # Execute JS in browser
deno task dev-tool console            # Last 50 console messages
deno task dev-tool screenshot         # Full-page screenshot
deno task dev-tool navigate about:preferences  # Navigate browser
deno task dev-tool dom "#sidebar-box" # Inspect DOM
deno task dev-tool rebuild            # Rebuild without restarting browser
```

Context flag (`--context` / `-c`): `chrome` (default, access `Services`, `gBrowser`) or `content` (web page DOM).

---

## Testing

Tests run **inside the actual Firefox browser**, not in Deno/Node. They are plain TypeScript functions with a custom harness:

```typescript
// @colocated-env browser
import { type TestCase, assert } from "../../../test/utils/test_harness.ts";

function testSomething(): void {
  assert(condition, "message");
}

export function runAllTests(): void {
  const tests: TestCase[] = [{ name: "something works", fn: testSomething }];
}
```

Colocated in `test/` directories next to source. Runner discovers automatically. Layer filters: `chrome`, `esm`, `pages`, `all`.

---

## Theming & UI

Floorp uses **Lepton** (Firefox UI Fix by black7375) as its theming base, plus a built-in **userChromeCSS Loader** for user customization. It also has a **Paxmod**-inspired tab system and **Fushra Pulse**-inspired features.

---

## Relevance to Shadowfox

| Aspect | Floorp | Shadowfox |
|--------|--------|-----------|
| **Approach** | Firefox source fork + 5-layer overlay | CSS + userChrome.js overlay |
| **Scope** | Full production browser | UI customization only |
| **Build** | Deno + Vite + feles-build | No build system |
| **Chrome UI** | SolidJS -> XUL (custom renderer) | Raw CSS/JS |
| **Pages** | React + Tailwind | N/A |
| **Testing** | In-browser Marionette tests | Manual |
| **HMR** | Yes (ports 5173-5186) | No |
| **Dev CLI** | Marionette-based dev-tool | No |
| **i18n** | Crowdin (20+ languages) | No |
| **Stars** | 8,200 | -- |
| **Status** | Active, production-grade | Active |

**Key lessons for Shadowfox:**

1. **SolidJS for browser chrome** -- Floorp uses SolidJS with a custom `solid-xul` renderer to build browser UI components. This is a radical departure from traditional userChrome.js approaches. It enables reactive state management, HMR, and component-based architecture for browser chrome.

2. **5-layer architecture** -- The separation into Firefox Base -> ESM Modules -> Bridge -> Chrome UI -> Pages is a clean architectural pattern. Shadowfox's second sidebar system (100+ files) could benefit from a similar layering.

3. **HMR for browser chrome** -- Floorp's Vite-based HMR allows editing browser UI code and seeing changes without restarting the browser. This is a massive productivity improvement over Shadowfox's edit-restart cycle.

4. **Marionette dev-tool** -- The `dev-tool` CLI for browser inspection (eval, screenshot, DOM inspection, console) is a powerful debugging tool. Shadowfox has no equivalent.

5. **In-browser testing** -- Tests run inside the actual Firefox browser via Marionette. This is the most realistic testing approach -- it catches real browser behavior that unit tests miss.

6. **Feature auto-discovery** -- `import.meta.glob("./*/index.ts")` for automatic feature registration. Shadowfox could adopt a similar pattern for its CSS/JS modules.

7. **TypeScript strict mode** -- Floorp enforces `no any` with explicit types or `unknown`. This is the strictest TypeScript policy in the research set.

8. **userChromeCSS Loader built-in** -- Floorp ships a built-in userChromeCSS loader, meaning users can customize it with standard userChrome.css. This is the bridge between Floorp's modern architecture and Shadowfox's traditional approach.

9. **Corporate sponsorship** -- Floorp has real corporate sponsors and code signing. This is a different tier of project maturity.

10. **i18n infrastructure** -- Crowdin-based translation system with 20+ languages. Shadowfox has no i18n support.
