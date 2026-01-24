import { PrefsWrapper } from "../utils/prefs.mjs";
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

/**
 * UrlbarProvider for command palette integration
 * Integrates with Firefox's urlbar to show commands as suggestions
 */
export class PaletteProvider {
  constructor() {
    this._dynamicCommandsCache = null;
    this._userConfig = {};
    this._recentCommands = [];
    this.MAX_RECENT_COMMANDS = 20;

    this.provider = {
      name: "CommandPalette",
      type: "immediate",
      sources: [window.UrlbarUtils.RESULT_SOURCE.OTHER_LOCAL],
      priority: 100,

      isActive: (context) => this._isActive(context),
      isRestricting: (context) => this._isRestricting(context),
      cancelQuery: () => {},
      startQuery: (context, addCallback) => this._startQuery(context, addCallback),
      pickResult: (result, element) => this._pickResult(result, element),
      onEngagement: (state, queryContext, details, controller) =>
        this._onEngagement(state, queryContext, details, controller),
    };
  }

  loadUserConfig(config) {
    this._userConfig = config || {};
  }

  _isActive(context) {
    const query = context.searchString;
    const prefix = PrefsWrapper.prefix;
    const prefixRequired = PrefsWrapper.prefixRequired;

    if (prefixRequired) {
      return query.startsWith(prefix);
    }

    return query.length >= PrefsWrapper.minQueryLength || query.startsWith(prefix);
  }

  _isRestricting(context) {
    const query = context.searchString;
    const prefix = PrefsWrapper.prefix;
    return query.startsWith(prefix);
  }

  async _startQuery(context, addCallback) {
    let query = context.searchString;
    const prefix = PrefsWrapper.prefix;
    const isPrefixMode = query.startsWith(prefix);

    if (isPrefixMode) {
      query = query.substring(prefix.length);
    }

    const allCommands = await this._generateLiveCommands(isPrefixMode);
    const matches = this._scoreAndFilterCommands(allCommands, query);

    const maxResults = isPrefixMode
      ? PrefsWrapper.maxCommandsPrefix
      : PrefsWrapper.maxCommands;

    const topMatches = matches.slice(0, maxResults);

    for (const match of topMatches) {
      const result = new window.UrlbarResult(
        window.UrlbarUtils.RESULT_TYPE.DYNAMIC,
        window.UrlbarUtils.RESULT_SOURCE.OTHER_LOCAL,
        {
          command: match.command,
          key: match.key,
          label: match.label,
          icon: match.icon || "chrome://browser/skin/tab.svg",
          score: match.score,
        }
      );

      result.suggestedIndex = -1;
      addCallback(this.provider, result);
    }
  }

  _pickResult(result, element) {
    const commandKey = result.payload.key;
    const command = result.payload.command;

    PrefsWrapper.debugLog("Executing command:", commandKey);

    try {
      if (typeof command === "function") {
        command();
      } else {
        const commandEl = document.getElementById(commandKey);
        if (commandEl && !commandEl.disabled) {
          commandEl.doCommand();
        }
      }

      this._addRecentCommand(commandKey);
    } catch (e) {
      PrefsWrapper.debugError("Error executing command:", commandKey, e);
    }
  }

  _onEngagement(state, queryContext, details, controller) {
    // Called when user interacts with results
  }

  async _generateLiveCommands(isPrefixMode) {
    const dynamicCommands = await this._generateDynamicCommands();
    return [...staticCommands, ...dynamicCommands];
  }

  async _generateDynamicCommands() {
    if (this._dynamicCommandsCache) {
      return this._dynamicCommandsCache;
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

    this._dynamicCommandsCache = dynamicCommands;
    return dynamicCommands;
  }

  _scoreAndFilterCommands(commands, query) {
    const scored = [];
    const minScore = PrefsWrapper.minScoreThreshold;

    for (const cmd of commands) {
      // Check visibility condition
      if (!this._commandIsVisible(cmd)) {
        continue;
      }

      // Check if hidden by user
      if (this._userConfig.hiddenCommands?.includes(cmd.key)) {
        continue;
      }

      // Calculate score
      let score = 0;
      if (query) {
        const labelScore = FuzzySearch.calculateScore(cmd.label, query);
        const tagsScore = Math.max(
          ...(cmd.tags || []).map((tag) => FuzzySearch.calculateScore(tag, query))
        );
        score = Math.max(labelScore, tagsScore);

        if (score < minScore) continue;
      } else {
        // No query - show recent commands first
        const recentIndex = this._recentCommands.indexOf(cmd.key);
        score = recentIndex >= 0 ? 1000 - recentIndex : 0;
      }

      scored.push({
        ...cmd,
        score,
        command: cmd.command || (() => this._executeNativeCommand(cmd.key)),
      });
    }

    // Sort by score descending
    scored.sort((a, b) => b.score - a.score);
    return scored;
  }

  _commandIsVisible(cmd) {
    try {
      if (typeof cmd.condition === "function") {
        return !!cmd.condition(window);
      } else if (cmd.condition !== undefined) {
        return cmd.condition !== false;
      }

      // Check native command element
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

  _executeNativeCommand(commandKey) {
    const commandEl = document.getElementById(commandKey);
    if (commandEl && !commandEl.disabled) {
      commandEl.doCommand();
    }
  }

  _addRecentCommand(key) {
    const index = this._recentCommands.indexOf(key);
    if (index > -1) {
      this._recentCommands.splice(index, 1);
    }
    this._recentCommands.unshift(key);
    if (this._recentCommands.length > this.MAX_RECENT_COMMANDS) {
      this._recentCommands.length = this.MAX_RECENT_COMMANDS;
    }
  }

  clearCache() {
    this._dynamicCommandsCache = null;
  }
}
