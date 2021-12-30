// ==UserScript==
// @name           Open Bookmarks, History, etc. in New Tabs
// @version        1.1
// @author         aminomancer
// @homepage       https://github.com/aminomancer/uc.css.js
// @description    In vanilla Firefox, browser.tabs.loadBookmarksInTabs only affects bookmark items. When you enable this pref and left-click a bookmark (e.g., in the bookmarks toolbar or menu) it opens in a new tab instead of in the current tab. But if you left-click a history entry or a synced tab, it will still open in the current tab. So you'd have to middle click or ctrl+click to avoid losing your current tab's navigation state. This script just makes that preference apply to history and synced tabs too. It's relatively easy to do this because there isn't any technical reason it doesn't work for history or synced tabs. For whatever reason, the command handler for clicking these places nodes just intentionally checks if it's a bookmark and opens it in a new tab only if it passes the check. I guess this is probably because the preference was called "loadBookmarksInTabs" a long time ago, so making it affect other items might be confusing, but changing the name of a longstanding pref would also be confusing. So I guess Firefox is just stuck with the ramifications of a minor mistake somebody ostensibly made years ago, which is a perfect use case for an autoconfig script.
// @license        This Source Code Form is subject to the terms of the Creative Commons Attribution-NonCommercial-ShareAlike International License, v. 4.0. If a copy of the CC BY-NC-SA 4.0 was not distributed with this file, You can obtain one at http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
// @include        main
// @include        chrome://browser/content/syncedtabs/sidebar.xhtml
// ==/UserScript==

(function () {
    function init() {
        function getBrowserWindow(aWindow) {
            return aWindow &&
                aWindow.document.documentElement.getAttribute("windowtype") == "navigator:browser"
                ? aWindow
                : BrowserWindowTracker.getTopWindow();
        }
        if (window.PlacesUIUtils && !PlacesUIUtils._hasBeenModifiedForOBHNT) {
            eval(
                `PlacesUIUtils.openNodeWithEvent = function ` +
                    PlacesUIUtils.openNodeWithEvent
                        .toSource()
                        .replace(/\(function PUIU_openNodeWithEvent/, "")
                        .replace(/ && PlacesUtils\.nodeIsBookmark\(aNode\)/, "")
                        .replace(/\)$/, "")
            );
            PlacesUIUtils._hasBeenModifiedForOBHNT = true;
        }
        if (window.HistoryMenu) {
            let proto = HistoryMenu.prototype;
            if (!proto._hasBeenModifiedForOBHNT) {
                proto._onCommand = function (e) {
                    e = getRootEvent(e);
                    let placesNode = e.target._placesNode;
                    if (placesNode) {
                        if (!PrivateBrowsingUtils.isWindowPrivate(window))
                            PlacesUIUtils.markPageAsTyped(placesNode.uri);
                        let where = whereToOpenLink(e, false, true);
                        if (PlacesUIUtils.loadBookmarksInTabs) {
                            if (where == "current") where = "tab";
                            if (where == "tab" && gBrowser.selectedTab.isEmpty) where = "current";
                        }
                        openUILinkIn(placesNode.uri, where, {
                            triggeringPrincipal:
                                Services.scriptSecurityManager.getSystemPrincipal(),
                        });
                    }
                };
                proto._onClick = function (e) {
                    let modifKey =
                        AppConstants.platform == "macosx"
                            ? e.metaKey || e.shiftKey
                            : e.ctrlKey || e.shiftKey;
                    if (e.button == 2 || (e.button == 0 && !modifKey)) return;
                    let target = e.originalTarget;
                    let tag = target.tagName;
                    if (PlacesUIUtils.openInTabClosesMenu && (tag == "menuitem" || tag == "menu"))
                        closeMenus(e.target);
                    if (e.button == 1 && !(tag == "menuitem" || tag == "menu")) this.onCommand(e);
                };
                proto._onMouseUp = function (e) {
                    if (e.button == 2 || PlacesUIUtils.openInTabClosesMenu) return;
                    let target = e.originalTarget;
                    if (target.tagName != "menuitem") return;
                    let modifKey = AppConstants.platform === "macosx" ? e.metaKey : e.ctrlKey;
                    if (modifKey || e.button == 1) {
                        target.setAttribute("closemenu", "none");
                        let menupopup = target.parentNode;
                        menupopup.addEventListener(
                            "popuphidden",
                            () => target.removeAttribute("closemenu"),
                            { once: true }
                        );
                    } else target.removeAttribute("closemenu");
                };
                let popup = document.getElementById("historyMenuPopup");
                popup.setAttribute("onclick", `this.parentNode._placesView._onClick(event);`);
                popup.setAttribute("onmouseup", `this.parentNode._placesView._onMouseUp(event);`);
                proto._hasBeenModifiedForOBHNT = true;
            }
        }
        if (window.PlacesPanelview) {
            let proto = PlacesPanelview.prototype;
            if (!proto._hasBeenModifiedForOBHNT) {
                eval(
                    `proto._onCommand = function ` +
                        proto._onCommand
                            .toSource()
                            .replace(/_onCommand/, "")
                            .replace(
                                /(button\.parentNode\.id == \"panelMenu_bookmarksMenu\")/,
                                `$1 || button.parentNode.id == "appMenu_historyMenu"`
                            )
                            .replace(
                                /(button\.parentNode\.id != \"panelMenu_bookmarksMenu\")/,
                                `($1 && button.parentNode.id != "appMenu_historyMenu")`
                            )
                );
                proto._hasBeenModifiedForOBHNT = true;
            }
        }
        if (window.SyncedTabsPanelList) {
            let proto = SyncedTabsPanelList.prototype;
            if (!proto._hasBeenModifiedForOBHNT) {
                eval(
                    `proto._createSyncedTabElement = function ` +
                        proto._createSyncedTabElement
                            .toSource()
                            .replace(/_createSyncedTabElement/, "")
                            .replace(/document\.defaultView\.whereToOpenLink\(e\)/, "preWhere")
                            .replace(
                                /document\.defaultView\.openUILink\(tabInfo\.url, e,/,
                                `let where = document.defaultView.whereToOpenLink(e, false, true);\n      let preWhere = where;\n      if (document.defaultView.PlacesUIUtils.loadBookmarksInTabs) {\n        if (where == "current") where = "tab";\n        if (where == "tab" && document.defaultView.gBrowser.selectedTab.isEmpty) where = "current";\n      }\n      document.defaultView.openUILinkIn(tabInfo.url, where,`
                            )
                );
                proto._hasBeenModifiedForOBHNT = true;
            }
        }
        if (location.href === `chrome://browser/content/syncedtabs/sidebar.xhtml`) {
            let proto = syncedTabsDeckComponent.tabListComponent._View.prototype;
            if (!proto._hasBeenModifiedForOBHNT) {
                proto.onOpenSelected = function (url, e) {
                    let browserWindow = this._window.browsingContext.topChromeWindow;
                    let where = browserWindow.whereToOpenLink(e, false, true);
                    if (browserWindow.PlacesUIUtils.loadBookmarksInTabs) {
                        if (where == "current") where = "tab";
                        if (where == "tab" && browserWindow.gBrowser.selectedTab.isEmpty)
                            where = "current";
                    }
                    this.props.onOpenTab(url, where, {});
                };
                proto._hasBeenModifiedForOBHNT = true;
            }
        }
    }
    if (
        location.href !== `chrome://browser/content/browser.xhtml` ||
        gBrowserInit.delayedStartupFinished
    )
        init();
    else {
        let delayedListener = (subject, topic) => {
            if (topic == "browser-delayed-startup-finished" && subject == window) {
                Services.obs.removeObserver(delayedListener, topic);
                init();
            }
        };
        Services.obs.addObserver(delayedListener, "browser-delayed-startup-finished");
    }
})();
