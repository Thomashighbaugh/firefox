# Configuration Guide

Complete guide for configuring and customizing the Higgs Boson Firefox Theme.

## CSS Variables Configuration

### Core Theme Variables

The theme uses CSS custom properties for easy customization. All variables are defined in `css/common/variables.css`:

```css
:root {
  /* Border radius for UI elements */
  --firefoxcss-border-radius: 10px;
  
  /* Tab dimensions */
  --firefoxcss-tab-min-width: 108px;
  --firefoxcss-tab-max-width: 150px;
  
  /* Search bar styling */
  --firefoxcss-searchbar-height: 30px;
  --firefoxcss-searchbar-container-height: 36px;
  
  /* Control button spacing */
  --firefoxcss-control-buttons-margin: 0px;
  
  /* Top bar border */
  --firefoxcss-top-bar-border-bottom-size: 0;
}
```

### Color Customization

Colors are managed through `css/common/colors.css` with both light and dark mode support:

#### Light Mode Variables
```css
:root {
  --primary-bg: #f8f9fa;
  --secondary-bg: #e9ecef;
  --accent-color: #007bff;
  --text-primary: #212529;
  --text-secondary: #6c757d;
}
```

#### Dark Mode Variables
```css
@media (prefers-color-scheme: dark) {
  :root {
    --primary-bg: #1a1a1a;
    --secondary-bg: #2d3748;
    --accent-color: #4299e1;
    --text-primary: #f7fafc;
    --text-secondary: #a0aec0;
  }
}
```

## Component Configuration

### Vertical Tabs

Configure vertical tab behavior in `css/chrome/vertical-tabs.css`:

```css
:root {
  /* Tab strip width when collapsed */
  --uc-vertical-tabs-width-collapsed: 40px;
  
  /* Tab strip width when expanded */
  --uc-vertical-tabs-width-expanded: 200px;
  
  /* Animation duration */
  --uc-vertical-tabs-transition-duration: 200ms;
}
```

### Second Sidebar

The second sidebar system can be configured through JavaScript settings in `JS/second_sidebar/settings/`:

#### Main Settings (`sidebar_settings.mjs`)
```javascript
export const SIDEBAR_SETTINGS = {
  // Default sidebar position
  position: 'right', // 'left' or 'right'
  
  // Default width
  width: 300,
  
  // Auto-hide behavior
  autoHide: false,
  
  // Collapse animation duration
  animationDuration: 200
};
```

#### Web Panel Settings (`web_panel_settings.mjs`)
```javascript
export const WEB_PANEL_SETTINGS = {
  // Default web panel URL
  defaultUrl: 'about:blank',
  
  // User agent override
  userAgent: null,
  
  // Enable sound indicators
  soundIndicators: true,
  
  // Maximum number of panels
  maxPanels: 10
};
```

## Toolbar Customization

### Button Order and Visibility

Modify `css/chrome/toolbar-order.css` to customize button placement:

```css
/* Main toolbar layout */
#nav-bar {
  /* Define custom order for toolbar items */
  & > * {
    order: var(--toolbar-item-order, 0);
  }
  
  /* Specific button orders */
  #back-button { --toolbar-item-order: 1; }
  #forward-button { --toolbar-item-order: 2; }
  #urlbar-container { --toolbar-item-order: 3; }
  #downloads-button { --toolbar-item-order: 4; }
}
```

### Hidden Elements

Control element visibility in `css/chrome/hide-elements.css`:

```css
/* Hide specific UI elements */
#tabs-newtab-button,
#new-tab-button,
#TabsToolbar .titlebar-spacer {
  display: none !important;
}

/* Conditional hiding based on preferences */
@media not -moz-pref("sidebar.verticalTabs") {
  #sidebar-box {
    display: none !important;
  }
}
```

## JavaScript Module Configuration

### Enabling/Disabling Modules

JavaScript modules can be enabled or disabled by renaming files:

```bash
# Disable a module
mv restart_button.uc.js restart_button.uc.js.disabled

# Enable a module
mv restart_button.uc.js.disabled restart_button.uc.js
```

### Module-Specific Configuration

#### Extended Statusbar (`extendedStatusbar.uc.js`)
Modify the configuration object at the top of the file:

```javascript
const StatusbarConfig = {
  // Position: 'top', 'bottom'
  position: 'bottom',
  
  // Show/hide elements
  showClock: true,
  showMemoryUsage: false,
  showNetworkStatus: true,
  
  // Update intervals (ms)
  clockUpdateInterval: 1000,
  memoryUpdateInterval: 5000
};
```

#### Minimize Memory (`minimizeMemory.uc.js`)
Configure automatic memory management:

```javascript
const MemoryConfig = {
  // Auto-minimize after (minutes)
  autoMinimizeAfter: 30,
  
  // Memory threshold (MB)
  memoryThreshold: 1024,
  
  // Enable notifications
  showNotifications: false
};
```

## Firefox Preferences

### Required Preferences

Set these in `about:config` for full functionality:

```
# Enable userChrome/userContent CSS
toolkit.legacyUserProfileCustomizations.stylesheets = true

# Enable userChrome.js (with fx-autoconfig)
toolkit.startup.max_resumed_crashes = -1

# Compact UI density
browser.uidensity = 1

# Enable CSS support for vertical tabs
sidebar.verticalTabs = true
```

### Optional Preferences

```
# Disable tab animations for better performance
browser.tabs.animate = false

# Reduce toolbar animation
ui.prefersReducedMotion = 1

# Enable blur effects (Linux/Windows)
layout.css.backdrop-filter.enabled = true

# Hardware acceleration
gfx.webrender.enabled = true
```

## Advanced Customization

### Creating Custom Themes

1. **Copy base theme files**:
   ```bash
   cp css/common/variables.css css/common/variables-custom.css
   cp css/common/colors.css css/common/colors-custom.css
   ```

2. **Modify custom files** with your preferred values

3. **Update imports** in `userChrome.css`:
   ```css
   @import url("css/common/variables-custom.css");
   @import url("css/common/colors-custom.css");
   ```

### Custom CSS Additions

Add custom CSS by creating `css/chrome/custom.css`:

```css
/* Custom modifications */
@namespace url("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul");

/* Your custom styles here */
.my-custom-button {
  background: var(--accent-color);
  border-radius: var(--firefoxcss-border-radius);
}
```

Then import it in `userChrome.css`:
```css
@import url("css/chrome/custom.css");
```

### Custom JavaScript Modules

Create custom functionality by adding new `.uc.js` files:

```javascript
// custom-feature.uc.js
(function() {
  'use strict';
  
  // Wait for browser to be ready
  if (gBrowserInit.delayedStartupFinished) {
    init();
  } else {
    let delayedListener = (subject, topic) => {
      if (topic == "browser-delayed-startup-finished" && subject == window) {
        Services.obs.removeObserver(delayedListener, topic);
        init();
      }
    };
    Services.obs.addObserver(delayedListener, "browser-delayed-startup-finished");
  }
  
  function init() {
    // Your custom functionality here
  }
})();
```

## Performance Optimization

### Reducing Memory Usage

```css
/* Disable expensive effects on lower-end systems */
@media (max-device-width: 1366px) {
  /* Reduce blur effects */
  .blur-effect {
    backdrop-filter: none !important;
  }
  
  /* Simplify animations */
  * {
    transition-duration: 0ms !important;
    animation-duration: 0ms !important;
  }
}
```

### CSS Optimization

```css
/* Use transform for better performance */
.tab-transition {
  transform: translateX(0);
  transition: transform 200ms ease;
}

/* Avoid layout-triggering properties */
.button-hover {
  transform: scale(1.05);
  /* Instead of changing width/height */
}
```

## Debugging Configuration

### CSS Debugging

1. **Enable style debugging**:
   - Open DevTools (F12)
   - Go to Settings → Inspector
   - Check "Show browser styles"

2. **Inspect userChrome elements**:
   - Browser Console (Ctrl+Shift+J)
   - Run: `document.documentElement.style.setProperty('--debug-mode', '1')`

### JavaScript Debugging

1. **Enable browser console logging**:
   ```javascript
   // Add to any .uc.js file
   console.log("Module loaded:", new Date().toISOString());
   ```

2. **Check script loading**:
   - Browser Console (Ctrl+Shift+J)
   - Look for fx-autoconfig startup messages

## Backup and Migration

### Creating Configuration Backup

```bash
# Backup current configuration
tar -czf firefox-theme-backup-$(date +%Y%m%d).tar.gz \
  userChrome.css userContent.css css/ JS/ resources/ utils/
```

### Migration Between Profiles

1. Copy theme files to new profile's `chrome/` directory
2. Set required preferences in `about:config`
3. Install fx-autoconfig if using JavaScript modules
4. Restart Firefox

## Troubleshooting Configuration Issues

### CSS Not Applying
- Check file permissions and paths
- Verify CSS syntax with DevTools
- Clear startup cache in `about:support`

### JavaScript Not Loading
- Check Browser Console for error messages
- Verify fx-autoconfig installation
- Ensure script file permissions are correct

### Performance Issues
- Reduce animation durations
- Disable blur effects on slower systems
- Check for conflicting extensions

For more detailed troubleshooting, see the [Troubleshooting Guide](troubleshooting.md).