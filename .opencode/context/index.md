# LLM Wiki Index

## Architecture & Structure

- [architecture/codebase-map.md](architecture/codebase-map.md) — Full codebase map: directory tree, file counts by extension, large files, discrepancies vs AGENTS.md.
- [architecture/architecture-analysis.md](architecture/architecture-analysis.md) — Three-layer entry point analysis, module structure, CSS variable flow, sidebar init flow, key patterns, architecture risks.
- [architecture/conventions.md](architecture/conventions.md) — Coding conventions: file naming, code style, naming patterns, JS patterns, CSS patterns, error handling, git conventions.

## Plans & Brainstorms

- [userchrome-ideas-brainstorm.md](userchrome-ideas-brainstorm.md) — 37 userChrome.js feature ideas across 6 themes, ranked by impact/feasibility. Top 5: Command Palette, Tab Search, URL Cleaner, Temporary Container, Tab Snooze.

## External References

- [research/firefox-fork-embedding/](research/firefox-fork-embedding/) — Embedding the theme + userChrome.js into a Firefox fork with the least compilation. 13 files: build system & artifact builds, jar.mn/omni.ja packaging, CSS cascade origins, JS injection & startup, prefs/policies, packaging & `mach repackage`, **per-fork deep-dives**, maintenance/rebase/dev-loop, security/pitfalls, an **exhaustive fork catalogue**, the 97-repo `Thomashighbaugh/firefox-modification` ecosystem, and a **SPECIAL ATTENTION** file (Midori patch system + how to embed the scripts, Palefox loader security, Gjoa build lanes, Hilal Rust patch manager + Android). Key insight: author-origin CSS removes the `!important` arms race.
- [research/firefox-esmification/](research/firefox-esmification/) — Firefox JSM-to-ESM Phase 1 Migration Guide. Conversion of Mozilla's legacy JSM module system to standard `.sys.mjs` ES modules. New APIs (`ChromeUtils.importESModule`, `defineESModuleGetters`), compatibility layer with auto-redirect, `./mach esmify` walkthrough. Relevant to understanding Firefox internals used by userChrome.js scripts.
- [research/malevich/](research/malevich/) — Malevich (hermitm0nk). Minimalist Firefox userChrome theme — auto-hide UI, native vertical tabs (FF136+), sidebar-on-right, 9 modular CSS modules. MIT license. Relevant CSS architecture patterns for auto-hide and modular theming.
- [research/quick-tabs/](research/quick-tabs/) — Quick Tabs for Zen Browser (Darsh-A). Floating tab containers via userChrome.js. Exposes `window.QuickTabs` API with open, clone, and container info methods. Relevant to floating panel / popup container patterns.
- [research/better-advanced-tab-groups/](research/better-advanced-tab-groups/) — Better Advanced Tab Groups userChrome.js reference. Folder/group toggle for `tab-group`, persistent `groups` state, right-click color picker, and Zen-vertical-tabs CSS theming.
- [research/ywzhaiqi-userchromejs/](research/ywzhaiqi-userchromejs/) — ywzhaiqi/userChromeJS Chinese-language collection of userChrome.js scripts. Discontinued historical catalog of menu customization, sidebar gestures, download tools, and loader patterns. Useful as an idea/reference index for legacy Firefox scripting.
- [research/midori-desktop/](research/midori-desktop/) — Midori Browser (goastian/midori-desktop). Lightweight privacy-focused Firefox fork by Astian, Inc. Cross-platform (Win/macOS/Linux). Uses the same `userChrome.css` + modular `CSS/` + `JS/ .uc.js` layout as the Higgs Boson theme. Relevant as a real-world consumer of userChrome patterns.
- [research/goastian-amelia/](research/goastian-amelia/) — Amelia (`@goastian/amelia`). Build tool for Midori Browser. Forked from Zen Browser's Surfer → Gluon → melon lineage. TypeScript wrapper around Mozilla's `mach` commands. Adds CI-safe packaging, Tor preflight, explicit aborts, and addon mozbuild resolution. Relevant if the theme ever ships as a Midori-flavored build.
