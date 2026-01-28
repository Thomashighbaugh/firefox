# Command Palette — Configuration Reference

## Purpose

This document summarizes the configuration options for the Command Palette subsystem and the layout of its JSON user settings file.

## Relevant code locations

- Prefs and defaults: `JS/command_palette/utils/prefs.mjs`
- JSON storage (load/save): `JS/command_palette/utils/storage.mjs`
- Urlbar integration/provider: `JS/command_palette/xul/palette_provider.mjs`
- Settings UI: `JS/command_palette/xul/settings_modal.mjs`
- Injector & CSS loader: `JS/command_palette/palette_injector.mjs` and `JS/command_palette/css/palette.css`

## about:config preferences

All prefs are namespaced under `command-palette.*`.

Core activation and behavior

- `command-palette.prefix` (string) — default `:`
  - Character that switches the urlbar into prefix (command-only) mode when placed at the start of the query.
- `command-palette.prefix-required` (bool) — default `false`
  - When true, commands only appear if the prefix is used.
- `command-palette.max-commands` (int) — default `3`
  - Maximum results shown when NOT using the prefix.
- `command-palette.max-commands-prefix` (int) — default `50`
  - Maximum results shown when using the prefix.
- `command-palette.min-query-length` (int) — default `3`
  - Minimum characters required to trigger a search when not using the prefix.
- `command-palette.min-score-threshold` (int) — default `150`
  - Minimum fuzzy-match score required for a result to be included.
- `command-palette.debug-mode` (bool) — default `false`
  - Enable additional console logging useful for debugging startup and provider registration.

Dynamic provider toggles

- `command-palette.dynamic.about-pages` (bool) — default `false`
- `command-palette.dynamic.search-engines` (bool) — default `true`
- `command-palette.dynamic.extensions` (bool) — default `false`
- `command-palette.dynamic.container-tabs` (bool) — default `false`

Theme / appearance prefs

- `command-palette.theme.font-family` (string)
- `command-palette.theme.font-size` (number)
- `command-palette.theme.result-height` (number)
- `command-palette.theme.panel-width` (number)
- `command-palette.theme.bg-color`, `command-palette.theme.text-color`, `command-palette.theme.highlight-color` (strings)

## Settings file (JSON)

- Preference that points to the settings file: `command-palette.settings-file-path` — default: `chrome/command-palette-settings.json` (see `PrefsWrapper.defaultValues`).
- Location: resolved against the Firefox profile directory (`ProfD`). Typical path: `YOUR_FIREFOX_PROFILE/chrome/command-palette-settings.json`.

JSON structure used by the implementation

```json
{
  "hiddenCommands": ["cmd_bookmarks"],
  "customIcons": {
    "my-custom-command": "chrome://global/skin/icons/star.svg"
  },
  "customShortcuts": {
    "my-custom-command": "Ctrl+Alt+K"
  },
  "toolbarButtons": [],
  "customCommands": [
    {
      "key": "my-custom-command",
      "label": "My Custom Command",
      "icon": "chrome://browser/skin/tab.svg",
      "tags": ["custom", "dev"],
      "command": "window.alert('Hello from custom command!');",
      "shortcut": "Ctrl+Shift+M"
    }
  ]
}
```

Notes on custom commands

- `key` — unique identifier (used for native element lookups and storage keys).
- `label` — display name shown in results and settings.
- `icon` — optional icon URL (can be `chrome://...`). If not provided, a default icon is used.
- `tags` — optional array of strings used by fuzzy search.
- `command` — optional JavaScript code string. When present the string is executed in a sandbox via `new Function(...)` to perform the custom action. When absent the implementation will attempt to find a native command element by `id` and call `.doCommand()`.
- `shortcut` — optional string describing an acceleraItor (e.g. `Ctrl+Shift+P`). Shortcuts are stored in `customShortcuts` too.

How to edit configuration

- about:config: open `about:config` and search for `command-palette.` to change boolean/number/string prefs.
- JSON file: edit `YOUR_FIREFOX_PROFILE/chrome/command-palette-settings.json` (or the path set in `command-palette.settings-file-path`) to add custom commands, icons, hidden commands and shortcuts.
- Settings UI: open the Command Palette Settings modal (the module creates a settings panel). The modal maps fields to the prefs and the JSON file.

Verification and troubleshooting

- Enable debug logs: set `command-palette.debug-mode = true` in `about:config`.
- Watch the Browser Console for these messages on startup:
  - `Command Palette initialization...`
  - `Loading command palette CSS...` / `Command palette CSS loaded`
  - `Creating command palette elements...`
  - `Command palette provider registered with urlbar` (success)
  - Retry messages: `UrlbarProviderManager not ready yet (attempt X), retrying in 500ms...` (the provider may retry if the Urlbar API is not yet ready)
  - `Command palette settings loaded from <path>` (settings.json successfully loaded)

If commands don't appear

- Check `command-palette.prefix-required`, `command-palette.min-query-length` and the value of `command-palette.prefix`.
- Confirm the provider is registered (see console messages above). The code retries registration a few times during startup.
- Confirm dynamic providers you expect are enabled (`command-palette.dynamic.*`).
- Confirm `hiddenCommands` in the JSON does not contain the command keys you expect to see.

Extending behavior

- Add new static commands: edit `JS/command_palette/commands/static_commands.mjs`.
- Add a dynamic provider: create a generator in `JS/command_palette/commands/dynamic_commands.mjs` and register it in `JS/command_palette/xul/palette_provider.mjs`.
- Add a new preference: add a constant in `JS/command_palette/utils/prefs.mjs` and a default value in `PrefsWrapper.defaultValues`; then read it via `PrefsWrapper.getPref(...)` or the convenience getters.

Next steps (suggested)

1. If you want I can add this file to the repository (done) and also create an example `command-palette-settings.json` in `resources/` for users to import.
2. I can add a small startup diagnostic command that prints the resolved pref values and effective JSON path to the console to help troubleshooting.

---

File added: `.documentation/COMMAND_PALETTE_CONFIG.md`
