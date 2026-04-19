# Changelog - Higgs Boson Firefox Theme

All notable changes to this project will be documented in this file.

## Format
- Each feature change should be added as a single unordered list item
- Format: `- **YYYY-MM-DD HH:MM** [Component] Brief description of change`
- Date and time should be bold (surrounded by double asterisks)
- Most recent changes at the top

## Changes

- **2026-04-19 15:00** [CSS/Content] about:addons, about:preferences, about:config: applied base16 monokai pro spectrum colors (#191919 bg, #222222 cards), fixed addon-card backgrounds, heading backgrounds
- **2026-04-19 14:45** [CSS/Content] about:addons: hidden recommended-extensions-heading, recommended-themes-heading, category-discover sidebar item, footer elements
- **2026-04-19 14:35** [CSS/Content] about:addons: restrutured selectors for Shadow DOM compatibility - addon-list set to display:block, section elements get grid layout with width:100%
- **2026-04-19 14:25** [CSS/Content] about:addons: removed media query wrapper, applied grid to all viewports with `auto-fit, minmax(280px, 1fr)`; [JS/Second Sidebar] Fixed toolbarspring flex to `10000 1 0` and removed max-height constraint for full expansion
- **2026-04-19 14:15** [CSS/Chrome] Extensions panel: 3x3 icon-only grid layout; [CSS/Content] about:addons responsive auto-fill grid; [JS/Second Sidebar] Fixed sidebar toolbar title wrapper to span remaining space (flex: 1 1 0, nav/sidebar buttons flex: 0 0 auto)
- **2026-04-19 13:39** [CSS/Content] Fixed about-addons.css to include recommended-addon-list in responsive grid layout
- **2026-04-18 23:45** [CSS/Chrome] Changed active tab favicon gradient to purple/cyan colors (#948ae3, #5ad4e6)
- **2026-04-18 23:43** [CSS/Chrome] Applied button scaling effects to tab favicons (80% default, 100% hover, 60% active)
- **2026-04-18 23:35** [CSS/Content] Replaced CSS variables with hardcoded colors in settings-pages.css; [CSS/Chrome] Hidden bookmarks toolbar in layout.css
- **2026-04-18 23:27** [CSS/Chrome] Removed autohide-toolbars.css (user requested fixed toolbars instead); [CSS/Content] Enhanced about-addons.css with multi-column grid layout
- **2026-04-18 23:25** [CSS/Content] Changed image viewer background to #1c1c1c solid color; [CSS/Common] Added comprehensive Firefox global color variables for panels, toolbar, tabs, urlbar, and sidebar (both dark and light themes); [CSS/Chrome] Added overflow menu grid styling
- **2026-04-18 23:18** [CSS/Chrome] Added chromehidden toolbar visibility fix and rainbow border animation for selected tabs
- **2026-04-18 23:16** [CSS/Chrome] Added tab counter to all-tabs button showing total tab count
- **2026-04-18 23:14** [CSS/Chrome] Created icons.css with comprehensive icon styling for context menus, app menu, menubar, places context, and textbox context
- **2026-04-18 23:08** [CSS/Chrome] Added unified extensions menu styling: icon size, padding adjustments, hidden message deck
- **2026-04-18 23:06** [CSS/Chrome] Added button transform/scale effects: 80% scaled by default, full size on hover, 60% on active; includes tab close button padding transitions

- **2026-04-18 08:59** [JS/Second Sidebar] Fixed expanded sidebar background using wrong color variable (changed from `--toolbox-bgcolor` to `--firefoxcss-panel-bg-color` to match non-expanded states)

- **2026-04-17 16:16** [CSS/Content] Changed about pages background from #1C1B21 to #1c1c1c and secondary background from #22212A to #2c2c2c (neutral grays instead of tinted)

- **2026-04-17 15:42** [CSS/Chrome] Reorganized CSS files: merged toolbar-order.css, height-fixes.css, hide-elements.css, misc.css into layout.css; moved URL button styles from misc.css to urlbar.css

- **2026-04-17 15:10** [CSS/Chrome] Unified sidebar, statuspanel, context menus, urlbar, and second sidebar to use consistent 0.85/0.9 opacity (matching expanded tabs sidebar) instead of 0.5 opacity

- **2026-03-08 13:13** [JS/CSS] Removed command-palette functionality (JS files, CSS, and documentation) due to interference with urlbar dropdown and keyboard navigation - will revisit implementation approach later
- **2026-03-08 13:08** [CSS/Chrome] Chrome CSS file reorganization: split search-bar.css into command-palette.css (command palette UI) and urlbar.css (URL/search bar styling); split other.css into theme.css (Spill theme), statuspanel.css (link hover preview), containers.css (container tab styling), and misc.css (various UI fixes)
- **2026-03-07 23:39** [CSS] CSS file reorganization: renamed about-discovery.css to addon-discovery.css (targets external Mozilla URL, not an about:* page), renamed about-image.css to image-viewer.css (targets media-document viewer, not about:image), renamed about-settings.css to settings-pages.css (handles multiple settings pages, not just about:preferences)
- **2026-03-07 23:39** [CSS/Content] Fixed about-config.css invalid CSS property: changed background-color to background-image for gradient value
- **2026-03-07 23:39** [CSS/Content] Removed duplicate code blocks in new-tab.css (lines 633-711 were duplicates of earlier content)
- **2026-03-07 23:39** [CSS/Content] Fixed firefox-view.css missing quotes in url-prefix selector
- **2026-03-07 23:31** [CSS/Content] Renamed about-blank.css to about-pages.css to accurately reflect that it styles all Firefox about:* pages, not just about:blank
- **2026-03-07 21:33** [CSS/Content] Fixed about-blank.css by replacing overly broad url-prefix("about:") selector with exhaustive list of specific about:* page URLs to prevent dark background from affecting regular webpages while maintaining styling for all Firefox internal pages
