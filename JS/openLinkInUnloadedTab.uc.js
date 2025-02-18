// ==UserScript==
// @name           Open Link in Unloaded Tab (context menu item)
// @version        1.5.6
// @author         aminomancer
// @homepageURL    https://github.com/aminomancer
// @long-description
// @description    Open links in unloaded tabs with a context menu item.
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
    XPCOMUtils.defineLazyModuleGetters(this, {
      E10SUtils: `resource://gre/modules/E10SUtils.jsm`,
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
      oncommand: `unloadedTabMenu.openTab(unloadedTabMenu.getActivePlacesView(this.parentElement).selectedNode)`,
    });
    this.placesMenuOpenNewTab.after(this.placesMenuOpenUnloaded);

    this.placesMenuOpenAllUnloaded = this.create(document, "menuitem", {
      id: "placesContext_openContainer:unloaded",
      label: unloadedTabMenuL10n.openAll,
      accesskey: unloadedTabMenuL10n.accessKey,
      disabled: true,
      hidden: true,
      oncommand: `unloadedTabMenu.openSelectedTabs(this.parentElement)`,
    });
    this.placesMenuOpenContainer?.after(this.placesMenuOpenAllUnloaded);

    this.placesMenuOpenAllLinksUnloaded = this.create(document, "menuitem", {
      id: "placesContext_openLinks:unloaded",
      label: unloadedTabMenuL10n.openAll,
      accesskey: unloadedTabMenuL10n.accessKey,
      disabled: true,
      hidden: true,
      oncommand: `unloadedTabMenu.openSelectedTabs(this.parentElement)`,
    });
    this.placesMenuOpenAllLinks.after(this.placesMenuOpenAllLinksUnloaded);

    this.placesContextMenu.addEventListener("popupshowing", this);

    if (location.href !== `chrome://browser/content/browser.xhtml`) return;

    this.syncedMenuOpenAllUnloaded = this.create(document, "menuitem", {
      id: "syncedTabsOpenAllUnloaded",
      label: unloadedTabMenuL10n.openAll,
      accesskey: unloadedTabMenuL10n.accessKey,
      disabled: true,
      hidden: true,
      oncommand: `unloadedTabMenu.openAllSyncedFromDevice()`,
    });
    this.syncedMenuOpenAll.after(this.syncedMenuOpenAllUnloaded);

    this.syncedMenuOpenUnloaded = this.create(document, "menuitem", {
      id: "syncedTabsOpenUnloaded",
      label: unloadedTabMenuL10n.openBookmark,
      accesskey: unloadedTabMenuL10n.accessKey,
      disabled: true,
      hidden: true,
      oncommand: `unloadedTabMenu.openSyncedTabUnloaded()`,
    });
    this.syncedMenuOpenTab.after(this.syncedMenuOpenUnloaded);

    this.syncedContextMenu.addEventListener("popupshowing", this);

    this.contentMenuOpenLinkUnloaded = this.create(document, "menuitem", {
      id: "context-openlinkinunloadedtab",
      label: unloadedTabMenuL10n.openLink,
      accesskey: unloadedTabMenuL10n.accessKey,
      hidden: true,
      oncommand: `unloadedTabMenu.openTab({url: gContextMenu.linkURL}, {fromContent: true, linkText: gContextMenu.linkTextStr})`,
    });
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
