# AGENTS.md - Base XUL Element Wrappers

**Context:** 10 files. The trivial per-tag wrappers are generated in `elements.mjs`; the
behaviour-bearing wrappers keep their own modules.

## OVERVIEW
Thin wrapper classes providing fluent API over native XUL/HTML elements. Root: `XULElement`.

- `elements.mjs` — `defineElement(tag, {isXUL, init})` plus the tag wrappers (Box, VBox, HBox,
  Div, Span, Label, Button, Image, Img, Menu, MenuItem, MenuSeparator, MenuPopup, PanelMultiView,
  Splitter, Toolbar, ToolbarSeparator, Toggle, MozButton, Header, Style). **Import element
  wrappers from here.**
- `xul_element.mjs` — root class; owns the shared fluent API **and the generic setters**
  (`setText`, `setSrc`, `setLabel`, `setType`, `setMode`, `setDisabled`, `getPressed`/`setPressed`,
  `isPanelOpen`, …).
- Behaviour-bearing wrappers (own modules): `widget.mjs`, `toolbar_button.mjs`, `browser.mjs`,
  `panel.mjs`, `tab.mjs`, `input.mjs`, `menulist.mjs`, `tooltip.mjs`.

## BASE CLASS HIERARCHY

```
XULElement (root)
├── Box, HBox, VBox          # Layout containers
├── Toolbar, MenuBar         # Toolbars
├── Button, MenuButton       # Clickable elements
├── Image, Img               # Icons
├── Label, Header            # Text
├── Input, Textarea          # Text input
├── Browser                  # Embedded web content
├── Menulist, Select         # Dropdowns
├── MenuItem, MenuSeparator  # Menu items
├── Panel, Popup             # Floating UI
├── Splitter                 # Resizable dividers
├── Stack                    # Layered elements
├── ToolbarButton            # Toolbar button
└── Widget (special)         # CustomizableUI button
```

## CORE PATTERNS

### Fluent API
All methods return `this` for chaining:
```javascript
new Toolbar({ id: "my-toolbar" })
  .setMode("icons")
  .setContext("my-menu")
  .setAttribute("customizable", "true");
```

### Unified Construction
All classes accept same params object:
```javascript
constructor({ tag, id, classList, isXUL = true, element = null })
```

### Element Wrapping
Can wrap existing elements OR create new:
```javascript
new XULElement({ tag: "box" });                    // Create new
new XULElement({ element: document.getElementById("foo") }); // Wrap existing
```

### Namespace Handling
- `isXUL: true` → `document.createXULElement(tag)` (default)
- `isXUL: false` → `document.createElement(tag)` (HTML namespace)

## KEY CLASSES

### XULElement (Root)
Base class for all wrappers. Provides:
- `addClass()`, `removeClass()`, `hasClass()`
- `setAttribute()`, `getAttribute()`, `hasAttribute()`
- `appendChild()`, `removeChild()`, `removeChildren()`
- `addEventListener()`, `removeEventListener()`
- `show()`, `hide()`, `remove()`

### Browser
`<browser>` element wrapper with navigation:
- `loadURL()` - Navigate to URL
- `goBack()`, `goForward()` - History navigation
- `reload()`, `stop()` - Page control
- `zoomIn()`, `zoomOut()`, `zoomReset()` - Zoom control
- `addProgressListener()` - Monitor loading

### Widget
Special wrapper for `CustomizableUI.createWidget()`:
- Creates toolbar button via Firefox's CustomizableUI API
- Accessible via `CustomizableUI.getWidget(id)`
- Used for all second sidebar toolbar buttons

### Toolbar
Customizable toolbar wrapper:
- `setMode("icons" | "text" | "full")` - Button display mode
- `setContext(menuId)` - Right-click context menu

### Input
Text input wrapper:
- `setValue()`, `getValue()` - Text content
- `setPlaceholder()` - Placeholder text
- `focus()`, `select()` - Focus control

## CONVENTIONS

### Naming
- Class names match XUL element names (PascalCase)
- `Browser` not `BrowserElement` (concise)
- HTML elements: `Div`, `Img` (not `Image` for HTML)

### Private Element Access
- Public property: `this.element` - Access wrapped DOM element
- Direct DOM manipulation allowed when wrapper insufficient

### Method Chaining
All setters return `this`:
```javascript
button.setLabel("Click me").setTooltip("Button tooltip").show();
```

### Type Hints
JSDoc comments for parameters:
```javascript
/**
 * @param {string} url
 * @returns {Browser}
 */
loadURL(url) { ... }
```

## FILE LIST
`elements.mjs` (tag wrappers + `defineElement`), `xul_element.mjs` (root + generic setters),
`widget.mjs`, `toolbar_button.mjs`, `browser.mjs`, `panel.mjs`, `tab.mjs`, `input.mjs`,
`menulist.mjs`, `tooltip.mjs` (10 total).

## NOTES
- **No Validation:** Wrappers don't validate XUL element compatibility (e.g., can call `setMode()` on non-toolbar)
- **Minimal Abstraction:** Thin wrappers, direct `this.element` access encouraged when needed
- **Firefox-Specific:** Tightly coupled to Firefox XUL APIs (Ci, Components, Services)
