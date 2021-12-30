// ==UserScript==
// @name           Findbar Mods
// @version        1.3.0
// @author         aminomancer
// @homepage       https://github.com/aminomancer
// @description    1) Make a custom context menu for the findbar that lets you permanently configure findbar-related settings. You can set "Highlight All" and "Whole Words" just like you can with the built-in checkboxes, but this also lets you choose any setting for "Match Case" and "Match Diacritics." The built-in checkboxes for these settings only let you choose between states 1 and 0, true and false. There's actually a 2 state which enables a more useful and intuitive mode. Read the notes in the "l10n" section below for more info. Additionally, most of the built-in checkboxes are only temporary. They only apply to the current browser. This can be useful, but since a context menu requires more intention to reach, its actions should be more permanent. Instead of just setting the browser state, the context menu sets the user preferences just like you could in about:config. 2) Set up a hotkey system that allows you to close the findbar by pressing Escape or Ctrl+F while the findbar is focused. Normally, Ctrl+F only opens the findbar. With this script, Ctrl+F acts more like a toggle. As normal, when the findbar is closed, Ctrl+F will open it. When the findbar is open but not focused, Ctrl+F will focus it and select all text in the input box. From there, pressing Ctrl+F once more will close it. If you're in 'find as you type' mode, ctrl+f switches to regular find mode. 3) (Optional) Miniaturize the findbar matches label and the "Match case" and "Whole words" buttons. Instead of "1 of 500 matches" this one says "1/500" and floats inside the input box. This is enabled by default by the "usingDuskfox" setting below. It's mainly intended for people who use CSS themes that make the findbar much more compact, like my theme duskFox. If you don't use one of these themes already, you can grab the relevant code from uc-findbar.css on my repo, or if you like having a big findbar, you can just set "usingDuskfox" to false below. For those interested in customizing this with CSS, the mini matches indicator can be styled with the selector .matches-indicator. It's the next sibling of the findbar input box. See uc-findbar.css in this repo for how I styled it. Specific methods used are documented in more detail in the code comments below.
// @license        This Source Code Form is subject to the terms of the Creative Commons Attribution-NonCommercial-ShareAlike International License, v. 4.0. If a copy of the CC BY-NC-SA 4.0 was not distributed with this file, You can obtain one at http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
// ==/UserScript==

class FindbarMods {
    // set this to false if you're not using my theme or something similar to make the findbar much smaller.
    // the miniaturized findbar isn't necessary with the default firefox layout, and requires a lot of CSS to implement.
    // so setting this to false will disable the miniaturization features of the script,
    // and solely implement the context menu and hotkey features.
    static usingDuskfox = true;

    // firefox has no localization strings for these phrases, since they can only be configured in about:config.
    // change the label and accesskey values for your language. keep the quotes.
    static l10n = {
        // match case popup submenu
        caseInsensitive: {
            label: "Case Insensitive",
            accesskey: "I",
        },
        caseSensitive: {
            label: "Case Sensitive",
            accesskey: "S",
        },
        // ignore case when your search string is all lowercase;
        // match case when your search string contains at least one capitalized character.
        auto: {
            label: "Auto",
            accesskey: "A",
        },
        // diacritics popup submenu
        // e matches e and é, é matches é and e
        matchAllDiacritics: {
            label: "Match All Diacritics",
            accesskey: "A",
        },
        // e matches e but not é, é matches é but not e
        exclusiveMatch: {
            label: "Exclusive Matching",
            accesskey: "E",
        },
        // e matches e and é, é matches é but not e
        smartMatch: {
            label: "Smart Matching",
            accesskey: "S",
        },
    };
    /**
     * create a DOM node with given parameters
     * @param {object} aDoc (which document to create the element in)
     * @param {string} tag (an HTML tag name, like "button" or "p")
     * @param {object} props (an object containing attribute name/value pairs, e.g. class: ".bookmark-item")
     * @param {boolean} isHTML (if true, create an HTML element. if omitted or false, create a XUL element. generally avoid HTML when modding the UI, most UI elements are actually XUL elements.)
     * @returns the created DOM node
     */
    create(aDoc, tag, props, isHTML = false) {
        let el = isHTML ? aDoc.createElement(tag) : aDoc.createXULElement(tag);
        for (let prop in props) el.setAttribute(prop, props[prop]);
        return el;
    }
    constructor() {
        this.buildContextMenu();
        // callback to execute for every new findbar created (each loaded tab has its own findbar)
        gBrowser.tabContainer.addEventListener("TabFindInitialized", this);
        addEventListener("findbaropen", this);
    }
    handleEvent(e) {
        switch (e.type) {
            case "TabFindInitialized":
                this.onTabFindInitialized(e);
                break;
            case "findbaropen":
                this.onFindbarOpen(e);
                break;
            case "popupshowing":
                this.onPopupShowing(e);
                break;
            case "popuphiding":
                this.onPopupHiding(e);
                break;
        }
    }
    // we want to use firefox's built-in localized strings wherever possible
    async buildStrings() {
        let msgs = await document.l10n.formatMessages([
            "findbar-highlight-all2",
            "findbar-entire-word",
            "findbar-case-sensitive",
            "findbar-match-diacritics",
        ]);
        let attrs = msgs.map((msg) => {
            msg.attributes = msg.attributes.reduce((entries, { name, value }) => {
                entries[name] = value;
                return entries;
            }, {});
            return msg.attributes;
        });
        let [highlight, entireWord, caseSense, diacritics] = attrs;
        return {
            highlight,
            entireWord,
            caseSense,
            diacritics,
        };
    }
    async buildContextMenu() {
        let l10n = FindbarMods.l10n;
        // ensure the .ftl file is loaded; this will almost always execute before firefox's own findbar code does.
        MozXULElement.insertFTLIfNeeded("toolkit/main-window/findbar.ftl");
        this.fluentStrings = await this.buildStrings();
        this.contextMenu = document.getElementById("mainPopupSet").appendChild(
            this.create(document, "menupopup", {
                id: "findbar-context-menu",
            })
        );
        this.contextMenu.addEventListener("popupshowing", this);
        this.contextMenu.addEventListener("popuphiding", this);

        this.contextMenu._menuitemHighlightAll = this.contextMenu.appendChild(
            this.create(document, "menuitem", {
                id: "findbar-menu-highlight-all",
                type: "checkbox",
                label: this.fluentStrings.highlight.label,
                accesskey: this.fluentStrings.highlight.accesskey,
                oncommand: `let node = this.parentElement.triggerNode;
                    if (!node) return;
                    let findbar = node.tagName === "findbar" ? node : node.closest("findbar");
                    if (findbar) findbar.toggleHighlight(!findbar._highlightAll);`,
            })
        );
        this.contextMenu._menuitemEntireWord = this.contextMenu.appendChild(
            this.create(document, "menuitem", {
                id: "findbar-menu-entire-word",
                type: "checkbox",
                label: this.fluentStrings.entireWord.label,
                accesskey: this.fluentStrings.entireWord.accesskey,
                oncommand: `let node = this.parentElement.triggerNode;
                    if (!node) return;
                    let findbar = node.tagName === "findbar" ? node : node.closest("findbar");
                    if (findbar) findbar.toggleEntireWord(!findbar.browser.finder._entireWord);`,
            })
        );

        this.contextMenu._menuMatchCase = this.contextMenu.appendChild(
            this.create(document, "menu", {
                id: "findbar-menu-match-case",
                label: this.fluentStrings.caseSense.label,
                accesskey: this.fluentStrings.caseSense.accesskey,
            })
        );
        let matchCasePopup = this.contextMenu._menuMatchCase.appendChild(
            document.createXULElement("menupopup")
        );
        matchCasePopup.addEventListener("popupshowing", this);
        this.contextMenu._menuMatchCasePopup = matchCasePopup;

        // we make these options permanent by using the preferences service instead of MozFindbar's methods.
        this.contextMenu._menuitemCaseInsensitive = matchCasePopup.appendChild(
            this.create(document, "menuitem", {
                id: "findbar-menu-case-insensitive",
                type: "radio",
                label: l10n.caseInsensitive.label,
                accesskey: l10n.caseInsensitive.accesskey,
                oncommand: `Services.prefs.setIntPref("accessibility.typeaheadfind.casesensitive", 0);`,
            })
        );
        this.contextMenu._menuitemCaseSensitive = matchCasePopup.appendChild(
            this.create(document, "menuitem", {
                id: "findbar-menu-case-sensitive",
                type: "radio",
                label: l10n.caseSensitive.label,
                accesskey: l10n.caseSensitive.accesskey,
                oncommand: `Services.prefs.setIntPref("accessibility.typeaheadfind.casesensitive", 1);`,
            })
        );
        this.contextMenu._menuitemCaseAuto = matchCasePopup.appendChild(
            this.create(document, "menuitem", {
                id: "findbar-menu-case-auto",
                type: "radio",
                label: l10n.auto.label,
                accesskey: l10n.auto.accesskey,
                oncommand: `Services.prefs.setIntPref("accessibility.typeaheadfind.casesensitive", 2);`,
            })
        );

        this.contextMenu._menuMatchDiacritics = this.contextMenu.appendChild(
            this.create(document, "menu", {
                id: "findbar-menu-match-diacritics",
                label: this.fluentStrings.diacritics.label,
                accesskey: this.fluentStrings.diacritics.accesskey,
            })
        );
        let diacriticsPopup = this.contextMenu._menuMatchDiacritics.appendChild(
            document.createXULElement("menupopup")
        );
        diacriticsPopup.addEventListener("popupshowing", this);
        this.contextMenu._menuMatchDiacriticsPopup = diacriticsPopup;

        this.contextMenu._menuitemMatchAllDiacritics = diacriticsPopup.appendChild(
            this.create(document, "menuitem", {
                id: "findbar-menu-match-all-diacritics",
                type: "radio",
                label: l10n.matchAllDiacritics.label,
                accesskey: l10n.matchAllDiacritics.accesskey,
                oncommand: `Services.prefs.setIntPref("findbar.matchdiacritics", 0);`,
            })
        );
        this.contextMenu._menuitemExclusiveMatching = diacriticsPopup.appendChild(
            this.create(document, "menuitem", {
                id: "findbar-menu-exclusive-matching",
                type: "radio",
                label: l10n.exclusiveMatch.label,
                accesskey: l10n.exclusiveMatch.accesskey,
                oncommand: `Services.prefs.setIntPref("findbar.matchdiacritics", 1);`,
            })
        );
        this.contextMenu._menuitemSmartMatching = diacriticsPopup.appendChild(
            this.create(document, "menuitem", {
                id: "findbar-menu-smart-matching",
                type: "radio",
                label: l10n.smartMatch.label,
                accesskey: l10n.smartMatch.accesskey,
                oncommand: `Services.prefs.setIntPref("findbar.matchdiacritics", 2);`,
            })
        );
    }
    modClassMethods() {
        let findbarClass = customElements.get("findbar").prototype;
        findbarClass.ucFindbarMods = this;
        // make sure the new mini buttons are never hidden,
        // since the position of the new matches indicator depends on the position of the buttons.
        // instead of hiding them while state 2 is applied via pref,
        // just disable them so they're grayed out and unclickable.
        eval(
            `findbarClass._updateCaseSensitivity = function ` +
                findbarClass._updateCaseSensitivity
                    .toSource()
                    .replace(/_updateCaseSensitivity/, ``)
                    .replace(/checkbox\.hidden/, `checkbox.disabled`)
        );
        eval(
            `findbarClass._setEntireWord = function ` +
                findbarClass._setEntireWord
                    .toSource()
                    .replace(/_setEntireWord/, ``)
                    .replace(/checkbox\.hidden/, `checkbox.disabled`)
        );
        // override the native method that sets some findbar UI properties, e.g. switching between normal and find-as-you-type mode.
        findbarClass._updateFindUI = function () {
            let showMinimalUI = this.findMode != this.FIND_NORMAL;
            let nodes = this.getElement("findbar-container").children;
            let wrapper = this.getElement("findbar-textbox-wrapper");
            let foundMatches = this._foundMatches;
            let tinyIndicator = this._tinyIndicator;
            for (let node of nodes) {
                if (node == wrapper || node == foundMatches) continue;
                node.hidden = showMinimalUI;
            }
            this.getElement("find-next").hidden = this.getElement("find-previous").hidden =
                showMinimalUI;
            foundMatches.hidden = showMinimalUI || !foundMatches.value;
            tinyIndicator.style.display = showMinimalUI ? "none" : "inline-block";
            if (showMinimalUI) this._findField.classList.add("minimal");
            else this._findField.classList.remove("minimal");
            this._updateCaseSensitivity();
            this._updateDiacriticMatching();
            this._setEntireWord();
            this._setHighlightAll();
            if (this.findMode == this.FIND_TYPEAHEAD)
                this._findField.placeholder = this._fastFindStr;
            else if (this.findMode == this.FIND_LINKS)
                this._findField.placeholder = this._fastFindLinksStr;
            else this._findField.placeholder = this._normalFindStr;
        };
        // override the native on-results function so it updates both labels.
        findbarClass.onMatchesCountResult = function (result) {
            if (result.total !== 0) {
                if (result.total == -1) {
                    this._foundMatches.value = PluralForm.get(
                        result.limit,
                        this.strBundle.GetStringFromName("FoundMatchesCountLimit")
                    ).replace("#1", result.limit);
                    this._tinyIndicator.textContent = `${result.limit}+`;
                } else {
                    this._foundMatches.value = PluralForm.get(
                        result.total,
                        this.strBundle.GetStringFromName("FoundMatches")
                    )
                        .replace("#1", result.current)
                        .replace("#2", result.total);
                    this._tinyIndicator.textContent = `${result.current}/${result.total}`;
                }
                this._foundMatches.hidden = false;
                this._tinyIndicator.removeAttribute("empty"); // bring it back if it's not blank.
            } else {
                this._foundMatches.hidden = true;
                this._foundMatches.value = "";
                this._tinyIndicator.textContent = "   ";
                this._tinyIndicator.setAttribute("empty", "true"); // hide the indicator background with CSS if it's blank.
            }
        };
    }
    // when the context menu opens, ensure the menuitems are checked/unchecked appropriately.
    onPopupShowing(e) {
        let node = e.target.triggerNode;
        if (!node) return;
        let findbar = node.tagName === "findbar" ? node : node.closest("findbar");
        if (!findbar) return;
        if (e.currentTarget !== this.contextMenu) return this.onSubmenuShowing(e, findbar);
        this.contextMenu._menuitemHighlightAll.setAttribute("checked", !!findbar._highlightAll);
        this.contextMenu._menuitemEntireWord.setAttribute("checked", !!findbar._entireWord);
        if (findbar._quickFindTimeout) {
            clearTimeout(findbar._quickFindTimeout);
            findbar._quickFindTimeout = null;
            findbar._updateBrowserWithState();
        }
    }
    onPopupHiding(e) {
        if (e.target !== this.contextMenu) return;
        let node = e.target.triggerNode;
        if (!node) return;
        let findbar = node.tagName === "findbar" ? node : node.closest("findbar");
        if (!findbar) return;
        if (findbar.findMode != findbar.FIND_NORMAL) findbar._setFindCloseTimeout();
    }
    // do the same with the submenus, except since they have type="radio" we don't need to uncheck anything.
    // checking any of a radio menuitem's siblings will automatically uncheck it, just like a radio input.
    onSubmenuShowing(e, findbar) {
        if (e.target === this.contextMenu._menuMatchDiacriticsPopup) {
            let diacriticsStatus =
                Services.prefs.getIntPref("findbar.matchdiacritics", 0) || findbar._matchDiacritics;
            let activeItem = this.contextMenu._menuMatchDiacriticsPopup.children[diacriticsStatus];
            activeItem.setAttribute("checked", true);
        }
        if (e.target === this.contextMenu._menuMatchCasePopup) {
            let caseStatus =
                Services.prefs.getIntPref("accessibility.typeaheadfind.casesensitive", 0) ||
                findbar._typeAheadCaseSensitive;
            let activeItem = this.contextMenu._menuMatchCasePopup.children[caseStatus];
            activeItem.setAttribute("checked", true);
        }
    }
    domSetup(findbar) {
        // ensure that our new context menu is opened on right-click.
        findbar.setAttribute("context", "findbar-context-menu");
        // begin moving elements and making the mini matches label.
        if (FindbarMods.usingDuskfox) this.miniaturize(findbar);
    }
    miniaturize(findbar) {
        function onKey(e) {
            if (this.hasMenu() && this.open) return;
            // handle arrow key focus navigation
            else {
                if (
                    e.keyCode == KeyEvent.DOM_VK_UP ||
                    (e.keyCode == KeyEvent.DOM_VK_LEFT &&
                        document.defaultView.getComputedStyle(this.parentNode).direction ==
                            "ltr") ||
                    (e.keyCode == KeyEvent.DOM_VK_RIGHT &&
                        document.defaultView.getComputedStyle(this.parentNode).direction == "rtl")
                ) {
                    e.preventDefault();
                    window.document.commandDispatcher.rewindFocus();
                    return;
                }
                if (
                    e.keyCode == KeyEvent.DOM_VK_DOWN ||
                    (e.keyCode == KeyEvent.DOM_VK_RIGHT &&
                        document.defaultView.getComputedStyle(this.parentNode).direction ==
                            "ltr") ||
                    (e.keyCode == KeyEvent.DOM_VK_LEFT &&
                        document.defaultView.getComputedStyle(this.parentNode).direction == "rtl")
                ) {
                    e.preventDefault();
                    window.document.commandDispatcher.advanceFocus();
                    return;
                }
            }
            // handle access keys
            if (!e.charCode || e.charCode <= 32 || e.altKey || e.ctrlKey || e.metaKey) return;
            const charLower = String.fromCharCode(e.charCode).toLowerCase();
            if (this.accessKey.toLowerCase() == charLower) {
                this.click();
                return;
            }
            // check against accesskeys of siblings and activate them if matched
            for (const el of Object.values(this.parentElement.children))
                if (el.accessKey.toLowerCase() === charLower) {
                    el.focus();
                    el.click();
                    return;
                }
        }
        // the new mini indicator that will read something like 1/27 instead of 1 of 27 matches.
        findbar._tinyIndicator = this.create(document, "label", {
            class: "matches-indicator",
            style: "box-sizing: border-box; display: inline-block; -moz-box-align: center; margin: 0; line-height: 20px; position: absolute; font-size: 10px; right: 110px; color: hsla(0, 0%, 100%, 0.25); pointer-events: none; padding-inline-start: 20px; mask-image: linear-gradient(to right, transparent 0px, black 20px);",
            empty: true,
        });
        let caseSensitiveButton = findbar.querySelector(".findbar-case-sensitive");
        let entireWordButton = findbar.querySelector(".findbar-entire-word");
        // my own findbar CSS is pretty complicated. it turns the findbar into a small floating box. in vanilla firefox the findbar is a bar that covers the full width of the window and flexes the browser out of the way. mine hovers over the content area without pushing anything out of its way. I also hide a few of the less frequently used buttons.
        // so my findbar is tiny but since we're adding an indicator, we might as well make the text field bigger to get something in return. the default firefox findbar is really silly, why have such a giant findbar if the text field can't stretch to fill that space?
        // there's also some CSS in my stylesheets that gives the findbar a smooth transition and starting animation and compresses the buttons and stuff. the effects of this might look really weird without those rules so I'd definitely either 1) look at uc-findbar.css, or 2) set usingDuskfox to false at the top of this script.
        findbar._findField.style.width = "20em";
        // we want the close button to be on the far right end of the findbar.
        findbar._findField.parentNode.after(findbar.querySelector(".findbar-closebutton"));
        // put it after the input box so we can use the ~ squiggly combinator
        findbar._findField.after(findbar._tinyIndicator);
        // move the match-case and entire-word buttons into the text field. uc-findbar.css turns these buttons into mini icons, same size as the next/previous buttons. this way we can fit everything important into one row.
        findbar._tinyIndicator.after(caseSensitiveButton, entireWordButton);

        // listen for access keys, arrow keys etc. since these buttons are now inside the text area.
        caseSensitiveButton.addEventListener("keypress", onKey);
        entireWordButton.addEventListener("keypress", onKey);
    }
    // for a given findbar, move its label into the proper position.
    setLabelPosition(findbar) {
        let getBounds = window.windowUtils.getBoundsWithoutFlushing;
        let distanceFromEdge =
            getBounds(findbar).right - getBounds(findbar.querySelector(".findbar-textbox")).right;
        findbar._tinyIndicator.style.right = `${distanceFromEdge + 1}px`;
    }
    // when a new tab is opened and the findbar somehow activated, a new findbar is born.
    // so we have to manage it every time.
    onTabFindInitialized(e) {
        if (e.target.ownerGlobal !== window) return;
        if (!this.initialized) {
            this.initialized = true;
            if (FindbarMods.usingDuskfox) this.modClassMethods();
        }
        let findbar = e.target._findBar;

        // determine what to do when the hotkey is pressed
        function exitFindBar(e) {
            if (e.repeat || e.shiftKey || e.altKey) return;
            if (e.code === "KeyF" && (e.ctrlKey || e.metaKey)) {
                if (this.hidden) return; // if it's already hidden then let the built-in command open it.
                let field = this._findField;
                try {
                    this.findMode > 0 // if we're in 'find as you type' mode...
                        ? this.open(0) // switch to normal find mode.
                        : field.contains(document.activeElement) // if we're in normal mode already then check if the input box is focused...
                        ? field.selectionEnd - field.selectionStart === field.textLength // if already focused, check if all input text is selected. difference between end and start only equals length if every character is within the selection range.
                            ? this.close() // if there's already a selection, close the findbar.
                            : (field.select(), field.focus()) // if nothing is selected, select the full contents of the input box.
                        : (field.select(), field.focus()); // if not focused, focus and select the input box.
                } catch (e) {
                    // i haven't seen an error here but if any of these references don't exist it probably means the built-in findbar object initialized wrong for some reason.
                    // in which case it's probably not open. it definitely exists though, since this event listener can't exist in the first place unless the findbar object exists. so just try opening it
                    this.open(0);
                }
                e.preventDefault();
            }
        }

        this.domSetup(findbar);
        // set up hotkey ctrl+F to close findbar when it's already open
        findbar.addEventListener("keypress", exitFindBar, true);
    }
    onFindbarOpen(e) {
        if (e.target.findMode == e.target.FIND_NORMAL)
            setTimeout(() => e.target.ucFindbarMods.setLabelPosition(e.target), 1);
    }
}

// check that startup has finished and gBrowser is initialized before we add an event listener
if (gBrowserInit.delayedStartupFinished) new FindbarMods();
else {
    let delayedListener = (subject, topic) => {
        if (topic == "browser-delayed-startup-finished" && subject == window) {
            Services.obs.removeObserver(delayedListener, topic);
            new FindbarMods();
        }
    };
    Services.obs.addObserver(delayedListener, "browser-delayed-startup-finished");
}
