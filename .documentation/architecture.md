# Architecture Overview

Comprehensive overview of the Higgs Boson Firefox Theme architecture and design principles.

## Project Philosophy

The Higgs Boson Firefox Theme is designed around several core principles:

1. **Modularity**: Components are self-contained and loosely coupled
2. **Performance**: Minimal impact on Firefox startup and runtime performance
3. **Maintainability**: Clear separation of concerns and consistent patterns
4. **Extensibility**: Easy to add new features and customize existing ones
5. **Compatibility**: Works across multiple Firefox versions with graceful degradation

## Overall Architecture

```
┌─────────────────────────────────────────┐
│              Firefox Browser            │
├─────────────────────────────────────────┤
│           userChrome.css                │
│    ┌─────────────┬─────────────────┐    │
│    │ CSS Modules │ JavaScript       │    │
│    │             │ Modules          │    │
│    └─────────────┴─────────────────┘    │
├─────────────────────────────────────────┤
│          userContent.css                │
│    ┌─────────────────────────────────┐  │
│    │        Content Styles           │  │
│    └─────────────────────────────────┘  │
├─────────────────────────────────────────┤
│          fx-autoconfig Loader           │
│    ┌─────────────────────────────────┐  │
│    │       Script Loading            │  │
│    └─────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## Component Architecture

### CSS System Architecture

The CSS system follows a hierarchical import structure:

```
userChrome.css
├── css/common/variables.css      # Global CSS custom properties
├── css/common/colors.css         # Color scheme definitions
└── css/chrome/                   # Browser UI components
    ├── toolbar-order.css         # Toolbar layout and ordering
    ├── vertical-tabs.css         # Vertical tab implementation
    ├── search-bar.css            # URL bar and search styling
    ├── window-controls.css       # Window control buttons
    ├── context-menu.css          # Context menu styling
    ├── bookmarks.css             # Bookmarks toolbar
    ├── buttons.css               # General button styling
    ├── hide-elements.css         # Element visibility control
    ├── height-fixes.css          # Layout height adjustments
    ├── icons.css                 # Icon styling and overrides
    ├── linux-support.css         # Linux-specific adjustments
    ├── customization.css         # Customization mode support
    └── other.css                 # Miscellaneous styles
```

#### Design Patterns

**1. CSS Custom Properties Pattern**
```css
/* Variables defined in css/common/variables.css */
:root {
  --component-width: 200px;
  --component-height: 40px;
  --component-color: #333;
}

/* Used throughout components */
.component {
  width: var(--component-width);
  height: var(--component-height);
  color: var(--component-color);
}
```

**2. Responsive Design Pattern**
```css
/* Mobile-first approach */
.component {
  /* Base mobile styles */
}

@media (min-width: 768px) {
  .component {
    /* Tablet adjustments */
  }
}

@media (min-width: 1024px) {
  .component {
    /* Desktop adjustments */
  }
}
```

**3. Progressive Enhancement Pattern**
```css
/* Base functionality */
.component {
  background: #f0f0f0;
}

/* Enhanced with backdrop-filter support */
@supports (backdrop-filter: blur(10px)) {
  .component {
    background: rgba(240, 240, 240, 0.8);
    backdrop-filter: blur(10px);
  }
}
```

### JavaScript System Architecture

The JavaScript system uses a multi-layered approach:

```
JavaScript Architecture
├── Entry Points (.uc.js/.uc.mjs)
│   ├── second_sidebar.uc.mjs     # Main sidebar system
│   ├── restart_button.uc.js      # Simple toolbar additions
│   └── extendedStatusbar.uc.js   # Status bar functionality
│
├── Core Systems (second_sidebar/)
│   ├── controllers/              # Business logic layer
│   │   ├── sidebar_main.mjs      # Main sidebar controller
│   │   ├── collapse.mjs          # Collapse/expand logic
│   │   ├── events.mjs            # Event handling
│   │   └── web_panel.mjs         # Web panel management
│   │
│   ├── css/                      # Dynamic CSS generation
│   │   ├── sidebar.mjs           # Sidebar styling
│   │   ├── containers.mjs        # Container styling
│   │   └── popups.mjs            # Popup styling
│   │
│   ├── utils/                    # Utility functions
│   │   ├── string.mjs            # String manipulation
│   │   ├── icons.mjs             # Icon handling
│   │   └── parsers.mjs           # Data parsing
│   │
│   ├── wrappers/                 # Firefox API abstractions
│   │   ├── window.mjs            # Window management
│   │   ├── preferences.mjs       # Preference handling
│   │   └── tab_browser.mjs       # Tab manipulation
│   │
│   └── xul/                      # XUL element builders
│       ├── sidebar_box.mjs       # Sidebar container
│       ├── web_panel_tab.mjs     # Panel tab elements
│       └── popup_*.mjs           # Various popup elements
│
└── System Utilities (utils/)
    ├── boot.sys.mjs              # System initialization
    ├── module_loader.mjs         # Module loading utilities
    └── uc_api.sys.mjs            # UC API extensions
```

#### Design Patterns

**1. Module Pattern**
```javascript
// Self-contained module with clear interface
export class SidebarController {
  constructor(options = {}) {
    this.config = { ...defaultConfig, ...options };
    this.state = new Map();
    this.elements = new WeakMap();
  }
  
  // Public API
  async init() { /* ... */ }
  destroy() { /* ... */ }
  
  // Private methods
  #setupEventListeners() { /* ... */ }
  #createElements() { /* ... */ }
}
```

**2. Event-Driven Architecture**
```javascript
// Central event bus for module communication
export class EventBus {
  static #listeners = new Map();
  
  static emit(event, data) {
    const handlers = this.#listeners.get(event) || [];
    handlers.forEach(handler => handler(data));
  }
  
  static on(event, handler) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, []);
    }
    this.#listeners.get(event).push(handler);
  }
}
```

**3. Factory Pattern**
```javascript
// Element creation factory
export class ElementFactory {
  static createElement(type, config) {
    switch (type) {
      case 'sidebar':
        return SidebarBoxBuilder.create(config);
      case 'web-panel':
        return WebPanelBuilder.create(config);
      case 'toolbar-button':
        return ToolbarButtonBuilder.create(config);
      default:
        throw new Error(`Unknown element type: ${type}`);
    }
  }
}
```

## Data Flow Architecture

### CSS Data Flow

```
User Preferences → CSS Variables → Component Styles → Rendered UI
     ↓               ↓              ↓                  ↓
about:config → variables.css → component.css → Firefox UI
```

**Example Flow:**
1. User sets `sidebar.verticalTabs = true` in preferences
2. CSS media query `@media -moz-pref("sidebar.verticalTabs")` activates
3. Vertical tab styles apply to transform horizontal tabs to vertical
4. UI updates to show vertical tab layout

### JavaScript Data Flow

```
User Action → Event → Controller → Model → View → UI Update
     ↓          ↓        ↓         ↓       ↓         ↓
   Click → Custom → Sidebar → Panel → XUL → Browser
          Event    Controller  Data   Builder  DOM
```

**Example Flow:**
1. User clicks "Add Web Panel" button
2. Event emitted with panel configuration
3. SidebarController receives event
4. WebPanel model created with configuration
5. XUL elements built and styled
6. Elements inserted into browser DOM

## State Management

### CSS State Management

CSS state is managed through custom properties and media queries:

```css
/* Global state through custom properties */
:root {
  --sidebar-collapsed: 0; /* Boolean as number */
  --current-theme: light;
  --panel-count: 0;
}

/* State-dependent styling */
.sidebar {
  width: calc(200px * (1 - var(--sidebar-collapsed)) + 40px * var(--sidebar-collapsed));
  transition: width 200ms ease;
}

/* Media query state detection */
@media (prefers-color-scheme: dark) {
  :root {
    --current-theme: dark;
  }
}
```

### JavaScript State Management

JavaScript state is managed through dedicated state objects and the EventBus pattern:

```javascript
// Centralized state management
export class StateManager {
  static #state = new Map();
  static #watchers = new Map();
  
  static get(key) {
    return this.#state.get(key);
  }
  
  static set(key, value) {
    const oldValue = this.#state.get(key);
    this.#state.set(key, value);
    
    // Notify watchers
    const watchers = this.#watchers.get(key) || [];
    watchers.forEach(watcher => watcher(value, oldValue));
    
    // Emit global state change event
    EventBus.emit('state-change', { key, value, oldValue });
  }
  
  static watch(key, callback) {
    if (!this.#watchers.has(key)) {
      this.#watchers.set(key, []);
    }
    this.#watchers.get(key).push(callback);
  }
}
```

## Performance Architecture

### CSS Performance Optimization

1. **Selective Loading**: Components load only when needed
2. **Efficient Selectors**: Avoid universal selectors and complex chains
3. **Hardware Acceleration**: Use `transform` and `opacity` for animations
4. **Minimal Reflow**: Avoid layout-triggering properties during animations

```css
/* Efficient animation using transform */
.tab-hover {
  transform: translateY(-2px);
  transition: transform 150ms ease;
}

/* Instead of layout-triggering properties */
.tab-hover-slow {
  top: -2px; /* Triggers layout */
  transition: top 150ms ease;
}
```

### JavaScript Performance Optimization

1. **Lazy Loading**: Load modules only when needed
2. **Event Delegation**: Use single event listeners for multiple elements
3. **Weak References**: Use WeakMap for element associations
4. **Debouncing**: Limit expensive operations

```javascript
// Lazy loading pattern
class LazyModule {
  static async load() {
    if (!this.instance) {
      this.instance = new this();
      await this.instance.init();
    }
    return this.instance;
  }
}

// Event delegation pattern
class EventDelegator {
  constructor(container) {
    container.addEventListener('click', this.handleClick.bind(this));
  }
  
  handleClick(event) {
    const target = event.target.closest('[data-action]');
    if (target) {
      const action = target.dataset.action;
      this.executeAction(action, target);
    }
  }
}
```

## Security Architecture

### CSS Security

1. **No External Resources**: All assets are bundled locally
2. **Validated Properties**: Only safe CSS properties are used
3. **Scoped Selectors**: Avoid global selector pollution

### JavaScript Security

1. **Input Validation**: All user inputs are validated
2. **Safe DOM Manipulation**: Use safe element creation methods
3. **Content Security**: Validate URLs and content sources

```javascript
// Safe element creation
export class SafeDOM {
  static createElement(tagName, attributes = {}) {
    const element = document.createXULElement(tagName);
    
    for (const [key, value] of Object.entries(attributes)) {
      if (this.isSafeAttribute(key, value)) {
        element.setAttribute(key, String(value));
      }
    }
    
    return element;
  }
  
  static isSafeAttribute(name, value) {
    const dangerousAttributes = ['onclick', 'onload', 'onerror'];
    return !dangerousAttributes.includes(name.toLowerCase());
  }
}
```

## Error Handling Architecture

### Global Error Handling

```javascript
// Centralized error handling
export class ErrorHandler {
  static instance = null;
  
  static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }
  
  constructor() {
    // Catch unhandled errors
    window.addEventListener('error', this.handleError.bind(this));
    window.addEventListener('unhandledrejection', this.handleRejection.bind(this));
  }
  
  handleError(event) {
    console.error('Global error:', event.error);
    this.reportError(event.error);
  }
  
  handleRejection(event) {
    console.error('Unhandled promise rejection:', event.reason);
    this.reportError(event.reason);
  }
  
  reportError(error) {
    // Report to error tracking system
    if (typeof UC_API !== 'undefined' && UC_API.ErrorReporting) {
      UC_API.ErrorReporting.report(error);
    }
  }
}
```

### Component Error Boundaries

```javascript
// Error boundary pattern for components
export class ComponentBase {
  constructor() {
    this.errorCount = 0;
    this.maxErrors = 3;
  }
  
  async safeExecute(operation, fallback = null) {
    try {
      return await operation();
    } catch (error) {
      this.errorCount++;
      console.error(`Component error (${this.errorCount}/${this.maxErrors}):`, error);
      
      if (this.errorCount >= this.maxErrors) {
        console.warn('Component disabled due to too many errors');
        this.disable();
        return null;
      }
      
      return fallback;
    }
  }
  
  disable() {
    // Disable component functionality
    this.enabled = false;
  }
}
```

## Extension Points

### CSS Customization Points

1. **Custom Properties**: Override any CSS variable
2. **Component Hooks**: Insert custom CSS into specific components
3. **Media Query Extensions**: Add custom responsive breakpoints

### JavaScript Extension Points

1. **Event System**: Hook into any component event
2. **Module Registration**: Register custom modules
3. **API Extensions**: Extend existing APIs with new functionality

```javascript
// Extension registration
export class ExtensionManager {
  static #extensions = new Map();
  
  static register(name, extension) {
    this.#extensions.set(name, extension);
    
    // Initialize extension if system is ready
    if (this.systemReady) {
      extension.init();
    }
  }
  
  static getExtension(name) {
    return this.#extensions.get(name);
  }
  
  static async initializeAll() {
    for (const [name, extension] of this.#extensions) {
      try {
        await extension.init();
      } catch (error) {
        console.error(`Failed to initialize extension ${name}:`, error);
      }
    }
    this.systemReady = true;
  }
}
```

## Future Architecture Considerations

### Planned Improvements

1. **Configuration System**: Centralized configuration management
2. **Plugin Architecture**: Support for user-developed plugins
3. **Theme System**: Multiple theme variants support
4. **Performance Monitoring**: Built-in performance tracking
5. **Auto-Updates**: Automatic theme updates and compatibility checks

### Migration Strategy

For major architectural changes, the system supports gradual migration:

1. **Backward Compatibility**: Old patterns continue to work
2. **Deprecation Warnings**: Clear migration path communication
3. **Incremental Adoption**: New patterns can be adopted incrementally
4. **Version Gates**: Feature flags for gradual rollout

This architecture provides a solid foundation for the Firefox theme while maintaining flexibility for future enhancements and customizations.