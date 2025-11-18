# Development Guide

Comprehensive guide for developers working on the Higgs Boson Firefox Theme.

## Development Environment Setup

### Prerequisites

1. **Firefox Developer Edition or Nightly**
   - Download from [Firefox Developer Edition](https://www.mozilla.org/firefox/developer/)
   - Recommended for testing latest features and APIs

2. **Browser Toolbox Access**
   ```
   about:config settings:
   - devtools.chrome.enabled = true
   - devtools.debugger.remote-enabled = true
   - devtools.policy.disabled = false
   ```

3. **Text Editor/IDE**
   - VSCode with extensions:
     - Firefox DevTools
     - CSS Intellisense
     - JavaScript ES6+ support

4. **Version Control**
   ```bash
   git clone <repository-url>
   cd firefox-theme
   git checkout -b feature/your-feature-name
   ```

### Project Structure Understanding

```
firefox-theme/
├── .github/documentation/    # Project documentation
├── css/                     # CSS components
│   ├── chrome/             # Browser UI styles
│   ├── common/             # Shared variables and utilities
│   └── content/            # Web content styles
├── JS/                     # JavaScript modules
│   ├── second_sidebar/     # Advanced sidebar system
│   └── *.uc.js            # Individual UserChrome scripts
├── resources/              # Assets and configurations
├── utils/                  # System utilities and loaders
├── userChrome.css          # Main CSS entry point
├── userContent.css         # Content styling entry point
└── README.md
```

### Development Profile Setup

1. **Create development profile**:
   ```bash
   firefox -P development-profile -no-remote
   ```

2. **Enable development preferences**:
   ```javascript
   // In about:config
   toolkit.legacyUserProfileCustomizations.stylesheets = true
   devtools.chrome.enabled = true
   browser.chrome.site_icons = true
   browser.chrome.favicons = true
   ```

3. **Install fx-autoconfig**:
   ```bash
   # Download latest release
   wget https://github.com/MrOtherGuy/fx-autoconfig/releases/latest
   
   # Extract to Firefox installation directory
   # Follow installation instructions in fx-autoconfig documentation
   ```

## Development Workflow

### CSS Development

#### Setting up CSS Debugging

1. **Enable live CSS editing**:
   ```css
   /* Add to userChrome.css for development */
   @media (prefers-color-scheme: debug) {
     :root {
       --debug-mode: 1;
     }
     
     * {
       outline: 1px solid rgba(255, 0, 0, 0.3) !important;
     }
   }
   ```

2. **Use CSS custom properties for rapid iteration**:
   ```css
   :root {
     /* Development variables */
     --dev-bg-color: #ff0000; /* Easy to spot changes */
     --dev-text-color: #00ff00;
     --dev-border-radius: 20px; /* Exaggerated for visibility */
   }
   ```

#### CSS Component Development

1. **Create new component file**:
   ```css
   /* css/chrome/new-component.css */
   @namespace url("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul");
   
   /* Component-specific styles */
   .new-component {
     /* Base styles */
   }
   ```

2. **Add to userChrome.css**:
   ```css
   @import url("css/chrome/new-component.css");
   ```

3. **Test incrementally**:
   - Restart Firefox to see changes
   - Use Browser Toolbox to inspect elements
   - Validate across different window states

#### Responsive Design Testing

```css
/* Test different window sizes */
@media (max-width: 800px) {
  :root {
    --debug-responsive: "narrow";
  }
}

@media (min-width: 1200px) {
  :root {
    --debug-responsive: "wide";
  }
}

/* Visual indicator of current breakpoint */
:root::before {
  content: "Current: " var(--debug-responsive, "default");
  position: fixed;
  top: 0;
  right: 0;
  background: red;
  color: white;
  padding: 4px;
  z-index: 9999;
}
```

### JavaScript Development

#### ES Module Development

1. **Create new module structure**:
   ```javascript
   // JS/new_feature/new_feature.mjs
   export class NewFeature {
     constructor() {
       this.initialized = false;
       this.elements = new Map();
     }
     
     async init() {
       try {
         await this.createElements();
         await this.setupEventListeners();
         this.initialized = true;
         console.log('NewFeature initialized successfully');
       } catch (error) {
         console.error('Failed to initialize NewFeature:', error);
       }
     }
     
     async createElements() {
       // Element creation logic
     }
     
     async setupEventListeners() {
       // Event listener setup
     }
     
     destroy() {
       // Cleanup logic
       this.elements.clear();
       this.initialized = false;
     }
   }
   ```

2. **Create entry point script**:
   ```javascript
   // JS/new_feature.uc.mjs
   // ==UserScript==
   // @name            New Feature
   // @description     Description of the new feature
   // @author          Your Name
   // @version         1.0.0
   // ==/UserScript==
   
   import { NewFeature } from "./new_feature/new_feature.mjs";
   
   let featureInstance = null;
   
   const run = async () => {
     try {
       featureInstance = new NewFeature();
       await featureInstance.init();
     } catch (error) {
       console.error('Failed to start NewFeature:', error);
     }
   };
   
   // Cleanup on window unload
   window.addEventListener('unload', () => {
     if (featureInstance) {
       featureInstance.destroy();
     }
   });
   
   if (typeof UC_API !== "undefined") {
     UC_API.Runtime.startupFinished().then(run);
   } else {
     delayedStartupPromise.then(run);
   }
   ```

#### UserChrome.js Development

1. **Standard script template**:
   ```javascript
   // new-script.uc.js
   (function() {
     'use strict';
     
     // Configuration
     const CONFIG = {
       enabled: true,
       debugMode: false,
       // Add configuration options
     };
     
     // Main script class
     class NewScript {
       constructor() {
         this.initialized = false;
         this.elements = [];
       }
       
       init() {
         try {
           this.createElements();
           this.setupEventListeners();
           this.initialized = true;
           
           if (CONFIG.debugMode) {
             console.log('NewScript initialized');
           }
         } catch (error) {
           console.error('NewScript initialization failed:', error);
         }
       }
       
       createElements() {
         // Element creation logic
       }
       
       setupEventListeners() {
         // Event listener setup
       }
       
       destroy() {
         // Cleanup logic
         this.elements.forEach(element => {
           if (element.parentNode) {
             element.parentNode.removeChild(element);
           }
         });
         this.elements = [];
         this.initialized = false;
       }
     }
     
     // Initialize when browser is ready
     if (gBrowserInit.delayedStartupFinished) {
       new NewScript().init();
     } else {
       let delayedListener = (subject, topic) => {
         if (topic == "browser-delayed-startup-finished" && subject == window) {
           Services.obs.removeObserver(delayedListener, topic);
           new NewScript().init();
         }
       };
       Services.obs.addObserver(delayedListener, "browser-delayed-startup-finished");
     }
     
   })();
   ```

### Testing and Validation

#### Automated Testing

1. **CSS validation**:
   ```bash
   # Install CSS linting tools
   npm install -g csslint
   
   # Validate CSS files
   csslint css/chrome/*.css
   csslint css/common/*.css
   csslint css/content/*.css
   ```

2. **JavaScript validation**:
   ```bash
   # Install ESLint
   npm install -g eslint
   
   # Create .eslintrc.js for Firefox userChrome
   # Validate JavaScript files
   eslint JS/*.uc.js --env=browser,es6
   ```

#### Manual Testing Checklist

1. **Basic Functionality**:
   - [ ] CSS loads without errors
   - [ ] Vertical tabs display correctly
   - [ ] Toolbar layout is proper
   - [ ] Second sidebar functions (if using JavaScript)
   - [ ] Window controls work correctly

2. **Cross-Platform Testing**:
   - [ ] Windows 10/11
   - [ ] macOS (latest 2 versions)
   - [ ] Linux (Ubuntu, Fedora, Arch)

3. **Firefox Version Testing**:
   - [ ] Firefox Stable (latest)
   - [ ] Firefox ESR (latest)
   - [ ] Firefox Beta
   - [ ] Firefox Nightly

4. **Extension Compatibility**:
   - [ ] uBlock Origin
   - [ ] Bitwarden
   - [ ] Dark Reader
   - [ ] Tree Style Tab (compatibility test)

#### Performance Testing

1. **Memory usage monitoring**:
   ```javascript
   // Add to any script for monitoring
   const MemoryMonitor = {
     start() {
       this.startTime = performance.now();
       this.startMemory = performance.memory?.usedJSHeapSize || 0;
     },
     
     end(label = 'Operation') {
       const endTime = performance.now();
       const endMemory = performance.memory?.usedJSHeapSize || 0;
       
       console.log(`${label} Performance:`, {
         duration: `${(endTime - this.startTime).toFixed(2)}ms`,
         memoryDelta: `${((endMemory - this.startMemory) / 1024 / 1024).toFixed(2)}MB`
       });
     }
   };
   
   // Usage
   MemoryMonitor.start();
   // ... your code
   MemoryMonitor.end('Feature Initialization');
   ```

2. **Startup time measurement**:
   ```javascript
   // Measure startup impact
   const startupTime = Date.now();
   
   window.addEventListener('load', () => {
     const loadTime = Date.now() - startupTime;
     console.log(`Theme startup time: ${loadTime}ms`);
   });
   ```

### Debugging Techniques

#### Browser Toolbox Debugging

1. **Open Browser Toolbox**: `Ctrl+Alt+Shift+I`

2. **Inspect userChrome elements**:
   ```javascript
   // In Browser Toolbox Console
   // Find elements by ID
   document.getElementById('TabsToolbar')
   
   // Find elements by class
   document.getElementsByClassName('tabbrowser-tab')
   
   // Query selectors
   document.querySelector('#nav-bar .toolbarbutton-1')
   ```

3. **Live CSS editing**:
   - Use Inspector to modify styles in real-time
   - Copy working styles back to CSS files
   - Test different property values interactively

#### Console Debugging

1. **Enhanced logging**:
   ```javascript
   const Logger = {
     prefix: '[ThemeDev]',
     
     debug(message, data = null) {
       if (this.debugEnabled) {
         console.log(`${this.prefix} DEBUG:`, message, data);
       }
     },
     
     info(message, data = null) {
       console.info(`${this.prefix} INFO:`, message, data);
     },
     
     warn(message, data = null) {
       console.warn(`${this.prefix} WARN:`, message, data);
     },
     
     error(message, error = null) {
       console.error(`${this.prefix} ERROR:`, message, error);
       if (error && error.stack) {
         console.error(error.stack);
       }
     },
     
     enableDebug() {
       this.debugEnabled = true;
     }
   };
   ```

2. **Performance debugging**:
   ```javascript
   // Monitor DOM mutations
   const observer = new MutationObserver((mutations) => {
     mutations.forEach((mutation) => {
       if (mutation.type === 'childList') {
         console.log('DOM changed:', mutation);
       }
     });
   });
   
   observer.observe(document.body, {
     childList: true,
     subtree: true
   });
   ```

### Code Quality Standards

#### CSS Guidelines

1. **Naming conventions**:
   ```css
   /* Use BEM-like naming for custom classes */
   .theme-component__element--modifier {}
   
   /* Use descriptive names for custom properties */
   --theme-sidebar-width-collapsed: 40px;
   --theme-animation-duration-fast: 150ms;
   ```

2. **Code organization**:
   ```css
   /* Group related properties */
   .component {
     /* Position */
     position: relative;
     top: 0;
     left: 0;
     
     /* Display */
     display: flex;
     flex-direction: column;
     
     /* Sizing */
     width: 100%;
     height: auto;
     
     /* Spacing */
     margin: 0;
     padding: 8px;
     
     /* Typography */
     font-family: inherit;
     font-size: 14px;
     
     /* Visual */
     background: var(--bg-color);
     border: 1px solid var(--border-color);
     border-radius: var(--border-radius);
     
     /* Animation */
     transition: all 200ms ease;
   }
   ```

3. **Comments and documentation**:
   ```css
   /**
    * Vertical Tabs Component
    * 
    * Handles the positioning and styling of tabs in vertical orientation.
    * Depends on: variables.css, colors.css
    * 
    * @requires --vertical-tabs-width custom property
    * @requires sidebar.verticalTabs preference enabled
    */
   ```

#### JavaScript Guidelines

1. **Error handling**:
   ```javascript
   async function safeAsyncOperation() {
     try {
       const result = await riskyOperation();
       return result;
     } catch (error) {
       console.error('Operation failed:', error);
       
       // Provide fallback behavior
       return getDefaultValue();
     } finally {
       // Cleanup code
       cleanupResources();
     }
   }
   ```

2. **Type checking (JSDoc)**:
   ```javascript
   /**
    * Creates a new web panel
    * @param {Object} config - Panel configuration
    * @param {string} config.url - Panel URL
    * @param {string} config.title - Panel title
    * @param {number} [config.container] - Container ID
    * @returns {WebPanel} Created web panel instance
    * @throws {Error} When URL is invalid
    */
   function createWebPanel(config) {
     if (!config.url || typeof config.url !== 'string') {
       throw new Error('Invalid URL provided');
     }
     
     return new WebPanel(config);
   }
   ```

3. **Resource cleanup**:
   ```javascript
   class ResourceManager {
     constructor() {
       this.resources = new Set();
       
       // Register cleanup on window unload
       window.addEventListener('unload', () => this.cleanup());
     }
     
     addResource(resource) {
       this.resources.add(resource);
     }
     
     cleanup() {
       this.resources.forEach(resource => {
         if (typeof resource.destroy === 'function') {
           resource.destroy();
         }
       });
       this.resources.clear();
     }
   }
   ```

### Contributing Guidelines

#### Pull Request Process

1. **Branch naming**:
   ```bash
   feature/add-new-sidebar-feature
   fix/tab-positioning-bug
   docs/update-installation-guide
   refactor/improve-css-organization
   ```

2. **Commit message format**:
   ```
   type(scope): brief description
   
   Longer description explaining the change and why it was made.
   
   - Bullet point for multiple changes
   - Another change description
   
   Fixes #123
   ```

3. **Code review checklist**:
   - [ ] Code follows project style guidelines
   - [ ] Changes are tested across supported Firefox versions
   - [ ] Documentation is updated if needed
   - [ ] No breaking changes without version bump
   - [ ] Performance impact is considered

#### Documentation Updates

1. **Keep documentation in sync**:
   - Update relevant .md files when adding features
   - Include code examples for new functionality
   - Update troubleshooting guide for new known issues

2. **Screenshot updates**:
   - Provide before/after screenshots for UI changes
   - Include screenshots for different platforms
   - Update README screenshots when layout changes

### Release Process

#### Version Management

1. **Semantic versioning**:
   ```
   MAJOR.MINOR.PATCH
   
   MAJOR: Breaking changes
   MINOR: New features, backward compatible
   PATCH: Bug fixes, backward compatible
   ```

2. **Release checklist**:
   - [ ] All tests pass
   - [ ] Documentation updated
   - [ ] Changelog updated
   - [ ] Version numbers incremented
   - [ ] Tagged release created
   - [ ] Release notes written

#### Compatibility Testing

1. **Firefox version matrix**:
   ```bash
   # Test with multiple Firefox versions
   ./scripts/test-firefox-versions.sh
   ```

2. **Platform testing**:
   - Windows 10/11 (latest)
   - macOS (latest 2 major versions)
   - Linux (Ubuntu LTS, Fedora, Arch)

For detailed contribution guidelines, see [CONTRIBUTING.md](contributing.md).