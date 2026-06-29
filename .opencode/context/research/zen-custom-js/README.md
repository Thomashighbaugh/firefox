# Zen Browser UserScripts — Firefox Customization Research

**Source:** https://github.com/BibekBhusal0/zen-custom-js  
**Fetched:** 2026-06-27  
**Stars:** 78 | **Forks:** 11 | **Commits:** 1,684 | **Releases:** 6

---

## Overview

A collection of user scripts and CSS modifications for **Zen Browser** (a Firefox-based browser). Each feature is self-contained in its own directory. Uses Bun as the build system to bundle scripts into `.uc.js` files.

**Author:** BibekBhusal0  
**License:** MIT  
**Target:** Zen Browser (primary), may work on other Firefox-based browsers  
**Loader:** fx-autoconfig (or Sine for easy install)

---

## Architecture

### Build System

Uses **Bun** as the build system to bundle ES modules into `.uc.js` files:

```bash
bun run build              # Build all mods
bun run build:browsebot    # Build specific mod
bun run dev                # Watch mode (auto-rebuild on changes)
bun run format             # Format code with Prettier
bun run lint               # Run ESLint
```

Bundled output goes to `dist/`. No test framework — manual testing in browser.

### Repo Layout

```
command-palette/       — Advanced command interface in URL bar
findbar-ai/            — AI functionality inside findbar and URL bar
reopen-closed-tabs/    — Search through recently closed tabs
settings-shortcuts-search/ — Dynamic search for settings shortcuts
search-engine-select/  — Quick search engine switching
compact-settings/      — Expand sidebar of settings on hover
floating-sidebar/      — Floating sidebar (left or right)
css/                   — Shared CSS
utils/                 — Shared utilities (prefs, parsing, etc.)
templates/             — Mod templates
others/                — Miscellaneous scripts
dist/                  — Built output

import.uc.mjs          — Script import entry point
import2.uc.mjs         — Alternative import entry point
userChrome.css         — CSS import entry point
userContent.css        — Content CSS
build.js               — Bun build script
preferences.json       — Combined preferences
theme.json             — Theme configuration
zen-commands-settings.json — Command settings
```

### Mod Structure

Each mod directory contains:
- `index.js` — Main script logic
- `style.css` — Mod-specific styles
- `theme.json` — Metadata (name, version, id, js flag, vertex flag)
- `preferences.json` — Mod-specific preferences
- `README.md` — Documentation
- Optional: `utils/`, `release-notes.md`

---

## Mods

| Mod | Description | Key Feature |
|-----|-------------|-------------|
| **Command Palette** | Advanced command interface in URL bar | Browser-wide command system |
| **Findbar AI/BrowseBot** | AI functionality inside findbar and URL bar | LLM integration in browser chrome |
| **Reopen Closed Tabs** | Search through recently closed tabs | Tab recovery with search |
| **Keyboard Shortcuts Search** | Dynamic search for settings shortcuts | Settings discovery |
| **Search Engine Select** | Quick search engine switching | One-click engine switching |
| **Compact Settings** | Expand sidebar of settings on hover | Settings UI density |
| **Floating Sidebar** | Floating sidebar (left or right) | Sidebar positioning |

---

## Code Conventions

### Imports & Modules
- ES6 modules (`import`/`export`)
- Firefox globals via `ChromeUtils.importESModule`
- Shared utilities from `utils/` directory
- Relative imports: `../utils/` for shared, `./utils/` for mod-specific

### Naming
- Variables/functions: `camelCase`
- Classes: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`
- Private methods: underscore prefix (`_closeUrlBar`)
- Event handlers: descriptive (`handleUrlbarClose`)

### Preferences Pattern
Each mod extends a base `PREFS` class from `utils/pref.js`:

```javascript
class ModNamePREFS extends BasePREFS {
  static MOD_NAME = "ModName";
  static DEBUG_MODE = "mod-name.debug-mode";
  static ENABLED = "mod-name.enabled";
  // ...
}
```

### Debug Logging
- `debugLog(...)` for debug output (only in debug mode)
- `debugError(...)` for errors
- Prefix logs with mod name: `console.log("Palette:", ...args)`

### DOM Manipulation
- `parseElement()` from `utils/parse.js` for creating elements
- `escapeXmlAttribute()` for XUL attribute values
- `svgToUrl()` for icon handling

### Publishing
- Automated via GitHub Actions
- Increment `version` in `theme.json` to trigger release
- Versions ending with `b` (e.g., `1.0.1b`) go to beta branch
- Published to dedicated repos under `Vertex-Mods` organization
- PRs submitted to Sine Store for stable releases

---

## Relevance to Shadowfox

| Aspect | Zen Custom JS | Shadowfox |
|--------|---------------|-----------|
| **Target** | Zen Browser (Firefox fork) | Firefox (any version) |
| **Approach** | ES modules -> Bun -> .uc.js | Raw .uc.js scripts |
| **Build** | Bun build system | No build system |
| **Modularity** | Self-contained mods per directory | Modular CSS + standalone scripts |
| **Loader** | fx-autoconfig (or Sine) | fx-autoconfig |
| **Testing** | None (manual) | Manual |
| **Scripts** | 7 mods | 15 standalone scripts |
| **Stars** | 78 | -- |

**Key lessons for Shadowfox:**

1. **Bun build pipeline** — This repo demonstrates a clean Bun-based build system for userChrome.js scripts. ES modules -> bundled `.uc.js`. Shadowfox could adopt this for its JS modules (similar to Palefox's approach).

2. **Self-contained mods** — Each feature is a self-contained directory with its own `index.js`, `style.css`, `theme.json`, and `preferences.json`. Clean separation of concerns. Shadowfox's second sidebar system (100+ files) could benefit from this structure.

3. **Preferences pattern** — The base `PREFS` class with `getPref`/`setPref`/`setInitialPrefs` is a clean pattern for managing `about:config` preferences. Shadowfox could adopt a similar `sfx.*` pref namespace.

4. **Floating sidebar** — The floating sidebar mod (left or right positioning) is directly relevant to Shadowfox's sidebar system.

5. **Command palette** — The URL bar command interface is a novel approach to browser navigation. Shadowfox could integrate a similar concept.

6. **AI in findbar** — The BrowseBot mod integrates LLM functionality into the browser chrome (findbar + URL bar). This is a forward-looking feature.

7. **Publishing workflow** — Automated GitHub Actions for building, publishing to dedicated repos, and submitting PRs to a mod store. Shadowfox could adopt a similar release pipeline.

8. **No TypeScript** — Uses JSDoc for type documentation instead of TypeScript. This is a lighter-weight approach than Palefox's full TypeScript pipeline.
