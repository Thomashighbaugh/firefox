# Higgs Boson Firefox Theme

A comprehensive Firefox customization project providing a highly customized browser experience with vertical tabs, custom toolbars, and extensive UI modifications.

![Firefox Theme Screenshot](/.github/assets/screenshot-main.png)

## 🚀 Quick Start

1. **Enable userChrome CSS support**:
   - Navigate to `about:config` 
   - Set `toolkit.legacyUserProfileCustomizations.stylesheets` to `true`

2. **Install the theme**:
   - Copy all files to your Firefox profile's `chrome/` directory
   - Restart Firefox

3. **For JavaScript functionality** (optional):
   - Install [fx-autoconfig](https://github.com/MrOtherGuy/fx-autoconfig)
   - Follow the [installation guide](.github/documentation/installation.md)

## 📚 Complete Documentation

### Getting Started
- **[Installation Guide](.github/documentation/installation.md)** - Step-by-step setup instructions
- **[Configuration Guide](.github/documentation/configuration.md)** - Customize settings and appearance
- **[Troubleshooting Guide](.github/documentation/troubleshooting.md)** - Common issues and solutions

### Technical Documentation  
- **[Architecture Overview](.github/documentation/architecture.md)** - Project structure and design patterns
- **[CSS Components](.github/documentation/css-components.md)** - Detailed CSS system documentation
- **[JavaScript Modules](.github/documentation/javascript-modules.md)** - UserChrome.js and ES module system

### Development
- **[Development Guide](.github/documentation/development.md)** - Contributing and development setup
- **[API Reference](.github/documentation/README.md)** - Complete documentation index

## ✨ Key Features

- **🔄 Vertical Tabs**: Custom vertical tab implementation with drag-and-drop support
- **📊 Second Sidebar**: Advanced sidebar system with web panels (like Vivaldi/Floorp)
- **🎨 Custom Toolbars**: Redesigned toolbar layout framing the browser window  
- **🌙 Theme Support**: Light/dark mode with blur effects and custom styling
- **⚡ JavaScript Extensions**: Enhanced functionality through UserChrome.js scripts
- **📱 Responsive Design**: Adapts to different window sizes and screen resolutions
- **🔧 Highly Customizable**: Extensive configuration options via CSS variables

## 🎯 Target Use Cases

This theme is designed for users who:
- Want a clean, efficient browser interface
- Prefer vertical tab management for better space utilization  
- Use many browser extensions and need quick access
- Appreciate customizable, keyboard-friendly workflows
- Want advanced sidebar functionality with web panels

## 🏗️ Architecture

```
firefox-theme/
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
└── .github/documentation/ # Comprehensive documentation
```

## 🔧 System Requirements

- **Firefox**: Version 100+ (tested with latest stable, ESR, Beta, and Nightly)
- **Operating Systems**: Windows 10/11, macOS 10.15+, Linux (most distributions)
- **Optional**: [fx-autoconfig](https://github.com/MrOtherGuy/fx-autoconfig) for JavaScript functionality

## ⚠️ Installation Notes

> **NixOS Users**: This configuration integrates with NixOS declarative configurations. See the "imperative" branch for non-declarative installation methods.

> **JavaScript Features**: The second sidebar and advanced features require fx-autoconfig script loader. The theme works with CSS-only installation but with reduced functionality.

## 🤝 Contributing

We welcome contributions! Please see our [Development Guide](.github/documentation/development.md) for:

- Setting up a development environment
- Code style guidelines and best practices
- Testing procedures
- Pull request process

## 📄 License

This project is released under the [Mozilla Public License](LICENSE). 

## 🙏 Acknowledgments

- **[fx-autoconfig](https://github.com/MrOtherGuy/fx-autoconfig)** - Script loading framework
- **[aminomancer](https://github.com/aminomancer)** - Comprehensive userChrome.js documentation
- **[MrOtherGuy](https://github.com/MrOtherGuy)** - Firefox CSS resources and tools
- **Firefox userChrome.css community** - Inspiration and code examples

## 🔗 Related Projects

- [Tree Style Tab](https://github.com/piroor/treestyletab) - Alternative vertical tab solution
- [Sidebery](https://github.com/mbnuqw/sidebery) - Another sidebar extension
- [userChrome.org](https://www.userchrome.org/) - Community CSS resources
- [Firefox CSS Hacks](https://github.com/MrOtherGuy/firefox-csshacks) - CSS modification collection

---

**Need help?** Check our [troubleshooting guide](.github/documentation/troubleshooting.md) or browse the [complete documentation](.github/documentation/README.md).