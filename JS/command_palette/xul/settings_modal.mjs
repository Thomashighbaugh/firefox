/**
 * Settings Modal for Command Palette
 * Full XUL modal with tabs: Commands, Preferences, Custom Commands, Help
 */

export class SettingsModal {
  constructor() {
    this.panel = null;
    this.currentTab = "commands";
    this.#createModal();
  }

  #createModal() {
    const doc = document;

    // Create panel overlay
    this.panel = doc.createXULElement("panel");
    this.panel.id = "command-palette-settings-panel";
    this.panel.setAttribute("type", "arrow");
    this.panel.setAttribute("noautohide", "true");
    this.panel.setAttribute("position", "bottomcenter topleft");
    this.panel.classList.add("command-palette-settings-panel");

    // Panel container
    const container = doc.createXULElement("vbox");
    container.classList.add("panel-container");

    // Header
    const header = this.#createHeader(doc);
    container.appendChild(header);

    // Tab bar
    const tabBar = this.#createTabBar(doc);
    container.appendChild(tabBar);

    // Tab content area
    const tabContent = doc.createXULElement("vbox");
    tabContent.id = "palette-tab-content";
    tabContent.classList.add("tab-content");

    // Tab panels
    tabContent.appendChild(this.#createCommandsTab(doc));
    tabContent.appendChild(this.#createPreferencesTab(doc));
    tabContent.appendChild(this.#createCustomCommandsTab(doc));
    tabContent.appendChild(this.#createThemeTab(doc));
    tabContent.appendChild(this.#createHelpTab(doc));

    container.appendChild(tabContent);

    // Footer with buttons
    const footer = this.#createFooter(doc);
    container.appendChild(footer);

    this.panel.appendChild(container);

    // Append to mainPopupSet
    const mainPopupSet = doc.getElementById("mainPopupSet");
    if (mainPopupSet) {
      mainPopupSet.appendChild(this.panel);
    } else {
      doc.documentElement.appendChild(this.panel);
    }

    this.#createIconPickerPanel(doc);

    this.#attachEventListeners();
    console.log("Command palette settings modal created");
  }

  #createIconPickerPanel(doc) {
    const panel = doc.createXULElement("panel");
    panel.id = "command-palette-icon-picker-panel";
    panel.setAttribute("type", "arrow");
    panel.setAttribute("position", "after_start");
    panel.classList.add("icon-picker-panel");

    const container = doc.createXULElement("vbox");
    container.classList.add("icon-picker-container");

    const title = doc.createXULElement("label");
    title.textContent = "Choose Icon";
    title.classList.add("picker-title");
    container.appendChild(title);

    const iconsGrid = doc.createXULElement("hbox");
    iconsGrid.classList.add("icons-grid");
    iconsGrid.setAttribute("wrap", "true");

    const commonIcons = [
      { name: "Tab", url: "chrome://browser/skin/tab.svg" },
      { name: "Bookmark", url: "chrome://browser/skin/bookmark.svg" },
      { name: "History", url: "chrome://browser/skin/history.svg" },
      { name: "Settings", url: "chrome://global/skin/icons/settings.svg" },
      { name: "Search", url: "chrome://global/skin/icons/search-glass.svg" },
      { name: "Download", url: "chrome://browser/skin/downloads/downloads.svg" },
      { name: "Home", url: "chrome://browser/skin/home.svg" },
      { name: "Star", url: "chrome://browser/skin/bookmark-hollow.svg" },
      { name: "Edit", url: "chrome://global/skin/icons/edit.svg" },
      { name: "Delete", url: "chrome://global/skin/icons/delete.svg" },
      { name: "Add", url: "chrome://global/skin/icons/plus.svg" },
      { name: "Close", url: "chrome://global/skin/icons/close.svg" },
      { name: "Info", url: "chrome://global/skin/icons/info.svg" },
      { name: "Warning", url: "chrome://global/skin/icons/warning.svg" },
      { name: "Error", url: "chrome://global/skin/icons/error.svg" },
      { name: "Check", url: "chrome://global/skin/icons/check.svg" },
      { name: "Arrow", url: "chrome://global/skin/icons/arrow-left.svg" },
      { name: "Refresh", url: "chrome://global/skin/icons/reload.svg" },
      { name: "Print", url: "chrome://global/skin/icons/print.svg" },
      { name: "Screenshot", url: "chrome://browser/skin/screenshot.svg" },
      { name: "Extension", url: "chrome://mozapps/skin/extensions/extension.svg" },
      { name: "Theme", url: "chrome://mozapps/skin/extensions/category-themes.svg" },
      { name: "Plugin", url: "chrome://mozapps/skin/extensions/category-plugins.svg" },
      { name: "Developer", url: "chrome://devtools/skin/images/tool-webconsole.svg" },
    ];

    for (const icon of commonIcons) {
      const iconBtn = doc.createXULElement("toolbarbutton");
      iconBtn.classList.add("icon-option");
      iconBtn.setAttribute("image", icon.url);
      iconBtn.setAttribute("tooltiptext", icon.name);
      iconBtn.setAttribute("data-icon-url", icon.url);
      iconsGrid.appendChild(iconBtn);
    }

    container.appendChild(iconsGrid);
    panel.appendChild(container);

    const mainPopupSet = doc.getElementById("mainPopupSet");
    if (mainPopupSet) {
      mainPopupSet.appendChild(panel);
    } else {
      doc.documentElement.appendChild(panel);
    }

    this.iconPickerPanel = panel;
  }

  #createHeader(doc) {
    const header = doc.createXULElement("hbox");
    header.classList.add("panel-header");

    const title = doc.createXULElement("label");
    title.textContent = "Command Palette Settings";
    title.classList.add("header-title");

    const closeBtn = doc.createXULElement("toolbarbutton");
    closeBtn.id = "palette-settings-close";
    closeBtn.classList.add("close-icon", "panel-close");
    closeBtn.setAttribute("tooltiptext", "Close");

    header.appendChild(title);
    header.appendChild(closeBtn);

    return header;
  }

  #createTabBar(doc) {
    const tabBar = doc.createXULElement("hbox");
    tabBar.id = "palette-tab-bar";
    tabBar.classList.add("tab-bar");

    const tabs = [
      { id: "commands", label: "Commands" },
      { id: "preferences", label: "Preferences" },
      { id: "custom", label: "Custom Commands" },
      { id: "theme", label: "Theme" },
      { id: "help", label: "Help" },
    ];

    tabs.forEach((tab) => {
      const button = doc.createXULElement("toolbarbutton");
      button.id = `palette-tab-${tab.id}`;
      button.classList.add("tab-button");
      button.setAttribute("label", tab.label);
      button.setAttribute("data-tab", tab.id);

      if (tab.id === this.currentTab) {
        button.classList.add("active");
      }

      tabBar.appendChild(button);
    });

    return tabBar;
  }

  #createCommandsTab(doc) {
    const tab = doc.createXULElement("vbox");
    tab.id = "palette-tab-panel-commands";
    tab.classList.add("tab-panel", "active");
    tab.setAttribute("data-tab", "commands");

    const searchBox = doc.createXULElement("hbox");
    searchBox.classList.add("search-box");

    const searchInput = doc.createElement("input");
    searchInput.id = "palette-command-search";
    searchInput.type = "text";
    searchInput.placeholder = "Search commands...";
    searchBox.appendChild(searchInput);

    tab.appendChild(searchBox);

    const categoryFilter = doc.createXULElement("hbox");
    categoryFilter.classList.add("category-filter");

    const categoryLabel = doc.createXULElement("label");
    categoryLabel.textContent = "Category:";
    categoryLabel.classList.add("filter-label");
    categoryFilter.appendChild(categoryLabel);

    const categorySelect = doc.createElement("select");
    categorySelect.id = "palette-category-filter";
    categorySelect.classList.add("category-select");

    const allOption = doc.createElement("option");
    allOption.value = "";
    allOption.textContent = "All Categories";
    categorySelect.appendChild(allOption);

    categoryFilter.appendChild(categorySelect);

    tab.appendChild(categoryFilter);

    const commandsList = doc.createXULElement("vbox");
    commandsList.id = "palette-commands-list";
    commandsList.classList.add("commands-list");

    const scrollbox = doc.createXULElement("scrollbox");
    scrollbox.setAttribute("flex", "1");
    scrollbox.appendChild(commandsList);

    tab.appendChild(scrollbox);

    return tab;
  }

  #createPreferencesTab(doc) {
    const tab = doc.createXULElement("vbox");
    tab.id = "palette-tab-panel-preferences";
    tab.classList.add("tab-panel");
    tab.setAttribute("data-tab", "preferences");

    const scrollbox = doc.createXULElement("scrollbox");
    scrollbox.setAttribute("flex", "1");

    const prefs = doc.createXULElement("vbox");
    prefs.classList.add("preferences-content");

    // Prefix character
    prefs.appendChild(
      this.#createPrefRow(
        doc,
        "Command Prefix",
        "command-palette.prefix",
        "text",
        "Character to trigger command mode"
      )
    );

    // Require prefix
    prefs.appendChild(
      this.#createPrefRow(
        doc,
        "Require Prefix",
        "command-palette.prefix-required",
        "checkbox",
        "Only show commands when prefix is typed"
      )
    );

    // Max results
    prefs.appendChild(
      this.#createPrefRow(
        doc,
        "Max Results (No Prefix)",
        "command-palette.max-commands",
        "number",
        "Maximum results without prefix"
      )
    );

    prefs.appendChild(
      this.#createPrefRow(
        doc,
        "Max Results (With Prefix)",
        "command-palette.max-commands-prefix",
        "number",
        "Maximum results with prefix"
      )
    );

    // Min query length
    prefs.appendChild(
      this.#createPrefRow(
        doc,
        "Min Query Length",
        "command-palette.min-query-length",
        "number",
        "Minimum characters before searching"
      )
    );

    // Dynamic providers section
    const separator = doc.createXULElement("separator");
    separator.classList.add("pref-separator");
    prefs.appendChild(separator);

    const dynamicLabel = doc.createXULElement("label");
    dynamicLabel.textContent = "Dynamic Command Providers";
    dynamicLabel.classList.add("section-header");
    prefs.appendChild(dynamicLabel);

    prefs.appendChild(
      this.#createPrefRow(
        doc,
        "About: Pages",
        "command-palette.dynamic.about-pages",
        "checkbox",
        "Generate commands for about: pages"
      )
    );

    prefs.appendChild(
      this.#createPrefRow(
        doc,
        "Search Engines",
        "command-palette.dynamic.search-engines",
        "checkbox",
        "Generate commands for search engines"
      )
    );

    prefs.appendChild(
      this.#createPrefRow(
        doc,
        "Extensions",
        "command-palette.dynamic.extensions",
        "checkbox",
        "Generate commands for extensions"
      )
    );

    prefs.appendChild(
      this.#createPrefRow(
        doc,
        "Container Tabs",
        "command-palette.dynamic.container-tabs",
        "checkbox",
        "Generate commands for container tabs"
      )
    );

    scrollbox.appendChild(prefs);
    tab.appendChild(scrollbox);

    return tab;
  }

  #createPrefRow(doc, label, prefName, type, description) {
    const row = doc.createXULElement("vbox");
    row.classList.add("pref-row");

    const headerBox = doc.createXULElement("hbox");
    headerBox.classList.add("pref-header");

    const labelEl = doc.createXULElement("label");
    labelEl.textContent = label;
    labelEl.classList.add("pref-label");
    headerBox.appendChild(labelEl);

    let input;
    if (type === "checkbox") {
      input = doc.createXULElement("checkbox");
      input.id = `pref-${prefName}`;
      input.setAttribute("preference", prefName);
      headerBox.appendChild(input);
    } else {
      input = doc.createElement("input");
      input.id = `pref-${prefName}`;
      input.type = type;
      input.setAttribute("preference", prefName);
      input.classList.add("pref-input");
      headerBox.appendChild(input);
    }

    row.appendChild(headerBox);

    if (description) {
      const desc = doc.createXULElement("label");
      desc.textContent = description;
      desc.classList.add("pref-description");
      row.appendChild(desc);
    }

    return row;
  }

  #createCustomCommandsTab(doc) {
    const tab = doc.createXULElement("vbox");
    tab.id = "palette-tab-panel-custom";
    tab.classList.add("tab-panel");
    tab.setAttribute("data-tab", "custom");

    const toolbar = doc.createXULElement("hbox");
    toolbar.classList.add("custom-toolbar");

    const addBtn = doc.createXULElement("toolbarbutton");
    addBtn.id = "palette-custom-add";
    addBtn.classList.add("toolbarbutton-1");
    addBtn.setAttribute("label", "Add Command");
    addBtn.setAttribute("image", "chrome://global/skin/icons/plus.svg");
    toolbar.appendChild(addBtn);

    const spacer = doc.createXULElement("spacer");
    spacer.setAttribute("flex", "1");
    toolbar.appendChild(spacer);

    const importBtn = doc.createXULElement("toolbarbutton");
    importBtn.id = "palette-custom-import";
    importBtn.classList.add("toolbarbutton-1");
    importBtn.setAttribute("label", "Import");
    importBtn.setAttribute("image", "chrome://global/skin/icons/upload.svg");
    importBtn.setAttribute("tooltiptext", "Import custom commands from JSON file");
    toolbar.appendChild(importBtn);

    const exportBtn = doc.createXULElement("toolbarbutton");
    exportBtn.id = "palette-custom-export";
    exportBtn.classList.add("toolbarbutton-1");
    exportBtn.setAttribute("label", "Export");
    exportBtn.setAttribute("image", "chrome://global/skin/icons/download.svg");
    exportBtn.setAttribute("tooltiptext", "Export custom commands to JSON file");
    toolbar.appendChild(exportBtn);

    tab.appendChild(toolbar);

    const commandsList = doc.createXULElement("vbox");
    commandsList.id = "palette-custom-commands-list";
    commandsList.classList.add("custom-commands-list");

    const scrollbox = doc.createXULElement("scrollbox");
    scrollbox.setAttribute("flex", "1");
    scrollbox.appendChild(commandsList);

    tab.appendChild(scrollbox);

    const editor = this.#createCustomCommandEditor(doc);
    editor.style.display = "none";
    tab.appendChild(editor);

    return tab;
  }

  #createCustomCommandEditor(doc) {
    const editor = doc.createXULElement("vbox");
    editor.id = "palette-custom-editor";
    editor.classList.add("custom-command-editor");

    const editorTitle = doc.createXULElement("label");
    editorTitle.classList.add("editor-title");
    editorTitle.textContent = "Add Custom Command";
    editor.appendChild(editorTitle);

    const formGrid = doc.createXULElement("vbox");
    formGrid.classList.add("editor-form");

    const keyRow = doc.createXULElement("hbox");
    keyRow.classList.add("editor-row");
    const keyLabel = doc.createXULElement("label");
    keyLabel.textContent = "Key (ID):";
    keyLabel.classList.add("editor-label");
    const keyInput = doc.createElement("input");
    keyInput.id = "custom-cmd-key";
    keyInput.type = "text";
    keyInput.placeholder = "my-custom-command";
    keyInput.classList.add("editor-input");
    keyRow.appendChild(keyLabel);
    keyRow.appendChild(keyInput);
    formGrid.appendChild(keyRow);

    const labelRow = doc.createXULElement("hbox");
    labelRow.classList.add("editor-row");
    const labelLabel = doc.createXULElement("label");
    labelLabel.textContent = "Label:";
    labelLabel.classList.add("editor-label");
    const labelInput = doc.createElement("input");
    labelInput.id = "custom-cmd-label";
    labelInput.type = "text";
    labelInput.placeholder = "My Custom Command";
    labelInput.classList.add("editor-input");
    labelRow.appendChild(labelLabel);
    labelRow.appendChild(labelInput);
    formGrid.appendChild(labelRow);

    const iconRow = doc.createXULElement("hbox");
    iconRow.classList.add("editor-row");
    const iconLabel = doc.createXULElement("label");
    iconLabel.textContent = "Icon URL:";
    iconLabel.classList.add("editor-label");
    const iconInputBox = doc.createXULElement("hbox");
    iconInputBox.setAttribute("flex", "1");
    iconInputBox.classList.add("icon-input-box");
    const iconInput = doc.createElement("input");
    iconInput.id = "custom-cmd-icon";
    iconInput.type = "text";
    iconInput.placeholder = "chrome://browser/skin/tab.svg";
    iconInput.classList.add("editor-input");
    iconInput.setAttribute("flex", "1");
    const iconPickerBtn = doc.createXULElement("toolbarbutton");
    iconPickerBtn.id = "custom-cmd-icon-picker";
    iconPickerBtn.classList.add("icon-picker-btn");
    iconPickerBtn.setAttribute("image", "chrome://global/skin/icons/more.svg");
    iconPickerBtn.setAttribute("tooltiptext", "Choose icon");
    iconInputBox.appendChild(iconInput);
    iconInputBox.appendChild(iconPickerBtn);
    iconRow.appendChild(iconLabel);
    iconRow.appendChild(iconInputBox);
    formGrid.appendChild(iconRow);

    const tagsRow = doc.createXULElement("hbox");
    tagsRow.classList.add("editor-row");
    const tagsLabel = doc.createXULElement("label");
    tagsLabel.textContent = "Tags:";
    tagsLabel.classList.add("editor-label");
    const tagsInput = doc.createElement("input");
    tagsInput.id = "custom-cmd-tags";
    tagsInput.type = "text";
    tagsInput.placeholder = "custom, my, tags";
    tagsInput.classList.add("editor-input");
    tagsRow.appendChild(tagsLabel);
    tagsRow.appendChild(tagsInput);
    formGrid.appendChild(tagsRow);

    const codeRow = doc.createXULElement("vbox");
    codeRow.classList.add("editor-row-full");
    const codeLabel = doc.createXULElement("label");
    codeLabel.textContent = "Command Code (JavaScript):";
    codeLabel.classList.add("editor-label");
    const codeInput = doc.createElement("textarea");
    codeInput.id = "custom-cmd-code";
    codeInput.rows = 6;
    codeInput.placeholder = "window.alert('Hello from custom command!');";
    codeInput.classList.add("editor-textarea");
    codeRow.appendChild(codeLabel);
    codeRow.appendChild(codeInput);
    formGrid.appendChild(codeRow);

    const shortcutRow = doc.createXULElement("hbox");
    shortcutRow.classList.add("editor-row");
    const shortcutLabel = doc.createXULElement("label");
    shortcutLabel.textContent = "Shortcut:";
    shortcutLabel.classList.add("editor-label");
    const shortcutInput = doc.createElement("input");
    shortcutInput.id = "custom-cmd-shortcut";
    shortcutInput.type = "text";
    shortcutInput.placeholder = "Click and press keys...";
    shortcutInput.classList.add("editor-input", "shortcut-input");
    shortcutInput.readOnly = true;
    shortcutRow.appendChild(shortcutLabel);
    shortcutRow.appendChild(shortcutInput);
    formGrid.appendChild(shortcutRow);

    editor.appendChild(formGrid);

    // Test button row
    const testRow = doc.createXULElement("hbox");
    testRow.classList.add("editor-test-row");
    
    const testBtn = doc.createXULElement("button");
    testBtn.id = "custom-cmd-test";
    testBtn.setAttribute("label", "Test Code");
    testBtn.classList.add("test-code-btn");
    testRow.appendChild(testBtn);
    
    const testResult = doc.createXULElement("label");
    testResult.id = "custom-cmd-test-result";
    testResult.classList.add("test-result");
    testResult.style.display = "none";
    testRow.appendChild(testResult);
    
    editor.appendChild(testRow);

    const errorMsg = doc.createXULElement("label");
    errorMsg.id = "custom-cmd-error";
    errorMsg.classList.add("editor-error");
    errorMsg.style.display = "none";
    editor.appendChild(errorMsg);

    const buttonRow = doc.createXULElement("hbox");
    buttonRow.classList.add("editor-buttons");

    const cancelBtn = doc.createXULElement("button");
    cancelBtn.id = "custom-cmd-cancel";
    cancelBtn.setAttribute("label", "Cancel");
    cancelBtn.classList.add("footer-button");
    buttonRow.appendChild(cancelBtn);

    const saveBtn = doc.createXULElement("button");
    saveBtn.id = "custom-cmd-save";
    saveBtn.setAttribute("label", "Save Command");
    saveBtn.classList.add("footer-button", "primary");
    buttonRow.appendChild(saveBtn);

    editor.appendChild(buttonRow);

    return editor;
  }

  #createThemeTab(doc) {
    const tab = doc.createXULElement("vbox");
    tab.id = "palette-tab-panel-theme";
    tab.classList.add("tab-panel");
    tab.setAttribute("data-tab", "theme");

    const scrollbox = doc.createXULElement("scrollbox");
    scrollbox.setAttribute("flex", "1");

    const content = doc.createXULElement("vbox");
    content.classList.add("theme-content");

    const title = doc.createXULElement("label");
    title.textContent = "Appearance Customization";
    title.classList.add("section-header");
    content.appendChild(title);

    content.appendChild(
      this.#createThemePrefRow(
        doc,
        "Font Family",
        "command-palette.theme.font-family",
        "text",
        "CSS font-family for palette text (e.g., monospace, 'Fira Code')"
      )
    );

    content.appendChild(
      this.#createThemePrefRow(
        doc,
        "Font Size",
        "command-palette.theme.font-size",
        "number",
        "Font size in pixels (default: 13)"
      )
    );

    content.appendChild(
      this.#createThemePrefRow(
        doc,
        "Result Height",
        "command-palette.theme.result-height",
        "number",
        "Height of each result row in pixels (default: 32)"
      )
    );

    content.appendChild(
      this.#createThemePrefRow(
        doc,
        "Panel Width",
        "command-palette.theme.panel-width",
        "number",
        "Width of urlbar panel in pixels (default: 600)"
      )
    );

    const separator = doc.createXULElement("separator");
    separator.classList.add("pref-separator");
    content.appendChild(separator);

    const colorsTitle = doc.createXULElement("label");
    colorsTitle.textContent = "Colors";
    colorsTitle.classList.add("section-header");
    content.appendChild(colorsTitle);

    content.appendChild(
      this.#createThemePrefRow(
        doc,
        "Background Color",
        "command-palette.theme.bg-color",
        "color",
        "Background color (hex or CSS color name)"
      )
    );

    content.appendChild(
      this.#createThemePrefRow(
        doc,
        "Text Color",
        "command-palette.theme.text-color",
        "color",
        "Text color (hex or CSS color name)"
      )
    );

    content.appendChild(
      this.#createThemePrefRow(
        doc,
        "Highlight Color",
        "command-palette.theme.highlight-color",
        "color",
        "Selected result highlight color"
      )
    );

    const resetBtn = doc.createXULElement("button");
    resetBtn.id = "palette-theme-reset";
    resetBtn.setAttribute("label", "Reset to Defaults");
    resetBtn.classList.add("theme-reset-btn");
    resetBtn.addEventListener("click", () => this.#resetThemeDefaults());
    content.appendChild(resetBtn);

    scrollbox.appendChild(content);
    tab.appendChild(scrollbox);

    return tab;
  }

  #createThemePrefRow(doc, label, prefName, type, description) {
    const row = doc.createXULElement("vbox");
    row.classList.add("pref-row");

    const headerBox = doc.createXULElement("hbox");
    headerBox.classList.add("pref-header");

    const labelEl = doc.createXULElement("label");
    labelEl.textContent = label;
    labelEl.classList.add("pref-label");
    headerBox.appendChild(labelEl);

    let input;
    if (type === "color") {
      input = doc.createElement("input");
      input.id = `pref-${prefName}`;
      input.type = "text";
      input.setAttribute("preference", prefName);
      input.classList.add("pref-input", "color-input");
      input.placeholder = "#000000";
    } else if (type === "number") {
      input = doc.createElement("input");
      input.id = `pref-${prefName}`;
      input.type = "number";
      input.setAttribute("preference", prefName);
      input.classList.add("pref-input");
      input.min = "0";
    } else {
      input = doc.createElement("input");
      input.id = `pref-${prefName}`;
      input.type = "text";
      input.setAttribute("preference", prefName);
      input.classList.add("pref-input");
    }
    headerBox.appendChild(input);

    row.appendChild(headerBox);

    if (description) {
      const desc = doc.createXULElement("label");
      desc.textContent = description;
      desc.classList.add("pref-description");
      row.appendChild(desc);
    }

    return row;
  }

  async #resetThemeDefaults() {
    if (!confirm("Reset all theme settings to defaults?")) {
      return;
    }

    const themePrefs = [
      "command-palette.theme.font-family",
      "command-palette.theme.font-size",
      "command-palette.theme.result-height",
      "command-palette.theme.panel-width",
      "command-palette.theme.bg-color",
      "command-palette.theme.text-color",
      "command-palette.theme.highlight-color",
    ];

    for (const pref of themePrefs) {
      try {
        Services.prefs.clearUserPref(pref);
      } catch (e) {
        console.warn(`Failed to clear pref ${pref}:`, e);
      }
    }

    this.#loadPreferences();
    alert("Theme settings reset to defaults");
  }

  #createHelpTab(doc) {
    const tab = doc.createXULElement("vbox");
    tab.id = "palette-tab-panel-help";
    tab.classList.add("tab-panel");
    tab.setAttribute("data-tab", "help");

    const scrollbox = doc.createXULElement("scrollbox");
    scrollbox.setAttribute("flex", "1");

    const content = doc.createXULElement("vbox");
    content.classList.add("help-content");

    // Usage section
    const usageTitle = doc.createXULElement("label");
    usageTitle.textContent = "Usage";
    usageTitle.classList.add("help-section-title");
    content.appendChild(usageTitle);

    const usageText = doc.createXULElement("description");
    usageText.textContent =
      "Type in the address bar to search commands. Use the configured prefix (default ':') to exclusively show commands.";
    content.appendChild(usageText);

    // Examples section
    const examplesTitle = doc.createXULElement("label");
    examplesTitle.textContent = "Examples";
    examplesTitle.classList.add("help-section-title");
    content.appendChild(examplesTitle);

    const examples = [
      ":new tab - Open new tab",
      ":book - Bookmark commands",
      ":dev - Developer tools",
      ":about:config - Open about:config",
    ];

    examples.forEach((example) => {
      const exampleLabel = doc.createXULElement("label");
      exampleLabel.textContent = example;
      exampleLabel.classList.add("help-example");
      content.appendChild(exampleLabel);
    });

    // Credits
    const creditsTitle = doc.createXULElement("label");
    creditsTitle.textContent = "Credits";
    creditsTitle.classList.add("help-section-title");
    content.appendChild(creditsTitle);

    const credits = doc.createXULElement("description");
    credits.textContent =
      "Adapted from Zen Browser command-palette by BibekBhusal0";
    content.appendChild(credits);

    scrollbox.appendChild(content);
    tab.appendChild(scrollbox);

    return tab;
  }

  #createFooter(doc) {
    const footer = doc.createXULElement("hbox");
    footer.classList.add("panel-footer");

    const cancelBtn = doc.createXULElement("button");
    cancelBtn.id = "palette-settings-cancel";
    cancelBtn.setAttribute("label", "Cancel");
    cancelBtn.classList.add("footer-button");

    const saveBtn = doc.createXULElement("button");
    saveBtn.id = "palette-settings-save";
    saveBtn.setAttribute("label", "Save");
    saveBtn.setAttribute("default", "true");
    saveBtn.classList.add("footer-button", "primary");

    footer.appendChild(cancelBtn);
    footer.appendChild(saveBtn);

    return footer;
  }

  #attachEventListeners() {
    // Close button
    const closeBtn = document.getElementById("palette-settings-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.hide());
    }

    // Tab switching
    const tabButtons = document.querySelectorAll(".tab-button");
    tabButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        this.#switchTab(e.target.getAttribute("data-tab"));
      });
    });

    // Cancel button
    const cancelBtn = document.getElementById("palette-settings-cancel");
    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => this.hide());
    }

    // Save button
    const saveBtn = document.getElementById("palette-settings-save");
    if (saveBtn) {
      saveBtn.addEventListener("click", () => this.#saveSettings());
    }

    const customAddBtn = document.getElementById("palette-custom-add");
    if (customAddBtn) {
      customAddBtn.addEventListener("click", () => this.#showCustomCommandEditor());
    }

    const importBtn = document.getElementById("palette-custom-import");
    if (importBtn) {
      importBtn.addEventListener("click", () => this.#importCustomCommands());
    }

    const exportBtn = document.getElementById("palette-custom-export");
    if (exportBtn) {
      exportBtn.addEventListener("click", () => this.#exportCustomCommands());
    }

    const customCancelBtn = document.getElementById("custom-cmd-cancel");
    if (customCancelBtn) {
      customCancelBtn.addEventListener("click", () => this.#hideCustomCommandEditor());
    }

    const customSaveBtn = document.getElementById("custom-cmd-save");
    if (customSaveBtn) {
      customSaveBtn.addEventListener("click", () => this.#saveCustomCommand());
    }

    const testBtn = document.getElementById("custom-cmd-test");
    if (testBtn) {
      testBtn.addEventListener("click", () => this.#testCustomCommand());
    }

    const shortcutInput = document.getElementById("custom-cmd-shortcut");
    if (shortcutInput) {
      shortcutInput.addEventListener("keydown", (e) => this.#captureShortcut(e));
      shortcutInput.addEventListener("click", () => {
        shortcutInput.value = "";
        shortcutInput.classList.remove("shortcut-conflict");
      });
    }

    // Icon picker button
    const iconPickerBtn = document.getElementById("custom-cmd-icon-picker");
    if (iconPickerBtn) {
      iconPickerBtn.addEventListener("click", () => {
        const panel = document.getElementById("command-palette-icon-picker-panel");
        if (panel) {
          panel.openPopup(iconPickerBtn, "after_start", 0, 0, false, false);
        }
      });
    }

    // Icon picker options
    const iconOptions = document.querySelectorAll(".icon-option");
    iconOptions.forEach((btn) => {
      btn.addEventListener("click", () => {
        const iconUrl = btn.getAttribute("data-icon-url");
        const iconInput = document.getElementById("custom-cmd-icon");
        if (iconInput) {
          iconInput.value = iconUrl;
        }
        const panel = document.getElementById("command-palette-icon-picker-panel");
        if (panel) {
          panel.hidePopup();
        }
      });
    });
  }

  #switchTab(tabId) {
    // Update active tab button
    const tabButtons = document.querySelectorAll(".tab-button");
    tabButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId);
    });

    // Update active tab panel
    const tabPanels = document.querySelectorAll(".tab-panel");
    tabPanels.forEach((panel) => {
      panel.classList.toggle(
        "active",
        panel.getAttribute("data-tab") === tabId
      );
    });

    this.currentTab = tabId;
  }

  async #saveSettings() {
    const { PaletteControllers } = await import("../palette_controllers.mjs");
    const currentSettings = await PaletteControllers.settingsController.loadSettings();

    const inputs = document.querySelectorAll("[preference]");
    for (const input of inputs) {
      const prefName = input.getAttribute("preference");
      let value;

      if (input.type === "checkbox") {
        value = input.checked;
      } else if (input.type === "number") {
        value = parseInt(input.value, 10);
      } else {
        value = input.value;
      }

      await PaletteControllers.settingsController.savePreference(prefName, value);
    }

    const commandItems = document.querySelectorAll(".command-item");
    const hiddenCommands = [];

    commandItems.forEach((item) => {
      const checkbox = item.querySelector(".command-checkbox");
      const key = item.getAttribute("data-key");

      if (checkbox && !checkbox.checked) {
        hiddenCommands.push(key);
      }
    });

    currentSettings.hiddenCommands = hiddenCommands;
    await PaletteControllers.settingsController.saveSettings(currentSettings);

    console.log("Settings saved successfully");
    this.hide();
  }

  show() {
    if (!this.panel) {
      console.error("Settings panel not initialized");
      return;
    }

    this.#loadPreferences();

    this.#loadCommandsList();

    this.#loadCustomCommandsList();

    const anchor = document.getElementById("main-window");
    if (anchor) {
      this.panel.openPopup(
        anchor,
        "overlap",
        0,
        0,
        false,
        false
      );
    }
  }

  hide() {
    if (this.panel && this.panel.state !== "closed") {
      this.panel.hidePopup();
    }
  }

  #loadPreferences() {
    // Load all preference values into inputs
    const inputs = document.querySelectorAll("[preference]");
    inputs.forEach((input) => {
      const prefName = input.getAttribute("preference");
      try {
        const prefValue = Services.prefs.getStringPref(prefName, "");
        if (input.type === "checkbox") {
          input.checked = Services.prefs.getBoolPref(prefName, false);
        } else if (input.type === "number") {
          input.value = Services.prefs.getIntPref(prefName, 0);
        } else {
          input.value = prefValue;
        }
      } catch (e) {
        console.warn(`Failed to load preference ${prefName}:`, e);
      }
    });
  }

  async #loadCommandsList() {
    const commandsList = document.getElementById("palette-commands-list");
    if (!commandsList) return;

    const { PaletteControllers } = await import("../palette_controllers.mjs");
    const { getAllCategories } = await import("../utils/categories.mjs");
    
    const commands = await PaletteControllers.settingsController.getAllCommands();
    const settings = await PaletteControllers.settingsController.loadSettings();

    const categorySelect = document.getElementById("palette-category-filter");
    if (categorySelect && categorySelect.options.length === 1) {
      const categories = getAllCategories();
      for (const category of categories) {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.label;
        categorySelect.appendChild(option);
      }

      categorySelect.addEventListener("change", () => {
        this.#filterCommandsList();
      });
    }

    commandsList.textContent = "";

    for (const cmd of commands) {
      const item = this.#createCommandItem(document, cmd, settings);
      commandsList.appendChild(item);
    }

    const searchInput = document.getElementById("palette-command-search");
    if (searchInput) {
      searchInput.addEventListener("input", () => this.#filterCommandsList());
    }
  }

  #createCommandItem(doc, cmd, settings) {
    const item = doc.createXULElement("hbox");
    item.classList.add("command-item");
    item.setAttribute("data-key", cmd.key);
    if (cmd.category) {
      item.setAttribute("data-category", cmd.category);
    }

    const checkbox = doc.createXULElement("checkbox");
    checkbox.classList.add("command-checkbox");
    const isHidden = settings.hiddenCommands?.includes(cmd.key);
    checkbox.checked = !isHidden;
    item.appendChild(checkbox);

    if (cmd.icon) {
      const icon = doc.createElement("img");
      icon.classList.add("command-icon");
      icon.src = settings.customIcons?.[cmd.key] || cmd.icon;
      item.appendChild(icon);
    }

    const label = doc.createXULElement("label");
    label.classList.add("command-label");
    label.textContent = cmd.label;
    label.setAttribute("flex", "1");
    item.appendChild(label);

    const shortcutBox = doc.createXULElement("hbox");
    shortcutBox.classList.add("command-shortcut-box");

    const shortcut = settings.customShortcuts?.[cmd.key] || cmd.shortcut;
    const shortcutLabel = doc.createXULElement("label");
    shortcutLabel.classList.add("command-shortcut");
    shortcutLabel.textContent = shortcut || "None";
    shortcutLabel.setAttribute("data-cmd-key", cmd.key);
    shortcutBox.appendChild(shortcutLabel);

    const editShortcutBtn = doc.createXULElement("toolbarbutton");
    editShortcutBtn.classList.add("edit-shortcut-btn");
    editShortcutBtn.setAttribute("image", "chrome://global/skin/icons/edit.svg");
    editShortcutBtn.setAttribute("tooltiptext", "Edit shortcut");
    editShortcutBtn.addEventListener("click", () => this.#editCommandShortcut(cmd.key));
    shortcutBox.appendChild(editShortcutBtn);

    item.appendChild(shortcutBox);

    return item;
  }

  #filterCommandsList() {
    const searchInput = document.getElementById("palette-command-search");
    const categorySelect = document.getElementById("palette-category-filter");
    
    const query = searchInput?.value.toLowerCase() || "";
    const selectedCategory = categorySelect?.value || "";

    const items = document.querySelectorAll(".command-item");
    items.forEach((item) => {
      const label = item.querySelector(".command-label");
      const text = label?.textContent.toLowerCase() || "";
      const key = item.getAttribute("data-key")?.toLowerCase() || "";
      const category = item.getAttribute("data-category") || "";

      const textMatches = !query || text.includes(query) || key.includes(query);
      const categoryMatches = !selectedCategory || category === selectedCategory;

      item.style.display = (textMatches && categoryMatches) ? "" : "none";
    });
  }

  async #editCommandShortcut(cmdKey) {
    const shortcutLabel = document.querySelector(`.command-shortcut[data-cmd-key="${cmdKey}"]`);
    if (!shortcutLabel) return;

    const currentShortcut = shortcutLabel.textContent;
    const originalText = currentShortcut;

    shortcutLabel.textContent = "Press keys...";
    shortcutLabel.classList.add("recording");

    const captureKey = async (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (["Escape"].includes(e.key)) {
        shortcutLabel.textContent = originalText;
        shortcutLabel.classList.remove("recording");
        document.removeEventListener("keydown", captureKey, true);
        return;
      }

      const parts = [];
      if (e.ctrlKey) parts.push("Ctrl");
      if (e.altKey) parts.push("Alt");
      if (e.shiftKey) parts.push("Shift");
      if (e.metaKey) parts.push("Meta");

      if (e.key && !["Control", "Alt", "Shift", "Meta"].includes(e.key)) {
        parts.push(e.key.toUpperCase());
      }

      if (parts.length < 2) {
        return;
      }

      const shortcut = parts.join("+");

      const { PaletteControllers } = await import("../palette_controllers.mjs");
      const conflict = PaletteControllers.settingsController.detectShortcutConflicts(shortcut, cmdKey);

      if (conflict.conflict) {
        const overwrite = confirm(
          `Shortcut "${shortcut}" is already used by "${conflict.conflictingCommand}". Overwrite?`
        );
        if (!overwrite) {
          shortcutLabel.textContent = originalText;
          shortcutLabel.classList.remove("recording");
          document.removeEventListener("keydown", captureKey, true);
          return;
        }
      }

      const settings = await PaletteControllers.settingsController.loadSettings();
      if (!settings.customShortcuts) {
        settings.customShortcuts = {};
      }
      settings.customShortcuts[cmdKey] = shortcut;
      await PaletteControllers.settingsController.saveSettings(settings);

      shortcutLabel.textContent = shortcut;
      shortcutLabel.classList.remove("recording");
      document.removeEventListener("keydown", captureKey, true);
    };

    document.addEventListener("keydown", captureKey, true);
  }

  #showCustomCommandEditor(commandToEdit = null) {
    const editor = document.getElementById("palette-custom-editor");
    const list = document.getElementById("palette-custom-commands-list");
    const title = editor.querySelector(".editor-title");

    if (commandToEdit) {
      title.textContent = "Edit Custom Command";
      document.getElementById("custom-cmd-key").value = commandToEdit.key;
      document.getElementById("custom-cmd-key").disabled = true;
      document.getElementById("custom-cmd-label").value = commandToEdit.label;
      document.getElementById("custom-cmd-icon").value = commandToEdit.icon || "";
      document.getElementById("custom-cmd-tags").value = commandToEdit.tags?.join(", ") || "";
      document.getElementById("custom-cmd-code").value = commandToEdit.command || "";
      document.getElementById("custom-cmd-shortcut").value = commandToEdit.shortcut || "";
      editor.setAttribute("data-editing", commandToEdit.key);
    } else {
      title.textContent = "Add Custom Command";
      document.getElementById("custom-cmd-key").value = "";
      document.getElementById("custom-cmd-key").disabled = false;
      document.getElementById("custom-cmd-label").value = "";
      document.getElementById("custom-cmd-icon").value = "";
      document.getElementById("custom-cmd-tags").value = "";
      document.getElementById("custom-cmd-code").value = "";
      document.getElementById("custom-cmd-shortcut").value = "";
      editor.removeAttribute("data-editing");
    }

    const errorMsg = document.getElementById("custom-cmd-error");
    errorMsg.style.display = "none";

    const shortcutInput = document.getElementById("custom-cmd-shortcut");
    shortcutInput.classList.remove("shortcut-conflict");

    list.parentElement.style.display = "none";
    editor.style.display = "";
  }

  #hideCustomCommandEditor() {
    const editor = document.getElementById("palette-custom-editor");
    const list = document.getElementById("palette-custom-commands-list");

    editor.style.display = "none";
    list.parentElement.style.display = "";
  }

  async #saveCustomCommand() {
    const { PaletteControllers } = await import("../palette_controllers.mjs");

    const key = document.getElementById("custom-cmd-key").value.trim();
    const label = document.getElementById("custom-cmd-label").value.trim();
    const icon = document.getElementById("custom-cmd-icon").value.trim();
    const tagsStr = document.getElementById("custom-cmd-tags").value.trim();
    const code = document.getElementById("custom-cmd-code").value.trim();
    const shortcut = document.getElementById("custom-cmd-shortcut").value.trim();

    const tags = tagsStr ? tagsStr.split(",").map((t) => t.trim()) : [];

    const newCommand = {
      key: key,
      label: label,
      icon: icon || undefined,
      tags: tags,
      command: code,
      shortcut: shortcut || undefined,
    };

    const validation = PaletteControllers.settingsController.validateCustomCommand(newCommand);

    const errorMsg = document.getElementById("custom-cmd-error");
    if (!validation.valid) {
      errorMsg.textContent = validation.error;
      errorMsg.style.display = "";
      return;
    }

    // Validate JavaScript code syntax
    if (code) {
      try {
        const testFn = new Function("window", "document", "gBrowser", code);
        testFn.toString();
      } catch (e) {
        errorMsg.textContent = `Invalid JavaScript: ${e.message}`;
        errorMsg.style.display = "";
        return;
      }
    }

    if (shortcut) {
      const shortcutInput = document.getElementById("custom-cmd-shortcut");
      if (shortcutInput.classList.contains("shortcut-conflict")) {
        errorMsg.textContent = "Please resolve shortcut conflict before saving";
        errorMsg.style.display = "";
        return;
      }
    }

    const settings = await PaletteControllers.settingsController.loadSettings();
    if (!settings.customCommands) {
      settings.customCommands = [];
    }

    const editor = document.getElementById("palette-custom-editor");
    const editingKey = editor.getAttribute("data-editing");

    if (editingKey) {
      const index = settings.customCommands.findIndex((cmd) => cmd.key === editingKey);
      if (index !== -1) {
        settings.customCommands[index] = newCommand;
      }
    } else {
      const exists = settings.customCommands.some((cmd) => cmd.key === key);
      if (exists) {
        errorMsg.textContent = "A command with this key already exists";
        errorMsg.style.display = "";
        return;
      }
      settings.customCommands.push(newCommand);
    }

    await PaletteControllers.settingsController.saveSettings(settings);

    this.#hideCustomCommandEditor();
    this.#loadCustomCommandsList();
  }

  #testCustomCommand() {
    const codeInput = document.getElementById("custom-cmd-code");
    const testResult = document.getElementById("custom-cmd-test-result");
    const code = codeInput.value.trim();

    if (!code) {
      testResult.textContent = "⚠️ No code to test";
      testResult.className = "test-result warning";
      testResult.style.display = "";
      return;
    }

    try {
      // Create sandboxed function to test syntax
      const testFn = new Function("window", "document", "gBrowser", code);

      // Test syntax by converting to string
      testFn.toString();

      testResult.textContent = "✓ Code is valid";
      testResult.className = "test-result success";
      testResult.style.display = "";
    } catch (e) {
      testResult.textContent = `✗ Error: ${e.message}`;
      testResult.className = "test-result error";
      testResult.style.display = "";
      console.error("Command validation error:", e);
    }
  }

  async #loadCustomCommandsList() {
    const { PaletteControllers } = await import("../palette_controllers.mjs");
    const settings = await PaletteControllers.settingsController.loadSettings();
    const list = document.getElementById("palette-custom-commands-list");

    list.textContent = "";

    const customCommands = settings.customCommands || [];

    if (customCommands.length === 0) {
      const emptyMsg = document.createXULElement("label");
      emptyMsg.textContent = "No custom commands. Click 'Add Command' to create one.";
      emptyMsg.classList.add("empty-message");
      list.appendChild(emptyMsg);
      return;
    }

    for (const cmd of customCommands) {
      const item = this.#createCustomCommandItem(document, cmd);
      list.appendChild(item);
    }
  }

  #createCustomCommandItem(doc, cmd) {
    const item = doc.createXULElement("hbox");
    item.classList.add("custom-command-item");
    item.setAttribute("data-key", cmd.key);

    if (cmd.icon) {
      const icon = doc.createElement("img");
      icon.classList.add("command-icon");
      icon.src = cmd.icon;
      item.appendChild(icon);
    }

    const labelBox = doc.createXULElement("vbox");
    labelBox.setAttribute("flex", "1");

    const label = doc.createXULElement("label");
    label.classList.add("command-label");
    label.textContent = cmd.label;
    labelBox.appendChild(label);

    const key = doc.createXULElement("label");
    key.classList.add("command-key");
    key.textContent = cmd.key;
    labelBox.appendChild(key);

    item.appendChild(labelBox);

    const editBtn = doc.createXULElement("toolbarbutton");
    editBtn.classList.add("command-edit-btn");
    editBtn.setAttribute("image", "chrome://global/skin/icons/edit.svg");
    editBtn.setAttribute("tooltiptext", "Edit");
    editBtn.addEventListener("click", () => this.#showCustomCommandEditor(cmd));
    item.appendChild(editBtn);

    const deleteBtn = doc.createXULElement("toolbarbutton");
    deleteBtn.classList.add("command-delete-btn");
    deleteBtn.setAttribute("image", "chrome://global/skin/icons/delete.svg");
    deleteBtn.setAttribute("tooltiptext", "Delete");
    deleteBtn.addEventListener("click", () => this.#deleteCustomCommand(cmd.key));
    item.appendChild(deleteBtn);

    return item;
  }

  async #deleteCustomCommand(key) {
    if (!confirm(`Delete custom command "${key}"?`)) {
      return;
    }

    const { PaletteControllers } = await import("../palette_controllers.mjs");
    const settings = await PaletteControllers.settingsController.loadSettings();

    settings.customCommands = settings.customCommands.filter((cmd) => cmd.key !== key);

    await PaletteControllers.settingsController.saveSettings(settings);
    this.#loadCustomCommandsList();
  }

  async #importCustomCommands() {
    try {
      const fp = Cc["@mozilla.org/filepicker;1"].createInstance(Ci.nsIFilePicker);
      fp.init(window, "Import Custom Commands", Ci.nsIFilePicker.modeOpen);
      fp.appendFilter("JSON Files", "*.json");
      fp.appendFilters(Ci.nsIFilePicker.filterAll);

      const result = await new Promise((resolve) => {
        fp.open((returnValue) => resolve(returnValue));
      });

      if (result !== Ci.nsIFilePicker.returnOK) {
        return;
      }

      const data = await IOUtils.readUTF8(fp.file.path);
      const importedData = JSON.parse(data);

      if (!Array.isArray(importedData.customCommands)) {
        alert("Invalid file format: customCommands array not found");
        return;
      }

      const { PaletteControllers } = await import("../palette_controllers.mjs");
      const settings = await PaletteControllers.settingsController.loadSettings();

      let imported = 0;
      let skipped = 0;

      for (const cmd of importedData.customCommands) {
        const validation = PaletteControllers.settingsController.validateCustomCommand(cmd);
        if (!validation.valid) {
          console.warn(`Skipping invalid command ${cmd.key}:`, validation.error);
          skipped++;
          continue;
        }

        const exists = settings.customCommands?.some((existing) => existing.key === cmd.key);
        if (exists) {
          const overwrite = confirm(
            `Command "${cmd.key}" already exists. Overwrite?`
          );
          if (!overwrite) {
            skipped++;
            continue;
          }
          settings.customCommands = settings.customCommands.filter((c) => c.key !== cmd.key);
        }

        if (!settings.customCommands) {
          settings.customCommands = [];
        }
        settings.customCommands.push(cmd);
        imported++;
      }

      await PaletteControllers.settingsController.saveSettings(settings);
      this.#loadCustomCommandsList();

      alert(`Import complete: ${imported} imported, ${skipped} skipped`);
    } catch (e) {
      console.error("Import failed:", e);
      alert(`Import failed: ${e.message}`);
    }
  }

  async #exportCustomCommands() {
    try {
      const { PaletteControllers } = await import("../palette_controllers.mjs");
      const settings = await PaletteControllers.settingsController.loadSettings();

      if (!settings.customCommands || settings.customCommands.length === 0) {
        alert("No custom commands to export");
        return;
      }

      const exportData = {
        version: "1.0",
        exported: new Date().toISOString(),
        customCommands: settings.customCommands,
      };

      const fp = Cc["@mozilla.org/filepicker;1"].createInstance(Ci.nsIFilePicker);
      fp.init(window, "Export Custom Commands", Ci.nsIFilePicker.modeSave);
      fp.appendFilter("JSON Files", "*.json");
      fp.defaultString = `command-palette-export-${Date.now()}.json`;

      const result = await new Promise((resolve) => {
        fp.open((returnValue) => resolve(returnValue));
      });

      if (result !== Ci.nsIFilePicker.returnOK && result !== Ci.nsIFilePicker.returnReplace) {
        return;
      }

      const jsonString = JSON.stringify(exportData, null, 2);
      await IOUtils.writeUTF8(fp.file.path, jsonString);

      alert(`Exported ${settings.customCommands.length} custom commands`);
    } catch (e) {
      console.error("Export failed:", e);
      alert(`Export failed: ${e.message}`);
    }
  }

  async #captureShortcut(event) {
    event.preventDefault();
    event.stopPropagation();

    const parts = [];

    if (event.ctrlKey) parts.push("Ctrl");
    if (event.altKey) parts.push("Alt");
    if (event.shiftKey) parts.push("Shift");
    if (event.metaKey) parts.push("Meta");

    if (event.key && !["Control", "Alt", "Shift", "Meta"].includes(event.key)) {
      parts.push(event.key.toUpperCase());
    }

    if (parts.length === 0 || parts.length === 1) {
      return;
    }

    const shortcut = parts.join("+");
    const shortcutInput = document.getElementById("custom-cmd-shortcut");
    shortcutInput.value = shortcut;

    await this.#checkShortcutConflict(shortcut);
  }

  async #checkShortcutConflict(shortcut) {
    const { PaletteControllers } = await import("../palette_controllers.mjs");
    const editor = document.getElementById("palette-custom-editor");
    const currentKey = document.getElementById("custom-cmd-key").value.trim();
    const editingKey = editor.getAttribute("data-editing");

    const result = PaletteControllers.settingsController.detectShortcutConflicts(
      shortcut,
      editingKey || currentKey
    );

    const shortcutInput = document.getElementById("custom-cmd-shortcut");
    const errorMsg = document.getElementById("custom-cmd-error");

    if (result.conflict) {
      shortcutInput.classList.add("shortcut-conflict");
      errorMsg.textContent = `Shortcut conflict: Already used by "${result.conflictingCommand}"`;
      errorMsg.style.display = "";
    } else {
      shortcutInput.classList.remove("shortcut-conflict");
      if (errorMsg.textContent.startsWith("Shortcut conflict:")) {
        errorMsg.style.display = "none";
      }
    }
  }
}
