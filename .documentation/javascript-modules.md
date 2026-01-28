# JavaScript Modules Documentation

Complete guide to the JavaScript module system in the Higgs Boson Firefox Theme.

## Architecture Overview

The JavaScript system extends Firefox's functionality through userChrome.js scripts and ES modules. The codebase uses the fx-autoconfig script loader for maximum compatibility and features.

```
JS/
├── second_sidebar/          # Advanced sidebar system (ES modules)
│   ├── controllers/        # Business logic controllers
│   ├── css/               # Dynamic CSS generation
│   ├── settings/          # Configuration modules
│   ├── utils/             # Utility functions
│   ├── wrappers/          # Firefox API wrappers
│   └── xul/               # XUL element builders
├── *.uc.js                # UserChrome.js scripts
└── second_sidebar.uc.mjs  # Main second sidebar entry point
```

## Core System Components

### Script Loader Integration

The system relies on fx-autoconfig for script loading and management:

```javascript
// Entry point pattern for .uc.js files
(function() {
  'use strict';
  
  // Wait for browser startup completion
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
    // Module initialization logic
  }
})();
```

### ES Module Pattern

Modern ES modules use the `.mjs` extension and leverage the UC_API system:

```javascript
// second_sidebar.uc.mjs
// ==UserScript==
// @name            Second Sidebar for Firefox
// @description     Advanced sidebar system with web panels
// @author          aminought
// @homepageURL     https://github.com/aminought/firefox-second-sidebar
// ==/UserScript==

import { SidebarInjector } from "./second_sidebar/sidebar_injector.mjs";
import { SidebarDecorator } from "./second_sidebar/sidebar_decorator.mjs";
import { CustomizeModePatcher } from "./second_sidebar/customize_mode_patcher.mjs";

const run = () => {
  if (SidebarInjector.inject()) {
    SidebarDecorator.decorate();
    CustomizeModePatcher.patch();
  }
};

if (typeof UC_API !== "undefined") {
  UC_API.Runtime.startupFinished().then(run);
} else {
  delayedStartupPromise.then(run);
}
```

## Individual Module Documentation

### Second Sidebar System

The second sidebar provides an advanced web panel system similar to Vivaldi or Floorp.

#### Core Components

**Sidebar Injector (`second_sidebar/sidebar_injector.mjs`)**
- Injects sidebar XUL elements into the browser DOM
- Handles element positioning and initial setup
- Manages lifecycle events

```javascript
export class SidebarInjector {
  static inject() {
    try {
      // Check if already injected
      if (document.getElementById('second-sidebar-box')) {
        return true;
      }
      
      // Create sidebar container
      const sidebarBox = SidebarBoxBuilder.create();
      const mainWindow = document.getElementById('main-window');
      
      // Insert before the main browser area
      mainWindow.insertBefore(sidebarBox, document.getElementById('browser'));
      
      return true;
    } catch (error) {
      console.error('Failed to inject second sidebar:', error);
      return false;
    }
  }
}
```

**Sidebar Controllers (`second_sidebar/controllers/`)**

*Main Controller (`sidebar_main.mjs`)*
```javascript
export class SidebarMainController {
  constructor() {
    this.panels = new Map();
    this.settings = SidebarSettings.load();
    this.initializeEventListeners();
  }
  
  initializeEventListeners() {
    // Panel creation events
    document.addEventListener('create-web-panel', this.handleCreatePanel.bind(this));
    
    // Panel management events  
    document.addEventListener('delete-web-panel', this.handleDeletePanel.bind(this));
    document.addEventListener('edit-web-panel', this.handleEditPanel.bind(this));
  }
  
  handleCreatePanel(event) {
    const { url, title, container } = event.detail;
    const panel = new WebPanel({ url, title, container });
    this.panels.set(panel.id, panel);
    this.renderPanel(panel);
  }
}
```

*Collapse Controller (`collapse.mjs`)*
```javascript
export class CollapseController {
  constructor(sidebarElement) {
    this.sidebar = sidebarElement;
    this.isCollapsed = false;
    this.animationDuration = 200;
    
    this.setupCollapseButton();
  }
  
  setupCollapseButton() {
    const button = document.getElementById('sidebar-collapse-button');
    button.addEventListener('click', () => this.toggle());
  }
  
  toggle() {
    if (this.isCollapsed) {
      this.expand();
    } else {
      this.collapse();
    }
  }
  
  collapse() {
    this.sidebar.style.transition = `width ${this.animationDuration}ms ease`;
    this.sidebar.style.width = '40px';
    this.sidebar.classList.add('collapsed');
    this.isCollapsed = true;
  }
  
  expand() {
    this.sidebar.style.width = this.settings.expandedWidth;
    this.sidebar.classList.remove('collapsed');
    this.isCollapsed = false;
  }
}
```

#### Web Panel System

**Web Panel Core (`web_panel.mjs`)**
```javascript
export class WebPanel {
  constructor({ url, title, container, userAgent = null }) {
    this.id = this.generateId();
    this.url = url;
    this.title = title;
    this.container = container;
    this.userAgent = userAgent;
    this.browser = null;
    this.tab = null;
    
    this.createElements();
  }
  
  createElements() {
    // Create tab button
    this.tab = WebPanelTabBuilder.create({
      id: this.id,
      title: this.title,
      icon: this.getFaviconUrl()
    });
    
    // Create browser element
    this.browser = WebPanelBrowserBuilder.create({
      id: this.id,
      url: this.url,
      userAgent: this.userAgent,
      container: this.container
    });
  }
  
  load() {
    if (this.browser) {
      this.browser.loadURI(Services.io.newURI(this.url));
    }
  }
  
  unload() {
    if (this.browser) {
      this.browser.stop();
    }
  }
  
  setTitle(newTitle) {
    this.title = newTitle;
    if (this.tab) {
      this.tab.setAttribute('label', newTitle);
    }
  }
}
```

**Web Panel Browser (`web_panel_browser.mjs`)**
```javascript
export class WebPanelBrowserBuilder {
  static create({ id, url, userAgent, container }) {
    const browser = document.createXULElement('browser');
    
    // Configure browser attributes
    browser.setAttribute('id', `web-panel-browser-${id}`);
    browser.setAttribute('type', 'content');
    browser.setAttribute('remote', 'true');
    browser.setAttribute('maychangeremoteness', 'true');
    browser.setAttribute('autocompletepopup', 'PopupAutoComplete');
    browser.setAttribute('contextmenu', 'contentAreaContextMenu');
    
    // Set container if specified
    if (container) {
      browser.setAttribute('usercontextid', container);
    }
    
    // Set custom user agent if specified
    if (userAgent) {
      browser.setAttribute('useragent', userAgent);
    }
    
    // Add progress listener
    browser.addProgressListener({
      onLocationChange: (webProgress, request, location, flags) => {
        this.handleLocationChange(id, location.spec);
      },
      
      onStateChange: (webProgress, request, stateFlags, status) => {
        this.handleStateChange(id, stateFlags);
      }
    });
    
    return browser;
  }
  
  static handleLocationChange(panelId, url) {
    // Update panel URL
    const panel = WebPanelRegistry.get(panelId);
    if (panel) {
      panel.url = url;
    }
    
    // Update favicon
    this.updateFavicon(panelId, url);
  }
}
```

### UserChrome.js Scripts

#### Extended Statusbar (`extendedStatusbar.uc.js`)

Adds a customizable status bar to the bottom of the browser window.

```javascript
// Configuration
const StatusbarConfig = {
  position: 'bottom',
  showClock: true,
  showMemoryUsage: false,
  showNetworkStatus: true,
  clockFormat: '24h', // '12h' or '24h'
  updateInterval: 1000
};

// Main statusbar class
class ExtendedStatusbar {
  constructor() {
    this.container = null;
    this.clockElement = null;
    this.memoryElement = null;
    this.networkElement = null;
    
    this.init();
  }
  
  init() {
    this.createContainer();
    this.createElements();
    this.startUpdates();
  }
  
  createContainer() {
    this.container = document.createXULElement('hbox');
    this.container.id = 'extended-statusbar';
    this.container.setAttribute('class', 'statusbar-container');
    
    // Position the statusbar
    const target = StatusbarConfig.position === 'top' 
      ? document.getElementById('navigator-toolbox')
      : document.getElementById('browser-bottombox');
      
    target.appendChild(this.container);
  }
  
  createElements() {
    if (StatusbarConfig.showClock) {
      this.createClock();
    }
    
    if (StatusbarConfig.showMemoryUsage) {
      this.createMemoryMonitor();
    }
    
    if (StatusbarConfig.showNetworkStatus) {
      this.createNetworkMonitor();
    }
  }
  
  createClock() {
    this.clockElement = document.createXULElement('label');
    this.clockElement.id = 'statusbar-clock';
    this.clockElement.setAttribute('class', 'statusbar-item');
    this.container.appendChild(this.clockElement);
  }
  
  updateClock() {
    if (!this.clockElement) return;
    
    const now = new Date();
    const format = StatusbarConfig.clockFormat === '12h' 
      ? { hour12: true }
      : { hour12: false };
      
    const timeString = now.toLocaleTimeString([], {
      ...format,
      hour: '2-digit',
      minute: '2-digit'
    });
    
    this.clockElement.value = timeString;
  }
}
```

#### Restart Button (`restart_button.uc.js`)

Adds a restart button to the toolbar for quick browser restart.

```javascript
class RestartButton {
  constructor() {
    this.button = null;
    this.init();
  }
  
  init() {
    this.createButton();
    this.addToToolbar();
  }
  
  createButton() {
    this.button = document.createXULElement('toolbarbutton');
    this.button.id = 'restart-button';
    this.button.setAttribute('class', 'toolbarbutton-1 chromeclass-toolbar-additional');
    this.button.setAttribute('label', 'Restart');
    this.button.setAttribute('tooltiptext', 'Restart Firefox');
    this.button.setAttribute('image', 'chrome://global/skin/icons/reload.svg');
    
    this.button.addEventListener('command', () => this.restart());
  }
  
  addToToolbar() {
    // Add to navigation toolbar by default
    const navbar = document.getElementById('nav-bar');
    const urlbar = document.getElementById('urlbar-container');
    navbar.insertBefore(this.button, urlbar.nextSibling);
    
    // Make it customizable
    CustomizableUI.createWidget({
      id: 'restart-button',
      type: 'custom',
      onBuild: () => this.button
    });
  }
  
  restart() {
    const appStartup = Cc["@mozilla.org/toolkit/app-startup;1"]
      .getService(Ci.nsIAppStartup);
    appStartup.quit(Ci.nsIAppStartup.eRestart | Ci.nsIAppStartup.eAttemptQuit);
  }
}

// Initialize when browser is ready
new RestartButton();
```

#### Tab Context Menu Navigation (`tabContextMenuNavigation.uc.js`)

Adds navigation options to the tab context menu.

```javascript
class TabContextMenuNavigation {
  constructor() {
    this.menuItems = [];
    this.init();
  }
  
  init() {
    this.createMenuItems();
    this.addEventListeners();
  }
  
  createMenuItems() {
    const tabContextMenu = document.getElementById('tabContextMenu');
    
    // Add separator
    const separator = document.createXULElement('menuseparator');
    separator.id = 'tab-nav-separator';
    tabContextMenu.appendChild(separator);
    
    // Navigate back
    const backItem = document.createXULElement('menuitem');
    backItem.id = 'tab-nav-back';
    backItem.setAttribute('label', 'Go Back');
    backItem.setAttribute('accesskey', 'B');
    backItem.addEventListener('command', () => this.navigateBack());
    tabContextMenu.appendChild(backItem);
    this.menuItems.push(backItem);
    
    // Navigate forward
    const forwardItem = document.createXULElement('menuitem');
    forwardItem.id = 'tab-nav-forward';
    forwardItem.setAttribute('label', 'Go Forward');
    forwardItem.setAttribute('accesskey', 'F');
    forwardItem.addEventListener('command', () => this.navigateForward());
    tabContextMenu.appendChild(forwardItem);
    this.menuItems.push(forwardItem);
    
    // Reload
    const reloadItem = document.createXULElement('menuitem');
    reloadItem.id = 'tab-nav-reload';
    reloadItem.setAttribute('label', 'Reload');
    reloadItem.setAttribute('accesskey', 'R');
    reloadItem.addEventListener('command', () => this.reload());
    tabContextMenu.appendChild(reloadItem);
    this.menuItems.push(reloadItem);
  }
  
  addEventListeners() {
    const tabContextMenu = document.getElementById('tabContextMenu');
    tabContextMenu.addEventListener('popupshowing', (event) => {
      this.updateMenuItems(event);
    });
  }
  
  updateMenuItems(event) {
    const tab = TabContextMenu.contextTab;
    if (!tab || !tab.linkedBrowser) return;
    
    const browser = tab.linkedBrowser;
    const webNavigation = browser.webNavigation;
    
    // Update back button state
    const backItem = document.getElementById('tab-nav-back');
    backItem.disabled = !webNavigation.canGoBack;
    
    // Update forward button state
    const forwardItem = document.getElementById('tab-nav-forward');
    forwardItem.disabled = !webNavigation.canGoForward;
  }
  
  navigateBack() {
    const tab = TabContextMenu.contextTab;
    if (tab && tab.linkedBrowser) {
      tab.linkedBrowser.goBack();
    }
  }
  
  navigateForward() {
    const tab = TabContextMenu.contextTab;
    if (tab && tab.linkedBrowser) {
      tab.linkedBrowser.goForward();
    }
  }
  
  reload() {
    const tab = TabContextMenu.contextTab;
    if (tab && tab.linkedBrowser) {
      tab.linkedBrowser.reload();
    }
  }
}
```

## Development Patterns

### Error Handling

```javascript
// Consistent error handling pattern
class ModuleBase {
  constructor() {
    try {
      this.init();
    } catch (error) {
      this.handleError('Initialization failed', error);
    }
  }
  
  handleError(message, error) {
    console.error(`[${this.constructor.name}] ${message}:`, error);
    
    // Optional: Send to error reporting service
    if (typeof UC_API !== 'undefined' && UC_API.ErrorReporting) {
      UC_API.ErrorReporting.report(error, {
        module: this.constructor.name,
        message: message
      });
    }
  }
}
```

### Preferences Integration

```javascript
// Reading and writing Firefox preferences
class PreferenceManager {
  static getBool(pref, defaultValue = false) {
    try {
      return Services.prefs.getBoolPref(pref);
    } catch (e) {
      return defaultValue;
    }
  }
  
  static setBool(pref, value) {
    Services.prefs.setBoolPref(pref, value);
  }
  
  static getString(pref, defaultValue = '') {
    try {
      return Services.prefs.getStringPref(pref);
    } catch (e) {
      return defaultValue;
    }
  }
  
  static setString(pref, value) {
    Services.prefs.setStringPref(pref, value);
  }
}

// Usage example
const sidebarWidth = PreferenceManager.getString('sidebar.second.width', '300px');
PreferenceManager.setString('sidebar.second.collapsed', 'false');
```

### Event System

```javascript
// Custom event system for module communication
class EventBus {
  static emit(eventName, detail = {}) {
    const event = new CustomEvent(eventName, { 
      detail,
      bubbles: true,
      cancelable: true 
    });
    document.dispatchEvent(event);
  }
  
  static on(eventName, handler) {
    document.addEventListener(eventName, handler);
  }
  
  static off(eventName, handler) {
    document.removeEventListener(eventName, handler);
  }
}

// Usage
EventBus.emit('web-panel-created', { 
  panelId: 'panel-1', 
  url: 'https://example.com' 
});

EventBus.on('web-panel-created', (event) => {
  console.log('Panel created:', event.detail);
});
```

## Testing and Debugging

### Browser Console Integration

```javascript
// Debug logging with levels
class Logger {
  static levels = { ERROR: 0, WARN: 1, INFO: 2, DEBUG: 3 };
  static currentLevel = this.levels.INFO;
  
  static setLevel(level) {
    this.currentLevel = typeof level === 'string' 
      ? this.levels[level.toUpperCase()] 
      : level;
  }
  
  static log(level, message, ...args) {
    if (this.levels[level] <= this.currentLevel) {
      const timestamp = new Date().toISOString();
      console[level.toLowerCase()](`[${timestamp}] ${message}`, ...args);
    }
  }
  
  static error(message, ...args) { this.log('ERROR', message, ...args); }
  static warn(message, ...args) { this.log('WARN', message, ...args); }
  static info(message, ...args) { this.log('INFO', message, ...args); }
  static debug(message, ...args) { this.log('DEBUG', message, ...args); }
}

// Enable debug logging
Logger.setLevel('DEBUG');
```

### Performance Monitoring

```javascript
// Performance monitoring utilities
class PerformanceMonitor {
  static timers = new Map();
  
  static start(name) {
    this.timers.set(name, performance.now());
  }
  
  static end(name) {
    const startTime = this.timers.get(name);
    if (startTime) {
      const duration = performance.now() - startTime;
      console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
      this.timers.delete(name);
      return duration;
    }
  }
  
  static measure(name, fn) {
    this.start(name);
    const result = fn();
    this.end(name);
    return result;
  }
}

// Usage
PerformanceMonitor.measure('sidebar-injection', () => {
  SidebarInjector.inject();
});
```

## Security Considerations

### Safe DOM Manipulation

```javascript
// Safe element creation
class SafeDOM {
  static createElement(tagName, attributes = {}, textContent = '') {
    const element = document.createXULElement(tagName);
    
    // Sanitize attributes
    for (const [key, value] of Object.entries(attributes)) {
      if (this.isValidAttribute(key, value)) {
        element.setAttribute(key, String(value));
      }
    }
    
    // Sanitize text content
    if (textContent) {
      element.textContent = String(textContent);
    }
    
    return element;
  }
  
  static isValidAttribute(name, value) {
    // Prevent script injection through attributes
    const dangerousAttributes = ['onclick', 'onload', 'onerror'];
    return !dangerousAttributes.includes(name.toLowerCase());
  }
}
```

### URL Validation

```javascript
// Safe URL handling
class URLValidator {
  static isValidURL(urlString) {
    try {
      const url = new URL(urlString);
      return ['http:', 'https:', 'file:', 'about:'].includes(url.protocol);
    } catch {
      return false;
    }
  }
  
  static sanitizeURL(urlString) {
    if (!this.isValidURL(urlString)) {
      return 'about:blank';
    }
    return urlString;
  }
}
```

For more information on extending the JavaScript system, see the [Development Guide](development.md).