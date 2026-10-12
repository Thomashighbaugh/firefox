---
title: "Zen Mods Store — Full CSS Registry"
type: source-summary
tags: [userchrome, css, zen-browser, theme-store, mods, catalogue, preferences]
created: 2026-10-12
updated: 2026-10-12
source: https://github.com/zen-browser/theme-store/blob/main/themes.json
status: active
---

# Zen Mods Store — Full CSS Registry

All **77** entries in the official
[Zen Browser mod store](https://zen-browser.app/mods), read directly from
<https://raw.githubusercontent.com/zen-browser/theme-store/main/themes.json>.

**Important:** the Zen store is **CSS-only**. Every entry ships a `chrome.css`,
an optional `preferences.json`, and optionally a `readme.md`. **Not one ships a
`.uc.js` file.** Any Zen mod wanted as a script requires authoring a `uc.js`
wrapper against its `chrome.css` by hand.

Store web UI: <https://zen-browser.app/mods>

---

## Relevance to This Project

These map onto `CSS/chrome/*.css` rather than `JS/*.uc.js`.

### Already Covered — Overlaps Existing CSS

| Zen Mod | Existing module |
|---------|------------------|
| Tidy Popup & Extension | `CSS/chrome/context-menu.css` |
| Unloaded Tabs / Better Unloaded Tabs / Ghost Tabs | `CSS/chrome/tabs.css` |
| Sidebar Expand on Hover | `CSS/chrome/vertical-tabs.css`, `url-auto-hide.css` |
| Floating Status Bar / Custom Statusbar | `CSS/chrome/statuspanel.css` |
| Custom uiFont / Customize Font Size | `CSS/common/variables.css` |
| Tab Text Size / Tab title fixes | `CSS/chrome/tabs.css` |
| Container Halo / Colored container tab | `CSS/chrome/containers.css` |
| Improved Collapsed Tabs | `CSS/chrome/vertical-tabs.css` |
| Vertical Split Tab Groups | `CSS/chrome/tabs.css` |
| Disable Rounded Corners / Square UI / No-Gaps | `CSS/chrome/theme.css`, `layout.css` |
| Load Bar / Deta Loading Bar | `CSS/chrome/theme.css` |
| Private Mode Highlighting | `CSS/content/private-browsing.css` |
| Zen Context Menu | `CSS/chrome/context-menu.css` |
| Only Close On Hover / Left close button | `CSS/chrome/tabs.css` |
| Bookmark Toolbar Tweaks | `CSS/chrome/bookmarks.css` |
| No Top Sites | `CSS/content/new-tab.css` |
| Hide Toolbar / Super Sleek UI | `CSS/chrome/layout.css` |
| Better Unloaded Tabs / Hide Reset Button | `CSS/chrome/tabs.css` |

### Novel — Worth CSS Review

| Zen Mod | Why |
|---------|-----|
| **Zen Colored Picker** | Adds a rainbow colour pad to the theme picker |
| **Clickable Scrollbar** | Makes the sidebar scrollbar hit-target clickable |
| **Bigger Mute Button** | Enlarges mute button, hides sound labels |
| **Audio Indicator Enhanced** | New visualizer mode for audio |
| **Tab Numbers** | Numbers each tab |
| **Extensions List** | List view instead of grid on extensions popout |
| **Tab Preview Enhanced** | Respects user background colour and padding |
| **Old navigation buttons** | Restores original Firefox back/forward buttons |
| **Zen Back Forward** | Hides back/forward when not needed |
| **Cleaned URL bar** | Streamlines Zen's URL bar |
| **Big Essentials** | 32px essential tab icons with 16px padding |
| **Trackpad Animation** | Backward/forward gesture animation |
| **Animations Plus** | General animation pack |
| **Pimp your PiP** | Picture-in-picture tweaks |
| **Better Find Bar / Floating Findbar** | Floating, theme-matched findbar |
| **Floating History** | Floating, responsive history tab |
| **Compact tabs title / Smaller Compact Mode** | Compact-mode density |
| **Lean** | Cleans extensions/spaces/toolbars |
| **Cleaner Bookmark Menu** | Strips toolbar bookmark buttons |
| **NavBar Margin** | Top/bottom navbar padding |
| **DoubleClickless** | Disables dblclick/middleclick new-tab on tab bar |
| **Better Letterboxing / Bleeding Corners Fix** | Video letterboxing |
| **Winter Spirit** | Animated snowflake overlay |
| **Quietify** | Calm animated mute visualizer |
| **Transparent Zen** | Transparent tab backgrounds + smooth animation |
| **Secret Theme** | Novelty theme |
| **Zen Minimal Exit Menu** | macOS-style 3-circle exit menu |

---

## Full Registry

| # | Name | Description | Homepage |
| --: | ----- | ----------- | -------- |
| 1 | **Add new tab urlbar icon** | Adds an icon and the text open in new tab to the urlbar if opened by pressing New Tab or Ctrl+T | <https://github.com/Evthestrike/zen-browser-add-new-tab-icon-to-urlbar> |
| 2 | **Animations Plus** | A nice animation pack for Zen Browser | <https://github.com/Anoms12/Animations-plus> |
| 3 | **Audio Indicator Enhanced** | Enhanced audio indicator, with more polished style (New Visualizer Mode) | <https://github.com/Kaedriz/ZenMods/tree/main/AudioIndicatorEnhanced> |
| 4 | **Audio TabIcon Plus** | Enhance audio/mute tab-icon | |
| 5 | **Back Fwd Always Hidden** | Back and forward buttons will always be hidden. Useful if your mouse has the relevant buttons | |
| 6 | **Better Active Tab** | Adds a bright line next to the active tab to better highlight it. | <https://github.com/HliasOuzounis/zen-browser-better-active-tab-indicator> |
| 7 | **Better CtrlTab Panel** | Re-style and add customization options for the CtrlTab panel. | <https://github.com/psu/zen-mods> |
| 8 | **Better Find Bar** | Improves the find bar, making it floating with theme match and customization. | <https://github.com/RobotoSkunk/zen-better-findbar> |
| 9 | **Better Letterboxing** | More pleasant, theme-friendly, and most importantly, rounded letterboxing. | |
| 10 | **Better Tab Indicators** | This Zen Theme provides some alternative styling for the tabs on the sidebar. | <https://github.com/TheRealMG/zen-themes/tree/main/BetterTabIndicators> |
| 11 | **Better UniExtBtn** | change unified extensions button to zen browser icon | |
| 12 | **Better Unloaded Tabs** | Makes unloaded tabs easier to notice by making them greyscale and transparent. | <https://github.com/Felkazz/zen-browser-better-unloaded-tabs> |
| 13 | **Big Essentials** | Make the Essential tab icons big enough (32px w/ 16px padding) to be recognisable without their names. | <https://github.com/leaferiksen/zen-browser-big-essentials> |
| 14 | **Bigger Mute Button** | Enlarges mute button, hides sound labels, and replaces tab icon with mute button when not expanded. | <https://github.com/jvabn/zenbrowser-themes> |
| 15 | **Bleeding Corners Fix** | Fixes the white outlines (or artifacts) on the rounded corners that can appear on some pages. May cause higher GPU usage on some devices. | <https://github.com/rsiebertdev/zen-themes/tree/main/bleeding-corners-fix> |
| 16 | **Bookmark Toolbar Tweaks** | Comprehensive bookmarks toolbar customization: center, hide icons, transparent backgrounds, auto-hide with hover/search expand. | <https://github.com/zen-browser/theme-store/tree/main/themes/ea1a5ace-f698-4b45-ab88-6e8bd3a563f0/> |
| 17 | **Cleaned URL bar** | Cleans up zen's URL bar. | <https://github.com/Dinno-DEV/zen-cleaned-url-bar> |
| 18 | **Cleaner Bookmark Menu** | Remove unnecessary buttons from the toolbar bookmarks button. | <https://github.com/Pkcarreno/cleaner-bookmark-menu> |
| 19 | **Clickable Scrollbar** | Makes Sidebar Scrollbar clickable | |
| 20 | **Colored container tab** | Changes the default container tab theme | <https://github.com/ocean-mars/things> |
| 21 | **Compact tabs title** | Show the first few title characters even in compact mode | |
| 22 | **Container Halo** | A mod for zen browser that highlights Firefox containers around the whole tab, even while inactive. | <https://github.com/themanontv/zen-container-halo> |
| 23 | **Custom MenuButton** | Custom MenuButton | |
| 24 | **Custom Statusbar** | This Mod allows you to adjust the rounding, margin, border thickness and any color of the statusbar. | <https://github.com/Archer7x/Zen-Themes/tree/main/CustomStatusbar> |
| 25 | **Custom uiFont** | Customize the interface font, the default is consistent with the serif font in the settings. | |
| 26 | **CustomCursor** | Choose your custom cursor! | <https://github.com/GunGunGun/zenCustomCursorMod> |
| 27 | **Customize Font Size** | Configure Zen Browser's UI font sizes. | <https://github.com/joadr/zen-customize-fonts-size> |
| 28 | **Disable Rounded Corners** | Disable Rounded Corners from Web View. | <https://github.com/gunir/desktop/tree/themes/themes> |
| 29 | **Disable Status Bar** | This removes the bottom-left status bar when hovering over a URL. | |
| 30 | **DoubleClickless** | Disable double clicking and middle clicking on the tab bar to open a new tab. | |
| 31 | **Extensions List** | Use a list instead of the default grid on the extensions popout | |
| 32 | **Floating History** | Improves the history tab by matching the browser theme, make it floating, more responsive, and allow placing it on either side. | <https://github.com/ahmaadaziz/zen-floating-history> |
| 33 | **Floating Status Bar** | Mod for Zen Browser that detaches the status bar from the bottom left corner of the browser window. | <https://github.com/AmirhBeigi/zen-floating-statusbar/> |
| 34 | **Ghost Tabs** | Makes unloaded tabs & folders appear ghost-like by making them grayscale and transparent. | <https://github.com/Seismix/zen-ghost-tabs> |
| 35 | **Hidden Reset Button** | Hide the reset button behind the tab icon unless hovered. | |
| 36 | **Hide Extension Name** | Hides the name of the extension on tabs loaded from the extension | <https://github.com/ch4og/zenbrowser-themes/tree/main/Hide%20Extension%20Name> |
| 37 | **Hide Inactive Workspaces** | Reducing space by hiding inactive workspace icons, extremely useful if you have a lot of workspaces. | <https://github.com/GunGunGun/zenCustomCursorMod/tree/main/autohide_inactive_workspaces> |
| 38 | **Hide Toolbar** | Allows you to hide the toolbar/navbar, including in *single toolbar mode*. | |
| 39 | **HidePlugins** | Theme to hide the plugin button from the toolbar. | <https://github.com/adammpkins/HidePlugins/tree/main> |
| 40 | **Improved Collapsed Tabs** | An opinionated Zen mod for improved collapsed tabs. (functionally and visually) | <https://github.com/xXMacMillanXx/improved-collapsed-tabs> |
| 41 | **Lean** | Extensions. Spaces. Toolbars. Clean them up, give extra room for your stuff | |
| 42 | **Left close button** | Move the tab close button to the left side | |
| 43 | **Left Side Glance Buttons** | Move the at a glance buttons to the left side of the window. | <https://github.com/psu/zen-mods> |
| 44 | **Load Bar** | Creates a sleek loading bar and mute status for single toolbar mode. | <https://github.com/Tanay-Kar/Zen-Themes/tree/main/LoadBar> |
| 45 | **NavBar Margin** | Adds some top- and bottom-margin to the navbar so it doesn't look too tight. | |
| 46 | **No pinned tab reset btn** | Hides the reset button that appears when hovering over pinned tabs. | <https://github.com/spicybackend/zen-browser-no-pinned-url-reset> |
| 47 | **No Sidebar Scrollbar** | This theme removes the Sidebar Scrollbar while retaining the scroll functionality. | <https://github.com/mally8/zen-browser-no-sidebar-scrollbar> |
| 48 | **No Top Sites** | Annoyed with top sites that appear when you open the URL bar? With this mod, you can now hide them! | <https://github.com/Ivaon/zen-theme/tree/main/NoTopSites> |
| 49 | **NoHighlightSplit** | Removes the border highlight around the active tab while using split view. | <https://github.com/JtdeGraaf/zen-remove-split-view-tab-highlight> |
| 50 | **Old navigation buttons** | Restore the original Firefox navigation buttons. | <https://github.com/Osmagtor/zen-themes/tree/main/Restore%20navigation%20buttons> |
| 51 | **Only Close On Hover** | Show tab's close button only on hover, even on the active tab. | |
| 52 | **Only Reset On Hover** | Show pinned tab's reset button only on hover, even on the active tab. | |
| 53 | **Pimp your PiP** | Collection of tweaks and upgrades to PiP | |
| 54 | **Private Mode Highlighting** | This theme adds a configurable background, border and an icon to any private browsing window. | <https://github.com/danm36/zen-browser-private-browsing-toolbar-highlighting> |
| 55 | **Quietify** | quietify adds a calm visualizer type of animation to mute button to use with style and ease | <https://github.com/wysh3/Zen-Mods/tree/main/Quietify> |
| 56 | **Remove Tab X** | Removes the X from tabs which closes them. | <https://github.com/xXMacMillanXx/remove-tab-x> |
| 57 | **Secret Theme** | Secret theme made for people to have a little laugh! | |
| 58 | **Sidebar Expand on Hover** | Minimizes the sidebar, and expands it upon mouse hover | <https://github.com/StormAnon/zen-sidebar-expand-on-hover/tree/main> |
| 59 | **sleek border** | Sleek Zen browser borders with subtle opacity for a refined, modern look. | |
| 60 | **Smaller Compact Mode** | Reduce the height of the compact sidebar. | |
| 61 | **smaller zen toast popup** | Makes the 'New background tab opened!' toast popup notification less distracting and adds hover | <https://github.com/lenzfliker/zen-mods/tree/main/%5BMOD%5D%20smaller%20zen%20toast%20popup> |
| 62 | **Super Sleek UI** | A sleek & minimalistic UI with grid-style quick access, smaller navbar, no border padding & more. | <https://github.com/lingais/Zen-Broswer-Super-Sleek-UI-Theme.git> |
| 63 | **SuperPins** | This Zen Mod enhances pinned tabs/Essentials, by making some UI/UX changes. | <https://github.com/CosmoCreeper/Zen-Themes/tree/main/SuperPins> |
| 64 | **Tab Numbers** | Shows the Number corresponding to each Tab. | <https://github.com/philmard/tab-numbers> |
| 65 | **Tab Preview Enhanced** | Enhanced tab preview, respecting user background color and padding | <https://github.com/Kaedriz/ZenMods/tree/main/TabPreviewEnhanced> |
| 66 | **Tab Text Size** | Change tab, folder, and workspace text size | <https://github.com/ajkuftic/Zen-TabTextSize> |
| 67 | **Tab title fixes** | Increase size of tab titles and add make pending tabs standing out more. | <https://github.com/psu/zen-mods> |
| 68 | **Tidy Popup** | Modifies popup panels, changing divider lines with empty spacer, and makes the button more compact. | <https://github.com/Dinno-DEV/zen-tidy-popup> |
| 69 | **TitleBarButton UI Tweaks** | Small UI tweaks to the titlebar buttons to make them more coherent with the Zen Browser design philosophy. | |
| 70 | **Trackpad Animation** | adds backward and forward animation for trackpad gesture | <https://github.com/Fury7425/zen-trackpad-gesture-animation> |
| 71 | **Transparent Zen** | Make the Zen Browser's tab background transparent, get smooth animations and more. Enable  features in mod settings and visit the homepage below to learn more about the features. 👇 | <https://www.sameerasw.com/zen> |
| 72 | **Vertical Split Tab Groups** | Display tab groups created from split tabs as vertical lists instead of horizontal ones. | <https://github.com/ToBinio/zen-mods/tree/main/vertical-split-tab-groups> |
| 73 | **Winter Spirit** | Adds an animated snowflake overlay | <https://github.com/Kaedriz/ZenMods/tree/main/WinterSpirit> |
| 74 | **Zen Back Forward** | Hide Back and Forward button when you don't need them | |
| 75 | **Zen Colored Picker** | Adds the rainbow color pad to the theme picker | <https://github.com/Nimit1705/zen-colored-picker> |
| 76 | **Zen Context Menu** | Declutter your right click menu, hide options you don't need | <https://github.com/KiKaraage/ZenMods/> |
| 77 | **Zen Minimal Exit Menu** | A zen browser mod that changes the exit menu to 3 circles similar (but a bit different) to one in MacOS. | <https://github.com/Dinno-DEV/zen-minimal-exit-menu> |