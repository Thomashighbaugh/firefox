# AGENTS.md - Command Palette System

**Context:** Modular ES6 command palette system for Firefox with fuzzy search, customizable commands, and keyboard shortcuts.

**Original Source:** Adapted from [Zen Browser command-palette](https://github.com/BibekBhusal0/zen-custom-js/tree/main/command-palette) by BibekBhusal0

## OVERVIEW
Entry: `command_palette.uc.mjs` → Integrates with urlbar → Provides VS Code-style command palette with fuzzy matching.

## ARCHITECTURE

```
command_palette/
├── palette_injector.mjs       # Main injection logic
├── palette_elements.mjs        # Component registry
├── palette_controllers.mjs     # Controllers registry
├── xul/                        # XUL components
│   ├── palette_provider.mjs   # UrlbarProvider integration
│   ├── settings_button.mjs    # Toolbar button (stub)
│   └── settings_modal.mjs     # Settings UI (stub)
├── commands/                   # Command definitions
│   ├── static_commands.mjs    # Built-in Firefox commands
│   └── dynamic_commands.mjs   # Generated commands (about:, search engines, etc.)
├── controllers/                # Feature controllers
│   ├── search.mjs             # Search and filtering logic
│   ├── shortcuts.mjs          # Keyboard shortcut registration
│   ├── execution.mjs          # Command execution
│   ├── recent_commands.mjs    # Recent command tracking
│   └── settings.mjs           # Settings management
├── utils/                      # Utility modules
│   ├── fuzzy_search.mjs       # VS Code-style fuzzy matching
│   ├── prefs.mjs              # Preferences wrapper
│   └── storage.mjs            # JSON file storage
├── settings/                   # Settings system
│   └── palette_settings.mjs   # Settings loader
└── css/                        # CSS modules (TODO)
```

## KEY FEATURES

### Urlbar Integration
- Integrates as a custom `UrlbarProvider`
- Shows commands as urlbar suggestions
- Prefix mode (`:command`) or always-on mode
- Fuzzy search with VS Code-style scoring

### Command Types
1. **Static Commands**: Built-in Firefox commands (new tab, bookmarks, etc.)
2. **Dynamic Commands**: Generated from browser state:
   - about: pages
   - Search engines
   - Extensions
   - Container tabs
   - Custom user-defined commands

### Fuzzy Search
VS Code-style algorithm with bonuses for:
- Exact matches (200 points)
- Prefix matches (100+ points)
- Initials matches (90+ points)
- Word boundaries (+15)
- Consecutive matches (+20 per consecutive)
- Distance penalties

### User Configuration
Stored in JSON file (`chrome/command-palette-settings.json`):
- Hidden commands
- Custom icons
- Custom keyboard shortcuts
- Toolbar button placement
- Custom commands

## SUBSYSTEMS

### Commands (`commands/`)
Command definition and generation:
- `static_commands.mjs` - 50+ built-in Firefox commands
- `dynamic_commands.mjs` - Generators for dynamic commands

### Controllers (`controllers/`)
Feature logic separated from UI:
- `search.mjs` - Scoring, filtering, caching
- `shortcuts.mjs` - Keyboard shortcut registration
- `execution.mjs` - Command execution logic
- `recent_commands.mjs` - MRU tracking

### Utils (`utils/`)
Core utilities:
- `fuzzy_search.mjs` - Fuzzy matching algorithm
- `prefs.mjs` - about:config preferences wrapper
- `storage.mjs` - JSON file I/O

## CONVENTIONS

### Command Structure
```javascript
{
  key: "cmd_newTab",           // Unique identifier
  label: "New Tab",             // Display name
  icon: "chrome://...",         // Icon URL
  tags: ["new", "tab"],         // Search tags
  command: () => {...},         // Custom function OR
  // (no command = use native command element)
  condition: () => true,        // Visibility condition
}
```

### Dynamic Command Providers
```javascript
async function generateXCommands() {
  return [
    { key: "x:1", label: "X Command 1", ... },
    { key: "x:2", label: "X Command 2", ... },
  ];
}
```

### Preferences
All prefs prefixed with `command-palette.`:
- `command-palette.prefix` - Command prefix (default: `:`)
- `command-palette.prefix-required` - Require prefix (default: false)
- `command-palette.max-commands` - Max results without prefix (default: 3)
- `command-palette.max-commands-prefix` - Max results with prefix (default: 50)
- `command-palette.min-query-length` - Min chars to search (default: 3)
- `command-palette.min-score-threshold` - Min score to show (default: 150)
- `command-palette.dynamic.*` - Enable/disable dynamic providers

## INTEGRATION POINTS

### UrlbarProvider API
```javascript
{
  name: "CommandPalette",
  type: "immediate",
  isActive: (context) => {...},      // Should provide results?
  isRestricting: (context) => {...}, // Replace other providers?
  startQuery: (context, cb) => {...},// Generate results
  pickResult: (result) => {...},     // User selected result
}
```

### Command Execution
1. Native Firefox commands: `document.getElementById(key).doCommand()`
2. Custom functions: Direct invocation
3. Keyboard shortcuts: Register `<key>` elements in mainKeyset

## EXTENSIBILITY

### Adding Static Commands
Edit `commands/static_commands.mjs`:
```javascript
export const staticCommands = [
  // ... existing commands
  {
    key: "my-custom-command",
    label: "My Custom Command",
    command: () => console.log("Hello!"),
    tags: ["custom", "hello"],
  },
];
```

### Adding Dynamic Providers
Edit `commands/dynamic_commands.mjs`:
```javascript
export async function generateMyCommands() {
  return [
    { key: "my:1", label: "Dynamic 1", ... },
  ];
}
```

Then register in `xul/palette_provider.mjs`:
```javascript
generators.push(generateMyCommands());
```

### Adding Preferences
1. Define in `utils/prefs.mjs`:
   ```javascript
   static MY_PREF = "command-palette.my-setting";
   defaultValues = { [PrefsWrapper.MY_PREF]: true };
   ```
2. Use in code:
   ```javascript
   if (PrefsWrapper.getPref(PrefsWrapper.MY_PREF)) { ... }
   ```

## COMPARISON TO SECOND_SIDEBAR

### Similarities
- ES6 module system with imports
- Static factory pattern (`ClassName.create()`)
- Component registry (`PaletteElements`, `PaletteControllers`)
- Injector → Elements → Controllers flow
- Wrappers for Firefox APIs
- Settings stored in files

### Differences
- **No XUL UI**: Uses urlbar, not custom UI elements
- **Simpler structure**: Fewer files (20 vs 100+)
- **Provider-based**: Integrates via UrlbarProvider API
- **No event bus**: Direct controller interactions
- **JSON storage**: Settings in JSON file, not prefs

## STATUS

### Implemented
- ✅ Core architecture (injector, elements, controllers)
- ✅ Static commands (50+ Firefox commands)
- ✅ Dynamic commands (about:, search engines, extensions, containers)
- ✅ Fuzzy search algorithm
- ✅ UrlbarProvider integration
- ✅ Preferences system
- ✅ Command storage (JSON file)
- ✅ Keyboard shortcuts registration
- ✅ Recent commands tracking

### Stub / TODO
- ⚠️ Settings modal UI (stub - needs full XUL implementation)
- ⚠️ Settings button widget (stub - needs CustomizableUI)
- ⚠️ CSS styling (directory created, no files)
- ⚠️ Command chains (from Zen - delay, openLink, showToast)
- ⚠️ Custom command editor in settings
- ⚠️ Icon picker in settings
- ⚠️ Shortcut conflict detection

## NOTES
- **Lightweight**: Minimal UI, uses built-in urlbar
- **Firefox-specific**: Requires UrlbarProvider API (Firefox 75+)
- **Extensible**: Easy to add commands and providers
- **Preference-driven**: Behavior controlled via about:config
- **File-based storage**: User config in JSON file, not prefs

## CREDITS
Original implementation by BibekBhusal0 for Zen Browser.
Adapted for Firefox with modular architecture inspired by second_sidebar.
