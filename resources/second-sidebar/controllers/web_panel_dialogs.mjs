// Consolidated module — merged from the former controllers/*.mjs files.
import { WebPanelEvents, sendEvents } from "./events.mjs";
import { SidebarElements } from "../sidebar_elements.mjs";
import { WindowWrapper } from "../wrappers/window.mjs";
import { isLeftMouseButton } from "../utils/buttons.mjs";
import { SidebarControllers } from "../sidebar_controllers.mjs";
import { WebPanelController } from "./web_panel.mjs";
import { OPEN_URL_IN, openTrustedLinkInWrapper, ClipboardHelperWrapper } from "../wrappers/services.mjs";

export class WebPanelNewController {
  constructor() {
    SidebarElements.webPanelNewButton.addEventListener("click", (event) => {
      event.stopPropagation();
      if (isLeftMouseButton(event)) {
        this.openPopup();
      }
    });

    SidebarElements.webPanelPopupNew.listenSaveButtonClick(
      async (url, userContextId, temporary) => {
        this.createWebPanel(url, userContextId, temporary);
        this.hidePopup();
      },
    );

    SidebarElements.webPanelPopupNew.listenCancelButtonClick(() => {
      this.hidePopup();
    });
  }

  /**
   *
   * @param {string} url
   * @param {number} userContextId
   * @param {boolean} temporary
   */
  createWebPanel(url, userContextId, temporary) {
    const uuid = crypto.randomUUID();
    sendEvents(WebPanelEvents.CREATE_WEB_PANEL, {
      uuid,
      url,
      userContextId,
      temporary,
      newWebPanelPosition: this.newWebPanelPosition,
    });
  }

  openPopup() {
    let suggest = "https://";
    const currentURI = new WindowWrapper().gBrowser.currentURI;

    if (["http", "https"].includes(currentURI.scheme)) {
      suggest = currentURI.spec;
    }

    SidebarElements.webPanelPopupNew.openPopup(
      SidebarElements.webPanelNewButton.button,
      suggest,
    );
  }

  hidePopup() {
    SidebarElements.webPanelPopupNew.hidePopup();
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

export class WebPanelDeleteController {
  constructor() {
    this.#setupListeners();
  }

  #setupListeners() {
    SidebarElements.webPanelPopupDelete.listenCancelButtonClick(() =>
      this.hidePopup(),
    );

    SidebarElements.webPanelPopupDelete.listenDeleteButtonClick((uuid) => {
      sendEvents(WebPanelEvents.DELETE_WEB_PANEL, { uuid });
      SidebarControllers.webPanelsController.saveSettings();
      this.hidePopup();
    });
  }

  /**
   *
   * @param {WebPanelController} webPanelController
   */
  openPopup(webPanelController) {
    SidebarElements.webPanelPopupDelete.openPopup(webPanelController);
  }

  hidePopup() {
    SidebarElements.webPanelPopupDelete.hidePopup();
  }
}

export class WebPanelMoreController {
  constructor() {
    this.#setupListeners();
  }

  #setupListeners() {
    SidebarElements.webPanelPopupMore.listenPopupShowing(() => {
      const webPanelController =
        SidebarControllers.webPanelsController.getActive();
      SidebarElements.webPanelPopupMore.setDefaults(
        webPanelController.dumpSettings(),
      );
    });

    SidebarElements.webPanelPopupMore.listenOpenInNewTabButtonClick(
      (event, uuid) => {
        const webPanelController =
          SidebarControllers.webPanelsController.get(uuid);
        openTrustedLinkInWrapper(
          webPanelController.getTabUrl(),
          event.ctrlKey ? OPEN_URL_IN.BACKGROUND_TAB : OPEN_URL_IN.TAB,
        );
      },
    );

    SidebarElements.webPanelPopupMore.listenCopyPageUrlButtonClick((uuid) => {
      const webPanelController =
        SidebarControllers.webPanelsController.get(uuid);
      ClipboardHelperWrapper.copyString(webPanelController.getTabUrl());
    });

    SidebarElements.webPanelPopupMore.listenMobileButtonClick(
      (uuid, mobile) => {
        sendEvents(WebPanelEvents.EDIT_WEB_PANEL_MOBILE, {
          uuid,
          mobile,
        });
        SidebarControllers.webPanelsController.saveSettings();
      },
    );

    SidebarElements.webPanelPopupMore.listenTemporaryButtonClick(
      (uuid, temporary) => {
        const webPanelController =
          SidebarControllers.webPanelsController.get(uuid);
        webPanelController.setTemporary(temporary);
        SidebarControllers.webPanelsController.saveSettings();
      },
    );

    SidebarElements.webPanelPopupMore.listenAlwaysOnTopButtonClick(
      (uuid, alwaysOnTop) => {
        sendEvents(WebPanelEvents.EDIT_WEB_PANEL_ALWAYS_ON_TOP, {
          uuid,
          alwaysOnTop,
        });
        SidebarControllers.webPanelsController.saveSettings();
      },
    );

    SidebarElements.webPanelPopupMore.listenZoomOutButtonClick((uuid) => {
      sendEvents(WebPanelEvents.EDIT_WEB_PANEL_ZOOM_OUT, {
        uuid,
      });
      SidebarControllers.webPanelsController.saveSettings();

      const webPanelController =
        SidebarControllers.webPanelsController.get(uuid);
      return webPanelController.getZoom();
    });

    SidebarElements.webPanelPopupMore.listenZoomInButtonClick((uuid) => {
      sendEvents(WebPanelEvents.EDIT_WEB_PANEL_ZOOM_IN, {
        uuid,
      });
      SidebarControllers.webPanelsController.saveSettings();

      const webPanelController =
        SidebarControllers.webPanelsController.get(uuid);
      return webPanelController.getZoom();
    });

    SidebarElements.webPanelPopupMore.listenResetZoomButtonClick((uuid) => {
      sendEvents(WebPanelEvents.EDIT_WEB_PANEL_ZOOM, {
        uuid,
        value: 1,
      });
      SidebarControllers.webPanelsController.saveSettings();

      const webPanelController =
        SidebarControllers.webPanelsController.get(uuid);
      return webPanelController.getZoom();
    });
  }
}

export class WebPanelEditController {
  constructor() {
    this.#setupListeners();
  }

  #setupListeners() {
    SidebarElements.webPanelPopupEdit.listenChanges({
      url: (uuid, url, timeout = 0) => {
        sendEvents(WebPanelEvents.EDIT_WEB_PANEL_URL, {
          uuid,
          url,
          timeout,
        });
      },
      title: (uuid, dynamicTitle, title) => {
        sendEvents(WebPanelEvents.EDIT_WEB_PANEL_TITLE, {
          uuid,
          dynamicTitle,
          title,
        });
      },
      faviconURL: (uuid, dynamicFavicon, faviconURL, timeout = 0) => {
        sendEvents(WebPanelEvents.EDIT_WEB_PANEL_FAVICON_URL, {
          uuid,
          dynamicFavicon,
          faviconURL,
          timeout,
        });
      },
      selectorEnabled: (uuid, selectorEnabled, timeout = 0) => {
        sendEvents(WebPanelEvents.EDIT_WEB_PANEL_SELECTOR_ENABLED, {
          uuid,
          selectorEnabled,
          timeout,
        });
      },
      selector: (uuid, selector, timeout = 0) => {
        sendEvents(WebPanelEvents.EDIT_WEB_PANEL_SELECTOR, {
          uuid,
          selector,
          timeout,
        });
      },
      alwaysOnTop: (uuid, alwaysOnTop) => {
        sendEvents(WebPanelEvents.EDIT_WEB_PANEL_ALWAYS_ON_TOP, {
          uuid,
          alwaysOnTop,
        });
      },
      pinned: (uuid, pinned) => {
        sendEvents(WebPanelEvents.EDIT_WEB_PANEL_PINNED, {
          uuid,
          pinned,
        });
      },
      anchor: (uuid, anchor) => {
        sendEvents(WebPanelEvents.EDIT_WEB_PANEL_ANCHOR, {
          uuid,
          anchor,
        });
      },
      offsetXType: (uuid, offsetXType) => {
        sendEvents(WebPanelEvents.EDIT_WEB_PANEL_OFFSET_X_TYPE, {
          uuid,
          offsetXType,
        });
      },
      offsetYType: (uuid, offsetYType) => {
        sendEvents(WebPanelEvents.EDIT_WEB_PANEL_OFFSET_Y_TYPE, {
          uuid,
          offsetYType,
        });
      },
      widthType: (uuid, widthType) => {
        sendEvents(WebPanelEvents.EDIT_WEB_PANEL_WIDTH_TYPE, {
          uuid,
          widthType,
        });
      },
      heightType: (uuid, heightType) => {
        sendEvents(WebPanelEvents.EDIT_WEB_PANEL_HEIGHT_TYPE, {
          uuid,
          heightType,
        });
      },
      userContextId: (uuid, userContextId) => {
        sendEvents(WebPanelEvents.EDIT_WEB_PANEL_USER_CONTEXT_ID, {
          uuid,
          userContextId,
        });
      },
      temporary: (uuid, temporary) => {
        const webPanelController =
          SidebarControllers.webPanelsController.get(uuid);
        webPanelController.setTemporary(temporary);
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
      loadLastUrl: (uuid, loadLastUrl) => {
        sendEvents(WebPanelEvents.EDIT_WEB_PANEL_LOAD_LAST_URL, {
          uuid,
          loadLastUrl,
        });
      },
      unloadOnClose: (uuid, unloadOnClose) => {
        sendEvents(WebPanelEvents.EDIT_WEB_PANEL_UNLOAD_ON_CLOSE, {
          uuid,
          unloadOnClose,
        });
      },
      shortcut: (uuid, shortcut) => {
        sendEvents(WebPanelEvents.EDIT_WEB_PANEL_SHORTCUT, {
          uuid,
          shortcut,
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

    SidebarElements.webPanelPopupEdit.listenCancelButtonClick(() =>
      this.hidePopup(),
    );

    SidebarElements.webPanelPopupEdit.listenSaveButtonClick(() => {
      SidebarControllers.webPanelsController.saveSettings();
      this.hidePopup();
    });
  }

  /**
   *
   * @param {WebPanelController} webPanelController
   */
  openPopup(webPanelController) {
    SidebarElements.webPanelPopupEdit.openPopup(webPanelController);
  }

  hidePopup() {
    SidebarElements.webPanelPopupEdit.hidePopup();
  }
}

export class WebPanelTooltipController {
  /**
   *
   * @param {WebPanelController} webPanelController
   */
  openPopup(webPanelController) {
    const tooltip = SidebarElements.webPanelTooltip;
    const title = webPanelController.getTitle();
    const url = webPanelController.getUrlForTooltip();

    SidebarElements.webPanelTooltip.setTitle(title).setUrl(url).hideContent();

    const tooltipSetting =
      SidebarControllers.sidebarController.getWebPanelTooltip();
    if (tooltipSetting === "title" && title) {
      tooltip.showTitle().show();
    } else if (tooltipSetting === "url") {
      tooltip.showUrl().show();
    } else if (tooltipSetting === "titleandurl") {
      tooltip.showTitle().showUrl().show();
    } else {
      tooltip.hide();
    }
    SidebarElements.webPanelTooltip.openPopup(webPanelController.button.button);
  }

  hidePopup() {
    SidebarElements.webPanelTooltip.hidePopup();
  }
}
