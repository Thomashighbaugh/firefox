# Command Palette for Firefox

A VS Code-style command palette with fuzzy search, customizable commands, and keyboard shortcuts for Firefox.

**Status:** Core implementation complete, settings UI pending  
**Adapted from:** [Zen Browser command-palette](https://github.com/BibekBhusal0/zen-custom-js/tree/main/command-palette) by BibekBhusal0

## Features

- **Fuzzy Search**: VS Code-style fuzzy matching with intelligent scoring
- **50+ Built-in Commands**: New tabs, bookmarks, navigation, developer tools, etc.
- **Dynamic Commands**: Generated from browser state (about: pages, search engines, extensions, containers)
- **Custom Commands**: Define your own commands in JSON
- **Keyboard Shortcuts**: Register custom shortcuts for any command
- **Urlbar Integration**: Shows commands as suggestions in the address bar
- **Prefix Mode**: Use `:` to exclusively show commands (configurable)

## Installation

1. Ensure [fx-autoconfig](https://github.com/MrOtherGuy/fx-autoconfig) is installed
2. Place `command_palette.uc.mjs` and the `command_palette/` directory in your profile's `chrome/JS/` folder
3. Restart Firefox

## Usage

### Basic Search
- Type in the urlbar with no prefix
- Shows top 3 matching commands
- Type more characters to narrow results

### Prefix Mode
- Type `:` followed by your search
- Shows up to 50 matching commands
- Restricts urlbar to only show commands

### Examples
- `:new tab` → New Tab command
- `:book` → Bookmark commands
- `:dev` → Developer tools
- `:about:config` → about:config page

## Configuration

### Preferences (about:config)

| Preference | Default | Description |
|------------|---------|-------------|
| `command-palette.prefix` | `:` | Prefix character for command mode |
| `command-palette.prefix-required` | `false` | Require prefix to show commands |
| `command-palette.max-commands` | `3` | Max results without prefix |
| `command-palette.max-commands-prefix` | `50` | Max results with prefix |
| `command-palette.min-query-length` | `3` | Minimum characters to search |
| `command-palette.min-score-threshold` | `150` | Minimum fuzzy match score |
| `command-palette.debug-mode` | `false` | Enable debug logging |

### Dynamic Command Providers

| Preference | Default | Description |
|------------|---------|-------------|
| `command-palette.dynamic.about-pages` | `false` | Show about: page commands |
| `command-palette.dynamic.search-engines` | `true` | Show search engine switching |
| `command-palette.dynamic.extensions` | `false` | Show extension options |
| `command-palette.dynamic.container-tabs` | `false` | Show container tab commands |

### Custom Commands (JSON)

Create `chrome/command-palette-settings.json`:

```json
{
  "customCommands": [
    {
      "key": "my-github",
      "label": "Open GitHub",
      "command": "window.openTrustedLinkIn('https://github.com', 'tab');",
      "icon": "chrome://browser/skin/tab.svg",
      "tags": ["github", "code", "git"]
    }
  ],
  "hiddenCommands": ["cmd_quit"],
  "customShortcuts": {
    "cmd_newNavigatorTab": "Ctrl+T"
  }
}
```

## Architecture

```
command_palette/
├── palette_injector.mjs       # Main entry point
├── palette_elements.mjs        # Component registry
├── palette_controllers.mjs     # Controllers
├── xul/                        # UI components
│   └── palette_provider.mjs   # UrlbarProvider integration
├── commands/                   # Command definitions
│   ├── static_commands.mjs    # Built-in commands
│   └── dynamic_commands.mjs   # Generated commands
├── controllers/                # Business logic
│   ├── search.mjs
│   ├── shortcuts.mjs
│   ├── execution.mjs
│   └── recent_commands.mjs
├── utils/                      # Utilities
│   ├── fuzzy_search.mjs       # Scoring algorithm
│   ├── prefs.mjs              # Preferences
│   └── storage.mjs            # JSON storage
└── settings/
    └── palette_settings.mjs
```

See [AGENTS.md](AGENTS.md) for detailed architecture documentation.

## Extending

### Add a Static Command

Edit `commands/static_commands.mjs`:

```javascript
export const staticCommands = [
  // ...
  {
    key: "my-command",
    label: "My Custom Command",
    command: () => alert("Hello!"),
    icon: "chrome://browser/skin/tab.svg",
    tags: ["custom", "hello"],
  },
];
```

### Add a Dynamic Provider

Create generator in `commands/dynamic_commands.mjs`:

```javascript
export async function generateMyCommands() {
  return [
    {
      key: "dynamic:1",
      label: "Dynamic Command 1",
      command: () => console.log("Dynamic!"),
      tags: ["dynamic"],
    },
  ];
}
```

Register in `xul/palette_provider.mjs` `_generateDynamicCommands()` method.

## Status

### Implemented ✅
- Core architecture and module system
- 50+ static Firefox commands
- Dynamic command generation (about:, search, extensions, containers)
- VS Code-style fuzzy search
- UrlbarProvider integration
- Preferences system
- JSON file storage
- Keyboard shortcut registration
- Recent commands tracking

### TODO / Stub ⚠️
- Settings modal UI
- Settings toolbar button
- CSS styling (minimal styles present)
- Command chains (delay, openLink, showToast)
- Icon picker
- Shortcut conflict detection

## Comparison to Zen Browser

This implementation:
- ✅ Modular ES6 architecture (similar to second_sidebar)
- ✅ Separated concerns (commands, controllers, utils)
- ✅ Comprehensive AGENTS.md documentation
- ⚠️ Minimal UI (urlbar only, no settings modal yet)
- ⚠️ Fewer dynamic providers (can be added easily)

Zen implementation:
- Single-file architecture
- Full settings modal with tabs
- More dynamic providers (workspaces, folders, Sine mods)
- Command chains and custom command editor

## Credits

- Original implementation: [BibekBhusal0](https://github.com/BibekBhusal0/zen-custom-js)
- Architecture inspiration: [aminought/firefox-second-sidebar](https://github.com/aminought/firefox-second-sidebar)
- Fuzzy search algorithm: VS Code

## License

Same as original Zen Browser command-palette implementation.
