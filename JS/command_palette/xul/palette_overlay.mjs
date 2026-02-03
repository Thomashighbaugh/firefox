import { FuzzySearch } from "../utils/fuzzy_search.mjs";
import { staticCommands } from "../commands/static_commands.mjs";
import {
  generateAboutPageCommands,
  generateSearchEngineCommands,
  generateExtensionCommands,
  generateContainerTabCommands,
  generateCustomCommands,
} from "../commands/dynamic_commands.mjs";
import { CommandStorage } from "../utils/storage.mjs";
import { PrefsWrapper } from "../utils/prefs.mjs";

export class PaletteOverlay {
  #panel = null;
  #listContainer = null;
  #currentCommands = [];
  #selectedIndex = 0;
  #isVisible = false;
  #isActive = false;
  #recentCommands = [];
  #userConfig = null;
  #dynamicCommandsCache = null;
  #eventController = null;
  #originalUrlbarValue = "";

  static MAX_RECENT_COMMANDS = 20;
  static MAX_VISIBLE_COMMANDS = 15;
  static KEYBOARD_SHORTCUT = "P";
  static KEYBOARD_MODIFIERS = { ctrl: true, shift: true };

  static create() {
    const instance = new PaletteOverlay();
    instance.#init();
    return instance;
  }

  loadUserConfig(config) {
    this.#userConfig = config || {};
  }

  #init() {
    this.#createPanel();
    this.#attachEventListeners();
    this.#registerKeyboardShortcut();
    PrefsWrapper.debugLog("PaletteOverlay initialized");
  }

  #createPanel() {
    const doc = document;

    this.#panel = doc.createXULElement("panel");
    this.#panel.id = "command-palette-overlay";
    this.#panel.setAttribute("type", "autocomplete-richlistbox");
    this.#panel.setAttribute("noautofocus", "true");
    this.#panel.setAttribute("norolluponanchor", "true");
    this.#panel.setAttribute("consumeoutsideclicks", "true");
    this.#panel.setAttribute("level", "top");

    this.#panel.addEventListener("popuphidden", () => {
      this.#onPanelHidden();
    });

    const container = doc.createXULElement("vbox");
    container.id = "command-palette-container";
    container.setAttribute("flex", "1");

    this.#listContainer = doc.createXULElement("vbox");
    this.#listContainer.id = "command-palette-list";
    this.#listContainer.setAttribute("flex", "1");

    const emptyState = doc.createXULElement("description");
    emptyState.id = "command-palette-empty";
    emptyState.textContent = "No commands found";
    emptyState.setAttribute("hidden", "true");

    container.appendChild(this.#listContainer);
    container.appendChild(emptyState);
    this.#panel.appendChild(container);

    const popupSet = doc.getElementById("mainPopupSet");
    if (popupSet) {
      popupSet.appendChild(this.#panel);
    }
  }

  #attachEventListeners() {
    const urlbarInput = document.getElementById("urlbar-input");
    if (!urlbarInput) {
      PrefsWrapper.debugError("Could not find urlbar-input");
      return;
    }

    this.#eventController = new AbortController();
    const signal = this.#eventController.signal;

    urlbarInput.addEventListener(
      "input",
      (e) => this.#onUrlbarInput(e),
      { signal }
    );

    urlbarInput.addEventListener(
      "keydown",
      (e) => this.#onKeyDown(e),
      { capture: true, signal }
    );
  }

  #registerKeyboardShortcut() {
    const mainKeyset = document.getElementById("mainKeyset");
    if (!mainKeyset) {
      PrefsWrapper.debugError("Could not find mainKeyset");
      return;
    }

    const key = document.createXULElement("key");
    key.id = "key-command-palette-toggle";
    key.setAttribute("key", PaletteOverlay.KEYBOARD_SHORTCUT);
    key.setAttribute("modifiers", "accel,shift");
    key.setAttribute("oncommand", "void(0);");
    key.addEventListener("command", () => this.toggle());

    mainKeyset.appendChild(key);
    PrefsWrapper.debugLog("Registered keyboard shortcut: Ctrl+Shift+P");
  }

  #onUrlbarInput(event) {
    const value = event.target.value || "";
    const prefix = PrefsWrapper.prefix;

    if (this.#isActive) {
      const query = value.startsWith(prefix) ? value.slice(prefix.length) : value;
      this.#updateCommands(query);
      return;
    }

    if (value.startsWith(prefix) && value.length >= prefix.length) {
      this.#activateWithPrefix(value);
    }
  }

  #onKeyDown(event) {
    if (!this.#isActive || !this.#isVisible) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        event.stopPropagation();
        this.#selectNext();
        break;

      case "ArrowUp":
        event.preventDefault();
        event.stopPropagation();
        this.#selectPrevious();
        break;

      case "Enter":
        if (this.#currentCommands.length > 0) {
          event.preventDefault();
          event.stopPropagation();
          this.#executeSelected();
        }
        break;

      case "Escape":
        event.preventDefault();
        event.stopPropagation();
        this.deactivate();
        break;

      case "Tab":
        event.preventDefault();
        event.stopPropagation();
        if (event.shiftKey) {
          this.#selectPrevious();
        } else {
          this.#selectNext();
        }
        break;

      case "Backspace":
        const urlbarInput = document.getElementById("urlbar-input");
        const prefix = PrefsWrapper.prefix;
        if (urlbarInput && urlbarInput.value === prefix) {
          this.deactivate();
        }
        break;
    }
  }

  #activateWithPrefix(value) {
    const prefix = PrefsWrapper.prefix;
    const query = value.slice(prefix.length);

    this.#isActive = true;
    this.#originalUrlbarValue = "";

    this.#hideNativeUrlbarView();
    this.#showWithCommands(query);

    PrefsWrapper.debugLog("Palette activated with prefix");
  }

  toggle() {
    if (this.#isActive) {
      this.deactivate();
    } else {
      this.activate();
    }
  }

  activate() {
    if (this.#isActive) return;

    const urlbar = window.gURLBar;
    const urlbarInput = document.getElementById("urlbar-input");

    if (!urlbar || !urlbarInput) return;

    this.#originalUrlbarValue = urlbarInput.value || "";
    this.#isActive = true;

    urlbar.focus();
    
    const prefix = PrefsWrapper.prefix;
    urlbarInput.value = prefix;
    urlbarInput.setSelectionRange(prefix.length, prefix.length);

    this.#hideNativeUrlbarView();
    this.#showWithCommands("");

    PrefsWrapper.debugLog("Palette activated via shortcut");
  }

  deactivate() {
    if (!this.#isActive) return;

    this.#isActive = false;
    this.hide();

    const urlbarInput = document.getElementById("urlbar-input");
    if (urlbarInput) {
      urlbarInput.value = this.#originalUrlbarValue;
      
      if (this.#originalUrlbarValue) {
        urlbarInput.setSelectionRange(
          this.#originalUrlbarValue.length,
          this.#originalUrlbarValue.length
        );
      }
    }

    window.gURLBar?.handleRevert();

    PrefsWrapper.debugLog("Palette deactivated");
  }

  #hideNativeUrlbarView() {
    const urlbar = window.gURLBar;
    if (urlbar?.view?.isOpen) {
      urlbar.view.close();
    }
  }

  #onPanelHidden() {
    if (this.#isActive) {
      this.#isActive = false;
      this.#isVisible = false;
      document.documentElement.removeAttribute("command-palette-open");
    }
  }

  async #showWithCommands(query) {
    const allCommands = await this.#generateAllCommands();
    this.#currentCommands = this.#scoreAndFilter(allCommands, query);
    this.#selectedIndex = 0;

    this.#renderCommands();
    this.show();
  }

  async #updateCommands(query) {
    if (!this.#isActive) return;

    const allCommands = await this.#generateAllCommands();
    this.#currentCommands = this.#scoreAndFilter(allCommands, query);
    this.#selectedIndex = 0;
    this.#renderCommands();
  }

  async #generateAllCommands() {
    const dynamicCommands = await this.#generateDynamicCommands();
    return [...staticCommands, ...dynamicCommands];
  }

  async #generateDynamicCommands() {
    if (this.#dynamicCommandsCache) {
      return this.#dynamicCommandsCache;
    }

    const generators = [];

    if (PrefsWrapper.getPref(PrefsWrapper.DYNAMIC_ABOUT_PAGES)) {
      generators.push(generateAboutPageCommands());
    }
    if (PrefsWrapper.getPref(PrefsWrapper.DYNAMIC_SEARCH_ENGINES)) {
      generators.push(generateSearchEngineCommands());
    }
    if (PrefsWrapper.getPref(PrefsWrapper.DYNAMIC_EXTENSIONS)) {
      generators.push(generateExtensionCommands());
    }
    if (PrefsWrapper.getPref(PrefsWrapper.DYNAMIC_CONTAINER_TABS)) {
      generators.push(generateContainerTabCommands());
    }

    generators.push(generateCustomCommands(CommandStorage));

    const commandSets = await Promise.all(generators);
    const dynamicCommands = commandSets.flat();

    this.#dynamicCommandsCache = dynamicCommands;
    return dynamicCommands;
  }

  #scoreAndFilter(commands, query) {
    const scored = [];
    const minScore = PrefsWrapper.minScoreThreshold;

    for (const cmd of commands) {
      if (!this.#commandIsVisible(cmd)) continue;
      if (this.#userConfig?.hiddenCommands?.includes(cmd.key)) continue;

      let score = 0;
      if (query && query.length > 0) {
        const labelScore = FuzzySearch.calculateScore(cmd.label, query);
        const tagsScore = Math.max(
          0,
          ...(cmd.tags || []).map((tag) => FuzzySearch.calculateScore(tag, query))
        );
        score = Math.max(labelScore, tagsScore);

        if (score < minScore) continue;
      } else {
        const recentIndex = this.#recentCommands.indexOf(cmd.key);
        score = recentIndex >= 0 ? 1000 - recentIndex : 500;
      }

      scored.push({ ...cmd, score });
    }

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, PaletteOverlay.MAX_VISIBLE_COMMANDS);
  }

  #commandIsVisible(cmd) {
    try {
      if (typeof cmd.condition === "function") {
        return !!cmd.condition(window);
      } else if (cmd.condition !== undefined) {
        return cmd.condition !== false;
      }

      if (typeof cmd.command !== "function") {
        const commandEl = document.getElementById(cmd.key);
        if (!commandEl || commandEl.disabled) {
          return false;
        }
      }

      return true;
    } catch (e) {
      PrefsWrapper.debugError("Error evaluating condition for", cmd.key, e);
      return false;
    }
  }

  #renderCommands() {
    if (!this.#listContainer) return;

    while (this.#listContainer.firstChild) {
      this.#listContainer.removeChild(this.#listContainer.firstChild);
    }

    const emptyState = document.getElementById("command-palette-empty");

    if (this.#currentCommands.length === 0) {
      if (emptyState) emptyState.removeAttribute("hidden");
      return;
    }

    if (emptyState) emptyState.setAttribute("hidden", "true");

    this.#currentCommands.forEach((cmd, index) => {
      const item = this.#createCommandItem(cmd, index);
      this.#listContainer.appendChild(item);
    });

    this.#updateSelection();
  }

  #createCommandItem(cmd, index) {
    const doc = document;
    const item = doc.createXULElement("hbox");
    item.className = "command-palette-item";
    item.setAttribute("data-index", index);
    item.setAttribute("data-key", cmd.key);

    const icon = doc.createXULElement("image");
    icon.className = "command-palette-icon";
    icon.setAttribute("src", cmd.icon || "chrome://browser/skin/tab.svg");

    const label = doc.createXULElement("label");
    label.className = "command-palette-label";
    label.setAttribute("value", cmd.label);
    label.setAttribute("flex", "1");
    label.setAttribute("crop", "end");

    item.appendChild(icon);
    item.appendChild(label);

    if (cmd.category) {
      const category = doc.createXULElement("label");
      category.className = "command-palette-category";
      category.setAttribute("value", cmd.category);
      item.appendChild(category);
    }

    item.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.#selectedIndex = index;
      this.#executeSelected();
    });

    item.addEventListener("mouseenter", () => {
      this.#selectedIndex = index;
      this.#updateSelection();
    });

    return item;
  }

  #updateSelection() {
    const items = this.#listContainer?.querySelectorAll(".command-palette-item");
    if (!items) return;

    items.forEach((item, index) => {
      if (index === this.#selectedIndex) {
        item.setAttribute("selected", "true");
        item.scrollIntoView({ block: "nearest" });
      } else {
        item.removeAttribute("selected");
      }
    });
  }

  #selectNext() {
    if (this.#currentCommands.length === 0) return;
    this.#selectedIndex = (this.#selectedIndex + 1) % this.#currentCommands.length;
    this.#updateSelection();
  }

  #selectPrevious() {
    if (this.#currentCommands.length === 0) return;
    this.#selectedIndex =
      (this.#selectedIndex - 1 + this.#currentCommands.length) %
      this.#currentCommands.length;
    this.#updateSelection();
  }

  #executeSelected() {
    const cmd = this.#currentCommands[this.#selectedIndex];
    if (!cmd) return;

    PrefsWrapper.debugLog("Executing command:", cmd.key);

    try {
      if (typeof cmd.command === "function") {
        cmd.command();
      } else {
        const commandEl = document.getElementById(cmd.key);
        if (commandEl && !commandEl.disabled) {
          commandEl.doCommand();
        }
      }

      this.#addRecentCommand(cmd.key);
      this.#originalUrlbarValue = "";
      this.deactivate();
    } catch (e) {
      PrefsWrapper.debugError("Error executing command:", cmd.key, e);
    }
  }

  #addRecentCommand(key) {
    const index = this.#recentCommands.indexOf(key);
    if (index > -1) {
      this.#recentCommands.splice(index, 1);
    }
    this.#recentCommands.unshift(key);
    if (this.#recentCommands.length > PaletteOverlay.MAX_RECENT_COMMANDS) {
      this.#recentCommands.length = PaletteOverlay.MAX_RECENT_COMMANDS;
    }
  }

  show() {
    if (!this.#panel) return;

    const urlbar = document.getElementById("urlbar");
    if (!urlbar) return;

    this.#panel.openPopup(urlbar, "after_start", 0, 0, false, false);

    const urlbarRect = urlbar.getBoundingClientRect();
    this.#panel.style.width = `${urlbarRect.width}px`;

    this.#isVisible = true;
    document.documentElement.setAttribute("command-palette-open", "true");

    PrefsWrapper.debugLog("Palette overlay shown");
  }

  hide() {
    if (!this.#panel || !this.#isVisible) return;

    this.#panel.hidePopup();
    this.#isVisible = false;
    document.documentElement.removeAttribute("command-palette-open");

    PrefsWrapper.debugLog("Palette overlay hidden");
  }

  get isActive() {
    return this.#isActive;
  }

  clearCache() {
    this.#dynamicCommandsCache = null;
  }

  destroy() {
    if (this.#eventController) {
      this.#eventController.abort();
    }

    const key = document.getElementById("key-command-palette-toggle");
    if (key) key.remove();

    if (this.#panel) {
      this.#panel.remove();
    }

    this.#panel = null;
    this.#listContainer = null;
    this.#currentCommands = [];
    this.#isVisible = false;
    this.#isActive = false;
  }
}
