import { Div } from "./base/elements.mjs";

export class SidebarWrapper extends Div {
  constructor() {
    super({ id: "sb2-wrapper" });
  }

  setPosition(position) {
    return this.setAttribute("position", position);
  }

  getPosition() {
    return this.getAttribute("position");
  }
}
