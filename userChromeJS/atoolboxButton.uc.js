// ==UserScript==
// @name           Toolbox Button
// @version        1.2.3
// @author         aminomancer
// @homepage       https://github.com/aminomancer/uc.css.js
// @description    Adds a new toolbar button that 1) opens the content toolbox on left click; 2) opens the browser toolbox on right click; 3) toggles "Popup Auto-Hide" on middle click. Left click will open the toolbox for the active tab, or close it if it's already open. Right click will open the elevated browser toolbox if it's not already open. If it is already open, then instead of trying to start a new process and spawning an irritating dialog, it'll just show a brief notification saying the toolbox is already open. The button also shows a badge while a toolbox window is open. Middle click will toggle the preference for popup auto-hide: "ui.popup.disable_autohide". This does the same thing as the "Disable Popup Auto-Hide" option in the menu at the top right of the browser toolbox, prevents popups from closing so you can debug them. If you want to change which mouse buttons execute which functions, search for "userChrome.toolboxButton.mouseConfig" in about:config. Change the 0, 1, and 2 values. 0 = left click, 1 = middle, and 2 = right. By default, when you open a browser toolbox window, the script will disable popup auto-hide, and then re-enable it when you close the toolbox. I find that I usually want popup auto-hide disabled when I'm using the toolbox, and never want it disabled when I'm not using the toolbox, so I made it automatic, instead of having to right click and then immediately middle click every time. If you don't like this automatic feature, you can turn it off by setting "userChrome.toolboxButton.popupAutohide.toggle-on-toolbox-launch" to false in about:config. When you middle click, the button will show a notification telling you the current status of popup auto-hide, e.g. "Holding popups open." This is just so that people who use the feature a lot won't lose track of whether it's on or off, and won't need to open a popup and try to close it to test it. (The toolbar button also changes appearance while popup auto-hide is disabled. It becomes blue like the downloads button and the icon changes into a popup icon. This change is animated, as long as the user doesn't have reduced motion enabled) All of these notifications use the native confirmation hint custom element, since it looks nice. That's the one that appears when you save a bookmark, #confirmation-hint. So you can customize them with that selector.
// ==/UserScript==

// Modify these strings for easy localization. I tried to use built-in strings for this so it would automatically localize itself, but I found that every reference to the "Browser Toolbox" throughout the entire firefox UI is derived from a single message in a single localization file, which doesn't follow the standard format. It can only be parsed by the devtools' own special l10n module, which itself can only be imported by a CJS module. Requiring CJS just for a button seems ridiculous, plus there really aren't any localized strings that work for these confirmation messages anyway, or even the tooltip. So if your UI language isn't English you can modify all the strings created by this script in the following object:
const toolboxButtonL10n = {
    alreadyOpenMsg: "Browser Toolbox is already open.", // Confirmation hint. You receive this message when you right click the toolbox button, but a toolbox process for the window is already open. You can only have one toolbox open per-window. So if I have 3 windows open, and I right-click the toolbox button in window 1, then it'll launch a browser toolbox for window 1. If I then right-click the toolbox button in window 2, it'll launch a browser toolbox for window 2. But if I go back to window 1 and right-click the toolbox button a second time, it will do nothing except show a brief confirmation hint to explain the lack of action.
    holdingOpenMsg: "Holding popups open.", // Confirmation hint. This appears when you first middle-click the toolbox button. It signifies that popups are being kept open. That is, "popup auto-hide" has been temporarily disabled.
    lettingCloseMsg: "Letting popups close.", // Confirmation hint. This appears when you middle-click the toolbox button a second time, toggling "popup auto-hide" back on, thereby allowing popups to close on their own.
    menuBundle: Services.strings.createBundle("chrome://devtools/locale/menus.properties"),
    toolboxBundle: Services.strings.createBundle("chrome://devtools/locale/toolbox.properties"),
    getString(name, where) {
        return this[`${where}Bundle`].GetStringFromName(name);
    },
    get contentLabel() {
        return (
            this._contentLabel ||
            (this._contentLabel = this.getString("browserContentToolboxMenu.label", "menu"))
        );
    },
    get browserLabel() {
        return (
            this._browserLabel ||
            (this._browserLabel = this.getString("browserToolboxMenu.label", "menu"))
        );
    },
    get autoHideLabel() {
        return (
            this._autoHideLabel ||
            (this._autoHideLabel = this.getString(
                "toolbox.meatballMenu.noautohide.label",
                "toolbox"
            ))
        );
    },
    get defaultLabel() {
        return this.contentLabel;
    },
    get defaultTooltip() {
        return this.defaultLabel;
    },
};

(() => {
    let toolboxLauncher = ChromeUtils.import(
        "resource://devtools/client/framework/browser-toolbox/Launcher.jsm"
    ).BrowserToolboxLauncher;

    if (
        /^chrome:\/\/browser\/content\/browser.(xul||xhtml)$/i.test(location) &&
        !CustomizableUI.getPlacementOfWidget("toolbox-button", true)
    )
        CustomizableUI.createWidget({
            id: "toolbox-button",
            type: "custom",
            defaultArea: CustomizableUI.AREA_NAVBAR,
            label: toolboxButtonL10n.defaultLabel,
            removable: true,
            overflows: true,
            tooltiptext: toolboxButtonL10n.defaultTooltip,
            onBuild: function (aDoc) {
                let CustomHint = {
                    _timerID: null,

                    /**
                     * Shows a transient, non-interactive confirmation hint anchored to an
                     * element, usually used in response to a user action to reaffirm that it was
                     * successful and potentially provide extra context.
                     *
                     * @param  anchor (DOM node, required)
                     *         The anchor for the panel.
                     * @param  message (string, required)
                     *         The message to be shown.
                     * @param  options (object, optional)
                     *         An object with the following optional properties:
                     *         - event (DOM event): The event that triggered the feedback.
                     *         - hideArrow (boolean): Optionally hide the arrow.
                     *         - hideCheck (boolean): Optionally hide the checkmark.
                     *         - description (string): Show description text.
                     *         - duration (numeric): How long the hint should stick around.
                     *         - alignX (number or string): Where to align the hint relative to the anchor. (horizontally)
                     *                                      An integer value will be taken as an offset (in pixels) from the left of the anchor.
                     *                                      A string can be "left" "center" or "right" but uses "center" if this property is omitted.
                     *
                     */
                    show(anchor, message, options = {}) {
                        this._reset();

                        this._message.textContent = message;

                        if (options.description) {
                            this._description.textContent = options.description;
                            this._description.hidden = false;
                            this._panel.classList.add("with-description");
                        } else {
                            this._description.hidden = true;
                            this._panel.classList.remove("with-description");
                        }

                        if (options.hideArrow) {
                            this._panel.setAttribute("hidearrow", "true");
                        }

                        if (options.hideCheck) {
                            this._animationBox.setAttribute("hidden", "true");
                            this._panel.setAttribute("data-message-id", "hideCheckHint");
                        } else this._panel.setAttribute("data-message-id", "checkmarkHint");

                        const DURATION = options.duration || 1500;
                        this._panel.addEventListener(
                            "popupshown",
                            () => {
                                this._animationBox.setAttribute("animate", "true");
                                this._timerID = setTimeout(() => {
                                    this._panel.hidePopup(true);
                                    this._animationBox.removeAttribute("hidden");
                                }, DURATION + 120);
                            },
                            { once: true }
                        );

                        this._panel.addEventListener(
                            "popuphidden",
                            () => {
                                // reset the timerId in case our timeout wasn't the cause of the popup being hidden
                                this._reset();
                            },
                            { once: true }
                        );

                        let { position, x, y } = options;
                        this._panel.openPopup(null, { position, triggerEvent: options.event });
                        this._panel.moveToAnchor(anchor, position, x, y);
                    },

                    _reset() {
                        if (this._timerID) {
                            clearTimeout(this._timerID);
                            this._timerID = null;
                            this._animationBox.removeAttribute("hidden");
                        }
                        if (this.__panel) {
                            this._panel.removeAttribute("hidearrow");
                            this._animationBox.removeAttribute("animate");
                            this._panel.removeAttribute("data-message-id");
                            this._panel.hidePopup();
                        }
                    },

                    get _panel() {
                        this._ensurePanel();
                        return this.__panel;
                    },

                    get _animationBox() {
                        this._ensurePanel();
                        delete this._animationBox;
                        return (this._animationBox = aDoc.getElementById(
                            "confirmation-hint-checkmark-animation-container"
                        ));
                    },

                    get _message() {
                        this._ensurePanel();
                        delete this._message;
                        return (this._message = aDoc.getElementById("confirmation-hint-message"));
                    },

                    get _description() {
                        this._ensurePanel();
                        delete this._description;
                        return (this._description = aDoc.getElementById(
                            "confirmation-hint-description"
                        ));
                    },

                    _ensurePanel() {
                        if (!this.__panel) {
                            // hook into the built-in confirmation hint element
                            let wrapper = aDoc.getElementById("confirmation-hint-wrapper");
                            wrapper?.replaceWith(wrapper.content);
                            this.__panel = aDoc.getElementById("confirmation-hint");
                            ConfirmationHint.__panel = aDoc.getElementById("confirmation-hint");
                        }
                    },
                };

                let toolbarbutton = aDoc.createXULElement("toolbarbutton");
                let badgeStack = aDoc.createXULElement("stack");
                let icon = aDoc.createXULElement("image");
                let label = aDoc.createXULElement("label");
                let badgeLabel = aDoc.createElement("label");
                for (const [key, val] of Object.entries({
                    class: "toolbarbutton-1 chromeclass-toolbar-additional",
                    badged: true,
                    label: toolboxButtonL10n.defaultLabel,
                    id: "toolbox-button",
                    role: "button",
                    icon: "toolbox",
                    removable: true,
                    overflows: true,
                    tooltiptext: toolboxButtonL10n.defaultTooltip,
                }))
                    toolbarbutton.setAttribute(key, val);

                toolbarbutton.appendChild(badgeStack);
                badgeStack.after(label);
                badgeStack.appendChild(icon);
                icon.after(badgeLabel);
                badgeStack.setAttribute("class", "toolbarbutton-badge-stack");
                icon.setAttribute("class", "toolbarbutton-icon");
                badgeLabel.setAttribute("class", "toolbarbutton-badge");
                for (const [key, val] of Object.entries({
                    class: "toolbarbutton-text",
                    crop: "right",
                    flex: "1",
                    value: toolboxButtonL10n.defaultLabel,
                }))
                    label.setAttribute(key, val);

                let prefSvc = Services.prefs;
                let obSvc = Services.obs;
                let toolboxBranch = "userChrome.toolboxButton";
                let autoHide = "ui.popup.disable_autohide";
                let autoTogglePopups =
                    "userChrome.toolboxButton.popupAutohide.toggle-on-toolbox-launch";
                let mouseConfig = "userChrome.toolboxButton.mouseConfig";

                let onClick = function (e) {
                    if (e.getModifierState("Accel")) return;
                    switch (e.button) {
                        case this.mouseConfig.contentToolbox:
                            aDoc.defaultView.key_toggleToolbox.click(); // toggle the content toolbox
                            break;
                        case this.mouseConfig.browserToolbox:
                            toolboxLauncher.getBrowserToolboxSessionState() // check if a browser toolbox window is already open
                                ? CustomHint.show(toolbarbutton, toolboxButtonL10n.alreadyOpenMsg, {
                                      event: e,
                                      hideCheck: true,
                                  }) // if so, just show a hint that it's already open
                                : aDoc.defaultView.key_browserToolbox.click(); // if not, launch a new one
                            break;
                        case this.mouseConfig.popupHide:
                            this.popupAutoHide // check autohide pref state to dictate hint content
                                ? CustomHint.show(
                                      toolbarbutton,
                                      toolboxButtonL10n.lettingCloseMsg,
                                      {
                                          event: e,
                                          hideCheck: true,
                                      }
                                  )
                                : CustomHint.show(toolbarbutton, toolboxButtonL10n.holdingOpenMsg, {
                                      event: e,
                                  });
                            prefSvc.setBoolPref(autoHide, !this.popupAutoHide); // toggle the pref
                            this.triggerAnimation(); // animate the icon transformation
                            break;
                        default:
                            return;
                    }
                    e.preventDefault();
                };

                if (AppConstants.platform === "macosx") {
                    toolbarbutton.onmousedown = onClick;
                    toolbarbutton.onclick = (e) => {
                        if (e.getModifierState("Accel")) return;
                        e.preventDefault();
                    };
                } else toolbarbutton.onclick = onClick;

                toolbarbutton.triggerAnimation = function () {
                    this.addEventListener(
                        "animationend",
                        () => {
                            this.removeAttribute("animate");
                        },
                        { once: true }
                    );
                    this.setAttribute("animate", "true");
                };

                function getPref(root, pref) {
                    switch (root.getPrefType(pref)) {
                        case root.PREF_BOOL:
                            return root.getBoolPref(pref);
                        case root.PREF_INT:
                            return root.getIntPref(pref);
                        case root.PREF_STRING:
                            return root.getStringPref(pref);
                        default:
                            return null;
                    }
                }

                function prefObserver(sub, _top, pref) {
                    let value = getPref(sub, pref);
                    switch (pref) {
                        case autoHide:
                            if (value === null) value = false;
                            toolbarbutton.popupAutoHide = value;
                            if (value) {
                                toolbarbutton.setAttribute("icon", "autohide"); // change icon src to popup icon
                                icon.style.fill = "var(--toolbarbutton-icon-fill-attention)"; // highlight color
                            } else {
                                toolbarbutton.setAttribute("icon", "toolbox"); // change icon src to toolbox icon
                                icon.style.removeProperty("fill"); // un-highlight color
                            }
                            break;
                        case autoTogglePopups:
                            if (value === null) value = true;
                            toolbarbutton.autoTogglePopups = value;
                            break;
                        case mouseConfig:
                            if (value === null)
                                value = {
                                    "contentToolbox": 0,
                                    "browserToolbox": 2,
                                    "popupHide": 1,
                                };
                            toolbarbutton.mouseConfig = JSON.parse(value);
                            toolbarbutton.setStrings();
                            break;
                    }
                }

                /**
                 * listen for toolboxes opening and closing
                 */
                function toolboxObserver(sub, _top, _data) {
                    let state = toolboxLauncher.getBrowserToolboxSessionState(); // whether a toolbox is open
                    badgeLabel.textContent = state ? 1 : ""; // set toolbar button's badge content
                    // if toolbox is open and autohide is not already enabled, enable it
                    if (sub === "initial-load" || !toolbarbutton.autoTogglePopups) return;
                    if (state && !toolbarbutton.popupAutoHide) prefSvc.setBoolPref(autoHide, true);
                    // if toolbox just closed and autohide is not already disabled, disable it
                    else if (!state && toolbarbutton.popupAutoHide)
                        prefSvc.setBoolPref(autoHide, false);
                }

                toolbarbutton.setStrings = function () {
                    let hotkey, labelString;
                    for (const [key, val] of Object.entries(toolbarbutton.mouseConfig))
                        if (val === 0)
                            switch (key) {
                                case "contentToolbox":
                                    labelString = toolboxButtonL10n.contentLabel;
                                    hotkey = aDoc.defaultView.key_toggleToolbox;
                                    break;
                                case "browserToolbox":
                                    labelString = toolboxButtonL10n.browserLabel;
                                    hotkey = aDoc.defaultView.key_browserToolbox;
                                    break;
                                case "popupHide":
                                    labelString = toolboxButtonL10n.autoHideLabel;
                                    break;
                            }
                    let shortcut = hotkey ? ` (${ShortcutUtils.prettifyShortcut(hotkey)})` : "";
                    toolbarbutton.label = labelString;
                    label.value = labelString;
                    toolbarbutton.tooltipText = `${labelString}${shortcut}`;
                };

                /**
                 * remove this window's observers when the window closes, since observers are global
                 */
                function uninit() {
                    prefSvc.removeObserver(autoHide, prefObserver);
                    prefSvc.removeObserver(toolboxBranch, prefObserver);
                    obSvc.removeObserver(toolboxObserver, "devtools:loader:destroy");
                    obSvc.removeObserver(toolboxObserver, "devtools-thread-ready");
                    window.removeEventListener("unload", uninit, false);
                }

                function toolboxInit() {
                    prefObserver(prefSvc, null, autoHide);
                    prefObserver(prefSvc, null, autoTogglePopups);
                    prefObserver(prefSvc, null, mouseConfig);
                    toolboxObserver("initial-load");
                }

                if (!prefSvc.prefHasUserValue(autoTogglePopups))
                    prefSvc.setBoolPref(autoTogglePopups, true);
                if (!prefSvc.prefHasUserValue(mouseConfig))
                    prefSvc.setStringPref(
                        mouseConfig,
                        `{"contentToolbox": 0, "browserToolbox": 2, "popupHide": 1}`
                    );
                window.addEventListener("unload", uninit, false);
                prefSvc.addObserver(autoHide, prefObserver); // listen for pref changes
                prefSvc.addObserver(toolboxBranch, prefObserver);
                obSvc.addObserver(toolboxObserver, "devtools:loader:destroy"); // listen for toolbox process closing
                obSvc.addObserver(toolboxObserver, "devtools-thread-ready"); // listen for toolbox process launching
                if (gBrowserInit.delayedStartupFinished) {
                    toolboxInit();
                } else {
                    let delayedListener2 = (subject, topic) => {
                        if (topic == "browser-delayed-startup-finished" && subject == window) {
                            obSvc.removeObserver(delayedListener2, topic);
                            toolboxInit();
                        }
                    };
                    obSvc.addObserver(delayedListener2, "browser-delayed-startup-finished");
                }
                return toolbarbutton;
            },
        });

    let styleSvc = Cc["@mozilla.org/content/style-sheet-service;1"].getService(
        Ci.nsIStyleSheetService
    );
    let toolboxCSS = `.toolbarbutton-1#toolbox-button{-moz-box-align:center;}.toolbarbutton-1#toolbox-button .toolbarbutton-badge-stack{-moz-box-pack:center;}.toolbarbutton-1#toolbox-button .toolbarbutton-icon{height:16px;width:16px;transition:fill 50ms ease-in-out 0s;}.toolbarbutton-1#toolbox-button[icon="toolbox"]{list-style-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='context-fill' fill-opacity='context-fill-opacity' viewBox='0 0 512 512'><path d='M512 256v-64c0-35.346-28.654-64-64-64H64c-35.346 0-64 28.654-64 64v64h128v42.667H0v170.667c0 11.782 9.551 21.333 21.333 21.333h469.333c11.782 0 21.333-9.551 21.333-21.333V298.667H384V256h128zm-149.333 85.333H339.2a85.354 85.354 0 01-8.533 21.333l17.067 17.067-29.867 29.867-17.067-17.067-21.333 8.533v25.6h-44.8V403.2l-21.333-8.533-17.067 17.067-29.867-32 17.067-17.067a85.316 85.316 0 01-8.533-21.333h-25.6v-42.667H172.8a85.354 85.354 0 018.533-21.333l-17.067-17.067 29.867-29.867 17.067 17.067 21.333-8.533v-25.6H275.2V236.8l21.333 8.533 17.067-17.067 29.867 29.867L326.4 275.2a85.316 85.316 0 018.533 21.333h27.733v44.8z'/><circle cx='256' cy='320' r='42.667'/><path d='M192 64h128v42.667h42.667v-64c0-11.782-9.551-21.333-21.333-21.333H170.667c-11.782 0-21.333 9.551-21.333 21.333v64H192V64z'/></svg>");}.toolbarbutton-1#toolbox-button[icon="autohide"]{list-style-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='context-fill' fill-opacity='context-fill-opacity' viewBox='0 0 16 16'><path d='M5.293.293a1 1 0 011.414 0L8.414 2H13a3 3 0 013 3v8a3 3 0 01-3 3H3a3 3 0 01-3-3V5a3 3 0 013-3h.586L5.293.293zM6 2.414L4.707 3.707A1 1 0 014 4H3c-.545 0-1 .455-1 1v8c0 .545.455 1 1 1h10c.545 0 1-.455 1-1V5c0-.545-.455-1-1-1H8a1 1 0 01-.707-.293L6 2.414z'/></svg>");}@media (prefers-reduced-motion:no-preference){.toolbarbutton-1#toolbox-button[animate] .toolbarbutton-icon{animation-name:toolboxButtonPulse;animation-duration:200ms;animation-iteration-count:1;animation-timing-function:ease-in-out;transform-style:flat;backface-visibility:hidden}}@keyframes toolboxButtonPulse{from{transform:scale(1)}40%{transform:scale(.7)}to{transform:scale(1)}}#confirmation-hint[data-message-id="hideCheckHint"] #confirmation-hint-message{margin-inline:0;}`;
    let styleURI = makeURI("data:text/css;charset=UTF=8," + encodeURIComponent(toolboxCSS));
    if (!styleSvc.sheetRegistered(styleURI, styleSvc.AUTHOR_SHEET))
        styleSvc.loadAndRegisterSheet(styleURI, styleSvc.AUTHOR_SHEET);

    let observer = new MutationObserver(() => {
        if (document.getElementById("key_toggleToolbox")) {
            CustomizableUI.getWidget("toolbox-button").forWindow(window).node.setStrings();
            observer.disconnect();
            observer = null;
        }
    });
    observer.observe(document.body, { childList: true });
})();
