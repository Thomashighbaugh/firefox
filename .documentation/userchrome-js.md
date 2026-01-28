# userChrome.js Documentation

This project uses userChrome.js scripts to extend Firefox's functionality beyond what's possible with CSS alone. These scripts run in Firefox's chrome context and can modify browser behavior, add UI elements, and integrate with Firefox APIs.

## Table of Contents
- [Script Loading System](#script-loading-system)
- [Available Scripts](#available-scripts)
- [Second Sidebar System](#second-sidebar-system)
- [Development Guide](#development-guide)
- [API Reference](#api-reference)

## Script Loading System

The project uses the fx-autoconfig script loader system to load userChrome.js scripts automatically when Firefox starts.

### Setup Required
1. Install fx-autoconfig script loader (see [Installation Guide](installation.md))
2. Enable userChrome.js support in Firefox preferences
3. Scripts are loaded from the `JS/` directory

### Script Types
- **`.uc.js` files** - Traditional userChrome.js scripts
- **`.uc.mjs` files** - ES6 module-based scripts (newer format)
- **`.sys.mjs` files** - System modules for shared functionality

## Available Scripts

### Core Enhancement Scripts

#### allTabsMenuExpansionPack.uc.js
Enhances the "All Tabs" menu with additional functionality and improved layout.

**Features:**
- Extended tab management options
- Improved visual styling
- Additional context menu items

#### autocompletePopupStyler.uc.js
Customizes the appearance and behavior of Firefox's autocomplete popup.

**Features:**
- Custom styling for suggestion dropdowns
- Enhanced visual feedback
- Improved usability

#### extendedStatusbar.uc.js
Adds a customizable status bar to Firefox with various information displays.

**Features:**
- Customizable status information
- Position and content configuration
- Integration with browser state

#### restart_button.uc.js / restart_item_in_menu.uc.js
Adds restart functionality to Firefox's interface.

**Features:**
- Restart button in toolbar
- Restart menu item
- Clean restart with profile preservation

#### sidebarWidth.uc.js
Provides enhanced control over sidebar dimensions and behavior.

**Features:**
- Persistent sidebar width settings
- Dynamic resize capabilities
- Integration with theme styling

### Utility Scripts

#### minimizeMemory.uc.js
Provides memory management utilities for Firefox.

**Features:**
- Manual memory cleanup triggers
- Automatic memory optimization
- Performance monitoring

#### newTabUrlInAboutConfig.uc.js
Allows customization of the new tab page URL through about:config.

**Features:**
- Custom new tab URLs
- Dynamic configuration
- Preference integration

#### privateWindowHomepage.uc.js
Customizes the homepage behavior for private browsing windows.

**Features:**
- Separate homepage for private mode
- Privacy-focused defaults
- Custom styling support

### Development Tools

#### rebuild_userChrome.uc.js
Development utility for rebuilding userChrome styles without restarting Firefox.

**Features:**
- Hot reload for CSS changes
- Development mode support
- Error reporting

#### pdfTools.uc.js
Enhances PDF viewing capabilities within Firefox.

**Features:**
- Additional PDF viewer controls
- Custom PDF handling options
- Integration with browser themes

### Advanced Scripts

#### openLinkInUnloadedTab.uc.js
Provides options for opening links in background tabs without loading them immediately.

**Features:**
- Memory-efficient browsing
- Tab management optimization
- Performance improvements

#### tabContextMenuNavigation.uc.js
Enhances tab context menus with additional navigation options.

**Features:**
- Extended tab management
- Navigation shortcuts
- Custom menu items

#### tooltipShadowSupport.uc.js
Adds shadow effects and enhanced styling to Firefox tooltips.

**Features:**
- Visual enhancements
- Theme integration
- Customizable effects

#### space_and_separator_restorer.uc.js
Restores flexible space and separator elements in Firefox's toolbar customization.

**Features:**
- Enhanced toolbar customization
- Layout flexibility
- UI element management

## Second Sidebar System

The project includes a comprehensive second sidebar system built with ES6 modules, providing advanced sidebar functionality.

### Architecture Overview

The second sidebar is implemented as a modular system in `JS/second_sidebar/`:

```
second_sidebar/
├── controllers/          # Main logic controllers
├── css/                 # CSS generation modules
├── settings/            # Configuration management
├── utils/               # Utility functions
├── wrappers/           # Firefox API wrappers
├── xul/                # XUL element generators
└── [main files]        # Core initialization
```

### Key Components

#### Controllers (`controllers/`)
- **sidebar_main.mjs** - Primary sidebar controller
- **web_panels.mjs** - Web panel management
- **collapse.mjs** - Sidebar collapse/expand functionality
- **events.mjs** - Event handling system

#### CSS Management (`css/`)
- **sidebar.mjs** - Main sidebar styling
- **web_panels_browser.mjs** - Web panel browser styling
- **customization.mjs** - Customization interface styles
- **popups.mjs** - Popup and context menu styles

#### Settings (`settings/`)
- **sidebar_settings.mjs** - Core sidebar preferences
- **web_panels_settings.mjs** - Web panel configuration
- **settings.mjs** - General settings management

#### XUL Elements (`xul/`)
- **sidebar_box.mjs** - Main sidebar container
- **web_panel_browser.mjs** - Web panel browser elements
- **sidebar_toolbar.mjs** - Sidebar toolbar components
- **web_panel_button.mjs** - Web panel control buttons

### Entry Point
The second sidebar is loaded via `second_sidebar.uc.mjs`, which initializes the entire system.

## Development Guide

### Creating New userChrome.js Scripts

#### Basic Script Structure
```javascript
// ==UserScript==
// @name         Script Name
// @description  Script description
// @author       Your Name
// @version      1.0
// @include      main
// ==/UserScript==

(function() {
    'use strict';
    
    // Your script logic here
    
})();
```

#### ES6 Module Structure (recommended)
```javascript
// ==UserScript==
// @name         Script Name
// @description  Script description
// @author       Your Name
// @version      1.0
// @include      main
// ==/UserScript==

export class ScriptName {
    static {
        this.init();
    }
    
    static init() {
        // Initialization logic
    }
    
    // Methods and functionality
}
```

### Best Practices

#### Code Organization
- Use classes for complex functionality
- Keep related functionality in modules
- Use descriptive naming conventions
- Comment complex logic

#### Firefox Integration
- Use proper XUL namespaces
- Handle Firefox API deprecations
- Test across Firefox versions
- Respect user preferences

#### Performance
- Minimize DOM manipulation
- Use event delegation where possible
- Cache frequently accessed elements
- Profile memory usage

### Testing
- Test scripts in clean Firefox profiles
- Verify compatibility with theme changes
- Check for conflicts with other extensions
- Test in different Firefox versions

## API Reference

### Common Firefox APIs Used

#### XUL Document Manipulation
```javascript
// Get XUL elements
const element = document.getElementById('elementId');
const elements = document.querySelectorAll('selector');

// Create XUL elements
const newElement = document.createXULElement('tagname');
newElement.setAttribute('attribute', 'value');
```

#### Preference Management
```javascript
// Read preferences
const value = Services.prefs.getBoolPref('preference.name');
const stringValue = Services.prefs.getStringPref('preference.name');

// Set preferences
Services.prefs.setBoolPref('preference.name', true);
Services.prefs.setStringPref('preference.name', 'value');
```

#### Observer Pattern
```javascript
// Add observers
Services.obs.addObserver(observer, 'topic', false);

// Remove observers
Services.obs.removeObserver(observer, 'topic');
```

#### Window Management
```javascript
// Get current window
const window = Services.wm.getMostRecentWindow('navigator:browser');

// Window enumeration
const windows = Services.wm.getEnumerator('navigator:browser');
```

### Project-Specific APIs

The project provides several wrapper modules in `JS/second_sidebar/wrappers/` that simplify Firefox API usage:

- **preferences.mjs** - Simplified preference management
- **window.mjs** - Window manipulation utilities
- **observers.mjs** - Observer pattern helpers
- **customizable_ui.mjs** - UI customization wrappers

### CSS-in-JS Integration

Many scripts in the second sidebar system use CSS-in-JS for dynamic styling:

```javascript
import { css } from './css/common.mjs';

// Generate CSS
const styles = css`
    .my-element {
        background: var(--custom-color);
        padding: 4px;
    }
`;

// Apply styles
document.adoptedStyleSheets.push(styles);
```

## Troubleshooting

### Common Issues

#### Scripts Not Loading
- Verify fx-autoconfig installation
- Check script syntax for errors
- Ensure proper file extensions (.uc.js or .uc.mjs)
- Restart Firefox after adding new scripts

#### Console Errors
- Open Browser Console (Ctrl+Shift+J)
- Look for script-related error messages
- Check for Firefox API deprecations
- Verify XUL element selectors

#### Performance Issues
- Profile script execution time
- Check for memory leaks
- Optimize DOM queries
- Use passive event listeners

#### Conflicts with Extensions
- Test with extensions disabled
- Check for overlapping functionality
- Verify CSS specificity
- Use proper event handling

### Debugging Tools

- Browser Console for error messages
- DOM Inspector for XUL structure
- Performance profiler for optimization
- Memory analyzer for leak detection

### Getting Help

For issues specific to userChrome.js:
1. Check the project's troubleshooting guide
2. Review Firefox developer documentation
3. Search userChrome.js community forums
4. Create detailed issue reports with error logs

---

For more information, see the [main documentation index](README.md).