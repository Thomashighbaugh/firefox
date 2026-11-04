# Firefox 158 chrome internals — what changed under the theme

**Verified against:** Firefox 158.0.1 shipped source (not docs, not guesswork)
**Method:** `unzip` of `browser/omni.ja` + `omni.ja` from the Nix store, then reading the
actual CSS/DOM/JS that ships. Harness: [`../../../skills/firefox-chrome-repro/`](../../../skills/firefox-chrome-repro/).
**Harvested:** 2026-11-03

## Where the shipped sources live

```
$(readlink -f $(command -v firefox))/../lib/firefox/
├── omni.ja                 # toolkit chrome (global/, mozapps/extensions/, elements/)
└── browser/omni.ja         # browser chrome (content/browser/**, skin/classic/browser/**)
```

`scripts/extract-firefox-source.sh` in the repro skill unpacks the globs you actually need.
Two archives, two very different trees — `about:addons` CSS lives in **toolkit**
(`chrome/toolkit/content/mozapps/extensions/aboutaddons.css`) while browser skinning lives in
**browser** (`chrome/browser/skin/classic/browser/...`). Grepping one and concluding "nothing
here" is the classic mistake.

## about:addons (Fx 158) — the category rail

Markup replaced the old `#categories` / `.category` list with a Lit component:

```
#full (display: grid; grid-template-columns: var(--sidebar-width) minmax(0, 1fr))
├── #sidebar            ← CSS container now, NOT the old #categories
│   └── categories-box  ← custom element
│       └── #shadow-root → <moz-page-nav>
└── #content
    ├── addon-page-header
    ├── addon-page-options
    └── #main > addon-list > section
```

Consequences for theme CSS:

- `#categories`, `.category`, `.category[selected]` are **dead selectors** in 158. Keeping them
  is harmless but misleading; the 60px rail is driven by `--sidebar-width` alone.
- `moz-page-nav` is styled from its own shadow root
  (`toolkit/content/global/elements/moz-page-nav.css`) and exposes only custom properties:
  `--page-nav-margin-inline-start` (default **40px**), `--page-nav-width`, `--page-nav-collapsed`,
  `--page-nav-icon-size`, `--page-nav-gap`…
- `#sidebar { overflow: hidden auto }` inside the component. A 60px grid column plus the default
  40px host margin means the nav's left 40px are clipped, so the icons survive only as slivers at
  the rail's right edge.
- Collapsed (icons-only) rendering is selected by `@container style(--page-nav-collapsed: collapsed)`.
  The component sets no `container-type` itself, so for `@container style()` to match, the theme
  must make `#sidebar` a container (`container-type: style`) **and** set the property.
- `addon-list > section` had a theme rule `margin-right: var(--sidebar-width) !important` — it
  reserves space on the side that has no rail and pushes cards into the right gutter.

## Downloads (Fx 158) — panel + anchor

```
browser.xhtml
├── <panel id="downloadsPanel" class="cui-widget-panel panel-no-padding" hidden="true">   (≈L3613)
└── <toolbarbutton id="downloads-button" hidden="true" delegatesanchor="true" badged="true"
                  cui-areatype="toolbar" key="key_openDownloads">                        (≈L6647)
    └── #downloads-indicator-anchor > #downloads-indicator-icon
```

- The button ships `hidden="true"`; `DownloadsButton.unhide()` clears it while downloads exist
  (pref `browser.download.autohideButton`).
- Open path: `DownloadsPanel.showPanel(openedManually, isKeyPress)` → `initialize()` (sets
  `panel.hidden = false`) → `setTimeout(_openPopupIfDataReady, 0)`. That guard bails **silently**
  when `DownloadsView.loading` is still true, or when `DownloadsButton.getAnchor()` returns null.
- `_getAnchorInternal()` returns null if `DownloadsIndicatorView.indicator` is missing, or if
  `!isElementVisible(indicator.parentNode)` **and** the widget's `areaType == "toolbar"`.
  `isElementVisible()` (utilityOverlay.js) is just `rect.height > 0 && rect.width > 0`.
- Anchor for the popup is `DownloadsIndicatorView.indicatorAnchor` → `indicator.badgeStack`
  (a node inside the button's shadow root).
- Placement is `PanelMultiView.openPopup(panel, anchor, "bottomright topright", 0, 0, false, null)`.
  Anchored to a bottom status bar the panel is placed *upward*, overlapping the bar — expected.
- `DownloadsPanel.showDownloadsHistory()` is the "show all" handler; `JS/libraryRedirect.uc.js`
  replaces it to open the theme's Library page.

**Verified experimentally (2026-11-03):** calling `DownloadsPanel.showPanel(true)` from a chrome
script in the real window opens the panel correctly (`state=open`, sane rect) with the button
placed on `#addonbar`. So the panel element, its styling, the anchor computation and the custom
toolbar placement are all fine — the failure is in the **click path**, not the panel. Two open
hypotheses, both still unconfirmed:

1. clicks at the bar's painted position are delivered to `#browser` instead of the button
   (one instrumented run logged `click target=browser#`), i.e. a hit-test/z-order problem
   between the content area and the appended toolbar;
2. nothing in 158 wires a click handler for that button in this configuration —
   `btn.onclick`, `oncommand`, and `DownloadsButton.onCommand` are all absent in the 158 build
   (`DownloadsButton.onCommand` does not exist; it is a 1xx-era API).

## Status bar vs sidebar background

- Sidebars: `background-image: var(--firefoxcss-sidebar-gradient), var(--firefoxcss-sidebar-texture)`
  (`CSS/chrome/colors.css`).
- `#addonbar` (created by `JS/extendedStatusbar.uc.js`): only
  `background-color: var(--firefoxcss-sidebar-end-bg-color)`, `background-image: none`.
- Sampled pixels (dark theme, full-chrome screenshot): sidebar bottom `rgb(37,37,38)`,
  addonbar left `rgb(37,37,38)`, addonbar middle `rgb(39,39,41)`. The gradient+texture layer is
  what differs — matching the colour alone will not match the surface.

## Reproducing any of this

See the project skill `firefox-chrome-repro` (`.opencode/skills/firefox-chrome-repro/`):

```bash
scripts/repro.sh start            # Xvfb + WM + throwaway profile + Firefox
scripts/repro.sh shot /tmp/x.png   # full-window screenshot
scripts/repro.sh probe             # install + read the chrome-internals probe
```
