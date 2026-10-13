import { PanelMultiView } from "./base/elements.mjs";
import { Panel } from "./base/panel.mjs";
import { PopupBody } from "./popup_body.mjs";
import { PopupFooter } from "./popup_footer.mjs";
import { PopupHeader } from "./popup_header.mjs";

/**
 * Shared scaffold for the sidebar's `sb2-popup` panels.
 *
 * Subclasses build their child elements, then call `compose(...)` to assemble
 * the standard `PanelMultiView > (PopupHeader) + PopupBody + (PopupFooter)`
 * structure. This replaces the hand-rolled assembly that was duplicated across
 * every popup.
 */
export class PopupPanel extends Panel {
  constructor({ id = null, classList = [] } = {}) {
    super({ id, classList: ["sb2-popup", ...classList] });
    this.setType("arrow");
  }

  /**
   * Assemble the popup body/footer (and optional header).
   * @param {object} params
   * @param {string?} params.role
   * @param {string?} params.title          adds a PopupHeader when set
   * @param {boolean} params.compact
   * @param {XULElement[]} params.body
   * @param {XULElement[]} params.footer
   * @param {XULElement[]} params.trailing  extra children appended after the footer
   * @returns {PopupPanel}
   */
  compose({
    role = null,
    title = null,
    compact = false,
    body = [],
    footer = [],
    trailing = [],
  } = {}) {
    if (role !== null) {
      this.setRole(role);
    }
    const bodyElement = new PopupBody({ compact }).appendChildren(...body);
    const footerElement = footer.length
      ? new PopupFooter().appendChildren(...footer)
      : null;
    this.appendChild(
      new PanelMultiView().appendChildren(
        ...(title !== null ? [new PopupHeader(title)] : []),
        bodyElement,
        ...(footerElement ? [footerElement] : []),
        ...trailing,
      ),
    );
    return this;
  }
}
