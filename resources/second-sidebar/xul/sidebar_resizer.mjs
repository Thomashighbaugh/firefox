import { Div } from "./base/elements.mjs";

export class SidebarResizer extends Div {
  constructor(type) {
    super({ classList: ["sb2-resizer"] });
    this.setAttribute("type", type);
  }
}
