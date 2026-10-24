// ==UserScript==
// @name           Shortcut Cheat-sheet
// @description    Searchable panel listing every active browser, QuickTabs and
//                 second-sidebar shortcut. Adds a toolbar button and Ctrl+Alt+K.
// @include        main
// @onlyonce
// ==/UserScript==

// The shortcut registry is the single owner of binding metadata. It enumerates:
//   1. XUL <key> elements in every <keyset> (native Firefox + our scripts), so a
//      user-remapped key is picked up automatically from the live DOM;
//   2. second-sidebar shortcuts, which are stored in its JSON prefs rather than
//      in <key> elements;
//   3. entries registered through window.HiggsShortcuts.register() for actions
//      that have no XUL key.
//
// Components that run before this script may push descriptors onto
// window.HiggsShortcutsQueue; they are drained at startup.

(function () {
  "use strict";

  if (location.href !== "chrome://browser/content/browser.xhtml") return;

  const PREF_ENABLED = "userchrome.shortcuts.button";
  const PREF_HOTKEY = "userchrome.shortcuts.hotkey";
  const WIDGET_ID = "higgs-shortcut-cheatsheet";
  const PANEL_ID = "higgs-shortcut-cheatsheet-panel";
  const KEY_ID = "higgs-shortcut-cheatsheet-key";
  const SEARCH_ID = "higgs-shortcut-cheatsheet-search";
  const XHTML_NS = "http://www.w3.org/1999/xhtml";
  const DEFAULT_HOTKEY = "Ctrl+Alt+K";

  const registry = new Map();
  let entries = [];
  let visibleRows = [];
  let panel = null;
  let searchInput = null;
  let listBox = null;
  let emptyLabel = null;
  let countLabel = null;
  let widgetNode = null;
  let widgetCreated = false;
  let hotkeyEl = null;
  let refreshTimer = null;
  let initialized = false;

  const prefOn = () => {
    try {
      return Services.prefs.getBoolPref(PREF_ENABLED, true);
    } catch (e) {
      return true;
    }
  };

  const getStringPref = (name, fallback) => {
    try {
      return Services.prefs.getStringPref(name, fallback);
    } catch (e) {
      return fallback;
    }
  };

  const readJSONPref = (name) => {
    try {
      const raw = Services.prefs.getStringPref(name, "");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  };

  /* ------------------------------- geometry -------------------------------- */

  const IS_MAC = (() => {
    try {
      return Services.appinfo.OS === "Darwin";
    } catch (e) {
      return false;
    }
  })();

  const ACCEL_LABEL = IS_MAC ? "⌘" : "Ctrl";
  const ALT_LABEL = IS_MAC ? "⌥" : "Alt";

  const KEYCODE_LABELS = {
    VK_LEFT: "←",
    VK_RIGHT: "→",
    VK_UP: "↑",
    VK_DOWN: "↓",
    VK_DELETE: "Del",
    VK_BACK: "Backspace",
    VK_RETURN: "Enter",
    VK_ESCAPE: "Esc",
    VK_TAB: "Tab",
    VK_SPACE: "Space",
    VK_HOME: "Home",
    VK_END: "End",
    VK_PAGE_UP: "PgUp",
    VK_PAGE_DOWN: "PgDn",
    VK_INSERT: "Insert",
  };

  function normalizeModifiers(raw) {
    const parts = String(raw || "")
      .split(/[,\s]+/)
      .filter(Boolean)
      .map((m) => m.toLowerCase());
    const out = [];
    if (parts.includes("control")) out.push(IS_MAC ? "⌃" : "Ctrl");
    if (parts.includes("accel")) out.push(ACCEL_LABEL);
    if (parts.includes("alt")) out.push(ALT_LABEL);
    if (parts.includes("shift")) out.push("Shift");
    if (parts.includes("meta")) out.push(IS_MAC ? "⌘" : "Meta");
    return out;
  }

  function keyLabel(keyEl) {
    const code = keyEl.getAttribute("keycode");
    if (code) {
      if (KEYCODE_LABELS[code]) return KEYCODE_LABELS[code];
      if (code.startsWith("VK_")) return code.slice(3);
      return code;
    }
    const key = keyEl.getAttribute("key");
    if (!key) return "";
    if (key.startsWith("VK_")) return KEYCODE_LABELS[key] || key.slice(3);
    return key.length === 1 ? key.toUpperCase() : key;
  }

  function shortcutLabel(keyEl) {
    const parts = normalizeModifiers(keyEl.getAttribute("modifiers"));
    const key = keyLabel(keyEl);
    if (!key) return "";
    parts.push(key);
    return parts.join("+");
  }

  /* ------------------------------- naming ---------------------------------- */

  const KEY_OVERRIDES = {
    "higgs-shortcut-cheatsheet-key": {
      name: "Open shortcut cheat-sheet",
      category: "Interface",
    },
    "qt-key-open": { name: "Open current tab in Quick Tab", category: "QuickTabs" },
    "qt-key-close": { name: "Close focused Quick Tab", category: "QuickTabs" },
    "qt-key-search-selection": {
      name: "Search selection in Quick Tab",
      category: "QuickTabs",
    },
  };

  // Native commands are often shared by a <key> and a menu item; the menu item
  // carries the human-readable Fluent id. Used only when no such item exists.
  const COMMAND_LABEL_FALLBACKS = {
    cmd_newNavigator: "New Window",
    cmd_newNavigatorTabNoEvent: "New Tab",
    "Browser:OpenLocation": "Focus Address Bar",
    "Tools:Search": "Search",
    "Tools:Downloads": "Downloads",
    "Tools:Addons": "Add-ons",
    "Browser:OpenFile": "Open File",
    "Browser:SavePage": "Save Page",
    cmd_print: "Print",
    cmd_close: "Close Tab",
    cmd_closeWindow: "Close Window",
    "Browser:Back": "Back",
    "Browser:Forward": "Forward",
    "Browser:Reload": "Reload",
    "Browser:ReloadSkipCache": "Reload (skip cache)",
    "Browser:ShowAllHistory": "Show All History",
    "View:FullScreen": "Toggle Full Screen",
    "View:ReaderView": "Toggle Reader View",
    "View:PictureInPicture": "Toggle Picture-in-Picture",
    "Browser:DuplicateTab": "Duplicate Tab",
    "Browser:NextTab": "Next Tab",
    "Browser:PrevTab": "Previous Tab",
    "Browser:ShowAllTabs": "Show All Tabs",
    "History:UndoCloseTab": "Reopen Closed Tab",
    "History:UndoCloseWindow": "Reopen Closed Window",
    "Tools:Sanitize": "Clear Recent History",
    "Tools:PrivateBrowsing": "New Private Window",
    "Browser:Screenshot": "Take Screenshot",
  };

  function prettifyCommand(command) {
    if (!command) return "";
    return command
      .replace(/^(Browser|Tools|View|History|placesCmd|cmd):?/, "")
      .replace(/[:_]/g, " ")
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .replace(/\bNo Event\b/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function categoryFor(command, keyEl) {
    if (keyEl?.getAttribute("internal") === "true") return "Editing";
    if (!command) return "Interface";
    if (command.startsWith("Tools:")) return "Tools";
    if (command.startsWith("View:")) return "View";
    if (command.startsWith("History:")) return "History";
    if (command.startsWith("placesCmd")) return "Places";
    if (
      command === "Browser:NextTab" ||
      command === "Browser:PrevTab" ||
      command === "Browser:DuplicateTab" ||
      command === "Browser:ShowAllTabs" ||
      command === "Browser:AddTabSplitView"
    ) {
      return "Tabs";
    }
    if (command.startsWith("Browser:") && /OpenLocation|Back|Forward|Reload|Stop/.test(command)) {
      return "Navigation";
    }
    return "Browser";
  }

  /* --------------------------- label localisation --------------------------- */

  function parseL10nArgs(el) {
    const raw = el.getAttribute("data-l10n-args");
    if (!raw) return undefined;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return undefined;
    }
  }

  async function resolveCommandLabels() {
    const labels = new Map();
    const pending = [];
    if (!document.l10n?.formatValue) return labels;
    for (const el of document.querySelectorAll("[command][data-l10n-id], [command][label]")) {
      const command = el.getAttribute("command");
      if (!command || el.localName === "key" || labels.has(command)) continue;
      const l10nId = el.getAttribute("data-l10n-id");
      if (l10nId) {
        labels.set(command, null);
        pending.push(
          document.l10n
            .formatValue(l10nId, parseL10nArgs(el))
            .then((value) => {
              if (value) labels.set(command, value);
            })
            .catch(() => {}),
        );
      } else {
        labels.set(command, el.getAttribute("label"));
      }
    }
    await Promise.all(pending);
    return labels;
  }

  /* ------------------------------ binding sources ---------------------------- */

  function collectKeyEntries(commandLabels) {
    const out = [];
    for (const keyEl of document.querySelectorAll("keyset key")) {
      if (keyEl.disabled || keyEl.getAttribute("disabled") === "true") continue;
      const keys = shortcutLabel(keyEl);
      if (!keys) continue;

      const command = keyEl.getAttribute("command");
      const override = KEY_OVERRIDES[keyEl.id];
      const name =
        override?.name ||
        commandLabels.get(command) ||
        COMMAND_LABEL_FALLBACKS[command] ||
        prettifyCommand(command) ||
        keyEl.getAttribute("label") ||
        keyEl.id ||
        "Unnamed shortcut";

      out.push({
        id: `key:${keyEl.id || keys}`,
        name,
        keys,
        category: override?.category || categoryFor(command, keyEl),
        source: "firefox",
        invoke: () => invokeKeyElement(keyEl),
      });
    }
    return out;
  }

  function hostOf(url) {
    try {
      return new URL(url).hostname || url;
    } catch (e) {
      return url || "Web panel";
    }
  }

  function collectSecondSidebarEntries() {
    const out = [];
    const settings = readJSONPref("second-sidebar.settings") || {};

    if (settings.sidebarWidgetShortcut) {
      out.push({
        id: "second-sidebar:widget",
        name: "Toggle second sidebar",
        keys: settings.sidebarWidgetShortcut,
        category: "Second sidebar",
        source: "second-sidebar",
        invoke: () =>
          clickWidget("sb2-collapse-button") ||
          dispatchShortcut(settings.sidebarWidgetShortcut),
      });
    }

    if (settings.lastWebPanelShortcut) {
      out.push({
        id: "second-sidebar:last-panel",
        name: "Switch to last web panel",
        keys: settings.lastWebPanelShortcut,
        category: "Second sidebar",
        source: "second-sidebar",
        invoke: () => dispatchShortcut(settings.lastWebPanelShortcut),
      });
    }

    for (const webPanel of readJSONPref("second-sidebar.web-panels") || []) {
      if (!webPanel?.shortcut) continue;
      const title = webPanel.title || hostOf(webPanel.url);
      out.push({
        id: `second-sidebar:panel:${webPanel.uuid}`,
        name: `Open web panel: ${title}`,
        keys: webPanel.shortcut,
        category: "Second sidebar",
        source: "second-sidebar",
        invoke: () =>
          clickWidget(webPanel.uuid) ||
          dispatchShortcut(webPanel.shortcut),
      });
    }

    return out;
  }

  function collectRegisteredEntries() {
    return [...registry.values()].map((entry) => ({
      id: entry.id,
      name: entry.name || entry.id,
      keys: entry.keys || entry.shortcut || "",
      category: entry.category || "Interface",
      source: entry.source || "registered",
      invoke: entry.invoke || null,
    }));
  }

  function dedupe(items) {
    const seen = new Set();
    return items.filter((item) => {
      const key = `${item.keys}|${item.name}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  async function buildEntries() {
    // Components may have queued descriptors before the registry loaded, or at
    // any point after; drain them on every rebuild.
    for (const entry of window.HiggsShortcutsQueue?.splice(0) || []) {
      if (entry?.id) registry.set(entry.id, entry);
    }
    const commandLabels = await resolveCommandLabels();
    return dedupe([
      ...collectKeyEntries(commandLabels),
      ...collectSecondSidebarEntries(),
      ...collectRegisteredEntries(),
    ]).sort(
      (a, b) =>
        a.category.localeCompare(b.category) || a.name.localeCompare(b.name),
    );
  }

  /* ------------------------------- invocation ------------------------------- */

  function invokeKeyElement(keyEl) {
    if (!keyEl.isConnected) return false;
    const command = keyEl.getAttribute("command");
    const target = command ? document.getElementById(command) : keyEl;
    if (!target) return false;
    if (typeof target.doCommand === "function") {
      target.doCommand();
      return true;
    }
    const event = new CustomEvent("command", { bubbles: true, cancelable: true });
    if (typeof target.dispatchEvent === "function") {
      target.dispatchEvent(event);
      return true;
    }
    return false;
  }

  function clickWidget(id) {
    try {
      const widget = window.CustomizableUI?.getWidget(id);
      const node =
        widget?.forWindow(window)?.node || document.getElementById(id);
      if (!node) return false;
      node.click();
      return true;
    } catch (e) {
      return false;
    }
  }

  // Second-sidebar binds keys with a keypress listener rather than a XUL <key>.
  // Replaying the matching keypress is the only programmatic trigger it exposes.
  function dispatchShortcut(shortcut) {
    if (!shortcut) return false;
    const parts = shortcut.split("+").map((p) => p.trim()).filter(Boolean);
    const key = parts.pop();
    if (!key) return false;
    let code;
    if (/^[a-z]$/i.test(key)) code = `Key${key.toUpperCase()}`;
    else if (/^\d$/.test(key)) code = `Digit${key}`;
    else code = key.length === 1 ? key : key.toUpperCase();

    const event = new KeyboardEvent("keypress", {
      key,
      code,
      ctrlKey: parts.some((p) => p.toLowerCase() === "ctrl"),
      altKey: parts.some((p) => p.toLowerCase() === "alt"),
      shiftKey: parts.some((p) => p.toLowerCase() === "shift"),
      metaKey: parts.some((p) => ["meta", "cmd"].includes(p.toLowerCase())),
      bubbles: true,
      cancelable: true,
    });
    document.documentElement.dispatchEvent(event);
    return true;
  }

  function invokeEntry(entry) {
    if (!entry?.invoke) return;
    try {
      panel?.hidePopup();
    } catch (e) {
      /* noop */
    }
    // Give the panel time to close before an action opens its own popup/dialog.
    setTimeout(() => {
      try {
        if (entry.invoke() === false) {
          console.warn(`[ShortcutCheatsheet] "${entry.name}" could not be invoked`);
        }
      } catch (e) {
        console.error(`[ShortcutCheatsheet] "${entry.name}" failed`, e);
      }
    }, 0);
  }

  /* --------------------------------- panel --------------------------------- */

  const matchesQuery = (entry, query) =>
    !query ||
    `${entry.name} ${entry.keys} ${entry.category}`
      .toLowerCase()
      .includes(query);

  function makeLabel(value, className) {
    const label = document.createXULElement("label");
    label.className = className;
    label.setAttribute("value", value);
    return label;
  }

  function renderList() {
    if (!listBox) return;
    const query = (searchInput?.value || "").trim().toLowerCase();
    listBox.textContent = "";
    visibleRows = [];

    let lastCategory = null;
    for (const entry of entries) {
      if (!matchesQuery(entry, query)) continue;
      if (entry.category !== lastCategory) {
        lastCategory = entry.category;
        const header = makeLabel(entry.category, "higgs-shortcut-category");
        listBox.appendChild(header);
      }
      const row = document.createXULElement("hbox");
      row.className = "higgs-shortcut-row";
      row.setAttribute("tabindex", "0");
      row.setAttribute("role", "button");
      row.appendChild(makeLabel(entry.name, "higgs-shortcut-name"));
      row.appendChild(makeLabel(entry.keys || "—", "higgs-shortcut-keys"));
      row.addEventListener("click", () => invokeEntry(entry));
      row.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          invokeEntry(entry);
        }
      });
      listBox.appendChild(row);
      visibleRows.push(row);
    }

    if (emptyLabel) emptyLabel.hidden = visibleRows.length > 0;
    if (countLabel) {
      countLabel.setAttribute(
        "value",
        `${visibleRows.length} of ${entries.length} shortcuts`,
      );
    }
  }

  function moveRowFocus(delta) {
    if (!visibleRows.length) return;
    const index = visibleRows.indexOf(document.activeElement);
    const next =
      index < 0
        ? 0
        : Math.min(visibleRows.length - 1, Math.max(0, index + delta));
    visibleRows[next].focus();
  }

  function onPanelKeyDown(event) {
    if (event.key === "Escape") {
      panel?.hidePopup();
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      moveRowFocus(event.key === "ArrowDown" ? 1 : -1);
    }
  }

  function createPanel() {
    if (panel) return;
    panel = document.createXULElement("panel");
    panel.id = PANEL_ID;
    panel.setAttribute("type", "arrow");
    panel.setAttribute("orient", "vertical");
    panel.setAttribute("noautofocus", "false");

    const body = document.createXULElement("vbox");
    body.className = "higgs-shortcut-body";

    searchInput = document.createElementNS(XHTML_NS, "input");
    searchInput.id = SEARCH_ID;
    searchInput.setAttribute("type", "search");
    searchInput.setAttribute("placeholder", "Search shortcuts…");
    searchInput.setAttribute("autocomplete", "off");
    searchInput.setAttribute("spellcheck", "false");
    searchInput.className = "higgs-shortcut-search";
    searchInput.addEventListener("input", renderList);

    const scroll = document.createXULElement("scrollbox");
    scroll.className = "higgs-shortcut-scroll";
    scroll.setAttribute("flex", "1");
    scroll.setAttribute("orient", "vertical");

    listBox = document.createXULElement("vbox");
    listBox.className = "higgs-shortcut-list";
    scroll.appendChild(listBox);

    emptyLabel = makeLabel("No matching shortcuts", "higgs-shortcut-empty");
    emptyLabel.hidden = true;

    const footer = document.createXULElement("hbox");
    footer.className = "higgs-shortcut-footer";
    countLabel = makeLabel("", "higgs-shortcut-count");
    footer.appendChild(countLabel);

    body.appendChild(searchInput);
    body.appendChild(scroll);
    body.appendChild(emptyLabel);
    body.appendChild(footer);
    panel.appendChild(body);

    (document.getElementById("mainPopupSet") || document.documentElement).appendChild(panel);
    panel.addEventListener("keydown", onPanelKeyDown);
    panel.addEventListener("popupshown", () => {
      setTimeout(() => searchInput?.focus(), 0);
    });
  }

  function anchorFor(node) {
    return (
      node ||
      document.getElementById(WIDGET_ID) ||
      document.getElementById("nav-bar") ||
      document.documentElement
    );
  }

  async function openPanel(node) {
    if (!prefOn()) return;
    if (!panel) createPanel();
    entries = await buildEntries();
    if (!panel || !prefOn()) return;
    renderList();
    if (panel.state === "open") {
      searchInput?.focus();
      return;
    }
    try {
      panel.openPopup(anchorFor(node), "bottomcenter topright", 0, 0, false, false);
    } catch (e) {
      panel.openPopupAtScreen(0, 0, true);
    }
  }

  function togglePanel(node) {
    if (panel?.state === "open") panel.hidePopup();
    else openPanel(node);
  }

  /* -------------------------------- toolbar -------------------------------- */

  function installWidget() {
    if (widgetCreated) return;
    try {
      window.CustomizableUI.createWidget({
        id: WIDGET_ID,
        type: "button",
        defaultArea: window.CustomizableUI.AREA_NAVBAR,
        removable: true,
        label: "Shortcut cheat-sheet",
        tooltiptext: "Shortcut cheat-sheet",
        onCreated: (node) => {
          widgetNode = node;
          node.classList.add("higgs-shortcut-button");
        },
        onClick: () => togglePanel(widgetNode || document.getElementById(WIDGET_ID)),
      });
      widgetCreated = true;
    } catch (e) {
      // A stale widget from a previous load survives a soft reload.
      widgetCreated = !!window.CustomizableUI.getWidget(WIDGET_ID);
      console.warn("[ShortcutCheatsheet] widget already exists", e);
    }
  }

  function removeWidget() {
    if (!widgetCreated) return;
    try {
      window.CustomizableUI.destroyWidget(WIDGET_ID);
    } catch (e) {
      /* noop */
    }
    widgetCreated = false;
    widgetNode = null;
  }

  /* -------------------------------- hotkey --------------------------------- */

  function parseHotkey(raw) {
    const parts = String(raw || "")
      .split("+")
      .map((p) => p.trim())
      .filter(Boolean);
    const key = parts.pop();
    if (!key) return null;

    const modifiers = [];
    for (const part of parts.map((p) => p.toLowerCase())) {
      if (part === "ctrl" || part === "control") modifiers.push("accel");
      else if (part === "alt") modifiers.push("alt");
      else if (part === "shift") modifiers.push("shift");
      else if (part === "meta" || part === "cmd") modifiers.push("meta");
    }

    const isKeycode =
      /^VK_/.test(key) ||
      /^F\d{1,2}$/i.test(key) ||
      /^(Left|Right|Up|Down|Home|End|PageUp|PageDown|Delete|Backspace|Enter|Escape|Tab|Space)$/i.test(
        key,
      );

    return {
      key: isKeycode ? "" : key,
      keycode: isKeycode ? (key.startsWith("VK_") ? key : `VK_${key.toUpperCase()}`) : "",
      modifiers: modifiers.join(","),
    };
  }

  function installHotkey() {
    hotkeyEl?.remove();
    hotkeyEl = null;
    if (!prefOn()) return;

    const parsed = parseHotkey(getStringPref(PREF_HOTKEY, DEFAULT_HOTKEY));
    if (!parsed) return;
    const keyset =
      document.getElementById("mainKeyset") ||
      document.querySelector("keyset");
    if (!keyset) return;

    hotkeyEl = document.createXULElement("key");
    hotkeyEl.id = KEY_ID;
    if (parsed.key) hotkeyEl.setAttribute("key", parsed.key);
    if (parsed.keycode) hotkeyEl.setAttribute("keycode", parsed.keycode);
    if (parsed.modifiers) hotkeyEl.setAttribute("modifiers", parsed.modifiers);
    hotkeyEl.addEventListener("command", () =>
      togglePanel(widgetNode || document.getElementById(WIDGET_ID)),
    );
    keyset.appendChild(hotkeyEl);
  }

  /* ------------------------------- lifecycle ------------------------------- */

  function scheduleRefresh() {
    if (!initialized) return;
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(async () => {
      entries = await buildEntries();
      renderList();
    }, 250);
  }

  function syncEnabled() {
    if (prefOn()) {
      if (!panel) createPanel();
      installWidget();
      installHotkey();
    } else {
      panel?.hidePopup();
      panel?.remove();
      panel = null;
      listBox = searchInput = emptyLabel = countLabel = null;
      removeWidget();
      hotkeyEl?.remove();
      hotkeyEl = null;
    }
  }

  function init() {
    initialized = true;
    if (prefOn()) {
      createPanel();
      installWidget();
      installHotkey();
    }
    buildEntries().then((items) => {
      entries = items;
      renderList();
    });
  }

  const prefObserver = {
    observe() {
      try {
        syncEnabled();
      } catch (e) {
        console.error("[ShortcutCheatsheet] pref update failed", e);
      }
    },
  };

  // Public registry. Components without a XUL <key> call register(); components
  // that load before this script can push onto window.HiggsShortcutsQueue.
  window.HiggsShortcuts = {
    register(entry) {
      if (!entry?.id) return;
      registry.set(entry.id, entry);
      scheduleRefresh();
    },
    unregister(id) {
      registry.delete(id);
      scheduleRefresh();
    },
    list() {
      return entries.slice();
    },
    refresh: scheduleRefresh,
    open(node) {
      return openPanel(node);
    },
    get panelId() {
      return PANEL_ID;
    },
    get keyId() {
      return KEY_ID;
    },
  };
  window.HiggsShortcutsQueue = window.HiggsShortcutsQueue || [];

  const start = () => {
    for (const entry of window.HiggsShortcutsQueue.splice(0)) {
      if (entry?.id) registry.set(entry.id, entry);
    }
    init();
  };

  if (window.gBrowser?.tabContainer) {
    start();
  } else {
    Services.obs.addObserver(function obs(subject) {
      if (subject === window && window.gBrowser?.tabContainer) {
        Services.obs.removeObserver(obs, "browser-delayed-startup-finished");
        start();
      }
    }, "browser-delayed-startup-finished");
  }

  try {
    Services.prefs.addObserver("userchrome.shortcuts.", prefObserver);
  } catch (e) {
    /* noop */
  }

  window.addEventListener(
    "unload",
    () => {
      try {
        Services.prefs.removeObserver("userchrome.shortcuts.", prefObserver);
      } catch (e) {
        /* noop */
      }
      clearTimeout(refreshTimer);
      panel?.remove();
      removeWidget();
      hotkeyEl?.remove();
      delete window.HiggsShortcuts;
    },
    { once: true },
  );
})();
