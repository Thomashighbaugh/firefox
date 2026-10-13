import { MenuItem } from "./base/elements.mjs";
import { ellipsis } from "../utils/string.mjs";

export class SearchInWebPanelMenuItem extends MenuItem {
  constructor() {
    super({ id: "context-searchinwebpanel" });
  }

  setSearchQuery(query) {
    this.setLabel(`Search "${ellipsis(query, 18)}" in Second Sidebar`);
    return this;
  }
}
