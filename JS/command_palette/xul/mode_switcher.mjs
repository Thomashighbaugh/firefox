import { PrefsWrapper } from "../utils/prefs.mjs";

/**
 * Mode switcher component for toggling between URL search and command palette modes
 * Appears as a tab bar at the top of the expanded urlbar
 */
export class ModeSwitcher {
  #container = null;
  #searchTab = null;
  #commandsTab = null;
  #activeMode = "search"; // "search" or "commands"
  #onModeChange = null;
  #isInjected = false;

  static MODES = {
    SEARCH: "search",
    COMMANDS: "commands",
  };

  /**
   * Create a new ModeSwitcher instance
   * @param {Function} onModeChange - Callback when mode changes (receives mode string)
   * @returns {ModeSwitcher}
   */
  static create(onModeChange) {
    const instance = new ModeSwitcher();
    instance.#onModeChange = onModeChange;
    instance.#init();
    return instance;
  }

  #init() {
    this.#createElements();
    this.#attachUrlbarListeners();
    PrefsWrapper.debugLog("ModeSwitcher initialized");
  }

  #createElements() {
    const doc = document;

    // Create container
    this.#container = doc.createXULElement("hbox");
    this.#container.id = "command-palette-mode-switcher";
    this.#container.className = "command-palette-mode-switcher";
    this.#container.setAttribute("hidden", "true");

    // Create search tab
    this.#searchTab = doc.createXULElement("button");
    this.#searchTab.id = "command-palette-tab-search";
    this.#searchTab.className = "mode-switcher-tab";
    this.#searchTab.setAttribute("data-mode", ModeSwitcher.MODES.SEARCH);
    this.#searchTab.textContent = "Search";
    this.#searchTab.addEventListener("click", () => this.setMode(ModeSwitcher.MODES.SEARCH));

    // Create commands tab
    this.#commandsTab = doc.createXULElement("button");
    this.#commandsTab.id = "command-palette-tab-commands";
    this.#commandsTab.className = "mode-switcher-tab";
    this.#commandsTab.setAttribute("data-mode", ModeSwitcher.MODES.COMMANDS);
    this.#commandsTab.textContent = "Commands";
    this.#commandsTab.addEventListener("click", () => this.setMode(ModeSwitcher.MODES.COMMANDS));

    // Add keyboard shortcut hint to commands tab
    const shortcutHint = doc.createXULElement("span");
    shortcutHint.className = "mode-switcher-shortcut";
    shortcutHint.textContent = "Alt+Shift+P";
    this.#commandsTab.appendChild(shortcutHint);

    this.#container.appendChild(this.#searchTab);
    this.#container.appendChild(this.#commandsTab);

    // Set initial active state
    this.#updateTabStates();
  }

  #attachUrlbarListeners() {
    const urlbar = window.gURLBar;
    if (!urlbar) {
      PrefsWrapper.debugError("Could not find gURLBar for ModeSwitcher");
      return;
    }

    // Listen for urlbar expansion
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === "breakout-extend") {
          const isExpanded = urlbar.hasAttribute("breakout-extend");
          if (isExpanded && !this.#isInjected) {
            this.#injectIntoUrlbar();
          } else if (!isExpanded && this.#isInjected) {
            this.#removeFromUrlbar();
          }
        }
      }
    });

    const urlbarEl = document.getElementById("urlbar");
    if (urlbarEl) {
      observer.observe(urlbarEl, { attributes: true });
    }
  }

  #injectIntoUrlbar() {
    // Find the urlbar view container to inject before results
    const urlbarResults = document.getElementById("urlbar-results");
    const urlbarView = document.querySelector(".urlbarView");
    
    if (urlbarView && !this.#isInjected) {
      // Insert at the top of the urlbar view
      const firstChild = urlbarView.firstChild;
      if (firstChild) {
        urlbarView.insertBefore(this.#container, firstChild);
      } else {
        urlbarView.appendChild(this.#container);
      }
      
      this.#container.removeAttribute("hidden");
      this.#isInjected = true;
      PrefsWrapper.debugLog("ModeSwitcher injected into urlbar");
    }
  }

  #removeFromUrlbar() {
    if (this.#isInjected && this.#container.parentNode) {
      this.#container.setAttribute("hidden", "true");
      // Reset to search mode when closing
      if (this.#activeMode !== ModeSwitcher.MODES.SEARCH) {
        this.setMode(ModeSwitcher.MODES.SEARCH, false);
      }
      this.#isInjected = false;
      PrefsWrapper.debugLog("ModeSwitcher removed from urlbar");
    }
  }

  /**
   * Set the active mode
   * @param {string} mode - "search" or "commands"
   * @param {boolean} notify - Whether to notify via callback (default: true)
   */
  setMode(mode, notify = true) {
    if (mode !== ModeSwitcher.MODES.SEARCH && mode !== ModeSwitcher.MODES.COMMANDS) {
      PrefsWrapper.debugError("Invalid mode:", mode);
      return;
    }

    if (this.#activeMode === mode) return;

    this.#activeMode = mode;
    this.#updateTabStates();
    this.#updateRootAttribute();

    if (notify && this.#onModeChange) {
      this.#onModeChange(mode);
    }

    PrefsWrapper.debugLog("Mode switched to:", mode);
  }

  #updateTabStates() {
    const isSearchActive = this.#activeMode === ModeSwitcher.MODES.SEARCH;
    
    this.#searchTab.classList.toggle("active", isSearchActive);
    this.#commandsTab.classList.toggle("active", !isSearchActive);
    
    this.#searchTab.setAttribute("aria-selected", isSearchActive);
    this.#commandsTab.setAttribute("aria-selected", !isSearchActive);
  }

  #updateRootAttribute() {
    document.documentElement.setAttribute("command-palette-mode", this.#activeMode);
  }

  /**
   * Toggle between search and commands modes
   */
  toggle() {
    const newMode = this.#activeMode === ModeSwitcher.MODES.SEARCH
      ? ModeSwitcher.MODES.COMMANDS
      : ModeSwitcher.MODES.SEARCH;
    this.setMode(newMode);
  }

  /**
   * Show the mode switcher and inject into urlbar if not already
   */
  show() {
    if (!this.#isInjected) {
      this.#injectIntoUrlbar();
    }
    this.#container.removeAttribute("hidden");
  }

  /**
   * Hide the mode switcher
   */
  hide() {
    this.#container.setAttribute("hidden", "true");
  }

  /**
   * Get current active mode
   * @returns {string} "search" or "commands"
   */
  get activeMode() {
    return this.#activeMode;
  }

  /**
   * Check if commands mode is active
   * @returns {boolean}
   */
  get isCommandsMode() {
    return this.#activeMode === ModeSwitcher.MODES.COMMANDS;
  }

  /**
   * Get the DOM container element
   * @returns {XULElement}
   */
  get element() {
    return this.#container;
  }

  /**
   * Cleanup and destroy the mode switcher
   */
  destroy() {
    if (this.#container?.parentNode) {
      this.#container.remove();
    }
    this.#container = null;
    this.#searchTab = null;
    this.#commandsTab = null;
    this.#isInjected = false;
    document.documentElement.removeAttribute("command-palette-mode");
  }
}
