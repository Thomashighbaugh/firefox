# AGENTS.md - CSS Module Organization

**Context:** 22 CSS files split into chrome/ (browser UI), content/ (web pages), common/ (shared).

## OVERVIEW
Modular CSS loaded via `@import` from `userChrome.css` and `userContent.css`. Extensive use of CSS custom properties (`--firefoxcss-*`) for theming.

## STRUCTURE

```
css/
├── chrome/              # Browser UI (15 files)
│   ├── toolbar-order.css       # Toolbar layout
│   ├── tabs.css               # Tab bar styling
│   ├── vertical-tabs.css      # Vertical tabs
│   ├── bookmarks.css          # Bookmarks toolbar
│   ├── context-menu.css       # Right-click menus
│   ├── search-bar.css         # URL bar
│   ├── buttons.css            # Toolbar buttons
│   ├── window-controls.css    # Min/max/close
│   └── ...
├── content/             # Web content (5 files)
│   ├── colors.css             # Content page colors
│   ├── new-tab.css            # New tab page
│   ├── about-pages.css        # about:* pages
│   ├── private-browsing.css   # Private window
│   └── firefox-view.css       # Firefox View
└── common/              # Shared (3 files)
    ├── variables.css          # Global CSS vars
    ├── colors.css             # Theme colors (dark/light)
    └── assets/                # Icons, wallpapers, textures
```

## IMPORT ORDER

### userChrome.css
```
common/variables.css → common/colors.css → chrome/*.css
```

### userContent.css
```
content/colors.css → content/*.css
```

**Order matters:** Variables must load before usage.

## CUSTOM PROPERTIES

### Naming Convention
All custom properties prefixed `--firefoxcss-*`:
- `--firefoxcss-main-bg-color` - Primary background
- `--firefoxcss-tab-hover-bg-color` - Tab hover state
- `--firefoxcss-border-radius` - Global border radius
- `--firefoxcss-toolbar-button-*` - Toolbar button states

### Theme System
Colors defined per theme via `@media (prefers-color-scheme: dark|light)`:
```css
@media (prefers-color-scheme: dark) {
  :root {
    --firefoxcss-main-bg-color: hsl(240, 2%, 13%);
    /* ... */
  }
}
```

### Usage Pattern
```css
#TabsToolbar {
  background-color: var(--firefoxcss-main-bg-color) !important;
}
```

## FIREFOX-SPECIFIC PATTERNS

### @-moz-document Wrapper
Not used in this theme (CSS loaded in chrome context already scoped).

### XUL Namespace
Declared in `userChrome.css`:
```css
@namespace xul url("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul");
```

### !important Overrides
Heavy use of `!important` to override Firefox's default styles:
```css
#navigator-toolbox {
  --tabs-border-color: none !important;
}
```

### Firefox Selectors
Target internal XUL elements:
- `#TabsToolbar`, `#navigator-toolbox` - Main UI containers
- `.tabbrowser-tab` - Individual tabs
- `#urlbar-container` - URL bar
- `#PersonalToolbar` - Bookmarks bar

## NOTES
- **Modular:** Each file targets one UI component, easy to disable
- **No SCSS/PostCSS:** Pure CSS with native custom properties
- **Assets:** Icons in `common/assets/icons/`, referenced via `url()`
- **Color Scheme:** Respects OS dark/light mode preference
- **Testing:** Changes visible after restart (Ctrl+Shift+R)
