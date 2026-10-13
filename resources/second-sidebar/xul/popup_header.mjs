import { Header, ToolbarSeparator, VBox } from "./base/elements.mjs";

export class PopupHeader extends VBox {
  constructor(text) {
    super({ classList: ["sb2-popup-header"] });
    this.appendChildren(new Header(1).setText(text), new ToolbarSeparator());
  }
}
