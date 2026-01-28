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
- [Installation Guide](installation.md) - Detailed setup instructions
- [Configuration Guide](configuration.md) - Customization options and settings
- [Architecture Overview](architecture.md) - Project structure and code organization
- [Customization Guide](customization.md) - How to modify and extend the theme

### Component Documentation
- [CSS Components](css-components.md) - Detailed breakdown of CSS modules
- [JavaScript Modules](javascript-modules.md) - UserChrome.js scripts and functionality
- [Second Sidebar System](second-sidebar.md) - Advanced sidebar implementation

### Reference Materials
- [CSS Variables Reference](css-variables.md) - Complete list of available CSS custom properties
- [Browser Compatibility](compatibility.md) - Firefox version support and known issues
- [Troubleshooting](troubleshooting.md) - Common issues and solutions

### Development
- [Contributing Guidelines](contributing.md) - How to contribute to the project
- [Development Setup](development.md) - Setting up a development environment
- [Code Style Guide](code-style.md) - Coding standards and conventions

## Key Features

- **Vertical Tabs**: Custom vertical tab implementation on the left side
- **Custom Toolbars**: Redesigned toolbar layout framing the browser window
- **Second Sidebar**: Advanced sidebar system with web panels and collapsible sections
- **Enhanced UI**: Comprehensive theming with blur effects and custom styling
- **JavaScript Extensions**: Advanced functionality through UserChrome.js scripts

## Project Structure

```
firefox/
├── userChrome.css          # Main CSS entry point
├── userContent.css         # Content page styling
├── css/                    # CSS modules
│   ├── chrome/            # Browser UI styling
│   ├── common/            # Shared variables and utilities
│   └── content/           # Web content styling
├── JS/                     # JavaScript modules
│   ├── second_sidebar/    # Advanced sidebar system
│   └── *.uc.js           # UserChrome.js scripts
├── resources/             # Assets and configurations
└── utils/                 # System utilities and loaders
```

## License

This project is released under the Mozilla Public License. See the [LICENSE](../../LICENSE) file for details.

## Support

For issues, questions, or contributions, please refer to the [troubleshooting guide](troubleshooting.md) or the main project repository.