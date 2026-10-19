# Higgs Boson Firefox Theme Documentation

A comprehensive Firefox customization project providing a highly customized browser experience with vertical tabs, custom toolbars, and extensive UI modifications.

## Quick Start

1. **Prerequisites**: Enable userChrome/userContent CSS support in Firefox:
   - Navigate to `about:config`
   - Set `toolkit.legacyUserProfileCustomizations.stylesheets` to `true`

2. **Installation**: Copy the contents of this repository to your Firefox profile's `chrome` directory

3. **Restart Firefox** to apply changes

## Documentation Index

### Core Documentation
- [Installation Guide](.documentation/installation.md) - Detailed setup instructions
- [Configuration Guide](.documentation/configuration.md) - Customization options and settings
- [Architecture Overview](.documentation/architecture.md) - Project structure and code organization

### Component Documentation
- [CSS Components](.documentation/css-components.md) - Detailed breakdown of CSS modules
- [JavaScript Modules](.documentation/javascript-modules.md) - UserChrome.js scripts and functionality
- [Second Sidebar System](resources/second-sidebar/AGENTS.md) - Advanced sidebar implementation

### Reference Materials
- [Preferences Reference](.documentation/preferences.md) - Every theme preference (`userchrome.*`, `firefoxcss.*`, `mod.*`) with type, default and description
- [CSS Variables Reference](.documentation/css-variables.md) - Complete list of available CSS custom properties
- [Browser Compatibility](.documentation/compatibility.md) - Firefox version support and known issues
- [Troubleshooting](.documentation/troubleshooting.md) - Common issues and solutions

### Development
- [Development Setup](.documentation/development.md) - Setting up a development environment

## Key Features

- **Vertical Tabs**: Custom vertical tab implementation on the left side
- **Custom Toolbars**: Redesigned toolbar layout framing the browser window
- **Second Sidebar**: Advanced sidebar system with web panels and collapsible sections
- **Enhanced UI**: Comprehensive theming with blur effects and custom styling
- **JavaScript Extensions**: Advanced functionality through UserChrome.js scripts
- **Library Page**: Full-page replacement for the Library popup — Bookmarks, History, Downloads and Tab Groups with batch multi-select and bulk delete; every legacy entry point (menu, hotkeys, organizer) is redirected to it
- **Home / New Tab Page**: All-Tabs-Menu + Firefox View (other devices, recently closed) replacing the stock new-tab page
- **Workspaces**: Zen-style workspaces on native Firefox tab groups, with a catch-all Session workspace and `Ctrl+Alt+1…9` switching
- **QuickTabs Search**: Select text → `Ctrl+Alt+S` or the right-click menu opens a floating Quick Tab at your default engine's results

See the [Preferences Reference](.documentation/preferences.md) for every toggle these features expose.

## Project Structure

```
firefox/
├── userChrome.css          # Main CSS entry point
├── userContent.css         # Content page styling
├── css/                    # CSS modules
│   ├── chrome/            # Browser UI styling
│   ├── common/            # Shared variables and utilities
│   └── content/           # Web content styling
├── JS/                     # UserChrome.js scripts
│   ├── second_sidebar.uc.mjs  # Main entry for second sidebar system
│   └── *.uc.js           # Standalone enhancement scripts
├── resources/             # Assets, configurations and runtime modules
│   └── second-sidebar/    # 100+ file second-sidebar web-panels framework
├── resources/             # Assets and configurations
└── utils/                 # System utilities and loaders
```

## License

This project is released under the Mozilla Public License. See the [LICENSE](../../LICENSE) file for details.

## Support

For issues, questions, or contributions, please refer to the [troubleshooting guide](troubleshooting.md) or the main project repository.