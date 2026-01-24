# Firefox Preferences Reference

This document lists all the preferences used by this Firefox customization project, including custom preferences added by the theme and Firefox built-in preferences that are referenced.

## 🔑 Legend

- **Custom Preference**: Preference created specifically for this theme
- **Built-in Preference**: Firefox's native preference that this theme uses
- **Type**: `boolean` (true/false), `string`, `integer`, or `default value`

---

## 🎨 UI & Appearance Preferences

### Custom Preferences

| Preference Name | Type | Default | Description |
|----------------|------|---------|-------------|
| `firefoxcss.tabs.on.top.enable` | boolean | false | Enable tabs on top of the address bar instead of below it |
| `firefoxcss.pocket.oneline.enable` | boolean | false | Enable one-line compact layout for Pocket section on new tab page |
| `firefoxcss.pocket.hide.populartopics.links` | boolean | false | Hide "Popular Topics" bottom links in Pocket section |
| `firefoxcss.pocket.4.cards.enable` | boolean | false | Show 4 cards per row in Pocket grid layout |
| `firefoxcss.pocket.5.cards.enable` | boolean | false | Show 5 cards per row in Pocket grid layout (more compact) |

### Built-in Preferences

| Preference Name | Type | Default | Description |
|----------------|------|---------|-------------|
| `sidebar.verticalTabs` | boolean | false | Enable Firefox's vertical tabs feature (requires Firefox 115+) |
| `sidebar.revamp` | boolean | false | Enable sidebar revamp UI (requires Firefox 115+) |
| `svg.context-properties.content.enabled` | boolean | true | Enable SVG context properties for proper icon coloring (required for theme icons to display correctly) |

---

## 🔍 URL Bar & Navigation Preferences

### Custom Preferences

| Preference Name | Type | Default | Description |
|----------------|------|---------|-------------|
| `mod.search.info.buttons.show.always` | boolean | false | Always show URL bar action buttons (otherwise they auto-hide when not in use) |
| `mod.hide.location.permissions.icon` | boolean | false | Hide location permission icons (camera/mic) in the URL bar |
| `mod.hide.extension.url.icon` | boolean | false | Hide extension URL icon in the URL bar for extension pages |
| `mod.searchBox.focus.outline.enable` | boolean | false | Enable focus outline on search bar when focused |

---

## 🎛️ System & Framework Preferences

### Custom Preferences (fx-autoconfig)

| Preference Name | Type | Default | Description |
|----------------|------|---------|-------------|
| `userChromeJS.allowUnsafeWrites` | boolean | false | Allow unsafe file writes for fx-autoconfig system |
| `userChromeJS.gBrowser_hack.enabled` | boolean | true | Enable gBrowser hack for startup (automatically set if startup issues detected) |
| `userChromeJS.gBrowser_hack.required` | boolean | false | Mark gBrowser hack as required for proper initialization |

---

## 📑 Tab Management Preferences

### Custom Preferences

| Preference Name | Type | Default | Description |
|----------------|------|---------|-------------|
| `userChrome.tabs.all-tabs-menu.reverse-order` | boolean | false | Reverse tab order in all tabs menu so newer tabs appear on top |
| `userChrome.ctrlTab.skip-show-all-button` | boolean | false | Skip the "List All Tabs" button when cycling through tabs with Ctrl+Tab |

---

## 🔗 Link & Tab Opening Preferences

### Custom Preferences

| Preference Name | Type | Default | Description |
|----------------|------|---------|-------------|
| `userChrome.openLinkInUnloadedTab.use_link_text_as_tab_title_when_unknown` | boolean | true | Use link text as the tab title when opening links in unloaded tabs. Set to false to always use URL as title. |

---

## 🧩 Add-on Bar Preferences

### Built-in Preferences (modified by theme)

| Preference Name | Type | Default | Description |
|----------------|------|---------|-------------|
| `browser.addonbar.enabled` | boolean | true | Enable the add-on bar (bottom status bar) - automatically set to true by extendedStatusbar.uc.js script |

---

## 🔧 How to Set Preferences

### Using about:config

1. Navigate to `about:config` in your Firefox address bar
2. Click "Accept the Risk and Continue"
3. Search for the preference name
4. Click the button to set the value:
   - For **boolean** preferences: Toggle between `true` and `false`
   - For **string** preferences: Click "Edit", enter the value, click "Save"
   - For **integer** preferences: Click the +/- buttons or type a number

### Using user.js file

You can also set preferences by creating a `user.js` file in your Firefox profile directory:

```javascript
// Example user.js content
user_pref("firefoxcss.tabs.on.top.enable", true);
user_pref("firefoxcss.pocket.oneline.enable", true);
user_pref("mod.search.info.buttons.show.always", true);
```

---

## 📋 Quick Reference Table

| Feature | Preference Name | Type | Default |
|---------|----------------|------|---------|
| **Tabs on Top** | `firefoxcss.tabs.on.top.enable` | boolean | false |
| **Pocket One-line Layout** | `firefoxcss.pocket.oneline.enable` | boolean | false |
| **Pocket Compact (4 cards)** | `firefoxcss.pocket.4.cards.enable` | boolean | false |
| **Pocket Compact (5 cards)** | `firefoxcss.pocket.5.cards.enable` | boolean | false |
| **Always Show URL Bar Buttons** | `mod.search.info.buttons.show.always` | boolean | false |
| **Hide Location Permissions Icon** | `mod.hide.location.permissions.icon` | boolean | false |
| **Hide Extension URL Icon** | `mod.hide.extension.url.icon` | boolean | false |
| **Search Bar Focus Outline** | `mod.searchBox.focus.outline.enable` | boolean | false |
| **Hide Vertical Tab Scrollbar** | `mod.disable.scrollbar.in.vertical.tabs` | boolean | false |
| **Custom Theme Color Fix** | `mod.custom.firefox.theme.color.fix` | boolean | false |
| **Reverse All Tabs Menu Order** | `userChrome.tabs.all-tabs-menu.reverse-order` | boolean | false |
| **Skip Show All Tabs Button** | `userChrome.ctrlTab.skip-show-all-button` | boolean | false |
| **Use Link Text as Tab Title** | `userChrome.openLinkInUnloadedTab.use_link_text_as_tab_title_when_unknown` | boolean | true |

---

## ⚠️ Important Notes

### Required Preferences

The following preferences are **required** for proper theme functionality:

- **`svg.context-properties.content.enabled`** - Must be set to `true` for theme icons to display correctly. If you see warning text at the top of the browser window, enable this preference in `about:config`.

### Vertical Tabs

To use the vertical tabs feature:
1. Ensure you're running Firefox 115 or later
2. Enable `sidebar.verticalTabs` in `about:config`
3. Optionally enable `sidebar.revamp` for the modern sidebar UI
4. Restart Firefox

### Theme Color Fix

If you're using custom Firefox themes and the colors don't match:
- Enable `mod.custom.firefox.theme.color.fix` to use the theme's accent color instead of the default theme color

---

## 📚 Related Documentation

- [Configuration Guide](configuration.md) - General theme configuration
- [CSS Variables Reference](css-variables.md) - All theme CSS variables
- [JavaScript Modules](javascript-modules.md) - JS-based features and modules
- [Installation Guide](installation.md) - Complete setup instructions

---

## 🤝 Contributing

If you add new preferences to the theme:
1. Document them in this file
2. Include type, default value, and clear description
3. Add usage examples where appropriate
4. Update related documentation files

---

*Last updated: January 2026*
