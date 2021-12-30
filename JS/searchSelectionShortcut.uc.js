// ==UserScript==
// @name           Search Selection Keyboard Shortcut
// @version        1.6.2
// @author         aminomancer
// @homepage       https://github.com/aminomancer
// @description    Adds a new keyboard shortcut (Ctrl+Shift+F) that searches your default search engine for whatever text you currently have highlighted. This does basically the same thing as the context menu option "Search {Engine} for {Selection}" except that if you highlight a URL, instead of searching for the selection it will navigate directly to the URL.
// Optionally, you can also configure the script to use your other (non-default) search engines as well. The preference "userChrome.searchSelectionShortcut.match-engine-to-current-tab" will add a second hotkey (Ctrl+Alt+F) that will look for an installed engine that matches the current webpage. So if your default search engine is Google but you use the hotkey on Wikipedia, and you have a search engine for Wikipedia installed, it will search Wikipedia for the selected text instead. This preference is disabled by default.
// But what if you have a non-default search engine that you want to use for a particular website? Let's say you're on about:config, browsing through preferences. You highlight a pref name and hit the hotkey to search for it and find out what it does. Normally, pressing the second hotkey will launch your default engine, since about:config doesn't correspond to any normal URL. But by setting the pref "userChrome.searchSelectionShortcut.custom-matches", you can "link" any website to any engine. This pref accepts a JSON formatted object containing zero or more name-value pairs, separated by commas. The object format is {<site>: <engine>}
// Here's an example: {"about:config": "Searchfox", "bugzilla.mozilla.org": "searchfox.org", "raw.githubusercontent.com", "https://github.com/search?q=%s"}
// This should basically explain the options. <site> represents a website you might visit, <engine> represents the engine to use when you press the hotkey while on the <site>. So the first one means use Searchfox when the hotkey is activated on about:config. This is JSON, so all <site> and <engine> values must be wrapped in quotes and the pairs must be separated by commas, or the pref won't work at all.
// A <site> value must be some kind of valid URL. Ideally a host (domain) is best, but it doesn't have to be a host, because some types of URLs lack hosts. If you're unsure what the host is for a website you're trying to link to an engine, open the website in a browser tab, open the content toolbox, and type location.host. For pages that lack hosts or have very specific protocols (like moz-extension:// URLs) you can specify the full page URL, like moz-extension://blahblah/index.html
// An <engine> value can be either 1) an engine's name — that's the label that appears next to the search engine in the UI, e.g. "Google"; 2) the domain on which the search engine is hosted, e.g. "www.google.com"; or 3) the engine's full search template URL, or something close to it, e.g. "www.google.com/search?q=%s". Any of these values will work, but using the engine's name is most efficient.
// You can change the hotkey itself (though not the modifiers) by setting "userChrome.searchSelectionShortcut.keycode" to a valid KeyboardEvent code. The default value "KeyF" corresponds to the F key. The correct notation is different for numbers and special characters, so visit https://keycode.info and press the desired key to find its event.code. Then input that string into the pref editor in about:config.
// Since v1.3 this script supports Fission by using JSActors instead of Message Managers. Normally JSActors require multiple files — a parent script and a child script, to communicate between the content frame and the parent process. And to instantiate them would require a third file, the autoconfig script. An autoconfig script requiring multiple additional files doesn't make for a very user-friendly experience. So this script automatically generates its own subscript files in your chrome folder and cleans them up when you quit Firefox. I had a lot of fun figuring this out. If you're trying to learn how to make these kinds of mods, this is a good subject to research since JSActors are really powerful. It's also cool to see how a standalone autoconfig script can be made to create its own little network of temp files to work in a more vanilla-style manner.
// @license        This Source Code Form is subject to the terms of the Creative Commons Attribution-NonCommercial-ShareAlike International License, v. 4.0. If a copy of the CC BY-NC-SA 4.0 was not distributed with this file, You can obtain one at http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
// @include        main
// @onlyonce
// ==/UserScript==

class SearchSelectionShortcut {
    // these are all the prefs the script uses for configuration, with their default values.
    // this particular property is only used for setting the prefs on first install.
    // the window actor has its own way of retrieving these prefs.
    static prefs = new Map([
        ["userChrome.searchSelectionShortcut.keycode", "KeyF"],
        ["userChrome.searchSelectionShortcut.match-engine-to-current-tab", false],
        ["userChrome.searchSelectionShortcut.custom-matches", "{}"],
    ]);
    constructor() {
        this.makePrefs();
        this.setup();
    }
    makePrefs() {
        let firstRun = false;
        let oldPref = "userChrome.searchSelectionShortcut.action-override-hotkey";
        if (Services.prefs.prefHasUserValue(oldPref)) {
            Services.prefs.clearUserPref(oldPref);
            firstRun = true;
        }
        SearchSelectionShortcut.prefs.forEach((def, name) => {
            let type;
            // determine the pref type (boolean, number, string).
            // there are a couple more but we won't ever use them.
            switch (typeof def) {
                case "boolean":
                    type = "Bool";
                    break;
                case "number":
                    type = "Int";
                    break;
                case "string":
                    type = "String";
                    break;
                default:
                    return;
            }
            // if the pref hasn't already been set, set it now.
            if (!Services.prefs.prefHasUserValue(name)) {
                Services.prefs[`set${type}Pref`](name, def);
                firstRun = name !== "userChrome.searchSelectionShortcut.custom-matches";
            }
        });
        // if it's the first time installing v1.6,
        // make a splash menu to reveal the new prefs
        // and offer an affordance to change them.
        if (firstRun) {
            if (gBrowserInit?.delayedStartupFinished) this.handleSplash();
            else Services.obs.addObserver(this, "browser-delayed-startup-finished");
        }
    }
    async setup() {
        // the component registrar — this is the interface that lets us make custom URIs with chrome:// protocols.
        const registrar = Components.manager.QueryInterface(Ci.nsIComponentRegistrar);
        // a temp directory we're making in the chrome folder.
        // I tried making this folder in the *actual* Temp directory, but I guess it has a permissions issue or something.
        // when we try that, the hotkey works on system pages, but not on regular webpages. very strange, never figured out why.
        // so just make it a dotfile so it won't get in the way. that should hide the folder on linux unless showing hidden files is enabled.
        // not sure about macOS. somebody let me know if it's hidden or not.
        let tempDir = FileUtils.getFile("UChrm", [".SearchSelectionShortcut"]);
        let { path } = tempDir;
        await IOUtils.makeDirectory(path, { ignoreExisting: true });
        // hide the temp dir on windows so it doesn't get in the way of user activities or prevent its eventual deletion.
        if (AppConstants.platform === "win") {
            if ("setWindowsAttributes" in IOUtils)
                await IOUtils.setWindowsAttributes(path, { hidden: true });
        }
        this.tempPath = path;

        // create a manifest file that registers a URI for chrome://uc-searchselectionshortcut/content/
        this.manifestFile = await this.createTempFile(`content uc-searchselectionshortcut ./`, {
            name: "ucsss",
            type: "manifest",
        });
        // JSActors require parent files and child files. see: https://firefox-source-docs.mozilla.org/dom/ipc/jsactors.html
        // this parent file listens for messages from the child file. when it gets a message, it triggers a search or link navigation.
        // the message includes info about the sender, the page's location and CSP, and the selected text or link.
        // if the selected text constitutes a valid link, it will navigate directly to that page.
        // otherwise, it will launch a new browser search using the selected text as a query string.
        // it will normally open the search/link in a new tab. but if you're currently on your new tab page,
        // it assumes you don't want to keep an empty tab around, so it'll open the search/link in the current tab.
        this.parentFile = await this.createTempFile(
            `"use strict";const EXPORTED_SYMBOLS=["SearchSelectionShortcutParent"];const{Services}=ChromeUtils.import("resource://gre/modules/Services.jsm");const{XPCOMUtils}=ChromeUtils.import("resource://gre/modules/XPCOMUtils.jsm");XPCOMUtils.defineLazyModuleGetters(this,{BrowserWindowTracker:"resource:///modules/BrowserWindowTracker.jsm",PrivateBrowsingUtils:"resource://gre/modules/PrivateBrowsingUtils.jsm",E10SUtils:"resource://gre/modules/E10SUtils.jsm"});const{WebExtensionPolicy}=Cu.getGlobalForObject(Cu);const schemes=/^http|https|ftp$/;const base=host=>{let domain;try{domain=Services.eTLD.getBaseDomainFromHost(host)}catch(e){}return domain};class SearchSelectionShortcutParent extends JSWindowActorParent{get browser(){return this.browsingContext.top.embedderElement}getEngineTemplate(e){const engineURL=e._getURLOfType("text/html");return engineURL.params.length>0?e._searchForm:engineURL.template}async getMatchingEngine(match,url,host,check=true){if(!match)return null;let preferred;let uri=Services.io.newURI(url);if(check){if(url in CUSTOM_MATCHES)preferred=CUSTOM_MATCHES[url];if(!preferred&&host in CUSTOM_MATCHES)preferred=CUSTOM_MATCHES[host];if(!preferred&&!host){try{preferred=CUSTOM_MATCHES[uri.prePath+uri.filePath]}catch(e){}}if(preferred){const engine=Services.search.getEngineByName(preferred);if(engine&&!engine.hidden)return engine}}const visibleEngines=await Services.search.getVisibleEngines();let originalHost;if(preferred&&/.+\\..+/.test(preferred)){originalHost=host;host=preferred}let engines=visibleEngines.filter((engine=>engine.getResultDomain()==host));if(!engines.length){const baseHost=base(host);if(baseHost||!preferred)engines=visibleEngines.filter((engine=>base(engine.getResultDomain())==baseHost))}if(originalHost&&!engines.length){try{const fixup=Services.uriFixup.getFixupURIInfo(preferred,Ci.nsIURIFixup.FIXUP_FLAG_FIX_SCHEME_TYPOS);uri=fixup.fixedURI;engines=visibleEngines.filter((engine=>engine.getResultDomain()==uri.host))}catch(e){}if(!engines.length)return this.getMatchingEngine(match,url,originalHost,false)}if(engines.length>1){engines.sort(((a,b)=>{const uriA=Services.io.newURI(this.getEngineTemplate(a)),uriB=Services.io.newURI(this.getEngineTemplate(b)),cmnA=this.commonLength(uri,uriA),cmnB=this.commonLength(uri,uriB);return cmnB.host-cmnA.host||cmnB.path-cmnA.path||cmnB.query-cmnA.query}))}return engines[0]}commonLength(x,y){if(!(x?.spec&&y?.spec))return 0;let xh="",yh="";try{xh=x.host}catch(e){}try{yh=y.host}catch(e){}let xf=x.filePath,yf=y.filePath,xs=x.scheme,ys=y.scheme||"https",xq=x.query,yq=y.query,i=0,k=0,len=xh.length,sq="";if(xs!=ys&&!(schemes.test(xs)&&schemes.test(ys)))return 0;while(k<len&&xh.charAt(len-k)===yh.charAt(yh.length-k))k++;while(i<xf.length&&xf.charAt(i)===yf.charAt(i))i++;if(xq&&yq){let xa=xq.split("&"),ya=yq.split("&"),qp;ya=ya.filter((p=>{if(p.endsWith("{searchTerms}")){qp=p.replace(/{searchTerms}/,"");return}return true}));xa=xa.filter((p=>!(qp&&p.startsWith(qp))));sq=xa.filter((p=>ya.includes(p)))}return{host:xh.substring(len-k,len).length,path:xf.substring(0,i).length,query:sq.length}}stripURLPrefix(str){const match=/^[a-z]+:(?:\\/){0,2}/i.exec(str);if(!match)return["",str];let prefix=match[0];if(prefix.length<str.length&&str[prefix.length]==" ")return["",str];return[prefix,str.substr(prefix.length)]}getFixupInfo(text){let fixupInfo,fixupError;try{let flags=Ci.nsIURIFixup.FIXUP_FLAG_FIX_SCHEME_TYPOS|Ci.nsIURIFixup.FIXUP_FLAG_ALLOW_KEYWORD_LOOKUP;const info=Services.uriFixup.getFixupURIInfo(text,flags);if(PrivateBrowsingUtils.isWindowPrivate(this.browser.ownerGlobal))flags|=Ci.nsIURIFixup.FIXUP_FLAG_PRIVATE_CONTEXT;fixupInfo={uri:info.fixedURI,href:info.fixedURI.spec,isSearch:!!info.keywordAsSent}}catch(e){fixupError=e.result}return{info:fixupInfo,error:fixupError}}parseURL(text){try{const str=Services.textToSubURI.unEscapeURIForUI(text);const[prefix,suffix]=this.stripURLPrefix(str);if(!suffix&&prefix)return null;const fixup=this.getFixupInfo(text);if(fixup.error)return null;if(!fixup.info?.href||fixup.info?.isSearch)return null;const{uri}=fixup.info;const url=new URL(fixup.info.href);const hostExpected=["http:","https:","ftp:","chrome:"].includes(url.protocol);if(hostExpected&&!url.host)return null;return{uri,url,href:url.toString()}}catch(e){return null}}async receiveMessage(msg){const browser=this.manager.rootFrameLoader.ownerElement,win=browser.ownerGlobal,{data,target}=msg,{windowContext,browsingContext}=target;if(browsingContext.topChromeWindow!==BrowserWindowTracker.getTopWindow())return;const{text,locationURL,locationHost,match,frameID}=data;const csp=E10SUtils.deserializeCSP(data.csp),principal=windowContext.documentPrincipal||Services.scriptSecurityManager.createNullPrincipal({userContextId:win.gBrowser.selectedBrowser.getAttribute("userContextId")});let options={inBackground:Services.prefs.getBoolPref("browser.search.context.loadInBackground",true),triggeringPrincipal:principal,relatedToCurrent:true,allowThirdPartyFixup:true,frameID};const where=locationURL.startsWith(win.BROWSER_NEW_TAB_URL)?"current":"tab";if(!match){const parsed=this.parseURL(text);if(parsed){const{uri}=parsed;let canon=true;let host="";try{host=uri.host}catch(e){}switch(uri.scheme){case"moz-extension":const policy=WebExtensionPolicy.getByHostname(host);if(policy){const extPrincipal=policy&&policy.extension.principal;if(extPrincipal)options.triggeringPrincipal=extPrincipal}else canon=false;break;case"about":canon=E10SUtils.getAboutModule(uri);options.triggeringPrincipal=Services.scriptSecurityManager.getSystemPrincipal();break;case"chrome":case"resource":if(!host){canon=false;break}case"file":options.triggeringPrincipal=Services.scriptSecurityManager.getSystemPrincipal();break;case"data":if(!uri.filePath.includes(",")){canon=false;break}options.forceAllowDataURI=true;options.triggeringPrincipal=Services.scriptSecurityManager.createNullPrincipal({userContextId:win.gBrowser.selectedBrowser.getAttribute("userContextId")});break;case"javascript":canon=false;break;default:options.referrerInfo=E10SUtils.deserializeReferrerInfo(data.referrerInfo);break}if(!!canon)return win.openLinkIn(parsed.href,where,options)}}const engine=await this.getMatchingEngine(match,locationURL,locationHost);win.BrowserSearch._loadSearch(text,where,false,null,principal,csp,options.inBackground,engine)}}XPCOMUtils.defineLazyPreferenceGetter(this,"CUSTOM_MATCHES","userChrome.searchSelectionShortcut.custom-matches","{}",null,(val=>JSON.parse(val)));`,
            { name: "SearchSelectionShortcutParent", type: "jsm" }
        );
        // the child actor is where the hotkey itself is set up. it listens for the Ctrl+Shift+F hotkey,
        // and if text is selected within the actor's frame at the time the hotkey is pressed,
        // it will send a message containing the aforementioned properties back up to the parent actor.
        this.childFile = await this.createTempFile(
            `"use strict";const EXPORTED_SYMBOLS=["SearchSelectionShortcutChild"];const{Services}=ChromeUtils.import("resource://gre/modules/Services.jsm");const{XPCOMUtils}=ChromeUtils.import("resource://gre/modules/XPCOMUtils.jsm");XPCOMUtils.defineLazyModuleGetters(this,{SelectionUtils:"resource://gre/modules/SelectionUtils.jsm",E10SUtils:"resource://gre/modules/E10SUtils.jsm",WebNavigationFrames:"resource://gre/modules/WebNavigationFrames.jsm"});class SearchSelectionShortcutChild extends JSWindowActorChild{getKeyState(e){if(e.code!==KEYCODE||e.repeat)return false;const alt=e.getModifierState("Alt");const shift=e.getModifierState("Shift");if(e.getModifierState("Accel")){if(MATCH_ENGINE_TO_TAB&&!shift&&alt)return"match";if(shift&&!alt)return"default"}return false}handleEvent(e){let match=false;switch(this.getKeyState(e)){case"default":break;case"match":match=true;break;default:return}const doc=e.composedTarget.ownerDocument,selection=SelectionUtils.getSelectionDetails(this.contentWindow,8192);if(!selection?.text||selection?.docSelectionIsCollapsed)return;let msg={csp:E10SUtils.serializeCSP(doc.csp),referrerInfo:E10SUtils.serializeReferrerInfo(doc.referrerInfo),text:selection.text,locationURL:this.contentWindow.location.href,locationHost:this.contentWindow.location.hostname,frameID:WebNavigationFrames.getFrameId(doc.defaultView),match};this.sendAsyncMessage("ctrl-shift-f",msg);e.stopPropagation();e.stopImmediatePropagation();e.preventDefault()}}XPCOMUtils.defineLazyPreferenceGetter(this,"KEYCODE","userChrome.searchSelectionShortcut.keycode","KeyF");XPCOMUtils.defineLazyPreferenceGetter(this,"MATCH_ENGINE_TO_TAB","userChrome.searchSelectionShortcut.match-engine-to-current-tab",false);`,
            { name: "SearchSelectionShortcutChild", type: "jsm" }
        );

        // find the manifest in the temp directory and register it with the component registrar.
        let manifest = FileUtils.getFile("UChrm", [
            ".SearchSelectionShortcut",
            this.manifestFile.name,
        ]);
        // registering the manifest gives the temp folder a chrome:// URI that we can reference below
        if (manifest.exists()) registrar.autoRegister(manifest);
        else return;
        // register the JSActor, passing the temporary files' chrome:// URLs.
        // includeChrome, allFrames, and messageManagerGroups are specified to ensure this works in every frame.
        // this means it'll work on ANY page in ANY browser. it will even work in addon pages loaded in webextension popup panels.
        // for example if you open the uBlock Origin popup from its toolbar button and select some text, the hotkey will search for it in a new tab.
        ChromeUtils.registerWindowActor("SearchSelectionShortcut", {
            parent: {
                moduleURI: this.parentFile.url,
            },
            child: {
                moduleURI: this.childFile.url,
                events: { keydown: { mozSystemGroup: true } },
            },
            includeChrome: true,
            allFrames: true,
            messageManagerGroups: ["browsers", "webext-browsers", "sidebars"],
        });
        // listen for application quit so we can clean up the temp files.
        Services.obs.addObserver(this, "quit-application");
    }
    /**
     * create a file in the temp folder
     * @param {string} contents (the actual file contents in UTF-8)
     * @param {object} options (an optional object containing properties path or name. path creates a file at a specific absolute path. name creates a file of that name in the chrome/.SearchSelectionShortcut folder. if omitted, it will create chrome/.SearchSelectionShortcut/uc-temp)
     * @returns {object} { name, url } (an object containing the filename and a chrome:// URL leading to the file)
     */
    async createTempFile(contents, options = {}) {
        let { path = null, name = "uc-temp", type = "txt" } = options;
        const uuid = Cc["@mozilla.org/uuid-generator;1"]
            .getService(Ci.nsIUUIDGenerator)
            .generateUUID()
            .toString();
        name += "-" + uuid + "." + type;
        if (!path) path = FileUtils.getFile("UChrm", [".SearchSelectionShortcut", name]).path;
        await IOUtils.writeUTF8(path, contents);
        let url = "chrome://uc-searchselectionshortcut/content/" + name;
        return { name, url };
    }
    // application quit listener. clean up the temp files.
    observe(subject, topic, data) {
        switch (topic) {
            case "quit-application":
                Services.obs.removeObserver(this, "quit-application");
                this.cleanup();
                break;
            case "browser-delayed-startup-finished":
                if (subject === window) {
                    Services.obs.removeObserver(this, "browser-delayed-startup-finished");
                    this.handleSplash();
                }
                break;
            default:
        }
    }
    // remove the temp directory when firefox's main process ends
    async cleanup() {
        await IOUtils.remove(this.tempPath, {
            ignoreAbsent: true,
            recursive: true,
        });
    }
    handleSplash() {
        let template = document.getElementById("appMenuNotificationTemplate");
        let target = template?.content || document;
        let panel = target.querySelector("#appMenu-notification-popup");
        panel.appendChild(
            MozXULElement.parseXULToFragment(`<popupnotification id="appMenu-sss-installed-notification" popupid="sss-installed" closebuttonhidden="true"
                learnmoreurl="https://github.com/aminomancer/uc.css.js#search-selection-keyboard-shortcut" dropmarkerhidden="true"
                checkboxhidden="true" secondarybuttonhidden="true" buttonhighlight="true" hasicon="true" hidden="true"
                style="--popup-notification-body-width: 30em;">
                <popupnotificationcontent class="addon-installed-notification-content" orient="vertical">
                    <checkbox id="sss-match-engine-checkbox"
                        label="Add a second hotkey (Ctrl+Alt+F) that matches the search engine to the active page automatically"
                        accesskey="A" />
                </popupnotificationcontent>
            </popupnotification>`)
        );
        let sssResolve = (win) => {
            let match = win.document.getElementById("sss-match-engine-checkbox");
            Services.prefs.setBoolPref(
                "userChrome.searchSelectionShortcut.match-engine-to-current-tab",
                match.checked
            );
            AppMenuNotifications.removeNotification("sss-installed");
        };
        let options = {
            message: `<> has been installed. It adds a second hotkey that can use all your search engines. While visiting a page whose domain matches of your engines, Ctrl+Alt+F will use that engine instead of your default engine.`,
            name: `Search Selection Shortcut 1.6`,
            popupIconURL: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="context-fill" fill-opacity="context-fill-opacity"> <path d="M12.278,1c-1.501,0-2.722,1.221-2.722,2.722v1.167H6.444V3.722C6.444,2.221,5.223,1,3.722,1S1,2.221,1,3.722 s1.221,2.722,2.722,2.722h1.167v3.111H3.722C2.221,9.556,1,10.777,1,12.278S2.221,15,3.722,15s2.722-1.221,2.722-2.722v-1.167 h3.111v1.167c0,1.501,1.221,2.722,2.722,2.722S15,13.779,15,12.278s-1.221-2.722-2.722-2.722h-1.167V6.444h1.167 C13.779,6.444,15,5.223,15,3.722S13.779,1,12.278,1L12.278,1z M11.111,4.889V3.722c0-0.646,0.521-1.167,1.167-1.167 s1.167,0.521,1.167,1.167s-0.521,1.167-1.167,1.167H11.111L11.111,4.889z M3.722,4.889c-0.646,0-1.167-0.521-1.167-1.167 s0.521-1.167,1.167-1.167s1.167,0.521,1.167,1.167v1.167H3.722L3.722,4.889z M6.444,9.556V6.444h3.111v3.111H6.444L6.444,9.556z M12.278,13.444c-0.646,0-1.167-0.521-1.167-1.167v-1.167h1.167c0.646,0,1.167,0.521,1.167,1.167S12.923,13.444,12.278,13.444 L12.278,13.444z M3.722,13.444c-0.646,0-1.167-0.521-1.167-1.167s0.521-1.167,1.167-1.167h1.167v1.167 C4.889,12.923,4.368,13.444,3.722,13.444L3.722,13.444z" /> </svg>`,
            beforeShowDoorhanger: (doc) => {
                let match = doc.getElementById("sss-match-engine-checkbox");
                match.checked = Services.prefs.getBoolPref(
                    "userChrome.searchSelectionShortcut.match-engine-to-current-tab",
                    false
                );
            },
            onDismissed: sssResolve,
        };
        setTimeout(
            () =>
                AppMenuNotifications.showNotification(
                    "sss-installed",
                    { callback: sssResolve },
                    { callback: sssResolve },
                    options
                ),
            5000
        );
    }
}

if (location.href === AppConstants.BROWSER_CHROME_URL) new SearchSelectionShortcut();
