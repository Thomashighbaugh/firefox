import { MenuItem } from "./base/elements.mjs";

export class OpenLinkInSidebarMenuItem extends MenuItem {
  constructor() {
    super({ id: "context-openlinkinsidebar" });
    this.setLabel("Open Link in Second Sidebar");
  }
}
