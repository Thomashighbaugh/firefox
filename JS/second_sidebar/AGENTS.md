# AGENTS.md - Second Sidebar System

**Context:** 100+ file ES6 module system implementing Vivaldi/Floorp-style web panels sidebar.

## OVERVIEW
Entry: `second_sidebar.uc.mjs` → Injects sidebar UI → Decorates with functionality → Patches Firefox internals.

## ARCHITECTURE

```
second_sidebar/
├── browser_elements.mjs      # Main browser DOM references
├── sidebar_elements.mjs       # Creates all XUL components
├── sidebar_injector.mjs       # Injects sidebar into DOM
├── sidebar_decorator.mjs      # Attaches event handlers
├── sidebar_controllers.mjs    # Main controllers registry
├── customize_mode_patcher.mjs # CustomizeMode patch
├── xul/                       # 37 XUL components (SEE xul/AGENTS.md)
├── wrappers/                  # 28 Firefox API wrappers
├── controllers/               # 21 feature controllers
├── utils/                     # 10 utility modules
├── patchers/                  # 4 Firefox behavior patches
├── settings/                  # 8 settings/storage modules
├── css/                       # 12 CSS modules
└── icons/                     # 2 icon utilities
```

## SUBSYSTEMS

### XUL Components (`xul/`)
UI elements: buttons, toolbars, menus, web panels, browsers. See `xul/AGENTS.md`.

### Wrappers (`wrappers/`)
Safe interfaces to Firefox internals (CustomizableUI, Services, Ci, Cu). Pattern: `*Wrapper` suffix.
- `customizable_ui.mjs` - Toolbar area registration
- `contextual_identity_service.mjs` - Container tabs
- `favicons.mjs`, `zoom_manager.mjs`, etc. - Browser APIs

### Controllers (`controllers/`)
Feature logic separated from UI. Pattern: `*Controller` suffix or feature name.
- `sidebar_main.mjs` - Main sidebar state
- `collapse.mjs` - Collapse/expand logic
- `shortcuts.mjs` - Keyboard shortcuts
- `events.mjs` - Global event bus

### Patchers (`patchers/`)
Runtime patches to Firefox modules. Pattern: `*Patcher` suffix.
- `customize_mode_patcher.mjs` - Make sidebar customizable
- `sidebar_main_patcher.mjs` - Native sidebar integration
- `urlbar_input_patcher.mjs` - URL bar behavior
- `popup_notifications_patcher.mjs` - Notification positioning

### Utils (`utils/`)
Cross-cutting utilities (geometry, icons, URL parsing, file I/O).

## CONVENTIONS

### Static Factory Pattern
Components use `static create()` for initialization with side effects:
```javascript
class SidebarElements {
  static create() {
    this.#createSidebar();
    this.#registerSidebar();
    // ...
  }
}
```

### Component Registration
XUL components stored as static properties on parent classes:
```javascript
SidebarElements.sidebarMain = new SidebarMain();
```

### Event Flow
1. User action → XUL component
2. Component fires custom event
3. Controller listens via `events.mjs`
4. Controller updates state
5. State change triggers UI update

## NOTES
- **Monolithic Entry:** `sidebar_elements.mjs` creates all 30+ components in one pass
- **No React/Vue:** Pure XUL/DOM manipulation
- **Persistent State:** Settings stored via Firefox preferences
- **Modular CSS:** Each component can have dedicated CSS in `css/`
