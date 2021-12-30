// ==UserScript==
// @name           Private Tabs
// @version        1.1
// @author         aminomancer
// @homepage       https://github.com/aminomancer
// @description    An fx-autoconfig port of Private Tab by xiaoxiaoflood. Adds buttons and menu items allowing you to open a "private tab" in nearly any circumstance in which you'd be able to open a normal tab. Instead of opening a link in a private window, you can open it in a private tab instead. This will use a special container and prevent history storage, depending on user configuration. You can also toggle tabs back and forth between private and normal mode. This script adds two hotkeys: Ctrl+alt+P to open a new private tab, and ctrl+alt+T to toggle private mode for the active tab. These hotkeys can be configured along with several other options at the top of the script file.
// @license        This Source Code Form is subject to the terms of the Creative Commons Attribution-NonCommercial-ShareAlike International License, v. 4.0. If a copy of the CC BY-NC-SA 4.0 was not distributed with this file, You can obtain one at http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
// @include        main
// @include        chrome://browser/content/places/bookmarksSidebar.xhtml
// @include        chrome://browser/content/places/historySidebar.xhtml
// @include        chrome://browser/content/places/places.xhtml
// ==/UserScript==

class PrivateTabManager {
    constructor() {
        if (!_ucUtils.sharedGlobal.privateTabGlobal) _ucUtils.sharedGlobal.privateTabGlobal = {};
        let privateTabGlobal = _ucUtils.sharedGlobal.privateTabGlobal;
        this.config = {
            neverClearData: false, // if you want to not record history but don't care about other data, maybe even want to keep private logins
            restoreTabsOnRestart: true,
            doNotClearDataUntilFxIsClosed: true,
            deleteContainerOnDisable: false,
            clearDataOnDisable: false,
            toggleHotkey: "T", // key for toggling private mode for the active tab. ctrl + alt + T by default.
            newTabHotkey: "P", // key for opening a new private tab. ctrl + alt + P by default.
            toggleModifiers: "alt accel", // modifiers for toggle hotkey. this means alt+ctrl on windows or alt+cmd on mac
            newTabModifiers: "alt accel", // modifiers for new tab hotkey.
        };
        // isn't strictly necessary, but due to a programmer's oversight, this seems to be the only way to prevent irritating animations when toggling private mode on/off for a tab. what's actually happening under the hood is not a simple state change, since that would be insecure. the whole point of all this is to avoid leaking information, so when we turn private mode on, we need to create a brand new tab and restore it from cached data. but the internal duplicateTab method doesn't pass the skipAnimation parameter to addTrustedTab. so we need to make our own function, which requires these unexposed modules.
        let { SessionStoreInternal } = Cu.import(
            "resource:///modules/sessionstore/SessionStore.jsm"
        );
        this.SSI = SessionStoreInternal;
        XPCOMUtils.defineLazyModuleGetters(this, {
            TabState: "resource:///modules/sessionstore/TabState.jsm",
            TabStateFlusher: "resource:///modules/sessionstore/TabStateFlusher.jsm",
        });
        this.sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(
            Ci.nsIStyleSheetService
        );
        privateTabGlobal.openTabs = new Set();
        if (typeof window.gProton != "undefined") privateTabGlobal.gProton = window.gProton;
        this.menuClass = privateTabGlobal.gProton ? `` : `menuitem-iconic privatetab-icon`;
        this.openTabs = privateTabGlobal.openTabs;
        this.orig_getAttribute = MozElements.MozTab.prototype.getAttribute;
        this.BTN_ID = "privateTab-button";
        this.BTN2_ID = "newPrivateTab-button";
        this.init();
        if (location.href != "chrome://browser/content/browser.xhtml") return this.exec();
        if (gBrowserInit.delayedStartupFinished) this.exec();
        else {
            let delayedListener = (subject, topic) => {
                if (topic == "browser-delayed-startup-finished" && subject == window) {
                    Services.obs.removeObserver(delayedListener, topic);
                    this.exec();
                }
            };
            Services.obs.addObserver(delayedListener, "browser-delayed-startup-finished");
        }
    }

    exec() {
        let privateTabGlobal = _ucUtils.sharedGlobal.privateTabGlobal;
        if (PrivateBrowsingUtils.isWindowPrivate(window)) return;
        let openAll = document.getElementById("placesContext_openBookmarkContainer:tabs");
        let openAllPrivate = _ucUtils.createElement(document, "menuitem", {
            id: "openAllPrivate",
            label: "Open All in Private Tabs",
            accesskey: "v",
            class: this.menuClass,
            oncommand: `event.userContextId = ${
                this.container.userContextId
            }; ${openAll.getAttribute("oncommand")}`,
            onclick: `event.userContextId = ${this.container.userContextId}; ${openAll.getAttribute(
                "onclick"
            )}`,
        });
        openAll.after(openAllPrivate);

        let openAllLinks = document.getElementById("placesContext_openLinks:tabs");
        let openAllLinksPrivate = _ucUtils.createElement(document, "menuitem", {
            id: "openAllLinksPrivate",
            label: "Open All in Private Tabs",
            accesskey: "v",
            class: this.menuClass,
            oncommand: `event.userContextId = ${
                this.container.userContextId
            }; ${openAllLinks.getAttribute("oncommand")}`,
            onclick: `event.userContextId = ${
                this.container.userContextId
            }; ${openAllLinks.getAttribute("onclick")}`,
        });
        openAllLinks.after(openAllLinksPrivate);

        let openTab = document.getElementById("placesContext_open:newtab");
        let openPrivate = _ucUtils.createElement(document, "menuitem", {
            id: "openPrivate",
            label: "Open in a New Private Tab",
            accesskey: "v",
            class: this.menuClass,
            oncommand: `let view = event.target.parentElement._view; PlacesUIUtils._openNodeIn(view.selectedNode, "tab", view.ownerWindow, false, ${this.container.userContextId})`,
        });
        openTab.after(openPrivate);

        document.getElementById("placesContext").addEventListener("popupshowing", this);

        if (location.href != "chrome://browser/content/browser.xhtml") return;

        let keyset = _ucUtils.createElement(document, "keyset", { id: "privateTab-keyset" });
        document.getElementById("mainKeyset").after(keyset);

        let toggleKey = _ucUtils.createElement(document, "key", {
            id: "togglePrivateTab-key",
            modifiers: this.config.toggleModifiers,
            key: this.config.toggleHotkey,
            oncommand: "privateTab.togglePrivate()",
        });
        keyset.appendChild(toggleKey);

        let newPrivateTabKey = _ucUtils.createElement(document, "key", {
            id: "newPrivateTab-key",
            modifiers: this.config.newTabModifiers,
            key: this.config.newTabHotkey,
            oncommand: "privateTab.BrowserOpenTabPrivate()",
        });
        keyset.appendChild(newPrivateTabKey);

        let menuOpenLink = _ucUtils.createElement(document, "menuitem", {
            id: "menu_newPrivateTab",
            label: "New Private Tab",
            accesskey: "v",
            acceltext: ShortcutUtils.prettifyShortcut(newPrivateTabKey),
            class: this.menuClass,
            oncommand: "privateTab.BrowserOpenTabPrivate()",
        });
        document.getElementById("menu_newNavigatorTab").after(menuOpenLink);

        let openLink = _ucUtils.createElement(document, "menuitem", {
            id: "openLinkInPrivateTab",
            label: "Open Link in New Private Tab",
            accesskey: "v",
            class: this.menuClass,
            hidden: true,
            oncommand: `openLinkIn(gContextMenu.linkURL, "tab", gContextMenu._openLinkInParameters({ userContextId: privateTab.container.userContextId, triggeringPrincipal: document.nodePrincipal, }));`,
        });

        document.getElementById("contentAreaContextMenu").addEventListener("popupshowing", this);
        document.getElementById("contentAreaContextMenu").addEventListener("popuphidden", this);
        document.getElementById("context-openlinkintab").after(openLink);

        let toggleTab = _ucUtils.createElement(document, "menuitem", {
            id: "toggleTabPrivateState",
            label: "Private Tab",
            type: "checkbox",
            accesskey: "v",
            acceltext: ShortcutUtils.prettifyShortcut(toggleKey),
            oncommand: "privateTab.togglePrivate(TabContextMenu.contextTab)",
        });
        document.getElementById("context_pinTab").after(toggleTab);
        document.getElementById("tabContextMenu").addEventListener("popupshowing", this);

        let privateMask = document.getElementsByClassName("private-browsing-indicator")[0];
        privateMask.id = "private-mask";

        let btn2 = _ucUtils.createElement(document, "toolbarbutton", {
            id: this.BTN2_ID,
            label: "New Private Tab",
            tooltiptext: `Open a new private tab (${ShortcutUtils.prettifyShortcut(
                newPrivateTabKey
            )})`,
            class: "toolbarbutton-1 chromeclass-toolbar-additional",
        });

        btn2.addEventListener("click", this);

        document.getElementById("tabs-newtab-button").after(btn2);

        gBrowser.tabContainer.addEventListener("TabSelect", this);

        addEventListener("XULFrameLoaderCreated", this);

        if (this.observePrivateTabs) gBrowser.tabContainer.addEventListener("TabClose", this);

        MozElements.MozTab.prototype.getAttribute = function (att) {
            if (att == "usercontextid" && this.isToggling) {
                delete this.isToggling;
                return privateTab.orig_getAttribute.call(this, att)
                    ? 0
                    : privateTab.container.userContextId;
            } else {
                return privateTab.orig_getAttribute.call(this, att);
            }
        };

        Object.defineProperty(customElements.get("tabbrowser-tabs").prototype, "allTabs", {
            get: function allTabs() {
                let children = Array.from(this.arrowScrollbox.children);
                while (children.length && children[children.length - 1].tagName != "tab")
                    children.pop();
                return children;
            },
        });

        customElements.get("tabbrowser-tabs").prototype.insertBefore = function (tab, node) {
            if (!this.arrowScrollbox) {
                throw new Error("Shouldn't call this without arrowscrollbox");
            }

            let { arrowScrollbox } = this;
            if (node == null) {
                node = arrowScrollbox.lastChild.previousSibling.previousSibling;
            }
            return arrowScrollbox.insertBefore(tab, node);
        };

        customElements.get("tabbrowser-tabs").prototype._updateNewTabVisibility = function () {
            let wrap = (n) => (n.parentNode.localName == "toolbarpaletteitem" ? n.parentNode : n);
            let unwrap = (n) =>
                n && n.localName == "toolbarpaletteitem" ? n.firstElementChild : n;

            let newTabFirst = false;
            let sibling = (id, otherId) => {
                let sib = this;
                do {
                    if (sib.id == "new-tab-button") newTabFirst = true;
                    sib = unwrap(wrap(sib).nextElementSibling);
                } while (sib && (sib.hidden || sib.id == "alltabs-button" || sib.id == otherId));
                return sib?.id == id && sib;
            };

            const kAttr = "hasadjacentnewtabbutton";
            let adjacentNewTab = sibling("new-tab-button", privateTab.BTN_ID);
            if (adjacentNewTab) {
                this.setAttribute(kAttr, "true");
            } else {
                this.removeAttribute(kAttr);
            }

            const kAttr2 = "hasadjacentnewprivatetabbutton";
            let adjacentPrivateTab = sibling(privateTab.BTN_ID, "new-tab-button");
            if (adjacentPrivateTab) {
                this.setAttribute(kAttr2, "true");
            } else {
                this.removeAttribute(kAttr2);
            }

            if (adjacentNewTab && adjacentPrivateTab) {
                let doc = adjacentPrivateTab.ownerDocument;
                if (newTabFirst)
                    doc.getElementById("tabs-newtab-button").after(
                        doc.getElementById(privateTab.BTN2_ID)
                    );
                else
                    doc.getElementById(privateTab.BTN2_ID).after(
                        doc.getElementById("tabs-newtab-button")
                    );
            }
        };
        gBrowser.tabContainer._updateNewTabVisibility();
        if (!privateTabGlobal.privateTabsInited)
            CustomizableUI.createWidget({
                id: this.BTN_ID,
                type: "custom",
                defaultArea: CustomizableUI.AREA_NAVBAR,
                showInPrivateBrowsing: false,
                onBuild: (doc) => {
                    let btn = _ucUtils.createElement(doc, "toolbarbutton", {
                        id: this.BTN_ID,
                        label: "New Private Tab",
                        tooltiptext: `Open a new private tab (${ShortcutUtils.prettifyShortcut(
                            newPrivateTabKey
                        )})`,
                        class: "toolbarbutton-1 chromeclass-toolbar-additional",
                        oncommand: "privateTab.BrowserOpenTabPrivate()",
                    });

                    return btn;
                },
            });
        privateTabGlobal.privateTabsInited = true;
    }

    init() {
        let privateTabGlobal = _ucUtils.sharedGlobal.privateTabGlobal;
        ContextualIdentityService.ensureDataReady();
        this.container = ContextualIdentityService._identities.find(
            (container) => container.name == "Private"
        );
        if (!this.container) {
            ContextualIdentityService.create("Private", "fingerprint", "purple");
            this.container = ContextualIdentityService._identities.find(
                (container) => container.name == "Private"
            );
        } else if (!this.config.neverClearData) {
            this.clearData();
        }

        this.setStyle();
        this.sss.loadAndRegisterSheet(this.STYLE.url, this.STYLE.type);

        CustomizableUI.addListener(this);

        if (!privateTabGlobal.privateTabsInited) {
            let { getBrowserWindow } = Cu.import("resource:///modules/PlacesUIUtils.jsm");
            let openTabsetString = PlacesUIUtils.openTabset.toString();
            eval(
                `PlacesUIUtils.openTabset = ${
                    openTabsetString.startsWith("function") ? "" : "function "
                }` +
                    openTabsetString.replace(
                        /(\s+)(inBackground: loadInBackground,)/,
                        "$1$2$1userContextId: aEvent.userContextId || 0,"
                    )
            );

            eval(
                "PlacesUIUtils._openNodeIn = " +
                    PlacesUIUtils._openNodeIn
                        .toString()
                        .replace(/(\s+)(aPrivate = false)\n/, "$1$2,$1userContextId = 0\n")
                        .replace(/(\s+)(private: aPrivate,)\n/, "$1$2$1userContextId,\n")
            );
        }

        let { UUIDMap } = Cu.import("resource://gre/modules/Extension.jsm");
        let TST_ID = "treestyletab@piro.sakura.ne.jp";
        this.TST_UUID = UUIDMap.get(TST_ID, false);

        if (this.TST_UUID) this.setTstStyle(this.TST_UUID);
        if (AddonManager && location.href === "chrome://browser/content/browser.xhtml")
            AddonManager.addAddonListener({
                onInstalled: (addon) => {
                    if (addon.id == TST_ID) this.setTstStyle(UUIDMap.get(TST_ID, false));
                },
                onUninstalled: (addon) => {
                    if (addon.id == TST_ID)
                        this.sss.unregisterSheet(this.TST_STYLE.url, this.TST_STYLE.type);
                },
            });

        if (!this.config.neverClearData) {
            Services.obs.addObserver(this, "quit-application-granted");
        }
    }

    observe(sub, top, data) {
        this.clearData();
        if (!this.config.restoreTabsOnRestart) this.closeTabs();
    }

    clearData() {
        Services.clearData.deleteDataFromOriginAttributesPattern({
            userContextId: this.container.userContextId,
        });
    }

    closeTabs() {
        ContextualIdentityService._forEachContainerTab((tab, tabbrowser) => {
            if (tab.userContextId == this.container.userContextId) tabbrowser.removeTab(tab);
        });
    }

    duplicateTab(tab, { index, inBackground }) {
        // Create a new tab.
        let userContextId = tab.getAttribute("usercontextid");

        let tabOptions = {
            userContextId,
            index,
            skipAnimation: true,
            ...(tab == gBrowser.selectedTab ? { relatedToCurrent: true, ownerTab: tab } : {}),
        };
        let newTab = gBrowser.addTrustedTab(null, tabOptions);

        // Start the throbber to pretend we're doing something while actually
        // waiting for data from the frame script. This throbber is disabled
        // if the URI is a local about: URI.
        let uriObj = tab.linkedBrowser.currentURI;
        if (!uriObj || (uriObj && !uriObj.schemeIs("about"))) {
            newTab.setAttribute("busy", "true");
        }

        // Hack to ensure that the about:home, about:newtab, and about:welcome
        // favicon is loaded instantaneously, to avoid flickering and improve
        // perceived performance.
        gBrowser.setDefaultIcon(newTab, uriObj);

        // Collect state before flushing.
        let tabState = this.TabState.collect(tab, SessionStore.getCustomTabValue(tab));

        // Flush to get the latest tab state to duplicate.
        let browser = tab.linkedBrowser;
        this.TabStateFlusher.flush(browser).then(() => {
            // The new tab might have been closed in the meantime.
            if (newTab.closing || !newTab.linkedBrowser) return;

            let window = newTab.ownerGlobal;

            // The tab or its window might be gone.
            if (!window || !window.__SSi) return;

            // Update state with flushed data. We can't use TabState.clone() here as
            // the tab to duplicate may have already been closed. In that case we
            // only have access to the <xul:browser>.
            let options = { includePrivateData: true };
            this.TabState.copyFromCache(browser.permanentKey, tabState, options);

            tabState.index += 0;
            tabState.index = Math.max(1, Math.min(tabState.index, tabState.entries.length));
            tabState.pinned = false;

            if (!inBackground) gBrowser.selectedTab = newTab;

            // Restore the state into the new tab.
            this.SSI.restoreTab(newTab, tabState, {
                restoreImmediately: true,
            });
        });

        return newTab;
    }

    togglePrivate(tab = gBrowser.selectedTab) {
        tab.isToggling = true;
        let shouldSelect = tab == gBrowser.selectedTab;
        let newTab = this.duplicateTab(tab, {
            index: shouldSelect ? tab._tPos + 1 : tab._tPos,
            inBackground: !shouldSelect,
        });
        if (shouldSelect) if (gURLBar.focused) gURLBar.focus();
        gBrowser.removeTab(tab, { animate: false, closeWindowWithLastTab: false });
    }

    toggleMask() {
        let privateMask = document.getElementById("private-mask");
        if (gBrowser.selectedTab.isToggling)
            privateMask.setAttribute(
                "enabled",
                gBrowser.selectedTab.userContextId == this.container.userContextId
                    ? "false"
                    : "true"
            );
        else
            privateMask.setAttribute(
                "enabled",
                gBrowser.selectedTab.userContextId == this.container.userContextId
                    ? "true"
                    : "false"
            );
    }

    BrowserOpenTabPrivate() {
        openTrustedLinkIn(BROWSER_NEW_TAB_URL, "tab", {
            userContextId: this.container.userContextId,
        });
    }

    isPrivate(tab) {
        return tab.getAttribute("usercontextid") == this.container.userContextId;
    }

    contentContext(_e) {
        let tab = gBrowser.getTabForBrowser(gContextMenu.browser);
        gContextMenu.showItem(
            "openLinkInPrivateTab",
            gContextMenu.onSaveableLink || gContextMenu.onPlainTextLink
        );
        if (this.isPrivate(tab)) gContextMenu.showItem("context-openlinkincontainertab", false);
    }

    hideContext(_e) {
        document.getElementById("openLinkInPrivateTab").hidden = true;
    }

    tabContext(_e) {
        document
            .getElementById("toggleTabPrivateState")
            .setAttribute(
                "checked",
                TabContextMenu.contextTab.userContextId == this.container.userContextId
            );
    }

    placesContext(_e) {
        document.getElementById("openPrivate").disabled = document.getElementById(
            "placesContext_open:newtab"
        ).disabled;
        document.getElementById("openPrivate").hidden = document.getElementById(
            "placesContext_open:newtab"
        ).hidden;
        document.getElementById("openAllPrivate").disabled = document.getElementById(
            "placesContext_openBookmarkContainer:tabs"
        ).disabled;
        document.getElementById("openAllPrivate").hidden = document.getElementById(
            "placesContext_openBookmarkContainer:tabs"
        ).hidden;
        document.getElementById("openAllLinksPrivate").disabled = document.getElementById(
            "placesContext_openLinks:tabs"
        ).disabled;
        document.getElementById("openAllLinksPrivate").hidden = document.getElementById(
            "placesContext_openLinks:tabs"
        ).hidden;
    }

    handleEvent(e) {
        switch (e.type) {
            case "TabSelect":
                this.onTabSelect(e);
                break;
            case "TabClose":
                this.onTabClose(e);
                break;
            case "XULFrameLoaderCreated":
                this.privateListener(e);
                break;
            case "popupshowing":
                if (e.target === document.getElementById("placesContext")) this.placesContext(e);
                if (e.target === document.getElementById("contentAreaContextMenu"))
                    this.contentContext(e);
                if (e.target === document.getElementById("tabContextMenu")) this.tabContext(e);
                break;
            case "popuphidden":
                if (e.target === document.getElementById("contentAreaContextMenu"))
                    this.hideContext(e);
                break;
            case "click":
                if (e.button == 0) this.BrowserOpenTabPrivate();
                else if (e.button == 2) {
                    document.popupNode = document.getElementById(this.BTN_ID);
                    document
                        .getElementById("toolbar-context-menu")
                        .openPopup(this, "after_start", 14, -10, false, false);
                    document.getElementsByClassName(
                        "customize-context-removeFromToolbar"
                    )[0].disabled = false;
                    document.getElementsByClassName(
                        "customize-context-moveToPanel"
                    )[0].disabled = false;
                    e.preventDefault();
                }
                break;
        }
    }

    privateListener(e) {
        let browser = e.target;
        let tab = gBrowser.getTabForBrowser(browser);
        if (!tab) return;
        let isPrivate = this.isPrivate(tab);

        if (!isPrivate) {
            if (this.observePrivateTabs) {
                this.openTabs.delete(tab);
                if (!this.openTabs.size) this.clearData();
            }
            return;
        }

        if (this.observePrivateTabs) this.openTabs.add(tab);

        browser.browsingContext.useGlobalHistory = false;
    }

    onTabSelect(e) {
        if (e.target.userContextId != e.detail.previousTab.userContextId) this.toggleMask();
    }

    onTabClose(e) {
        if (this.isPrivate(e.target)) {
            this.openTabs.delete(e.target);
            if (!this.openTabs.size) this.clearData();
        }
    }

    onWidgetAfterCreation(id) {
        if (id == this.BTN_ID) {
            let newTabPlacement = CustomizableUI.getPlacementOfWidget("new-tab-button")?.position;
            if (newTabPlacement)
                CustomizableUI.addWidgetToArea(
                    this.BTN_ID,
                    CustomizableUI.AREA_TABSTRIP,
                    newTabPlacement + 1
                );
            gBrowser.tabContainer._updateNewTabVisibility();
            CustomizableUI.removeListener(this);
        }
    }

    get observePrivateTabs() {
        return (
            this._observePrivateTabs ||
            (this._observePrivateTabs =
                !this.config.neverClearData && !this.config.doNotClearDataUntilFxIsClosed)
        );
    }

    setStyle() {
        this.STYLE = {
            url: Services.io.newURI(
                "data:text/css;charset=UTF-8," +
                    encodeURIComponent(
                        `.privatetab-icon, #${this.BTN_ID}, #${this.BTN2_ID} { list-style-image: url(chrome://browser/skin/privateBrowsing.svg) !important; fill: currentColor; -moz-context-properties: fill; } @-moz-document url('chrome://browser/content/browser.xhtml') { #private-mask[enabled="true"] { display: block !important; } #tabbrowser-tabs[hasadjacentnewprivatetabbutton]:not([overflow="true"]) ~ #${this.BTN_ID}, #tabbrowser-tabs[overflow="true"] > #tabbrowser-arrowscrollbox > #${this.BTN2_ID}, #tabbrowser-tabs:not([hasadjacentnewprivatetabbutton]) > #tabbrowser-arrowscrollbox > #${this.BTN2_ID}, #TabsToolbar[customizing="true"] #${this.BTN2_ID} { display: none; } .tabbrowser-tab[usercontextid="${this.container.userContextId}"] .tab-label { text-decoration: underline !important; text-decoration-color: -moz-nativehyperlinktext !important; text-decoration-style: dashed !important; } .tabbrowser-tab[usercontextid="${this.container.userContextId}"][pinned] .tab-icon-image, .tabbrowser-tab[usercontextid="${this.container.userContextId}"][pinned] .tab-throbber { border-bottom: 1px dashed -moz-nativehyperlinktext !important; }}`
                    )
            ),
            type: this.sss.USER_SHEET,
        };
    }

    setTstStyle(uuid) {
        this.TST_STYLE = {
            url: Services.io.newURI(
                "data:text/css;charset=UTF-8," +
                    encodeURIComponent(
                        `@-moz-document url-prefix(moz-extension://${uuid}/sidebar/sidebar.html) { .tab.contextual-identity-firefox-container-${this.container.userContextId} .label-content { text-decoration: underline !important; text-decoration-color: -moz-nativehyperlinktext !important; text-decoration-style: dashed !important; } .tab.contextual-identity-firefox-container-${this.container.userContextId} tab-favicon { border-bottom: 1px dashed -moz-nativehyperlinktext !important;}}`
                    )
            ),
            type: this.sss.USER_SHEET,
        };
        this.sss.loadAndRegisterSheet(this.TST_STYLE.url, this.TST_STYLE.type);
    }
}

window.privateTab = new PrivateTabManager();
