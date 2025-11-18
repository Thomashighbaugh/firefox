# Installation Guide

Complete guide for installing and setting up the Higgs Boson Firefox Theme.

## Prerequisites

### Firefox Configuration
1. Open Firefox and navigate to `about:config`
2. Accept the risk warning
3. Search for `toolkit.legacyUserProfileCustomizations.stylesheets`
4. Set the value to `true`

### Finding Your Firefox Profile Directory

#### Method 1: Through Firefox
1. Navigate to `about:support`
2. Find "Profile Folder" in the Application Basics section
3. Click "Open Folder" or note the path

#### Method 2: Default Locations
- **Linux**: `~/.mozilla/firefox/[profile-name]/`
- **macOS**: `~/Library/Application Support/Firefox/Profiles/[profile-name]/`
- **Windows**: `%APPDATA%\Mozilla\Firefox\Profiles\[profile-name]\`

## Installation Methods

### Method 1: Direct Installation (Recommended)

1. **Create Chrome Directory**:
   ```bash
   mkdir -p [profile-directory]/chrome
   cd [profile-directory]/chrome
   ```

2. **Copy Files**:
   - Copy all files from this repository to the `chrome` directory
   - Ensure the structure matches:
     ```
     chrome/
     ├── userChrome.css
     ├── userContent.css
     ├── css/
     ├── JS/
     ├── resources/
     └── utils/
     ```

3. **Install Script Loader** (for JavaScript functionality):
   - Copy `utils/chrome.manifest` to your Firefox installation directory
   - Copy `utils/` folder contents to the appropriate location

### Method 2: NixOS Installation

For NixOS users, this configuration integrates with the fx-autoconfig script loader:

1. Add the configuration to your NixOS configuration
2. Rebuild your system
3. The theme will be automatically applied to new Firefox profiles

> **Note**: See the "imperative" branch for non-NixOS declarative installations.

## JavaScript Functionality Setup

### fx-autoconfig Script Loader

1. **Download fx-autoconfig**:
   - Get the latest release from the fx-autoconfig repository
   - Extract to your Firefox installation directory

2. **Configure**:
   - Copy `utils/chrome.manifest` to your Firefox installation root
   - Ensure proper permissions for script execution

3. **Verify Installation**:
   - Restart Firefox
   - Check Browser Console (Ctrl+Shift+J) for any error messages

## Verification Steps

1. **CSS Verification**:
   - Restart Firefox after installation
   - Tabs should appear on the left side
   - Toolbar layout should be modified

2. **JavaScript Verification**:
   - Second sidebar functionality should be available
   - Additional toolbar buttons should appear
   - Check Browser Console for script loading confirmations

## Post-Installation Configuration

### First Launch
1. Restart Firefox completely
2. Allow initial layout adjustments to settle
3. Test tab dragging and sidebar functionality

### Optional Customizations
1. Review [Configuration Guide](configuration.md) for available options
2. Modify CSS variables in `css/common/variables.css` as needed
3. Enable/disable JavaScript modules by renaming `.uc.js` files

## Troubleshooting Installation Issues

### CSS Not Loading
- Verify `toolkit.legacyUserProfileCustomizations.stylesheets` is `true`
- Check file paths and permissions
- Ensure `userChrome.css` is in the correct location

### JavaScript Not Working
- Verify fx-autoconfig installation
- Check Browser Console for error messages
- Ensure script files have proper permissions

### Layout Issues
- Clear Firefox cache: `about:support` → Clear startup cache
- Reset to default layout: View → Toolbars → Customize
- Check for conflicting extensions

## Uninstallation

To remove the theme:
1. Delete or rename the `chrome` directory
2. Set `toolkit.legacyUserProfileCustomizations.stylesheets` to `false`
3. Restart Firefox
4. Reset toolbar customizations if needed

## Support

For installation issues:
- Check [Troubleshooting Guide](troubleshooting.md)
- Review Browser Console for error messages
- Ensure Firefox version compatibility