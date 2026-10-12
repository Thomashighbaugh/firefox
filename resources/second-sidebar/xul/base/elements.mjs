// Consolidated base element wrappers.
//
// The trivial per-tag wrappers that used to live in their own files
// (box.mjs, div.mjs, vbox.mjs, label.mjs, …) are generated here from a tag
// descriptor. Behaviour-bearing wrappers stay in their own modules and are
// imported directly where needed:
//   Widget, ToolbarButton, Browser, Panel, Tab, Input, MenuList, Tooltip.
//
// Generic setters (setText, setSrc, setLabel, setType, setMode, setDisabled,
// getPressed/setPressed, isPanelOpen, …) now live on XULElement.
import { XULElement } from "./xul_element.mjs";

/**
 * Build a thin wrapper class for a XUL/HTML tag.
 * @param {string} tag
 * @param {{isXUL?: boolean, init?: (el: XULElement) => void}} [opts]
 * @returns {typeof XULElement}
 */
export function defineElement(tag, { isXUL = true, init = null } = {}) {
  return class extends XULElement {
    constructor(params = {}) {
      super({ tag, isXUL, ...params });
      if (init) {
        init(this);
      }
    }
  };
}

export const Box = defineElement("box");
export const VBox = defineElement("vbox");
export const HBox = defineElement("hbox");
export const Div = defineElement("div", { isXUL: false });
export const Span = defineElement("span", { isXUL: false });
export const Label = defineElement("label");
export const Button = defineElement("button", { isXUL: false });
export const Image = defineElement("image");
export const Img = defineElement("img", { isXUL: false });
export const Menu = defineElement("menu");
export const MenuItem = defineElement("menuitem");
export const MenuSeparator = defineElement("menuseparator");
export const PanelMultiView = defineElement("panelmultiview");
export const Splitter = defineElement("splitter");
export const Toolbar = defineElement("toolbar");
export const ToolbarSeparator = defineElement("toolbarseparator");
export const Toggle = defineElement("moz-toggle", { isXUL: false });
export const MozButton = defineElement("moz-button", { isXUL: false });
export const MenuPopup = defineElement("menupopup", {
  init(el) {
    el.setAttribute("consumeoutsideclicks", false);
    el.addEventListener("popupshowing", () =>
      el.toggleAttribute("panelopen", true),
    );
    el.addEventListener("popuphiding", () =>
      el.toggleAttribute("panelopen", false),
    );
  },
});

/** Non-standard `(level, params)` signature — kept explicit. */
export class Header extends XULElement {
  constructor(level, { id = null, classList = [] } = {}) {
    super({ tag: `h${level}`, id, classList, isXUL: false });
  }
}

/** Non-standard `(css)` signature — kept explicit. */
export class Style extends XULElement {
  constructor(style) {
    super({ tag: "style", isXUL: false });
    this.setInnerText(style);
  }
}
