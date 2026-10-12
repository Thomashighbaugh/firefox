---
title: "Embedding the Higgs Boson theme + userChrome.js into a Firefox fork"
type: research
tags: [firefox-fork, build-system, userchrome, autoconfig, artifact-build, theming, jar-mn, omnijar, mozconfig, prefs, packaging]
created: 2026-10-11
updated: 2026-10-11
status: active
---

# Embedding the theme + userChrome.js into a Firefox fork

Exhaustive reference for baking `CSS/` (userChrome + userContent) and `JS/*.uc.js` /
`*.uc.mjs` into a Firefox fork instead of shipping them per-profile. Split by surface so each
part can be read alone.

## Files

| # | File | Covers |
| - | ---- | ------ |
| 01 | [01-build-system-and-artifact-builds.md](01-build-system-and-artifact-builds.md) | repo acquisition, `mach`, mozconfig, artifact mode, `mach build faster`, incremental/compiled builds, what artifact mode can and cannot change |
| 02 | [02-chrome-packaging-jar-mn-omnijar.md](02-chrome-packaging-jar-mn-omnijar.md) | `jar.mn`, `moz.build`, `chrome.manifest`, `omni.ja`, `chrome://` / `resource://`, built-in themes |
| 03 | [03-css-embedding-origins.md](03-css-embedding-origins.md) | cascade origins, `nsIStyleSheetService`, author-origin embedding, chrome vs content sheets, design tokens |
| 04 | [04-js-injection-and-startup.md](04-js-injection-and-startup.md) | startup categories, window actors, `Services.scriptloader`/`ChromeUtils`, fx-autoconfig internals, rival loaders, ESM |
| 05 | [05-prefs-and-policies.md](05-prefs-and-policies.md) | `firefox.js`, `StaticPrefList.yaml`, `all.js`, `policies.json`, AutoConfig |
| 06 | [06-packaging-distribution-repackage.md](06-packaging-distribution-repackage.md) | `distribution/`, install-dir layout, `mach repackage` (deb/rpm/snap/flatpak/msix/msi/dmg/mar), l10n, NixOS |
| 07 | [07-fork-case-studies.md](07-fork-case-studies.md) | **deep dives** (build recipe + exact embed steps): LibreWolf, Zen, Floorp, Waterfox, Mercury, CachyOS, Konform, Midori, Tor, Mullvad, IceCat, UXP family, Glide, Gjoa/Palefox, Pulse, mobile |
| 08 | [08-maintenance-rebase-dev-loop.md](08-maintenance-rebase-dev-loop.md) | upstream sync, patch stacks, rebasing, browser toolbox, live edit, tests |
| 09 | [09-security-and-pitfalls.md](09-security-and-pitfalls.md) | AutoConfig system-principal risk, sandbox, signing, `omni.ja`, origin limits, Nova gate |
| 10 | [10-forks-catalogue.md](10-forks-catalogue.md) | **exhaustive fork catalogue** — mainline Gecko (active), Goanna/UXP, mobile/GeckoView, discontinued, config-only; base-choice matrix |
| 11 | [11-userchrome-ecosystem.md](11-userchrome-ecosystem.md) | the 97-repo `Thomashighbaugh/firefox-modification` stars list, categorised (userChrome themes, `.uc.js` collections, tooling, forks) with relevance to this theme |
| 12 | [12-special-attention.md](12-special-attention.md) | **SPECIAL ATTENTION** — Midori's patch system (and how to embed the scripts into it), Palefox (loader attack-surface), Gjoa (build lanes), Hilal (Rust patch manager + Android); Linux-only distribution plan |

## TL;DR

Two strategies, not mutually exclusive:

| | **A. Overlay distribution** | **B. Source fork + artifact build** |
| --- | --- | --- |
| Gecko C++/Rust compile | none | **none** (`--enable-artifact-builds`) |
| Edit → test | seconds (no build) | `./mach build faster` (seconds) + `./mach run` |
| CSS origin | user (`!important` required) | **author** (no `!important`) |
| Ships as | install-dir `defaults/pref` + `config.js` + profile `chrome/` | files in the tree → `omni.ja` via `jar.mn` |
| Rebase cost | n/a | additive files = cheap |

**Decisive build fact:** any change to JS / HTML / XHTML / CSS / FTL / `.properties` is
supported by artifact mode and rebuilds with `./mach build faster` — no compiler. Only
C/C++/Rust edits force a compiled build (see §01).

**Decisive styling fact:** CSS baked into the tree is **author origin**, the origin that beats
Firefox's own built-in sheets. This removes the entire `!important` arms race a profile
`userChrome.css` forces (see §03). It is the structural fix for breakage like the FF157
`about:addons` regression.

## Current state (this repo / NixOS)

Already ~80% of path A: `programs.firefox.package` overrides inject fx-autoconfig's `config.js`
via `extraPrefsFiles`, and the profile `chrome/` is symlinked to this repo.
`toolkit.legacyUserProfileCustomizations.stylesheets = true` is set. See §06 (NixOS) and §05.

## Recommendation

- **Personal / ship-nothing:** stay on path A (current NixOS overlay). Cost: the `!important` layer.
- **Distributable fork:** path B with artifact builds — additive `higgs-theme.css` + one-line
  `@import` in `browser.css`, patch the target `about:*` sheets in place, port/vendor the JS,
  prefs into `firefox.js`. See §01/§02/§03/§04.

## Sources

`firefox-source-docs.mozilla.org` (jar-manifests, artifact_builds, BrowserStartup, chrome-registration,
installation_dir_layout, libpref, locales, flatpak, MSIX/MSI), `nsIStyleSheetService.idl`,
`support.mozilla.org` AutoConfig, `firefox-admin-docs.mozilla.org` policies, MrOtherGuy/fx-autoconfig,
codeberg librewolf/source, zen-browser/desktop + docs, Floorp-Projects/Floorp + AGENTS.md,
goastian/amelia, MDN theme/theme_experiment.
