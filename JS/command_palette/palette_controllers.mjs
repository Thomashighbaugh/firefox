import { SearchController } from "./controllers/search.mjs";
import { ShortcutsController } from "./controllers/shortcuts.mjs";
import { ExecutionController } from "./controllers/execution.mjs";
import { RecentCommandsController } from "./controllers/recent_commands.mjs";
import { SettingsController } from "./controllers/settings.mjs";

export class PaletteControllers {
  static searchController = null;
  static shortcutsController = null;
  static executionController = null;
  static recentCommandsController = null;
  static settingsController = null;

  static create() {
    console.log("Creating search controller...");
    this.searchController = new SearchController();

    console.log("Creating shortcuts controller...");
    this.shortcutsController = new ShortcutsController();

    console.log("Creating execution controller...");
    this.executionController = new ExecutionController();

    console.log("Creating recent commands controller...");
    this.recentCommandsController = new RecentCommandsController();

    console.log("Creating settings controller...");
    this.settingsController = new SettingsController();
  }
}
