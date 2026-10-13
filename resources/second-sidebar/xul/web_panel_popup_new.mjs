import { ScriptSecurityManagerWrapper } from "../wrappers/services.mjs";
import { Toggle, ToolbarSeparator } from "./base/elements.mjs";
import { onLeftClick } from "../utils/buttons.mjs";
import { PopupPanel } from "./popup_panel.mjs";
import {
  applyContainerColor,
  fillContainerMenuList,
} from "../utils/containers.mjs";
import {
  createCancelButton,
  createCreateButton,
  createInput,
  createMenuList,
  createPopupGroup,
  createPopupRow,
  createPopupSet,
} from "../utils/xul.mjs";

export class WebPanelPopupNew extends PopupPanel {
  constructor() {
    super({
      id: "sb2-web-panel-new",
      classList: ["sb2-popup-with-header"],
    });

    this.input = createInput({ placeholder: "Web page URL" });
    this.containerMenuList = createMenuList({ id: "sb2-container-menu-list" });
    this.temporaryToggle = new Toggle();

    this.saveButton = createCreateButton();
    this.cancelButton = createCancelButton();

    this.compose({
      role: "group",
      title: "New Web Panel",
      body: [
        createPopupSet("", [
          createPopupRow(this.input),
          new ToolbarSeparator(),
          createPopupGroup("Multi-Account Container", this.containerMenuList),
          new ToolbarSeparator(),
          createPopupGroup("Temporary", this.temporaryToggle),
        ]),
      ],
      footer: [this.cancelButton, this.saveButton],
    });

    this.addEventListener("popupshown", () => {
      this.input.focus();
    });
  }

  /**
   *
   * @param {function(string):void} callback
   * @returns {WebPanelPopupNew}
   */
  listenSaveButtonClick(callback) {
    this.input.addEventListener("keyup", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (event.key === "Enter" || event.keyCode === 13) {
        callback(
          this.input.getValue(),
          this.containerMenuList.getValue(),
          this.temporaryToggle.getPressed(),
        );
      }
    });
    onLeftClick(
      this.saveButton,
      () => {
        callback(
          this.input.getValue(),
          this.containerMenuList.getValue(),
          this.temporaryToggle.getPressed(),
        );
      },
      { preventDefault: true, stopPropagation: true },
    );
  }

  /**
   *
   * @param {function(string):void} callback
   * @returns {WebPanelPopupNew}
   */
  listenCancelButtonClick(callback) {
    onLeftClick(this.cancelButton, () => {
      callback(this.input.getValue());
    });
  }

  /**
   *
   * @param {XULElement | Widget} target
   * @param {string} suggest
   * @returns {WebPanelPopupNew}
   */
  openPopup(target, suggest) {
    this.input.setValue(suggest);

    fillContainerMenuList(this.containerMenuList);
    this.containerMenuList.setValue(
      ScriptSecurityManagerWrapper.DEFAULT_USER_CONTEXT_ID,
    );
    applyContainerColor(
      ScriptSecurityManagerWrapper.DEFAULT_USER_CONTEXT_ID,
      this.containerMenuList.getXUL(),
    );

    this.temporaryToggle.setPressed(false);

    return super.openPopup(target);
  }
}
