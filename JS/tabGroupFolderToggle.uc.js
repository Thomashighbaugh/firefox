// ==UserScript==
// @name           Tab Group Folder Toggle
// @description    Adds a "Switch to Folder/Group" button to Firefox's native tab-group editor panel and persists the mode per group.
// @include        main
// @author         Higgs Boson (adapted from Better Advanced Tab Groups)
// @version        1.0.0
// @homepageURL    https://github.com/ThomasLeonHighbaugh/higgs-boson-firefox-theme
// ==/UserScript==

(function () {
  "use strict";

  const PREF_NAME = "userChrome.tabGroup.folderToggle.states";
  const TOGGLE_BUTTON_ID = "tab-group-folder-toggle-button";
  const INIT_ATTR = "data-tab-group-folder-toggle-initialized";
  const TEMP_EXPAND_ATTR = "data-temp-expanded";

  /**
   * Static CSS for tab-group folder/group modes. This is intentionally
   * conservative: it only styles the group label and gives folder mode a folder
   * icon pseudo-element. It does NOT override display, overflow, or dimensions
   * on the native tab-group element because doing so causes reflow hangs when
   * the tab-group editor popup opens. Theme values are left as custom
   * properties so CSS/chrome/tabs.css can override them if theme variables
   * change.
   */
  const EMBEDDED_CSS = `
    tab-group[groups="1"] .tab-group-label-container {
      border-radius: calc(var(--firefoxcss-border-radius) + 2px) !important;
      transition: background-color 0.2s ease;
    }

    tab-group[groups="1"] .tab-group-label-container:hover {
      background-color: var(--firefoxcss-tab-hover-bg-color) !important;
    }

    tab-group[groups="1"] .tab-group-label-container > label {
      position: relative !important;
      max-width: 100% !important;
      padding-top: 5px !important;
      padding-bottom: 6px !important;
      padding-inline: 0.9em 0.9em !important;
      padding-left: 29px !important;
      background: transparent !important;
      border: unset !important;
      font-weight: 600 !important;
      text-align: unset !important;
      color: var(--firefoxcss-non-active-tabs) !important;
    }

    tab-group[groups="1"] .tab-group-label-container > label::before {
      content: "" !important;
      position: absolute !important;
      left: 5px !important;
      top: 50%;
      transform: translateY(-50%);
      width: 19px !important;
      height: 19px !important;
      background-color: var(--toolbarbutton-icon-fill) !important;
      mask-size: contain;
      mask-repeat: no-repeat;
      background-size: contain !important;
      background-repeat: no-repeat !important;
      pointer-events: none !important;
    }

    @media -moz-pref("sidebar.verticalTabs") {
      tab-group[groups="1"] .tabbrowser-tab {
        border-left: 2px solid var(--firefoxcss-tab-group-range-line) !important;
      }
    }

    tab-group[groups="1"][collapsed] .tab-group-label-container > label::before {
      transform: translateY(-50%) !important;
    }

    tab-group[groups="2"] .tab-group-label-container > label {
      max-width: min-content !important;
      padding-left: 10px !important;
      padding-top: 5px !important;
      padding-bottom: 6px !important;
      padding-inline: 0.9em 0.9em !important;
      background: transparent !important;
      border: unset !important;
      font-weight: 600 !important;
      text-align: unset !important;
      color: var(--firefoxcss-non-active-tabs) !important;
    }
  `;

  /**
   * TabGroupFolderToggle enhances native Firefox tab groups with a folder/group
   * mode toggle inside the tab-group editor panel.
   *
   * Default behavior:
   * - Tab groups are folders (`groups="1"`, `collapsed`) by default.
   * - Clicking or pressing Enter/Space on a collapsed folder temporarily expands
   *   it to show all tabs (loaded and unloaded).
   * - The next click anywhere, tab selection, or Esc press restores the folder
   *   to its collapsed state.
   * - The editor-panel toggle button switches between persistent folder mode and
   *   persistent expanded group mode (`groups="2"`), saving the choice per group
   *   in about:config via Services.prefs.
   */
  class TabGroupFolderToggle {
    constructor() {
      this.activeTabGroup = null;
      this.states = this.#loadStates();
      this.observers = [];
      this.registeredSheet = null;
      this.tempExpandedGroup = null;
      this.init();
    }

    /* ===== State persistence via Services.prefs ===== */
    #loadStates() {
      try {
        const raw = Services.prefs.getStringPref(PREF_NAME, "{}");
        return JSON.parse(raw);
      } catch (error) {
        console.error("[TabGroupFolderToggle] Failed to load states:", error);
        return {};
      }
    }

    #saveStates() {
      try {
        Services.prefs.setStringPref(PREF_NAME, JSON.stringify(this.states));
      } catch (error) {
        console.error("[TabGroupFolderToggle] Failed to save states:", error);
      }
    }

    /* ===== Public init ===== */
    init() {
      if (document.body.hasAttribute(INIT_ATTR)) return;
      this.#registerStylesheet();
      this.#applySavedStates();
      this.#injectToggleButton();
      this.#observePanelChanges();
      this.#addContextMenuHandler();
      this.#installTempExpandListeners();
      document.body.setAttribute(INIT_ATTR, "true");
    }

    #registerStylesheet() {
      const sss = Components.classes["@mozilla.org/content/style-sheet-service;1"]
        .getService(Components.interfaces.nsIStyleSheetService);
      const uri = Services.io.newURI(
        "data:text/css;charset=utf-8," + encodeURIComponent(EMBEDDED_CSS),
        null,
        null,
      );
      if (sss.sheetRegistered(uri, sss.AGENT_SHEET)) return;
      sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);
      this.registeredSheet = uri;
    }

    #unregisterStylesheet() {
      if (!this.registeredSheet) return;
      const sss = Components.classes["@mozilla.org/content/style-sheet-service;1"]
        .getService(Components.interfaces.nsIStyleSheetService);
      try {
        if (sss.sheetRegistered(this.registeredSheet, sss.AGENT_SHEET)) {
          sss.unregisterSheet(this.registeredSheet, sss.AGENT_SHEET);
        }
      } catch (error) {
        console.error("[TabGroupFolderToggle] Failed to unregister stylesheet:", error);
      }
      this.registeredSheet = null;
    }

    /* ===== Apply persisted folder/group modes =====
       Default new groups to folder mode (1). Groups explicitly saved as group
       mode (2) stay expanded. */
    #applySavedStates() {
      document.querySelectorAll("tab-group").forEach((tabGroup) => {
        const id = tabGroup.id;
        if (!id) return;

        if (this.states[id] === undefined) {
          this.states[id] = 1;
          this.#saveStates();
        }

        if (!tabGroup.hasAttribute("groups")) {
          const state = this.states[id] === 1 ? "1" : "2";
          tabGroup.setAttribute("groups", state);
        }

        if (this.states[id] === 1 && !tabGroup.hasAttribute("collapsed")) {
          tabGroup.setAttribute("collapsed", "true");
        }
      });
    }

    /* ===== Inject toggle button into the tab-group editor panel ===== */
    #injectToggleButton() {
      const anchor = document.getElementById("tabGroupEditor_ungroupTabs");
      if (!anchor || document.getElementById(TOGGLE_BUTTON_ID)) return;

      const button = document.createXULElement("button");
      button.id = TOGGLE_BUTTON_ID;
      button.className = "subviewbutton";
      button.setAttribute("flex", "1");
      button.style.cssText = `
        order: 2;
        display: block;
        font-size: 12px;
        font-weight: 400;
        color: inherit;
        background: none;
        border: none;
        padding: 6px 0 6px 40px;
        text-align: left;
        width: 100%;
        min-height: 36px;
        cursor: pointer;
        line-height: 20px;
        border-radius: var(--arrowpanel-menuitem-border-radius, 4px);
      `;

      this.#updateButtonLabel(button);

      button.addEventListener("mouseenter", () => {
        button.style.backgroundColor = "var(--panel-item-hover-bgcolor, hsla(0, 0%, 60%, 0.25))";
      });
      button.addEventListener("mouseleave", () => {
        button.style.backgroundColor = "transparent";
      });

      button.addEventListener("click", () => this.#onToggleClick(button));

      anchor.parentNode.insertBefore(button, anchor.nextSibling);
    }

    #onToggleClick(button) {
      const tabGroup = this.activeTabGroup;
      if (!tabGroup) {
        console.warn("[TabGroupFolderToggle] No active tab group found to toggle.");
        return;
      }

      const currentGroups = tabGroup.getAttribute("groups") === "2";
      const newState = currentGroups ? "1" : "2";
      tabGroup.setAttribute("groups", newState);

      if (newState === "1") {
        tabGroup.setAttribute("collapsed", "true");
        tabGroup.removeAttribute(TEMP_EXPAND_ATTR);
        this.tempExpandedGroup = null;
      } else {
        tabGroup.removeAttribute("collapsed");
      }

      this.states[tabGroup.id] = parseInt(newState, 10);
      this.#saveStates();
      this.#updateButtonLabel(button);
    }

    #updateButtonLabel(button) {
      const tabGroup = this.activeTabGroup;
      const isGroup = tabGroup ? tabGroup.getAttribute("groups") === "2" : true;
      button.textContent = isGroup ? "Switch to Folder" : "Switch to Group";
    }

    /* ===== Observe the editor panel and re-inject button when rebuilt =====
       We observe the *popup* containing the panel, not the panel itself, and
       only act when the popup becomes visible. This avoids running on every
       internal DOM mutation inside the editor (which previously caused hangs). */
    #observePanelChanges() {
      const panel = document.querySelector(".tab-group-editor-panel");
      if (!panel) return;

      const popup = panel.closest("panel, menupopup, popup");
      if (!popup) return;

      const showHandler = () => {
        this.#injectToggleButton();
        if (this.activeTabGroup) {
          const button = document.getElementById(TOGGLE_BUTTON_ID);
          if (button) this.#updateButtonLabel(button);
        }
      };

      popup.addEventListener("popupshown", showHandler, false);
      this._popupShowHandler = { popup, showHandler };
    }

    /* ===== Capture right-click on tab groups and initialize state ===== */
    /* ===== Track active tab group when editor panel opens ===== */
    #addContextMenuHandler() {
      const contextHandler = (event) => {
        const tabGroup = event.target.closest("tab-group");
        if (!tabGroup) return;
        this.#setActiveTabGroup(tabGroup);
      };

      document.addEventListener("contextmenu", contextHandler, false);
      this._contextMenuHandler = contextHandler;

      /* The built-in tab-group "Manage groups" popup opens from a toolbar
         button; track the active group via popupshown events on the editor. */
      const popupHandler = () => {
        const panel = document.querySelector(".tab-group-editor-panel");
        if (!panel) return;
        const groupId = panel.getAttribute("data-group");
        if (!groupId) return;
        const tabGroup = document.getElementById(groupId);
        if (tabGroup) this.#setActiveTabGroup(tabGroup);
      };

      /* The global popupshown listener is intentionally lightweight: it only
         queries the editor panel. The heavy work is done on the specific popup
         via #observePanelChanges. */
      document.addEventListener("popupshown", popupHandler, false);
      this._popupHandler = popupHandler;
    }

    #setActiveTabGroup(tabGroup) {
      this.activeTabGroup = tabGroup;

      const id = tabGroup.id;
      if (id) {
        if (this.states[id] === undefined) {
          this.states[id] = 1;
          this.#saveStates();
        }
        if (!tabGroup.hasAttribute("groups")) {
          tabGroup.setAttribute("groups", this.states[id] === 1 ? "1" : "2");
        }
      }

      if (
        tabGroup.getAttribute("groups") === "1" &&
        !tabGroup.hasAttribute("collapsed")
      ) {
        tabGroup.setAttribute("collapsed", "true");
      }

      const button = document.getElementById(TOGGLE_BUTTON_ID);
      if (button) this.#updateButtonLabel(button);
    }

    /* ===== Temporary expand/collapse for folder-mode groups ===== */
    #installTempExpandListeners() {
      const clickHandler = (event) => {
        const tabGroup = event.target.closest("tab-group[groups='1']");

        /* If we have a temporarily expanded group and the user clicked outside
           it, collapse it. */
        if (this.tempExpandedGroup && this.tempExpandedGroup !== tabGroup) {
          this.#collapseTempGroup();
          return;
        }

        if (!tabGroup) return;

        /* If the click was on a tab, collapse after selecting it. */
        const tab = event.target.closest("tab");
        if (tab) {
          this.#scheduleCollapse();
          return;
        }

        /* Toggle temporary expand on the folder label/container. */
        if (tabGroup.hasAttribute("collapsed")) {
          this.#tempExpandGroup(tabGroup);
        } else if (tabGroup.hasAttribute(TEMP_EXPAND_ATTR)) {
          this.#collapseTempGroup();
        }
      };

      const keyHandler = (event) => {
        if (!this.tempExpandedGroup) return;
        if (event.key === "Escape") {
          this.#collapseTempGroup();
          return;
        }
        if (event.key === "Enter" || event.key === " ") {
          const activeElement = document.activeElement;
          if (activeElement?.closest("tab-group") === this.tempExpandedGroup) {
            this.#scheduleCollapse();
          }
        }
      };

      const tabContainer = document.getElementById("tabbrowser-tabs");
      if (tabContainer) {
        tabContainer.addEventListener("click", clickHandler, false);
        document.addEventListener("keydown", keyHandler, false);

        this._tempExpandClickHandler = clickHandler;
        this._tempExpandKeyHandler = keyHandler;
      }
    }

    #tempExpandGroup(tabGroup) {
      this.tempExpandedGroup = tabGroup;
      tabGroup.setAttribute(TEMP_EXPAND_ATTR, "true");
      tabGroup.removeAttribute("collapsed");
    }

    #collapseTempGroup() {
      const tabGroup = this.tempExpandedGroup;
      if (!tabGroup) return;
      tabGroup.setAttribute("collapsed", "true");
      tabGroup.removeAttribute(TEMP_EXPAND_ATTR);
      this.tempExpandedGroup = null;
    }

    #scheduleCollapse() {
      if (!this.tempExpandedGroup) return;
      requestAnimationFrame(() => {
        /* Give Firefox time to process the tab selection before collapsing. */
        setTimeout(() => this.#collapseTempGroup(), 50);
      });
    }

    /* ===== Cleanup on window unload ===== */
    destroy() {
      this.observers.forEach((obs) => obs.disconnect());
      this.observers = [];
      if (this._contextMenuHandler) {
        document.removeEventListener("contextmenu", this._contextMenuHandler, false);
      }
      if (this._popupHandler) {
        document.removeEventListener("popupshown", this._popupHandler, false);
      }
      if (this._popupShowHandler) {
        const { popup, showHandler } = this._popupShowHandler;
        popup.removeEventListener("popupshown", showHandler, false);
        this._popupShowHandler = null;
      }
      if (this._tempExpandClickHandler) {
        const tabContainer = document.getElementById("tabbrowser-tabs");
        if (tabContainer) {
          tabContainer.removeEventListener("click", this._tempExpandClickHandler, false);
        }
      }
      if (this._tempExpandKeyHandler) {
        document.removeEventListener("keydown", this._tempExpandKeyHandler, false);
      }
      const button = document.getElementById(TOGGLE_BUTTON_ID);
      if (button) button.remove();
      this.#unregisterStylesheet();
      document.body.removeAttribute(INIT_ATTR);
    }
  }

  /* ===== Bootstrap ===== */
  function initWhenReady() {
    if (!document.getElementById("tabbrowser-tabs")) {
      requestAnimationFrame(initWhenReady);
      return;
    }
    window.tabGroupFolderToggle = new TabGroupFolderToggle();
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    initWhenReady();
  } else {
    document.addEventListener("DOMContentLoaded", initWhenReady, { once: true });
  }

  window.addEventListener(
    "unload",
    () => {
      if (window.tabGroupFolderToggle) {
        window.tabGroupFolderToggle.destroy();
        delete window.tabGroupFolderToggle;
      }
    },
    { once: true },
  );
})();
