# Changelog - Higgs Boson Firefox Theme

All notable changes to this project will be documented in this file.

## Format
- Each feature change should be added as a single unordered list item
- Format: `- **YYYY-MM-DD HH:MM** [Component] Brief description of change`
- Date and time should be bold (surrounded by double asterisks)
- Most recent changes at the top

## Changes

- **2026-03-08 13:13** [JS/CSS] Removed command-palette functionality (JS files, CSS, and documentation) due to interference with urlbar dropdown and keyboard navigation - will revisit implementation approach later
- **2026-03-08 13:08** [CSS/Chrome] Chrome CSS file reorganization: split search-bar.css into command-palette.css (command palette UI) and urlbar.css (URL/search bar styling); split other.css into theme.css (Spill theme), statuspanel.css (link hover preview), containers.css (container tab styling), and misc.css (various UI fixes)
- **2026-03-07 23:39** [CSS] CSS file reorganization: renamed about-discovery.css to addon-discovery.css (targets external Mozilla URL, not an about:* page), renamed about-image.css to image-viewer.css (targets media-document viewer, not about:image), renamed about-settings.css to settings-pages.css (handles multiple settings pages, not just about:preferences)
- **2026-03-07 23:39** [CSS/Content] Fixed about-config.css invalid CSS property: changed background-color to background-image for gradient value
- **2026-03-07 23:39** [CSS/Content] Removed duplicate code blocks in new-tab.css (lines 633-711 were duplicates of earlier content)
- **2026-03-07 23:39** [CSS/Content] Fixed firefox-view.css missing quotes in url-prefix selector
- **2026-03-07 23:31** [CSS/Content] Renamed about-blank.css to about-pages.css to accurately reflect that it styles all Firefox about:* pages, not just about:blank
- **2026-03-07 21:33** [CSS/Content] Fixed about-blank.css by replacing overly broad url-prefix("about:") selector with exhaustive list of specific about:* page URLs to prevent dark background from affecting regular webpages while maintaining styling for all Firefox internal pages
