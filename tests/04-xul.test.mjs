// 04 — every XUL/HTML tag the theme creates is a known tag.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { listFiles, rel, REPO, parseElementTags } from "./lib/scan.mjs";

// Known XUL elements + HTML elements + custom elements the theme uses.
const XUL = [
  "box", "hbox", "vbox", "stack", "deck", "grid", "columns", "column", "rows", "row",
  "toolbar", "toolbox", "toolbarbutton", "toolbarseparator", "toolbarspacer", "toolbarspring",
  "toolbaritem", "toolbarpaletteitem", "menubar", "menu", "menuitem", "menupopup", "menuseparator",
  "panel", "panelmultiview", "popup", "popupset", "splitter", "spacer", "label", "image",
  "description", "button", "checkbox", "radiogroup", "radio", "textbox", "input", "menulist",
  "menuitem", "richlistbox", "richlistitem", "tree", "browser", "tab", "tabs", "tabbox", "tabpanel",
  "tabpanels", "tooltip", "statusbar", "statusbarpanel", "resizer", "scrollbox", "arrowscrollbox",
  "key", "keyset", "command", "stringbundle", "iframe", "notificationbox", "window", "groupbox",
  "caption", "separator", "colorpicker", "datepicker", "timepicker", "scale", "progressmeter",
  "progress", "listbox", "listitem", "listcell", "listcol", "listcols", "listhead", "listheader",
];
const HTML = [
  "div", "span", "a", "img", "canvas", "style", "link", "input", "button", "template", "p",
  "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "section", "header", "footer", "nav",
  "main", "aside", "hr", "br", "strong", "em", "code", "pre", "video", "audio",
  "table", "thead", "tbody", "tr", "td", "th", "select", "option", "textarea", "label", "svg", "path",
];
const CUSTOM = [
  "moz-toggle", "moz-button", "moz-checkbox", "moz-input-search", "moz-message-bar", "moz-support-link",
  "message-bar-stack", "panel-list", "search-addons", "addon-card", "addon-list", "theme-preview",
  "customizableui-special-spring", "toolbarspring", "moz-visual-picker", "moz-visual-picker-item",
];
const KNOWN = new Set([...XUL, ...HTML, ...CUSTOM]);

const files = listFiles(`${REPO}/resources`, [".mjs"]).concat(listFiles(`${REPO}/JS`, [".js", ".mjs"]));

test("every created element tag is known", () => {
  const unknown = new Map();
  let count = 0;
  for (const f of files) {
    for (const tag of parseElementTags(fs.readFileSync(f, "utf8"))) {
      count++;
      if (!KNOWN.has(tag)) unknown.set(tag, rel(f));
    }
  }
  assert.ok(count > 20, `only found ${count} element creations`);
  assert.deepEqual(
    [...unknown.entries()].map(([t, f]) => `${t} (in ${f})`),
    [],
    `unknown tags:\n${[...unknown.entries()].map(([t, f]) => `  ${t} in ${f}`).join("\n")}`,
  );
});
