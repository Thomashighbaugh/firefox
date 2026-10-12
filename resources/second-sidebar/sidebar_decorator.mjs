import { SECOND_SIDEBAR_CSS } from "./css/second_sidebar.mjs";
import { SidebarControllers } from "./sidebar_controllers.mjs";

export class SidebarDecorator {
  static decorate() {
    const style = document.createElement("style");
    style.innerHTML = SECOND_SIDEBAR_CSS;
    document.querySelector("head").appendChild(style);
    this.#collapse();
  }

  static #collapse() {
    if (SidebarControllers.sidebarController.autoHideSidebar) {
      SidebarControllers.sidebarMainCollapser.collapse({
        animate: false,
        fullScreenAnimate: true,
        delay: 100,
      });
    }
  }
}
