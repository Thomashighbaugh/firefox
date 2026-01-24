export class RecentCommandsController {
  constructor() {
    this._recentCommands = [];
    this.MAX_RECENT_COMMANDS = 20;
  }

  addRecentCommand(commandKey) {
    if (!commandKey) return;

    const existingIndex = this._recentCommands.indexOf(commandKey);
    if (existingIndex > -1) {
      this._recentCommands.splice(existingIndex, 1);
    }
    
    this._recentCommands.unshift(commandKey);
    
    if (this._recentCommands.length > this.MAX_RECENT_COMMANDS) {
      this._recentCommands.length = this.MAX_RECENT_COMMANDS;
    }
  }

  getRecentCommands() {
    return [...this._recentCommands];
  }

  clearRecentCommands() {
    this._recentCommands = [];
  }
}
