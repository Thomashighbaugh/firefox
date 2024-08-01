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
