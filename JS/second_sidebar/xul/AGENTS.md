# AGENTS.md - XUL Component Framework

**Context:** 37 XUL component classes for second sidebar UI (toolbar, buttons, menus, web panels).

## OVERVIEW
Component framework for creating Firefox XUL elements. Base classes in `base/`, composed components at root.

## STRUCTURE

```
xul/
├── base/                      # 30 base element wrappers (SEE base/AGENTS.md)
│   ├── xul_element.mjs       # Root base class
│   ├── browser.mjs           # <browser> wrapper
│   ├── toolbar.mjs, button.mjs, etc.
└── *.mjs                      # 37 composed components
    ├── sidebar_main.mjs      # Main toolbar
    ├── web_panel_button.mjs  # Panel button widget
    ├── sidebar_box.mjs       # Container box
    └── ...
```

## COMPONENT CATEGORIES

### Structure Components
Container elements defining sidebar layout:
- `sidebar_wrapper.mjs` - Outermost container
- `sidebar_main.mjs` - Customizable toolbar
- `sidebar_box_area.mjs` - Panel content area
- `sidebar_splitter.mjs` - Resizer between sidebar/content

### Interactive Widgets
User-facing buttons and controls:
- `web_panel_button.mjs` - Panel button in toolbar (extends `Widget`)
- `web_panel_new_button.mjs` - "New panel" button
- `sidebar_collapse_button.mjs` - Show/hide sidebar
- `notification_badge.mjs` - Unread count badge
- `web_panel_sound_icon.mjs` - Audio indicator

### Browsers
Embedded web content:
- `web_panels_browser.mjs` - Container for all panels
- `web_panel_browser.mjs` - Individual panel browser

### Menus & Popups
Context menus and modal dialogs:
- `web_panel_menupopup.mjs` - Panel button context menu
- `sidebar_main_menupopup.mjs` - Toolbar context menu
- `popup_new.mjs`, `popup_edit.mjs`, `popup_delete.mjs` - Panel management dialogs

### Context Menu Items
Menu items injected into Firefox context menus:
- `open_link_as_web_panel.mjs` - "Open in sidebar" (permanent)
- `open_link_as_temp_web_panel.mjs` - Temporary panel
- `search_in_web_panel.mjs` - Search in panel

## CONVENTIONS

### Inheritance Pattern
All components extend base classes from `base/`:
```javascript
import { Toolbar } from "./base/toolbar.mjs";
export class SidebarMain extends Toolbar {
  constructor() {
    super({ id: "sb2-main", classList: ["browser-toolbar"] });
  }
}
```

### Widget Pattern
Toolbar buttons extend `Widget` (from `base/`):
```javascript
export class WebPanelButton extends Widget {
  constructor(webPanelSettings, position = null) {
    super({ id: webPanelSettings.uuid, classList: [...] });
    // Add badges, icons, etc.
  }
}
```

### Composition
Complex components compose multiple base elements:
- `WebPanelButton` contains `WebPanelSoundIcon` + `NotificationBadge`
- `WebPanelsBrowser` manages multiple `WebPanelBrowser` instances

### Naming
- Structure: `Sidebar*`, `WebPanel*`
- Menus: `*MenuPopup`, `*MenuItem`
- Popups: `*Popup*` (modal dialogs)
- Base wrappers: `Toolbar`, `Button`, `Browser`, etc.

## NOTES
- **XUL Namespace:** All elements created in XUL namespace (`http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul`)
- **Customizable UI:** `sidebar_main.mjs` registered as customizable area (users can drag buttons)
- **Event Bubbling:** Components fire custom events, controllers listen at document level
- **Lazy Creation:** Some components created on-demand (e.g., popup dialogs)
