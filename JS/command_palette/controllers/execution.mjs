export class ExecutionController {
  constructor() {
    // Handles command execution logic
  }

  executeCommand(command, commandKey) {
    try {
      if (typeof command === "function") {
        command();
      } else {
        const commandEl = document.getElementById(commandKey);
        if (commandEl && !commandEl.disabled) {
          commandEl.doCommand();
        }
      }
      return true;
    } catch (e) {
      console.error("Failed to execute command:", commandKey, e);
      return false;
    }
  }
}
