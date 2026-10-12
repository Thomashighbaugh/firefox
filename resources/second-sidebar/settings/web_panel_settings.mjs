// Consolidated module — merged from the former settings/*.mjs files.
import { ScriptSecurityManagerWrapper } from "../wrappers/services.mjs";

export class FloatingWebPanelGeometrySettings {
  /**
   *
   * @param {string} sidebarPosition
   * @param {string} defaultFloatingOffsetCSS
   * @param {object} params
   * @param {string} params.anchor
   * @param {string} params.offsetXType
   * @param {string} params.offsetYType
   * @param {string} params.widthType
   * @param {string} params.heightType
   * @param {string} params.top
   * @param {string} params.left
   * @param {string} params.right
   * @param {string} params.bottom
   * @param {string} params.width
   * @param {string} params.height
   * @param {string} params.margin
   */
  constructor(
    sidebarPosition,
    defaultFloatingOffsetCSS,
    {
      anchor = "default",
      offsetXType = "absolute",
      offsetYType = "absolute",
      widthType = "absolute",
      heightType = "relative",
      top = defaultFloatingOffsetCSS,
      left = sidebarPosition === "left" ? defaultFloatingOffsetCSS : "unset",
      right = sidebarPosition === "right" ? defaultFloatingOffsetCSS : "unset",
      bottom = "unset",
      width = "600px",
      height = this.makeDefaultHeight(defaultFloatingOffsetCSS),
      margin = "unset",
    } = {},
  ) {
    this.anchor = anchor;
    this.offsetXType = offsetXType;
    this.offsetYType = offsetYType;
    this.widthType = widthType;
    this.heightType = heightType;
    this.top = top;
    this.left = left;
    this.right = right;
    this.bottom = bottom;
    this.width = width;
    this.height = height;
    this.margin = margin;
  }

  /**
   *
   * @param {string} sidebarPosition
   * @param {string} defaultFloatingOffsetCSS
   * @param {object} object
   * @returns {FloatingWebPanelGeometrySettings}
   */
  static fromObject(sidebarPosition, defaultFloatingOffsetCSS, object) {
    return new FloatingWebPanelGeometrySettings(
      sidebarPosition,
      defaultFloatingOffsetCSS,
      object,
    );
  }

  /**
   *
   * @returns {object}
   */
  toObject() {
    return {
      anchor: this.anchor,
      offsetXType: this.offsetXType,
      offsetYType: this.offsetYType,
      widthType: this.widthType,
      heightType: this.heightType,
      top: this.top,
      left: this.left,
      right: this.right,
      bottom: this.bottom,
      width: this.width,
      height: this.height,
      margin: this.margin,
    };
  }

  /**
   *
   * @param {string} offsetCSS
   * @returns {string}
   */
  makeDefaultHeight(offsetCSS) {
    return `calc(100% - ${offsetCSS} * 2)`;
  }
}

export class PinnedWebPanelGeometrySettings {
  /**
   *
   * @param {object} params
   * @param {string} params.width
   */
  constructor({ width = "600px" } = {}) {
    this.width = width;
  }

  /**
   *
   * @param {object} object
   * @returns {PinnedWebPanelGeometrySettings}
   */
  static fromObject(object) {
    return new PinnedWebPanelGeometrySettings(object);
  }

  /**
   *
   * @returns {object}
   */
  toObject() {
    return { width: this.width };
  }
}

export class WebPanelSettings {
  /**
   *
   * @param {string} sidebarPosition
   * @param {string} defaultFloatingOffsetCSS
   * @param {string} uuid
   * @param {string} url
   * @param {object} params
   * @param {boolean} params.dynamicTitle
   * @param {string} params.title
   * @param {boolean} params.dynamicFavicon
   * @param {string} params.faviconURL
   * @param {boolean} params.pinned
   * @param {boolean} params.alwaysOnTop
   * @param {boolean} params.mobile
   * @param {number} params.zoom
   * @param {boolean} params.loadLastUrl
   * @param {boolean} params.loadOnStartup
   * @param {boolean} params.unloadOnClose
   * @param {boolean} params.hideToolbar
   * @param {string} params.userContextId
   * @param {number} params.periodicReload
   * @param {boolean} params.hideSoundIcon
   * @param {boolean} params.hideNotificationBadge
   * @param {boolean} params.selectorEnabled
   * @param {string} params.selector
   * @param {FloatingWebPanelGeometrySettings} params.floatingGeometry
   * @param {PinnedWebPanelGeometrySettings} params.pinnedGeometry
   * @param {boolean} params.temporary
   * @param {string} params.shortcut
   */
  constructor(
    sidebarPosition,
    defaultFloatingOffsetCSS,
    uuid,
    url,
    {
      dynamicTitle = true,
      title = "",
      dynamicFavicon = true,
      faviconURL = "",
      pinned = false,
      alwaysOnTop = false,
      mobile = false,
      zoom = 1,
      loadOnStartup = true,
      loadLastUrl = false,
      unloadOnClose = false,
      hideToolbar = false,
      userContextId = ScriptSecurityManagerWrapper.DEFAULT_USER_CONTEXT_ID,
      periodicReload = 0,
      hideSoundIcon = false,
      hideNotificationBadge = false,
      selectorEnabled = false,
      selector = "",
      floatingGeometry = new FloatingWebPanelGeometrySettings(
        sidebarPosition,
        defaultFloatingOffsetCSS,
      ),
      pinnedGeometry = new PinnedWebPanelGeometrySettings(),
      temporary = false,
      shortcut = "",
    } = {},
  ) {
    this.uuid = uuid;
    this.url = url;
    this.dynamicTitle = dynamicTitle;
    this.title = title;
    this.dynamicFavicon = dynamicFavicon;
    this.faviconURL = faviconURL;
    this.pinned = pinned;
    this.alwaysOnTop = alwaysOnTop;
    this.mobile = mobile;
    this.zoom = zoom;
    this.loadOnStartup = loadOnStartup;
    this.loadLastUrl = loadLastUrl;
    this.unloadOnClose = unloadOnClose;
    this.hideToolbar = hideToolbar;
    this.userContextId = userContextId;
    this.periodicReload = periodicReload;
    this.hideSoundIcon = hideSoundIcon;
    this.hideNotificationBadge = hideNotificationBadge;
    this.selectorEnabled = selectorEnabled;
    this.selector = selector;
    this.floatingGeometry = floatingGeometry;
    this.pinnedGeometry = pinnedGeometry;
    this.temporary = temporary;
    this.shortcut = shortcut;
  }

  /**
   *
   * @param {string} sidebarPosition
   * @param {string} defaultFloatingOffsetCSS
   * @param {object} object
   * @returns {WebPanelSettings}
   */
  static fromObject(sidebarPosition, defaultFloatingOffsetCSS, object) {
    return new WebPanelSettings(
      sidebarPosition,
      defaultFloatingOffsetCSS,
      object.uuid,
      object.url,
      {
        dynamicTitle: object.dynamicTitle,
        title: object.title,
        dynamicFavicon: object.dynamicFavicon,
        faviconURL: object.faviconURL,
        pinned: object.pinned,
        alwaysOnTop: object.alwaysOnTop,
        mobile: object.mobile,
        zoom: object.zoom,
        loadOnStartup: object.loadOnStartup,
        loadLastUrl: object.loadLastUrl,
        unloadOnClose: object.unloadOnClose,
        hideToolbar: object.hideToolbar,
        userContextId: object.userContextId,
        periodicReload: object.periodicReload,
        hideSoundIcon: object.hideSoundIcon,
        hideNotificationBadge: object.hideNotificationBadge,
        selectorEnabled: object.selectorEnabled,
        selector: object.selector,
        floatingGeometry: FloatingWebPanelGeometrySettings.fromObject(
          sidebarPosition,
          defaultFloatingOffsetCSS,
          object.floatingGeometry,
        ),
        pinnedGeometry: PinnedWebPanelGeometrySettings.fromObject(
          object.pinnedGeometry,
        ),
        temporary: object.temporary,
        shortcut: object.shortcut,
      },
    );
  }

  /**
   *
   * @returns {object}
   */
  toObject() {
    return {
      uuid: this.uuid,
      url: this.url,
      dynamicTitle: this.dynamicTitle,
      title: this.title,
      dynamicFavicon: this.dynamicFavicon,
      faviconURL: this.faviconURL,
      pinned: this.pinned,
      alwaysOnTop: this.alwaysOnTop,
      mobile: this.mobile,
      zoom: this.zoom,
      loadOnStartup: this.loadOnStartup,
      loadLastUrl: this.loadLastUrl,
      unloadOnClose: this.unloadOnClose,
      hideToolbar: this.hideToolbar,
      userContextId: this.userContextId,
      periodicReload: this.periodicReload,
      hideSoundIcon: this.hideSoundIcon,
      hideNotificationBadge: this.hideNotificationBadge,
      selectorEnabled: this.selectorEnabled,
      selector: this.selector,
      floatingGeometry: this.floatingGeometry.toObject(),
      pinnedGeometry: this.pinnedGeometry.toObject(),
      temporary: this.temporary,
      shortcut: this.shortcut,
    };
  }
}
