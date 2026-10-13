import { VBox } from "./base/elements.mjs";

export class Sidebar extends VBox {
  constructor() {
    super({ id: "sb2" });
    this.setPosition("right");
  }

  setPosition(position) {
    return this.setAttribute("position", position);
  }

  getPosition() {
    return this.getAttribute("position");
  }

  pin() {
    return this.setAttribute("pinned", "true");
  }

  unpin() {
    return this.setAttribute("pinned", "false");
  }

  pinned() {
    return this.getAttribute("pinned") === "true";
  }
}
