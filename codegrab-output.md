# Project Structure

```
firefox/
├── .github/
│   ├── documentation/
│   │   └── fx-css-variables.txt
│   ├── FUNDING.yml
│   ├── LICENSE
│   └── README.md
├── JS/
│   ├── second_sidebar/
│   │   ├── controllers/
│   │   │   ├── collapse.mjs
│   │   │   ├── context_menu_items.mjs
│   │   │   ├── events.mjs
│   │   │   ├── sidebar.mjs
│   │   │   ├── sidebar_main.mjs
│   │   │   ├── sidebar_main_settings.mjs
│   │   │   ├── sidebar_splitters.mjs
│   │   │   ├── web_panel.mjs
│   │   │   ├── web_panel_delete.mjs
│   │   │   ├── web_panel_edit.mjs
│   │   │   ├── web_panel_more.mjs
│   │   │   ├── web_panel_new.mjs
│   │   │   └── web_panels.mjs
│   │   ├── css/
│   │   │   ├── common.mjs
│   │   │   ├── containers.mjs
│   │   │   ├── context_item.mjs
│   │   │   ├── customization.mjs
│   │   │   ├── popups.mjs
│   │   │   ├── sidebar.mjs
│   │   │   ├── sidebar_box.mjs
│   │   │   ├── sidebar_main.mjs
│   │   │   ├── web_panel.mjs
│   │   │   └── web_panels_browser.mjs
│   │   ├── icons/
│   │   │   ├── sidebar-left.svg
│   │   │   └── sidebar-right.svg
│   │   ├── settings/
│   │   │   ├── settings.mjs
│   │   │   ├── sidebar_settings.mjs
│   │   │   ├── web_panel_settings.mjs
│   │   │   └── web_panels_settings.mjs
│   │   ├── utils/
│   │   │   ├── buttons.mjs
│   │   │   ├── containers.mjs
│   │   │   ├── icons.mjs
│   │   │   ├── parsers.mjs
│   │   │   ├── string.mjs
│   │   │   ├── windows.mjs
│   │   │   └── xul.mjs
│   │   ├── wrappers/
│   │   │   ├── app_constants.mjs
│   │   │   ├── chrome_utils.mjs
│   │   │   ├── clipboard_helper.mjs
│   │   │   ├── contextual_identity_service.mjs
│   │   │   ├── customizable_ui.mjs
│   │   │   ├── favicons.mjs
│   │   │   ├── g_customize_mode.mjs
│   │   │   ├── g_nav_toolbox.mjs
│   │   │   ├── global.mjs
│   │   │   ├── net_utils.mjs
│   │   │   ├── observers.mjs
│   │   │   ├── preferences.mjs
│   │   │   ├── script_security_manager.mjs
│   │   │   ├── session_store.mjs
│   │   │   ├── sidebar_controller.mjs
│   │   │   ├── tab_browser.mjs
│   │   │   ├── tab_panels.mjs
│   │   │   ├── window.mjs
│   │   │   ├── window_manager.mjs
│   │   │   ├── window_watcher.mjs
│   │   │   └── zoom_manager.mjs
│   │   ├── xul/
│   │   │   ├── base/
│   │   │   │   ├── box.mjs
│   │   │   │   ├── browser.mjs
│   │   │   │   ├── button.mjs
│   │   │   │   ├── div.mjs
│   │   │   │   ├── hbox.mjs
│   │   │   │   ├── header.mjs
│   │   │   │   ├── image.mjs
│   │   │   │   ├── img.mjs
│   │   │   │   ├── input.mjs
│   │   │   │   ├── label.mjs
│   │   │   │   ├── menuitem.mjs
│   │   │   │   ├── menulist.mjs
│   │   │   │   ├── menupopup.mjs
│   │   │   │   ├── menuseparator.mjs
│   │   │   │   ├── panel.mjs
│   │   │   │   ├── panel_multi_view.mjs
│   │   │   │   ├── span.mjs
│   │   │   │   ├── splitter.mjs
│   │   │   │   ├── style.mjs
│   │   │   │   ├── tab.mjs
│   │   │   │   ├── toggle.mjs
│   │   │   │   ├── toolbar.mjs
│   │   │   │   ├── toolbar_button.mjs
│   │   │   │   ├── toolbar_separator.mjs
│   │   │   │   ├── vbox.mjs
│   │   │   │   ├── widget.mjs
│   │   │   │   └── xul_element.mjs
│   │   │   ├── notification_badge.mjs
│   │   │   ├── open_link_in_sidebar_menuitem.mjs
│   │   │   ├── popup_body.mjs
│   │   │   ├── popup_footer.mjs
│   │   │   ├── popup_header.mjs
│   │   │   ├── sidebar.mjs
│   │   │   ├── sidebar_box.mjs
│   │   │   ├── sidebar_box_filler.mjs
│   │   │   ├── sidebar_collapse_button.mjs
│   │   │   ├── sidebar_main.mjs
│   │   │   ├── sidebar_main_menupopup.mjs
│   │   │   ├── sidebar_main_popup_settings.mjs
│   │   │   ├── sidebar_splitter.mjs
│   │   │   ├── sidebar_splitter_pinned.mjs
│   │   │   ├── sidebar_splitter_unpinned.mjs
│   │   │   ├── sidebar_toolbar.mjs
│   │   │   ├── web_panel_browser.mjs
│   │   │   ├── web_panel_button.mjs
│   │   │   ├── web_panel_menupopup.mjs
│   │   │   ├── web_panel_new_button.mjs
│   │   │   ├── web_panel_popup_delete.mjs
│   │   │   ├── web_panel_popup_edit.mjs
│   │   │   ├── web_panel_popup_more.mjs
│   │   │   ├── web_panel_popup_new.mjs
│   │   │   ├── web_panel_sound_icon.mjs
│   │   │   ├── web_panel_tab.mjs
│   │   │   ├── web_panels.mjs
│   │   │   └── web_panels_browser.mjs
│   │   ├── customize_mode_patcher.mjs
│   │   ├── sidebar_controllers.mjs
│   │   ├── sidebar_decorator.mjs
│   │   ├── sidebar_elements.mjs
│   │   └── sidebar_injector.mjs
│   ├── allTabsMenuExpansionPack.uc.js
│   ├── autocompletePopupStyler.uc.js
│   ├── extendedStatusbar.uc.js
│   ├── minimizeMemory.uc.js
│   ├── newTabUrlInAboutConfig.uc.js
│   ├── openLinkInUnloadedTab.uc.js
│   ├── pdfTools.uc.js
│   ├── privateWindowHomepage.uc.js
│   ├── rebuild_userChrome.uc.js
│   ├── restart_button.uc.js
│   ├── restart_item_in_menu.uc.js
│   ├── second_sidebar.uc.mjs
│   ├── sidebarWidth.uc.js
│   ├── space_and_separator_restorer.uc.js
│   ├── tabContextMenuNavigation.uc.js
│   ├── tooltipShadowSupport.uc.js
│   ├── userChromeAgentAuthorSheetLoader.sys.mjs
│   └── userChromeDevtoolsSheetLoader.sys.mjs
├── css/
│   ├── common-files/
│   │   ├── color_variables.css
│   │   ├── context_menus.css
│   │   ├── library.css
│   │   ├── radios_checkboxes.css
│   │   └── trees.css
│   ├── userChrome-files/
│   │   ├── about_addons.css
│   │   ├── about_firefox.css
│   │   ├── address_searchbar.css
│   │   ├── bookmarks_popup.css
│   │   ├── clear_history.css
│   │   ├── common_dialog.css
│   │   ├── compact.css
│   │   ├── customization_page.css
│   │   ├── extensions.css
│   │   ├── findbar.css
│   │   ├── iconized.css
│   │   ├── navbar.css
│   │   ├── navbar_menus.css
│   │   ├── page_info.css
│   │   ├── remove_bookmarks_bottom_border.css
│   │   ├── remove_white_flash.css
│   │   ├── secure_connection_colors.css
│   │   ├── sidebar.css
│   │   ├── status_panel.css
│   │   ├── tab_line_colors.css
│   │   └── window-controls.css
│   └── userContent-files/
│       ├── webextension-tweaks/
│       │   ├── brief.css
│       │   ├── cookie_autodelete.css
│       │   ├── dark_mode.css
│       │   ├── downloads_sidebar.css
│       │   ├── dustman.css
│       │   ├── generic_style.css
│       │   ├── greasemonkey.css
│       │   ├── momentum.css
│       │   ├── multi_account_containers.css
│       │   ├── noscript.css
│       │   ├── onetab.css
│       │   ├── pocket.css
│       │   ├── random_user_agent.css
│       │   ├── request_control.css
│       │   ├── tree_style_tab.css
│       │   ├── tridactyl.css
│       │   ├── ublock_origin.css
│       │   ├── ubo_scope.css
│       │   ├── ultrawide_video.css
│       │   ├── umatrix.css
│       │   ├── vim_vixen.css
│       │   ├── violentmonkey.css
│       │   └── youtube_video_and_audio_downloader.css
│       ├── websites/
│       │   ├── bing.css
│       │   ├── reddit.css
│       │   └── youtube.css
│       ├── about_config.css
│       ├── about_pages.css
│       ├── addonlists.css
│       ├── amo_store.css
│       ├── directory_listings.css
│       ├── downloads.css
│       ├── manifest.css
│       ├── newtab.css
│       ├── pdf.css
│       ├── private.css
│       ├── raw_githubusercontent.css
│       ├── rss.css
│       ├── scrollbar.css
│       └── view_source.css
├── resources/
│   ├── notifications/
│   │   └── statusbar/
│   │       ├── camera.svg
│   │       ├── microphone.svg
│   │       └── screen.svg
│   ├── Mozilla Public License
│   ├── userChrome.ag.css
│   └── userChrome.au.css
├── utils/
│   ├── LICENSE
│   ├── boot.sys.mjs
│   ├── chrome.manifest
│   ├── fs.sys.mjs
│   ├── module_loader.mjs
│   ├── uc_api.sys.mjs
│   └── utils.sys.mjs
├── .gitignore
├── AGENTS.md
├── Mozilla Public License
├── README.md
├── userChrome.css
└── userContent.css
```

# Project Files

## File: `.github/documentation/fx-css-variables.txt`

```text

List is from and all work on these were discovered was done by the author of: https://gist.github.com/MrOtherGuy/a673848c95823225f7b198199f87a396


main-window
***********************
--arrowpanel-background
--arrowpanel-border-color
--arrowpanel-color
--arrowpanel-dimmed
--arrowpanel-dimmed-even-further
--arrowpanel-dimmed-further
--arrowpanel-padding
--autocomplete-popup-background
--autocomplete-popup-color
--autocomplete-popup-highlight-background
--autocomplete-popup-highlight-color
--avatar-image-url
--backbutton-active-background
--backbutton-background
--backbutton-border-color
--backbutton-hover-background
--cfr-active-color
--cfr-animation-duration
--cfr-button-addons-icon
--cfr-button-features-icon
--chrome-content-separator-color
--default-arrowpanel-background
--default-arrowpanel-border-color
--default-arrowpanel-color
--downloads-item-details-opacity
--downloads-item-font-size-factor
--downloads-item-height
--drag-drop-transition-duration
--in-content-button-background
--in-content-button-background-active
--in-content-button-background-hover
--in-content-primary-button-background
--in-content-primary-button-background-active
--in-content-primary-button-background-hover
--lwt-accent-color
--lwt-additional-images
--lwt-background-alignment
--lwt-background-tiling
--lwt-text-color
--lwt-toolbar-field-background-color
--lwt-toolbar-field-border-color
--lwt-toolbar-field-color
--lwt-toolbar-field-focus
--lwt-toolbar-field-focus-color
--lwt-toolbarbutton-icon-fill
--panel-disabled-color
--panel-separator-color
--panelui-subview-transition-duration
--short-notification-background
--short-notification-gradient
--space-above-tabbar
--tab-min-height
--tabs-navbar-shadow-size
--toolbar-bgcolor
--toolbar-bgimage
--toolbar-color
--toolbar-field-focus-border-color
--toolbar-non-lwt-bgcolor
--toolbar-non-lwt-bgimage
--toolbar-non-lwt-textcolor
--toolbarbutton-active-background
--toolbarbutton-border-radius
--toolbarbutton-focus-outline
--toolbarbutton-height
--toolbarbutton-hover-background
--toolbarbutton-hover-transition-duration
--toolbarbutton-icon-fill-attention
--toolbarbutton-icon-fill-opacity
--toolbarbutton-inner-padding
--toolbarbutton-outer-padding
--toolbarbutton-vertical-text-padding
--urlbar-icon-padding
--urlbar-popup-action-color
--urlbar-popup-url-color
--urlbar-separator-color

************************
navigator-toolbox
************************
--tabs-border-color

************************
TabsToolbar
***********************
--tabs-top-border-width
--toolbarbutton-active-background
--toolbarbutton-hover-background


*************************
toolbar
************************
--backbutton-background
--backbutton-active-background
--backbutton-hover-background
--toolbarbutton-icon-fill-attention

**********************
tabbrowser-tabs
*********************
--tab-line-color
--tab-loading-fill
--tab-loader-size
--tabs-top-border-width
--tab-min-width

*************
sidebar
**************
--sidebar-background-color
--sidebar-text-color
--sidebar-border-color

*****************
newtab page
*****************
--newtab-search-icon
--newtab-background-color
--newtab-text-primary-color
--lwt-sidebar-background-color
--lwt-sidebar-text-color
--newtab-background-color
--newtab-border-primary-color
--newtab-border-secondary-color
--newtab-button-primary-color
--newtab-button-secondary-color
--newtab-element-active-color
--newtab-element-hover-color
--newtab-icon-primary-color
--newtab-icon-secondary-color
--newtab-icon-tertiary-color
--newtab-inner-box-shadow-color
--newtab-link-primary-color
--newtab-link-secondary-color
--newtab-text-conditional-color
--newtab-text-primary-color
--newtab-text-secondary-color
--newtab-textbox-background-color
--newtab-textbox-border
--newtab-textbox-focus-color
--newtab-textbox-focus-boxshadow
--newtab-feed-button-background
--newtab-feed-button-text
--newtab-feed-button-background-faded
--newtab-feed-button-text-faded
--newtab-feed-button-spinner
--newtab-contextmenu-background-color
--newtab-contextmenu-button-color
--newtab-modal-color
--newtab-overlay-color
--newtab-section-header-text-color
--newtab-section-navigation-text-color
--newtab-section-active-contextmenu-color
--newtab-search-border-color
--newtab-search-dropdown-color
--newtab-search-dropdown-header-color
--newtab-search-header-background-color
--newtab-search-icon-color
--newtab-search-wordmark-color
--newtab-topsites-background-color
--newtab-topsites-icon-shadow
--newtab-topsites-label-color
--newtab-card-active-outline-color
--newtab-card-background-color
--newtab-card-hairline-color
--newtab-card-placeholder-color
--newtab-card-shadow
--newtab-snippets-background-color
--newtab-snippets-hairline-color
--trailhead-header-text-color
--trailhead-cards-background-color
--trailhead-card-button-background-color
--trailhead-card-button-background-hover-color
--trailhead-card-button-background-active-color

*************
in-content UI (options,addons-manager etc.)
********************************************
--animation-curve
--arrowpanel-background
--arrowpanel-border-color
--arrowpanel-border-color
--arrowpanel-color
--arrowpanel-padding
--blue-40
--blue-40-a10
--blue-50
--blue-50-a30
--blue-60
--blue-70
--blue-80
--card-outline-color
--card-padding
--card-shadow
--card-shadow-focus
--card-shadow-hover
--default-arrowpanel-background
--default-arrowpanel-border-color
--default-arrowpanel-color
--green-50
--green-60
--green-70
--green-80
--green-90
--grey-20
--grey-30
--grey-40
--grey-60
--grey-90
--grey-90-a10
--grey-90-a20
--grey-90-a30
--grey-90-a50
--grey-90-a60
--in-content-border-active
--in-content-border-active-shadow
--in-content-border-color
--in-content-border-focus
--in-content-border-highlight
--in-content-border-hover
--in-content-border-invalid
--in-content-border-invalid-shadow
--in-content-box-background
--in-content-box-background-active
--in-content-box-background-hover
--in-content-box-background-odd
--in-content-box-border-color
--in-content-box-info-background
--in-content-button-background
--in-content-button-background-active
--in-content-button-background-hover
--in-content-category-background-active
--in-content-category-background-hover
--in-content-category-background-selected-active
--in-content-category-background-selected-hover
--in-content-category-outline-focus
--in-content-category-text-selected
--in-content-category-text-selected-active
--in-content-deemphasized-text
--in-content-dialog-header-background
--in-content-item-hover
--in-content-item-selected
--in-content-link-color
--in-content-link-color-active
--in-content-link-color-hover
--in-content-link-color-visited
--in-content-page-background
--in-content-page-color
--in-content-primary-button-background
--in-content-primary-button-background-active
--in-content-primary-button-background-hover
--in-content-selected-text
--in-content-tab-color
--in-content-table-background
--in-content-table-border-dark-color
--in-content-table-header-background
--in-content-text-color
--in-content-warning-container
--orange-50
--panel-border-radius
--panel-disabled-color
--purple-70
--red-50
--red-50-a30
--red-60
--red-70
--red-80
--red-90
--shadow-10
--shadow-30
--yellow-10
--yellow-50
--yellow-60
--yellow-60-a30
--yellow-70
--yellow-80
--yellow-90
  

```

## File: `.github/FUNDING.yml`

```yaml
github: [octocat, surftocat]
patreon: octocat
tidelift: npm/octo-package
custom: ['https://www.paypal.me/thomaslhighbaugh', thomasleonhighbaugh.me]

```

## File: `.github/LICENSE`

```markdown
MIT License 

Copyright (c) 2021 Thomas Leon Highbaugh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```

## File: `.github/README.md`

```markdown
# Higgs Boson Firefox Theme

> Note:
>
> In its current form, this configuration is intended for use as part of my NixOS configuration, but if you want to install it elsewhere, please see the "imperative" branch, which is an older variant of the configuration (that needs some work) but the install script still works perfectly for those on non-declarative Linux distros. As always, macOS and Windows users are on their own.


## Introduction, or "What is this?"

This is my personal modification and part of my overall Firefox configuration. It uses CSS in the form of UserChrome.css and UserContent.css files as well as relies upon a certain amount of UserChrome.js files.

The former are enabled by setting the option in `about:config` to `true` for `toolkit.legacyUserProfileCustomizations.stylesheets` and providing a file called `userChrome.css` as well as one called `userContent.css` in the chrome directory of the Firefox profile directory you are using presently.

The latter requires a bit more *shifty business* overall, is more fickle due to its dependence of the internal APIs and functions exposed by the Firefox development team and is currently in flux as they transition from using `.jsm` files to using standard ESModules (`.sys.mjs` files that require a different import function) for providing those functions and APIs. My use of them utilizes the `fx-autoconfig` script loader methodology primarily due to the available documentation and responsive developer behind it, as well as the project by `aminomancer` who documents the scripts therein with a comprehensiveness rivaling Tolstoy, which while at first overwhelming, I find invaluable for understanding the project and its inner workings based on such a huge and often esoteric codebase as the one powering Firefox (I can only imagine what Chrome or the old MS browsers codebases are like, but I digress).

## "What does it do?"


Creates a Firefox tailored to my use cases and preferences, which fits into my overall desktop environment and workflow. I have a thing about customizing my computer interface, some may call it an unhealthy obsession, but I find it is more often than not the best way to maximize my use of my system for both productivity and recreational purposes.

Other than the terminal emulator I use, where I access my text editor (neovim, which just works a lot better and is a lot more customizable than a more common, non-modal editor would be for my use cases and specific needs), there is no piece of software I use more than my web browser. That being the case, I customized my browser to fit my needs, then started using NixOS which complicated that process, but thankfully after pouring over the details and GitHub issues and a thousand and one false starts, I finally managed to get the `fx-autoconfig` script loader bolted into my NixOS configuration via a modified version of the method now listed on the `fx-autoconfig` GitHub page for Nix installation (note: Nix installation is not identical to NixOS installation, Nix is useful on all sorts of distros and platforms, it powers NixOS as its primary package manager but like `npm` or `pip` can be installed elsewhere as well.)

### Primary Feature of Interest

While I have come to love, truly love, the new button that keeps most add-ons hidden in a drop down menu akin to Chrome, I have a lot of add-ons I use often enough (or need to adjust  because my add-blocker or some userscript is making something not work) that I like having them close at hand without sorting through a menu. I also like having Firefox's many built in functions close at hand for when they are useful and the result of having a window manager highly customized with hotkeys for accessing most of what I use on my system in a few button presses is I am impatient wading through menus. Like super impatient, I could hardly stand using macOS when recently the fates decided I would finally have the option of trying it and seeing what all the fuss was about (turns out it is just a really specific and polished DE on top of what functions like any of the BSD variants I have used in the past, but I digress again).

So the big feature I bake into my customized Firefox is: Toolbars framing the windows except for the left side which I use for tab management using a home-rolled verticanl tabs solution.

#### "But There are Other Vertical Tab Solutions!"

Yes, there are, and I have tried them all. I have tried them all and I have found them all lacking in some way or another.  I don't want the tabs arranged in trees, especially not trees that are extremely fickle to move around and generally clunky to work with. I organize tabs as bookmarks with `raindrop.io` in nested directories and find relying on tabs to still be there after I ignore my system complaining about low battery to point it dies and I have to restart playing with matches in a room full of dynamite anyway. I also don't want my tabs to be styled with an even more esoteric set of classes all their own, making theming a nightmare. Nor do I need extra plugins for functionality that should be a default option anyway. I just want my tabs on the left side of the window, with the ability to drag one off of the bar to make a new window and for the title to reliably hide when my cursor is not hovering over the bar (when I am using the cursor, since discovering CRTL+TAB and CRTL+w a few years ago, I can go hours without touching the mouse, but I digress again).

### Other Features of Note

- Obviously, having tabs on the side means none necessary on the top bar, so I removed that.
- 

```

## File: `JS/second_sidebar/controllers/collapse.mjs`

```mjs
import { SidebarEvents, listenEvent, sendEvents } from "./events.mjs";

import { SidebarControllers } from "../sidebar_controllers.mjs";
import { SidebarElements } from "../sidebar_elements.mjs";
import { WindowWrapper } from "../wrappers/window.mjs";
import { XULElement } from "../xul/base/xul_element.mjs";

const FULLSCREEN_ANIMATE_ATTRIBUTE = "fullscreenShouldAnimate";
const ANIMATE_ATTRIBUTE = "shouldAnimate";

export class CollapseController {
  constructor() {
    // elements
    this.sidebarMain = SidebarElements.sidebarMain;
    this.sidebarSettings = SidebarElements.sidebarMainPopupSettings;
    this.sidebarCollapseButton = SidebarElements.sidebarCollapseButton;
    // controllers
    this.sidebarMainController = SidebarControllers.sidebarMainController;
    this.sidebarController = SidebarControllers.sidebarController;

    this.#setupListeners();
  }

  #setupListeners() {
    const window = new WindowWrapper();
    const root = new XULElement({ element: window.document.documentElement });

    root.addEventListener("mousemove", this);

    window.addEventListener("fullscreen", () => {
      if (window.fullScreen) {
        // Show sidebar and then immediately hide with fullscreen animation
        this.uncollapse();
        setTimeout(() => {
          this.collapse(false, true);
        }, 0);
      } else {
        if (this.sidebarController.autoHideSidebar) {
          // Show sidebar and then immediately hide with fullscreen animation
          this.uncollapse();
          setTimeout(() => {
            this.collapse(false, true);
          });
        } else {
          this.uncollapse(this.sidebarController.hideSidebarAnimated);
        }
      }
    });

    this.sidebarCollapseButton.listenClick(() => {
      sendEvents(SidebarEvents.COLLAPSE_SIDEBAR);
    });

    listenEvent(SidebarEvents.COLLAPSE_SIDEBAR, (event) => {
      const isActiveWindow = event.detail.isActiveWindow;

      if (!isActiveWindow) {
        return;
      }

      if (this.sidebarController.autoHideSidebar) {
        return;
      }
      if (this.collapsed()) {
        this.uncollapse(this.sidebarController.hideSidebarAnimated);
        this.sidebarCollapseButton.setOpen(true);
      } else {
        this.collapse(this.sidebarController.hideSidebarAnimated);
        this.sidebarCollapseButton.setOpen(false);
      }
    });
  }

  /**
   *
   * @param {boolean} animate
   */
  shouldAnimate(animate) {
    this.sidebarMain.toggleAttribute(ANIMATE_ATTRIBUTE, animate);
  }

  /**
   *
   * @param {boolean} animate
   */
  fullScreenShouldAnimate(animate) {
    this.sidebarMain.toggleAttribute(FULLSCREEN_ANIMATE_ATTRIBUTE, animate);
  }

  /**
   *
   * @param {MouseEvent} event
   */
  handleEvent(event) {
    const window = new WindowWrapper();
    if (!window.fullScreen && !this.sidebarController.autoHideSidebar) {
      return;
    }
    const position = this.sidebarController.getPosition();
    const root = new XULElement({ element: window.document.documentElement });
    const rootRect = root.getBoundingClientRect();
    const sidebarRect = this.sidebarMain.getBoundingClientRect();
    const leftEdge = window.mozInnerScreenX;
    const rightEdge = leftEdge + rootRect.width;
    if (
      this.collapsed() &&
      ((position === "right" &&
        event.screenX > rightEdge - sidebarRect.width) ||
        (position === "left" && event.screenX < leftEdge + sidebarRect.width))
    ) {
      this.uncollapse(this.sidebarController.hideSidebarAnimated);
    } else if (
      !this.collapsed() &&
      ((position === "right" &&
        event.screenX < rightEdge - 2 * sidebarRect.width) ||
        (position === "left" &&
          event.screenX > leftEdge + 2 * sidebarRect.width))
    ) {
      this.collapse(this.sidebarController.hideSidebarAnimated);
    }
  }

  /**
   *
   * @returns {boolean}
   */
  collapsed() {
    return this.sidebarMainController.collapsed();
  }

  /**
   *
   * @param {boolean} animate
   * @param {boolean} fullScreenAnimate
   */
  collapse(animate = false, fullScreenAnimate = false) {
    this.shouldAnimate(animate);
    this.fullScreenShouldAnimate(fullScreenAnimate);
    this.sidebarMainController.collapse();
  }

  /**
   *
   * @param {boolean} animate
   * @param {boolean} fullScreenAnimate
   */
  uncollapse(animate = false, fullScreenAnimate = false) {
    this.shouldAnimate(animate);
    this.fullScreenShouldAnimate(fullScreenAnimate);
    this.sidebarMainController.uncollapse();
  }
}

```

## File: `JS/second_sidebar/controllers/context_menu_items.mjs`

```mjs
import { ScriptSecurityManagerWrapper } from "../wrappers/script_security_manager.mjs";
import { SidebarControllers } from "../sidebar_controllers.mjs";
import { SidebarElements } from "../sidebar_elements.mjs";

export class ContextMenuItemsController {
  constructor() {
    this.openLinkInSidebarMenuItem = SidebarElements.openLinkInSidebarMenuItem;

    this.#setupListeners();
  }

  #setupListeners() {
    this.openLinkInSidebarMenuItem.addEventListener("command", () => {
      const url = gContextMenu.linkURL;
      SidebarControllers.webPanelNewController.createWebPanel(
        url,
        ScriptSecurityManagerWrapper.DEFAULT_USER_CONTEXT_ID,
      );
    });
  }
}

```

## File: `JS/second_sidebar/controllers/events.mjs`

```mjs
import { WindowManagerWrapper } from "../wrappers/window_manager.mjs";
import { WindowWatcherWrapper } from "../wrappers/window_watcher.mjs";
import { WindowWrapper } from "../wrappers/window.mjs";

export const WebPanelEvents = {
  EDIT_WEB_PANEL_URL: "edit_web_panel_url",
  EDIT_WEB_PANEL_FAVICON_URL: "edit_web_panel_favicon_url",
  EDIT_WEB_PANEL_PINNED: "edit_web_panel_pinned",
  EDIT_WEB_PANEL_USER_CONTEXT_ID: "edit_web_panel_user_context_id",
  EDIT_WEB_PANEL_MOBILE: "edit_web_panel_mobile",
  EDIT_WEB_PANEL_LOAD_ON_STARTUP: "edit_web_panel_load_on_startup",
  EDIT_WEB_PANEL_UNLOAD_ON_CLOSE: "edit_web_panel_unload_on_close",
  EDIT_WEB_PANEL_HIDE_TOOLBAR: "edit_web_panel_hide_toolbar",
  EDIT_WEB_PANEL_HIDE_SOUND_ICON: "edit_web_panel_hide_sound_icon",
  EDIT_WEB_PANEL_HIDE_NOTIFICATION_BADGE:
    "edit_web_panel_hide_notification_badge",
  EDIT_WEB_PANEL_PERIODIC_RELOAD: "edit_web_panel_periodic_reload",
  EDIT_WEB_PANEL_ZOOM_OUT: "edit_web_panel_zoom_out",
  EDIT_WEB_PANEL_ZOOM_IN: "edit_web_panel_zoom_in",
  EDIT_WEB_PANEL_ZOOM: "edit_web_panel_zoom",
  CREATE_WEB_PANEL: "create_web_panel",
  SWITCH_WEB_PANEL: "switch_web_panel",
  DELETE_WEB_PANEL: "delete_web_panel",
  SAVE_WEB_PANELS: "save_web_panels",
  OPEN_NEW_WEB_PANEL_POPUP: "open_new_web_panel_popup",
};

export const SidebarEvents = {
  EDIT_SIDEBAR_POSITION: "edit_sidebar_position",
  EDIT_SIDEBAR_PADDING: "edit_sidebar_padding",
  EDIT_SIDEBAR_NEW_WEB_PANEL_POSITION: "edit_sidebar_new_web_panel_position",
  EDIT_SIDEBAR_UNPINNED_PADDING: "edit_sidebar_unpinned_padding",
  EDIT_SIDEBAR_HIDE_IN_POPUP_WINDOWS: "edit_sidebar_hide_in_popup_windows",
  EDIT_SIDEBAR_AUTO_HIDE_BACK_BUTTON: "edit_sidebar_auto_hide_back_button",
  EDIT_SIDEBAR_AUTO_HIDE_FORWARD_BUTTON:
    "edit_sidebar_auto_hide_forward_button",
  EDIT_SIDEBAR_CONTAINER_BORDER: "edit_sidebar_container_border",
  EDIT_SIDEBAR_AUTO_HIDE: "edit_sidebar_auto_hide",
  EDIT_SIDEBAR_AUTO_HIDE_ANIMATED: "edit_sidebar_auto_hide_animated",
  EDIT_SIDEBAR_WIDTH: "edit_sidebar_width",
  SAVE_SIDEBAR: "save_sidebar",
  COLLAPSE_SIDEBAR: "collapse_sidebar",
};

/**
 *
 * @param {string} type
 * @param {object} detail
 */
export const sendEvent = (type, detail = {}) => {
  const lastWindow = WindowManagerWrapper.getMostRecentBrowserWindow();
  const customEvent = new CustomEvent(type, {
    detail: {
      ...detail,
      isActiveWindow: window === lastWindow,
    },
  });
  lastWindow.dispatchEvent(customEvent);
};

/**
 *
 * @param {string} type
 * @param {object} detail
 */
export const sendEvents = (type, detail = {}) => {
  const lastWindow = WindowManagerWrapper.getMostRecentBrowserWindow();
  for (const window of WindowWatcherWrapper.getWindowEnumerator()) {
    const customEvent = new CustomEvent(type, {
      detail: {
        ...detail,
        isActiveWindow: WindowWrapper.isEqual(window, lastWindow),
      },
    });
    window.dispatchEvent(customEvent);
  }
};

/**
 *
 * @param {string} type
 * @param {function(Event):void} callback
 */
export const listenEvent = (type, callback) => {
  new WindowWrapper().addEventListener(type, (event) => {
    console.log(`Got event ${event.type}:`, event.detail);
    callback(event);
  });
};

```

## File: `JS/second_sidebar/controllers/sidebar.mjs`

```mjs
/* eslint-disable no-unused-vars */
import {
  SidebarEvents,
  WebPanelEvents,
  listenEvent,
  sendEvents,
} from "./events.mjs";

import { SidebarControllerWrapper } from "../wrappers/sidebar_controller.mjs";
import { SidebarControllers } from "../sidebar_controllers.mjs";
import { SidebarElements } from "../sidebar_elements.mjs";
import { SidebarSettings } from "../settings/sidebar_settings.mjs";
import { ToolbarButton } from "../xul/base/toolbar_button.mjs";
import { XULElement } from "../xul/base/xul_element.mjs";
import { changeContainerBorder } from "../utils/containers.mjs";
import { isLeftMouseButton } from "../utils/buttons.mjs";

/* eslint-enable no-unused-vars */

export class SidebarController {
  constructor() {
    this.sidebarBox = SidebarElements.sidebarBox;
    this.sidebar = SidebarElements.sidebar;
    this.sidebarToolbar = SidebarElements.sidebarToolbar;
    this.sidebarSplitterPinned = SidebarElements.sidebarSplitterPinned;
    this.sidebarSplitterUnpinned = SidebarElements.sidebarSplitterUnpinned;
    this.sidebarBoxFiller = SidebarElements.sidebarBoxFiller;
    this.webPanelPopupEdit = SidebarElements.webPanelPopupEdit;
    this.sidebarMainPopupSettings = SidebarElements.sidebarMainPopupSettings;
    this.sidebarMainMenuPopup = SidebarElements.sidebarMainMenuPopup;
    this.webPanelMenuPopup = SidebarElements.webPanelMenuPopup;
    this.sidebarCollapseButton = SidebarElements.sidebarCollapseButton;
    this.webPanelsBrowser = SidebarElements.webPanelsBrowser;
    this.root = new XULElement({ element: document.documentElement });

    this.#setupListeners();

    this.hideInPopupWindows = false;
    this.autoHideBackButton = false;
    this.autoHideForwardButton = false;
    this.containerBorder = "left";
    this.autoHideSidebar = false;
    this.hideSidebarAnimated = false;
  }

  #setupListeners() {
    /** @param {MouseEvent} event */
    this.onClickOutsideWhileUnpinned = (event) => {
      const target = new XULElement({ element: event.target });

      if (
        isLeftMouseButton(event) &&
        !this.webPanelsBrowser.activeWebPanelContains(target) &&
        !this.sidebar.contains(target) &&
        !this.sidebarSplitterUnpinned.contains(target) &&
        !this.webPanelPopupEdit.contains(target) &&
        !this.sidebarMainPopupSettings.contains(target) &&
        !this.sidebarMainMenuPopup.contains(target) &&
        !this.webPanelMenuPopup.contains(target)
      ) {
        this.close();
      }
    };

    const addWebPanelButtonListener = (event, callback) => {
      if (isLeftMouseButton(event)) {
        const webPanelController =
          SidebarControllers.webPanelsController.getActive();
        return callback(webPanelController);
      }
    };

    this.sidebarToolbar.listenBackButtonClick((event) => {
      addWebPanelButtonListener(event, (webPanelController) =>
        webPanelController.goBack(),
      );
    });
    this.sidebarToolbar.listenForwardButtonClick((event) => {
      addWebPanelButtonListener(event, (webPanelController) =>
        webPanelController.goForward(),
      );
    });
    this.sidebarToolbar.listenReloadButtonClick((event) => {
      addWebPanelButtonListener(event, (webPanelController) =>
        webPanelController.reload(),
      );
    });
    this.sidebarToolbar.listenHomeButtonClick((event) => {
      addWebPanelButtonListener(event, (webPanelController) =>
        webPanelController.goHome(),
      );
    });

    this.sidebarToolbar.listenPinButtonClick(() => {
      const webPanelController =
        SidebarControllers.webPanelsController.getActive();
      sendEvents(WebPanelEvents.EDIT_WEB_PANEL_PINNED, {
        uuid: webPanelController.getUUID(),
        pinned: !webPanelController.pinned(),
      });
      sendEvents(WebPanelEvents.SAVE_WEB_PANELS);
    });

    this.sidebarToolbar.listenCloseButtonClick(() => {
      const webPanelController =
        SidebarControllers.webPanelsController.getActive();
      this.close();
      webPanelController.unload();
    });

    listenEvent(SidebarEvents.EDIT_SIDEBAR_POSITION, (event) => {
      const value = event.detail.value;
      this.setPosition(value);
    });

    listenEvent(SidebarEvents.EDIT_SIDEBAR_PADDING, (event) => {
      const value = event.detail.value;
      SidebarControllers.sidebarMainController.setPadding(value);
    });

    listenEvent(SidebarEvents.EDIT_SIDEBAR_NEW_WEB_PANEL_POSITION, (event) => {
      const value = event.detail.value;
      SidebarControllers.webPanelNewController.setNewWebPanelPosition(value);
    });

    listenEvent(SidebarEvents.EDIT_SIDEBAR_UNPINNED_PADDING, (event) => {
      const value = event.detail.value;
      this.setUnpinnedPadding(value);
    });

    listenEvent(SidebarEvents.EDIT_SIDEBAR_HIDE_IN_POPUP_WINDOWS, (event) => {
      const value = event.detail.value;
      this.hideInPopupWindows = value;
    });

    listenEvent(SidebarEvents.EDIT_SIDEBAR_AUTO_HIDE_BACK_BUTTON, (event) => {
      const value = event.detail.value;
      this.autoHideBackButton = value;
      this.autoHideButton(this.sidebarToolbar.backButton, value);
    });

    listenEvent(
      SidebarEvents.EDIT_SIDEBAR_AUTO_HIDE_FORWARD_BUTTON,
      (event) => {
        const value = event.detail.value;
        this.autoHideForwardButton = value;
        this.autoHideButton(this.sidebarToolbar.forwardButton, value);
      },
    );

    listenEvent(SidebarEvents.EDIT_SIDEBAR_CONTAINER_BORDER, (event) => {
      const value = event.detail.value;
      this.autoHideForwardButton = value;
      this.setContainerBorder(value);
    });

    listenEvent(SidebarEvents.EDIT_SIDEBAR_AUTO_HIDE, (event) => {
      const value = event.detail.value;
      this.setAutoHideSidebar(value);
    });

    listenEvent(SidebarEvents.EDIT_SIDEBAR_AUTO_HIDE_ANIMATED, (event) => {
      const value = event.detail.value;
      this.hideSidebarAnimated = value;
    });

    listenEvent(SidebarEvents.EDIT_SIDEBAR_WIDTH, (event) => {
      const uuid = event.detail.uuid;
      const width = event.detail.width;

      const webPanelController =
        SidebarControllers.webPanelsController.get(uuid);
      webPanelController.setWidth(width);
      if (webPanelController.isActive()) {
        this.setWidth(width);
      }
    });

    listenEvent(SidebarEvents.SAVE_SIDEBAR, (event) => {
      const isActiveWindow = event.detail.isActiveWindow;
      if (isActiveWindow) {
        this.saveSettings();
      }
    });
  }

  /**
   *
   * @param {boolean} pinned
   * @param {number} width
   * @param {boolean} canGoBack
   * @param {boolean} canGoForward
   * @param {string} title
   * @param {boolean} hideToolbar
   */
  open(pinned, width, canGoBack, canGoForward, title, hideToolbar) {
    this.sidebarBox.show();
    this.setWidth(width);
    this.setToolbarBackButtonDisabled(!canGoBack);
    this.setToolbarForwardButtonDisabled(!canGoForward);
    this.setToolbarTitle(title);
    this.setHideToolbar(hideToolbar);
    this.updateAbsolutePosition();
    pinned ? this.pin() : this.unpin();
  }

  close() {
    this.sidebarBox.hide();
    this.sidebarSplitterPinned.hide();
    this.sidebarSplitterUnpinned.hide();
    this.sidebarBoxFiller.hide();
    SidebarControllers.webPanelsController.close();
  }

  /**
   *
   * @returns {boolean}
   */
  closed() {
    return this.sidebarBox.hidden();
  }

  pin() {
    this.sidebar.pin();
    this.sidebarSplitterPinned.show();
    this.sidebarSplitterUnpinned.hide();
    this.sidebarBoxFiller.hide();
    this.sidebarToolbar.changePinButton(true);
    document.removeEventListener("click", this.onClickOutsideWhileUnpinned);
  }

  unpin() {
    this.sidebar.unpin();
    this.sidebarSplitterPinned.hide();
    this.sidebarSplitterUnpinned.show();
    this.sidebarBoxFiller.show();
    this.sidebarToolbar.changePinButton(false);
    document.addEventListener("click", this.onClickOutsideWhileUnpinned);
  }

  /**
   *
   * @param {string} title
   */
  setToolbarTitle(title) {
    this.sidebarToolbar.setTitle(title);
  }

  /**
   *
   * @param {boolean} value
   */
  setToolbarBackButtonDisabled(value) {
    const button = this.sidebarToolbar.backButton;
    button.setDisabled(value);
    this.autoHideButton(button, this.autoHideBackButton);
  }

  /**
   *
   * @param {boolean} value
   */
  setToolbarForwardButtonDisabled(value) {
    const button = this.sidebarToolbar.forwardButton;
    button.setDisabled(value);
    this.autoHideButton(button, this.autoHideForwardButton);
  }

  /**
   *
   * @param {ToolbarButton} button
   * @param {boolean} autoHide
   */
  autoHideButton(button, autoHide) {
    button.isDisabled() && autoHide ? button.hide() : button.show();
  }

  /**
   *
   * @param {number} width
   */
  setWidth(width) {
    this.sidebarBox.setWidth(width);
    this.sidebar.setWidth(width);
    this.updateAbsolutePosition();
  }

  /**
   *
   * @returns {number}
   */
  getSidebarWidth() {
    return this.sidebar.getWidth();
  }

  /**
   *
   * @returns {number}
   */
  getSidebarBoxWidth() {
    return this.sidebarBox.getWidth();
  }

  /**
   *
   * @param {string} position
   */
  setPosition(position) {
    this.sidebar.setPosition(position);
    if (
      (position === "right" && !SidebarControllerWrapper._positionStart) ||
      (position === "left" && SidebarControllerWrapper._positionStart)
    ) {
      SidebarControllerWrapper.reversePosition();
    }
    this.updateAbsolutePosition();
    this.sidebarCollapseButton.setAttribute("position", position);
  }

  /**
   *
   * @returns {string}
   */
  getPosition() {
    return this.sidebar.getPosition();
  }

  /**
   *
   * @param {boolean} value
   */
  setHideToolbar(value) {
    value ? this.sidebarToolbar.hide() : this.sidebarToolbar.show();
  }

  /**
   *
   * @returns {string}
   */
  getUnpinnedPadding() {
    const value = this.root.getProperty("--sb2-box-unpinned-padding");
    return value.match(/var\(--space-([^)]+)\)/)[1];
  }

  /**
   *
   * @param {string} value
   */
  setUnpinnedPadding(value) {
    document.documentElement.style.setProperty(
      "--sb2-box-unpinned-padding",
      `var(--space-${value})`,
    );
    this.updateAbsolutePosition();
  }

  updateAbsolutePosition() {
    const sidebarMainWidth =
      SidebarControllers.sidebarMainController.getWidth();
    this.getPosition() === "left"
      ? this.setAbsoluteLeft(sidebarMainWidth)
      : this.setAbsoluteRight(sidebarMainWidth);
  }

  /**
   *
   * @param {string} value
   */
  setAbsoluteRight(value) {
    this.sidebarBox.setProperty("left", "unset");
    this.sidebarBox.setProperty("right", value);
  }

  /**
   *
   * @param {string} value
   */
  setAbsoluteLeft(value) {
    this.sidebarBox.setProperty("left", value);
    this.sidebarBox.setProperty("right", "unset");
  }

  /**
   *
   * @returns {string}
   */
  getContainerBorder() {
    return this.containerBorder;
  }

  /**
   *
   * @param {string} value
   */
  setContainerBorder(value) {
    this.containerBorder = value;
    changeContainerBorder(value);
  }

  /**
   *
   * @param {boolean} value
   */
  setAutoHideSidebar(value) {
    this.autoHideSidebar = value;
    this.sidebarCollapseButton.setDisabled(value);
    this.sidebarCollapseButton.setOpen(
      !SidebarControllers.collapseController.collapsed(),
    );
  }

  /**
   *
   * @param {SidebarSettings} settings
   */
  loadSettings(settings) {
    this.setPosition(settings.position);
    SidebarControllers.sidebarMainController.setPadding(settings.padding);
    SidebarControllers.webPanelNewController.setNewWebPanelPosition(
      settings.newWebPanelPosition,
    );
    this.setUnpinnedPadding(settings.unpinnedPadding);
    this.hideInPopupWindows = settings.hideInPopupWindows;
    this.autoHideBackButton = settings.autoHideBackButton;
    this.autoHideForwardButton = settings.autoHideForwardButton;
    this.setContainerBorder(settings.containerBorder);
    this.setAutoHideSidebar(settings.autoHideSidebar);
    this.hideSidebarAnimated = settings.hideSidebarAnimated;
  }

  /**
   *
   * @returns {SidebarSettings}
   */
  dumpSettings() {
    return new SidebarSettings(
      this.getPosition(),
      SidebarControllers.sidebarMainController.getPadding(),
      SidebarControllers.webPanelNewController.getNewWebPanelPosition(),
      this.getUnpinnedPadding(),
      this.hideInPopupWindows,
      this.autoHideBackButton,
      this.autoHideForwardButton,
      this.containerBorder,
      this.autoHideSidebar,
      this.hideSidebarAnimated,
    );
  }

  saveSettings() {
    this.dumpSettings().save();
  }
}

```

## File: `JS/second_sidebar/controllers/sidebar_main.mjs`

```mjs
import { SidebarControllers } from "../sidebar_controllers.mjs";
import { SidebarElements } from "../sidebar_elements.mjs";
import { XULElement } from "../xul/base/xul_element.mjs";
import { gCustomizeModeWrapper } from "../wrappers/g_customize_mode.mjs";
import { gNavToolboxWrapper } from "../wrappers/g_nav_toolbox.mjs";
import { isRightMouseButton } from "../utils/buttons.mjs";
import { parseFunction } from "../utils/parsers.mjs";

export class SidebarMainController {
  constructor() {
    this.sidebarMain = SidebarElements.sidebarMain;
    this.sidebarCollapseButton = SidebarElements.sidebarCollapseButton;
    this.sidebarMainMenuPopup = SidebarElements.sidebarMainMenuPopup;
    this.root = new XULElement({ element: document.documentElement });
    this.#setupGlobalListeners();
    this.#setupListeners();
  }

  #setupGlobalListeners() {
    fetch("chrome://browser/content/navigator-toolbox.js").then((response) => {
      response.text().then((moduleSource) => {
        const matches = moduleSource.matchAll(/\s{4}function.*?^\s{4}}/gms);
        for (const match of matches) {
          const functionSource = match[0];
          const parsedFunction = parseFunction(functionSource);
          const eventName = parsedFunction.name
            .toLowerCase()
            .replace(/^on/, "");
          this.sidebarMain.addEventListener(eventName, parsedFunction.func);
        }
      });
    });
  }

  #setupListeners() {
    this.sidebarMain.addEventListener("mousedown", (event) => {
      if (isRightMouseButton(event)) {
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
      }
    });

    this.sidebarMainMenuPopup.listenSettingsItemClick(() => {
      SidebarControllers.sidebarMainSettingsController.openPopup(
        this.mouseX,
        this.mouseY,
      );
    });

    this.sidebarMainMenuPopup.listenCustomizeItemClick(() => {
      gCustomizeModeWrapper.enter();
    });

    const browser = new XULElement({
      element: document.getElementById("browser"),
    });
    gNavToolboxWrapper.addEventListener("customizationready", () => {
      browser.show();
    });
    gNavToolboxWrapper.addEventListener("aftercustomization", () => {
      const springs = document.querySelectorAll("#sb2-main toolbarspring");
      for (const spring of springs) {
        spring.removeAttribute("context");
      }
    });
  }

  /**
   *
   * @returns {string}
   */
  getPadding() {
    const value = this.root.getProperty("--sb2-main-padding");
    return value.match(/var\(--space-([^)]+)\)/)[1];
  }

  /**
   *
   * @param {string} value
   */
  setPadding(value) {
    this.root.setProperty("--sb2-main-padding", `var(--space-${value})`);
    SidebarControllers.sidebarController.updateAbsolutePosition();
  }

  /**
   *
   * @returns {string}
   */
  getWidth() {
    return Math.round(this.sidebarMain.getBoundingClientRect().width) + "px";
  }

  /**
   *
   * @returns {boolean}
   */
  collapsed() {
    const zeros = ["0px", ""];
    const marginRight = this.sidebarMain.getProperty("margin-right");
    const marginLeft = this.sidebarMain.getProperty("margin-left");
    return !zeros.includes(marginRight) || !zeros.includes(marginLeft);
  }

  collapse() {
    const position = SidebarControllers.sidebarController.getPosition();
    this.sidebarMain.setProperty(
      position === "right" ? "margin-right" : "margin-left",
      -this.sidebarMain.getBoundingClientRect().width + "px",
    );
    this.sidebarCollapseButton.setOpen(false);
  }

  uncollapse() {
    this.sidebarMain.setProperty("margin-right", "0px");
    this.sidebarMain.setProperty("margin-left", "0px");
    this.sidebarCollapseButton.setOpen(true);
  }
}

```

## File: `JS/second_sidebar/controllers/sidebar_main_settings.mjs`

```mjs
import { SidebarEvents, sendEvents } from "./events.mjs";

import { SidebarControllers } from "../sidebar_controllers.mjs";
import { SidebarElements } from "../sidebar_elements.mjs";

export class SidebarMainSettingsController {
  constructor() {
    this.sidebarMainPopupSettings = SidebarElements.sidebarMainPopupSettings;
    this.#setupListeners();
  }

  #setupListeners() {
    this.sidebarMainPopupSettings.listenChanges({
      position: (value) =>
        sendEvents(SidebarEvents.EDIT_SIDEBAR_POSITION, { value }),
      padding: (value) =>
        sendEvents(SidebarEvents.EDIT_SIDEBAR_PADDING, { value }),
      newWebPanelPosition: (value) =>
        sendEvents(SidebarEvents.EDIT_SIDEBAR_NEW_WEB_PANEL_POSITION, {
          value,
        }),
      unpinnedPadding: (value) =>
        sendEvents(SidebarEvents.EDIT_SIDEBAR_UNPINNED_PADDING, { value }),
      hideInPopupWindows: (value) =>
        sendEvents(SidebarEvents.EDIT_SIDEBAR_HIDE_IN_POPUP_WINDOWS, { value }),
      autoHideBackButton: (value) =>
        sendEvents(SidebarEvents.EDIT_SIDEBAR_AUTO_HIDE_BACK_BUTTON, { value }),
      autoHideForwardButton: (value) =>
        sendEvents(SidebarEvents.EDIT_SIDEBAR_AUTO_HIDE_FORWARD_BUTTON, {
          value,
        }),
      containerBorder: (value) =>
        sendEvents(SidebarEvents.EDIT_SIDEBAR_CONTAINER_BORDER, { value }),
      autoHideSidebar: (value) =>
        sendEvents(SidebarEvents.EDIT_SIDEBAR_AUTO_HIDE, { value }),
      hideSidebarAnimated: (value) =>
        sendEvents(SidebarEvents.EDIT_SIDEBAR_AUTO_HIDE_ANIMATED, { value }),
    });

    this.sidebarMainPopupSettings.listenCancelButtonClick(() =>
      this.sidebarMainPopupSettings.hidePopup(),
    );

    this.sidebarMainPopupSettings.listenSaveButtonClick(() => {
      sendEvents(SidebarEvents.SAVE_SIDEBAR);
      this.sidebarMainPopupSettings.hidePopup();
    });
  }

  /**
   *
   * @param {number} screenX
   * @param {number} screenY
   */
  openPopup(screenX, screenY) {
    this.sidebarMainPopupSettings.openPopupAtScreen(
      screenX,
      screenY,
      SidebarControllers.sidebarController.dumpSettings(),
    );
  }
}

```

## File: `JS/second_sidebar/controllers/sidebar_splitters.mjs`

```mjs
import { SidebarEvents, sendEvents } from "./events.mjs";

import { SidebarControllers } from "../sidebar_controllers.mjs";
import { SidebarElements } from "../sidebar_elements.mjs";

export class SidebarSplittersController {
  constructor() {
    this.sidebarSplitterUnpinned = SidebarElements.sidebarSplitterUnpinned;
    this.sidebarSplitterPinned = SidebarElements.sidebarSplitterPinned;

    this.#setupListeners();
  }

  #setupListeners() {
    /**@param {number} width */
    const changeWidth = (width) => {
      const webPanelController =
        SidebarControllers.webPanelsController.getActive();
      sendEvents(SidebarEvents.EDIT_SIDEBAR_WIDTH, {
        uuid: webPanelController.getUUID(),
        width,
      });
      SidebarControllers.webPanelsController.saveSettings();
    };
    this.sidebarSplitterUnpinned.listenWidthChange(() =>
      changeWidth(SidebarControllers.sidebarController.getSidebarWidth()),
    );
    this.sidebarSplitterPinned.listenWidthChange(() =>
      changeWidth(SidebarControllers.sidebarController.getSidebarBoxWidth()),
    );
  }
}

```

## File: `JS/second_sidebar/controllers/web_panel.mjs`

```mjs
import { FALLBACK_ICON, useAvailableIcon } from "../utils/icons.mjs";
/* eslint-disable no-unused-vars */
import { WebPanelEvents, sendEvent } from "./events.mjs";

import { ChromeUtilsWrapper } from "../wrappers/chrome_utils.mjs";
import { SidebarControllers } from "../sidebar_controllers.mjs";
import { SidebarElements } from "../sidebar_elements.mjs";
import { WebPanelButton } from "../xul/web_panel_button.mjs";
import { WebPanelSettings } from "../settings/web_panel_settings.mjs";
import { WebPanelTab } from "../xul/web_panel_tab.mjs";
import { ZoomManagerWrapper } from "../wrappers/zoom_manager.mjs";

/* eslint-enable no-unused-vars */

const DEFAULT_ZOOM = 1;

export class WebPanelController {
  #progressListener = this.#createProgressListener();
  /**@type {WebPanelSettings} */
  #settings;
  /**@type {WebPanelButton} */
  #button;
  /**@type {WebPanelTab?} */
  #tab = null;
  /**@type {number} */
  #interval = null;

  /**
   *
   * @param {WebPanelSettings} settings
   * @param {object?} params
   * @param {boolean?} params.loaded
   * @param {string?} params.position
   */
  constructor(settings, { loaded = false, position = null } = {}) {
    this.webPanelsBrowser = SidebarElements.webPanelsBrowser;

    this.#settings = settings;
    this.#button = this.#createWebPanelButton(settings, loaded, position);

    if (loaded) {
      this.load();
    }
  }

  #createProgressListener() {
    const callback = () => {
      if (this.isActive()) {
        const title = this.#tab.linkedBrowser.getTitle();
        const canGoBack = this.#tab.linkedBrowser.canGoBack();
        const canGoForward = this.#tab.linkedBrowser.canGoForward();
        SidebarControllers.sidebarController.setToolbarTitle(title);
        SidebarControllers.sidebarController.setToolbarBackButtonDisabled(
          !canGoBack,
        );
        SidebarControllers.sidebarController.setToolbarForwardButtonDisabled(
          !canGoForward,
        );
      }
    };
    return {
      QueryInterface: ChromeUtilsWrapper.generateQI([
        "nsIWebProgressListener",
        "nsIWebProgressListener2",
        "nsISupportsWeakReference",
        "nsIXULBrowserWindow",
      ]),
      onLocationChange: callback,
      onStateChange: callback,
      onStatusChange: callback,
    };
  }

  /**
   *
   * @param {WebPanelSettings} settings
   * @param {boolean} loaded
   * @param {string} position
   */
  #createWebPanelButton(settings, loaded, position) {
    const button = new WebPanelButton(settings, position);
    button.setUnloaded(!loaded);

    button.listenClick((event) => {
      sendEvent(WebPanelEvents.SWITCH_WEB_PANEL, {
        uuid: this.#settings.uuid,
        event,
      });
    });

    return button;
  }

  /**
   * @returns {WebPanelButton}
   */
  get button() {
    return this.#button;
  }

  /**
   *
   * @returns {string}
   */
  getUUID() {
    return this.#settings.uuid;
  }

  /**
   *
   * @returns {string}
   */
  getURL() {
    return this.#settings.url;
  }

  /**
   *
   * @param {string} value
   */
  setURL(value) {
    this.#settings.url = value;
    this.#button.setLabel(value).setTooltipText(value);
  }

  /**
   *
   * @param {string} userContextId
   */
  setUserContextId(userContextId) {
    this.#settings.userContextId = userContextId;

    if (!this.isUnloaded()) {
      const isActive = this.isActive();
      this.unload();
      this.load();
      if (isActive) {
        this.webPanelsBrowser.selectWebPanelTab(this.#tab);
      }
    }

    this.#button.setUserContextId(userContextId);
  }

  /**
   *
   * @returns {string}
   */
  getFaviconURL() {
    return this.#settings.faviconURL;
  }

  /**
   *
   * @param {string} faviconURL
   */
  setWebPanelFaviconURL(faviconURL) {
    this.#settings.faviconURL = faviconURL;
  }

  /**
   *
   * @param {string} faviconURL
   */
  setWebPanelButtonFaviconURL(faviconURL) {
    useAvailableIcon(faviconURL, FALLBACK_ICON).then((url) =>
      this.#button.setIcon(url),
    );
  }

  /**
   *
   * @returns {string}
   */
  getCurrentUrl() {
    return this.#tab.linkedBrowser.getCurrentUrl();
  }

  switchWebPanel() {
    const activeTab = this.webPanelsBrowser.getActiveWebPanelTab();

    if (activeTab.uuid === this.getUUID()) {
      // Select empty web panel tab
      this.webPanelsBrowser.deselectWebPanelTab();
    } else {
      // Create web panel tab if it was not loaded yet
      if (this.isUnloaded()) {
        this.load();
      }
      // Select web panel tab
      this.webPanelsBrowser.selectWebPanelTab(this.#tab);
    }
  }

  open() {
    // Configure web panel and button
    this.#button.setOpen(true).setUnloaded(false);
    this.setZoom(this.#settings.zoom);

    // Open sidebar if it was closed and configure
    SidebarControllers.sidebarController.open(
      this.#settings.pinned,
      this.#settings.width,
      this.#tab.linkedBrowser.canGoBack(),
      this.#tab.linkedBrowser.canGoForward(),
      this.#tab.linkedBrowser.getTitle(),
      this.#settings.hideToolbar,
    );
  }

  close() {
    this.#button.setOpen(false);
    if (this.#settings.unloadOnClose) {
      this.unload();
    }
  }

  load() {
    this.#tab = this.webPanelsBrowser.addWebPanelTab(
      this.#settings,
      this.#progressListener,
    );
    this.#tab.addTabCloseListener(() => this.unload(false));
    this.#tab.addEventListener("TabAttrModified", () => {
      this.#button.setSoundIcon(this.#tab.soundPlaying, this.#tab.muted);
    });
    this.#button.setUnloaded(false);
    this.#startTimer();
  }

  /**
   *
   * @param {boolean} force
   */
  unload(force = true) {
    this.#stopTimer();
    const activeWebPanelController =
      SidebarControllers.webPanelsController.getActive();
    if (activeWebPanelController?.getUUID() === this.getUUID()) {
      this.webPanelsBrowser.deselectWebPanelTab();
    }

    if (this.#tab && force) {
      this.webPanelsBrowser.removeWebPanelTab(this.#tab);
    }

    this.#button
      .setSoundIcon(false, false)
      .setNotificationBadge(0)
      .setOpen(false)
      .setUnloaded(true);
    this.#tab = null;
  }

  #startTimer() {
    this.#stopTimer();
    if (this.#settings.periodicReload == 0) {
      return;
    }
    this.#log("start timer", this.#settings.periodicReload);
    this.#interval = setInterval(() => {
      this.#log("periodic reload");
      this.reload();
    }, this.#settings.periodicReload);
  }

  #stopTimer() {
    if (this.#interval) {
      this.#log("stop timer");
      clearInterval(this.#interval);
    }
  }

  /**
   *
   * @returns {boolean}
   */
  isUnloaded() {
    return this.#tab === null;
  }

  reload() {
    this.#tab.linkedBrowser.reload();
    this.setWebPanelButtonFaviconURL(this.#settings.faviconURL);
  }

  goBack() {
    this.#tab.linkedBrowser.goBack();
  }

  goForward() {
    this.#tab.linkedBrowser.goForward();
  }

  goHome() {
    this.#tab.linkedBrowser.go(this.#settings.url);
  }

  /**
   *
   * @param {boolean} value
   */
  setMobile(value) {
    this.#settings.mobile = value;
    if (!this.isUnloaded()) {
      if (value) {
        this.#tab.linkedBrowser.setMobileUserAgent();
      } else {
        this.#tab.linkedBrowser.unsetMobileUserAgent();
      }
      this.goHome();
    }
  }

  /**
   *
   * @returns {number}
   */
  getZoom() {
    return this.#settings.zoom;
  }

  zoomOut() {
    const i =
      ZoomManagerWrapper.zoomValues.indexOf(
        ZoomManagerWrapper.snap(this.getZoom()),
      ) - 1;
    if (i >= 0) {
      const zoom = ZoomManagerWrapper.zoomValues[i];
      this.setZoom(zoom);
    }
  }

  zoomIn() {
    const i =
      ZoomManagerWrapper.zoomValues.indexOf(
        ZoomManagerWrapper.snap(this.getZoom()),
      ) + 1;
    if (i < ZoomManagerWrapper.zoomValues.length) {
      const zoom = ZoomManagerWrapper.zoomValues[i];
      this.setZoom(zoom);
    }
  }

  /**
   *
   * @param {number} zoom
   */
  setZoom(zoom) {
    this.#settings.zoom = zoom;
    this.#tab?.linkedBrowser?.setZoom(zoom);
  }

  resetZoom() {
    this.setZoom(DEFAULT_ZOOM);
  }

  /**
   *
   * @param {boolean} value
   */
  setLoadOnStartup(value) {
    this.#settings.loadOnStartup = value;
  }

  /**
   *
   * @returns {boolean}
   */
  getUnloadOnClose() {
    return this.#settings.unloadOnClose;
  }

  /**
   *
   * @param {boolean} value
   */
  setUnloadOnClose(value) {
    this.#settings.unloadOnClose = value;
  }

  /**
   *
   * @param {boolean} value
   */
  setHideToolbar(value) {
    this.#settings.hideToolbar = value;
  }

  /**
   *
   * @param {boolean} value
   */
  setHideSoundIcon(value) {
    this.#settings.hideSoundIcon = value;
    this.#button.hideSoundIcon(value);
  }

  /**
   *
   * @param {boolean} value
   */
  setHideNotificationBadge(value) {
    this.#settings.hideNotificationBadge = value;
    this.#button.hideNotificationBadge(value);
  }

  /**
   *
   * @param {number} value
   */
  setPeriodicReload(value) {
    this.#settings.periodicReload = value;
    if (!this.isUnloaded()) {
      this.#startTimer();
    }
  }

  /**
   *
   * @param {number} width
   */
  setWidth(width) {
    this.#settings.width = width;
  }

  /**
   *
   * @returns {boolean}
   */
  pinned() {
    return this.#settings.pinned;
  }

  pin() {
    this.#settings.pinned = true;
  }

  unpin() {
    this.#settings.pinned = false;
  }

  /**
   *
   * @param {string} url
   */
  go(url) {
    this.#tab.linkedBrowser.go(url);
  }

  /**
   *
   * @returns {boolean}
   */
  isActive() {
    return this.#tab && this.#tab.selected;
  }

  /**
   *
   * @returns {boolean}
   */
  isMuted() {
    return this.#tab.muted;
  }

  toggleMuteAudio() {
    this.#tab.toggleMuteAudio();
  }

  remove() {
    if (this.#tab) {
      this.webPanelsBrowser.removeWebPanelTab(this.#tab);
    }
    this.#button.remove();
  }

  /**
   *
   * @returns {WebPanelSettings}
   */
  dumpSettings() {
    return new WebPanelSettings(
      this.#settings.uuid,
      this.#settings.url,
      this.#settings.faviconURL,
      {
        pinned: this.#settings.pinned,
        width: this.#settings.width,
        mobile: this.#settings.mobile,
        zoom: this.#settings.zoom,
        loadOnStartup: this.#settings.loadOnStartup,
        unloadOnClose: this.#settings.unload,
        hideToolbar: this.#settings.hideToolbar,
        userContextId: this.#settings.userContextId,
        periodicReload: this.#settings.periodicReload,
        hideSoundIcon: this.#settings.hideSoundIcon,
        hideNotificationBadge: this.#settings.hideNotificationBadge,
      },
    );
  }

  /**
   *
   * @param {string} message
   */
  #log(message) {
    console.log(`Web panel ${this.getUUID()}:`, message);
  }
}

```

## File: `JS/second_sidebar/controllers/web_panel_delete.mjs`

```mjs
/* eslint-disable no-unused-vars */
import { WebPanelEvents, sendEvents } from "./events.mjs";

import { SidebarElements } from "../sidebar_elements.mjs";
import { WebPanelController } from "./web_panel.mjs";

/* eslint-enable no-unused-vars */

export class WebPanelDeleteController {
  constructor() {
    this.webPanelPopupDelete = SidebarElements.webPanelPopupDelete;
    this.#setupListeners();
  }

  #setupListeners() {
    this.webPanelPopupDelete.listenCancelButtonClick(() => this.hidePopup());

    this.webPanelPopupDelete.listenDeleteButtonClick((uuid) => {
      sendEvents(WebPanelEvents.DELETE_WEB_PANEL, { uuid });
      this.hidePopup();
    });
  }

  /**
   *
   * @param {WebPanelController} webPanelController
   */
  openPopup(webPanelController) {
    this.webPanelPopupDelete.openPopup(webPanelController);
  }

  hidePopup() {
    this.webPanelPopupDelete.hidePopup();
  }
}

```

## File: `JS/second_sidebar/controllers/web_panel_edit.mjs`

```mjs
/* eslint-disable no-unused-vars */
import { WebPanelEvents, sendEvents } from "./events.mjs";

import { SidebarControllers } from "../sidebar_controllers.mjs";
import { SidebarElements } from "../sidebar_elements.mjs";
import { WebPanelController } from "./web_panel.mjs";

/* eslint-enable no-unused-vars */

export class WebPanelEditController {
  constructor() {
    this.webPanelPopupEdit = SidebarElements.webPanelPopupEdit;
    this.#setupListeners();
  }

  #setupListeners() {
    this.webPanelPopupEdit.listenChanges({
      url: (uuid, url, timeout = 0) => {
        sendEvents(WebPanelEvents.EDIT_WEB_PANEL_URL, {
          uuid,
          url,
          timeout,
        });
      },
      faviconURL: (uuid, faviconURL, timeout = 0) => {
        sendEvents(WebPanelEvents.EDIT_WEB_PANEL_FAVICON_URL, {
          uuid,
          faviconURL,
          timeout,
        });
      },
      pinned: (uuid, pinned) => {
        sendEvents(WebPanelEvents.EDIT_WEB_PANEL_PINNED, {
          uuid,
          pinned,
        });
      },
      userContextId: (uuid, userContextId) => {
        sendEvents(WebPanelEvents.EDIT_WEB_PANEL_USER_CONTEXT_ID, {
          uuid,
          userContextId,
        });
      },
      mobile: (uuid, mobile) => {
        sendEvents(WebPanelEvents.EDIT_WEB_PANEL_MOBILE, {
          uuid,
          mobile,
        });
      },
      loadOnStartup: (uuid, loadOnStartup) => {
        sendEvents(WebPanelEvents.EDIT_WEB_PANEL_LOAD_ON_STARTUP, {
          uuid,
          loadOnStartup,
        });
      },
      unloadOnClose: (uuid, unloadOnClose) => {
        sendEvents(WebPanelEvents.EDIT_WEB_PANEL_UNLOAD_ON_CLOSE, {
          uuid,
          unloadOnClose,
        });
      },
      hideToolbar: (uuid, hideToolbar) => {
        sendEvents(WebPanelEvents.EDIT_WEB_PANEL_HIDE_TOOLBAR, {
          uuid,
          hideToolbar,
        });
      },
      hideSoundIcon: (uuid, hideSoundIcon) => {
        sendEvents(WebPanelEvents.EDIT_WEB_PANEL_HIDE_SOUND_ICON, {
          uuid,
          hideSoundIcon,
        });
      },
      hideNotificationBadge: (uuid, hideNotificationBadge) => {
        sendEvents(WebPanelEvents.EDIT_WEB_PANEL_HIDE_NOTIFICATION_BADGE, {
          uuid,
          hideNotificationBadge,
        });
      },
      periodicReload: (uuid, periodicReload) => {
        sendEvents(WebPanelEvents.EDIT_WEB_PANEL_PERIODIC_RELOAD, {
          uuid,
          periodicReload: Number(periodicReload),
        });
      },
      zoomOut: (uuid) => {
        sendEvents(WebPanelEvents.EDIT_WEB_PANEL_ZOOM_OUT, {
          uuid,
        });
        const webPanelController =
          SidebarControllers.webPanelsController.get(uuid);
        return webPanelController.getZoom();
      },
      zoomIn: (uuid) => {
        sendEvents(WebPanelEvents.EDIT_WEB_PANEL_ZOOM_IN, {
          uuid,
        });
        const webPanelController =
          SidebarControllers.webPanelsController.get(uuid);
        return webPanelController.getZoom();
      },
      zoom: (uuid, value) => {
        sendEvents(WebPanelEvents.EDIT_WEB_PANEL_ZOOM, {
          uuid,
          value,
        });
        const webPanelController =
          SidebarControllers.webPanelsController.get(uuid);
        return webPanelController.getZoom();
      },
    });

    this.webPanelPopupEdit.listenCancelButtonClick(() => this.hidePopup());

    this.webPanelPopupEdit.listenSaveButtonClick(() => {
      sendEvents(WebPanelEvents.SAVE_WEB_PANELS);
      this.hidePopup();
    });
  }

  /**
   *
   * @param {WebPanelController} webPanelController
   */
  openPopup(webPanelController) {
    this.webPanelPopupEdit.openPopup(webPanelController);
  }

  hidePopup() {
    this.webPanelPopupEdit.hidePopup();
  }
}

```

## File: `JS/second_sidebar/controllers/web_panel_more.mjs`

```mjs
import { OPEN_URL_IN, openTrustedLinkInWrapper } from "../wrappers/global.mjs";
import { WebPanelEvents, sendEvents } from "./events.mjs";

import { ClipboardHelperWrapper } from "../wrappers/clipboard_helper.mjs";
import { SidebarControllers } from "../sidebar_controllers.mjs";
import { SidebarElements } from "../sidebar_elements.mjs";

export class WebPanelMoreController {
  constructor() {
    this.webPanelPopupMore = SidebarElements.webPanelPopupMore;
    this.#setupListeners();
  }

  #setupListeners() {
    this.webPanelPopupMore.listenPopupShowing(() => {
      const webPanelController =
        SidebarControllers.webPanelsController.getActive();
      this.webPanelPopupMore.setDefaults(webPanelController.dumpSettings());
    });

    this.webPanelPopupMore.listenOpenInNewTabButtonClick((event, uuid) => {
      const webPanelController =
        SidebarControllers.webPanelsController.get(uuid);
      openTrustedLinkInWrapper(
        webPanelController.getCurrentUrl(),
        event.ctrlKey ? OPEN_URL_IN.BACKGROUND_TAB : OPEN_URL_IN.TAB,
      );
    });

    this.webPanelPopupMore.listenCopyPageUrlButtonClick((uuid) => {
      const webPanelController =
        SidebarControllers.webPanelsController.get(uuid);
      ClipboardHelperWrapper.copyString(webPanelController.getCurrentUrl());
    });

    this.webPanelPopupMore.listenMobileButtonClick((uuid, mobile) => {
      sendEvents(WebPanelEvents.EDIT_WEB_PANEL_MOBILE, {
        uuid,
        mobile,
      });
      sendEvents(WebPanelEvents.SAVE_WEB_PANELS);
    });

    this.webPanelPopupMore.listenZoomOutButtonClick((uuid) => {
      sendEvents(WebPanelEvents.EDIT_WEB_PANEL_ZOOM_OUT, {
        uuid,
      });
      sendEvents(WebPanelEvents.SAVE_WEB_PANELS);

      const webPanelController =
        SidebarControllers.webPanelsController.get(uuid);
      return webPanelController.getZoom();
    });

    this.webPanelPopupMore.listenZoomInButtonClick((uuid) => {
      sendEvents(WebPanelEvents.EDIT_WEB_PANEL_ZOOM_IN, {
        uuid,
      });
      sendEvents(WebPanelEvents.SAVE_WEB_PANELS);

      const webPanelController =
        SidebarControllers.webPanelsController.get(uuid);
      return webPanelController.getZoom();
    });

    this.webPanelPopupMore.listenResetZoomButtonClick((uuid) => {
      sendEvents(WebPanelEvents.EDIT_WEB_PANEL_ZOOM, {
        uuid,
        value: 1,
      });
      sendEvents(WebPanelEvents.SAVE_WEB_PANELS);

      const webPanelController =
        SidebarControllers.webPanelsController.get(uuid);
      return webPanelController.getZoom();
    });
  }
}

```

## File: `JS/second_sidebar/controllers/web_panel_new.mjs`

```mjs
import {
  WebPanelEvents,
  listenEvent,
  sendEvent,
  sendEvents,
} from "./events.mjs";

import { SidebarElements } from "../sidebar_elements.mjs";
import { WindowWrapper } from "../wrappers/window.mjs";
import { isLeftMouseButton } from "../utils/buttons.mjs";

export class WebPanelNewController {
  constructor() {
    this.webPanelNewButton = SidebarElements.webPanelNewButton;
    this.webPanelPopupNew = SidebarElements.webPanelPopupNew;

    listenEvent(WebPanelEvents.OPEN_NEW_WEB_PANEL_POPUP, () => {
      this.openPopup();
    });

    this.webPanelNewButton.listenClick((event) => {
      if (isLeftMouseButton(event)) {
        sendEvent(WebPanelEvents.OPEN_NEW_WEB_PANEL_POPUP);
      }
    });

    this.webPanelPopupNew.listenSaveButtonClick(async (url, userContextId) => {
      this.createWebPanel(url, userContextId);
      this.hidePopup();
    });

    this.webPanelPopupNew.listenCancelButtonClick(() => {
      this.hidePopup();
    });
  }

  /**
   *
   * @param {string} url
   * @param {number} userContextId
   */
  createWebPanel(url, userContextId) {
    const uuid = crypto.randomUUID();
    sendEvents(WebPanelEvents.CREATE_WEB_PANEL, {
      uuid,
      url,
      userContextId,
      newWebPanelPosition: this.newWebPanelPosition,
    });
  }

  openPopup() {
    let suggest = "https://";
    const currentURI = new WindowWrapper().gBrowser.currentURI;

    if (["http", "https"].includes(currentURI.scheme)) {
      suggest = currentURI.spec;
    }

    this.webPanelPopupNew.openPopup(this.webPanelNewButton.button, suggest);
  }

  hidePopup() {
    this.webPanelPopupNew.hidePopup();
  }

  /**
   *
   * @returns {string}
   */
  getNewWebPanelPosition() {
    return this.newWebPanelPosition;
  }

  /**
   *
   * @param {string} value
   */
  setNewWebPanelPosition(value) {
    this.newWebPanelPosition = value;
  }
}

```

## File: `JS/second_sidebar/controllers/web_panels.mjs`

```mjs
import { WebPanelEvents, listenEvent } from "./events.mjs";
import { isLeftMouseButton, isMiddleMouseButton } from "../utils/buttons.mjs";

import { NetUtilWrapper } from "../wrappers/net_utils.mjs";
import { SidebarControllers } from "../sidebar_controllers.mjs";
import { SidebarElements } from "../sidebar_elements.mjs";
import { WebPanelController } from "./web_panel.mjs";
import { WebPanelSettings } from "../settings/web_panel_settings.mjs";
import { WebPanelsSettings } from "../settings/web_panels_settings.mjs";
import { WindowWrapper } from "../wrappers/window.mjs";
import { fetchIconURL } from "../utils/icons.mjs";
import { gCustomizeModeWrapper } from "../wrappers/g_customize_mode.mjs";
import { parseNotifications } from "../utils/string.mjs";

export class WebPanelsController {
  constructor() {
    this.sidebarMain = SidebarElements.sidebarMain;
    this.sidebarBox = SidebarElements.sidebarBox;
    this.webPanelsBrowser = SidebarElements.webPanelsBrowser;
    this.webPanelMenuPopup = SidebarElements.webPanelMenuPopup;

    /**@type {Map<string, WebPanelController>} */
    this.webPanelControllers = new Map();
    this.#setupListeners();
  }

  #setupListeners() {
    this.webPanelMenuPopup.listenUnloadItemClick((webPanelController) => {
      if (webPanelController.isActive()) {
        SidebarControllers.sidebarController.close();
      }
      webPanelController.unload();
    });

    this.webPanelMenuPopup.listenMuteItemClick((webPanelController) => {
      webPanelController.toggleMuteAudio();
    });

    this.webPanelMenuPopup.listenEditItemClick((webPanelController) => {
      SidebarControllers.webPanelEditController.openPopup(webPanelController);
    });

    this.webPanelMenuPopup.listenDeleteItemClick((webPanelController) => {
      SidebarControllers.webPanelDeleteController.openPopup(webPanelController);
    });

    this.webPanelMenuPopup.listenCustomizeItemClick(() => {
      gCustomizeModeWrapper.enter();
    });

    listenEvent(WebPanelEvents.CREATE_WEB_PANEL, async (event) => {
      const uuid = event.detail.uuid;
      const url = event.detail.url;
      const userContextId = event.detail.userContextId;
      const newWebPanelPosition = event.detail.newWebPanelPosition;
      const isActiveWindow = event.detail.isActiveWindow;

      const webPanelController = await this.createWebPanelController(
        uuid,
        url,
        userContextId,
        newWebPanelPosition,
        isActiveWindow,
      );
      if (isActiveWindow) {
        webPanelController.switchWebPanel();
      }
    });

    listenEvent(WebPanelEvents.EDIT_WEB_PANEL_URL, (event) => {
      const uuid = event.detail.uuid;
      const url = event.detail.url;
      const timeout = event.detail.timeout;

      const webPanelController = this.get(uuid);
      const oldUrl = webPanelController.getURL();
      webPanelController.setURL(url);

      clearTimeout(this.urlTimeout);
      this.urlTimeout = setTimeout(() => {
        if (!webPanelController.isUnloaded() && oldUrl !== url) {
          webPanelController.go(url);
        }
      }, timeout);
    });

    listenEvent(WebPanelEvents.EDIT_WEB_PANEL_FAVICON_URL, (event) => {
      const uuid = event.detail.uuid;
      const faviconURL = event.detail.faviconURL;
      const timeout = event.detail.timeout;

      const webPanelController = this.get(uuid);
      const oldFaviconURL = webPanelController.getFaviconURL();
      webPanelController.setWebPanelFaviconURL(faviconURL);

      clearTimeout(this.faviconURLTimeout);
      this.faviconURLTimeout = setTimeout(() => {
        if (oldFaviconURL !== faviconURL) {
          webPanelController.setWebPanelButtonFaviconURL(faviconURL);
        }
      }, timeout);
    });

    listenEvent(WebPanelEvents.EDIT_WEB_PANEL_PINNED, (event) => {
      const uuid = event.detail.uuid;
      const pinned = event.detail.pinned;

      const webPanelController = this.get(uuid);
      pinned ? webPanelController.pin() : webPanelController.unpin();
      if (webPanelController.isActive()) {
        pinned
          ? SidebarControllers.sidebarController.pin()
          : SidebarControllers.sidebarController.unpin();
      }
    });

    listenEvent(WebPanelEvents.EDIT_WEB_PANEL_USER_CONTEXT_ID, (event) => {
      const uuid = event.detail.uuid;
      const userContextId = event.detail.userContextId;
      const webPanelController = this.get(uuid);
      webPanelController.setUserContextId(userContextId);
    });

    listenEvent(WebPanelEvents.EDIT_WEB_PANEL_MOBILE, (event) => {
      const uuid = event.detail.uuid;
      const mobile = event.detail.mobile;

      const webPanelController = this.get(uuid);
      webPanelController.setMobile(mobile);
    });

    listenEvent(WebPanelEvents.EDIT_WEB_PANEL_LOAD_ON_STARTUP, (event) => {
      const uuid = event.detail.uuid;
      const loadOnStartup = event.detail.loadOnStartup;

      const webPanelController = this.get(uuid);
      webPanelController.setLoadOnStartup(loadOnStartup);
    });

    listenEvent(WebPanelEvents.EDIT_WEB_PANEL_UNLOAD_ON_CLOSE, (event) => {
      const uuid = event.detail.uuid;
      const unloadOnClose = event.detail.unloadOnClose;

      const webPanelController = this.get(uuid);
      webPanelController.setUnloadOnClose(unloadOnClose);
    });

    listenEvent(WebPanelEvents.EDIT_WEB_PANEL_HIDE_TOOLBAR, (event) => {
      const uuid = event.detail.uuid;
      const hideToolbar = event.detail.hideToolbar;

      const webPanelController = this.get(uuid);
      webPanelController.setHideToolbar(hideToolbar);
      SidebarControllers.sidebarController.setHideToolbar(hideToolbar);
    });

    listenEvent(WebPanelEvents.EDIT_WEB_PANEL_HIDE_SOUND_ICON, (event) => {
      const uuid = event.detail.uuid;
      const hideSoundIcon = event.detail.hideSoundIcon;

      const webPanelController = this.get(uuid);
      webPanelController.setHideSoundIcon(hideSoundIcon);
    });

    listenEvent(
      WebPanelEvents.EDIT_WEB_PANEL_HIDE_NOTIFICATION_BADGE,
      (event) => {
        const uuid = event.detail.uuid;
        const hideNotificationBadge = event.detail.hideNotificationBadge;

        const webPanelController = this.get(uuid);
        webPanelController.setHideNotificationBadge(hideNotificationBadge);
      },
    );

    listenEvent(WebPanelEvents.EDIT_WEB_PANEL_PERIODIC_RELOAD, (event) => {
      const uuid = event.detail.uuid;
      const periodicReload = event.detail.periodicReload;

      const webPanelController = this.get(uuid);
      webPanelController.setPeriodicReload(periodicReload);
    });

    listenEvent(WebPanelEvents.EDIT_WEB_PANEL_ZOOM_OUT, (event) => {
      const uuid = event.detail.uuid;

      const webPanelController = this.get(uuid);
      webPanelController.zoomOut();
    });

    listenEvent(WebPanelEvents.EDIT_WEB_PANEL_ZOOM_IN, (event) => {
      const uuid = event.detail.uuid;

      const webPanelController = this.get(uuid);
      webPanelController.zoomIn();
    });

    listenEvent(WebPanelEvents.EDIT_WEB_PANEL_ZOOM, (event) => {
      const uuid = event.detail.uuid;
      const value = event.detail.value;

      const webPanelController = this.get(uuid);
      webPanelController.setZoom(value);
    });

    listenEvent(WebPanelEvents.SAVE_WEB_PANELS, (event) => {
      const isActiveWindow = event.detail.isActiveWindow;
      if (isActiveWindow) {
        this.saveSettings();
      }
    });

    listenEvent(WebPanelEvents.SWITCH_WEB_PANEL, (event) => {
      const uuid = event.detail.uuid;
      const mouseEvent = event.detail.event;

      const webPanelController = this.get(uuid);
      if (isLeftMouseButton(mouseEvent)) {
        webPanelController.switchWebPanel();
      } else if (isMiddleMouseButton(mouseEvent)) {
        if (webPanelController.isActive()) {
          SidebarControllers.sidebarController.close();
        }
        webPanelController.unload();
      }
    });

    listenEvent(WebPanelEvents.DELETE_WEB_PANEL, async (event) => {
      const uuid = event.detail.uuid;

      const webPanelController = this.get(uuid);
      if (webPanelController.isActive()) {
        SidebarControllers.sidebarController.close();
      }
      webPanelController.remove();
      this.delete(uuid);

      if (event.detail.isActiveWindow) {
        this.saveSettings();
      }
    });
  }

  #setupWebPanelsBrowserListeners() {
    // Notify SessionStore about closing web panels window when main window is closed
    const window = new WindowWrapper();
    window.addEventListener("unload", () => {
      this.webPanelsBrowser.notifyWindowClosedAndRemove();
    });
    // Change toolbar title when title of selected tab is changed
    this.webPanelsBrowser.addPageTitleChangeListener((tab) => {
      const title = tab.linkedBrowser.getTitle();
      if (tab.selected) {
        SidebarControllers.sidebarController.setToolbarTitle(title);
      }
      const webPanelController = this.get(tab.uuid);
      const notifications = parseNotifications(title);
      webPanelController.button.setNotificationBadge(notifications);
    });
    // Open/close corresponding web panel when tab is selected
    this.webPanelsBrowser.addTabSelectListener(() => {
      const activeWebPanelTab = this.webPanelsBrowser.getActiveWebPanelTab();
      if (activeWebPanelTab.isEmpty()) {
        SidebarControllers.sidebarController.close();
      }
      for (const [uuid, webPanelController] of this.webPanelControllers) {
        if (uuid === activeWebPanelTab.uuid) {
          webPanelController.open();
        } else {
          webPanelController.close();
        }
      }
    });
    // Revert zoom to default when it's changed
    this.webPanelsBrowser.addZoomChangeListener((tab) => {
      const webPanelController = this.get(tab.uuid);
      const zoom = webPanelController.getZoom();
      if (tab.linkedBrowser.getZoom() != zoom) {
        webPanelController.setZoom(zoom);
      }
    });
  }

  /**
   *
   * @param {string} uuid
   * @param {string} url
   * @param {string} userContextId
   * @param {string} newWebPanelPosition
   * @param {boolean} isActiveWindow
   * @returns {WebPanelController}
   */
  async createWebPanelController(
    uuid,
    url,
    userContextId,
    newWebPanelPosition,
    isActiveWindow,
  ) {
    try {
      NetUtilWrapper.newURI(url);
    } catch (error) {
      console.log("Invalid url:", error);
      return;
    }
    const faviconURL = await fetchIconURL(url);

    const webPanelSettings = new WebPanelSettings(uuid, url, faviconURL, {
      userContextId,
    });
    const webPanelController = new WebPanelController(webPanelSettings, {
      loaded: isActiveWindow,
      position: newWebPanelPosition,
    });
    this.add(webPanelController);

    if (isActiveWindow) {
      this.saveSettings();
    }

    return webPanelController;
  }

  /**
   *
   * @param {WebPanelController} webPanelController
   */
  add(webPanelController) {
    this.webPanelControllers.set(
      webPanelController.getUUID(),
      webPanelController,
    );
  }

  /**
   *
   * @param {string} uuid
   * @returns {WebPanelController?}
   */
  get(uuid) {
    return this.webPanelControllers.get(uuid) ?? null;
  }

  /**
   *
   * @returns {WebPanelController?}
   */
  getActive() {
    const tab = this.webPanelsBrowser.getActiveWebPanelTab();
    return tab.isEmpty() ? null : this.get(tab.uuid);
  }

  /**
   *
   * @param {string} uuid
   */
  delete(uuid) {
    this.webPanelControllers.delete(uuid);
  }

  close() {
    this.webPanelsBrowser.deselectWebPanelTab();
  }

  /**
   *
   * @param {WebPanelsSettings} webPanelsSettings
   */
  loadSettings(webPanelsSettings) {
    console.log("Loading web panels...");

    // We need to display web panels window for a while to initialize it and
    // load startup web panels
    this.sidebarBox.show();
    this.webPanelsBrowser.init();

    this.webPanelsBrowser.waitInitialization(() => {
      // Relink docShell.treeOwner to the current window to fix status panel
      new WindowWrapper().relinkTreeOwner();
      // Setup web panels window listeners
      this.#setupWebPanelsBrowserListeners();
      // Load startup web panels
      for (const webPanelSettings of webPanelsSettings.webPanels) {
        const webPanelController = new WebPanelController(webPanelSettings, {
          loaded: webPanelSettings.loadOnStartup,
        });
        this.add(webPanelController);
      }
      // Hide web panels window after initialization
      this.sidebarBox.hide();
    });
  }

  /**
   *
   * @returns {WebPanelsSettings}
   */
  dumpSettings() {
    return new WebPanelsSettings(
      Array.from(this.webPanelControllers.values(), (webPanelController) =>
        webPanelController.dumpSettings(),
      ),
    );
  }

  saveSettings() {
    this.dumpSettings().save();
  }
}

```

## File: `JS/second_sidebar/css/common.mjs`

```mjs
export const COMMON_CSS = `
  @import url("chrome://global/content/elements/moz-toggle.css");

  :root {
    --sb2-main-padding: var(--space-small);
    --sb2-main-web-panel-buttons-position: start;

    --sb2-box-unpinned-padding: var(--space-small);
    --sb2-box-unpinned-top-padding: var(--sb2-box-unpinned-padding);
    --sb2-box-unpinned-bottom-padding: var(--sb2-box-unpinned-padding);
    --sb2-box-unpinned-side-padding: var(--sb2-box-unpinned-padding);
  }

  #browser {
    position: relative;
  }
`;

```

## File: `JS/second_sidebar/css/containers.mjs`

```mjs
export const CONTAINERS_CSS = `
  .sb2-container {
    box-shadow: var(--sb2-container-borders-part) var(--sb2-container-color-part) inset;
  }

  #widget-overflow-fixed-list, #customization-palette {
    .sb2-container {
      padding: var(--sb2-container-padding);
      border-radius: var(--toolbarbutton-border-radius);
      box-sizing: content-box;
    }
  }
`;

```

## File: `JS/second_sidebar/css/context_item.mjs`

```mjs
export const CONTEXT_ITEM_CSS = `
  #contentAreaContextMenu:has(#context-openlink[hidden="true"]) {
    #context-openlinkinsidebar, #context-sep-open {
      display: none;
    }
  }

  menuitem[label="Reset Zoom [100%]"] {
    display: none;
  }
`;

```

## File: `JS/second_sidebar/css/customization.mjs`

```mjs
export const CUSTOMIZATION_CSS = `
  #customization-container {
    position: absolute;
    z-index: 2147483647;
    width: 80%;
    height: 70%;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: var(--arrowpanel-border-radius);
    box-shadow: 0px 0px 16px 1px var(--arrowpanel-border-color);

    #customization-panel-container {
      flex: unset;
      .panel-arrow {
        display: none;
      }
    }

    toolbarpaletteitem::after {
      overflow-x: scroll;
      text-overflow: ellipsis;
    }
  }
`;

```

## File: `JS/second_sidebar/css/popups.mjs`

```mjs
export const POPUPS_CSS = `
  .sb2-popup > panelmultiview {
    display: flex;
    flex-direction: column;
    align-items: unset;
    gap: var(--space-medium);
    width: 100%;
    padding: var(--space-xsmall);

    .panel-header {
      align-self: center;
    }

    toolbarseparator, input {
      width: -moz-available;
    }

    .sb2-button-iconic .toolbarbutton-text {
      display: none;
    }

    .subviewbutton[type="checkbox"]:not([checked="true"]) {
      list-style-image: url(chrome://global/skin/icons/close.svg);
      -moz-context-properties: fill;
      fill: currentColor;
      color: inherit;

      .toolbarbutton-text {
        padding-inline-start: 8px;
      }
    }
  }

  #sb2-main-popup-settings,
  #sb2-web-panel-new,
  #sb2-web-panel-edit {
    width: 400px;
  }

  #sb2-web-panel-delete {
    width: 300px;
  }

  .sb2-popup-header, .sb2-popup-body, .sb2-popup-footer {
    width: 100%;
  }

  .sb2-popup-header {
    align-self: center;

    h1 {
      align-self: center;
    }
  }

  .sb2-popup-body {
    overflow-y: auto;
    padding: 0 var(--space-medium);
    gap: var(--space-xsmall);

    .subviewbutton {
      margin: unset;
      padding: var(--space-small) var(--space-medium);
    }
  }

  .sb2-popup-body.compact {
    padding: 0;
    gap: 0;
  }

  .sb2-popup-footer {
    justify-content: end;
  }

  .sb2-popup-group {
    justify-content: space-between;
    align-items: center;
    width: 100%;
    min-height: 33px;
  }

  .sb2-popup-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--space-small);
    width: 100%;
  }

  #sb2-zoom-buttons {
    justify-content: center;

    #sb2-zoom-button > .toolbarbutton-text {
      min-width: calc(4ch + 8px);
      text-align: center;
    }
  }
`;

```

## File: `JS/second_sidebar/css/sidebar.mjs`

```mjs
export const SIDEBAR_CSS = `
  #sb2 {
    border-radius: var(--border-radius-medium);
    box-shadow: var(--content-area-shadow);
    border: 0.5px solid var(--sidebar-border-color);
    overflow: hidden;
    height: 100%;
    pointer-events: auto;
    min-width: 200px;

    #sb2-toolbar {
      flex-direction: row;
      min-height: unset;
      gap: 4px;
      background-color: var(--toolbar-bgcolor);
      color: var(--toolbar-color);
      padding: 1px;

      #sb2-toolbar-title-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        overflow: hidden;
      }

      #sb2-toolbar-title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0;
      }
    }

    #sb2-web-panels {
      width: 100%;
      height: 100%;
      order: 0;
    }
  }
  
  #sb2[pinned="true"] {
    width: 100% !important;
  }
`;

```

## File: `JS/second_sidebar/css/sidebar_box.mjs`

```mjs
export const SIDEBAR_BOX_CSS = `
  #sb2-box {
    background-color: var(--toolbar-bgcolor);
    min-width: 200px;
    pointer-events: none;
    box-sizing: content-box;
  }

  #browser:has(#sb2[pinned="false"]) {
    #sb2-box {
      position: absolute;
      background-color: transparent;
      padding-block-start: var(--sb2-box-unpinned-top-padding);
      height: calc(100% - var(--sb2-box-unpinned-top-padding) - var(--sb2-box-unpinned-bottom-padding));
      width: 100% !important;
      z-index: 3;

      #sb2-box-filler {
        display: block;
        flex: 1;
        pointer-events: none;
      }

      #sb2-splitter-unpinned {
        pointer-events: auto;
        border: unset;
      }
    }
  }

  #browser:has(#sb2[pinned="true"][position="right"]) {
    #sb2-box {
      order: 16 !important;
      padding-inline-start: var(--space-small);
      padding-inline-end: 1px;
    }

    #sb2-splitter-pinned {
      order: 15 !important;
      margin-inline-start: unset;
      margin-inline-end: calc(-1 * var(--splitter-width));
    }
  }

  #browser:has(#sb2[pinned="true"][position="left"]) {
    #sb2-box {
      order: -2 !important;
      padding-inline-start: 1px;
      padding-inline-end: var(--space-small);
    }

    #sb2-splitter-pinned {
      order: -1 !important;
      margin-inline-start: calc(-1 * var(--splitter-width));
      margin-inline-end: unset;
    }
  }

  #browser:has(#sb2[pinned="false"][position="right"]) {
    #sb2-box-filler {
      order: 0;
    }

    #sb2-splitter-unpinned {
      order: 1;
      margin-inline-start: calc(-1 * var(--splitter-width));
      margin-inline-end: unset;
    }

    #sb2 {
      order: 2;
    }

    #sb2-box {
      padding-inline-end: var(--sb2-box-unpinned-side-padding);
    }
  }

  #browser:has(#sb2[pinned="false"][position="left"]) {
    #sb2-box-filler {
      order: 2;
    }

    #sb2-splitter-unpinned {
      order: 1;
      margin-inline-start: unset;
      margin-inline-end: calc(-1 * var(--splitter-width));
    }

    #sb2 {
      order: 0;
    }

    #sb2-box {
      padding-inline-start: var(--sb2-box-unpinned-side-padding);
    }
  }
`;

```

## File: `JS/second_sidebar/css/sidebar_main.mjs`

```mjs
export const SIDEBAR_MAIN_CSS = `
  #sb2-main {
    display: flex;
    flex-direction: column;
    justify-content: var(--sb2-main-web-panel-buttons-position);
    gap: var(--space-small);
    padding: 0 var(--sb2-main-padding) var(--space-small) var(--sb2-main-padding);
    overflow-y: scroll;
    scrollbar-width: none;

    toolbarpaletteitem[place="panel"][id^="wrapper-customizableui-special-spring"], toolbarspring {
      flex: 1;
      min-height: 10px;
      max-height: 112px;
      min-width: unset;
      max-width: unset;
    }

    .toolbaritem-combined-buttons {
      justify-content: center;
      margin-inline: 0;
    }

    .toolbarbutton-1 {
      padding: 0 !important;
    }
  }

  #sb2-main[fullscreenShouldAnimate] {
    transition: 0.8s margin-right ease-out, 0.8s margin-left ease-out;
  }

  #sb2-main[shouldAnimate] {
    transition: 0.2s margin-right ease-out, 0.2s margin-left ease-out;
  }

  #browser:has(#sb2-box:not([hidden])), 
  #browser:has(#sb2-main toolbarbutton[open]),
  #main-window:has(#sb2-main-popup-settings[panelopen]),
  #main-window:has(#sb2-main-menupopup[panelopen]),
  #main-window:has(#sb2-web-panel-button-menupopup[panelopen]) {
    #sb2-main {
      margin-left: 0px !important;
      margin-right: 0px !important;
    }
  }

  :root[customizing] {
    #sb2-main {
      min-width: unset !important;
      margin-left: 0px !important;
      margin-right: 0px !important;
    }
  }

  #browser:has(#sb2[position="right"]) #sb2-main {
    order: 17 !important;
  }

  #browser:has(#sb2[position="left"]) #sb2-main {
    order: -3 !important;
  }

  .sb2-main-button {
    position: relative;
    padding: 0;

    .sb2-sound-icon {
      position: relative;
      display: none;
      height: 16px;
      width: 16px;
      top: calc(var(--toolbarbutton-inner-padding) + 2px);
      right: calc(-1 * var(--toolbarbutton-inner-padding) - 2px);
      padding: 2px;
      background-position: center;
      background-repeat: no-repeat;
      border-radius: var(--border-radius-circle);
      background-color: color-mix(in srgb, var(--toolbar-bgcolor) 50%, transparent);
      fill: var(--toolbar-color);

      &[soundplaying] {
        display: flex;
        background-image: url("chrome://browser/skin/tabbrowser/tab-audio-playing-small.svg");
      }

      &[muted] {
        display: flex;
        background-image: url("chrome://browser/skin/tabbrowser/tab-audio-muted-small.svg");
      }

      &[hidden] {
        display: none;
      }
    }

    .sb2-notification-badge {
      display: none;
      position: relative;
      justify-content: center;
      align-items: center;
      width: 16px;
      height: 16px;
      top: calc(-1 * var(--toolbarbutton-inner-padding) - 2px);
      right: calc(-1 * var(--toolbarbutton-inner-padding) - 2px);
      border-radius: var(--border-radius-circle);
      background-color: color-mix(in srgb, var(--toolbar-bgcolor) 50%, transparent);

      &[value] {
        display: flex;
      }

      &[hidden] {
        display: none;
      }

      span {
        color: var(--toolbar-color);
      }
    }
  }

  .sb2-main-button[unloaded="true"] {
    .toolbarbutton-icon {
      opacity: var(--toolbarbutton-disabled-opacity);
    }
  }

  #widget-overflow-fixed-list .sb2-main-button {
    padding: var(--arrowpanel-menuitem-padding);
  }

  #sb2-collapse-button[position="left"] {
    list-style-image: url("chrome://userscripts/content/second_sidebar/icons/sidebar-left.svg");
  }

  #sb2-collapse-button[position="right"] {
    list-style-image: url("chrome://userscripts/content/second_sidebar/icons/sidebar-right.svg");
  }
`;

```

## File: `JS/second_sidebar/css/web_panel.mjs`

```mjs
export const WEB_PANEL_CSS = `
  .web-panel {
    width: 100%;
    height: calc(100% + 1px);
    background-color: var(--toolbar-bgcolor);
    clip-path: inset(-1px 0 round 0 0 var(--border-radius-medium) var(--border-radius-medium));
  }
`;

```

## File: `JS/second_sidebar/css/web_panels_browser.mjs`

```mjs
export const WEB_PANELS_BROWSER_CSS = `
  .sb2-web-panels-browser {
    width: 100%;
    height: calc(100% + 1px);
    background-color: var(--toolbar-bgcolor);
    clip-path: inset(-1px 0 round 0 0 var(--border-radius-medium) var(--border-radius-medium));
  }
`;

```

## File: `JS/second_sidebar/icons/sidebar-left.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="context-fill" fill-opacity="context-fill-opacity" fill-rule="evenodd">
  <path d="M16 12.25 16 4a2 2 0 0 0-2-2L2 2a2 2 0 0 0-2 2l0 8.25a2 2 0 0 0 2 2l12 0a2 2 0 0 0 2-2zm-14.75.15 0-8.55.6-.6 4.9 0 0 9.75-4.9 0-.6-.6zM8 13l6.15 0 .6-.6 0-8.55-.6-.6-6.15 0L8 13z"/>
  <path d="M5.5 10.5A.5.5 0 0 0 5 10l-2 0a.5.5 0 0 0 0 1l2 0a.5.5 0 0 0 .5-.5z"/>
  <path d="M5.5 8a.5.5 0 0 0-.5-.5l-2 0a.5.5 0 0 0 0 1l2 0a.5.5 0 0 0 .5-.5z"/>
  <path d="M5.5 5.5A.5.5 0 0 0 5 5L3 5a.5.5 0 0 0 0 1l2 0a.5.5 0 0 0 .5-.5z"/>
</svg>

```

## File: `JS/second_sidebar/icons/sidebar-right.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="context-fill" fill-opacity="context-fill-opacity" fill-rule="evenodd">
  <path d="M0 12.25 0 4a2 2 0 0 1 2-2l12 0a2 2 0 0 1 2 2l0 8.25a2 2 0 0 1-2 2l-12 0a2 2 0 0 1-2-2zm14.75.15 0-8.55-.6-.6-4.9 0 0 9.75 4.9 0 .6-.6zM8 13l-6.15 0-.6-.6 0-8.55.6-.6 6.15 0L8 13z"/>
  <path d="M10.5 10.5a.5.5 0 0 1 .5-.5l2 0a.5.5 0 0 1 0 1l-2 0a.5.5 0 0 1-.5-.5z"/>
  <path d="M10.5 8a.5.5 0 0 1 .5-.5l2 0a.5.5 0 0 1 0 1l-2 0a.5.5 0 0 1-.5-.5z"/>
  <path d="M10.5 5.5A.5.5 0 0 1 11 5l2 0a.5.5 0 0 1 0 1l-2 0a.5.5 0 0 1-.5-.5z"/>
</svg>

```

## File: `JS/second_sidebar/settings/settings.mjs`

```mjs
import { PreferencesWrapper } from "../wrappers/preferences.mjs";

export class Settings {
  /**
   *
   * @param {string} pref
   * @returns {Object | Array<Object> | null}
   */
  static load(pref) {
    const value = PreferencesWrapper.prefHasUserValue(pref)
      ? JSON.parse(PreferencesWrapper.getStringPref(pref))
      : null;
    console.log(`Loaded pref "${pref}":`, value);
    return value;
  }

  /**
   *
   * @param {string} pref
   * @param {Object | Array<Object>} value
   */
  static save(pref, value) {
    console.log(`Saving pref "${pref}":`, value);
    PreferencesWrapper.setStringPref(pref, JSON.stringify(value));
  }
}

```

## File: `JS/second_sidebar/settings/sidebar_settings.mjs`

```mjs
import { Settings } from "./settings.mjs";

const PREF = "second-sidebar.settings";

export class SidebarSettings {
  /**@type {string} */
  #position;
  /**@type {string} */
  #padding;
  /**@type {string} */
  #newWebPanelPosition;
  /**@type {string} */
  #unpinnedPadding;
  /**@type {boolean} */
  #hideInPopupWindows;
  /**@type {boolean} */
  #autoHideBackButton;
  /**@type {boolean} */
  #autoHideForwardButton;
  /**@type {string} */
  #containerBorder;
  /**@type {boolean} */
  #autoHideSidebar;
  /**@type {boolean} */
  #hideSidebarAnimated;

  /**
   *
   * @param {string} position
   * @param {string} padding
   * @param {string} newWebPanelPosition
   * @param {string} unpinnedPadding
   * @param {boolean} hideInPopupWindows
   * @param {boolean} autoHideBackButton
   * @param {boolean} autoHideForwardButton
   * @param {string} containerBorder
   * @param {boolean} autoHideSidebar
   * @param {boolean} hideSidebarAnimated
   */
  constructor(
    position,
    padding,
    newWebPanelPosition,
    unpinnedPadding,
    hideInPopupWindows,
    autoHideBackButton,
    autoHideForwardButton,
    containerBorder,
    autoHideSidebar,
    hideSidebarAnimated,
  ) {
    this.#position = position;
    this.#padding = padding;
    this.#newWebPanelPosition = newWebPanelPosition;
    this.#unpinnedPadding = unpinnedPadding;
    this.#hideInPopupWindows = hideInPopupWindows;
    this.#autoHideBackButton = autoHideBackButton;
    this.#autoHideForwardButton = autoHideForwardButton;
    this.#containerBorder = containerBorder;
    this.#autoHideSidebar = autoHideSidebar;
    this.#hideSidebarAnimated = hideSidebarAnimated;
  }

  get position() {
    return this.#position;
  }

  get padding() {
    return this.#padding;
  }

  get newWebPanelPosition() {
    return this.#newWebPanelPosition;
  }

  get unpinnedPadding() {
    return this.#unpinnedPadding;
  }

  get hideInPopupWindows() {
    return this.#hideInPopupWindows;
  }

  get autoHideBackButton() {
    return this.#autoHideBackButton;
  }

  get autoHideForwardButton() {
    return this.#autoHideForwardButton;
  }

  get containerBorder() {
    return this.#containerBorder;
  }

  get autoHideSidebar() {
    return this.#autoHideSidebar;
  }

  get hideSidebarAnimated() {
    return this.#hideSidebarAnimated;
  }

  /**
   *
   * @returns {SidebarSettings}
   */
  static load() {
    const pref = Settings.load(PREF) ?? {};
    return new SidebarSettings(
      pref.position ?? "right",
      pref.padding ?? "small",
      pref.newWebPanelPosition ?? "before",
      pref.unpinnedPadding ?? "small",
      pref.hideInPopupWindows ?? false,
      pref.autoHideBackButton ?? false,
      pref.autoHideForwardButton ?? false,
      pref.containerBorder ?? "left",
      pref.autoHideSidebar ?? false,
      pref.hideSidebarAnimated ?? false,
    );
  }

  save() {
    Settings.save(PREF, {
      position: this.#position,
      padding: this.#padding,
      newWebPanelPosition: this.#newWebPanelPosition,
      unpinnedPadding: this.#unpinnedPadding,
      hideInPopupWindows: this.#hideInPopupWindows,
      autoHideBackButton: this.#autoHideBackButton,
      autoHideForwardButton: this.#autoHideForwardButton,
      containerBorder: this.#containerBorder,
      autoHideSidebar: this.#autoHideSidebar,
      hideSidebarAnimated: this.#hideSidebarAnimated,
    });
  }
}

```

## File: `JS/second_sidebar/settings/web_panel_settings.mjs`

```mjs
import { ScriptSecurityManagerWrapper } from "../wrappers/script_security_manager.mjs";

export class WebPanelSettings {
  /**
   *
   * @param {string} uuid
   * @param {string} url
   * @param {string} faviconURL
   * @param {object?} params
   * @param {boolean?} params.pinned
   * @param {string?} params.width
   * @param {boolean?} params.mobile
   * @param {number?} params.zoom
   * @param {boolean?} params.loadOnStartup
   * @param {boolean?} params.unloadOnClose
   * @param {boolean?} params.hideToolbar
   * @param {string?} params.userContextId
   * @param {number} params.periodicReload
   * @param {number} params.hideSoundIcon
   * @param {number} params.hideNotificationBadge
   */
  constructor(
    uuid,
    url,
    faviconURL,
    {
      pinned,
      width,
      mobile,
      zoom,
      loadOnStartup,
      unloadOnClose,
      hideToolbar,
      userContextId,
      periodicReload,
      hideSoundIcon,
      hideNotificationBadge,
    } = {},
  ) {
    /**@type {string} */
    this.uuid = uuid ?? crypto.randomUUID();
    /**@type {string} */
    this.url = url;
    /**@type {string} */
    this.faviconURL = faviconURL;
    /**@type {boolean} */
    this.pinned = pinned ?? false;
    /**@type {string} */
    this.width = width ?? "400";
    /**@type {boolean} */
    this.mobile = mobile ?? false;
    /**@type {number} */
    this.zoom = zoom ?? 1;
    /**@type {boolean} */
    this.loadOnStartup = loadOnStartup ?? false;
    /**@type {boolean} */
    this.unloadOnClose = unloadOnClose ?? false;
    /**@type {boolean} */
    this.hideToolbar = hideToolbar ?? false;
    /**@type {number} */
    this.userContextId =
      userContextId ?? ScriptSecurityManagerWrapper.DEFAULT_USER_CONTEXT_ID;
    /**@type {number?} */
    this.periodicReload = periodicReload ?? 0;
    /**@type {boolean} */
    this.hideSoundIcon = hideSoundIcon ?? false;
    /**@type {boolean} */
    this.hideNotificationBadge = hideNotificationBadge ?? false;
  }

  /**
   *
   * @returns {object}
   */
  toObject() {
    return {
      uuid: this.uuid,
      url: this.url,
      faviconURL: this.faviconURL,
      pinned: this.pinned,
      width: this.width,
      mobile: this.mobile,
      zoom: this.zoom,
      loadOnStartup: this.loadOnStartup,
      unloadOnClose: this.unloadOnClose,
      hideToolbar: this.hideToolbar,
      userContextId: this.userContextId,
      periodicReload: this.periodicReload,
      hideSoundIcon: this.hideSoundIcon,
      hideNotificationBadge: this.hideNotificationBadge,
    };
  }
}

```

## File: `JS/second_sidebar/settings/web_panels_settings.mjs`

```mjs
import { Settings } from "./settings.mjs";
import { WebPanelSettings } from "./web_panel_settings.mjs";

const PREF = "second-sidebar.web-panels";

export class WebPanelsSettings {
  /**@type {Array<WebPanelSettings} */
  #webPanels = [];

  /**
   *
   * @param {Array<WebPanelSettings>} webPanels
   */
  constructor(webPanels) {
    this.#webPanels = webPanels;
  }

  get webPanels() {
    return this.#webPanels;
  }

  /**
   *
   * @returns {WebPanelsSettings}
   */
  static load() {
    const pref = Settings.load(PREF) ?? [];

    return new WebPanelsSettings(
      pref.map(
        (webPanelPref) =>
          new WebPanelSettings(
            webPanelPref.uuid,
            webPanelPref.url,
            webPanelPref.faviconURL,
            {
              pinned: webPanelPref.pinned,
              width: webPanelPref.width,
              mobile: webPanelPref.mobile,
              zoom: webPanelPref.zoom,
              loadOnStartup: webPanelPref.loadOnStartup,
              unloadOnClose: webPanelPref.unloadOnClose,
              hideToolbar: webPanelPref.hideToolbar,
              userContextId: webPanelPref.userContextId,
              periodicReload: webPanelPref.periodicReload,
              hideSoundIcon: webPanelPref.hideSoundIcon,
              hideNotificationBadge: webPanelPref.hideNotificationBadge,
            },
          ),
      ),
    );
  }

  save() {
    Settings.save(
      PREF,
      this.#webPanels.map((webPanel) => webPanel.toObject()),
    );
  }
}

```

## File: `JS/second_sidebar/utils/buttons.mjs`

```mjs
/**
 *
 * @param {MouseEvent} event
 * @returns {boolean}
 */
export function isLeftMouseButton(event) {
  return event.button === 0;
}

/**
 *
 * @param {MouseEvent} event
 * @returns {boolean}
 */
export function isMiddleMouseButton(event) {
  return event.button === 1;
}

/**
 *
 * @param {MouseEvent} event
 * @returns {boolean}
 */
export function isRightMouseButton(event) {
  return event.button === 2;
}

```

## File: `JS/second_sidebar/utils/containers.mjs`

```mjs
/* eslint-disable no-unused-vars */
import { ContextualIdentityServiceWrapper } from "../wrappers/contextual_identity_service.mjs";
import { MenuList } from "../xul/base/menulist.mjs";
import { ScriptSecurityManagerWrapper } from "../wrappers/script_security_manager.mjs";
/* eslint-enable no-unused-vars */

const CONTAINER_CLASS = "sb2-container";

/**
 *
 * @param {string} userContextId
 * @returns {object}
 */
export function getContainerColor(userContextId) {
  const identity =
    ContextualIdentityServiceWrapper.getPublicIdentityFromId(userContextId);
  return identity ? identity.color : "transparent";
}

/**
 *
 * @param {string} userContextId
 * @param {HTMLElement} element
 */
export function applyContainerColor(userContextId, element) {
  if (
    String(userContextId) ===
    String(ScriptSecurityManagerWrapper.DEFAULT_USER_CONTEXT_ID)
  ) {
    element.classList.remove(CONTAINER_CLASS);
  } else {
    element.classList.add(CONTAINER_CLASS);
  }
  element.style.setProperty(
    "--sb2-container-color-part",
    getContainerColor(userContextId),
  );
}

/**
 *
 * @param {MenuList} containerMenuList
 */
export function fillContainerMenuList(containerMenuList) {
  containerMenuList.removeAllItems();
  containerMenuList.appendItem(
    "No Container",
    ScriptSecurityManagerWrapper.DEFAULT_USER_CONTEXT_ID,
  );

  const userContextIds =
    ContextualIdentityServiceWrapper.getPublicUserContextIds();
  for (const userContextId of userContextIds) {
    const label =
      ContextualIdentityServiceWrapper.getUserContextLabel(userContextId);
    containerMenuList.appendItem(label, userContextId);

    const lastMenuItem = containerMenuList.getLastMenuItemXUL();
    applyContainerColor(userContextId, lastMenuItem);
  }

  containerMenuList.addEventListener("command", () => {
    const userContextId = containerMenuList.getValue();
    applyContainerColor(userContextId, containerMenuList.getXUL());
  });
}

/**
 *
 * @param {string} containerBorder
 */
export function changeContainerBorder(containerBorder) {
  let shadowParts = Array(4).fill("0px");
  let paddingParts = Array(4).fill("var(--toolbarbutton-inner-padding)");

  if (containerBorder === "left") {
    shadowParts[0] = "1px";
    paddingParts[1] = "0";
  } else if (containerBorder === "right") {
    shadowParts[0] = "-1px";
    paddingParts[3] = "0";
  } else if (containerBorder === "top") {
    shadowParts[1] = "1px";
    paddingParts[2] = "0";
  } else if (containerBorder === "bottom") {
    shadowParts[1] = "-1px";
    paddingParts[0] = "0";
  } else if (containerBorder === "around") {
    shadowParts[3] = "1px";
  }

  document.documentElement.style.setProperty(
    "--sb2-container-borders-part",
    shadowParts.join(" "),
  );
  document.documentElement.style.setProperty(
    "--sb2-container-padding",
    paddingParts.join(" "),
  );
}

```

## File: `JS/second_sidebar/utils/icons.mjs`

```mjs
import { FaviconsWrapper } from "../wrappers/favicons.mjs";
import { NetUtilWrapper } from "../wrappers/net_utils.mjs";

const PREDEFINED_ICONS = {
  "about:newtab": "chrome://browser/skin/tab.svg",
  "about:debugging": "chrome://global/skin/icons/developer.svg",
  "about:config": "chrome://global/skin/icons/settings.svg",
  "about:processes": "chrome://global/skin/icons/performance.svg",
  "about:addons": "chrome://mozapps/skin/extensions/extension.svg",
  "about:settings": "chrome://global/skin/icons/settings.svg",
  "about:preferences": "chrome://global/skin/icons/settings.svg",
  "chrome://browser/content/preferences/preferences.xhtml":
    "chrome://global/skin/icons/settings.svg",
  "chrome://browser/content/places/bookmarksSidebar.xhtml":
    "chrome://browser/skin/bookmark.svg",
  "about:downloads": "chrome://browser/skin/downloads/downloads.svg",
  "chrome://browser/content/downloads/contentAreaDownloadsView.xhtml":
    "chrome://browser/skin/downloads/downloads.svg",
  "chrome://browser/content/places/places.xhtml":
    "chrome://browser/skin/library.svg",
};

export const FALLBACK_ICON = "chrome://global/skin/icons/info.svg";

/**
 *
 * @param {string} url
 * @returns {string}
 */
export function fetchIconURL(url) {
  const uri = NetUtilWrapper.newURI(url);
  if (uri.specIgnoringRef in PREDEFINED_ICONS) {
    return PREDEFINED_ICONS[uri.specIgnoringRef];
  }

  FaviconsWrapper.setDefaultIconURIPreferredSize(32);

  return new Promise((resolve) => {
    FaviconsWrapper.getFaviconURLForPage(uri, async (faviconURI) => {
      let provider = "browser";
      let faviconURL = faviconURI?.spec;
      try {
        if (!faviconURL) {
          provider = "google";
          faviconURL = `https://www.google.com/s2/favicons?domain=${uri.host}&sz=32`;
          const response = await fetch(faviconURL);
          if (response.status !== 200) {
            throw Error(`Got ${response.status} from google`);
          }
        }
      } catch (error) {
        console.log("Failed to fetch icon:", error);
        provider = "fallback";
        faviconURL = "chrome://devtools/skin/images/browsers/firefox.svg";
      }
      console.log(`Got favicon for ${url} from ${provider}`);
      resolve(faviconURL);
    });
  });
}

/**
 *
 * @param {string} url
 * @returns {boolean}
 */
export async function isIconAvailable(url) {
  try {
    const response = await fetch(url);
    return response.status === 200;
  } catch (error) {
    console.log(`Failed to fetch icon ${url}:`, error);
    return false;
  }
}

/**
 *
 * @param {string} url
 * @param {string} urlAlt
 * @returns {Promise<string>}
 */
export async function useAvailableIcon(url, urlAlt) {
  return (await isIconAvailable(url)) ? url : urlAlt;
}

```

## File: `JS/second_sidebar/utils/parsers.mjs`

```mjs
/**
 * @typedef {Object} ParsedFunction
 * @property {string} name
 * @property {Function} func
 */

/**
 *
 * @param {string} functionSource
 * @returns {ParsedFunction}
 */
export function parseFunction(functionSource) {
  const matches = [...functionSource.matchAll(/function\s(.*)\((.*)\)/gim)];
  const groups = matches[0];
  const name = groups[1];
  const args = groups.slice(2);
  const body = functionSource.split("\n").slice(1, -1).join("\n");
  return { name, func: new Function(...args, body) };
}

```

## File: `JS/second_sidebar/utils/string.mjs`

```mjs
/**
 *
 * @param {string} text
 * @param {number} limit
 * @returns {string}
 */
export function ellipsis(text, limit) {
  return text.length > limit ? text.slice(0, limit - 3) + "..." : text;
}

/**
 *
 * @param {string} text
 * @returns {number?}
 */
export function parseNotifications(text) {
  const regex = /(^|[([ ])([0-9]+)[)\] ]/gm;
  const result = regex.exec(text);
  if (!result || result.length < 3) {
    return null;
  }
  return result[2];
}

```

## File: `JS/second_sidebar/utils/windows.mjs`

```mjs
import { XULElement } from "../xul/base/xul_element.mjs";

/**
 *
 * @returns {boolean}
 */
export const isPopupWindow = () => {
  const mainWindow = new XULElement({
    element: document.getElementById("main-window"),
  });
  return (
    mainWindow.hasAttribute("chromehidden") &&
    mainWindow.getAttribute("chromehidden").includes("extrachrome")
  );
};

```

## File: `JS/second_sidebar/utils/xul.mjs`

```mjs
/* eslint-disable no-unused-vars */
import { Button } from "../xul/base/button.mjs";
import { HBox } from "../xul/base/hbox.mjs";
import { Header } from "../xul/base/header.mjs";
import { Input } from "../xul/base/input.mjs";
import { Label } from "../xul/base/label.mjs";
import { ToolbarButton } from "../xul/base/toolbar_button.mjs";
import { XULElement } from "../xul/base/xul_element.mjs";
import { ZoomManagerWrapper } from "../wrappers/zoom_manager.mjs";
/* eslint-enable no-unused-vars */

/**
 *
 * @param {string} text
 * @param {object} params
 * @param {string?} params.id
 * @param {string?} params.tooltipText
 * @returns {ToolbarButton}
 */
export function createSubviewButton(
  text,
  { id = null, tooltipText = null, type = null } = {},
) {
  const button = new ToolbarButton({
    id,
    classList: ["subviewbutton"],
  })
    .setLabel(text)
    .setType(type);
  if (tooltipText) {
    button.setTooltipText(tooltipText);
  }
  return button;
}

/**
 *
 * @param {string} iconURL
 * @param {string?} params.id
 * @param {string?} params.tooltipText
 * @returns {ToolbarButton}
 */
export function createSubviewIconicButton(
  iconURL,
  { id = null, tooltipText = null } = {},
) {
  const button = new ToolbarButton({
    id,
    classList: ["subviewbutton", "subviewbutton-iconic", "sb2-button-iconic"],
  }).setIcon(iconURL);
  if (tooltipText) {
    button.setTooltipText(tooltipText);
  }
  return button;
}

/**
 *
 * @param {object} params
 * @param {string} params.type
 * @returns {Input}
 */
export function createInput({ type = "text" } = {}) {
  return new Input().setType(type);
}

/**
 *
 * @param {ToolbarButton} zoomOutButton
 * @param {ToolbarButton} resetZoomButton
 * @param {ToolbarButton} zoomInButton
 * @returns {HBox}
 */
export function createZoomButtons(
  zoomOutButton,
  resetZoomButton,
  zoomInButton,
) {
  return new HBox({ id: "sb2-zoom-buttons" }).appendChildren(
    zoomOutButton,
    resetZoomButton,
    zoomInButton,
  );
}

/**
 *
 * @param {number} zoom
 * @param {ToolbarButton} zoomOutButton
 * @param {ToolbarButton} resetZoomButton
 * @param {ToolbarButton} zoomInButton
 */
export function updateZoomButtons(
  zoom,
  zoomOutButton,
  resetZoomButton,
  zoomInButton,
) {
  resetZoomButton
    .setLabel((zoom * 100).toFixed(0) + "%")
    .setDisabled(zoom === 1);
  zoomInButton.setDisabled(zoom >= ZoomManagerWrapper.MAX);
  zoomOutButton.setDisabled(zoom <= ZoomManagerWrapper.MIN);
}

/**
 *
 * @param {string} text
 * @returns {Button}
 */
export function createPrimaryButton(text) {
  return new Button({
    classList: ["footer-button", "primary"],
  }).setText(text);
}

/**
 *
 * @returns {Button}
 */
export function createCreateButton() {
  return createPrimaryButton("Create");
}

/**
 *
 * @returns {Button}
 */
export function createSaveButton() {
  return createPrimaryButton("Save");
}

/**
 *
 * @returns {Button}
 */
export function createDeleteButton() {
  return createPrimaryButton("Delete");
}

/**
 *
 * @returns {Button}
 */
export function createCancelButton() {
  return new Button({ classList: ["footer-button"] }).setText("Cancel");
}

/**
 *
 * @param {string} text
 * @param {XULElement} element
 * @returns {HBox}
 */
export function createPopupGroup(text, element) {
  return new HBox({
    classList: ["sb2-popup-group"],
  }).appendChildren(new Label().setText(text), element);
}

/**
 *
 * @param {XULElement[]} elements
 * @returns {HBox}
 */
export function createPopupRow(...elements) {
  return new HBox({
    classList: ["sb2-popup-row"],
  }).appendChildren(...elements);
}

```

## File: `JS/second_sidebar/wrappers/app_constants.mjs`

```mjs
export class AppConstantsWrapper {
  /**@type {string} */
  static BROWSER_CHROME_URL = AppConstants.BROWSER_CHROME_URL;
}

```

## File: `JS/second_sidebar/wrappers/chrome_utils.mjs`

```mjs
/**
 * @typedef {Object} QueryInterface
 */

export class ChromeUtilsWrapper {
  /**
   *
   * @param {Array<string>} interfaces
   * @returns {QueryInterface}
   */
  static generateQI(interfaces) {
    return ChromeUtils.generateQI(interfaces);
  }
}

```

## File: `JS/second_sidebar/wrappers/clipboard_helper.mjs`

```mjs
export class ClipboardHelperWrapper {
  static clipboardHelper = Cc[
    "@mozilla.org/widget/clipboardhelper;1"
  ].getService(Ci.nsIClipboardHelper);

  /**
   *
   * @param {string} value
   */
  static copyString(value) {
    this.clipboardHelper.copyString(value);
  }
}

```

## File: `JS/second_sidebar/wrappers/contextual_identity_service.mjs`

```mjs
/**
 * @typedef {Object} PublicIdentity
 * @property {number} userContextId
 * @property {string} name
 * @property {boolean} public
 * @property {string} color
 * @property {string} icon
 */

export class ContextualIdentityServiceWrapper {
  static ensureDataReady() {
    ContextualIdentityService.ensureDataReady();
  }

  /**
   *
   * @returns {Array<number>}
   */
  static getPublicUserContextIds() {
    return ContextualIdentityService.getPublicUserContextIds();
  }

  /**
   *
   * @param {number} userContextId
   * @returns {PublicIdentity?}
   */
  static getPublicIdentityFromId(userContextId) {
    return ContextualIdentityService.getPublicIdentityFromId(userContextId);
  }

  /**
   *
   * @param {number} userContextId
   * @returns {string?}
   */
  static getUserContextLabel(userContextId) {
    return ContextualIdentityService.getUserContextLabel(userContextId);
  }
}

```

## File: `JS/second_sidebar/wrappers/customizable_ui.mjs`

```mjs
/**
 * @typedef {Object} WidgetInstance
 * @property {HTMLElement} node
 */

/**
 * @typedef {Object} Widget
 * @property {Array<WidgetInstance>} instances
 * @property {function(Window):WidgetInstance} forWindow
 */

export class CustomizableUIWrapper {
  static TYPE_TOOLBAR = "toolbar";
  static TYPE_PANEL = "panel";

  /**
   * @param {string} id
   * @param {object} properties
   * @param {string} properties.type
   * @param {boolean} properties.defaultCollapsed
   * @param {boolean} properties.overflowable
   * @param {Array<string>} properties.defaultPlacements
   */
  static registerArea(
    id,
    {
      type = this.TYPE_TOOLBAR,
      defaultCollapsed = false,
      overflowable = false,
      defaultPlacements = [],
    } = {},
  ) {
    CustomizableUI.registerArea(id, {
      type,
      defaultCollapsed,
      overflowable,
      defaultPlacements,
    });
  }

  /**
   *
   * @param {HTMLElement} node
   */
  static registerToolbarNode(node) {
    CustomizableUI.registerToolbarNode(node);
  }

  /**
   *
   * @param {object} properties
   * @param {string} properties.id
   * @param {string} properties.type
   * @param {boolean} properties.localized
   * @param {function(HTMLElement):void} properties.onCreated
   * @param {function(MouseEvent):void} properties.onClick
   * @returns {object}
   */
  static createWidget({
    id,
    type = "button",
    localized = false,
    onCreated,
    onClick,
  }) {
    return CustomizableUI.createWidget({
      id,
      type,
      localized,
      onCreated,
      onClick,
    });
  }

  /**
   *
   * @param {string} id
   * @returns {Widget}
   */
  static getWidget(id) {
    return CustomizableUI.getWidget(id);
  }

  /**
   *
   * @param {string} id
   */
  static destroyWidget(id) {
    CustomizableUI.destroyWidget(id);
  }

  /**
   *
   * @param {string} id
   * @param {string} area
   * @param {number} position
   */
  static addWidgetToArea(id, area, position) {
    CustomizableUI.addWidgetToArea(id, area, position);
  }

  /**
   *
   * @param {string} id
   * @returns {object}
   */
  static getPlacementOfWidget(id) {
    return CustomizableUI.getPlacementOfWidget(id);
  }
}

```

## File: `JS/second_sidebar/wrappers/favicons.mjs`

```mjs
/**
 * @typedef {Object} URI
 * @property {string} scheme
 * @property {string} host
 * @property {string} spec
 * @property {string} specIgnoringRef
 */

export class FaviconsWrapper {
  /**
   *
   * @param {number} value
   */
  static setDefaultIconURIPreferredSize(value) {
    Favicons.setDefaultIconURIPreferredSize(value);
  }

  /**
   *
   * @param {URI} uri
   * @param {function(URI):void} callback
   */
  static getFaviconURLForPage(uri, callback) {
    if ("getFaviconURLForPage" in Favicons) {
      Favicons.getFaviconURLForPage(uri, callback);
    } else {
      Favicons.getFaviconForPage(uri).then((favicon) => callback(favicon.uri));
    }
  }
}

```

## File: `JS/second_sidebar/wrappers/g_customize_mode.mjs`

```mjs
export class gCustomizeModeWrapper {
  static enter() {
    gCustomizeMode.enter();
  }

  /**
   * @returns {boolean}
   */
  static get _customizing() {
    return gCustomizeMode._customizing;
  }
}

```

## File: `JS/second_sidebar/wrappers/g_nav_toolbox.mjs`

```mjs
export class gNavToolboxWrapper {
  /**
   *
   * @param {string} type
   * @param {function(Event):void} listener
   */
  static addEventListener(type, listener) {
    gNavToolbox.addEventListener(type, listener);
  }
}

```

## File: `JS/second_sidebar/wrappers/global.mjs`

```mjs
export const OPEN_URL_IN = {
  TAB: "tab",
  BACKGROUND_TAB: "tabshifted",
};

/**
 *
 * @param {string} url
 * @param {OPEN_URL_IN} where
 */
export const openTrustedLinkInWrapper = (url, where) => {
  openTrustedLinkIn(url, where);
};

```

## File: `JS/second_sidebar/wrappers/net_utils.mjs`

```mjs
/**
 * @typedef {Object} URI
 * @property {string} scheme
 * @property {string} host
 * @property {string} spec
 * @property {string} specIgnoringRef
 */

export class NetUtilWrapper {
  /**
   *
   * @param {string} url
   * @returns {URI}
   */
  static newURI(url) {
    return NetUtil.newURI(url);
  }
}

```

## File: `JS/second_sidebar/wrappers/observers.mjs`

```mjs
export class ObserversWrapper {
  /**
   * @typedef {Object} Observer
   * @property {function(object, string):void} observe
   */

  /**
   *
   * @param {Observer} observer
   * @param {string} topic
   */
  static addObserver(observer, topic) {
    Services.obs.addObserver(observer, topic);
  }

  /**
   *
   * @param {Observer} observer
   * @param {string} topic
   */
  static removeObserver(observer, topic) {
    Services.obs.removeObserver(observer, topic);
  }

  /**
   *
   * @param {Observer} subject
   * @param {string} topic
   */
  static notifyObservers(subject, topic) {
    Services.obs.notifyObservers(subject, topic);
  }
}

```

## File: `JS/second_sidebar/wrappers/preferences.mjs`

```mjs
export class PreferencesWrapper {
  /**
   *
   * @param {string} pref
   * @returns {boolean}
   */
  static prefHasUserValue(pref) {
    return Services.prefs.prefHasUserValue(pref);
  }

  /**
   *
   * @param {string} pref
   * @returns {string}
   */
  static getStringPref(pref) {
    return Services.prefs.getStringPref(pref);
  }

  /**
   *
   * @param {string} pref
   * @param {string} value
   */
  static setStringPref(pref, value) {
    return Services.prefs.setStringPref(pref, value);
  }

  /**
   *
   * @param {string} pref
   * @returns {boolean}
   */
  static getBoolPref(pref) {
    return Services.prefs.getBoolPref(pref);
  }

  /**
   *
   * @param {string} pref
   * @param {boolean} value
   */
  static setBoolPref(pref, value) {
    return Services.prefs.setBoolPref(pref, value);
  }
}

```

## File: `JS/second_sidebar/wrappers/script_security_manager.mjs`

```mjs
export class ScriptSecurityManagerWrapper {
  /**@type {number} */
  static DEFAULT_USER_CONTEXT_ID =
    Services.scriptSecurityManager.DEFAULT_USER_CONTEXT_ID;

  /**
   *
   * @returns {number}
   */
  static getSystemPrincipal() {
    return Services.scriptSecurityManager.getSystemPrincipal();
  }
}

```

## File: `JS/second_sidebar/wrappers/session_store.mjs`

```mjs
/* eslint-disable no-unused-vars */
import { WindowWrapper } from "./window.mjs";
/* eslint-enable no-unused-vars */

export class SessionStoreWrapper {
  static get raw() {
    return SessionStore;
  }
  /**
   *
   * @param {WindowWrapper} window
   */
  static maybeDontRestoreTabs(window) {
    this.raw.maybeDontRestoreTabs(window.raw);
  }
}

```

## File: `JS/second_sidebar/wrappers/sidebar_controller.mjs`

```mjs
export class SidebarControllerWrapper {
  static get _positionStart() {
    return SidebarController._positionStart;
  }

  static reversePosition() {
    SidebarController.reversePosition();
  }
}

```

## File: `JS/second_sidebar/wrappers/tab_browser.mjs`

```mjs
import { Browser } from "../xul/base/browser.mjs";
import { Tab } from "../xul/base/tab.mjs";
import { TabPanelsWrapper } from "./tab_panels.mjs";

/**
 * @typedef {Object} URI
 * @property {string} scheme
 * @property {string} host
 * @property {string} spec
 * @property {string} specIgnoringRef
 */

/**
 * @typedef {Object} BrowserForTab
 * @property {HTMLElement} browser
 */

export class TabBrowserWrapper {
  #gBrowser;

  constructor(gBrowser) {
    this.#gBrowser = gBrowser;
  }

  get raw() {
    return this.#gBrowser;
  }

  /**
   * @returns {URI}
   */
  get currentURI() {
    return this.raw.currentURI;
  }

  /**
   * @returns {Array<Tab>}
   */
  get tabs() {
    return this.raw.tabs.map((tab) => new Tab({ element: tab }));
  }

  /**
   * @returns {Tab}
   */
  get selectedTab() {
    return new Tab({ element: this.raw.selectedTab });
  }

  /**
   * @param {Tab} tab
   */
  set selectedTab(tab) {
    this.raw.selectedTab = tab.getXUL();
  }

  /**
   * @returns {Browser}
   */
  get selectedBrowser() {
    return new Browser({ element: this.raw.selectedBrowser });
  }

  /**
   * @returns {TabPanelsWrapper}
   */
  get tabpanels() {
    return new TabPanelsWrapper(this.raw.tabpanels);
  }

  /**
   *
   * @param {Tab} tab
   * @returns {Browser}
   */
  getBrowserForTab(tab) {
    return new Browser({
      element: this.raw.getBrowserForTab(tab.getXUL()),
    });
  }

  /**
   *
   * @param {Browser} browser
   * @returns {Tab}
   */
  getTabForBrowser(browser) {
    return new Tab({
      element: this.raw.getTabForBrowser(browser.getXUL()),
    });
  }

  /**
   *
   * @param {string} url
   * @param {object} options
   * @param {number} options.triggeringPrincipal
   * @returns {Tab}
   */
  addTab(url, options) {
    return new Tab({ element: this.raw.addTab(url, options) });
  }

  /**
   *
   * @param {Tab} tab
   */
  removeTab(tab) {
    this.raw.removeTab(tab.getXUL());
  }

  /**
   *
   * @param {number} index
   */
  selectTabAtIndex(index) {
    this.raw.selectTabAtIndex(index);
  }

  /**
   *
   * @param {string} type
   * @param {function(Event):void} callback
   */
  addEventListener(type, callback) {
    this.raw.addEventListener(type, callback);
  }
}

```

## File: `JS/second_sidebar/wrappers/tab_panels.mjs`

```mjs
export class TabPanelsWrapper {
  #tabpanels;

  constructor(tabpanels) {
    this.#tabpanels = tabpanels;
  }

  get raw() {
    return this.#tabpanels;
  }

  /**
   *
   * @param {string} type
   * @param {function(Event):void} callback
   */
  addEventListener(type, callback) {
    this.raw.addEventListener(type, callback);
  }
}

```

## File: `JS/second_sidebar/wrappers/window.mjs`

```mjs
import { TabBrowserWrapper } from "./tab_browser.mjs";
import { XULElement } from "../xul/base/xul_element.mjs";

export class WindowWrapper {
  #window;
  #gBrowser;
  /**
   *
   * @param {Window} chromeWindow
   */
  constructor(chromeWindow = null) {
    this.#window = chromeWindow ?? window;
    this.#gBrowser = new TabBrowserWrapper(this.raw.gBrowser);
  }

  /**
   * @returns {Window}
   */
  get raw() {
    return this.#window;
  }

  /**
   * @returns {string}
   */
  get id() {
    return this.raw.__SSi;
  }

  /**
   * @returns {string}
   */
  get name() {
    return this.raw.name;
  }

  /**
   * @returns {TabBrowserWrapper}
   */
  get gBrowser() {
    return this.#gBrowser;
  }

  /**
   * @returns {Document?}
   */
  get document() {
    return this.raw.document;
  }

  /**
   * @returns {XULElement?}
   */
  get documentElement() {
    const documentElement = this.document?.documentElement;
    if (documentElement) {
      return new XULElement({ element: documentElement });
    }
    return null;
  }

  /**
   * @returns {boolean}
   */
  get fullScreen() {
    return this.raw.fullScreen;
  }

  /**
   * @returns {number}
   */
  get mozInnerScreenX() {
    return this.raw.mozInnerScreenX;
  }

  /**
   * @returns {number}
   */
  get mozInnerScreenY() {
    return this.raw.mozInnerScreenY;
  }

  /**
   *
   * @param {Event} event
   * @returns {boolean}
   */
  dispatchEvent(event) {
    return this.raw.dispatchEvent(event);
  }

  /**
   *
   * @param {string} type
   * @param {function(Event):any} listener
   */
  addEventListener(type, listener) {
    this.raw.addEventListener(type, listener);
  }

  relinkTreeOwner() {
    this.raw.docShell.treeOwner
      .QueryInterface(Ci.nsIInterfaceRequestor)
      .getInterface(Ci.nsIAppWindow).XULBrowserWindow =
      this.raw.XULBrowserWindow;
  }

  /**
   * @param {WindowWrapper} lhs
   * @param {WindowWrapper} rhs
   * @returns {boolean}
   */
  static isEqual(lhs, rhs) {
    return lhs.#window === rhs.#window;
  }
}

```

## File: `JS/second_sidebar/wrappers/window_manager.mjs`

```mjs
import { WindowWrapper } from "./window.mjs";

export class WindowManagerWrapper {
  /**
   *
   * @returns {WindowWrapper}
   */
  static getMostRecentBrowserWindow() {
    return new WindowWrapper(Services.wm.getMostRecentBrowserWindow());
  }
}

```

## File: `JS/second_sidebar/wrappers/window_watcher.mjs`

```mjs
import { WindowWrapper } from "./window.mjs";

export class WindowWatcherWrapper {
  /**
   *
   * @returns {Array<WindowWrapper>}
   */
  static getWindowEnumerator() {
    return Array.from(this.raw.getWindowEnumerator()).map(
      (window) => new WindowWrapper(window),
    );
  }

  /**
   *
   * @param {string} name
   * @returns {WindowWrapper}
   */
  static getWindowByName(name) {
    return new WindowWrapper(this.raw.getWindowByName(name));
  }

  static get raw() {
    return Services.ww;
  }
}

```

## File: `JS/second_sidebar/wrappers/zoom_manager.mjs`

```mjs
/* eslint-disable no-unused-vars */
import { Browser } from "../xul/base/browser.mjs";
/* eslint-enable no-unused-vars */

export class ZoomManagerWrapper {
  /**@type {number} */
  static MIN = ZoomManager.MIN;
  /**@type {number} */
  static MAX = ZoomManager.MAX;

  /**
   *
   * @param {Browser} browser
   * @returns {number}
   */
  static getZoomForBrowser(browser) {
    return ZoomManager.getZoomForBrowser(browser.getXUL());
  }

  /**
   *
   * @param {Browser} browser
   * @param {number} value
   */
  static setZoomForBrowser(browser, value) {
    return ZoomManager.setZoomForBrowser(browser.getXUL(), value);
  }

  /**
   * @returns {Array<number>}
   */
  static get zoomValues() {
    return ZoomManager.zoomValues;
  }

  /**
   *
   * @param {number} value
   * @returns {number}
   */
  static snap(value) {
    return ZoomManager.snap(value);
  }
}

```

## File: `JS/second_sidebar/xul/base/box.mjs`

```mjs
import { XULElement } from "./xul_element.mjs";

export class Box extends XULElement {
  /**
   *
   * @param {object} params
   * @param {string?} params.id
   * @param {Array<string>} params.classList
   */
  constructor({ id = null, classList = [] } = {}) {
    super({ tag: "box", id, classList });
  }
}

```

## File: `JS/second_sidebar/xul/base/browser.mjs`

```mjs
import { NetUtilWrapper } from "../../wrappers/net_utils.mjs";
import { ScriptSecurityManagerWrapper } from "../../wrappers/script_security_manager.mjs";
import { XULElement } from "./xul_element.mjs";
import { ZoomManagerWrapper } from "../../wrappers/zoom_manager.mjs";

export class Browser extends XULElement {
  static ZOOM_DELTA = 0.1;
  /**
   *
   * @param {object} params
   * @param {string?} params.id
   * @param {Array<string>} params.classList
   * @param {HTMLElement?} params.element
   */
  constructor({ id = null, classList = [], element } = {}) {
    super({ tag: "browser", id, classList, element });
  }

  /**
   * @returns {Document?}
   */
  get contentDocument() {
    return this.element.contentDocument;
  }

  /**
   *
   * @returns {string}
   */
  getCurrentUrl() {
    return this.element.currentURI.spec;
  }

  /**
   *
   * @param {object} progressListener
   * @returns {Browser}
   */
  addProgressListener(progressListener) {
    this.element.addProgressListener(
      progressListener,
      Ci.nsIWebProgress.NOTIFY_ALL,
    );
    return this;
  }

  /**
   *
   * @returns {boolean}
   */
  canGoBack() {
    try {
      return this.element.canGoBack;
    } catch (error) {
      console.log("Failed to get canGoBack:", error);
      return false;
    }
  }

  /**
   *
   * @returns {Browser}
   */
  goBack() {
    this.element.goBack();
    return this;
  }

  /**
   *
   * @returns {boolean}
   */
  canGoForward() {
    try {
      return this.element.canGoForward;
    } catch (error) {
      console.log("Failed to get canForward:", error);
      return false;
    }
  }

  /**
   *
   * @returns {Browser}
   */
  goForward() {
    this.element.goForward();
    return this;
  }

  /**
   *
   * @returns {Browser}
   */
  reload() {
    this.element.reload();
    return this;
  }

  /**
   *
   * @param {string} url
   * @returns {Browser}
   */
  go(url) {
    this.element.loadURI(NetUtilWrapper.newURI(url), {
      triggeringPrincipal: ScriptSecurityManagerWrapper.getSystemPrincipal(),
    });

    return this;
  }

  /**
   *
   * @returns {number}
   */
  getZoom() {
    return ZoomManagerWrapper.getZoomForBrowser(this);
  }

  /**
   *
   * @param {number} value
   * @returns {Browser}
   */
  setZoom(value) {
    ZoomManagerWrapper.setZoomForBrowser(this, value);
    return this;
  }

  /**
   *
   * @returns {string}
   */
  getTitle() {
    return this.element.contentTitle;
  }

  /**
   *
   * @param {string} userAgent
   * @returns {Browser}
   */
  setCustomUserAgent(userAgent) {
    const browsingContext = this.element.browsingContext;
    if (browsingContext && userAgent !== browsingContext.customUserAgent) {
      browsingContext.customUserAgent = userAgent;
    }
    return this;
  }
}

```

## File: `JS/second_sidebar/xul/base/button.mjs`

```mjs
import { XULElement } from "./xul_element.mjs";

export class Button extends XULElement {
  /**
   *
   * @param {object} params
   * @param {string?} params.id
   * @param {Array<string>} params.classList
   */
  constructor({ id = null, classList = [] } = {}) {
    super({ tag: "button", id, classList, isXUL: false });
  }

  /**
   *
   * @param {string} text
   * @returns {Button}
   */
  setText(text) {
    this.element.innerText = text;
    return this;
  }
}

```

## File: `JS/second_sidebar/xul/base/div.mjs`

```mjs
import { XULElement } from "./xul_element.mjs";

export class Div extends XULElement {
  /**
   *
   * @param {object} params
   * @param {string?} params.id
   * @param {Array<string>} params.classList
   */
  constructor({ id = null, classList = [] } = {}) {
    super({ tag: "div", id, classList, isXUL: false });
  }
}

```

## File: `JS/second_sidebar/xul/base/hbox.mjs`

```mjs
import { XULElement } from "./xul_element.mjs";

export class HBox extends XULElement {
  /**
   *
   * @param {object} params
   * @param {string?} params.id
   * @param {Array<string>} params.classList
   */
  constructor({ id = null, classList = [] } = {}) {
    super({ tag: "hbox", id, classList });
  }
}

```

## File: `JS/second_sidebar/xul/base/header.mjs`

```mjs
import { XULElement } from "./xul_element.mjs";

export class Header extends XULElement {
  /**
   *
   * @param {number} level
   * @param {object} params
   * @param {string?} params.id
   * @param {Array<string>} params.classList
   */
  constructor(level, { id = null, classList = [] } = {}) {
    super({ tag: `h${level}`, id, classList, isXUL: false });
  }

  /**
   *
   * @param {string} text
   * @returns {Header}
   */
  setText(text) {
    this.element.textContent = text;
    return this;
  }

  /**
   *
   * @returns {string}
   */
  getText() {
    return this.element.textContent;
  }
}

```

## File: `JS/second_sidebar/xul/base/image.mjs`

```mjs
import { XULElement } from "./xul_element.mjs";

export class Image extends XULElement {
  /**
   *
   * @param {object} params
   * @param {string?} params.id
   * @param {Array<string>} params.classList
   */
  constructor({ id = null, classList = [] } = {}) {
    super({ tag: "image", id, classList });
  }

  /**
   *
   * @param {string} src
   * @returns {Image}
   */
  setSrc(src) {
    this.element.src = src;
    return this;
  }
}

```

## File: `JS/second_sidebar/xul/base/img.mjs`

```mjs
import { XULElement } from "./xul_element.mjs";

export class Img extends XULElement {
  /**
   *
   * @param {object} params
   * @param {string?} params.id
   * @param {Array<string>} params.classList
   */
  constructor({ id = null, classList = [] } = {}) {
    super({ tag: "img", id, classList, isXUL: false });
  }

  /**
   *
   * @param {string} src
   * @returns {Img}
   */
  setSrc(src) {
    this.element.src = src;
    return this;
  }
}

```

## File: `JS/second_sidebar/xul/base/input.mjs`

```mjs
import { XULElement } from "./xul_element.mjs";

export class Input extends XULElement {
  /**
   *
   * @param {object} params
   * @param {string?} params.id
   * @param {Array<string>} params.classList
   */
  constructor({ id = null, classList = [] } = {}) {
    super({ tag: "input", id, classList, isXUL: false });
  }

  /**
   *
   * @param {string} type
   * @returns {Input}
   */
  setType(type) {
    this.element.type = type;
    return this;
  }

  /**
   *
   * @param {string} value
   * @returns {Input}
   */
  setValue(value) {
    this.element.value = value;
    return this;
  }

  /**
   *
   * @returns {string}
   */
  getValue() {
    return this.element.value;
  }

  /**
   *
   * @param {string} image
   * @returns {Input}
   */
  setBackgroundImage(image) {
    this.element.style.backgroundImage = `url("${image}")`;
    return this;
  }
}

```

## File: `JS/second_sidebar/xul/base/label.mjs`

```mjs
import { XULElement } from "./xul_element.mjs";

export class Label extends XULElement {
  /**
   *
   * @param {object} params
   * @param {string?} params.id
   * @param {Array<string>} params.classList
   */
  constructor({ id = null, classList = [] } = {}) {
    super({ tag: "label", id, classList });
  }

  /**
   *
   * @param {string} text
   * @returns {Label}
   */
  setText(text) {
    this.element.textContent = text;
    return this;
  }
}

```

## File: `JS/second_sidebar/xul/base/menuitem.mjs`

```mjs
import { XULElement } from "./xul_element.mjs";

export class MenuItem extends XULElement {
  /**
   *
   * @param {object} params
   * @param {string?} params.id
   * @param {Array<string>} params.classList
   */
  constructor({ id = null, classList = [] } = {}) {
    super({ tag: "menuitem", id, classList });
  }

  /**
   *
   * @param {string} text
   * @returns {MenuItem}
   */
  setLabel(text) {
    return this.setAttribute("label", text);
  }

  /**
   *
   * @param {boolean} value
   * @returns {MenuItem}
   */
  setDisabled(value) {
    if (value) {
      this.setAttribute("disabled", true);
    } else {
      this.removeAttribute("disabled");
    }
    return true;
  }
}

```

## File: `JS/second_sidebar/xul/base/menulist.mjs`

```mjs
import { XULElement } from "./xul_element.mjs";

export class MenuList extends XULElement {
  /**
   *
   * @param {object} params
   * @param {string?} params.id
   * @param {Array<string>} params.classList
   */
  constructor({ id = null, classList = [] } = {}) {
    super({ tag: "menulist", id, classList });
  }

  /**
   *
   * @param {any} value
   * @returns {MenuList}
   */
  setValue(value) {
    this.element.value = value;
    return this;
  }

  /**
   *
   * @returns {any}
   */
  getValue() {
    return this.element.value;
  }

  /**
   *
   * @param {string} label
   * @param {any} value
   * @returns {MenuList}
   */
  appendItem(label, value) {
    this.element.appendItem(label, value);
    return this;
  }

  /**
   *
   * @returns {MenuList}
   */
  removeAllItems() {
    this.element.removeAllItems();
    return this;
  }

  /**
   *
   * @returns {HTMLElement}
   */
  getLastMenuItemXUL() {
    return this.element.menupopup.lastChild;
  }
}

```

## File: `JS/second_sidebar/xul/base/menupopup.mjs`

```mjs
import { XULElement } from "./xul_element.mjs";

export class MenuPopup extends XULElement {
  /**
   *
   * @param {object} params
   * @param {string?} params.id
   * @param {Array<string>} params.classList
   */
  constructor({ id = null, classList = [] } = {}) {
    super({ tag: "menupopup", id, classList });

    this.addEventListener("popupshowing", () =>
      this.toggleAttribute("panelopen", true),
    );
    this.addEventListener("popuphiding", () =>
      this.toggleAttribute("panelopen", false),
    );
  }
}

```

## File: `JS/second_sidebar/xul/base/menuseparator.mjs`

```mjs
import { XULElement } from "./xul_element.mjs";

export class MenuSeparator extends XULElement {
  /**
   *
   * @param {object} params
   * @param {string?} params.id
   * @param {Array<string>} params.classList
   */
  constructor({ id = null, classList = [] } = {}) {
    super({ tag: "menuseparator", id, classList });
  }
}

```

## File: `JS/second_sidebar/xul/base/panel.mjs`

```mjs
/* eslint-disable no-unused-vars */
import { Widget } from "./widget.mjs";
import { XULElement } from "./xul_element.mjs";
/* eslint-enable no-unused-vars */

export class Panel extends XULElement {
  /**
   *
   * @param {object} params
   * @param {string?} params.id
   * @param {Array<string>} params.classList
   */
  constructor({ id = null, classList = [] } = {}) {
    super({ tag: "panel", id, classList: [...classList, "panel-no-padding"] });
  }

  /**
   *
   * @param {string} type
   * @returns {Panel}
   */
  setType(type) {
    return this.setAttribute("type", type);
  }

  /**
   *
   * @param {string} role
   * @returns {Panel}
   */
  setRole(role) {
    return this.setAttribute("role", role);
  }

  /**
   *
   * @returns {Panel}
   */
  hidePopup() {
    this.element.hidePopup();
    return this;
  }

  /**
   *
   * @param {XULElement | Widget} target
   * @param {string} position
   * @returns {Panel}
   */
  openPopup(target, position = "start_before") {
    this.element.openPopup(target.getXUL(), position);
    return this;
  }

  /**
   *
   * @param {number} screenX
   * @param {number} screenY
   * @returns {Panel}
   */
  openPopupAtScreen(screenX, screenY) {
    this.element.openPopupAtScreen(screenX, screenY);
    return this;
  }

  /**
   *
   * @param {XULElement} target
   * @param {string} position
   * @returns {Panel}
   */
  moveToAnchor(target, position = "start_before") {
    this.element.moveToAnchor(target.getXUL(), position);
    return this;
  }

  /**
   *
   * @returns {boolean}
   */
  isPanelOpen() {
    return this.element.getAttribute("panelopen") === "true";
  }

  /**
   *
   * @returns {string}
   */
  getState() {
    return this.element.state;
  }
}

```

## File: `JS/second_sidebar/xul/base/panel_multi_view.mjs`

```mjs
import { XULElement } from "./xul_element.mjs";

export class PanelMultiView extends XULElement {
  /**
   *
   * @param {object} params
   * @param {string?} params.id
   * @param {Array<string>} params.classList
   */
  constructor({ id = null, classList = [] } = {}) {
    super({ tag: "panelmultiview", id, classList });
  }
}

```

## File: `JS/second_sidebar/xul/base/span.mjs`

```mjs
import { XULElement } from "./xul_element.mjs";

export class Span extends XULElement {
  /**
   *
   * @param {object} params
   * @param {string?} params.id
   * @param {Array<string>} params.classList
   */
  constructor({ id = null, classList = [] } = {}) {
    super({ tag: "span", id, classList, isXUL: false });
  }

  /**
   *
   * @param {string} text
   * @returns {Span}
   */
  setText(text) {
    this.element.textContent = text;
    return this;
  }

  /**
   *
   * @param {string} value
   * @returns {Span}
   */
  setFontSize(value) {
    return this.setProperty("font-size", value);
  }
}

```

## File: `JS/second_sidebar/xul/base/splitter.mjs`

```mjs
import { XULElement } from "./xul_element.mjs";

export class Splitter extends XULElement {
  /**
   *
   * @param {object} params
   * @param {string?} params.id
   * @param {Array<string>} params.classList
   */
  constructor({ id = null, classList = [] } = {}) {
    super({ tag: "splitter", id, classList });
  }

  /**
   *
   * @param {string} value
   * @returns {Splitter}
   */
  setResizeBefore(value) {
    return this.setAttribute("resizebefore", value);
  }

  /**
   *
   * @param {string} value
   * @returns {Splitter}
   */
  setResizeAfter(value) {
    return this.setAttribute("resizeafter", value);
  }
}

```

## File: `JS/second_sidebar/xul/base/style.mjs`

```mjs
import { XULElement } from "./xul_element.mjs";

export class Style extends XULElement {
  /**
   *
   * @param {string} style
   */
  constructor(style) {
    super({ tag: "style", isXUL: false });
    this.setInnerText(style);
  }
}

```

## File: `JS/second_sidebar/xul/base/tab.mjs`

```mjs
import { Browser } from "./browser.mjs";
import { XULElement } from "./xul_element.mjs";

export class Tab extends XULElement {
  /**
   *
   * @param {object} params
   * @param {string?} params.id
   * @param {Array<string>} params.classList
   * @param {HTMLElement?} params.element
   */
  constructor({ id = null, classList = [], element } = {}) {
    super({ tag: "tab", id, classList, element });
  }

  /**
   * @returns {Browser?}
   */
  get linkedBrowser() {
    return new Browser({ element: this.element.linkedBrowser });
  }

  /**
   *
   * @returns {boolean}
   */
  get selected() {
    return this.element.selected ?? false;
  }

  /**
   * @returns {boolean}
   */
  get soundPlaying() {
    return this.element.soundPlaying;
  }

  /**
   * @returns {boolean}
   */
  get muted() {
    return this.element.muted;
  }

  /**
   *
   * @returns {Tab}
   */
  toggleMuteAudio() {
    this.element.toggleMuteAudio();
    return this;
  }
}

```

## File: `JS/second_sidebar/xul/base/toggle.mjs`

```mjs
import { XULElement } from "./xul_element.mjs";

export class Toggle extends XULElement {
  /**
   *
   * @param {object} params
   * @param {string?} params.id
   * @param {Array<string>} params.classList
   */
  constructor({ id = null, classList = [] } = {}) {
    super({ tag: "moz-toggle", id, classList, isXUL: false });
  }

  /**
   *
   * @returns {boolean}
   */
  getPressed() {
    return this.element.pressed;
  }

  /**
   *
   * @param {boolean} value
   * @returns {Toggle}
   */
  setPressed(value) {
    this.element.pressed = value;
    return this;
  }
}

```

## File: `JS/second_sidebar/xul/base/toolbar.mjs`

```mjs
import { XULElement } from "./xul_element.mjs";

export class Toolbar extends XULElement {
  /**
   *
   * @param {object} params
   * @param {string?} params.id
   * @param {Array<string>} params.classList
   */
  constructor({ id = null, classList = [] } = {}) {
    super({ tag: "toolbar", id, classList });
  }

  /**
   *
   * @param {string} value
   * @returns {Toolbar}
   */
  setMode(value) {
    return this.setAttribute("mode", value);
  }
}

```

## File: `JS/second_sidebar/xul/base/toolbar_button.mjs`

```mjs
import { XULElement } from "./xul_element.mjs";

export class ToolbarButton extends XULElement {
  /**
   *
   * @param {object} params
   * @param {string?} params.id
   * @param {Array<string>} params.classList
   * @param {HTMLElement?} params.element
   */
  constructor({ id = null, classList = [], element } = {}) {
    super({ tag: "toolbarbutton", id, classList, element });
  }

  /**
   *
   * @param {string} url
   * @returns {ToolbarButton}
   */
  setIcon(url) {
    return this.setAttribute("image", url);
  }

  /**
   *
   * @returns {string}
   */
  getIcon() {
    return this.getAttribute("image");
  }

  /**
   *
   * @param {string} text
   * @returns {ToolbarButton}
   */
  setLabel(text) {
    this.setAttribute("label", text);
    return this;
  }

  /**
   *
   * @param {boolean} value
   * @returns {ToolbarButton}
   */
  setBadged(value) {
    if (value) {
      this.setAttribute("badged", true);
    } else {
      this.removeAttribute("badged");
    }
    return true;
  }

  /**
   *
   * @param {string} value
   * @returns {ToolbarButton}
   */
  setType(value) {
    return this.setAttribute("type", value);
  }

  /**
   *
   * @param {string} value
   * @returns {ToolbarButton}
   */
  setTooltipText(text) {
    return this.setAttribute("tooltiptext", text);
  }

  /**
   *
   * @param {boolean} value
   * @returns {ToolbarButton}
   */
  setOpen(value) {
    if (value) {
      this.setAttribute("open", value);
    } else {
      this.removeAttribute("open");
    }
    return this;
  }

  /**
   *
   * @param {boolean} value
   * @returns {ToolbarButton}
   */
  setUnloaded(value) {
    if (value) {
      this.setAttribute("unloaded", value);
    } else {
      this.removeAttribute("unloaded");
    }
    return this;
  }

  /**
   *
   * @param {boolean} value
   * @returns {ToolbarButton}
   */
  setDisabled(value) {
    if (value) {
      this.setAttribute("disabled", true);
    } else {
      this.removeAttribute("disabled");
    }
    return true;
  }

  /**
   *
   * @returns {boolean}
   */
  isDisabled() {
    return this.getAttribute("disabled") === "true";
  }

  /**
   *
   * @param {boolean} value
   * @returns {ToolbarButton}
   */
  setChecked(value) {
    if (value) {
      this.setAttribute("checked", true);
    } else {
      this.removeAttribute("checked");
    }
    return true;
  }

  /**
   *
   * @returns {boolean}
   */
  isChecked() {
    return this.getAttribute("checked") === "true";
  }

  /**
   *
   * @returns {HTMLElement}
   */
  getImageXUL() {
    return this.element.querySelector("image");
  }

  /**
   *
   * @returns {HTMLElement}
   */
  getBadgeStackXUL() {
    return this.element.querySelector(".toolbarbutton-badge-stack");
  }
}

```

## File: `JS/second_sidebar/xul/base/toolbar_separator.mjs`

```mjs
import { XULElement } from "./xul_element.mjs";

export class ToolbarSeparator extends XULElement {
  /**
   *
   * @param {object} params
   * @param {string?} params.id
   * @param {Array<string>} params.classList
   */
  constructor({ id = null, classList = [] } = {}) {
    super({ tag: "toolbarseparator", id, classList });
  }
}

```

## File: `JS/second_sidebar/xul/base/vbox.mjs`

```mjs
import { XULElement } from "./xul_element.mjs";

export class VBox extends XULElement {
  /**
   *
   * @param {object} params
   * @param {string?} params.id
   * @param {Array<string>} params.classList
   */
  constructor({ id = null, classList = [] } = {}) {
    super({ tag: "vbox", id, classList });
  }
}

```

## File: `JS/second_sidebar/xul/base/widget.mjs`

```mjs
import { CustomizableUIWrapper } from "../../wrappers/customizable_ui.mjs";
import { ToolbarButton } from "./toolbar_button.mjs";

export class Widget {
  /**
   *
   * @param {object} params
   * @param {string?} params.id
   * @param {string[]} params.classList
   * @param {string?} params.label
   * @param {string?} params.tooltipText
   * @param {string?} params.iconURL
   * @param {boolean} params.open
   * @param {boolean} params.unloaded
   * @param {string?} params.context
   * @param {string?} params.position
   */
  constructor({
    id,
    classList = [],
    label,
    tooltipText,
    iconURL,
    open = false,
    unloaded = true,
    context = null,
    position = null,
  }) {
    this.id = id;
    this.classList = classList;
    this.label = label;
    this.tooltipText = tooltipText;
    this.iconURL = iconURL;
    this.open = open;
    this.unloaded = unloaded;
    this.context = context;
    this.onClick = null;
    try {
      this.widget = CustomizableUIWrapper.createWidget({
        id,
        onCreated: async (element) => {
          console.log(`Widget ${id} was created`);
          this.#setup(new ToolbarButton({ element, classList }));
        },
        onClick: async (event) => {
          if (this.onClick) {
            this.onClick(event);
          }
        },
      });
    } catch {
      console.log(`Widget ${id} is already created`);
      this.#setup(this.button);
    }
    if (position) {
      const placement =
        CustomizableUIWrapper.getPlacementOfWidget("new-web-panel");
      CustomizableUIWrapper.addWidgetToArea(
        id,
        placement.area,
        placement.position + (position === "before" ? 0 : 1),
      );
    }
  }

  /**
   * @returns {ToolbarButton?}
   */
  get button() {
    const widget = CustomizableUIWrapper.getWidget(this.id);
    if (!widget) {
      return null;
    }
    const instance = widget.forWindow(window);
    if (!instance) {
      return null;
    }
    return new ToolbarButton({
      element: instance.node,
      classList: this.classList,
    });
  }

  /**
   *
   * @param {ToolbarButton} button
   */
  #setup(button) {
    button.setBadged(true);
    button.setOpen(this.open);
    button.setUnloaded(this.unloaded);
    if (this.iconURL) {
      button.setIcon(this.iconURL);
    }
    if (this.label) {
      button.setLabel(this.label);
    }
    if (this.tooltipText) {
      button.setTooltipText(this.tooltipText);
    }
    if (this.context) {
      button.setContext(this.context);
    }
  }

  /**
   *
   * @param {function(MouseEvent):void} callback
   * @returns {Widget}
   */
  setOnClick(callback) {
    this.onClick = callback;
    return this;
  }

  /**
   *
   * @param {string} iconURL
   * @returns {Widget}
   */
  setIcon(iconURL) {
    this.iconURL = iconURL;
    const button = this.button;
    if (button) {
      button.setIcon(this.iconURL);
    }
    return this;
  }

  /**
   *
   * @param {string} iconURL
   * @returns {Widget}
   */
  setLabel(text) {
    this.label = text;
    const button = this.button;
    if (button) {
      button.setLabel(this.label);
    }
    return this;
  }

  /**
   *
   * @param {string} iconURL
   * @returns {Widget}
   */
  setTooltipText(text) {
    this.tooltipText = text;
    const button = this.button;
    if (button) {
      button.setTooltipText(this.tooltipText);
    }
    return this;
  }

  /**
   *
   * @returns {boolean}
   */
  isUnloaded() {
    return this.unloaded;
  }

  /**
   *
   * @param {boolean} value
   * @returns {Widget}
   */
  setUnloaded(value) {
    this.unloaded = value;
    const button = this.button;
    if (button) {
      button.setUnloaded(value);
    }
    return this;
  }

  /**
   *
   * @returns {boolean}
   */
  isOpen() {
    return this.open;
  }

  /**
   *
   * @param {boolean} value
   * @returns {Widget}
   */
  setOpen(value) {
    this.open = value;
    const button = this.button;
    if (button) {
      button.setOpen(value);
    }
    return this;
  }

  /**
   *
   * @param {boolean} value
   * @returns {Widget}
   */
  setDisabled(value) {
    this.open = value;
    const button = this.button;
    if (button) {
      button.setDisabled(value);
    }
    return this;
  }

  /**
   *
   * @param {string} name
   * @param {string} value
   * @returns {Widget}
   */
  setAttribute(name, value) {
    const button = this.button;
    if (button) {
      button.setAttribute(name, value);
    }
    return this;
  }

  /**
   *
   * @returns {HTMLElement?}
   */
  getXUL() {
    return this.button?.getXUL();
  }

  /**
   *
   * @returns {Widget}
   */
  remove() {
    CustomizableUIWrapper.destroyWidget(this.id);
    return this;
  }

  /**
   *
   * @param {function():void} callback
   * @returns {Widget}
   */
  doWhenButtonReady(callback) {
    const interval = setInterval(() => {
      if (!this.button) {
        return;
      }
      clearInterval(interval);
      callback();
    }, 100);
    return this;
  }

  /**
   *
   * @param {function():void} callback
   * @returns {Widget}
   */
  doWhenButtonImageReady(callback) {
    const interval = setInterval(() => {
      if (!this.button.getImageXUL()) {
        return;
      }
      clearInterval(interval);
      callback();
    }, 100);
    return this;
  }
}

```

## File: `JS/second_sidebar/xul/base/xul_element.mjs`

```mjs
export class XULElement {
  /**
   *
   * @param {object} params
   * @param {string?} params.tag
   * @param {string?} params.id
   * @param {Array<string>} params.classList
   * @param {boolean} params.isXUL
   * @param {HTMLElement?} params.element
   */
  constructor({
    tag = null,
    id = null,
    classList = [],
    isXUL = true,
    element = null,
  } = {}) {
    /**@type {HTMLElement} */
    this.element = null;
    if (element !== null) {
      this.element = element;
    } else {
      this.element = isXUL
        ? document.createXULElement(tag)
        : document.createElement(tag);
    }
    if (id !== null) {
      this.element.id = id;
    }
    if (classList.length > 0) {
      this.element.classList.add(...classList);
    }
  }

  /**
   * @returns {string?}
   */
  get id() {
    return this.element.id;
  }

  /**
   *
   * @param {string} className
   * @returns {XULElement}
   */
  addClass(className) {
    this.element.classList.add(className);
    return this;
  }

  /**
   *
   * @returns {HTMLelement}
   */
  getXUL() {
    return this.element;
  }

  /**
   *
   * @returns {XULElement}
   */
  show() {
    return this.removeAttribute("hidden");
  }

  /**
   *
   * @returns {XULElement}
   */
  hide() {
    return this.setAttribute("hidden", "true");
  }

  /**
   *
   * @returns {boolean}
   */
  hidden() {
    return this.getAttribute("hidden") === "true";
  }

  /**
   *
   * @param {string} selector
   * @returns {XULElement?}
   */
  querySelector(selector) {
    const element = this.element.querySelector(selector);
    if (element) {
      return new XULElement({ element });
    }
    return null;
  }

  /**
   *
   * @param {XULElement} child
   * @returns {XULElement}
   */
  appendChild(child) {
    this.element.appendChild(child.getXUL());
    return this;
  }

  /**
   *
   * @param {XULElement} child
   * @returns {XULElement}
   */
  prependChild(child) {
    this.element.insertBefore(child.getXUL(), this.element.firstChild);
    return this;
  }

  /**
   *
   * @param {Array<XULElement>} children
   * @returns {XULElement}
   */
  appendChildren(...children) {
    children.forEach((child) => this.appendChild(child));
    return this;
  }

  /**
   *
   * @param {XULElement} node
   * @param {XULElement} child
   * @returns {XULElement}
   */
  insertBefore(node, child) {
    this.element.insertBefore(node.getXUL(), child.getXUL());
    return this;
  }

  /**
   *
   * @param {string} name
   * @param {string|number} value
   * @returns {XULElement}
   */
  setAttribute(name, value) {
    this.element.setAttribute(name, value);
    return this;
  }

  /**
   *
   * @param {object} attributes
   * @returns {XULElement}
   */
  setAttributes(attributes = {}) {
    for (const [key, value] of Object.entries(attributes)) {
      this.setAttribute(key, value);
    }
    return this;
  }

  /**
   *
   * @param {string} name
   * @returns {boolean}
   */
  hasAttribute(name) {
    return this.element.hasAttribute(name);
  }

  /**
   *
   * @param {string} name
   * @returns {string?}
   */
  getAttribute(name) {
    return this.element.getAttribute(name);
  }

  /**
   *
   * @param {string} name
   * @returns {XULElement}
   */
  removeAttribute(name) {
    this.element.removeAttribute(name);
    return this;
  }

  /**
   *
   * @param {Array<string>} names
   * @returns {XULElement}
   */
  removeAttributes(names) {
    names.forEach((name) => this.removeAttribute(name));
    return this;
  }

  /**
   *
   * @param {string} name
   * @param {boolean} force
   * @returns {XULElement}
   */
  toggleAttribute(name, force) {
    this.element.toggleAttribute(name, force);
    return this;
  }

  /**
   *
   * @returns {string}
   */
  getWidth() {
    return this.getAttribute("width");
  }

  /**
   *
   * @param {string} width
   * @returns {XULElement}
   */
  setWidth(width) {
    this.setAttribute("width", width);
    this.element.style.width = width + "px";
    return this;
  }

  /**
   *
   * @returns {DOMRect}
   */
  getBoundingClientRect() {
    return this.element.getBoundingClientRect();
  }

  /**
   *
   * @returns {XULElement}
   */
  focus() {
    this.element.focus();
    return this;
  }

  /**
   *
   * @param {string} context
   * @returns {XULElement}
   */
  setContext(context) {
    return this.setAttribute("context", context);
  }

  /**
   *
   * @param {string} property
   * @returns {string}
   */
  getProperty(property) {
    return this.element.style.getPropertyValue(property);
  }

  /**
   *
   * @param {string} property
   * @param {string} value
   * @returns {XULElement}
   */
  setProperty(property, value) {
    this.element.style.setProperty(property, value);
    return this;
  }

  /**
   *
   * @param {string} property
   * @returns {XULElement}
   */
  removeProperty(property) {
    this.element.style.removeProperty(property);
    return this;
  }

  /**
   *
   * @param {string} text
   * @returns {XULElement}
   */
  setInnerText(text) {
    this.element.innerText = text;
    return this;
  }

  /**
   *
   * @param {string} event
   * @param {function(MouseEvent):void} callback
   * @returns {XULElement}
   */
  addEventListener(event, callback) {
    this.element.addEventListener(event, callback);
    return this;
  }

  /**
   *
   * @param {string} event
   * @param {function(MouseEvent):void} callback
   * @returns {XULElement}
   */
  removeEventListener(event, callback) {
    this.element.removeEventListener(event, callback);
    return this;
  }

  /**
   *
   * @param {Event} event
   * @returns {XULElement}
   */
  dispatchEvent(event) {
    this.element.dispatchEvent(event);
    return this;
  }

  /**
   *
   * @param {XULElement} element
   * @returns {boolean}
   */
  contains(element) {
    return this.element.contains(element.getXUL());
  }

  /**
   *
   * @param {HTMLElement} element
   * @returns {boolean}
   */
  containsHTML(element) {
    return this.element.contains(element);
  }

  /**
   *
   * @returns {Document}
   */
  get ownerDocument() {
    return this.element.ownerDocument;
  }

  /**
   * @returns {XULElement}
   */
  remove() {
    this.element.remove();
    return this;
  }
}

```

## File: `JS/second_sidebar/xul/notification_badge.mjs`

```mjs
import { Div } from "./base/div.mjs";
import { Span } from "./base/span.mjs";

export class NotificationBadge extends Div {
  constructor() {
    super({ classList: ["sb2-notification-badge"] });
    this.span = new Span();
    this.appendChild(this.span);
  }

  /**
   *
   * @param {number?} value
   * @returns {NotificationBadge}
   */
  setValue(value) {
    if (value && value > 0) {
      this.setAttribute("value", value);
      if (value < 100) {
        this.span.setText(value).setFontSize("80%");
      } else {
        this.span.setText("99+").setFontSize("60%");
      }
    } else {
      this.removeAttribute("value");
    }
    return this;
  }
}

```

## File: `JS/second_sidebar/xul/open_link_in_sidebar_menuitem.mjs`

```mjs
import { MenuItem } from "./base/menuitem.mjs";

export class OpenLinkInSidebarMenuItem extends MenuItem {
  constructor() {
    super({ id: "context-openlinkinsidebar" });
    this.setLabel("Open Link in Second Sidebar");
  }
}

```

## File: `JS/second_sidebar/xul/popup_body.mjs`

```mjs
import { VBox } from "./base/vbox.mjs";

export class PopupBody extends VBox {
  /**
   *
   * @param {object} params
   * @param {boolean} params.compact
   */
  constructor({ compact = false } = {}) {
    super({ classList: ["sb2-popup-body"] });
    if (compact) {
      this.addClass("compact");
    }
  }
}

```

## File: `JS/second_sidebar/xul/popup_footer.mjs`

```mjs
import { HBox } from "./base/hbox.mjs";

export class PopupFooter extends HBox {
  constructor() {
    super({ classList: ["sb2-popup-footer"] });
  }
}

```

## File: `JS/second_sidebar/xul/popup_header.mjs`

```mjs
import { Header } from "./base/header.mjs";
import { ToolbarSeparator } from "./base/toolbar_separator.mjs";
import { VBox } from "./base/vbox.mjs";

export class PopupHeader extends VBox {
  /**
   *
   * @param {string} text
   */
  constructor(text) {
    super({ classList: ["sb2-popup-header"] });
    this.appendChildren(new Header(1).setText(text), new ToolbarSeparator());
  }
}

```

## File: `JS/second_sidebar/xul/sidebar.mjs`

```mjs
import { VBox } from "./base/vbox.mjs";

export class Sidebar extends VBox {
  constructor() {
    super({ id: "sb2" });
    this.setPosition("right");
  }

  /**
   *
   * @param {string} position
   * @returns {Sidebar}
   */
  setPosition(position) {
    return this.setAttribute("position", position);
  }

  /**
   *
   * @returns {string}
   */
  getPosition() {
    return this.getAttribute("position");
  }

  /**
   *
   * @returns {Sidebar}
   */
  pin() {
    return this.setAttribute("pinned", "true");
  }

  /**
   *
   * @returns {Sidebar}
   */
  unpin() {
    return this.setAttribute("pinned", "false");
  }

  /**
   *
   * @returns {boolean}
   */
  pinned() {
    return this.getAttribute("pinned") === "true";
  }
}

```

## File: `JS/second_sidebar/xul/sidebar_box.mjs`

```mjs
import { HBox } from "./base/hbox.mjs";

export class SidebarBox extends HBox {
  constructor() {
    super({ id: "sb2-box" });
    this.hide();
  }
}

```

## File: `JS/second_sidebar/xul/sidebar_box_filler.mjs`

```mjs
import { Box } from "./base/box.mjs";

export class SidebarBoxFiller extends Box {
  constructor() {
    super({ id: "sb2-box-filler" });
  }
}

```

## File: `JS/second_sidebar/xul/sidebar_collapse_button.mjs`

```mjs
import { Widget } from "./base/widget.mjs";

export class SidebarCollapseButton extends Widget {
  constructor() {
    super({
      id: "sb2-collapse-button",
      label: "Second Sidebar",
      tooltipText: "Second Sidebar",
    });
  }

  /**
   *
   * @param {function(MouseEvent):void} callback
   * @returns {WebPanelNewButton}
   */
  listenClick(callback) {
    return this.setOnClick(callback);
  }
}

```

## File: `JS/second_sidebar/xul/sidebar_main.mjs`

```mjs
import { Toolbar } from "./base/toolbar.mjs";

export class SidebarMain extends Toolbar {
  constructor() {
    super({ id: "sb2-main", classList: ["browser-toolbar"] });
    this.setMode("icons")
      .setContext("sb2-main-menupopup")
      .setAttribute("customizable", "true")
      .setAttribute("fullscreentoolbar", "true");
  }
}

```

## File: `JS/second_sidebar/xul/sidebar_main_menupopup.mjs`

```mjs
import { MenuItem } from "./base/menuitem.mjs";
import { MenuPopup } from "./base/menupopup.mjs";
import { MenuSeparator } from "./base/menuseparator.mjs";

export class SidebarMainMenuPopup extends MenuPopup {
  constructor() {
    super({
      id: "sb2-main-menupopup",
      classList: ["sb2-menupopup"],
    });

    this.settingsItem = new MenuItem().setLabel("Sidebar settings");
    this.customizeItem = new MenuItem().setLabel("Customize Toolbar...");
    this.#compose();
  }

  #compose() {
    this.appendChildren(
      this.settingsItem,
      new MenuSeparator(),
      this.customizeItem,
    );
  }

  /**
   *
   * @param {function(MouseEvent):void} callback
   */
  listenSettingsItemClick(callback) {
    this.settingsItem.addEventListener("command", () => {
      callback();
    });
  }

  /**
   *
   * @param {function(MouseEvent):void} callback
   */
  listenCustomizeItemClick(callback) {
    this.customizeItem.addEventListener("command", (event) => {
      callback(event);
    });
  }
}

```

## File: `JS/second_sidebar/xul/sidebar_main_popup_settings.mjs`

```mjs
/* eslint-disable no-unused-vars */
import {
  createCancelButton,
  createPopupGroup,
  createSaveButton,
} from "../utils/xul.mjs";

import { MenuList } from "./base/menulist.mjs";
import { Panel } from "./base/panel.mjs";
import { PanelMultiView } from "./base/panel_multi_view.mjs";
import { PopupBody } from "./popup_body.mjs";
import { PopupFooter } from "./popup_footer.mjs";
import { PopupHeader } from "./popup_header.mjs";
import { SidebarSettings } from "../settings/sidebar_settings.mjs";
import { Toggle } from "./base/toggle.mjs";
import { ToolbarSeparator } from "./base/toolbar_separator.mjs";
import { isLeftMouseButton } from "../utils/buttons.mjs";

/* eslint-enable no-unused-vars */

export class SidebarMainPopupSettings extends Panel {
  constructor() {
    super({
      id: "sb2-main-popup-settings",
      classList: ["sb2-popup", "sb2-popup-with-header"],
    });
    this.setType("arrow").setRole("group");

    this.positionMenuList = this.#createPositionMenuList();
    this.paddingMenuList = this.#createPaddingMenuList();
    this.newWebPanelPositionMenuList =
      this.#createNewWebPanelPositionMenuList();
    this.hideInPopupWindowsToggle = new Toggle();
    this.autoHideBackToggle = new Toggle();
    this.autoHideForwardToggle = new Toggle();
    this.unpinnedPaddingMenuList = this.#createPaddingMenuList();
    this.containerBorderMenuList = this.#createContainerBorderMenuList();
    this.autoHideSidebarToggle = new Toggle();
    this.hideSidebarAnimatedToggle = new Toggle();
    this.saveButton = createSaveButton();
    this.cancelButton = createCancelButton();
    this.#compose();
  }

  /**
   *
   * @returns {MenuList}
   */
  #createPositionMenuList() {
    const menuList = new MenuList();
    menuList.appendItem("Left", "left");
    menuList.appendItem("Right", "right");
    return menuList;
  }

  /**
   *
   * @returns {MenuList}
   */
  #createPaddingMenuList() {
    const menuList = new MenuList();
    menuList.appendItem("Extra Extra Small", "xxsmall");
    menuList.appendItem("Extra Small", "xsmall");
    menuList.appendItem("Small", "small");
    menuList.appendItem("Medium", "medium");
    menuList.appendItem("Large", "large");
    menuList.appendItem("Extra Large", "xlarge");
    menuList.appendItem("Extra Extra Large", "xxlarge");
    return menuList;
  }

  /**
   *
   * @returns {MenuList}
   */
  #createNewWebPanelPositionMenuList() {
    const menuList = new MenuList();
    menuList.appendItem("Before Plus Button", "before");
    menuList.appendItem("After Plus Button", "after");
    return menuList;
  }

  /**
   *
   * @returns {MenuList}
   */
  #createContainerBorderMenuList() {
    const menuList = new MenuList();
    menuList.appendItem("Left", "left");
    menuList.appendItem("Right", "right");
    menuList.appendItem("Top", "top");
    menuList.appendItem("Bottom", "bottom");
    menuList.appendItem("Around", "around");
    return menuList;
  }

  #compose() {
    this.appendChild(
      new PanelMultiView().appendChildren(
        new PopupHeader("Sidebar Settings"),
        new PopupBody().appendChildren(
          createPopupGroup("Sidebar position", this.positionMenuList),
          createPopupGroup("Auto-hide sidebar", this.autoHideSidebarToggle),
          createPopupGroup(
            "Animate sidebar hiding",
            this.hideSidebarAnimatedToggle,
          ),
          new ToolbarSeparator(),
          createPopupGroup("Sidebar width", this.paddingMenuList),
          createPopupGroup(
            "Floating web panel offset",
            this.unpinnedPaddingMenuList,
          ),
          createPopupGroup(
            "New web panel position",
            this.newWebPanelPositionMenuList,
          ),
          createPopupGroup(
            "Container indicator position",
            this.containerBorderMenuList,
          ),
          new ToolbarSeparator(),
          createPopupGroup(
            "Hide sidebar in popup windows",
            this.hideInPopupWindowsToggle,
          ),
          createPopupGroup("Auto hide back button", this.autoHideBackToggle),
          createPopupGroup(
            "Auto hide forward button",
            this.autoHideForwardToggle,
          ),
        ),
        new PopupFooter().appendChildren(this.cancelButton, this.saveButton),
      ),
    );
  }

  /**
   *
   * @param {object} callbacks
   * @param {function(string):void} callbacks.position
   * @param {function(string):void} callbacks.padding
   * @param {function(string):void} callbacks.newWebPanelPosition
   * @param {function(string):void} callbacks.unpinnedPadding
   * @param {function(boolean):void} callbacks.hideInPopupWindows
   * @param {function(boolean):void} callbacks.autoHideBackButton
   * @param {function(boolean):void} callbacks.autoHideForwardButton
   * @param {function(boolean):void} callbacks.containerBorder
   * @param {function(boolean):void} callbacks.autoHideSidebar
   * @param {function(boolean):void} callbacks.hideSidebarAnimated
   */
  listenChanges({
    position,
    padding,
    newWebPanelPosition,
    unpinnedPadding,
    hideInPopupWindows,
    autoHideBackButton,
    autoHideForwardButton,
    containerBorder,
    autoHideSidebar,
    hideSidebarAnimated,
  }) {
    this.onPositionChange = position;
    this.onPaddingChange = padding;
    this.onNewWebPanelPositionChange = newWebPanelPosition;
    this.onUnpinnedPaddingChange = unpinnedPadding;
    this.onHideInPopupWindowsChange = hideInPopupWindows;
    this.onAutoHideBackButtonChange = autoHideBackButton;
    this.onAutoHideForwardButtonChange = autoHideForwardButton;
    this.onContainerBorderChange = containerBorder;
    this.onAutoHideSidebarChange = autoHideSidebar;
    this.onAutoHideSidebarAnimatedChange = hideSidebarAnimated;

    this.positionMenuList.addEventListener("command", () =>
      position(this.positionMenuList.getValue()),
    );
    this.paddingMenuList.addEventListener("command", () =>
      padding(this.paddingMenuList.getValue()),
    );
    this.newWebPanelPositionMenuList.addEventListener("command", () =>
      newWebPanelPosition(this.newWebPanelPositionMenuList.getValue()),
    );
    this.unpinnedPaddingMenuList.addEventListener("command", () =>
      unpinnedPadding(this.unpinnedPaddingMenuList.getValue()),
    );
    this.hideInPopupWindowsToggle.addEventListener("toggle", () =>
      hideInPopupWindows(this.hideInPopupWindowsToggle.getPressed()),
    );
    this.autoHideBackToggle.addEventListener("toggle", () =>
      autoHideBackButton(this.autoHideBackToggle.getPressed()),
    );
    this.autoHideForwardToggle.addEventListener("toggle", () =>
      autoHideForwardButton(this.autoHideForwardToggle.getPressed()),
    );
    this.containerBorderMenuList.addEventListener("command", () =>
      containerBorder(this.containerBorderMenuList.getValue()),
    );
    this.autoHideSidebarToggle.addEventListener("toggle", () =>
      autoHideSidebar(this.autoHideSidebarToggle.getPressed()),
    );
    this.hideSidebarAnimatedToggle.addEventListener("toggle", () =>
      hideSidebarAnimated(this.hideSidebarAnimatedToggle.getPressed()),
    );
  }

  /**
   *
   * @param {function():void} callback
   */
  listenCancelButtonClick(callback) {
    this.cancelButton.addEventListener("click", (event) => {
      if (isLeftMouseButton(event)) {
        callback();
      }
    });
  }

  /**
   *
   * @param {function():void} callback
   */
  listenSaveButtonClick(callback) {
    this.saveButton.addEventListener("click", (event) => {
      if (isLeftMouseButton(event)) {
        this.removeEventListener("popuphidden", this.onPopupHidden);
        callback();
      }
    });
  }

  /**
   *
   * @param {number} screenX
   * @param {number} screenY
   * @param {SidebarSettings} settings
   */
  openPopupAtScreen(screenX, screenY, settings) {
    this.positionMenuList.setValue(settings.position);
    this.paddingMenuList.setValue(settings.padding);
    this.newWebPanelPositionMenuList.setValue(settings.newWebPanelPosition);
    this.unpinnedPaddingMenuList.setValue(settings.unpinnedPadding);
    this.hideInPopupWindowsToggle.setPressed(settings.hideInPopupWindows);
    this.autoHideBackToggle.setPressed(settings.autoHideBackButton);
    this.autoHideForwardToggle.setPressed(settings.autoHideForwardButton);
    this.containerBorderMenuList.setValue(settings.containerBorder);
    this.autoHideSidebarToggle.setPressed(settings.autoHideSidebar);
    this.hideSidebarAnimatedToggle.setPressed(settings.hideSidebarAnimated);

    this.settings = settings;

    this.onPopupHidden = () => {
      if (this.getState() !== "closed") {
        return;
      }
      this.#cancelChanges();
      this.removeEventListener("popuphidden", this.onPopupHidden);
    };
    this.addEventListener("popuphidden", this.onPopupHidden);

    Panel.prototype.openPopupAtScreen.call(this, screenX, screenY);
  }

  #cancelChanges() {
    if (this.positionMenuList.getValue() !== this.settings.position) {
      this.onPositionChange(this.settings.position);
    }
    if (this.paddingMenuList.getValue() !== this.settings.padding) {
      this.onPaddingChange(this.settings.padding);
    }
    if (
      this.newWebPanelPositionMenuList.getValue() !==
      this.settings.newWebPanelPosition
    ) {
      this.onNewWebPanelPositionChange(this.settings.newWebPanelPosition);
    }
    if (
      this.unpinnedPaddingMenuList.getValue() !== this.settings.unpinnedPadding
    ) {
      this.onUnpinnedPaddingChange(this.settings.unpinnedPadding);
    }
    if (
      this.hideInPopupWindowsToggle.getPressed() !==
      this.settings.hideInPopupWindows
    ) {
      this.onHideInPopupWindowsChange(this.settings.hideInPopupWindows);
    }
    if (
      this.autoHideBackToggle.getPressed() !== this.settings.autoHideBackButton
    ) {
      this.onAutoHideBackButtonChange(this.settings.autoHideBackButton);
    }
    if (
      this.autoHideForwardToggle.getPressed() !==
      this.settings.autoHideForwardButton
    ) {
      this.onAutoHideForwardButtonChange(this.settings.autoHideForwardButton);
    }
    if (
      this.containerBorderMenuList.getValue() !== this.settings.containerBorder
    ) {
      this.onContainerBorderChange(this.settings.containerBorder);
    }
    if (
      this.autoHideSidebarToggle.getPressed() !== this.settings.autoHideSidebar
    ) {
      this.onAutoHideSidebarChange(this.settings.autoHideSidebar);
    }
    if (
      this.hideSidebarAnimatedToggle.getPressed() !==
      this.settings.hideSidebarAnimated
    ) {
      this.onAutoHideSidebarAnimatedChange(this.settings.hideSidebarAnimated);
    }
  }
}

```

## File: `JS/second_sidebar/xul/sidebar_splitter.mjs`

```mjs
import { Splitter } from "./base/splitter.mjs";

export class SidebarSplitter extends Splitter {
  /**
   *
   * @param {object} params
   * @param {string} params.id
   */
  constructor({ id = null } = {}) {
    super({ id, classList: ["sidebar-splitter"] });
    this.setResizeBefore("none").setResizeAfter("sibling");
  }

  /**
   *
   * @param {function():void} callback
   */
  listenWidthChange(callback) {
    this.addEventListener("mouseup", () => {
      callback();
    });
  }
}

```

## File: `JS/second_sidebar/xul/sidebar_splitter_pinned.mjs`

```mjs
import { SidebarSplitter } from "./sidebar_splitter.mjs";

export class SidebarSplitterPinned extends SidebarSplitter {
  constructor() {
    super({ id: "sb2-splitter-pinned" });
  }
}

```

## File: `JS/second_sidebar/xul/sidebar_splitter_unpinned.mjs`

```mjs
import { SidebarSplitter } from "./sidebar_splitter.mjs";

export class SidebarSplitterUnpinned extends SidebarSplitter {
  constructor() {
    super({ id: "sb2-splitter-unpinned" });
  }
}

```

## File: `JS/second_sidebar/xul/sidebar_toolbar.mjs`

```mjs
import { Div } from "./base/div.mjs";
import { HBox } from "./base/hbox.mjs";
import { Label } from "./base/label.mjs";
import { Toolbar } from "./base/toolbar.mjs";
import { ToolbarButton } from "./base/toolbar_button.mjs";
import { isLeftMouseButton } from "../utils/buttons.mjs";
import { useAvailableIcon } from "../utils/icons.mjs";

const ICONS = {
  BACK: "chrome://browser/skin/back.svg",
  FORWARD: "chrome://browser/skin/forward.svg",
  RELOAD: "chrome://global/skin/icons/reload.svg",
  HOME: "chrome://browser/skin/home.svg",
  MORE: "chrome://global/skin/icons/more.svg",
  PINNED:
    "chrome://activity-stream/content/data/content/assets/glyph-unpin-16.svg",
  PINNED_ALT: "chrome://newtab/content/data/content/assets/glyph-unpin-16.svg",
  UNPINNED:
    "chrome://activity-stream/content/data/content/assets/glyph-pin-16.svg",
  UNPINNED_ALT: "chrome://newtab/content/data/content/assets/glyph-pin-16.svg",
  CLOSE: "chrome://global/skin/icons/close.svg",
};

export class SidebarToolbar extends Toolbar {
  constructor() {
    super({ id: "sb2-toolbar" });
    this.setMode("icons").setAttribute("fullscreentoolbar", "true");

    // Navigation buttons
    this.backButton = this.#createButton("Back", ICONS.BACK);
    this.forwardButton = this.#createButton("Forward", ICONS.FORWARD);
    this.reloadButton = this.#createButton("Reload", ICONS.RELOAD);
    this.homeButton = this.#createButton("Home", ICONS.HOME);
    this.navButtons = this.#createNavButtons();

    // Title
    this.toolbarTitle = this.#createToolbarTitle();

    // Sidebar buttons
    this.moreButton = this.#createMenuButton("More", ICONS.MORE);
    this.pinButton = this.#createButton();
    this.closeButton = this.#createButton("Unload", ICONS.CLOSE);
    this.sidebarButtons = this.#createSidebarButtons();
  }

  /**
   *
   * @param {string} tooltipText?
   * @param {string?} iconUrl
   * @returns {ToolbarButton}
   */
  #createButton(tooltipText = null, iconUrl = null) {
    return new ToolbarButton({
      classList: ["sb2-toolbar-button", "toolbarbutton-1"],
    })
      .setIcon(iconUrl)
      .setTooltipText(tooltipText);
  }

  /**
   *
   * @param {string} tooltipText
   * @param {string} iconUrl
   * @returns {ToolbarButton}
   */
  #createMenuButton(tooltipText, iconUrl) {
    return this.#createButton(tooltipText, iconUrl).setType("menu");
  }

  /**
   *
   * @returns {HBox}
   */
  #createNavButtons() {
    const toolbarButtons = new HBox({ id: "sb2-toolbar-nav-buttons" })
      .appendChild(this.backButton)
      .appendChild(this.forwardButton)
      .appendChild(this.reloadButton)
      .appendChild(this.homeButton);

    this.appendChild(toolbarButtons);
    return toolbarButtons;
  }

  /**
   *
   * @returns {Label}
   */
  #createToolbarTitle() {
    const toolbarTitle = new Label({ id: "sb2-toolbar-title" });
    const toolbarTitleWrapper = new Div({
      id: "sb2-toolbar-title-wrapper",
    });
    toolbarTitleWrapper.appendChild(toolbarTitle);
    this.appendChild(toolbarTitleWrapper);
    return toolbarTitle;
  }

  /**
   *
   * @returns {HBox}
   */
  #createSidebarButtons() {
    const toolbarButtons = new HBox({ id: "sb2-toolbar-sidebar-buttons" })
      .appendChild(this.moreButton)
      .appendChild(this.pinButton)
      .appendChild(this.closeButton);

    this.appendChild(toolbarButtons);
    return toolbarButtons;
  }

  /**
   *
   * @param {ToolbarButton} button
   * @param {function(MouseEvent):void} callback
   * @returns {SidebarToolbar}
   */
  #addButtonClickListener(button, callback) {
    button.addEventListener("click", (event) => {
      if (isLeftMouseButton) {
        callback(event);
      }
    });
    return this;
  }

  /**
   *
   * @param {string} title
   * @returns {SidebarToolbar}
   */
  setTitle(title) {
    this.toolbarTitle.setText(title);
    return this;
  }

  /**
   *
   * @param {boolean} pinned
   * @returns {SidebarToolbar}
   */
  async changePinButton(pinned) {
    this.pinButton
      .setIcon(
        pinned
          ? await useAvailableIcon(ICONS.PINNED, ICONS.PINNED_ALT)
          : await useAvailableIcon(ICONS.UNPINNED, ICONS.UNPINNED_ALT),
      )
      .setTooltipText(pinned ? "Unpin" : "Pin");
    return this;
  }

  /**
   *
   * @param {function(MouseEvent):void} callback
   * @returns {SidebarToolbar}
   */
  listenBackButtonClick(callback) {
    return this.#addButtonClickListener(this.backButton, callback);
  }

  /**
   *
   * @param {function(MouseEvent):void} callback
   * @returns {SidebarToolbar}
   */
  listenForwardButtonClick(callback) {
    return this.#addButtonClickListener(this.forwardButton, callback);
  }

  /**
   *
   * @param {function(MouseEvent):void} callback
   * @returns {SidebarToolbar}
   */
  listenReloadButtonClick(callback) {
    return this.#addButtonClickListener(this.reloadButton, callback);
  }

  /**
   *
   * @param {function(MouseEvent):void} callback
   * @returns {SidebarToolbar}
   */
  listenHomeButtonClick(callback) {
    return this.#addButtonClickListener(this.homeButton, callback);
  }

  /**
   *
   * @param {function(MouseEvent):void} callback
   * @returns {SidebarToolbar}
   */
  listenPinButtonClick(callback) {
    return this.#addButtonClickListener(this.pinButton, callback);
  }

  /**
   *
   * @param {function(MouseEvent):void} callback
   * @returns {SidebarToolbar}
   */
  listenCloseButtonClick(callback) {
    return this.#addButtonClickListener(this.closeButton, callback);
  }
}

```

## File: `JS/second_sidebar/xul/web_panel_browser.mjs`

```mjs
import { Browser } from "./base/browser.mjs";

const MOBILE_USER_AGENT =
  "Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.2 Chrome/87.0.4280.141 Mobile Safari/537.36";

export class WebPanelBrowser extends Browser {
  /**
   *
   * @param {HTMLElement} element
   */
  constructor(element) {
    super({ element });
  }

  /**
   *
   * @returns {WebPanelBrowser}
   */
  setMobileUserAgent() {
    return this.setCustomUserAgent(MOBILE_USER_AGENT);
  }

  /**
   *
   * @returns {WebPanelBrowser}
   */
  unsetMobileUserAgent() {
    return this.setCustomUserAgent("");
  }
}

```

## File: `JS/second_sidebar/xul/web_panel_button.mjs`

```mjs
/* eslint-disable no-unused-vars */
import { FALLBACK_ICON, useAvailableIcon } from "../utils/icons.mjs";

import { NotificationBadge } from "./notification_badge.mjs";
import { WebPanelSettings } from "../settings/web_panel_settings.mjs";
import { WebPanelSoundIcon } from "./web_panel_sound_icon.mjs";
import { Widget } from "./base/widget.mjs";
import { applyContainerColor } from "../utils/containers.mjs";
import { ellipsis } from "../utils/string.mjs";

/* eslint-enable no-unused-vars */

const URL_LABEL_LIMIT = 24;
const URL_TOOLTIP_LIMIT = 64;

export class WebPanelButton extends Widget {
  /**
   *
   * @param {WebPanelSettings} webPanelSettings
   * @param {string?} position
   */
  constructor(webPanelSettings, position = null) {
    super({
      id: webPanelSettings.uuid,
      classList: ["sb2-main-button", "sb2-main-web-panel-button"],
      context: "sb2-web-panel-button-menupopup",
      position,
    });

    this.soundIcon = new WebPanelSoundIcon();
    this.notificationBadge = new NotificationBadge();
    this.doWhenButtonReady(() => {
      const badgeStackXUL = this.button.getBadgeStackXUL();
      badgeStackXUL.appendChild(this.soundIcon.element);
      badgeStackXUL.appendChild(this.notificationBadge.element);
    });

    this.setUserContextId(webPanelSettings.userContextId)
      .setLabel(webPanelSettings.url)
      .setTooltipText(webPanelSettings.url);

    this.hideSoundIcon(webPanelSettings.hideSoundIcon);
    this.hideNotificationBadge(webPanelSettings.hideNotificationBadge);

    useAvailableIcon(webPanelSettings.faviconURL, FALLBACK_ICON).then(
      (faviconURL) => this.setIcon(faviconURL),
    );
  }

  /**
   *
   * @param {function(MouseEvent):void} callback
   * @returns {WebPanelButton}
   */
  listenClick(callback) {
    this.setOnClick((event) => {
      event.stopPropagation();
      callback(event);
    });
    return this;
  }

  /**
   *
   * @param {boolean} value
   * @returns {WebPanelButton}
   */
  hideSoundIcon(value) {
    return this.doWhenButtonReady(() => {
      if (value) {
        this.soundIcon.hide();
      } else {
        this.soundIcon.show();
      }
    });
  }

  /**
   *
   * @param {boolean} isSoundPlaying
   * @param {boolean} isMuted
   * @returns {WebPanelButton}
   */
  setSoundIcon(isSoundPlaying, isMuted) {
    return this.doWhenButtonReady(() => {
      this.soundIcon.setSoundPlaying(isSoundPlaying).setMuted(isMuted);
    });
  }

  /**
   *
   * @param {boolean} value
   * @returns {WebPanelButton}
   */
  hideNotificationBadge(value) {
    return this.doWhenButtonReady(() => {
      if (value) {
        this.notificationBadge.hide();
      } else {
        this.notificationBadge.show();
      }
    });
  }

  /**
   *
   * @param {number?} value
   * @returns {WebPanelButton}
   */
  setNotificationBadge(value) {
    return this.doWhenButtonReady(() => {
      this.notificationBadge.setValue(value);
    });
  }

  /**
   *
   * @param {string} text
   * @returns {WebPanelButton}
   */
  setLabel(text) {
    text = ellipsis(
      text.replace(/http:\/\/|https:\/\/|\/$/g, ""),
      URL_LABEL_LIMIT,
    );
    return Widget.prototype.setLabel.call(this, text);
  }

  /**
   *
   * @param {string} text
   * @returns {WebPanelButton}
   */
  setTooltipText(text) {
    text = ellipsis(
      text.replace(/http:\/\/|https:\/\/|\/$/g, ""),
      URL_TOOLTIP_LIMIT,
    );
    return Widget.prototype.setTooltipText.call(this, text);
  }

  /**
   *
   * @param {string} userContextId
   * @returns {WebPanelButton}
   */
  setUserContextId(userContextId) {
    return this.doWhenButtonReady(() =>
      this.doWhenButtonImageReady(() =>
        applyContainerColor(userContextId, this.button.getBadgeStackXUL()),
      ),
    );
  }
}

```

## File: `JS/second_sidebar/xul/web_panel_menupopup.mjs`

```mjs
/* eslint-disable no-unused-vars */
import { MenuItem } from "./base/menuitem.mjs";
import { MenuPopup } from "./base/menupopup.mjs";
import { MenuSeparator } from "./base/menuseparator.mjs";
import { SidebarControllers } from "../sidebar_controllers.mjs";
import { WebPanelController } from "../controllers/web_panel.mjs";
/* eslint-enable no-unused-vars */

export class WebPanelMenuPopup extends MenuPopup {
  constructor() {
    super({
      id: "sb2-web-panel-button-menupopup",
      classList: ["sb2-menupopup"],
    });

    this.unloadItem = new MenuItem().setLabel("Unload web panel");
    this.muteItem = new MenuItem();
    this.editItem = new MenuItem().setLabel("Edit web panel");
    this.deleteItem = new MenuItem().setLabel("Delete web panel");
    this.customizeItem = new MenuItem().setLabel("Customize Toolbar...");
    this.#compose();

    this.addEventListener("popupshowing", () => {
      this.webPanelController = SidebarControllers.webPanelsController.get(
        this.element.triggerNode.id,
      );
      // unloading
      this.unloadItem.setDisabled(this.webPanelController.isUnloaded());
      // muting
      if (this.webPanelController.isUnloaded()) {
        this.muteItem.hide();
      } else {
        this.muteItem.show();
        this.muteItem.setLabel(
          `${this.webPanelController.isMuted() ? "Unmute" : "Mute"} web panel`,
        );
      }
    });
  }

  #compose() {
    this.appendChildren(
      this.unloadItem,
      this.muteItem,
      new MenuSeparator(),
      this.editItem,
      this.deleteItem,
      new MenuSeparator(),
      this.customizeItem,
    );
  }

  /**
   *
   * @param {function(WebPanelController):void} callback
   */
  listenUnloadItemClick(callback) {
    this.unloadItem.addEventListener("command", () => {
      callback(this.webPanelController);
    });
  }

  /**
   *
   * @param {function(WebPanelController):void} callback
   */
  listenMuteItemClick(callback) {
    this.muteItem.addEventListener("command", () => {
      callback(this.webPanelController);
    });
  }

  /**
   *
   * @param {function(WebPanelController):void} callback
   */
  listenEditItemClick(callback) {
    this.editItem.addEventListener("command", () => {
      callback(this.webPanelController);
    });
  }

  /**
   *
   * @param {function(WebPanelController):void} callback
   */
  listenDeleteItemClick(callback) {
    this.deleteItem.addEventListener("command", () => {
      callback(this.webPanelController);
    });
  }

  /**
   *
   * @param {function(WebPanelController):void} callback
   */
  listenCustomizeItemClick(callback) {
    this.customizeItem.addEventListener("command", (event) => {
      callback(event);
    });
  }
}

```

## File: `JS/second_sidebar/xul/web_panel_new_button.mjs`

```mjs
import { Widget } from "./base/widget.mjs";

const ICON = "chrome://global/skin/icons/plus.svg";

export class WebPanelNewButton extends Widget {
  constructor() {
    super({
      id: "new-web-panel",
      label: "New Web Panel",
      tooltipText: "New Web Panel",
      iconURL: ICON,
    });
  }

  /**
   *
   * @param {function(MouseEvent):void} callback
   * @returns {WebPanelNewButton}
   */
  listenClick(callback) {
    return this.setOnClick(callback);
  }
}

```

## File: `JS/second_sidebar/xul/web_panel_popup_delete.mjs`

```mjs
/* eslint-disable no-unused-vars */
import { createCancelButton, createDeleteButton } from "../utils/xul.mjs";

import { Label } from "./base/label.mjs";
import { Panel } from "./base/panel.mjs";
import { PanelMultiView } from "./base/panel_multi_view.mjs";
import { PopupBody } from "./popup_body.mjs";
import { PopupFooter } from "./popup_footer.mjs";
import { PopupHeader } from "./popup_header.mjs";
import { WebPanelController } from "../controllers/web_panel.mjs";
import { isLeftMouseButton } from "../utils/buttons.mjs";

/* eslint-enable no-unused-vars */

export class WebPanelPopupDelete extends Panel {
  constructor() {
    super({
      id: "sb2-web-panel-delete",
      classList: ["sb2-popup", "sb2-popup-with-header"],
    });
    this.setType("arrow").setRole("group");

    this.deleteButton = createDeleteButton();
    this.cancelButton = createCancelButton();
    this.#compose();
  }

  #compose() {
    this.appendChild(
      new PanelMultiView().appendChildren(
        new PopupHeader("Delete Web Panel"),
        new PopupBody().appendChildren(
          new Label().setText("Are you sure? This action cannot be undone."),
        ),
        new PopupFooter().appendChildren(this.cancelButton, this.deleteButton),
      ),
    );
  }

  /**
   *
   * @param {function(string):void} callback
   * @returns {WebPanelPopupNew}
   */
  listenDeleteButtonClick(callback) {
    this.deleteButton.addEventListener("click", (event) => {
      if (isLeftMouseButton(event)) {
        callback(this.uuid);
      }
    });
  }

  /**
   *
   * @param {function(string):void} callback
   * @returns {WebPanelPopupNew}
   */
  listenCancelButtonClick(callback) {
    this.cancelButton.addEventListener("click", (event) => {
      if (isLeftMouseButton(event)) {
        callback();
      }
    });
  }

  /**
   *
   * @param {WebPanelController} webPanelController
   */
  openPopup(webPanelController) {
    this.uuid = webPanelController.getUUID();

    this.restoreWebPanelButtonState = (event) => {
      if (event.target.id !== this.id) {
        return;
      }
      webPanelController.button.setOpen(webPanelController.isActive());
      this.removeEventListener("popuphidden", this.restoreWebPanelButtonState);
    };
    this.addEventListener("popuphidden", this.restoreWebPanelButtonState);

    Panel.prototype.openPopup.call(this, webPanelController.button);
  }
}

```

## File: `JS/second_sidebar/xul/web_panel_popup_edit.mjs`

```mjs
/* eslint-disable no-unused-vars */
import {
  applyContainerColor,
  fillContainerMenuList,
} from "../utils/containers.mjs";
import {
  createCancelButton,
  createInput,
  createPopupGroup,
  createPopupRow,
  createSaveButton,
  createSubviewButton,
  createSubviewIconicButton,
  createZoomButtons,
  updateZoomButtons,
} from "../utils/xul.mjs";

import { Header } from "./base/header.mjs";
import { MenuList } from "./base/menulist.mjs";
import { Panel } from "./base/panel.mjs";
import { PanelMultiView } from "./base/panel_multi_view.mjs";
import { PopupBody } from "./popup_body.mjs";
import { PopupFooter } from "./popup_footer.mjs";
import { PopupHeader } from "./popup_header.mjs";
import { Toggle } from "./base/toggle.mjs";
import { ToolbarSeparator } from "./base/toolbar_separator.mjs";
import { WebPanelController } from "../controllers/web_panel.mjs";
import { fetchIconURL } from "../utils/icons.mjs";
import { isLeftMouseButton } from "../utils/buttons.mjs";

/* eslint-enable no-unused-vars */

const ICONS = {
  DOWN: "chrome://global/skin/icons/arrow-down.svg",
  UP: "chrome://global/skin/icons/arrow-up.svg",
  UNDO: "chrome://global/skin/icons/undo.svg",
  MINUS: "chrome://global/skin/icons/minus.svg",
  PLUS: "chrome://global/skin/icons/plus.svg",
};

const SECOND = 1000;
const MINUTE = 60 * SECOND;

export class WebPanelPopupEdit extends Panel {
  constructor() {
    super({
      id: "sb2-web-panel-edit",
      classList: ["sb2-popup", "sb2-popup-with-header"],
    });
    this.setType("arrow").setRole("group");

    this.urlInput = createInput();
    this.faviconURLInput = createInput();
    this.faviconResetButton = createSubviewIconicButton(
      ICONS.UNDO,
      "Request Favicon",
    );
    this.pinnedMenuList = this.#createPinTypeMenuList();
    this.containerMenuList = new MenuList({ id: "sb2-container-menu-list" });
    this.mobileToggle = new Toggle();
    this.loadOnStartupToggle = new Toggle();
    this.unloadOnCloseToggle = new Toggle();
    this.hideToolbarToggle = new Toggle();
    this.hideSoundIconToggle = new Toggle();
    this.hideNotificationBadgeToggle = new Toggle();
    this.periodicReloadMenuList = this.#createPeriodicReloadMenuList();
    this.zoomOutButton = createSubviewIconicButton(ICONS.MINUS, {
      tooltipText: "Zoom Out",
    });
    this.resetZoomButton = createSubviewButton("100%", {
      id: "sb2-zoom-button",
      tooltipText: "Reset Zoom",
    });
    this.zoomInButton = createSubviewIconicButton(ICONS.PLUS, {
      tooltipText: "Zoom In",
    });
    this.cancelButton = createCancelButton();
    this.saveButton = createSaveButton();
    this.#setupListeners();
    this.#compose();

    this.zoom = 1;
  }

  #setupListeners() {
    this.faviconResetButton.addEventListener("click", async (event) => {
      if (isLeftMouseButton(event)) {
        const faviconURL = await fetchIconURL(this.urlInput.getValue());
        this.faviconURLInput
          .setValue(faviconURL)
          .dispatchEvent(new Event("input", { bubbles: true }));
      }
    });
  }

  /**
   *
   * @returns {MenuList}
   */
  #createPinTypeMenuList() {
    const pinTypeMenuList = new MenuList();
    pinTypeMenuList.appendItem("Pinned", true);
    pinTypeMenuList.appendItem("Floating", false);
    return pinTypeMenuList;
  }

  /**
   *
   * @returns {MenuList}
   */
  #createPeriodicReloadMenuList() {
    const menuList = new MenuList();
    menuList.appendItem("Never", 0);
    menuList.appendItem("5 seconds", 5 * SECOND);
    menuList.appendItem("10 seconds", 10 * SECOND);
    menuList.appendItem("30 seconds", 30 * SECOND);
    menuList.appendItem("1 minute", MINUTE);
    menuList.appendItem("2 minutes", 2 * MINUTE);
    menuList.appendItem("5 minutes", 5 * MINUTE);
    menuList.appendItem("10 minutes", 10 * MINUTE);
    menuList.appendItem("30 minutes", 30 * MINUTE);
    menuList.appendItem("60 minutes", 60 * MINUTE);
    menuList.appendItem("90 minutes", 90 * MINUTE);
    return menuList;
  }

  #compose() {
    this.appendChildren(
      new PanelMultiView().appendChildren(
        new PopupHeader("Edit Web Panel"),
        new PopupBody()
          .setProperty("padding", "0 var(--space-medium)")
          .appendChildren(
            new Header(1).setText("Page web address"),
            this.urlInput,
            createPopupGroup("Multi-Account Container", this.containerMenuList),
            new Header(1).setText("Favicon web address"),
            createPopupRow(this.faviconURLInput, this.faviconResetButton),
            new ToolbarSeparator(),
            createPopupGroup("Web panel type", this.pinnedMenuList),
            createPopupGroup("Mobile View", this.mobileToggle),
            createPopupGroup(
              "Load into memory at startup",
              this.loadOnStartupToggle,
            ),
            createPopupGroup(
              "Unload from memory after closing",
              this.unloadOnCloseToggle,
            ),
            new ToolbarSeparator(),
            createPopupGroup("Hide toolbar", this.hideToolbarToggle),
            createPopupGroup("Hide sound icon", this.hideSoundIconToggle),
            createPopupGroup(
              "Hide notification badge",
              this.hideNotificationBadgeToggle,
            ),
            new ToolbarSeparator(),
            createPopupGroup("Periodic reload", this.periodicReloadMenuList),
            new ToolbarSeparator(),
            createPopupGroup(
              "Zoom",
              createZoomButtons(
                this.zoomOutButton,
                this.resetZoomButton,
                this.zoomInButton,
              ),
            ),
          )
          .setProperty("overflow-y", "scroll"),
        new PopupFooter().appendChildren(this.cancelButton, this.saveButton),
      ),
    );
  }

  /**
   *
   * @param {object} callbacks
   * @param {function(string, string, number):void} callbacks.url
   * @param {function(string, string, number):void} callbacks.faviconURL
   * @param {function(string, boolean):void} callbacks.mobile
   * @param {function(string, boolean):void} callbacks.pinned
   * @param {function(string, string):void} callbacks.userContextId
   * @param {function(string, boolean):void} callbacks.loadOnStartup
   * @param {function(string, boolean):void} callbacks.unloadOnClose
   * @param {function(string, boolean):void} callbacks.hideToolbar
   * @param {function(string, boolean):void} callbacks.hideSoundIcon
   * @param {function(string, boolean):void} callbacks.hideNotificationBadge
   * @param {function(string, number):void} callbacks.periodicReload
   * @param {function(string):number} callbacks.zoomOut
   * @param {function(string):number} callbacks.zoomIn
   * @param {function(string, number):number} callbacks.zoom
   */
  listenChanges({
    url,
    faviconURL,
    pinned,
    userContextId,
    mobile,
    loadOnStartup,
    unloadOnClose,
    hideToolbar,
    hideSoundIcon,
    hideNotificationBadge,
    periodicReload,
    zoomOut,
    zoomIn,
    zoom,
  }) {
    this.onUrlChange = url;
    this.onFaviconUrlChange = faviconURL;
    this.onMobileChange = mobile;
    this.onPinnedChange = pinned;
    this.onUserContextIdChange = userContextId;
    this.onLoadOnStartupChange = loadOnStartup;
    this.onUnloadOnCloseChange = unloadOnClose;
    this.onHideToolbar = hideToolbar;
    this.onHideSoundIcon = hideSoundIcon;
    this.onHideNotificationBadge = hideNotificationBadge;
    this.onPeriodicReload = periodicReload;
    this.onZoomOut = zoomOut;
    this.onZoomIn = zoomIn;
    this.onZoom = zoom;

    this.urlInput.addEventListener("input", () => {
      url(this.settings.uuid, this.urlInput.getValue(), 1000);
    });
    this.faviconURLInput.addEventListener("input", () => {
      faviconURL(this.settings.uuid, this.faviconURLInput.getValue(), 1000);
    });
    this.pinnedMenuList.addEventListener("command", () => {
      pinned(this.settings.uuid, this.pinnedMenuList.getValue() === "true");
    });
    this.containerMenuList.addEventListener("command", () => {
      userContextId(this.settings.uuid, this.containerMenuList.getValue());
    });
    this.mobileToggle.addEventListener("toggle", () => {
      mobile(this.settings.uuid, this.mobileToggle.getPressed());
    });
    this.loadOnStartupToggle.addEventListener("toggle", () => {
      loadOnStartup(this.settings.uuid, this.loadOnStartupToggle.getPressed());
    });
    this.unloadOnCloseToggle.addEventListener("toggle", () => {
      unloadOnClose(this.settings.uuid, this.unloadOnCloseToggle.getPressed());
    });
    this.hideToolbarToggle.addEventListener("toggle", () => {
      hideToolbar(this.settings.uuid, this.hideToolbarToggle.getPressed());
    });
    this.hideSoundIconToggle.addEventListener("toggle", () => {
      hideSoundIcon(this.settings.uuid, this.hideSoundIconToggle.getPressed());
    });
    this.hideNotificationBadgeToggle.addEventListener("toggle", () => {
      hideNotificationBadge(
        this.settings.uuid,
        this.hideNotificationBadgeToggle.getPressed(),
      );
    });
    this.periodicReloadMenuList.addEventListener("command", () => {
      periodicReload(
        this.settings.uuid,
        this.periodicReloadMenuList.getValue(),
      );
    });
    this.zoomOutButton.addEventListener("click", (event) => {
      if (isLeftMouseButton(event)) {
        this.zoom = zoomOut(this.settings.uuid);
        this.#updateZoomButtons(this.zoom);
      }
    });
    this.zoomInButton.addEventListener("click", (event) => {
      if (isLeftMouseButton(event)) {
        this.zoom = zoomIn(this.settings.uuid);
        this.#updateZoomButtons(this.zoom);
      }
    });
    this.resetZoomButton.addEventListener("click", (event) => {
      if (isLeftMouseButton(event)) {
        this.zoom = zoom(this.settings.uuid, 1);
        this.#updateZoomButtons(this.zoom);
      }
    });
  }

  /**
   *
   * @param {number} zoom
   */
  #updateZoomButtons(zoom) {
    updateZoomButtons(
      zoom,
      this.zoomOutButton,
      this.resetZoomButton,
      this.zoomInButton,
    );
  }

  /**
   *
   * @param {function():void} callback
   */
  listenCancelButtonClick(callback) {
    this.cancelButton.addEventListener("click", (event) => {
      if (isLeftMouseButton(event)) {
        callback();
      }
    });
  }

  /**
   *
   * @param {function(string):void} callback
   */
  listenSaveButtonClick(callback) {
    this.saveButton.addEventListener("click", (event) => {
      if (isLeftMouseButton(event)) {
        this.removeEventListener("popuphidden", this.cancelOnPopupHidden);
        callback(this.settings.uuid);
      }
    });
  }

  /**
   *
   * @param {WebPanelController} webPanelController
   * @returns {WebPanelPopupEdit}
   */
  openPopup(webPanelController) {
    const settings = webPanelController.dumpSettings();
    this.uuid = settings.uuid;
    this.urlInput.setValue(settings.url);
    this.faviconURLInput.setValue(settings.faviconURL);
    this.pinnedMenuList.setValue(settings.pinned);

    fillContainerMenuList(this.containerMenuList);
    this.containerMenuList.setValue(settings.userContextId);
    applyContainerColor(
      settings.userContextId,
      this.containerMenuList.getXUL(),
    );

    this.mobileToggle.setPressed(settings.mobile);
    this.loadOnStartupToggle.setPressed(settings.loadOnStartup);
    this.unloadOnCloseToggle.setPressed(settings.unloadOnClose);
    this.hideToolbarToggle.setPressed(settings.hideToolbar);
    this.hideSoundIconToggle.setPressed(settings.hideSoundIcon);
    this.hideNotificationBadgeToggle.setPressed(settings.hideNotificationBadge);
    this.periodicReloadMenuList.setValue(settings.periodicReload);
    this.#updateZoomButtons(settings.zoom);
    this.zoom = settings.zoom;

    this.settings = settings;

    this.cancelOnPopupHidden = () => {
      if (this.getState() !== "closed") {
        return;
      }
      this.#cancelChanges();
      this.removeEventListener("popuphidden", this.cancelOnPopupHidden);
    };
    this.addEventListener("popuphidden", this.cancelOnPopupHidden);

    this.restoreWebPanelButtonState = (event) => {
      if (event.target.id !== this.id) {
        return;
      }
      webPanelController.button.setOpen(webPanelController.isActive());
      this.removeEventListener("popuphidden", this.restoreWebPanelButtonState);
    };
    this.addEventListener("popuphidden", this.restoreWebPanelButtonState);

    return Panel.prototype.openPopup.call(this, webPanelController.button);
  }

  #cancelChanges() {
    if (this.urlInput.getValue() !== this.settings.url) {
      this.onUrlChange(this.settings.uuid, this.settings.url);
    }
    if (this.faviconURLInput.getValue() !== this.settings.faviconURL) {
      this.onFaviconUrlChange(this.settings.uuid, this.settings.faviconURL);
    }
    if ((this.pinnedMenuList.getValue() === "true") !== this.settings.pinned) {
      this.onPinnedChange(this.settings.uuid, this.settings.pinned);
    }
    if (
      String(this.containerMenuList.getValue()) !==
      String(this.settings.userContextId)
    ) {
      this.onUserContextIdChange(
        this.settings.uuid,
        this.settings.userContextId,
      );
    }
    if (this.mobileToggle.getPressed() !== this.settings.mobile) {
      this.onMobileChange(this.settings.uuid, this.settings.mobile);
    }
    if (this.loadOnStartupToggle.getPressed() !== this.settings.loadOnStartup) {
      this.onLoadOnStartupChange(
        this.settings.uuid,
        this.settings.loadOnStartup,
      );
    }
    if (this.unloadOnCloseToggle.getPressed() !== this.settings.unloadOnClose) {
      this.onUnloadOnCloseChange(
        this.settings.uuid,
        this.settings.unloadOnClose,
      );
    }
    if (this.hideToolbarToggle.getPressed() !== this.settings.hideToolbar) {
      this.onHideToolbar(this.settings.uuid, this.settings.hideToolbar);
    }
    if (this.hideSoundIconToggle.getPressed() !== this.settings.hideSoundIcon) {
      this.onHideSoundIcon(this.settings.uuid, this.settings.hideSoundIcon);
    }
    if (
      this.hideNotificationBadgeToggle.getPressed() !==
      this.settings.hideNotificationBadge
    ) {
      this.onHideNotificationBadge(
        this.settings.uuid,
        this.settings.hideNotificationBadge,
      );
    }
    if (
      this.periodicReloadMenuList.getValue() !== this.settings.periodicReload
    ) {
      this.onPeriodicReload(this.settings.uuid, this.settings.periodicReload);
    }
    this.onZoom(this.settings.uuid, this.settings.zoom);
  }
}

```

## File: `JS/second_sidebar/xul/web_panel_popup_more.mjs`

```mjs
import {
  createSubviewButton,
  createSubviewIconicButton,
  createZoomButtons,
  updateZoomButtons,
} from "../utils/xul.mjs";

/* eslint-disable no-unused-vars */
import { MenuSeparator } from "./base/menuseparator.mjs";
import { Panel } from "./base/panel.mjs";
import { PanelMultiView } from "./base/panel_multi_view.mjs";
import { PopupBody } from "./popup_body.mjs";
import { WebPanelSettings } from "../settings/web_panel_settings.mjs";
import { isLeftMouseButton } from "../utils/buttons.mjs";

/* eslint-enable no-unused-vars */

const ICONS = {
  MINUS: "chrome://global/skin/icons/minus.svg",
  PLUS: "chrome://global/skin/icons/plus.svg",
};

export class WebPanelPopupMore extends Panel {
  constructor() {
    super({
      id: "sb2-web-panel-more",
      classList: ["sb2-popup"],
    });
    this.setType("arrow");

    this.openInNewTabButton = createSubviewButton("Open in New Tab");
    this.copyPageUrlButton = createSubviewButton("Copy Page URL");
    this.mobileButton = createSubviewButton("Mobile View", {
      type: "checkbox",
    });
    this.zoomOutButton = createSubviewIconicButton(ICONS.MINUS, "Zoom Out");
    this.zoomInButton = createSubviewIconicButton(ICONS.PLUS, "Zoom In");
    this.resetZoomButton = createSubviewButton("100%", {
      id: "sb2-zoom-button",
      tooltipText: "Reset Zoom",
    });
    this.#compose();
  }

  #compose() {
    this.appendChild(
      new PanelMultiView().appendChildren(
        new PopupBody({ compact: true }).appendChildren(
          this.openInNewTabButton,
          this.copyPageUrlButton,
          this.mobileButton,
          new MenuSeparator(),
          createZoomButtons(
            this.zoomOutButton,
            this.resetZoomButton,
            this.zoomInButton,
          ),
        ),
      ),
    );
  }

  /**
   *
   * @param {function(MouseEvent):void} callback
   */
  listenPopupShowing(callback) {
    this.addEventListener("popupshowing", (event) => {
      callback(event);
    });
  }

  /**
   *
   * @param {function(string):void} callback
   */
  listenOpenInNewTabButtonClick(callback) {
    this.openInNewTabButton.addEventListener("click", (event) => {
      if (isLeftMouseButton(event)) {
        callback(event, this.settings.uuid);
      }
    });
  }

  /**
   *
   * @param {function(string):void} callback
   */
  listenCopyPageUrlButtonClick(callback) {
    this.copyPageUrlButton.addEventListener("click", (event) => {
      if (isLeftMouseButton(event)) {
        callback(this.settings.uuid);
      }
    });
  }

  /**
   *
   * @param {function(string, boolean):void} callback
   */
  listenMobileButtonClick(callback) {
    this.mobileButton.addEventListener("click", (event) => {
      if (isLeftMouseButton(event)) {
        callback(this.settings.uuid, this.mobileButton.isChecked());
      }
    });
  }

  /**
   *
   * @param {function(string):number} callback
   */
  listenZoomInButtonClick(callback) {
    this.zoomInButton.addEventListener("click", (event) => {
      if (isLeftMouseButton(event)) {
        const zoom = callback(this.settings.uuid);
        this.#updateZoomButtons(zoom);
      }
    });
  }

  /**
   *
   * @param {function(string):number} callback
   */
  listenZoomOutButtonClick(callback) {
    this.zoomOutButton.addEventListener("click", (event) => {
      if (isLeftMouseButton(event)) {
        const zoom = callback(this.settings.uuid);
        this.#updateZoomButtons(zoom);
      }
    });
  }

  /**
   *
   * @param {function(string):number} callback
   */
  listenResetZoomButtonClick(callback) {
    this.resetZoomButton.addEventListener("click", (event) => {
      if (isLeftMouseButton(event)) {
        const zoom = callback(this.settings.uuid);
        this.#updateZoomButtons(zoom);
      }
    });
  }

  /**
   *
   * @param {number} zoom
   */
  #updateZoomButtons(zoom) {
    updateZoomButtons(
      zoom,
      this.zoomOutButton,
      this.resetZoomButton,
      this.zoomInButton,
    );
  }

  /**
   *
   * @param {WebPanelSettings} settings
   */
  setDefaults(settings) {
    this.mobileButton.setChecked(settings.mobile);
    this.#updateZoomButtons(settings.zoom);

    this.settings = settings;
  }
}

```

## File: `JS/second_sidebar/xul/web_panel_popup_new.mjs`

```mjs
import {
  applyContainerColor,
  fillContainerMenuList,
} from "../utils/containers.mjs";
import {
  createCancelButton,
  createCreateButton,
  createInput,
  createPopupGroup,
} from "../utils/xul.mjs";

import { MenuList } from "./base/menulist.mjs";
import { Panel } from "./base/panel.mjs";
import { PanelMultiView } from "./base/panel_multi_view.mjs";
import { PopupBody } from "./popup_body.mjs";
import { PopupFooter } from "./popup_footer.mjs";
import { PopupHeader } from "./popup_header.mjs";
import { ScriptSecurityManagerWrapper } from "../wrappers/script_security_manager.mjs";
import { isLeftMouseButton } from "../utils/buttons.mjs";

export class WebPanelPopupNew extends Panel {
  constructor() {
    super({
      id: "sb2-web-panel-new",
      classList: ["sb2-popup", "sb2-popup-with-header"],
    });
    this.setType("arrow").setRole("group");

    this.input = createInput();
    this.containerMenuList = new MenuList({ id: "sb2-container-menu-list" });

    this.saveButton = createCreateButton();
    this.cancelButton = createCancelButton();
    this.#compose();

    this.addEventListener("popupshown", () => {
      this.input.focus();
    });
  }

  #compose() {
    this.appendChild(
      new PanelMultiView().appendChildren(
        new PopupHeader("New Web Panel"),
        new PopupBody().appendChildren(
          this.input,
          createPopupGroup("Multi-Account Container", this.containerMenuList),
        ),
        new PopupFooter().appendChildren(this.cancelButton, this.saveButton),
      ),
    );
  }

  /**
   *
   * @param {function(string):void} callback
   * @returns {WebPanelPopupNew}
   */
  listenSaveButtonClick(callback) {
    this.input.addEventListener("keyup", (event) => {
      if (event.key === "Enter" || event.keyCode === 13) {
        callback(this.input.getValue(), this.containerMenuList.getValue());
      }
    });
    this.saveButton.addEventListener("click", (event) => {
      if (isLeftMouseButton(event)) {
        callback(this.input.getValue(), this.containerMenuList.getValue());
      }
    });
  }

  /**
   *
   * @param {function(string):void} callback
   * @returns {WebPanelPopupNew}
   */
  listenCancelButtonClick(callback) {
    this.cancelButton.addEventListener("click", (event) => {
      if (isLeftMouseButton(event)) {
        callback(this.input.getValue());
      }
    });
  }

  /**
   *
   * @param {XULElement | Widget} target
   * @param {string} suggest
   * @returns {WebPanelPopupNew}
   */
  openPopup(target, suggest) {
    this.input.setValue(suggest);

    fillContainerMenuList(this.containerMenuList);
    this.containerMenuList.setValue(
      ScriptSecurityManagerWrapper.DEFAULT_USER_CONTEXT_ID,
    );
    applyContainerColor(
      ScriptSecurityManagerWrapper.DEFAULT_USER_CONTEXT_ID,
      this.containerMenuList.getXUL(),
    );

    return Panel.prototype.openPopup.call(this, target);
  }
}

```

## File: `JS/second_sidebar/xul/web_panel_sound_icon.mjs`

```mjs
import { Image } from "./base/image.mjs";

export class WebPanelSoundIcon extends Image {
  constructor() {
    super({ classList: ["sb2-sound-icon"] });
  }

  /**
   *
   * @param {boolean} value
   * @returns {WebPanelSoundIcon}
   */
  setSoundPlaying(value) {
    return this.toggleAttribute("soundplaying", value);
  }

  /**
   *
   * @param {boolean} value
   * @returns {WebPanelSoundIcon}
   */
  setMuted(value) {
    return this.toggleAttribute("muted", value);
  }
}

```

## File: `JS/second_sidebar/xul/web_panel_tab.mjs`

```mjs
import { Tab } from "./base/tab.mjs";
import { WebPanelBrowser } from "./web_panel_browser.mjs";

export class WebPanelTab extends Tab {
  /**
   *
   * @param {HTMLElement} element
   */
  constructor(element) {
    super({ element });
  }

  /**
   *
   * @param {Tab} tab
   * @returns {WebPanelTab}
   */
  static fromTab(tab) {
    return new WebPanelTab(tab.getXUL());
  }

  /**
   * @returns {WebPanelBrowser}
   */
  get linkedBrowser() {
    return new WebPanelBrowser(this.element.linkedBrowser);
  }

  /**
   * @returns {string?}
   */
  get uuid() {
    return this.getAttribute("uuid");
  }

  /**
   * @param {string} uuid
   */
  set uuid(uuid) {
    this.setAttribute("uuid", uuid);
  }

  /**
   *
   * @returns {boolean}
   */
  isEmpty() {
    return !this.uuid;
  }

  /**
   *
   * @param {function():void} callback
   */
  addTabCloseListener(callback) {
    this.addEventListener("TabClose", () => callback());
  }
}

```

## File: `JS/second_sidebar/xul/web_panels.mjs`

```mjs
import { VBox } from "./base/vbox.mjs";

export class WebPanels extends VBox {
  constructor() {
    super({ id: "sb2-web-panels" });
  }
}

```

## File: `JS/second_sidebar/xul/web_panels_browser.mjs`

```mjs
/* eslint-disable no-unused-vars */

import { AppConstantsWrapper } from "../wrappers/app_constants.mjs";
import { Browser } from "./base/browser.mjs";
import { ObserversWrapper } from "../wrappers/observers.mjs";
import { ScriptSecurityManagerWrapper } from "../wrappers/script_security_manager.mjs";
import { SessionStoreWrapper } from "../wrappers/session_store.mjs";
import { Style } from "./base/style.mjs";
import { WebPanelSettings } from "../settings/web_panel_settings.mjs";
import { WebPanelTab } from "./web_panel_tab.mjs";
import { WindowWatcherWrapper } from "../wrappers/window_watcher.mjs";
import { WindowWrapper } from "../wrappers/window.mjs";
import { XULElement } from "./base/xul_element.mjs";

/* eslint-enable no-unused-vars */

const BEFORE_SHOW_EVENT = "browser-window-before-show";
const INITIALIZED_EVENT = "browser-delayed-startup-finished";

const FIRST_TAB_INDEX = 0;

export class WebPanelsBrowser extends Browser {
  constructor() {
    super({
      id: `sb2-web-panels-browser_${crypto.randomUUID()}`,
      classList: ["sb2-web-panels-browser"],
    });
    this.removeAttributes(["remote", "type"]).setAttributes({
      xmlns: "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",
      messagemanagergroup: "browsers",
      initialBrowsingContextGroupId: "1",
      disableglobalhistory: "true",
      disablehistory: "true",
      disablefullscreen: "true",
      autoscroll: "false",
      tooltip: "aHTMLTooltip",
      autocompletepopup: "PopupAutoComplete",
    });

    this.initialized = false;
  }

  init() {
    if (this.initialized) {
      console.log("Web panels browser is already initialized");
      return;
    }
    console.log("Initializing web panels browser...");
    ObserversWrapper.addObserver(this, BEFORE_SHOW_EVENT);
    ObserversWrapper.addObserver(this, INITIALIZED_EVENT);
    this.setAttribute("src", AppConstantsWrapper.BROWSER_CHROME_URL);
  }

  /**
   *
   * @param {Window} subj
   * @param {string} topic
   */
  observe(subj, topic) {
    if (this.window.name !== subj.name) {
      return;
    }
    console.log(`${this.window.name}: got event ${topic}`);
    if (topic === BEFORE_SHOW_EVENT) {
      ObserversWrapper.removeObserver(this, BEFORE_SHOW_EVENT);
      this.initWindow();
    } else if (topic === INITIALIZED_EVENT) {
      ObserversWrapper.removeObserver(this, INITIALIZED_EVENT);
      SessionStoreWrapper.maybeDontRestoreTabs(this.window);
      this.initialized = true;
      console.log(`${this.window.name}: web panels browser initialized`);
    }
  }

  initWindow() {
    const windowRoot = new XULElement({
      element: this.window.document.documentElement,
    });
    const selectors = [
      "#PersonalToolbar",
      "#navigator-toolbox",
      "#sidebar-main",
      "#sidebar-wrapper",
      "#sidebar-box",
      "#context-bookmarkpage",
      "#context-viewsource",
    ];

    // Hide elements right after initialization
    for (const selector of selectors) {
      const element = windowRoot.querySelector(selector);
      if (element) {
        element.hide();
      }
    }

    // Constantly hide elements
    const style = new Style(`
      ${selectors.join(", ")} {
        display: none;
      }
    `);
    windowRoot.appendChild(style);

    // Shrink to fit
    windowRoot.setProperty("min-width", "0px");

    // Full height for content
    windowRoot
      .querySelector("#tabbrowser-tabbox")
      .setProperty("height", "100%");

    // Add class for userChrome.css
    windowRoot.addClass("sb2-webpanels-window");
  }

  /**
   *
   * @param {function(WebPanelTab):void} callback
   */
  addPageTitleChangeListener(callback) {
    this.window.gBrowser.addEventListener("pagetitlechanged", (event) => {
      const browser = new Browser({ element: event.target });
      const tab = this.window.gBrowser.getTabForBrowser(browser);
      callback(WebPanelTab.fromTab(tab));
    });
  }

  /**
   *
   * @param {function():void} callback
   */
  addTabSelectListener(callback) {
    this.window.gBrowser.tabpanels.addEventListener("select", () => callback());
  }

  /**
   *
   * @param {function(WebPanelTab):void} callback
   */
  addZoomChangeListener(callback) {
    this.window.addEventListener("FullZoomChange", (event) => {
      const browser = new Browser({ element: event.target });
      const tab = this.window.gBrowser.getTabForBrowser(browser);
      callback(WebPanelTab.fromTab(tab));
    });
  }

  /**
   * @returns {WindowWrapper}
   */
  get window() {
    return WindowWatcherWrapper.getWindowByName(this.id);
  }

  /**
   *
   * @param {WebPanelSettings} webPanelSettings
   * @param {object} progressListener
   * @returns {WebPanelTab}
   */
  addWebPanelTab(webPanelSettings, progressListener) {
    const tab = WebPanelTab.fromTab(
      this.window.gBrowser.addTab(webPanelSettings.url, {
        triggeringPrincipal: ScriptSecurityManagerWrapper.getSystemPrincipal(),
        userContextId: webPanelSettings.userContextId,
      }),
    );
    tab.uuid = webPanelSettings.uuid;
    tab.linkedBrowser.addProgressListener(progressListener);

    // We need to add progress listener when loading unloaded tab
    tab.addEventListener("TabBrowserInserted", () => {
      tab.linkedBrowser.addProgressListener(progressListener);
    });

    // Set user agent and reload
    if (webPanelSettings.mobile) {
      tab.linkedBrowser.setMobileUserAgent();
    } else {
      tab.linkedBrowser.unsetMobileUserAgent();
    }
    tab.linkedBrowser.go(webPanelSettings.url);

    // Set zoom
    tab.linkedBrowser.setZoom(webPanelSettings.zoom);

    return tab;
  }

  /**
   *
   * @returns {WebPanelTab}
   */
  getActiveWebPanelTab() {
    return WebPanelTab.fromTab(this.window.gBrowser.selectedTab);
  }

  /**
   *
   * @param {WebPanelTab} tab
   */
  selectWebPanelTab(tab) {
    this.window.gBrowser.selectedTab = tab;
  }

  deselectWebPanelTab() {
    this.window.gBrowser.selectTabAtIndex(FIRST_TAB_INDEX);
  }

  /**
   *
   * @param {WebPanelTab} tab
   */
  removeWebPanelTab(tab) {
    this.window.gBrowser.removeTab(tab);
  }

  notifyWindowClosedAndRemove() {
    ObserversWrapper.notifyObservers(this.window.raw, "domwindowclosed");
    this.remove();
  }

  /**
   *
   * @param {XULElement} element
   * @returns {boolean}
   */
  activeWebPanelContains(element) {
    const webPanelTab = this.getActiveWebPanelTab();
    return (
      this.window.documentElement?.contains(element) ||
      webPanelTab.linkedBrowser.contentDocument === element.ownerDocument
    );
  }

  /**
   *
   * @param {function():void} callback
   */
  waitInitialization(callback) {
    this.waitUntil(() => this.initialized, callback);
  }

  /**
   *
   * @param {function():boolean} condition
   * @param {function():void} callback
   * @param {number} timeout
   */
  waitUntil(condition, callback, timeout = 10) {
    if (!condition()) {
      setTimeout(() => this.waitUntil(condition, callback, timeout), timeout);
    } else {
      callback();
    }
  }
}

```

## File: `JS/second_sidebar/customize_mode_patcher.mjs`

```mjs
export class CustomizeModePatcher {
  static patch() {
    fetch("resource:///modules/CustomizeMode.sys.mjs").then((response) => {
      response.text().then((moduleSource) => {
        moduleSource = this.#patchModuleSource(moduleSource);
        this.#replaceModule(moduleSource);
      });
    });
  }

  /**
   *
   * @param {string} moduleSource
   * @returns {string}
   */
  static #patchModuleSource(moduleSource) {
    return (
      moduleSource
        .replaceAll("CustomizableUI.getPlaceForItem", "getPlaceForItem")
        .replace(/([^/])(CustomizableUI)(\.)/gm, "$1window.$2$3")
        .replace(
          "window.CustomizableUI.removeListener",
          "CustomizableUI.removeListener",
        ) + getPlaceForItem.toString()
    );
  }

  /**
   *
   * @param {string} moduleText
   */
  static async #replaceModule(moduleText) {
    const moduleBlob = new Blob([moduleText], {
      type: "application/javascript",
    });
    const moduleURL = URL.createObjectURL(moduleBlob);
    import(moduleURL).then((module) => {
      ChromeUtils.defineLazyGetter(window, "gCustomizeMode", () => {
        return new module.CustomizeMode(window);
      });
    });
  }
}

/**
 *
 * @param {HTMLElement} aElement
 * @returns {string}
 */
function getPlaceForItem(aElement) {
  let place;
  let node = aElement;
  while (node && !place) {
    if (node.id == "sb2-main") {
      place = "panel";
    } else if (node.localName == "toolbar") {
      place = "toolbar";
    } else if (node.id == CustomizableUI.AREA_FIXED_OVERFLOW_PANEL) {
      place = "panel";
    } else if (node.id == "customization-palette") {
      place = "palette";
    }

    node = node.parentNode;
  }
  return place;
}

```

## File: `JS/second_sidebar/sidebar_controllers.mjs`

```mjs
import { CollapseController } from "./controllers/collapse.mjs";
import { ContextMenuItemsController } from "./controllers/context_menu_items.mjs";
import { SidebarController } from "./controllers/sidebar.mjs";
import { SidebarMainController } from "./controllers/sidebar_main.mjs";
import { SidebarMainSettingsController } from "./controllers/sidebar_main_settings.mjs";
import { SidebarSplittersController } from "./controllers/sidebar_splitters.mjs";
import { WebPanelDeleteController } from "./controllers/web_panel_delete.mjs";
import { WebPanelEditController } from "./controllers/web_panel_edit.mjs";
import { WebPanelMoreController } from "./controllers/web_panel_more.mjs";
import { WebPanelNewController } from "./controllers/web_panel_new.mjs";
import { WebPanelsController } from "./controllers/web_panels.mjs";

export class SidebarControllers {
  static create() {
    this.sidebarMainController = new SidebarMainController();
    this.sidebarMainSettingsController = new SidebarMainSettingsController();
    this.sidebarController = new SidebarController();
    this.sidebarSplittersController = new SidebarSplittersController();
    this.webPanelsController = new WebPanelsController();
    this.webPanelNewController = new WebPanelNewController();
    this.webPanelEditController = new WebPanelEditController();
    this.webPanelMoreController = new WebPanelMoreController();
    this.webPanelDeleteController = new WebPanelDeleteController();
    this.contextMenuItemsController = new ContextMenuItemsController();
    this.collapseController = new CollapseController();
  }
}

```

## File: `JS/second_sidebar/sidebar_decorator.mjs`

```mjs
import { COMMON_CSS } from "./css/common.mjs";
import { CONTAINERS_CSS } from "./css/containers.mjs";
import { CONTEXT_ITEM_CSS } from "./css/context_item.mjs";
import { CUSTOMIZATION_CSS } from "./css/customization.mjs";
import { POPUPS_CSS } from "./css/popups.mjs";
import { SIDEBAR_BOX_CSS } from "./css/sidebar_box.mjs";
import { SIDEBAR_CSS } from "./css/sidebar.mjs";
import { SIDEBAR_MAIN_CSS } from "./css/sidebar_main.mjs";
import { SidebarControllers } from "./sidebar_controllers.mjs";
import { WEB_PANELS_BROWSER_CSS } from "./css/web_panels_browser.mjs";
import { WEB_PANEL_CSS } from "./css/web_panel.mjs";

const STYLE =
  COMMON_CSS +
  SIDEBAR_MAIN_CSS +
  SIDEBAR_BOX_CSS +
  SIDEBAR_CSS +
  WEB_PANELS_BROWSER_CSS +
  WEB_PANEL_CSS +
  POPUPS_CSS +
  CONTEXT_ITEM_CSS +
  CONTAINERS_CSS +
  CUSTOMIZATION_CSS;

export class SidebarDecorator {
  static decorate() {
    const style = document.createElement("style");
    style.innerHTML = STYLE;
    document.querySelector("head").appendChild(style);
    this.#collapse();
  }

  static #collapse() {
    setTimeout(() => {
      if (SidebarControllers.sidebarController.autoHideSidebar) {
        SidebarControllers.collapseController.collapse(false, true);
      }
    }, 100);
  }
}

```

## File: `JS/second_sidebar/sidebar_elements.mjs`

```mjs
import { CustomizableUIWrapper } from "./wrappers/customizable_ui.mjs";
import { OpenLinkInSidebarMenuItem } from "./xul/open_link_in_sidebar_menuitem.mjs";
import { Sidebar } from "./xul/sidebar.mjs";
import { SidebarBox } from "./xul/sidebar_box.mjs";
import { SidebarBoxFiller } from "./xul/sidebar_box_filler.mjs";
import { SidebarCollapseButton } from "./xul/sidebar_collapse_button.mjs";
import { SidebarMain } from "./xul/sidebar_main.mjs";
import { SidebarMainMenuPopup } from "./xul/sidebar_main_menupopup.mjs";
import { SidebarMainPopupSettings } from "./xul/sidebar_main_popup_settings.mjs";
import { SidebarSplitterPinned } from "./xul/sidebar_splitter_pinned.mjs";
import { SidebarSplitterUnpinned } from "./xul/sidebar_splitter_unpinned.mjs";
import { SidebarToolbar } from "./xul/sidebar_toolbar.mjs";
import { WebPanelMenuPopup } from "./xul/web_panel_menupopup.mjs";
import { WebPanelNewButton } from "./xul/web_panel_new_button.mjs";
import { WebPanelPopupDelete } from "./xul/web_panel_popup_delete.mjs";
import { WebPanelPopupEdit } from "./xul/web_panel_popup_edit.mjs";
import { WebPanelPopupMore } from "./xul/web_panel_popup_more.mjs";
import { WebPanelPopupNew } from "./xul/web_panel_popup_new.mjs";
import { WebPanels } from "./xul/web_panels.mjs";
import { WebPanelsBrowser } from "./xul/web_panels_browser.mjs";
import { XULElement } from "./xul/base/xul_element.mjs";

export class SidebarElements {
  static create() {
    console.log("Sidebar creation...");
    this.#createSidebar();

    console.log("Sidebar registration...");
    this.#registerSidebar();

    console.log("Widgets creation...");
    this.#createWidgets();

    console.log("Popups creation...");
    this.#createPopups();

    console.log("Context menu items creation...");
    this.#createContextMenuItems();
  }

  static #createSidebar() {
    this.sidebarMain = new SidebarMain();
    this.sidebarBox = new SidebarBox();
    this.sidebarBoxFiller = new SidebarBoxFiller();
    this.sidebarSplitterPinned = new SidebarSplitterPinned();
    this.sidebarSplitterUnpinned = new SidebarSplitterUnpinned();
    this.sidebar = new Sidebar();
    this.sidebarToolbar = new SidebarToolbar();
    this.webPanels = new WebPanels();
    this.webPanelsBrowser = new WebPanelsBrowser();

    const browser = new XULElement({
      element: document.getElementById("browser"),
    });
    browser.appendChildren(
      this.sidebarSplitterPinned,
      this.sidebarBox.appendChildren(
        this.sidebarBoxFiller,
        this.sidebarSplitterUnpinned,
        this.sidebar.appendChildren(this.sidebarToolbar, this.webPanels),
      ),
      this.sidebarMain,
    );
    this.webPanels.appendChild(this.webPanelsBrowser);
  }

  static #registerSidebar() {
    CustomizableUIWrapper.registerArea(this.sidebarMain.id, {
      defaultPlacements: ["new-web-panel"],
    });
    CustomizableUIWrapper.registerToolbarNode(this.sidebarMain.getXUL());
  }

  static #createWidgets() {
    this.webPanelNewButton = new WebPanelNewButton();
    this.sidebarCollapseButton = new SidebarCollapseButton();
  }

  static #createPopups() {
    this.webPanelMenuPopup = new WebPanelMenuPopup();
    this.webPanelPopupNew = new WebPanelPopupNew();
    this.webPanelPopupEdit = new WebPanelPopupEdit();
    this.webPanelPopupMore = new WebPanelPopupMore();
    this.webPanelPopupDelete = new WebPanelPopupDelete();
    this.sidebarMainPopupSettings = new SidebarMainPopupSettings();
    this.sidebarMainMenuPopup = new SidebarMainMenuPopup();

    const mainPopupSet = new XULElement({
      element: document.getElementById("mainPopupSet"),
    });
    mainPopupSet.appendChildren(
      this.webPanelMenuPopup,
      this.webPanelPopupNew,
      this.webPanelPopupEdit,
      this.webPanelPopupDelete,
      this.sidebarMainMenuPopup,
      this.sidebarMainPopupSettings,
    );
    this.sidebarToolbar.moreButton.appendChild(this.webPanelPopupMore);
  }

  static #createContextMenuItems() {
    this.openLinkInSidebarMenuItem = new OpenLinkInSidebarMenuItem();

    const contentAreaContextMenu = new XULElement({
      element: document.getElementById("contentAreaContextMenu"),
    });
    const separator = new XULElement({
      element: document.getElementById("context-sep-open"),
    });
    contentAreaContextMenu.insertBefore(
      this.openLinkInSidebarMenuItem,
      separator,
    );
  }
}

```

## File: `JS/second_sidebar/sidebar_injector.mjs`

```mjs
import { SidebarControllers } from "./sidebar_controllers.mjs";
import { SidebarElements } from "./sidebar_elements.mjs";
import { SidebarSettings } from "./settings/sidebar_settings.mjs";
import { WebPanelsSettings } from "./settings/web_panels_settings.mjs";
import { isPopupWindow } from "./utils/windows.mjs";

export class SidebarInjector {
  /**
   *
   * @returns {boolean}
   */
  static inject() {
    console.log("Loading sidebar settings...");
    const sidebarSettings = SidebarSettings.load();

    if (isPopupWindow() && sidebarSettings.hideInPopupWindows) {
      console.log("Failed to load second sidebar because window is popup");
      return false;
    }

    console.log("Loading web panel settings...");
    const webPanelsSettings = WebPanelsSettings.load();

    console.log("Elements creation...");
    SidebarElements.create();

    console.log("Building controllers...");
    SidebarControllers.create();

    console.log("Applying settings...");
    SidebarControllers.sidebarController.loadSettings(sidebarSettings);
    SidebarControllers.webPanelsController.loadSettings(webPanelsSettings);

    console.log("Second Sidebar loaded");
    return true;
  }
}

```

## File: `JS/allTabsMenuExpansionPack.uc.js`

```javascript
// ==UserScript==
// @name           All Tabs Menu Expansion Pack
// @version        2.2.0
// @author         aminomancer
// @homepageURL    https://github.com/aminomancer
// @long-description
// @description
/*
Next to the "new tab" button in Firefox there's a V-shaped button that opens a big scrolling menu containing all the tabs. This script adds several new features to the "all tabs menu" to help it catch up to the functionality of the regular tabs bar.

1. Allows you to drag and drop tabs in the all tabs menu.
2. Adds an animated close button for every tab in this menu.
3. Allows you to multiselect tabs in the all tabs menu and close an unlimited number of tabs at once without closing/blurring the popup.
4. Significantly improves the mute/unmute button by making it work like the mute button in the tabs bar used to work.
   - If you only have one tab selected, it mutes/unmutes that tab.
   - If you have multiple tabs selected, it mutes/unmutes all of them.
   - This also adds a tooltip to the mute button.
5. By default, Firefox doesn't do anything to differentiate loaded tabs from unloaded tabs. But for the regular tab bar, unloaded tabs gain an attribute `pending="true"` which you can use to dim them. This way you know which tabs are already initialized and which will actually start up when you click them. Pretty useful if you frequently have 100+ tabs like me.
   - This script adds the same functionality to the all tabs menu, but does not add "pending" styling to regular tabs since it's outside the scope of this project. To do it yourself just add a rule like `.tabbrowser-tab .tab-content{opacity:.6;}`
   - If you use [Unread Tab Mods][], this integrates with it to make unread tabs display with italic text.
6. Adds color stripes to multiselected tabs and container tabs in the "all tabs menu" so you can differentiate them from normal tabs.
7. Includes a preference `userChrome.tabs.all-tabs-menu.reverse-order` that lets you reverse the order of the tabs so that newer tabs are displayed on top rather than on bottom.
8. Allows the panel to display pinned tabs, and displays a pin icon on them.
9. Makes the sound icon show if the tab has blocked media or media in picture-in-picture, just like regular tabs.
10. Adds an optional preference `userChrome.ctrlTab.skip-show-all-button` that lets you skip past the "List All x Tabs" button when hitting Ctrl+Tab.
11. And a few other subtle improvements.

All the relevant CSS for this is already included in and loaded by the script. It's designed to look consistent with my theme as well as with the latest vanilla (proton) Firefox. If you need to change anything, see the "const css" line in here, or the end of uc-tabs-bar.css on my repo.

[Unread Tab Mods]: https://github.com/aminomancer/uc.css.js/blob/master/JS/unreadTabMods.uc.js
*/
// @downloadURL    https://cdn.jsdelivr.net/gh/aminomancer/uc.css.js@master/JS/allTabsMenuExpansionPack.uc.js
// @updateURL      https://cdn.jsdelivr.net/gh/aminomancer/uc.css.js@master/JS/allTabsMenuExpansionPack.uc.js
// @license        This Source Code Form is subject to the terms of the Creative Commons Attribution-NonCommercial-ShareAlike International License, v. 4.0. If a copy of the CC BY-NC-SA 4.0 was not distributed with this file, You can obtain one at http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
// ==/UserScript==
(function () {
  let prefSvc = Services.prefs;
  let reversePref = "userChrome.tabs.all-tabs-menu.reverse-order";
  let skipShowAllPref = "userChrome.ctrlTab.skip-show-all-button";
  const lazy = {};
  ChromeUtils.defineESModuleGetters(lazy, {
    TabsPanel: "resource:///modules/TabsList.sys.mjs",
  });

  /**
   * create a DOM node with given parameters
   * @param {object} aDoc (which doc to create the element in)
   * @param {string} tag (an HTML tag name, like "button" or "p")
   * @param {object} props (an object containing attribute name/value pairs, e.g. class: ".bookmark-item")
   * @param {boolean} isHTML (if true, create an HTML element. if omitted or false, create a XUL element. generally avoid HTML when modding the UI, most UI elements are actually XUL elements.)
   * @returns the created DOM node
   */
  function create(aDoc, tag, props, isHTML = false) {
    let el = isHTML ? aDoc.createElement(tag) : aDoc.createXULElement(tag);
    for (let prop in props) el.setAttribute(prop, props[prop]);
    return el;
  }

  function setAttributes(element, attrs) {
    for (let [name, value] of Object.entries(attrs)) {
      if (value) element.setAttribute(name, value);
      else element.removeAttribute(name);
    }
  }

  function findRow(el) {
    return el.classList.contains("all-tabs-item")
      ? el
      : el.closest(".all-tabs-item");
  }

  function l10nIfNeeded() {
    let lazies = document
      .getElementById("tabContextMenu")
      .querySelectorAll("[data-lazy-l10n-id]");
    if (lazies) {
      MozXULElement.insertFTLIfNeeded("browser/tabContextMenu.ftl");
      lazies.forEach((el) => {
        el.setAttribute("data-l10n-id", el.getAttribute("data-lazy-l10n-id"));
        el.removeAttribute("data-lazy-l10n-id");
      });
    }
  }

  function reverseTabOrder() {
    let panel = lazy.TabsPanel.prototype;
    if (
      prefSvc.getBoolPref(reversePref) &&
      !lazy.TabsPanel.prototype.reversed
    ) {
      eval(
        `panel._populate = function ${panel._populate
          .toSource()
          .replace(
            /super\.\_populate\(event\)\;/,
            Object.getPrototypeOf(panel)
              ._populate.toSource()
              .replace(/^.*\n\s*/, "")
              .replace(/\n.*$/, ""),
          )
          .replace(
            /appendChild/,
            `prepend`,
          )}\n panel._addTab = function ${panel._addTab
          .toSource()
          .replace(
            /nextRow\.parentNode\.insertBefore\(newRow\, nextRow\)\;/,
            `nextRow.after(newRow)`,
          )
          .replace(/this\.\_addElement/, `this.containerNode.prepend`)}`,
      );
      lazy.TabsPanel.prototype.reversed = true;
    } else {
      delete panel._populate;
      delete panel._addTab;
      lazy.TabsPanel.prototype.reversed = false;
    }
  }

  // Adjust the PanelView class methods for each panelview instance to improve
  // key navigation and prevent focusing hidden elements.
  function modifyWalkers(tabsPanel) {
    let panelViewClass = PanelView.forNode(tabsPanel.view);
    if (
      !panelViewClass.moveSelection.toSource().startsWith("(function uc_ATMEP_")
    ) {
      panelViewClass.moveSelection = function uc_ATMEP_moveSelection(
        isDown,
        arrowKey = false,
      ) {
        let walker = arrowKey
          ? this._arrowNavigableWalker
          : this._tabNavigableWalker;
        let oldSel = this.selectedElement;
        let newSel;
        if (oldSel) {
          walker.currentNode = oldSel;
          newSel = isDown ? walker.nextNode() : walker.previousNode();
        }
        // If we couldn't find something, select the first or last item:
        if (!newSel) {
          walker.currentNode = walker.root;
          newSel = isDown ? walker.firstChild() : walker.lastChild();
        }
        if (oldSel?.classList.contains("all-tabs-secondary-button")) {
          if (oldSel.parentElement === newSel?.parentElement) {
            walker.currentNode = newSel;
            newSel = isDown ? walker.nextNode() : walker.previousNode();
          }
        }
        this.selectedElement = newSel;
        return newSel;
      };
    }
    if (!panelViewClass.hasOwnProperty("moveSelectionHorizontal")) {
      panelViewClass.moveSelectionHorizontal =
        function uc_ATMEP_moveSelectionHorizontal(isNext) {
          let walker = this._horizontalNavigableWalker;
          let oldSel = this.selectedElement;
          let newSel;
          if (oldSel) {
            walker.currentNode = oldSel;
            newSel = isNext ? walker.nextNode() : walker.previousNode();
          }
          // If we couldn't find something, select the first or last item:
          if (!newSel) {
            walker.currentNode = walker.root;
            newSel = isNext ? walker.firstChild() : walker.lastChild();
          }
          this.selectedElement = newSel;
          return newSel;
        };
    }
    if (!panelViewClass.hasOwnProperty("_horizontalNavigableWalker")) {
      Object.defineProperty(panelViewClass, "_horizontalNavigableWalker", {
        get() {
          if (!this.__horizontalNavigableWalker) {
            this.__horizontalNavigableWalker = this._makeNavigableTreeWalker(
              true,
              false,
            );
          }
          return this.__horizontalNavigableWalker;
        },
      });
    }
    if (
      !panelViewClass._makeNavigableTreeWalker
        .toSource()
        .startsWith("(function uc_ATMEP_")
    ) {
      eval(
        `panelViewClass._makeNavigableTreeWalker = function ${panelViewClass._makeNavigableTreeWalker
          .toSource()
          .replace(/^\(/, "")
          .replace(/\)$/, "")
          .replace(/^_makeNavigableTreeWalker\s*/, "")
          .replace(/^function\s*/, "")
          .replace(/^(.)/, `uc_ATMEP_makeNavigableTreeWalker $1`)
          .replace(/\(arrowKey\)/, `(arrowKey, vertical = true)`)
          // .replace(/(node\.disabled)/, `$1 || node.hidden`)
          .replace(
            /(let bounds = this)/,
            `if (node.hidden) {\n        return NodeFilter.FILTER_SKIP;\n      }\n      $1`,
          )
          .replace(
            /(\(!arrowKey && this\._isNavigableWithTabOnly\(node\)\)\n\s*\) \{)/,
            /* javascript */ `$1
        if (vertical && node.classList.contains("all-tabs-secondary-button")) return NodeFilter.FILTER_SKIP;`,
          )}`,
      );
    }
    if (
      !panelViewClass.keyNavigation.toSource().startsWith("(function uc_ATMEP_")
    ) {
      eval(
        `panelViewClass.keyNavigation = function ${panelViewClass.keyNavigation
          .toSource()
          .replace(/^\(/, "")
          .replace(/\)$/, "")
          .replace(/^keyNavigation\s*/, "")
          .replace(/^function\s*/, "")
          .replace(/^(.)/, `uc_ATMEP_keyNavigation $1`)
          .replace(
            /(if \(\n\s*\(!this\.window\.RTL_UI && keyCode == \"ArrowLeft\"\) \|\|)/,
            /* javascript */ `if (this.selectedElement && this.selectedElement.matches(".all-tabs-button, .all-tabs-secondary-button")) {
          let isNext = (this.window.RTL_UI && keyCode == "ArrowLeft") || (!this.window.RTL_UI && keyCode == "ArrowRight");
          let nextButton = this.moveSelectionHorizontal(isNext);
          Services.focus.setFocus(nextButton, Services.focus.FLAG_BYKEY);
          break;
        }
        $1`,
          )}`,
      );
      delete panelViewClass.__arrowNavigableWalker;
      delete panelViewClass.__tabNavigableWalker;
    }
  }

  function prefHandler(_sub, _top, _pref) {
    let multiview = gTabsPanel.allTabsPanel.panelMultiView;
    if (multiview) {
      multiview.addEventListener("PanelMultiViewHidden", reverseTabOrder, {
        once: true,
      });
    } else {
      reverseTabOrder();
    }
  }

  function init() {
    gTabsPanel.init();
    registerSheet();
    let tabsPanels = [
      gTabsPanel.allTabsPanel,
      gTabsPanel.hiddenAudioTabsPopup,
      gTabsPanel.hiddenTabsPopup,
    ];
    let vanillaTooltip = document.getElementById("tabbrowser-tab-tooltip");
    let tooltip = vanillaTooltip.cloneNode(true);
    vanillaTooltip.after(tooltip);
    tooltip.id = "all-tabs-tooltip";
    tooltip.setAttribute(
      "onpopupshowing",
      `gTabsPanel.createTabTooltip(event)`,
    );
    tooltip.setAttribute("position", "after_end");
    gTabsPanel.createTabTooltip = function (e) {
      e.stopPropagation();
      let row = e.target.triggerNode?.closest(".all-tabs-item");
      let tab = row?.tab;
      if (!tab) {
        e.preventDefault();
        return;
      }

      const tooltip = e.target;
      tooltip.removeAttribute("data-l10n-id");

      let id, args, raw;
      let align = true;
      let { linkedBrowser } = tab;
      const contextTabInSelection = gBrowser.selectedTabs.includes(tab);
      const tabCount = contextTabInSelection ? gBrowser.selectedTabs.length : 1;
      if (row.querySelector("[close-button]").matches(":hover")) {
        id = "tabbrowser-close-tabs-tooltip";
        args = { tabCount };
        align = false;
      } else if (row.querySelector("[toggle-mute]").matches(":hover")) {
        args = { tabCount };
        if (contextTabInSelection) {
          id = linkedBrowser.audioMuted
            ? "tabbrowser-unmute-tab-audio-tooltip"
            : "tabbrowser-mute-tab-audio-tooltip";
          const keyElem = document.getElementById("key_toggleMute");
          args.shortcut = ShortcutUtils.prettifyShortcut(keyElem);
        } else if (tab.hasAttribute("activemedia-blocked")) {
          id = "tabbrowser-unblock-tab-audio-tooltip";
        } else {
          id = linkedBrowser.audioMuted
            ? "tabbrowser-unmute-tab-audio-background-tooltip"
            : "tabbrowser-mute-tab-audio-background-tooltip";
        }
        align = false;
      } else {
        raw = gBrowser.getTabTooltip(tab, true);
      }
      if (align) {
        e.target.setAttribute("position", "after_start");
        e.target.moveToAnchor(row, "after_start");
      }
      let title = e.target.querySelector(".places-tooltip-title");
      let localized = {};
      if (raw) {
        localized.label = raw;
      } else if (id) {
        let [msg] = gBrowser.tabLocalization.formatMessagesSync([{ id, args }]);
        localized.value = msg.value;
        if (msg.attributes) {
          for (let attr of msg.attributes) localized[attr.name] = attr.value;
        }
      }
      title.textContent = localized.label ?? "";
      if (tab.getAttribute("customizemode") === "true") {
        e.target
          .querySelector(".places-tooltip-box")
          .setAttribute("desc-hidden", "true");
        return;
      }
      let url = e.target.querySelector(".places-tooltip-uri");
      url.value = linkedBrowser?.currentURI?.spec.replace(/^https:\/\//, "");
      e.target
        .querySelector(".places-tooltip-box")
        .removeAttribute("desc-hidden");
      // show a lock icon to show tab security/encryption
      let icon = e.target.querySelector("#places-tooltip-insecure-icon");
      let pending =
        tab.hasAttribute("pending") || !linkedBrowser.browsingContext;
      let docURI = pending
        ? linkedBrowser?.currentURI
        : linkedBrowser?.documentURI || linkedBrowser?.currentURI;
      if (docURI) {
        let homePage = new RegExp(
          `(${BROWSER_NEW_TAB_URL}|${HomePage.get(window)})`,
          "i",
        ).test(docURI.spec);
        if (homePage) {
          icon.setAttribute("type", "home-page");
          icon.hidden = false;
          return;
        }
        switch (docURI.scheme) {
          case "file":
          case "resource":
          case "chrome":
            icon.setAttribute("type", "local-page");
            icon.hidden = false;
            return;
          case "about": {
            let pathQueryRef = docURI?.pathQueryRef;
            if (
              pathQueryRef &&
              /^(neterror|certerror|httpsonlyerror)/.test(pathQueryRef)
            ) {
              icon.setAttribute("type", "error-page");
              icon.hidden = false;
              return;
            }
            if (docURI.filePath === "blocked") {
              icon.setAttribute("type", "blocked-page");
              icon.hidden = false;
              return;
            }
            icon.setAttribute("type", "about-page");
            icon.hidden = false;
            return;
          }
          case "moz-extension":
            icon.setAttribute("type", "extension-page");
            icon.hidden = false;
            return;
        }
      }
      if (linkedBrowser.browsingContext) {
        let prog = Ci.nsIWebProgressListener;
        let state = linkedBrowser?.securityUI?.state;
        if (typeof state != "number" || state & prog.STATE_IS_SECURE) {
          icon.hidden = true;
          icon.setAttribute("type", "secure");
          return;
        }
        if (state & prog.STATE_IS_INSECURE) {
          icon.setAttribute("type", "insecure");
          icon.hidden = false;
          return;
        }
        if (state & prog.STATE_IS_BROKEN) {
          if (state & prog.STATE_LOADED_MIXED_ACTIVE_CONTENT) {
            icon.hidden = false;
            icon.setAttribute("type", "insecure");
          } else {
            icon.setAttribute("type", "mixed-passive");
            icon.hidden = false;
          }
          return;
        }
      }
      icon.hidden = true;
      icon.setAttribute("type", pending ? "pending" : "secure");
    };
    if (!("reversed" in lazy.TabsPanel.prototype)) reverseTabOrder();
    setupPIP();
    setupCtrlTab();

    tabsPanels.forEach(modifyWalkers);
    tabsPanels.forEach(setupTabsPanel);
  }

  function setupPIP() {
    let gNextWindowID = 0;
    let handleRequestSrc =
      PictureInPicture.handlePictureInPictureRequest.toSource();
    if (!handleRequestSrc.includes("_tabAttrModified")) {
      eval(
        `PictureInPicture.handlePictureInPictureRequest = async function ${handleRequestSrc
          .replace(/async handlePictureInPictureRequest/, "")
          .replace(/\sServices\.telemetry.*\s*.*\s*.*\s*.*/, "")
          .replace(/gCurrentPlayerCount.*/g, "")
          .replace(
            /(tab\.setAttribute\(\"pictureinpicture\".*)/,
            `$1 parentWin.gBrowser._tabAttrModified(tab, ["pictureinpicture"]);`,
          )}`,
      );
    }
    let clearIconSrc = PictureInPicture.clearPipTabIcon.toSource();
    if (!clearIconSrc.includes("_tabAttrModified")) {
      eval(
        `PictureInPicture.clearPipTabIcon = function ${clearIconSrc
          .replace(/WINDOW\_TYPE/, `"Toolkit:PictureInPicture"`)
          .replace(
            /(tab\.removeAttribute\(\"pictureinpicture\".*)/,
            `$1 gBrowser._tabAttrModified(tab, ["pictureinpicture"]);`,
          )}`,
      );
    }
  }

  function setupCtrlTab() {
    function excludeShowAll() {
      ctrlTab.showAllButton.setAttribute("tabindex", "-1");
      ctrlTab.previews = ctrlTab.previews.filter(
        (b) => b.id !== "ctrlTab-showAll",
      );
    }
    if (prefSvc.getBoolPref(skipShowAllPref, false)) excludeShowAll();
    prefSvc.addObserver(skipShowAllPref, (sub, top, pref) => {
      if (sub.getBoolPref(pref)) {
        excludeShowAll();
      } else {
        ctrlTab.showAllButton.removeAttribute("tabindex");
        delete ctrlTab.previews;
        ctrlTab.previews = [];
        let previewsContainer = document.getElementById("ctrlTab-previews");
        for (let i = 0; i < ctrlTab.maxTabPreviews; i++) {
          let preview = ctrlTab._makePreview();
          previewsContainer.appendChild(preview);
          ctrlTab.previews.push(preview);
        }
        ctrlTab.previews.push(ctrlTab.showAllButton);
      }
    });
  }

  function setupTabsPanel(tabsPanel) {
    tabsPanel.tabEvents = [
      "TabAttrModified",
      "TabClose",
      "TabMove",
      "TabHide",
      "TabShow",
      "TabPinned",
      "TabUnpinned",
      "TabSelect",
      "TabBrowserDiscarded",
    ];
    tabsPanel._setupListeners = function () {
      this.listenersRegistered = true;
      this.tabEvents.forEach((ev) =>
        gBrowser.tabContainer.addEventListener(ev, this),
      );
      this.gBrowser.addEventListener("TabMultiSelect", this);
      this.panelMultiView.addEventListener("PanelMultiViewHidden", this);
    };
    tabsPanel._cleanupListeners = function () {
      this.tabEvents.forEach((ev) =>
        gBrowser.tabContainer.removeEventListener(ev, this),
      );
      this.gBrowser.removeEventListener("TabMultiSelect", this);
      this.panelMultiView.removeEventListener("PanelMultiViewHidden", this);
      this.listenersRegistered = false;
    };
    tabsPanel._createRow = function (tab) {
      let { doc } = this;
      let row = create(doc, "toolbaritem", {
        class: "all-tabs-item",
        context: "tabContextMenu",
        tooltip: "all-tabs-tooltip",
        draggable: true,
      });
      if (this.className) row.classList.add(this.className);
      row.tab = tab;
      row.mOverSecondaryButton = false;
      row.addEventListener("command", this);
      row.addEventListener("mousedown", this);
      row.addEventListener("mouseup", this);
      row.addEventListener("click", this);
      row.addEventListener("mouseover", this);
      row.addEventListener("mouseout", this);
      this.tabToElement.set(tab, row);

      let button = row.appendChild(
        create(document, "toolbarbutton", {
          class: "all-tabs-button subviewbutton subviewbutton-iconic",
          flex: "1",
          crop: "right",
        }),
      );
      button.tab = tab;

      let secondaryButton = row.appendChild(
        create(document, "toolbarbutton", {
          class: "all-tabs-secondary-button subviewbutton subviewbutton-iconic",
          closemenu: "none",
          "toggle-mute": "true",
        }),
      );
      secondaryButton.tab = tab;

      let closeButton = row.appendChild(
        create(document, "toolbarbutton", {
          class: "all-tabs-secondary-button subviewbutton subviewbutton-iconic",
          "close-button": "true",
        }),
      );
      closeButton.tab = tab;

      this._setRowAttributes(row, tab);
      return row;
    };
    tabsPanel._setRowAttributes = function (row, tab) {
      setAttributes(row, {
        selected: tab.selected,
        pinned: tab.pinned,
        pending: tab.getAttribute("pending"),
        multiselected: tab.getAttribute("multiselected"),
        notselectedsinceload: tab.getAttribute("notselectedsinceload"),
        "tab-hidden": tab.hidden,
      });
      if (tab.userContextId) {
        let idColor = ContextualIdentityService.getPublicIdentityFromId(
          tab.userContextId,
        )?.color;
        row.className = idColor
          ? `all-tabs-item identity-color-${idColor}`
          : "all-tabs-item";
        row.setAttribute("usercontextid", tab.userContextId);
      } else {
        row.className = "all-tabs-item";
        row.removeAttribute("usercontextid");
      }

      let busy = tab.getAttribute("busy");
      setAttributes(row.querySelector(".all-tabs-button"), {
        busy,
        label: tab.label,
        image: !busy && tab.getAttribute("image"),
        iconloadingprincipal: tab.getAttribute("iconloadingprincipal"),
      });

      this._setImageAttributes(row, tab);

      let secondaryButton = row.querySelector(
        ".all-tabs-secondary-button[toggle-mute]",
      );
      setAttributes(secondaryButton, {
        muted: tab.muted,
        soundplaying: tab.soundPlaying,
        "activemedia-blocked": tab.activeMediaBlocked,
        pictureinpicture: tab.pictureinpicture,
        hidden: !(
          tab.muted ||
          tab.soundPlaying ||
          tab.activeMediaBlocked ||
          tab.pictureinpicture
        ),
      });
    };
    tabsPanel._moveTab = function (tab) {
      let item = this.tabToElement.get(tab);
      if (item) {
        this._removeItem(item, tab);
        this._addTab(tab);
        this.containerNode
          .querySelector(".all-tabs-item[selected]")
          .scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    };
    tabsPanel.handleEvent = function (e) {
      let { tab } = e.target;
      switch (e.type) {
        case "ViewShowing":
          if (!this.listenersRegistered && e.target == this.view) {
            this.panelMultiView = this.view.panelMultiView;
            this._populate(e);
          }
          break;
        case "mousedown":
          this._onMouseDown(e, tab);
          break;
        case "mouseup":
          this._onMouseUp(e, tab);
          break;
        case "click":
          this._onClick(e, tab);
          break;
        case "command":
          this._onCommand(e, tab);
          break;
        case "mouseover":
          this._onMouseOver(e, tab);
          break;
        case "mouseout":
          this._onMouseOut(e);
          break;
        case "TabPinned":
        case "TabUnpinned":
        case "TabAttrModified":
        case "TabBrowserDiscarded":
          this._tabAttrModified(e.target);
          break;
        case "TabHide":
        case "TabShow": {
          this._tabAttrModified(e.target);
          let item = this.tabToElement.get(e.target);
          if (item) {
            item.scrollIntoView({ block: "nearest", behavior: "smooth" });
          }
          break;
        }
        case "TabClose":
          this._tabClose(e.target);
          break;
        case "TabMove":
          this._moveTab(e.target);
          break;
        case "dragstart":
          this._onDragStart(e, tab);
          break;
        case "dragleave":
          this._onDragLeave(e);
          break;
        case "dragover":
          this._onDragOver(e);
          break;
        case "dragend":
          this._onDragEnd(e);
          break;
        case "drop":
          this._onDrop(e);
          break;
        case "TabMultiSelect":
          this._onTabMultiSelect();
          break;
        case "TabSelect":
          if (this.listenersRegistered) {
            let item = this.tabToElement.get(e.target);
            if (item) {
              item.scrollIntoView({ block: "nearest", behavior: "smooth" });
            }
          }
          break;
        case "PanelMultiViewHidden":
          if (e.target == this.panelMultiView) {
            this._cleanup();
            this.panelMultiView = null;
          }
          break;
      }
    };
    tabsPanel._onMouseDown = function (e, tab) {
      if (e.button !== 0) return;
      if (tab.hidden) {
        if (tab.getAttribute("pending") || tab.getAttribute("busy")) {
          tab.noCanvas = true;
        } else {
          delete tab.noCanvas;
        }
        return;
      }
      let accelKey = AppConstants.platform == "macosx" ? e.metaKey : e.ctrlKey;
      if (e.shiftKey) {
        const lastSelectedTab = this.gBrowser.lastMultiSelectedTab;
        if (!accelKey) {
          this.gBrowser.selectedTab = lastSelectedTab;
          this.gBrowser.clearMultiSelectedTabs();
        }
        this.gBrowser.addRangeToMultiSelectedTabs(lastSelectedTab, tab);
      } else if (accelKey) {
        if (tab.multiselected) {
          this.gBrowser.removeFromMultiSelectedTabs(tab);
        } else if (tab != this.gBrowser.selectedTab) {
          this.gBrowser.addToMultiSelectedTabs(tab);
          this.gBrowser.lastMultiSelectedTab = tab;
        }
      } else {
        if (!tab.selected && tab.multiselected) {
          this.gBrowser.lockClearMultiSelectionOnce();
        }
        if (
          !e.shiftKey &&
          !accelKey &&
          !e.target.classList.contains("all-tabs-secondary-button") &&
          tab !== this.gBrowser.selectedTab
        ) {
          if (tab.getAttribute("pending") || tab.getAttribute("busy")) {
            tab.noCanvas = true;
          } else {
            delete tab.noCanvas;
          }
          if (this.gBrowser.selectedTab != tab) this.gBrowser.selectedTab = tab;
          else this.gBrowser.tabContainer._handleTabSelect();
        }
      }
      if (e.target.closest(".all-tabs-item")?.mOverSecondaryButton) {
        e.stopPropagation();
        e.preventDefault();
      }
    };
    tabsPanel._onMouseUp = function (e, tab) {
      if (e.button === 2) return;
      if (e.button === 1) {
        this.gBrowser.removeTab(tab, {
          animate: true,
          byMouse: false,
        });
        return;
      }
      if (e.target.classList.contains("all-tabs-secondary-button")) return;
      if (tab.hidden) return this._onCommand(e, tab);
      if (
        e.shiftKey ||
        (AppConstants.platform == "macosx" ? e.metaKey : e.ctrlKey)
      ) {
        return;
      }
      delete tab.noCanvas;
      this.gBrowser.unlockClearMultiSelection();
      this.gBrowser.clearMultiSelectedTabs();
      PanelMultiView.hidePopup(
        PanelMultiView.forNode(this.view.panelMultiView)._panel,
      );
    };
    tabsPanel._onClick = function (e, tab) {
      if (e.button === 0) {
        if (
          e.target.classList.contains("all-tabs-secondary-button") &&
          !e.shiftKey &&
          !(AppConstants.platform == "macosx" ? e.metaKey : e.ctrlKey)
        ) {
          return;
        }
        e.preventDefault();
      }
    };
    tabsPanel._onCommand = function (e, tab) {
      if (e.target.hasAttribute("activemedia-blocked")) {
        if (tab.multiselected) {
          this.gBrowser.resumeDelayedMediaOnMultiSelectedTabs(tab);
        } else {
          tab.resumeDelayedMedia();
        }
        return;
      }
      if (e.target.hasAttribute("toggle-mute")) {
        if (tab.multiselected) {
          this.gBrowser.toggleMuteAudioOnMultiSelectedTabs(tab);
        } else {
          tab.toggleMuteAudio();
        }
        return;
      }
      if (e.target.hasAttribute("close-button")) {
        if (tab.multiselected) this.gBrowser.removeMultiSelectedTabs();
        else this.gBrowser.removeTab(tab, { animate: true });
        return;
      }
      if (!gSharedTabWarning.willShowSharedTabWarning(tab)) {
        if (tab !== this.gBrowser.selectedTab) this._selectTab(tab);
      }
      delete tab.noCanvas;
    };
    tabsPanel._onDragStart = function (e, tab) {
      let row = e.target;
      if (!tab || this.gBrowser.tabContainer._isCustomizing) return;
      let { selectedTabs } = this.gBrowser;
      let otherSelectedTabs = selectedTabs.filter(
        (selectedTab) => selectedTab != tab,
      );
      let dataTransferOrderedTabs = [tab].concat(otherSelectedTabs);
      let dt = e.dataTransfer;
      for (let i = 0; i < dataTransferOrderedTabs.length; i++) {
        let dtTab = dataTransferOrderedTabs[i];
        dt.mozSetDataAt("all-tabs-item", dtTab, i);
      }
      dt.mozCursor = "default";
      dt.addElement(row);
      // if multiselected tabs aren't adjacent, make them adjacent
      if (tab.multiselected) {
        function newIndex(aTab, index) {
          if (aTab.pinned) {
            return Math.min(index, this.gBrowser._numPinnedTabs - 1);
          }
          return Math.max(index, this.gBrowser._numPinnedTabs);
        }
        let tabIndex = selectedTabs.indexOf(tab);
        let draggedTabPos = tab._tPos;
        // tabs to the left of the dragged tab
        let insertAtPos = draggedTabPos - 1;
        for (let i = tabIndex - 1; i > -1; i--) {
          insertAtPos = newIndex(selectedTabs[i], insertAtPos);
          if (
            insertAtPos &&
            !selectedTabs[i].nextElementSibling.multiselected
          ) {
            this.gBrowser.moveTabTo(selectedTabs[i], insertAtPos);
          }
        }
        // tabs to the right
        insertAtPos = draggedTabPos + 1;
        for (let i = tabIndex + 1; i < selectedTabs.length; i++) {
          insertAtPos = newIndex(selectedTabs[i], insertAtPos);
          if (
            insertAtPos &&
            !selectedTabs[i].previousElementSibling.multiselected
          ) {
            this.gBrowser.moveTabTo(selectedTabs[i], insertAtPos);
          }
        }
      }
      // tab preview
      if (
        !tab.noCanvas &&
        (AppConstants.platform == "win" || AppConstants.platform == "macosx")
      ) {
        delete tab.noCanvas;
        let scale = window.devicePixelRatio;
        let canvas = this._dndCanvas;
        if (!canvas) {
          this._dndCanvas = canvas = document.createElementNS(
            "http://www.w3.org/1999/xhtml",
            "canvas",
          );
          canvas.style.width = "100%";
          canvas.style.height = "100%";
          canvas.mozOpaque = true;
        }
        canvas.width = 160 * scale;
        canvas.height = 90 * scale;
        let toDrag = canvas;
        let dragImageOffset = -16;
        let browser = tab.linkedBrowser;
        if (gMultiProcessBrowser) {
          let context = canvas.getContext("2d");
          context.fillStyle = getComputedStyle(this.view).getPropertyValue(
            "background-color",
          );
          context.fillRect(0, 0, canvas.width, canvas.height);

          let captureListener = () =>
            dt.updateDragImage(canvas, dragImageOffset, dragImageOffset);
          PageThumbs.captureToCanvas(browser, canvas).then(captureListener);
        } else {
          PageThumbs.captureToCanvas(browser, canvas);
          dragImageOffset = dragImageOffset * scale;
        }
        dt.setDragImage(toDrag, dragImageOffset, dragImageOffset);
      }
      tab._dragData = {
        movingTabs: (tab.multiselected
          ? this.gBrowser.selectedTabs
          : [tab]
        ).filter(this.filterFn),
      };
      e.stopPropagation();
    };
    // set the drop target style with an attribute, "dragpos", which is either
    // "after" or "before"
    tabsPanel._onDragOver = function (e) {
      let row = findRow(e.target);
      let dt = e.dataTransfer;
      if (
        !dt.types.includes("all-tabs-item") ||
        !row ||
        row.tab.multiselected
      ) {
        dt.mozCursor = "auto";
        return;
      }
      dt.mozCursor = "default";
      let draggedTab = dt.mozGetDataAt("all-tabs-item", 0);
      if (row.tab === draggedTab) return;
      if (row.tab.pinned !== draggedTab.pinned) return;
      // whether a tab will be placed before or after the drop target depends on
      // 1) whether the drop target is above or below the dragged tab, and 2)
      // whether the order of the tab list is reversed.
      function getPosition() {
        return prefSvc.getBoolPref(reversePref)
          ? row.tab._tPos < draggedTab._tPos
          : row.tab._tPos > draggedTab._tPos;
      }
      let position = getPosition() ? "after" : "before";
      row.setAttribute("dragpos", position);
      e.preventDefault();
    };
    // remove the drop target style.
    tabsPanel._onDragLeave = function (e) {
      let row = findRow(e.target);
      let dt = e.dataTransfer;
      dt.mozCursor = "auto";
      if (!dt.types.includes("all-tabs-item") || !row) return;
      this.containerNode
        .querySelectorAll("[dragpos]")
        .forEach((item) => item.removeAttribute("dragpos"));
    };
    // move the tab(s)
    tabsPanel._onDrop = function (e) {
      let row = findRow(e.target);
      let dt = e.dataTransfer;
      let tabBar = this.gBrowser.tabContainer;

      if (!dt.types.includes("all-tabs-item") || !row) return;

      let draggedTab = dt.mozGetDataAt("all-tabs-item", 0);
      let { movingTabs } = draggedTab._dragData;

      if (
        !movingTabs ||
        dt.mozUserCancelled ||
        dt.dropEffect === "none" ||
        tabBar._isCustomizing
      ) {
        delete draggedTab._dragData;
        return;
      }

      tabBar._finishGroupSelectedTabs(draggedTab);

      if (draggedTab) {
        let newIndex = row.tab._tPos;
        const dir = newIndex < movingTabs[0]._tPos;
        movingTabs.forEach((tab) => {
          if (tab.pinned !== row.tab.pinned) return;
          this.gBrowser.moveTabTo(
            dt.dropEffect == "copy" ? this.gBrowser.duplicateTab(tab) : tab,
            dir ? newIndex++ : newIndex,
          );
        });
      }
      row.removeAttribute("dragpos");
      e.stopPropagation();
    };
    // clean up remaining crap
    tabsPanel._onDragEnd = function (e) {
      let draggedTab = e.dataTransfer.mozGetDataAt("all-tabs-item", 0);
      delete draggedTab._dragData;
      delete draggedTab.noCanvas;
      for (let row of this.rows) row.removeAttribute("dragpos");
    };
    tabsPanel._onTabMultiSelect = function () {
      for (let item of this.rows) {
        item.toggleAttribute("multiselected", !!item.tab.multiselected);
      }
    };
    tabsPanel._onMouseOver = function (e, tab) {
      let row = e.target.closest(".all-tabs-item");
      SessionStore.speculativeConnectOnTabHover(tab);
      if (e.target.classList.contains("all-tabs-secondary-button")) {
        row.mOverSecondaryButton = true;
      }
      if (e.target.hasAttribute("close-button")) {
        tab = gBrowser._findTabToBlurTo(tab);
      }
      gBrowser.warmupTab(tab);
    };
    tabsPanel._onMouseOut = function (e) {
      let row = e.target.closest(".all-tabs-item");
      if (e.target.classList.contains("all-tabs-secondary-button")) {
        row.mOverSecondaryButton = false;
      }
    };
    tabsPanel.view.addEventListener("ViewShowing", l10nIfNeeded, {
      once: true,
    });
    ["dragstart", "dragleave", "dragover", "drop", "dragend"].forEach((ev) =>
      tabsPanel.containerNode.addEventListener(ev, tabsPanel),
    );
  }

  function registerSheet() {
    const css = /* css */ `
.panel-subview-body > .all-tabs-item {
    border-radius: var(--arrowpanel-menuitem-border-radius);
    box-shadow: none;
    align-items: center;
    padding-inline-end: 2px;
    overflow: clip;
    position: relative;
}
.panel-subview-body > .all-tabs-item .all-tabs-button:not([disabled], [open]):focus {
    background: none;
}
.panel-subview-body
    > .all-tabs-item:is([selected], [multiselected], [usercontextid]:is(:hover, [_moz-menuactive]))
    .all-tabs-button {
    background-image: linear-gradient(
        to right,
        var(--main-stripe-color) 0,
        var(--main-stripe-color) 4px,
        transparent 4px
    ) !important;
}
.panel-subview-body > .all-tabs-item[selected] {
    font-weight: normal;
    background-color: var(--arrowpanel-dimmed-further) !important;
    --main-stripe-color: var(--panel-item-active-bgcolor);
}
.panel-subview-body > .all-tabs-item .all-tabs-button {
    min-height: revert;
}
.panel-subview-body > .all-tabs-item[usercontextid]:not([multiselected]) {
    --main-stripe-color: var(--identity-tab-color);
}
.panel-subview-body > .all-tabs-item[multiselected] {
    --main-stripe-color: var(--multiselected-color, var(--toolbarbutton-icon-fill-attention));
}
.panel-subview-body
    > .all-tabs-item:not([selected]):is(:hover, :focus-within, [_moz-menuactive], [multiselected]) {
    background-color: var(--arrowpanel-dimmed) !important;
}
.panel-subview-body > .all-tabs-item[multiselected]:not([selected]):is(:hover, [_moz-menuactive]) {
    background-color: var(--arrowpanel-dimmed-further) !important;
}
.panel-subview-body
    > .all-tabs-item[pending]:not([selected]):is(:hover, :focus-within, [_moz-menuactive], [multiselected]) {
    background-color: var(
        --arrowpanel-faint,
        color-mix(in srgb, var(--arrowpanel-dimmed) 60%, transparent)
    ) !important;
}
.panel-subview-body
    > .all-tabs-item[pending][multiselected]:not([selected]):is(:hover, [_moz-menuactive]) {
    background-color: var(--arrowpanel-dimmed) !important;
}
.panel-subview-body > .all-tabs-item[pending] > .all-tabs-button {
    opacity: 0.6;
}
:root[italic-unread-tabs] .all-tabs-item[notselectedsinceload]:not([pending]) > .all-tabs-button,
:root[italic-unread-tabs] .all-tabs-item[notselectedsinceload][pending] > .all-tabs-button[busy] {
    font-style: italic;
}
.panel-subview-body > .all-tabs-item .all-tabs-secondary-button {
    width: 18px;
    height: 18px;
    border-radius: var(--tab-button-border-radius, 2px);
    color: inherit;
    background-color: transparent !important;
    opacity: 0.7;
    min-height: revert;
    min-width: revert;
    padding: 0;
}
.panel-subview-body > .all-tabs-item .all-tabs-secondary-button > .toolbarbutton-icon {
    min-width: 18px;
    min-height: 18px;
    fill: inherit;
    fill-opacity: inherit;
    -moz-context-properties: inherit;
}
.panel-subview-body > .all-tabs-item .all-tabs-secondary-button > label:empty {
    display: none;
}
.panel-subview-body > .all-tabs-item .all-tabs-secondary-button:is(:hover, :focus):not([disabled]),
.panel-subview-body
    > .all-tabs-item:is(:hover, :focus-within)
    .all-tabs-secondary-button[close-button]:is(:hover, :focus):not([disabled]) {
    background-color: var(--arrowpanel-dimmed) !important;
    opacity: 1;
    color: inherit;
}
.panel-subview-body > .all-tabs-item .all-tabs-secondary-button:hover:active:not([disabled]),
.panel-subview-body
    > .all-tabs-item:is(:hover, :focus-within)
    .all-tabs-secondary-button[close-button]:hover:active:not([disabled]) {
    background-color: var(--arrowpanel-dimmed-further) !important;
}
.panel-subview-body > .all-tabs-item .all-tabs-secondary-button[toggle-mute] {
    list-style-image: none !important;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 18 18"><path fill="context-fill" d="M3.52,5.367c-1.332,0-2.422,1.09-2.422,2.422v2.422c0,1.332,1.09,2.422,2.422,2.422h1.516l4.102,3.633 V1.735L5.035,5.367H3.52z M12.059,9c0-0.727-0.484-1.211-1.211-1.211v2.422C11.574,10.211,12.059,9.727,12.059,9z M14.48,9 c0-1.695-1.211-3.148-2.785-3.512l-0.363,1.09C12.422,6.82,13.27,7.789,13.27,9c0,1.211-0.848,2.18-1.938,2.422l0.484,1.09 C13.27,12.148,14.48,10.695,14.48,9z M12.543,3.188l-0.484,1.09C14.238,4.883,15.691,6.82,15.691,9c0,2.18-1.453,4.117-3.512,4.601 l0.484,1.09c2.422-0.605,4.238-2.906,4.238-5.691C16.902,6.215,15.086,3.914,12.543,3.188z"/></svg>') !important;
    background-size: 14px !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    padding: 0 !important;
    margin-inline-end: 8.5px;
    margin-inline-start: -27px;
    transition: 0.25s cubic-bezier(0.07, 0.78, 0.21, 0.95) transform,
        0.2s cubic-bezier(0.07, 0.74, 0.24, 0.95) margin, 0.075s linear opacity;
    display: block !important;
}
.panel-subview-body > .all-tabs-item .all-tabs-secondary-button[toggle-mute][hidden] {
    transform: translateX(14px);
    opacity: 0;
}
.panel-subview-body
    > .all-tabs-item:is(:hover, :focus-within)
    .all-tabs-secondary-button[toggle-mute] {
    transform: translateX(48px);
}
.panel-subview-body > .all-tabs-item .all-tabs-secondary-button[soundplaying] {
    transform: none !important;
    opacity: 0.7;
    margin-inline-start: -2px;
}
.panel-subview-body > .all-tabs-item .all-tabs-secondary-button[muted] {
    list-style-image: none !important;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 18 18"><path fill="context-fill" d="M3.52,5.367c-1.332,0-2.422,1.09-2.422,2.422v2.422c0,1.332,1.09,2.422,2.422,2.422h1.516l4.102,3.633V1.735L5.035,5.367H3.52z"/><path fill="context-fill" fill-rule="evenodd" d="M12.155,12.066l-1.138-1.138l4.872-4.872l1.138,1.138 L12.155,12.066z"/><path fill="context-fill" fill-rule="evenodd" d="M10.998,7.204l1.138-1.138l4.872,4.872l-1.138,1.138L10.998,7.204z"/></svg>') !important;
    transform: none !important;
    opacity: 0.7;
    margin-inline-start: -2px;
}
.panel-subview-body > .all-tabs-item .all-tabs-secondary-button[activemedia-blocked] {
    list-style-image: none !important;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12"><path fill="context-fill" d="M2.128.13A.968.968 0 0 0 .676.964v10.068a.968.968 0 0 0 1.452.838l8.712-5.034a.968.968 0 0 0 0-1.676L2.128.13z"/></svg>') !important;
    background-size: 10px !important;
    background-position: 4.5px center !important;
    transform: none !important;
    opacity: 0.7;
    margin-inline-start: -2px;
}
.panel-subview-body
    > .all-tabs-item:not(:hover, :focus-within)
    .all-tabs-secondary-button[pictureinpicture] {
    list-style-image: none !important;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 625.8 512"><path fill="context-fill" fill-opacity="context-fill-opacity" d="M568.9 0h-512C25.6 0 0 25 0 56.3v398.8C0 486.4 25.6 512 56.9 512h512c31.3 0 56.9-25.6 56.9-56.9V56.3C625.8 25 600.2 0 568.9 0zm-512 425.7V86c0-16.5 13.5-30 30-30h452c16.5 0 30 13.5 30 30v339.6c0 16.5-13.5 30-30 30h-452c-16.5.1-30-13.4-30-29.9zM482 227.6H314.4c-16.5 0-30 13.5-30 30v110.7c0 16.5 13.5 30 30 30H482c16.5 0 30-13.5 30-30V257.6c0-16.5-13.5-30-30-30z"/></svg>') !important;
    border-radius: 0 !important;
}
.panel-subview-body > .all-tabs-item .all-tabs-secondary-button[pictureinpicture] {
    transform: none !important;
    opacity: 0.7;
    margin-inline-start: -2px;
}
.panel-subview-body > .all-tabs-item .all-tabs-secondary-button[close-button] {
    fill-opacity: 0;
    transform: translateX(14px);
    opacity: 0;
    margin-inline-start: -27px;
    transition: 0.25s cubic-bezier(0.07, 0.78, 0.21, 0.95) transform,
        0.2s cubic-bezier(0.07, 0.74, 0.24, 0.95) margin, 0.075s linear opacity;
    display: block;
    -moz-context-properties: fill, fill-opacity, stroke;
    fill: currentColor;
    fill-opacity: 0;
    border-radius: var(--tab-button-border-radius, 2px);
    list-style-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect fill='context-fill' fill-opacity='context-fill-opacity' width='20' height='20' rx='2' ry='2'/><path fill='context-fill' fill-opacity='context-stroke-opacity' d='M11.06 10l3.47-3.47a.75.75 0 00-1.06-1.06L10 8.94 6.53 5.47a.75.75 0 10-1.06 1.06L8.94 10l-3.47 3.47a.75.75 0 101.06 1.06L10 11.06l3.47 3.47a.75.75 0 001.06-1.06z'/></svg>");
}
.panel-subview-body
    > .all-tabs-item:is(:hover, :focus-within)
    .all-tabs-secondary-button[close-button] {
    transform: none;
    opacity: 0.7;
    margin-inline-start: -2px;
}
.panel-subview-body > .all-tabs-item[dragpos] {
    background-color: color-mix(
        in srgb,
        transparent 30%,
        var(--arrowpanel-faint, color-mix(in srgb, var(--arrowpanel-dimmed) 60%, transparent))
    );
}
.panel-subview-body > .all-tabs-item[dragpos]::before {
    content: "";
    position: absolute;
    pointer-events: none;
    height: 0;
    z-index: 1000;
    width: 100%;
    border-image: linear-gradient(
        to right,
        transparent,
        var(--panel-item-active-bgcolor) 1%,
        var(--panel-item-active-bgcolor) 25%,
        transparent 90%
    );
    border-image-slice: 1;
    opacity: 1;
}
.panel-subview-body > .all-tabs-item[dragpos="before"]::before {
    inset-block-start: 0;
    border-top: 1px solid var(--panel-item-active-bgcolor);
}
.panel-subview-body > .all-tabs-item[dragpos="after"]::before {
    inset-block-end: 0;
    border-bottom: 1px solid var(--panel-item-active-bgcolor);
}
.panel-subview-body
    > .all-tabs-item[pinned]
    > .all-tabs-button.subviewbutton
    > .toolbarbutton-text {
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="context-fill" fill-opacity="context-fill-opacity" d="M14.707 13.293L11.414 10l2.293-2.293a1 1 0 0 0 0-1.414A4.384 4.384 0 0 0 10.586 5h-.172A2.415 2.415 0 0 1 8 2.586V2a1 1 0 0 0-1.707-.707l-5 5A1 1 0 0 0 2 8h.586A2.415 2.415 0 0 1 5 10.414v.169a4.036 4.036 0 0 0 1.337 3.166 1 1 0 0 0 1.37-.042L10 11.414l3.293 3.293a1 1 0 0 0 1.414-1.414zm-7.578-1.837A2.684 2.684 0 0 1 7 10.583v-.169a4.386 4.386 0 0 0-1.292-3.121 4.414 4.414 0 0 0-1.572-1.015l2.143-2.142a4.4 4.4 0 0 0 1.013 1.571A4.384 4.384 0 0 0 10.414 7h.172a2.4 2.4 0 0 1 .848.152z"/></svg>')
        no-repeat 6px/11px;
    padding-inline-start: 20px;
    -moz-context-properties: fill, fill-opacity;
    fill: currentColor;
}
#places-tooltip-insecure-icon {
    -moz-context-properties: fill;
    fill: currentColor;
    width: 1em;
    height: 1em;
    margin-inline-start: 0;
    margin-inline-end: .2em;
    min-width: 1em !important;
}
#places-tooltip-insecure-icon[hidden] {
    display: none;
}`;
    let sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(
      Ci.nsIStyleSheetService,
    );
    let uri = makeURI(`data:text/css;charset=UTF=8,${encodeURIComponent(css)}`);
    if (sss.sheetRegistered(uri, sss.AUTHOR_SHEET)) return;
    sss.loadAndRegisterSheet(uri, sss.AUTHOR_SHEET);
  }

  const defaultPrefs = prefSvc.getDefaultBranch("");
  defaultPrefs.setBoolPref(reversePref, false);
  // Necessary for the tab close button to render correctly
  defaultPrefs.setBoolPref("svg.context-properties.content.enabled", true);
  prefSvc.addObserver(reversePref, prefHandler);

  if (gBrowserInit.delayedStartupFinished) {
    init();
  } else {
    let delayedListener = (subject, topic) => {
      if (topic == "browser-delayed-startup-finished" && subject == window) {
        Services.obs.removeObserver(delayedListener, topic);
        init();
      }
    };
    Services.obs.addObserver(
      delayedListener,
      "browser-delayed-startup-finished",
    );
  }
})();

```

## File: `JS/autocompletePopupStyler.uc.js`

```javascript
// ==UserScript==
// @name           Autocomplete Popup Styler
// @version        1.0
// @author         aminomancer
// @homepage       https://github.com/aminomancer/uc.css.js
// @description    Sets `anchored-on-panel` on #PopupAutoComplete when it opens on a panel,
// so we can give it a brighter background color.
// @license        This Source Code Form is subject to the terms of the Creative Commons Attribution-NonCommercial-ShareAlike International License, v. 4.0. If a copy of the CC BY-NC-SA 4.0 was not distributed with this file, You can obtain one at http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
// ==/UserScript==

(function () {
  class AutocompletePopupStyler {
    constructor() {
      this.autocomplete.addEventListener("popupshowing", this);
    }
    handleEvent(_e) {
      this.autocomplete.toggleAttribute("anchored-on-panel", this.sameBG);
    }
    get sameBG() {
      if (!this.autocomplete.anchorNode) return false;
      return (
        getComputedStyle(this.panelShadowContent).backgroundColor ===
        getComputedStyle(this.autocomplete).backgroundColor
      );
    }
    get autocomplete() {
      return (
        this._autocomplete ||
        (this._autocomplete = document.getElementById("PopupAutoComplete"))
      );
    }
    get panelShadowContent() {
      return this.autocomplete.anchorNode
        ?.closest("panel")
        .shadowRoot.querySelector(`[part="content"]`);
    }
  }

  if (gBrowserInit.delayedStartupFinished) new AutocompletePopupStyler();
  else {
    let delayedListener = (subject, topic) => {
      if (topic == "browser-delayed-startup-finished" && subject == window) {
        Services.obs.removeObserver(delayedListener, topic);
        new AutocompletePopupStyler();
      }
    };
    Services.obs.addObserver(
      delayedListener,
      "browser-delayed-startup-finished",
    );
  }
})();

```

## File: `JS/extendedStatusbar.uc.js`

```javascript
// ==UserScript==
// @name           Extended Statusbar
// @description    A customizable Statusbar with link location preview
// @include        main
// @author         Thomas Leon Highbaugh
// @author         ARIS
// @author         py
// @version        2.1.2 (modified for userchrome.js)
// @homepageURL    https://addons.mozilla.org/en-US/firefox/addon/extended-statusbar/
// ==/UserScript==

/**
 * Extended Statusbar for Firefox (userChromeJS version)
 *
 * This script adds a customizable statusbar (addonbar) to Firefox, with link preview and support for toolbar buttons.
 * Optimized for use with fx-autoconfig and userChromeJS.
 *
 * Features:
 * - Adds a persistent addonbar at the bottom of the browser window.
 * - Supports compact mode for smaller toolbar buttons.
 * - Keyboard shortcut (Ctrl+/ or Cmd+/) to toggle the addonbar.
 * - Remembers visibility state across sessions.
 * - Fixes for downloads button and compatibility with modern Firefox.
 *
 * Usage:
 * - Place this script in your userChrome.js or userChromeJS scripts folder.
 * - Requires fx-autoconfig or userChromeJS loader.
 *
 * Tested with Firefox 91+ (may require adjustments for future versions).
 */

var appversion = parseInt(Services.appinfo.version, 10);

// Set to true for compact toolbar buttons
var compact_buttons = false;

var AddAddonbar = {
  /**
   * Initializes the addonbar and injects required CSS and UI elements.
   */
  init: function () {
    if (location != "chrome://browser/content/browser.xhtml") return;

    // Workaround for blank tab attribute
    try {
      if (gBrowser.selectedBrowser.getAttribute("blank"))
        gBrowser.selectedBrowser.removeAttribute("blank");
    } catch (e) {}

    // Ensure addonbar is enabled in preferences
    try {
      Services.prefs
        .getDefaultBranch("browser.addonbar.")
        .setBoolPref("enabled", true);
    } catch (e) {}

    var addonbar_label = "Add-on Bar";
    var compact_buttons_code = "";

    if (compact_buttons)
      compact_buttons_code = `
		#addonbar toolbarbutton .toolbarbutton-icon {
		  padding: 0 !important;
		  width: 16px !important;
		  height: 16px !important;
		}
		#addonbar .toolbarbutton-badge-stack {
		  padding: 0 !important;
		  margin: 0 !important;
		  width: 16px !important;
		  min-width: 16px !important;
		  height: 16px !important;
		  min-height: 16px !important;
		}
		#addonbar toolbarbutton .toolbarbutton-badge {
		  margin-top: 0px !important;
		  font-size: 5pt !important;
		  min-width: unset !important;
		  min-height: unset !important;
		  margin-inline-start: 0px !important;
		  margin-inline-end: 0px !important;
		}
		#addonbar .toolbaritem-combined-buttons {
		  margin-inline: 0px !important;
		}
		#addonbar toolbarbutton {
		  padding: 0 !important;
		}
	  `;

    // Inject CSS for addonbar styling
    Components.classes["@mozilla.org/content/style-sheet-service;1"]
      .getService(Components.interfaces.nsIStyleSheetService)
      .loadAndRegisterSheet(
        Services.io.newURI(
          "data:text/css;charset=utf-8," +
            encodeURIComponent(
              `
		  #addonbar toolbarpaletteitem[place=toolbar][id^=wrapper-customizableui-special-spring],
		  #addonbar toolbarspring {
			-moz-box-flex: 1 !important;
			min-width: unset !important;
			width: unset !important;
			max-width: unset !important;
		  }
		  #main-window[customizing] #addonbar {
			outline: 1px dashed !important;
			outline-offset: -2px !important;
		  }
		  #addonbar {
            border-radius: 6px 6px 0 0;
			background-color: var(--theme-sidebar-background) !important;
			background-image: none !important;
			-moz-window-dragging: no-drag !important;
		  }
		  :root[lwtheme] #addonbar {
   			background-color: var(--theme-sidebar-background) !important;
        	background-image: none !important;
		  }
		  :root[lwtheme][lwtheme-image='true'] #addonbar {
			background-image: none !important;
            background-color: var(--theme-sidebar-background) !important;
			background-position: 0vw 50vh !important;
		  }
		  /* autohide add-on bar in fullscreen mode */
		  #main-window[sizemode='fullscreen']:not([inDOMFullscreen='true']) #addonbar {
			visibility: visible !important;
			display: block !important;
			height: 1px !important;
			max-height: 1px !important;
            background-color: var(--theme-sidebar-background) !important;
        	background-image: none !important;
          }
		  #main-window[sizemode='fullscreen']:not([inDOMFullscreen='true']) #addonbar:hover {
			min-height: 26px !important;
			height: 26px !important;
			max-height: 26px !important;
            background-color: var(--theme-sidebar-background) !important;
        	background-image: none !important;
		  }
		  #addonbar toolbarbutton {
			background-color: var(--theme-sidebar-background) !important;
			border: none !important;
		  }
		  #unified-extensions-button[hidden]{
			visibility: visible !important;
			display: flex !important;
		  }
		  ` +
                compact_buttons_code +
                `
	  `,
            ),
          null,
          null,
        ),
        Components.classes[
          "@mozilla.org/content/style-sheet-service;1"
        ].getService(Components.interfaces.nsIStyleSheetService).AGENT_SHEET,
      );

    // Create and insert the addonbar toolbar if it doesn't exist
    try {
      if (document.getElementById("addonbar") == null) {
        var tb_addonbar = document.createXULElement("toolbar");
        tb_addonbar.setAttribute("id", "addonbar");
        tb_addonbar.setAttribute("collapsed", "false");
        tb_addonbar.setAttribute("toolbarname", addonbar_label);
        tb_addonbar.setAttribute("defaultset", "spring,spring");
        tb_addonbar.setAttribute("customizable", "true");
        tb_addonbar.setAttribute("mode", "icons");
        tb_addonbar.setAttribute("iconsize", "small");
        tb_addonbar.setAttribute("context", "toolbar-context-menu");
        tb_addonbar.setAttribute("lockiconsize", "true");
        tb_addonbar.setAttribute(
          "class",
          "toolbar-primary chromeclass-toolbar browser-toolbar customization-target",
        );

        document.getElementById("browser").parentNode.appendChild(tb_addonbar);
        tb_addonbar.insertBefore(
          document.querySelector("#statuspanel"),
          tb_addonbar.firstChild,
        );

        // Register the area for CustomizableUI
        CustomizableUI.registerArea("addonbar", { legacy: true });

        // Register again after a delay (workaround for initialization timing)
        setTimeout(function () {
          CustomizableUI.registerArea("addonbar", { legacy: true });
        }, 2000);

        CustomizableUI.registerToolbarNode(tb_addonbar);

        // Keyboard shortcut: Ctrl+/ (Win/Linux) or Cmd+/ (macOS) to toggle addonbar
        var key = document.createXULElement("key");
        key.id = "key_toggleAddonBar";
        key.setAttribute("key", "/");
        key.setAttribute("modifiers", "accel");
        key.addEventListener("command", () => {
          var newAddonBar = document.getElementById("addonbar");
          setToolbarVisibility(newAddonBar, newAddonBar.collapsed);
          Services.prefs
            .getBranch("browser.addonbar.")
            .setBoolPref("enabled", !newAddonBar.collapsed);
        });
        document.getElementById("mainKeyset").appendChild(key);

        // Set toolbar visibility based on preference
        try {
          setToolbarVisibility(
            document.getElementById("addonbar"),
            Services.prefs
              .getBranch("browser.addonbar.")
              .getBoolPref("enabled"),
          );
        } catch (e) {}
      }
    } catch (e) {}
  },
};

// Initialization: run after DOMContentLoaded and after a delay for reliability
document.addEventListener("DOMContentLoaded", () => AddAddonbar.init(), false);
setTimeout(function () {
  AddAddonbar.init();
}, 2000);

/**
 * Fix for downloads button on addonbar.
 * Ensures compatibility with scripts expecting 'navigator-toolbox' by patching them to use 'addonbar'.
 * See: https://github.com/Aris-t2/CustomJSforFx/issues/125#issuecomment-2506613776
 */
(async (url) =>
  !location.href.startsWith(url) ||
  (await delayedStartupPromise) ||
  (async (scrNT, nTjs) => {
    if (scrNT.length >= 1) {
      nTjs.uri = "data:application/x-javascript;charset=UTF-8,";
      nTjs.res = await fetch(scrNT[0].src);
      nTjs.src = (await nTjs.res.text())
        .replace(/navigator-toolbox/, "addonbar")
        .replace(/widget-overflow/, "addonbar");
      (
        await ChromeUtils.compileScript(nTjs.uri + encodeURIComponent(nTjs.src))
      ).executeInGlobal(this);
    }
  })(
    document
      .getElementById("navigator-toolbox")
      .querySelectorAll(":scope > script"),
    {},
  ))("chrome://browser/content/browser.x");

```

## File: `JS/minimizeMemory.uc.js`

```javascript
// ==UserScript==
// @name            Minimize Memory Usage
// @author          jterror
// @homepageURL     https://github.com/update692/firefox
// @version         1.1
// @include         main
// @onlyonce
// ==/UserScript==


(function () {
    window.console.log(">>>>: Minimize Memory Usage: START");

    const threshold = 1000;      // script is activated only when Firefox uses (megabytes) or more RAM
    const minz_limit = 500;      // minimize memory when relative RAM consumption exceeds (megabytes)
    const poll_interval = 30000; // check RAM consumption value every (milliseconds)
    const poll_number = 3;       // how many RAM consumption values to aggregate for decision
    // must be less than poll_interval
    const cooldown_time = 5000;  // give (milliseconds) for RAM level to stalilize after minimizing
    const debug_beep = false;     // sound beep when memory is cleared
    const beep_time = 0.1;       // beep duration (seconds)
    const round_mb = 20;         // round RAM values to (megabytes)

    const STAT_NONE = 0;
    const STAT_HIGH = 1;
    const STAT_LOW = 2;

    let current_level = threshold; // base for tracking rising memory
    let lower_level = threshold;   // base for tracking falling memory

    const Mgr = Cc["@mozilla.org/memory-reporter-manager;1"].getService(Ci.nsIMemoryReporterManager);
    let timer_poll;     // persistent variable so nsITimer doesn't disappear
    let timer_cooldown; // take time for RAM to stabilize after minimizing

    function roundToNearest(number, increment) {
        if (increment === 0) return number;
        if (increment < 0) increment = Math.abs(increment);
        return Math.round(number / increment) * increment;
    }

    function setTimeout(callback, ms, varname) {
        setTimer(callback, ms, Ci.nsITimer.TYPE_ONE_SHOT, varname);
    }

    function setInterval(callback, ms, varname) {
        setTimer(callback, ms, Ci.nsITimer.TYPE_REPEATING_SLACK, varname);
    }

    function setTimer(callback, ms, type, varname) {
        eval(
            `${varname} = Cc['@mozilla.org/timer;1'].createInstance(Ci.nsITimer);
            ${varname}.initWithCallback({notify: callback}, ms, type);`
        );
    }

    // function clearTimer(timer) {
    //     timer.cancel();
    // }

    async function doMMU() {
        if (debug_beep) doBeep();
        Services.obs.notifyObservers(null, "child-mmu-request");
        Mgr.minimizeMemoryUsage(() => {
            window.console.log(`>>>>: Memory minimization completed (${new Date().toISOString()})`);
            setTimeout(async () => {
                const megabytes = await getRAM();
                current_level = megabytes;
                lower_level = megabytes;
                window.console.log(`>>>>: level updated: ${megabytes}`);
            }, cooldown_time, "timer_cooldown");
        });
    }

    async function doBeep() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        gainNode.gain.value = 0.5;
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.type = 'sine';
        oscillator.frequency.value = 440; // A4 note
        oscillator.start();
        oscillator.stop(audioContext.currentTime + beep_time);
    }

    async function getRAM() {
        const info = await ChromeUtils.requestProcInfo();
        let bytes = info.memory;
        for (let child of info.children) bytes += child.memory;
        return roundToNearest(Math.round(bytes / 1048576), round_mb);
    }

    function checkStat(buffer, current, limit) {
        const values = buffer.getValues();
        let ret = STAT_NONE;
        if (values.every(value => value >= current + limit))
            ret = STAT_HIGH;
        else if (values.every(value => value < current))
            ret = STAT_LOW;
        return ret;
    }

    class CircularBuffer {
        constructor(size) {
            this.size = size;
            this.buffer = new Array(size);
            this.clear();
        }

        clear() {
            this.count = 0;
            this.index = 0;
        }

        add(value) {
            if (this.count < this.size) {
                this.buffer[this.count] = value;
                this.count++;
            } else {
                this.buffer[this.index] = value;
                this.index = (this.index + 1) % this.size;
            }
        }

        getValues() {
            let values = [];
            for (let i = 0; i < this.count; i++) {
                values.push(this.buffer[(this.index + i) % this.size]);
            }
            return values;
        }

        isFull() {
            return this.count >= this.size;
        }
    }

    const statbuf = new CircularBuffer(poll_number);

    function doReset() {
        current_level = threshold;
        lower_level = threshold;
        statbuf.clear();
    }

    setInterval(async () => {
        const megabytes = await getRAM();
        let log_msg = `>>>>: ${megabytes} MB, level: ${current_level}, level-down: ${lower_level}, threshold: ${threshold}, limit: ${minz_limit}`;

        if (megabytes >= threshold) {
            statbuf.add(megabytes);
            if (statbuf.isFull()) {
                let result = checkStat(statbuf, current_level, minz_limit);
                if (result === STAT_HIGH) {
                    log_msg += " : high>>";
                    doMMU();
                } else if (result === STAT_LOW) {
                    log_msg += " : low<<";
                    current_level = megabytes;
                    if (current_level <= lower_level - Math.round(minz_limit / 2)) {
                        doMMU();
                    }
                } else {
                    log_msg += " : none";
                }
            } else {
                log_msg += " : filling^^";
            }
        } else {
            log_msg += " : reset--";
            doReset();
        }
        window.console.log(log_msg);
    }, poll_interval, "timer_poll");
})();

```

## File: `JS/newTabUrlInAboutConfig.uc.js`

```javascript
// ==UserScript==
// @name            Restore browser.newtab.url in about:config
// @author          TheRealPSV
// @include         main
// @shutdown        UC.NewTabAboutConfig.destroy();
// @onlyonce
// ==/UserScript==

const { AboutNewTab } = ChromeUtils.importESModule(
  "resource:///modules/AboutNewTab.sys.mjs",
);

UC.NewTabAboutConfig = {
  NEW_TAB_CONFIG_PATH: "browser.newtab.url",
  init: function () {
    //fetch pref if it exists
    this.newTabURL = xPref.get(this.NEW_TAB_CONFIG_PATH);

    //if pref doesn't exist, give it a default value of about:blank
    if (!this.newTabURL) {
      this.newTabURL = "about:blank";
      xPref.set(this.NEW_TAB_CONFIG_PATH, this.newTabURL);
    }

    //set the new tab URL in the browser itself, and add a listener to update it when the config is changed
    try {
      AboutNewTab.newTabURL = this.newTabURL;
      this.prefListener = xPref.addListener(
        this.NEW_TAB_CONFIG_PATH,
        (value) => {
          AboutNewTab.newTabURL = value;
        },
      );
    } catch (e) {
      console.error(e);
    } // Browser Console
  },

  destroy: function () {
    xPref.removeListener(this.NEW_TAB_CONFIG_PATH);
  },
};

UC.NewTabAboutConfig.init();

```

## File: `JS/openLinkInUnloadedTab.uc.js`

```javascript
// ==UserScript==
// @name           Open Link in Unloaded Tab (context menu item)
// @version        1.5.7
// @author         aminomancer
// @homepageURL    https://github.com/aminomancer
// @long-description
// @description
/*
Add a new menu item to context menus prompted by right/accel-clicking on links or other link-like affordances. The menu item will open the link in a new background tab without loading the page. So the tab will start unloaded or "discarded." The context menu entry appears in the content area context menu when right-clicking a link; and in every menu where bookmarks, history, and synced tabs can be interacted with — sidebar, menubar, toolbar, toolbar button popup, and library window.

The script is basically a remake of [openInUnloadedTab.uc.js][] by xiaoxiaoflood, but intended for use with [fx-autoconfig][] by MrOtherGuy. It should still work with other loaders that load user scripts per-window, such as alice0775's loader, but is not compatible with older loaders or those like xiaoxiaoflood's loader.

The difference is that those loaders run scripts in the global execution context, and simply call a global function when a window is launched, (the global function takes the window as a parameter) whereas [fx-autoconfig][] loads normal scripts entirely within the window context, unless explicitly told to do otherwise. When you open a bookmark or history item in an unloaded tab, the tab draws its title from the entry in the places database. But when you open a link in an unloaded tab, there is no preexisting title. Normally when opening a link in a tab, the title is updated as the tab loads, but since we're opening the tab unloaded from the beginning, Firefox is less likely to know what the document's final title is.

By default, the script works around this by generating a temporary title for the tab based on the text of the link that was opened. So if you click a hyperlink [Mozilla][] whose label text says "Mozilla" the title will be set to Mozilla until the tab is loaded. But if you click a hyperlink whose label text is the same as the URL itself, like <https://mozilla.org>, the title will simply be the URL. There's a user preference for this, however. If you just want to use the URL for the title no matter what, toggle this pref to false in <about:config>: `userChrome.openLinkInUnloadedTab.use_link_text_as_tab_title_when_unknown`

[openInUnloadedTab.uc.js]: https://github.com/xiaoxiaoflood/firefox-scripts/blob/master/chrome/openInUnloadedTab.uc.js
[fx-autoconfig]: https://github.com/MrOtherGuy/fx-autoconfig
[Mozilla]: https://mozilla.org
*/
// @downloadURL    https://cdn.jsdelivr.net/gh/aminomancer/uc.css.js@master/JS/openLinkInUnloadedTab.uc.js
// @updateURL      https://cdn.jsdelivr.net/gh/aminomancer/uc.css.js@master/JS/openLinkInUnloadedTab.uc.js
// @license        This Source Code Form is subject to the terms of the Creative Commons Attribution-NonCommercial-ShareAlike International License, v. 4.0. If a copy of the CC BY-NC-SA 4.0 was not distributed with this file, You can obtain one at http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
// @include        main
// @include        chrome://browser/content/places/bookmarksSidebar.xhtml
// @include        chrome://browser/content/places/historySidebar.xhtml
// @include        chrome://browser/content/places/places.xhtml
// ==/UserScript==

/* The default labels are in English, but you can edit the values below to
change them. Firefox doesn't natively use any phrases like
"Open in New Unloaded Tab" so there isn't any reasonable way to automatically
localize this script. I'd have to do all the localization work myself, but I can
only speak two languages and I don't have any help. If anyone wants to
contribute localized strings for any of my scripts please feel free to post them
on my repo in the Issues or Discussions tab. In the meantime, please edit the
strings below yourself to change the language. */
const unloadedTabMenuL10n = {
  // Appears when right-clicking a container/folder in bookmarks or history.
  openAll: `Open All in Unloaded Tabs`,
  // Appears when right-clicking a bookmark, history item, etc.
  openBookmark: `Open in New Unloaded Tab`,
  // Appears when right-clicking a link in-content.
  openLink: `Open Link in New Unloaded Tab`,
  // All of the menu items use a predefined access key. Access keys are
  // underlined in the menu item's label, and pressing them on your keyboard
  // automatically selects the menu item. They serve as hotkeys while the
  // context menu is open. The default access key is "u" for the English,
  // "unloaded." If the chosen access key is not present in the menu item's
  // label, instead of being underlined in the label, it will be shown after the
  // label in parentheses, e.g. "Open All in Unloaded Tabs (G)"
  accessKey: `u`,
};

class UnloadedTabMenuBase {
  constructor() {
    ChromeUtils.defineESModuleGetters(this, {
      E10SUtils: "resource://gre/modules/E10SUtils.sys.mjs",
    });

    this.useLinkPref = `userChrome.openLinkInUnloadedTab.use_link_text_as_tab_title_when_unknown`;
    this.initPref(this.useLinkPref, true);

    this.QUERY_TYPE_BOOKMARKS =
      Ci.nsINavHistoryQueryOptions.QUERY_TYPE_BOOKMARKS;
    this.QUERY_TYPE_HISTORY = Ci.nsINavHistoryQueryOptions.QUERY_TYPE_HISTORY;

    this.placesMenuOpenUnloaded = this.create(document, "menuitem", {
      id: "placesContext_open:unloaded",
      label: unloadedTabMenuL10n.openBookmark,
      accesskey: unloadedTabMenuL10n.accessKey,
      disabled: true,
      hidden: true,
    });
    this.placesMenuOpenUnloaded.addEventListener("command", (e) =>
      this.openTab(
        this.getActivePlacesView(e.target.parentElement).selectedNode,
      ),
    );
    this.placesMenuOpenNewTab.after(this.placesMenuOpenUnloaded);

    this.placesMenuOpenAllUnloaded = this.create(document, "menuitem", {
      id: "placesContext_openContainer:unloaded",
      label: unloadedTabMenuL10n.openAll,
      accesskey: unloadedTabMenuL10n.accessKey,
      disabled: true,
      hidden: true,
    });
    this.placesMenuOpenAllUnloaded.addEventListener("command", (e) =>
      this.openSelectedTabs(e.target.parentElement),
    );
    this.placesMenuOpenContainer?.after(this.placesMenuOpenAllUnloaded);

    this.placesMenuOpenAllLinksUnloaded = this.create(document, "menuitem", {
      id: "placesContext_openLinks:unloaded",
      label: unloadedTabMenuL10n.openAll,
      accesskey: unloadedTabMenuL10n.accessKey,
      disabled: true,
      hidden: true,
    });
    this.placesMenuOpenAllLinksUnloaded.addEventListener("command", (e) =>
      this.openSelectedTabs(e.target.parentElement),
    );
    this.placesMenuOpenAllLinks.after(this.placesMenuOpenAllLinksUnloaded);

    this.placesContextMenu.addEventListener("popupshowing", this);

    if (location.href !== `chrome://browser/content/browser.xhtml`) return;

    this.syncedMenuOpenAllUnloaded = this.create(document, "menuitem", {
      id: "syncedTabsOpenAllUnloaded",
      label: unloadedTabMenuL10n.openAll,
      accesskey: unloadedTabMenuL10n.accessKey,
      disabled: true,
      hidden: true,
    });
    this.syncedMenuOpenAllUnloaded.addEventListener("command", () =>
      this.openAllSyncedFromDevice(),
    );
    this.syncedMenuOpenAll.after(this.syncedMenuOpenAllUnloaded);

    this.syncedMenuOpenUnloaded = this.create(document, "menuitem", {
      id: "syncedTabsOpenUnloaded",
      label: unloadedTabMenuL10n.openBookmark,
      accesskey: unloadedTabMenuL10n.accessKey,
      disabled: true,
      hidden: true,
    });
    this.syncedMenuOpenUnloaded.addEventListener("command", () =>
      this.openSyncedTabUnloaded(),
    );
    this.syncedMenuOpenTab.after(this.syncedMenuOpenUnloaded);

    this.syncedContextMenu.addEventListener("popupshowing", this);

    this.contentMenuOpenLinkUnloaded = this.create(document, "menuitem", {
      id: "context-openlinkinunloadedtab",
      label: unloadedTabMenuL10n.openLink,
      accesskey: unloadedTabMenuL10n.accessKey,
      hidden: true,
    });
    this.contentMenuOpenLinkUnloaded.addEventListener("command", () =>
      this.openTab(
        { url: gContextMenu.linkURL },
        { fromContent: true, linkText: gContextMenu.linkTextStr },
      ),
    );
    this.contentMenuOpenLink.after(this.contentMenuOpenLinkUnloaded);
    this.contentContextMenu.addEventListener("popupshowing", this);
    this.contentContextMenu.addEventListener("popuphidden", this);
  }
  create(doc, tag, props, isHTML = false) {
    let el = isHTML ? doc.createElement(tag) : doc.createXULElement(tag);
    for (let prop in props) {
      el.setAttribute(prop, props[prop]);
    }
    return el;
  }
  handleEvent(e) {
    switch (e.type) {
      case "popuphidden":
        if (e.originalTarget === this.contentContextMenu) {
          this.contentMenuOpenLinkUnloaded.hidden = true;
        }
        break;
      case "popupshowing":
        switch (e.target) {
          case this.contentContextMenu:
            gContextMenu.showItem(
              "context-openlinkinunloadedtab",
              gContextMenu.onSaveableLink || gContextMenu.onPlainTextLink,
            );
            break;
          case this.placesContextMenu:
            this.onPlacesContextMenuShowing(e);
            break;
          case this.syncedContextMenu:
            this.onSyncedContextMenuShowing(e);
            break;
        }
        break;
    }
  }
  onPlacesContextMenuShowing(_e) {
    this.placesMenuOpenAllUnloaded.disabled =
      this.placesMenuOpenContainer?.disabled &&
      this.placesMenuOpenBookmarkContainer?.disabled &&
      this.placesMenuOpenBookmarkLinks?.disabled;
    this.placesMenuOpenAllUnloaded.hidden =
      this.placesMenuOpenContainer?.hidden &&
      this.placesMenuOpenBookmarkContainer?.hidden &&
      this.placesMenuOpenBookmarkLinks?.hidden;
    this.placesMenuOpenAllLinksUnloaded.disabled =
      this.placesMenuOpenAllLinks?.disabled;
    this.placesMenuOpenAllLinksUnloaded.hidden =
      this.placesMenuOpenAllLinks?.hidden;
    this.placesMenuOpenUnloaded.disabled = this.placesMenuOpenNewTab?.disabled;
    this.placesMenuOpenUnloaded.hidden = this.placesMenuOpenNewTab?.hidden;
  }
  onSyncedContextMenuShowing(_e) {
    this.syncedContextMenuInited = true;
    this.syncedMenuOpenAllUnloaded.disabled = this.syncedMenuOpenAll?.disabled;
    this.syncedMenuOpenAllUnloaded.hidden = this.syncedMenuOpenAll?.hidden;
    this.syncedMenuOpenUnloaded.disabled = this.syncedMenuOpenTab?.disabled;
    this.syncedMenuOpenUnloaded.hidden = this.syncedMenuOpenTab?.hidden;
  }
  initPref(pref, bool) {
    if (!Services.prefs.prefHasUserValue(pref)) {
      Services.prefs.setBoolPref(pref, bool);
    }
  }
  get useLinkAsTabTitle() {
    return Services.prefs.getBoolPref(this.useLinkPref, true);
  }
  get placesContextMenu() {
    return (
      this._placesContextMenu ||
      (this._placesContextMenu = document.getElementById("placesContext"))
    );
  }
  get contentContextMenu() {
    return (
      this._contentContextMenu ||
      (this._contentContextMenu = document.getElementById(
        "contentAreaContextMenu",
      ))
    );
  }
  get syncedContextMenu() {
    return (
      this._syncedContextMenu ||
      (this._syncedContextMenu = document.getElementById(
        "SyncedTabsSidebarContext",
      ))
    );
  }
  get syncedTabsDeck() {
    return document.getElementById("sidebar")?.contentWindow
      .syncedTabsDeckComponent;
  }
  get syncedTabsList() {
    return this.syncedTabsDeck.tabListComponent;
  }
  get syncedTabsStore() {
    return this.syncedTabsList._store;
  }
  get syncedTabsView() {
    return this.syncedTabsList._view;
  }
  get selectedSyncedRow() {
    return this.syncedTabsStore.data[this.syncedTabsStore._selectedRow[0]];
  }
  get selectedSyncedTab() {
    return this.selectedSyncedRow.tabs?.[this.syncedTabsStore._selectedRow[1]];
  }
  get placesMenuOpenContainer() {
    return (
      this._placesMenuOpenContainer ||
      (this._placesMenuOpenContainer = document.getElementById(
        "placesContext_openContainer:tabs",
      ))
    );
  }
  get placesMenuOpenBookmarkContainer() {
    return (
      this._placesMenuOpenBookmarkContainer ||
      (this._placesMenuOpenBookmarkContainer = document.getElementById(
        "placesContext_openBookmarkContainer:tabs",
      ))
    );
  }
  get placesMenuOpenBookmarkLinks() {
    return (
      this._placesMenuOpenBookmarkLinks ||
      (this._placesMenuOpenBookmarkLinks = document.getElementById(
        "placesContext_openBookmarkLinks:tabs",
      ))
    );
  }
  get placesMenuOpenAllLinks() {
    return (
      this._placesMenuOpenAllLinks ||
      (this._placesMenuOpenAllLinks = document.getElementById(
        "placesContext_openLinks:tabs",
      ))
    );
  }
  get placesMenuOpenNewTab() {
    return (
      this._placesMenuOpenNewTab ||
      (this._placesMenuOpenNewTab = document.getElementById(
        "placesContext_open:newtab",
      ))
    );
  }
  get syncedMenuOpenAll() {
    return (
      this._syncedMenuOpenAll ||
      (this._syncedMenuOpenAll = this.syncedContextMenu.querySelector(
        "#syncedTabsOpenAllInTabs",
      ))
    );
  }
  get syncedMenuOpenTab() {
    return (
      this._syncedMenuOpenTab ||
      (this._syncedMenuOpenTab = this.syncedContextMenu.querySelector(
        "#syncedTabsOpenSelectedInTab",
      ))
    );
  }
  get contentMenuOpenLink() {
    return (
      this._contentMenuOpenLink ||
      (this._contentMenuOpenLink = document.getElementById(
        "context-openlinkintab",
      ))
    );
  }
  getActivePlacesView(popup) {
    if (!popup.triggerNode) return false;
    return PlacesUIUtils.getViewForNode(popup.triggerNode);
  }
  openSelectedTabs(popup) {
    let view = this.getActivePlacesView(popup);
    let folder = view.selectedNode || view.selectedNodes || view.result.root;
    let items = [];
    if (PlacesUtils.nodeIsContainer(folder)) {
      let root = PlacesUtils.getContainerNodeWithOptions(folder, false, true);
      let result = root.parentResult;
      let wasOpen = root.containerOpen;
      let didSuppressNotifications = false;
      if (!wasOpen) {
        didSuppressNotifications = result.suppressNotifications;
        if (!didSuppressNotifications) result.suppressNotifications = true;
        root.containerOpen = true;
      }
      for (let i = 0; i < root.childCount; ++i) {
        let child = root.getChild(i);
        if (PlacesUtils.nodeIsURI(child)) {
          items.push({
            url: child.uri,
            title: child.title,
            icon: child.icon,
          });
        }
      }
      if (!wasOpen) {
        root.containerOpen = false;
        if (!didSuppressNotifications) result.suppressNotifications = false;
      }
    } else {
      items = folder;
    }
    items.forEach((item) => this.openTab(item, { bulkOpen: true }));
  }
  openSyncedTabUnloaded() {
    if (!this.syncedContextMenuInited) return;
    if (this.syncedTabsStore._selectedRow[1] >= 0) {
      this.openTab(this.selectedSyncedTab, { syncedTabs: true });
    }
  }
  openAllSyncedFromDevice() {
    if (!this.syncedContextMenuInited) return;
    if (this.syncedTabsStore._selectedRow[0] >= 0) {
      this.selectedSyncedRow.tabs.forEach((item) =>
        this.openTab(item, { bulkOpen: true, syncedTabs: true }),
      );
    }
  }
  async openTab(item, params = {}) {
    let url = typeof item === "object" ? item.url || item.uri : item;
    let win = window.gBrowser ? window : BrowserWindowTracker.getTopWindow();
    let { gBrowser } = win;

    let tabParams = {};
    if (params.fromContent && gContextMenu) {
      tabParams = gContextMenu._openLinkInParameters({
        userContextId: gBrowser.selectedTab.userContextId,
      });
    } else {
      if (params.bulkOpen) {
        tabParams = {
          skipAnimation: true,
          bulkOrderedOpen: true,
        };
      }
      tabParams.triggeringPrincipal =
        location.href === `chrome://browser/content/browser.xhtml` &&
        !params.syncedTabs
          ? gBrowser.selectedBrowser.contentPrincipal
          : Services.scriptSecurityManager.getSystemPrincipal();
    }
    tabParams.noInitialLabel = true;

    let tab = gBrowser.addTab(null, tabParams);
    let uri = Services.io.newURI(url);
    let info =
      this.getInfoFromHistory(uri, this.QUERY_TYPE_HISTORY) ||
      this.getInfoFromHistory(uri, this.QUERY_TYPE_BOOKMARKS);
    let tentativeIcon = item?.icon || info?.icon;

    win.SessionStore.setTabState(tab, {
      entries: [
        {
          url,
          title:
            item?.title ||
            info?.title ||
            (this.useLinkAsTabTitle && params.linkText),
          triggeringPrincipal_base64: this.E10SUtils.serializePrincipal(
            tabParams.triggeringPrincipal,
          ),
        },
      ],
      lastAccessed: tab.lastAccessed,
    });

    let iconURL;
    let isReady = false;
    tab.addEventListener(
      "SSTabRestoring",
      function () {
        isReady = true;
        win.unloadedTabMenu.maybeSetIcon(
          tab,
          iconURL,
          isReady,
          tabParams.triggeringPrincipal,
        );
      },
      { once: true },
    );
    let tempURL =
      (await PlacesUtils.promiseFaviconData(uri.spec, 256).then(
        (data) => data?.uri?.spec,
      )) || tentativeIcon;
    if (tempURL) {
      let blob = await fetch(tempURL)
        .then((r) => r.blob())
        .catch(() => {
          if (
            params.fromContent &&
            gContextMenu.linkURI.host ===
              gContextMenu.contentData.principal.host
          ) {
            iconURL = gBrowser.getTabForBrowser(gContextMenu.browser).image;
            win.unloadedTabMenu.maybeSetIcon(
              tab,
              iconURL,
              isReady,
              tabParams.triggeringPrincipal,
            );
          }
        });
      let reader = new FileReader();
      reader.onloadend = function () {
        iconURL = reader.result;
        win.unloadedTabMenu.maybeSetIcon(
          tab,
          iconURL,
          isReady,
          tabParams.triggeringPrincipal,
        );
      };
      reader.readAsDataURL(blob);
    }
  }
  maybeSetIcon(tab, iconURL, isReady, principal) {
    if (iconURL && isReady) {
      tab.ownerGlobal.gBrowser.setIcon(tab, iconURL, null, principal);
    }
  }
  getInfoFromHistory(aURI, aQueryType) {
    let options = PlacesUtils.history.getNewQueryOptions();
    options.queryType = aQueryType;
    options.maxResults = 1;

    let query = PlacesUtils.history.getNewQuery();
    query.uri = aURI;

    let { root } = PlacesUtils.history.executeQuery(query, options);
    root.containerOpen = true;

    if (!root.childCount) {
      root.containerOpen = false;
      return null;
    }

    let child = root.getChild(0);
    root.containerOpen = false;

    return {
      title: child.title,
      icon: child.icon,
    };
  }
}

if (
  location.href !== `chrome://browser/content/browser.xhtml` ||
  gBrowserInit.delayedStartupFinished
) {
  window.unloadedTabMenu = new UnloadedTabMenuBase();
} else {
  let delayedListener = (subject, topic) => {
    if (topic == "browser-delayed-startup-finished" && subject == window) {
      Services.obs.removeObserver(delayedListener, topic);
      window.unloadedTabMenu = new UnloadedTabMenuBase();
    }
  };
  Services.obs.addObserver(delayedListener, "browser-delayed-startup-finished");
}

```

## File: `JS/pdfTools.uc.js`

```javascript
// ==UserChromeJS==
// @name           PDF Tools (userChrome.js)
// @description    Enhances the pdf.js window in Firefox as a userChrome.js script.
// @version        1.0
// @author         Thomas Leon Highbaugh adapted from userscript by jerone
// ==/UserChromeJS==

(function () {
  // Only run in PDF.js viewer window
  if (!location.href.match(/\.pdf([?#].*)?$/)) return;

  // Wait for PDF.js to load
  function runWhenReady() {
    const mainContainer = document.getElementById("mainContainer");
    const toolbar = document.getElementById("toolbarViewerRight");
    if (
      !mainContainer ||
      !toolbar ||
      !window.PDFViewerApplication ||
      !window.PDFViewerApplication.pdfViewer
    ) {
      setTimeout(runWhenReady, 500);
      return;
    }

    var mimetype = "png";

    var SecondaryToolbar = {
      opened: false,
      initialize: function secondaryToolbarInitialize() {
        this.toolbar = document.createElement("div");
        this.toolbar.classList.add(
          "secondaryToolbar",
          "doorHangerRight",
          "hidden",
        );
        this.toolbar.style.right = "180px";
        mainContainer.appendChild(this.toolbar);

        this.buttonContainer = document.createElement("div");
        this.buttonContainer.classList.add("secondaryToolbarButtonContainer");
        this.toolbar.appendChild(this.buttonContainer);

        this.attachEvents();
      },

      attachEvents: function () {
        window.addEventListener(
          "click",
          function click(evt) {
            if (
              SecondaryToolbar.opened &&
              window.PDFViewerApplication.pdfViewer.viewer.contains(evt.target)
            ) {
              SecondaryToolbar.close();
            }
          },
          false,
        );
        window.addEventListener("keydown", function keydown(evt) {
          if (
            SecondaryToolbar.opened &&
            (evt.key === "Escape" || evt.keyCode === 27)
          ) {
            SecondaryToolbar.close();
          }
        });
      },

      render: function () {
        var pages = window.PDFViewerApplication.pdfViewer._pages;

        for (var i = 0, ii = pages.length; i < ii; i++) {
          var page = pages[i];
          var img = document.createElement("a");
          img.classList.add("secondaryToolbarButton", "download");
          img.dataset.pageIndex = i;
          img.setAttribute("download", "page" + page.id + "." + mimetype);
          img.setAttribute(
            "title",
            "Download 'page" + page.id + "." + mimetype + "'",
          );
          img.style.display = "inline-block";
          img.style.boxSizing = "border-box";
          img.appendChild(document.createTextNode("Page " + page.id));
          img.addEventListener("click", function () {
            var page = pages[this.dataset.pageIndex];
            if (!page.canvas) {
              page.draw();
            }
            this.href = page.canvas.toDataURL("image/" + mimetype);
          });

          var img2 = document.createElement("img");
          img2.style.height = "16px";
          img2.style.border = "1px solid red";
          img2.src =
            (page.canvas && page.canvas.toDataURL("image/" + mimetype)) || "";
          this.buttonContainer.appendChild(img2);
        }
      },

      empty: function () {
        while (this.buttonContainer.hasChildNodes()) {
          this.buttonContainer.removeChild(this.buttonContainer.lastChild);
        }
      },

      open: function secondaryToolbarOpen() {
        if (this.opened) {
          return;
        }
        this.opened = true;
        this.toolbar.classList.remove("hidden");
        this.render();
      },

      close: function secondaryToolbarClose(target) {
        if (!this.opened) {
          return;
        } else if (target && !this.toolbar.contains(target)) {
          return;
        }
        this.opened = false;
        this.toolbar.classList.add("hidden");
        this.empty();
      },

      toggle: function secondaryToolbarToggle() {
        if (this.opened) {
          this.close();
        } else {
          this.open();
        }
      },
    };

    SecondaryToolbar.initialize();

    var btn = document.createElement("button");
    btn.classList.add("toolbarButton", "zoomIn");
    toolbar.insertBefore(btn, toolbar.firstChild);
    btn.addEventListener("click", function () {
      SecondaryToolbar.toggle();
    });
  }

  // Run when DOM is ready
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    runWhenReady();
  } else {
    document.addEventListener("DOMContentLoaded", runWhenReady, { once: true });
  }
})();

```

## File: `JS/privateWindowHomepage.uc.js`

```javascript
// ==UserScript==
// @name           Private Window Homepage @version        1.0
// @author         aminomancer
// @homepage  https://github.com/aminomancer/uc.css.js
// @description    This script modifies
// the default behavior of private windows in Firefox. Instead of opening the
// first tab to about:privatebrowsing, it allows private windows to respect the
// user's homepage and new tab page preferences, similar to ordinary windows.
// ==/UserScript==

(function () {
  function init() {
    window.og_OpenBrowserWindow = OpenBrowserWindow;
    eval(
      `OpenBrowserWindow = ` +
        OpenBrowserWindow.toSource().replace(
          /\N*\s*if \(\!PrivateBrowsingUtils\.permanentPrivateBrowsing\) {\s*.*\s*defaultArgs \= \"about\:privatebrowsing\"\;\s*\}/gm,
          ``,
        ),
    );
  }
  if (gBrowserInit.delayedStartupFinished) init();
  else {
    let delayedListener = (subject, topic) => {
      if (topic == "browser-delayed-startup-finished" && subject == window) {
        Services.obs.removeObserver(delayedListener, topic);
        init();
      }
    };
    Services.obs.addObserver(
      delayedListener,
      "browser-delayed-startup-finished",
    );
  }
})();

```

## File: `JS/rebuild_userChrome.uc.js`

```javascript
// ==UserScript==
// @name            userChromeJS Manager
// @include         main
// @author          Thomas Leon Highbaugh
// @author          xiaoxiaoflood
// @description     This script provides a user interface for managing
//                  userChromeJS scripts in Firefox. It has been optimized for use with fx-autoconfig, which loads userChromeJS scripts as the browser starts. The manager allows enabling/disabling scripts, editing,uninstalling, and restarting the browser.
//
// @onlyonce
// ==/UserScript==

// This version is also documented with code comments that illuminate its functionality for ease of reading
UC.rebuild = {
  // Preference keys for UI options
  PREF_TOOLSBUTTON: "userChromeJS.showtoolbutton",
  PREF_OPENWITHSYSTEMDEFAULT: "userChromeJS.openWithSystemDefault",

  // Stores custom menu elements to be injected
  menues: [],

  /**
   * Handler for the userChromeJS options popup menu.
   * Dynamically populates the menu with script entries and toggles.
   */
  onpopup: function (event) {
    let document = event.target.ownerDocument;

    if (event.target != document.getElementById("userChromejs_options")) return;

    // Remove old script entries
    while (document.getElementById("uc-menuseparator").nextSibling) {
      document.getElementById("uc-menuseparator").nextSibling.remove();
    }

    let enabled = xPref.get(_uc.PREF_ENABLED);

    // Add global enable/disable menu item
    let mi = event.target.appendChild(
      this.elBuilder(document, "menuitem", {
        label: enabled ? "Enabled" : "Disabled (click to Enable)",
        oncommand: "xPref.set(_uc.PREF_ENABLED, " + !enabled + ");",
        type: "checkbox",
        checked: enabled,
      }),
    );

    // Add separator if there are multiple scripts
    if (Object.keys(_uc.scripts).length > 1)
      event.target.appendChild(this.elBuilder(document, "menuseparator"));

    // Add menu items for each user script
    Object.values(_uc.scripts)
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((script) => {
        if (script.filename === _uc.ALWAYSEXECUTE) {
          return;
        }

        mi = event.target.appendChild(
          this.elBuilder(document, "menuitem", {
            label: script.name ? script.name : script.filename,
            onclick: "UC.rebuild.clickScriptMenu(event)",
            onmouseup: "UC.rebuild.shouldPreventHide(event)",
            type: "checkbox",
            checked: script.isEnabled,
            class: "userChromejs_script",
            restartless: !!script.shutdown,
          }),
        );
        mi.filename = script.filename;
        let homepage =
          script.homepageURL ||
          script.downloadURL ||
          script.updateURL ||
          script.reviewURL;
        if (homepage) mi.setAttribute("homeURL", homepage);
        mi.setAttribute(
          "tooltiptext",
          `
        Left-Click: Enable/Disable
        Middle-Click: Enable/Disable and keep this menu open
        Right-Click: Edit
        Ctrl + Left-Click: Reload Script
        Ctrl + Middle-Click: Open Homepage
        Ctrl + Right-Click: Uninstall
      `.replace(/^\n| {2,}/g, "") +
            (script.description ? "\nDescription: " + script.description : "") +
            (homepage ? "\nHomepage: " + homepage : ""),
        );

        event.target.appendChild(mi);
      });

    // Update label for switching display mode
    document
      .getElementById("showToolsMenu")
      .setAttribute(
        "label",
        "Switch to " +
          (this.showToolButton
            ? "button in Navigation Bar"
            : "item in Tools Menu"),
      );
  },

  /**
   * Handler for the hamburger (app) menu popup.
   * Populates the panel with script toggles and actions.
   */
  onHamPopup: function (aEvent) {
    const enabledMenuItem = aEvent.target.querySelector(
      "#appMenu-userChromeJS-enabled",
    );
    enabledMenuItem.checked = xPref.get(_uc.PREF_ENABLED);

    // Remove old script entries
    const scriptsSeparator = aEvent.target.querySelector(
      "#appMenu-userChromeJS-scriptsSeparator",
    );
    while (scriptsSeparator.nextSibling) {
      scriptsSeparator.nextSibling.remove();
    }

    // Add menu items for each user script
    let scriptMenuItems = [];
    Object.values(_uc.scripts)
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((script) => {
        if (_uc.ALWAYSEXECUTE.includes(script.filename)) return;

        let scriptMenuItem = UC.rebuild.createMenuItem(
          scriptsSeparator.ownerDocument,
          null,
          null,
          script.name ? script.name : script.filename,
        );
        scriptMenuItem.setAttribute(
          "onclick",
          "UC.rebuild.clickScriptMenu(event)",
        );
        scriptMenuItem.type = "checkbox";
        scriptMenuItem.checked = script.isEnabled;
        scriptMenuItem.setAttribute("restartless", !!script.shutdown);
        scriptMenuItem.filename = script.filename;
        let homepage =
          script.homepageURL ||
          script.downloadURL ||
          script.updateURL ||
          script.reviewURL;
        if (homepage) scriptMenuItem.setAttribute("homeURL", homepage);
        scriptMenuItem.setAttribute(
          "tooltiptext",
          `
        Left-Click: Enable/Disable
        Middle-Click: Enable/Disable and keep this menu open
        Right-Click: Edit
        Ctrl + Left-Click: Reload Script
        Ctrl + Middle-Click: Open Homepage
        Ctrl + Right-Click: Uninstall
      `.replace(/^\n| {2,}/g, "") +
            (script.description ? "\nDescription: " + script.description : "") +
            (homepage ? "\nHomepage: " + homepage : ""),
        );
        scriptMenuItems.push(scriptMenuItem);
      });

    scriptsSeparator.parentElement.append(...scriptMenuItems);
  },

  /**
   * Handles clicks on script menu items.
   * Supports enabling/disabling, editing, uninstalling, and opening homepages.
   */
  clickScriptMenu: function (event) {
    const { target } = event;
    const { gBrowser } = event.view;
    const script = _uc.scripts[target.filename];
    switch (event.button) {
      case 0: // Left click: toggle enable/disable
        this.toggleScript(script);
        if (event.ctrlKey) this.toggleScript(script);
        break;
      case 1: // Middle click: toggle and keep menu open, or open homepage
        if (event.ctrlKey) {
          let url = target.getAttribute("homeURL");
          if (url) {
            gBrowser.addTab(url, {
              triggeringPrincipal:
                Services.scriptSecurityManager.createNullPrincipal({}),
            });
          }
        } else {
          this.toggleScript(script);
          if (target.tagName === "toolbarbutton")
            target.setAttribute("checked", script.isEnabled);
        }
        break;
      case 2: // Right click: edit or uninstall
        if (event.ctrlKey) this.uninstall(script);
        else this.launchEditor(script);
    }
  },

  /**
   * Prevents the menu from closing on middle click.
   */
  shouldPreventHide: function (event) {
    if (event.button == 1 && !event.ctrlKey) {
      const menuitem = event.target;
      menuitem.setAttribute("closemenu", "none");
      menuitem.parentNode.addEventListener(
        "popuphidden",
        () => {
          menuitem.removeAttribute("closemenu");
        },
        { once: true },
      );
    }
  },

  /**
   * Launches the script file in the user's preferred editor or system default.
   */
  launchEditor: function (script) {
    let editor = xPref.get("view_source.editor.path");
    let useSystemDefault = xPref.get(this.PREF_OPENWITHSYSTEMDEFAULT);
    if (!editor && !useSystemDefault) {
      let obj = { value: "C:\\WINDOWS\\system32\\notepad.exe" };
      if (
        Services.prompt.prompt(
          null,
          "userChromeJS",
          "Editor not defined. Paste the full path of your text editor or click cancel to use system default.",
          obj,
          null,
          { value: 0 },
        )
      ) {
        editor = obj.value;
        xPref.set("view_source.editor.path", editor);
      } else
        useSystemDefault = xPref.set(this.PREF_OPENWITHSYSTEMDEFAULT, true);
    }
    if (useSystemDefault) {
      script.file.launch();
    } else {
      let editorArgs = [];
      let args = Services.prefs.getCharPref("view_source.editor.args");
      if (args) {
        // Parse arguments, supporting quoted strings
        const argumentRE = /"([^"]+)"|(\S+)/g;
        let match;
        while ((match = argumentRE.exec(args))) {
          editorArgs.push(match[1] || match[2]);
        }
      }
      editorArgs.push(script.file.path);
      try {
        let appfile = Cc["@mozilla.org/file/local;1"].createInstance(
          Ci.nsIFile,
        );
        appfile.initWithPath(editor);
        let process = Cc["@mozilla.org/process/util;1"].createInstance(
          Ci.nsIProcess,
        );
        process.init(appfile);
        process.run(false, editorArgs, editorArgs.length, {});
      } catch {
        alert(
          "Can't open the editor. Go to about:config and set editor's path in view_source.editor.path.",
        );
      }
    }
  },

  /**
   * Restarts Firefox, invalidating caches.
   */
  restart: function () {
    Services.appinfo.invalidateCachesOnRestart();

    let cancelQuit = Cc["@mozilla.org/supports-PRBool;1"].createInstance(
      Ci.nsISupportsPRBool,
    );
    Services.obs.notifyObservers(
      cancelQuit,
      "quit-application-requested",
      "restart",
    );

    if (cancelQuit.data) return;

    if (Services.appinfo.inSafeMode)
      Services.startup.restartInSafeMode(Ci.nsIAppStartup.eAttemptQuit);
    else
      Services.startup.quit(
        Ci.nsIAppStartup.eAttemptQuit | Ci.nsIAppStartup.eRestart,
      );
  },

  /**
   * Enables or disables a script and loads/unloads it as needed.
   */
  toggleScript: function (script) {
    if (script.isEnabled) {
      xPref.set(
        _uc.PREF_SCRIPTSDISABLED,
        script.filename + "," + xPref.get(_uc.PREF_SCRIPTSDISABLED),
      );
    } else {
      xPref.set(
        _uc.PREF_SCRIPTSDISABLED,
        xPref
          .get(_uc.PREF_SCRIPTSDISABLED)
          .replace(
            new RegExp("^" + script.filename + ",|," + script.filename),
            "",
          ),
      );
    }

    if (
      xPref.get(_uc.PREF_ENABLED) &&
      script.isEnabled &&
      !_uc.everLoaded.includes(script.id)
    ) {
      this.install(script);
    } else if (script.isRunning && !!script.shutdown) {
      this.shutdown(script);
    }
  },

  /**
   * Switches between toolbar button and tools menu item for the manager UI.
   */
  toggleUI: function (byaboutconfig = false, startup = false) {
    this.showToolButton = xPref.get(this.PREF_TOOLSBUTTON);
    if (!byaboutconfig && !startup) {
      this.showToolButton = xPref.set(
        this.PREF_TOOLSBUTTON,
        !this.showToolButton,
      );
    }

    _uc.windows((doc) => {
      doc.getElementById("userChromebtnMenu").hidden = this.showToolButton;
      doc.getElementById("userChromejs_Tools_Menu").hidden =
        !this.showToolButton;
      if (this.showToolButton) {
        doc
          .getElementById("userChromejs_Tools_Menu")
          .appendChild(doc.getElementById("userChromejs_options"));
      } else if (!startup) {
        doc
          .getElementById("userChromebtnMenu")
          .appendChild(doc.getElementById("userChromejs_options"));
      }
    });
  },

  /**
   * Creates a toolbarbutton menu item for the hamburger menu.
   */
  createMenuItem: function (doc, id, icon, label, command) {
    const menuItem = doc.createXULElement("toolbarbutton");
    menuItem.className = "subviewbutton subviewbutton-iconic";
    if (id) menuItem.id = "appMenu-userChromeJS-" + id;
    menuItem.label = label;
    menuItem.style.listStyleImage = icon;
    if (command) menuItem.setAttribute("oncommand", command);
    return menuItem;
  },

  /**
   * Loads a script into all open windows where it matches.
   */
  install: function (script) {
    script = _uc.getScriptData(script.file);
    Services.obs.notifyObservers(null, "startupcache-invalidate");
    _uc.windows((doc, win, loc) => {
      if (win._uc && script.regex.test(loc.href)) {
        _uc.loadScript(script, win);
      }
    }, false);
  },

  /**
   * Uninstalls a script, removing its file and disabling it.
   */
  uninstall: function (script) {
    if (
      !Services.prompt.confirm(
        null,
        "userChromeJS",
        "Do you want to uninstall this script? The file will be deleted.",
      )
    )
      return;

    this.shutdown(script);
    script.file.remove(false);
    xPref.set(
      _uc.PREF_SCRIPTSDISABLED,
      xPref
        .get(_uc.PREF_SCRIPTSDISABLED)
        .replace(
          new RegExp("^" + script.filename + ",|," + script.filename),
          "",
        ),
    );
  },

  /**
   * Calls the shutdown handler for a script, if present.
   */
  shutdown: function (script) {
    if (script.shutdown) {
      _uc.windows((doc, win, loc) => {
        if (script.regex.test(loc.href)) {
          try {
            eval(script.shutdown);
          } catch (ex) {
            Cu.reportError(ex);
          }
          if (script.onlyonce) return true;
        }
      }, false);
      script.isRunning = false;
    }
  },

  /**
   * Utility for creating XUL elements with properties.
   */
  elBuilder: function (doc, tag, props) {
    let el = doc.createXULElement(tag);
    for (let p in props) {
      el.setAttribute(p, props[p]);
    }
    return el;
  },

  /**
   * Injects custom CSS for the manager UI.
   */
  setStyle: function () {
    _uc.sss.loadAndRegisterSheet(
      Services.io.newURI(
        "data:text/css;charset=UTF-8," +
          encodeURIComponent(`
      @-moz-document url('${_uc.BROWSERCHROME}') {
        #userChromejs_options menuitem[restartless="true"] {
          color: blue;
        }
        #userChromejs_restartApp {
          padding-right: 4px;
        }
        #userChromejs_restartApp > .menu-iconic-left {
          margin-inline-end: 0 !important;
          padding-inline-end: 0 !important;
        }

        #userChromejs_openChromeFolder {
          padding-inline-start: 12px;
        }

        #userChromejs_restartApp > .menu-accel-container {
          display: none;
        }

        /* bug 1828413: checkbox is only rendering on mouseover/mouseout */
        menuitem[type="checkbox"][checked="true"] .menu-iconic-icon {
          appearance: checkbox !important;
        }

        @media (-moz-platform: windows) {
          #userChromejs_openChromeFolder {
            padding-block: 0.5em;
          }
          #userChromejs_restartApp {
            padding: 0 8px !important;
          }
          #userChromejs_restartApp > .menu-iconic-left {
            padding-top: 0;
          }
        }

        @media (-moz-platform: linux) {
          #userChromejs_restartApp {
            padding-right: 4px !important;
          }
        }
      }
    `),
      ),
      _uc.sss.USER_SHEET,
    );
  },

  /**
   * Initializes the manager UI and listeners.
   * Should be called once at startup by fx-autoconfig.
   */
  init: function () {
    this.setStyle();
    this.showToolButton = xPref.get(this.PREF_TOOLSBUTTON);
    if (this.showToolButton === undefined) {
      this.showToolButton = xPref.set(this.PREF_TOOLSBUTTON, false, true);
    }

    // Listen for UI toggle preference changes
    xPref.addListener(this.PREF_TOOLSBUTTON, function () {
      UC.rebuild.toggleUI(true);
    });

    // Listen for global enable/disable changes
    xPref.addListener(_uc.PREF_ENABLED, function (value) {
      Object.values(_uc.scripts).forEach((script) => {
        if (script.filename == _uc.ALWAYSEXECUTE) return;
        if (value && script.isEnabled && !_uc.everLoaded.includes(script.id)) {
          UC.rebuild.install(script);
        } else if (!value && script.isRunning && !!script.shutdown) {
          UC.rebuild.shutdown(script);
        }
      });
    });

    // Add toolbar button or menu item depending on platform
    if (AppConstants.MOZ_APP_NAME !== "thunderbird") {
      const { CustomizableUI } = window;
      CustomizableUI.createWidget({
        id: "userChromebtnMenu",
        type: "custom",
        defaultArea: CustomizableUI.AREA_NAVBAR,
        onBuild: (doc) => {
          this.createPanel(doc);
          return this.createButton(doc);
        },
      });
    } else {
      this.createPanel(window.document);
    }
  },

  /**
   * Creates the toolbar button and menu for the manager.
   */
  createButton(aDocument) {
    let toolbaritem = UC.rebuild.elBuilder(aDocument, "toolbarbutton", {
      id: "userChromebtnMenu",
      label: "userChromeJS",
      tooltiptext: "userChromeJS Manager",
      type: "menu",
      class: "toolbarbutton-1 chromeclass-toolbar-additional",
      style:
        "list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABeSURBVDhPY6AKSCms+x+SkPMfREOFwACXOAYYNQBVITrGJQ7CUO0IA0jFUO0QA3BhkEJs4iAM1Y4bgBTBDIAKkQYGlwHYMFQZbgBSBDIAF4Yqww3QbUTHUGWUAAYGAEyi7ERKirMnAAAAAElFTkSuQmCC)",
    });

    let mp = UC.rebuild.elBuilder(aDocument, "menupopup", {
      id: "userChromejs_options",
      onpopupshowing: "UC.rebuild.onpopup(event);",
      oncontextmenu: "event.preventDefault();",
    });
    toolbaritem.appendChild(mp);

    let mg = mp.appendChild(aDocument.createXULElement("menugroup"));
    mg.setAttribute("id", "uc-menugroup");

    // Open chrome directory menu item
    let mi1 = UC.rebuild.elBuilder(aDocument, "menuitem", {
      id: "userChromejs_openChromeFolder",
      label: "Open chrome directory",
      class: "menuitem-iconic",
      flex: "1",
      style:
        "list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABe0lEQVQ4jc3N2ytDARwH8J83/wRKefU3zFBCSnlQSnkQpSiFFLk8OMQmxLBZLos2I7ckM3PmMmEredF23Ma2GrPjkuFsvh7mstTqnDff+jx+v1+ifxEZ43zPYFyIld3FHWYxzlRRA5mdXFi3c4vpvbuo3TvU6z2CnHEKf4djRd9bLYnyDldkYtuPqZ1b0TIYF2StlkTK6eaQ080ht+eLgkPeH/nflGc/8hRRVNB7BuVaAGPWILRsDCsfl4bl0bMaQGHfOaho4AL9pns0GPyo04vTYPCjz3SP4sELUInqEkObPNoXA5IMmoMoHbkClWncUG8/QLnOS6K2PqJc6wZVjl9jyvYMtfVJEp3tGVWTN6Bq3Q2M9hBmDl4kMTpCqJ32gOr1XmHp+BUrJ2+SLB2/onHWK1DLvG95lOU/Nk4FbLnCcbHcL/OpgFGWj7Qt+AxUo7an12qOHM1Gb6R5zgcxmozecLVq31YxvJ9GRJRARElElExEKSIlf3USPgHT/mSv7iPTOwAAAABJRU5ErkJggg==)",
      oncommand: "Services.dirsvc.get('UChrm', Ci.nsIFile).launch();",
    });
    mg.appendChild(mi1);

    // Restart browser menu item
    let tb = UC.rebuild.elBuilder(aDocument, "menuitem", {
      id: "userChromejs_restartApp",
      class: "menuitem-iconic",
      tooltiptext: "Restart " + _uc.BROWSERNAME,
      style:
        "list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB20lEQVQ4jY2Tv2sUURDHZ/bX7eW0ChJBRFKIRRCRIEHuzVvfrYmkSiFXSSoLERERy5B/wcIuqG9mN5VecUWwCqkOEQsLKysLsQgSxEJEgsVYeJfsHXuY4tvN9zMzzHxBVXFS8Gy1kRaZi8U+iCV7HIq73Xqez9XWThoDsRvg6QDY6Ji8+RMK9dLSztcCoMhnkc27YxPth0I7oVAPhT5WYD9ScfkYALYWYxQa/OvU/h5ztg5bi3G1U2vbXUFPb4fT/EzELRwBYraPRvSE7eW6XVUV4en1JjLtARtFoYGqInRfd0Nk8wXYaCzZ/WnmkZrengc2v4GNNr1bglPiFoaj/5orV1r/A6gqhkI9YKMB0yY0OF9GsV/jIts9iVlVMeJscwhgOKmpqoDpGNDg5YuB0HYg9lUotINCuxFn/bN+9czUFZj6wEYDsRsQle7W+NPQ/uhEdUpLOw/cPgQ2OlPcvAoJZ90qICnc2tQzlist9GYAbDRk2lNVhFDs3YmXPUjkxp3JR2qWbgk9fRj9S+Olu6SqCJHYJ+DN5xnOryHT+wrsG7J9g0x9ZPup2iAS1z6aKi076+mLzoVRmKJpYeL2YSC2aBadc1PTOB7n3AXe3guYHiberZ0u8tm62r99Gyd0lo7sIAAAAABJRU5ErkJggg==)",
      oncommand: "UC.rebuild.restart();",
    });
    mg.appendChild(tb);

    // Settings menu
    let mn = UC.rebuild.elBuilder(aDocument, "menu", {
      id: "uc-manageMenu",
      label: "Settings",
      class: "menuitem-iconic",
      style:
        "list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADJUlEQVQ4ja1TS0wTQRgean0/ovFgTDxpjDc9Gg8mvSrnKhFSC8VpCuyyu22Xbdm2s7Rdt48t7kIhEJEIYiKKphZK0CoRLVYlHiAEFYMng4+bF6nUjgfbuiocTPwuM5P83/d/8z8AWAMIIX3xWvHHCYxG44a1OOuCIIhd2rfZbN7yTwIURe0+D8lAbSO3aLI21xgMBn2dzXbQZLM/MNkcEwRNnyw6rFhTAEK4ESGkc/L8IacgY1Hpw1xbbLWBFT5QrRe/+GM92Bfpxg4Xkotf3LSuGAAA1DcypC/cnWuL9a5yQQXzUifmApewR4pjUenLESzKQAi3rUmmaXqrpYF0WBqYDrtXynnDceyR1JW7E5Opqcwz9Ul2pr+zb+gdF2jHnlAnvkC6piw2WmikHCeKEj+dmWDTuSZXEPsiXdgb6Sr4o/HlV4uLZ5LJZDnz0tLSkeE7YyMt/nbcFuvBrqCCqyGdhhBuLAtF2jvE1osd+UCsZ8Xhi3yfnMqYNYZ1pcB0Or1X6bm64BLVvCcczwflrrcsy+4sBVaMjo7u6R248ZDiJaz0Ds4PDAxs1woAAIDBYNADAMBIIsU6BRm7RWUlm31x+rduAQCAEFICDkEu+MTYuMZJGUajcQNCQBeU2ivZNrng8ssfNYNb7FQ9caCusSUrRLsLFtL9ppogdhUnuCxWSniursHnFtWCwyvlqmttNUA7U1bSeYnxSNgXin91CtFCdT1hLwkghPSltYAQ7rcy/LI3HM+7RaUAKfdnjuP2lB0NjyQq3X45R7eK2ImiuIkV8mdNVsZspnaXYqpq4XGzjXneIsjY7g1hkvPjvsHhm9o6AlVVN2ezL6oyz2fsATn+yemLYModxDWQfm2luAmTjXlsaXbnWvwxTPNS4XZy/Nrj6em6ZDJ57Lc50mJyKlNDugLfPJKaY4UovsB4MeEKYE+oI0/z4mr3laFUKpXa/BfxV3uRHgCg43n/YZITvtfTPEYh9f1Y+tGDy4M3X1oZTx4yXsyjYFhT/PV3DSG0Y3Z+oen6rcT92fn5Uwgh3dzc3L7xe5P9T57OXE4kEkfXJf8P/ABlOH7kn81/zwAAAABJRU5ErkJggg==)",
    });
    mp.appendChild(mn);

    let mp2 = mn.appendChild(aDocument.createXULElement("menupopup"));

    // Switch display mode menu item
    let mi2 = UC.rebuild.elBuilder(aDocument, "menuitem", {
      id: "showToolsMenu",
      label: "Switch display mode",
      class: "menuitem-iconic",
      style:
        "list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADdklEQVQ4jXWTbUwUdADG/7zccZ6lQ/pgcDJEEEGBO8/hmLQY9mKOmFvyEi93IIISSSMGxx0Hw0QKJJCOI3CxGM0IhEASjDsQ1lgdRuqcE4N0RznTjPFSDGJwvz64nOX6bc+35+XTI8R/KRXOG6LFwcAEj+7d2b4PI3L8ltQZiuuKaGmp5yER8JT/Sco/0e+JylP1xNfuXTrWEU/+BQ26Pi3vnk8ioyWG10pU9lj9S4VjY2Pyp4cbcxP36PyW83tTKBnMwDhwiCJrGkXWVIzWNIoH0ikezCTxTBRROcG9k5O2dY/Dp5qKwyN0W5aMgxkYLKkYrakYB7XorAnorPEUWOLJ749D159E6dBRIj7cRIhW8fmj5dJI16jc4L78vhQK+zUYrCkUDrxJtS0P6+12hu3dDNu7sNw+R8vVahK+2E1onQyvHOE4YIyIFOv3i7gEU+RyoUVD2dBbXL9v46tbLRiHkum8cYbv7SNcsdsA6L/RTVCVMzvNMkJq5GyMF50iMNnDktV2gNPfGrj3xxT/MDL1NcXDSRgGEzh+6TArLNM+2sy2SkFYgxxVnZwtWdK7Iizbe67hu3Lml2bAAQ6H43HJ+IOrvDeiRdunYmFllnOXWwioEuxqlKGskxGgk/4lIt7xX6keLsJ06QSnLAbG719jaXmJin4d+t5UDraGENOhYGFlnq4fWlHXyon6dCORTV5s1UkdQpn+/ERa66tkdu0jpTOcb36+yIO5GcJN7rzS5kHPZAe/LPzK7Moq9/6cY2LWzs2Htzjc+gbe2U4zwnO/c2XQcRlq81p2mASt45/x4+/TKKsk7GoW7DuroGein99WYRqYnJsn5eM4fIwueGucrojgrPW+vkekUyEmN7bXCppvtnFnEYoHijhxWU/yhRcIa1xLzWg9vT9d48X31XiXCALL3AjUuhcIIYSI0ccU+BgEwSZX3u49Qr2tjXrblzSMnueD4QZebtqGss4FZYUH/icFoSY5Co3T3cT6LHchhBCx5thnFAnSi0FlMnbUSgg46UxguQtBFS4EV7qhrn0WtXkNyjo3Qj+Ss/moZHF7uvvr//qC37EN6xSxLmf98iSOkBoZKvMadtY/ksosR2mSE1Qmw0cjsXunuUT/7yO9tK57vZMl7ZuzpHf8C6SLW/XSVf9cybRPquvopmRng2emeO5J/98W5fyDGAVpggAAAABJRU5ErkJggg==)",
      oncommand: "UC.rebuild.toggleUI();",
    });
    mp2.appendChild(mi2);

    // Separator for script entries
    let sep = mp.appendChild(aDocument.createXULElement("menuseparator"));
    sep.setAttribute("id", "uc-menuseparator");

    // Tools menu entry for the manager
    let mi = UC.rebuild.elBuilder(aDocument, "menu", {
      id: "userChromejs_Tools_Menu",
      label: "userChromeJS Manager",
      tooltiptext: "UC Script Manager",
      class: "menu-iconic",
      image:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABeSURBVDhPY6AKSCms+x+SkPMfREOFwACXOAYYNQBVITrGJQ7CUO0IA0jFUO0QA3BhkEJs4iAM1Y4bgBTBDIAKkQYGlwHYMFQZbgBSBDIAF4Yqww3QbUTHUGWUAAYGAEyi7ERKirMnAAAAAElFTkSuQmCC",
    });
    aDocument
      .getElementById(
        AppConstants.MOZ_APP_NAME !== "thunderbird"
          ? "devToolsSeparator"
          : "prefSep",
      )
      .insertAdjacentElement("afterend", mi); //taskPopup

    // Insert custom menus if any
    let menupopup = aDocument.getElementById("userChromejs_options");
    UC.rebuild.menues.forEach((menu) => {
      menupopup.insertBefore(
        menu,
        aDocument.getElementById("uc-menuseparator"),
      );
    });

    // Ensure UI state is correct after startup
    aDocument.defaultView.setTimeout(
      () => UC.rebuild.toggleUI(false, true),
      1000,
    );

    return toolbaritem;
  },

  /**
   * Creates the hamburger menu panel for the manager.
   */
  createPanel(aDocument) {
    const viewCache =
      aDocument.getElementById("appMenu-viewCache")?.content ||
      aDocument.getElementById("appMenu-multiView");

    if (viewCache) {
      const userChromeJsPanel = aDocument.createXULElement("panelview");
      userChromeJsPanel.id = "appMenu-userChromeJsView";
      userChromeJsPanel.className = "PanelUI-subView";
      userChromeJsPanel.addEventListener("ViewShowing", UC.rebuild.onHamPopup);
      const subviewBody = aDocument.createXULElement("vbox");
      subviewBody.className = "panel-subview-body";
      subviewBody.appendChild(
        UC.rebuild.createMenuItem(
          aDocument,
          "openChrome",
          "url(chrome://browser/skin/folder.svg)",
          "Open chrome directory",
          "Services.dirsvc.get('UChrm', Ci.nsIFile).launch();",
        ),
      );
      subviewBody.appendChild(
        UC.rebuild.createMenuItem(
          aDocument,
          "restart",
          "url(chrome://browser/skin/reload.svg)",
          "Restart " + _uc.BROWSERNAME,
          "UC.rebuild.restart();",
        ),
      );
      subviewBody.appendChild(aDocument.createXULElement("toolbarseparator"));
      const enabledMenuItem = UC.rebuild.createMenuItem(
        aDocument,
        "enabled",
        null,
        "Enabled",
        "xPref.set(_uc.PREF_ENABLED, !!this.checked)",
      );
      enabledMenuItem.type = "checkbox";
      subviewBody.appendChild(enabledMenuItem);
      const scriptsSeparator = aDocument.createXULElement("toolbarseparator");
      scriptsSeparator.id = "appMenu-userChromeJS-scriptsSeparator";
      subviewBody.appendChild(scriptsSeparator);
      userChromeJsPanel.appendChild(subviewBody);
      viewCache.appendChild(userChromeJsPanel);

      // Add entry to open the panel from the hamburger menu
      const scriptsButton = aDocument.createXULElement("toolbarbutton");
      scriptsButton.id = "appMenu-userChromeJS-button";
      scriptsButton.className =
        "subviewbutton subviewbutton-iconic subviewbutton-nav";
      scriptsButton.label = "User Scripts";
      scriptsButton.style.listStyleImage =
        "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABeSURBVDhPY6AKSCms+x+SkPMfREOFwACXOAYYNQBVITrGJQ7CUO0IA0jFUO0QA3BhkEJs4iAM1Y4bgBTBDIAKkQYGlwHYMFQZbgBSBDIAF4Yqww3QbUTHUGWUAAYGAEyi7ERKirMnAAAAAElFTkSuQmCC)";
      scriptsButton.setAttribute("closemenu", "none");
      scriptsButton.setAttribute(
        "oncommand",
        "PanelUI.showSubView('appMenu-userChromeJsView', this)",
      );

      const addonsButton =
        aDocument.getElementById("appMenu-extensions-themes-button") ??
        aDocument.getElementById("appmenu_addons") ??
        viewCache.querySelector("#appMenu-extensions-themes-button");
      addonsButton.parentElement.insertBefore(scriptsButton, addonsButton);
    }
  },
};

// Initialize the manager at startup (called by fx-autoconfig)
UC.rebuild.init();

```

## File: `JS/restart_button.uc.js`

```javascript
// Restart button script for Firefox 60+ by Aris
//
// left-click on restart button: normal restart
// middle-click on restart button: restart + clear caches
// right-click on restart button: no special function
//
// based on 'Quit' button code by 2002Andreas
// restart code from Classic Theme Restorer add-on
// invalidate caches from Session Saver add-on

(function() {

try {
  ChromeUtils.importESModule("resource:///modules/CustomizableUI.sys.mjs");
  var sss = Components.classes["@mozilla.org/content/style-sheet-service;1"].getService(Components.interfaces.nsIStyleSheetService);
  var appversion = parseInt(Services.appinfo.version);
  
  var button_label = "Restart";
 
  CustomizableUI.createWidget({
	id: "uc-restart", // button id
	defaultArea: CustomizableUI.AREA_NAVBAR,
	removable: true,
	label: button_label, // button title
	tooltiptext: button_label, // tooltip title
	onClick: function(event) {
	  
	  var cancelQuit   = Components.classes["@mozilla.org/supports-PRBool;1"].createInstance(Components.interfaces.nsISupportsPRBool);
	  var observerSvc  = Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);
			
	  if(event.button=='1') { // middle-click - clear caches
		Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULRuntime).invalidateCachesOnRestart();
	  }
	  
	  if(event.button=='0' || event.button=='1') { // left/middle-click - restart
		observerSvc.notifyObservers(cancelQuit, "quit-application-requested", "restart");
			
		if(cancelQuit.data) return false;
				
		Services.startup.quit(Services.startup.eRestart | Services.startup.eAttemptQuit);
	  }
	},
	onCreated: function(button) {
	  return button;
	}
		
  });
  
  var icon = "chrome://global/skin/icons/reload.svg";
  
  if(appversion < 92) icon = "chrome://browser/skin/reload.svg";
  
  // style button icon
  var uri = Services.io.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
	\
	  #uc-restart .toolbarbutton-icon {\
		list-style-image: url("'+icon+'"); /* icon / path to icon */ \
		transform: scaleX(-1); /* icon mirroring */\
		fill: red; /* icon color name/code */\
	  }\
	\
  '), null, null);
  
  sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);
  
} catch (e) {
	Components.utils.reportError(e);
};

})();
```

## File: `JS/restart_item_in_menu.uc.js`

```javascript
/* Restart item script for Firefox 13X+ by Aris

  - left-click on restart item: normal restart
  - middle-click on restart item: restart + clear caches
  - right-click on restart item: no special function
  
  - option: display restart icon in menubars 'File' menu
  - option: display restart icon in main menus popup

  - based on 'addRestartButton.uc.js' script by Alice0775
  - restart code from Classic Theme Restorer add-on
  - invalidate caches from Session Saver add-on
*/

var menuicon = false;
var appmenuicon = false;

var RestartMenuFileAppItems = {
  init: function() {

	var button_label = "Restart";
	
	try {
	  restartitem_filemenu = document.createXULElement("menuitem");
	  if(menuicon) restartitem_filemenu.setAttribute("class","menuitem-iconic");
	  restartitem_filemenu.setAttribute("label", button_label);
	  restartitem_filemenu.setAttribute("id","fileMenu-restart-item");
	  restartitem_filemenu.setAttribute("accesskey", "R");
	  restartitem_filemenu.setAttribute("acceltext", "R");
	  restartitem_filemenu.setAttribute("insertbefore", "menu_FileQuitItem");
	  //restartitem_filemenu.setAttribute("onclick", "if (event.button == 0) {RestartMenuFileAppItems.restartApp(false);} else if (event.button == 1) {RestartMenuFileAppItems.restartApp(true)};");
	  restartitem_filemenu.addEventListener("click", () => {if (event.button == 0) {RestartMenuFileAppItems.restartApp(false);} else if (event.button == 1) {RestartMenuFileAppItems.restartApp(true)};} );
	  //restartitem_filemenu.setAttribute("oncommand", "RestartMenuFileAppItems.restartApp(false);");
	  restartitem_filemenu.addEventListener("command", () => {RestartMenuFileAppItems.restartApp(false);} );

	  if(document.getElementById("menu_FileQuitItem").previousSibling.id != "fileMenu-restart-item" )
		document.getElementById("menu_FileQuitItem").parentNode.insertBefore(restartitem_filemenu,document.getElementById("menu_FileQuitItem"));
	} catch(e) {}

	try {
	  restartitem_appmenu = document.createXULElement("toolbarbutton");
	  restartitem_appmenu.setAttribute("label", button_label);
	  restartitem_appmenu.setAttribute("id","appMenu-restart-button");
	  if(appmenuicon) restartitem_appmenu.setAttribute("class","subviewbutton subviewbutton-iconic");
	    else restartitem_appmenu.setAttribute("class","subviewbutton");
	  restartitem_appmenu.setAttribute("accesskey", "R");
	  restartitem_appmenu.setAttribute("shortcut", "Alt+R");
	  restartitem_appmenu.setAttribute("insertbefore", "appMenu-quit-button2");
	  //restartitem_appmenu.setAttribute("onclick", "if (event.button == 0) {RestartMenuFileAppItems.restartApp(false);} else if (event.button == 1) {RestartMenuFileAppItems.restartApp(true)};");
	  restartitem_appmenu.addEventListener("click", () => {if (event.button == 0) {RestartMenuFileAppItems.restartApp(false);} else if (event.button == 1) {RestartMenuFileAppItems.restartApp(true)};} );
	  //restartitem_appmenu.setAttribute("oncommand", "RestartMenuFileAppItems.restartApp(false);");  
	  restartitem_appmenu.addEventListener("command", () => {RestartMenuFileAppItems.restartApp(false);} );
	  
	  var AMObserver = new MutationObserver(function(mutations) {
	    mutations.forEach(function(mutation) {
			if(document.querySelector("#appMenu-restart-button") == null ) document.querySelector("#appMenu-quit-button2").parentNode.insertBefore(restartitem_appmenu,document.getElementById("appMenu-quit-button2"));
	    });    
	  });

	AMObserver.observe(document.querySelector("#PanelUI-menu-button"), { attributes: true, attributeFilter: ['open'] });

	  
	} catch(e) {}

	var sss = Components.classes["@mozilla.org/content/style-sheet-service;1"].getService(Components.interfaces.nsIStyleSheetService);
	
	var icon = "chrome://global/skin/icons/reload.svg";
  
	var menu_item_code = "";
	
	if(menuicon)
	 menu_item_code =`
	  #fileMenu-restart-item {
	  	 list-style-image: url("${icon}") !important; /* File Menu Entry */
	  }
	  #fileMenu-restart-item > .menu-icon { /* Style the menuItem */
		 margin-inline-start: 2px;
		 margin-top: 2px;
		-moz-context-properties: fill;
		 transform: scaleX(-1);
		 fill: red;
	  }
	 `;
	  
	var appmenu_item_code = "";
	  
	if(appmenuicon)
	 appmenu_item_code = `
	  #appMenu-restart-button {
		list-style-image: url("${icon}"); /* Button in appMenu */
	  }
	  #appMenu-restart-button > .toolbarbutton-icon { /* Style the Button */
		transform: scaleX(-1); /* Icon mirroring */
		color: red; /* Icon color name */
	  }
	  #main-window:-moz-lwtheme:-moz-lwtheme-brighttext #appMenu-restart-button .toolbarbutton-icon {
		color: unset; /* do not color the icon in dark mode */
	  }
	 `;

	// Style the icons (button/menu)
	var uri = Services.io.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
	  '+menu_item_code+'\
	  '+appmenu_item_code+'\
	  \
	'), null, null);

	sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);
	
  },

  restartApp: function(clearcaches) {

	var cancelQuit = Components.classes["@mozilla.org/supports-PRBool;1"].createInstance(Components.interfaces.nsISupportsPRBool);
	var observerSvc = Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);

	if(clearcaches) {
	  Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULRuntime).invalidateCachesOnRestart();
	}

	observerSvc.notifyObservers(cancelQuit, "quit-application-requested", "restart");

	if(cancelQuit.data) return false;

	Services.startup.quit(Services.startup.eRestart | Services.startup.eAttemptQuit);

  }

}

RestartMenuFileAppItems.init();

```

## File: `JS/second_sidebar.uc.mjs`

```mjs
// ==UserScript==
// @name            Second Sidebar for Firefox
// @description     A Firefox userChrome.js script for adding a second sidebar with web panels like in Vivaldi/Floorp/Zen.
// @author          aminought
// @homepageURL     https://github.com/aminought/firefox-second-sidebar
// ==/UserScript==

import { ContextualIdentityServiceWrapper } from "./second_sidebar/wrappers/contextual_identity_service.mjs";
import { CustomizeModePatcher } from "./second_sidebar/customize_mode_patcher.mjs";
import { SidebarDecorator } from "./second_sidebar/sidebar_decorator.mjs";
import { SidebarInjector } from "./second_sidebar/sidebar_injector.mjs";

const run = () => {
  ContextualIdentityServiceWrapper.ensureDataReady();
  if (SidebarInjector.inject()) {
    SidebarDecorator.decorate();
    CustomizeModePatcher.patch();
  }
};

if (typeof UC_API !== "undefined") {
  UC_API.Runtime.startupFinished().then(run);
} else {
  delayedStartupPromise.then(run);
}

```

## File: `JS/sidebarWidth.uc.js`

```javascript
// ==UserScript==
// @name           Firefox Sidebar Width 
// @version        1.0
// @author         aminought
// @homepage       https://github.com/aminought/firefox-sidebar-width/tree/master
// @description    This script allows the user to save the width of their 
//sidebars. Each panel now has its own width, which changes when switching. 
// ==/UserScript==
    (function sidebar_width() {
  "use strict";

  // Interval timeout in milliseconds for checking DOM readiness
  const TIMEOUT = 1000;
  // Preference key for storing sidebar widths
  const PREF = "sidebar.widths";

  /**
   * SidebarWidth manages the persistence and restoration of sidebar widths
   * for different sidebar panels in the browser UI.
   */
  class SidebarWidth {
    constructor() {
      // Load or initialize sidebar widths for each sidebar command
      this.sidebarWidths = this.initWidth();
      // Set up event listeners for sidebar resize and show events
      this.addEventListeners();
    }

    /**
     * Initializes the sidebar widths from preferences or defaults.
     * @returns {Object} Mapping of sidebarcommand to width
     */
    initWidth() {
      try {
        // Attempt to load saved widths from preferences
        return JSON.parse(Services.prefs.getStringPref(PREF));
      } catch (error) {
        // If not found, initialize widths for all sidebars to current width
        const sidebars = Array.from(SidebarController.sidebars.keys());
        return Object.fromEntries(
          sidebars.map((sidebar) => [sidebar, this.width])
        );
      }
    }

    /**
     * Adds event listeners for sidebar resize and show events.
     */
    addEventListeners() {
      // Save width when sidebar is resized
      SidebarController._box.addEventListener("resize", () => this.saveWidth());
      // Restore width when a sidebar is shown
      addEventListener("SidebarShown", () => this.restoreWidth());
    }

    /**
     * Saves the current width of the active sidebar to preferences.
     */
    saveWidth() {
      // Only save if the width has changed
      if (
        this.command in this.sidebarWidths &&
        this.sidebarWidths[this.command] === this.width
      )
        return;
      this.sidebarWidths[this.command] = this.width;
      Services.prefs.setStringPref(PREF, JSON.stringify(this.sidebarWidths));
    }

    /**
     * Restores the width of the active sidebar from preferences.
     */
    restoreWidth() {
      SidebarController._box.style.width = this.sidebarWidths[this.command];
    }

    /**
     * Gets the current width of the sidebar.
     */
    get width() {
      return SidebarController._box.style.width;
    }

    /**
     * Gets the current sidebarcommand attribute.
     */
    get command() {
      return SidebarController._box.getAttribute("sidebarcommand");
    }
  }

  // Wait for the browser DOM to be ready before initializing SidebarWidth
  var interval = setInterval(() => {
    if (document.querySelector("#browser")) {
      window.sidebarWidth = new SidebarWidth();
      clearInterval(interval);
    }
  }, TIMEOUT);
})();


```

## File: `JS/space_and_separator_restorer.uc.js`

```javascript
/* Restore 'Space & Separator' items script for Firefox 102+ by Aris

  Default browser scripts always remove spaces and separators from default palette, so
  because of that they are added to an own toolbar now.

   - spaces and separators can be moved to any toolbar
   - to remove spaces or separators move them into palette
   - configuration toolbar behaves like a default toolbar, items and buttons can be placed on it
   - configuration toolbar is not visible outside customizing mode
   - default "Flexible Space" item is hidden from palette and added to configuration toolbar
   [!] BUG: do not move spaces, flexible spaces or separator to configuration toolbar or it will cause glitches
   [!] BUG: do not move main 'space'-item to palette or it will be hidden until customizing mode gets reopened

   [!] Fix for WebExtensions with own windows by 黒仪大螃蟹 (for 1-N scripts)
*/

ChromeUtils.importESModule("resource:///modules/CustomizableUI.sys.mjs");
var appversion = parseInt(Services.appinfo.version);

var AddSeparator = {
  init: function() {

	if (location != 'chrome://browser/content/browser.xhtml')
      return;

	/* blank tab workaround */
	try {
	  if(gBrowser.selectedBrowser.getAttribute('blank')) gBrowser.selectedBrowser.removeAttribute('blank');
	} catch(e) {}
	  
	var tb_config_label = "Configuration Toolbar";
	var tb_spacer_label = "Space";
	var tb_sep_label = "Separator";
	var tb_spring_label = "Flexible Space";
	  
	try {
	 if(document.getElementById('configuration_toolbar') == null) {
		
	  var tb_config = document.createXULElement("toolbar");
	  tb_config.setAttribute("id","configuration_toolbar");
	  tb_config.setAttribute("customizable","true");
	  tb_config.setAttribute("class","toolbar-primary chromeclass-toolbar browser-toolbar customization-target");
	  tb_config.setAttribute("mode","icons");
	  tb_config.setAttribute("iconsize","small");
	  tb_config.setAttribute("toolboxid","navigator-toolbox");
	  tb_config.setAttribute("lockiconsize","true");
	  tb_config.setAttribute("ordinal","1005");
	  tb_config.setAttribute("defaultset","toolbarspacer,toolbarseparator");
	  
	  document.querySelector('#navigator-toolbox').appendChild(tb_config);
	  
	  CustomizableUI.registerArea("configuration_toolbar", {legacy: true});
	  CustomizableUI.registerToolbarNode(tb_config);
	  
	  var tb_label = document.createXULElement("label");
	  tb_label.setAttribute("label", tb_config_label+": ");
	  tb_label.setAttribute("value", tb_config_label+": ");
	  tb_label.setAttribute("id","tb_config_tb_label");
	  tb_label.setAttribute("removable","false");
	  
	  tb_config.appendChild(tb_label);
	  
	  
	  var tb_spacer = document.createXULElement("toolbarspacer");
	  tb_spacer.setAttribute("id","spacer");
	  tb_spacer.setAttribute("class","chromeclass-toolbar-additional");
	  tb_spacer.setAttribute("customizableui-areatype","toolbar");
	  tb_spacer.setAttribute("removable","false");
	  tb_spacer.setAttribute("label", tb_spacer_label);
	  
	  tb_config.appendChild(tb_spacer);
	
	  
	  var tb_sep = document.createXULElement("toolbarseparator");
	  tb_sep.setAttribute("id","separator");
	  tb_sep.setAttribute("class","chromeclass-toolbar-additional");
	  tb_sep.setAttribute("customizableui-areatype","toolbar");
	  tb_sep.setAttribute("removable","false");
	  tb_sep.setAttribute("label", tb_sep_label);
 	  
	  tb_config.appendChild(tb_sep);
	  
	 
	  var tb_spring = document.createXULElement("toolbarspring");
	  tb_spring.setAttribute("id","spring");
	  tb_spring.setAttribute("class","chromeclass-toolbar-additional");
	  tb_spring.setAttribute("customizableui-areatype","toolbar");
	  tb_spring.setAttribute("removable","false");
	  tb_spring.setAttribute("flex","1"); 
	  tb_spring.setAttribute("label", tb_spring_label);
	  	  
	  tb_config.appendChild(tb_spring);
	    
	  // CSS
	  var sss = Components.classes["@mozilla.org/content/style-sheet-service;1"].getService(Components.interfaces.nsIStyleSheetService);

	  var uri = Services.io.newURI("data:text/css;charset=utf-8," + encodeURIComponent(`
		#configuration_toolbar {
		  appearance: none !important;
		  background-color: var(--toolbar-bgcolor);
		  background-image: var(--toolbar-bgimage);
		  background-clip: padding-box;
		  color: var(--toolbar-color, inherit);
		}
		#main-window:not([customizing]) #configuration_toolbar {
		  visibility: collapse;
		}
		#main-window[customizing] #configuration_toolbar #tb_config_tb_label {
		  font-weight: bold !important;
		}
		#main-window[customizing] #configuration_toolbar :is(#spacer,#separator,#spring) {
		  margin-inline-start: 20px;
		}
		#main-window[customizing] #configuration_toolbar :is(#wrapper-spacer,#wrapper-separator,#wrapper-spring) .toolbarpaletteitem-label {
		  display: block !important;
		  margin-inline-end: 20px;
		}
		#main-window[customizing] #wrapper-spacer #spacer {
		  margin: 2px 0 !important;
		}
		#main-window[customizing] #configuration_toolbar #wrapper-spring #spring {
		  margin: -1px 0 !important;
		  min-width: 80px !important;
		}
		#main-window[customizing] #configuration_toolbar > * {
		  padding: 2px !important;
		}
		#main-window[customizing] #configuration_toolbar > :is(#wrapper-spacer,#wrapper-separator,#wrapper-spring) {
		  border: 1px dotted !important;
		  margin-inline-start: 2px !important;
		  margin-inline-end: 2px !important;
		}
		#main-window[customizing] toolbarspacer {
		  border: 1px solid !important;
		}
		toolbar[orient="vertical"] toolbarseparator {
		  appearance: none !important;
		  border-top: 1px solid rgba(15,17,38, 0.5) !important;
		  border-bottom: 1px solid rgba(255,255,255, 0.3) !important;
		  margin: 2px 2px !important;
		  height: 1px !important;
		}
		toolbar[orient="vertical"] toolbarspacer {
		  appearance: none !important;
		  height: 18px !important;
		  width: 18px !important;
		}
		#customization-palette toolbarpaletteitem[id^="wrapper-customizableui-special-spring"],
		#customization-palette-container :is(#spring,#wrapper-spring) {
		  display: none !important;
		}
		#main-window:not([customizing]) toolbar:not(#configuration_toolbar) toolbarspring {
		  max-width: 100% !important;
		}
		/*#menubar-items + spacer {
		  display: none !important;
		}*/
	  `), null, null);

	  sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);
	 }
	} catch(e){}

  }

}

/* initialization delay workaround */
document.addEventListener("DOMContentLoaded", AddSeparator.init(), false);
/* Use the below code instead of the one above this line, if initialization issues occur on startup */
/*
setTimeout(function(){
  AddSeparator.init();
},2000);
*/

```

## File: `JS/tabContextMenuNavigation.uc.js`

```javascript
// ==UserScript==
// @name           Tab Context Menu Navigation
// @version        1.1.2
// @author         aminomancer
// @homepage       https://github.com/aminomancer/uc.css.js
// @description    Add some new menuitems to the tab context menu for navigating tabs. Includes Back, Forward, Reload, and Bookmark. The new menuitems look just like the navigation group at the top of the content area context menu. So they're oriented horizontally and have icons instead of labels. But functionally, they're a bit different. If you click the "Reload" button, for example, instead of reloading the current tab it will reload the tab you right-clicked to open the context menu. If you had multiple tabs selected and you right-clicked one of them, it will reload all of them. If you click the "Back" button, it will navigate the context tab(s) back by one. So this gives you some capabilities not already available in Firefox. In particular, you can navigate back/forward in tabs without opening them, since it operates on the context tab rather than the active tab. You can also navigate back/forward in multiple tabs at once. This script was made by request. It's not recommended on macOS, since the context menu items and functions are significantly different. It should be technically compatible but it might look weird depending on your settings.
// @downloadURL    https://cdn.jsdelivr.net/gh/aminomancer/uc.css.js@master/JS/tabContextMenuNavigation.uc.js
// @updateURL      https://cdn.jsdelivr.net/gh/aminomancer/uc.css.js@master/JS/tabContextMenuNavigation.uc.js
// @license        This Source Code Form is subject to the terms of the Creative Commons Attribution-NonCommercial-ShareAlike International License, v. 4.0. If a copy of the CC BY-NC-SA 4.0 was not distributed with this file, You can obtain one at http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
// ==/UserScript==

class TabContextMenuNavigation {
  static config = {
    l10n: {
      "Go Back (Single Tab)": "Navigate tab back one page",

      "Go Back (Multiselected)": "Navigate selected tabs back one page",

      "Go Back Access Key": "G",

      "Go Forward (Single Tab)": "Navigate tab forward one page",

      "Go Forward (Multiselected)": "Navigate selected tabs forward one page",

      "Go Forward Access Key": "F",

      "Reload (Single Tab)": "Reload tab",

      "Reload (Multiselected)": "Reload selected tabs",

      "Reload Access Key": "R",

      "Bookmark (Single Tab)": "Bookmark tab",

      "Bookmark (Multiselected)": "Bookmark selected tabs...",

      "Bookmark Access Key": "B",
    },
    // firefox doesn't have localized strings for these menuitems, since it
    // doesn't have any user-facing features like this where you can navigate
    // tabs that aren't currently active/selected. nor does it have any ability
    // to navigate multiple tabs at once. so you have to localize the tooltips
    // yourself to match your browser language.
  };
  create(doc, tag, props, isHTML = false) {
    let el = isHTML ? doc.createElement(tag) : doc.createXULElement(tag);
    for (let prop in props) el.setAttribute(prop, props[prop]);
    return el;
  }
  constructor() {
    this.config = TabContextMenuNavigation.config;
    let { l10n } = this.config;
    document.documentElement.setAttribute(
      "operatingsystem",
      AppConstants.platform,
    );
    this.loadStylesheet();
    // menuitem group
    this.contextNavigation = this.create(document, "menugroup", {
      id: "tab-context-navigation",
    });
    this.contextNavSeparator = this.create(document, "menuseparator", {
      id: "tab-context-sep-navigation",
    });
    this.tabContext.prepend(this.contextNavSeparator);
    this.tabContext.prepend(this.contextNavigation);
    // new menuitems
    this.contextBack = this.contextNavigation.appendChild(
      this.create(document, "menuitem", {
        id: "tab-context-back",
        class: "menuitem-iconic",
        tooltiptext: l10n["Go Back (Single Tab)"],
        accesskey: l10n["Go Back Access Key"],
        oncommand: `tabContextMenuNavigation.goBack()`,
      }),
    );
    this.contextForward = this.contextNavigation.appendChild(
      this.create(document, "menuitem", {
        id: "tab-context-forward",
        class: "menuitem-iconic",
        tooltiptext: l10n["Go Forward (Single Tab)"],
        accesskey: l10n["Go Forward Access Key"],
        oncommand: `tabContextMenuNavigation.goForward()`,
      }),
    );
    this.contextReload = this.contextNavigation.appendChild(
      this.create(document, "menuitem", {
        id: "tab-context-reload",
        class: "menuitem-iconic",
        tooltiptext: l10n["Reload (Single Tab)"],
        accesskey: l10n["Reload Access Key"],
        oncommand: `tabContextMenuNavigation.reload()`,
      }),
    );
    this.contextBookmark = this.contextNavigation.appendChild(
      this.create(document, "menuitem", {
        id: "tab-context-bookmark",
        class: "menuitem-iconic",
        tooltiptext: l10n["Bookmark (Single Tab)"],
        accesskey: l10n["Bookmark Access Key"],
        oncommand: `tabContextMenuNavigation.bookmark()`,
      }),
    );
    // remove the separator after "New Tab" menuitem,
    // since it'll look awkward with the menugroup above it.
    let newTab = this.tabContext.querySelector("#context_openANewTab");
    if (newTab.nextElementSibling.tagName === "menuseparator") {
      newTab.nextElementSibling.remove();
    }
    // set up listener to hide/disable menuitems
    this.tabContext.addEventListener("popupshowing", this);
  }
  handleEvent(e) {
    switch (e.type) {
      case "popupshowing":
        this.onPopupShowing(e);
        break;
    }
  }
  // we want to disable/enable the back & forward menuitems just like the
  // back/forward buttons in the navbar. we also want to change the tooltips for
  // all 4 menuitems based on whether more than 1 tab is selected.
  onPopupShowing(e) {
    if (e.target !== this.tabContext) return;
    let { l10n } = this.config;
    if (this.contextTab?.multiselected) {
      this.contextBack.disabled = !gBrowser.selectedTabs.some(
        (tab) => gBrowser.getBrowserForTab(tab).webNavigation.canGoBack,
      );
      this.contextForward.disabled = !gBrowser.selectedTabs.some(
        (tab) => gBrowser.getBrowserForTab(tab).webNavigation.canGoForward,
      );
      this.contextBack.setAttribute(
        "tooltiptext",
        l10n["Go Back (Multiselected)"],
      );
      this.contextForward.setAttribute(
        "tooltiptext",
        l10n["Go Forward (Multiselected)"],
      );
      this.contextReload.setAttribute(
        "tooltiptext",
        l10n["Reload (Multiselected)"],
      );
      this.contextBookmark.setAttribute(
        "tooltiptext",
        l10n["Bookmark (Multiselected)"],
      );
    } else {
      this.contextBack.disabled = !gBrowser.getBrowserForTab(this.contextTab)
        .webNavigation.canGoBack;
      this.contextForward.disabled = !gBrowser.getBrowserForTab(this.contextTab)
        .webNavigation.canGoForward;
      this.contextBack.setAttribute(
        "tooltiptext",
        l10n["Go Back (Single Tab)"],
      );
      this.contextForward.setAttribute(
        "tooltiptext",
        l10n["Go Forward (Single Tab)"],
      );
      this.contextReload.setAttribute(
        "tooltiptext",
        l10n["Reload (Single Tab)"],
      );
      this.contextBookmark.setAttribute(
        "tooltiptext",
        l10n["Bookmark (Single Tab)"],
      );
    }
  }
  goBack() {
    if (this.contextTab?.multiselected) {
      gBrowser.selectedTabs.forEach((tab) => {
        let browser = gBrowser.getBrowserForTab(tab);
        if (browser.webNavigation.canGoBack) browser.goBack();
      });
    } else {
      gBrowser.getBrowserForTab(this.contextTab).goBack();
    }
  }
  goForward() {
    if (this.contextTab?.multiselected) {
      gBrowser.selectedTabs.forEach((tab) => {
        let browser = gBrowser.getBrowserForTab(tab);
        if (browser.webNavigation.canGoForward) browser.goForward();
      });
    } else {
      gBrowser.getBrowserForTab(this.contextTab).goForward();
    }
  }
  reload() {
    if (this.contextTab?.multiselected) gBrowser.reloadMultiSelectedTabs();
    else gBrowser.reloadTab(this.contextTab);
  }
  bookmark() {
    PlacesUIUtils.showBookmarkPagesDialog(
      this.contextTab?.multiselected
        ? PlacesCommandHook.uniqueSelectedPages
        : PlacesCommandHook.getUniquePages([this.contextTab]),
    );
  }
  loadStylesheet() {
    // we're gonna use a <style> element instead of the usual stylesheet
    // service, since this seems to be the only way to get media queries to work
    // in an author sheet without saving the stylesheet to disk somewhere and
    // loading it from a chrome:// url. this restricts us in some ways but it
    // doesn't matter since these elements only appear in one place.
    let style = document.createElement("style");
    style.textContent = `#tab-context-navigation>.menuitem-iconic>.menu-iconic-text,#tab-context-navigation>.menuitem-iconic>.menu-accel-container{display:none;}#tab-context-navigation>.menuitem-iconic{-moz-box-flex:1;-moz-box-pack:center;-moz-box-align:center;}#tab-context-navigation>.menuitem-iconic>.menu-iconic-left{appearance:none;}#tab-context-navigation>.menuitem-iconic>.menu-iconic-left>.menu-iconic-icon{width:1.25em;height:auto;margin:7px;-moz-context-properties:fill;fill:currentColor;}#tab-context-back{list-style-image:url("chrome://browser/skin/back.svg");}#tab-context-forward{list-style-image:url("chrome://browser/skin/forward.svg");}#tab-context-reload{list-style-image:url("chrome://global/skin/icons/reload.svg");}#tab-context-bookmark{list-style-image:url("chrome://browser/skin/bookmark-hollow.svg");}#tab-context-back:-moz-locale-dir(rtl),#tab-context-forward:-moz-locale-dir(rtl),#tab-context-reload:-moz-locale-dir(rtl){transform:scaleX(-1);}#contentAreaContextMenu[touchmode]>#tab-context-navigation>menuitem{padding-block:7px;}#tab-context-navigation{background-color:menu;padding-bottom:4px;}#tab-context-sep-navigation{margin-inline-start:-28px;margin-top:-4px;}@media (-moz-windows-non-native-menus){#tab-context-navigation:not([hidden]){background-color:inherit;padding:0 0 4px;display:flex;flex-direction:row;--menuitem-min-width:calc(2em + 16px);min-width:calc(4 * var(--menuitem-min-width))}#tab-context-navigation>.menuitem-iconic{flex:1 0 auto}#tab-context-navigation>.menuitem-iconic[_moz-menuactive="true"]{background-color:transparent}#tab-context-navigation>.menuitem-iconic>.menu-iconic-left{margin:0;padding:0}#tab-context-navigation>.menuitem-iconic>.menu-iconic-left>.menu-iconic-icon{width:var(--menuitem-min-width);height:32px;padding:8px 1em;margin:0}#tab-context-navigation>.menuitem-iconic[_moz-menuactive="true"]:not([disabled="true"])>.menu-iconic-left>.menu-iconic-icon{background-color:var(--menuitem-hover-background-color)}#tab-context-navigation>.menuitem-iconic[_moz-menuactive="true"][disabled="true"]>.menu-iconic-left>.menu-iconic-icon{background-color:var(--menuitem-disabled-hover-background-color)}#tab-context-navigation>.menuitem-iconic:first-child{-moz-box-pack:start}#tab-context-navigation>.menuitem-iconic:last-child{-moz-box-pack:end}#tab-context-navigation>.menuitem-iconic:last-child,#tab-context-navigation>.menuitem-iconic:first-child{flex-grow:0;width:calc(var(--menuitem-min-width) + calc(100% - 4 * var(--menuitem-min-width)) / 6)}#tab-context-sep-navigation{margin-top:0;margin-inline:0}}:root[operatingsystem="linux"] #tab-context-navigation>.menuitem-iconic>.menu-iconic-left{padding-inline-end:0!important;margin-inline-end:0!important;}#context_reloadTab,#context_reloadSelectedTabs,#context_bookmarkTab,#context_bookmarkSelectedTabs{display:none!important;}`;
    document.head.appendChild(style);
  }
  get tabContext() {
    return (
      this._tabContext ||
      (this._tabContext = document.getElementById("tabContextMenu"))
    );
  }
  get contextTab() {
    return TabContextMenu.contextTab;
  }
}

if (gBrowserInit.delayedStartupFinished) {
  window.tabContextMenuNavigation = new TabContextMenuNavigation();
} else {
  let delayedListener = (subject, topic) => {
    if (topic == "browser-delayed-startup-finished" && subject == window) {
      Services.obs.removeObserver(delayedListener, topic);
      window.tabContextMenuNavigation = new TabContextMenuNavigation();
    }
  };
  Services.obs.addObserver(delayedListener, "browser-delayed-startup-finished");
}

```

## File: `JS/tooltipShadowSupport.uc.js`

```javascript
// ==UserScript==
// @name           Tooltip Shadow Support
// @version        1.0
// @author         aminomancer
// @homepage       https://github.com/aminomancer/uc.css.js
// @description    This script enhances tooltip styling by enabling box shadows
// and borders on tooltips with awkward structures, like those using -moz-popup.
// It does this by placing tooltips inside another container, allowing for
// visible shadows and borders. Note that for native-anonymous tooltips,
// userChrome.ag.css must be edited directly. To disable borders, avoid this
// script and set userChrome.css.remove-tooltip-borders to true in about:config.
// ==/UserScript==

(function () {
  function create(aDoc, tag, props, isHTML = false) {
    let el = isHTML ? aDoc.createElement(tag) : aDoc.createXULElement(tag);
    for (let prop in props) el.setAttribute(prop, props[prop]);
    return el;
  }
  [
    document.getElementById("back-button-tooltip"),
    document.getElementById("forward-button-tooltip"),
  ].forEach((tip) => {
    let box = create(document, "vbox", {
      id: tip.id + "-box",
      class: "uc-tooltip-box",
      flex: 1,
    });
    Array.from(tip.children).forEach((elt) => box.appendChild(elt));
    tip.appendChild(box);
    tip.setAttribute("shadow-support", true);
  });
  document.documentElement.setAttribute("tooltip-shadow-support", true);
})();

```

## File: `JS/userChromeAgentAuthorSheetLoader.sys.mjs`

```mjs
// ==UserScript==
// @name           Agent/Author Sheet Loader
// @version        2.6.4
// @author         aminomancer
// @homepageURL    https://github.com/aminomancer
// @description    Load `*.ag.css` files as agent sheets and `*.au.css` files as author sheets. Will also load `*.us.css` files as user sheets, in case you ever need that for some reason. This loader is capable of loading stylesheets into browser toolbox windows, but it will not try to load [userChrome.css](https://github.com/aminomancer/uc.css.js/blob/master/userChrome.css) or [userContent.css](https://github.com/aminomancer/uc.css.js/blob/master/userContent.css) in the browser toolbox. For that you will need [userChromeDevtoolsSheetLoader.sys.mjs](https://github.com/aminomancer/uc.css.js#browser-toolbox-stylesheet-loader) instead.
// @downloadURL    https://cdn.jsdelivr.net/gh/aminomancer/uc.css.js@master/JS/userChromeAgentAuthorSheetLoader.sys.mjs
// @updateURL      https://cdn.jsdelivr.net/gh/aminomancer/uc.css.js@master/JS/userChromeAgentAuthorSheetLoader.sys.mjs
// @license        This Source Code Form is subject to the terms of the Creative Commons Attribution-NonCommercial-ShareAlike International License, v. 4.0. If a copy of the CC BY-NC-SA 4.0 was not distributed with this file, You can obtain one at http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
// @backgroundmodule
// ==/UserScript==

let sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(
  Ci.nsIStyleSheetService,
);
function traverseToMainProfile(str) {
  let dir = Services.dirsvc.get(str, Ci.nsIFile);
  if (!dir.exists()) {
    let toAddChrome = false;
    while (dir.target.includes("chrome_debugger_profile")) {
      dir = dir.parent;
      toAddChrome = true;
    }
    if (toAddChrome) dir.append("chrome");
  }
  return dir;
}

let chromeDir = traverseToMainProfile("UChrm");
let files = chromeDir.directoryEntries.QueryInterface(Ci.nsISimpleEnumerator);
if (files) {
  while (files.hasMoreElements()) {
    let file = files.getNext().QueryInterface(Ci.nsIFile);
    let name = file.leafName;
    if (!file.isFile()) continue;
    if (/\.(?:au||ag||us)\.css$/i.test(name)) {
      let typePrefix = name.split(".")[1];
      let type, typeString;
      switch (typePrefix) {
        case "au":
          type = sss.AUTHOR_SHEET;
          typeString = "author sheet";
          break;
        case "ag":
          type = sss.AGENT_SHEET;
          typeString = "agent sheet";
          break;
        case "us":
          type = sss.USER_SHEET;
          typeString = "user sheet";
          break;
      }
      let uri = Services.io
        .getProtocolHandler("file")
        .QueryInterface(Ci.nsIFileProtocolHandler)
        .getURLSpecFromDir(chromeDir);
      try {
        sss.loadAndRegisterSheet(Services.io.newURI(uri + name), type);
        console.info(`Loaded ${typeString}: ${name}`); // eslint-disable-line no-console
      } catch (e) {
        console.error(`Could not load ${name}: ${e.name}`);
      }
    }
  }
}

```

## File: `JS/userChromeDevtoolsSheetLoader.sys.mjs`

```mjs
// ==UserScript==
// @name           Browser Toolbox Stylesheet Loader
// @version        2.1.5
// @author         aminomancer
// @homepageURL    https://github.com/aminomancer
// @description    Load userChrome and userContent stylesheets into Browser Toolbox windows.
// @downloadURL    https://cdn.jsdelivr.net/gh/aminomancer/uc.css.js@master/JS/userChromeDevtoolsSheetLoader.sys.mjs
// @updateURL      https://cdn.jsdelivr.net/gh/aminomancer/uc.css.js@master/JS/userChromeDevtoolsSheetLoader.sys.mjs
// @license        This Source Code Form is subject to the terms of the Creative Commons Attribution-NonCommercial-ShareAlike International License, v. 4.0. If a copy of the CC BY-NC-SA 4.0 was not distributed with this file, You can obtain one at http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
// @backgroundmodule
// ==/UserScript==

class ToolboxProcessSheetLoader {
  regex = /^chrome:(\/\/devtools\/.*.html.*)/i;
  lastSubject = null;
  constructor() {
    Services.obs.addObserver(this, "domwindowopened");
  }
  traverseToMainProfile(win, str) {
    let dir = Services.dirsvc.get(str, win.Ci.nsIFile);
    if (!dir.exists()) {
      let toAddChrome = false;
      while (dir.target.includes("chrome_debugger_profile")) {
        dir = dir.parent;
        toAddChrome = true;
      }
      if (toAddChrome) dir.append("chrome");
    }
    return dir;
  }
  getChromePath(win) {
    return Services.io
      .getProtocolHandler("file")
      .QueryInterface(win.Ci.nsIFileProtocolHandler)
      .getURLSpecFromDir(this.traverseToMainProfile(win, "UChrm"));
  }
  isDevtools(win) {
    return (
      Services.dirsvc
        .get("UChrm", Ci.nsIFile)
        .target.includes("chrome_debugger_profile") &&
      this.regex.test(win.location.href)
    );
  }
  loadSheet(win, path, name, type) {
    let sss = win.Cc["@mozilla.org/content/style-sheet-service;1"].getService(
      win.Ci.nsIStyleSheetService,
    );
    let uri = win.Services.io.newURI(path + name);
    if (!sss.sheetRegistered(uri, sss[type])) {
      sss.loadAndRegisterSheet(uri, sss[type]);
    }
  }
  observe(sub) {
    if (this.lastSubject === sub) return;
    this.lastSubject = sub;
    sub.addEventListener("DOMContentLoaded", this, true, { once: true });
  }
  handleEvent(e) {
    switch (e.type) {
      case "DOMContentLoaded":
        this._onContentLoaded(e);
        break;
    }
  }
  _onContentLoaded(e) {
    let document = e.originalTarget;
    let win = document.defaultView;
    this.lastSubject.removeEventListener("DomContentLoaded", this, true);
    if (!this.isDevtools(win)) return;
    const path = this.getChromePath(win);
    this.loadSheet(win, path, "userChrome.css", "AUTHOR_SHEET");
    this.loadSheet(win, path, "userContent.css", "USER_SHEET");
  }
}

new ToolboxProcessSheetLoader();

```

## File: `css/common-files/color_variables.css`

```css
/*! =============
@name             ShadowFox
@description      A universal dark theme for Firefox 57+
@version          1.6.0
@lastUpdated      October 7, 2018
@author           overdodactyl
@homepageURL      https://overdodactyl.github.io/ShadowFox/
@sourceCode       https://github.com/overdodactyl/ShadowFox
@supportURL       https://github.com/overdodactyl/ShadowFox/issues
@subreddit        https://www.reddit.com/r/ShadowFoxCSS/
@slackInvitation  https://join.slack.com/t/shadowfox-workspace/shared_invite/enQtMzU3NTU2NTQ0NDA1LTcwN2I1M2I4MzlkMWFlMWEzODc2MTY1NzU2NjhlYTgzOGY5ZTQzM2UxZTFiZDMxNDM1NDMyNjlhOWQ4MWQ3ZDc
@license          MIT License Copyright (c) 2017 overdodactyl
================= */
@-moz-document url-prefix(https://discovery.addons.mozilla.org),
url-prefix(chrome://),
url-prefix(about:),
url-prefix(file:),
url(https://www.mozilla.org/credits/),
url-prefix(https://addons.mozilla.org),
url-prefix(http://addons.mozilla.org),
url-prefix(https://raw.githubusercontent.com),
url-prefix(moz-extension),
url-prefix(view-source),
regexp(".*\\.(p|P)(d|D)(f|F).*") {
  :root {
    --magenta-50: #ff1ad9;
    --magenta-60: #ed00b5;
    --magenta-70: #b5007f;
    --magenta-80: #7d004f;
    --magenta-90: #440027;
    --purple-50: #9400ff;
    --purple-60: #8000d7;
    --purple-70: #6200a4;
    --purple-80: #440071;
    --purple-90: #25003e;
    --blue-40: #45a1ff;
    --blue-50: #0a84ff;
    --blue-60: #0060df;
    --blue-70: #003eaa;
    --blue-80: #002275;
    --blue-90: #000f40;
    --teal-50: #00feff;
    --teal-60: #00c8d7;
    --teal-70: #008ea4;
    --teal-80: #005a71;
    --teal-90: #002d3e;
    --green-50: #30e60b;
    --green-60: #12bc00;
    --green-70: #058b00;
    --green-80: #006504;
    --green-90: #003706;
    --yellow-50: #ffe900;
    --yellow-60: #d7b600;
    --yellow-70: #a47f00;
    --yellow-80: #715100;
    --yellow-90: #3e2800;
    --red-50: #ff0039;
    --red-60: #d70022;
    --red-70: #a4000f;
    --red-80: #5a0002;
    --red-90: #3e0200;
    --orange-50: #ff9400;
    --orange-60: #d76e00;
    --orange-70: #a44900;
    --orange-80: #712b00;
    --orange-90: #3e1300;
    --grey-10: #f9f9fa;
    --grey-20: #ededf0;
    --grey-30: #d7d7db;
    --grey-40: #b1b1b3;
    --grey-50: #737373;
    --grey-60: #4a4a4f;
    --grey-70: #38383d;
    --grey-80: #2a2a2e;
    --grey-90: #0c0c0d;
    --code-green: #86de74!important;
    --warning-color: #FCE19F;
    --warning-background-color: #44391F;
    --theme-highlight-green: #86DE74;
    --theme-highlight-blue: #75BFFF;
    --theme-highlight-purple: #B98EFF;
    --theme-highlight-red: #FF7DE9;
    --theme-highlight-yellow: #FFF89E;
    --theme-highlight-bluegrey: #5e88b0;
    --theme-highlight-lightorange: #d99b28;
    --theme-highlight-orange: #d96629;
    --theme-highlight-pink: #df80ff;
    --tone-1: var(--grey-10);
    --tone-2: var(--grey-20);
    --tone-3: var(--grey-30);
    --tone-4: var(--grey-40);
    --tone-5: var(--grey-50);
    --tone-6: var(--grey-60);
    --tone-7: var(--grey-70);
    --tone-8: var(--grey-80);
    --tone-9: var(--grey-90);
    --accent-1: var(--blue-40);
    --accent-2: var(--blue-50);
    --accent-3: var(--blue-60);
    --in-content-page-color: var(--tone-4)!important;
    --in-content-page-background: var(--tone-7)!important;
    --in-content-text-color: var(--tone-3)!important;
    --in-content-selected-text: var(--tone-1)!important;
    --in-content-selected-text-background: #5675b9;
    --in-content-box-background: var(--tone-6)!important;
    --in-content-box-background-odd: #f3f6fa;
    --in-content-box-background-hover: var(--tone-6)!important;
    --in-content-box-background-active: var(--tone-6)!important;
    --in-content-box-border-color: var(--tone-5)!important;
    --in-content-item-hover: rgba(0,149,221,0.25);
    --in-content-item-selected: var(--tone-8)!important;
    --in-content-border-highlight: var(--accent-1)!important;
    --in-content-border-focus: var(--accent-1)!important;
    --in-content-border-color: var(--tone-6)!important;
    --in-content-category-outline-focus: 1px dotted #0a84ff;
    --in-content-category-text: var(--tone-4)!important;
    --in-content-category-text-active: #0c0c0d;
    --in-content-category-text-selected: var(--accent-1)!important;
    --in-content-category-text-selected-active: #0060df;
    --in-content-category-background-hover: rgba(12,12,13,0.1);
    --in-content-category-background-active: rgba(12,12,13,0.15);
    --in-content-category-background-selected-hover: rgba(12,12,13,0.15);
    --in-content-category-background-selected-active: rgba(12,12,13,0.2);
    --in-content-tab-color: #424f5a;
    --in-content-link-color: var(--accent-1)!important;
    --in-content-link-color-hover: var(--accent-2)!important;
    --in-content-link-color-active: #003eaa;
    --in-content-link-color-visited: #0a8dff;
    --in-content-primary-button-background: var(--accent-2)!important;
    --in-content-primary-button-background-hover: var(--accent-3)!important;
    --in-content-primary-button-background-active: var(--accent-3)!important;
    --in-content-table-border-dark-color: var(--tone-7)!important;
    --in-content-table-header-background: var(--accent-2)!important;
    --theme-selection-background: var(--accent-2)!important;
    --theme-selection-background-hover: var(--accent-1)!important;
    --in-content-category-header-background: var(--tone-8)!important;
    --selected-icon-fill-color: var(--tone-2)!important;
    --in-content-dark-header-background: var(--tone-9)!important;
    --tab-line-selected-color: var(--accent-2)!important;
    --secure-connection-color: var(--accent-1);
    --tab-background-color: var(--tone-9)!important;
    --tab-color: var(--in-content-selected-text);
    --theme-sidebar-background: var(--tab-background-color)!important;
    --card-outline-color: var(--in-content-box-border-color)!important;
    --cm-background: var(--tone-8)!important;
    --cm-selection: #353b48!important;
    --cm-marker: #555!important;
    --cm-linenumber: #58575c!important;
    --cm-cursor: #fff!important;
    --cm-active-line-background: rgba(185,215,253,.15)!important;
    --cm-matching-bracket: rgba(255,255,255,.25)!important;
    --cm-search-background: rgba(24,29,32,1)!important;
    --cm-red: #de7474!important;
    --start-indicator-for-updater-scripts: black;
    --end-indicator-for-updater-scripts: black;
    --dummy-variable-for-updater-scripts: black
  }
}
```

## File: `css/common-files/context_menus.css`

```css
menupopup,
menupopup > menu > menupopup,
menupopup scrollbox,
popup,
popup > menu > menupopup {
  -moz-appearance: none!important;
  background: var(--in-content-box-background)!important;
  border: none!important;
  padding: 0!important
}
menu.subviewbutton > .menu-right {
  fill: #000!important
}
.menu-right {
  filter: invert(95%)!important
}
#context-navigation menuitem,
.panel-arrowcontent {
  color: var(--in-content-selected-text)!important;
  background: var(--in-content-box-background)!important
}
#context-navigation menuitem:hover {
  background: var(--in-content-primary-button-background-hover)!important
}
menuitem,
menupopup menu {
  -moz-appearance: none!important;
  color: var(--in-content-selected-text)!important;
  background: var(--in-content-box-background)!important
}
menupopup menuseparator {
  -moz-appearance: none!important;
  padding: 1px!important;
  margin: 5px 0!important;
  background: var(--in-content-table-border-dark-color)!important;
  border-top: none!important
}
#context-navigation menuitem[disabled=true],
menu[disabled=true],
menuitem[disabled=true] {
  color: var(--in-content-box-border-color)!important
}
menu[disabled=true]:hover,
menuitem:hover[disabled=true] {
  color: var(--in-content-box-border-color)!important;
  background-color: var(--in-content-box-background)!important
}
#context-navigation menuitem:hover[disabled=true] {
  color: var(--in-content-box-border-color)!important;
  background-color: var(--in-content-box-background)!important
}
menuitem[_moz-menuactive=true],
menupopup menu[_moz-menuactive=true] {
  color: var(--in-content-selected-text)!important;
  background-color: var(--in-content-primary-button-background-hover)!important
}
vbox#sidebar-box.chromeclass-extrachrome {
  border-color: var(--in-content-category-header-background)!important;
  border-right: 1px!important;
  border-style: solid!important
}
#_testpilot-containers_7 .menu-iconic-left,
#treestyletab_piro_sakura_ne_jp_8 .menu-iconic-left {
  filter: invert(55%)!important
}
@media screen and (-moz-windows-theme),
screen and (-moz-windows-classic),
screen and (-moz-windows-default-theme),
screen and (-moz-os-version:windows-win7),
screen and (-moz-os-version:windows-win8),
screen and (-moz-os-version:windows-win10) {
  menupopup menuseparator {
    padding: 0!important;
    border-color: var(--in-content-table-border-dark-color)!important
  }
  #context-navigation,
  #context-sep-navigation {
    padding: 0!important
  }
  #BMB_bookmarksPopup menupopup {
    padding: 4px 0 0!important
  }
  #BMB_bookmarksPopup menupopup[placespopup=true] > hbox,
  #personal-bookmarks menupopup,
  .box-inherit scrollbox-innerbox,
  .panel-arrowcontent,
  menupopup#BMB_bookmarksPopup > menu > menupopup > hbox,
  menupopup#PlacesChevronPopup,
  menupopup#bookmarksMenuPopup,
  menupopup#bookmarksMenuPopup > menu > menupopup,
  menupopup#bookmarksMenuPopup menupopup[placespopup=true],
  menupopup#contentAreaContextMenu,
  menupopup#contentAreaContextMenu menupopup,
  menupopup#downloadsContextMenu,
  menupopup#placesContext,
  menupopup#tabContextMenu,
  menupopup#tabContextMenu menupopup,
  menupopup#toolbar-context-menu,
  toolbaritem#menubar-items menupopup {
    border-color: var(--in-content-box-background)!important;
    border-width: 1px!important;
    border-style: solid!important
  }
  #bookmarksMenuPopup,
  #personal-bookmarks menupopup .bookmark-item,
  menupopup#goPopup {
    padding-left: 4px!important;
    padding-right: 4px!important
  }
  menupopup#contentAreaContextMenu menupopup,
  menupopup#tabContextMenu > menu > menupopup > .popup-internal-box,
  menupopup#toolbar-context-menu {
    padding-left: 2px!important;
    padding-right: 2px!important
  }
  menupopup,
  menupopup > menu > menupopup {
    padding: 4px 0!important
  }
  #customization-toolbar-menu,
  toolbaritem#menubar-items menupopup,
  toolbaritem#menubar-items menupopup > menu > menupopup {
    padding-left: 2px!important;
    padding-right: 2px!important
  }
  #personal-bookmarks menupopup menuitem,
  menupopup#contentAreaContextMenu menu,
  menupopup#contentAreaContextMenu menuitem {
    padding-top: 1px!important;
    padding-bottom: 1px!important
  }
  menupopup#contentAreaContextMenu > .menuitem-iconic {
    padding-top: 0!important;
    padding-bottom: 0!important
  }
  menupopup .menu-right {
    margin-right: 0!important
  }
}
```

## File: `css/common-files/library.css`

```css
@-moz-document url(chrome://browser/content/places/places.xul) {
  toolbar {
    -moz-appearance: none!important;
    background-color: var(--in-content-category-header-background)!important;
    border: none!important
  }
  listbox,
  textbox {
    -moz-appearance: none!important;
    background-color: var(--in-content-box-background)!important;
    color: var(--in-content-page-color)!important;
    min-height: 20px!important;
    padding: 0 0 0 4px!important;
    border: 1px solid!important;
    border-color: var(--in-content-box-border-color)!important;
    border-radius: 3px!important
  }
  #editBMPanel_rows > row > hbox > textbox,
  #editBMPanel_rows > row > textbox,
  #editBMPanel_tagsSelector {
    background: var(--in-content-box-background)!important
  }
  #placesToolbar > toolbarbutton {
    margin: 6px 4px 5px!important;
    -moz-appearance: none!important;
    background-color: var(--tone-4)!important;
    border-radius: 5px!important;
    filter: invert(100%)!important
  }
  #placesList {
    -moz-appearance: none!important;
    color: var(--in-content-page-color)!important;
    background-color: var(--in-content-page-background)!important
  }
  #placesView > splitter {
    border-color: var(--in-content-border-color)!important
  }
  #places #downloadsRichListBox {
    -moz-appearance: none!important;
    color: var(--in-content-page-color)!important;
    background-color: var(--in-content-box-background)!important
  }
  #detailsDeck {
    border: none!important;
    background-color: var(--in-content-page-background)!important;
    color: var(--in-content-page-color)!important
  }
  .expander-down,
  .expander-up {
    filter: invert(77%)!important
  }
  #placeContent treechildren:not(.autocomplete-treebody)::-moz-tree-cell-text() {
    color: var(--in-content-text-color)!important
  }
  #places treechildren:not(.autocomplete-treebody)::-moz-tree-row(selected),
  #placesList > treechildren::-moz-tree-row(selected) {
    -moz-appearance: none!important;
    -moz-font-smoothing-background-color: none!important;
    border-top: none!important;
    background: var(--theme-selection-background)!important;
    color: var(--in-content-text-color)!important
  }
  #placeContent treechildren:not(.autocomplete-treebody)::-moz-tree-cell-text(selected),
  #placesList > treechildren::-moz-tree-cell-text(selected) {
    color: var(--in-content-text-color)!important
  }
  #places treechildren::-moz-tree-row {
    background-color: transparent!important
  }
  #places treechildren::-moz-tree-image {
    fill: var(--in-content-page-color)!important
  }
  #places treechildren::-moz-tree-image(selected) {
    fill: var(--selected-icon-fill-color)!important
  }
  #placeContent > treechildren::-moz-tree-cell,
  #placeContent > treechildren::-moz-tree-column {
    border-color: var(--in-content-box-border-color)!important
  }
  #contentView treecol {
    -moz-appearance: none!important;
    border: none!important;
    background: var(--in-content-category-header-background)!important;
    color: var(--in-content-text-color)!important;
    border-right: 1px solid!important;
    border-color: var(--in-content-box-border-color)!important
  }
  tree {
    background-color: var(--in-content-box-background)!important
  }
  #editBMPanel_tagsSelectorExpander.expander-down {
    -moz-appearance: -moz-mac-disclosure-button-closed!important;
    filter: invert(79%)!important
  }
  #editBMPanel_tagsSelectorExpander.expander-up {
    -moz-appearance: -moz-mac-disclosure-button-open!important;
    filter: invert(79%)!important
  }
  #main-menubar {
    background-color: var(--in-content-category-header-background)!important
  }
  #main-menubar > * {
    color: var(--in-content-page-color)!important
  }
  #main-menubar > :hover,
  menubar > menu[_moz-menuactive=true][open=true] {
    -moz-appearance: none!important;
    background: var(--in-content-page-background)!important
  }
  @media screen and (-moz-windows-theme),
  screen and (-moz-windows-classic),
  screen and (-moz-windows-default-theme),
  screen and (-moz-os-version:windows-win7),
  screen and (-moz-os-version:windows-win8),
  screen and (-moz-os-version:windows-win10) {
    #metaTagsCaption,
    #security-identity,
    #security-identity-groupbox,
    #security-privacy,
    #security-privacy-groupbox,
    #security-technical,
    #security-technical-groupbox {
      -moz-appearance: none!important;
      background-color: var(--in-content-page-background)!important;
      border: none!important;
      color: var(--in-content-selected-text)!important
    }
    #placesMenu > menu {
      color: var(--in-content-page-color)!important
    }
    #security-identity-groupbox,
    #security-privacy-groupbox,
    #security-technical-groupbox {
      -moz-appearance: none!important;
      background-color: var(--in-content-category-header-background)!important
    }
    #places treechildren:not(.autocomplete-treebody)::-moz-tree-row(hover):not(.autocomplete-treebody)::-moz-tree-cell-text(selected) {
      background: 0 0!important;
      -moz-border-top-colors: transparent!important;
      -moz-border-right-colors: transparent!important;
      -moz-border-left-colors: transparent!important;
      -moz-border-bottom-colors: transparent!important
    }
  }
  @media screen and (-moz-os-version:windows-win7) {
    treechildren {
      --treechildren-outline: none!important
    }
  }
}
```

## File: `css/common-files/radios_checkboxes.css`

```css
@-moz-document url-prefix(about:),
url-prefix(chrome://browser) {
  .checkbox-check,
  .prefs-pane [type=checkbox]:checked + label::before,
  .prefs-pane [type=checkbox]:not(:checked) + label::before,
  .radio-check,
  input[type=checkbox] {
    -moz-appearance: none!important;
    border: 1px solid!important;
    background-color: var(--in-content-box-background)!important;
    background-image: none!important;
    box-shadow: none!important;
    border-color: var(--in-content-box-border-color)!important
  }
  radio[disabled=true] {
    color: var(--in-content-box-border-color)!important
  }
  .radio-check[selected] {
    list-style-image: url(chrome://global/skin/in-content/radio.svg);
    fill: var(--in-content-border-highlight)!important;
    -moz-context-properties: fill,stroke;
    stroke: none;
    border-radius: 50%!important
  }
  .checkbox-check[checked] {
    list-style-image: url(data:image/svg+xml;base64,PCEtLSBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljCiAgIC0gTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpcwogICAtIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjIxIiBoZWlnaHQ9IjIxIiB2aWV3Qm94PSIwIDAgMjEgMjEiPgogIDxwYXRoIGZpbGw9ImNvbnRleHQtZmlsbCIgc3Ryb2tlPSJjb250ZXh0LXN0cm9rZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIGQ9Ik0gOS4zOSwxNi41IDE2LjI4LDYgMTQuNzcsNC41IDkuMzcsMTIuNyA2LjI4LDkuMiA0LjcsMTAuNyB6Ii8+Cjwvc3ZnPg==);
    fill: var(--in-content-border-highlight)!important;
    -moz-context-properties: fill,stroke!important;
    stroke: none
  }
  html body div.ancillary div div.opsRow div.opsRowLabel label input,
  html body div.ancillary div div.opsRow div.opsRowLabel label input#verbose {
    -moz-appearance: checkbox!important;
    min-height: 10px!important;
    min-width: 10px!important;
    margin-top: -5px;
    margin-bottom: -1px
  }
}
```

## File: `css/common-files/trees.css`

```css
@-moz-document url-prefix(about:),
url-prefix(chrome://browser/content/preferences/),
url(chrome://passwordmgr/content/passwordManager.xul),
url(chrome://formautofill/content/manageAddresses.xhtml),
url-prefix(chrome://pippki),
url(chrome://browser/content/pageinfo/pageInfo.xul) {
  ::-moz-tree-row(selected) {
    -moz-appearance: none!important;
    background-color: red!important
  }
  treechildren::-moz-tree-row,
  treechildren:not(.autocomplete-treebody)::-moz-tree-row(multicol,odd) {
    background-color: var(--in-content-box-background)!important
  }
  treechildren:not(.autocomplete-treebody)::-moz-tree-row(hover) {
    background-color: var(--theme-selection-background-hover)!important
  }
  tree {
    background-color: var(--in-content-box-background)!important;
    color: var(--in-content-page-color)!important
  }
  treechildren::-moz-tree-cell-text(hover),
  treechildren::-moz-tree-cell-text(selected) {
    color: var(--in-content-text-color)!important
  }
  treechildren:not(.autocomplete-treebody)::-moz-tree-row(selected) {
    background-color: var(--theme-selection-background)!important
  }
  treecol:not([hideheader=true]):not(:first-child),
  treecolpicker {
    border-image: linear-gradient(transparent 0,transparent 20%,var(--tone-5) 20%,var(--tone-5) 80%,transparent 80%,transparent 100%) 1 1!important
  }
  menulist:not([editable=true]) > .menulist-dropmarker,
  treecol:not([hideheader=true]) > .treecol-sortdirection[sortDirection] {
    fill: var(--in-content-category-text)!important
  }
  fieldset > legend,
  treecol:not([hideheader=true]),
  treecolpicker {
    background-color: var(--in-content-category-header-background)!important;
    color: var(--in-content-page-color)!important
  }
  prefpane#mainPrefPane groupbox#applicationsGroup richlistbox#handlersView richlistitem[selected=true] {
    background: var(--in-content-page-background)!important;
    color: var(--in-content-page-color)!important
  }
  tab {
    color: var(--in-content-page-color)!important
  }
  tab:hover {
    color: var(--in-content-selected-text)!important
  }
  tab[selected] {
    color: var(--in-content-link-color)!important
  }
  textbox[type=search] > moz-input-box > .textbox-search-sign {
    filter: invert(65%)
  }
  @media screen and (-moz-os-version:windows-win7) {
    treechildren {
      --treechildren-outline: none!important
    }
  }
}
```

## File: `css/userChrome-files/about_addons.css`

```css
@-moz-document url-prefix(chrome://)
{
  /* Make addon panels use the same background as tabs toolbar */
  #addons-page,
  addon-list,
  addon-card,
  .addon,
  .addon-list,
  panel[type="autocomplete-richlistbox"] {
    background-color: var(--tab-background-color) !important;
  }
}
```

## File: `css/userChrome-files/about_firefox.css`

```css
@-moz-document url(chrome://browser/content/aboutDialog.xul) {
  #clientBox {
    color: var(--in-content-page-color)!important;
    background-color: var(--in-content-page-background)!important
  }
  #bottomBox {
    background: var(--in-content-category-header-background)!important
  }
}
```

## File: `css/userChrome-files/address_searchbar.css`

```css
:root {
  --panel-separator-color: var(--in-content-border-color)!important
}
#urlbar[focused=true],
.searchbar-textbox[focused=true] {
  border: 1px solid!important;
  box-shadow: 0 1px 4px var(--in-content-border-focus)!important;
  border-color: var(--in-content-border-focus)!important
}
#PopupAutoCompleteRichResult .autocomplete-richlistbox,
.searchbar-treebody::-moz-tree-row {
  background-color: var(--in-content-box-background)!important
}
#PopupAutoCompleteRichResult .autocomplete-richlistitem,
.autocomplete-tree {
  border-bottom-color: var(--in-content-page-color)!important
}
.autocomplete-richlistitem[selected=true],
.searchbar-treebody::-moz-tree-row(selected) {
  background-color: var(--theme-selection-background)!important
}
#PopupSearchAutoComplete tree,
popupset#mainPopupSet panel#PopupAutoCompleteRichResult,
popupset#mainPopupSet panel#PopupAutoCompleteRichResult .autocomplete-richlistitem .ac-action,
popupset#mainPopupSet panel#PopupAutoCompleteRichResult .autocomplete-richlistitem .ac-separator,
popupset#mainPopupSet panel#PopupAutoCompleteRichResult .autocomplete-richlistitem .ac-title,
popupset#mainPopupSet panel#PopupAutoCompleteRichResult .autocomplete-tree {
  color: var(--in-content-page-color)!important
}
.ac-action[selected],
.ac-separator[selected],
.ac-title[selected],
.ac-url[selected],
popupset#mainPopupSet panel#PopupAutoCompleteRichResult .autocomplete-richlistitem[selected=true] .ac-action,
popupset#mainPopupSet panel#PopupAutoCompleteRichResult .autocomplete-richlistitem[selected=true] .ac-separator,
popupset#mainPopupSet panel#PopupAutoCompleteRichResult .autocomplete-richlistitem[selected=true] .ac-title,
popupset#mainPopupSet panel#PopupAutoCompleteRichResult .autocomplete-richlistitem[selected=true] .ac-url {
  color: var(--in-content-selected-text)!important
}
.ac-url,
.search-panel-input-value {
  color: var(--in-content-link-color)!important
}
.search-one-offs {
  background: var(--in-content-box-background)!important
}
.search-panel-header,
.search-panel-one-offs {
  background: var(--in-content-category-header-background)!important;
  border-top: none!important
}
.autocomplete-history-popup,
panel[type=autocomplete-richlistbox],
panel[type=autocomplete] {
  color: var(--in-content-page-color)!important;
  background: var(--in-content-box-background)!important
}
.searchbar-treebody::-moz-tree-row(hover),
popupset#mainPopupSet panel#PopupAutoCompleteRichResult .autocomplete-richlistitem:hover,
treechildren.searchbar-treebody::-moz-tree-row(hover) {
  background-color: var(--in-content-page-background)!important
}
#urlbar ::-moz-selection,
.searchbar-textbox ::-moz-selection {
  background: var(--in-content-selected-text-background)!important
}
```

## File: `css/userChrome-files/bookmarks_popup.css`

```css
#editBMPanel_folderMenuList,
#editBMPanel_foldersExpander,
#editBMPanel_rows > row > hbox > textbox,
#editBMPanel_rows > row > textbox,
#editBMPanel_tagsSelectorExpander,
#editBookmarkPanelDoneButton,
#editBookmarkPanelRemoveButton {
  -moz-appearance: none!important;
  background: var(--in-content-page-background)!important;
  color: var(--in-content-page-color)!important;
  border: 1px solid!important;
  border-color: var(--in-content-box-border-color)!important;
  box-shadow: none!important
}
#editBookmarkPanel .expander-down > .button-box > .button-icon {
  filter: invert(65%)!important
}
#editBMPanel_folderTree,
#editBMPanel_tagsSelector {
  -moz-appearance: none!important;
  background: var(--in-content-page-background)!important;
  color: var(--in-content-page-color)!important;
  opacity: 1!important
}
#editBMPanel_folderTree treechildren:not(.autocomplete-treebody)::-moz-tree-row,
#editBMPanel_tagsSelector treechildren:not(.autocomplete-treebody)::-moz-tree-row {
  background: var(--in-content-box-background)!important;
  color: var(--in-content-page-background)!important
}
#editBMPanel_folderTree treechildren:not(.autocomplete-treebody)::-moz-tree-row(hover),
#editBMPanel_tagsSelector treechildren:not(.autocomplete-treebody)::-moz-tree-row(hover) {
  background: var(--theme-selection-background-hover)!important;
  color: var(--in-content-selected-text)!important;
  -moz-border-top-colors: var(--theme-selection-background-hover)!important;
  -moz-border-right-colors: var(--theme-selection-background-hover)!important;
  -moz-border-left-colors: var(--theme-selection-background-hover)!important;
  -moz-border-bottom-colors: var(--theme-selection-background-hover)!important
}
#editBMPanel_folderTree treechildren:not(.autocomplete-treebody)::-moz-tree-cell-text(hover) {
  color: var(--in-content-selected-text)!important
}
#editBMPanel_folderTree treechildren::-moz-tree-image {
  fill: var(--in-content-page-color)!important
}
#editBMPanel_folderTree treechildren::-moz-tree-image(hover),
#editBMPanel_folderTree treechildren::-moz-tree-image(selected) {
  fill: var(--selected-icon-fill-color)!important
}
#editBMPanel_folderTree treechildren:not(.autocomplete-treebody)::-moz-tree-row(selected,current,focus) {
  background: var(--theme-selection-background)!important
}
listitem[selected=true] {
  background-color: var(--theme-selection-background)!important;
  color: var(--in-content-selected-text)!important
}
#editBMPanel_folderTree treechildren:not(.autocomplete-treebody)::-moz-tree-row(selected,current) {
  background: var(--theme-selection-background)!important
}
#editBMPanel_folderTree {
  border-color: var(--in-content-box-border-color)!important;
  border-bottom: none!important
}
#editBMPanel_newFolderBox {
  background: var(--in-content-page-background)!important;
  border-color: var(--in-content-box-border-color)!important;
  box-shadow: none!important
}
@-moz-document url(chrome://browser/content/places/bookmarkProperties.xul),
url(chrome://browser/content/places/bookmarkProperties2.xul) {
  #bookmarkproperties {
    -moz-appearance: none!important;
    color: var(--in-content-page-color)!important;
    background-color: var(--in-content-category-header-background)!important
  }
  textbox {
    -moz-appearance: none!important;
    min-height: 20px!important;
    padding: 2px!important;
    border: 1px solid var(--in-content-box-border-color);
    color: var(--in-content-page-color)!important;
    background: var(--in-content-box-background)!important
  }
  #editBMPanel_folderTree {
    background: var(--in-content-box-background)!important
  }
  #editBMPanel_folderMenuList {
    background-color: var(--in-content-box-background)!important;
    padding: 2px!important
  }
  #editBMPanel_foldersExpander.expander-down,
  #editBMPanel_tagsSelectorExpander.expander-down {
    -moz-appearance: -moz-mac-disclosure-button-closed!important;
    filter: invert(79%)!important
  }
  #editBMPanel_foldersExpander.expander-up,
  #editBMPanel_tagsSelectorExpander.expander-up {
    -moz-appearance: -moz-mac-disclosure-button-open!important;
    filter: invert(78%)!important
  }
  #editBMPanel_newFolderButton,
  .dialog-button {
    -moz-appearance: none!important;
    background: var(--in-content-page-background)!important;
    color: var(--in-content-page-color)!important;
    border: 1px solid!important;
    border-color: var(--in-content-box-border-color)!important;
    border-radius: 3px!important
  }
  .dialog-button[disabled=true] {
    opacity: .4!important
  }
  #editBMPanel_folderTree {
    border: 1px solid;
    border-radius: 3px;
    border-color: var(--in-content-box-border-color)!important
  }
  #editBMPanel_newFolderBox {
    background: 0 0!important
  }
}
```

## File: `css/userChrome-files/clear_history.css`

```css
@-moz-document url(chrome://browser/content/sanitize.xul) {
  #SanitizeDialog {
    -moz-appearance: none!important;
    background: var(--in-content-category-header-background)!important;
    color: var(--in-content-page-color)!important
  }
  .checkbox-check[checked] {
    list-style-image: url(chrome://global/skin/icons/check.svg);
    -moz-context-properties: fill;
    fill: var(--in-content-border-highlight)!important
  }
  button {
    -moz-appearance: none!important;
    background-color: var(--in-content-page-background)!important;
    border: 1px solid!important;
    border-radius: 3px!important;
    color: var(--in-content-page-color)!important;
    border-color: var(--in-content-box-border-color)!important
  }
  button:hover {
    background-color: var(--in-content-box-background)!important
  }
}
```

## File: `css/userChrome-files/common_dialog.css`

```css
@-moz-document url("chrome://global/content/commonDialog.xul") {
  #commonDialog {
    -moz-appearance: none!important;
    background: var(--in-content-page-background)!important;
    color: var(--in-content-page-color)!important
  }
}
```

## File: `css/userChrome-files/compact.css`

```css
/* Remove top & bottom margins from urlbar */
* {
  --urlbar-container-height: var(--urlbar-min-height) !important;
}
#nav-bar {
  max-height: var(--urlbar-min-height) !important;
  margin-left: 4px !important;
  margin-right: 4px !important;
}

/* Workaround for shifting URLbar on window popup */
#window-modal-dialog[open] ~ #navigator-toolbox #urlbar-container {
  margin-top: -4px !important;
}

/* Horizontal tabs */
:root[uidensity="compact"] {
  @media not (-moz-bool-pref: "sidebar.verticalTabs"),
    not -moz-pref("sidebar.verticalTabs") {
    * {
      --tab-min-height: var(--urlbar-min-height) !important;
    }
    #tabbrowser-tabs,
    #tabbrowser-tabs > #tabbrowser-arrowscrollbox,
    .tabbrowser-tabs .tabbrowser-tab {
      min-height: var(--tab-min-height) !important;
      max-height: var(--tab-min-height) !important;
    }
    .tabbrowser-tab,
    #tabs-newtab-button {
      padding: 0px !important;
    }
    .tab-background {
      margin: 0px !important;
    }
  }
}

/* Remove spaces around navbar buttons */
.toolbarbutton-1:not(#tabs-newtab-button),
.chromeclass-toolbar-additional:not(#urlbar-searchmode-switcher) {
  padding: 0px !important;
  margin: 0px !important;
}
.titlebar-spacer[type="pre-tabs"],
.titlebar-spacer[type="post-tabs"],
#vertical-spacer,
#wrapper-vertical-spacer {
  display: none !important;
}

/* Decrease padding on status URL, tooltips */
tooltip,
#statuspanel-label {
  padding: 2px !important;
}

/* Findbar */
findbar {
  padding: 0px !important;
}
.findbar-closebutton {
  margin: 0px !important;
}

```

## File: `css/userChrome-files/customization_page.css`

```css
#customization-done-button {
  color: var(--in-content-text-color);
  border-color: var(--in-content-primary-button-background)!important;
  background-color: var(--in-content-primary-button-background)!important
}
#customization-done-button:-moz-any(:focus,:active,:hover):not([disabled]) {
  background-color: var(--in-content-primary-button-background-hover)!important
}
```

## File: `css/userChrome-files/extensions.css`

```css
/*  Clean and tight extensions menu */
#unified-extensions-panel #unified-extensions-view {
  width: 100% !important; /*  For firefox v115.x */
  background-color: var(--tab-background-color) !important;
}

#unified-extensions-panel,
#unified-extensions-view {
  background-color: var(--tab-background-color) !important;
}

#unified-extensions-view {
  --uei-icon-size: 32px; /*  Change icon size */
  --firefoxcss-number-of-extensions-in-a-row: 4; /*  Increase to the number of icons you want in one row */
}

@media -moz-pref("mod.number.of.extensions.in.a.row", 10) {
  #unified-extensions-view {
    --firefoxcss-number-of-extensions-in-a-row: 10 !important;
  }
}
@media -moz-pref("mod.number.of.extensions.in.a.row", 9) {
  #unified-extensions-view {
    --firefoxcss-number-of-extensions-in-a-row: 9 !important;
  }
}
@media -moz-pref("mod.number.of.extensions.in.a.row", 8) {
  #unified-extensions-view {
    --firefoxcss-number-of-extensions-in-a-row: 8 !important;
  }
}
@media -moz-pref("mod.number.of.extensions.in.a.row", 7) {
  #unified-extensions-view {
    --firefoxcss-number-of-extensions-in-a-row: 7 !important;
  }
}
@media -moz-pref("mod.number.of.extensions.in.a.row", 6) {
  #unified-extensions-view {
    --firefoxcss-number-of-extensions-in-a-row: 6 !important;
  }
}
@media -moz-pref("mod.number.of.extensions.in.a.row", 5) {
  #unified-extensions-view {
    --firefoxcss-number-of-extensions-in-a-row: 5 !important;
  }
}
@media -moz-pref("mod.number.of.extensions.in.a.row", 3) {
  #unified-extensions-view {
    --firefoxcss-number-of-extensions-in-a-row: 3 !important;
  }
}
@media -moz-pref("mod.number.of.extensions.in.a.row", 2) {
  #unified-extensions-view {
    --firefoxcss-number-of-extensions-in-a-row: 2 !important;
  }
}
@media -moz-pref("mod.number.of.extensions.in.a.row", 1) {
  #unified-extensions-view {
    --firefoxcss-number-of-extensions-in-a-row: 1 !important;
  }
}

@media -moz-pref("mod.extensions.menu.extention-icon.size", 12) {
  #unified-extensions-view {
    --uei-icon-size: 12px !important;
  }
}
@media -moz-pref("mod.extensions.menu.extention-icon.size", 13) {
  #unified-extensions-view {
    --uei-icon-size: 13px !important;
  }
}
@media -moz-pref("mod.extensions.menu.extention-icon.size", 14) {
  #unified-extensions-view {
    --uei-icon-size: 14px !important;
  }
}
@media -moz-pref("mod.extensions.menu.extention-icon.size", 15) {
  #unified-extensions-view {
    --uei-icon-size: 15px !important;
  }
}
@media -moz-pref("mod.extensions.menu.extention-icon.size", 16) {
  #unified-extensions-view {
    --uei-icon-size: 16px !important;
  }
}
@media -moz-pref("mod.extensions.menu.extention-icon.size", 17) {
  #unified-extensions-view {
    --uei-icon-size: 17px !important;
  }
}
@media -moz-pref("mod.extensions.menu.extention-icon.size", 18) {
  #unified-extensions-view {
    --uei-icon-size: 18px !important;
  }
}
@media -moz-pref("mod.extensions.menu.extention-icon.size", 19) {
  #unified-extensions-view {
    --uei-icon-size: 19px !important;
  }
}
@media -moz-pref("mod.extensions.menu.extention-icon.size", 20) {
  #unified-extensions-view {
    --uei-icon-size: 20px !important;
  }
}
@media -moz-pref("mod.extensions.menu.extention-icon.size", 21) {
  #unified-extensions-view {
    --uei-icon-size: 21px !important;
  }
}
@media -moz-pref("mod.extensions.menu.extention-icon.size", 23) {
  #unified-extensions-view {
    --uei-icon-size: 23px !important;
  }
}
@media -moz-pref("mod.extensions.menu.extention-icon.size", 24) {
  #unified-extensions-view {
    --uei-icon-size: 24px !important;
  }
}
@media -moz-pref("mod.extensions.menu.extention-icon.size", 25) {
  #unified-extensions-view {
    --uei-icon-size: 25px !important;
  }
}
@media -moz-pref("mod.extensions.menu.extention-icon.size", 26) {
  #unified-extensions-view {
    --uei-icon-size: 26px !important;
  }
}
@media -moz-pref("mod.extensions.menu.extention-icon.size", 27) {
  #unified-extensions-view {
    --uei-icon-size: 27px !important;
  }
}
@media -moz-pref("mod.extensions.menu.extention-icon.size", 28) {
  #unified-extensions-view {
    --uei-icon-size: 28px !important;
  }
}
@media -moz-pref("mod.extensions.menu.extention-icon.size", 29) {
  #unified-extensions-view {
    --uei-icon-size: 29px !important;
  }
}
@media -moz-pref("mod.extensions.menu.extention-icon.size", 30) {
  #unified-extensions-view {
    --uei-icon-size: 30px !important;
  }
}

#unified-extensions-view .panel-header,
#unified-extensions-view .panel-header + toolbarseparator,
#unified-extensions-view .panel-subview-body + toolbarseparator,
#unified-extensions-view .unified-extensions-item-menu-button.subviewbutton,
#unified-extensions-view
  .unified-extensions-item-action-button
  .unified-extensions-item-contents {
  display: none !important;
}

#unified-extensions-view #unified-extensions-manage-extensions {
  display: none !important;
}

#unified-extensions-manage-extensions > .toolbarbutton-text {
  display: none !important;
}

#unified-extensions-manage-extensions::after {
  content: "";
  display: block;
  height: 2px; /* Thickness of your line */
  width: 50%; /* Or 100%, adjust as you like */
  margin: auto;
  background-color: light-dark(black, white); /* Auto adapted color */
  border-radius: 6px; /* Rounded ends */
  transition:
    width 0.15s ease 0.2s,
    opacity 0.15s ease 0.2s; /* 0.2s delay before expanding */
  opacity: 0.2;
}

#unified-extensions-manage-extensions:hover::after {
  width: 80%;
  transition:
    width 0.15s ease 0s,
    opacity 0.15s ease 0s; /* No delay when hovering (expanding) */
  opacity: 0.6;
}

#unified-extensions-manage-extensions:not(:hover)::after {
  width: 60%;
  transition:
    width 0.15s ease 0.15s,
    opacity 0.15s ease 0.15s; /* 0.2s delay before shrinking */
}

#unified-extensions-manage-extensions {
  min-height: 12px !important;
  margin-bottom: 4px !important;
}

#unified-extensions-view .unified-extensions-item .unified-extensions-item-icon,
#unified-extensions-view .unified-extensions-item .toolbarbutton-badge-stack {
  margin-inline-end: 0px !important;
}

#unified-extensions-view .panel-subview-body {
  padding: 4px !important;
}

#unified-extensions-view:is(panelview, #widget-overflow-fixed-list)
  .toolbaritem-combined-buttons {
  margin: 2px !important;
}

#unified-extensions-view
  .unified-extensions-item
  .unified-extensions-item-action-button {
  padding: 6px !important;
}

#unified-extensions-view #overflowed-extensions-list,
#unified-extensions-view #unified-extensions-area,
#unified-extensions-view .unified-extensions-list {
  display: grid !important;
  grid-template-columns: repeat(
    var(--firefoxcss-number-of-extensions-in-a-row),
    auto
  );
  justify-items: left !important;
  align-items: left !important;
}

#unified-extensions-view .unified-extensions-list .unified-extensions-item,
#unified-extensions-view .unified-extensions-list {
  max-width: max-content;
}

/* Line separator when "faded out" extension is present. 
     It automatically turns off if there are no faded out extensions
     present */
#unified-extensions-view
  #unified-extensions-area:has(
    + .unified-extensions-list .unified-extensions-item
  ) {
  padding-bottom: 6px !important;
  margin-bottom: 2px !important;
  border-bottom: 1px solid #aeaeae33 !important;
}

#unified-extensions-view #unified-extensions-area + .unified-extensions-list {
  display: none !important;
}

```

## File: `css/userChrome-files/findbar.css`

```css
.findbar-textbox {
  border-radius: 3px!important
}
.findbar-textbox:not([status=notfound]) {
  background-color: var(--in-content-box-background)!important;
  border-color: var(--in-content-box-border-color)!important;
  color: var(--in-content-page-color)!important
}
.browserContainer > findbar {
  border-top: 1px solid!important;
  border-color: var(--in-content-box-border-color)!important
}
.findbar-find-next,
.findbar-find-previous {
  border: none!important;
  background: 0 0!important;
  border-radius: 2px!important;
  fill: var(--in-content-page-color)!important
}
.findbar-find-previous {
  margin-left: 6px!important
}
.findbar-find-next:hover,
.findbar-find-previous:hover {
  background: var(--toolbarbutton-hover-background)!important
}
```

## File: `css/userChrome-files/iconized.css`

```css
/* Source file https://github.com/MrOtherGuy/firefox-csshacks/tree/master/chrome/iconized_main_menu.css made available under Mozilla Public License v. 2.0
See the above repository for updates as well as full license text. */

/* Adds icons to main menu items which were removed in Proton */
#appMenu-zoom-controls::before,
#appMenu-fxa-status2[fxastatus] > toolbarbutton::before,
#appMenu-protonMainView > .panel-subview-body > toolbarbutton > image,
#appMenu-mainView > .panel-subview-body > .subviewbutton > .toolbarbutton-icon {
  fill: currentColor;
  -moz-context-properties: fill;
  margin-inline: 0 8px !important;
}
#appMenu-zoom-controls::before,
#appMenu-fxa-status2[fxastatus] > toolbarbutton::before {
  display: flex;
  content: "";
  width: 16px;
  height: 16px;
}
#appMenu-new-tab-button2 {
  list-style-image: url("chrome://browser/skin/new-tab.svg");
}
#appMenu-new-window-button2 {
  list-style-image: url("chrome://browser/skin/window.svg");
}
#appMenu-new-private-window-button2 {
  list-style-image: url("chrome://browser/skin/privateBrowsing.svg");
}
#appMenu-bookmarks-button {
  list-style-image: url("chrome://browser/skin/bookmark-star-on-tray.svg");
}
#appMenu-history-button {
  list-style-image: url("chrome://browser/skin/history.svg");
}
#appMenu-downloads-button {
  list-style-image: url("chrome://browser/skin/downloads/downloads.svg");
}
#appMenu-passwords-button {
  list-style-image: url("chrome://browser/skin/login.svg");
}
#appMenu-extensions-themes-button {
  list-style-image: url("chrome://mozapps/skin/extensions/extension.svg");
}
#appMenu-print-button2 {
  list-style-image: url("chrome://global/skin/icons/print.svg");
}
#appMenu-save-file-button2 {
  list-style-image: url("chrome://browser/skin/save.svg");
}
#appMenu-find-button2 {
  list-style-image: url("chrome://global/skin/icons/search-glass.svg");
}
#appMenu-settings-button {
  list-style-image: url("chrome://global/skin/icons/settings.svg");
}
#appMenu-more-button2 {
  list-style-image: url("chrome://global/skin/icons/developer.svg");
}
#appMenu-report-broken-site-button {
  list-style-image: url("chrome://global/skin/icons/warning.svg");
}
#appMenu-help-button2 {
  list-style-image: url("chrome://global/skin/icons/info.svg");
}
#appMenu-quit-button2 {
  list-style-image: url("chrome://devtools/skin/images/search-clear.svg");
}
#appMenu-translate-button {
  list-style-image: url("chrome://browser/skin/translations.svg");
}
#appMenu-zoom-controls::before {
  background-image: url("chrome://browser/skin/fullscreen.svg");
}
/* Use account-button icon for signed in sync item */
#appMenu-fxa-status2[fxastatus] > toolbarbutton::before {
  background-image: var(--avatar-image-url);
}
/* Add somewhat hacky separator to zoom controls so it looks consistent */
#appMenu-protonMainView > .panel-subview-body::after,
#appMenu-mainView > .panel-subview-body::after {
  content: "";
  display: flex;
  border-bottom: 1px solid var(--panel-separator-color);
  margin: var(--panel-separator-margin);
}
#appMenu-translate-button ~ * {
  order: 2;
}
/* Source file https://github.com/MrOtherGuy/firefox-csshacks/tree/master/chrome/iconized_menubar_items.css made available under Mozilla Public License v. 2.0
See the above repository for updates as well as full license text. */

/* Replaces menubar items text ("File Edit etc.") with icons */

#main-menubar > menu {
  fill: currentColor;
  height: var(--uc-menubaritem-height, 28px);
  width: var(--uc-menubaritem-width, 30px);
  -moz-context-properties: fill;
  padding: 3px !important;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: var(--toolbarbutton-border-radius);
}
#main-menubar > menu > :is(.menubar-text, .menu-text) {
  display: none;
}

#file-menu {
  background-image: url("chrome://devtools/skin/images/tool-storage.svg");
}
#edit-menu {
  background-image: url("chrome://browser/skin/customize.svg");
}
#view-menu {
  background-image: url("chrome://devtools/skin/images/command-frames.svg");
}
#history-menu {
  background-image: url("chrome://browser/skin/history.svg");
}
#bookmarksMenu {
  background-image: url("chrome://browser/skin/bookmark.svg");
}
#profiles-menu {
  background-image: url("chrome://browser/skin/device-desktop.svg");
}
#tools-menu {
  background-image: url("chrome://global/skin/icons/developer.svg");
}
#helpMenu {
  background-image: url("chrome://global/skin/icons/help.svg");
}
o/* Source file https://github.com/MrOtherGuy/firefox-csshacks/tree/master/chrome/iconized_places_context_menu.css made available under Mozilla Public License v. 2.0
See the above repository for updates as well as full license text. */

/* Adds icons to menuitems in context menus of bookmarks toolbar
 * as well as bookmarks and history sidebars.
 * Note that this won't work if you have native context menus,
 * such as ones used on MacOS */

:where(#placesContext > menu:not(.menu-iconic))::before,
:where(#placesContext > menuitem:not(.menuitem-iconic))::before {
  display: flex;
  padding-inline-end: 8px;
  padding-top: 2px;
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
  content: url("chrome://browser/skin/tab.svg");
  -moz-context-properties: fill;
  fill: currentColor;
}
:where(#placesContext > menu),
:where(#placesContext > menuitem) {
  padding-inline-start: 1em !important;
}
#placesContext > menuitem[type="checkbox"]::before {
  content: url("chrome://devtools/skin/images/checkbox.svg");
}
#placesContext
  > menuitem[type="checkbox"]
  > :is(.menu-iconic-left, .menu-icon) {
  display: none;
}
#placesContext > menuitem[type="checkbox"][_moz-menuactive]::before,
#placesContext > menuitem[type="checkbox"][checked="true"]::before {
  background: no-repeat center left url("chrome://global/skin/icons/check.svg");
}
#placesContext_openBookmarkContainer\:tabs::before,
#placesContext_openBookmarkLinks\:tabs::before {
  content: url("chrome://global/skin/icons/edit-copy.svg");
}
#placesContext_open\:newtab::before {
  content: url("chrome://global/skin/icons/open-in-new.svg");
}
#placesContext_openContainer\:tabs::before,
#placesContext_openLinks\:tabs::before {
  content: url("chrome://global/skin/icons/edit-copy.svg");
}
#placesContext_open\:newwindow::before {
  content: url("chrome://browser/skin/window.svg");
}
#placesContext_open\:newprivatewindow::before {
  content: url("chrome://browser/skin/privateBrowsing.svg");
}
#placesContext_showInFolder::before,
#placesContext_new\:folder::before {
  content: url("chrome://global/skin/icons/folder.svg");
}
#placesContext_show_bookmark\:info::before,
#placesContext_show\:info::before,
#placesContext_show_folder\:info::before {
  content: url("chrome://global/skin/icons/edit.svg");
}
#placesContext_deleteFolder::before,
#placesContext_deleteBookmark::before,
#placesContext_delete::before,
#placesContext_delete_history::before {
  content: url("chrome://global/skin/icons/delete.svg");
}
#placesContext_deleteHost::before {
  content: url("chrome://browser/skin/forget.svg");
}
#placesContext_sortBy\:name::before {
  content: url("chrome://browser/skin/sort.svg");
}
#placesContext_copy::before {
  content: url("chrome://devtools/skin/images/copy.svg");
}
#placesContext_cut::before {
  content: url("chrome://browser/skin/edit-cut.svg");
}
#placesContext_paste_group::before,
#placesContext_paste::before {
  content: url("chrome://browser/skin/edit-paste.svg");
}
#placesContext_new\:bookmark::before,
#placesContext_createBookmark::before {
  content: url("chrome://browser/skin/bookmark-hollow.svg");
}
#placesContext > #toggle_PersonalToolbar::before {
  content: url("chrome://browser/skin/bookmarks-toolbar.svg");
}
#placesContext_showAllBookmarks::before {
  content: url("chrome://browser/skin/library.svg");
}
#placesContext_new\:separator::before {
  content: url("chrome://global/skin/reader/content-width-20.svg");
  transform: scale(0.85);
} /* Source file https://github.com/MrOtherGuy/firefox-csshacks/tree/master/chrome/iconized_places_context_menu.css made available under Mozilla Public License v. 2.0
See the above repository for updates as well as full license text. */

/* Adds icons to menuitems in context menus of bookmarks toolbar
 * as well as bookmarks and history sidebars.
 * Note that this won't work if you have native context menus,
 * such as ones used on MacOS */

:where(#placesContext > menu:not(.menu-iconic))::before,
:where(#placesContext > menuitem:not(.menuitem-iconic))::before {
  display: flex;
  padding-inline-end: 8px;
  padding-top: 2px;
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
  content: url("chrome://browser/skin/tab.svg");
  -moz-context-properties: fill;
  fill: currentColor;
}
:where(#placesContext > menu),
:where(#placesContext > menuitem) {
  padding-inline-start: 1em !important;
}
#placesContext > menuitem[type="checkbox"]::before {
  content: url("chrome://devtools/skin/images/checkbox.svg");
}
#placesContext
  > menuitem[type="checkbox"]
  > :is(.menu-iconic-left, .menu-icon) {
  display: none;
}
#placesContext > menuitem[type="checkbox"][_moz-menuactive]::before,
#placesContext > menuitem[type="checkbox"][checked="true"]::before {
  background: no-repeat center left url("chrome://global/skin/icons/check.svg");
}
#placesContext_openBookmarkContainer\:tabs::before,
#placesContext_openBookmarkLinks\:tabs::before {
  content: url("chrome://global/skin/icons/edit-copy.svg");
}
#placesContext_open\:newtab::before {
  content: url("chrome://global/skin/icons/open-in-new.svg");
}
#placesContext_openContainer\:tabs::before,
#placesContext_openLinks\:tabs::before {
  content: url("chrome://global/skin/icons/edit-copy.svg");
}
#placesContext_open\:newwindow::before {
  content: url("chrome://browser/skin/window.svg");
}
#placesContext_open\:newprivatewindow::before {
  content: url("chrome://browser/skin/privateBrowsing.svg");
}
#placesContext_showInFolder::before,
#placesContext_new\:folder::before {
  content: url("chrome://global/skin/icons/folder.svg");
}
#placesContext_show_bookmark\:info::before,
#placesContext_show\:info::before,
#placesContext_show_folder\:info::before {
  content: url("chrome://global/skin/icons/edit.svg");
}
#placesContext_deleteFolder::before,
#placesContext_deleteBookmark::before,
#placesContext_delete::before,
#placesContext_delete_history::before {
  content: url("chrome://global/skin/icons/delete.svg");
}
#placesContext_deleteHost::before {
  content: url("chrome://browser/skin/forget.svg");
}
#placesContext_sortBy\:name::before {
  content: url("chrome://browser/skin/sort.svg");
}
#placesContext_copy::before {
  content: url("chrome://devtools/skin/images/copy.svg");
}
#placesContext_cut::before {
  content: url("chrome://browser/skin/edit-cut.svg");
}
#placesContext_paste_group::before,
#placesContext_paste::before {
  content: url("chrome://browser/skin/edit-paste.svg");
}
#placesContext_new\:bookmark::before,
#placesContext_createBookmark::before {
  content: url("chrome://browser/skin/bookmark-hollow.svg");
}
#placesContext > #toggle_PersonalToolbar::before {
  content: url("chrome://browser/skin/bookmarks-toolbar.svg");
}
#placesContext_showAllBookmarks::before {
  content: url("chrome://browser/skin/library.svg");
}
#placesContext_new\:separator::before {
  content: url("chrome://global/skin/reader/content-width-20.svg");
  transform: scale(0.85);
}
/* Source file https://github.com/MrOtherGuy/firefox-csshacks/tree/master/chrome/iconized_tabs_context_menu.css made available under Mozilla Public License v. 2.0
See the above repository for updates as well as full license text. */

/* Adds icons to menuitems in tabs context menu.
 * Note that this won't work if you have native context menus,
 * such as ones used on MacOS */

:where(#tabContextMenu > menu:not(.menu-iconic))::before,
:where(#tabContextMenu > menuitem:not(.menuitem-iconic))::before {
  display: flex;
  padding-inline-end: 8px;
  padding-top: 2px;
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
  content: url("chrome://browser/skin/tab.svg");
  -moz-context-properties: fill;
  fill: currentColor;
}
:where(#tabContextMenu > menu),
:where(#tabContextMenu > menuitem) {
  padding-inline-start: 1em !important;
}
#tabContextMenu > menuitem[type="checkbox"]::before {
  content: url("chrome://devtools/skin/images/checkbox.svg");
}
#tabContextMenu
  > menuitem[type="checkbox"]
  > :is(.menu-iconic-left, .menu-icon) {
  display: none;
}
#tabContextMenu > menuitem[type="checkbox"][_moz-menuactive]::before,
#tabContextMenu > menuitem[type="checkbox"][checked="true"]::before {
  background: no-repeat center left url("chrome://global/skin/icons/check.svg");
}
#context_openANewTab::before {
  content: url("chrome://browser/skin/new-tab.svg");
}
#context_reloadTab::before,
#context_reloadSelectedTabs::before {
  content: url("chrome://global/skin/icons/reload.svg");
}
#context_playTab::before,
#context_playSelectedTabs::before {
  content: url("chrome://devtools/skin/images/play.svg");
}
#context_toggleMuteTab::before,
#context_toggleMuteSelectedTabs::before {
  content: url("chrome://global/skin/media/audio-muted.svg");
  transform: scale(0.85);
}
#context_toggleMuteTab[muted="true"]::before,
#context_toggleMuteSelectedTabs[muted="true"]::before {
  content: url("chrome://global/skin/media/audio.svg");
  transform: scale(0.85);
}
#context_unpinTab::before,
#context_unpinSelectedTabs::before,
#context_pinTab::before,
#context_pinSelectedTabs::before {
  content: url("chrome://browser/skin/pin-12.svg");
  transform: scale(1.15);
}
#context_duplicateTab::before,
#context_duplicateTabs::before {
  content: url("chrome://devtools/skin/images/command-always-on-top-window.svg");
}
#context_bookmarkTab::before,
#context_bookmarkSelectedTabs::before {
  content: url("chrome://browser/skin/bookmark-hollow.svg");
}
#context_sendTabToDevice::before {
  content: url("chrome://browser/skin/synced-tabs.svg");
}
#context_selectAllTabs::before {
  content: url("chrome://devtools/skin/images/tool-application.svg");
}
#context_closeTab::before,
#context_closeDuplicateTabs::before,
#context_closeTabOptions::before {
  content: url("chrome://global/skin/icons/close.svg");
}
#context_undoCloseTab::before {
  content: url("chrome://browser/skin/forget.svg");
}
#tabContextMenu > .share-tab-url-item::before {
  content: url("chrome://devtools/skin/images/diff.svg");
}
/* Source file https://github.com/MrOtherGuy/firefox-csshacks/tree/master/chrome/iconized_textbox_context_menu.css made available under Mozilla Public License v. 2.0
See the above repository for updates as well as full license text. */

/* Adds icons to menuitems in textbox context menus, such as urlbar and searchbar.
 * Note that this won't work if you have native context menus,
 * such as ones used on MacOS */

:where(.textbox-contextmenu > menu:not(.menu-iconic))::before,
:where(.textbox-contextmenu > menuitem:not(.menuitem-iconic))::before {
  display: flex;
  padding-inline-end: 8px;
  padding-top: 2px;
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
  content: url("chrome://browser/skin/tab.svg");
  -moz-context-properties: fill;
  fill: currentColor;
}
:where(.textbox-contextmenu > menu),
:where(.textbox-contextmenu > menuitem) {
  padding-inline-start: 1em !important;
}
.textbox-contextmenu > menuitem[type="checkbox"]::before {
  content: url("chrome://devtools/skin/images/checkbox.svg");
}
.textbox-contextmenu
  > menuitem[type="checkbox"]
  > :is(.menu-iconic-left, .menu-icon) {
  display: none;
}
.textbox-contextmenu > [data-l10n-id="text-action-undo"]::before,
.textbox-contextmenu > [data-l10n-id="text-action-redo"]::before {
  content: url("chrome://global/skin/icons/undo.svg");
}
.textbox-contextmenu > [data-l10n-id="text-action-redo"]::before {
  transform-box: content-box;
  transform: scaleX(-1);
}
.textbox-contextmenu > [data-l10n-id="text-action-copy"]::before {
  content: url("chrome://global/skin/icons/edit-copy.svg");
}
.textbox-contextmenu > [data-l10n-id="text-action-strip-on-share"]::before {
  content: url("chrome://devtools/skin/images/command-always-on-top-window.svg");
}
.textbox-contextmenu > [data-l10n-id="text-action-cut"]::before {
  content: url("chrome://browser/skin/edit-cut.svg");
}
.textbox-contextmenu > [data-l10n-id="text-action-paste"]::before {
  content: url("chrome://browser/skin/edit-paste.svg");
}
.textbox-contextmenu > #paste-and-go::before {
  content: url("chrome://browser/skin/edit-paste.svg");
}
.textbox-contextmenu > .searchbar-paste-and-search::before {
  content: url("chrome://global/skin/icons/search-glass.svg");
}
.textbox-contextmenu > [data-l10n-id="text-action-delete"]::before {
  content: url("chrome://global/skin/icons/delete.svg");
}
.textbox-contextmenu > [data-l10n-id="text-action-select-all"]::before {
  content: url("chrome://global/skin/reader/character-spacing-20.svg");
  transform: scale(0.85);
}
/* Source file https://github.com/MrOtherGuy/firefox-csshacks/tree/master/chrome/iconized_content_context_menu.css made available under Mozilla Public License v. 2.0
See the above repository for updates as well as full license text. */

/* Adds icons to menuitems in web content area context menu.
 * Note that this won't work if you have native context menus,
 * such as ones used on MacOS */

:where(#contentAreaContextMenu > menu:not(.menu-iconic))::before,
:where(#contentAreaContextMenu > menuitem:not(.menuitem-iconic))::before {
  display: flex;
  padding-inline-end: 8px;
  padding-top: 2px;
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
  content: url("chrome://browser/skin/tab.svg");
  -moz-context-properties: fill;
  fill: currentColor;
}
:where(#contentAreaContextMenu > menu),
:where(#contentAreaContextMenu > menuitem) {
  padding-inline-start: 1em !important;
}
#contentAreaContextMenu > menuitem[type="checkbox"]::before {
  content: url("chrome://devtools/skin/images/checkbox.svg");
}
#contentAreaContextMenu
  > menuitem[type="checkbox"]
  > :is(.menu-iconic-left, .menu-icon) {
  display: none;
}
#contentAreaContextMenu > menuitem[type="checkbox"][_moz-menuactive]::before,
#contentAreaContextMenu > menuitem[type="checkbox"][checked="true"]::before {
  background: no-repeat center left url("chrome://global/skin/icons/check.svg");
}
#contentAreaContextMenu > :is(.menu-iconic, .menuitem-iconic)::before {
  content: none;
}
:where(#context-sep-navigation) ~ menuitem::before {
  content: url("chrome://devtools/skin/images/tool-dom.svg");
}
:where(#context-sep-viewsource-commands) ~ menuitem::before {
  content: url("chrome://browser/skin/translations.svg");
}
:where(#spell-suggestions-separator) ~ menuitem::before {
  content: url("chrome://browser/skin/new-tab.svg");
}
:where(#context-sep-open) ~ menuitem::before {
  content: url("chrome://browser/skin/bookmark-star-on-tray.svg");
}
:where(#context-savelinktopocket) ~ menuitem::before {
  content: url("chrome://global/skin/icons/edit-copy.svg");
}
:where(#context-sep-copylink) ~ menuitem::before {
  content: url("chrome://devtools/skin/images/play.svg");
}
:where(#context-media-sep-commands) ~ menuitem::before {
  content: url("chrome://browser/skin/canvas.svg");
}
:where(#context-sep-sharing) ~ menuitem::before {
  content: url("chrome://browser/skin/login.svg");
}
:where(#passwordmgr-items-separator) ~ menuitem::before {
  content: url("chrome://global/skin/icons/edit.svg");
}
:where(#context-sep-screenshots) ~ menuitem::before {
  content: url("chrome://global/skin/icons/search-glass.svg");
}
/* Individual items below */
#context-openlink::before {
  content: url("chrome://browser/skin/window.svg");
}
#context-openlinkprivate::before {
  content: url("chrome://browser/skin/privateBrowsing.svg");
}
#context-savelinktopocket::before {
  content: url("chrome://global/skin/icons/pocket-outline.svg");
}
#context-copylink::before,
#context-stripOnShareLink::before,
#context-copyaudiourl::before,
#context-copyvideourl::before {
  content: url("chrome://global/skin/icons/link.svg");
}
#context-saveaudio::before,
#context-saveimage::before,
#context-savelink::before,
#context-savevideo::before,
#context-savepage::before {
  content: url("chrome://browser/skin/save.svg");
}
#context-pocket::before {
  content: url("chrome://global/skin/icons/pocket.svg");
}
#contentAreaContextMenu > #fill-login::before {
  content: url("chrome://browser/skin/login.svg");
}
#use-relay-mask::before {
  content: url("chrome://browser/skin/preferences/relay-logo.svg");
  transform: scale(0.85);
}
#context-copy::before,
#context-pdfjs-copy::before {
  content: url("chrome://global/skin/icons/edit-copy.svg");
}
#context-cut::before,
#context-pdfjs-cut::before {
  content: url("chrome://browser/skin/edit-cut.svg");
}
#context-paste-no-formatting::before,
#context-paste::before,
#context-pdfjs-paste::before {
  content: url("chrome://browser/skin/edit-paste.svg");
}
#context-delete::before,
#context-pdfjs-delete::before {
  content: url("chrome://global/skin/icons/delete.svg");
}
#context-video-saveimage::before,
#context-take-screenshot::before {
  content: url("chrome://devtools/skin/images/command-screenshot.svg");
}
#context-sendpagetodevice::before,
#context-sendlinktodevice::before {
  content: url("chrome://browser/skin/synced-tabs.svg");
}
#context-media-play::before {
  content: url("chrome://devtools/skin/images/play.svg");
}
#context-media-pause::before {
  content: url("chrome://devtools/skin/images/pause.svg");
}
#context-media-mute::before {
  content: url("chrome://global/skin/media/audio-muted.svg");
  transform: scale(0.85);
}
#context-media-unmute::before {
  content: url("chrome://global/skin/media/audio.svg");
  transform: scale(0.85);
}
#context-media-hidecontrols::before,
#context-media-showcontrols::before {
  content: url("chrome://devtools/skin/images/dock-bottom.svg");
}
#context-media-loop::before {
  content: url("chrome://browser/skin/notification-icons/autoplay-media.svg");
}
#context-leave-dom-fullscreen::before {
  content: url("chrome://browser/skin/fullscreen-exit.svg");
}
#context-video-fullscreen::before {
  content: url("chrome://browser/skin/fullscreen.svg");
}
#context-video-pictureinpicture::before {
  content: url("chrome://global/skin/media/picture-in-picture-open.svg");
}
#context-media-playbackrate::before {
  content: url("chrome://global/skin/icons/performance.svg");
}
#context-sendimage::before,
#context-sendvideo::before,
#context-sendaudio::before {
  content: url("chrome://browser/skin/mail.svg");
}
#context-undo::before,
#context-pdfjs-undo::before,
#context-redo::before,
#context-pdfjs-redo::before {
  content: url("chrome://global/skin/icons/undo.svg");
}
#context-redo::before,
#context-pdfjs-redo::before {
  transform-box: content-box;
  transform: scaleX(-1);
}
#context-selectall::before,
#context-pdfjs-selectall::before,
#context-pdfjs-highlight-selection::before {
  content: url("chrome://global/skin/reader/character-spacing-20.svg");
  transform: scale(0.85);
}
#context-reveal-password::before {
  -moz-context-properties: fill, stroke;
  stroke: currentColor;
  content: url("chrome://devtools/skin/images/eye-opened.svg");
}
#context-print-selection::before {
  content: url("chrome://global/skin/icons/print.svg");
}
#context-translate-selection::before,
#spell-check-enabled::before,
#spell-add-dictionaries-main::before,
#spell-dictionaries::before {
  content: url("chrome://browser/skin/translations.svg");
}
#context-ask-chat::before {
  content: url("chrome://global/skin/icons/highlights.svg");
}
#context-bidi-text-direction-toggle::before,
#context-bidi-page-direction-toggle::before {
  content: url("chrome://devtools/skin/images/command-bidi.svg");
}
#context-viewpartialsource-selection::before,
#context-viewsource::before {
  content: url("chrome://browser/skin/characterEncoding.svg");
}
#context-inspect-a11y::before {
  content: url("chrome://devtools/skin/images/accessibility.svg");
}
#context-inspect::before {
  content: url("chrome://devtools/skin/images/open-inspector.svg");
}

```

## File: `css/userChrome-files/navbar.css`

```css
@-moz-document url-prefix(chrome://)
{
  #nav-bar {
    padding: 0 6px !important;
  }
  
  .browser-toolbar.titlebar-color:-moz-lwtheme-brighttext,
  .tab-background:not([selected]):-moz-lwtheme-brighttext {
    background-color: var(--tab-background-color) !important;
    color: var(--tab-color) !important;
    padding-left: 5px !important;
    padding-right: 5px !important;
  }
  
  /* Match tabs toolbar background color */
  .chromeclass-toolbar-additional,
  #addonbar {
    background-color: var(--tab-background-color) !important;
  }
  
  @media screen and (-moz-os-version: windows-win7) {
    window {
      background-color: var(--tone-9) !important;
      color: var(--in-content-page-color) !important;
    }
  }
}


```

## File: `css/userChrome-files/navbar_menus.css`

```css
:root {
  --tab-loading-fill: var(--in-content-category-text-selected)!important
}
.tab-throbber::before {
  fill: var(--in-content-category-text-selected)!important;
  opacity: 1!important
}
.panel-arrow {
  filter: invert(70%)!important
}
#appMenu-zoomReset-button,
.panel-subview-body {
  color: var(--in-content-selected-text)!important;
  background: var(--in-content-box-background)!important
}
.panel-subview-footer,
[class^=PanelUI-] {
  color: var(--in-content-selected-text)!important;
  background: var(--in-content-page-background)!important
}
#BMB_bookmarksPopup .popup-internal-box {
  background-color: var(--in-content-box-background)!important
}
.popup-internal-box > autorepeatbutton {
  -moz-appearance: none!important;
  background-color: var(--in-content-page-background)!important
}
.popup-internal-box > .autorepeatbutton-down > .autorepeatbutton-icon,
.popup-internal-box > .autorepeatbutton-up > .autorepeatbutton-icon {
  filter: invert(40%)!important
}
/*! webextension popup fix */
.webextension-popup-browser {
  background: #fff!important
}
photonpanelmultiview panelview {
  background: 0 0!important;
  color: var(--in-content-page-color)!important
}
#emptyDownloads {
  background: var(--in-content-box-background)!important;
  color: var(--in-content-page-color)!important
}
#downloadsFooterButtons {
  background: var(--in-content-page-color)!important;
  color: var(--in-content-page-color)!important
}
#downloadsFooter[showingsummary] > stack:not(:hover),
.downloadsPanelFooterButton {
  background-color: var(--in-content-category-header-background)!important
}
#downloadsListBox {
  background: var(--in-content-page-background)!important
}
#appMenu-mainView toolbarbutton:hover,
#customizationui-widget-multiview toolbarbutton:hover,
#widget-overflow-list toolbarbutton:hover {
  background: var(--in-content-category-header-background)!important
}
#BMB_bookmarksPopup {
  background: 0 0!important
}
#identity-popup-securityView {
  background: var(--in-content-box-background)!important
}
#identity-popup-multiView > .panel-viewcontainer > .panel-viewstack > .panel-subviews {
  background: var(--in-content-box-border-color)!important
}
.identity-popup-expander[panel-multiview-anchor] {
  background-color: var(--in-content-primary-button-background)!important;
  fill: var(--in-content-text-color)!important
}
#identity-popup-mainView {
  background: var(--in-content-box-background)!important;
  color: var(--in-content-page-color)!important
}
#identity-popup[connection^=secure] .identity-popup-security-content {
  fill: var(--in-content-category-text-selected)!important
}
#identity-popup-permissions-content {
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjQsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxkZWZzPg0KCTxmaWx0ZXIgaWQ9IkFkb2JlX09wYWNpdHlNYXNrRmlsdGVyIiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjAiIHk9IjAiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+DQoJCTxmZUNvbG9yTWF0cml4ICB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMSAwIDAgMCAwICAwIDEgMCAwIDAgIDAgMCAxIDAgMCAgMCAwIDAgMSAwIi8+DQoJPC9maWx0ZXI+DQo8L2RlZnM+DQo8bWFzayBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGlkPSJtYXNrLXBlcm1pc3Npb25zIj4NCgk8cGF0aCBmaWxsPSIjRkZGRkZGIiBmaWx0ZXI9InVybCgjQWRvYmVfT3BhY2l0eU1hc2tGaWx0ZXIpIiBkPSJNMiwxaDIwYzEuMSwwLDIsMC45LDIsMnYxOGMwLDEuMS0wLjksMi0yLDJIMmMtMS4xLDAtMi0wLjktMi0yVjMNCgkJQzAsMS45LDAuOSwxLDIsMXoiLz4NCgk8cGF0aCBkPSJNMTIsM2g5YzAuNiwwLDEsMC40LDEsMXYxNmMwLDAuNi0wLjQsMS0xLDFoLTlWM3oiLz4NCgk8cGF0aCBkPSJNNS41LDEyLjVsMi43LTMuN0M4LjQsOC41LDguOCw4LjUsOSw4LjdsMC43LDAuNWMwLjIsMC4yLDAuMiwwLjUsMCwwLjdMNS44LDE1Yy0wLjIsMC4yLTAuNSwwLjMtMC44LDAuMUwyLjgsMTIuOQ0KCQljLTAuMi0wLjItMC4yLTAuNSwwLTAuN2wwLjgtMC44YzAuMi0wLjIsMC41LTAuMiwwLjcsMEw1LjUsMTIuNXoiLz4NCgkNCgkJPHJlY3QgeD0iMTYuMzM1IiB5PSI4LjQ4NSIgdHJhbnNmb3JtPSJtYXRyaXgoLTAuNzA3MyAwLjcwNjkgLTAuNzA2OSAtMC43MDczIDM3LjU5MiA4LjUwNTEpIiBmaWxsPSIjRkZGRkZGIiB3aWR0aD0iMS40IiBoZWlnaHQ9IjcuMTAxIi8+DQoJDQoJCTxyZWN0IHg9IjE2LjMzNSIgeT0iOC40MTUiIHRyYW5zZm9ybT0ibWF0cml4KDAuNzA2OCAwLjcwNzUgLTAuNzA3NSAwLjcwNjggMTMuNDYwMiAtOC41NDI5KSIgZmlsbD0iI0ZGRkZGRiIgd2lkdGg9IjEuNCIgaGVpZ2h0PSI3LjEiLz4NCjwvbWFzaz4NCjxyZWN0IGlkPSJwZXJtaXNzaW9ucyIgbWFzaz0idXJsKCNtYXNrLXBlcm1pc3Npb25zKSIgZmlsbD0iI0IxQjFCMyIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ii8+DQo8L3N2Zz4NCg==)!important
}
.identity-popup-security-content {
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjQsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxkZWZzPg0KCTxmaWx0ZXIgaWQ9IkFkb2JlX09wYWNpdHlNYXNrRmlsdGVyIiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjAiIHk9IjAiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+DQoJCTxmZUNvbG9yTWF0cml4ICB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMSAwIDAgMCAwICAwIDEgMCAwIDAgIDAgMCAxIDAgMCAgMCAwIDAgMSAwIi8+DQoJPC9maWx0ZXI+DQo8L2RlZnM+DQo8bWFzayBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGlkPSJtYXNrLWdsb2JlIj4NCgk8Y2lyY2xlIGZpbGw9IiNGRkZGRkYiIGZpbHRlcj0idXJsKCNBZG9iZV9PcGFjaXR5TWFza0ZpbHRlcikiIGN4PSIxMiIgY3k9IjEyIiByPSIxMSIvPg0KCTxwYXRoIGQ9Ik05LjQxNywzLjkyNGMtMC4wMjctMC4wMDEtMC4wNTcsMC0wLjA4MywwLjAxMUM5LjMyOCwzLjkzOCw5LjMyLDMuOTQzLDkuMzE0LDMuOTUxYzAuMDA5LDAsMC4wMiwwLDAuMDI3LTAuMDAxDQoJCUM5LjM2OSwzLjk0Myw5LjM5LDMuOTI1LDkuNDE3LDMuOTI0TDkuNDE3LDMuOTI0TDkuNDE3LDMuOTI0eiBNOS40NTEsNS4yMjdjMC4wMzQtMC4wNDQtMC4wNDgtMC4wODEtMC4wOTUtMC4wNzcNCgkJYzAuMDEyLTAuMDUzLDAuMDgtMC4wODEsMC4wNjItMC4xNDdjLTAuMDE3LTAuMDctMC4xMDEtMC4wNTYtMC4xNDYtMC4wMThDOS4yMzIsNS4wMTksOS4yMTEsNS4wOCw5LjE3Niw1LjEyMQ0KCQljLTAuMDE5LDAuMDIyLTAuMDU1LDAuMDMtMC4wNjksMC4wNThDOS4wOTYsNS4yMDQsOS4xMSw1LjI0OCw5LjEwOSw1LjI3NmMwLjA1NiwwLjAwOCwwLjExNC0wLjAwOSwwLjE1NS0wLjA0OGwwLjAyNy0wLjAxMg0KCQlDOS4yODUsNS4yMjEsOS4yODEsNS4yMzEsOS4yNzgsNS4yMzdDOS4zMDYsNS4yNzEsOS40MjUsNS4yNjEsOS40NTEsNS4yMjdMOS40NTEsNS4yMjdMOS40NTEsNS4yMjd6IE05LjUwOCwzLjM2Ng0KCQlDOS41MDUsMy40NDcsOS41ODQsMy40NTcsOS42NDMsMy40ODhDOS42MjUsMy41MzYsOS41NjEsMy41MzQsOS41MywzLjU3MkM5LjQ5NSwzLjYxOSw5LjU2MSwzLjY2LDkuNTkzLDMuNjgxDQoJCWMwLjA2NSwwLjA0LDAuMDI5LDAuMDg1LDAuMDE3LDAuMTQxQzkuNTkyLDMuOTAxLDkuNzYyLDMuODgsOS43OTksMy44NzhjMC4wNjQtMC4wMDMsMC4xNjcsMC4wMDcsMC4yMjgtMC4wMjMNCgkJYzAuMDY2LTAuMDM3LDAuMTAxLTAuMTE3LDAuMTY5LTAuMTU2YzAuMDU3LTAuMDMzLDAuMTM4LTAuMDUyLDAuMjAxLTAuMDI5YzAuMDY2LDAuMDIzLDAuMDU5LDAuMTA4LDAuMTEyLDAuMTQ0DQoJCWMwLjA2MywwLjA0NCwwLjEzMiwwLjA1OCwwLjE4Ni0wLjAwN2MwLjAzNS0wLjA0MSwwLjExMS0wLjA5MywwLjExNC0wLjEzN2MwLjAwNi0wLjA3NywwLjAyOC0wLjEzOCwwLjExNC0wLjE1NQ0KCQljMC4wNjktMC4wMTQsMC4wNTQsMC4wNTMsMC4xMDIsMC4wNjVjMC4xMDYsMC4wMjcsMC4xNTgtMC4yOTcsMC4yNzMtMC4yMDJjMC4wMjcsMC4wMjIsMC4wMzUsMC4xMSwwLjA4MSwwLjEwMw0KCQljMC4wNDgtMC4wMDgsMC4wNS0wLjA3NywwLjEwMS0wLjA3OWMwLjAxNywwLjA0Ny0wLjA4OCwwLjEwNS0wLjEwMiwwLjE1NmMwLjA2NC0wLjA1MywwLjA5Ni0wLjA0NSwwLjE2OS0wLjA1Mw0KCQljMC4wMiwwLjA1LTAuMTI1LDAuMTMyLTAuMTYyLDAuMTM5Yy0wLjA1MiwwLjAxNC0wLjA4NC0wLjAxNy0wLjEyNSwwLjAxMmMtMC4wMzEsMC4wMjEtMC4wNzUsMC4wMi0wLjExMiwwLjAyMw0KCQljLTAuMDUyLDAuMDA2LTAuMTUxLDAuMDc2LTAuMTUsMC4xMzNjMCwwLjAyMywwLjAxOCwwLjA3NC0wLjAwMSwwLjA5M2MtMC4wMTgsMC4wMi0wLjA2MiwwLjAwMS0wLjA2Ni0wLjAxOQ0KCQljLTAuMDQ1LDAuMDY3LTAuMTA0LTAuMDUtMC4xNDEsMC4wNDRjMC4wNiwwLjAxNiwwLjExNSwwLjA3MywwLjE4MywwLjA5YzAuMDY2LDAuMDE3LDAuMTMyLDAuMDMzLDAuMTk2LDAuMDUxDQoJCWMwLjEwOSwwLjAzNCwwLjI3My0wLjA5OSwwLjM1Ny0wLjE2MmMwLjA4LTAuMDU5LDAuMTgtMC4xOTMsMC4yMDEtMC4yODhjMC4wMjQtMC4xMDUsMC4xMzgtMC4yMjUsMC4xMTQtMC4zMjgNCgkJYy0wLjAyMS0wLjA5Ny0wLjAzNi0wLjE0MywwLjA3NC0wLjE3OGMwLjA0Ni0wLjAxNSwwLjE1OS0wLjAzOSwwLjE3NS0wLjA5MmMwLjAyNC0wLjA3OS0wLjIyMy0wLjA1OC0wLjI2MS0wLjA3Ng0KCQljLTAuMTI1LTAuMDU2LTAuMTc5LTAuMTE5LTAuMzIzLTAuMDYyYy0wLjA3NSwwLjAyOS0wLjE0OCwwLjA1My0wLjIyNywwLjA3NEMxMS4yNCwyLjk3MywxMS4yLDIuOTc2LDExLjE3NywzLjAxMQ0KCQljLTAuMDA5LDAuMDE0LTAuMDIxLDAuMDI0LTAuMDM2LDAuMDMyYy0wLjA2NCwwLjAyNiwwLjAxNS0wLjA5NywwLjAyMi0wLjEwNGMwLjAyMS0wLjAyNCwwLjA1NS0wLjA5OS0wLjAxMi0wLjA4Mg0KCQljLTAuMDk5LDAuMDIzLTAuMTcxLDAuMTc0LTAuMjc3LDAuMTgyYy0wLjA4MSwwLjAwNi0wLjA1Ni0wLjA2NS0wLjAzNS0wLjEwNmMwLjA0MS0wLjA3NC0wLjA3NS0wLjA4My0wLjEyNi0wLjA4Mw0KCQljLTAuMDcyLDAtMC4xMjYsMC4wNDEtMC4xOTUsMC4wNDhjLTAuMDY0LDAuMDA2LTAuMTQsMC4wMTgtMC4yMDQsMC4wMTdjLTAuMTI5LTAuMDA0LTAuMjE0LDAuMDcxLTAuMzQyLDAuMDI5DQoJCUM5LjgzOCwyLjg5OCw5LjY5MiwzLjAxMSw5LjU2MiwzLjAyNkM5LjUxOSwzLjAzMiw5LjQ1NiwzLjAyMyw5LjQzOCwzLjA3NGMtMC4wMTUsMC4wNDIsMCwwLjEwOCwwLjAzMywwLjE0bDAuMDEtMC4wMDkNCgkJQzkuNDUzLDMuMjMzLDkuNDUsMy4yNzQsOS40MDcsMy4yOWMtMC4wNCwwLjAxNC0wLjA4MSwwLjA2Ny0wLjEwMiwwLjEwNEM5LjI4OSwzLjQyLDkuMjQzLDMuNTM0LDkuMzIzLDMuNDc1DQoJCUM5LjM4MiwzLjQzMSw5LjQxNSwzLjM0OSw5LjUwOCwzLjM2Nkw5LjUwOCwzLjM2Nkw5LjUwOCwzLjM2NnogTTQuNjU0LDEwLjU0N2MtMC4xMzgtMC4xLTAuNDUyLTAuMTI0LTAuNDEzLTAuMzU4DQoJCWMwLjAyNC0wLjE0MywwLjE3MS0wLjI1MywwLjI5LTAuMzIzYzAuMTU2LTAuMDkxLDAuMzMtMC4wOTQsMC41MDUtMC4wNzljMC4wNDIsMC4wMDUsMC4xMjItMC4wMDMsMC4xNDQsMC4wMw0KCQljMC4wMTIsMC4wMTcsMC4wMzYsMC4wMjcsMC4wNTUsMC4wMzRjMC4wNDcsMC4wMTQsMC4wOTUsMC4wMTUsMC4xNDMsMC4wMjRjMC4wNzIsMC4wMTQsMC4xMjMsMC4wNzYsMC4xOTUsMC4wMjQNCgkJQzUuNjU2LDkuODQyLDUuNjY5LDkuODMsNS43Nyw5Ljg0MkM1Ljg2LDkuODUzLDUuOTE0LDkuNzg0LDUuOTg5LDkuNzljMC4wMjQsMC4wMDIsMC4wNDUsMC4wMDYsMC4wNjMsMC4wMTQNCgkJQzYuMDYsOS43NzgsNi4wNyw5Ljc1NSw2LjA4Niw5Ljc1MWMwLjAzOC0wLjAxMSwwLjEyLDAuMDgsMC4xNTksMC4wODhDNi4zNDUsOS44Niw2LjMzOCw5Ljc5LDYuMzQ2LDkuNzE5DQoJCWMwLjA0OS0wLjAwOSwwLjA3MywwLjA2LDAuMTE4LDAuMDE3QzYuNDYzLDkuNzQ5LDYuNDcyLDkuNzcxLDYuNDcyLDkuNzg0QzYuNDgxLDkuNzksNi40OTIsOS43OSw2LjUsOS43ODMNCgkJYzAuMDA0LTAuMDA4LDAuMDA2LTAuMDE1LDAuMDAzLTAuMDI0QzYuNTI3LDkuNzY2LDYuNTQsOS43NDksNi41NDIsOS43MjFjMC4wMTgsMC4wMDEsMC4wNDYtMC4wMDksMC4wNjQtMC4wMDYNCgkJYzAuMDE0LTAuMDUxLDAuMDQzLTAuMTIsMC4wMDYtMC4xNjdjMC4wMDktMC4wMDEsMC4wMTktMC4wMDQsMC4wMy0wLjAwNmMwLTAuMDUyLDAuMDM1LTAuMDc0LDAuMDM2LTAuMTE1DQoJCUM2LjYyNSw5LjQxOCw2LjU2NSw5LjQyMiw2LjUxLDkuNDIzYzAuMDMzLTAuMDMsMC4xMTItMC4wOTcsMC4xMi0wLjEzOGMwLjAxNS0wLjA3My0wLjA4LTAuMTE3LTAuMDcyLTAuMjAzDQoJCWMwLjAwOSwwLjA0NSwwLjA2LDAuMTUsMC4xMDgsMC4xNjVDNi43NzMsOS4yODQsNi43NDIsOS4xNzYsNi43NSw5LjEyYzAuMDI3LTAuMTc3LDAuMTg2LTAuMDMsMC4xODksMC4wNjINCgkJYzAuMDQ2LTAuMTA2LDAuMTYyLDAuMDEyLDAuMTA5LDAuMTAzQzcuMDIyLDkuMzI5LDYuOTg4LDkuMzEyLDcuMDIsOS4zN2MwLjAyMiwwLjA0MSwwLjA1NiwwLjA0MiwwLjEwNCwwLjAzMg0KCQljMC4wMTItMC4wMjQsMC4wMjItMC4wNTEsMC4wMjItMC4wOGMwLjA4My0wLjAyNiwwLjEzNywwLjA3MywwLjA4OCwwLjEzMmMwLjA2Mi0wLjAzNCwwLjEyNS0wLjA2NSwwLjE5LTAuMDgyDQoJCWMtMC4wMzktMC4xMzYtMC4wNzktMC4yNy0wLjA1NC0wLjQxNmMwLjAwNi0wLjAzMiwwLjAxLTAuMDY4LDAuMDM0LTAuMDkzYzAuMDMtMC4wMzItMC4wMDctMC4wMi0wLjAxLTAuMDQxDQoJCUM3LjM4Niw4Ljc1OSw3LjQ1Myw4LjY5NCw3LjQ3OSw4LjYzNmMtMC4wNy0wLjAxNS0wLjAwNi0wLjE1NSwwLjA0MS0wLjE3OUM3LjU3LDguNDMxLDcuNzIsOC40NzQsNy43Myw4LjQzMw0KCQljMC4wMywwLjAxNywwLjA1OSwwLjA0MSwwLjA5NSwwLjA0MWMwLjA4MywwLjAwMSwwLjEzOCwwLjAwMywwLjE5NSwwLjA3YzAuMDI4LDAuMDM1LDAuMDcsMC4xMTIsMC4xMjIsMC4xMTgNCgkJYy0wLjAwMSwwLjA1OCwwLjA2NCwwLjEtMC4wMDQsMC4xNDlDOC4wODMsOC44NDgsOC4wMDgsOC44MzksNy45ODUsOC45MTJDNy45NzEsOC45NTgsNy45MjcsOC45NzksNy45OTMsOS4wMTENCgkJYzAuMDI4LDAuMDE1LDAuMDY0LDAuMDE4LDAuMDk2LDAuMDE4YzAuMDA4LDAuMDQ0LDAuMDMsMC4xMDMsMC4wODcsMC4wOTZjMC4xMTEtMC4wMTQsMC4xMzUtMC4xNTMsMC4yMjQtMC4yDQoJCWMwLjE0NC0wLjA3NiwwLjEyMiwwLjI1MSwwLjI0NiwwLjE3YzAuMDMtMC4wMiwwLjAzLTAuMTA0LDAuMDQ1LTAuMTM1YzAuMDMtMC4wNjYsMC4wNjQtMC4xMzUsMC4xMDgtMC4xOTQNCgkJQzguODU0LDguNjg5LDguOTIzLDguNjEsOC44OTksOC41MTJDOC44ODYsOC40NTcsOC43OCw4LjQzNSw4LjczMiw4LjM5NkM4LjY3NSw4LjM1LDguNjIsOC4yOTksOC41ODUsOC4yMzQNCgkJYy0wLjAyMS0wLjA0LTAuMDMzLTAuMDUzLDAtMC4wNzNjMC4wMi0wLjAxLDAuMDE0LTAuMDMyLDAuMDA2LTAuMDQ3QzguNTU2LDguMDM5LDguNDU4LDcuOTAzLDguNTk1LDcuODU2DQoJCWMwLjAzLTAuMDExLDAuMDkzLTAuMTA3LDAuMDk3LTAuMTQ2QzguNyw3LjY0Nyw4LjYwNCw3LjU4OSw4LjY0Nyw3LjUyNmMwLjAzMi0wLjA0NywwLjExMS0wLjA3OCwwLjE1MS0wLjEyNQ0KCQljMC4wMi0wLjAyMiwwLjA0Mi0wLjA0MiwwLjA3Mi0wLjA0OEM4Ljg3Miw3LjMyNyw4Ljg3OCw3LjI5OCw4LjksNy4yODJjMC4wMzYtMC4wMjcsMC4wOTMtMC4wMTQsMC4xMzUtMC4wMjcNCgkJYzAuMDY5LTAuMDIxLDAuMDk5LTAuMDkzLDAuMTUzLTAuMTMyYzAuMDQ1LTAuMDM0LDAuMDk2LTAuMDIxLDAuMTQ0LTAuMDQ1YzAuMDI1LTAuMDEyLDAuMDM2LTAuMDQsMC4wNjItMC4wNTINCgkJYzAuMDYzLTAuMDMsMC4xMzUsMC4wMTgsMC4xNjQsMC4wNzFDOS42MjUsNy4yMjQsOS43MDksNy40MjEsOS45MDEsNy4zN2MwLjA3OC0wLjAyMSwwLjEzNy0wLjA4NSwwLjE2MS0wLjE1OA0KCQljMC4wMjItMC4wNy0wLjAwNC0wLjEyNywwLTAuMTk2YzAuMDA2LTAuMTIxLDAuMTI1LTAuMTk5LDAuMTM4LTAuMzE4Yy0wLjA5LDAuMDAxLTAuMDQzLTAuMDU1LTAuMDczLTAuMTA2DQoJCWMtMC4wMzMtMC4wNTgtMC4xMDgtMC4wMTYtMC4xNTgtMC4wMjRjMC4wNTEtMC4xMjMsMC4wNTEtMC4xNjYtMC4wNjktMC4yMjVDOS44NDcsNi4zMTcsOS43Niw2LjE5Niw5LjcyLDYuMg0KCQljMC4wMzMtMC4wNDUsMC4xMTEsMC4wMywwLjEzNSwwLjA1MmMwLjA1MywwLjA1LDAuMDk5LDAuMDczLDAuMTcyLDAuMDc5Yy0wLjAyMS0wLjAzMi0wLjAzMS0wLjA4OS0wLjAxOC0wLjEyNg0KCQljMC4wMTQtMC4wMzMtMC4wMi0wLjA2OC0wLjAxNi0wLjExYzAuMDg0LDAuMTA3LDAuMDcsMC4yMywwLjExOCwwLjM0OWMwLjAyLDAuMDUsMC4wNjksMC4wODMsMC4wOSwwLjEzNQ0KCQljMC4wMjcsMC4wNjUsMC4wMDksMC4wNjMsMC4wNjYsMC4xMDNjMC4wMzQsMC4wMjQsMC4wNDYsMC4wNjYsMC4wNTIsMC4xMDRjMC4wMTEsMC4wNjcsMC4wMzUsMC4wMzgsMC4wNzEsMC4wNzYNCgkJYzAuMDIxLDAuMDIzLDAuMDc1LDAuMDI2LDAuMDY0LDAuMDczYy0wLjAwOCwwLjAzMy0wLjAzLDAuMDYxLTAuMDM1LDAuMDk1Yy0wLjAxNCwwLjEsMC4xODMtMC4wMzYsMC4yMDMtMC4wNQ0KCQljMC4wNDItMC4wMzIsMC4xMTEtMC4wMzgsMC4xNDQtMC4wNzZjMC4wMzQtMC4wMzksMC4wMjctMC4wOTcsMC4wNjMtMC4xMzNjMC4wNDUtMC4wNDcsMC4wODgtMC4wMTUsMC4xNDMtMC4wMjQNCgkJYzAuMDYzLTAuMDA5LDAuMTE3LTAuMDU5LDAuMTYzLTAuMDk3YzAuMDk5LTAuMDgzLDAuMTYyLTAuMTc1LDAuMjQ1LTAuMjdjLTAuMDM2LDAuMDA5LTAuMTU5LDAuMDk5LTAuMTY3LDAuMDE1DQoJCWMtMC4wNDYsMC0wLjE1NC0wLjAwOC0wLjE3MS0wLjA1OWMtMC4wMTQtMC4wMzgtMC4wMDktMC4wODEtMC4wMDktMC4xMTljLTAuMDAxLTAuMDQxLTAuMDUxLTAuMDI3LTAuMDg0LTAuMDQ4DQoJCWMtMC4wNjYtMC4wNDItMC4wOTktMC4xMjItMC4xNjktMC4xNThjLTAuMTEyLTAuMDU5LTAuMTgtMC4xNTUtMC4yNDgtMC4yNTZjLTAuMDM5LTAuMDU5LTAuMTc3LTAuMTc5LTAuMTY2LTAuMjUNCgkJYzAuMDA2LTAuMDQ3LDAuMDQ1LTAuMDk3LDAuMDQyLTAuMTQ0Yy0wLjAwMi0wLjA0Mi0wLjAzNS0wLjA2NS0wLjAzLTAuMTEyYzAuMDA0LTAuMDU0LTAuMTI3LTAuMTUtMC4wMTItMC4xNjENCgkJYzAuMDM2LTAuMDAzLDAuMDQyLTAuMDQ3LDAuMDgyLTAuMDcxYzAuMDQ1LTAuMDI3LDAuMDM1LTAuMDUxLDAuMDg0LTAuMDM4YzAuMDgsMC4wMjQsMC4xMzUtMC4wNjQsMC4xODktMC4xMTENCgkJYzAuMDkzLTAuMDgyLTAuMDU2LTAuMDgzLTAuMDYzLTAuMTQ2Yy0wLjAwOC0wLjA2Mi0wLjA0NC0wLjEwOC0wLjA1NC0wLjE4MWMtMC4wMDYtMC4wNTMtMC4wNTYtMC4wMzItMC4wODQtMC4wMTgNCgkJYy0wLjAzOSwwLjAxOC0wLjA3OC0wLjAwOS0wLjExNi0wLjAxN2MtMC4wMzQtMC4wMDgtMC4wNjMtMC4wNjUtMC4xMDUtMC4wNDdjLTAuMDMxLDAuMDE1LTAuMDMsMC4wNTMtMC4wNzUsMC4wNDkNCgkJYy0wLjAzMy0wLjAwMy0wLjA1NC0wLjAzNS0wLjA4Ny0wLjA0MWMtMC4wNTEtMC4wMDYtMC4wMDYsMC4wNDItMC4wNjMsMC4wNDdjLTAuMDQxLDAuMDAzLTAuMTcxLTAuMDUyLTAuMTc0LDANCgkJQzkuODYsNC40NDQsOS44NDQsNC41NjIsOS44LDQuNTc0Yy0wLjA0OCwwLjAxNC0wLjA5OSwwLjAwMS0wLjE0NywwLjAyYy0wLjEwNSwwLjA0Mi0wLjA3LDAuMTQ3LDAuMDMsMC4xNjQNCgkJQzkuNzY1LDQuNzcsOS42Niw0LjgyNiw5LjY4Nyw0Ljg4MUM5LjcxLDQuOTI5LDkuNzE4LDQuOTYzLDkuNzcxLDQuOTgyYzAuMDg3LDAuMDMyLDAuMTgsMC4wNTgsMC4xNSwwLjE3DQoJCWMtMC4wMzksMC4xNC0wLjEzNiwwLjI3MS0wLjI3MywwLjMzNUM5LjUxNyw1LjU0OCw5LjQ4MSw1LjM4Myw5LjM4Miw1LjM0QzkuMzIsNS4zMTQsOS4yNTEsNS4zMjQsOS4xODcsNS4zMzENCgkJQzkuMTc2LDUuMzQ4LDkuMjc3LDUuMzgsOS4yOTMsNS40MDljMC4wMywwLjA1OS0wLjA1MiwwLjA1MS0wLjA1OSwwLjA5N0M5LjIyOSw1LjU0Myw5LjE4LDUuNTcxLDkuMjA3LDUuNjA5DQoJCUM5LjE3OCw1LjU3NCw5LjEyMyw1LjYyMSw5LjEwMyw1LjY0MmMtMC4wMjgsMC4wMy0wLjAyMiwwLjA1LTAuMDExLDAuMDg4QzkuMTE3LDUuODA4LDksNS44ODgsOC45MzEsNS44NzkNCgkJQzguODcyLDUuODcsOC44MTYsNS44NzQsOC43NjEsNS44NDdDOC42OTUsNS44MTUsOC43MTcsNS44MzUsOC43MDQsNS43NkM4LjY5LDUuNjksOC41OTUsNS42Niw4LjY1MSw1LjU3NA0KCQlDOC42OTIsNS41MSw4LjY3Miw1LjUxNiw4LjY2NSw1LjQ1NmMtMC4wMDktMC4wNjMsMC4wMi0wLjA3MywwLjA3LTAuMDgyYzAuMDU2LTAuMDEsMC4wOC0wLjEwOSwwLjExMy0wLjE1Ng0KCQljMC4wMDctMC4wMSwwLjA0Mi0wLjA5OS0wLjAxMi0wLjA3NmMtMC4wMywwLjAxNC0wLjAwNywwLjA1Mi0wLjA1NCwwLjA1OEM4Ljc0OSw1LjIwNSw4LjcxNiw1LjE4Myw4LjY4Miw1LjE4Mw0KCQljLTAuMDM5LDAtMC4wOCwwLjAyLTAuMTE2LTAuMDA0YzAuMDE4LTAuMDIxLDAuMTQ3LTAuMTI3LDAuMDQ1LTAuMTQ5QzguNTcsNS4wMjEsOC42MDQsNS4wODcsOC41NDksNS4wNzgNCgkJQzguNTM5LDUuMTMxLDguNDc1LDUuMTI2LDguNDQzLDUuMTZjMC4wMTQtMC4wNTYsMC4xMzItMC4wOTksMC4wOTMtMC4xNDRDOC42MjIsNC45NDEsOC42NCw0LjkyOCw4LjUyNCw0Ljg4Nw0KCQlDOC4zNDIsNC44MjMsOC4zNTYsNC42MzcsOC40OCw0LjUyNGMwLjExNC0wLjEwMywwLjMwMi0wLjIzNCwwLjQxMy0wLjA2MmMwLjExOSwwLjE4NCwwLjE5MywwLjA1LDAuMjkxLTAuMDY4DQoJCUM5LjE1MSw0LjM4LDkuMTgxLDQuMzcxLDkuMTcsNC4zM0M5LjA2Miw0LjM3NCw4Ljk2Niw0LjIzNSw5LjA0LDQuMTUxQzkuMDg1LDQuMTAxLDkuMTU0LDQuMTE1LDkuMjE0LDQuMQ0KCQljMC4wNTMtMC4wMTQsMC4xMDEtMC4wNjUsMC4xMjMtMC4xMTRDOS4yOTIsMy45OTgsOS4yOTgsMy45NzEsOS4zMTQsMy45NTFjLTAuMDI3LTAuMDAzLTAuMDU3LTAuMDE1LTAuMDgtMC4wMjMNCgkJQzkuMTcsMy45MDUsOS4xNzUsMy44NTUsOS4xMDYsMy44NDZDOC45NDIsMy44MjIsOS4yNzcsMy42MzQsOS4xMTMsMy42MzRjLTAuMDUyLTAuMDAxLTAuMDk5LTAuMDgtMC4xMzgtMC4wNjUNCgkJQzguOTQ4LDMuNTgsOC45NDEsMy42MDEsOC45MDgsMy41ODdjLTAuMDIyLTAuMDA5LTAuMDUtMC4wMjktMC4wNzctMC4wMTRDOC43NzMsMy42MSw4Ljc2MSwzLjU2Niw4LjcwNCwzLjU4Mw0KCQlDOC42NTgsMy41OTgsOC42MzIsMy42NDMsOC41NzgsMy42MzFjMC4wNTQtMC4wNzMsMC4xMi0wLjEzMywwLjE2OC0wLjIwOWMwLjAzMS0wLjA1MiwwLjA3LTAuMDk5LDAuMTIzLTAuMTMxDQoJCWMwLjAyOC0wLjAxNywwLjEwOS0wLjAzMywwLjExNC0wLjA3M0M4Ljk5LDMuMTUzLDguOTUsMy4xNTksOC45MDUsMy4xODVjLTAuMTE3LDAuMDctMC4yMzgsMC4xNDQtMC4zNTIsMC4yMTgNCgkJQzguNDgzLDMuNDQ3LDguNDMsMy40ODUsOC4zNDQsMy40NzNjLTAuMDY2LTAuMDEtMC4wOTMsMC4wNjItMC4xNDYsMC4wNTZDOC4xNzMsMy40MjgsNy42MSwzLjc5Niw3LjU0MiwzLjgyOA0KCQlDNy40MzIsMy44NzcsNy4zMDksMy45Niw3LjE5MiwzLjk4OWMtMC4wNDgsMC4wMTItMC4xNDgsMC4xMjUtMC4xNDMsMEM2Ljk5LDMuOTgxLDYuOTQ0LDQuMDQyLDYuOTA0LDQuMDcyDQoJCUM2Ljg0Nyw0LjExNiw2Ljc3OSw0LjE0NCw2LjcxOCw0LjE4MkM2LjU4Niw0LjI2Nyw2LjQ2MSw0LjM2OCw2LjMzOCw0LjQ2NEM2LjIyMiw0LjU1NSw2LjEwNCw0LjY2MSw1Ljk4MSw0Ljc0Mw0KCQlDNS45MzksNC43NzEsNS43ODUsNC44NTEsNS43OSw0LjkxYzAuMTA5LDAuMDIxLDAuNDgzLTAuNDQ2LDAuNTg4LTAuMzJjMC4wMjcsMC4wMzItMC4xNTksMC4xMjYtMC4xODksMC4xNDQNCgkJQzYuMTYzLDQuNzQ3LDYuMTMzLDQuNzQ2LDYuMTA3LDQuNzU5Yy0wLjAzMywwLjAyLTAuMDU0LDAuMDUzLTAuMDg1LDAuMDc1QzUuOTM4LDQuODg3LDUuODY4LDQuOTU1LDUuODA2LDUuMDMxDQoJCUM1Ljc2Myw1LjA4Nyw1LjczMSw1LjE2LDUuNjgzLDUuMjExQzUuNjksNS4xNTcsNS42OCw1LjExNyw1LjY4Miw1LjA2NEM1LjYyLDUuMTA0LDUuNTk1LDUuMTcsNS41MDksNS4xNTINCgkJQzUuNDMxLDUuMTM0LDUuMzcsNS4yMTMsNS4zMTQsNS4yNTVDNS4xODUsNS4zNTQsNS4wOTgsNS40NjMsNC45OSw1LjU3OUM0LjkzLDUuNjQ0LDQuODY2LDUuNjg5LDQuODI4LDUuNzcNCgkJQzQuNzg4LDUuODU2LDQuNzMsNS45MzMsNC42NzgsNi4wMTRDNC41NzgsNi4xNjEsNC40NjIsNi4yOTYsNC4zNjMsNi40NDNDNC4xNjEsNi43NDUsNC4wMjcsNy4wOSwzLjg2LDcuNDEyDQoJCUMzLjc3NSw3LjU3OSwzLjY5Miw3Ljc0MywzLjY1OCw3LjkyOUMzLjYyOCw4LjA5LDMuNjI2LDguMjU0LDMuNjI5LDguNDE3YzAuMDkyLTAuMDcxLDAuMDg3LDAuMDc4LDAuMDYzLDAuMTIyDQoJCUMzLjY1OCw4LjYwNywzLjY0NSw4LjY4NSwzLjYzNCw4Ljc2QzMuNjE5LDguODU5LDMuNjAxLDguOTU4LDMuNjAxLDkuMDU4YzAsMC4wODUtMC4wMjcsMC4xNjQtMC4wMjgsMC4yNDYNCgkJQzMuNTQxLDkuMjc5LDMuNjA4LDkuMTc2LDMuNTQ4LDkuMTkxQzMuNTE5LDkuMTk5LDMuNTE3LDkuMjQzLDMuNTEsOS4yNjZDMy40ODUsOS4zNDQsMy4zNzksOS4zMzcsMy4zNjMsOS40MjYNCgkJYy0wLjAwOSwwLjA1NS0wLjAxNSwwLjA4Ni0wLjA1MSwwLjEzQzMuMjgzLDkuNTksMy4zMSw5LjYwNSwzLjMxNiw5LjYzOUMzLjMzLDkuNzE3LDMuMjI4LDkuODI3LDMuMjU0LDkuODkNCgkJYzAuMDI2LDAuMDYyLDAuMDA4LDAuMTMyLDAuMDM2LDAuMTkxYzAuMDE1LDAuMDMsMC4wNDksMC4wNywwLjAzNiwwLjEwN2MtMC4wNjQsMC4wMTIsMC4wMTgsMC4xNjEsMC4wMjQsMC4yMDcNCgkJYzAuMDA5LDAuMDc0LDAuMDc1LDAuMzA4LDAuMTQ3LDAuMzQxYzAuMDksMC4xMzgsMC4yMTMsMC4zMzEsMC4zNzIsMC40YzAuMTEyLDAuMDQ4LDAuMTUzLTAuMDk3LDAuMjE2LTAuMTU4DQoJCWMwLjA4LTAuMDc5LDAuMTgzLTAuMTI5LDAuMjg4LTAuMTY2QzQuNDYyLDEwLjc4Miw0LjgzMywxMC42NzQsNC42NTQsMTAuNTQ3TDQuNjU0LDEwLjU0N0w0LjY1NCwxMC41NDd6IE00LjgxLDE1LjUyOQ0KCQljMC4wMTgtMC4wMywwLjAwNC0wLjEwNy0wLjAyOC0wLjEzM2MtMC4wOC0wLjA2Ny0wLjExMSwwLjA5LTAuMDYsMC4xMzdDNC43NDEsMTUuNTg0LDQuNzg4LDE1LjU2Nyw0LjgxLDE1LjUyOUw0LjgxLDE1LjUyOQ0KCQlMNC44MSwxNS41Mjl6IE01LjEzNiwxMC45NDNjLTAuMDIyLTAuMDItMC4wMzktMC4wMDctMC4wNDEtMC4wNDhjMC4wMDEtMC4wMzcsMC4wMDQtMC4xMDYtMC4wNDMtMC4wNjINCgkJYy0wLjAxNCwwLjAwNSwwLjAwNCwwLjAxMi0wLjAxNSwwLjAyYy0wLjAxNCwwLjAwNC0wLjAyNC0wLjAwNi0wLjAzMy0wLjAxMWMtMC4wMjUtMC4wMTEtMC4wNDEtMC4wMTItMC4wNiwwLjAxNQ0KCQljLTAuMDEzLDAuMDE4LTAuMDEzLDAuMDQtMC4wMzYsMC4wNTVsLTAuMDM5LDAuMDE0Yy0wLjAxNCwwLjAwNC0wLjA1MywwLjAzMi0wLjA1NCwwLjA0N2MtMC4wMDYsMC4wMjMsMC4wMjksMC4wNCwwLjA1MywwLjA0NQ0KCQljMC4wMiwwLjAxNCwwLjA0NSwwLjAyNiwwLjA2NCwwLjA0czAuMDUxLDAuMDM4LDAuMDc1LDAuMDQ0YzAuMDU0LDAuMDMsMC4xMzgsMC4wNjQsMC4xOCwwYzAuMDEyLTAuMDI0LDAuMDIxLTAuMDQyLDAuMDA0LTAuMDYzDQoJCWMtMC4wMTUtMC4wMjMtMC4wMzktMC4wMjktMC4wNDYtMC4wNDdDNS4xMzksMTAuOTcsNS4xNTUsMTAuOTU4LDUuMTM2LDEwLjk0M0w1LjEzNiwxMC45NDNMNS4xMzYsMTAuOTQzeiBNMTIuMzQ5LDEyLjA4OA0KCQljLTAuMDI5LDAuMDAxLTAuMDgsMC4wMi0wLjEwMiwwLjA0Yy0wLjA0NSwwLjA0LDAuMDUxLDAuMDYyLDAuMDg4LDAuMDczYzAuMDQyLDAuMDI0LDAuMTAyLDAuMDM3LDAuMTQzLDAuMDYxDQoJCWMwLjAzNSwwLjAyNiwwLjA1OSwwLjA2MSwwLjA5NywwLjA3OGMwLjA0OCwwLjAyMiwwLjExNCwwLjAzMywwLjE2NywwLjA0N2MwLjAyMiwwLjAwOCwwLjA1NywwLjAwNiwwLjA4NywwLjAxMg0KCQljMC4wMzIsMC4wMiwwLjA0OCwwLjA1LDAuMDc1LDAuMDcxYzAuMDQ2LDAuMDQzLDAuMTEyLDAuMDUzLDAuMTc0LDAuMDVjMC4wNTksMC4wMDcsMC4xMDIsMC4wMTcsMC4xNTQsMC4wMDMNCgkJYzAuMDYxLTAuMDE1LDAuMTAyLDAuMDE2LDAuMTU4LDAuMDE2YzAuMDIxLDAsMC4wNDUtMC4wMTksMC4wNjUtMC4wMThjMC4wMjgsMCwwLjAzMSwwLjAxMywwLjA0NSwwLjAzNw0KCQljMC4wMjQsMC4wMzUsMC4wODUsMC4wODgsMC4xMjksMC4wOWMwLjAyNiwwLDAuMDQ4LTAuMDA1LDAuMDcsMC4wMDNjMC4wMjYsMC4wMTUsMC4wMzYsMC4wMTUsMC4wNTQsMC4wMw0KCQljMC4wMzIsMC4wMTQsMC4wNTksMC4wMjIsMC4wNzIsMC4wNDdjMC4wMjQsMC4wNDMsMC4wMjMsMC4wOSwwLjA2MSwwLjEyM2MwLjAyNSwwLjAyLDAuMDUzLDAuMDQxLDAuMDc5LDAuMDYxDQoJCWMwLjAxOSwwLjAxNywwLjAwMywwLjAxNCwwLjAzLDAuMDE0YzAuMDE1LDAuMDAzLDAuMDQzLDAuMDAzLDAuMDYyLTAuMDAzYzAuMDc1LTAuMDA1LDAuMDM1LTAuMTEsMC4wMTEtMC4xNDYNCgkJYy0wLjAxNS0wLjAzMS0wLjAyOC0wLjA1NS0wLjAyMi0wLjA4NGMwLjAwNC0wLjAzNSwwLjAyMS0wLjA1OS0wLjAwMi0wLjA4OGMtMC4wMTItMC4wMTgtMC4wMjctMC4wMjctMC4wNDUtMC4wMzYNCgkJYy0wLjAwOS0wLjAxMy0wLjAxNC0wLjAyNC0wLjAyMy0wLjA0MmMtMC4wMjItMC4wMjktMC4wNjYtMC4wMzktMC4wOTUtMC4wNjZjLTAuMDQ4LTAuMDQ4LTAuMDczLTAuMTE4LTAuMTM1LTAuMTY0DQoJCWMtMC4wMzMtMC4wMi0wLjA2My0wLjAwNS0wLjEwNC0wLjAyMWMtMC4wMTctMC4wMTEtMC4wMjUtMC4wMjEtMC4wNS0wLjAyOWMtMC4wMjItMC4wMDctMC4wNDItMC4wMDMtMC4wNjItMC4wMDQNCgkJYy0wLjA0NC0wLjAwMy0wLjA4Mi0wLjA0MS0wLjEyMy0wLjAzOGMtMC4wNDcsMC4wMDYtMC4wNTYsMC4wNTYtMC4wODMsMC4wODNjLTAuMDI0LDAuMDItMC4wNTEsMC4wMi0wLjA2LTAuMDEyDQoJCWMtMC4wMDQtMC4wNDEsMC4wMTItMC4wNjUsMC4wMzMtMC4wOTFjMC4wMzMtMC4wMzUsMC0wLjA1NS0wLjA0NC0wLjA1OGMtMC4wNTYsMC0wLjA2NSwwLjA0NC0wLjA4OSwwLjA5MQ0KCQljLTAuMDM1LDAuMDUtMC4wNTksMC4wMTUtMC4xMDksMC4wMDhjLTAuMDM0LDAuMDAxLTAuMDU5LDAuMDE1LTAuMDkyLDAuMDAxYy0wLjAyMS0wLjAwOC0wLjAyNi0wLjAyNi0wLjA0My0wLjAzNw0KCQljLTAuMDI1LTAuMDE0LTAuMDQ1LTAuMDA5LTAuMDYyLDAuMDAzYy0wLjAyNSwwLjAwNi0wLjAyNSwwLjAwNi0wLjA1MS0wLjAwOGMtMC4wMjMtMC4wMDktMC4wMjktMC4wMjctMC4wNTgtMC4wMzMNCgkJYy0wLjA0NS0wLjAwOS0wLjA5MiwwLjAyOS0wLjEyOSwwLjAxOGMtMC4wMTctMC4wMDktMC4wMy0wLjAzMy0wLjA1My0wLjA0MWMtMC4wMjUtMC4wMTUtMC4wMjEtMC4wMDEtMC4wMzgsMC4wMTcNCgkJYy0wLjAyNywwLjAyNy0wLjA2NywwLjAzNy0wLjA5NCwwLjAxNUMxMi40MDMsMTIuMTM3LDEyLjQsMTIuMDk2LDEyLjM0OSwxMi4wODhMMTIuMzQ5LDEyLjA4OEwxMi4zNDksMTIuMDg4eiBNMTQuMDYyLDEzLjg4MQ0KCQljMC4wMjMtMC4wMDMsMC4wMzUtMC4wMjcsMC4wNTctMC4wMjRjMC4wMjMtMC4wMDUsMC4wMTIsMC4wMiwwLjAyOCwwLjAzNGMwLjAxNSwwLjAxNCwwLjAzLDAuMDE0LDAuMDQ1LDAuMDE0DQoJCWMwLjAyNiwwLjAwNiwwLjA3OSwwLjAwOCwwLjA5LTAuMDE2YzAuMDEzLTAuMDM4LTAuMDUxLTAuMDQ2LTAuMDY3LTAuMDc2Yy0wLjAxNi0wLjA0NCwwLjAyLTAuMDg2LDAuMDMxLTAuMTI1DQoJCWMwLjAxOS0wLjA1MS0wLjA0Ny0wLjA3NC0wLjA0LTAuMTE1Yy0wLjAwMS0wLjA0MywwLjAyOC0wLjA1OSwwLjAyLTAuMTAyYy0wLjAwOC0wLjAzMS0wLjAzNC0wLjA2Ni0wLjA1NC0wLjA4OQ0KCQljLTAuMDE5LTAuMDI0LTAuMDUzLTAuMDQ3LTAuMDUtMC4wODJjMC4wMDMtMC4wMzYsMC4wNjktMC4wMzQsMC4wMzctMC4wNzljLTAuMDE4LTAuMDM3LTAuMDY1LTAuMDMtMC4xMDktMC4wMzYNCgkJYy0wLjAxNSwwLTAuMDMsMC4wMDEtMC4wNDUtMC4wMTRjLTAuMDE0LTAuMDIxLTAuMDA3LTAuMDMyLTAuMDA3LTAuMDQ3Yy0wLjAxLTAuMDQxLTAuMDQxLTAuMDU2LTAuMDc3LTAuMDczDQoJCWMtMC4wMTMtMC4wMDYtMC4wMy0wLjAxNC0wLjAzOC0wLjAzMWMtMC4wMDYtMC4wMTksMC4wMTMtMC4wMjQsMC4wMDctMC4wNDFjLTAuMDItMC4wMzktMC4wOTIsMC4wMTYtMC4xMjIsMC4wMDINCgkJYy0wLjAyMS0wLjAwNC0wLjAxOC0wLjAyMy0wLjAzMS0wLjA0NUwxMy43LDEyLjkxOWMtMC4wNS0wLjAyMi0wLjA2OSwwLjAxOS0wLjA2LDAuMDZjMC4wMjIsMC4wOTIsMC4wOSwwLjE1MiwwLjA4MiwwLjI0Ng0KCQljMC4wMDUsMC4wMzcsMC4wMTEsMC4wNTYsMC4wMjQsMC4wOWMwLjAxMiwwLjA1MSwwLjAyNSwwLjA3NCwwLjAwMywwLjEyM2MtMC4wMzYsMC4wMjctMC4wMDMsMC4wNjEsMC4wMDksMC4wOTYNCgkJYzAuMDA4LDAuMDQ3LDAuMDIsMC4wODQsMC4wMTksMC4xMzRjLTAuMDEsMC4wOTEtMC4wMzgsMC4xODEtMC4wMywwLjI3MmMwLjAwNSwwLjAzOCwwLjAwMSwwLjA3MywwLjAxNSwwLjEwOQ0KCQljMC4wMDYsMC4wNDcsMC4wNDQsMC4wNjQsMC4wODIsMC4wOWMwLjAzOCwwLjAzMSwwLjIxMiwwLjEzNywwLjE2MSwwLjAwOWMtMC4wMTUtMC4wMjgtMC4wMzktMC4wNjktMC4wNDYtMC4xMDMNCgkJYy0wLjAxMy0wLjAzNSwwLjAyOS0wLjA2LDAuMDMxLTAuMDk2YzAuMDA2LTAuMDQxLTAuMDI1LTAuMDU1LDAuMDMzLTAuMDY1QzE0LjAzNSwxMy44NzUsMTQuMDUzLDEzLjg4NCwxNC4wNjIsMTMuODgxDQoJCUwxNC4wNjIsMTMuODgxTDE0LjA2MiwxMy44ODF6IE0xMi4yNTMsMi45NTJjMC4wNDYtMC4wMTEsMC4wOTMsMC4wMDMsMC4xMzctMC4wMTRjMC4wMjItMC4wMDksMC4wOTYtMC4wMzUsMC4wOTEtMC4wNjUNCgkJYy0wLjAwNy0wLjA1Ni0wLjI0Ni0wLjAyLTAuMjg1LTAuMDAzYy0wLjAxMiwwLjAzNSwwLjAyNCwwLjA2MiwwLjA1NiwwLjA3MUMxMi4yNTEsMi45NDQsMTIuMjUzLDIuOTQ4LDEyLjI1MywyLjk1MkwxMi4yNTMsMi45NTINCgkJTDEyLjI1MywyLjk1MnogTTEzLjM5OCwxMy4wOTZjLTAuMDA4LTAuMDIxLDAtMC4wMzksMC0wLjA1OWMtMC4wMDQtMC4wMzEtMC4wMTQtMC4wNDEtMC4wMDgtMC4wNzQNCgkJYzAuMDEtMC4wMTgsMC4wMS0wLjA0NywwLjAwNi0wLjA2OWMtMC4wMS0wLjAxOS0wLjAyNC0wLjAzNC0wLjAzOC0wLjA0OGMwLTAuMDA4LTAuMDA1LTAuMDIzLTAuMDE1LTAuMDMzDQoJCWMtMC4wMTktMC4wMTgtMC4wMzcsMC4wMS0wLjA1NywwLjAxOWMtMC4wMTYsMC4wMTQtMC4wNDQsMC4wMjItMC4wNDksMC4wMzhjLTAuMDE1LDAuMDIyLTAuMDA2LDAuMDQxLTAuMDA2LDAuMDYxbDAuMDA0LDAuMDIzDQoJCWMtMC4wMzIsMC4wMzMtMC4wMDEsMC4xMjEtMC4wMDYsMC4xNTRjMCwwLjAzNy0wLjA1NCwwLjE0NSwwLjAxOSwwLjExMWMwLjAyLTAuMDA4LDAuMDM0LTAuMDIxLDAuMDUyLTAuMDMxDQoJCWMwLjAyNC0wLjAxNCwwLjA1NS0wLjAxNCwwLjA4My0wLjAyMmMwLjAwOSwwLDAuMDYyLTAuMDA1LDAuMDYyLTAuMDE0QzEzLjQ0NywxMy4xMzEsMTMuNDAzLDEzLjExNywxMy4zOTgsMTMuMDk2TDEzLjM5OCwxMy4wOTYNCgkJTDEzLjM5OCwxMy4wOTZ6IE0xMi4wNDQsMTUuMDEyYzAuMDYsMC4wMjksMC4xNjUtMC4wMjgsMC4yMjItMC4wNDdjMC4wNzItMC4wMjIsMC4xODYtMC4wOTgsMC4yNTktMC4wNTYNCgkJYzAuMDMxLDAuMDE3LDAuMDQ1LDAuMDUyLDAuMDc3LDAuMDY1YzAuMDM5LDAuMDE2LDAuMDg1LDAuMDAxLDAuMTI0LTAuMDA4YzAuMDQxLTAuMDEsMC4wODgtMC4wMTYsMC4xMjUtMC4wMzMNCgkJYzAuMDMzLTAuMDE4LDAuMDU0LTAuMDQ1LDAuMDgyLTAuMDY1YzAuMDc0LTAuMDU2LDAuMTM3LTAuMDAzLDAuMjE4LTAuMDE1YzAuMDQ2LTAuMDA3LDAuMDktMC4wMjksMC4xMzYtMC4wNDENCgkJYzAuMDMyLTAuMDA4LDAuMDkxLTAuMDA4LDAuMTE2LTAuMDMyYzAuMDI4LTAuMDI3LDAuMDE1LTAuMDg3LDAuMDE1LTAuMTIyYy0wLjAwMS0wLjA0NywwLjAwMi0wLjA5Ni0wLjAxNS0wLjEzOQ0KCQljLTAuMDMyLTAuMDg3LTAuMTUzLTAuMTg4LTAuMDI4LTAuMjU3YzAuMDIzLTAuMTUxLTAuMTUzLTAuMTI2LTAuMjA0LTAuMjM1Yy0wLjAzMy0wLjA3LTAuMDQ0LTAuMTI1LTAuMTM4LTAuMTMzDQoJCWMtMC4wOC0wLjAwOC0wLjEyOCwwLjAzNS0wLjE5NywwLjA2MmMtMC4wNzgsMC4wMjgtMC4xMzgsMC4wMDItMC4yMDUtMC4wMzVjLTAuMDQxLTAuMDIzLTAuMTI2LTAuMDc2LTAuMTQzLTAuMDA2DQoJCWMtMC4wMTUsMC4wNjEsMC4wNDMsMC4xMTktMC4wMDQsMC4xNzRjLTAuMDQyLDAuMDQ5LTAuMTE1LDAuMDctMC4xNzUsMC4wODRjLTAuMTMxLDAuMDI3LTAuMjM0LDAuMTI3LTAuMzI5LDAuMjEzbDAuMDEsMC4wMQ0KCQljLTAuMDM3LTAuMDAyLTAuMDkzLDAuMDk5LTAuMDk0LDAuMTI5YzAuMDE1LDAuMDA0LDAuMDI4LDAuMDA5LDAuMDQ1LDAuMDE0Yy0wLjAwMSwwLjA1MSwwLjA1NywwLjAxNywwLjA2Mi0wLjAyDQoJCWMwLjAxMiwwLjAwMywwLjAyNCwwLjAxLDAuMDM2LDAuMDEyYzAuMDEsMC4wMDMsMC4wMzMsMC4wMDIsMC4wNDIsMC4wMDZjMC4wMjUsMC4wMTEsMC4wMywwLjAzNSwwLjA2MiwwLjAzOA0KCQljLTAuMDE4LDAuMDc5LTAuMDAxLDAuMTYzLTAuMDM5LDAuMjM3QzEyLjA3OSwxNC44NTcsMTEuOTU4LDE0Ljk3LDEyLjA0NCwxNS4wMTJMMTIuMDQ0LDE1LjAxMkwxMi4wNDQsMTUuMDEyeiBNMTIuNjY0LDMuMzQ2DQoJCWMwLjA0NSwwLjA0OSwwLjEwMSwwLjA2MiwwLjA5LDAuMTM4YzAuMDU3LDAuMDA3LDAuMDkzLDAuMDI5LDAuMTI2LTAuMDJjMC4wMjEtMC4wMzEsMC4wNTMtMC4wNTUsMC4wODctMC4wNjcNCgkJYzAuMDQyLTAuMDE3LDAuMjE1LTAuMDE1LDAuMjA3LDAuMDU2Yy0wLjAwNCwwLjAzNS0wLjAyNSwwLjA2NS0wLjAzMSwwLjFjLTAuMDA4LDAuMDQ4LDAuMDQ1LDAuMDE0LDAuMDY3LDAuMDI2DQoJCWMtMC4wMjUsMC4wMTgtMC4wNTgsMC4wMjktMC4wODksMC4wMzZjMC4wMTQsMC4wMDksMC4wMjMsMC4wMjEsMC4wMjQsMC4wMzdjLTAuMDM5LDAuMDA5LTAuMDU5LDAuMTE4LTAuMTI4LDAuMTQNCgkJYy0wLjA0MSwwLjAxNC0wLjEwNC0wLjAxNi0wLjE0NS0wLjAyYy0wLjA1MS0wLjAwNi0wLjA4OC0wLjAyMS0wLjEzNy0wLjAyNGMtMC4wNDktMC4wMDMtMC4wMS0wLjA2Ni0wLjA2OS0wLjA1NA0KCQljLTAuMDExLDAuMDQyLDAuMDExLDAuMTUsMC4wMTksMC4xOTJjMC4wMDcsMC4wNTMsMC4wNTIsMC4wODMsMC4xMDQsMC4wOTNjMC4wNzMsMC4wMTIsMC4xMDgsMC4wMzYsMC4xNzEsMC4wNzMNCgkJYzAuMDQ5LDAuMDI3LDAuMTA1LDAuMDEsMC4xNTksMC4wMTVjMC4wMzYsMC4wMDMsMC4wNjUsMC4wMTcsMC4wOTMsMC4wMzljLTAuMDA2LDAuMDE3LTAuMDIsMC4wNDQtMC4wMSwwLjA2Mg0KCQljMC4wMSwwLjAyNCwwLjA4Ni0wLjAwMywwLjEwNC0wLjAwNGMwLjA1NC0wLjAwNiwwLjEwNC0wLjA2NSwwLjE1NS0wLjA1OGMwLjAyLDAuMDAzLDAuMTA5LDAuMDMxLDAuMTA1LDAuMDUzDQoJCWMtMC4wNDgtMC4wMi0wLjA4LDAuMDQtMC4xMTcsMC4wMDhjLTAuMDMzLTAuMDI5LTAuMTIxLTAuMDA1LTAuMDY0LDAuMDM2YzAuMDA1LDAuMDA1LDAuMDIsMC4xMTksMC4wMiwwLjEzDQoJCWMtMC4wMDQsMC4wNDItMC4wODEsMC4wODgtMC4wNzQsMC4xMTVjMC4wMSwwLjAwMiwwLjA3OSwwLjAwNiwwLjA5NCwwLjAyYzAuMDA1LTAuMDE4LTAuMDA5LTAuMDI2LDAuMDMzLTAuMDM4DQoJCWMwLjAzMS0wLjAwOSwwLjA2OC0wLjAxMiwwLjEwMSwwLjAwM2MwLjAxMiwwLjA1My0wLjAyNywwLjEwOCwwLjA0NiwwLjA5NGMwLjA2OS0wLjAxNCwwLjEsMC4wMzIsMC4xNzItMC4wMTUNCgkJYzAuMDQ1LTAuMDI3LDAuMDkzLTAuMDIzLDAuMTMxLDAuMDE3YzAuMDUzLDAuMDUyLTAuMDUzLDAuMTIzLDAuMDA4LDAuMTczYzAuMDI0LDAuMDIsMC4wNDQsMC4wODEsMC4wNjgsMC4wOTENCgkJQzE0LDQuOCwxNC4wOSw0Ljc2OSwxNC4xMDcsNC43NjFjMC4wMjcsMC4wNTIsMC4wNTQtMC4wMjcsMC4wNzYtMC4wMzJjMC4wMDktMC4wMzMsMC4wNTEtMC4wNzEsMC4wOTItMC4wNzYNCgkJYzAuMDYtMC4wMDYsMC4wNjEsMC4wMDQsMC4xMDIsMC4wMzNjMC4xMTksMC4wODIsMC4xMDItMC4xMTgsMC4xNjQtMC4xN2MwLjExLTAuMDkxLDAuMTY2LTAuMTc3LDAuMjQyLTAuMjk0DQoJCWMwLjA2MS0wLjA5NCwwLjE0NS0wLjExNywwLjI1LTAuMTM0YzAuMDg0LTAuMDE0LDAuMjE0LTAuMDMzLDAuMjQ4LTAuMTI0YzAuMDQxLTAuMTA2LTAuMDU3LTAuMTY0LTAuMTQzLTAuMTk2DQoJCWMtMC4wOTYtMC4wMzMtMC4yMDMtMC4wNy0wLjE2Mi0wLjE5MWMwLjA1LTAuMTQxLDAuMDA2LTAuMjIzLTAuMTQ0LTAuMjY5Yy0wLjMxNi0wLjA5OS0wLjYwMi0wLjI2NC0wLjkyNS0wLjM1NQ0KCQljLTAuMjg0LTAuMDgxLTAuNTcyLTAuMTA5LTAuODY1LTAuMTI1Yy0wLjEzLTAuMDQ1LTAuNDA2LTAuMDUtMC40ODUsMC4wNjFjLTAuMDUyLDAuMDcxLDAuMDEzLDAuMTM0LDAuMDA3LDAuMjA4DQoJCUMxMi41NTgsMy4xODgsMTIuNjAyLDMuMjc5LDEyLjY2NCwzLjM0NkwxMi42NjQsMy4zNDZMMTIuNjY0LDMuMzQ2eiBNMTcuNjQzLDE3LjQwN2wtMC4wMDItMC4wMDINCgkJYzAuMDA1LDAuMDA4LDAuMDAyLDAuMDIxLDAuMDA0LDAuMDMyYzAuMDU4LDAsMC4wODQsMC4wNTMsMC4xNDYsMC4wMzNjMC4wNjQtMC4wMTgsMC4xMDItMC4wOCwwLjA1MS0wLjEzMg0KCQljLTAuMDQ1LTAuMDQ0LTAuMDg0LTAuMDgyLTAuMTUtMC4wNjlDMTcuNjEzLDE3LjI4NCwxNy42MzEsMTcuMzQ2LDE3LjY0MywxNy40MDdMMTcuNjQzLDE3LjQwN0wxNy42NDMsMTcuNDA3eiBNMTkuNjgxLDE1LjM3OQ0KCQljLTAuMDAzLTAuMDE0LTAuMDA2LTAuMDI1LTAuMDA5LTAuMDM5Yy0wLjA2Mi0wLjAxOC0wLjEwMSwwLjA0NS0wLjE1OC0wLjAwMmMtMC4xMDksMC4wNzQsMC4wMDgsMC4yMjItMC4xNzIsMC4yMTMNCgkJYzAuMDMxLDAuMDM3LDAuMDI4LDAuMDgsMC4wMTQsMC4xMjRjLTAuMDIyLDAuMDY4LTAuMDQxLDAuMDYyLTAuMDg3LDAuMDcxYy0wLjA5OCwwLjAxNi0wLjE0NC0wLjA0NS0wLjE3NS0wLjEyNw0KCQljLTAuMDk2LDAuMDAzLTAuMjI4LDAuMTUxLTAuMzAzLDAuMTk4Yy0wLjAyLDAuMDExLTAuMDU0LDAuMDQyLTAuMDc0LDAuMDU2Yy0wLjAxOCwwLjAxLTAuMDU4LDAuMDI5LTAuMDc4LDAuMDQxDQoJCWMtMC4wNTEsMC4wMjYtMC4xNiwwLjA2MS0wLjE2NywwLjExOWMtMC4wMjUtMC4wMDUtMC4wNjQsMC4wMS0wLjA5LDAuMDA4Yy0wLjAwOSwwLjAxMi0wLjAwOSwwLjAyNSwwLDAuMDM5DQoJCWMwLjExNywwLjAyLDAuMTc5LTAuMDIsMC4yNzctMC4wNjJjMC4xMDQtMC4wNDcsMC4yMTUtMC4wMzYsMC4zMTItMC4wNzJjMC4wNDctMC4wMTgsMC4wNDktMC4wNjgsMC4xMjUtMC4wMzgNCgkJYzAuMDMzLDAuMDE1LDAuMDcyLDAuMDYzLDAuMDgsMC4wOTdjMC4wMTUsMC4wNzYtMC4wNjQsMC4xODgtMC4xNDUsMC4xOTNjLTAuMDItMC4wNDgsMC4wMS0wLjA5NiwwLjAxOC0wLjEzNQ0KCQljLTAuMTA0LTAuMDM0LTAuMjc3LDAuMTE0LTAuMzA2LDAuMjAzYzAuMTA4LDAuMDIxLDAuMTUzLDAuMTgsMC4wOTUsMC4yNjZjLTAuMDIsMC4wMjEtMC4wNDIsMC4wNDktMC4wOCwwLjA2Mg0KCQljLTAuMDYxLDAuMDE5LTAuMDktMC4wMzgtMC4xNDksMC4wMDZjLTAuMDc4LDAuMDYsMC4wMDcsMC4yMjItMC4wMzgsMC4zMTJjLTAuMDM0LDAuMDY5LTAuMDkyLDAuMDk2LTAuMTQzLDAuMTQ0DQoJCWMtMC4wMzIsMC4wMzUtMC4wNTIsMC4wNzMtMC4wOTcsMC4xMDRjLTAuMDU5LDAuMDM5LTAuMjAxLDAuMTI1LTAuMTg4LDAuMjA2YzAuMTI5LDAuMDQ0LDAuMzk2LTAuMTgxLDAuNTA2LTAuMjU1DQoJCWMwLjA3LTAuMDQ3LDAuMTE0LTAuMTE5LDAuMTg3LTAuMTY2YzAuMDgxLTAuMDUxLDAuMTg4LTAuMDc2LDAuMjM5LTAuMTY2YzAuMDMxLTAuMDUxLDAuMDA3LTAuMDk3LDAuMDI0LTAuMTQ4DQoJCWMwLjAxNy0wLjA0NSwwLjA0OC0wLjA2MSwwLjA3OC0wLjA5NmMwLjA1Ni0wLjA2NiwwLjEwNi0wLjA4OCwwLjE2OS0wLjE0M2MwLjA3OC0wLjA2OSwwLjA2MS0wLjE3OSwwLjA5Ny0wLjI3MQ0KCQljMC4wMzEtMC4wOCwwLjA5My0wLjE0MywwLjEzNi0wLjIxOWMwLjA2OC0wLjExOSwwLjI0NS0wLjQwNCwwLjE3LTAuNTM5QzE5LjczLDE1LjM3NiwxOS42OTcsMTUuMzcxLDE5LjY4MSwxNS4zNzlMMTkuNjgxLDE1LjM3OQ0KCQlMMTkuNjgxLDE1LjM3OXogTTIxLjIxMywxMS40OThjLTAuMDM5LTAuMDczLDAuMDItMC4yODIsMC4wMi0wLjM2OWMtMC4wMDItMC4xNTktMC4wNTEtMC4yNzktMC4wNzItMC40MjgNCgkJYy0wLjAxNC0wLjE0LTAuMDMzLTAuNTA5LDAuMDE4LTAuNjM1YzAuMDcyLTAuMTc4LTAuMjc5LTAuNDc4LTAuMjk5LTAuNjdjLTAuMDE4LTAuMTY3LTAuMTEyLTAuMzI1LTAuMjQ4LTAuNDINCgkJYy0wLjA1Ny0wLjA0MS0wLjE3Ni0wLjU5MS0wLjI0Ni0wLjU2NWMtMC4wMzUsMC4wMTcsMC4wMzcsMC4xMzgsMC4wMzMsMC4xNzZjLTAuMDIsMC4xMzMtMC4wODgsMC0wLjE1OCwwLjAzDQoJCWMtMC4xMzEsMC4wNTMtMC4yNjksMC4xNzktMC4yODUsMC4zMDhjLTAuMDYyLDAuNDc4LTAuNC0wLjAxNy0wLjM3My0wLjAzN2MwLjA3NC0wLjA1OCwwLjEwMi0wLjA0LDAuMTktMC4wNTENCgkJYzAuMDk3LTAuMDM1LTAuMDU0LTAuMTA1LDAuMDk5LTAuMTJjLTAuMDM1LTAuMDk5LDAuMDQ1LTAuMTMsMC4wMDYtMC4yMDhjLTAuMDU5LTAuMTE0LTAuMS0wLjEtMC4wNDEtMC4yMjMNCgkJYzAuMDI1LTAuMDY3LTAuMTI4LTAuMjc3LTAuMTQxLTAuMzU4Yy0wLjAxMi0wLjA3OS0wLjAxNC0wLjE4Mi0wLjAyMy0wLjI3Yy0wLjAwNi0wLjA1NiwwLjA4Ni0wLjEwOSwwLjA2OC0wLjE1Mw0KCQljLTAuMDAyLTAuMTU2LDAuMDMyLTAuMzI0LTAuMDIzLTAuNDc2Yy0wLjAzOS0wLjEwMy0wLjA4NC0wLjI0LTAuMTUtMC4zMjhjLTAuMDIxLTAuMDMtMC4wOTMtMC4xODctMC4xLTAuMjMNCgkJYy0wLjAxOS0wLjA5Ny0wLjA2Mi0wLjA2MS0wLjExNi0wLjA5OWMtMC4wMy0wLjAzOC0wLjE2NS0wLjE2NC0wLjIwNC0wLjE4MmMtMC4wMzUtMC4wMTctMC4yOTctMC4yNTQtMC4zMDMtMC4yNzQNCgkJYy0wLjAyMi0wLjA2OC0wLjE3LTAuMTIxLTAuMTUyLTAuMTk2YzAuMDIzLTAuMTEyLTAuMzY4LTAuNDAzLTAuNDc4LTAuNDIzYy0wLjA3LTAuMDEyLDAuMjE2LDAuMzMxLDAuMjE0LDAuMzIzDQoJCWMwLjAwNSwwLjAyLDAuMTg2LDAuMjQ5LDAuMTg2LDAuMjQ5YzAuMDQsMC4wMTQsMC4xMzksMC4yOTQsMC4xMzcsMC4zMzFjLTAuMDEyLDAuMTA2LTAuMjg1LTAuMTc0LTAuMzA3LTAuMjEyDQoJCWMtMC4xMzUtMC4xNjUtMC4zNzktMC4yOTktMC41MzQtMC40MDljLTAuMTA5LTAuMTAyLTAuMDU2LTAuMTYtMC4yNDMtMC4yNDZjLTAuMDY4LTAuMDMyLTAuMjU2LTAuMTg1LTAuMzE0LTAuMTg5DQoJCWMtMC4wNy0wLjAwMywwLjAxLDAuMTQ2LDAuMDEyLDAuMTYyYzAuMDExLDAuMTA2LDAuMTI2LDAuMTE0LDAuMTk1LDAuMTg0YzAuMDU1LDAuMDU4LDAuMTA0LDAuMTI5LDAuMDU3LDAuMTkzDQoJCWMtMC4wMDIsMC0wLjA4NywwLjE1OC0wLjA5MiwwLjE0NGMwLjAyNCwwLjA2NiwwLjIyNSwwLjIxNCwwLjI3MywwLjI2OWMtMC4wMS0wLjAxNCwwLjI2MSwwLjMzOSwwLjI4MywwLjE1MQ0KCQljMC4wMS0wLjA2OC0wLjA2Ny0wLjE1LTAuMDU3LTAuMjA5YzAuMDA4LTAuMDM3LDAuMzA5LDAuMzQ0LDAuMzI1LDAuMzc3YzAuMDczLDAuMjAyLDAuMDY3LTAuMDMsMC4xNDQtMC4wMDYNCgkJYzAuMDYzLDAuMDIsMC4yMzIsMC4yMywwLjA5MiwwLjIzOWMtMC4yMTUsMC4wMTQsMC4wMzksMC4yLDAuMSwwLjIyOWMwLjEyNCwwLjA2MSwwLjIxLDAuMjAyLDAuMzM5LDAuMjU1DQoJCWMwLjIwMiwwLjA4MiwwLjE2LDAuMjI4LDAuMjYzLDAuMzc2YzAuMDMzLDAuMDQ3LTAuNTgyLDAtMC42MzEsMC4wMjdjLTAuMDgsMC4wNjQsMC4zMSwwLjQ5OSwwLjMxMSwwLjU2NA0KCQljMC4wMDQsMC4xMzcsMC4wODIsMC4yMzYsMC4xMDMsMC4zNzNjMC4wMTIsMC4xMjYtMC4wMDMsMC4yOTEsMC4wNzksMC4zOTNjMC4wNjgsMC4wNjIsMC4xMzEtMC4xMDMsMC4yMzctMC4wMDQNCgkJYzAuMDM5LDAuMDE4LDAuMDk1LDAuMDYyLDAuMTA2LDAuMDk2YzAuMDM2LDAuMDk0LDAuMjQsMC42NjktMC4wMDQsMC42MjZjLTAuMTA4LTAuMDItMC4wNDcsMC40NTItMC4wMzksMC41Mg0KCQljMC4wMzMsMC4xNDksMC4wOTMsMC4xMzcsMC4wNTQsMC4zMjVjMC4wMDUsMC4xNTYtMC4xMjIsMC4yMzUtMC4yMTIsMC4zNDdjLTAuMDQyLDAuMDUyLTAuMDY4LDAuMTEyLTAuMDg4LDAuMTc4DQoJCWMtMC4wNS0wLjA0OS0wLjA3NC0wLjEyNi0wLjE0My0wLjE1MmMtMC4wNzUtMC4wMjktMC4yNCwwLjA2Mi0wLjMwNywwLjA5NGMtMC4xNTgsMC4wOC0wLjA0MSwwLjIyNi0wLjEwNCwwLjM1Mg0KCQljLTAuMDQ1LDAuMDkzLTAuMTgxLDAuMTM4LTAuMjY5LDAuMTg0Yy0wLjEwNiwwLjA1NS0wLjI0OSwwLjExMi0wLjM1NCwwLjAyNGMtMC4wOS0wLjA3My0wLjA1Mi0wLjIyLTAuMTQ2LTAuMjg0DQoJCWMtMC4xMDUtMC4wNzEtMC4xMTcsMC4wODgtMC4xNDEsMC4xNTFjLTAuMDQ3LDAuMTItMC4xODYsMC4xNjEtMC4xNSwwLjMxMWMwLjAxNiwwLjA2MiwwLjA0NywwLjExOSwwLjA1OSwwLjE4MQ0KCQljMC4wMTYsMC4wNzctMC4wMjMsMC4xNDctMC4wMjgsMC4yMjVjLTAuMDA5LDAuMTMyLDAuMTMsMC4xNjIsMC4xNjUsMC4yN2MwLjAzMSwwLjA5Ny0wLjAwMiwwLjI0Ny0wLjEwOSwwLjI4Mw0KCQljLTAuMTE1LDAuMDQxLTAuMjQzLTAuMDYzLTAuMzU3LTAuMDc2Yy0wLjExMy0wLjAxMi0wLjI2LDAuMDItMC4yOCwwLjE1Yy0wLjAyLDAuMTE1LDAuMDk4LDAuMjA5LDAuMDQsMC4zMjgNCgkJYy0wLjAyMywwLjA1LTAuMDY1LDAuMDktMC4wOTYsMC4xMzVjLTAuMDUzLDAuMDc2LTAuMDgyLDAuMTY0LTAuMTMyLDAuMjQxYzAuMDU5LDAuMDAxLDAuMDUzLTAuMDM1LDAuMTA0LTAuMDI0DQoJCWMwLjA1NywwLjAxMiwwLjEwNS0wLjA0NCwwLjE1Mi0wLjA2MmMwLjAwOSwwLjAzNywwLjAwNCwwLjA3NCwwLjAwOSwwLjExMWMwLjAzOSwwLjAxMiwwLjA3OC0wLjAwNCwwLjExMi0wLjAxOA0KCQljMC4wMDUsMC4wMzMtMC4wMSwwLjA2OCwwLjAwNCwwLjEwMWMwLjAxLDAuMDI3LDAuMDQxLDAuMDM2LDAuMDYsMC4wNThjMC4wNDYsMC4wNTctMC4wMTEsMC4xNDgtMC4wNDQsMC4xOTcNCgkJYy0wLjA5NCwwLjE0LTAuMjU2LDAuMjE3LTAuMzYxLDAuMzQ4Yy0wLjEsMC4xMjEtMC4xMDcsMC4yNjgtMC4xODIsMC40Yy0wLjAyNSwwLjA0NS0wLjA1MSwwLjEwNywwLjAxNywwLjEyOQ0KCQljMC4wMTUtMC4wMjQsMC4wMzgtMC4wNDUsMC4wNjktMC4wNDVjMC4wNDctMC4wMDEsMC4wMjgsMC4wMzQsMC4wNTMsMC4wNjJjMC4wOTgsMC4xMjQsMC4yMDEtMC4wODEsMC4yNDItMC4xNA0KCQljMC4wNDMtMC4wNjMsMC4yMTctMC4xNTksMC4yNjQtMC4wNTNjMC4wMzgsMC4wOC0wLjAwNiwwLjE5My0wLjA0MywwLjI2N2MwLjA2MiwwLjAyOCwwLjA0NSwwLjA3NCwwLjA2MSwwLjEyOQ0KCQljMC4wMiwwLjA3NSwwLjA4OCwwLjEyNCwwLjA4OCwwLjIwOGMwLDAuMS0wLjIxOSwwLjI5OS0wLjEzMywwLjM3NWMwLjEwNSwwLjA5NCwwLjIzMi0wLjE2OCwwLjI3My0wLjIyNA0KCQljMC4wOC0wLjEwNywwLjI2Mi0wLjEyMywwLjMwNy0wLjI1NWMwLjA0OS0wLjE1LDAuMDMzLTAuMjM5LDAuMjMyLTAuMjQ0YzAuMDg0LTAuMDAyLDAuMTQ2LTAuMDU1LDAuMjI1LTAuMDcxDQoJCWMwLjA4OC0wLjAxNywwLjEyNy0wLjAyNiwwLjE4Mi0wLjA5M2MwLjA4LTAuMDk2LDAuMTUyLDAuMDE5LDAuMTU0LDAuMDk0YzAuMDA0LDAuMDc4LTAuMDMxLDAuMTc1LDAuMDE4LDAuMjQ0DQoJCWMwLjA1OSwwLjA4NiwwLjEyMy0wLjAyNywwLjE4My0wLjA4MWMtMC4wMDcsMC4wNTgsMC4wNywwLjA5MSwwLjExNSwwLjEwOGMwLjA2OS0wLjA0NywwLjExMi0wLjEyMywwLjE4Ny0wLjE2Ng0KCQljMC4wMzQtMC4wMiwwLjA3My0wLjAyNywwLjExMS0wLjAzM2MwLjAxMiwwLjA2MiwwLjAyMSwwLjEyOSwwLjA3NywwLjE1OGMwLjA3OSwwLjA0Ny0wLjAxOSwwLjA5LDAuMDg3LDAuMTM5DQoJCWMwLjEzMSwwLjA1MSwwLjE3NCwwLjE4MiwwLjIzNywwLjI4OGMwLjAzLDAuMDQ5LDAuMzAzLTAuMjQ3LDAuNDA3LTAuMjU4YzAuMzQ5LTAuMDQsMC41My0wLjQ5MywwLjY1OS0wLjc2MQ0KCQljMC4xODctMC4zODUsMC4yNzEtMC44MTEsMC4zMTctMS4yMDZjMC4xMTktMC4yNDUsMC4xNjctMC42OTIsMC4xMTktMC45NzZDMjEuMjAxLDExLjkwMSwyMS4zMDEsMTEuNjYyLDIxLjIxMywxMS40OTgNCgkJTDIxLjIxMywxMS40OThMMjEuMjEzLDExLjQ5OHogTTE4LjA2MiwxNy4yNTdjMC4wMDktMC4wNDIsMC4wOTktMC4yLDAuMDE1LTAuMjI0Yy0wLjAzLTAuMDA3LTAuMDU2LDAuMDM5LTAuMDgzLDAuMDQ3DQoJCWMtMC4wMzUsMC4wMTItMC4wNzQtMC4wMTItMC4xMDcsMC4wMDZjLTAuMDI5LDAuMDE2LTAuMDU5LDAuMDY0LTAuMDc2LDAuMDkyYy0wLjAyMiwwLjAzMy0wLjAxNCwwLjA0NywwLjAyMiwwLjA2NQ0KCQljMC4wMzYsMC4wMiwwLjA4MywwLjAyOCwwLjEwNCwwLjA2OGMwLjAxOSwwLjAzNCwwLjAwOSwwLjA4MiwwLjAwNSwwLjExOGMwLTAuMDAyLDAuMDA2LTAuMDA4LDAuMDA3LTAuMDE0DQoJCWMwLjAwNy0wLjAwMiwwLjAxNy0wLjAwMywwLjAyMi0wLjAwMmwtMC4wMDgsMC4wMTZDMTguMDYsMTcuNDQ1LDE4LjA1MiwxNy4zMTgsMTguMDYyLDE3LjI1N0wxOC4wNjIsMTcuMjU3TDE4LjA2MiwxNy4yNTd6DQoJCSBNMTkuMTg2LDE1LjM1OWMwLjAwNCwwLjA0NSwwLjA1MywwLjA0MSwwLjA4NiwwLjAyOWMwLjAyOS0wLjAxLDAuMDQ5LTAuMDM1LDAuMDY4LTAuMDU5YzAuMDI3LTAuMDM0LDAuMDQ0LTAuMDY5LDAuMDItMC4xMQ0KCQljLTAuMDIzLTAuMDQyLTAuMDM5LTAuMDczLTAuMDUxLTAuMTIyYy0wLjAyLDAuMDEtMC4wNDMsMC4wMjgtMC4wNjQsMC4wMzRjLTAuMDIxLDAuMDA4LTAuMDIzLDAuMDAxLTAuMDQ4LDANCgkJYy0wLjA1Ni0wLjAwMS0wLjA0NCwwLjA0MS0wLjA2NywwLjA3NmMtMC4wMiwwLjAzLTAuMDYyLDAuMDQyLTAuMDQ3LDAuMDgxYzAuMDEyLDAuMDMxLDAuMDYyLDAuMDU3LDAuMDksMC4wN2wwLjAwOC0wLjAwOQ0KCQljLTAuMDAyLDAuMDAzLTAuMDAzLDAuMDA1LTAuMDA0LDAuMDA3QzE5LjE3OCwxNS4zNTksMTkuMTgzLDE1LjM1OSwxOS4xODYsMTUuMzU5TDE5LjE4NiwxNS4zNTlMMTkuMTg2LDE1LjM1OXogTTEzLjc3MSwxOC42MTUNCgkJYzAuMDU1LTAuMDk4LDAuMTU0LTAuMTYsMC4yNDItMC4yMjljMC4xMDctMC4wODIsMC4yMDEtMC4xNzgsMC4yODUtMC4yODFjLTAuMDQ5LTAuMDEyLTAuMDUzLTAuMDU5LTAuMDg0LTAuMDg5DQoJCWMtMC4wNDgtMC4wNDctMC4xMjEtMC4wMTctMC4xMzItMC4wODhjLTAuMDExLTAuMDYzLTAuMDYzLTAuMDc3LTAuMTE0LTAuMTAzYy0wLjExNy0wLjA2LTAuMTY1LTAuMTc1LTAuMjYtMC4yNTYNCgkJYy0wLjEwNC0wLjA5LTAuMjQ0LTAuMDYxLTAuMzctMC4wODRjLTAuMTEtMC4wMjEtMC4yMjQtMC4xOTktMC4zNDItMC4xMjNjLTAuMDc1LDAuMDQ3LTAuMTEsMC4xNjYtMC4wNTksMC4yNA0KCQljMC4wNCwwLjA1OSwwLjEwOSwwLjA4NywwLjEzNiwwLjE1NWMtMC4wNCwwLjAzOC0wLjA0OSwwLjA2MiwwLDAuMDk3YzAuMDU5LDAuMDQxLDAuMTcyLDAuMDg0LDAuMTQzLDAuMTc0DQoJCWMtMC4wMTQsMC4wNDgtMC4wNTUsMC4wOTYtMC4xMDcsMC4xMDRjLTAuMDM3LDAuMDA4LTAuMTI5LTAuMDE0LTAuMTA5LDAuMDU1Yy0wLjA0Mi0wLjExMS0wLjE2LDAuMDY0LTAuMjI1LTAuMDI4DQoJCWMtMC4wNTMtMC4wNzQtMC4wODYtMC4xNDItMC4xNjgtMC4xOWMtMC4xMDctMC4wNjYsMC4wNDMtMC4xMjksMC4wMjUtMC4yMjljLTAuMDI3LTAuMTQ0LTAuMjAzLTAuMTA0LTAuMjY2LTAuMjExDQoJCWMtMC4wMzgtMC4wNjEsMC4wMTMtMC4xMDksMC4wMzctMC4xNjJjMC4wMjQtMC4wNTUsMC4wODktMC4wMSwwLjEyMywwLjAwNWMwLjExMywwLjA1NCwwLjI3NywwLjAzMywwLjM3Mi0wLjA0NA0KCQljMC4wNDQtMC4wMzcsMC4xNC0wLjIwNSwwLjAxOS0wLjIwNWMtMC4wODQsMC4wMDItMC4xNDgsMC4wNzQtMC4yMjksMC4wNzljLTAuMDEyLTAuMDk2LTAuMDU3LTAuMjU4LDAuMDQ1LTAuMzIxDQoJCWMwLjA5NC0wLjA1OCwwLjI4OC0wLjEyNSwwLjIwNS0wLjI3M2MtMC4wMjktMC4wNTEtMC4wODIsMC4wMzMtMC4xMjUtMC4wMDRjLTAuMDE5LTAuMDE2LTAuMDA1LTAuMDUxLDAuMDAxLTAuMDY2DQoJCWMtMC4wMjgtMC4wMjYtMC4wNTYtMC4wNTktMC4wNy0wLjA5NWMtMC4wNjYtMC4xNjEsMC4xMjktMC4yODYsMC4wNDYtMC40NTZjLTAuMDM0LTAuMDcyLTAuMDkzLTAuMTE0LTAuMTU3LTAuMTU4DQoJCWMtMC4wNjQtMC4wNDUtMC4wNjctMC4xMDQtMC4wOTEtMC4xNzJjLTAuMDEzLTAuMDM3LTAuMDc2LTAuMTI3LTAuMTI5LTAuMTA0Yy0wLjA0NiwwLjAxOC0wLjA2LDAuMDk4LTAuMDk2LDAuMTMxDQoJCWMtMC4wODEsMC4wNzktMC4yNTIsMC4xMDktMC4zNiwwLjA4NGMtMC4wODctMC4wMi0wLjA4My0wLjA1My0wLjEyNS0wLjExMWMtMC4wMTQtMC4wMjEtMC4wNDMtMC4wMjItMC4wNjYtMC4wMzENCgkJYy0wLjAzOS0wLjAxNi0wLjA0My0wLjA1MS0wLjA1My0wLjA4NWMtMC4wMzYtMC4xMzItMC4yOTcsMC4wMzItMC4zMzctMC4xNTNjLTAuMDA5LTAuMDQzLDAuMDA2LTAuMTEzLTAuMDU2LTAuMTIzDQoJCWMtMC4wNjktMC4wMTItMC4wNzItMC4wNzgtMC4wNzItMC4xMzVjMC0wLjA0NSwwLjAwMy0wLjEwOS0wLjA0NS0wLjEzNWMtMC4wNjItMC4wMzMtMC4wNzctMC4wMTktMC4wOTYtMC4wODgNCgkJYy0wLjAyMi0wLjA5LTAuMDg0LDAuMDAzLTAuMTM1LTAuMDE2Yy0wLjEwOC0wLjA0My0wLjA4OSwwLjAxMS0wLjE3NiwwLjA1N2MtMC4xNDgsMC4wNzgtMC4xNjUtMC4yODctMC4yMTYtMC4zNTgNCgkJYy0wLjA5OS0wLjEzNi0wLjA3NCwwLjE2OS0wLjE0MSwwLjIwNmMtMC4wNjIsMC4wMzUtMC4xMjYtMC4wNDUtMC4xNDgtMC4wOTJjLTAuMDE0LTAuMDI3LTAuMDIxLTAuMDU5LTAuMDM4LTAuMDg2DQoJCWMtMC4wMjUtMC4wMzktMC4wNy0wLjA1Ni0wLjA5Ni0wLjA5NWMtMC4wMjEtMC4wMzUtMC4wNTMtMC4wNzYtMC4wNjgtMC4xMTRjLTAuMDEzLTAuMDMzLTAuMDEtMC4wNzYtMC4wMzYtMC4xMDQNCgkJYy0wLjAzMi0wLjAzNCwwLjAwNy0wLjA5MiwwLjAzLTAuMTM2YzAuMDM5LTAuMDE1LDAuMDk4LDAuMDE1LDAuMTI2LDAuMDQxYzAuMDcxLDAuMDYsMC4xNzcsMC4zMTgsMC4zLDAuMjcxDQoJCWMtMC4wMjYtMC4wMzQtMC4wMDktMC4wNzUtMC4wMjctMC4xMTFjLTAuMDItMC4wMzgtMC4wNTctMC4wNjEtMC4wODUtMC4wOTFjLTAuMDYzLTAuMDczLTAuMTMyLTAuMTQ2LTAuMTc0LTAuMjMzDQoJCWMtMC4wMzYtMC4wNzYtMC4wNTQtMC4xNTYtMC4xMjctMC4yMWMtMC4wNi0wLjA0NC0wLjE3OS0wLjA4Ny0wLjE1My0wLjE4MWMwLTAuMDAxLDAuMDAxLTAuMDAyLDAuMDAxLTAuMDAyDQoJCWMwLjA1LDAuMDEsMC4wODQsMC4wNDcsMC4xMiwwLjA3OGMwLjA1MywwLjA0NSwwLjEyLDAuMDY4LDAuMTgyLDAuMDk5YzAuMTEyLDAuMDU1LDAuMjQzLDAuMDkzLDAuMzM5LDAuMTc2DQoJCWMwLjA2LDAuMDUsMC4wMjgsMC4xNjMsMC4xMDQsMC4yMjVjMC4wNTYsMC4wNDYsMC4xMzgsMC4xOTgsMC4yNCwwLjEzOGMwLjAzNy0wLjAyMiwwLjA1NC0wLjA2NiwwLjA5MS0wLjA5Mg0KCQljMC4wNDEtMC4wMjksMC4xMDgtMC4wNTUsMC4xNTQtMC4wNzZjMC4wMjktMC4wMTQsMC4wNzctMC4wMSwwLjA5OS0wLjAzMWMwLjAzNi0wLjAzNS0wLjA0OS0wLjEzNi0wLjA2OS0wLjE2MQ0KCQljLTAuMDc3LTAuMDk5LTAuMTQ3LTAuMjA2LTAuMjQ5LTAuMjhjLTAuMDUzLTAuMDM5LTAuMTA0LTAuMDgtMC4xNjUtMC4xMDVjLTAuMDMzLTAuMDE0LTAuMDkxLTAuMDEyLTAuMDk4LTAuMDU4DQoJCWMwLjAxNywwLjAxMSwwLjAyNSwwLjAwOCwwLjAyOS0wLjAwOWMtMC4wMDEtMC4wMy0wLjA0NS0wLjAzMS0wLjA2Ni0wLjAzOGMtMC4wNTEtMC4wMTQtMC4wODUtMC4wMTQtMC4xMDUtMC4wNTYNCgkJYy0wLjAyNS0wLjA1Mi0wLjExNS0wLjA1MS0wLjE2My0wLjA2MmMtMC4wNzItMC4wMTgtMC4xMjktMC4wNzItMC4xOTgtMC4xYy0wLjA4MS0wLjAzMS0wLjE0MywwLjAwMS0wLjIyMiwwLjAyDQoJCWMtMC4wMTMsMC4wMDMtMC4wNDEsMC4wNS0wLjA2NiwwLjA5Yy0wLjA1Ny0wLjAxNC0wLjEyLTAuMDA4LTAuMTY4LDAuMDI5Yy0wLjA3MiwwLjA1Ny0wLjExNCwwLjE0Mi0wLjE3MSwwLjIxMQ0KCQljLTAuMDI0LDAuMDI5LTAuMDU5LDAuMDU4LTAuMDkzLDAuMDQ3Yy0wLjAwNi0wLjAwMy0wLjAwMy0wLjAxLTAuMDA4LTAuMDE0YzAuMDQzLTAuMzExLDAuMDY3LTAuNjI1LDAuMDM5LTAuNTYyDQoJCWMtMC4wNTcsMC4xMjEtMC4wOTksMC4yMDctMC4xNDMsMC4yOTVjLTAuMDYzLTAuMDI3LTAuMTM2LTAuMDI5LTAuMTY0LDAuMDM3Yy0wLjAyOCwwLjA3MiwwLjAwOSwwLjE2NC0wLjAzNiwwLjIyNw0KCQljLTAuMDExLDAuMDE3LTAuMDI3LDAuMDE1LTAuMDQyLDAuMDIyYy0wLjAwMy0wLjAwOC0wLjAxOC0wLjAyNy0wLjAxNy0wLjAyOGMtMC4wMTQsMC4wMjItMC4wMTUsMC4wMjktMC4wMjcsMC4wNQ0KCQljLTAuMDQ1LDAuMDAxLTAuMTAxLTAuMDE3LTAuMTU2LTAuMDM1YzAsMCwwLTAuMDA1LTAuMDAxLTAuMDA1Yy0wLjAwMSwwLjAwMi0wLjAwMSwwLjAwMi0wLjAwMywwLjAwNA0KCQljLTAuMDY2LTAuMDIzLTAuMTM1LTAuMDQ1LTAuMTk1LTAuMDIzYy0wLjEyLDAuMDQzLTAuMTI0LDAuMjE0LTAuMjAxLDAuMzE4Yy0wLjExNCwwLjE2LTAuNDA4LDAuMDkyLTAuNDU5LTAuMDk4DQoJCWMwLjA0Mi0wLjA1MywwLjA4My0wLjEwNCwwLjEyNS0wLjE1NWMtMC4wNjQtMC4xNjQtMC4yMzctMC4yNzctMC40MTEtMC4yNzJjLTAuMDQ5LDAuMDAxLTAuMTAyLDAuMDEtMC4xNDctMC4wMTINCgkJYy0wLjA0Ni0wLjAyMi0wLjA3Mi0wLjA3LTAuMTEyLTAuMTAyYy0wLjEyNi0wLjA5NC0wLjI5NCwwLjAzMS0wLjM5OSwwLjE0N2MtMC4xOCwwLjAzLTAuMzQ3LDAuMTMyLTAuNDU5LDAuMjc4DQoJCWMtMC4wNzItMC4wMDctMC4xNDQtMC4wMTMtMC4yMTUtMC4wMmMwLjA0MiwwLjExNi0wLjA5OCwwLjIxLTAuMTYsMC4zMTZjLTAuMDc4LDAuMTI5LTAuMDM4LDAuMjc5LDAuMDM5LDAuNDE3DQoJCWMtMC4wMDksMC4wMjEtMC4wMTUsMC4wNDQtMC4wMzQsMC4wNTNjLTAuMDkyLDAuMDQ5LTAuMDY4LDAuMDc3LTAuMDQxLDAuMTc3YzAuMDI0LDAuMDg0LDAuMDE1LDAuMjQ0LTAuMDA0LDAuMzI4DQoJCWMtMC4wMTUsMC4wNjYtMC4wODEsMC4yMjktMC4xNjIsMC4xODljLTAuMDQyLTAuMDIxLTAuMDg3LTAuMDM3LTAuMTI2LDAuMDAyYy0wLjAxOCwwLjAxNy0wLjAzLDAuMDM4LTAuMDM2LDAuMDYxDQoJCWMtMC4wMjcsMC4wMDItMC4wNTQsMC4wMDUtMC4wOCwwLjAxMWMtMC4wNTEsMC4wMTEtMC4xMDUsMC4wMjItMC4xNTQsMC4wMDFjLTAuMDUtMC4wMjEtMC4xMTYtMC4wNjItMC4xNzEtMC4wNDMNCgkJYy0wLjA0NywwLjAxNS0wLjEzOCwwLjA1Ni0wLjE1OCwwLjEwNGMtMC4wMDksMC4wMjEsMC4wMiwwLjA3NywwLjAyLDAuMTA2Yy0wLjAwMSwwLjA1MSwwLjAzOSwwLjEyOSwwLjAyMiwwLjE3Ng0KCQljLTAuMDM4LTAuMDE5LTAuMDkzLTAuMDI0LTAuMTE5LTAuMDYyYy0wLjAyNC0wLjAzMS0wLjA2LTAuMDI0LTAuMDg3LTAuMDU4Yy0wLjAwNiwwLjA1OC0wLjAyNywwLjEzOC0wLjA5NiwwLjE1Mw0KCQljLTAuMDY2LDAuMDE2LTAuMTMxLTAuMDM4LTAuMTk4LTAuMDJjLTAuMTc3LDAuMDQ1LDAuMTA2LDAuMjY3LDAuMTQ0LDAuMzA5YzAuMDYzLDAuMDcyLDAuMDg0LDAuMTY2LDAuMTMsMC4yNDYNCgkJYzAuMDUxLDAuMDg4LDAuMTU2LDAuMTE3LDAuMjE4LDAuMTk0YzAuMDUxLDAuMDY1LDAuMDYyLDAuMTUzLDAuMTM1LDAuMjAyYzAuMDgxLDAuMDU2LDAuMTU1LDAuMTA1LDAuMTg4LDAuMjAxDQoJCWMwLjAzNS0wLjAzMywwLjEwNiwwLjEyNSwwLjE4LTAuMDAyYzAuMDM5LTAuMDY4LDAuMTA4LTAuMTI3LDAuMTUxLTAuMDE2YzAuMDM4LDAuMDk1LDAsMC4xNTYsMC4wODMsMC4yMzgNCgkJYzAuMDYzLDAuMDY2LDAuMDYsMC4xNDMtMC4wNDgsMC4xMzZjMC4wMTgsMC4wNDgsMC4wNDYsMC4wOTcsMCwwLjE0MmMtMC4wMjEsMC4wMjEtMC4wODEsMC4wNjQtMC4wMzgsMC4wOTUNCgkJYzAuMDQ5LTAuMDIyLDAuMTAyLTAuMDM2LDAuMTUxLTAuMDZjMC4wNTQtMC4wMjEsMC4xMDYtMC4wNzYsMC4xNjktMC4wNzVjMC4wMDMsMC4wMi0wLjA4NCwwLjA3Ny0wLjAzLDAuMDgyDQoJCWMwLjA0NSwwLjAwNSwwLjEwOS0wLjA0MiwwLjE0Ni0wLjAwM2MwLjA0MSwwLjA0Mi0wLjAxMSwwLjEwNywwLjAxMywwLjE1NGMwLjAyNCwwLjA0OSwwLjEwNSwwLjAxMiwwLjE0NCwwLjAyDQoJCWMtMC4wMTYsMC4wNDMtMC4wNzksMC4wMzUtMC4xMTQsMC4wNTJjMC4wOCwwLjA5Ny0wLjAyNCwwLjIzOS0wLjE0LDAuMjQzYy0wLjA1NSwwLTAuMjUyLTAuMjI3LTAuMjYxLTAuMDgNCgkJYy0wLjAwMSwwLjA0MiwwLjAxMiwwLjA5NSwwLjAyNSwwLjEzNmMwLjAxOCwwLjA1NCwwLjE0NywwLjAzLDAuMTkzLDAuMDVjMC4wNjcsMC4wMjcsMC4xNDYsMC4wOTMsMC4xNzMsMC4xNjENCgkJYzAuMDI1LDAuMDY5LDAuMDg0LDAuMTE1LDAuMTA2LDAuMTgzYzAuMDQzLDAuMTIzLDAuMTYyLDAuMTQxLDAuMjg1LDAuMTc3YzAuMTY0LDAuMDQ5LDAuMDg0LDAuMzAyLDAuMDc1LDAuNDIzDQoJCWMtMC4wMDcsMC4xMiwwLjE2MSwwLjE0OCwwLjIzNywwLjIxN2MwLjA4NSwwLjA3NCwwLjA5OSwwLjIxOS0wLjA0MiwwLjIzYy0wLjA3MiwwLjAwNy0wLjE5Mi0wLjAyNy0wLjIxOSwwLjA2Ng0KCQljLTAuMDM5LDAuMTMsMC4xNTksMC4xMTYsMC4yNDYsMC4xNDVjMC4wNCwwLjAxNCwwLjIwNCwwLjAzMSwwLjIxOSwwLjA2OGMwLjAyMiwwLjA2LDAuMDA0LDAuMTQsMC4wMjUsMC4yMDINCgkJYzAuMDUxLDAuMTU5LDAuMTk4LDAuMjY1LDAuMzQxLDAuMzQ1YzAuMzA2LDAuMTcxLDAuNjY5LDAuMjc4LDEuMDA1LDAuMzc0YzAuMTg4LDAuMDU1LDAuMzc4LDAuMDk3LDAuNTcsMC4xMjMNCgkJYzAuMTg2LDAuMDI0LDAuMzUsMC4wMDksMC41MDksMC4xMTJjMC4xMDksMC4wNywwLjE3OCwwLjAxOCwwLjI5MSwwLjAzN2MwLjA0OCwwLjAxLDAuMDY5LDAuMDU0LDAuMTA1LDAuMDgNCgkJYzAuMDQsMC4wMzEsMC4wODctMC4wMSwwLjEzLDAuMDA3YzAuMDA3LTAuMDI4LDAuMDA0LTAuMDU2LTAuMDA5LTAuMDgzYzAuMDg2LDAuMDMxLDAuMTksMC4xMjMsMC4yODEsMC4wNQ0KCQljMC4wNDUtMC4wMzYsMC4wNzUtMC4wODcsMC4xMjItMC4xMjJjMC4wNTUsMC4wMDYsMC4xMDksMC4wMDgsMC4xNjUsMC4wMDhjMC4yMzIsMCwwLjQxNS0wLjEwNSwwLjYwMS0wLjIzDQoJCWMwLjItMC4xMzMsMC40NC0wLjEzNywwLjY3MS0wLjE1N2MwLjI0NC0wLjAyNCwwLjUwMy0wLjA1NiwwLjcyNy0wLjE2M2MwLjE5NS0wLjA5NCwwLjI0NS0wLjI2NSwwLjMtMC40NTQNCgkJYzAuMDYxLTAuMjA2LDAuMjQtMC4yOSwwLjM1OS0wLjQ1NkMxMy43NDgsMTkuMDcsMTMuNjU2LDE4LjgxNywxMy43NzEsMTguNjE1TDEzLjc3MSwxOC42MTVMMTMuNzcxLDE4LjYxNXogTTQuODI0LDE1Ljg4DQoJCWMtMC4wMDgtMC4wNDktMC4wMjYtMC4wNzktMC4wNjMtMC4xMDhjLTAuMDAxLDAuMDA1LTAuMDAzLDAuMDA4LTAuMDAzLDAuMDE0Yy0wLjA1MS0wLjAyNS0wLjA1Ny0wLjEyMy0wLjEyNi0wLjExNQ0KCQljLTAuMDU3LTAuMDktMC4yMDEtMC4wNS0wLjI0NiwwLjAzM2MtMC4wMywwLjA1NywwLjAwNiwwLjA4MiwwLjAzOSwwLjEyM2MwLjA0MiwwLjA1MiwwLjAzNCwwLjA5MiwwLjA0OSwwLjE1DQoJCWMwLjAzOCwwLjE1MywwLjE2NSwwLjA0OSwwLjI1NSwwLjEwN2MwLjAzNSwwLjAyMywwLjA0OCwwLjA4OCwwLjA5OSwwLjA3OGMwLjA1Ny0wLjAxNCwwLjA1NC0wLjEsMC4wMzktMC4xMzcNCgkJQzQuODQ2LDE1Ljk3MSw0LjgzMSwxNS45MzksNC44MjQsMTUuODhMNC44MjQsMTUuODhMNC44MjQsMTUuODh6IE02LjAyMiwxNy42ODZjMC4wMDktMC4wMjUtMC4wMzEtMC4wNTUtMC4wNTktMC4wNTMNCgkJYy0wLjAyNCwwLjAwMi0wLjA0NiwwLjAzNS0wLjA1NSwwLjA1M2MtMC4wMywwLjA1NCwwLjAwMywwLjEyNSwwLjA3MiwwLjEyNWMwLjAxNy0wLjAyOSwwLjAxMS0wLjA4NSwwLjA1NC0wLjA5DQoJCWMtMC4wMDMtMC4wMTQtMC4wMTItMC4wMTgtMC4wMjQtMC4wMjJMNi4wMjIsMTcuNjg2TDYuMDIyLDE3LjY4NnogTTQuNzQ3LDE1Ljc2MmMwLjAwNCwwLjAwMywwLjAwOSwwLjAwNiwwLjAxNCwwLjAxDQoJCWMwLjAwNC0wLjAwNywwLjAwOS0wLjAxNCwwLjAxMi0wLjAyMkw0Ljc0NywxNS43NjJMNC43NDcsMTUuNzYyeiBNMTguODAyLDE3Ljg4OWMtMC4wMjUsMC4wMjUtMC4wMTksMC4wNTMtMC4wMywwLjA4MQ0KCQljLTAuMDE0LDAuMDM0LTAuMDY1LDAuMDQ4LTAuMDk0LDAuMDY3Yy0wLjA0NSwwLjAyOC0wLjA2MSwwLjA5Ni0wLjEwOSwwLjExM2MtMC4wMjEtMC4wMzItMC4wNTMtMC4xMjEtMC4wOTctMC4wNDUNCgkJYy0wLjAyNSwwLjA1MS0wLjAwOSwwLjEwMS0wLjA1LDAuMTQ2Yy0wLjA0LDAuMDQzLTAuMDM3LDAuMDk0LTAuMDY1LDAuMTQxYy0wLjA0NCwwLjA3NC0wLjA4NywwLjExOS0wLjE2MSwwLjE2Mg0KCQljLTAuMDU5LDAuMDM1LTAuMDcsMC4xMDEtMC4xMTEsMC4xNDhjLTAuMDQ1LDAuMDU0LTAuMTE1LDAuMDczLTAuMTc2LDAuMTAxYy0wLjA0NCwwLjAxOS0wLjExNSwwLjA2OS0wLjE2NiwwLjA0MQ0KCQljLTAuMDY1LTAuMDQxLDAuMDI1LTAuMTE0LDAuMDU3LTAuMTRjMC4wMjktMC4wMjMsMC4xNzItMC4xMSwwLjEzOS0wLjE1OWMtMC4wMjEtMC4wMzItMC4xMDQtMC4wMjctMC4xMzctMC4wMjQNCgkJYy0wLjA2NiwwLjAwOC0wLjExOCwwLjA3Ni0wLjE3NSwwLjEwN2MtMC4wNjQsMC4wMzctMC4xMiwwLjA2Ny0wLjE5LDAuMDkyYy0wLjA4MSwwLjAyOC0wLjA4OCwwLjEwNC0wLjE1MiwwLjE1DQoJCWMtMC4wNTEsMC4wMzktMC4xMTYsMC4wNjktMC4xODIsMC4wNjljLTAuMDg4LDAtMC4wODMtMC4wNzMtMC4xMDktMC4xMzRjLTAuMDMyLDAuMDA1LTAuMDYxLDAuMDQ3LTAuMDkyLDAuMDYxDQoJCWMtMC4wNTIsMC4wMjEtMC4wODQsMC4wNDYtMC4wNjIsMC4xMDJjMC4wMjEsMC4wNTktMC4yMTEsMC4xMTEtMC4yNTIsMC4xNDFjLTAuMDA5LTAuMDI5LDAuMDM3LTAuMDYxLDAuMDU1LTAuMDc2DQoJCWMtMC4wNzItMC4wMDYtMC4xNTMsMC4wNTYtMC4yMjcsMC4wNjZjLTAuMDcsMC4wMS0wLjE1OCwwLjA1OC0wLjE2OCwwLjEzMWMtMC4wMDgsMC4wNTctMC4wODQsMC4wNTYtMC4xMzMsMC4wNzUNCgkJYy0wLjA3OSwwLjAzNC0wLjA0NiwwLjA4MS0wLjA2MSwwLjE0NWMtMC4wMywwLjEyLTAuMjgxLDAuMDI4LTAuMTUzLTAuMTMxYzAuMDQ1LTAuMDU2LDAuMTEyLTAuMDkzLDAuMTUzLTAuMTQ5DQoJCWMwLjA0Ny0wLjA2NywwLjA1NC0wLjE1LDAuMDktMC4yMjNjLTAuMDgsMC4wMjMtMC4xNCwwLjA2OC0wLjIwNywwLjExM2MtMC4wNzYsMC4wNS0wLjE0MSwwLjAzNy0wLjIyNywwLjAyMQ0KCQljLTAuMS0wLjAyMS0wLjE2OCwwLjAyOC0wLjI2LDAuMDUxYy0wLjA1OSwwLjAxNC0wLjE4OSwwLjAxLTAuMTk2LDAuMDk0Yy0wLjAwNSwwLjA1NSwwLjA5LDAuMDY1LDAuMTIyLDAuMDk4DQoJCWMwLjA0NiwwLjA0OSwwLjA5NywwLjExOSwwLjEzNiwwLjE3NGMwLjAzMiwwLjA0MywwLjE0OCwwLjEwMiwwLjE0MiwwLjE1NmMtMC4wMTMsMC4xMDYtMC4xNDYsMC4wODgtMC4yMTgsMC4xMDYNCgkJYy0wLjA3MiwwLjAxOS0wLjA4MywwLjA4My0wLjEzNiwwLjEyM2MtMC4wNiwwLjA0NC0wLjE0MS0wLjAwOC0wLjIwNywwLjAyYy0wLjA2NiwwLjAyNi0wLjExNSwwLjA4Ny0wLjE3NCwwLjEyNg0KCQljLTAuMDk5LDAuMDY4LTAuMTYzLTAuMDA2LTAuMjY2LTAuMDExYy0wLjA4Mi0wLjAwMy0wLjE1NiwwLjAzNS0wLjIzNCwwLjA1MmMtMC4wNzEsMC4wMTYtMC4xNTYsMC4wMjctMC4yMTEsMC4wNzcNCgkJYy0wLjExOCwwLjEwNiwwLjI2MywwLjA3NywwLjI5OSwwLjA3NGMtMC4wMTcsMC4wNjItMC4wMzMsMC4xMzItMC4wODgsMC4xNzJjLTAuMDY5LDAuMDUtMC4xNjcsMC4wMzgtMC4yNDYsMC4wNTYNCgkJYy0wLjA2MiwwLjAxNi0wLjE0NywwLjA4NC0wLjA1OCwwLjEzM2MwLjA4MSwwLjA0MSwwLjE4NSwwLjAyLDAuMjY2LTAuMDFjMC4wOTMtMC4wMzEsMC4xODEtMC4wODIsMC4yNzctMC4xMDQNCgkJYzAuMTAzLTAuMDIyLDAuMjA4LTAuMDEyLDAuMzExLTAuMDI5YzAuMTEtMC4wMjEsMC4yMDYtMC4wODEsMC4zMDgtMC4xMjJjMC4wOTgtMC4wNCwwLjE5OS0wLjA1NSwwLjMwMy0wLjA1OA0KCQljLTAuMDIxLDAuMDM4LTAuMTIzLDAuMDM1LTAuMTYyLDAuMDQ0Yy0wLjA3NiwwLjAxNS0wLjEyOSwwLjA4Mi0wLjIwOCwwLjA3N2MtMC4wOTEtMC4wMDMtMC4wNzksMC4wNjEtMC4xNDQsMC4wNzYNCgkJYy0wLjA0MywwLjAxMS0wLjE0MiwwLjEwNy0wLjE3MywwLjA0N2MtMC4wMjQtMC4wNDctMC4wNzEtMC4wMzctMC4wODYsMC4wMmMtMC4wMTIsMC4wNDMsMC4wMTMsMC4wNTktMC4wNDYsMC4wNg0KCQljLTAuMDQ1LDAtMC4wNjYtMC4wMTktMC4xMDctMC4wMjhjLTAuMDgtMC4wMjEtMC4xMTYsMC4wNjItMC4xNzQsMC4wODNjLTAuMDg0LDAuMDMyLTAuMTc0LDAuMDIxLTAuMjU0LDAuMDc0DQoJCWMtMC4wNDcsMC4wMy0wLjA5OCwwLjA0LTAuMTU0LDAuMDU2Yy0wLjEsMC4wMzItMC4xOTQsMC4wNy0wLjI5NSwwLjEwNGMtMC4wNzgsMC4wMjctMC4xNTYsMC4wNjEtMC4yNCwwLjA2Mg0KCQljLTAuMDM0LDAtMC4xNzItMC4wMjQtMC4xOTUsMC4wMTdjLTAuMDQxLDAuMDc1LDAuMDg4LDAuMDQ3LDAuMTE1LDAuMDMyYzAuMDc2LTAuMDQxLDAuMTY5LTAuMDE4LDAuMjU0LTAuMDE4DQoJCWMwLjEwNSwwLDAuMTkyLTAuMDIxLDAuMjg3LTAuMDY5YzAuMDI1LTAuMDE0LDAuMTk1LTAuMDUsMC4yMDMtMC4wM2MwLjAxNiwwLjAwOSwwLjEyOS0wLjAzMiwwLjE0Ny0wLjAzNw0KCQljMC4wOTItMC4wMjEsMC4xODMtMC4wNDEsMC4yNzMtMC4wNjNjMC4yNzctMC4wNzEsMC41NS0wLjE3OSwwLjgyLTAuMjcxYzAuNTM4LTAuMTgyLDEuMDMzLTAuNDg5LDEuNTAxLTAuODAyDQoJCWMwLjIxMi0wLjE0MiwwLjM4NS0wLjMyNiwwLjYxMy0wLjQ0MWMwLjIzMS0wLjExNSwwLjQzOC0wLjI2OSwwLjY1LTAuNDEyYzAuMjA3LTAuMTQyLDAuMzY0LTAuMzM2LDAuNTM3LTAuNTE0DQoJCWMwLjE3NC0wLjE4LDAuMzItMC4zNSwwLjM5Ni0wLjU5Yy0wLjA0My0wLjAxLTAuMDg4LDAuMDc5LTAuMTI0LDAuMDk2QzE4Ljk1NSwxNy44NTksMTguODUsMTcuODQ0LDE4LjgwMiwxNy44ODlMMTguODAyLDE3Ljg4OQ0KCQlMMTguODAyLDE3Ljg4OXogTTE3LjUwOSwxNy42NDVjMC4wNTMtMC4wNywwLjAwOC0wLjE2OC0wLjA4NS0wLjExMWMtMC4wMzUsMC4wMi0wLjAzLDAuMDU5LTAuMDU4LDAuMDgzDQoJCWMtMC4wMjgsMC4wMjYtMC4wMzEtMC4wMDUtMC4wNi0wLjAxM2MtMC4wNDEtMC4wMDgtMC4xMDcsMC4wNDYtMC4xMiwwLjA4MmMtMC4wNTYtMC4wMDEtMC4xMDQsMC4wNjEtMC4wNzksMC4xMDkNCgkJYzAuMDcyLTAuMDI3LDAuMTE4LTAuMDk2LDAuMTk3LTAuMDc0QzE3LjM2NywxNy43MzgsMTcuNDY5LDE3LjY5OCwxNy41MDksMTcuNjQ1TDE3LjUwOSwxNy42NDVMMTcuNTA5LDE3LjY0NXoiLz4NCjwvbWFzaz4NCjxyZWN0IG1hc2s9InVybCgjbWFzay1nbG9iZSkiIGZpbGw9IiNCMUIxQjMiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIvPg0KPC9zdmc+DQo=)!important
}
.identity-popup-expander {
  border-color: var(--in-content-box-border-color)!important;
  background-color: var(--in-content-box-background)!important;
  fill: var(--in-content-box-border-color)!important
}
.popup-notification-button[default][highlight=true]:not([disabled]) {
  background-color: var(--in-content-primary-button-background)!important;
  color: var(--in-content-text-color)
}
#update-available-whats-new,
.text-link {
  color: var(--in-content-link-color)!important
}
.popup-notification-icon[popupid=update-available],
.popup-notification-icon[popupid=update-manual],
.popup-notification-icon[popupid=update-restart] {
  background-color: var(--in-content-item-selected)!important;
  border-radius: 50%
}
toolbarbutton {
  text-shadow: none!important
}
.panel-banner-item > .toolbarbutton-multiline-text {
  color: var(--in-content-page-color)!important
}
.panel-banner-item {
  background-color: hsla(96,65%,37%,.9)!important
}
#update-manual-whats-new {
  color: var(--in-content-link-color)!important
}
toolbar[brighttext] {
  --toolbarbutton-icon-fill-attention: var(--in-content-primary-button-background)!important
}
toolbarseparator {
  border-color: var(--in-content-table-border-dark-color)!important
}
::-moz-selection {
  background: var(--in-content-link-color);
  color: var(--in-content-selected-text)!important
}
```

## File: `css/userChrome-files/page_info.css`

```css
@-moz-document url(chrome://browser/content/pageinfo/pageInfo.xul) {
  #topBar {
    -moz-appearance: none!important;
    background: var(--in-content-category-header-background)!important
  }
  #mainDeck {
    background: var(--in-content-page-background)!important;
    color: var(--in-content-page-color)!important
  }
  textbox {
    color: var(--in-content-page-color)!important
  }
  .text-link {
    color: var(--in-content-link-color)!important
  }
  button {
    -moz-appearance: none!important;
    background-color: var(--in-content-page-background)!important;
    border: 1px solid!important;
    border-radius: 3px!important;
    color: var(--in-content-page-color)!important;
    border-color: var(--in-content-box-border-color)!important
  }
  button:hover {
    background-color: var(--in-content-box-background)!important
  }
  #feedListbox,
  #feedListbox > richlistitem,
  #imagecontainerbox,
  .groupbox-body,
  .permission {
    -moz-appearance: none!important;
    background: var(--in-content-box-background)!important;
    color: var(--in-content-page-color)!important;
    border-color: var(--in-content-box-border-color)!important
  }
  #feedListbox richlistitem {
    border-color: var(--in-content-box-border-color)!important
  }
  #permPluginTemplate {
    color: var(--in-content-page-color)!important
  }
  #feedListbox,
  #imagecontainerbox,
  #permList,
  .groupbox-body {
    border: 1px solid!important
  }
  #permList {
    -moz-appearance: none!important
  }
  groupbox.collapsable caption .caption-icon {
    filter: invert(65%)!important
  }
  tree {
    -moz-appearance: none!important;
    color: var(--in-content-page-color)!important
  }
  treecol {
    -moz-appearance: none!important;
    border: 0 solid!important;
    border-color: var(--in-content-box-background)!important
  }
  treecolpicker {
    -moz-appearance: none;
    border: none!important;
    filter: invert(84%)
  }
  .checkbox-check[checked] {
    list-style-image: url(chrome://global/skin/icons/check.svg);
    -moz-context-properties: fill;
    fill: var(--in-content-border-highlight)!important
  }
  #imagetree,
  #metatree {
    border: 1px solid!important
  }
  #viewGroup > radio {
    -moz-appearance: none!important;
    background-color: var(--in-content-box-background)!important;
    text-shadow: none!important;
    padding: 0 8px!important;
    color: var(--in-content-page-color);
    border-right: 1px solid!important;
    border-color: var(--in-content-box-border-color)!important
  }
  #viewGroup > radio[selected=true] {
    color: var(--in-content-selected-text)!important
  }
  #viewGroup > radio:first-of-type {
    border-top-left-radius: 4px!important;
    border-bottom-left-radius: 4px!important
  }
  #viewGroup > radio:last-of-type {
    border: none!important;
    border-top-right-radius: 4px!important;
    border-bottom-right-radius: 4px!important
  }
  @media screen and (-moz-windows-theme),
  screen and (-moz-windows-classic),
  screen and (-moz-windows-default-theme),
  screen and (-moz-os-version:windows-win7),
  screen and (-moz-os-version:windows-win8),
  screen and (-moz-os-version:windows-win10) {
    #topBar {
      -moz-appearance: none!important;
      background-color: var(--in-content-category-header-background)!important;
      border: none!important;
      padding-top: 5px!important;
      padding-bottom: 5px!important;
      color: var(--selected-icon-fill-color)!important
    }
    #metaTagsCaption,
    #security-identity,
    #security-identity-groupbox,
    #security-privacy,
    #security-privacy-groupbox,
    #security-technical,
    #security-technical-groupbox {
      -moz-appearance: none!important;
      background-color: var(--in-content-page-background)!important;
      border: none!important;
      color: var(--in-content-selected-text)!important
    }
    #security-identity-groupbox,
    #security-privacy-groupbox,
    #security-technical-groupbox {
      -moz-appearance: none!important;
      background-color: var(--in-content-category-header-background)!important
    }
  }
}
@-moz-document url-prefix(chrome://browser/content/preferences/cookies.xul) {
  #CookiesDialog {
    -moz-appearance: none!important;
    background-color: var(--in-content-page-background)!important
  }
  #domainCol,
  #nameCol {
    -moz-appearance: none!important;
    border: none!important
  }
  #domainCol {
    border-right: 1px solid!important;
    border-color: var(--in-content-box-border-color)!important
  }
  .windowDialog,
  textbox {
    color: var(--in-content-page-color)!important
  }
  textbox[type=search] {
    -moz-appearance: none!important;
    background-color: var(--in-content-box-background)!important;
    border: 1px solid;
    border-color: var(--in-content-box-border-color)!important;
    border-radius: 3px!important;
    padding: 2px 4px 2px 2px!important
  }
  #cookiesList {
    -moz-appearance: none!important;
    border: 1px solid!important;
    border-color: var(--in-content-box-border-color)!important
  }
  button {
    -moz-appearance: none!important;
    background-color: var(--in-content-page-background)!important;
    border: 1px solid!important;
    border-radius: 3px!important;
    color: var(--in-content-page-color)!important;
    border-color: var(--in-content-box-border-color)!important
  }
  button:hover {
    background-color: var(--in-content-box-background)!important
  }
}
@-moz-document url-prefix(chrome://pippki) {
  tab {
    -moz-appearance: none!important;
    background-color: var(--in-content-box-background)!important;
    text-shadow: none!important;
    padding: 0 8px!important;
    color: var(--in-content-page-color);
    border-right: 1px solid!important;
    border-color: var(--in-content-box-border-color)!important
  }
  tab:first-of-type {
    border-top-left-radius: 4px!important;
    border-bottom-left-radius: 4px!important
  }
  tab:last-of-type {
    border: none!important;
    border-top-right-radius: 4px!important;
    border-bottom-right-radius: 4px!important
  }
  tab[selected=true] {
    color: var(--in-content-selected-text)!important
  }
  #certDetails {
    -moz-appearance: none!important;
    background-color: var(--in-content-page-background)!important
  }
  tree {
    -moz-appearance: none!important;
    color: var(--in-content-page-color)!important
  }
  treecol {
    -moz-appearance: none!important;
    border: 0 solid!important;
    border-color: var(--in-content-box-background)!important
  }
  treecolpicker {
    -moz-appearance: none;
    border: none!important
  }
  .windowDialog,
  dialog,
  textbox {
    color: var(--in-content-page-color)!important
  }
  #certDumpVal,
  .scrollfield,
  textbox[type=search] {
    -moz-appearance: none!important;
    background-color: var(--in-content-box-background)!important;
    border: 1px solid;
    border-color: var(--in-content-box-border-color)!important;
    border-radius: 3px!important;
    padding: 2px 4px 2px 2px!important
  }
  button {
    -moz-appearance: none!important;
    background-color: var(--in-content-page-background)!important;
    border: 1px solid!important;
    border-radius: 3px!important;
    color: var(--in-content-page-color)!important;
    border-color: var(--in-content-box-border-color)!important
  }
  button:hover {
    background-color: var(--in-content-box-background)!important
  }
}
@-moz-document url-prefix(chrome://pippki/content/exceptionDialog) {
  #exceptiondialog {
    -moz-appearance: none!important;
    background-color: var(--tone-8)!important
  }
  textbox {
    -moz-appearance: none!important;
    min-height: 20px!important;
    background: var(--in-content-box-background)!important;
    border: 1px solid var(--in-content-box-border-color);
    padding: 1px
  }
}
```

## File: `css/userChrome-files/remove_bookmarks_bottom_border.css`

```css
#navigator-toolbox::after {
  border-bottom: 0!important
}
```

## File: `css/userChrome-files/remove_white_flash.css`

```css
#browser vbox#appcontent tabbrowser,
#content,
#tabbrowser-tabpanels,
browser[type=content-primary],
browser[type=content] > html {
  background: var(--in-content-page-background)!important
}
```

## File: `css/userChrome-files/secure_connection_colors.css`

```css
#identity-box.verifiedIdentity {
  --urlbar-separator-color: var(--secure-connection-color)!important
}
#identity-box.verifiedIdentity #identity-icon-labels,
.identity-popup-connection-secure {
  color: var(--secure-connection-color)!important
}
#connection-icon,
#identity-popup[connection^=secure] #identity-popup-security-content,
#identity-popup[connection^=secure] #identity-popup-securityView {
  fill: var(--secure-connection-color)!important
}
```

## File: `css/userChrome-files/sidebar.css`

```css
#sidebar-header,
#sidebar-search-container,
#sidebar-search-container #viewButton,
.content-header,
.sidebar-header {
  background: var(--in-content-category-header-background)!important;
  color: var(--in-content-page-color)!important
}
.sidebar-search-container.tabs-container.sync-state.selected .search-box,
hbox#sidebar-search-container textbox#search-box {
  -moz-appearance: none!important;
  background-color: var(--in-content-box-background)!important;
  color: var(--in-content-page-color)!important;
  min-height: 20px!important;
  padding: 0 0 0 4px!important;
  border: 1px solid!important;
  border-color: var(--in-content-box-border-color)!important;
  border-radius: 3px!important
}
.sidebar-search-container.tabs-container.sync-state.selected .search-box .textbox-input-box {
  padding: 2px
}
#sidebar,
#sidebar-box,
#template-container,
#webext-panels-browser,
#webextpanels-window {
  background: var(--tab-background-color)!important
}
.sidebar-placesTree {
  -moz-appearance: none!important;
  color: var(--in-content-page-color)!important;
  background-color: var(--tab-background-color)!important;
  opacity: 1!important
}
#sidebar-box[sidebarcommand=_bbb81fb3-49c1-4a42-bcc9-94bc93e19fb8_-sidebar-action] #sidebar-icon,
#sidebar-box[sidebarcommand=treestyletab_piro_sakura_ne_jp-sidebar-action] #sidebar-icon {
  filter: invert(60%)
}
#button__bbb81fb3-49c1-4a42-bcc9-94bc93e19fb8_-sidebar-action .toolbarbutton-icon,
#button_treestyletab_piro_sakura_ne_jp-sidebar-action .toolbarbutton-icon {
  filter: invert(87%)
}
.button-menu-dropmarker,
.button-menubutton-dropmarker {
  filter: invert(65%)
}
.item.client.device-image-desktop > .item-title-container > .item-icon-container,
.sidebar-placesTree::-moz-tree-image,
.sidebar-placesTreechildren::-moz-tree-image {
  fill: var(--in-content-page-color)!important
}
#sidebar-header {
  border-color: hsla(240,5%,5%,.1)!important
}
.sidebar-splitter {
  border-color: var(--tone-9)!important
}
.deck .instructions,
.item-title {
  color: var(--in-content-page-color)!important
}
@-moz-document url-prefix(chrome://browser/content/places) {
  ::-moz-tree-row(selected) {
    -moz-appearance: none!important;
    background-color: var(--theme-selection-background)!important
  }
}
@-moz-document url(chrome://browser/content/places/bookmarksSidebar.xul) {
  @media screen and (-moz-os-version:windows-win7) {
    treechildren {
      --treechildren-outline: none!important
    }
  }
}
```

## File: `css/userChrome-files/status_panel.css`

```css
#statuspanel #statuspanel-label,
statuspanel .statuspanel-label {
  color: var(--in-content-page-color) !important;
  border: none !important;
}


```

## File: `css/userChrome-files/tab_line_colors.css`

```css
.tab-line[selected=true] {
  background-color: var(--in-content-border-focus)!important
}
```

## File: `css/userChrome-files/window-controls.css`

```css
.titlebar-buttonbox-container {
  display: none !important;
}
/* Reduce left spacer on non-maximized windows */
.titlebar-spacer[type="pre-tabs"] {
  display: none !important;
  visibility: hidden !important;
  width: 0 !important;
}

/* Reduce left spacer on non-maximized windows */
.titlebar-spacer[type="post-tabs"] {
  visibility: hidden !important;
  display: none !important;
  width: 0 !important;
}
/* Reduce left spacer on non-maximized windows */
.titlebar-spacer {
  visibility: hidden !important;
  display: none !important;
  width: 0 !important;
}

```

## File: `css/userContent-files/webextension-tweaks/brief.css`

```css
/*! Alters the webextension Brief
  IMPORTANT: change the Internal UUID */
@-moz-document url-prefix("moz-extension://brief@mozdev.org/") {
  #sidebar {
    background-color: var(--in-content-box-background)!important
  }
  #main-message,
  #view-list > tree-item > .title,
  #view-title-label,
  .content,
  .day-header,
  .headline-feed-name,
  .headline-title,
  .sidebar-button,
  tree-item > .title {
    color: var(--in-content-page-color)!important
  }
  #sidebar-top {
    border-bottom: 1px solid!important
  }
  .sidebar-button:hover {
    color: var(--in-content-link-color)!important
  }
  tree-folder.selected > tree-folder-header,
  tree-item.selected {
    border-color: var(--in-content-link-color)!important;
    background-color: var(--in-content-link-color)!important
  }
  #feed-view-header {
    background: var(--in-content-category-header-background)!important
  }
  #sidebar-splitter,
  #tag-list-splitter {
    border-left: 3px solid!important;
    border-right: 1px solid!important;
    border-right-color: var(--in-content-category-header-background)
  }
  #sidebar-splitter:hover,
  #tag-list-splitter:hover {
    border-right-color: var(--in-content-link-color)!important
  }
  .full-container-inner {
    background: 0 0!important
  }
  .headline-container:hover > .headline-header {
    background-color: var(--in-content-category-header-background)!important
  }
  tree-folder:not(.selected) > tree-folder-header:hover,
  tree-item:hover:not(.selected) {
    background-color: var(--in-content-page-background)!important;
    border-color: var(--in-content-category-header-background)!important
  }
  #view-list > tree-item.selected > .title,
  .unread-count,
  tree-item.selected > .title {
    color: var(--in-content-selected-text)!important
  }
}

```

## File: `css/userContent-files/webextension-tweaks/cookie_autodelete.css`

```css
/*! Alters the webextension Cookie AutoDelete
  IMPORTANT: change the Internal UUID */
@-moz-document url-prefix("moz-extension://CookieAutoDelete@kennydo.com/") {
  a {
    color: var(--accent-1)
  }
  a:hover {
    color: var(--accent-2)
  }
  #layout,
  html {
    background: var(--tone-7)!important;
    color: var(--primart-light-color)!important
  }
  #menu {
    background-color: var(--tone-8)!important
  }
  .menu-link {
    background: var(--tone-8)!important
  }
  .pure-menu-item:hover,
  .pure-menu-selected {
    background-color: var(--tone-6)!important
  }
  .form-control,
  input[type=number] {
    -moz-appearance: none!important;
    background: var(--tone-6)!important;
    color: var(--tone-4)!important;
    border-color: var(--tone-5)!important
  }
  .nav-tabs .nav-link {
    color: var(--tone-4)!important
  }
  .nav-tabs .nav-link.active {
    color: var(--accent-1)!important;
    background-color: var(--tone-6)!important;
    border-color: #ddd #ddd #fff!important
  }
  body {
    color: var(--tone-4)!important;
    background-color: var(--tone-6)!important
  }
  .btn-light {
    color: var(--tone-4)!important;
    background-color: var(--tone-5)!important;
    border-color: var(--tone-4)!important
  }
}

```

## File: `css/userContent-files/webextension-tweaks/dark_mode.css`

```css
/*! Alters the webextension Dark Mode
  IMPORTANT: change the Internal UUID */
@-moz-document url-prefix("moz-extension://{174b2d58-b983-4501-ab4b-07e71203cb43}/") {
  .comment {
    color: var(--in-content-link-color)!important
  }
  .title {
    background-color: var(--in-content-category-header-background)!important
  }
  .highlight {
    background-color: var(--in-content-box-border-color)!important
  }
}

```

## File: `css/userContent-files/webextension-tweaks/downloads_sidebar.css`

```css
/*! Alters the webextension Downloads sidebar
  IMPORTANT: change the Internal UUID */
@-moz-document url-prefix("moz-extension://{bbb81fb3-49c1-4a42-bcc9-94bc93e19fb8}/") {
  body {
    background: var(--in-content-page-background)!important;
    color: var(--in-content-page-color)!important
  }
  .btn,
  .cancel-button,
  .erase-button {
    filter: invert(60%)
  }
  .toolbar-bottom {
    border-color: var(--in-content-border-color)!important
  }
  .toolbar-bottom button {
    color: var(--in-content-page-color)!important
  }
  .toolbar-bottom button:hover {
    background: var(--in-content-box-background-hover)!important
  }
}

```

## File: `css/userContent-files/webextension-tweaks/dustman.css`

```css
/*! Alters the webextension Dustman
  IMPORTANT: change the Internal UUID */
@-moz-document url-prefix("moz-extension://jid1-i37bkuPx3kABMw@jetpack/panel/") {
  .recently-closed {
    background-color: var(--in-content-box-background)!important;
    color: var(--in-content-page-color)!important
  }
  .recently-closed a,
  .recently-closed:empty::before {
    color: var(--in-content-page-color)!important
  }
  .recently-closed a:hover {
    background-color: var(--in-content-box-background)!important;
    border: 1px solid!important
  }
  .button {
    background-color: var(--tone-7)!important;
    border-top: 1px solid!important;
    color: var(--in-content-page-color)!important
  }
  .button:active,
  .button:hover {
    background-color: var(--tone-7)!important
  }
}
/*! Alters the webextension Dustman
  IMPORTANT: change the Internal UUID */
@-moz-document url-prefix("moz-extension://jid1-i37bkuPx3kABMw@jetpack/settings/") {
  label {
    color: var(--in-content-page-color);
    font-weight: 700
  }
  .form-group p {
    color: var(--in-content-page-color)!important
  }
}

```

## File: `css/userContent-files/webextension-tweaks/generic_style.css`

```css
/*! Pop Up Background Fixes */
@-moz-document url-prefix("moz-extension://{7fc8ef53-24ec-4205-87a4-1e745953bb0d}/popup.html"),
url-prefix("moz-extension://https-everywhere@eff.org/pages/popup"),
url-prefix("moz-extension://jid1-BoFifL9Vbdl2zQ@jetpack/pages/popup"),
url-prefix("moz-extension://{b3e677f4-1150-4387-8629-da738260a48e}/data/data/popup.html"),
url-prefix("moz-extension://renametabtitle@mozilla.org/popup/popup.html"),
url-prefix("moz-extension://{6f5f4891-9637-41f9-9ee5-3a0ac02cf254}/popup"),
url-prefix("moz-extension://{e4a8a97b-f2ed-450b-b12d-ee082ba24781}/src/browser/monkey-menu"),
url-prefix("moz-extension://{b43b974b-1d3a-4232-b226-eaa2ac6ebb69}/"),
url-prefix("moz-extension://woop-NoopscooPsnSXQ@jetpack") {
  :root {
    --in-content-page-background: var(--tone-6)!important;
    --in-content-box-background: rgba(11,11,12,0.2)!important;
    --in-content-box-border-color: rgba(249, 249, 250, 0.3)!important;
    --in-content-box-background-hover: rgba(11,11,12,0.2)!important
  }
  button {
    margin-top: 3px!important
  }
  input {
    margin-top: 3px!important;
    margin-bottom: 3px!important
  }
  input,
  textarea {
    margin-left: 0!important
  }
}
@-moz-document url-prefix("moz-extension://YoutubeDownloader@PeterOlayev.com"),
url-prefix("moz-extension://autocopy@mozilla.org"),
url-prefix("moz-extension://{b5a43a70-4092-4899-9c44-63799150b35e}"),
url-prefix("moz-extension://octopatcher_wowmotty@gmail.com"),
url-prefix("moz-extension://{54BB9F3F-07E5-486c-9B39-C7398B99391C}"),
url-prefix("moz-extension://multipletab@piro.sakura.ne.jp/"),
url-prefix("moz-extension://neaturl@hugsmile.eu/"),
url-prefix("moz-extension://smart-referer@meh.paranoid.pk/"),
url-prefix("moz-extension://{e225ac78-5e83-484b-a16b-b6ed0924212f}/"),
url-prefix("moz-extension://{7fc8ef53-24ec-4205-87a4-1e745953bb0d}/"),
url-prefix("moz-extension://https-everywhere@eff.org/"),
url-prefix("moz-extension://skipredirect@sblask/"),
url-prefix("moz-extension://{174b2d58-b983-4501-ab4b-07e71203cb43}/"),
url-prefix("moz-extension://jid1-BoFifL9Vbdl2zQ@jetpack/"),
url-prefix("moz-extension://{b3e677f4-1150-4387-8629-da738260a48e}/"),
url-prefix("moz-extension://jid0-HYNmqxA9zQGfJADREri4n2AHKSI@jetpack/options/options"),
url-prefix("moz-extension://treestyletab@piro.sakura.ne.jp/options/options"),
url-prefix("moz-extension://translator@zoli.bod"),
url-prefix("moz-extension://enhancerforyoutube@maximerf.addons.mozilla.org/options.html"),
url-prefix("moz-extension://{bee6eb20-01e0-ebd1-da83-080329fb9a3a}/html/options.html"),
url-prefix("moz-extension://back2close@bomjacob.github.io/"),
url-prefix("moz-extension://{7e56c1ad-71c3-47fe-bdba-372c7770e0cb}/"),
url-prefix("moz-extension://newtabfromlocationbar@piro.sakura.ne.jp/"),
url-prefix("moz-extension://mobislan@users.noreply.github.com/"),
url-prefix("moz-extension://{6f5f4891-9637-41f9-9ee5-3a0ac02cf254}/"),
url-prefix("moz-extension://display-anchors@robwu.nl/"),
url-prefix("moz-extension://renametabtitle@mozilla.org/"),
url-prefix("moz-extension://{e4a8a97b-f2ed-450b-b12d-ee082ba24781}/src/browser/monkey-menu"),
url-prefix("moz-extension://{b43b974b-1d3a-4232-b226-eaa2ac6ebb69}/"),
url-prefix("moz-extension://woop-NoopscooPsnSXQ@jetpack"),
url-prefix("moz-extension://Chrome-Store-Foxified@jetpack"),
url-prefix("moz-extension://extension@one-tab.com"),
url-prefix("moz-extension://generic_styling_1"),
url-prefix("moz-extension://generic_styling_2"),
url-prefix("moz-extension://generic_styling_3"),
url-prefix("moz-extension://generic_styling_4"),
url-prefix("moz-extension://generic_styling_5") {
  * {
    color: var(--in-content-page-color)!important;
    background-color: var(--in-content-page-background)!important;
    border-color: var(--in-content-box-border-color)!important;
    text-shadow: none!important
  }
  select {
    color: #000!important
  }
  select * {
    background-color: var(--in-content-box-background)!important
  }
  a {
    color: var(--in-content-link-color)!important
  }
  a:hover {
    color: var(--in-content-link-color-hover)!important
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--in-content-category-text-selected)!important
  }
  fieldset {
    border: 2px solid!important;
    border-color: var(--in-content-box-border-color)!important
  }
  input:not([type=checkbox]) {
    background: var(--in-content-box-background)!important;
    color: var(--in-content-page-color)!important
  }
  input[type=file] {
    background-color: var(--in-content-page-background)!important
  }
  input[type=input],
  input[type=number],
  input[type=text],
  input[type=textbox],
  input[type=url],
  textarea {
    -moz-appearance: none!important;
    background: var(--in-content-box-background)!important;
    color: var(--in-content-page-color)!important;
    border: 1px solid!important;
    border-color: var(--in-content-box-border-color)!important;
    margin-left: 3px!important;
    padding-left: 3px!important
  }
  input:checked + .slider {
    background-color: var(--in-content-primary-button-background)!important
  }
  input:not(:checked) + .slider {
    background-color: var(--in-content-box-background)!important
  }
  textarea {
    margin: 2px 0!important;
    padding: 5px!important
  }
  .button,
  button,
  input[type=submit] {
    -moz-appearance: none!important;
    background-image: none!important;
    background-color: var(--in-content-page-background)!important;
    color: var(--in-content-page-color)!important;
    border: 1px solid!important;
    border-color: var(--in-content-box-border-color)!important;
    border-radius: 3px!important
  }
  .button:hover,
  button:hover,
  input[type=submit]:hover {
    background-color: var(--in-content-box-background-hover)!important
  }
}
/*! Code Mirror */
@-moz-document url-prefix("moz-extension://{aecec67f-0d10-4fa7-b7c7-609a2db280cf}/"),
url-prefix("moz-extension://uBlock0@raymondhill.net/"),
url-prefix("moz-extension://uMatrix@raymondhill.net/"),
url-prefix("moz-extension://{e4a8a97b-f2ed-450b-b12d-ee082ba24781}/src/content/edit-user-script") {
  .CodeMirror {
    border: 1px solid!important;
    border-color: var(--cm-background)!important;
    background: var(--cm-background)!important;
    color: #b1b1b3!important;
    font-size: 11px!important;
    line-height: 14px!important
  }
  .CodeMirror-line > span > span::selection,
  .CodeMirror-line > span::selection,
  .CodeMirror-line::selection,
  div.CodeMirror-selected {
    background: var(--cm-selection)!important
  }
  div.CodeMirror-selected {
    background: #353b48!important
  }
  .CodeMirror-gutters {
    background: var(--theme-sidebar-background)!important;
    border-right: 0 solid!important
  }
  .CodeMirror-guttermarker,
  .CodeMirror-guttermarker-subtle {
    color: var(--cm-marker)!important
  }
  .CodeMirror-linenumber {
    padding: 0 8px 0 5px!important;
    color: var(--cm-linenumber)!important
  }
  .CodeMirror-cursor {
    border-left: 1px solid!important;
    border-color: var(--cm-cursor)!important
  }
  span.cm-comment,
  span.cm-hr,
  span.cm-meta {
    color: #939393!important
  }
  span.cm-atom,
  span.cm-attribute,
  span.cm-builtin,
  span.cm-error,
  span.cm-keyword,
  span.cm-quote {
    color: var(--theme-highlight-red)!important
  }
  span.cm-number,
  span.cm-string,
  span.cm-string-2 {
    color: #6b89ff!important
  }
  span.cm-bracket,
  span.cm-def,
  span.cm-header,
  span.cm-link:visited,
  span.cm-qualifier,
  span.cm-tag,
  span.cm-variable-2 {
    color: var(--theme-highlight-blue)!important
  }
  span.cm-property {
    color: var(--theme-highlight-green)!important
  }
  span.cm-variable {
    color: var(--theme-highlight-purple)!important
  }
  span.cm-special,
  span.cm-variable-3 {
    color: var(--in-content-text-color)!important
  }
  span.cm-link {
    color: var(--in-content-box-border-color)!important
  }
  span.cm-operator {
    color: var(--in-content-page-color)!important
  }
  .CodeMirror-activeline-background {
    background: var(--cm-active-line-background)!important
  }
  .CodeMirror-matchingbracket {
    outline: var(--cm-matching-bracket) solid 1px!important;
    color: var(--cm-cursor)!important
  }
  .CodeMirror-merge-l-chunk {
    background: var(--in-content-page-background)!important
  }
  .cm-search-widget {
    background-color: var(--theme-sidebar-background)!important;
    border: 1px solid;
    border-bottom: none!important;
    border-color: var(--in-content-category-header-background)!important;
    max-height: 15px!important;
    justify-content: right!important
  }
  .cm-search-widget input {
    -moz-appearance: none!important;
    background-color: var(--cm-search-background)!important;
    border: 1px solid!important;
    border-color: var(--in-content-table-border-dark-color)!important;
    color: var(--in-content-page-color)!important;
    border-radius: 8px!important;
    padding-left: 8px!important
  }
  .cm-searching {
    background-color: var(--warning-background-color)!important
  }
  .cm-staticOpt {
    background-color: var(--in-content-box-background)!important;
    font-weight: 700
  }
  .CodeMirror-merge-gap {
    background-color: var(--theme-sidebar-background)!important;
    border-top: 1px solid!important;
    border-bottom: 1px solid!important;
    border-right: none!important;
    border-left: none!important;
    border-color: var(--cm-background)!important
  }
  .CodeMirror-merge {
    border: none!important
  }
  .cm-search-widget span.fa {
    color: var(--in-content-border-color)!important;
    font-size: 100%!important
  }
  .cm-staticext {
    color: var(--theme-highlight-blue)!important
  }
  .cm-staticnetBlock {
    color: var(--cm-red)!important
  }
  .cm-staticnetAllow {
    color: var(--theme-highlight-green)!important
  }
}
/*! Icons */
/*! Redirector button for dark Firefox themes */
toolbarbutton#toggle-button--redirectoreinaregilssoncom-redirector[image*=active] {
  filter: invert(100%) brightness(600%)
}
toolbarbutton#toggle-button--redirectoreinaregilssoncom-redirector[image*=disabled] {
  filter: invert(100%) brightness(250%)
}

```

## File: `css/userContent-files/webextension-tweaks/greasemonkey.css`

```css
@-moz-document url-prefix("moz-extension://{e4a8a97b-f2ed-450b-b12d-ee082ba24781}/") {
  body,
  html {
    background: var(--in-content-page-background)!important
  }
  #tabs .tab.active,
  .command-item {
    background: var(--tone-8)!important;
    color: var(--in-content-page-color)!important
  }
  .subview-back::before {
    content: url(/skin/back.svg);
    filter: invert(65%)
  }
  .subview-back:focus,
  .subview-back:hover,
  .subview-item:focus,
  .subview-item:hover {
    background-color: var(--in-content-category-background-hover)!important;
    cursor: default;
    color: inherit;
    text-decoration: none
  }
  .subview-item .icon,
  .subview-item .text {
    background: 0 0!important
  }
}

```

## File: `css/userContent-files/webextension-tweaks/momentum.css`

```css
/*! Alters the webextension Momentum
  IMPORTANT: change the Internal UUID */
@-moz-document url-prefix("moz-extension://momentum@momentumdash.com/dashboard.html") {
  body {
    background-color: var(--tone-8)!important
  }
}

```

## File: `css/userContent-files/webextension-tweaks/multi_account_containers.css`

```css
/*! Alters the webextension Multi-Account Containers
  IMPORTANT: change the Internal UUID in BOTH locations */
@-moz-document url-prefix("moz-extension://@testpilot-containers/") {
  #current-tab,
  .column-panel-content,
  .container-panel-row,
  .userContext-wrapper,
  html body div#container-panel.panel.container-panel {
    background: var(--in-content-box-background)!important;
    color: var(--in-content-page-color)!important
  }
  #current-tab > h3,
  .container-info-list,
  .panel-header-text {
    color: var(--in-content-page-color)!important
  }
  #container-panel #sort-containers-link {
    border-color: var(--in-content-box-border-color)!important;
    color: var(--in-content-page-color)!important
  }
  #container-panel #sort-containers-link:hover,
  .clickable:hover {
    background: var(--tone-7)!important
  }
  .container-panel-row {
    background-color: var(--tone-6)!important;
    border-block-end: 1px solid var(--tone-5);
    color: var(--in-content-page-color)!important
  }
  .scrollable {
    border-block-start: 1px solid var(--tone-5)!important;
    background: var(--tone-6)!important
  }
  .panel-footer {
    background: var(--tone-7)!important;
    border-block-end: 1px solid var(--tone-7)!important
  }
  .container-panel-row:focus .clickable.userContext-wrapper,
  .container-panel-row:hover .clickable.userContext-wrapper,
  .container-panel-row:hover .pop-button,
  .panel-header {
    background: var(--tone-7)!important
  }
  .panel-back-arrow {
    background: var(--tone-6)!important
  }
  .back-arrow-img {
    filter: invert(65%)!important
  }
  .container-panel-row {
    border-block-end: 1px solid var(--tone-5)!important
  }
  #current-tab > label > input[disabled] {
    background-color: var(--tone-5)!important;
    border-color: var(--tone-4)!important
  }
  #current-tab > label > input:checked {
    filter: invert(100%);
    border-color: var(--tone-5)!important
  }
  .column-panel-content form {
    background: var(--tone-6)!important
  }
  .pop-button-image-small {
    filter: invert(650%)!important
  }
  .edit-container-panel fieldset,
  .edit-containers-text a {
    color: var(--in-content-page-color)!important
  }
  .edit-container-panel input[type=text] {
    background: var(--tone-8)!important;
    color: var(--in-content-page-color)!important;
    border-color: var(--tone-5)!important
  }
  [data-identity-color=grey] {
    --identity-icon-color: var(--tone-4)!important
  }
  .button {
    color: var(--in-content-page-color)!important
  }
  .container-notification {
    background: var(--tone-7)!important;
    color: var(--in-content-page-color)!important
  }
  .edit-containers-text {
    border-inline-end: solid 0 #d8d8d8!important
  }
}
/*! Alters the webextension Multi-Account Containers
 IMPORTANT: change the Internal UUID in BOTH locations */
@-moz-document url-prefix("moz-extension://@testpilot-containers/popup") {
  html {
    background-color: var(--in-content-box-background)!important
  }
}
/*! Alters the webextension Multi-Account Containers
  IMPORTANT: change the Internal UUID in BOTH locations */
@-moz-document url-prefix("moz-extension://@testpilot-containers/confirm-page") {
  body {
    background-color: var(--tone-7)!important
  }
  .title-text,
  body {
    color: var(--in-content-page-color)!important
  }
  #redirect-url {
    background: var(--tone-8)!important
  }
  .button-container > button:first-child {
    background: var(--in-content-box-background)!important;
    border-color: var(--tone-5)!important
  }
  .button-container > button:first-child:hover {
    background: var(--tone-8)!important
  }
  #never-ask {
    -moz-appearance: none!important;
    background-color: var(--tone-6)!important;
    border-color: var(--in-content-box-border-color)!important;
    background-image: none!important;
    box-shadow: none!important
  }
  #never-ask:checked {
    background-image: url(chrome://global/skin/in-content/check.svg),url(chrome://global/skin/icons/check.svg)!important;
    background-color: var(--tone-6)!important
  }
}

```

## File: `css/userContent-files/webextension-tweaks/noscript.css`

```css
/*! Alters the webextension NoScript
  IMPORTANT: change the Internal UUID */
@-moz-document url-prefix("moz-extension://{73a6fe31-595d-460b-a920-fcc0f8843232}/") {
  body {
    background: var(--tone-6)!important
  }
  #top {
    border-color: var(--tone-5)!important
  }
  .site .url[data-key=full] span,
  .site .url[data-key=secure] .domain,
  .site .url[data-key=secure] .sub {
    color: var(--tone-4)!important
  }
  .sites > tr:nth-child(2n) {
    background: var(--tone-6)!important
  }
  .sites > tr:nth-child(2n+1) {
    background: var(--tone-7)!important
  }
  #presets input.preset,
  .presets input.preset:checked {
    color: var(--tone-4)!important;
    background-color: var(--tone-8)!important
  }
  #sect-general,
  .presets label.preset {
    color: var(--tone-4)!important
  }
  button,
  input[type=text] {
    -moz-appearance: none!important;
    background-color: var(--tone-7)!important;
    border-color: var(--tone-5)!important;
    color: var(--primar-light-color)!important
  }
  #top #close,
  #top #options,
  #top #reload,
  #top #revoke-temp,
  #top #temp-allow-page {
    background-color: var(--tone-6)!important;
    border: none!important
  }
}

```

## File: `css/userContent-files/webextension-tweaks/onetab.css`

```css
@-moz-document url-prefix("moz-extension://extension@one-tab.com") {
  .clickable span {
    color: var(--in-content-link-color)!important
  }
  .clickable div {
    box-shadow: none!important;
    background-color: var(--in-content-box-background)!important
  }
}

```

## File: `css/userContent-files/webextension-tweaks/pocket.css`

```css
.pkt_ext_containersaved .pkt_ext_tag_input_wrapper input::placeholder,
.pkt_ext_containersaved h2,
.token-input-dropdown-tag ul li {
  color: var(--in-content-page-color)!important
}
.pkt_ext_containersaved .pkt_ext_tag_detail,
.pkt_ext_containersaved .pkt_ext_tag_input_wrapper,
.token-input-dropdown-tag {
  border-color: var(--in-content-box-border-color)!important;
  background: var(--in-content-box-background)!important
}
.pkt_ext_containersaved .pkt_ext_tag_input_wrapper input {
  background-color: var(--in-content-box-background)!important;
  color: var(--in-content-page-color)!important
}
.pkt_ext_containersaved .pkt_ext_btn {
  background: var(--in-content-category-header-background)!important
}
.pkt_ext_containersaved .token-input-token {
  border-color: var(--in-content-box-border-color)!important;
  background-color: var(--in-content-table-border-dark-color)!important;
  color: var(--in-content-page-color)!important
}

```

## File: `css/userContent-files/webextension-tweaks/random_user_agent.css`

```css
@-moz-document url-prefix("moz-extension://{b43b974b-1d3a-4232-b226-eaa2ac6ebb69}/") {
  .box-min input[type=checkbox]:checked ~ i {
    background: var(--in-content-link-color)!important;
    border-color: var(--in-content-link-color)!important
  }
  .toggle label {
    background-color: var(--in-content-page-color)!important
  }
  .toggle input:checked + label {
    background-color: var(--in-content-link-color)!important
  }
  #main .block h2 {
    color: var(--in-content-text-color)!important
  }
  #main .block h5,
  .bugreport-link {
    color: var(--in-content-page-color)!important
  }
}

```

## File: `css/userContent-files/webextension-tweaks/request_control.css`

```css
/*! Alters the webextension Request Control
  IMPORTANT: change the Internal UUID */
@-moz-document url-prefix("moz-extension://{1b1e6108-2d88-4f0f-a338-01f9dbcccd6f}/") {
  * {
    color: var(--in-content-page-color)!important
  }
  body {
    background-color: var(--in-content-page-background)!important
  }
  .page-header,
  hr {
    border-color: var(--in-content-box-border-color)!important
  }
  .nav-tabs.nav-justified > li > a {
    border-bottom-color: var(--in-content-box-border-color)!important
  }
  .badge {
    color: var(--in-content-text-color)!important
  }
  .rule:not(.editing):not(:hover) {
    background-color: var(--in-content-box-background)!important
  }
  .editing .rule-header,
  .list-group-item,
  .rule:hover:not(.editing) {
    background-color: var(--in-content-box-background-hover)!important;
    border-color: var(--in-content-box-border-color)!important
  }
  .nav-tabs > li > a:hover,
  .nav-tabs > li.active > a,
  .nav-tabs > li.active > a:focus,
  .nav-tabs > li.active > a:hover {
    background-color: var(--in-content-category-header-background)!important;
    border-color: var(--in-content-box-border-color)!important
  }
  tabs.nav-justified > li > a {
    border-bottom: 1px solid!important;
    border-color: var(--in-content-box-border-color)!important
  }
  .btn-default {
    background-color: var(--in-content-page-background)!important;
    border-color: var(--in-content-box-border-color)!important
  }
  .btn-default.active {
    background-color: var(--in-content-box-background-active)!important
  }
  .btn-default:hover {
    background-color: var(--in-content-box-background-hover)!important
  }
  .list-group-item:first-child {
    background: var(--in-content-box-background)!important;
    border-color: var(--in-content-box-border-color)!important
  }
  .table,
  .table-striped > tbody > tr:nth-of-type(2n+1) {
    background-color: var(--in-content-box-background)!important
  }
  .tags-input,
  input[type=text],
  select {
    background: var(--in-content-page-background)!important;
    color: var(--in-content-text-color)!important;
    border-color: var(--in-content-box-border-color)!important
  }
  .tags-input .tag {
    background: var(--in-content-item-selected)!important;
    border-color: var(--in-content-box-border-color)!important
  }
  button img,
  img.arrow {
    filter: invert(65%)!important
  }
}

```

## File: `css/userContent-files/webextension-tweaks/tree_style_tab.css`

```css
/*! Alters the webextension Tree Style Tab
  IMPORTANT: change the Internal UUID in BOTH locations */
@-moz-document url-prefix("moz-extension://treestyletab@piro.sakura.ne.jp/resources/group-tab.html") {
  :root {
    background: var(--tone-7)!important
  }
  h1::before {
    background: var(--tone-4)!important
  }
  #tabs img[src="https://assets-cdn.github.com/favicon.ico"] {
    filter: invert(55%)!important
  }
}
/*! Alters the webextension Tree Style Tab
  IMPORTANT: change the Internal UUID all BOTH locations */
@-moz-document url-prefix("moz-extension://treestyletab@piro.sakura.ne.jp/") {
  /*! Use Plain Dark Appearance */
#debug-configs,
  p,
  ul {
    color: var(--tone-4)!important
  }
  h1,
  legend {
    color: var(--accent-1)!important
  }
  a {
    color: var(--accent-2)!important
  }
  #contextual-identities-selector,
  #newtab-action-selector,
  #tabContextMenu,
  .extra.has-submenu ul {
    background: var(--tone-6)!important;
    border: none!important
  }
  .menu-ui-59858.menu-ui.menu li.separator {
    border-color: var(--in-content-box-border-color)!important
  }
  .tab {
    background: var(--in-content-page-background)!important;
    border-color: var(--in-content-category-header-background)!important
  }
  .tab .counter,
  .tab .label {
    color: var(--in-content-page-color)!important
  }
  :root.simulate-svg-context-fill .closebox::after {
    background: var(--in-content-page-color)!important
  }
  .tab:hover {
    background-color: var(--in-content-category-header-background)!important
  }
  .tab.active {
    background-color: var(--in-content-border-focus)!important
  }
  .tab.selected {
    background-color: var(--primary-accent-color-dark)!important
  }
  .tab.active .label,
  .tab.selected .label {
    color: #fff!important
  }
  .tab.active:hover {
    background-color: var(--in-content-primary-button-background)!important
  }
  .tab.discarded {
    opacity: .75!important
  }
  .tab.discarded .label {
    color: var(--in-content-box-border-color)!important
  }
  .tab.unread .label {
    font-style: italic!important
  }
  .tab:not(:hover) .closebox {
    display: none!important
  }
  .after-tabs button,
  .twisty {
    color: var(--in-content-page-color)!important
  }
  .simulate-svg-context-fill:root .newtab-button::before {
    background: var(--in-content-page-color)!important
  }
  .tab.active .twisty {
    color: #fff!important
  }
  .newtab-button {
    background-color: var(--tone-7)!important
  }
  .newtab-button:hover {
    background-color: var(--tone-8)!important
  }
  #all-tabs .tab:not(.active)[data-current-uri*="github.com"] .favicon {
    filter: invert(65%)!important
  }
  .simulate-svg-context-fill:root .tab.group-tab .favicon-default::before {
    filter: invert(45%)!important
  }
  #background,
  #background::after,
  #tabbar {
    background: var(--in-content-page-background)!important
  }
}

```

## File: `css/userContent-files/webextension-tweaks/tridactyl.css`

```css
/*! Alters the webextension Tridactyl
  IMPORTANT: change the Internal UUID */
@-moz-document url-prefix("moz-extension://tridactyl.vim@cmcaine.co.uk/") {
  .container-main,
  body,
  html {
    background: var(--in-content-page-background)!important
  }
  .tsd-panel {
    background: var(--in-content-box-background)!important
  }
  .tsd-page-title,
  .tsd-page-toolbar,
  footer {
    background: var(--in-content-category-header-background)!important;
    border-color: var(--in-content-category-header-background)!important
  }
  body,
  table {
    color: var(--in-content-page-color)!important
  }
  a:link {
    color: var(--in-content-link-color)!important
  }
  #completions .sectionHeader {
    background: var(--in-content-category-header-background)!important;
    color: var(--in-content-text-color)!important
  }
  #completions {
    background: var(--in-content-page-background)!important;
    border-color: var(--in-content-box-border-color)!important
  }
  .option:not(.focused) .url {
    color: var(--code-green)!important;
    background: var(--in-content-page-background)!important
  }
  input {
    background: var(--in-content-category-header-background)!important;
    color: var(--in-content-text-color)!important
  }
  .focused,
  .focused .url {
    background: var(--warning-background-color)!important;
    color: var(--warning-color)!important
  }
  .spoiler {
    background-color: var(--in-content-box-background)!important;
    border-color: var(--in-content-box-border-color)!important
  }
}

```

## File: `css/userContent-files/webextension-tweaks/ublock_origin.css`

```css
/*! Alters the webextension uBlock Origin
  IMPORTANT: change the Internal UUID */
@-moz-document url-prefix("moz-extension://uBlock0@raymondhill.net/") {
  button.custom {
    background-color: var(--in-content-page-background)!important;
    background-image: none!important;
    border-color: var(--in-content-box-border-color)!important;
    color: var(--in-content-text-color)!important/*! opacity: 1!important/**/
  }
  button#bye,
  button#proceedPermanent,
  button#proceedTemporary {
    -moz-appearance: none!important;
    background-image: none!important;
    background-color: var(--in-content-page-background)!important;
    color: var(--in-content-page-color)!important;
    border: 1px solid!important;
    border-color: var(--in-content-box-border-color)!important;
    border-radius: 3px!important
  }
  button#bye:hover,
  button#proceedPermanent:hover,
  button#proceedTemporary:hover,
  button.custom:hover {
    background-color: var(--in-content-box-background-hover)!important
  }
  button.custom.disabled,
  button.custom[disabled] {
    opacity: .5!important
  }
  #appinfo {
    background-color: var(--tone-8)!important;
    color: var(--tone-4)!important
  }
  #panes,
  body,
  body[dir=ltr] #panes > div {
    background: var(--tone-7)!important;
    color: var(--tone-3)!important
  }
  #diff {
    border-color: var(--tone-5)!important
  }
  #whyex a,
  label a,
  p a,
  ul a,
  ul#userSettings .subgroup > span {
    color: var(--accent-1)!important
  }
  #whyex a:visited,
  .content:visited {
    color: var(--in-content-link-color-visited)!important
  }
  #dashboard-nav-widgets span {
    color: var(--tone-4)!important
  }
  a.info {
    color: var(--tone-4)!important;
    opacity: .5
  }
  li.listEntry span.status {
    color: var(--tone-4)!important
  }
  li.listEntry > a.remove,
  li.listEntry > a.remove:visited {
    color: var(--red-80)!important
  }
  #switch .fa {
    color: var(--accent-1)!important
  }
  .tool,
  body.off #switch .fa {
    color: var(--tone-4)!important
  }
  #extraTools > span:hover,
  .tool.enabled:hover,
  body.dirty #refresh:hover {
    color: var(--tone-2)!important
  }
  #extraTools,
  #extraTools > span > span.badge,
  h2 {
    background-color: var(--tone-8)!important;
    color: var(--tone-4)!important
  }
  #refresh {
    background-color: var(--tone-8)!important;
    border-color: var(--tone-5)!important
  }
  #firewallContainer > div {
    background-color: var(--tone-6)!important
  }
  #firewallContainer > div > span {
    color: var(--tone-4)!important;
    border-color: var(--tone-5)!important
  }
  #netFilteringDialog .dialog > div.containers > div.dynamic tr.entry > td > div.action.own.block,
  body.advancedUser #firewallContainer > div > span.blockRule.ownRule {
    background-color: #ab0000!important;
    color: var(--tone-2)!important
  }
  #netFilteringDialog .dialog > div.containers > div.dynamic tr.entry > td > div.action > span.block,
  body.advancedUser #firewallContainer > div > span.blockRule {
    background-color: #dda0a2!important;
    color: var(--tone-2)!important
  }
  #firewallContainer > div.blocked > span:first-of-type::before,
  #firewallContainer.minimized > div.isDomain.totalBlocked > span:first-of-type::before {
    background-color: #c87576!important;
    opacity: 1!important;
    color: var(--tone-2)!important
  }
  #netFilteringDialog .dialog > div.containers > div.dynamic tr.entry > td > div.action.own.allow,
  body.advancedUser #firewallContainer > div > span.allowRule.ownRule {
    background-color: #229400!important;
    color: var(--tone-2)!important
  }
  #netFilteringDialog .dialog > div.containers > div.dynamic tr.entry > td > div.action > span.allow,
  body.advancedUser #firewallContainer > div > span.allowRule {
    background-color: #95ca8a!important;
    color: var(--tone-2)!important
  }
  #firewallContainer > div.allowed > span:first-of-type::before,
  #firewallContainer.minimized > div.isDomain.totalAllowed > span:first-of-type::before {
    background-color: #7ec26f!important;
    color: var(--tone-2)!important;
    opacity: 1!important
  }
  #actionSelector > span:nth-of-type(2),
  #netFilteringDialog .dialog > div.containers > div.dynamic tr.entry > td > div.action.own.noop,
  body.advancedUser #firewallContainer > div > span.noopRule.ownRule {
    background-color: #0c46a7!important;
    color: var(--tone-2)!important
  }
  #netFilteringDialog .dialog > div.containers > div.dynamic tr.entry > td > div.action > span.noop,
  body.advancedUser #firewallContainer > div > span.noopRule {
    background-color: #65bdfb!important;
    color: var(--tone-2)!important
  }
  #firewallContainer > div.allowed.blocked > span:first-of-type::before,
  #firewallContainer.minimized > div.isDomain.totalAllowed.totalBlocked > span:first-of-type::before {
    background-color: #cdc16e!important;
    opacity: 1!important
  }
  #dashboard-nav-widgets {
    border-color: var(--tone-5)!important;
    background-color: var(--tone-8)!important
  }
  .tabButton {
    background-color: var(--tone-7)!important;
    color: var(--tone-4)!important;
    border-bottom: 1px solid!important;
    border-color: var(--tone-5)!important
  }
  .tabButton.selected {
    background-color: var(--tone-8)!important;
    border-color: var(--tone-5)!important
  }
  #ruleFilter input,
  input[type=number] {
    -moz-appearance: none!important;
    background-color: var(--tone-6)!important;
    border: 1px solid!important;
    border-color: var(--tone-5)!important;
    color: var(--tone-4)!important
  }
  li.listEntry .content {
    color: var(--accent-1)!important
  }
  #diff .pane {
    color: var(--tone-4)!important;
    background: var(--tone-7)!important
  }
  #diff li,
  code {
    background-color: var(--tone-6)!important
  }
  #diff li:nth-child(2n) {
    background-color: var(--tone-7)!important
  }
  #whitelist textarea {
    background: var(--tone-6)!important;
    color: var(--tone-4)!important
  }
  textarea#externalLists,
  textarea#userFilters.userFilters {
    -moz-appearance: none!important;
    background: var(--tone-6)!important;
    color: var(--tone-4)!important;
    border: 1px solid!important;
    border-color: var(--tone-4)!important
  }
  .permatoolbar {
    background-color: var(--tone-7)!important
  }
  .permatoolbar #refresh,
  .permatoolbar .button {
    background-color: transparent!important
  }
  .permatoolbar #refresh,
  .permatoolbar .button:hover {
    background-color: var(--grey-60)!important
  }
  .modalDialog .dialog {
    background-color: var(--tone-8)!important;
    border-color: var(--tone-5)!important
  }
  li.listEntry > a.remove,
  li.listEntry > a.remove:visited,
  li.listEntry span.failed,
  li.listEntry span.unsecure {
    color: #de7474!important
  }
  a.fa.support,
  a.mustread {
    color: var(--in-content-page-color)!important
  }
  li.listEntry.mustread > a.mustread:hover {
    color: var(--accent-2)!important
  }
  li.listEntry span.obsolete {
    color: var(--warning-color)!important
  }
  input[type=text] {
    -moz-appearance: none!important;
    background: var(--tone-6)!important;
    color: var(--in-content-page-color)!important;
    border: none!important
  }
  #modalOverlay > div > div:nth-of-type(2):hover svg {
    stroke: var(--tone-1)!important
  }
  /*! COLORBLIND MODE START 
       Colors can be replaced by changing the first 6 digits of the 8 digit RGBA Hex value
       #00136e = dark blue */
body.colorBlind #netFilteringDialog > .panes > .details > div[data-status="1"],
  body.colorBlind #vwRenderer .logEntry > div.cosmetic,
  body.colorBlind #vwRenderer .logEntry > div.redirect,
  body.colorBlind #vwRenderer .logEntry > div[data-status="1"] {
    background-color: #00136e1a!important
  }
  body.colorBlind #netFilteringDialog > .panes > .details > div[data-status="1"] b,
  body.colorBlind #vwRenderer .logEntry > div[data-status="1"] > span:nth-of-type(7) b {
    background-color: #00136e33!important
  }
  body.advancedUser #firewallContainer.colorBlind > div > span.blockRule,
  body.colorBlind #netFilteringDialog > div.panes > .dynamic .entry > .action.block {
    background-color: #00136e66!important
  }
  #actionSelector.colorBlind > span:nth-of-type(3),
  #firewallContainer.colorBlind > div.blocked > span:first-of-type::before,
  #firewallContainer.colorBlind.minimized > div.isDomain.totalBlocked > span:first-of-type::before,
  body.advancedUser #firewallContainer.colorBlind > div > span.blockRule.ownRule,
  body.colorBlind #netFilteringDialog > div.panes > .dynamic .entry > .action > .block,
  body.colorBlind #netFilteringDialog > div.panes > .dynamic .entry > .action.own.block {
    background-color: #00136eff!important
  }
  /*! #606060 = grey */
body.colorBlind #vwRenderer .logEntry > div[data-status="3"] {
    background-color: #6060601a!important
  }
  body.colorBlind #vwRenderer .logEntry > div[data-status="3"] > span:nth-of-type(7) b {
    background-color: #60606033!important
  }
  body.advancedUser #firewallContainer.colorBlind > div > span.noopRule,
  body.colorBlind #netFilteringDialog > div.panes > .dynamic .entry > .action.noop {
    background-color: #60606066!important
  }
  /*! #6c6c6c = light grey */
#netFilteringDialog > div.panes > .dynamic .entry > .action.own.noop,
  body.colorBlind #netFilteringDialog > div.panes > .dynamic .entry > .action.own.noop {
    background-color: #6c6c6cff!important
  }
  /*! #ffc239 = yellow */
body.colorBlind #netFilteringDialog > .panes > .details > div[data-status="2"],
  body.colorBlind #vwRenderer .logEntry > div[data-status="2"] {
    background-color: #ffc2391a!important
  }
  body.colorBlind #netFilteringDialog > .panes > .details > div[data-status="2"] b,
  body.colorBlind #vwRenderer .logEntry > div[data-status="2"] > span:nth-of-type(7) b {
    background-color: #ffc23933!important
  }
  body.advancedUser #firewallContainer.colorBlind > div > span.allowRule,
  body.colorBlind #netFilteringDialog > div.panes > .dynamic .entry > .action.allow {
    background-color: #ffc23966!important
  }
  #actionSelector.colorBlind > span:first-of-type,
  #firewallContainer.colorBlind > div.allowed > span:first-of-type::before,
  #firewallContainer.colorBlind.minimized > div.isDomain.totalAllowed > span:first-of-type::before,
  body.advancedUser #firewallContainer.colorBlind > div > span.allowRule.ownRule,
  body.colorBlind #netFilteringDialog > div.panes > .dynamic .entry > .action > .allow,
  body.colorBlind #netFilteringDialog > div.panes > .dynamic .entry > .action.own.allow {
    background-color: #ffc239ff!important
  }
  /*! COLORBLIND MODE END */

}
@-moz-document url-prefix("moz-extension://uBlock0@raymondhill.net/logger-ui") {
  .fa-icon > svg,
  .ubo-icon > svg {
    fill: var(--in-content-page-color)!important
  }
  .permatoolbar .button.active {
    fill: var(--in-content-link-color)!important
  }
  textarea {
    -moz-appearance: none;
    background: var(--in-content-box-background)!important;
    color: var(--in-content-text-color)!important;
    border: 1px solid!important
  }
  #netFilteringDialog > .panes > .details > div[data-status="1"],
  #vwRenderer .logEntry > div[data-status="1"] {
    background-color: #463237!important
  }
  a {
    color: var(--in-content-link-color)
  }
  select {
    color: var(--in-content-selected-text)!important;
    border-color: var(--in-content-box-border-color)!important;
    background: var(--tone-6)!important;
    -moz-appearance: none!important;
    /*! remove default arrow *//*! add custom arrow */padding-right: 18px!important;
    background-image: url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2248%22%20height%3D%2248%22%20viewBox%3D%220%200%2048%2048%22%3E%3Cpath%20d%3D%22M20%2020l10%2010%2010-10z%22%20fill%3D%22%23ccc%22%2F%3E%3C%2Fsvg%3E)!important;
    background-position: center right!important;
    background-repeat: no-repeat!important;
    background-size: contain!important
  }
  select#pageSelector {
    color: var(--in-content-selected-text)!important;
    border-color: var(--in-content-box-border-color)!important;
    background: var(--tone-6)!important;
    -moz-appearance: none!important;
    /*! remove default arrow *//*! add custom arrow */padding-right: 25px!important;
    background-image: url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2248%22%20height%3D%2248%22%20viewBox%3D%220%200%2048%2048%22%3E%3Cpath%20d%3D%22M20%2020l10%2010%2010-10z%22%20fill%3D%22%23ccc%22%2F%3E%3C%2Fsvg%3E)!important;
    background-position: center right!important;
    background-repeat: no-repeat!important;
    background-size: contain!important
  }
  /*! #netInspector */
#netInspector tr.blocked {
    background-color: #4b3137!important;
    color: #ff9494!important
  }
  #netInspector #filterInput,
  #netInspector #maxEntries {
    -moz-appearance: none!important;
    background: var(--tone-6)!important;
    color: var(--tone-4)!important;
    border: 1px solid!important;
    padding: 5px!important
  }
  #netInspector tr.cosmetic,
  #netInspector tr.redirect {
    background-color: #44391f!important;
    color: #fce19f!important
  }
  #netInspector tr.cat_net td:nth-of-type(4):hover,
  body:not(.popupOn) #netInspector tr.canMtx td:nth-of-type(2):hover {
    background: var(--tone-8)!important
  }
  body #netInspector td {
    border-color: var(--tone-5)!important
  }
  #netInspector tr.maindoc {
    background-color: var(--tone-8)!important;
    color: var(--grey-30)!important
  }
  #netInspector #filterExprPicker {
    background-color: var(--in-content-box-background)!important;
    color: var(--tone-3)!important;
    border-color: var(--in-content-box-border-color)!important
  }
  #netInspector #filterExprPicker > div {
    border: none!important;
    border-top: 1px solid!important
  }
  #netInspector #filterExprPicker > div:first-of-type {
    border: none!important
  }
  #netInspector #filterInput > input {
    background: var(--in-content-box-background)!important;
    -moz-appearance: none
  }
  #netInspector #filterInput {
    border-color: var(--in-content-box-border-color)!important
  }
  #netInspector #filterExprPicker span.on[data-filtex] {
    background-color: var(--in-content-primary-button-background)!important;
    border: 1px solid!important;
    color: var(--in-content-selected-text)!important
  }
  #netInspector #filterExprPicker span[data-filtex]:hover {
    background-color: var(--in-content-primary-button-background-hover)!important;
    border: 1px solid!important;
    color: var(--in-content-selected-text)!important
  }
  #netInspector #filterExprButton {
    top: 0!important
  }
  #netInspector #filterExprButton:hover {
    background-color: transparent!important
  }
  #netInspector #vwRenderer .logEntry > div.canDetails:hover > span {
    background-color: var(--accent-3)!important
  }
  /*! #netFilteringDialog */
#netFilteringDialog .dialog > div.headers > span.header.selected {
    background-color: var(--tone-8)!important;
    color: var(--tone-4)!important;
    border-color: var(--tone-6)!important
  }
  #netFilteringDialog .dialog > div.headers > span.header {
    background-color: var(--tone-7)!important;
    border-color: var(--tone-6)!important
  }
  #netFilteringDialog .dialog > div.containers > div.dynamic tr.entry {
    background-color: var(--tone-6)!important;
    border-color: var(--tone-5)!important
  }
  #netFilteringDialog .dialog > div.containers > div.dynamic tr.entry > td:first-of-type {
    border-color: var(--tone-5)!important
  }
  #netFilteringDialog .dialog > div.containers > div.dynamic > table.toolbar #saveRules {
    background-color: var(--tone-6)!important;
    border: none!important
  }
  body[dir=ltr] #netFilteringDialog > .panes > .details > div > span:nth-of-type(1) {
    border-color: var(--in-content-box-border-color)!important
  }
  #netFilteringDialog > .headers > .header {
    background-color: var(--in-content-box-background)!important;
    border-color: var(--in-content-box-border-color)!important
  }
  #netFilteringDialog[data-pane=details] > .headers > [data-pane=details],
  #netFilteringDialog[data-pane=dynamic] > .headers > [data-pane=dynamic],
  #netFilteringDialog[data-pane=static] > .headers > [data-pane=static] {
    background-color: var(--in-content-box-background)!important;
    border-color: var(--in-content-box-border-color)!important;
    color: var(--in-content-selected-text)!important
  }
  #netFilteringDialog > .panes > .details > div,
  #netFilteringDialog > div.panes > .dynamic .entry {
    background-color: var(--in-content-box-background)!important;
    border-color: var(--in-content-box-border-color)!important
  }
  /*! domInspector */
#domInspector li > span:first-child {
    color: var(--in-content-page-color)!important
  }
  #domInspector li.isCosmeticHide,
  #domInspector li.isCosmeticHide li,
  #domInspector li.isCosmeticHide ul {
    background-color: var(--red-90)!important
  }
  /*! #modalOverlay */
#modalOverlay > div > div:nth-of-type(1),
  #modalOverlay > div > div:nth-of-type(2) {
    background-color: var(--in-content-page-background)!important
  }
  #modalOverlay > div > div:nth-of-type(2) svg {
    stroke: var(--tone-4)!important
  }
  /*! #loggerExportDialog */
#loggerExportDialog .options span.on[data-i18n],
  #loggerExportDialog .options span.pushbutton:active {
    background-color: var(--in-content-primary-button-background)!important;
    color: var(--in-content-selected-text)!important
  }
  #loggerExportDialog .options span[data-i18n] {
    border: 1px solid!important
  }
  #loggerExportDialog .options span[data-i18n]:hover {
    background-color: var(--in-content-primary-button-background-hover)!important;
    color: var(--in-content-selected-text)!important;
    border-color: var(--in-content-primary-button-background-hover)!important
  }
}
@-moz-document url-prefix("about:blank") {
  aside {
    background-color: var(--in-content-page-background)!important;
    border-color: var(--tone-8)!important;
    color: var(--in-content-page-color)!important
  }
  ul > li > ul > li:hover {
    background-color: var(--in-content-box-background)!important
  }
  section > div:first-child > textarea {
    background-color: var(--in-content-box-background)!important;
    color: var(--in-content-page-color)!important
  }
  section > div:first-child {
    border-color: var(--in-content-box-border-color)!important
  }
  section.invalidFilter > div:first-child {
    border-color: red!important
  }
  button {
    background-color: var(--in-content-page-background)!important;
    border-color: var(--in-content-box-border-color)!important;
    color: var(--in-content-page-color)!important
  }
  button:disabled {
    color: var(--tone-5)!important
  }
  button:not(:disabled):hover {
    background-color: var(--in-content-box-background-hover)!important
  }
  #create:not(:disabled) {
    background-color: var(--theme-highlight-yellow)!important;
    color: #000!important
  }
  body.preview #preview {
    background-color: var(--theme-highlight-blue)!important;
    color: #000!important
  }
}

```

## File: `css/userContent-files/webextension-tweaks/ubo_scope.css`

```css
/*! Alters the webextension uBO-Scope
  IMPORTANT: change the Internal UUID */
@-moz-document url-prefix("moz-extension://uBO-Scope@raymondhill.net/") {
  #heatmaps .togglerBar,
  body,
  body.theoretical #heatmaps .heatmap.theoretical {
    background: var(--tone-6)!important
  }
  #heatmaps {
    background-color: var(--in-content-box-border-color)!important
  }
  #domain3rdDetails {
    border-color: var(--in-content-box-border-color)!important;
    background-color: var(--in-content-page-background)!important
  }
  #topPane {
    background-color: var(--tone-6)!important;
    color: var(--tone-4)!important
  }
  #heatmaps .heatmap {
    border: none;
    background: var(--tone-6)!important
  }
  #heatmaps.list .hmcell {
    background-color: var(--tone-6)!important;
    color: var(--tone-4)!important
  }
  #domain3rdDetails #authority {
    background-color: var(--tone-8)!important;
    position: relative
  }
  #scores .scores .score.actual {
    color: #fff!important
  }
  #scores .scores .score.theoretical,
  body.theoretical #scores .scores .score.actual {
    color: var(--tone-7)!important
  }
  body.theoretical #scores .scores .score.theoretical {
    color: var(--tone-4)!important
  }
}
@-moz-document url-prefix("moz-extension://uBO-Scope@raymondhill.net/options.html") {
  body,
  html {
    background-color: var(--in-content-page-background)!important;
    color: var(--in-content-page-color)!important
  }
  * {
    border-color: var(--in-content-box-border-color)!important
  }
}

```

## File: `css/userContent-files/webextension-tweaks/ultrawide_video.css`

```css
/*! Alters the webextension UltraWide Video 21:9
  IMPORTANT: change the Internal UUID */
@-moz-document url-prefix("moz-extension://{75afe46a-7a50-4c6b-b866-c43a1075b071}/html/popup.html") {
  html {
    background: var(--in-content-box-background)!important;
    color: var(--in-content-page-color)!important;
    border: 3px solid!important
  }
}

```

## File: `css/userContent-files/webextension-tweaks/umatrix.css`

```css
/*! Alters the webextension uMatrix
  IMPORTANT: change the Internal UUID */
@-moz-document url-prefix("moz-extension://uMatrix@raymondhill.net/") {
  .t81 {
    color: #fff;
    background-color: #db4c4c!important
  }
  .t82 {
    background-color: #4cab4c!important
  }
  .t2 {
    border-color: #b2dbb2!important;
    color: #000;
    background-color: #b2dbb2!important
  }
  /*! Light red */
.t1 {
    border-color: #efb2b2!important;
    color: #000;
    background-color: #efb2b2!important
  }
  .matCell.p81 {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAATCAYAAACk9eypAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAIFJREFUeNrs0jEKg0AQRuHnluYE8Q4WCx5DWz2P4PlsFqKQXCOtv0UQEcWd7TOwzfC9aid717WIzbJQDMOUe985C372/Zx73wHBWfCjqlogADgL/jRN2NYuBV8HN/gcRPAxMOA9MOJfkIAB+I7jS1IpCcsjBUsik+KndP8P/+A86wBEqo7b/a3QQwAAAABJRU5ErkJggg==)!important;
    background-repeat: no-repeat;
    background-position: -1px -1px
  }
  /*! Green Corner */
.matCell.p82 {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAATCAYAAACk9eypAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAHNJREFUeNrs0jENgDAQRuHXc8KAAzywFAlYwBgIQAJoIEFKfyZICIT2di7pcvne1AtxjCIzSYmhGda2anvzYGAzDwawEtxN3XbuzYNfgy/8CHL4FpTgKyjFAObBAMz7vEiqJVHy8GBJBCl7Snz+wx+8zDEAx9OY2E5gMz8AAAAASUVORK5CYII=)!important;
    background-repeat: no-repeat;
    background-position: -1px -1px
  }
  body.colorblind .t82 {
    border-color: #ffd474!important;
    color: #000;
    background-color: #ffd474!important
  }
  body.colorblind .t2 {
    border-color: #ffecc3!important;
    color: #000;
    background-color: #ffecc3!important
  }
  body.colorblind .t81 {
    background-color: #4c5999!important
  }
  body.colorblind .t1 {
    border-color: rgba(0,19,110,.3);
    color: #000;
    background-color: #b2b8d3!important
  }
  body.colorblind .matCell.p81 {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAATCAYAAACk9eypAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAG5JREFUeNrky8ENQFAQRdE704sO9GBDASS2tlaKoRIlECX8Wn7GikQIf9be8uVcKevR+FiM0A/dWuS06sEiEtSDATQFV80Ujl89+DF4w7fgC1+CFHwGqRhAPRiAebPFzDJS58KAmJnHozj3y2AfADI/UFubcKw2AAAAAElFTkSuQmCC)!important
  }
  body.colorblind .matCell.p82 {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAATCAYAAACk9eypAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAGVJREFUeNrky7ERQEAQQNF/m5LqhlyoEKFSFKKIK0EppLcyM8bd2Y39+P2g+6IYSt2ItNsgHhyaNYoVp2OKAOLB1SGHi0MJZ4cafg1f+DFY8D1YMYB4MAB6zj2Ogqp6PIKzXw7XAAojP05DZKgtAAAAAElFTkSuQmCC)!important
  }
  body .toolbar #specificScope > span.on {
    background-color: var(--accent-3)!important
  }
  .matRow {
    background: var(--tone-4)!important
  }
  #matHead {
    border-color: var(--in-content-box-border-color)!important
  }
  body[dir=ltr] {
    background-color: var(--tone-7)!important;
    color: var(--tone-4)!important
  }
  #dashboard-nav-widgets {
    background-color: var(--tone-8)!important;
    color: var(--tone-4)!important;
    border-bottom: 1px solid!important;
    border-color: var(--tone-5)!important
  }
  .tabButton {
    background-color: var(--tone-7)!important;
    color: var(--tone-4)!important;
    border-color: var(--tone-5)!important
  }
  .tabButton.selected {
    background-color: var(--tone-8)!important;
    border-color: var(--tone-5)!important
  }
  button.custom.important {
    background-color: #ffcc7f!important;
    color: #000!important;
    opacity: .8!important
  }
  .ruleActions button,
  button.custom,
  button.custom.important.disabled,
  button.custom.important[disabled] {
    -moz-appearance: none!important;
    background-color: var(--in-content-page-background)!important;
    border: 1px solid!important;
    border-radius: 3px!important;
    background-image: none!important;
    border-color: var(--in-content-box-border-color)!important;
    color: var(--in-content-text-color)!important;
    opacity: 1!important
  }
  #commitButton,
  #diff.editing #exportButton,
  #diff.editing #importButton,
  #editSaveButton,
  #revertButton {
    opacity: .25!important
  }
  button.custom:hover,
  button:hover {
    background-color: var(--in-content-box-background-hover)!important
  }
  button.custom.disabled,
  button.custom.important.disabled,
  button.custom.important[disabled],
  button.custom[disabled] {
    opacity: .5!important
  }
  #diff.dirty:not(.editing) #commitButton,
  #diff.dirty:not(.editing) #revertButton,
  #diff.editing #editSaveButton {
    opacity: 1!important
  }
  button.custom.important:hover {
    background-color: #ffcc7f!important;
    opacity: 1!important
  }
  a.fa.support,
  a.mustread {
    color: var(--in-content-page-color)!important
  }
  li.listEntry span.status {
    color: var(--tone-4)!important
  }
  li.listEntry.mustread > a.mustread:hover {
    color: var(--accent-2)!important
  }
  li.listEntry span.obsolete {
    color: var(--warning-color)!important
  }
  li.listEntry > a.remove,
  li.listEntry > a.remove:visited,
  li.listEntry span.failed,
  li.listEntry span.unsecure {
    color: #de7474!important
  }
  #backupUserDataButton,
  #clearBrowserCacheAfter,
  #deleteUnusedSessionCookiesAfter,
  #externalHostsFiles,
  #popupScopeLevel,
  #resetUserDataButton,
  #restoreUserDataButton {
    -moz-appearance: none!important;
    background: var(--tone-6)!important;
    color: var(--tone-4)!important;
    border: 1px solid!important;
    border-color: var(--tone-5)!important
  }
  a {
    color: var(--accent-1)!important
  }
  #diff li {
    background-color: var(--tone-7)!important
  }
  #diff li:nth-of-type(2n),
  .assets > div:first-of-type {
    background-color: var(--tone-8)!important
  }
  .assets {
    border: 1px solid!important;
    border-color: var(--tone-5)!important
  }
  #diff li:hover {
    background-color: var(--accent-1)!important;
    color: #fff!important
  }
  #diff ul {
    border-top: 1px solid!important
  }
  html body div.assets div {
    background-color: var(--in-content-box-background)!important
  }
  textarea {
    -moz-appearance: none!important;
    background: var(--tone-8)!important;
    color: var(--tone-4)!important;
    border: 1px solid!important;
    border-color: var(--tone-5)!important;
    padding: 5px!important
  }
  #diff textarea {
    border-top: 1px solid!important;
    border-color: var(--tone-5)!important;
    background: var(--tone-6)!important;
    color: var(--tone-4)!important
  }
  .whatisthis-expandable {
    background-color: var(--tone-8)!important;
    border: 1px dotted!important;
    border-color: var(--tone-5)!important
  }
  .paneHead {
    background-color: var(--tone-7)!important
  }
  .paneContent {
    background: var(--tone-4)!important
  }
  #gotoDashboard {
    background-color: var(--tone-8)!important;
    color: var(--tone-4)!important
  }
  body[dir=ltr] #gotoDashboard > span:last-of-type {
    color: var(--tone-4)!important
  }
  body .toolbar button {
    color: var(--primary--light-color)!important
  }
  body .toolbar .scopeRel {
    color: var(--accent-2)!important
  }
  button > span.badge {
    color: #fff!important;
    background-color: var(--tone-5)!important
  }
  body .toolbar button {
    background-color: var(--tone-7)!important
  }
  body .toolbar button.disabled {
    color: var(--tone-4);
    color: var(--tone-6)!important
  }
  body .toolbar .scope {
    background-color: var(--tone-6)!important;
    border: 1px solid!important;
    border-color: var(--tone-5)!important
  }
  #parsed {
    background-color: var(--tone-8)!important;
    border: 1px solid!important;
    border-top: none!important;
    border-color: var(--tone-5)!important
  }
  .code {
    background-color: var(--tone-8)!important;
    border: 1px solid!important;
    border-bottom: none!important;
    border-color: var(--tone-5)!important
  }
  button#bye {
    -moz-appearance: none!important;
    background: var(--tone-6)!important;
    border: 1px solid!important;
    border-color: var(--tone-5)!important;
    color: var(--tone-4)!important
  }
  button#bye:hover {
    background: var(--tone-8)!important
  }
  .dropdown-menu > ul,
  .recipe:hover {
    border: 1px solid!important;
    border-color: var(--tone-5)!important;
    background-color: var(--tone-8)!important
  }
  .dropdown-menu > ul > li.dropdown-menu-entry {
    color: var(--tone-6)!important
  }
  #mtxSwitches > li.switchTrue {
    color: var(--tone-4)!important
  }
  .dropdown-menu > ul > li.dropdown-menu-entry:hover {
    background: var(--tone-7)!important
  }
  .recipe .name {
    color: var(--tone-4)!important
  }
  #toolbar,
  #toolbar .button {
    background-color: var(--tone-8)!important
  }
  #ruleFilter input,
  #toolbar input {
    -moz-appearance: none!important;
    background: var(--tone-6)!important;
    color: var(--tone-4)!important;
    border: 1px solid!important;
    border-color: var(--tone-5)!important;
    padding: 5px!important
  }
  #content table tr {
    background-color: var(--tone-6)!important
  }
  #content table tr:nth-of-type(2n+1) {
    background-color: var(--tone-7)!important
  }
  #content table tr.doc {
    background-color: var(--tone-8)!important
  }
  body:not(.popupOn) #content table tr.canMtx td:nth-of-type(2):hover {
    background: var(--tone-8)!important
  }
  body #content td {
    border-color: var(--tone-5)!important
  }
  #content table tr.blocked {
    color: var(--cm-red)!important
  }
  #content table tr.cat_info {
    color: var(--accent-1)!important
  }
  #toolbar {
    border-bottom: 1px solid!important;
    border-color: var(--tone-5)!important
  }
  .fa-icon {
    fill: var(--in-content-page-color)!important
  }
  .fa-icon.fa-icon-badged > .fa-icon-badge {
    background-color: var(--in-content-box-background)!important;
    color: var(--in-content-page-color)!important
  }
  .fa-icon:hover {
    background-color: var(--in-content-box-background)!important
  }
  .toolbar .fa-icon {
    fill: var(--in-content-link-color)!important
  }
  #mtxSwitch_matrix-off.switchTrue {
    fill: red!important;
    color: red!important
  }
  .fa-icon_list-alt,
  .fa-icon_reply-all,
  .fa-icon_sync-alt {
    fill: var(--in-content-page-color)!important
  }
}

```

## File: `css/userContent-files/webextension-tweaks/vim_vixen.css`

```css
/*! Alters the webextension Vim Vixen
  IMPORTANT: change the Internal UUID */
@-moz-document url-prefix("moz-extension://vim-vixen@i-beam.org/") {
  .vimvixen-console-command-wrapper {
    border-top: 1px solid!important
  }
  .vimvixen-console-completion-title {
    background-color: var(--tone-9)!important;
    border-color: var(--tone-5)!important
  }
  .vimvixen-console-completion {
    background-color: var(--tone-8)!important;
    color: #b1b1b3!important;
    font-family: Menlo,monospace!important
  }
  .vimvixen-console-command,
  .vimvixen-console-command-input {
    background-color: var(--tone-9)!important;
    color: var(--grey-30)!important
  }
  .vimvixen-console-completion-item-url {
    color: #86de74!important
  }
  .vimvixen-console-completion-item.vimvixen-completion-selected {
    background-color: #44391f!important;
    color: #fce19f!important
  }
  .vimvixen-console-error {
    background-color: #4b3137!important;
    color: #ff9494!important
  }
  .vimvixen-settings-form,
  h1 {
    color: var(--tone-4)!important
  }
  .vimvixen-settings-form textarea[name=json] {
    background-color: var(--tone-6)!important;
    -moz-appearance: none!important;
    color: var(--tone-4)!important;
    border-color: var(--tone-6)
  }
  ::-moz-selection {
    color: var(--grey-30);
    background: var(--accent-2)
  }
}

```

## File: `css/userContent-files/webextension-tweaks/violentmonkey.css`

```css
/*! Alters the webextension Violentmonkey
  IMPORTANT: change the Internal UUID */
@-moz-document url-prefix("moz-extension://{aecec67f-0d10-4fa7-b7c7-609a2db280cf}/") {
  .edit-settings,
  .tab,
  section > h3 {
    background: var(--in-content-page-background)!important;
    border-color: var(--in-content-box-background)!important
  }
  .tab-installed > header {
    background: var(--in-content-category-header-background)!important;
    border-color: var(--in-content-box-background)!important
  }
  .aside-content {
    background: var(--in-content-category-header-background)!important
  }
  .aside-menu > a.active,
  .aside-menu > a:hover,
  h1,
  h2 {
    color: var(--in-content-link-color)!important
  }
  body {
    background: var(--in-content-page-background)!important;
    color: var(--in-content-page-color)!important
  }
  .script {
    background: var(--in-content-box-background)!important;
    border-color: var(--in-content-box-border-color)!important
  }
  svg {
    fill: var(--in-content-page-color)!important
  }
  .menu-item:hover svg {
    fill: var(--in-content-selected-text)!important
  }
  .menu {
    border-color: var(--in-content-box-border-color)!important
  }
  input[type=text],
  textarea {
    -moz-appearance: none!important;
    background: var(--in-content-box-background)!important;
    color: var(--in-content-page-color)!important;
    border: 1px solid!important;
    padding: 2px!important;
    border-color: var(--in-content-box-border-color)!important
  }
  input[type=text] {
    border-radius: 3px!important
  }
  .export-list > .ellipsis.active {
    border-color: var(--in-content-primary-button-background)!important;
    background: var(--in-content-primary-button-background)!important
  }
  .export-list > .ellipsis.active:hover {
    border-color: var(--in-content-primary-button-background-hover)!important;
    background: var(--in-content-primary-button-background-hover)!important
  }
  button {
    -moz-appearance: none!important;
    background: var(--in-content-page-background)!important;
    border: 1px solid!important;
    border-color: var(--in-content-box-border-color)!important;
    color: var(--in-content-text-color)!important;
    margin-top: 5px!important;
    margin-right: 5px!important;
    border-radius: 3px!important
  }
  button:not([disabled]):hover {
    background-color: var(--in-content-box-background-hover)!important
  }
  button[disabled] {
    opacity: .5!important
  }
  .btn-ghost:hover {
    border-color: var(--in-content-box-background)!important;
    background: var(--in-content-page-background)!important
  }
  .edit-nav > div.active {
    background: var(--in-content-page-background)!important;
    color: var(--in-content-page-color)!important
  }
  .flex.edit-header > .buttons > button:nth-child(2):not([disabled=disabled]):after {
    content: '?'!important
  }
  .flex.edit-header > .buttons > button:nth-child(2)[disabled=disabled]:after {
    content: 'd'!important
  }
  .menu-item:hover,
  .submenu-button {
    background: var(--theme-selection-background-hover)!important;
    color: var(--in-content-selected-text)!important
  }
  .flex.edit-header,
  .message.modal-content {
    background: var(--in-content-category-header-background)!important
  }
  .menu.expand,
  .page-popup,
  .submenu,
  html {
    background: var(--in-content-box-background)!important
  }
  .vl-dropdown-menu {
    border: 1px solid!important;
    background: var(--in-content-page-background)!important
  }
  .dropdown-menu-item:hover {
    background: var(--grey-80)!important
  }
  .dropdown-menu-item {
    color: var(--in-content-page-color)!important
  }
  .frame-block {
    background: var(--in-content-box-background)!important
  }
}

```

## File: `css/userContent-files/webextension-tweaks/youtube_video_and_audio_downloader.css`

```css
/*! Alters the webextension YouTube Video And Audio Downloader (WebEx)
  IMPORTANT: change the Internal UUID */
@-moz-document url-prefix("moz-extension://{f73df109-8fb4-453e-8373-f59e61ca4da3}/") {
  #content,
  body {
    color: var(--tone-2)!important;
    background-color: var(--tone-8)!important
  }
  body > div > div:not(#items) {
    background-color: var(--tone-5)!important
  }
  #settings {
    background-color: var(--tone-8)!important;
    border-top: 1px solid #fff
  }
  #settings > div {
    background-color: transparent
  }
  body[data-loading=true] {
    background-color: var(--tone-8)!important
  }
  .item {
    background-color: var(--tone-5)!important;
    color: var(--tone-2)!important
  }
  #close,
  #externals {
    background-color: var(--tone-5)!important
  }
}

```

## File: `css/userContent-files/websites/bing.css`

```css
/* PIP button */
.pip-wrapper {
  transform: scale(0.6);
}

/*--------------------------------------------------------------------------------*/

/*bing declutter*/

@-moz-document domain("bing.com") {
  .vs_cont .vs,
  .vs_cont .mc_caro {
    display: none !important;
  }
  e .sb_feedback_button {
    opacity: 0.4 !important;
    border-radius: 10px !important;
  }
}

```

## File: `css/userContent-files/websites/reddit.css`

```css
/* dark mode */

@-moz-document domain("reddit.com"), domain("new.reddit.com"), url-prefix("https://www.reddit.com/"), url-prefix("https://new.reddit.com/")
{
  @media (prefers-color-scheme: dark) {
    :root:not(.theme-light) .theme-beta,
    :root:not(.theme-light).theme-beta,
    * {
      /* main body background */
      --color-neutral-background: #090913 !important;
      --color-neutral-background: var(--uc-layered-background) !important;
      /* global 🟠 orange */
      --color-global-orangered: #5268bb !important;
      --color-brand-background: #5268bb !important;
      --color-global-brand-orangered: #5268bb !important;
      /* secondary background. search bars, sidebars */
      --color-secondary-background: #26334417 !important;
      --color-neutral-background-weak: #1d1d2f !important;
      --color-neutral-background-medium: #1d1d2f !important;
      --color-neutral-background-strong: #1d1d2f !important;
      /* hover elements */
      --color-secondary-background-hover: #37445e !important;
      --color-neutral-background-hover: #37445e4d !important;
      /* selected elements */
      --color-neutral-background-selected: #37445e4d !important;
      /* theme specific */

    }
    /* notify */
    .unread-notification {
      background-color: rgba(237, 36, 36, 0.1) !important;
    }
    /* side panel padding */
    .pt-md {
      padding-top: 2rem !important;
    }

    /* mostly search bar */
    .rounded-\[1\.25rem\] {
      border-radius: 1.25rem !important;
    }
    .bg-neutral-background-strong {
      background-color: #0b0d17 !important;
    }
    .py-xs {
      padding-top: 0 !important;
    } /*previously 1.5rem*/
    .rounded-sm {
      border-radius: 10px !important;
    }
    :host([faceplate-validity="valid"][novalidate]) .label-container,
    .label-container,
    :host([faceplate-validity="invalid"]) .label-container,
    :host([faceplate-validity="valid"]) .label-container {
      box-shadow: 0rem 0.1rem 0.4rem -0.1rem rgba(62, 73, 130, 0.7) !important;
    }
    /* user pages */
    .embedded-page {
      background: #828299 !important;
    }
    .embedded-page #header {
      background-color: #828299 !important;
    }
    .content .menuarea {
      border-top-right-radius: 10px !important;
      border-top-left-radius: 10px !important;
      padding-top: 10px !important;
      background-color: transparent !important;
    }
    .embedded-page .content {
      margin: 2% !important;
      background: transparent !important;
      border-radius: 10px !important;
    }
    .embedded-page .flat-list {
      margin-left: 60px !important;
    }
    #siteTable .thing {
      border-radius: 20px !important;
      margin-bottom: 20px !important;
    }
    .footer-parent .footer {
      background: #1a1a1b !important;
    }
    .md pre {
      border-radius: 20px !important;
    }
    #credential_picker_container iframe {
      border-radius: 20px !important;
    }
    /* individual accent colors ----------------- */
    :root,
    * {
      --uc-i-hate-orange: #5268bb;
    }
    /* notification badge color */
    ._1-nIsCaWhGBFN-L4ZHnbGp {
      background: var(--uc-i-hate-orange) !important;
    }
    /* header icon */
    .snoo-cls-10 {
      fill: var(--uc-i-hate-orange) !important;
    }
    .snoo-cls-4 {
      fill: var(--uc-i-hate-orange) !important;
    }
    .snoo-cls-7 {
      fill: var(--uc-i-hate-orange) !important;
    }
    /* icons */
    ._10BQ7pjWbeYP63SAPNS8Ts.q_unSaY23rpdd3lDvGZ- {
      background-color: var(--uc-i-hate-orange) !important;
    }
    .icon._3-m5rOa3loUClNwpCv1uWU {
      color: var(--uc-i-hate-orange) !important;
    }
    .icon._2wYneOcJEB6o4mj1NedmsR {
      color: var(--uc-i-hate-orange) !important;
    }
  }
  @media (prefers-color-scheme: light) {
    :root:not(.theme-light) .theme-beta,
    :root:not(.theme-light).theme-beta,
    * {
      /*--main body background--*/
      --color-neutral-background: rgb(35, 45, 75) !important;
      --color-neutral-background-hover: red !important;

      /*--global 🟠 orange--*/
      --color-global-orangered: #5268bb !important;
      --color-brand-background: #5268bb !important;
      --color-global-brand-orangered: #5268bb !important;
      /*--secondary background. search bars, sidebars--*/
      --color-secondary-background: #26334417 !important;
      --color-neutral-background-weak: #1d1d2f !important;
      --color-neutral-background-medium: #1d1d2f !important;
      --color-neutral-background-strong: #1d1d2f !important;
      /*--hover elements--*/
      --color-secondary-background-hover: #37445e !important;
      --color-neutral-background-hover: #37445e4d !important;
      /*--selected elements--*/
      --color-neutral-background-selected: rgb(255, 60, 0) !important;
      /*--notis--*/
    }
    .label-container.without-label {
      box-shadow: 0rem 0.1rem 0.4rem -0.1rem rgba(62, 73, 130, 1) !important;
    }
  }
} /*--<--end reddit--*/

```

## File: `css/userContent-files/websites/youtube.css`

```css
@-moz-document domain("youtube.com") {
  @media -moz-pref("user.theme.xtension.YT") {
    /* all themes except Transparent -------------------------------------------------------*/
    @media not -moz-pref("user.theme.transparent") {
      :root {
        @media (prefers-color-scheme: dark) {
          --uc-seamless-bg: var(--uc-browser-color) !important;
          --yt-spec-base-background: var(--uc-layered-background) !important;
          --yt-frosted-glass-desktop: color-mix(
            in srgb,
            var(--uc-browser-color) 50%,
            transparent
          ) !important;
          @media -moz-pref("user.theme.0.default") {
            --uc-seamless-bg: rgba(1, 1, 1, 0.75) !important;
            --yt-spec-base-background: rgba(1, 1, 1, 0.5) !important;
            --yt-frosted-glass-desktop: color-mix(
              in srgb,
              inherit,
              transparent
            ) !important;
          }
        }
      }
      :root {
        @media (prefers-color-scheme: light) {
          --uc-seamless-bg: var(--yt-spec-base-background) !important;
        }
      }
      /*page color*/
      html,
      html[dark],
      body,
      ytd-app {
        background-color: var(--uc-seamless-bg) !important;
      }
      /*ambientmode filter*/
      #cinematics-container canvas,
      #shorts-cinematic-container {
        opacity: 0.2 !important;
        backdrop-filter: blur(5px) !important;
        mask-image: radial-gradient(
          circle,
          var(--uc-browser-color) 10%,
          rgba(0, 0, 0, 0) 40%
        );
      }
      /*sidebar*/
      #background.ytd-masthead {
        background: var(--uc-seamless-bg) !important;
        filter: saturate(140%) !important;
        backdrop-filter: blur(33px);
      }
      #contentContainer {
        background: var(--uc-seamless-bg) !important;
        backdrop-filter: blur(33px);
      }
      /* header*/
      #background.ytd-masthead {
        background: var(--uc-seamless-bg) !important;
        backdrop-filter: blur(50px);
      }
      #header {
        background: transparent !important;
        backdrop-filter: blur(50px);
      }
      #frosted-glass.with-chipbar.ytd-app {
        height: 58px !important;
      }
      ytd-feed-filter-chip-bar-renderer {
        --ytd-rich-grid-chips-bar-top: 0px !important;
        top: 0 !important;
      }
      /*search bar*/
      .ytSearchboxComponentInputBoxDark,
      html[dark] .sbsb_a,
      .ytSearchboxComponentSearchButton {
        background-color: var(--uc-layered-background) !important;
        border-color: rgba(0, 0, 0, 0.1) !important;
        backdrop-filter: blur(17px);
      }
      /*search results popup*/
      .ytSearchboxComponentSuggestionsContainer {
        background-color: rgba(0, 0, 0, 0.5) !important;
        @media (prefers-color-scheme: light) {
          background-color: rgba(100, 100, 100, 0.1) !important;
        }
        backdrop-filter: blur(35px);
      }
      /*notifications popup*/
      .ytd-multi-page-menu-renderer {
        @media -moz-pref("user.theme.0.default") {
          --uc-seamless-bg: rgba(1, 1, 1, 0.1) !important;
        }
        background-color: var(--uc-seamless-bg) !important;
      }
      .style-scope.ytd-popup-container {
        background-color: rgba(0, 0, 0, 0.2) !important;
        @media (prefers-color-scheme: light) {
          background-color: transparent !important;
        }
        border-radius: 10px !important;
        backdrop-filter: blur(35px);
      }
      /*video player context menu*/
      .ytp-popup {
        @media -moz-pref("user.theme.0.default") {
          --uc-seamless-bg: rgba(1, 1, 1, 0.1) !important;
        }
        background-color: var(--uc-seamless-bg) !important;
      }
      .ytp-popup.ytp-contextmenu {
        background-color: var(--uc-seamless-bg) !important;
        @media (prefers-color-scheme: light) {
          background-color: rgba(100, 100, 100, 0) !important;
        }
        border-radius: 10px !important;
        backdrop-filter: blur(33px);
      }
      .ytp-panel-menu {
        padding: 8px !important;
      }
      .ytp-menuitem:hover {
        border-radius: 10px !important; /* nogo for tables */
        clip-path: xywh(0 0 100% 100% round 0.5em) !important;
        background-color: rgba(40, 40, 50, 0.5) !important;
        @media (prefers-color-scheme: light) {
          background-color: rgba(0, 0, 0, 0.3) !important;
        }
      }
      .ytp-panel-menu {
        background-color: rgba(0, 0, 0, 0.5) !important;
        @media (prefers-color-scheme: light) {
          background-color: rgba(100, 100, 100, 0.3) !important;
        }
        backdrop-filter: blur(33px);
      }
      .ytp-popup.ytp-settings-menu {
        @media (prefers-color-scheme: light) {
          background-color: rgba(0, 0, 0, 0.3) !important;
        }
      }
      /*thumbnails*/
      .yt-spec-icon-badge-shape--style-overlay
        .yt-spec-icon-badge-shape__badge {
        border: 0px solid rgba(0, 0, 0, 0.8) !important;
      }
      .badge-style-type-live-now-alternate.ytd-badge-supported-renderer {
        background: rgba(92, 198, 223, 0.9) !important;
        color: var(--yt-spec-static-brand-white) !important;
      }
    } /* end theme */

    /* transparent -------------------------------------------------------------------------*/
    @media -moz-pref("user.theme.transparent") {
      :root {
        --uc-seamless-bg: var(--uc-browser-color) !important;
        --yt-spec-base-background: var(--uc-layered-background) !important;
      }
      /*page color*/
      html,
      html[dark],
      body,
      ytd-app {
        background-color: var(--uc-seamless-bg) !important;
      }
      /*sidebar*/
      #background.ytd-masthead {
        background: var(--uc-seamless-bg) !important;
        filter: saturate(140%) !important;
        backdrop-filter: blur(33px);
      }
      #contentContainer {
        background: var(--uc-seamless-bg) !important;
        backdrop-filter: blur(33px);
      }
      /* header*/
      #background.ytd-masthead {
        background: var(--uc-seamless-bg) !important;
        backdrop-filter: blur(50px);
      }
      #header {
        background: var(--uc-seamless-bg) !important;
        backdrop-filter: blur(50px);
      }
      #frosted-glass.with-chipbar.ytd-app {
        background: var(--uc-seamless-bg) !important;
        height: 58px !important;
      }
      ytd-feed-filter-chip-bar-renderer {
        --ytd-rich-grid-chips-bar-top: 0px !important;
        top: 0 !important;
      }
      /*search bar*/
      .ytSearchboxComponentInputBoxDark,
      html[dark] .sbsb_a {
        background-color: var(--uc-seamless-bg) !important;
        border-color: rgba(0, 0, 0, 0.1) !important;
        backdrop-filter: blur(17px);
      }
      .ytSearchboxComponentSearchButton:not(:hover) {
        border: 0.5px solid rgba(0, 0, 0, 0.1) !important;
        background: transparent !important;
      }
      .ytSearchboxComponentSearchButton:hover {
        border: 0.5px solid gray !important;
      }
      /*search results popup*/
      .ytSearchboxComponentSuggestionsContainer {
        background-color: rgba(0, 0, 0, 0.5) !important;
        backdrop-filter: blur(35px);
      }
      /*notifications popup*/
      .ytd-multi-page-menu-renderer {
        background-color: var(--uc-seamless-bg) !important;
      }
      .style-scope.ytd-popup-container {
        background-color: rgba(0, 0, 0, 0.2) !important;
        border-radius: 10px !important;
        backdrop-filter: blur(35px);
      }
      /*video player context menu*/
      .ytp-popup {
        background-color: var(--uc-seamless-bg) !important;
      }
      .ytp-popup.ytp-contextmenu {
        background-color: var(--uc-seamless-bg) !important;
        border-radius: 10px !important;
        backdrop-filter: blur(33px);
      }
      .ytp-panel-menu {
        padding: 8px !important;
      }
      .ytp-menuitem:hover {
        border-radius: 10px !important; /* nogo for tables */
        clip-path: xywh(0 0 100% 100% round 0.5em) !important;
        background-color: rgba(40, 40, 50, 0.5) !important;
      }
      .ytp-panel-menu {
        background-color: rgba(0, 0, 0, 0.5) !important;
        backdrop-filter: blur(33px);
      }
      /*thumbnails*/
      .yt-spec-icon-badge-shape--style-overlay
        .yt-spec-icon-badge-shape__badge {
        border: 0px solid rgba(0, 0, 0, 0.8) !important;
      }
      .badge-style-type-live-now-alternate.ytd-badge-supported-renderer {
        background: rgba(92, 198, 223, 0.9) !important;
        color: var(--yt-spec-static-brand-white) !important;
      }
    } /* end theme */
  }
} /* end YT */

```

## File: `css/userContent-files/about_config.css`

```css
@-moz-document url-prefix(about:config) {
  * {
    font-size: 9pt !important;
  }

  #prefs,
  #prefs * {
    min-height: unset !important;
    padding-left: unset !important;
    padding-right: unset !important;
    margin: unset !important;
  }

  #prefs > tr,
  #prefs > tr > td,
  #prefs > tr > th {
    min-height: unset !important;
    height: unset !important;
    padding-left: unset !important;
    padding-right: unset !important;
    margin: unset !important;
  }

  #prefs {
    width: 100% !important;
    border-radius: 0 !important;
  }

  #prefs button {
    min-height: 16px !important;
    height: unset !important;
    min-width: 16px !important;
    width: unset !important;
    padding: unset !important;
    margin: unset !important;
  }

  #prefs button {
    margin-inline-start: 1px !important;
  }

  #prefs #form-edit > * {
    margin-inline-end: 2px !important;
  }

  input[type="radio"] {
    transform: scale(0.8) !important;
  }

  #search-container * {
    min-height: unset !important;
    padding-top: unset !important;
    padding-bottom: unset !important;
    margin-top: unset !important;
    margin-bottom: unset !important;
  }

  #search-container {
    padding: 0 !important;
  }

  #search-container,
  #about-config-search:focus,
  #search-container,
  #about-config-search[focused] {
    box-shadow: unset !important;
  }

  #search-container,
  #about-config-search:-moz-ui-invalid:focus {
    box-shadow: unset !important;
  }

  .cell-edit,
  .cell-reset {
    width: 20px !important;
  }

  #about-config-search {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }

  /* style ------------------------------------------------------------------------------*/
  input,
  #prefs {
    border-radius: 8px !important;
  }

  /* if you see this text --------------------------------------------------------------------------*/
  body::before {
    content: "\Higgs-Boson has loaded on to this page and all is right with the world. \n The Higgs-Boson userChrome.css/.js configuration can be found at: https://github.com/Thomashighbaugh/firefox  \A";
    display: block;
    z-index: -1 !important;
    margin: 10px 10px 0px 10px;
    padding: 12px 32px;
    border: var(--prefs-table-border);
    border-radius: 8px;
    white-space: pre-line;
    line-height: 1.5;
    font-size: var(--font-size-root);
    color: var(--in-content-text-color);
    background: var(--background-color-box);
  }
  /* if you see this - setting is on */
  #prefs
    .has-user-value:has(span[data-l10n-args='{"value":"true"}'])
    th[scope="row"]::before {
    content: "🟢 ";
    position: absolute;
    left: 18px;
  }

  /* warning messages ------------------------------------------------------------------------------*/
  /* conflicting setting warn */
  body::after {
    position: fixed;
    display: none;
    z-index: 100;
    top: 180px;
    right: 110px;
    height: 115px;
    max-height: 13vh;
    width: 25vw;
    min-width: 200px;
    padding: 22px 32px;
    border: 1px solid rgb(255, 150, 50);
    border-radius: 8px;
    white-space: pre-line;
    line-height: 1.3;
    font-size: 1.2em;
    color: var(--in-content-text-color);
    background: var(--backgroun-color-box);
    box-shadow: 0px 6px 6px 6px rgba(15, 15, 15, 0.6);
  }
}

```

## File: `css/userContent-files/about_pages.css`

```css
@-moz-document regexp("^about:(?!reader).*"),
url(https://www.mozilla.org/credits/),
url-prefix(https://discovery.addons.mozilla.org) {
  :root {
    --aboutProfiles-table-background: var(--in-content-box-background)!important
  }
  menupopup,
  menupopup > menu > menupopup,
  popup,
  popup > menu > menupopup {
    -moz-appearance: none!important;
    background: var(--in-content-box-background)!important;
    border: none!important;
    padding: 0!important
  }
  menuitem,
  menupopup menu {
    -moz-appearance: none!important;
    color: var(--in-content-selected-text)!important
  }
  menuitem:hover,
  menupopup menu:hover {
    color: var(--in-content-text-color)!important;
    background-color: var(--in-content-primary-button-background-hover)!important
  }
  menupopup menuseparator {
    padding: 0!important;
    margin: 2px 6px!important;
    -moz-appearance: none!important;
    background: rgba(0,0,0,0)!important;
    border: 0!important
  }
  @media screen and (-moz-windows-theme) {
    menuitem,
    menupopup menu {
      margin: 1px 6px!important
    }
    menupopup,
    menupopup > menu > menupopup,
    popup,
    popup > menu > menupopup {
      border: 1px solid!important;
      border-color: var(--in-content-box-background)!important
    }
  }
  .prefs-pane [type=checkbox]:checked + label::after,
  .prefs-pane [type=checkbox]:not(:checked) + label::after,
  input[type=checkbox]:checked {
    background-image: url(chrome://global/skin/in-content/check.svg),url(chrome://global/skin/icons/check.svg)!important
  }
  .contentSearchSuggestionsList {
    background-color: var(--in-content-box-background)!important;
    border: none!important
  }
  .contentSearchHeader,
  .contentSearchOneOffsTable {
    background-color: var(--in-content-category-header-background)!important;
    border: none!important;
    color: var(--in-content-text-color)!important
  }
  #newtab-customize-overlay,
  .exceptionDialogButtonContainer,
  .snippet .button-link,
  html[dir=ltr][lang],
  html[dir=ltr][lang] body,
  html[dir=rtl][lang],
  html[dir=rtl][lang] body {
    background: var(--in-content-page-background)!important;
    color: var(--in-content-page-color)!important
  }
  #SanitizeDialogPane > groupbox,
  #mainDiv.non-verbose div.section h2,
  #onboarding-overlay,
  .dialogBox,
  .dialogBox > .groupbox-body,
  .modal,
  .modal-overlay,
  .warningBackground {
    background: var(--in-content-page-background)!important
  }
  #homeContentsGroup checkbox[src] .checkbox-icon,
  .arrowhead,
  .checkbox-icon,
  .content-blocking-cookies-image,
  .content-blocking-trackers-image,
  .content-container .icon-container .icon[src=""],
  .extension-controlled-icon,
  .snippet .block-snippet-button,
  .textbox-search-sign {
    filter: invert(65%)!important
  }
  .searchBarHiddenImage,
  .searchBarShownImage {
    filter: invert(80%)!important
  }
  #trackingGroup .indent > description,
  #trackingGroup description.indent,
  .collapsible-section .section-top-bar .info-option-manage button,
  .topic .topic-read-more,
  a:link {
    color: var(--in-content-link-color)!important
  }
  .topic .topic-read-more:hover,
  a:link:hover {
    color: var(--in-content-link-color-hover)!important
  }
  menulist[disabled=true] {
    color: var(--in-content-box-border-color)!important
  }
  #action-box,
  #badCertAdvancedPanel,
  #content div.log span.section-heading button.no-print:hover,
  #content div.stats span.section-heading button.no-print:hover,
  #contents table tbody tr td,
  #contents table tr.no-copy td,
  #controls.no-print div.controls div.control button:hover,
  #errorPageContainer button#errorTryAgain:hover,
  #header-utils-btn[open=true],
  #profiles table,
  #provider table#provider-table tbody#provider-table-body tr td,
  #subprocess-reports tr td,
  .aboutPageWideContainer div#debug table#debug-table tbody tr td,
  .aboutPageWideContainer label input#submit:hover,
  .alert,
  .opsRow button:hover,
  .top-sites-list .top-site-outer .top-site-icon {
    background-color: var(--in-content-box-background)!important
  }
  #snippetContainer #snippets,
  .addon .editorial-description,
  .addon .heading,
  .disco-content,
  .top-sites-list .top-site-outer .title span,
  header h1,
  xul|groupbox xul|label:not(.menu-accel):not(.menu-text):not(.indent):not(.learnMore):not(.tail-with-learn-more) {
    color: var(--in-content-page-color)!important
  }
  #onboarding-overlay.onboarding-opened > #onboarding-overlay-dialog,
  #searchWrapper input#searchText,
  .addon .content,
  .addon .logo,
  .card-outer,
  .card-outer .card-context,
  .card-outer .card-details,
  .search-wrapper input,
  .topsite-form .form-wrapper input[type=text],
  card-outer.active span.context-menu ul.context-menu-list {
    background: var(--in-content-box-background)!important
  }
  #snippets-container,
  .sorter[checkState="1"],
  .sorter[checkState="2"] {
    background-color: var(--in-content-category-header-background)!important
  }
  .contentSearchSettingsButton {
    display: none!important
  }
  #onboarding-overlay.onboarding-opened > #onboarding-overlay-dialog,
  #scene1 h1,
  .addon,
  .card-outer .card-context,
  .card-outer .card-host-name,
  .detail-view-container,
  .section-title span,
  .snippet section,
  .tail-with-learn-more,
  .top-sites-list .top-site-outer .top-site-icon,
  .topsite-form .form-wrapper input[type=text] {
    color: var(--in-content-page-color)!important
  }
  #searchWrapper #searchIcon,
  #searchWrapper #searchSubmit,
  .card-outer .card-context-icon,
  .category:not([selected]) > .category-icon,
  .collapsible-section .section-top-bar .info-option-icon,
  .context-menu ul.context-menu-list li.context-menu-item a span.icon,
  .prefs-pane-button button,
  .search-wrapper .search-button,
  .search-wrapper .search-label,
  .section-title span {
    fill: var(--in-content-page-color)!important
  }
  .sorter {
    color: var(--accent-1)!important
  }
  .download-progress {
    background-color: var(--in-content-box-color)!important
  }
  .list > scrollbox > .scrollbox-innerbox {
    border: none!important
  }
  #header-utils-btn:hover,
  .header-button:hover {
    background-color: var(--in-content-box-background-hover)!important
  }
  #header-utils-btn {
    fill: var(--in-content-category-text)!important
  }
  .collapsible-section .section-top-bar .info-option-manage button:after,
  .topic .topic-read-more::after {
    fill: var(--in-content-link-color)!important
  }
  .addon-view[notification=warning] {
    --view-highlight-color: transparent!important
  }
  .addon-view[notification],
  .addon-view[pending] {
    --view-highlight-color: transparent;
    background-image: none!important
  }
  .addon[active=false] {
    opacity: .4!important
  }
  #addon-list .addon[active=false] > .content-container > .content-inner-container {
    color: var(--in-content-text-color)!important
  }
  .detail-row,
  .detail-row-complex,
  setting {
    text-shadow: none!important
  }
  #warningTitle {
    color: var(--in-content-page-color)!important
  }
  #configTree {
    border: none!important
  }
  .addon-target-container {
    background: var(--in-content-box-background)!important;
    box-shadow: none!important
  }
  .service-worker-multi-process {
    background-color: #44391f!important
  }
  #onboarding-notification-bar {
    background: var(--in-content-category-header-background)!important;
    border-top: 2px solid!important
  }
  .prefs-pane .actions,
  .prefs-pane .sidebar {
    background: var(--in-content-category-header-background)!important;
    border-color: var(--in-content-box-border-color)!important
  }
  .collapsible-section .section-top-bar .info-option,
  .content-blocking-category,
  .extension-controlled,
  .prefs-pane .prefs-modal-inner-wrapper .options,
  .sections-list .section-empty-state {
    background: var(--in-content-box-background)!important;
    border-color: var(--in-content-box-border-color)!important
  }
  .actions button:hover:not(.dismiss),
  .card-outer:-moz-any(:hover,:focus,.active):not(.placeholder),
  .collapsible-section .section-disclaimer button:hover:not(.dismiss),
  .top-sites-list .top-site-outer.active .tile,
  .top-sites-list .top-site-outer:focus .tile,
  .top-sites-list .top-site-outer:hover .tile {
    box-shadow: 0 0 0 5px var(--in-content-box-background)!important
  }
  .card-outer .context-menu-button,
  .top-sites-list .top-site-outer .context-menu-button {
    background-color: var(--in-content-box-background)!important;
    border-color: var(--in-content-box-border-color)!important
  }
  #onboarding-notification-body *,
  #onboarding-notification-tour-title,
  .collapsible-section .section-disclaimer,
  .manual-migration-container,
  .onboarding-close-btn,
  .prefs-pane .prefs-modal-inner-wrapper {
    color: var(--in-content-page-color)!important
  }
  .collapsible-section .section-disclaimer button,
  .onboarding-action-button {
    background-color: var(--in-content-page-background)!important;
    border-color: var(--in-content-box-border-color)!important;
    color: var(--in-content-page-color)!important
  }
  .actions button,
  .actions button.dismiss,
  .onboarding-action-button:hover,
  .prefs-pane-button button:hover {
    background-color: var(--in-content-box-background-hover)!important
  }
  .actions button.done,
  .onboarding-tour-action-button {
    background-color: var(--in-content-primary-button-background)!important
  }
  .onboarding-tour-action-button:hover {
    background-color: var(--in-content-primary-button-background-hover)!important
  }
  .icon.icon-dismiss {
    fill: var(--in-content-page-color)!important
  }
  .context-menu ul.context-menu-list li.context-menu-item a:hover span.icon {
    fill: var(--in-content-text-color)!important
  }
  .dialogBox > .groupbox-title,
  .dialogTitleBar {
    background-color: var(--in-content-category-header-background)!important;
    color: var(--in-content-page-color)!important;
    border-color: var(--in-content-box-border-color)!important
  }
  .warningMessage {
    background: var(--in-content-box-background)!important;
    border-color: var(--in-content-box-border-color)!important;
    color: var(--in-content-page-color)!important
  }
  #badCertAdvancedPanel.advanced-panel,
  #content > div,
  .info-box-content,
  .notice,
  div.opsRow,
  div.section {
    background-color: var(--in-content-box-background)!important;
    border-color: var(--in-content-box-border-color)!important
  }
  .bar-inner {
    background-color: var(--accent-1)!important;
    border: 1px solid!important;
    border-color: var(--accent-2)!important
  }
  #content div.log span.section-heading button.no-print,
  #content div.stats span.section-heading button.no-print,
  #controls.no-print div.controls div.control button,
  #controls.no-print div.controls div.control button input#appid,
  #errorPageContainer button#errorTryAgain,
  .aboutPageWideContainer label input#submit,
  .opsRow button {
    -moz-appearance: none!important;
    background-color: var(--in-content-page-background)!important;
    border: 1px solid!important;
    border-radius: 3px!important;
    color: var(--in-content-page-color)!important;
    border-color: var(--in-content-box-border-color)!important
  }
  .opsRow button {
    margin-right: 2px!important
  }
  input#appid {
    background-color: var(--in-content-box-background)!important
  }
  #profiles.tab div table tbody tr td {
    border-color: var(--in-content-table-border-dark-color)!important
  }
  .actions,
  .context-menu-list li.separator,
  .edit-topsites-wrapper .edit-topsites-button,
  .modal,
  .prefs-pane hr,
  .topsite-form .form-wrapper input[type=text] {
    border-color: var(--in-content-box-border-color)!important
  }
  #outside table.contenttable thead tr th {
    background-color: var(--in-content-table-header-background)!important
  }
  #outside table.contenttable {
    border-color: var(--in-content-table-border-dark-color)!important;
    background-color: var(--in-content-box-background)!important
  }
  #outside table.contenttable tbody tr td,
  #outside table.contenttable tbody tr td + #outside table.contenttable tbody tr td,
  #outside table.contenttable thead tr th + th {
    border-color: var(--in-content-table-border-dark-color)!important
  }
  #outside table.contenttable tbody tr td {
    color: var(--in-content-page-color)!important
  }
  .card-outer .card-context {
    padding: 2px 16px 12px 14px!important
  }
  .card-outer.placeholder .card {
    display: none!important
  }
  .context-menu {
    background-color: var(--in-content-box-background)!important;
    box-shadow: none!important;
    border: 1px!important
  }
  .context-menu > ul > li > a:focus,
  .context-menu > ul > li > a:hover {
    background-color: var(--theme-selection-background-hover)!important
  }
  #searchText:active,
  #searchText:focus,
  .search-wrapper input:focus,
  .search-wrapper:active input {
    box-shadow: 0 0 0 3px var(--in-content-border-focus)!important
  }
  .prefs-pane .actions {
    border-top: none!important
  }
}
@-moz-document url-prefix(about:reader) {
  body.dark a:link {
    color: var(--in-content-link-color)!important
  }
  .font-type-buttons > .sans-serif-button > .name,
  .font-type-buttons > .serif-button > .name,
  body.dark {
    color: var(--in-content-page-color)!important
  }
  .toolbar {
    background-color: var(--in-content-category-header-background)!important;
    border-right: 1px solid!important;
    border-color: var(--in-content-box-border-color)!important
  }
  .toolbar .button {
    background-color: var(--in-content-category-header-background)!important;
    border-color: var(--in-content-box-border-color)!important
  }
  .button:hover,
  .content-width-buttons > button:hover,
  .font-size-buttons > button:hover,
  .font-type-buttons > button:hover,
  .line-height-buttons > button:hover {
    background-color: var(--in-content-primary-button-background-hover)!important
  }
  .dropdown-popup {
    background-color: var(--in-content-category-header-background)!important;
    box-shadow: 0 1px 3px var(--in-content-category-header-background)!important;
    border-color: var(--in-content-box-border-color)!important
  }
  .content-width-buttons > button,
  .font-size-buttons > button,
  .font-type-buttons > button,
  .font-type-buttons > button.selected,
  .font-type-buttons > button:active:hover,
  .line-height-buttons > button {
    border-color: var(--in-content-box-border-color)!important
  }
  .color-scheme-buttons > button.selected,
  .color-scheme-buttons > button:active:hover,
  .font-type-buttons > button.selected,
  .font-type-buttons > button:active:hover {
    box-shadow: inset 0 -3px 0 0 var(--in-content-primary-button-background-hover)!important
  }
}
@-moz-document url-prefix(about:addons) {
  .DiscoPane-header-intro {
    color: var(--in-content-text-color)!important
  }
}
@-moz-document url-prefix(about:blank) {
  html > body:empty:not(.vimvixen-console) {
    background-color: var(--in-content-page-background)!important;
    margin: 0!important
  }
}
@-moz-document url-prefix(about:memory) {
  html {
    background: var(--in-content-page-background)!important
  }
  .legend,
  .opsRowLabel,
  .section,
  .treeline {
    color: var(--in-content-page-color)!important
  }
}
@-moz-document url-prefix(about:webrtc) {
  html {
    background-color: var(--in-content-page-background)!important;
    color: var(--in-content-page-color)!important
  }
  #content > div,
  .peer-connection > h3 {
    background-color: var(--in-content-page-background)!important
  }
  .fold-trigger {
    color: var(--in-content-link-color)!important
  }
  table {
    color: var(--in-content-text-color)!important;
    background-color: var(--in-content-page-background)!important
  }
  .peer-connection table tr {
    background-color: var(--in-content-box-background)!important
  }
  .trickled {
    background-color: var(--in-content-border-focus)!important;
    color: var(--in-content-selected-text)!important
  }
  .peer-connection table tr:first-of-type {
    background-color: var(--in-content-table-header-background)!important;
    color: var(--in-content-selected-text)!important
  }
}
@-moz-document url-prefix(chrome://) {
  #ColorsDialogPane,
  #ConnectionsDialogPane,
  #FontsDialogPane,
  #LanguagesDialogPane,
  .windowDialog,
  dialog,
  prefpane,
  prefpane > .content-box,
  prefwindow,
  window {
    background-color: var(--in-content-page-background)!important;
    color: var(--in-content-page-color)!important
  }
  #cookieInfoGrid .textbox-input {
    background-color: var(--in-content-page-background)!important
  }
  #historyItems {
    -moz-appearance: none!important
  }
}
/*! Colors hard coded due to variables not being recognized from
 color_variables.css ... Firefox bug? */
@-moz-document url-prefix(https://discovery.addons.mozilla.org) {
  .addon .ThemeImage,
  header {
    border-color: #4a4a4f!important
  }
  .addon .editorial-description,
  .addon .heading span,
  .disco-content {
    color: #b1b1b3!important
  }
  .Button--action,
  .Button--action:link,
  .Button--action:not(.Button--disabled):hover,
  .addon .heading,
  header h1 {
    color: #f9f9fa!important
  }
}
```

## File: `css/userContent-files/addonlists.css`

```css
/* Source file https://github.com/MrOtherGuy/firefox-csshacks/tree/master/content/compact_addons_manager.css made available under Mozilla Public License v. 2.0
See the above repository for updates as well as full license text. */

/* Make the installed addons list more compact, title + only */
/* Installed extensions list will be 3-6 columns wide, themes will be 2 columns wide. No effect on recommendations but those can be styled by adding two_column_html_addons.css */
/* Compatible with addon_manage_buttons_without_popup.css */

@-moz-document url-prefix("chrome://mozapps/content/extensions/aboutaddons.html"), url("about:addons")
{
  :root {
    overflow-x: hidden;
  } /* Remove this if it causes horizontal scrolling problems */
  
  /* Grid background styling */
  #main,
  addon-list {
    background: var(--tone-9) !important;
  }
  
  /* Individual addon tile styling */
  addon-card {
    background: var(--tone-8) !important;
    border: 1px solid var(--tone-7) !important;
  }
  addon-card .addon-name-link {
    font-size: 0.9em;
  }
  @media (min-width: 420px) {
    #main {
      max-width: unset !important;
      padding-right: 28px;
    }
    addon-list > section {
      padding: 1em;
      display: grid;
      grid-template-areas: "hd hd" "cd cd";
      grid-auto-columns: 1fr;
      column-gap: 1em;
    }

    addon-card .card-contents {
      width: unset !important;
      white-space: initial !important;
    }

    addon-list[type="extension"] .addon-name-container {
      display: grid !important;
      grid-template-areas: "name badge opt" "name toggle toggle";
      grid-row-gap: 6px;
      grid-auto-columns: 1fr 24px auto;
    }
    .addon-icon {
      align-self: center;
    }
    .addon-name-container > .addon-name {
      grid-area: name;
    }
    .addon-name-container > :is(.toggle-button, moz-toggle) {
      grid-area: toggle;
      justify-self: end;
    }
    .addon-name-container > .more-options-button {
      grid-area: opt;
    }
    .addon-name-container > .addon-badge {
      grid-area: badge;
    }

    addon-list[type="extension"] .more-options-button {
      margin-inline: 0 !important;
    }

    .card-heading-image {
      max-width: calc(100% + 32px);
      object-position: left;
    }

    section > h2 {
      grid-area: hd;
    }
    addon-card {
      padding-bottom: 0px !important;
      padding-top: 0px !important;
      grid-area: auto;
    }

    addon-card .addon-description {
      max-height: 3em;
      scrollbar-width: thin;
    }

    addon-list[type="theme"] addon-card {
      margin-right: auto;
    }
  }

  @media (min-width: 640px) {
    addon-list[type="extension"] > section {
      grid-template-areas: "hd hd hd" "cd cd cd";
    }
  }
  @media (min-width: 960px) {
    addon-list[type="extension"] > section {
      grid-template-areas: "hd hd hd hd" "cd cd cd cd";
    }
  }
  @media (min-width: 1180px) {
    addon-list[type="extension"] > section {
      grid-template-areas: "hd hd hd hd hd" "cd cd cd cd cd";
    }
  }
  @media (min-width: 1420px) {
    addon-list[type="extension"] > section {
      grid-template-areas: "hd hd hd hd hd hd" "cd cd cd cd cd cd";
    }
  }

  /* Note: addon-card verified and recommended badges are hidden here. They should remain visible in the "manage" addon page though.  */
  addon-card:not([expanded]) .addon-badge-verified,
  addon-card:not([expanded]) .addon-badge-recommended,
  addon-card:not([expanded]) .addon-description,
  addon-card:not([expanded]) .addon-card-message button[action] {
    display: none !important;
  }
  
  /* Hide recommended extensions sections */
  #page-options .button-link[data-telemetry-name="manage"] ~ .button-link,
  section[section-name="discopane"],
  #discopane,
  .discopane-notice,
  [data-l10n-id*="recommendation"],
  [data-l10n-id="addons-heading-search-input"],
  .discovery-notice,
  .recommended-extensions {
    display: none !important;
  }

  addon-list[type="extension"] {
    --card-padding: 8px;
  }
}

@-moz-document url-prefix("about:addons") {
  :root {
    --sidebar-width: 60px !important;
  }
  #categories {
    width: var(--sidebar-width) !important;
  }
  #categories > .category {
    margin-left: 10px !important;
    -moz-box-pack: center;
  }
  .sidebar-footer-list {
    margin-left: 18px !important;
  }
  .sidebar-footer-label,
  .category > .category-name {
    display: none;
  }
}

```

## File: `css/userContent-files/amo_store.css`

```css
@-moz-document url-prefix("https://addons.mozilla.org") {
  .Footer,
  .Footer-wrapper,
  .LanguageTools-header-row,
  .amo {
    background: var(--in-content-category-header-background)!important
  }
  h1,
  h2 {
    color: var(--in-content-category-text)!important
  }
  .Guides-header,
  .HomeHeroGuides-sections .Hero-name-HomeHeroGuides {
    border-color: var(--in-content-box-border-color)!important
  }
  .App-content,
  .Home,
  .LandingPage,
  .LanguageTools-table-row:nth-child(2n),
  .Paginate {
    background: var(--in-content-page-background)!important
  }
  .Select {
    background-color: var(--in-content-page-background)!important
  }
  .SearchForm-icon-magnifying-glass {
    filter: invert(65%)!important
  }
  .AddonDescription-more-addons--theme .Card-contents .AddonsCard-list,
  .AddonDescription-more-addons:not(.AddonDescription-more-addons--theme) .Card-contents .AddonsCard-list,
  .AddonsByAuthorsCard .Card-contents .AddonsCard-list,
  .AddonsCard--horizontal .Card-contents,
  .AddonsCard--horizontal ul.AddonsCard-list .SearchResult-link,
  .AutoSearchInput-suggestions-item,
  .Card--photon .Card-contents,
  .Card-contents,
  .Card-contents li,
  .Card-footer,
  .Card-footer-link,
  .Card-footer-text,
  .Card-header,
  .Categories .Card-contents,
  .DropdownMenu-items::after,
  .Hero .Card-contents,
  .Home-SubjectShelf .Card-contents,
  .LandingPage-header,
  .MetadataCard,
  .Search .SearchResults .SearchResult,
  .Search .SearchResults-message,
  .SearchForm-query,
  .SearchForm-suggestions-item.SearchForm-suggestions-item,
  .SectionLinks-dropdown .DropdownMenu-items,
  input.AutoSearchInput-query {
    background: var(--in-content-box-background)!important
  }
  .Addon-author,
  .Addon-author a,
  .Addon-author a:link .Button--action,
  .Addon-title,
  .AddonBadges .Badge,
  .AddonTitle,
  .Button--action,
  .Button--action.Button--small:link,
  .Button--action:link,
  .Button--neutral,
  .Button--neutral:link,
  .Card--photon .Card-contents,
  .Card-contents,
  .Card-footer-text,
  .Definition-dt,
  .DropdownMenuItem,
  .DropdownMenuItem-link a,
  .DropdownMenuItem-link a:link,
  .DropdownMenuItem-section,
  .ExpandableCard-ToggleLink:link,
  .Footer a:active,
  .Footer a:hover,
  .Footer-links-header a:link,
  .GuidesAddonCard .AddonTitle a,
  .GuidesAddonCard .GuidesAddonCard-content-header-title .AddonTitle-author,
  .Home-SubjectShelf-link:link,
  .Home-SubjectShelf-link:visited,
  .Home-SubjectShelf-subheading,
  .LandingPage-addonType-name,
  .LandingPage-heading-content,
  .MetadataCard-list dt,
  .Paginate .Button.Paginate-item--current-page,
  .Paginate .Button.Paginate-item:first-child,
  .Paginate .Button.Paginate-item:last-child,
  .Paginate .Button.Paginate-item:link:first-child,
  .Paginate .Button.Paginate-item:link:last-child,
  .Paginate .Button.Paginate-item:visited:first-child,
  .Paginate .Button.Paginate-item:visited:last-child .Paginate-page-number,
  .PermissionsCard-subhead,
  .ReportAbuseButton-show-more,
  .SearchContextCard-header,
  .SearchFilters-label,
  .SearchForm-query,
  .SearchResult--meta-section,
  .SearchResult-name,
  .SearchResult-summary,
  .Select,
  input.AutoSearchInput-query {
    color: var(--in-content-page-color)!important
  }
  .Paginate .Button.Paginate-item:active,
  .Paginate .Button.Paginate-item:hover {
    background-color: var(--in-content-box-background)!important
  }
  .AutoSearchInput-suggestions-item {
    color: var(--in-content-page-color)
  }
  .Card-header {
    color: var(--in-content-text-color)!important
  }
  .Card-contents li .Rating-star-group,
  .Paginate-next::after,
  .Paginate-previous::before {
    filter: invert(70%)!important
  }
  .AddonMeta .MetadataCard-content a,
  .AddonMeta .MetadataCard-content a.AddonMeta-reviews-content-link,
  .AddonMeta .MetadataCard-content a.AddonMeta-reviews-content-link:link,
  .AddonMeta .MetadataCard-content a.AddonMeta-reviews-content-link:visited,
  .AddonMeta .MetadataCard-content a:link,
  .AddonMeta .MetadataCard-content a:visited,
  .AddonMeta .MetadataCard-title a,
  .AddonMeta .MetadataCard-title a.AddonMeta-reviews-content-link,
  .AddonMeta .MetadataCard-title a.AddonMeta-reviews-content-link:link,
  .AddonMeta .MetadataCard-title a.AddonMeta-reviews-content-link:visited,
  .AddonMeta .MetadataCard-title a:link,
  .AddonMeta .MetadataCard-title a:visited,
  .RatingsByStar-count a:active,
  .RatingsByStar-count a:link,
  .RatingsByStar-count a:visited,
  .RatingsByStar-star a:active,
  .RatingsByStar-star a:link,
  .RatingsByStar-star a:visited {
    color: var(--in-content-page-color)!important
  }
  .Rating-star {
    /*! background-image: url("data:image/svg+xml,%3Csvg width='17px' height='16px' viewBox='0 0 17 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E %3C!-- Generator: Sketch 47.1 (45422) - http://www.bohemiancoding.com/sketch --%3E %3Cdesc%3ECreated with Sketch.%3C/desc%3E %3Cdefs%3E%3C/defs%3E %3Cg id='Screens' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E %3Cg id='Extension-Detail---1366px' transform='translate(-1200.000000, -191.000000)' fill-rule='nonzero' fill='%23737373'%3E %3Cpath d='M1216.67559,197.013479 C1216.54115,196.628667 1216.19883,196.344304 1215.78203,196.271203 L1211.45804,195.530952 L1209.42135,191.617039 C1209.22458,191.238958 1208.8214,191 1208.38027,191 C1207.93914,191 1207.53597,191.238958 1207.33919,191.617039 L1205.30145,195.530952 L1200.98592,196.269177 C1200.56542,196.339521 1200.21894,196.624766 1200.08323,197.012329 C1199.94751,197.399891 1200.04437,197.827503 1200.33557,198.126387 L1203.43079,201.313214 L1202.78679,205.728392 C1202.72624,206.141968 1202.91235,206.553231 1203.26889,206.793722 C1203.62542,207.034213 1204.09248,207.063526 1204.47874,206.869654 L1208.37974,204.921305 L1212.28181,206.872692 C1212.66807,207.066564 1213.13512,207.037251 1213.49166,206.79676 C1213.84819,206.556269 1214.0343,206.145006 1213.97376,205.73143 L1213.3287,201.313214 L1216.42286,198.1274 C1216.71414,197.828621 1216.81115,197.401068 1216.67559,197.013479 Z' id='Star'%3E%3C/path%3E %3C/g%3E %3C/g%3E %3C/svg%3E")!important*/
  }
  .Rating-selected-star {
    background: url("data:image/svg+xml,%3Csvg width='17px' height='16px' viewBox='0 0 17 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E %3C!-- Generator: Sketch 47.1 (45422) - http://www.bohemiancoding.com/sketch --%3E %3Cdesc%3ECreated with Sketch.%3C/desc%3E %3Cdefs%3E%3C/defs%3E %3Cg id='Screens' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E %3Cg id='Extension-Detail---1366px' transform='translate(-1268.000000, -191.000000)' fill-rule='nonzero' fill='%23D7D7DB'%3E %3Cg id='Icon/Star/Off' transform='translate(1268.093458, 191.000000)'%3E %3Cpath d='M16.9387231,6.0134792 C16.8019739,5.62866693 16.4537759,5.34430427 16.0298163,5.27120279 L11.6315676,4.53095169 L9.55990532,0.617038533 C9.35975238,0.238957594 8.94965505,-8.43205013e-17 8.50094816,0 C8.05224128,5.62136675e-17 7.64214395,0.238957594 7.44199101,0.617038533 L5.36925312,4.53095169 L0.979609481,5.26917748 C0.55189384,5.33952054 0.199461709,5.62476632 0.0614173919,6.01232884 C-0.0766269256,6.39989135 0.0218952463,6.82750347 0.318097391,7.1263875 L3.46646469,10.3132141 L2.81140637,14.7283917 C2.74982246,15.1419679 2.93913032,15.5532305 3.30178728,15.7937216 C3.66444423,16.0342127 4.13951821,16.0635259 4.53241344,15.8696543 L8.50041035,13.9213053 L12.4694829,15.8726923 C12.8623781,16.0665639 13.3374521,16.0372507 13.7001091,15.7967596 C14.062766,15.5562685 14.2520739,15.1450059 14.19049,14.7314296 L13.534356,10.3132141 L16.6816477,7.12740015 C16.9779332,6.82862115 17.0766057,6.40106827 16.9387231,6.0134792 Z' id='Star-Copy'%3E%3C/path%3E %3C/g%3E %3C/g%3E %3C/g%3E %3C/svg%3E") 50%/contain no-repeat!important
  }
  .ShowMoreCard-contents::after {
    background: linear-gradient(rgba(255,255,255,0),var(--in-content-box-background))!important
  }
  .Addon-details .AddonDescription-contents a:link,
  .AddonMoreInfo-contents a:link,
  .Card-footer-link a,
  .Card-footer-link a:hover,
  .Card-footer-link a:link,
  .Card.ShowMoreCard.AddonDescription-version-notes a:link,
  .DropdownMenuItem-link a:hover,
  .Home-SubjectShelf-link:active,
  .Home-SubjectShelf-link:focus,
  .Home-SubjectShelf-link:hover,
  .LanguageTools-table a:link,
  .SearchResult-link:focus .SearchResult-name,
  .SearchResult-link:hover .SearchResult-name {
    color: var(--in-content-link-color)!important
  }
  .Button--action.Button--outline-only {
    border-color: var(--in-content-border-highlight)!important
  }
  input.AutoSearchInput-query {
    border-color: var(--in-content-box-border-color)!important
  }
  .Addon .InstallButton-button,
  .Button--action,
  .Button--action.Button--small,
  .SearchForm-suggestions-item.SearchForm-suggestions-item--highlighted {
    background: var(--in-content-primary-button-background)!important
  }
  .Button--action.Button--outline-only:hover,
  .Button--action:hover,
  .SearchForm-query:hover {
    border-color: var(--in-content-primary-button-background)!important
  }
  .SearchForm-query:focus {
    box-shadow: 0 0 5px 0 var(--in-content-border-highlight)!important;
    border-color: var(--in-content-primary-button-background)!important
  }
  .AddonsCard--horizontal ul.AddonsCard-list .SearchResult-link:hover {
    background: var(--in-content-page-background)!important;
    border-radius: 0!important
  }
  .Button--report {
    text-shadow: none!important
  }
  .Icon-arrow,
  .Icon-external {
    filter: invert(20%)!important
  }
  .Icon-magnifying-glass {
    filter: invert(65%)
  }
  .Icon-featured {
    filter: invert(85%)!important
  }
  .Icon-plus-dark {
    filter: invert(100%)!important
  }
  .Button--neutral.Button--puffy,
  .Button--neutral:link.Button--puffy {
    background: var(--in-content-primary-button-background)!important;
    color: var(--in-content-selected-text)!important
  }
  .Button--neutral.Button--puffy:hover,
  .Button--neutral:link.Button--puffy:hover {
    background: var(--in-content-primary-button-background-hover)!important
  }
}
```

## File: `css/userContent-files/directory_listings.css`

```css
@-moz-document regexp("^[file:///].*[^(html|svg)]$") {
  :root {
    background-color: var(--in-content-page-background)!important
  }
  body {
    border-color: var(--in-content-box-background)!important;
    background-color: var(--in-content-box-background)!important;
    color: var(--in-content-page-color)!important
  }
  h1 {
    border-color: var(--in-content-box-border-color)!important
  }
  body > table > tbody > tr:hover {
    outline-color: var(--in-content-box-background-hover)!important;
    background-color: var(--in-content-box-background-hover)!important
  }
  .dir,
  .file,
  .symlink,
  .up {
    color: var(--in-content-link-color)!important
  }
}
```

## File: `css/userContent-files/downloads.css`

```css
/*
  Custom styles for the Firefox Downloads panel, the Downloads view in the Library (places.xhtml),
  and the about:downloads page for a consistent look and feel.
*/

/*
  Block 1: Common styles for all download views
  (Panel, Library, and about:downloads)
*/
@-moz-document url("chrome://browser/content/browser.xhtml"),
                 url-prefix("chrome://browser/content/places/places.xhtml"),
                 url-prefix("about:downloads") {
  /* Main view adjustments */
  #downloadsPanel-mainView,
  #downloadsPanel-blockedSubview {
    min-width: revert !important;
    padding: 0 !important;
  }

  #downloadsListBox {
    border: none !important;
    padding: 3px 0 !important;
  }

  /* Sizing for the downloads panel specifically */
  panel #downloadsListBox {
    width: revert !important;
    min-width: 35em !important;
    max-width: 48em !important;
  }

  #emptyDownloads {
    padding: 1.25em 20px !important;
  }

  /* Footer styling */
  #downloadsFooter > stack {
    margin: 0 3px !important;
    padding-block: 0 3px !important;
  }

  #downloadsFooterButtons[uc-hbox]:not([hidden]) {
    display: flex !important;
    flex-flow: row nowrap;
    column-gap: 3px !important;
  }

  #downloadsFooter > toolbarseparator,
  #downloadsFooterButtons > toolbarseparator {
    appearance: none !important;
    min-height: 0 !important;
    border-top: 1px solid var(--in-content-border-color) !important; /* Use theme variable */
    border-bottom: none !important;
    margin: 0 3px !important;
    padding: 0 !important;
  }

  #downloadsFooterButtons > toolbarseparator {
    margin-inline: 0 !important;
  }

  /* Hide separator under specific conditions */
  #downloadsFooter[showingsummary] > toolbarseparator,
  #downloadsFooter:not([showingsummary])
    #downloadsFooterButtons[uc-hbox]
    > toolbarseparator {
    display: none !important;
  }

  #downloadsFooterButtons > button {
    flex-grow: 1;
    margin: 0 !important;
    padding: 6px 8px !important;
    border-radius: 3px !important; /* Standardized variable */
    -moz-context-properties: fill, fill-opacity;
    fill: currentColor;
  }

  #downloadsFooterButtons > button > .button-box {
    display: flex !important;
    align-items: center;
  }

  #downloadsFooterButtons > button .button-icon {
    margin-inline: 0 6px;
    width: 16px;
    height: 16px;
  }

  #downloadsFooter[showingsummary] #downloadsFooterButtons {
    flex-direction: column !important;
    border-top: 0 !important;
  }

  /* Download item styling */
  richlistitem.download-state {
    position: relative !important;
    margin: 0 6px !important;
    padding: 0 !important;
    border: 0 !important;
    outline: 0 !important;
    background: none !important;
    border-radius: 3px !important; /* Standardized variable */
  }

  richlistitem.download-state > toolbarseparator {
    display: none !important; /* Use display instead of visibility for better layout collapse */
  }

  richlistitem.download-state .downloadMainArea {
    padding: 8px 4px !important;
  }

  richlistitem.download-state[state="1"]:not([exists]) .downloadTypeIcon {
    opacity: 0.6;
  }

  /* Download action buttons (e.g., open folder, retry) */
  richlistitem.download-state > .downloadButton {
    display: grid !important; /* Use grid for centering */
    place-items: center !important;
    box-sizing: content-box !important;
    height: auto !important;
    width: auto !important;
    margin: 0 !important;
    padding: 8px !important;
    background: none !important;
    border: 0 !important;
    outline: none !important;
    border-radius: 0 !important;
  }

  richlistitem.download-state > .downloadButton .button-box {
    width: 32px !important;
    height: 32px !important;
    padding: 0 !important;
    border-radius: 3px !important;
  }

  richlistitem.download-state > .downloadButton .button-box .button-icon {
    width: 18px !important;
    height: auto !important;
  }

  richlistitem.download-state
    > .downloadButton:is(.downloadIconCancel, .downloadIconSubviewArrow)
    .button-box
    .button-icon {
    width: 21px !important;
  }

  .downloadIconSubviewArrow > .button-box > .button-icon:-moz-locale-dir(ltr) {
    transform: scaleX(-1);
  }

  /* Download progress bar */
  .downloadContainer:not([hidden="true"]) {
    display: flex !important;
    flex-flow: column nowrap !important;
    justify-content: center !important;
    row-gap: 4px !important;
  }

  .downloadContainer > * {
    margin: 0 !important;
  }

  .downloadProgress {
    appearance: none !important;
    height: 7px !important;
    border: 1px solid transparent !important;
    border-radius: 14px !important;
    overflow: hidden !important;
  }

  .downloadProgress::-moz-progress-bar {
    background-image: none !important;
  }

  .downloadProgress:not([value="0"])::-moz-progress-bar {
    margin: 0 !important;
    height: 100% !important;
    border-radius: 0 !important;
  }

  /* Blocked download view */
  #downloadsPanel-blockedSubview > vbox {
    margin: 0 3px !important;
  }

  .downloadsPanel-blockedSubview-title-box {
    display: flex !important; /* Ensure flex properties apply */
    align-items: center !important;
    margin-block: 8px !important;
    min-height: 18px !important;
  }

  #downloadsPanel-blockedSubview-title {
    margin: 0 !important;
    order: 2 !important;
  }

  .downloadsPanel-blockedSubview-image {
    width: 18px !important;
    height: 18px !important;
    margin-inline: 6px 5px !important;
    background-size: contain !important;
    background-repeat: no-repeat;
    order: 1 !important; /* Ensure image comes before title */
  }

  #downloadsPanel-blockedSubview-details1,
  #downloadsPanel-blockedSubview-details2 {
    margin-bottom: 6px !important;
  }

  #downloadsPanel-blockedSubview > .panel-footer {
    margin: 12px !important;
  }
}

/*
  Block 2: Styles specific to the Downloads Panel popup
*/
@-moz-document url("chrome://browser/content/browser.xhtml")
{
  /* Reduce padding and gaps for a more compact view in the panel */
  richlistitem.download-state:is(
      [state="-1"],
      [state="0"],
      [state="4"],
      [state="5"],
      [state="7"]
    )
    .downloadMainArea {
    padding-block: 0 !important;
  }

  richlistitem.download-state:is(
      [state="-1"],
      [state="0"],
      [state="4"],
      [state="5"],
      [state="7"]
    )
    .downloadContainer {
    row-gap: 3px !important;
  }

  /* Make progress bar thinner in the panel */
  .downloadProgress {
    height: 2px !important;
  }
}

/*
  Block 3: Styles specific to the Library and about:downloads page
*/
@-moz-document url-prefix("chrome://browser/content/places/places.xhtml"),
                 url-prefix("about:downloads") {
  #downloadsListBox {
    background: transparent !important;
    border: none !important;
    outline: none !important;
  }
}

```

## File: `css/userContent-files/manifest.css`

```css
@-moz-document regexp("^moz-extension://.*manifest.json$") {
  html {
    background: var(--in-content-page-background)!important;
    color: var(--in-content-page-color)!important
  }
}
```

## File: `css/userContent-files/newtab.css`

```css
:root {
  --in-content-border-radius: 18px;
  --in-content-rounded-border: 18px;
  --in-content-less-rounded-border: 12px;
  --in-content-border-radius: 9px;
  --mode-color: white;
  --newtab-button-static-hover-background: transparent !important;
  --button-background-color-ghost-hover: transparent !important;
  --in-content-rounded-border: 100%;
  --in-content-less-rounded-border: 100%;
  --in-content-border-radius: 12px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --newtab-background-color-secondary: color-mix(
      in srgb,
      rgb(var(--in-content-main-color)) 5%,
      transparent
    ) !important;
    --newtab-element-hover-color: rgba(265, 265, 265, 0.2) !important;
    --in-content-panel-backgrounds: color-mix(
      in srgb,
      var(--in-content-secodary-color) 40%,
      transparent
    );
    --newtab-element-secondary-hover-color: var(
      --newtab-element-hover-color
    ) !important;
    --mode-color: rgb(var(--in-content-text-color));
  }
}
@media (prefers-color-scheme: light) {
  :root {
    --newtab-background-color-secondary: color-mix(
      in srgb,
      rgb(var(--in-content-main-color)) 35%,
      transparent
    ) !important;
    --newtab-element-hover-color: rgba(200, 200, 210, 0.6) !important;
    --in-content-panel-backgrounds: color-mix(
      in srgb,
      var(--in-content-browser-color) 60%,
      transparent
    );
    --newtab-element-secondary-hover-color: var(
      --newtab-element-hover-color
    ) !important;
    --mode-color: var(--in-content-itheme-text-color);
  }
}

body {
  --newtab-search-icon: url("chrome://global/skin/icons/search-glass.svg") !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
  background-size: cover !important;
  background-attachment: fixed !important;
}

.section-title-container {
  visibility: hidden !important;
}

/* website shortcuts ----------------------------------------------------------- */

/* site shortcuts style */
.top-site-outer .tile {
  border-radius: var(--in-content-border-radius) !important;
  background: var(--newtab-background-color-secondary) !important;
  filter: saturate(100%) !important;
  backdrop-filter: blur(33px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0) !important;
  color: var(--mode-color) !important;
  font-size: 32px !important;
  font-weight: 200;
  text-transform: uppercase;
}
.top-site-outer .tile .icon-wrapper {
  border-radius: var(--in-content-border-radius) !important;
}
.top-site-outer .tile .icon-wrapper::before {
  opacity: 0.7 !important;
}
.top-site-icon {
  background-color: transparent !important;
}

/* force consistent size */
.top-site-outer .default-icon {
  width: 101% !important;
  height: 101% !important;
  background-size: 75% !important;
}

/* show site title on hover */
.outer-wrapper .top-site-inner:hover .title,
.outer-wrapper .top-site-inner:hover .icon-pin-small {
  opacity: 1 !important;
}
.outer-wrapper .top-site-inner .title,
.outer-wrapper .top-site-inner .icon-pin-small {
  opacity: 0 !important;
}

/* context menu */
.top-site-outer .context-menu-button {
  transform: scale(1.3);
}
.top-site-outer .context-menu-button:hover {
  transform: scale(1.7);
}
.top-site-outer .context-menu-button {
  background-color: transparent !important;
  border-radius: 50% !important;
  inset-inline-end: -2px !important;
  top: 0px !important;
  transition: opacity 200ms;
  border-radius: 80px !important;
  fill: var(--mode-color) !important;
}
.top-site-outer .context-menu-button:is(:hover, :focus) {
  background-color: color-mix(
    in srgb,
    var(--contrast-color),
    transparent
  ) !important;
  transition: opacity 200ms;
  fill: var(--mode-color) !important;
}

/* fine tuning */
.top-site-outer .title {
  font-weight: bold !important;
  text-transform: capitalize !important;
}
.top-site-outer .title span {
  background: var(--newtab-background-color-secondary) !important;
  filter: saturate(100%) !important;
  backdrop-filter: blur(33px);
  border-radius: 18px !important;
}
.top-site-outer:hover .tile,
.card-outer:hover .card {
  background-color: transparent !important;
  transform: scale(1.15);
}
.top-site-outer:is(:focus-within) .tile,
.card-outer:is(.active, :focus-within) .card {
  background-color: transparent !important;
  transform: scale(1.3);
  box-shadow: none !important;
}
.top-site-outer:is(:focus-within) .title,
.card-outer:is(.active, :focus-within) .card {
  text-decoration: underline !important;
  opacity: 1 !important;
}

.top-sites-list:not(.dnd-active) .top-site-outer:is(.active, :focus, :hover) {
  background: transparent !important;
}

/* search bar & logo ----------------------------------------------------------- */

/* spacing */
.search-wrapper .search-handoff-button,
.search-wrapper input {
  padding-inline-start: 0px !important;
  padding-inline-end: 0px !important;
}
.search-wrapper .logo-and-wordmark .wordmark {
  width: 66vw !important;
  fill: var(--mode-color) !important;
}
.logo-and-wordmark .wordmark {
  width: 66vw !important;
  fill: var(--mode-color) !important;
}
.search-wrapper .logo-and-wordmark .wordmark {
  margin-inline-start: 0 !important;
}
.logo-and-wordmark .wordmark {
  margin-inline-start: 0 !important;
}

/* default style */

.search-inner-wrapper {
  display: flex !important;
  margin-top: 16px !important;
  outline: none !important;
  filter: saturate(140%) !important;
  background-color: rgba(50, 50, 50, 0.1) !important;
  border-radius: 18px !important;
  box-shadow: 0 10px 15px rgb(0 0 0 / 20%) !important;
  backdrop-filter: blur(33px);
  background-blend-mode: overlay;
  height: auto !important;
}

@supports -moz-bool-pref(
  "browser.newtabpage.activity-stream.improvesearch.handoffToAwesomebar"
) {
  .search-inner-wrapper:not(:focus) {
    background: var(--newtab-pinnedsites-background) !important;
    backdrop-filter: blur(33px) !important;
    filter: saturate(100%) !important;
  }
}
.search-inner-wrapper:not(:focus) input,
.search-wrapper:not(:active) input:focus {
  background-color: transparent !important;
  backdrop-filter: blur(33px) !important;
  filter: saturate(100%) !important;
  border-radius: 34px !important;
}
.search-handoff-button {
  border-color: transparent !important;
  border-radius: 34px !important;
  box-shadow: none !important;
}
.search-wrapper .search-inner-wrapper:active input,
.search-wrapper input:focus {
  outline: 1px solid var(--button-active-bgcolor) !important;
  outline-offset: -1px !important;
  border: transparent !important;
  margin-left: 1px !important;
  z-index: 1 !important;
}
.search-wrapper .search-button:focus,
.search-wrapper .search-button:hover {
  fill: var(--mode-color) !important;
}
.search-wrapper .search-inner-wrapper:active input,
.search-wrapper input:focus {
  box-shadow: none !important;
}
.search-handoff-button .fake-textbox {
  text-align: center !important;
}
.search-wrapper .search-handoff-button {
  filter: grayscale(100%);
}

browser[primary="true"][tabDialogShowing="true"],
#main-window[window-modal-open="true"] > body > #browser {
  filter: blur(10px);
}

@media (height > 700px) {
  body:not(.inline-onboarding) .fixed-search .search-wrapper {
    background-color: rgba(50, 50, 50, 0.1) !important;
    box-shadow: 0 10px 15px rgb(0 0 0 / 20%) !important;
    backdrop-filter: blur(33px);
    border-color: transparent !important;
    min-height: 195px !important;
  }
}

/* widgets --------------------------------------------------------------------- */

.icon.icon-settings {
  opacity: 85% !important;
  color: var(--mod-color) !important;
}
.personalize-button {
  /*! padding: 8px !important; */
  border-radius: 100% !important;
}
.personalize-button:hover {
  background-color: transparent !important;
  transform: scale(1.3);
  cursor: pointer;
}
.weatherCard {
  border-radius: var(--in-content-border-radius) !important;
  background: var(--newtab-background-color-secondary) !important;

  filter: saturate(100%) !important;
  backdrop-filter: blur(33px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0) !important;
  color: var(--mode-color) !important;
}
.weatherButtonContextMenuWrapper::after {
  opacity: 0 !important;
}
:root {
  --newtab-weather-background-color: var(
    --newtab-background-color-secondary
  ) !important;
}

/* context menu ---------------------------------------------------------------- */

/*default style*/
.context-menu {
  background-color: var(--in-content-panel-backgrounds) !important;
  border-radius: var(--in-content-border-radius) !important;
  padding: 0.4rem 0.1em;
  margin: 1% 1% 0% 0% !important;
  position: relative;
  box-shadow: 0 10px 15px rgb(0 0 0 / 20%) !important;
  backdrop-filter: blur(33px);
  background-blend-mode: overlay;
  display: flex;
  line-height: 26px;
}
.context-menu > ul > li > button:is(:focus, :hover) {
  border-radius: 5px !important;
  background: var(--newtab-element-hover-color) !important;
  color: var(--in-content-accent-color-1) !important;
}
.weatherButtonContextMenu .context-menu {
  z-index: 1000 !important;
} /*doesnt work its populated*/
.weather .weatherSponsorText {
  display: none !important;
}

/* spacing */
.context-menu > ul {
  margin: 5px !important;
  padding: 2px !important;
}
.context-menu > ul > li > a,
.context-menu > ul > li > button {
  line-height: 26px !important;
  padding: 2px 5px !important;
  border-radius: var(--in-content-border-radius) !important;
  font-weight: normal !important;
  color: var(--mode-color) !important;
}

/* consistent line heights */
.context-menu > ul > li.separator {
  display: flex !important;
  border-bottom: none !important;
  margin: 0px 0 !important;
  font-size: flex !important;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
}

@media (min-width: 1122px) and (max-width: 1506px) {
  .top-sites-list :nth-child(8n) .context-menu {
    font-size: unset !important;
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5) !important;
    box-shadow: 0 10px 15px rgb(0 0 0 / 20%) !important;
  }
}

/* customize menu -------------------------------------------------------------- */

.customize-menu.customize-animate-enter-done,
.customize-menu.customize-animate-enter-active,
.customize-menu.customize-animate-exit-active,
.customize-menu.customize-animate-exit-done {
  box-shadow: 0 0px 15px rgb(0 0 0 / 35%) !important;
}
.customize-menu {
  background-color: var(--newtab-background-color-secondary) !important;
  border-radius: var(--in-content-border-radius) !important;
  position: relative;
  backdrop-filter: blur(33px);
  background-blend-mode: overlay;
  margin: 10px 10px 10px 0px !important;
  height: auto !important;
  font-weight: normal !important;
  box-shadow: unset !important;
}
.customize-menu .close-button {
  border-radius: 8px !important;
  background-color: transparent !important;
}
.customize-menu .close-button:hover {
  background-color: var(--newtab-element-hover-color) !important;
}
.customize-menu .close-button-wrapper {
  background-color: transparent !important;
}

/* home sections --------------------------------------------------------------- */

.home-section .divider {
  border-top: unset !important;
}

.toggle-button,
.selector {
  cursor: pointer !important;
}

.home-section .section .selector {
  border: none !important;
  box-shadow: 3px 10px 15px rgb(0 0 0 / 20%) !important;
  background: url("icons/down.svg") right no-repeat !important;
  background-origin: content-box !important;
}

.home-section .section .selector {
  background-color: var(--newtab-background-color-secondary) !important;
  border-radius: 10px !important;
}

/* latest activity ------------------------------------------------------------- */

.card-outer .card {
  filter: saturate(105%) !important;
  border-radius: var(--in-content-border-radius) !important;
  box-shadow: 0 10px 15px rgb(0 0 0 / 20%) !important;
  backdrop-filter: blur(33px);
  height: auto !important;
}
.compact-cards .card-outer .card-context {
  background-color: rgb(var(--in-content-secodary-color)) !important;
  border-radius: 18px;
  clip-path: inset(-1px -1px 4px);
  height: 32px;
  width: 32px;
  padding: 8px;
  top: 108px !important;
  inset-inline-end: 3px !important;
  inset-inline-start: auto;
}
.ds-highlights .section .section-list .card-outer .card-host-name {
  text-shadow: 1px -1px 2px
    color-mix(in srgb, var(--contrast-color) 60%, transparent) !important;
  color: var(--mode-color) !important;
}
.card-outer:not(.placeholder) .card-title {
  text-shadow: 1px -1px 2px
    color-mix(in srgb, var(--contrast-color) 60%, transparent) !important;
}
.card-outer:is(:hover, :focus, :active, :focus-within, .active):not(
    .placeholder
  )
  .card-title,
.card-outer:is(:hover, :focus, .active):not(.placeholder) .card-title {
  --newtab-primary-action-background: blue !important;
  color: var(--mode-color) !important;
  text-shadow: 1px -1px 2px
    color-mix(in srgb, var(--contrast-color) 60%, transparent) !important;
  text-decoration: underline !important;
}
.compact-cards .card-outer .card-context > .card-context-icon {
  fill: var(--mode-color) !important;
  opacity: 0.7 !important;
}

.card-outer .context-menu-button,
.card-outer .context-menu-button:active,
.card-outer .context-menu-button:focus {
  margin-top: -5px !important;
  margin-right: -5px !important;
  background-color: transparent !important;
  border-color: transparent !important;
  transition-delay: 0ms !important;
  background-image: url("icons/more.svg") !important;
}

.card-outer .context-menu-button {
  box-shadow: unset !important;
}

/* recommended section --------------------------------------------------------- */

.ds-card .meta {
  filter: saturate(140%) !important;
  background-color: var(--newtab-background-color-secondary) !important;
  backdrop-filter: blur(33px);
  height: auto !important;
}

.ds-onboarding-container:not(.placeholder),
.ds-card-grid .ds-card:not(.placeholder) {
  border-radius: 18px !important;
  box-shadow: 0 10px 15px rgb(0 0 0 / 20%) !important;
  background-color: transparent !important;
}
.ds-onboarding-container:not(.placeholder) .img-wrapper .img img,
.ds-onboarding-container:not(.placeholder) .img-wrapper .img .placeholder-image,
.ds-card-grid .ds-card:not(.placeholder) .img-wrapper .img img,
.ds-card-grid .ds-card:not(.placeholder) .img-wrapper .img .placeholder-image {
  border-radius: 16px 16px 0 0 !important;
}

.ds-card .context-menu-button,
.ds-signup .context-menu-button {
  background-color: transparent !important;
  fill: var(--mode-color) !important;
  margin-top: -10px !important;
  transform: scale(1.2) !important;
}
.ds-card .context-menu-button:hover,
.ds-signup .context-menu-button:hover {
  transform: scale(1.7) !important;
}

/* awesome bar ----------------------------------------------------------------- */

:root {
  --newtab-border-color: rgba(120, 120, 120, 0.1) !important;
  --newtab-text-secondary-color: var(--mode-color) !important;
}
/* hide website shortcuts when focused on awesome bar */

.top-site-outer {
  opacity: 0 !important;
  pointer-events: none !important;
}

body:has(#searchSuggestionTable[hidden]) .top-site-outer {
  opacity: 1 !important;
  pointer-events: auto !important;
}

/* style awesome bar */
.search-wrapper .search-handoff-button,
.search-wrapper input {
  background: var(--newtab-background-color-secondary) !important;
  width: 100% !important;
  margin-left: 0% !important;
  text-align: center !important;
}
#newtab-search-text[keepfocus="true"] {
  background-color: transparent !important;
  appearance: none !important;
}
#searchSubmit {
  border-radius: 100% !important;
}
#searchSuggestionTable {
  background-color: var(--newtab-background-color-secondary) !important;
  border-radius: 18px !important;
  padding: 0.6rem !important;
  position: fixed;
  top: 55px !important;
  backdrop-filter: blur(150px) !important;
  background-blend-mode: overlay !important;
  z-index: 999 !important;
  *:not(.contentSearchSuggestionTable .contentSearchSettingsButton) {
    border: 0 transparent solid !important;
  }
}

#searchSuggestionTable .contentSearchSuggestionRow:hover {
  background-color: transparent !important;
  cursor: pointer !important;
}
#searchSuggestionTable .contentSearchSuggestionEntry {
  background-color: transparent !important;
  &:hover {
    background-color: var(--newtab-element-hover-color) !important;
  }
}
#searchSuggestionTable .contentSearchSuggestionEntry {
  padding: 8px 0 8px 0 !important;
}
#searchSuggestionTable td:hover {
  background-color: transparent !important;
  border-radius: 10px !important;
}
/*default search header*/
.contentSearchSuggestionTable .contentSearchHeader {
  padding: 12px 0 12px 0 !important;
  border-radius: 18px !important;
  margin-top: 10px !important;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}
/*search with search engine suggestions container*/
.contentSearchSuggestionTable .contentSearchOneOffsTable {
  border-top: solid 10px transparent !important;
  background-color: transparent !important;
}
/*search engine buttons*/
.contentSearchSuggestionTable .contentSearchOneOffItem {
  border-radius: 18px !important;
  &:hover {
    cursor: pointer;
  }
}
/*search settings button*/
.contentSearchSuggestionTable .contentSearchSettingsButton {
  border-radius: 10px !important;
  background-color: transparent !important;
  padding-bottom: 25px !important;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
    background-color: var(--newtab-element-hover-color) !important;
  }
}

/* new tab rounded tweaks ------------------------------------------------------ */

.wallpaper-input {
  border-radius: var(--in-content-border-radius) !important;
}
.search-inner-wrapper {
  border-radius: 50px !important;
}

```

## File: `css/userContent-files/pdf.css`

```css
@-moz-document regexp(".*\\.(p|P)(d|D)(f|F).*") {
  #loadingBar .progress,
  .dropdownToolbarButton > select,
  .dropdownToolbarButton > select > option,
  .overlayButton,
  .secondaryToolbarButton,
  .toolbarField,
  body,
  div#viewer {
    background-color: var(--in-content-box-background)!important
  }
  body {
    background-image: none!important
  }
  .splitToolbarButtonSeparator,
  .verticalToolbarSeparator {
    box-shadow: none!important;
    background-color: var(--in-content-box-background)!important
  }
  div#toolbarViewer {
    background-color: var(--in-content-category-header-background)!important
  }
  #numPages,
  #pageNumber,
  #scaleSelect {
    color: var(--in-content-page-color)!important
  }
  .pdfViewer .page {
    border-image: none!important
  }
  #pageNumber,
  #scaleSelectContainer {
    border: 1px solid!important;
    border-color: var(--in-content-box-border-color)!important
  }
  #loadingBar {
    position: relative;
    width: 100%;
    height: 4px;
    background-color: var(--theme-selection-background-hover)!important;
    border-bottom: 1px solid!important
  }
  #sidebarContainer,
  #sidebarContent {
    background-color: var(--in-content-page-background)!important
  }
  #toolbarSidebar {
    background-color: var(--in-content-category-header-background)!important;
    background-image: none!important;
    border-color: var(--in-content-box-background)!important
  }
  .doorHanger,
  .doorHangerRight {
    border: 1px solid!important;
    border-color: var(--in-content-box-background)!important;
    box-shadow: none!important
  }
  #toolbarContainer,
  .findbar,
  .secondaryToolbar {
    background-color: var(--in-content-box-background)!important;
    background-image: none!important
  }
  .dropdownToolbarButton,
  .overlayButton,
  .secondaryToolbarButton,
  .toolbarButton {
    border: none!important;
    color: var(--in-content-page-color)!important
  }
  .dropdownToolbarButton,
  .overlayButton,
  .toolbarButton:focus,
  .toolbarButton:hover {
    background-color: var(--in-content-box-background)!important;
    background-image: none!important;
    border: none!important;
    box-shadow: none!important
  }
  .secondaryToolbarButton:focus,
  .secondaryToolbarButton:hover {
    background-color: var(--in-content-page-background)!important;
    background-image: none!important;
    box-shadow: none!important
  }
  .secondaryToolbarButton::before,
  .toolbarButton::before {
    filter: invert(20%)!important
  }
  .secondaryToolbarButton.toggled,
  .splitToolbarButton.toggled > .toolbarButton.toggled,
  .toolbarButton.toggled {
    background-color: var(--in-content-page-background)!important;
    background-image: none!important;
    box-shadow: none!important;
    color: var(--in-content-selected-text)!important
  }
  .horizontalToolbarSeparator {
    background-color: var(--in-content-box-border-color)!important;
    box-shadow: none!important
  }
}
```

## File: `css/userContent-files/private.css`

```css
@-moz-document url(about:privatebrowsing) {

    /*hide private browsing tab info*/ /*
        .showPrivate {
            display: none !important;
        }*/
    .logo-and-wordmark,
    .info-border {
      display: none !important;
    }
    .search-handoff-button,
    .search-handoff-button:active,
    .search-handoff-button:enabled:hover:active {
      filter: saturate(140%) !important;
      border-radius: 18px !important;
      box-shadow: 0 10px 15px rgb(0 0 0 / 20%) !important;
      backdrop-filter: blur(33px);
      background-blend-mode: overlay;
    }
    .search-handoff-button,
    .search-handoff-button:active,
    .search-handoff-button:enabled:hover:active {
      background: transparent !important;
    }
    /*wallpaper for dark mode*/
    @media (prefers-color-scheme: dark) {
      body {
        background-position: center !important;
        background-repeat: no-repeat !important;
        background-size: cover !important;
      }
    }
    /*wallpaper for light mode*/
    @media (prefers-color-scheme: light) {
      body {
        background-position: center !important;
        background-repeat: no-repeat !important;
        background-size: cover !important;
      }
    }
  
}

```

## File: `css/userContent-files/raw_githubusercontent.css`

```css
@-moz-document url-prefix(https://raw.githubusercontent.com) {
  html {
    background: var(--in-content-page-background)!important;
    color: var(--in-content-page-color)!important
  }
}
```

## File: `css/userContent-files/rss.css`

```css
html#feedHandler,
html#feedHandler body {
  background-color: var(--in-content-page-background)!important;
  color: var(--in-content-page-color)!important
}
html#feedHandler h1 {
  border-color: var(--in-content-box-border-color)!important;
  color: var(--in-content-selected-text)!important
}
html#feedHandler #feedBody,
html#feedHandler #feedHeader {
  background-color: var(--in-content-box-background)!important;
  border-color: var(--in-content-box-border-color)!important;
  color: var(--in-content-page-color)!important
}
html#feedHandler *|:link {
  color: var(--in-content-link-color)!important
}
html#feedHandler #subscribeButton {
  -moz-appearance: none!important;
  background: var(--in-content-page-background)!important;
  color: var(--in-content-page-color)!important;
  border: 1px solid;
  border-color: var(--in-content-box-border-color)!important;
  border-radius: 4px
}
html#feedHandler #subscribeButton:hover {
  background: var(--in-content-box-background)!important
}
html#feedHandler .enclosures {
  background: var(--in-content-page-background)!important;
  border-color: var(--in-content-box-border-color)!important
}
#feedHeaderContainer {
  background-color: var(--in-content-box-background)!important;
  display: inline-block!important
}
#feedHeaderContainerSpacer {
  display: none!important
}
#feedBody div.entry a[href] {
  color: var(--in-content-link-color)!important
}
#feedBody div.entry a[href]:hover {
  color: var(--in-content-link-color-hover)!important
}
#feedBody div.entry a[href]:active {
  color: var(--in-content-link-color-active)!important
}
#feedBody div.entry a[href]:visited {
  color: var(--in-content-link-color-visited)!important
}
```

## File: `css/userContent-files/scrollbar.css`

```css
* {
  scrollbar-color: rgba(var(--gray-60), 0.7) rgba(var(--gray-90), 0) !important;
  scrollbar-width: 0.2px !important;
}

```

## File: `css/userContent-files/view_source.css`

```css
@-moz-document url-prefix(view-source) {
  :root {
    background-color: var(--in-content-page-background)!important;
    color: var(--in-content-page-color)!important
  }
  pre[id]:before,
  span[id]:before {
    color: var(--in-content-page-color)!important
  }
  .highlight .end-tag,
  .highlight .start-tag {
    color: var(--theme-highlight-purple)!important
  }
  .highlight .comment {
    color: var(--theme-highlight-green)!important
  }
  .highlight .cdata {
    color: #c06!important
  }
  .highlight .doctype {
    color: #4682b4!important
  }
  .highlight .pi {
    color: var(--theme-highlight-red)!important
  }
  .highlight .entity {
    color: #dea174!important
  }
  .highlight .attribute-name {
    color: var(--theme-highlight-green)!important
  }
  .highlight .attribute-value {
    color: var(--theme-highlight-blue)!important
  }
  .highlight .markupdeclaration {
    color: #4682b4!important
  }
  .highlight .error,
  .highlight .error > :-moz-any(.start-tag,.end-tag,.comment,.cdata,.doctype,.pi,.entity,.attribute-name,.attribute-value) {
    color: #de7474!important
  }
}
```

## File: `resources/notifications/statusbar/camera.svg`

```svg
<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at http://mozilla.org/MPL/2.0/. -->
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white">
  <path d="M14.037 3.828L11 6.479v-2.09A1.345 1.345 0 0 0 9.7 3H2.3A1.345 1.345 0 0 0 1 4.389v7.222A1.345 1.345 0 0 0 2.3 13h7.4a1.345 1.345 0 0 0 1.3-1.389V9.552l3.037 2.648a1.007 1.007 0 0 0 .963.285V3.542a1.007 1.007 0 0 0-.963.286z"/>
</svg>

```

## File: `resources/notifications/statusbar/microphone.svg`

```svg
<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at http://mozilla.org/MPL/2.0/. -->
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white">
  <path d="M8 11a2 2 0 0 0 2-2V3a2 2 0 1 0-4 0v6a2 2 0 0 0 2 2z"/>
  <path d="M12 9V7.5a.5.5 0 0 0-1 0V9a3 3 0 0 1-6 0V7.5a.5.5 0 0 0-1 0V9a4 4 0 0 0 3 3.858V14H5.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1H9v-1.142A4 4 0 0 0 12 9z"/>
</svg>

```

## File: `resources/notifications/statusbar/screen.svg`

```svg
<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at http://mozilla.org/MPL/2.0/. -->
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white">
  <path d="M15 6H7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zm-1 7H8V8h6z"/>
  <path d="M4 8H2V3h6v1a1 1 0 0 0 2 0V2a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h3a1 1 0 0 0 0-2z"/>
</svg>

```

## File: `resources/Mozilla Public License`

```text

  Mozilla Public License
  Version 2.0


    1. Definitions

1.1. “Contributor”

    means each individual or legal entity that creates, contributes to
    the creation of, or owns Covered Software.

1.2. “Contributor Version”

    means the combination of the Contributions of others (if any) used
    by a Contributor and that particular Contributor’s Contribution.

1.3. “Contribution”

    means Covered Software of a particular Contributor.

1.4. “Covered Software”

    means Source Code Form to which the initial Contributor has attached
    the notice in Exhibit A, the Executable Form of such Source Code
    Form, and Modifications of such Source Code Form, in each case
    including portions thereof.

1.5. “Incompatible With Secondary Licenses”

    means

     1.

        that the initial Contributor has attached the notice described
        in Exhibit B to the Covered Software; or

     2.

        that the Covered Software was made available under the terms of
        version 1.1 or earlier of the License, but not also under the
        terms of a Secondary License.

1.6. “Executable Form”

    means any form of the work other than Source Code Form.

1.7. “Larger Work”

    means a work that combines Covered Software with other material, in
    a separate file or files, that is not Covered Software.

1.8. “License”

    means this document.

1.9. “Licensable”

    means having the right to grant, to the maximum extent possible,
    whether at the time of the initial grant or subsequently, any and
    all of the rights conveyed by this License.

1.10. “Modifications”

    means any of the following:

     1.

        any file in Source Code Form that results from an addition to,
        deletion from, or modification of the contents of Covered
        Software; or

     2.

        any new file in Source Code Form that contains any Covered Software.

1.11. “Patent Claims” of a Contributor

    means any patent claim(s), including without limitation, method,
    process, and apparatus claims, in any patent Licensable by such
    Contributor that would be infringed, but for the grant of the
    License, by the making, using, selling, offering for sale, having
    made, import, or transfer of either its Contributions or its
    Contributor Version.

1.12. “Secondary License”

    means either the GNU General Public License, Version 2.0, the GNU
    Lesser General Public License, Version 2.1, the GNU Affero General
    Public License, Version 3.0, or any later versions of those licenses.

1.13. “Source Code Form”

    means the form of the work preferred for making modifications.

1.14. “You” (or “Your”)

    means an individual or a legal entity exercising rights under this
    License. For legal entities, “You” includes any entity that
    controls, is controlled by, or is under common control with You. For
    purposes of this definition, “control” means (a) the power, direct
    or indirect, to cause the direction or management of such entity,
    whether by contract or otherwise, or (b) ownership of more than
    fifty percent (50%) of the outstanding shares or beneficial
    ownership of such entity.


    2. License Grants and Conditions


      2.1. Grants

Each Contributor hereby grants You a world-wide, royalty-free,
non-exclusive license:

 1.

    under intellectual property rights (other than patent or trademark)
    Licensable by such Contributor to use, reproduce, make available,
    modify, display, perform, distribute, and otherwise exploit its
    Contributions, either on an unmodified basis, with Modifications, or
    as part of a Larger Work; and

 2.

    under Patent Claims of such Contributor to make, use, sell, offer
    for sale, have made, import, and otherwise transfer either its
    Contributions or its Contributor Version.


      2.2. Effective Date

The licenses granted in Section 2.1 with respect to any Contribution
become effective for each Contribution on the date the Contributor first
distributes such Contribution.


      2.3. Limitations on Grant Scope

The licenses granted in this Section 2 are the only rights granted under
this License. No additional rights or licenses will be implied from the
distribution or licensing of Covered Software under this License.
Notwithstanding Section 2.1(b) above, no patent license is granted by a
Contributor:

 1.

    for any code that a Contributor has removed from Covered Software; or

 2.

    for infringements caused by: (i) Your and any other third party’s
    modifications of Covered Software, or (ii) the combination of its
    Contributions with other software (except as part of its Contributor
    Version); or

 3.

    under Patent Claims infringed by Covered Software in the absence of
    its Contributions.

This License does not grant any rights in the trademarks, service marks,
or logos of any Contributor (except as may be necessary to comply with
the notice requirements in Section 3.4).


      2.4. Subsequent Licenses

No Contributor makes additional grants as a result of Your choice to
distribute the Covered Software under a subsequent version of this
License (see Section 10.2) or under the terms of a Secondary License (if
permitted under the terms of Section 3.3).


      2.5. Representation

Each Contributor represents that the Contributor believes its
Contributions are its original creation(s) or it has sufficient rights
to grant the rights to its Contributions conveyed by this License.


      2.6. Fair Use

This License is not intended to limit any rights You have under
applicable copyright doctrines of fair use, fair dealing, or other
equivalents.


      2.7. Conditions

Sections 3.1, 3.2, 3.3, and 3.4 are conditions of the licenses granted
in Section 2.1.


    3. Responsibilities


      3.1. Distribution of Source Form

All distribution of Covered Software in Source Code Form, including any
Modifications that You create or to which You contribute, must be under
the terms of this License. You must inform recipients that the Source
Code Form of the Covered Software is governed by the terms of this
License, and how they can obtain a copy of this License. You may not
attempt to alter or restrict the recipients’ rights in the Source Code Form.


      3.2. Distribution of Executable Form

If You distribute Covered Software in Executable Form then:

 1.

    such Covered Software must also be made available in Source Code
    Form, as described in Section 3.1, and You must inform recipients of
    the Executable Form how they can obtain a copy of such Source Code
    Form by reasonable means in a timely manner, at a charge no more
    than the cost of distribution to the recipient; and

 2.

    You may distribute such Executable Form under the terms of this
    License, or sublicense it under different terms, provided that the
    license for the Executable Form does not attempt to limit or alter
    the recipients’ rights in the Source Code Form under this License.


      3.3. Distribution of a Larger Work

You may create and distribute a Larger Work under terms of Your choice,
provided that You also comply with the requirements of this License for
the Covered Software. If the Larger Work is a combination of Covered
Software with a work governed by one or more Secondary Licenses, and the
Covered Software is not Incompatible With Secondary Licenses, this
License permits You to additionally distribute such Covered Software
under the terms of such Secondary License(s), so that the recipient of
the Larger Work may, at their option, further distribute the Covered
Software under the terms of either this License or such Secondary
License(s).


      3.4. Notices

You may not remove or alter the substance of any license notices
(including copyright notices, patent notices, disclaimers of warranty,
or limitations of liability) contained within the Source Code Form of
the Covered Software, except that You may alter any license notices to
the extent required to remedy known factual inaccuracies.


      3.5. Application of Additional Terms

You may choose to offer, and to charge a fee for, warranty, support,
indemnity or liability obligations to one or more recipients of Covered
Software. However, You may do so only on Your own behalf, and not on
behalf of any Contributor. You must make it absolutely clear that any
such warranty, support, indemnity, or liability obligation is offered by
You alone, and You hereby agree to indemnify every Contributor for any
liability incurred by such Contributor as a result of warranty, support,
indemnity or liability terms You offer. You may include additional
disclaimers of warranty and limitations of liability specific to any
jurisdiction.


    4. Inability to Comply Due to Statute or Regulation

If it is impossible for You to comply with any of the terms of this
License with respect to some or all of the Covered Software due to
statute, judicial order, or regulation then You must: (a) comply with
the terms of this License to the maximum extent possible; and (b)
describe the limitations and the code they affect. Such description must
be placed in a text file included with all distributions of the Covered
Software under this License. Except to the extent prohibited by statute
or regulation, such description must be sufficiently detailed for a
recipient of ordinary skill to be able to understand it.


    5. Termination

5.1. The rights granted under this License will terminate automatically
if You fail to comply with any of its terms. However, if You become
compliant, then the rights granted under this License from a particular
Contributor are reinstated (a) provisionally, unless and until such
Contributor explicitly and finally terminates Your grants, and (b) on an
ongoing basis, if such Contributor fails to notify You of the
non-compliance by some reasonable means prior to 60 days after You have
come back into compliance. Moreover, Your grants from a particular
Contributor are reinstated on an ongoing basis if such Contributor
notifies You of the non-compliance by some reasonable means, this is the
first time You have received notice of non-compliance with this License
from such Contributor, and You become compliant prior to 30 days after
Your receipt of the notice.

5.2. If You initiate litigation against any entity by asserting a patent
infringement claim (excluding declaratory judgment actions,
counter-claims, and cross-claims) alleging that a Contributor Version
directly or indirectly infringes any patent, then the rights granted to
You by any and all Contributors for the Covered Software under
Section 2.1 of this License shall terminate.

5.3. In the event of termination under Sections 5.1 or 5.2 above, all
end user license agreements (excluding distributors and resellers) which
have been validly granted by You or Your distributors under this License
prior to termination shall survive termination.


    6. Disclaimer of Warranty

/Covered Software is provided under this License on an “as is” basis,
without warranty of any kind, either expressed, implied, or statutory,
including, without limitation, warranties that the Covered Software is
free of defects, merchantable, fit for a particular purpose or
non-infringing. The entire risk as to the quality and performance of the
Covered Software is with You. Should any Covered Software prove
defective in any respect, You (not any Contributor) assume the cost of
any necessary servicing, repair, or correction. This disclaimer of
warranty constitutes an essential part of this License. No use of any
Covered Software is authorized under this License except under this
disclaimer.

/


    7. Limitation of Liability

/Under no circumstances and under no legal theory, whether tort
(including negligence), contract, or otherwise, shall any Contributor,
or anyone who distributes Covered Software as permitted above, be liable
to You for any direct, indirect, special, incidental, or consequential
damages of any character including, without limitation, damages for lost
profits, loss of goodwill, work stoppage, computer failure or
malfunction, or any and all other commercial damages or losses, even if
such party shall have been informed of the possibility of such damages.
This limitation of liability shall not apply to liability for death or
personal injury resulting from such party’s negligence to the extent
applicable law prohibits such limitation. Some jurisdictions do not
allow the exclusion or limitation of incidental or consequential
damages, so this exclusion and limitation may not apply to You.

/


    8. Litigation

Any litigation relating to this License may be brought only in the
courts of a jurisdiction where the defendant maintains its principal
place of business and such litigation shall be governed by laws of that
jurisdiction, without reference to its conflict-of-law provisions.
Nothing in this Section shall prevent a party’s ability to bring
cross-claims or counter-claims.


    9. Miscellaneous

This License represents the complete agreement concerning the subject
matter hereof. If any provision of this License is held to be
unenforceable, such provision shall be reformed only to the extent
necessary to make it enforceable. Any law or regulation which provides
that the language of a contract shall be construed against the drafter
shall not be used to construe this License against a Contributor.


    10. Versions of the License


      10.1. New Versions

Mozilla Foundation is the license steward. Except as provided in
Section 10.3, no one other than the license steward has the right to
modify or publish new versions of this License. Each version will be
given a distinguishing version number.


      10.2. Effect of New Versions

You may distribute the Covered Software under the terms of the version
of the License under which You originally received the Covered Software,
or under the terms of any subsequent version published by the license
steward.


      10.3. Modified Versions

If you create software not governed by this License, and you want to
create a new license for such software, you may create and use a
modified version of this License if you rename the license and remove
any references to the name of the license steward (except to note that
such modified license differs from this License).


      10.4. Distributing Source Code Form that is Incompatible With
      Secondary Licenses

If You choose to distribute Source Code Form that is Incompatible With
Secondary Licenses under the terms of this version of the License, the
notice described in Exhibit B of this License must be attached.


    Exhibit A - Source Code Form License Notice

    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at https://mozilla.org/MPL/2.0/.

If it is not possible or desirable to put the notice in a particular
file, then You may include the notice in a location (such as a LICENSE
file in a relevant directory) where a recipient would be likely to look
for such a notice.

You may add additional accurate notices of copyright ownership.


    Exhibit B - “Incompatible With Secondary Licenses” Notice

    This Source Code Form is “Incompatible With Secondary Licenses”, as
    defined by the Mozilla Public License, v. 2.0.


```

## File: `resources/userChrome.ag.css`

```css
/* This example style is loaded globally as agent sheet. That means it will affect every document that is loaded including web sites so you really want to constrain your styles to apply only where you want. Thus, the default namespace is set to xul to make rules apply to xul elements. Should you want to apply rules to html elements, you need to use the namespace selector like: html|input */

/* Default to xul namespace */
@namespace url("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul");

/* Allow selecting html elements with named namespace selector */
@namespace html url("http://www.w3.org/1999/xhtml");

/* Demonstrates namespace selector - this would only affect tooltip elements that are html elements. But those don't exist so this does nothing. If you remove the "html|" prefix, then all your tooltips will be black */
/* html|tooltip { */
/*   -moz-appearance: none; */
/*   background-color: rgb(15, 17, 34); */
/*   color: rgba(255, 255, 255, 1); */
/*   border: none; */
/*   padding: 5px; */
/* } */

```

## File: `resources/userChrome.au.css`

```css
/* This example file is supposed to be loaded as author style sheet. Notice that we can use ::part() ::host() etc. selectors here while they are unavailable in user stylesheets. */

/* Default to xul namespace */
@namespace url("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul");

/* Allow selecting html elements with named namespace selector */
@namespace html url("http://www.w3.org/1999/xhtml");

/* Example - this creates a small dot to appear in the top left corner of devtools-button popup - but not in any other panel */
/* #customizationui-widget-panel[viewId="PanelUI-developer-tools"]::part( */
/*     content */
/*   )::before { */
/*   content: ""; */
/*   display: flex; */
/*   position: relative; */
/*   z-index: 2; */
/*   width: 9px; */
/*   margin-inline-end: -9px; */
/*   background-image: radial-gradient( */
/*     currentcolor, */
/*     currentcolor, */
/*     transparent 90% */
/*   ); */
/*   background-size: 5px 5px; */
/*   background-position: 4px 4px; */
/*   background-repeat: no-repeat; */
/* } */

```

## File: `utils/LICENSE`

```markdown
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

```

## File: `utils/boot.sys.mjs`

```mjs
import { AppConstants } from "resource://gre/modules/AppConstants.sys.mjs";
import {
  loaderModuleLink,
  Pref,
  FileSystem,
  windowUtils,
  showNotification,
  startupFinished,
  restartApplication,
  escapeXUL,
  toggleScript,
} from "chrome://userchromejs/content/utils.sys.mjs";

const FX_AUTOCONFIG_VERSION = "0.10.8";
console.warn("Browser is executing custom scripts via autoconfig");

const APP_VARIANT = (() => {
  let is_tb = AppConstants.BROWSER_CHROME_URL.startsWith("chrome://messenger");
  return {
    THUNDERBIRD: is_tb,
    FIREFOX: !is_tb,
  };
})();
const BRAND_NAME = AppConstants.MOZ_APP_DISPLAYNAME_DO_NOT_USE;

const BROWSERCHROME = (() => {
  if (APP_VARIANT.FIREFOX) {
    return AppConstants.BROWSER_CHROME_URL;
  }
  return "chrome://messenger/content/messenger.xhtml";
})();

const PREF_ENABLED = "userChromeJS.enabled";
const PREF_SCRIPTSDISABLED = "userChromeJS.scriptsDisabled";

function getDisabledScripts() {
  return Services.prefs.getStringPref(PREF_SCRIPTSDISABLED, "").split(",");
}

const MODULE_LOADER = new (function () {
  let compiledScript = null;
  let promise = ChromeUtils.compileScript(
    "chrome://userchromejs/content/module_loader.mjs",
  );
  promise.then((s) => {
    compiledScript = s;
  });

  this.ready = () => {
    if (compiledScript) {
      return Promise.resolve(compiledScript);
    }
    return promise;
  };
  return this;
})();

class ScriptData {
  #preLoadedStyle;
  #chromeURI;
  #isRunning = false;
  #injectionFailed = false;
  constructor(leafName, headerText, noExec, isStyle) {
    const hasLongDescription = /^\/\/\ @long-description/im.test(headerText);
    this.filename = leafName;
    this.name = headerText.match(/\/\/ @name\s+(.+)\s*$/im)?.[1];
    this.charset = headerText.match(/\/\/ @charset\s+(.+)\s*$/im)?.[1];
    this.description = hasLongDescription
      ? headerText.match(/\/\/ @description\s+.*?\/\*\s*(.+?)\s*\*\//is)?.[1]
      : headerText.match(/\/\/ @description\s+(.+)\s*$/im)?.[1];
    this.version = headerText.match(/\/\/ @version\s+(.+)\s*$/im)?.[1];
    this.author = headerText.match(/\/\/ @author\s+(.+)\s*$/im)?.[1];
    this.icon = headerText.match(/\/\/ @icon\s+(.+)\s*$/im)?.[1];
    this.homepageURL = headerText.match(/\/\/ @homepageURL\s+(.+)\s*$/im)?.[1];
    this.downloadURL = headerText.match(/\/\/ @downloadURL\s+(.+)\s*$/im)?.[1];
    this.updateURL = headerText.match(/\/\/ @updateURL\s+(.+)\s*$/im)?.[1];
    this.optionsURL = headerText.match(/\/\/ @optionsURL\s+(.+)\s*$/im)?.[1];
    this.id =
      headerText.match(/\/\/ @id\s+(.+)\s*$/im)?.[1] ||
      `${leafName.split(".uc.js")[0]}@${this.author || "userChromeJS"}`;
    this.isESM = this.filename.endsWith(".mjs");
    this.onlyonce = /\/\/ @onlyonce\b/.test(headerText);
    this.inbackground =
      this.filename.endsWith(".sys.mjs") ||
      /\/\/ @backgroundmodule\b/.test(headerText);
    this.ignoreCache = /\/\/ @ignorecache\b/.test(headerText);
    this.manifest = headerText.match(/\/\/ @manifest\s+(.+)\s*$/im)?.[1];
    this.type = isStyle ? "style" : "script";
    this.styleSheetMode = isStyle
      ? headerText.match(/\/\/ @stylemode\s+(.+)\s*$/im)?.[1] === "agent_sheet"
        ? "agent"
        : "author"
      : null;
    this.useFileURI = /\/\/ @usefileuri\b/.test(headerText);
    this.noExec = isStyle || noExec;

    if (
      this.inbackground ||
      this.styleSheetMode === "agent" ||
      (!isStyle && noExec)
    ) {
      this.regex = null;
      this.loadOrder = -1;
    } else {
      // Construct regular expression to use to match target document
      let match,
        rex = {
          include: [],
          exclude: [],
        };
      let findNextRe = /^\/\/ @(include|exclude)\s+(.+)\s*$/gm;
      while ((match = findNextRe.exec(headerText))) {
        rex[match[1]].push(
          match[2].replace(/^main$/i, BROWSERCHROME).replace(/\*/g, ".*?"),
        );
      }
      if (!rex.include.length) {
        rex.include.push(BROWSERCHROME);
      }
      let exclude = rex.exclude.length ? `(?!${rex.exclude.join("$|")}$)` : "";
      this.regex = new RegExp(
        `^${exclude}(${rex.include.join("|") || ".*"})$`,
        "i",
      );
      let loadOrder = headerText.match(/\/\/ @loadOrder\s+(\d+)\s*$/im)?.[1];
      this.loadOrder = Number.parseInt(loadOrder) || 10;
    }

    Object.freeze(this);
  }
  get isEnabled() {
    return getDisabledScripts().indexOf(this.filename) === -1;
  }
  get injectionFailed() {
    return this.#injectionFailed;
  }
  get isRunning() {
    return this.#isRunning;
  }
  setRunning() {
    this.#isRunning = true;
  }
  markScriptInjectionFailure() {
    this.#injectionFailed = true;
  }
  get chromeURI() {
    if (!this.#chromeURI) {
      this.#chromeURI =
        this.type === "style"
          ? Services.io.newURI(`chrome://userstyles/skin/${this.filename}`)
          : Services.io.newURI(`chrome://userscripts/content/${this.filename}`);
    }
    return this.#chromeURI;
  }
  get referenceURI() {
    return this.useFileURI && this.type === "style"
      ? FileSystem.convertChromeURIToFileURI(this.chromeURI)
      : this.chromeURI;
  }
  get preLoadedStyle() {
    return this.#preLoadedStyle;
  }
  static preLoadAuthorStyle(aStyle) {
    if (aStyle.#injectionFailed) {
      console.warn(
        `ignoring style preload for ${aStyle.filename} because it has already failed`,
      );
      return false;
    }
    let sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(
      Ci.nsIStyleSheetService,
    );
    try {
      // Try to preload the file and store it
      aStyle.#preLoadedStyle = sss.preloadSheet(
        aStyle.referenceURI,
        sss.AUTHOR_SHEET,
      );
    } catch (e) {
      console.error(`Could not pre-load ${aStyle.filename}: ${e.name}`);
      return false;
    }
    aStyle.#isRunning = true;
    return true;
  }
  static tryLoadStyleIntoWindow(aStyle, win) {
    if (
      aStyle.styleSheetMode !== "author" ||
      !aStyle.regex?.test(win.location.href)
    ) {
      return;
    }
    if (!aStyle.#preLoadedStyle) {
      let success = ScriptData.preLoadAuthorStyle(aStyle);
      if (!success) {
        return;
      }
    }
    win.windowUtils.addSheet(
      aStyle.#preLoadedStyle,
      Ci.nsIDOMWindowUtils.AUTHOR_SHEET,
    );
    return;
  }
  static markScriptRunning(aScript) {
    aScript.#isRunning = true;
  }
  static injectClassicScriptIntoGlobal(aScript, aGlobal) {
    try {
      Services.scriptloader.loadSubScriptWithOptions(aScript.chromeURI.spec, {
        target: aGlobal,
        ignoreCache: aScript.ignoreCache,
      });
      aScript.#isRunning = true;
      return Promise.resolve(1);
    } catch (ex) {
      aScript.#injectionFailed = true;
      return Promise.reject(ex);
    }
  }
  static registerScriptManifest(aScript) {
    if (aScript.#isRunning) {
      return;
    }
    let cmanifest = FileSystem.getEntry(
      FileSystem.convertChromeURIToFileURI(
        `chrome://userscripts/content/${aScript.manifest}.manifest`,
      ),
    );
    if (cmanifest.isFile()) {
      Components.manager
        .QueryInterface(Ci.nsIComponentRegistrar)
        .autoRegister(cmanifest.entry());
    } else {
      console.warn(
        `Script '${aScript.filename}' tried to register a manifest but requested file '${aScript.manifest}' doesn't exist`,
      );
    }
  }
  static extractScriptHeader(aFSResult) {
    return (
      aFSResult
        .content()
        .match(
          /^\/\/ ==UserScript==\s*[\n\r]+(?:.*[\n\r]+)*?\/\/ ==\/UserScript==\s*/m,
        )?.[0] || ""
    );
  }
  static extractStyleHeader(aFSResult) {
    return (
      aFSResult
        .content()
        .match(
          /^\/\* ==UserScript==\s*[\n\r]+(?:.*[\n\r]+)*?\/\/ ==\/UserScript==\s*\*\//m,
        )?.[0] || ""
    );
  }
  static fromScriptFile(aFile) {
    if (aFile.fileSize < 24) {
      // Smaller files can't possibly have a valid header
      // This also means that we successfully generate a ScriptData for *folders* named "xx.uc.js"...
      return new ScriptData(aFile.leafName, "", aFile.fileSize === 0, false);
    }
    const result = FileSystem.readNSIFileSyncUncheckedWithOptions(aFile, {
      metaOnly: true,
    });
    const headerText = this.extractScriptHeader(result);
    // If there are less than 2 bytes after the header then we mark the script as non-executable. This means that if the file only has a header then we don't try to inject it to any windows, since it wouldn't do anything.
    return new ScriptData(
      aFile.leafName,
      headerText,
      headerText.length > aFile.fileSize - 2,
      false,
    );
  }
  static fromStyleFile(aFile) {
    if (aFile.fileSize < 24) {
      // Smaller files can't possibly have a valid header
      return new ScriptData(aFile.leafName, "", true, true);
    }
    const result = FileSystem.readNSIFileSyncUncheckedWithOptions(aFile, {
      metaOnly: true,
    });
    return new ScriptData(
      aFile.leafName,
      this.extractStyleHeader(result),
      true,
      true,
    );
  }
}

Pref.setIfUnset(PREF_ENABLED, true);
Pref.setIfUnset(PREF_SCRIPTSDISABLED, "");

// This is called if _previous_ startup was broken
function showgBrowserNotification() {
  Services.prefs.setBoolPref("userChromeJS.gBrowser_hack.enabled", true);
  showNotification({
    label: "fx-autoconfig: Something was broken in last startup",
    type: "fx-autoconfig-gbrowser-notification",
    priority: "critical",
    buttons: [
      {
        label: "Why am I seeing this?",
        callback: (notification) => {
          notification.ownerGlobal.openWebLinkIn(
            "https://github.com/MrOtherGuy/fx-autoconfig#startup-error",
            "tab",
          );
          return false;
        },
      },
    ],
  });
}

// This is called if startup somehow takes over 5 seconds
function maybeShowBrokenNotification(window) {
  if (window.isFullyOccluded && "gBrowser" in window) {
    console.log("Window was fully occluded, no need to panic");
    return;
  }
  let aNotificationBox = window.gNotificationBox;
  aNotificationBox.appendNotification("fx-autoconfig-broken-notification", {
    label: "fx-autoconfig: Startup might be broken",
    image: "chrome://browser/skin/notification-icons/popup.svg",
    priority: "critical",
  });
}

function updateMenuStatus(event) {
  const menu = event.target;
  if (!menu.id === "menuUserScriptsPopup") {
    return;
  }
  let disabledScripts = getDisabledScripts();
  for (let item of menu.children) {
    if (item.getAttribute("type") != "checkbox") {
      continue;
    }
    if (disabledScripts.includes(item.dataset.filename)) {
      item.removeAttribute("checked");
    } else {
      item.setAttribute("checked", "true");
    }
  }
}

class UserChrome_js {
  constructor() {
    this.scripts = [];
    this.styles = [];
    this.SESSION_RESTORED = false;
    this.IS_ENABLED = Services.prefs.getBoolPref(PREF_ENABLED, false);
    this.isInitialWindow = true;
    this.initialized = false;
    this.init();
  }
  registerScript(aScript, isDisabled) {
    if (aScript.type === "script") {
      this.scripts.push(aScript);
    } else {
      this.styles.push(aScript);
    }
    if (!isDisabled && aScript.manifest) {
      try {
        ScriptData.registerScriptManifest(aScript);
      } catch (ex) {
        console.error(new Error(`@ ${aScript.filename}`, { cause: ex }));
      }
    }
    return isDisabled;
  }
  init() {
    if (this.initialized) {
      return;
    }
    loaderModuleLink.setup(
      this,
      FX_AUTOCONFIG_VERSION,
      AppConstants.MOZ_APP_DISPLAYNAME_DO_NOT_USE,
      APP_VARIANT,
      ScriptData,
    );

    if (!this.IS_ENABLED) {
      Services.obs.addObserver(this, "domwindowopened", false);
      this.initialized = true;
      return;
    }
    // gBrowserHack setup
    this.GBROWSERHACK_ENABLED =
      (Services.prefs.getBoolPref("userChromeJS.gBrowser_hack.required", false)
        ? 2
        : 0) +
      (Services.prefs.getBoolPref("userChromeJS.gBrowser_hack.enabled", false)
        ? 1
        : 0);
    this.PERSISTENT_DOMCONTENT_CALLBACK = Services.prefs.getBoolPref(
      "userChromeJS.persistent_domcontent_callback",
      false,
    );
    const disabledScripts = getDisabledScripts();
    // load script data
    const scriptDir = FileSystem.getScriptDir();
    if (scriptDir.isDirectory()) {
      for (let entry of scriptDir) {
        if (
          /^[A-Za-z0-9]+.*(\.uc\.js|\.uc\.mjs|\.sys\.mjs)$/i.test(
            entry.leafName,
          )
        ) {
          let script = ScriptData.fromScriptFile(entry);
          if (
            this.registerScript(
              script,
              disabledScripts.includes(script.filename),
            )
          ) {
            continue; // script is disabled
          }
          if (script.inbackground) {
            try {
              if (script.isESM) {
                ChromeUtils.importESModule(script.chromeURI.spec);
                ScriptData.markScriptRunning(script);
              } else {
                console.warn(
                  `Refusing to import legacy jsm style backgroundmodule script: ${script.filename} - convert to ES6 modules instead`,
                );
              }
            } catch (ex) {
              console.error(
                new Error(`@ ${script.filename}:${ex.lineNumber}`, {
                  cause: ex,
                }),
              );
            }
          }
        }
      }
    }
    const styleDir = FileSystem.getStyleDir();
    if (styleDir.isDirectory()) {
      for (let entry of styleDir) {
        if (/^[A-Za-z0-9]+.*\.uc\.css$/i.test(entry.leafName)) {
          let style = ScriptData.fromStyleFile(entry);
          this.registerScript(style, !disabledScripts.includes(style.filename));
        }
      }
      this.addAgentStyles(
        this.styles.filter(
          (style) =>
            style.styleSheetMode === "agent" &&
            !disabledScripts.includes(style.filename),
        ),
      );
    }
    this.scripts.sort((a, b) => a.loadOrder - b.loadOrder);
    this.styles.sort((a, b) => a.loadOrder - b.loadOrder);
    Services.obs.addObserver(this, "domwindowopened", false);
    this.initialized = true;
  }
  addAgentStyles(agentStyles) {
    if (agentStyles.length > 0) {
      let sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(
        Ci.nsIStyleSheetService,
      );
      for (let style of agentStyles) {
        try {
          sss.loadAndRegisterSheet(style.referenceURI, sss.AGENT_SHEET);
          ScriptData.markScriptRunning(style);
        } catch (e) {
          console.error(`Could not load ${style.filename}: ${e.name}`);
        }
      }
    }
  }
  onDOMContent(document) {
    const window = document.defaultView;
    if (
      !/^chrome:(?!\/\/global\/content\/(commonDialog|alerts\/alert)\.xhtml)|about:(?!blank)/i.test(
        window.location.href,
      )
    ) {
      // Don't inject scripts to modal prompt windows or notifications
      if (this.IS_ENABLED && this.styles.length > 0) {
        const disabledScripts = getDisabledScripts();
        for (let style of this.styles) {
          if (!disabledScripts.includes(style.filename)) {
            ScriptData.tryLoadStyleIntoWindow(style, window);
          }
        }
      }
      return;
    }
    ChromeUtils.defineLazyGetter(window, "UC_API", () =>
      ChromeUtils.importESModule(
        "chrome://userchromejs/content/uc_api.sys.mjs",
      ),
    );
    if (this.IS_ENABLED) {
      document.allowUnsafeHTML = false; // https://bugzilla.mozilla.org/show_bug.cgi?id=1432966

      // This is a hack to make gBrowser available for scripts.
      // Without it, scripts would need to check if gBrowser exists and deal
      // with it somehow. See bug 1443849
      const _gb = APP_VARIANT.FIREFOX && "_gBrowser" in window;
      if (this.GBROWSERHACK_ENABLED && _gb) {
        window.gBrowser = window._gBrowser;
      } else if (_gb && this.isInitialWindow) {
        this.isInitialWindow = false;
        let timeout = window.setTimeout(() => {
          maybeShowBrokenNotification(window);
        }, 5000);
        windowUtils.waitWindowLoading(window).then(() => {
          // startup is fine, clear timeout
          window.clearTimeout(timeout);
        });
      }
      // Inject scripts to window
      const disabledScripts = getDisabledScripts();
      // Note, sys.mjs scripts have .regex = null
      const scriptsForWindow = this.scripts.filter((s) =>
        s.regex?.test(window.location.href),
      );

      // .uc.mjs scripts are loaded via module loader
      if (
        scriptsForWindow.some(
          (s) => s.isESM && !disabledScripts.includes(s.filename),
        )
      ) {
        MODULE_LOADER.ready().then((m) => m.executeInGlobal(window));
      }

      for (let script of scriptsForWindow) {
        if (
          script.isESM ||
          disabledScripts.includes(script.filename) ||
          script.injectionFailed ||
          script.noExec ||
          (script.onlyonce && script.isRunning)
        ) {
          continue;
        }
        ScriptData.injectClassicScriptIntoGlobal(script, window);
      }
      for (let style of this.styles) {
        if (!disabledScripts.includes(style.filename)) {
          ScriptData.tryLoadStyleIntoWindow(style, window);
        }
      }
    }
    if (window.isChromeWindow) {
      const menu = document.querySelector(
        APP_VARIANT.FIREFOX ? "#menu_openDownloads" : "menuitem#addressBook",
      );
      if (menu) {
        menu.parentNode.addEventListener(
          "popupshown",
          (ev) => this.generateScriptMenuItemsIfNeeded(ev.target.ownerDocument),
          { once: true },
        );
      }
    }
  }

  // Add simple script menu to menubar tools popup
  generateScriptMenuItemsIfNeeded(aDoc) {
    {
      let menu = aDoc.getElementById("userScriptsMenu");
      if (menu) {
        return menu;
      }
    }
    const popup = aDoc.querySelector(
      APP_VARIANT.FIREFOX ? "#menu_openDownloads" : "menuitem#addressBook",
    )?.parentNode;

    if (aDoc.location.href !== BROWSERCHROME || !popup) {
      return null;
    }
    const window = aDoc.ownerGlobal;

    window.MozXULElement.insertFTLIfNeeded("toolkit/about/aboutSupport.ftl");
    let menuFragment = window.MozXULElement.parseXULToFragment(`
      <menu id="userScriptsMenu" label="userScripts">
        <menupopup id="menuUserScriptsPopup">
          <menuseparator></menuseparator>
          <menuitem id="userScriptsMenu-OpenFolder" label="Open folder"></menuitem>
          <menuitem id="userScriptsMenu-Restart" label="Restart" tooltiptext="Toggling scripts requires restart"></menuitem>
          <menuitem id="userScriptsMenu-ClearCache" label="Restart and clear startup cache" tooltiptext="Toggling scripts requires restart"></menuitem>
        </menupopup>
      </menu>
    `);
    const itemsFragment = window.MozXULElement.parseXULToFragment("");
    for (let script of this.scripts) {
      UserChrome_js.appendScriptMenuitemToFragment(
        window,
        itemsFragment,
        script,
      );
    }
    if (this.styles.length) {
      itemsFragment.append(aDoc.createXULElement("menuseparator"));
      for (let style of this.styles) {
        UserChrome_js.appendScriptMenuitemToFragment(
          window,
          itemsFragment,
          style,
        );
      }
    }
    if (!this.IS_ENABLED) {
      itemsFragment.append(
        window.MozXULElement.parseXULToFragment(
          '<menuitem label="&lt;fx-autoconfig is disabled&gt;" disabled="true"></menuitem>',
        ),
      );
    }
    let menupopup = menuFragment.getElementById("menuUserScriptsPopup");
    menupopup.prepend(itemsFragment);
    popup.prepend(menuFragment);
    menupopup.addEventListener("popupshown", updateMenuStatus);
    menupopup.addEventListener("command", (ev) => {
      switch (ev.target.id) {
        case "userScriptsMenu-OpenFolder":
          FileSystem.getScriptDir().showInFileManager();
          break;
        case "userScriptsMenu-Restart":
          restartApplication(false);
          break;
        case "userScriptsMenu-ClearCache":
          restartApplication(true);
          break;
        default:
          if (ev.target.dataset.filename) {
            toggleScript(ev.target.dataset.filename);
          }
      }
    });
    aDoc.l10n
      .formatValues([
        "restart-button-label",
        "clear-startup-cache-label",
        "show-dir-label",
      ])
      .then((values) => {
        let baseTitle = `${values[0]} ${BRAND_NAME}`;
        aDoc
          .getElementById("userScriptsMenu-Restart")
          .setAttribute("label", baseTitle);
        aDoc
          .getElementById("userScriptsMenu-ClearCache")
          .setAttribute(
            "label",
            values[1].replace("…", "") + " & " + baseTitle,
          );
        aDoc
          .getElementById("userScriptsMenu-OpenFolder")
          .setAttribute("label", values[2]);
      });
    return popup.querySelector("#userScriptsMenu");
  }
  static appendScriptMenuitemToFragment(aWindow, aFragment, aScript) {
    aFragment.append(
      aWindow.MozXULElement.parseXULToFragment(`
        <menuitem type="checkbox"
                  label="${escapeXUL(aScript.name || aScript.filename)}"
                  data-filename="${escapeXUL(aScript.filename)}"
                  checked="true">
        </menuitem>
    `),
    );
    return;
  }
  observe(aSubject, aTopic, aData) {
    aSubject.addEventListener("DOMContentLoaded", this, {
      once: !this.PERSISTENT_DOMCONTENT_CALLBACK,
      capture: true,
    });
  }

  handleEvent(aEvent) {
    switch (aEvent.type) {
      case "DOMContentLoaded":
        this.onDOMContent(aEvent.originalTarget);
        break;
      default:
        console.warn(new Error("unexpected event received", { cause: aEvent }));
    }
  }
}

const _ucjs = !Services.appinfo.inSafeMode && new UserChrome_js();
_ucjs &&
  startupFinished().then(() => {
    _ucjs.SESSION_RESTORED = true;
    _ucjs.GBROWSERHACK_ENABLED === 2 && showgBrowserNotification();
    if (Pref.setIfUnset("userChromeJS.firstRunShown", true)) {
      showNotification({
        type: "fx-autoconfig-installed",
        label: `fx-autoconfig: ${BRAND_NAME} is being modified with custom autoconfig scripting`,
      });
    }
  });

```

## File: `utils/chrome.manifest`

```manifest
content userchromejs ./
content userscripts ../JS/
skin userstyles classic/1.0 ../CSS/
content userchrome ../resources/

```

## File: `utils/fs.sys.mjs`

```mjs
export class FileSystem{
  static RESULT_CONTENT = Symbol("Content");
  static RESULT_DIRECTORY = Symbol("Directory");
  static RESULT_ERROR = Symbol("Error");
  static RESULT_FILE = Symbol("File");

  static getFileURIForFile(aEntry, type){
    let qi = Services.io.getProtocolHandler('file').QueryInterface(Ci.nsIFileProtocolHandler);
    if(type === FileSystem.RESULT_DIRECTORY){
      return qi.getURLSpecFromDir(aEntry)
    }
    if(type === FileSystem.RESULT_FILE){
      return qi.getURLSpecFromActualFile(aEntry)
    }
    throw ResultError.fromKind(FileSystem.ERROR_KIND_INVALID_ARGUMENT,{expected: "FileSystem.RESULT_FILE | FileSystem.RESULT_DIRECTORY"})
  }
  
  static convertChromeURIToFileURI(aURI){
    const registry = Cc["@mozilla.org/chrome/chrome-registry;1"].getService(Ci.nsIChromeRegistry);
    return registry.convertChromeURL(
      aURI instanceof Ci.nsIURI
        ? aURI
        : Services.io.newURI(aURI)
    );
  }
  // Call to .parent is needed because chrome urls get implicit "filename" based on the provider
  static #SCRIPT_URI;
  static #STYLE_URI;
  static #RESOURCE_URI;
  static{
    this.#RESOURCE_URI = FileSystem.getFileURIForFile(
      FileSystem.convertChromeURIToFileURI('chrome://userchrome/content/')
      .QueryInterface(Ci.nsIFileURL).file.parent,
      FileSystem.RESULT_DIRECTORY
    );
    this.#SCRIPT_URI = FileSystem.getFileURIForFile(
      FileSystem.convertChromeURIToFileURI('chrome://userscripts/content/')
      .QueryInterface(Ci.nsIFileURL).file.parent,
      FileSystem.RESULT_DIRECTORY
    );
    this.#STYLE_URI = FileSystem.getFileURIForFile(
      FileSystem.convertChromeURIToFileURI('chrome://userstyles/skin/')
      .QueryInterface(Ci.nsIFileURL).file.parent,
      FileSystem.RESULT_DIRECTORY
    );
  }
  
  static get SCRIPT_URI(){
    return Services.io.newURI(FileSystem.#SCRIPT_URI)
  }
  
  static get STYLE_URI(){
    return Services.io.newURI(FileSystem.#STYLE_URI)
  } 
  
  static get RESOURCE_URI(){
    return Services.io.newURI(FileSystem.#RESOURCE_URI)
  } 
  
  static getResourceDir(){
    return FileSystemResult.fromNsIFile(FileSystem.RESOURCE_URI.QueryInterface(Ci.nsIFileURL).file)
  }
  
  static getScriptDir(){
    return FileSystemResult.fromNsIFile(FileSystem.SCRIPT_URI.QueryInterface(Ci.nsIFileURL).file)
  }
  
  static getStyleDir(){
    return FileSystemResult.fromNsIFile(FileSystem.STYLE_URI.QueryInterface(Ci.nsIFileURL).file)
  }
  
  static #getEntryFromString(aFilename, baseFileURI){
    let baseDirectory = baseFileURI.QueryInterface(Ci.nsIFileURL).file;
    if(typeof aFilename !== "string"){
      return FileSystemResult.fromErrorKind(FileSystem.ERROR_KIND_INVALID_ARGUMENT,{expected:"String"});
    }
    const parts = aFilename.replace("\\","/").split("/").filter(a => a.length > 0);
    while(parts[0] === ".."){
      baseDirectory = baseDirectory.parent;
      parts.shift();
    }
    try{
      for(let part of parts){
        baseDirectory.append(part)
      }
    }catch(ex){
      return FileSystemResult.fromErrorKind(FileSystem.ERROR_KIND_INVALID_ARGUMENT,{type:"Invalid path"})
    }
    return FileSystemResult.fromNsIFile(baseDirectory)
  }
  
  static getEntry(aFilename, options = {}){
    if(aFilename instanceof Ci.nsIURI){
      if(aFilename.scheme === "chrome"){
        return FileSystemResult.fromNsIFile(FileSystem.convertChromeURIToFileURI(aFilename).QueryInterface(Ci.nsIFileURL).file)
      }
      if(aFilename.scheme === "file"){
        return FileSystemResult.fromNsIFile(aFilename.QueryInterface(Ci.nsIFileURL).file)
      }
      throw new Error("unsupported nsIURI conversion")
    }
    return FileSystem.#getEntryFromString(aFilename, options.baseDirectory || FileSystem.RESOURCE_URI)
  }
  static readNSIFileSyncUncheckedWithOptions(aFile,options){
    let stream = Cc['@mozilla.org/network/file-input-stream;1'].createInstance(Ci.nsIFileInputStream);
    let cvstream = Cc['@mozilla.org/intl/converter-input-stream;1'].createInstance(Ci.nsIConverterInputStream);
    try{
      stream.init(aFile, 0x01, 0, 0);
      cvstream.init(stream, 'UTF-8', 1024, Ci.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER);
    }catch(e){
      console.error(e);
      cvstream.close();
      stream.close();
      return FileSystemResult.fromErrorKind(FileSystem.ERROR_KIND_NOT_READABLE,{cause: e, filename: aFile.leafName})
    }
    let rv = {content:'',path: FileSystem.getFileURIForFile(aFile,FileSystem.RESULT_FILE)};
    let data = {};
    const metaOnly = !!options.metaOnly;
    while (cvstream.readString(4096, data)) {
      rv.content += data.value;
      if (metaOnly && rv.content.indexOf('// ==/UserScript==') > 0) {
        break;
      }
    }
    cvstream.close();
    stream.close();
    
    return FileSystemResult.fromContent(rv)
  }
  static readFileSync(aFile, options = {}) {
    if(typeof aFile === "string"){
      const fsResult = FileSystem.#getEntryFromString(aFile, FileSystem.RESOURCE_URI);
      if(fsResult.isFile()){
        return FileSystem.readNSIFileSyncUncheckedWithOptions(fsResult.entry(),options);
      }
      return fsResult.isError()
        ? fsResult
        : FileSystemResult.fromErrorKind(FileSystem.ERROR_KIND_NOT_FILE,{topic: aFile})
    }
    if(aFile instanceof Ci.nsIFile){
      return FileSystem.readNSIFileSyncUncheckedWithOptions(aFile,options);
    }
    throw ResultError.fromKind(FileSystem.ERROR_KIND_INVALID_ARGUMENT,{expected: "string | Ci.nsIFile"})
  }
  static async readFile(aPath){
    if(typeof aPath !== "string"){
      throw ResultError.fromKind(FileSystem.ERROR_KIND_INVALID_ARGUMENT,{expected: "string"})
    }
    try{
      let path = FileSystem.#appendToBaseURI(aPath);
      return FileSystemResult.fromContent({ content: await IOUtils.readUTF8(path), path: PathUtils.toFileURI(path) })
    }catch(ex){
      return FileSystemResult.fromErrorKind(FileSystem.ERROR_KIND_NOT_READABLE,{cause: ex})
    }
  }  
  static async readJSON(path){
    try{
      let result = await FileSystem.readFile(path);
      return result.isError()
            ? null
            : JSON.parse(result.content())
    }catch(ex){
      console.error(ex)
    }
    return null
  }
  static readIni(path){
    let fileURI = FileSystem.convertChromeURIToFileURI(Services.io.newURI(`chrome://userchrome/content/${path}`));
    return IniFile.parse(fileURI.QueryInterface(Ci.nsIFileURL).file)
  }
  static readConfig(path){
    let fileURI = FileSystem.convertChromeURIToFileURI(Services.io.newURI(`chrome://userchrome/content/${path}`));
    return IniConfig.fromURI(fileURI)
  }
  static #appendToBaseURI(aPath,aFileURI){
    // Normally, this API can only write into resources directory
    // Writing outside of resources can be enabled using following pref
    const disallowUnsafeWrites = !Services.prefs.getBoolPref("userChromeJS.allowUnsafeWrites",false);
    
    const baseURI = aFileURI || FileSystem.RESOURCE_URI;
    let baseParts = PathUtils.split(baseURI.QueryInterface(Ci.nsIFileURL).file.path);
    let pathParts = aPath.split(/[\\\/]/);
    while(pathParts[0] === ".."){
      baseParts.pop();
      pathParts.shift();
      if(disallowUnsafeWrites){
        throw ResultError.fromKind(FileSystem.ERROR_KIND_NOT_ALLOWED)
      }
    }
    return PathUtils.join(...baseParts.concat(pathParts))
  }
  static IO = new Proxy(IOUtils,{
    get(target,prop){
      if(typeof target[prop] != "function"){
        return undefined
      }
      const func = target[prop];
      return (path, ...args) => Reflect.apply(func,null,[FileSystem.#appendToBaseURI(path),...args]) 
    }
  });
  static async writeFile(path, content, options = {}){
    if(!path || typeof path !== "string"){
      throw ResultError.fromKind(FileSystem.ERROR_KIND_INVALID_ARGUMENT,{expected: "string"})
    }
    if(typeof content !== "string"){
      throw ResultError.fromKind(FileSystem.ERROR_KIND_INVALID_ARGUMENT,{expected: "string"})
    }
    const fileName = FileSystem.#appendToBaseURI(path);
    if(!options.tmpPath){
      options.tmpPath = fileName + ".tmp";
    }
    return IOUtils.writeUTF8( fileName, content, options );
  }
  static createFileURI(fileName){
    if(!fileName){
      return FileSystem.#RESOURCE_URI
    }
    return FileSystem.convertChromeURIToFileURI(`chrome://userchrome/content/${fileName}`).spec
  }
  static chromeDir(){
    return FileSystemResult.fromDirectory(Services.dirsvc.get('UChrm',Ci.nsIFile))
  }
  static StringContent(obj){
    return FileSystemResult.fromContent(obj)
  }
  static ERROR_KIND_NOT_EXIST = 1;
  static ERROR_KIND_NOT_DIRECTORY = 2;
  static ERROR_KIND_NOT_FILE = 3;
  static ERROR_KIND_NOT_CONTENT = 4;
  static ERROR_KIND_UNKNOWN_RESULT = 5;
  static ERROR_KIND_INVALID_ARGUMENT = 6;
  static ERROR_KIND_NOT_READABLE = 7;
  static ERROR_KIND_NOT_ALLOWED = 8;
}

export class IniConfig{
  #error;
  constructor(iniFile,ex){
    if(ex){
      this.#error = ex;
      return
    }
    this.#error = null;
    
    let keys = Object.keys(iniFile.data);
    let iniSections = iniFile.sections();
    let removedSections = new Set();
    for(let [sectionName,sectionData] of iniSections){
      if(removedSections.has(sectionName)){
        continue
      }
      for(let [key,value] of sectionData){
        if(keys.includes(key)){
          if(!iniFile.data[key].has("enabled")){
            iniFile.data[key].set("enabled",value)
          }
          sectionData.set(key,Object.fromEntries(iniFile.data[key]));
          removedSections.add(key);
        }
      }
    }
    for(let [sectionName,sectionData] of iniSections){
      if(!removedSections.has(sectionName)){
        this[sectionName] = Object.fromEntries(sectionData)
      }
    }
  }
  
  isError(){
    return this.#error != null
  }
  error(){
    return this.#error
  }
  static fromFile(aFile){
    if(!(aFile instanceof Ci.nsIFile)){
      throw ResultError.fromKind(FileSystem.ERROR_KIND_INVALID_ARGUMENT,{expected: "Ci.nsIFile"})
    }
    try{
      return new IniConfig(IniUtils.parseFileSync(aFile))
    }catch(ex){
      return new IniConfig(null,ex)
    }
  }
  static fromFileURI(aURI){
    return IniConfig.fromFile(aURI.QueryInterface(Ci.nsIFileURL).file)
  }
}

export class IniUtils{
  static #createParser(aSource){
    const factory = Cc["@mozilla.org/xpcom/ini-parser-factory;1"].getService(Ci.nsIINIParserFactory);
    return factory.createINIParser(aSource);
  }
  static async parseFile(aIniFile){
    if(!(aIniFile instanceof Ci.nsIFile)){
      throw ResultError.fromKind(FileSystem.ERROR_KIND_INVALID_ARGUMENT,{expected: "Ci.nsIFile"})
    }
    const ini = IniUtils.#createParser(null);
    ini.initFromString(await IOUtils.readUTF8(aIniFile.path));
    return IniUtils.#parse(ini,PathUtils.toFileURI(aIniFile.path))
  }
  static parseFileSync(aIniFile){
    if(!(aIniFile instanceof Ci.nsIFile)){
      throw ResultError.fromKind(FileSystem.ERROR_KIND_INVALID_ARGUMENT,{expected: "Ci.nsIFile"})
    }
    return IniUtils.#parse(IniUtils.#createParser(aIniFile),PathUtils.toFileURI(aIniFile.path))
  }
  static parseContent(aIniContent){
    const ini = IniUtils.#createParser(null);
    if(aIniContent instanceof FileSystemResult){
      ini.initFromString(aIniContent.content())
    }else if(typeof aIniContent === "string"){
      ini.initFromString(aIniContent)
    }else{
      throw new TypeError("unsupported argument")
    }
    return IniUtils.#parse(ini,aIniContent.fileURI || null)
  }
  static #parse(ini,fileURI){
    const sections = ini.getSections();
    const result = new IniUtils.IniFile(fileURI);
    while (sections.hasMore()) {
      const section = sections.getNext();
      const uniqueKeys = new Map();
      for(let iniKey of Array.from(ini.getKeys(section))){
        let leafName = iniKey.trim();
        if(uniqueKeys.has(leafName)){
          console.warn("ini has duplicate keys: "+leafName);
          continue
        }
        uniqueKeys.set(
          leafName,
          IniUtils.#iniValue(ini.getString(section,iniKey).trim())
        )
      }
      result.addSection(section,uniqueKeys);
    }
    return result
  }
  static write(aIniFile){
    
    IOUtils.writeUTF8( fileName, content, options )
  }
  
  static #iniValue(str){
    if(str === "true")
      return true
    if(str === "false")
      return false
    if(/^".*"$/.test(str))
      return str
    let n = Number.parseFloat(str)
    return Number.isNaN(n)
      ? str
      : n
  }
  
  static IniFile = class{
    constructor(filename){
      this.urispec = filename;
      this.data = {}
    }
    addSection(name,data){
      this.data[name] = data;
    }
    sections(){
      return Object.entries(this.data)
    }
  }
}

class ResultError extends Error{
  
  constructor(kind,options,info = {}){
    super(ResultError.toMessage(kind,info),options);
    this.kind = kind;
    this.name = "ResultError";
  }
  static toMessage(kind,info){
    const strInfo = ResultError.parseInfo(info);
    switch(kind){
      case FileSystem.ERROR_KIND_NOT_EXIST:
        return `Entry doesn't exist: ${strInfo}`
      case FileSystem.ERROR_KIND_NOT_DIRECTORY:
        return `Result is not a directory: ${strInfo}`
      case FileSystem.ERROR_KIND_NOT_FILE:
        return `Result is not a file: ${strInfo}`
      case FileSystem.ERROR_KIND_NOT_CONTENT:
        return `Result is not content: ${strInfo}`
      case FileSystem.ERROR_KIND_UNKNOWN_RESULT:
        return `Unknown result type: ${strInfo}`
      case FileSystem.ERROR_KIND_INVALID_ARGUMENT:
        return `Invalid argument: ${strInfo}`
      case FileSystem.ERROR_KIND_NOT_READABLE:
        return `File stream is not readable: ${strInfo}`
      case FileSystem.ERROR_KIND_NOT_ALLOWED:
        return "Writing outside of resources directory is not allowed"
      default:
        return "Unknown error"
    }
  }
  static parseInfo(aInfo){
    return Object.entries(aInfo).map(a => `${a[0]}: ${a[1]}`).join("; ")
  }
  static fromKind(aKind,info){
    return info instanceof ResultError
      ? info
      : new ResultError(aKind,{},info)
  }
}

class FileSystemResult{
  #result;
  #type;
  #fileuri;
  constructor(data,resultType){
    this.#result = data;
    this.#type = resultType;
  }
  
  get fileURI(){
    if(this.isError()){
      return null
    }
    if(!this.#fileuri){
      this.#fileuri = FileSystemResult.#getFileURI(this)
    }
    return this.#fileuri
  }
  content(replaceNewlines){
    if(this.isContent()){
      return replaceNewlines
          ? this.#result.content.replace(/\r\n?/g, '\n')
          : this.#result.content
    }
    throw ResultError.fromKind(FileSystem.ERROR_KIND_NOT_CONTENT,{type:this.#type.description})
  }
  get size(){
    return this.isContent()
          ? this.#result.content.length
          : this.#result.fileSize
  }
  entry(){
    if(this.isDirectory() || this.isFile()){
      return this.#result
    }
    throw ResultError.fromKind(FileSystem.ERROR_KIND_NOT_EXIST,FileSystemResult.#generateErrorInfo(this))
  }
  error(){
    return this.isError()
          ? this.#result
          : null
  }
  readSync(){
    if(!this.isFile()){
      throw ResultError.fromKind(FileSystem.ERROR_KIND_NOT_FILE,FileSystemResult.#generateErrorInfo(this))
    }
    return FileSystem.readNSIFileSyncUncheckedWithOptions(this.#result,{}).content()
  }
  read(){
    if(!this.isFile()){
      return Promise.reject(ResultError.fromKind(FileSystem.ERROR_KIND_NOT_FILE,FileSystemResult.#generateErrorInfo(this)))
    }
    return IOUtils.readUTF8(this.#result.path)
  }
  get type(){
    return this.#type
  }
  isContent(){
    return this.#type === FileSystem.RESULT_CONTENT
  }
  isFile(){
    return this.#type === FileSystem.RESULT_FILE
  }
  isDirectory(){
    return this.#type === FileSystem.RESULT_DIRECTORY
  }
  isError(){
    return this.#type === FileSystem.RESULT_ERROR
  }
  [Symbol.iterator](){
    try{
      return this.entries()
    }catch(e){
      console.warn(e)
    }
    return { next() { return { done: true } } }
  };
  entries(){
    if(!this.isDirectory()){
      throw ResultError.fromKind(FileSystem.ERROR_KIND_NOT_DIRECTORY,FileSystemResult.#generateErrorInfo(this))
    }
    let enumerator = this.#result.directoryEntries.QueryInterface(Ci.nsISimpleEnumerator);
    return {
      next() {
        return enumerator.hasMoreElements()
        ? {
            value: enumerator.getNext().QueryInterface(Ci.nsIFile),
            done: false
          }
        : { done: true }
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  }
  showInFileManager(){
    try{
      if(this.isFile()){
        this.#result.reveal();
        return true
      }
      if(this.isDirectory()){
        this.#result.launch();
        return true
      }
    }catch(ex){
      console.error("Could not open file manager for: " + this.#result.leafName);
    }
    return false 
  }
  static #generateErrorInfo(aResult){
    if(aResult.isError()){
      return aResult.#result
    }
    return {
      topic: aResult.isContent()
        ? aResult.#result.path
        : aResult.#result.leafName
      }
  }
  static #getFileURI(aResult){
    if(aResult.isContent()){
      return aResult.#result.path
    }
    return FileSystem.getFileURIForFile(aResult.#result,aResult.#type)
  }
  static fromDirectory(dir){
    return new FileSystemResult(dir, FileSystem.RESULT_DIRECTORY)
  }
  static fromContent(content){
    return new FileSystemResult(content, FileSystem.RESULT_CONTENT)
  }
  static fromErrorKind(aKind,aErrorDescription){
    return new FileSystemResult(ResultError.fromKind(aKind,aErrorDescription), FileSystem.RESULT_ERROR)
  }
  static fromFile(file){
    return new FileSystemResult(file, FileSystem.RESULT_FILE)
  }
  static fromNsIFile(entry){
    if(!entry.exists()){
      return FileSystemResult.fromErrorKind(FileSystem.ERROR_KIND_NOT_EXIST,{topic: entry.leafName})
    }
    if(entry.isDirectory()){
      return FileSystemResult.fromDirectory(entry)
    }else if(entry.isFile()){
      return FileSystemResult.fromFile(entry)
    }
    return FileSystemResult.fromErrorKind(FileSystem.ERROR_KIND_UNKNOWN_RESULT,{topic: entry.leafName})
  }
}

```

## File: `utils/module_loader.mjs`

```mjs
{
  const PREF_SCRIPTSDISABLED = 'userChromeJS.scriptsDisabled';
  
  let { loaderModuleLink } = ChromeUtils.importESModule("chrome://userchromejs/content/utils.sys.mjs");
  
  let disabledScripts = Services.prefs.getStringPref(PREF_SCRIPTSDISABLED,"").split(",");
  
  let moduleScripts = loaderModuleLink.scripts
  .filter(s => s.isESM
            && s.regex?.test(window.location.href)
            && !disabledScripts.includes(s.filename)
            && !s.noExec
            && !(s.onlyonce && s.isRunning)
            && !s.injectionFailed
  );
  for(let script of moduleScripts){
    import(script.chromeURI.spec)
    .catch(ex => {
      console.error(new Error(`@ ${script.filename}:${ex.lineNumber}`,{cause:ex}));
      script.markScriptInjectionFailure();
    })
    .finally(()=>script.setRunning())
  }
}
```

## File: `utils/uc_api.sys.mjs`

```mjs
const {
  Hotkey,
  windowUtils,
  SharedStorage,
  Pref,
  FileSystem,
  restartApplication,
  startupFinished,
  createElement,
  createWidget,
  escapeXUL,
  loadURI,
  loaderModuleLink,
  getScriptData,
  getStyleData,
  parseStringAsScriptInfo,
  toggleScript,
  updateStyleSheet,
  showNotification,
  defineModuleGettersWithFallback,
} = ChromeUtils.importESModule("chrome://userchromejs/content/utils.sys.mjs");

export {
  FileSystem,
  Hotkey as Hotkeys,
  Pref as Prefs,
  SharedStorage,
  windowUtils as Windows,
};

export const Runtime = Object.freeze({
  appVariant: loaderModuleLink.variant.THUNDERBIRD ? "Thunderbird" : "Firefox",
  brandName: loaderModuleLink.brandName,
  config: null,
  restart: restartApplication,
  startupFinished: startupFinished,
  loaderVersion: loaderModuleLink.version,
});

export const Utils = Object.freeze({
  createElement: createElement,
  createWidget: createWidget,
  escapeXUL: escapeXUL,
  loadURI: loadURI,
  defineModuleGettersWithFallback: defineModuleGettersWithFallback,
});

export const Scripts = Object.freeze({
  getScriptData: getScriptData,
  getStyleData: getStyleData,
  getScriptMenuForDocument(doc) {
    return (
      doc.getElementById("userScriptsMenu") ||
      loaderModuleLink.getScriptMenu(doc)
    );
  },
  openScriptDir() {
    FileSystem.getScriptDir().showInFileManager();
  },
  openStyleDir() {
    FileSystem.getStyleDir().showInFileManager();
  },
  parseStringAsScriptInfo: parseStringAsScriptInfo,
  toggleScript: toggleScript,
  reloadStyleSheet: updateStyleSheet,
});

export const Notifications = Object.freeze({
  show(def) {
    showNotification(def);
  },
});

```

## File: `utils/utils.sys.mjs`

```mjs
import { FileSystem } from "chrome://userchromejs/content/fs.sys.mjs";
export { FileSystem };
const WidgetCallbacks = new Map();

class Storage {
  #listeners;
  #onChanged;
  #storage = {};
  #boundGet;
  #boundSet;
  #boundRemove;
  #boundClear;
  #debug;
  constructor() {
    this.#listeners = new Set();
    this.onChanged = Object.freeze({
      addListener: (fun) => {
        this.#listeners.add(fun);
      },
      removeListener: (fun) => {
        this.#listeners.delete(fun);
      },
      hasListener: (fun) => {
        return this.#listeners.has(fun);
      },
    });
    this.#boundGet = this.get.bind(this);
    this.#boundSet = this.set.bind(this);
    this.#boundClear = this.clear.bind(this);
    this.#boundRemove = this.remove.bind(this);
    this.#debug = this.debug.bind(this);
  }
  get(key) {
    return this.#storage[key];
  }
  set(key, value) {
    let changes = { [key]: { oldValue: this.#storage[key], newValue: value } };
    this.#storage[key] = value;
    this.#notifyListeners(changes);
  }
  #notifyListeners(changes) {
    for (let fun of this.#listeners) {
      fun(changes);
    }
  }
  remove(key) {
    if (this.#storage.hasOwnProperty(key)) {
      let changes = {
        [key]: { oldValue: this.#storage[key], newValue: undefined },
      };
      delete this.#storage[key];
      this.#notifyListeners(changes);
      return true;
    }
    return false;
  }
  clear() {
    let changes = {};
    for (let [key, val] of Object.entries(this.#storage)) {
      changes[key] = { oldValue: val, newValue: undefined };
      delete this.#storage[key];
    }
    if (Object.keys(changes).length > 0) {
      this.#notifyListeners(changes);
      return true;
    }
    return false;
  }
  debug() {
    return Object.assign({}, this.#storage);
  }
  static getMethod(target, prop) {
    if (prop === "debug") {
      return target.#debug;
    }
    if (prop === "get") {
      return target.#boundGet;
    }
    if (prop === "set") {
      return target.#boundSet;
    }
    if (prop === "remove") {
      return target.#boundRemove;
    }
    if (prop === "clear") {
      return target.#boundClear;
    }
  }
}

export const SharedStorage = new Proxy(new Storage(), {
  get(target, key) {
    if (key === "onChanged") {
      return target.onChanged;
    }
    if (key in target) {
      return Storage.getMethod(target, key);
    }
    return Reflect.apply(target.get, target, [key]);
  },
  set(target, key, value) {
    target.set(key, value);
    return value;
  },
});

export function defineModuleGettersWithFallback(target, description) {
  for (let [name, value] of Object.entries(description)) {
    const { url, fallback } = value;
    Object.defineProperty(target, name, {
      get: () => {
        let module;
        try {
          module = ChromeUtils.importESModule(url);
        } catch (e) {
          console.warn(e);
          module = ChromeUtils.importESModule(fallback);
        }
        Object.defineProperty(target, name, {
          value: module[name],
          configurable: false,
        });
        return module[name];
      },
      configurable: true,
    });
  }
}

const lazy = {
  startupPromises: new Set(),
};
defineModuleGettersWithFallback(lazy, {
  CustomizableUI: {
    url: "moz-src:///browser/components/customizableui/CustomizableUI.sys.mjs",
    fallback: "resource:///modules/CustomizableUI.sys.mjs",
  },
});

export class Hotkey {
  #matchingSelector;
  constructor(hotkeyDetails, commandDetails) {
    this.command = commandDetails;
    this.trigger = hotkeyDetails;
    this.#matchingSelector = null;
  }
  get matchingSelector() {
    if (!this.#matchingSelector) {
      let trigger = this.trigger;
      this.#matchingSelector = `key[modifiers="${trigger.modifiers}"][${trigger.key ? 'key="' + trigger.key : 'keycode="' + trigger.keycode}"]`;
    }
    return this.#matchingSelector;
  }
  async autoAttach(opt) {
    const suppress = opt?.suppressOriginal || false;
    await startupFinished();
    for (let window of windowUtils.getAll()) {
      if (window.document.getElementById(this.trigger.id)) {
        continue;
      }
      this.attachToWindow(window, { suppressOriginal: suppress });
    }
    windowUtils.onCreated((win) => {
      windowUtils.isBrowserWindow(win) &&
        this.attachToWindow(win, { suppressOriginal: suppress });
    });
  }
  async attachToWindow(window, opt = {}) {
    await windowUtils.waitWindowLoading(window);
    if (opt.suppressOriginal) {
      this.suppressOriginalKey(window);
    }
    Hotkey.#createKey(window.document, this.trigger);
    if (this.command) {
      Hotkey.#createCommand(window.document, this.command);
    }
  }
  suppressOriginalKey(window) {
    let oldKey = window.document.querySelector(this.matchingSelector);
    if (oldKey) {
      oldKey.setAttribute("disabled", "true");
    }
  }
  restoreOriginalKey(window) {
    let oldKey = window.document.querySelector(this.matchingSelector);
    oldKey.removeAttribute("disabled");
  }
  static #createKey(doc, details) {
    let keySet = doc.getElementById("ucKeySet");
    if (!keySet) {
      keySet = createElement(doc, "keyset", { id: "ucKeySet" });
      doc.body.appendChild(keySet);
    }

    let key = createElement(doc, "key", details);
    keySet.appendChild(key);
    return;
  }
  static #createCommand(doc, details) {
    let commandSet = doc.getElementById("ucCommandSet");
    if (!commandSet) {
      commandSet = createElement(doc, "commandset", { id: "ucCommandSet" });
      doc.body.insertBefore(commandSet, doc.body.firstChild);
    }
    if (doc.getElementById(details.id)) {
      console.warn(
        "Fx-autoconfig: command with id '" + details.id + "' already exists",
      );
      return;
    }
    let command = createElement(doc, "command", { id: details.id });
    commandSet.insertBefore(command, commandSet.firstChild || null);
    const fun = details.command;
    command.addEventListener("command", (ev) => fun(ev.view, ev));
    return;
  }
  static ERR_KEY = 0;
  static NORMAL_KEY = 1;
  static FUN_KEY = 2;
  static VK_KEY = 4;

  static #getKeyCategory(key) {
    return /^[\w-]$/.test(key)
      ? Hotkey.NORMAL_KEY
      : /^VK_[A-Z]+/.test(key)
        ? Hotkey.VK_KEY
        : /^F(?:1[0,1,2]|[1-9])$/.test(key)
          ? Hotkey.FUN_KEY
          : Hotkey.ERR_KEY;
  }

  static define(desc) {
    let keyCategory = Hotkey.#getKeyCategory(desc.key);
    if (keyCategory === Hotkey.ERR_KEY) {
      throw new Error("Provided key '" + desc.key + "' is invalid");
    }
    let commandType = typeof desc.command;
    if (!(commandType === "string" || commandType === "function")) {
      throw new Error("command must be either a string or function");
    }
    if (commandType === "function" && !desc.id) {
      throw new Error(
        "command id must be specified when callback is a function",
      );
    }
    const validMods = ["accel", "alt", "ctrl", "meta", "shift"];
    const mods = desc.modifiers
      ?.toLowerCase()
      .split(" ")
      .filter((a) => validMods.includes(a));
    if (keyCategory === Hotkey.NORMAL_KEY && !(mods && mods.length > 0)) {
      throw new Error(
        "Registering a hotkey with no modifiers is not supported, except for function keys F1-F12",
      );
    }
    let keyDetails = {
      id: desc.id,
      modifiers: mods?.join(",").replace("ctrl", "accel") ?? "",
      command: commandType === "string" ? desc.command : `cmd_${desc.id}`,
    };
    if (desc.reserved) {
      keyDetails.reserved = "true";
    }
    if (keyCategory === Hotkey.NORMAL_KEY) {
      keyDetails.key = desc.key.toUpperCase();
    } else {
      keyDetails.keycode =
        keyCategory === Hotkey.FUN_KEY ? `VK_${desc.key}` : desc.key;
    }
    return new Hotkey(
      keyDetails,
      commandType === "function"
        ? { id: keyDetails.command, command: desc.command }
        : null,
    );
  }
}

export class Pref {
  #type;
  #name;
  #observerCallbacks;
  constructor(pref, type, value) {
    if (!(this instanceof Pref)) {
      return Pref.fromName(pref);
    }
    this.#name = pref;
    this.#type = type;
  }
  exists() {
    return this.#type > 0;
  }
  get name() {
    return this.#name;
  }
  get value() {
    try {
      return Pref.getPrefOfType(this.#name, this.#type);
    } catch (ex) {
      this.#type = 0;
    }
    return null;
  }
  set value(some) {
    this.setTo(some);
  }
  defaultTo(value) {
    if (this.#type > 0) {
      return false;
    }
    this.setTo(value);
    return true;
  }
  hasUserValue() {
    return this.#type > 0 && Services.prefs.prefHasUserValue(this.#name);
  }
  get type() {
    if (this.#type === 32) return "string";
    if (this.#type === 64) return "number";
    if (this.#type === 128) return "boolean";
    return "invalid";
  }
  setTo(some) {
    const someType = Pref.getTypeof(some);
    if ((someType > 0 && someType === this.#type) || this.#type === 0) {
      return Pref.setPrefOfType(this.#name, someType, some);
    }
    throw new Error("Can't set pref to a different type");
  }
  reset() {
    if (this.#type !== 0) {
      Services.prefs.clearUserPref(this.#name);
    }
    this.#type = Services.prefs.getPrefType(this.#name);
  }
  orFallback(some) {
    return this.#type > 0 ? this.value : some;
  }
  observe(_, topic, data) {
    if (topic !== "nsPref:changed") {
      console.warn("Somehow pref observer got topic:", topic);
      return;
    }
    const newType = Services.prefs.getPrefType(this.#name);
    const needsTypeRefresh = this.#type > 0 && this.#type != newType;
    if (needsTypeRefresh) {
      Services.prefs.removeObserver(this.#name, this);
    }
    this.#type = newType;
    for (let cb of this.#getObserverCallbacks()) {
      try {
        cb(this);
      } catch (ex) {
        console.error(ex);
      }
    }
    if (needsTypeRefresh) {
      this.#observerCallbacks?.clear();
    }
  }
  forget() {
    Services.prefs.removeObserver(this.#name, this);
    this.#observerCallbacks?.clear();
  }
  #getObserverCallbacks() {
    if (!this.#observerCallbacks) {
      this.#observerCallbacks = new Set();
    }
    return this.#observerCallbacks;
  }
  addListener(callback) {
    let callbacks = this.#getObserverCallbacks();
    if (callbacks.size === 0) {
      Services.prefs.addObserver(this.#name, this);
    }
    callbacks.add(callback);
    return this;
  }
  removeListener(callback) {
    let callbacks = this.#getObserverCallbacks();
    callbacks.delete(callback);
    if (callbacks.size === 0) {
      Services.prefs.removeObserver(this.#name, this);
    }
  }
  static fromName(some) {
    return new Pref(some, Services.prefs.getPrefType(some));
  }
  static getPrefOfType(pref, type) {
    if (type === 32) return Services.prefs.getStringPref(pref);
    if (type === 64) return Services.prefs.getIntPref(pref);
    if (type === 128) return Services.prefs.getBoolPref(pref);
    return null;
  }
  static getTypeof(some) {
    const someType = typeof some;
    if (someType === "string") return 32;
    if (someType === "number") return 64;
    if (someType === "boolean") return 128;
    return 0;
  }
  static setPrefOfType(pref, type, value) {
    if (type === 32) return Services.prefs.setCharPref(pref, value);
    if (type === 64) return Services.prefs.setIntPref(pref, value);
    if (type === 128) return Services.prefs.setBoolPref(pref, value);
    throw new Error(`Unknown pref type: {type}`);
  }
  static setIfUnset(pref, value) {
    if (Services.prefs.getPrefType(pref) === 0) {
      Pref.setPrefOfType(pref, Pref.getTypeof(value), value);
      return true;
    }
    return false;
  }
  static get(prefPath) {
    return Pref.fromName(prefPath);
  }
  static set(prefName, value) {
    Pref.fromName(prefName).setTo(value);
  }
  static addListener(a, b) {
    let o = (q, w, e) => b(Pref.fromName(e), e);
    Services.prefs.addObserver(a, o);
    return { pref: a, observer: o };
  }
  static removeListener(a) {
    Services.prefs.removeObserver(a.pref, a.observer);
  }
}

function reRegisterStyleWithQualifiedURI(aURI, aType) {
  let sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(
    Ci.nsIStyleSheetService,
  );
  try {
    switch (aType) {
      case "agent":
        sss.unregisterSheet(aURI, sss.AGENT_SHEET);
        sss.loadAndRegisterSheet(aURI, sss.AGENT_SHEET);
        return true;
      case "author":
        sss.unregisterSheet(aURI, sss.AUTHOR_SHEET);
        sss.loadAndRegisterSheet(aURI, sss.AUTHOR_SHEET);
        return true;
      default:
        return false;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
}

function reloadRegisteredStyleSheet(name) {
  let registeredStyles = loaderModuleLink.styles;
  if (!registeredStyles) {
    throw new Error(
      "updateStyleSheet was called in a context without loader module access",
    );
  }
  let matchingStyle = registeredStyles.find((s) => s.filename === name);
  if (!matchingStyle) {
    console.warn(`No registered style exists with name: ${name}`);
    return false;
  }
  if (matchingStyle.styleSheetMode === "agent") {
    return reRegisterStyleWithQualifiedURI(matchingStyle.referenceURI, "agent");
  } else {
    let success =
      loaderModuleLink.scriptDataConstructor.preLoadAuthorStyle(matchingStyle);
    if (success) {
      const styleSheetType = 2; // styleSheetService.AUTHOR_SHEET
      let windows = Services.wm.getEnumerator(null);
      while (windows.hasMoreElements()) {
        let win = windows.getNext();
        if (matchingStyle.regex.test(win.location.href)) {
          win.windowUtils.removeSheet(
            matchingStyle.referenceURI,
            styleSheetType,
          );
          win.windowUtils.addSheet(
            matchingStyle.preLoadedStyle,
            styleSheetType,
          );
        }
      }
    }
    return success;
  }
}
function reloadStyleSheet(name, type) {
  if (type) {
    let sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(
      Ci.nsIStyleSheetService,
    );
    try {
      let uri = Services.io.newURI(`chrome://userchrome/content/${name}`);
      switch (type) {
        case "agent":
          sss.unregisterSheet(uri, sss.AGENT_SHEET);
          sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);
          return true;
        case "author":
          sss.unregisterSheet(uri, sss.AUTHOR_SHEET);
          sss.loadAndRegisterSheet(uri, sss.AUTHOR_SHEET);
          return true;
        default:
          return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  }
  let fsResult = FileSystem.getEntry(name);
  if (!fsResult.isFile()) {
    return false;
  }
  let recentWindow = Services.wm.getMostRecentBrowserWindow();
  if (!recentWindow) {
    return false;
  }
  function recurseImports(sheet, all) {
    let z = 0;
    let rule = sheet.cssRules[0];
    // loop through import rules and check that the "all"
    // doesn't already contain the same object
    while (rule instanceof CSSImportRule && !all.includes(rule.styleSheet)) {
      all.push(rule.styleSheet);
      recurseImports(rule.styleSheet, all);
      rule = sheet.cssRules[++z];
    }
    return all;
  }

  let sheets = recentWindow.InspectorUtils.getAllStyleSheets(
    recentWindow.document,
    false,
  ).flatMap((x) => recurseImports(x, [x]));

  // If a sheet is imported multiple times, then there will be
  // duplicates, because style system does create an object for
  // each instace but that's OK since sheets.find below will
  // only find the first instance and reload that which is
  // "probably" fine.

  let target = sheets.find((sheet) => sheet.href === fsResult.fileURI);
  if (target) {
    recentWindow.InspectorUtils.parseStyleSheet(target, fsResult.readSync());
    return true;
  }
  return false;
}

// This stores data we need to link from the loader module
export const loaderModuleLink = new (function () {
  let sessionRestored = false;
  let variant = null;
  let brandName = null;
  // .setup() is called once by boot.sys.mjs on startup
  this.setup = (ref, aVersion, aBrandName, aVariant, aScriptData) => {
    this.scripts = ref.scripts;
    this.styles = ref.styles;
    this.version = aVersion;
    this.getScriptMenu = (aDoc) => {
      return ref.generateScriptMenuItemsIfNeeded(aDoc);
    };
    brandName = aBrandName;
    variant = aVariant;
    this.scriptDataConstructor = aScriptData;
    delete this.setup;
    Object.freeze(this);
    return;
  };
  Object.defineProperty(this, "variant", {
    get: () => {
      if (variant === null) {
        let is_tb = ChromeUtils.importESModule(
          "resource://gre/modules/AppConstants.sys.mjs",
        ).AppConstants.BROWSER_CHROME_URL.startsWith("chrome://messenger");
        variant = {
          THUNDERBIRD: is_tb,
          FIREFOX: !is_tb,
        };
      }
      return variant;
    },
  });
  Object.defineProperty(this, "brandName", {
    get: () => {
      if (brandName === null) {
        brandName = ChromeUtils.importESModule(
          "resource://gre/modules/AppConstants.sys.mjs",
        ).AppConstants.MOZ_APP_DISPLAYNAME_DO_NOT_USE;
      }
      return brandName;
    },
  });
  this.setSessionRestored = () => {
    sessionRestored = true;
  };
  this.sessionRestored = () => sessionRestored;
  return this;
})();

// getScriptData() returns these types of objects
export class ScriptInfo {
  constructor(enabled) {
    this.isEnabled = enabled;
  }
  asFile() {
    return FileSystem.getEntry(
      FileSystem.convertChromeURIToFileURI(this.chromeURI),
    ).entry();
  }
  static fromScript(aScript, isEnabled) {
    let info = new ScriptInfo(isEnabled);
    Object.assign(info, aScript);
    info.regex = aScript.regex
      ? new RegExp(aScript.regex.source, aScript.regex.flags)
      : null;
    info.chromeURI = aScript.chromeURI.spec;
    info.referenceURI = aScript.referenceURI.spec;
    info.isRunning = aScript.isRunning;
    info.injectionFailed = aScript.injectionFailed;
    return info;
  }
  static fromString(aName, aStringAsFSResult, isStyle) {
    const ScriptData = loaderModuleLink.scriptDataConstructor;
    const headerText = ScriptData.extractScriptHeader(aStringAsFSResult);
    const scriptData = new ScriptData(
      aName,
      headerText,
      headerText.length > aStringAsFSResult.size - 2,
      isStyle,
    );
    return ScriptInfo.fromScript(scriptData, false);
  }
}

export class windowUtils {
  constructor() {
    if (new.target) {
      throw new TypeError("windowUtils is not a constructor");
    }
  }
  static onCreated(fun) {
    if (!lazy.windowOpenedCallbacks) {
      Services.obs.addObserver(windowUtils.#observe, "domwindowopened", false);
      lazy.windowOpenedCallbacks = new Set();
    }
    lazy.windowOpenedCallbacks.add(fun);
  }
  static #observe(aSubject) {
    aSubject.addEventListener("DOMContentLoaded", windowUtils.#onDOMContent, {
      once: true,
    });
  }
  static getCreatedCallbacks() {
    return lazy.windowOpenedCallbacks;
  }
  static #onDOMContent(ev) {
    const window = ev.originalTarget.defaultView;
    for (let f of lazy.windowOpenedCallbacks) {
      try {
        f(window);
      } catch (e) {
        console.error(e);
      }
    }
  }
  static getLastFocused(windowType) {
    return Services.wm.getMostRecentWindow(
      windowType === undefined ? windowUtils.mainWindowType : windowType,
    );
  }
  static getAll(onlyBrowsers = true) {
    let windows = Services.wm.getEnumerator(
      onlyBrowsers ? windowUtils.mainWindowType : null,
    );
    let wins = [];
    while (windows.hasMoreElements()) {
      wins.push(windows.getNext());
    }
    return wins;
  }
  static forEach(fun, onlyBrowsers = true) {
    let wins = windowUtils.getAll(onlyBrowsers);
    wins.forEach((w) => fun(w.document, w));
  }
  static isBrowserWindow(window) {
    return (
      window.document.documentElement.getAttribute("windowtype") ===
      windowUtils.mainWindowType
    );
  }
  static mainWindowType = loaderModuleLink.variant.FIREFOX
    ? "navigator:browser"
    : "mail:3pane";

  static waitWindowLoading(win) {
    if (win && win.isChromeWindow) {
      if (loaderModuleLink.variant.FIREFOX) {
        if (win.gBrowserInit.delayedStartupFinished) {
          return Promise.resolve(win);
        }
      } else {
        // APP_VARIANT = THUNDERBIRD
        if (win.gMailInit.delayedStartupFinished) {
          return Promise.resolve(win);
        }
      }
      return new Promise((resolve) => {
        let observer = (subject) => {
          if (subject === win) {
            Services.obs.removeObserver(
              observer,
              "browser-delayed-startup-finished",
            );
            resolve(win);
          }
        };
        Services.obs.addObserver(observer, "browser-delayed-startup-finished");
      });
    }
    return Promise.reject(new Error("reference is not a window"));
  }
}

export function createElement(doc, tag, props, isHTML = false) {
  let el = isHTML ? doc.createElement(tag) : doc.createXULElement(tag);
  for (let prop in props) {
    el.setAttribute(prop, props[prop]);
  }
  return el;
}

export function createWidget(desc) {
  if (!desc || !desc.id) {
    throw new Error("custom widget description is missing 'id' property");
  }
  if (!(desc.type === "toolbarbutton" || desc.type === "toolbaritem")) {
    throw new Error(`custom widget has unsupported type: '${desc.type}'`);
  }
  const CUI = lazy.CustomizableUI;

  if (CUI.getWidget(desc.id)?.hasOwnProperty("source")) {
    // very likely means that the widget with this id already exists
    // There isn't a very reliable way to 'really' check if it exists or not
    throw new Error(`Widget with ID: '${desc.id}' already exists`);
  }
  // This is pretty ugly but makes onBuild much cleaner.
  let itemStyle = "";
  if (desc.image) {
    if (desc.type === "toolbarbutton") {
      itemStyle += "list-style-image:";
    } else {
      itemStyle += "background: transparent center no-repeat ";
    }
    itemStyle += /^chrome:\/\/|resource:\/\//.test(desc.image)
      ? `url(${desc.image});`
      : `url(chrome://userChrome/content/${desc.image});`;
    itemStyle += desc.style || "";
  }
  const callback = desc.callback;
  if (typeof callback === "function") {
    WidgetCallbacks.set(desc.id, callback);
  }
  return CUI.createWidget({
    id: desc.id,
    type: "custom",
    defaultArea: desc.area || CUI.AREA_NAVBAR,
    onBuild: function (aDocument) {
      let toolbaritem = aDocument.createXULElement(desc.type);
      let props = {
        id: desc.id,
        class: `toolbarbutton-1 chromeclass-toolbar-additional ${desc.class ? desc.class : ""}`,
        overflows: !!desc.overflows,
        label: desc.label || desc.id,
        tooltiptext: desc.tooltip || desc.id,
        style: itemStyle,
      };
      for (let p in props) {
        toolbaritem.setAttribute(p, props[p]);
      }

      if (typeof callback === "function") {
        if (desc.allEvents) {
          toolbaritem.addEventListener("click", (ev) =>
            WidgetCallbacks.get(ev.target.id)(ev, ev.target.ownerGlobal),
          );
        } else {
          toolbaritem.addEventListener(
            "click",
            (ev) =>
              ev.button === 0 &&
              WidgetCallbacks.get(ev.target.id)(ev, ev.target.ownerGlobal),
          );
        }
      }
      for (let attr in desc) {
        if (attr != "callback" && !(attr in props)) {
          toolbaritem.setAttribute(attr, desc[attr]);
        }
      }
      return toolbaritem;
    },
  });
}

export function escapeXUL(markup) {
  return markup.replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case `<`:
        return "&lt;";
      case `>`:
        return "&gt;";
      case `&`:
        return "&amp;";
      case `'`:
        return "&apos;";
      case '"':
        return "&quot;";
    }
  });
}

function getScriptInfoForType(aFilter, aScriptList) {
  const filterType = typeof aFilter;
  if (aFilter && !(filterType === "string" || filterType === "function")) {
    throw "getScriptData() called with invalid filter type: " + filterType;
  }
  if (filterType === "string") {
    let script = aScriptList.find((s) => s.filename === aFilter);
    return script ? ScriptInfo.fromScript(script, script.isEnabled) : null;
  }
  const disabledScripts = Services.prefs
    .getStringPref("userChromeJS.scriptsDisabled", "")
    .split(",");
  if (filterType === "function") {
    return aScriptList
      .filter(aFilter)
      .map((script) =>
        ScriptInfo.fromScript(
          script,
          !disabledScripts.includes(script.filename),
        ),
      );
  }
  return aScriptList.map((script) =>
    ScriptInfo.fromScript(script, !disabledScripts.includes(script.filename)),
  );
}

export function getScriptData(aFilter) {
  return getScriptInfoForType(aFilter, loaderModuleLink.scripts);
}
export function getStyleData(aFilter) {
  return getScriptInfoForType(aFilter, loaderModuleLink.styles);
}

export function loadURI(win, desc) {
  if (loaderModuleLink.variant.THUNDERBIRD) {
    console.warn("loadURI() is not supported on Thunderbird");
    return false;
  }
  if (
    !win ||
    !desc ||
    !desc.url ||
    typeof desc.url !== "string" ||
    !["tab", "tabshifted", "window", "current"].includes(desc.where)
  ) {
    return false;
  }
  const isJsURI = desc.url.slice(0, 11) === "javascript:";
  try {
    win.openTrustedLinkIn(desc.url, desc.where, {
      allowPopups: isJsURI,
      inBackground: false,
      allowInheritPrincipal: false,
      private: !!desc.private,
      userContextId: desc.url.startsWith("http") ? desc.userContextId : null,
    });
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
}

export function parseStringAsScriptInfo(aName, aString, isStyle = false) {
  return ScriptInfo.fromString(
    aName,
    FileSystem.StringContent({ content: aString }),
    isStyle,
  );
}

export function restartApplication(clearCache) {
  clearCache && Services.appinfo.invalidateCachesOnRestart();
  let cancelQuit = Cc["@mozilla.org/supports-PRBool;1"].createInstance(
    Ci.nsISupportsPRBool,
  );
  Services.obs.notifyObservers(
    cancelQuit,
    "quit-application-requested",
    "restart",
  );
  if (!cancelQuit.data) {
    Services.startup.quit(
      Services.startup.eAttemptQuit | Services.startup.eRestart,
    );
    return true;
  }
  return false;
}

export async function showNotification(description) {
  if (loaderModuleLink.variant.THUNDERBIRD) {
    console.warn(
      'showNotification() is not supported on Thunderbird\nNotification label was: "' +
        description.label +
        '"',
    );
    return;
  }
  await startupFinished();
  let window = description.window;
  if (!(window && window.isChromeWindow)) {
    window = Services.wm.getMostRecentBrowserWindow();
  }
  let aNotificationBox = window.gNotificationBox;
  if (description.tab) {
    let aBrowser = description.tab.linkedBrowser;
    if (!aBrowser) {
      return;
    }
    aNotificationBox = window.gBrowser.getNotificationBox(aBrowser);
  }
  if (!aNotificationBox) {
    return;
  }
  let type = description.type || "default";
  let priority = aNotificationBox.PRIORITY_INFO_HIGH;
  switch (description.priority) {
    case "system":
      priority = aNotificationBox.PRIORITY_SYSTEM;
      break;
    case "critical":
      priority = aNotificationBox.PRIORITY_CRITICAL_HIGH;
      break;
    case "warning":
      priority = aNotificationBox.PRIORITY_WARNING_HIGH;
      break;
  }
  aNotificationBox.appendNotification(
    type,
    {
      label: description.label || "fx-autoconfig message",
      image: "chrome://browser/skin/notification-icons/popup.svg",
      priority: priority,
      eventCallback:
        typeof description.callback === "function"
          ? description.callback
          : null,
    },
    description.buttons,
    description.disableClickJackingProtection,
  );
}

export function startupFinished() {
  if (loaderModuleLink.sessionRestored() || lazy.startupPromises === null) {
    return Promise.resolve();
  }
  if (lazy.startupPromises.size === 0) {
    const obs_topic = loaderModuleLink.variant.FIREFOX
      ? "sessionstore-windows-restored"
      : "browser-delayed-startup-finished";
    const startupObserver = () => {
      Services.obs.removeObserver(startupObserver, obs_topic);
      loaderModuleLink.setSessionRestored();
      for (let f of lazy.startupPromises) {
        f();
      }
      lazy.startupPromises.clear();
      lazy.startupPromises = null;
    };
    Services.obs.addObserver(startupObserver, obs_topic);
  }
  return new Promise((resolve) => lazy.startupPromises.add(resolve));
}

export function toggleScript(aFilename) {
  if (typeof aFilename != "string") {
    throw new Error("expected name of the script as string");
  }
  let script = aFilename.endsWith("js")
    ? getScriptData(aFilename)
    : getStyleData(aFilename);
  if (!script) {
    return null;
  }
  const PREF_SCRIPTSDISABLED = "userChromeJS.scriptsDisabled";
  const prefValue = Services.prefs.getStringPref(PREF_SCRIPTSDISABLED, "");
  const isEnabled = prefValue.indexOf(script.filename) === -1;
  if (isEnabled) {
    Services.prefs.setCharPref(
      PREF_SCRIPTSDISABLED,
      `${script.filename},${prefValue}`,
    );
  } else {
    Services.prefs.setCharPref(
      PREF_SCRIPTSDISABLED,
      prefValue.replace(
        new RegExp(`^${script.filename},?|,${script.filename}`),
        "",
      ),
    );
  }
  Services.appinfo.invalidateCachesOnRestart();
  script.isEnabled = !isEnabled;
  return script;
}

export function updateStyleSheet(name = "../userChrome.css", type) {
  if (name.endsWith(".uc.css")) {
    return reloadRegisteredStyleSheet(name);
  }
  return reloadStyleSheet(name, type);
}

```

## File: `.gitignore`

```gitignore
# File created using '.gitignore Generator' for Visual Studio Code: https://bit.ly/vscode-gig
# Created by https://www.toptal.com/developers/gitignore/api/visualstudiocode,linux,webstorm
# Edit at https://www.toptal.com/developers/gitignore?templates=visualstudiocode,linux,webstorm

### Linux ###
*~

# temporary files which can be created if a process still has a handle open of a deleted file
.fuse_hidden*

# KDE directory preferences
.directory

# Linux trash folder which might appear on any partition or disk
.Trash-*

# .nfs files are created when an open file is removed but is still being accessed
.nfs*

### VisualStudioCode ###
.vscode/*
.vscode/settings.json
.vscode/tasks.json
.vscode/launch.json
.vscode/extensions.json
.vscode/*.code-snippets

# Local History for Visual Studio Code
.history/

# Built Visual Studio Code Extensions
*.vsix

### VisualStudioCode Patch ###
# Ignore all local history of files
.history
.ionide

### WebStorm ###
# Covers JetBrains IDEs: IntelliJ, RubyMine, PhpStorm, AppCode, PyCharm, CLion, Android Studio, WebStorm and Rider
# Reference: https://intellij-support.jetbrains.com/hc/en-us/articles/206544839

# User-specific stuff
.idea/**/workspace.xml
.idea/**/tasks.xml
.idea/**/usage.statistics.xml
.idea/**/dictionaries
.idea/**/shelf

# AWS User-specific
.idea/**/aws.xml

# Generated files
.idea/**/contentModel.xml

# Sensitive or high-churn files
.idea/**/dataSources/
.idea/**/dataSources.ids
.idea/**/dataSources.local.xml
.idea/**/sqlDataSources.xml
.idea/**/dynamic.xml
.idea/**/uiDesigner.xml
.idea/**/dbnavigator.xml

# Gradle
.idea/**/gradle.xml
.idea/**/libraries

# Gradle and Maven with auto-import
# When using Gradle or Maven with auto-import, you should exclude module files,
# since they will be recreated, and may cause churn.  Uncomment if using
# auto-import.
# .idea/artifacts
# .idea/compiler.xml
# .idea/jarRepositories.xml
# .idea/modules.xml
# .idea/*.iml
# .idea/modules
# *.iml
# *.ipr

# CMake
cmake-build-*/

# Mongo Explorer plugin
.idea/**/mongoSettings.xml

# File-based project format
*.iws

# IntelliJ
out/

# mpeltonen/sbt-idea plugin
.idea_modules/

# JIRA plugin
atlassian-ide-plugin.xml

# Cursive Clojure plugin
.idea/replstate.xml

# SonarLint plugin
.idea/sonarlint/

# Crashlytics plugin (for Android Studio and IntelliJ)
com_crashlytics_export_strings.xml
crashlytics.properties
crashlytics-build.properties
fabric.properties

# Editor-based Rest Client
.idea/httpRequests

# Android studio 3.1+ serialized cache file
.idea/caches/build_file_checksums.ser

### WebStorm Patch ###
# Comment Reason: https://github.com/joeblau/gitignore.io/issues/186#issuecomment-215987721

# *.iml
# modules.xml
# .idea/misc.xml
# *.ipr

# Sonarlint plugin
# https://plugins.jetbrains.com/plugin/7973-sonarlint
.idea/**/sonarlint/

# SonarQube Plugin
# https://plugins.jetbrains.com/plugin/7238-sonarqube-community-plugin
.idea/**/sonarIssues.xml

# Markdown Navigator plugin
# https://plugins.jetbrains.com/plugin/7896-markdown-navigator-enhanced
.idea/**/markdown-navigator.xml
.idea/**/markdown-navigator-enh.xml
.idea/**/markdown-navigator/

# Cache file creation bug
# See https://youtrack.jetbrains.com/issue/JBR-2257
.idea/$CACHE_FILE$

# CodeStream plugin
# https://plugins.jetbrains.com/plugin/12206-codestream
.idea/codestream.xml

# Azure Toolkit for IntelliJ plugin
# https://plugins.jetbrains.com/plugin/8053-azure-toolkit-for-intellij
.idea/**/azureSettings.xml

# End of https://www.toptal.com/developers/gitignore/api/visualstudiocode,linux,webstorm

# Custom rules (everything added below won't be overriden by 'Generate .gitignore File' if you use 'Update' option)


```

## File: `AGENTS.md`

```markdown
# AGENTS.md - Firefox Customization Codebase

## Build/Test/Lint Commands
No formal build system. Firefox loads files directly from the profile directory.
No automated testing framework configured.
No linting configuration found (ESLint disabled via `/* eslint-disable */` comments).
Testing: Manually restart Firefox to test changes.

## Project Structure
- `userChrome.css` / `userContent.css` - Main entry points for Firefox customization
- `JS/` - JavaScript modules (.mjs, .uc.js) for browser behavior modification
- `css/` - CSS files organized by component type (userChrome-files/, userContent-files/, common-files/)
- `resources/` - Static assets and configurations

## Code Style Guidelines

### JavaScript/Module Files (.mjs)
- Use ES6 modules with `.mjs` extension
- Import statements: relative paths with `.mjs` extension
- Class-based architecture with PascalCase class names
- Private methods prefixed with `#`
- Console.log for debugging (no formal logging framework)
- JSDoc comments for public methods
- Static methods for utilities and entry points
- UserScript headers for main entry points (`.uc.mjs` files)
- Namespace declarations: `@namespace` for XUL, HTML, XHTML

### CSS Files
- Use CSS custom properties for theming (`var(--property-name)`)
- `@-moz-document url-prefix(chrome://)` wrapper for userChrome styles
- `!important` declarations common due to Firefox's cascade
- Organize imports: common-files → userChrome-files → userContent-files
- Use descriptive file names matching component functionality
- CSS selectors often target Firefox's internal XUL elements
- Namespace declarations at top of main files
```

## File: `Mozilla Public License`

```text
# Mozilla Public License

  Version 2.0

    1. Definitions

1.1. “Contributor”

    means each individual or legal entity that creates, contributes to
    the creation of, or owns Covered Software.

1.2. “Contributor Version”

    means the combination of the Contributions of others (if any) used
    by a Contributor and that particular Contributor’s Contribution.

1.3. “Contribution”

    means Covered Software of a particular Contributor.

1.4. “Covered Software”

    means Source Code Form to which the initial Contributor has attached
    the notice in Exhibit A, the Executable Form of such Source Code
    Form, and Modifications of such Source Code Form, in each case
    including portions thereof.

1.5. “Incompatible With Secondary Licenses”

    means

     1.

        that the initial Contributor has attached the notice described
        in Exhibit B to the Covered Software; or

     2.

        that the Covered Software was made available under the terms of
        version 1.1 or earlier of the License, but not also under the
        terms of a Secondary License.

1.6. “Executable Form”

    means any form of the work other than Source Code Form.

1.7. “Larger Work”

    means a work that combines Covered Software with other material, in
    a separate file or files, that is not Covered Software.

1.8. “License”

    means this document.

1.9. “Licensable”

    means having the right to grant, to the maximum extent possible,
    whether at the time of the initial grant or subsequently, any and
    all of the rights conveyed by this License.

1.10. “Modifications”

    means any of the following:

     1.

        any file in Source Code Form that results from an addition to,
        deletion from, or modification of the contents of Covered
        Software; or

     2.

        any new file in Source Code Form that contains any Covered Software.

1.11. “Patent Claims” of a Contributor

    means any patent claim(s), including without limitation, method,
    process, and apparatus claims, in any patent Licensable by such
    Contributor that would be infringed, but for the grant of the
    License, by the making, using, selling, offering for sale, having
    made, import, or transfer of either its Contributions or its
    Contributor Version.

1.12. “Secondary License”

    means either the GNU General Public License, Version 2.0, the GNU
    Lesser General Public License, Version 2.1, the GNU Affero General
    Public License, Version 3.0, or any later versions of those licenses.

1.13. “Source Code Form”

    means the form of the work preferred for making modifications.

1.14. “You” (or “Your”)

    means an individual or a legal entity exercising rights under this
    License. For legal entities, “You” includes any entity that
    controls, is controlled by, or is under common control with You. For
    purposes of this definition, “control” means (a) the power, direct
    or indirect, to cause the direction or management of such entity,
    whether by contract or otherwise, or (b) ownership of more than
    fifty percent (50%) of the outstanding shares or beneficial
    ownership of such entity.


    2. License Grants and Conditions


      2.1. Grants

Each Contributor hereby grants You a world-wide, royalty-free,
non-exclusive license:

 1.

    under intellectual property rights (other than patent or trademark)
    Licensable by such Contributor to use, reproduce, make available,
    modify, display, perform, distribute, and otherwise exploit its
    Contributions, either on an unmodified basis, with Modifications, or
    as part of a Larger Work; and

 2.

    under Patent Claims of such Contributor to make, use, sell, offer
    for sale, have made, import, and otherwise transfer either its
    Contributions or its Contributor Version.


      2.2. Effective Date

The licenses granted in Section 2.1 with respect to any Contribution
become effective for each Contribution on the date the Contributor first
distributes such Contribution.


      2.3. Limitations on Grant Scope

The licenses granted in this Section 2 are the only rights granted under
this License. No additional rights or licenses will be implied from the
distribution or licensing of Covered Software under this License.
Notwithstanding Section 2.1(b) above, no patent license is granted by a
Contributor:

 1.

    for any code that a Contributor has removed from Covered Software; or

 2.

    for infringements caused by: (i) Your and any other third party’s
    modifications of Covered Software, or (ii) the combination of its
    Contributions with other software (except as part of its Contributor
    Version); or

 3.

    under Patent Claims infringed by Covered Software in the absence of
    its Contributions.

This License does not grant any rights in the trademarks, service marks,
or logos of any Contributor (except as may be necessary to comply with
the notice requirements in Section 3.4).


      2.4. Subsequent Licenses

No Contributor makes additional grants as a result of Your choice to
distribute the Covered Software under a subsequent version of this
License (see Section 10.2) or under the terms of a Secondary License (if
permitted under the terms of Section 3.3).


      2.5. Representation

Each Contributor represents that the Contributor believes its
Contributions are its original creation(s) or it has sufficient rights
to grant the rights to its Contributions conveyed by this License.


      2.6. Fair Use

This License is not intended to limit any rights You have under
applicable copyright doctrines of fair use, fair dealing, or other
equivalents.


      2.7. Conditions

Sections 3.1, 3.2, 3.3, and 3.4 are conditions of the licenses granted
in Section 2.1.


    3. Responsibilities


      3.1. Distribution of Source Form

All distribution of Covered Software in Source Code Form, including any
Modifications that You create or to which You contribute, must be under
the terms of this License. You must inform recipients that the Source
Code Form of the Covered Software is governed by the terms of this
License, and how they can obtain a copy of this License. You may not
attempt to alter or restrict the recipients’ rights in the Source Code Form.


      3.2. Distribution of Executable Form

If You distribute Covered Software in Executable Form then:

 1.

    such Covered Software must also be made available in Source Code
    Form, as described in Section 3.1, and You must inform recipients of
    the Executable Form how they can obtain a copy of such Source Code
    Form by reasonable means in a timely manner, at a charge no more
    than the cost of distribution to the recipient; and

 2.

    You may distribute such Executable Form under the terms of this
    License, or sublicense it under different terms, provided that the
    license for the Executable Form does not attempt to limit or alter
    the recipients’ rights in the Source Code Form under this License.


      3.3. Distribution of a Larger Work

You may create and distribute a Larger Work under terms of Your choice,
provided that You also comply with the requirements of this License for
the Covered Software. If the Larger Work is a combination of Covered
Software with a work governed by one or more Secondary Licenses, and the
Covered Software is not Incompatible With Secondary Licenses, this
License permits You to additionally distribute such Covered Software
under the terms of such Secondary License(s), so that the recipient of
the Larger Work may, at their option, further distribute the Covered
Software under the terms of either this License or such Secondary
License(s).


      3.4. Notices

You may not remove or alter the substance of any license notices
(including copyright notices, patent notices, disclaimers of warranty,
or limitations of liability) contained within the Source Code Form of
the Covered Software, except that You may alter any license notices to
the extent required to remedy known factual inaccuracies.


      3.5. Application of Additional Terms

You may choose to offer, and to charge a fee for, warranty, support,
indemnity or liability obligations to one or more recipients of Covered
Software. However, You may do so only on Your own behalf, and not on
behalf of any Contributor. You must make it absolutely clear that any
such warranty, support, indemnity, or liability obligation is offered by
You alone, and You hereby agree to indemnify every Contributor for any
liability incurred by such Contributor as a result of warranty, support,
indemnity or liability terms You offer. You may include additional
disclaimers of warranty and limitations of liability specific to any
jurisdiction.


    4. Inability to Comply Due to Statute or Regulation

If it is impossible for You to comply with any of the terms of this
License with respect to some or all of the Covered Software due to
statute, judicial order, or regulation then You must: (a) comply with
the terms of this License to the maximum extent possible; and (b)
describe the limitations and the code they affect. Such description must
be placed in a text file included with all distributions of the Covered
Software under this License. Except to the extent prohibited by statute
or regulation, such description must be sufficiently detailed for a
recipient of ordinary skill to be able to understand it.


    5. Termination

5.1. The rights granted under this License will terminate automatically
if You fail to comply with any of its terms. However, if You become
compliant, then the rights granted under this License from a particular
Contributor are reinstated (a) provisionally, unless and until such
Contributor explicitly and finally terminates Your grants, and (b) on an
ongoing basis, if such Contributor fails to notify You of the
non-compliance by some reasonable means prior to 60 days after You have
come back into compliance. Moreover, Your grants from a particular
Contributor are reinstated on an ongoing basis if such Contributor
notifies You of the non-compliance by some reasonable means, this is the
first time You have received notice of non-compliance with this License
from such Contributor, and You become compliant prior to 30 days after
Your receipt of the notice.

5.2. If You initiate litigation against any entity by asserting a patent
infringement claim (excluding declaratory judgment actions,
counter-claims, and cross-claims) alleging that a Contributor Version
directly or indirectly infringes any patent, then the rights granted to
You by any and all Contributors for the Covered Software under
Section 2.1 of this License shall terminate.

5.3. In the event of termination under Sections 5.1 or 5.2 above, all
end user license agreements (excluding distributors and resellers) which
have been validly granted by You or Your distributors under this License
prior to termination shall survive termination.


    6. Disclaimer of Warranty

/Covered Software is provided under this License on an “as is” basis,
without warranty of any kind, either expressed, implied, or statutory,
including, without limitation, warranties that the Covered Software is
free of defects, merchantable, fit for a particular purpose or
non-infringing. The entire risk as to the quality and performance of the
Covered Software is with You. Should any Covered Software prove
defective in any respect, You (not any Contributor) assume the cost of
any necessary servicing, repair, or correction. This disclaimer of
warranty constitutes an essential part of this License. No use of any
Covered Software is authorized under this License except under this
disclaimer.

/


    7. Limitation of Liability

/Under no circumstances and under no legal theory, whether tort
(including negligence), contract, or otherwise, shall any Contributor,
or anyone who distributes Covered Software as permitted above, be liable
to You for any direct, indirect, special, incidental, or consequential
damages of any character including, without limitation, damages for lost
profits, loss of goodwill, work stoppage, computer failure or
malfunction, or any and all other commercial damages or losses, even if
such party shall have been informed of the possibility of such damages.
This limitation of liability shall not apply to liability for death or
personal injury resulting from such party’s negligence to the extent
applicable law prohibits such limitation. Some jurisdictions do not
allow the exclusion or limitation of incidental or consequential
damages, so this exclusion and limitation may not apply to You.

/


    8. Litigation

Any litigation relating to this License may be brought only in the
courts of a jurisdiction where the defendant maintains its principal
place of business and such litigation shall be governed by laws of that
jurisdiction, without reference to its conflict-of-law provisions.
Nothing in this Section shall prevent a party’s ability to bring
cross-claims or counter-claims.


    9. Miscellaneous

This License represents the complete agreement concerning the subject
matter hereof. If any provision of this License is held to be
unenforceable, such provision shall be reformed only to the extent
necessary to make it enforceable. Any law or regulation which provides
that the language of a contract shall be construed against the drafter
shall not be used to construe this License against a Contributor.


    10. Versions of the License


      10.1. New Versions

Mozilla Foundation is the license steward. Except as provided in
Section 10.3, no one other than the license steward has the right to
modify or publish new versions of this License. Each version will be
given a distinguishing version number.


      10.2. Effect of New Versions

You may distribute the Covered Software under the terms of the version
of the License under which You originally received the Covered Software,
or under the terms of any subsequent version published by the license
steward.


      10.3. Modified Versions

If you create software not governed by this License, and you want to
create a new license for such software, you may create and use a
modified version of this License if you rename the license and remove
any references to the name of the license steward (except to note that
such modified license differs from this License).


      10.4. Distributing Source Code Form that is Incompatible With
      Secondary Licenses

If You choose to distribute Source Code Form that is Incompatible With
Secondary Licenses under the terms of this version of the License, the
notice described in Exhibit B of this License must be attached.


    Exhibit A - Source Code Form License Notice

    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at https://mozilla.org/MPL/2.0/.

If it is not possible or desirable to put the notice in a particular
file, then You may include the notice in a location (such as a LICENSE
file in a relevant directory) where a recipient would be likely to look
for such a notice.

You may add additional accurate notices of copyright ownership.


    Exhibit B - “Incompatible With Secondary Licenses” Notice

    This Source Code Form is “Incompatible With Secondary Licenses”, as
    defined by the Mozilla Public License, v. 2.0.


```

## File: `README.md`

```markdown
# Higgs Boson Firefox Theme

> Note:
>
> In its current form, this configuration is intended for use as part of my NixOS configuration, but if you want to install it elsewhere, please see the "imperative" branch, which is an older variant of the configuration (that needs some work) but the install script still works perfectly for those on non-declarative Linux distros. As always, macOS and Windows users are on their own.


## Introduction, or "What is this?"

This is my personal modification and part of my overall Firefox configuration. It uses CSS in the form of UserChrome.css and UserContent.css files as well as relies upon a certain amount of UserChrome.js files.

The former are enabled by setting the option in `about:config` to `true` for `toolkit.legacyUserProfileCustomizations.stylesheets` and providing a file called `userChrome.css` as well as one called `userContent.css` in the chrome directory of the Firefox profile directory you are using presently.

The latter requires a bit more *shifty business* overall, is more fickle due to its dependence of the internal APIs and functions exposed by the Firefox development team and is currently in flux as they transition from using `.jsm` files to using standard ESModules (`.sys.mjs` files that require a different import function) for providing those functions and APIs. My use of them utilizes the `fx-autoconfig` script loader methodology primarily due to the available documentation and responsive developer behind it, as well as the project by `aminomancer` who documents the scripts therein with a comprehensiveness rivaling Tolstoy, which while at first overwhelming, I find invaluable for understanding the project and its inner workings based on such a huge and often esoteric codebase as the one powering Firefox (I can only imagine what Chrome or the old MS browsers codebases are like, but I digress).

## "What does it do?"


Creates a Firefox tailored to my use cases and preferences, which fits into my overall desktop environment and workflow. I have a thing about customizing my computer interface, some may call it an unhealthy obsession, but I find it is more often than not the best way to maximize my use of my system for both productivity and recreational purposes.

Other than the terminal emulator I use, where I access my text editor (neovim, which just works a lot better and is a lot more customizable than a more common, non-modal editor would be for my use cases and specific needs), there is no piece of software I use more than my web browser. That being the case, I customized my browser to fit my needs, then started using NixOS which complicated that process, but thankfully after pouring over the details and GitHub issues and a thousand and one false starts, I finally managed to get the `fx-autoconfig` script loader bolted into my NixOS configuration via a modified version of the method now listed on the `fx-autoconfig` GitHub page for Nix installation (note: Nix installation is not identical to NixOS installation, Nix is useful on all sorts of distros and platforms, it powers NixOS as its primary package manager but like `npm` or `pip` can be installed elsewhere as well.)

### Primary Feature of Interest

While I have come to love, truly love, the new button that keeps most add-ons hidden in a drop down menu akin to Chrome, I have a lot of add-ons I use often enough (or need to adjust  because my add-blocker or some userscript is making something not work) that I like having them close at hand without sorting through a menu. I also like having Firefox's many built in functions close at hand for when they are useful and the result of having a window manager highly customized with hotkeys for accessing most of what I use on my system in a few button presses is I am impatient wading through menus. Like super impatient, I could hardly stand using macOS when recently the fates decided I would finally have the option of trying it and seeing what all the fuss was about (turns out it is just a really specific and polished DE on top of what functions like any of the BSD variants I have used in the past, but I digress again).

So the big feature I bake into my customized Firefox is: Toolbars framing the windows except for the left side which I use for tab management using a home-rolled verticanl tabs solution.

#### "But There are Other Vertical Tab Solutions!"

Yes, there are, and I have tried them all. I have tried them all and I have found them all lacking in some way or another.  I don't want the tabs arranged in trees, especially not trees that are extremely fickle to move around and generally clunky to work with. I organize tabs as bookmarks with `raindrop.io` in nested directories and find relying on tabs to still be there after I ignore my system complaining about low battery to point it dies and I have to restart playing with matches in a room full of dynamite anyway. I also don't want my tabs to be styled with an even more esoteric set of classes all their own, making theming a nightmare. Nor do I need extra plugins for functionality that should be a default option anyway. I just want my tabs on the left side of the window, with the ability to drag one off of the bar to make a new window and for the title to reliably hide when my cursor is not hovering over the bar (when I am using the cursor, since discovering CRTL+TAB and CRTL+w a few years ago, I can go hours without touching the mouse, but I digress again).

### Other Features of Note

- Obviously, having tabs on the side means none necessary on the top bar, so I removed that.
- 

```

## File: `userChrome.css`

```css
/* @namespace html url("http://www.w3.org/1999/html"); */
/* @namespace xhtml url("http://www.w3.org/1999/xhtml"); */
/* @namespace xul url("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"); */

@import "css/common-files/color_variables.css";
@import "css/common-files/trees.css";
@import "css/common-files/radios_checkboxes.css";
@import "css/common-files/library.css";
@import "css/common-files/context_menus.css";

@import "css/userChrome-files/about_addons.css";
@import "css/userChrome-files/about_firefox.css";
@import "css/userChrome-files/address_searchbar.css";
@import "css/userChrome-files/bookmarks_popup.css";
@import "css/userChrome-files/clear_history.css";
@import "css/userChrome-files/common_dialog.css";
@import "css/userChrome-files/customization_page.css";
@import "css/userChrome-files/findbar.css";
@import "css/userChrome-files/navbar.css";
@import "css/userChrome-files/navbar_menus.css";
@import "css/userChrome-files/page_info.css";
@import "css/userChrome-files/remove_bookmarks_bottom_border.css";
@import "css/userChrome-files/remove_white_flash.css";
@import "css/userChrome-files/secure_connection_colors.css";
@import "css/userChrome-files/sidebar.css";
@import "css/userChrome-files/status_panel.css";
@import "css/userChrome-files/tab_line_colors.css";
@import "css/userChrome-files/window-controls.css";
@import "css/userChrome-files/compact.css";
@import "css/userChrome-files/extensions.css";
@import "css/userChrome-files/iconized.css";

```

## File: `userContent.css`

```css
/* @namespace html url("http://www.w3.org/1999/xhtml"); */
/* @namespace xul url("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"); */

/* Required for all users */
@import "css/common-files/color_variables.css";
@import "css/common-files/trees.css";
@import "css/common-files/radios_checkboxes.css";
@import "css/common-files/library.css";
@import "css/common-files/context_menus.css";

@import "css/userContent-files/about_pages.css";
@import "css/userContent-files/amo_store.css";
@import "css/userContent-files/directory_listings.css";
@import "css/userContent-files/manifest.css";
@import "css/userContent-files/pdf.css";
@import "css/userContent-files/raw_githubusercontent.css";
@import "css/userContent-files/view_source.css";
@import "css/userContent-files/rss.css";
@import "css/userContent-files/addonlists.css";
@import "css/userContent-files/downloads.css";
@import "css/userContent-files/private.css";
@import "css/userContent-files/scrollbar.css";
@import "css/userContent-files/about_config.css";
@import "css/userContent-files/websites/reddit.css";
@import "css/userContent-files/websites/bing.css";
@import "css/userContent-files/websites/youtube.css";

/* Import Relevant webextension tweaks here
 * IMPORTANT: If used, change the Internal UUID in the corresponding css file */
@import "css/userContent-files/webextension-tweaks/generic_style.css";
@import "css/userContent-files/webextension-tweaks/multi_account_containers.css";
@import "css/userContent-files/webextension-tweaks/request_control.css";
@import "css/userContent-files/webextension-tweaks/ublock_origin.css";
@import "css/userContent-files/webextension-tweaks/umatrix.css";

```

