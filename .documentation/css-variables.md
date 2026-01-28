# CSS Variables Reference

Complete reference of all CSS custom properties (variables) available in the Higgs Boson Firefox Theme.

## Global Variables

Located in `css/common/variables.css`

### Layout Variables

```css
:root {
  /* Border radius for UI elements */
  --firefoxcss-border-radius: 10px;
  
  /* Top bar border styling */
  --firefoxcss-top-bar-border-bottom-size: 0;
  
  /* Control button spacing */
  --firefoxcss-control-buttons-margin: 0px;
}
```

### Tab Variables

```css
:root {
  /* Tab dimensions */
  --firefoxcss-tab-min-width: 108px;
  --firefoxcss-tab-max-width: 150px;
  --tab-min-height: 28px;
  --tabstrip-min-height: 28px;
  
  /* Tab spacing */
  --tab-block-margin: 2px;
  
  /* Vertical tabs specific */
  --vertical-tabs-width: 200px;
  --vertical-tabs-collapsed-width: 40px;
}
```

### Search Bar Variables

```css
:root {
  /* Search bar dimensions */
  --firefoxcss-searchbar-height: 30px;
  --firefoxcss-searchbar-container-height: 36px;
  
  /* URL bar icon styling */
  --urlbar-icon-border-radius: calc(var(--firefoxcss-border-radius) - 2px);
}
```

### Toolbar Variables

```css
:root {
  /* Toolbar button spacing */
  --toolbarbutton-outer-padding: 2px;
  --toolbarbutton-inner-padding: 4px;
  
  /* Toolbar layout */
  --toolbar-height: 40px;
}
```

## Component-Specific Variables

### Vertical Tabs

Located in `css/chrome/vertical-tabs.css`

```css
:root {
  /* Tab strip positioning */
  --uc-vertical-tabs-position: left; /* left or right */
  --uc-vertical-tabs-width: 200px;
  --uc-vertical-tabs-width-collapsed: 40px;
  
  /* Animation */
  --uc-vertical-tabs-transition-duration: 200ms;
  --uc-vertical-tabs-transition-easing: ease;
  
  /* Tab styling */
  --uc-vertical-tab-height: 36px;
  --uc-vertical-tab-padding: 8px 12px;
  --uc-vertical-tab-margin: 2px;
  --uc-vertical-tab-border-radius: 6px;
}
```

### Second Sidebar

Located in `JS/second_sidebar/css/sidebar.mjs`

```css
:root {
  /* Sidebar dimensions */
  --second-sidebar-width: 300px;
  --second-sidebar-min-width: 200px;
  --second-sidebar-max-width: 500px;
  --second-sidebar-collapsed-width: 40px;
  
  /* Panel styling */
  --web-panel-header-height: 40px;
  --web-panel-tab-height: 36px;
  --web-panel-tab-padding: 8px 12px;
  
  /* Animation */
  --sidebar-animation-duration: 200ms;
  --panel-transition-duration: 150ms;
}
```

### Toolbar Order

Located in `css/chrome/toolbar-order.css`

```css
:root {
  /* Toolbar button order */
  --back-button-order: 1;
  --forward-button-order: 2;
  --stop-reload-button-order: 3;
  --urlbar-container-order: 4;
  --downloads-button-order: 10;
  --extensions-button-order: 11;
  --fxa-toolbar-menu-button-order: 12;
}
```

## Color Variables

Located in `css/common/colors.css`

### Light Mode Colors

```css
:root {
  /* Primary colors */
  --theme-primary-bg: #ffffff;
  --theme-secondary-bg: #f8f9fa;
  --theme-tertiary-bg: #e9ecef;
  
  /* Text colors */
  --theme-text-primary: #212529;
  --theme-text-secondary: #6c757d;
  --theme-text-muted: #adb5bd;
  
  /* Accent colors */
  --theme-accent-primary: #007bff;
  --theme-accent-secondary: #6c757d;
  --theme-accent-success: #28a745;
  --theme-accent-warning: #ffc107;
  --theme-accent-danger: #dc3545;
  
  /* Border colors */
  --theme-border-color: #dee2e6;
  --theme-border-light: #f8f9fa;
  --theme-border-dark: #adb5bd;
  
  /* Interactive states */
  --theme-hover-bg: #e9ecef;
  --theme-active-bg: #dee2e6;
  --theme-focus-color: #007bff;
  --theme-focus-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}
```

### Dark Mode Colors

```css
@media (prefers-color-scheme: dark) {
  :root {
    /* Primary colors */
    --theme-primary-bg: #1a1a1a;
    --theme-secondary-bg: #2d2d2d;
    --theme-tertiary-bg: #404040;
    
    /* Text colors */
    --theme-text-primary: #ffffff;
    --theme-text-secondary: #cccccc;
    --theme-text-muted: #999999;
    
    /* Accent colors */
    --theme-accent-primary: #4dabf7;
    --theme-accent-secondary: #868e96;
    --theme-accent-success: #51cf66;
    --theme-accent-warning: #ffd43b;
    --theme-accent-danger: #ff6b6b;
    
    /* Border colors */
    --theme-border-color: #404040;
    --theme-border-light: #2d2d2d;
    --theme-border-dark: #666666;
    
    /* Interactive states */
    --theme-hover-bg: #404040;
    --theme-active-bg: #4d4d4d;
    --theme-focus-color: #4dabf7;
    --theme-focus-shadow: 0 0 0 2px rgba(77, 171, 247, 0.25);
  }
}
```

## Firefox Native Variables

These variables are provided by Firefox and can be referenced in custom CSS:

### Panel Variables

```css
/* Arrow panel (popup) styling */
--arrowpanel-background
--arrowpanel-border-color  
--arrowpanel-color
--arrowpanel-dimmed
--arrowpanel-dimmed-further
--arrowpanel-padding
```

### Toolbar Variables

```css
/* Toolbar styling */
--toolbar-bgcolor
--toolbar-color
--toolbar-field-background-color
--toolbar-field-border-color
--toolbar-field-color
--toolbar-field-focus-background-color
--toolbar-field-focus-border-color
--toolbar-field-focus-color
```

### Button Variables

```css
/* Button styling */
--button-bgcolor
--button-hover-bgcolor
--button-active-bgcolor
--button-primary-bgcolor
--button-primary-hover-bgcolor
--button-primary-active-bgcolor
```

### Tab Variables

```css
/* Tab styling */
--tab-background
--tab-hover-background  
--tab-selected-background
--tab-loading-fill
--tab-attention-icon-color
--tab-sound-indicator-color
```

## Responsive Breakpoints

### Predefined Breakpoints

```css
/* Mobile devices */
@media (max-width: 480px) {
  :root {
    --breakpoint: mobile;
    --vertical-tabs-width: 150px;
    --toolbar-button-size: 28px;
  }
}

/* Tablet devices */
@media (min-width: 481px) and (max-width: 768px) {
  :root {
    --breakpoint: tablet;
    --vertical-tabs-width: 180px;
    --toolbar-button-size: 32px;
  }
}

/* Desktop devices */
@media (min-width: 769px) and (max-width: 1024px) {
  :root {
    --breakpoint: desktop-small;
    --vertical-tabs-width: 200px;
    --toolbar-button-size: 36px;
  }
}

/* Large desktop devices */
@media (min-width: 1025px) {
  :root {
    --breakpoint: desktop-large;
    --vertical-tabs-width: 220px;
    --toolbar-button-size: 36px;
  }
}
```

### High DPI Support

```css
@media (min-resolution: 2dppx) {
  :root {
    --high-dpi: true;
    --icon-scaling: 0.9;
    --border-width: 0.5px;
  }
}
```

## Preference-Based Variables

These variables change based on Firefox preferences:

### Vertical Tabs Preference

```css
/* When sidebar.verticalTabs is enabled */
@media -moz-pref("sidebar.verticalTabs") {
  :root {
    --vertical-tabs-enabled: 1;
    --horizontal-tabs-enabled: 0;
  }
}

/* When sidebar.verticalTabs is disabled */  
@media not -moz-pref("sidebar.verticalTabs") {
  :root {
    --vertical-tabs-enabled: 0;
    --horizontal-tabs-enabled: 1;
  }
}
```

### UI Density Preference

```css
/* Compact UI density */
@media -moz-pref("browser.uidensity", 1) {
  :root {
    --ui-density: compact;
    --toolbar-button-padding: 2px;
    --tab-height: 28px;
  }
}

/* Touch UI density */
@media -moz-pref("browser.uidensity", 2) {
  :root {
    --ui-density: touch;
    --toolbar-button-padding: 8px;
    --tab-height: 44px;
  }
}
```

## Animation Variables

### Timing Functions

```css
:root {
  /* Easing curves */
  --ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-circ: cubic-bezier(0.85, 0, 0.15, 1);
  
  /* Duration presets */
  --duration-fast: 150ms;
  --duration-medium: 250ms;
  --duration-slow: 400ms;
}
```

### Transition Presets

```css
:root {
  /* Common transitions */
  --transition-fast: all var(--duration-fast) var(--ease-in-out-quart);
  --transition-medium: all var(--duration-medium) var(--ease-out-expo);
  --transition-slow: all var(--duration-slow) var(--ease-in-out-circ);
  
  /* Specific property transitions */
  --transition-opacity: opacity var(--duration-fast) ease;
  --transition-transform: transform var(--duration-medium) var(--ease-out-expo);
  --transition-background: background-color var(--duration-fast) ease;
}
```

## Platform-Specific Variables

### Windows

```css
@media (-moz-platform: windows) {
  :root {
    --platform: windows;
    --title-bar-height: 32px;
    --window-controls-width: 138px;
  }
}
```

### macOS

```css
@media (-moz-platform: macos) {
  :root {
    --platform: macos;
    --title-bar-height: 28px;
    --window-controls-width: 70px;
  }
}
```

### Linux

```css
@media (-moz-platform: linux) {
  :root {
    --platform: linux;
    --title-bar-height: 32px;
    --window-controls-width: 96px;
  }
}
```

## Usage Examples

### Customizing Tab Width

```css
/* Override default tab width */
:root {
  --firefoxcss-tab-min-width: 120px;
  --firefoxcss-tab-max-width: 180px;
}
```

### Changing Sidebar Width

```css
/* Customize second sidebar width */
:root {
  --second-sidebar-width: 350px;
  --second-sidebar-collapsed-width: 50px;
}
```

### Custom Color Scheme

```css
/* Override theme colors */
:root {
  --theme-accent-primary: #ff6b6b;
  --theme-accent-secondary: #4ecdc4;
  --theme-primary-bg: #f8f9fa;
}
```

### Animation Customization

```css
/* Disable animations for better performance */
:root {
  --duration-fast: 0ms;
  --duration-medium: 0ms; 
  --duration-slow: 0ms;
}

/* Or make them faster */
:root {
  --duration-fast: 100ms;
  --duration-medium: 150ms;
  --duration-slow: 200ms;
}
```

## Browser Console Testing

You can test variable changes in real-time using the Browser Console:

```javascript
// Change variables on the fly
document.documentElement.style.setProperty('--theme-accent-primary', '#ff6b6b');
document.documentElement.style.setProperty('--vertical-tabs-width', '250px');
document.documentElement.style.setProperty('--duration-fast', '50ms');

// Read current variable values
getComputedStyle(document.documentElement).getPropertyValue('--theme-accent-primary');
```

For more customization examples, see the [Configuration Guide](configuration.md).