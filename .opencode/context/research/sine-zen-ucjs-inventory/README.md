---
title: "Sine + Zen uc.js Inventory"
type: source-summary
tags: [userchrome, uc-js, sine, zen-browser, fx-autoconfig, theme-store, mods, catalogue]
created: 2026-10-12
updated: 2026-10-12
source: https://sineorg.github.io/store/marketplace.json
status: active
---

# Sine + Zen `.uc.js` Inventory

Exhaustive survey of `.uc.js` / `.uc.mjs` / `.sys.mjs` assets packaged for the
**Sine** mod store or the **Zen Browser** mod ecosystem that are **not** already
present in this project's `JS/` directory.

## Files

| File | Contents |
|------|----------|
| [`01-sine-marketplace-js-mods.md`](01-sine-marketplace-js-mods.md) | **41 Sine mods shipping JS** — 109 script files (62 mod files + 47 Natsumi modules). Every link commit-pinned and verified. |
| [`02-sine-store-unpublished.md`](02-sine-store-unpublished.md) | 16 script files staged in `Darsh-A/sine-store` but absent from the live registry, incl. an undocumented 10-script bundle. |
| [`03-darsh-a-standalone.md`](03-darsh-a-standalone.md) | 6 Zen script files in standalone repos, never store-packaged. |
| [`04-zen-mods-css-registry.md`](04-zen-mods-css-registry.md) | All 77 Zen Mods store entries — CSS / `preferences.json` only, no JS. |
| [`05-standalone-collections.md`](05-standalone-collections.md) | 49 `.uc.js` files from 5 non-Zen, Zen-independent collections. |
| [`inventory.csv`](inventory.csv) | Machine-readable: mod, file, repo, commit, raw URL, provenance. 109 rows. |
| [`.links-raw.json`](.links-raw.json) | Raw extracted link records. |

## Headline Numbers

| Source | Mods | Script files | New to this project |
|--------|-----:|-------------:|--------------------:|
| Sine Marketplace (live registry) | 41 ship JS | 109 | 109 |
| Sine store repo (staged, unpublished) | 4 | 16 | 16 |
| Darsh-A standalone repos | 5 | 6 | 6 |
| Zen Mods store | 77 | 0 (CSS only) | n/a |
| Standalone collections (non-Zen) | 5 repos | 49 | 49 |
| fx-autoconfig reference | 1 | 2 prod (+17 test) | 2 |
| **Total** | | **~182** | **~182** |

The 109 Sine Marketplace files = 62 from 40 non-Natsumi mods + 47 from Natsumi
Browser's `natsumi/scripts/` tree (35 `.uc.mjs` + 12 `.sys.mjs`).

## Overlap With This Project

Exactly **one** asset overlaps: `JS/quick_tabs.uc.js` is this project's port of
Darsh-A's `Quick_Tabs.uc.js`. Everything else is net-new.

## How This Was Derived

The registries were read **directly**, not from search snippets:

1. **Sine marketplace** — traced `src/services/marketplace.sys.mjs` in
   [`CosmoCreeper/Sine`](https://github.com/CosmoCreeper/Sine) to find the hardcoded
   fetch URL `https://sineorg.github.io/store/marketplace.json`. That JSON is the
   authoritative registry. Note the repo's own `mods.json` **does not exist**
   (returns 404) despite the README describing it.
2. **Zen theme store** — `https://raw.githubusercontent.com/zen-browser/theme-store/main/themes.json`
   (77 entries).
3. **GitHub tree walks** for the long-tail repos.

### Link Provenance

Every URL in `01` and `inventory.csv` is pinned to the **commit SHA** recorded in
the Sine registry, not a moving branch head. All 63 marketplace URLs were probed
and returned `HTTP 200`.

- **Live Calendar** resolves via a branch ref, not a SHA — it lives in
  `Darsh-A/sine-store` where no commit hash is recorded, so there is no immutable
  revision to pin.
- The registry lists **Natsumi**'s script entry as the bare directory
  `natsumi/scripts/`. Directories cannot be fetched over `raw.githubusercontent.com`;
  that entry returned `404` while all 62 sibling links returned `200`. Resolved by
  walking the pinned commit's tree via the GitHub API.

**All 176 unique `raw.githubusercontent.com` URLs across this directory were probed
and returned `HTTP 200`.** Four link errors were caught by that sweep and corrected
— all were extensions or directory names transcribed wrongly from a tree-walk
listing (`floorp-modules` is `.sys.mjs` not `.uc.mjs`; `notifications` is split into
`notifications-parent.uc.mjs` + `notifications.sys.mjs`; two `sine-store` paths were
wrong). Recorded in [`01`](01-sine-marketplace-js-mods.md) and
[`02`](02-sine-store-unpublished.md).

## Relevance to This Project

**Best architectural matches.** Four mods already decompose into multiple ES
modules the way `resources/second-sidebar/` does (`xul/` + `wrappers/` +
`controllers/` + `patchers/`):

| Mod | Modules | Split |
|-----|--------:|-------|
| **Zen Tidy Downloads** | 10 | utils / store / downloads-adapter / toasts / fileops / ai-rename / ai-models / download-ui / tooltip / entry |
| **Zen Library** | 6 | core shell + Downloads / History / Media / Spaces / Boosts |
| **Tidy Pinned Tabs** | 4 | utils / ai / hooks / entry |
| **Zen Notes** | 3 | core (state+storage) / editor (sanitizer) / ui (DOM) |

**Natsumi Browser** is the strongest single reference in this set — a complete
Firefox shell with 35 `.uc.mjs` feature modules plus a `JSWindowActor` parent/child
architecture (`actors/*.sys.mjs`) that mirrors what `userChromeDevtoolsSheetLoader.sys.mjs`
and `utils/boot.sys.mjs` do here.

**Feature gaps in the current build:**

| Gap | Candidate |
|-----|-----------|
| Statusbar (only `extendedStatusbar.uc.js` exists) | Widget Statusbar, Sine Floating Statusbar, Zen Custom Statusbar |
| Tab search / organize | Zen Command Palette, ZenTabPalette |
| Tab sorting & AI grouping | Zen Tidy Tabs, Zen Tab Wand, Advanced Tab Groups |
| Video / PiP (nothing) | Zenslop, Auto-PiP-Setting |
| Notes / scratchpad (nothing) | Zen Notes |
| Downloads tooling (only `pdfTools.uc.js`) | Zen Tidy Downloads |

**Zen-free / portable.** Mods marked `fork: ['zen']` target Zen-internal selectors
and will not style correctly on vanilla Firefox without adaptation. The portable
subset is listed in [[05-standalone-collections]] plus the Sine mods in
`02-sine-store-unpublished.md`.

## Caveats

- Sine mods declare `@include chrome://browser/content/browser.xhtml` — the same
  target this project's fx-autoconfig loader uses, so headers port cleanly.
- **Zen Proxy Divider** is the only mod declaring a dual `@include`
  (`browser.xhtml` **and** `browser.xul`) — relevant to the header parser
  documented in `JS/AGENTS.md`.
- Zen Mods store entries are CSS-only. Any Zen "mod" wanted as JS requires
  authoring a `uc.js` wrapper against its `chrome.css`; no ready-made files exist.

## Related Context

- [[quick-tabs]] — the Darsh-A mod already ported here as `JS/quick_tabs.uc.js`
- [[zen-custom-js]] — BibekBhusal0's Bun-bundled ES-module mod collection, the
  upstream for several Vertex-Mods entries here
- [[firefox-fork-embedding/11-userchrome-ecosystem]] — broader 97-repo catalogue
- [[userchrome-ideas-brainstorm]] — feature backlog; several entries above
  (Command Palette, Tab Search, Tab Snooze) were already brainstormed here