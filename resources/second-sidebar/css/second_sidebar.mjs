// Second Sidebar stylesheet — consolidated from the former css/*.mjs modules.
// Concatenation order matches the previous sidebar_decorator.mjs STYLE assembly.
export const SECOND_SIDEBAR_CSS = `
  @import url("chrome://global/content/elements/moz-toggle.css");

  :root {
    --sb2-main-padding: 0;
    --sb2-main-web-panel-buttons-position: start;
  }

  #browser {
    position: relative;
  }

  #sb2-wrapper {
    display: contents;

    &[position="right"] {
      #sb2-after-splitter { order: 20; }
      #sb2-splitter { order: 21; }
      #sb2-box { order: 22; }
      #sb2-main { order: 23; }
    }

    &[position="left"] {
      #sb2-main { order: -23; }
      #sb2-box { order: -22; }
      #sb2-splitter { order: -21; }
      #sb2-after-splitter { order: -20; }
    }
  }

  #sb2-main {
    display: flex;
    flex-direction: column;
    justify-content: var(--sb2-main-web-panel-buttons-position);
    gap: calc(2 * var(--tab-block-margin));
    top: 0;
    height: 100%;
    padding: var(--tab-block-margin) var(--sb2-main-padding) var(--tab-block-margin) var(--sb2-main-padding);
    overflow-y: scroll;
    scrollbar-width: none;

    &[overlay="true"] {
      position: absolute;
      z-index: 9999;
      background-color: var(--firefoxcss-panel-bg-color);
      box-shadow: var(--content-area-shadow);

      @media (-moz-windows-mica) {
        backdrop-filter: blur(32px);
        background-color: light-dark(rgba(255, 255, 255, 0.6), rgba(0, 0, 0, 0.6));
      }
    }

    toolbarpaletteitem[place="panel"][id^="wrapper-customizableui-special-spring"],
    toolbarspring {
      flex: 10000 1 0 !important;
      min-height: 10px !important;
      max-height: none !important;
      height: 0 !important;
      min-width: 0 !important;
      max-width: none !important;
    }

    .toolbaritem-combined-buttons {
      justify-content: center;
      margin-inline: 0;
    }

    .toolbarbutton-1 {
      padding: 0 12px !important;
      min-height: var(--tab-min-height) !important;
      height: var(--tab-min-height) !important;
      width: calc(var(--tab-min-height) + 24px) !important;
      box-sizing: border-box !important;

      /* Hover: match vertical tabs — icon scales up, bg changes, border becomes white */
      &:not([disabled]):hover > .toolbarbutton-badge-stack > .toolbarbutton-icon {
        padding: var(--toolbarbutton-inner-padding) !important;
      }

      &:not([disabled]):hover > .toolbarbutton-icon {
        padding: var(--toolbarbutton-inner-padding) !important;
      }
    }
  }

  /* Web-panel button hover: bg change + white border (matches vertical tabs) */
  .sb2-main-button:not([disabled]):hover > .toolbarbutton-badge-stack,
  .sb2-main-button:not([disabled]):hover > .toolbarbutton-icon {
    background-color: hsla(240, 2%, 55%, 0.75) !important;
    border: 1px solid hsla(240, 2%, 95%, 0.75) !important;
  }

  #sb2-main[fullscreenShouldAnimate] {
    transition: 0.8s margin-right ease-out, 0.8s margin-left ease-out;
  }

  #sb2-main[shouldAnimate] {
    transition: 0.2s margin-right ease-out, 0.2s margin-left ease-out;
  }

  :root[customizing] {
    #sb2-main {
      min-width: unset !important;
      margin-left: 0px !important;
      margin-right: 0px !important;
    }
  }

  .sb2-main-button {
    position: relative;
    padding: 0;

    .sb2-sound-icon {
      position: relative;
      display: none;
      height: 16px;
      width: 16px;
      top: calc(var(--toolbarbutton-inner-padding) + 2px);
      right: calc(-1 * var(--toolbarbutton-inner-padding) - 2px);
      padding: 2px;
      background-position: center;
      background-repeat: no-repeat;
      border-radius: var(--border-radius-circle);
      background-color: color-mix(in srgb, var(--toolbar-bgcolor) 50%, transparent);
      fill: var(--toolbar-color);

      &[soundplaying] {
        display: flex;
        background-image: url("chrome://browser/skin/tabbrowser/tab-audio-playing-small.svg");
      }

      &[muted] {
        display: flex;
        background-image: url("chrome://browser/skin/tabbrowser/tab-audio-muted-small.svg");
      }

      &[hidden] {
        display: none;
      }
    }

    .sb2-notification-badge {
      display: none;
      position: relative;
      justify-content: center;
      align-items: center;
      width: 16px;
      height: 16px;
      top: calc(-1 * var(--toolbarbutton-inner-padding) - 2px);
      right: calc(-1 * var(--toolbarbutton-inner-padding) - 2px);
      border-radius: var(--border-radius-circle);
      background-color: color-mix(in srgb, var(--toolbar-bgcolor) 50%, transparent);

      &[value] {
        display: flex;
      }

      &[hidden] {
        display: none;
      }

      span {
        color: var(--toolbar-color);
      }
    }
  }

  .sb2-main-button[temporary="true"] > stack.toolbarbutton-badge-stack {
    background-color: var(
      --attention-dot-color,
      var(--button-attention-dot-color, var(--color-accent-attention, AccentColor))
    ) !important;
  }

  .sb2-main-button:not([image]):not([loading]) .toolbarbutton-icon {
    list-style-image: url("chrome://global/skin/icons/security.svg");
  }

  .sb2-main-button[loading] .toolbarbutton-icon {
    list-style-image: url("chrome://global/skin/icons/loading.svg");
  }

  .sb2-main-button[unloaded="true"] {
    .toolbarbutton-icon {
      opacity: var(--toolbarbutton-disabled-opacity);
    }
  }

  #widget-overflow-fixed-list .sb2-main-button {
    padding: var(--panel-menuitem-padding, var(--arrowpanel-menuitem-padding));
  }

  :root:has(#sb2-wrapper[position="left"]) {
    #sb2-main {
      left: 0;
    }

    #sb2-collapse-button {
      list-style-image: url("chrome://secondsidebar/content/icons/sidebar-left.svg");
    }
  }

  :root:has(#sb2-wrapper[position="right"]) {
    #sb2-main {
      right: 0;
    }

    #sb2-collapse-button {
      list-style-image: url("chrome://secondsidebar/content/icons/sidebar-right.svg");
    }
  }

  #browser:has(#sb2-box[hidden="true"]) {
    #sb2-box-area {
      display: contents;
    }
  }

  #browser:has(#sb2-box[pinned="true"]) {
    #sb2-box-area {
      display: contents;
    }
  }

  #browser:has(#sb2-box[pinned="false"]) {
    #sb2-box-area {
      position: absolute;
    }
  }

  #sb2-box {
    background-color: var(--sidebar-background-color);
    color: var(--sidebar-text-color);
    border-radius: var(--border-radius-medium);
    box-shadow: var(--content-area-shadow);
    border: 0.5px solid var(--sidebar-border-color);
    overflow: hidden;
    min-width: 200px;
    min-height: 200px;
    width: 400px;
    height: 100%;
    box-sizing: border-box;

    &[pinned="true"] {
      position: relative;
      top: unset !important;
      left: unset !important;
      right: unset !important;
      bottom: unset !important;
      margin-top: unset !important;
      margin-left: unset !important;
      margin-right: unset !important;
      margin-bottom: unset !important;
      height: 100% !important;

      #sb2-toolbar-title-wrapper {
        cursor: auto !important;
      }
    }

    &[pinned="false"] {
      position: absolute;
      z-index: 20;
    }

    #sb2-toolbar {
      background-color: inherit;
      color: inherit;
      flex-direction: row;
      min-height: var(--tab-min-height);
      height: var(--tab-min-height);
      gap: 4px;
      padding: 1px;
      overflow: scroll;
      -moz-window-dragging: no-drag;

      /* Hover: match vertical tabs — icon scales up, bg changes, border becomes white */
      .sb2-toolbar-button:not([disabled]):hover > .toolbarbutton-icon {
        padding: var(--toolbarbutton-inner-padding) !important;
        background-color: hsla(240, 2%, 55%, 0.75) !important;
        border: 1px solid hsla(240, 2%, 95%, 0.75) !important;
      }

      &[shouldAnimate="true"] {
        transition: 0.2s margin-top ease-out;
      }

      #sb2-toolbar-nav-buttons,
      #sb2-toolbar-sidebar-buttons {
        flex: 0 0 auto;
      }

      #sb2-toolbar-title-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1 1 0;
        overflow: hidden;
        padding: 0 var(--space-medium);
        min-width: 64px;
        cursor: grab;

        #sb2-toolbar-title {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 0;
          cursor: inherit;
        }
      }
    }
  }

  #sb2-after-splitter {
    width: var(--space-small);
  }

  #sb2-geometry-hint {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 4px;
    background-color: var(--sidebar-background-color);
    color: var(--sidebar-text-color);
    border-radius: var(--border-radius-medium);
    box-shadow: var(--content-area-shadow);
    border: 1px solid var(--sidebar-border-color);
    font-size: small;
    font-weight: bold;
  }

  .sb2-resizer {
    position: absolute;
    background-color: transparent;
    z-index: 10;
    transition: background-color 0.5s ease-in-out;

    &:hover {
      background-color: var(--focus-outline-color);
    }
  }

  .sb2-resizer[type="left"],
  .sb2-resizer[type="right"] {
    top: 0;
    width: 4px;
    height: 100%;
    cursor: e-resize;
  }

  .sb2-resizer[type="left"] {
    left: 0;
  }

  .sb2-resizer[type="right"] {
    right: 0;
  }

  .sb2-resizer[type="top"],
  .sb2-resizer[type="bottom"] {
    left: 0;
    width: 100%;
    height: 4px;
    cursor: n-resize;
  }

  .sb2-resizer[type="top"] {
    top: 0;
  }

  .sb2-resizer[type="bottom"] {
    bottom: 0;
  }

  .sb2-resizer[type="topleft"],
  .sb2-resizer[type="topright"],
  .sb2-resizer[type="bottomleft"],
  .sb2-resizer[type="bottomright"] {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
    
  .sb2-resizer[type="topleft"] {
      top: -12px;
      left: -12px;
      cursor: nwse-resize;
  }

  .sb2-resizer[type="topright"] {
      top: -12px;
      right: -12px;
      cursor: nesw-resize;
  }

  .sb2-resizer[type="bottomleft"] {
      bottom: -12px;
      left: -12px;
      cursor: nesw-resize;
  }
          
  .sb2-resizer[type="bottomright"] {
      bottom: -12px;
      right: -12px;
      cursor: nwse-resize;
  }

  #sb2-box[pinned="true"] {
    .sb2-resizer {
      display: none;
    }
  }

  .sb2-web-panels-browser {
    width: 100%;
    height: calc(100% + 1px);
    background-color: var(--toolbar-bgcolor);
    clip-path: inset(-1px 0 round 0 0 var(--border-radius-medium) var(--border-radius-medium));
  }

  .web-panel {
    width: 100%;
    height: calc(100% + 1px);
    background-color: var(--toolbar-bgcolor);
    clip-path: inset(-1px 0 round 0 0 var(--border-radius-medium) var(--border-radius-medium));
  }

  .sb2-popup > panelmultiview {
    display: flex;
    flex-direction: column;
    align-items: unset;
    width: 100%;

    .sb2-popup-header {
      margin-bottom: var(--space-small);
      padding: 0 var(--space-xsmall);

      h1 {
        align-self: center;
        margin: 0;
        padding: var(--space-small);
      }
    }

    .sb2-popup-body {
      padding: 0 var(--space-medium);
      width: 100%;
      overflow-y: scroll;
      gap: var(--space-small);

      .subviewbutton {
        margin: unset;
        padding: var(--space-small) var(--space-medium);
      }

      .sb2-popup-set {
        display: flex;

        .sb2-popup-set-header {
          display: flex;
          margin-block: 0;
          margin-bottom: var(--space-small);
        }

        .sb2-popup-set-body {
          display: flex;
          background-color: var(--toolbar-bgcolor);
          color: var(--toolbar-color);
          border: solid 1px var(--border-color-deemphasized);
          border-radius: var(--border-radius-medium);
          padding: var(--space-small);
          gap: 1px;

          .sb2-popup-group {
            justify-content: space-between;
            align-items: center;
            width: 100%;
            min-height: 24px;
          }

          .sb2-popup-row {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: var(--space-xsmall);
            width: 100%;
            min-height: 24px;
          }

          label {
            font-weight: 500;
            text-wrap: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }

      .sb2-popup-set.sb2-popup-warning {
        .sb2-popup-set-body {
          background-color: var(--background-color-warning);
        }
      }
    }

    .sb2-popup-body.compact {
      padding: 0;
      gap: 0;

      .sb2-popup-set-body {
        padding: 0;
      }

      #sb2-zoom-buttons {
        margin: var(--space-xsmall);
      }

      menuseparator {
        padding-block: 0;
      }

      label.toolbarbutton-text {
        font-weight: normal;
      }
    }

    .sb2-popup-footer {
      justify-content: end;
      margin-top: var(--space-small);
      gap: var(--space-small);
      padding: var(--space-xsmall);
      width: 100%;
    }

    .panel-header {
      align-self: center;
    }

    toolbarseparator {
      width: 100%;
      align-self: center;
    }

    input {
      width: -moz-available;
      box-sizing: border-box;
      height: 32px;
      background-color: var(--toolbar-field-background-color);
      color: var(--toolbar-field-color);
      border: solid 1px var(--toolbar-field-border-color);
      outline: unset;

      &[error="true"] {
        background-color: var(--background-color-critical) !important;
      }
    }

    input:focus-visible {
      background-color: var(
        --toolbar-field-background-color-focus,
        var(--toolbar-field-focus-background-color, var(--toolbar-field-background-color))
      );
      color: var(
        --toolbar-field-text-color-focus,
        var(--toolbar-field-focus-color, var(--toolbar-field-color, var(--toolbar-field-text-color)))
      );
      border: solid 1px
        var(
          --toolbar-field-border-color-focus,
          var(--toolbar-field-focus-border-color, var(--toolbar-field-border-color))
        );
    }

    .sb2-button-iconic .toolbarbutton-text {
      display: none;
    }

    .sb2-popup-menu-list {
      margin-top: 0px;
      margin-bottom: 0px;
    }
  }

  #sb2-main-popup-settings-backdrop,
  #sb2-web-panel-edit-backdrop {
    position: fixed;
    inset: 0;
    z-index: 2147483646;
    background: transparent;

    &[hidden] {
      display: none;
    }
  }

  .sb2-popup > panelmultiview:has(> .sb2-popup-discard-confirmation) {
    position: relative;
    overflow: hidden;

    > .sb2-popup-discard-confirmation {
      position: absolute;
      inset: 0;
      z-index: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: stretch;
      box-sizing: border-box;
      padding: var(--space-medium);
      background-color: rgb(0 0 0 / 42%);

      &[hidden] {
        display: none;
      }

      .sb2-popup-discard-confirmation-card {
        display: flex;
        flex-direction: column;
        padding: var(--space-medium);
        gap: var(--space-small);
        color: var(--arrowpanel-color, CanvasText);
        background-color: var(--arrowpanel-background, Canvas);
        border: solid 1px
          var(--arrowpanel-border-color, var(--border-color-deemphasized));
        border-radius: var(--border-radius-medium);
        box-shadow: 0 8px 24px rgb(0 0 0 / 35%);
      }

      .sb2-popup-discard-confirmation-title {
        display: flex;
        align-items: center;
        gap: var(--space-xsmall);
      }

      .sb2-popup-discard-confirmation-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: none;
        box-sizing: border-box;
        margin: 0;
        width: 18px;
        height: 18px;
        color: var(--text-color-deemphasized);
        border: solid 1px currentColor;
        border-radius: 50%;
        font-weight: bold;
      }

      .sb2-popup-discard-confirmation-heading {
        margin: 0;
        font-weight: 600;
      }

      .sb2-popup-discard-confirmation-description {
        margin: 0 0 0 calc(18px + var(--space-xsmall));
        color: var(--text-color-deemphasized);
        text-wrap: wrap;
      }

      .sb2-popup-discard-confirmation-card > .sb2-popup-footer {
        margin: 0;
        padding: 0;
      }
    }
  }

  .sb2-tooltip {
    width: 300px;

    .sb2-tooltip-container {
      display: flex;
      flex-direction: column;
      padding: var(--space-small);
    }
  }

  #sb2-web-panel-tooltip {
    #sb2-web-panel-tooltip-title {
      overflow: hidden;
      font-weight: bold;
      -webkit-line-clamp: 2;
    }

    #sb2-web-panel-tooltip-url {
      color: var(--text-color-deemphasized);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  #sb2-main-popup-settings,
  #sb2-web-panel-new,
  #sb2-web-panel-edit {
    width: 400px;
  }

  #sb2-web-panel-delete {
    width: 300px;

    label {
      text-wrap: wrap;
    }
  }

  #sb2-zoom-buttons {
    justify-content: center;

    #sb2-zoom-button > .toolbarbutton-text {
      min-width: calc(4ch + 8px);
      text-align: center;
    }
  }

  .sb2-popup-body:has(#sb2-popup-dynamic-title-toggle[pressed]) {
    #sb2-popup-title-items {
      display: none;
    }
  }

  .sb2-popup-body:has(#sb2-popup-dynamic-favicon-toggle[pressed]) {
    #sb2-popup-favicon-items {
      display: none;
    }
  }

  .sb2-popup-body:has(#sb2-popup-css-selector-toggle:not([pressed])) {
    #sb2-popup-css-selector-items {
      display: none;
    }
  }

  .sb2-popup-body:has(#sb2-popup-pin-type-menu-list[value="true"]) {
    #sb2-popup-floating-items {
      display: none;
    }
  }

  .sb2-popup-body:has(#sb2-popup-shortcut-toggle:not([pressed])) {
    #sb2-popup-shortcut-items {
      display: none;
    }
  }

  .sb2-popup:has(#sb2-main-popup-settings-tooltip-menu-list[value="off"]),
  .sb2-popup:has(#sb2-main-popup-settings-tooltip-menu-list[value="title"]) {
    #sb2-main-popup-settings-tooltip-items {
      display: none;
    }
  }

  .sb2-popup:has(#sb2-main-popup-settings-auto-hide-sidebar-toggle:not([pressed])) {
    #sb2-main-popup-settings-auto-hide-sidebar-items {
      display: none;
    }
  }

  .sb2-popup:has(#sb2-main-popup-settings-auto-hide-sidebar-toggle[pressed]) {
    #sb2-main-popup-settings-sidebar-widget-items {
      display: none;
    }
  }

  menuitem[label="Reset Zoom [100%]"] {
    display: none;
  }

  .sb2-container {
    box-shadow: var(--sb2-container-borders-part) var(--sb2-container-color-part) inset;
  }

  #widget-overflow-fixed-list, #customization-palette {
    .sb2-container {
      padding: var(--sb2-container-padding);
      border-radius: var(--toolbarbutton-border-radius);
      box-sizing: content-box;
    }
  }

  #customization-container {
    position: absolute;
    z-index: 2147483647;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    #customization-panel-container {
      flex: unset;
      .panel-arrow {
        display: none;
      }
    }

    toolbarpaletteitem::after {
      overflow-x: scroll;
      text-overflow: ellipsis;
    }
  }
`;
