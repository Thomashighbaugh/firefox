---
title: "11 — userChrome ecosystem (from Thomashighbaugh/firefox-modification)"
type: research
tags: [userchrome, usercss, userchromejs, themes, ecosystem, prior-art]
created: 2026-10-11
updated: 2026-10-11
---

# 11 — userChrome ecosystem

The `github.com/stars/Thomashighbaugh` list **`firefox-modification`** (97 repos, "modification of
Firefox's interface using either officially condoned or passively discouraged means") pulled in full.
Most are **userChrome CSS themes / `.uc.js` script collections / tooling** — i.e. exactly the domain
of this theme — rather than full forks. Categorised, with a **relevance** flag for Higgs Boson
(`CSS/chrome/*` + `CSS/common/*` + `JS/*.uc.js` via fx-autoconfig).

Legend: ★ = directly relevant prior art · ◐ = partial/reference · ○ = adjacent.

---

## A. userChrome CSS themes

| Repo | What | St |
| ---- | ---- | -- |
| `cascadefox/cascade` | **Responsive one-line CSS theme** — the canonical modern one-liner | ★ |
| `black7375/Firefox-UI-Fix` (**Lepton**) | SCSS-built Proton UI fix; **the theming base Floorp ships** | ★ |
| `aminomancer/uc.css.js` (**duskFox**) | Dark-indigo theme **+ large privileged script collection** (added buttons/menus/behaviours) | ★ |
| `Naezr/ShyFox` | Hides the whole UI in the window border (extreme auto-hide) + `Naezr/shyfox.js` | ★ |
| `soulhotel/FF-ULTIMA` | "too many options" vertical/one-line theme | ★ |
| `greeeen-dev/natsumi-browser` | Modern opinionated browser-UI theme | ★ |
| `akkva/gwfox` | "crisp new look" theme | ★ |
| `yuuqilin/FlexFox` | Lightweight screen-space-optimising theme | ★ |
| `adriankarlen/textfox` | TUI-aesthetic theme | ★ |
| `KiKaraage/ArcWTF` | Arc-look userChrome (Win/Linux/macOS) | ★ |
| `artsyfriedchicken/EdgyArc-fr` | Arc + **Sidebery** style | ◐ |
| `zayihu/Minimal-Arc` | Minimal Arc-like vertical tabs | ◐ |
| `datguypiko/Firefox-Mod-Blur` | Dark / compact / modular / blur theme | ★ |
| `Shina-SG/Shina-Fox` | Minimal, cozy, vertical-optimised | ◐ |
| `yiiyahui/Neptune-Firefox` | Clean compact theme | ◐ |
| `nuclearcodecat/shimmer` | userChrome with **Sidebery** support | ◐ |
| `oviung/DownToneUI-Firefox` | Modular UI + Sidebery vertical tabs | ◐ |
| `Godiesc/firefox-gx` | Opera **GX** skin | ◐ |
| `Godiesc/firefox-one` | Opera **One** skin | ◐ |
| `Godiesc/AlpenBlue` | Blue lovers theme | ◐ |
| `muckSponge/MaterialFox` | Material Design theme | ○ (style ref) |
| `PROxZIMA/Sweet-Pop` | Minimalist animated one-liner (Sweet Dark) | ◐ |
| `refact0r/midnight-fox` | Clean simple userchrome | ○ |
| `dannycolin/fx-compact-mode` | Compact mode for Proton | ◐ |
| `jace…` `JaceThings/Brave-Fox` | Brave-like elements | ○ |
| `Bali10050/FirefoxCSS` | Custom interface | ○ |
| `hakan-demirli/Firefox_Custom_CSS` | Maximise vertical space | ○ |
| `amnweb/firefox-plus` | CSS tweaks | ○ |
| `neikon/Fox11` | theme | ○ |
| `noriaku/FirefoxMonolite` | Minimal monochrome, keyboard-centred | ○ |
| `not-holar/my_firefox_theme` | clean theme | ○ |
| `xmansyx/Pro-Fox` | custom CSS theme | ○ |
| `Filip-Sutkowy/blurclean-firefox-theme` | transparent/blur theme | ○ |
| `zapSNH/zapsCoolPhotonTheme` | Photon-era look | ◐ (restore old UI) |
| `YukisCoffee/phroton-legacy` | accurate Photon theme | ◐ |
| `BloodyHell619/Firefox-Theme-DarkMatter` | dark theme | ○ |
| `lunar-os/ZenCss` | Zen Browser CSS | ◐ (Zen) |
| `vinceliuice/WhiteSur-firefox-theme` | macOS Safari look on Linux | ○ |
| `PapirusDevelopmentTeam/firefox-papirus-icon-theme` | Papirus icons | ○ |
| `faerell/firefox-vsc-dark` | VS Code dark | ○ |
| `sinazadeh/Firefox-Moonlight-Theme` | Moonlight | ○ |
| `Kaskapa/Monochrome-Neubrutalism-Firefox-Theme` | neubrutalist | ○ |
| `gabeweb/Firefox-Browser-UI-Custom` | userChrome/userContext | ○ |
| `Catgrills/Firefox.userChrome` | userChrome/userContent | ○ |
| `marmmaz/FirefoxCSS` (minimalFOX) | minimal | ○ |
| `tortious/MintyFox`, `tortious/Firefox-BlueSteel` | historical setups | ○ |
| `nicholasglazer/anarchy-firefox` | dark theme | ○ |
| `ayushhroyy/elegantfox` | "elegant" theme | ○ |

## B. userChrome.js script collections / loaders

| Repo | What | St |
| ---- | ---- | -- |
| `xiaoxiaoflood/firefox-scripts` | **`userChrome.jsm` / `xPref.jsm` / `ucUtils` loader + scripts** | ★ |
| `Aris-t2/CustomJSforFx` | large custom-script collection + loader | ★ |
| `harv/userChromeJS` | script collection | ◐ |
| `ywzhaiqi/userChromeJS` | Chinese-language script collection (already in this repo's `research/`) | ★ |
| `Griever/userChromeJS` | historical scripts | ◐ |
| `nightson/userChromeJS` | scripts | ○ |
| `lovexj520/userChromeJS-2` | scripts | ○ |
| `dupontjoy/UCScriptsCollections` | collected UC scripts | ◐ |
| `DanaMW/userChrome.js`, `tkhquang/userChrome.js`, `leohu1/My-UserChrome` | individual script sets | ○ |
| `xinggsf/uc` | "firefox uc JS" | ○ |
| `update692/firefox`, `dotiful/firefox-scripts`, `rhubarbshoelaces/firefox-scripts`, `confluence/firehacks`, `nonoroazoro/firefox`, `fuyu0425/firefox-tweaks`, `gocom/pinceau`, `doiyes/Firefox-Custom` | misc `.uc.js` / tweak sets | ○ |
| `AveYo/fox` | `UserChrome.js` stand-alone snippet loader + snippets | ◐ |
| `Izheil/Quantum-Nox-Firefox-Customizations` | CSS + JS customisations | ◐ |
| `hanacchi/RestoreFirefoxJS` | restore removed Firefox features | ◐ |
| `earthlng/aboutconfig` | about:config helper | ○ |
| `John2022/firefox-auto-hide-toolbars` | userChromeJS package (toolbar auto-hide) | ◐ |

## C. Tooling / managers / infra

| Repo | What | St |
| ---- | ---- | -- |
| `CosmoCreeper/Sine` | **Theme manager for Firefox-based browsers** (install/manage mods) | ★ (deployment model) |
| `Black7375` Lepton (above) | SCSS→CSS build pipeline | ★ |
| `simsrw73/userstyle-gen` | convert CSS → userstyles/userscripts | ◐ |
| `egovelox/mozeidon` | CLI for tabs/history/bookmarks | ○ |
| `5hubham5ingh/foxpanel` | Firefox homepage / Arch system panel | ○ |
| `PlasmoHQ/plasmo` | browser-extension framework (not a mod) | ○ |
| `Timvde/UserChrome-Tweaks` | **community-maintained tweak archive** | ★ |
| `BibekBhusal0/zen-custom-js` | Zen userscripts + CSS (in this repo's `research/`) | ◐ |
| `Vertex-Mods/Advanced-Tab-Groups` | Zen tab folders/groups mod (in `research/`) | ◐ |
| `Rapptz/power-tabs` | vertical tab groups | ○ |
| `aminought/firefox-sidebar-width`, `aminought/firefox-adaptive-theme-creator` | sidebar width / adaptive theme ext | ○ |
| `Slowlife01/ff-mediacontrols` | toolbar media controls | ○ |
| `garywill/aboutconfig-menu` | about:config shortcut button | ○ |
| `kustodian/extended-statusbar` | add-on (Opera-style statusbar) — cf. this theme's `extendedStatusbar.uc.js` | ★ |
| `117649/Tab-Groups` | reimplement Tab Groups as an add-on | ○ |
| `rubenwardy/renewedtab` | new-tab replacement | ○ |

## D. Fork / source projects in the list

| Repo | What |
| ---- | ---- |
| `tompassarelli/gjoa` | Firefox 152 source fork; Beagle→`.sys.mjs`; supersedes Palefox (see §07.14) |
| `tompassarelli/palefox` | TypeScript→`.uc.js` pipeline prototype; hash-pinned loader; superseded |

---

## What this list changes for Higgs Boson

1. **Direct prior art to mine/compare:**
   - **Lepton** (`black7375/Firefox-UI-Fix`) — SCSS build pipeline; the base Floorp ships. If the
     theme's CSS ever balloons, a SCSS→CSS step is the proven pattern.
   - **cascade** — the reference implementation of a *responsive one-line* layout (this theme's
     `layout.css`/auto-hide could align).
   - **aminomancer/uc.css.js** — a theme + a large *privileged-script* collection in one repo, i.e.
     exactly this theme's shape; its sheet/`@import` organisation is worth diffing.
   - **xiaoxiaoflood/firefox-scripts** — an alternative loader to fx-autoconfig (mitigation if
     fx-autoconfig ever breaks).
   - **Sine** — a *theme manager*: the deployment model this theme lacks (installable/versioned mods).
2. **Modern vertical/one-line themes to benchmark against:** ShyFox, FF-ULTIMA, natsumi-browser,
   gwfox, FlexFox, textfox, ArcWTF, FF-Mod-Blur, DownToneUI, shimmer.
3. **`.uc.js` collections** confirm the loader/meta conventions (`@include`, `@onlyonce`) the theme
   already uses; several are stale (2016–2024) → the theme should stay on a maintained loader
   (fx-autoconfig 0.10.x / xiaoxiaoflood).
4. **Where the theme is unusual:** it ships a **second-sidebar subsystem** (100+ files) and
   `resources/` assets — most list entries are single-file themes. The packaging/`jar.mn` plan (§02)
   matters more here than for a one-file theme.

## Sources

`github.com/stars/Thomashighbaugh/lists/firefox-modification` (all 4 pages, 97 repos, fetched
2026-10-11); repo descriptions/stars as listed; existing `research/{uc-css-js,zen-custom-js,ywzhaiqi-userchromejs,better-advanced-tab-groups}`.
