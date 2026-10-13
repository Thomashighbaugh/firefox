import { FALLBACK_ICON, fetchIconURL } from "../utils/icons.mjs";
import { clearUrl, extractHostname } from "../utils/url.mjs";
import { isLeftMouseButton, isMiddleMouseButton } from "../utils/buttons.mjs";
import { ChromeUtilsWrapper, ZoomManagerWrapper } from "../wrappers/services.mjs";
import { PinnedWebPanelGeometrySettings, WebPanelSettings } from "../settings/web_panel_settings.mjs";
import { SidebarControllers } from "../sidebar_controllers.mjs";
import { SidebarElements } from "../sidebar_elements.mjs";
import { WebPanelButton } from "../xul/web_panel_button.mjs";
import { WebPanelState } from "../settings/web_panels_settings.mjs";
import { WebPanelTab } from "../xul/web_panel_tab.mjs";
import { parseNotifications } from "../utils/string.mjs";
const DEFAULT_ZOOM = 1;

export class WebPanelController {
  #progressListener = this.#createProgressListener();
  /**@type {WebPanelSettings} */
  #settings;
  /**@type {WebPanelState} */
  #state;
  /**@type {WebPanelButton} */
  #button;
  /**@type {WebPanelTab?} */
  #tab = null;
  /**@type {number} */
  #interval = null;

  /**
   *
   * @param {WebPanelSettings} settings
   * @param {WebPanelState} state
   * @param {object?} params
   * @param {boolean?} params.loaded
   * @param {string?} params.position
   */
  constructor(settings, state, { loaded = false, position = null } = {}) {
    this.#settings = settings;
    this.#state = state;
    this.#button = this.#createWebPanelButton(settings, loaded, position);

    if (loaded) this.load();
  }

  #createProgressListener() {
    const callback = () => this.updateTitle();
    const onStateChange = (aWebProgress, aRequest, aFlag) => {
      callback();
      const STATE_STOP = Ci.nsIWebProgressListener2.STATE_STOP;
      const STATE_IS_WINDOW = Ci.nsIWebProgressListener2.STATE_IS_WINDOW;
      if (
        aWebProgress.isTopLevel &&
        aFlag & STATE_STOP &&
        aFlag & STATE_IS_WINDOW
      ) {
        this.#state.lastUrl = this.getTabUrl();
        SidebarControllers.webPanelsController.saveState();
        if (this.getSelectorEnabled()) {
          setTimeout(() => this.#applySelector(), 100);
        }
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
      onStateChange: onStateChange,
      onStatusChange: callback,
    };
  }

  #applySelector() {
    const selector = this.getSelector();
    if (!this.getSelectorEnabled() || selector === "") {
      return;
    }
    const script = `javascript:(() => {
      var toDelete = [];
      var e = document.querySelector('${selector}');
      e.style.margin = 0;
      while (e.nodeName != "BODY") {
        for (var c of e.parentElement.children) {
          if (!["STYLE", "SCRIPT"].includes(c.nodeName) && c !== e) {
            toDelete.push({ parent: e.parentElement, child: c });
          }
        }
        e.style.overflow = "visible";
        e.style.minWidth = "0px";
        e.style.minHeight = "0px";
        e.style.gridGap = "0px";
        e = e.parentElement;
        e.style.padding = 0;
        e.style.margin = 0;
        e.style.transform = "none";
      }
      toDelete.forEach((e) => {
        e.parent.removeChild(e.child);
      });
      const body = document.querySelector("body");
      body.style.overflow = "hidden";
      body.style.minWidth = "0px";
      body.style.minHeight = "0px";
      window.scrollTo(0, 0);
    })()`;
    this.#tab.linkedBrowser.go(script);
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
    button.setAttribute("temporary", settings.temporary);

    let tooltipTimer = null;

    button.addEventListener("mouseenter", () => {
      tooltipTimer = setTimeout(() => {
        SidebarControllers.webPanelTooltipController.openPopup(this);
      }, 500);
    });

    button.addEventListener("mouseleave", () => {
      clearTimeout(tooltipTimer);
      SidebarControllers.webPanelTooltipController.hidePopup();
    });

    button.addEventListener("mousedown", (event) => {
      if (
        !isLeftMouseButton(event) ||
        document.documentElement.hasAttribute("customizing")
      ) {
        return;
      }

      event.stopPropagation();
      clearTimeout(tooltipTimer);
      SidebarControllers.webPanelTooltipController.hidePopup();

      this.switchWebPanel();
    });

    button.addEventListener("click", (event) => {
      event.stopPropagation();
      if (!isMiddleMouseButton(event)) return;

      clearTimeout(tooltipTimer);
      SidebarControllers.webPanelTooltipController.hidePopup();

      if (this.isActive()) {
        SidebarControllers.sidebarController.close();
      }
      this.unload();
    });

    return button;
  }

  get button() {
    return this.#button;
  }

  getUUID() {
    return this.#settings.uuid;
  }

  getTabUrl() {
    return this.#tab?.linkedBrowser?.getCurrentUrl();
  }

  getURL() {
    return this.#settings.url;
  }

  /**
   *
   * @returns {string}
   */
  getUrlForTooltip() {
    const tabUrl = this.getTabUrl();
    const url = this.isTitleDynamic() && tabUrl ? tabUrl : this.#settings.url;
    const fullUrlSetting =
      SidebarControllers.sidebarController.getWebPanelTooltipFullUrl();
    return fullUrlSetting ? clearUrl(url) : extractHostname(url);
  }

  setURL(value) {
    this.#settings.url = value;
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
        SidebarElements.webPanelsBrowser.selectWebPanelTab(this.#tab);
      }
    }

    this.#button.setUserContextId(userContextId);
  }

  getTabTitle() {
    return this.#tab?.linkedBrowser?.getTitle();
  }

  isTitleDynamic() {
    return this.#settings.dynamicTitle;
  }

  getTitle() {
    return this.isTitleDynamic() ? this.getTabTitle() : this.#settings.title;
  }

  setTitle(dynamicTitle, title) {
    this.#settings.dynamicTitle = dynamicTitle;
    this.#settings.title = title;
  }

  getFaviconURL() {
    return this.#settings.faviconURL;
  }

  setFaviconURL(dynamicFavicon, faviconURL) {
    this.#settings.dynamicFavicon = dynamicFavicon;
    this.#settings.faviconURL = faviconURL;
  }

  updateFavicon() {
    let image = this.#settings.dynamicFavicon
      ? this.#tab.image
      : this.#settings.faviconURL;
    if (!image || image.length === 0) image = FALLBACK_ICON;
    const busy = this.#tab.getAttributeBool("busy");
    const progress = this.#tab.getAttributeBool("progress");
    if (busy || progress) {
      this.#button.setLoading(true).setIcon("");
    } else {
      this.#button.setLoading(false).setIcon(image);
    }
  }

  isActive() {
    return this.#tab && this.#tab.selected;
  }

  updateTitle() {
    if (this.isActive()) {
      SidebarControllers.sidebarController.updateToolbar(this);
    }
    const title = this.getTabTitle();
    const notifications = parseNotifications(title);
    this.#button.setNotificationBadge(notifications);
  }

  updateSoundIcon() {
    const soundplaying = this.#tab.getAttributeBool("soundplaying");
    const muted = this.#tab.getAttributeBool("muted");
    this.#button.setSoundIcon(soundplaying, muted);
  }

  /**
   *
   * @param {object} params
   * @param {boolean} params.forceOpen
   */
  switchWebPanel({ forceOpen = false } = {}) {
    const activeTab = SidebarElements.webPanelsBrowser.getActiveWebPanelTab();

    if (activeTab.uuid === this.getUUID() && !forceOpen) {
      // Select empty web panel tab
      SidebarElements.webPanelsBrowser.deselectWebPanelTab();
    } else {
      // Create web panel tab if it was not loaded yet
      if (this.isUnloaded()) {
        this.load();
      }
      // Select web panel tab
      SidebarElements.webPanelsBrowser.selectWebPanelTab(this.#tab);
    }
  }

  open() {
    // Configure web panel and button
    this.#button.setOpen(true).setUnloaded(false);
    this.setZoom(this.#settings.zoom);

    // Open sidebar if it was closed and configure
    SidebarControllers.sidebarController.open();
  }

  close() {
    if (this.#settings.temporary) {
      this.remove();
      SidebarControllers.webPanelsController.delete(this.getUUID());
      SidebarControllers.webPanelsController.saveSettings();
    } else {
      this.#button.setOpen(false);
      if (this.#settings.unloadOnClose) {
        this.unload();
      }
    }
  }

  load() {
    this.#tab = SidebarElements.webPanelsBrowser.addWebPanelTab(
      this.#settings,
      this.#progressListener,
    );
    this.#tab.addTabCloseListener(() => this.unload(false));
    this.#tab.addTabAttrModifiedListener(
      (soundplaying, muted, image, busy, progress, label) => {
        if (soundplaying || muted) this.updateSoundIcon();
        if (image || busy || progress) this.updateFavicon();
        if (label) this.updateTitle();
      },
    );
    this.#button.setUnloaded(false);
    this.#startTimer();

    const url = this.#settings.loadLastUrl
      ? (this.#state?.lastUrl ?? this.#settings.url)
      : this.#settings.url;
    this.go(url);
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
      SidebarElements.webPanelsBrowser.deselectWebPanelTab();
    }

    if (this.#tab && force) {
      SidebarElements.webPanelsBrowser.removeWebPanelTab(this.#tab);
    }

    this.#button
      .setSoundIcon(false, false)
      .setNotificationBadge(0)
      .setOpen(false)
      .setUnloaded(true);

    if (this.#button.getLoading()) {
      fetchIconURL(this.#settings.url).then((faviconUrl) => {
        this.#button.setLoading(false).setIcon(faviconUrl);
      });
    }

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

  isUnloaded() {
    return this.#tab === null;
  }

  reload() {
    this.#tab.linkedBrowser.reload();
  }

  canGoBack() {
    return this.#tab.linkedBrowser.canGoBack();
  }

  canGoForward() {
    return this.#tab.linkedBrowser.canGoForward();
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

  setTemporary(value) {
    this.#settings.temporary = value;
    this.#button.setAttribute("temporary", value);
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
      this.reload();
    }
  }

  getAlwaysOnTop() {
    return this.#settings.alwaysOnTop;
  }

  setAlwaysOnTop(value) {
    this.#settings.alwaysOnTop = value;
  }

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

  setZoom(zoom) {
    this.#settings.zoom = zoom;
    this.#tab?.linkedBrowser?.setZoom(zoom);
  }

  resetZoom() {
    this.setZoom(DEFAULT_ZOOM);
  }

  setLoadOnStartup(value) {
    this.#settings.loadOnStartup = value;
  }

  setLoadLastUrl(value) {
    this.#settings.loadLastUrl = value;
  }

  getUnloadOnClose() {
    return this.#settings.unloadOnClose;
  }

  setUnloadOnClose(value) {
    this.#settings.unloadOnClose = value;
  }

  getShortcut() {
    return this.#settings.shortcut;
  }

  setShortcut(value) {
    this.#settings.shortcut = value;
  }

  getHideToolbar() {
    return this.#settings.hideToolbar;
  }

  setHideToolbar(value) {
    this.#settings.hideToolbar = value;
  }

  setHideSoundIcon(value) {
    this.#settings.hideSoundIcon = value;
    this.#button.hideSoundIcon(value);
  }

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
  setPinnedWidth(width) {
    this.#settings.floatingGeometry.width = `${width}px`;
  }

  getAnchor() {
    return this.#settings.floatingGeometry.anchor;
  }

  setAnchor(anchor) {
    this.#settings.floatingGeometry.anchor = anchor;
  }

  getOffsetXType() {
    return this.#settings.floatingGeometry.offsetXType;
  }

  setOffsetXType(offsetXType) {
    this.#settings.floatingGeometry.offsetXType = offsetXType;
  }

  getOffsetYType() {
    return this.#settings.floatingGeometry.offsetYType;
  }

  setOffsetYType(offsetYType) {
    this.#settings.floatingGeometry.offsetYType = offsetYType;
  }

  getWidthType() {
    return this.#settings.floatingGeometry.widthType;
  }

  setWidthType(widthType) {
    this.#settings.floatingGeometry.widthType = widthType;
  }

  getHeightType() {
    return this.#settings.floatingGeometry.heightType;
  }

  setHeightType(heightType) {
    this.#settings.floatingGeometry.heightType = heightType;
  }

  getSelectorEnabled() {
    return this.#settings.selectorEnabled;
  }

  setSelectorEnabled(value) {
    this.#settings.selectorEnabled = value;
  }

  getSelector() {
    return this.#settings.selector;
  }

  setSelector(selector) {
    this.#settings.selector = selector;
  }

  getFloatingGeometry() {
    return this.#settings.floatingGeometry;
  }

  setFloatingGeometry(geometry) {
    this.#settings.floatingGeometry = geometry;
  }

  getPinnedGeometry() {
    return this.#settings.pinnedGeometry;
  }

  setPinnedGeometry(width) {
    this.#settings.pinnedGeometry.width = width;
  }

  pinned() {
    return this.#settings.pinned;
  }

  pin() {
    this.#settings.pinned = true;
  }

  unpin() {
    this.#settings.pinned = false;
  }

  go(url) {
    this.#tab.linkedBrowser.go(url);
  }

  isMuted() {
    return this.#tab.muted;
  }

  toggleMuteAudio() {
    this.#tab.toggleMuteAudio();
  }

  remove() {
    if (this.#tab) {
      SidebarElements.webPanelsBrowser.removeWebPanelTab(this.#tab);
    }
    this.#button.remove();
  }

  /**
   *
   * @returns {WebPanelSettings}
   */
  dumpSettings() {
    return WebPanelSettings.fromObject(
      SidebarElements.sidebarWrapper.getPosition(),
      SidebarControllers.sidebarGeometry.getDefaultFloatingOffsetCSS(),
      this.#settings.toObject(),
    );
  }

  dumpState() {
    return WebPanelState.fromObject(this.#state.toObject());
  }

  #log(message) {
    console.log(`Web panel ${this.getUUID()}:`, message);
  }
}
