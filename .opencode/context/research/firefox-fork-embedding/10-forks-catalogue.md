---
title: "10 — Firefox fork catalogue (exhaustive)"
type: research
tags: [firefox-fork, catalogue, gecko, goanna, uxp, fork-list]
created: 2026-10-11
updated: 2026-10-11
---

# 10 — Firefox fork catalogue

Every notable Firefox/Gecko-derived browser, grouped by engine lineage and build approach.
"Compile" = whether producing a build requires compiling Gecko. "CSS origin" = where a baked
theme's stylesheet lands (author = wins without `!important`).

## Legend

- **Mainline Gecko** — tracks modern `mozilla-central`/ESR.
- **Goanna / UXP** — hard fork of mozilla-central at ESR-52 (pre-Quantum); no longer tracks modern Gecko.
- **Mobile** — GeckoView/Fenix-based.
- **Config-only** — not a fork; prefs/policies/autoconfig on stock Firefox.

---

## A. Mainline Gecko forks — active

| Fork | Base / lineage | Build system | Compile | CSS origin | JS loader | Notes |
| ---- | -------------- | ------------ | ------- | ---------- | --------- | ----- |
| **LibreWolf** | Firefox ESR + ~40 patches | Makefile + `lw/` scripts over `mach` | full (C++ patches) | author + user | none/rare | `codeberg.org/librewolf/source`; `librewolf.cfg` AutoConfig + settings repo + `policies.json`; closest prior art to this theme |
| **Zen Browser** | Firefox fork (156 in 2026) | Surfer | full | author + **user mods** | native `.mjs` | `zen-browser/desktop`; `src/zen/`, `prefs/*.yaml`, `engine/` patch dir, `npm run export/import`; ZenMods (`chrome/zen-themes/<id>/chrome.css`) |
| **Floorp (Noraneko)** | Firefox 12x | `feles-build` (Deno) | full/hybrid | author + **user loader** | native + userChromeCSS loader | overlay repo + `.github/patches` + lock file; before-mach/after-mach phases; Lepton base |
| **Waterfox** | Firefox (BrowserWorks Ltd, 2026) | own source repo | full | author + user | none | `github.com/BrowserWorks/waterfox`; 6.6.x/6.7.x; built-in ad blocker, feed manager; Android app; "made with care, not telemetry" |
| **Mercury** | Firefox + compiler opts | `bootstrap.sh`/`build.sh`/`package.sh` | full (AVX/AES/LTO/PGO) | author | none | `Alex313031/Mercury`; patches from LibreWolf/Waterfox/Ghostery/BetterFox/IceCat; Thorium's sibling; also `Mercury-Win7` (ESR115) |
| **CachyOS Browser** | LibreWolf-based | patches + PKGBUILD | full | author | none | CachyOS distro; mold linker, `-march=native`, LTO/PGO |
| **Konform Browser** | Firefox ESR (from LibreWolf) | Makefile + `scripts/apply-patches.py` | full | author | none | `codeberg.org/konform-browser/source`; patches grouped by origin (`kon`/`moz-backports`/`sed-patches`(LW)/`tb`(Tor)/`wf`(Waterfox)); `policies.json` |
| **Midori** | Firefox (Astian) | **Amelia** (`@goastian/amelia`) | full | author + user | user `.uc.js` | same `CSS/` + `JS/*.uc.js` layout as this theme; ships themes via `browser/extensions/` |
| **Tor Browser** | Firefox **ESR** (140.x in 2026) | **rbm** (Reproducible Build Manager) | full | author | native | `tor-browser-build`; `browser/app/profile/000-tor-browser.js`; Tor Uplift (arkenfox-based); desktop + Android; reproducible builds |
| **Mullvad Browser** | Tor Browser minus Tor | Tor Browser build system | full | author | native | `mullvad/mullvad-browser` (readme-only main; source in Tor GitLab); signed by Tor Browser Developers; Mullvad VPN partnership |
| **GNU IceCat** | Firefox (debranded) | GNU/Guix packaging | full | author | native | FSF/GNU project; only packaged for Guix; LibreJS etc. |
| **IceWeasel (GNU)** | Firefox (debranded) | Guix | full | author | native | GNU's other debranded Firefox; distinct from the older Debian Iceweasel and from `adonais/iceweasel` personal builds |
| **SeaMonkey** | **unnamed Gecko fork** (very old) | own | full | author | native | Mozilla Internet Suite continuation: browser + mail/news + IRC + RSS + HTML editor; 64-bit only; SeaMonkey Council |
| **Pulse Browser** | experimental Firefox fork | **gluon** | full | author | native | `pulse-browser/browser`; HMR-focused; `pulse-browser/gluon` is the reusable build tool; `pulse-browser-avx` compiler build |
| **Glide Browser** | Firefox 153b1 | own | full | author | native | `glide-browser/glide` (TypeScript); keyboard-first, modal keymaps, TS config, fuzzy tabs, **Gemini protocol**; `glide.nix` for NixOS |
| **Gjoa** | Firefox 152 source fork | Nix (`bun run init` + `nix build .#gjoa`) | full (LTO, `-march=native`) | author | **native** (Beagle→`.sys.mjs`) | `tompassarelli/gjoa`; native adblock/dark-mode/tree-tabs/workspaces/vim/egress audit; successor to Palefox |
| **SlimBrowser** | Gecko (Windows) | closed | full/vendor | author | n/a | long-running Windows Gecko browser |
| **Portable Firefox** | **repackaging**, not a fork | PortableApps launcher | none | user | user | portable wrapper around stock Firefox |
| **Sumi Browser** | Firefox fork | own | full | author | native | `sumi-browser/desktop` |
| **TerraDact** | Firefox fork | own | full | author | native | `TERRA-TECH-SYSTEMS/terradact`; "sovereign browser" + Gecko/SpiderMonkey webview for TerraCore |
| **MarsFlow** | Firefox ESR | own | full | author | native | Zen-inspired UI, DuckDuckGo, Tor mode |
| **Hilal Browser** | Firefox fork | own | full | author | native | `VastSea0/hilal-browser` |
| **firefox-vanilla** | Firefox fork | own | full | author | native | `HeXis-YS/firefox-vanilla` — performance-focused |
| **Aquafox** | **TenFourFox** modernization | own | full | author | native | PowerPC / Mac OS X 10.4; keeps old-GPU Macs alive |
| **KaiOS Browser** | Gecko (Firefox OS lineage) | KaiOS build | full | author | native | powers KaiOS feature phones |
| **Sailfish Browser** | Gecko | Sailfish OS build | full | author | native | Jolla Sailfish OS default browser |
| **Adblock Browser** | Fenix (Android) | own | full | author | native | eyeo; mobile; largely dormant |
| **JaduaGo Browser** | Firefox-derived | own | full | author | native | `JaduaStudios/JaduaGoBrowser` |

### Base channels (not forks, but "embedding" targets)

Firefox **Nightly / Beta / Developer Edition / ESR** are the same source with different prefs and
branding. ESR is the sane base for a stable fork (LibreWolf, Konform, Tor, Mullvad, Fennec all use
it). Dev Edition = `browser/branding/aurora`; Nightly = `nightly/`.

---

## B. Goanna / Unified XUL Platform (UXP) — pre-Quantum lineage

Hard-forked from mozilla-central at **ESR-52**; engine renamed **Goanna** (v6 in UXP). No modern
Gecko tracking. Relevant because they preserve XUL/XPCOM, complete themes, and NPAPI — a different
world from this theme (which targets modern Firefox).

| Project | Role | Notes |
| ------- | ---- | ----- |
| **UXP** | the platform | `repo.palemoon.org/MoonchildProductions/UXP`; comm-central-style; app repos as submodules under `platform/` |
| **Pale Moon** | browser | Strata (Fx4–28) look; single-process; XUL/XPCOM + Complete Themes + NPAPI; `MoonchildProductions/Pale-Moon` |
| **Basilisk** | browser (UXP reference app) | Australis look (Fx29–56); aka **Serpent**/**Snake**; `Basilisk-Dev/Basilisk` |
| **K-Meleon** | browser (Windows) | Goanna; lightweight |
| **Epyrus** | mail/news | aka **Hermopolis** (Thunderbird work-alike) |
| **Interlink Mail & News** | mail | UXP mail client |
| **Borealis Navigator** | browser | UXP navigator |
| **AlbusLuna** | browser bundle | `albusluna.org`; ships Classic Firefox + Basilisk + Epyrus + **Ambassador** (Chatzilla) in one tree; "more open than Pale Moon"; uBlock/ScrapBook X/Saved Password Editor preinstalled |
| **Ambassador** | IRC | Chatzilla successor in the UXP bundle |

---

## C. Mobile (GeckoView / Android)

| Fork | Base | Notes |
| ---- | ---- | ----- |
| **Firefox for Android (Fenix)** | GeckoView + Android Components | upstream base for all Android forks |
| **Firefox Focus / Klar** | GeckoView (minimal UI) | privacy-focused; `focus-android` |
| **Fennec F-Droid** | Fenix, blobs removed | `F-Droid` build; open repo since 2015 |
| **Mull** | Fennec build, arkenfox + Tor-Uplift prefs | DivestOS (`divested-mobile/mull-fenix`); AGPL; built with `fdroidserver` on patched Fennec; **superseded by IronFox** |
| **IronFox** | fork of Mull (DivestOS) | the current DivestOS-lineage Android browser |
| **Iceraven** | GeckoView Firefox fork | community Android fork |
| **Waterfox Android** | Waterfox mobile | Google Play native app |
| **Tor Browser for Android** | GeckoView (Tor Browser) | Orfox's successor |
| **Bely Lis Android** | Firefox Android | Russian Trusted Root CA for RU services |

---

## D. Discontinued / historical

Gecko: **Waterfox Classic**, **Comodo IceDragon**, **Cyberfox**, **TenFourFox**, **Camino**,
**Classilla**, **Flock**, **Netscape Navigator 9**, **Swiftfox/Swiftweasel**, **xB Browser**,
**Ghostzilla**, **Beonex**, **Minimo**, **Firefox Lite**, **Cliqz**, **Ghostery Private Browser**,
**IceApe**, **Debian Iceweasel** (→ Firefox).

Also early names: **Phoenix** → **Firebird** → **Firefox**.

Goanna: **Polarity**, **Basilisk (original 2018 line)** → now Basilisk-Dev.

---

## E. Config-only (no fork, no compile)

| Project | What it is |
| ------- | ---------- |
| **arkenfox user.js** | canonical harden-by-prefs `user.js`; Mull/Tor Uplift draw from it |
| **Betterfox** | curated `user.js` for speed + privacy |
| **Librefox (intika)** | privacy AutoConfig overlay (not a fork) |
| **policies.json / AutoConfig** | enterprise prefs, `distribution/` |
| **Chrome/userChrome.css** | per-profile user-origin theming (this theme today) |

---

## F. Where this theme fits

The theme is **mainline-Gecko front-end** (modern `about:*` pages, `browser.xhtml`, design tokens).
So its natural hosts are **category A** (LibreWolf/Zen/Floorp/Waterfox/Mercury/CachyOS/Konform/Midori)
and **category C** for a mobile variant (GeckoView UI is a different front-end though — the
`CSS/chrome/*` would not port).

- Category B (UXP/Goanna) is **not** a target: different engine, different chrome, different era.
- Category E is the current state; migrating to A is the goal of this research set.

### Recommended base for a theme fork

| Want | Base |
| ---- | ---- |
| fastest iteration, no compile | **stock Firefox + artifact build** (see §01) |
| privacy + ESR stability | **LibreWolf** or **Konform** patch lineage |
| modern UI framework | **Zen** or **Floorp** |
| minimal, just bake CSS/JS | **Waterfox** source or a bare artifact fork |
| compiler-optimised | **Mercury** / **CachyOS** |

## Sources

Wikipedia (Gecko-based, List of Firefox-based browsers, Firefox for Android/Fennec), The Register
"Firefox 156 arrives with a forest of forks" (2026-09-19), GitHub topics `firefox-fork`,
`Alex313031/Mercury`, `glide-browser/glide`, `pulse-browser/*`, `sumi-browser/desktop`,
`divested-mobile/mull-fenix`, `mullvad/mullvad-browser`, `BrowserWorks/waterfox`, `torproject` rbm,
`repo.palemoon.org` UXP/Pale-Moon, `albusluna.org`, `codeberg.org/konform-browser/source`, local
`research/{mercury,gjoa,glide-browser,cachyos-browser,palefox,dot-browser,konform,midori-desktop,floorp}`.
