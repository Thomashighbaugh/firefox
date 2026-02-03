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
import { ModeSwitcher } from "./mode_switcher.mjs";

export class PaletteOverlay {
  #panel = null;
  #inlineContainer = null;
  #listContainer = null;
  #modeSwitcher = null;
  #currentCommands = [];
  #selectedIndex = 0;
  #isVisible = false;
  #isActive = false;
  #recentCommands = [];
  #userConfig = null;
  #dynamicCommandsCache = null;
  #eventController = null;
  #originalUrlbarValue = "";
  #urlbarObserver = null;

  static MAX_RECENT_COMMANDS = 20;
  static MAX_VISIBLE_COMMANDS = 15;
  static KEYBOARD_SHORTCUT = "P";
  static KEYBOARD_MODIFIERS = { alt: true, shift: true };

  static create() {
    const instance = new PaletteOverlay();
    instance.#init();
    return instance;
  }

  loadUserConfig(config) {
    this.#userConfig = config || {};
  }

  #init() {
    this.#createModeSwitcher();
    this.#createInlineContainer();
    this.#createLegacyPanel(); // Keep legacy panel for prefix mode
    this.#attachEventListeners();
    this.#registerKeyboardShortcut();
    this.#observeUrlbarExpansion();
    PrefsWrapper.debugLog("PaletteOverlay initialized with dual-mode support");
  }

  #createModeSwitcher() {
    this.#modeSwitcher = ModeSwitcher.create((mode) => {
      this.#onModeChange(mode);
    });
  }

  #createInlineContainer() {
    const doc = document;

    // Create inline command list container (shown inside expanded urlbar)
    this.#inlineContainer = doc.createXULElement("vbox");
    this.#inlineContainer.id = "command-palette-inline-container";
    this.#inlineContainer.className = "command-palette-inline-container";
    this.#inlineContainer.setAttribute("hidden", "true");

    const listContainer = doc.createXULElement("vbox");
    listContainer.id = "command-palette-inline-list";
    listContainer.className = "command-palette-list";
    listContainer.setAttribute("flex", "1");

    const emptyState = doc.createXULElement("description");
    emptyState.id = "command-palette-inline-empty";
    emptyState.className = "command-palette-empty";
    emptyState.textContent = "No commands found. Start typing to search...";
    emptyState.setAttribute("hidden", "true");

    this.#inlineContainer.appendChild(listContainer);
    this.#inlineContainer.appendChild(emptyState);
  }

  #createLegacyPanel() {
    // Keep legacy panel for standalone prefix mode (:command)
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

  #observeUrlbarExpansion() {
    const urlbarEl = document.getElementById("urlbar");
    if (!urlbarEl) return;

    this.#urlbarObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === "breakout-extend") {
          const isExpanded = urlbarEl.hasAttribute("breakout-extend");
          if (isExpanded) {
            this.#onUrlbarExpanded();
          } else {
            this.#onUrlbarCollapsed();
          }
        }
      }
    });

    this.#urlbarObserver.observe(urlbarEl, { attributes: true });
  }

  #onUrlbarExpanded() {
    // Inject mode switcher and inline container into the urlbar view
    const urlbarView = document.querySelector(".urlbarView");
    if (!urlbarView) return;

    // Insert mode switcher at the top
    const modeSwitcherEl = this.#modeSwitcher.element;
    if (modeSwitcherEl && !modeSwitcherEl.parentNode) {
      urlbarView.insertBefore(modeSwitcherEl, urlbarView.firstChild);
    }
    modeSwitcherEl?.removeAttribute("hidden");

    // Insert inline container after mode switcher
    if (this.#inlineContainer && !this.#inlineContainer.parentNode) {
      const firstChild = urlbarView.firstChild;
      if (firstChild?.nextSibling) {
        urlbarView.insertBefore(this.#inlineContainer, firstChild.nextSibling);
      } else {
        urlbarView.appendChild(this.#inlineContainer);
      }
    }

    // If we're in commands mode, show the command list
    if (this.#modeSwitcher.isCommandsMode) {
      this.#showInlineCommands();
    }
  }

  #onUrlbarCollapsed() {
    // Reset to search mode when urlbar collapses
    if (this.#modeSwitcher.isCommandsMode) {
      this.#modeSwitcher.setMode(ModeSwitcher.MODES.SEARCH, false);
    }

    // Hide inline container
    this.#inlineContainer?.setAttribute("hidden", "true");

    // Clear active state and CSS attributes
    if (this.#isActive) {
      this.#isActive = false;
      document.documentElement.removeAttribute("command-palette-open");
      document.documentElement.removeAttribute("command-palette-mode");
    }

    // Restore native urlbar results display
    const urlbarResults = document.getElementById("urlbar-results");
    if (urlbarResults) {
      urlbarResults.style.display = "";
    }
  }

  #onModeChange(mode) {
    PrefsWrapper.debugLog("Mode changed to:", mode);

    if (mode === ModeSwitcher.MODES.COMMANDS) {
      this.#activateCommandsMode();
    } else {
      this.#deactivateCommandsMode();
    }
  }

  #activateCommandsMode() {
    this.#isActive = true;
    document.documentElement.setAttribute("command-palette-open", "true");
    document.documentElement.setAttribute("command-palette-mode", "commands");

    // Hide native urlbar results
    const urlbarResults = document.getElementById("urlbar-results");
    if (urlbarResults) {
      urlbarResults.style.display = "none";
    }

    // Show inline command list
    this.#showInlineCommands();

    // Ensure urlbar stays expanded and focused
    const urlbar = window.gURLBar;
    const urlbarInput = document.getElementById("urlbar-input");
    if (urlbar && urlbarInput) {
      // Keep urlbar expanded
      urlbar.setAttribute("breakout-extend", "true");
      urlbar.setAttribute("open", "true");
      // Focus after a short delay to ensure the click on the tab has finished processing
      setTimeout(() => {
        urlbarInput.focus();
      }, 0);
    }
  }

  #deactivateCommandsMode() {
    this.#isActive = false;
    document.documentElement.removeAttribute("command-palette-open");
    document.documentElement.removeAttribute("command-palette-mode");

    // Show native urlbar results
    const urlbarResults = document.getElementById("urlbar-results");
    if (urlbarResults) {
      urlbarResults.style.display = "";
    }

    // Hide inline command list
    this.#inlineContainer?.setAttribute("hidden", "true");
  }

  async #showInlineCommands() {
    this.#inlineContainer?.removeAttribute("hidden");
    
    // Get current search query from urlbar
    const urlbarInput = document.getElementById("urlbar-input");
    const query = urlbarInput?.value || "";
    
    // Load and display commands
    const allCommands = await this.#generateAllCommands();
    this.#currentCommands = this.#scoreAndFilter(allCommands, query);
    this.#selectedIndex = 0;
    
    this.#renderInlineCommands();
  }

  #renderInlineCommands() {
    const listContainer = document.getElementById("command-palette-inline-list");
    const emptyState = document.getElementById("command-palette-inline-empty");
    
    if (!listContainer) return;

    // Clear existing items
    while (listContainer.firstChild) {
      listContainer.removeChild(listContainer.firstChild);
    }

    if (this.#currentCommands.length === 0) {
      if (emptyState) emptyState.removeAttribute("hidden");
      return;
    }

    if (emptyState) emptyState.setAttribute("hidden", "true");

    this.#currentCommands.forEach((cmd, index) => {
      const item = this.#createCommandItem(cmd, index, true);
      listContainer.appendChild(item);
    });

    this.#updateInlineSelection();
  }

  #updateInlineSelection() {
    const listContainer = document.getElementById("command-palette-inline-list");
    const items = listContainer?.querySelectorAll(".command-palette-item");
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
    key.setAttribute("modifiers", "alt,shift");
    key.setAttribute("oncommand", "void(0);");
    key.addEventListener("command", () => this.activateViaShortcut());

    mainKeyset.appendChild(key);
    PrefsWrapper.debugLog("Registered keyboard shortcut: Alt+Shift+P");
  }

  #onUrlbarInput(event) {
    const value = event.target.value || "";
    const prefix = PrefsWrapper.prefix;

    // If in commands mode (via mode switcher), update inline commands
    if (this.#modeSwitcher?.isCommandsMode) {
      this.#updateInlineCommandsFromQuery(value);
      return;
    }

    // Legacy prefix mode handling
    if (this.#isActive && !this.#modeSwitcher?.isCommandsMode) {
      const query = value.startsWith(prefix) ? value.slice(prefix.length) : value;
      this.#updateCommands(query);
      return;
    }

    // Activate prefix mode when user types the prefix
    if (value.startsWith(prefix) && value.length >= prefix.length) {
      this.#activateWithPrefix(value);
    }
  }

  async #updateInlineCommandsFromQuery(query) {
    const allCommands = await this.#generateAllCommands();
    this.#currentCommands = this.#scoreAndFilter(allCommands, query);
    this.#selectedIndex = 0;
    this.#renderInlineCommands();
  }

  #onKeyDown(event) {
    // Handle keyboard in commands mode (mode switcher)
    if (this.#modeSwitcher?.isCommandsMode) {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          event.stopPropagation();
          this.#selectNextInline();
          break;

        case "ArrowUp":
          event.preventDefault();
          event.stopPropagation();
          this.#selectPreviousInline();
          break;

        case "Enter":
          if (this.#currentCommands.length > 0) {
            event.preventDefault();
            event.stopPropagation();
            this.#executeSelectedInline();
          }
          break;

        case "Escape":
          event.preventDefault();
          event.stopPropagation();
          // Switch back to search mode
          this.#modeSwitcher.setMode(ModeSwitcher.MODES.SEARCH);
          break;

        case "Tab":
          // Tab toggles between search and commands modes
          event.preventDefault();
          event.stopPropagation();
          this.#modeSwitcher.toggle();
          break;
      }
      return;
    }

    // Legacy panel mode handling
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

  #selectNextInline() {
    if (this.#currentCommands.length === 0) return;
    this.#selectedIndex = (this.#selectedIndex + 1) % this.#currentCommands.length;
    this.#updateInlineSelection();
  }

  #selectPreviousInline() {
    if (this.#currentCommands.length === 0) return;
    this.#selectedIndex =
      (this.#selectedIndex - 1 + this.#currentCommands.length) %
      this.#currentCommands.length;
    this.#updateInlineSelection();
  }

  #executeSelectedInline() {
    const cmd = this.#currentCommands[this.#selectedIndex];
    if (!cmd) return;

    PrefsWrapper.debugLog("Executing inline command:", cmd.key);

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
      
      // Close urlbar and reset
      window.gURLBar?.handleRevert();
    } catch (e) {
      PrefsWrapper.debugError("Error executing inline command:", cmd.key, e);
    }
  }

  /**
   * Activate command palette via keyboard shortcut (Alt+Shift+P)
   * Opens urlbar and switches to commands mode
   */
  activateViaShortcut() {
    const urlbar = window.gURLBar;
    const urlbarInput = document.getElementById("urlbar-input");

    if (!urlbar || !urlbarInput) return;

    // Focus and expand urlbar
    urlbar.focus();
    
    // Wait for urlbar to expand, then switch to commands mode
    setTimeout(() => {
      this.#modeSwitcher?.setMode(ModeSwitcher.MODES.COMMANDS);
    }, 50);

    PrefsWrapper.debugLog("Palette activated via Alt+Shift+P shortcut");
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
    if (this.#modeSwitcher?.isCommandsMode) {
      this.#modeSwitcher.setMode(ModeSwitcher.MODES.SEARCH);
    } else if (this.#isActive) {
      this.deactivate();
    } else {
      this.activateViaShortcut();
    }
  }

  activate() {
    this.activateViaShortcut();
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
    if (this.#isActive && !this.#modeSwitcher?.isCommandsMode) {
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
      const item = this.#createCommandItem(cmd, index, false);
      this.#listContainer.appendChild(item);
    });

    this.#updateSelection();
  }

  #createCommandItem(cmd, index, isInline = false) {
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

    // Show shortcut hint for extension commands
    if (cmd.shortcutHint) {
      const shortcut = doc.createXULElement("label");
      shortcut.className = "command-palette-shortcut";
      shortcut.setAttribute("value", cmd.shortcutHint);
      item.appendChild(shortcut);
    }

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
      if (isInline) {
        this.#executeSelectedInline();
      } else {
        this.#executeSelected();
      }
    });

    item.addEventListener("mouseenter", () => {
      this.#selectedIndex = index;
      if (isInline) {
        this.#updateInlineSelection();
      } else {
        this.#updateSelection();
      }
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

  get modeSwitcher() {
    return this.#modeSwitcher;
  }

  clearCache() {
    this.#dynamicCommandsCache = null;
  }

  destroy() {
    if (this.#eventController) {
      this.#eventController.abort();
    }

    if (this.#urlbarObserver) {
      this.#urlbarObserver.disconnect();
    }

    this.#modeSwitcher?.destroy();

    const key = document.getElementById("key-command-palette-toggle");
    if (key) key.remove();

    if (this.#panel) {
      this.#panel.remove();
    }

    if (this.#inlineContainer?.parentNode) {
      this.#inlineContainer.remove();
    }

    this.#panel = null;
    this.#listContainer = null;
    this.#inlineContainer = null;
    this.#modeSwitcher = null;
    this.#currentCommands = [];
    this.#isVisible = false;
    this.#isActive = false;
  }
}
