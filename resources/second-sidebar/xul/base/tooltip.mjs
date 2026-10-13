import { Div } from "./elements.mjs";
import { Panel } from "./panel.mjs";

export class Tooltip extends Panel {
  /**
   *
   * @param {object} params
   * @param {string?} params.id
   * @param {Array<string>} params.classList
   */
  constructor({ id = null, classList = [] } = {}) {
    super({
      id,
      classList: ["sb2-tooltip", ...classList],
    });
    this.setType("arrow").setRole("tooltip").setAttributes({
      orient: "vertical",
      "no-open-on-anchor": "true",
      noautofocus: "true",
      norolluponanchor: "true",
      consumeoutsideclicks: "false",
      animate: "open",
    });

    this.container = new Div({
      classList: ["sb2-tooltip-container"],
    });
    this.appendChild(this.container);
  }

  appendItem(item) {
    this.container.appendChild(item);
    return this;
  }

  appendItems(...items) {
    items.forEach((item) => this.appendItem(item));
    return this;
  }
}
