/**
 * Static Firefox commands
 * Adapted from Zen Browser command-palette
 */

export const staticCommands = [
  {
    key: "cmd_newNavigatorTab",
    label: "New Tab",
    icon: "chrome://browser/skin/new-tab.svg",
    tags: ["new", "tab", "create"],
    category: "tabs",
  },
  {
    key: "cmd_close",
    label: "Close Tab",
    icon: "chrome://browser/skin/close.svg",
    tags: ["close", "tab", "remove"],
    category: "tabs",
  },
  {
    key: "cmd_undoCloseTab",
    label: "Undo Close Tab",
    icon: "chrome://browser/skin/undo.svg",
    tags: ["undo", "reopen", "tab", "restore"],
    category: "tabs",
  },
  {
    key: "cmd_pinTab",
    label: "Pin Tab",
    tags: ["pin", "tab", "sticky"],
    category: "tabs",
  },
  {
    key: "cmd_unpinTab",
    label: "Unpin Tab",
    tags: ["unpin", "tab"],
    category: "tabs",
  },
  {
    key: "cmd_duplicateTab",
    label: "Duplicate Tab",
    icon: "chrome://browser/skin/tab-duplicate.svg",
    tags: ["duplicate", "copy", "tab", "clone"],
    category: "tabs",
  },
  {
    key: "cmd_moveTabToNewWindow",
    label: "Move Tab to New Window",
    icon: "chrome://browser/skin/window.svg",
    tags: ["move", "tab", "window", "detach"],
    category: "tabs",
  },

  {
    key: "cmd_newNavigator",
    label: "New Window",
    icon: "chrome://browser/skin/window.svg",
    tags: ["new", "window", "create"],
    category: "windows",
  },
  {
    key: "cmd_newPrivateWindow",
    label: "New Private Window",
    icon: "chrome://browser/skin/private-browsing.svg",
    tags: ["private", "incognito", "window", "new"],
    category: "windows",
  },
  {
    key: "cmd_closeWindow",
    label: "Close Window",
    tags: ["close", "window", "quit"],
    category: "windows",
  },

  {
    key: "Browser:Back",
    label: "Go Back",
    icon: "chrome://browser/skin/back.svg",
    tags: ["back", "navigate", "history", "previous"],
    category: "navigation",
  },
  {
    key: "Browser:Forward",
    label: "Go Forward",
    icon: "chrome://browser/skin/forward.svg",
    tags: ["forward", "navigate", "history", "next"],
    category: "navigation",
  },
  {
    key: "Browser:Reload",
    label: "Reload Page",
    icon: "chrome://browser/skin/reload.svg",
    tags: ["reload", "refresh", "page"],
    category: "navigation",
  },
  {
    key: "Browser:ReloadSkipCache",
    label: "Reload Page (Skip Cache)",
    icon: "chrome://browser/skin/reload.svg",
    tags: ["reload", "refresh", "hard", "cache"],
    category: "navigation",
  },
  {
    key: "Browser:Stop",
    label: "Stop Loading",
    icon: "chrome://browser/skin/stop.svg",
    tags: ["stop", "cancel", "loading"],
    category: "navigation",
  },
  {
    key: "Browser:Home",
    label: "Go to Home Page",
    icon: "chrome://browser/skin/home.svg",
    tags: ["home", "navigate"],
  },

  // ----------- Bookmarks -----------
  {
    key: "Browser:AddBookmarkAs",
    label: "Bookmark This Page",
    icon: "chrome://browser/skin/bookmark.svg",
    tags: ["bookmark", "save", "favorite", "add"],
    category: "bookmarks",
  },
  {
    key: "Browser:ShowAllBookmarks",
    label: "Show All Bookmarks",
    icon: "chrome://browser/skin/bookmarks.svg",
    tags: ["bookmarks", "library", "show", "all"],
    category: "bookmarks",
  },

  // ----------- History -----------
  {
    key: "Browser:ShowAllHistory",
    label: "Show History",
    icon: "chrome://browser/skin/history.svg",
    tags: ["history", "show", "browsing"],
    category: "history",
  },
  {
    key: "Tools:PrivateBrowsing",
    label: "Clear Recent History",
    tags: ["clear", "history", "delete", "privacy"],
    category: "history",
  },

  // ----------- Downloads -----------
  {
    key: "Tools:Downloads",
    label: "Show Downloads",
    icon: "chrome://browser/skin/downloads/downloads.svg",
    tags: ["downloads", "show", "files"],
    category: "downloads",
  },

  // ----------- Find -----------
  {
    key: "cmd_find",
    label: "Find in Page",
    icon: "chrome://browser/skin/search.svg",
    tags: ["find", "search", "page", "text"],
    category: "find",
  },
  {
    key: "cmd_findAgain",
    label: "Find Next",
    tags: ["find", "next", "search", "forward"],
    category: "find",
  },
  {
    key: "cmd_findPrevious",
    label: "Find Previous",
    tags: ["find", "previous", "search", "back"],
    category: "find",
  },

  // ----------- Page Actions -----------
  {
    key: "cmd_print",
    label: "Print Page",
    icon: "chrome://browser/skin/print.svg",
    tags: ["print", "page", "output"],
    category: "page",
  },
  {
    key: "cmd_savePage",
    label: "Save Page As",
    icon: "chrome://browser/skin/save.svg",
    tags: ["save", "page", "download", "export"],
    category: "page",
  },
  {
    key: "View:PageSource",
    label: "View Page Source",
    tags: ["source", "html", "code", "view"],
    category: "page",
  },

  // ----------- Zoom -----------
  {
    key: "cmd_fullZoomEnlarge",
    label: "Zoom In",
    icon: "chrome://browser/skin/zoom-in.svg",
    tags: ["zoom", "in", "larger", "magnify"],
    category: "zoom",
  },
  {
    key: "cmd_fullZoomReduce",
    label: "Zoom Out",
    icon: "chrome://browser/skin/zoom-out.svg",
    tags: ["zoom", "out", "smaller", "reduce"],
    category: "zoom",
  },
  {
    key: "cmd_fullZoomReset",
    label: "Reset Zoom",
    icon: "chrome://browser/skin/zoom-reset.svg",
    tags: ["zoom", "reset", "normal", "100%"],
    category: "zoom",
  },

  // ----------- View -----------
  {
    key: "cmd_fullScreen",
    label: "Toggle Full Screen",
    icon: "chrome://browser/skin/fullscreen.svg",
    tags: ["fullscreen", "toggle", "view", "f11"],
    category: "view",
  },
  {
    key: "cmd_CustomizeToolbars",
    label: "Customize Toolbar",
    icon: "chrome://browser/skin/customize.svg",
    tags: ["customize", "toolbar", "layout"],
    category: "view",
  },

  // ----------- Developer Tools -----------
  {
    key: "key_toggleToolbox",
    label: "Toggle Developer Tools",
    icon: "chrome://devtools/skin/images/tool-webconsole.svg",
    tags: ["devtools", "developer", "inspect", "console", "f12"],
    category: "devtools",
  },
  {
    key: "key_webconsole",
    label: "Web Console",
    icon: "chrome://devtools/skin/images/tool-webconsole.svg",
    tags: ["console", "developer", "javascript", "log"],
    category: "devtools",
  },
  {
    key: "key_inspector",
    label: "Inspector",
    icon: "chrome://devtools/skin/images/tool-inspector.svg",
    tags: ["inspector", "dom", "html", "css", "elements"],
    category: "devtools",
  },
  {
    key: "key_debugger",
    label: "Debugger",
    icon: "chrome://devtools/skin/images/tool-debugger.svg",
    tags: ["debugger", "javascript", "breakpoint"],
    category: "devtools",
  },
  {
    key: "key_netmonitor",
    label: "Network Monitor",
    icon: "chrome://devtools/skin/images/tool-network.svg",
    tags: ["network", "http", "requests", "traffic"],
    category: "devtools",
  },
  {
    key: "key_styleeditor",
    label: "Style Editor",
    icon: "chrome://devtools/skin/images/tool-styleeditor.svg",
    tags: ["style", "css", "editor"],
    category: "devtools",
  },

  // ----------- Settings -----------
  {
    key: "open-preferences",
    label: "Open Settings",
    command: () => window.openPreferences(),
    condition: () => !!window.openPreferences,
    icon: "chrome://browser/skin/settings.svg",
    tags: ["settings", "preferences", "options", "config"],
    category: "settings",
  },
  {
    key: "open-addons",
    label: "Open Add-ons Manager",
    command: () => window.BrowserOpenAddonsMgr(),
    condition: () => !!window.BrowserOpenAddonsMgr,
    icon: "chrome://mozapps/skin/extensions/extension.svg",
    tags: ["addons", "extensions", "plugins", "themes"],
    category: "settings",
  },

  // ----------- Misc -----------
  {
    key: "cmd_quit",
    label: "Quit Firefox",
    icon: "chrome://browser/skin/quit.svg",
    tags: ["quit", "exit", "close", "shutdown"],
    category: "misc",
  },
];
