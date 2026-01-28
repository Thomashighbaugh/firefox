# CSS Components Documentation

Comprehensive guide to the CSS component system used in the Higgs Boson Firefox Theme.

## Architecture Overview

The CSS system is organized into three main categories:

```
css/
├── chrome/           # Browser UI styling
├── common/          # Shared variables and utilities  
├── content/         # Web content styling
```

All styles are imported through the main `userChrome.css` and `userContent.css` files.

## Common Components

### Variables (`css/common/variables.css`)

Central location for all CSS custom properties used throughout the theme.

#### Core Layout Variables
```css
:root {
  /* Border radius for consistent rounded corners */
  --firefoxcss-border-radius: 10px;
  
  /* Control spacing and sizing */
  --firefoxcss-control-buttons-margin: 0px;
  --toolbarbutton-outer-padding: 2px;
  --toolbarbutton-inner-padding: 4px;
  
  /* Tab dimensions */
  --firefoxcss-tab-min-width: 108px;
  --firefoxcss-tab-max-width: 150px;
  --tab-min-height: 28px;
  --tabstrip-min-height: 28px;
}
```

#### Search Bar Variables
```css
:root {
  --firefoxcss-searchbar-height: 30px;
  --firefoxcss-searchbar-container-height: 36px;
  --urlbar-icon-border-radius: calc(var(--firefoxcss-border-radius) - 2px);
}
```

#### Conditional Variables
```css
/* Variables that apply only when vertical tabs are disabled */
@media not -moz-pref("sidebar.verticalTabs") {
  :root {
    --tab-block-margin: 2px;
    --tab-min-height: 28px;
    --tabstrip-min-height: 28px;
  }
}
```

### Colors (`css/common/colors.css`)

Defines the color scheme with support for light/dark modes and user preferences.

#### Base Color Definitions
```css
:root {
  /* Primary colors */
  --primary-background: #ffffff;
  --secondary-background: #f5f5f5;
  --tertiary-background: #e9e9e9;
  
  /* Text colors */
  --primary-text: #000000;
  --secondary-text: #666666;
  --muted-text: #999999;
  
  /* Accent colors */
  --accent-primary: #0066cc;
  --accent-hover: #0052a3;
  --accent-active: #003d7a;
}
```

#### Dark Mode Support
```css
@media (prefers-color-scheme: dark) {
  :root {
    --primary-background: #1c1c1c;
    --secondary-background: #2c2c2c;
    --tertiary-background: #3c3c3c;
    --primary-text: #ffffff;
    --secondary-text: #cccccc;
    --muted-text: #999999;
  }
}
```

## Chrome Components

### Toolbar Order (`css/chrome/toolbar-order.css`)

Controls the arrangement of toolbar elements using CSS flexbox ordering.

```css
/* Main navigation bar layout */
#nav-bar {
  display: flex !important;
  flex-direction: row;
  
  /* Remove default toolbar styling */
  -moz-appearance: none !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

/* Define custom order for toolbar items */
#back-button { order: 1; }
#forward-button { order: 2; }
#stop-reload-button { order: 3; }
#urlbar-container { order: 4; }
#downloads-button { order: 10; }
#fxa-toolbar-menu-button { order: 11; }
```

### Vertical Tabs (`css/chrome/vertical-tabs.css`)

Implements the custom vertical tab system on the left side of the browser.

#### Tab Strip Layout
```css
/* Move tab strip to the left */
#TabsToolbar {
  position: fixed !important;
  left: 0 !important;
  top: var(--toolbar-height, 40px) !important;
  width: var(--vertical-tabs-width, 200px) !important;
  height: calc(100vh - var(--toolbar-height, 40px)) !important;
  orientation: vertical !important;
  flex-direction: column !important;
}

/* Tab container modifications */
#tabbrowser-arrowscrollbox {
  flex-direction: column !important;
  min-height: unset !important;
}
```

#### Individual Tab Styling
```css
.tabbrowser-tab {
  /* Full width tabs */
  width: 100% !important;
  max-width: none !important;
  
  /* Vertical orientation */
  writing-mode: horizontal-tb !important;
  
  /* Spacing and padding */
  margin-bottom: 2px !important;
  padding: 8px !important;
  
  /* Visual styling */
  border-radius: var(--firefoxcss-border-radius) !important;
  background: var(--tab-background, transparent) !important;
  
  /* Hover effects */
  &:hover {
    background: var(--tab-hover-background) !important;
  }
  
  /* Active tab styling */
  &[selected] {
    background: var(--tab-selected-background) !important;
    color: var(--tab-selected-color) !important;
  }
}
```

#### Tab Content Layout
```css
.tab-content {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  width: 100% !important;
  
  /* Icon styling */
  .tab-icon-image {
    margin-right: 8px !important;
    flex-shrink: 0 !important;
  }
  
  /* Label styling */
  .tab-label {
    flex: 1 !important;
    text-overflow: ellipsis !important;
    overflow: hidden !important;
    white-space: nowrap !important;
  }
  
  /* Close button positioning */
  .tab-close-button {
    margin-left: auto !important;
    flex-shrink: 0 !important;
  }
}
```

### Window Controls (`css/chrome/window-controls.css`)

Handles the window control buttons (minimize, maximize, close) positioning and styling.

```css
/* Window controls container */
.titlebar-buttonbox-container {
  position: fixed !important;
  top: 0 !important;
  right: 0 !important;
  z-index: 1000 !important;
  
  /* Styling */
  background: var(--toolbar-bgcolor) !important;
  border-bottom-left-radius: var(--firefoxcss-border-radius) !important;
}

/* Individual control buttons */
.titlebar-button {
  width: 46px !important;
  height: 32px !important;
  border-radius: 0 !important;
  
  /* Icons and hover states */
  &:hover {
    background: var(--button-hover-bgcolor) !important;
  }
  
  &.titlebar-close:hover {
    background: #e74c3c !important;
    color: white !important;
  }
}
```

### Search Bar (`css/chrome/search-bar.css`)

Styles the URL bar and search functionality.

```css
/* URL bar container */
#urlbar-container {
  flex: 1 !important;
  margin: 0 8px !important;
  
  /* Background and border */
  background: var(--toolbar-field-background-color) !important;
  border: 1px solid var(--toolbar-field-border-color) !important;
  border-radius: var(--firefoxcss-border-radius) !important;
}

/* URL bar input */
#urlbar {
  height: var(--firefoxcss-searchbar-height) !important;
  padding: 0 12px !important;
  
  /* Typography */
  font-size: 14px !important;
  color: var(--toolbar-field-color) !important;
  
  /* Remove default styling */
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

/* URL bar focus state */
#urlbar:focus {
  outline: 2px solid var(--focus-outline-color) !important;
  outline-offset: -2px !important;
}

/* URL bar results popup */
#urlbar-results {
  margin-top: 4px !important;
  border-radius: var(--firefoxcss-border-radius) !important;
  background: var(--arrowpanel-background) !important;
  border: 1px solid var(--arrowpanel-border-color) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
}
```

### Context Menu (`css/chrome/context-menu.css`)

Styles context menus throughout the browser interface.

```css
/* Context menu panels */
menupopup,
panel {
  /* Background and border */
  background: var(--arrowpanel-background) !important;
  border: 1px solid var(--arrowpanel-border-color) !important;
  border-radius: var(--firefoxcss-border-radius) !important;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15) !important;
  
  /* Spacing */
  padding: 6px 0 !important;
  margin: 4px 0 !important;
}

/* Menu items */
menuitem {
  padding: 8px 16px !important;
  margin: 0 6px !important;
  border-radius: calc(var(--firefoxcss-border-radius) - 2px) !important;
  
  /* Typography */
  color: var(--arrowpanel-color) !important;
  font-size: 13px !important;
  
  /* Hover state */
  &:hover {
    background: var(--arrowpanel-dimmed) !important;
  }
  
  /* Disabled state */
  &[disabled] {
    color: var(--arrowpanel-dimmed-further) !important;
    opacity: 0.6 !important;
  }
}

/* Menu separators */
menuseparator {
  margin: 6px 12px !important;
  border-top: 1px solid var(--arrowpanel-dimmed) !important;
}
```

### Button Styling (`css/chrome/buttons.css`)

Provides consistent styling for all toolbar buttons.

```css
/* Base toolbar button styling */
.toolbarbutton-1 {
  /* Sizing */
  min-width: 32px !important;
  min-height: 32px !important;
  padding: var(--toolbarbutton-inner-padding) !important;
  margin: var(--toolbarbutton-outer-padding) !important;
  
  /* Visual styling */
  border-radius: var(--firefoxcss-border-radius) !important;
  background: transparent !important;
  border: none !important;
  
  /* Icon styling */
  .toolbarbutton-icon {
    width: 16px !important;
    height: 16px !important;
  }
  
  /* Hover state */
  &:hover {
    background: var(--button-hover-bgcolor) !important;
  }
  
  /* Active state */
  &:active {
    background: var(--button-active-bgcolor) !important;
  }
  
  /* Disabled state */
  &[disabled] {
    opacity: 0.4 !important;
  }
}

/* Special button types */
#back-button {
  /* Custom back button styling */
}

#forward-button {
  /* Custom forward button styling */
}

#downloads-button {
  /* Download button specific styles */
}
```

### Hide Elements (`css/chrome/hide-elements.css`)

Controls visibility of various UI elements.

```css
/* Hidden by default */
#tabs-newtab-button,
#new-tab-button,
#TabsToolbar .titlebar-spacer[type="pre-tabs"],
#TabsToolbar .titlebar-spacer[type="post-tabs"] {
  display: none !important;
}

/* Conditional hiding based on preferences */
@media not -moz-pref("sidebar.verticalTabs") {
  /* Hide elements when vertical tabs are disabled */
  .vertical-tabs-only {
    display: none !important;
  }
}

/* Hide on certain window states */
:root[inDOMFullscreen] .hide-in-fullscreen {
  display: none !important;
}

/* Hide based on window size */
@media (max-width: 800px) {
  .hide-on-narrow {
    display: none !important;
  }
}
```

## Content Components

### New Tab Page (`css/content/new-tab.css`)

Styles the new tab page content.

```css
@-moz-document url("about:newtab"), url("about:home") {
  /* Remove default styling */
  body {
    background: var(--newtab-background-color, transparent) !important;
  }
  
  /* Search box styling */
  .search-wrapper {
    input {
      border-radius: var(--firefoxcss-border-radius) !important;
      background: var(--newtab-search-background) !important;
      border: 1px solid var(--newtab-search-border) !important;
    }
  }
  
  /* Top sites grid */
  .top-sites {
    .top-site-outer {
      border-radius: var(--firefoxcss-border-radius) !important;
      
      &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
      }
    }
  }
}
```

### Private Browsing (`css/content/private-browsing.css`)

Custom styling for private browsing windows.

```css
@-moz-document url("about:privatebrowsing") {
  /* Dark theme for private browsing */
  .container {
    background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%) !important;
    color: #f7fafc !important;
  }
  
  /* Logo styling */
  .logo {
    filter: brightness(0.9) !important;
  }
  
  /* Info section styling */
  .info {
    background: rgba(255, 255, 255, 0.05) !important;
    border-radius: var(--firefoxcss-border-radius) !important;
    backdrop-filter: blur(10px) !important;
  }
}
```

## Responsive Design

### Breakpoints
```css
/* Mobile/narrow screens */
@media (max-width: 768px) {
  :root {
    --vertical-tabs-width: 160px;
    --firefoxcss-tab-max-width: 120px;
  }
}

/* Tablet screens */
@media (min-width: 769px) and (max-width: 1024px) {
  :root {
    --vertical-tabs-width: 180px;
  }
}

/* Desktop screens */
@media (min-width: 1025px) {
  :root {
    --vertical-tabs-width: 200px;
  }
}
```

### High DPI Support
```css
@media (min-resolution: 2dppx) {
  /* High DPI specific adjustments */
  .toolbarbutton-icon {
    transform: scale(0.9) !important;
  }
  
  /* Use higher resolution assets */
  .icon-background {
    background-image: url("../assets/icons/icon@2x.png") !important;
    background-size: contain !important;
  }
}
```

## Performance Considerations

### Animation Optimization
```css
/* Use transforms for smooth animations */
.tab-hover-effect {
  transform: translateY(0);
  transition: transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Reduce animations on low-end devices */
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```

### GPU Acceleration
```css
/* Force GPU acceleration for smooth effects */
.hardware-accelerated {
  transform: translateZ(0) !important;
  will-change: transform !important;
}

/* Blur effects with fallbacks */
.backdrop-blur {
  backdrop-filter: blur(10px);
  
  /* Fallback for unsupported browsers */
  @supports not (backdrop-filter: blur(10px)) {
    background: rgba(255, 255, 255, 0.8) !important;
  }
}
```

## Debugging and Development

### CSS Debugging
```css
/* Debug mode styling */
:root[debug-mode="1"] {
  * {
    outline: 1px solid red !important;
  }
  
  .component-boundary {
    background: rgba(255, 0, 0, 0.1) !important;
  }
}
```

### Browser Console Integration
```css
/* Conditional styling based on console output */
:root[data-debug-css="true"] {
  --debug-mode: 1;
}
```

For more information on customizing these components, see the [Configuration Guide](configuration.md).