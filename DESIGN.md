# DESIGN.md — Higgs Boson Firefox Theme

**Source of truth:** Derived from the codebase (`CSS/`), not invented.  
**Project:** /etc/nixos/external/firefox  
**Entry points:** `userChrome.css` (browser chrome), `userContent.css` (internal content pages)  
**Mode:** Operate — the visitor completes a task (browsing); scanability, consistency, native expectations, and edge finish outrank expression. Brand lives in precise details.

---

## Design system origin

Solid Glass port (deeplethe/solid-glass: https://deeplethe.github.io/solid-glass/, https://github.com/deeplethe/solid-glass).  
The theme applies Solid Glass's four rules to Firefox chrome:

1. **Finish at the edge** — rim (top light) + hairline (all-round) + shadow (underneath), never a gradient across the face.
2. **Heavy, not airy** — neutral grey faces; blur softens without boosting colour.
3. **Depth is thickness** — panel < card < popover. Thicker = more opaque.
4. **One state** — hovered, chosen and held-open all wear the same small pane of clear glass.

---

## Color palette

All dark-theme values; sourced from `CSS/common/colors.css` and `CSS/common/variables.css`. Light-theme equivalents exist in `CSS/common/colors.css` under `@media (prefers-color-scheme: light)`.

### Neutrals (base16 monokai pro spectrum — retained, not replaced)

| Token | Value | Role |
|-------|-------|------|
| `--grey-20` | `#f7f1ff` | Near-white neutral |
| `--grey-30` | `#bab6c0` | Mid grey |
| `--grey-40` | `#8b888f` | Muted grey |
| `--grey-60` | `#69676c` | Darker grey |
| `--grey-90` | `#222222` | Deep neutral |

### Accents (retained, not replaced)

| Token | Value | Role |
|-------|-------|------|
| `--red-50` | `#c43d65` | Primary red accent |
| `--red-60` | `#a03152` | Darker red |
| `--red-70` | `#8e2b48` | |
| `--red-80` | `#7b253f` | |
| `--red-90` | `#692035` | Deepest red |

### Chrome surfaces (Solid Glass dark panes — neutral grey)

| Token | Value | Thickness | Role |
|-------|-------|-----------|------|
| `--firefoxcss-main-bg-color` | `oklch(0.13 0 0 / 0.5)` | Page | Base page/sidebar/window background |
| `--firefoxcss-item-bg-color` | `oklch(0.2 0 0 / 0.45)` | Card | Toolbar background, one step above page |
| `--firefoxcss-tab-bg-color` | `oklch(0.28 0 0 / 0.5)` | Panel | Unselected tabs (thinnest) |
| `--firefoxcss-tab-active-bg-color` | `oklch(0.45 0 0 / 0.65)` | Card | Selected tabs (thicker) |
| `--firefoxcss-panel-bg-color` | `oklch(0.22 0 0 / 0.96)` | Popover | Menus, panels, status panel |
| `--firefoxcss-url-bar-bg-color` | `oklch(0.2 0 0 / 0.85)` | Card | URL/search bar |
| `--firefoxcss-bookmarks-bg-color` | `oklch(0.13 0 0 / 0.85)` | Page | Bookmarks bar |
| `--firefoxcss-button-background` | `oklch(100% 0 0 / 0.07)` | — | Button fill (legacy, superseded by `--glass-control`) |

### Solid Glass edge tokens (`CSS/common/variables.css`)

| Token | Value | Role |
|-------|-------|------|
| `--glass-rim` | `oklch(100% 0 0 / 16%)` | Line of light on top edge |
| `--glass-inner` | `oklch(100% 0 0 / 4%)` | Faint second line inside edge |
| `--glass-edge` | `oklch(100% 0 0 / 6%)` | Hairline round outside |
| `--glass-shade` | `oklch(0 0 0 / 60%)` | Shadow underneath pane |
| `--glass-contact` | `oklch(0 0 0 / 10%)` | Shadow where pane meets surface |
| `--glass-lift` | `oklch(0 0 0 / 22%)` | Shadow when pane is lifted |
| `--glass-control` | `oklch(0.45 0 0 / 0.7)` | Clear-glass button face (~#555555 equivalent) |
| `--glass-control-rim` | `oklch(100% 0 0 / 11%)` | Rim on control panes |
| `--glass-state` | `oklch(100% 0 0 / 8%)` | One state: hover/active/chosen fill |
| `--glass-state-rim` | `oklch(100% 0 0 / 11%)` | Rim on state panes |
| `--glass-state-edge` | `oklch(100% 0 0 / 6%)` | Edge on state panes |
| `--glass-blur` | `blur(26px)` | Backdrop blur for panes |
| `--glass-blur-control` | `blur(14px)` | Backdrop blur for controls |
| `--field-rim` | `oklch(100% 0 0 / 15%)` | Top light on fields |
| `--field-edge` | `oklch(100% 0 0 / 8%)` | Hairline on fields |
| `--focus-line` | `oklch(100% 0 0 / 40%)` | Focus line on fields |
| `--popover-edge` | `var(--glass-edge)` | Popover edge |
| `--popover-under` | `oklch(0 0 0 / 0%)` | Popover under-shade |

---

## Typography

No explicit `font-family` overrides in the theme; Firefox system defaults apply. Typography-related tokens:

| Token | Value | Role |
|-------|-------|------|
| `--firefoxcss-searchbar-height` | `30px` | URL bar height |
| `--uc-menubaritem-height` | `28px` | Menu bar item height |
| `--uc-menubaritem-width` | `30px` | Menu bar item width |
| `#tab-label` | — | Tab label, `transition: color 100ms ease` |
| Context menu items | `padding-block: 2px`, `padding-inline: 2px` | Compact menu items |

---

## Spacing scale

| Token | Value | Role |
|-------|-------|------|
| `--toolbarbutton-outer-padding` | `2px` | Toolbar button outer padding |
| `--toolbarbutton-inner-padding` | `2px` | Toolbar button inner padding |
| `--toolbarbutton-icon-size` | `24px` | Toolbar button icon size |
| `--tab-icon-size` | `24px` | Tab icon size |
| `--arrowpanel-menuitem-padding-block` | `2px` | Menu item block padding |
| `--arrowpanel-menuitem-padding-inline` | `2px` | Menu item inline padding |
| `--uc-bm-height` | `24px` | Bookmarks bar height |
| `--uc-bm-padding` | `6px` | Bookmarks bar padding |

Button total size: `calc(2 * var(--toolbarbutton-inner-padding) + var(--toolbarbutton-icon-size))` = 28px × 28px for icons.

---

## Radii

| Token | Value | Role |
|-------|-------|------|
| `--firefoxcss-border-radius` | `6px` | Standard pane/tab/button radius |
| `--radius-control` | `0.7rem` | Control radius (step down from pane radius) |
| Status panel | `var(--radius-control)` | Status panel corners |
| Tab close button | `100%` | Circular close button |
| Customization footer button | `4px` | macOS/Windows customization buttons |

---

## Shadows / edge finish

Every Solid Glass pane uses the same edge stack (rim top, hairline all round, shade underneath), drawn as `box-shadow` so lines run around corners in one piece:

**Pane edge stack (tabs, selected/multiselect/moving):**
```css
inset 0 1px 0 var(--glass-rim),
inset 0 0 0 1px var(--glass-inner),
0 0 0 1px var(--glass-edge),
0 1px 2px var(--glass-contact),
0 12px 32px -14px var(--glass-shade)
```

**Popover / menus / panels edge stack:**
```css
inset 0 1px 0 var(--glass-rim),
inset 0 -1px 0 var(--popover-under),
0 0 0 1px var(--popover-edge),
0 24px 60px -18px var(--glass-shade),
0 6px 16px -6px var(--glass-lift)
```

**Control / button edge stack:**
```css
inset 0 1px 0 var(--glass-control-rim),
0 1px 2px var(--glass-contact)
```

**Field edge stack (URL bar):**
```css
inset 0 1px 0 var(--field-rim),
inset 0 0 0 1px var(--field-edge),
0 1px 2px var(--glass-contact)
```

All panes use `background-clip: padding-box` so the fill stops inside the border and the hairline sits cleanly on the outside.

---

## Breakpoints / media queries

| Query | Location | Purpose |
|-------|----------|---------|
| `@media (prefers-color-scheme: dark)` | `colors.css` | Dark theme tokens |
| `@media (prefers-color-scheme: light)` | `colors.css` | Light theme tokens |
| `@media not -moz-pref("sidebar.verticalTabs")` | `tabs.css`, `buttons.css`, `layout.css` | Horizontal tabs layout |
| `@media -moz-pref("sidebar.verticalTabs")` | `tabs.css`, `vertical-tabs.css` | Vertical tabs layout |
| `@media -moz-pref("firefoxcss.tabs.on.top.enable")` | `layout.css` | Tabs-on-top ordering |
| `@media (prefers-reduced-motion: reduce)` | `animations.css` | Disable motion |
| `@media (-moz-platform: linux)` | `linux-support.css`, `url-auto-hide.css` | Linux-specific fixes |
| `@media (-moz-gtk-csd-available)` | `linux-support.css` | GTK client-side decoration |
| `@media (hover: hover)` | `colors.css` (Solid Glass hover states) | Hover-capable devices |
| `@media (prefers-contrast)` | `customization.css` | High-contrast mode |

---

## Component patterns

### Tabs (`CSS/chrome/tabs.css`)
- **Min-width:** 108px; **Max-width:** 180px (selected); **Height:** 36px
- **Preserved:** tab sizes, rainbow border animation (`@keyframes filter` hue-rotate on `.tabbrowser-tab[selected] .tab-icon-stack`, conic-gradient #948ae3 / #5ad4e6 / #948ae3), close-button hover (opacity 0→1, border-radius 100%, transition 0.15s)
- **Glass edge:** every tab background carries the pane edge stack (rim + hairline + shade)
- **One state:** unselected = `--firefoxcss-tab-bg-color` (panel); hover = `--glass-state`; selected = `--firefoxcss-tab-active-bg-color` (card)
- **Vertical tabs:** compact margins, pinned tab padding 0 8px, scroll margins 2px

### Toolbar buttons (`CSS/chrome/buttons.css`)
- **Icon size:** 24px; **Total:** 28×28px; **Padding:** 2px inner + 2px outer
- **Transform:** scale(1) → scale(0.7) on active, 83ms linear transition
- **Glass face:** `--glass-control` (oklch(0.45 0 0 / 0.7)) with `--glass-edge` hairline
- **One state:** hover/active = `--glass-state` on `toolbarbutton-1` itself
- **Specificity:** `#navigator-toolbox toolbarbutton-1` with `-moz-appearance: none` to override Firefox native gradient hover
- **New tab button:** `--firefoxcss-new-tab-button-active` / `--firefoxcss-new-tab-button-hover` states

### URL bar (`CSS/chrome/urlbar.css`)
- **Font-size:** 1.1rem; **Height:** 30px; **Container height:** 36px
- **Glass field:** `--firefoxcss-url-bar-bg-color` with `--field-rim` (top light) + `--field-edge` (hairline)
- **Breakout:** breakout-extend dropdown with `--firefoxcss-url-breakout-box-shadow`
- **Auto-hide:** smart URL bar hiding based on interaction (`url-auto-hide.css`)

### Panels / menus (`CSS/chrome/context-menu.css`)
- **Thickness:** popover (`--firefoxcss-panel-bg-color` oklch(0.22 0 0 / 0.96))
- **Edge:** popover edge stack (rim + under + edge + shade + lift)
- **One state:** hovered menu item = `--glass-state`
- **Separator:** `--arrowpanel-border-color`, padding-block 1px

### Status panel (`CSS/chrome/statuspanel.css`)
- **Background:** `--firefoxcss-statuspanel-bg-color`
- **Edge:** `--glass-edge` hairline + `--glass-rim` rim + `--glass-contact` shadow
- **Radius:** `--radius-control`

### Bookmarks bar (`CSS/chrome/bookmarks.css`)
- **Background:** `--firefoxcss-bookmarks-bg-color`
- **Height:** 24px; **Padding:** 6px
- **Animation:** rotateX transform show/hide on hover, transition 100ms linear

### Vertical tabs (`CSS/chrome/vertical-tabs.css`)
- Overflow button: `--glass-control` face + `--glass-edge` hairline, hover = `--glass-state`

### Spill theme (`CSS/chrome/theme.css`)
- Navigator-toolbox bottom edge: `--glass-edge` hairline + `--glass-contact` shadow
- Tabbox bottom edge: same glass edge finish
- Zeroed viewport corner radii

### Customization mode (`CSS/chrome/customization.css`)
- Container: `--firefoxcss-main-bg-color`
- Overflow menu: `--firefoxcss-customize-view-overflow-menu`
- Flex space outline: `--firefoxcss-customize-view-flex-space`

### Shortcut cheatsheet (`CSS/chrome/shortcut-cheatsheet.css`)
- Panel: 380px wide, 540px max-height, padding 12px
- Category: 10.5px font, font-weight 600, letter-spacing 0.07em, uppercase, opacity 0.55
- Row hover: `color-mix(in srgb, currentColor 10%, transparent)`
- Chip bg: `color-mix(in srgb, currentColor 8%, transparent)`

### Containers (`CSS/chrome/containers.css`)
- Unselected container tabs: `--identity-tab-color` at opacity 0.3
- Tab context line: hidden

### Icons (`CSS/chrome/icons.css`)
- Size: 16×16px for context menu icons
- Fill: `currentColor` with `-moz-context-properties: fill`
- SVGs from `chrome://` URLs
- Menu bar icons: 28×30px, padding 3px, `border-radius: var(--toolbarbutton-border-radius)`

---

## Motion / animation

| Token | Value | Role |
|-------|-------|------|
| `--uc-motion-speed` | `0.45s` | Base motion speed |
| `--uc-motion-ease` | `cubic-bezier(0.22, 1, 0.36, 1)` | Base easing curve |
| `--uc-motion-glow-spread` | `6px` | Glow spread for swatches |

- **Global transition** (`animations.css`): `background-color .15s ease, opacity .15s ease, box-shadow .15s ease, scale .15s ease` on most chrome elements; `scale: 0.95` on `:active`
- **Tab label color:** `transition: color 100ms ease`
- **Tab icon opacity:** `transition: opacity 100ms ease`
- **Tab close button:** `transition: opacity 0.15s ease, visibility 0.15s ease, background-color 0.15s ease`
- **Tab-group swatch fan:** arc transforms via `JS/uiAnimations.uc.js`, filter glow on hover/checked
- **Transform ownership:** JS owns `transform` on swatches (writes `!important`); CSS owns transition/filter/shadow/at-rest look
- **Kill-switch:** `:root[uc-animations="off"]` disables all transitions/transforms/filter

---

## Constraints (from explicit brief)

| Constraint | Source |
|------------|--------|
| Tab min/max-width (108/180px) and height (36px) preserved | User brief |
| Rainbow border animation on selected tabs preserved | User brief |
| Tab close-button behavior preserved | User brief |
| Button icon size (24px), padding (2px inner/outer) preserved | User brief |
| 83ms transform timing preserved | User brief |
| 0.7x active scale preserved | User brief |
| `--grey-*` variables retained, never replaced | User brief |
| `--red-*` variables retained, never replaced | User brief |
| Non-greyscale colors retained and added, not replaced | User brief |
| Monochromatic base for most things | User brief |
| Button face lighter than surrounding chrome (~#555555 / oklch(0.45 0 0 / 0.7)) | User brief |

---

## Files

```
CSS/
├── common/
│   ├── variables.css      # Global variables + Solid Glass edge tokens
│   └── colors.css         # Dark/light color palettes
├── chrome/
│   ├── layout.css         # Toolbar order, height fixes, hide elements
│   ├── colors.css         # Set colors + Spill theme borders
│   ├── tabs.css           # Tab styling, rainbow animation, glass edge
│   ├── buttons.css        # Toolbar buttons, glass face, one state
│   ├── urlbar.css         # URL/search bar, glass field
│   ├── context-menu.css   # Right-click menus, popover thickness
│   ├── bookmarks.css      # Bookmarks bar, rotateX animation
│   ├── statuspanel.css    # Hover link preview panel
│   ├── theme.css          # Spill theme, glass edges
│   ├── vertical-tabs.css  # Vertical tabs + overflow button glass
│   ├── animations.css     # Render.js-inspired motion
│   ├── containers.css     # Container tab colors
│   ├── customization.css  # Customize mode
│   ├── icons.css          # Menu/context menu icons
│   ├── url-auto-hide.css  # URL bar auto-hide
│   ├── linux-support.css  # Linux-specific fixes
│   └── window-controls.css # Window control buttons
└── content/               # about: pages, new tab, settings, etc.
    ├── about-addons.css
    ├── about-config.css
    ├── firefox-view.css
    ├── image-viewer.css
    ├── new-tab.css
    ├── private-browsing.css
    └── settings-pages.css
```

Entry points: `userChrome.css` (imports chrome modules), `userContent.css` (imports content modules).

---

## Verification

- **Method:** Manual Firefox restart (Ctrl+Shift+R or restart button from `JS/restart_button.uc.js`)
- **Build:** None (Firefox loads directly from profile's `chrome/` directory)
- **Lint:** Disabled (`/* eslint-disable */` in files)
- **Dependencies:** `fx-autoconfig` required for `.uc.js`/`.uc.mjs` script loading
