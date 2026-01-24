/**
 * Command categories for organization and filtering
 */

export const COMMAND_CATEGORIES = {
  tabs: {
    id: "tabs",
    label: "Tabs",
    icon: "chrome://browser/skin/tab.svg",
  },
  windows: {
    id: "windows",
    label: "Windows",
    icon: "chrome://browser/skin/window.svg",
  },
  navigation: {
    id: "navigation",
    label: "Navigation",
    icon: "chrome://browser/skin/back.svg",
  },
  bookmarks: {
    id: "bookmarks",
    label: "Bookmarks",
    icon: "chrome://browser/skin/bookmark.svg",
  },
  history: {
    id: "history",
    label: "History",
    icon: "chrome://browser/skin/history.svg",
  },
  downloads: {
    id: "downloads",
    label: "Downloads",
    icon: "chrome://browser/skin/downloads/downloads.svg",
  },
  find: {
    id: "find",
    label: "Find",
    icon: "chrome://global/skin/icons/search-glass.svg",
  },
  page: {
    id: "page",
    label: "Page Actions",
    icon: "chrome://browser/skin/page-action.svg",
  },
  zoom: {
    id: "zoom",
    label: "Zoom",
    icon: "chrome://browser/skin/fullscreen.svg",
  },
  view: {
    id: "view",
    label: "View",
    icon: "chrome://browser/skin/customize.svg",
  },
  devtools: {
    id: "devtools",
    label: "Developer Tools",
    icon: "chrome://devtools/skin/images/tool-webconsole.svg",
  },
  settings: {
    id: "settings",
    label: "Settings",
    icon: "chrome://global/skin/icons/settings.svg",
  },
  misc: {
    id: "misc",
    label: "Miscellaneous",
    icon: "chrome://global/skin/icons/more.svg",
  },
  custom: {
    id: "custom",
    label: "Custom Commands",
    icon: "chrome://global/skin/icons/edit.svg",
  },
};

export function getCategoryLabel(categoryId) {
  return COMMAND_CATEGORIES[categoryId]?.label || categoryId;
}

export function getCategoryIcon(categoryId) {
  return COMMAND_CATEGORIES[categoryId]?.icon || "chrome://global/skin/icons/help.svg";
}

export function getAllCategories() {
  return Object.values(COMMAND_CATEGORIES);
}
