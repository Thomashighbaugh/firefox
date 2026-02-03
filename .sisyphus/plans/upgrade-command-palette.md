# Upgrade Command Palette System

## TL;DR

> **Quick Summary**: Upgrade the command palette to match native Firefox urlbar styling ("breakout" design), change the toggle shortcut to `Alt+Shift+P`, and implement auto-detection of browser extension keyboard commands.
> 
> **Deliverables**:
> - Updated `palette.css` matching `search-bar.css` variables
> - Updated `palette_overlay.mjs` with new keybinding
> - New `generateExtensionKeyboardCommands` in `dynamic_commands.mjs`
> - Integration of extension commands into the palette
> 
> **Estimated Effort**: Medium
> **Parallel Execution**: YES - 2 waves
> **Critical Path**: Extension Generator Logic → Integration

---

## Context

### Original Request
1.  **Styling**: Match "expanded URL bar" (breakout) styling exactly using `search-bar.css` variables.
2.  **Keybinding**: Change `Ctrl+Shift+P` to `Alt+Shift+P`.
3.  **Extension Commands**: List actual extension keyboard shortcuts (not just options).
4.  **Modal Behavior**: Ensure it behaves like a modal overlay (hiding native urlbar view).

### Research Findings
- **Extension API**: `WebExtensionPolicy.getActive()` and `ExtensionParent` can be used from `userChrome.js` to retrieve active extension commands and shortcuts.
- **Styling**: `CSS/chrome/search-bar.css` contains the authoritative variables (`--firefoxcss-url-breakout-*`).

---

## Work Objectives

### Core Objective
Make the command palette visually indistinguishable from the native urlbar dropdown and functionally richer with extension commands.

### Concrete Deliverables
- `JS/command_palette/css/palette.css` (Updated)
- `JS/command_palette/xul/palette_overlay.mjs` (Updated)
- `JS/command_palette/commands/dynamic_commands.mjs` (Updated)

### Definition of Done
- [ ] Palette opens with `Alt+Shift+P`
- [ ] Palette background/border/shadow matches native urlbar dropdown exactly
- [ ] Extension commands (e.g., "Bitwarden: Open Vault") appear in the list with their shortcuts
- [ ] Clicking an extension command attempts to execute it (or displays shortcut if execution blocked)

### Must Have
- Exact visual match with `var(--firefoxcss-url-breakout-*)`
- Robust error handling for extension API access (don't crash if `ExtensionParent` fails)

### Must NOT Have
- Changes to the underlying fuzzy search algorithm
- Regressions in existing static commands

---

## Verification Strategy

### Automated Verification
Since this is a UI and internal API task, we will use **script-based verification** where possible.

**For Extension Logic:**
- Create a test script that imports `ExtensionParent` and logs commands to the console to verify retrieval works before integrating.

**For UI:**
- Visual inspection (screenshots) is primary.
- CSS variable validity check (ensure variables exist in `search-bar.css`).

### Manual Verification Steps
1.  **Visuals**: Open URL bar (click it). Open Command Palette (`Alt+Shift+P`). Toggle between them. They should look identical in frame/background.
2.  **Shortcut**: Press `Ctrl+Shift+P` (should do nothing/default). Press `Alt+Shift+P` (should open palette).
3.  **Extensions**: Type `ext:` or scroll to see if extension commands appear.

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately):
├── Task 1: Update Styling (CSS)
├── Task 2: Update Keybinding (JS)
└── Task 3: Implement Extension Generator (JS Logic)

Wave 2 (After Wave 1):
└── Task 4: Integration (Register Generator)
```

### Agent Dispatch Summary

| Wave | Tasks | Recommended Agents |
|------|-------|-------------------|
| 1 | 1 | `frontend-ui-ux` (CSS focus) |
| 1 | 2 | `quick` (Simple JS change) |
| 1 | 3 | `ultrabrain` (Internal Firefox API logic) |
| 2 | 4 | `typescript-programmer` (Integration) |

---

## TODOs

- [ ] 1. **Update Palette Styling**

  **What to do**:
  - Update `JS/command_palette/css/palette.css`
  - Replace `#command-palette-overlay` styles with variables from `search-bar.css`:
    - `background`: `var(--firefoxcss-url-breakout-bar-bg-color)`
    - `border-top`: `var(--firefoxcss-url-breakout-border-top-color)`
    - `border-bottom`: `var(--firefoxcss-url-breakout-border-bottom-color)`
    - `box-shadow`: `var(--firefoxcss-url-breakout-box-shadow)`
  - Ensure `width` and `margin` logic in `palette_overlay.mjs` aligns with `search-bar.css`'s `#urlbar[breakout]` styles.

  **Recommended Agent**: `frontend-ui-ux`
  
  **References**:
  - `CSS/chrome/search-bar.css:67-71` (Breakout variables)
  - `JS/command_palette/css/palette.css:720` (Current overlay styles)

  **Verification**:
  - `grep --color "var(--firefoxcss-url-breakout-" JS/command_palette/css/palette.css` should return matches.

- [ ] 2. **Update Keyboard Shortcut**

  **What to do**:
  - Edit `JS/command_palette/xul/palette_overlay.mjs`
  - Change `KEYBOARD_MODIFIERS` to `{ alt: true, shift: true }`
  - Update `modifiers` attribute in `#registerKeyboardShortcut` to `"alt,shift"`
  - Update hint text in CSS (`content: "↑↓ navigate ..."` to reflect new shortcut if mentioned)

  **Recommended Agent**: `quick`

  **References**:
  - `JS/command_palette/xul/palette_overlay.mjs:29` (Modifiers constant)
  - `JS/command_palette/xul/palette_overlay.mjs:119` (Key element attribute)

  **Verification**:
  - `grep "alt,shift" JS/command_palette/xul/palette_overlay.mjs`

- [ ] 3. **Implement Extension Command Generator**

  **What to do**:
  - Edit `JS/command_palette/commands/dynamic_commands.mjs`
  - Add `generateExtensionKeyboardCommands()` function
  - Logic:
    1. Import `ExtensionParent` via `ChromeUtils.import("resource://gre/modules/ExtensionParent.sys.mjs")`
    2. Iterate `WebExtensionPolicy.getActive()`
    3. Access `policy.extension.commands`
    4. Return mapped commands:
       - Key: `ext-cmd:${policy.id}:${commandName}`
       - Label: `${policy.name}: ${description}`
       - Tags: `["extension", "shortcut", policy.name]`
       - Icon: `policy.extension.iconURL` (or fallback)
       - Command: Function to execute (Research `policy.extension.broadcast` or similar)

  **Recommended Agent**: `ultrabrain`

  **References**:
  - Background Task `bg_4ef60db0` results (API usage)
  - `JS/command_palette/commands/dynamic_commands.mjs` (File to edit)

  **Verification**:
  - Create temporary test script to log output of `generateExtensionKeyboardCommands()`

- [ ] 4. **Register Extension Generator**

  **What to do**:
  - Edit `JS/command_palette/xul/palette_overlay.mjs` (or `palette_provider.mjs` depending on where generators are called)
  - Import `generateExtensionKeyboardCommands`
  - Add to `#generateDynamicCommands` list
  - Add preference `command-palette.dynamic.extension-shortcuts` (default true) in `prefs.mjs`

  **Recommended Agent**: `typescript-programmer`

  **References**:
  - `JS/command_palette/xul/palette_overlay.mjs:304` (Where generators are called)
  - `JS/command_palette/utils/prefs.mjs` (Prefs definition)

  **Verification**:
  - Verify function is called in `palette_overlay.mjs`

---

## Success Criteria

### Verification Commands
```bash
# Check if new CSS variables are used
grep "firefoxcss-url-breakout" JS/command_palette/css/palette.css

# Check if shortcut is updated
grep "alt,shift" JS/command_palette/xul/palette_overlay.mjs

# Check if generator is implemented
grep "generateExtensionKeyboardCommands" JS/command_palette/commands/dynamic_commands.mjs
```

### Final Checklist
- [ ] Visuals match `search-bar.css`
- [ ] Shortcut is `Alt+Shift+P`
- [ ] Extension commands are discoverable
