import { Label } from "./base/elements.mjs";
import { PopupPanel } from "./popup_panel.mjs";
import { WebPanelController } from "../controllers/web_panel.mjs"; // eslint-disable-line no-unused-vars
import { onLeftClick } from "../utils/buttons.mjs";
import {
  createCancelButton,
  createDeleteButton,
  createPopupSet,
} from "../utils/xul.mjs";

export class WebPanelPopupDelete extends PopupPanel {
  constructor() {
    super({
      id: "sb2-web-panel-delete",
      classList: ["sb2-popup-with-header"],
    });

    this.deleteButton = createDeleteButton();
    this.cancelButton = createCancelButton();

    this.compose({
      role: "group",
      title: "Delete Web Panel",
      body: [
        createPopupSet(
          null,
          [new Label().setText("Are you sure? This action cannot be undone.")],
          { classList: ["sb2-popup-warning"] },
        ),
      ],
      footer: [this.cancelButton, this.deleteButton],
    });
  }

  /**
   *
   * @param {function(string):void} callback
   * @returns {WebPanelPopupDelete}
   */
  listenDeleteButtonClick(callback) {
    onLeftClick(this.deleteButton, () => {
      callback(this.uuid);
    });
  }

  /**
   *
   * @param {function():void} callback
   * @returns {WebPanelPopupDelete}
   */
  listenCancelButtonClick(callback) {
    onLeftClick(this.cancelButton, () => {
      callback();
    });
  }

  /**
   *
   * @param {WebPanelController} webPanelController
   */
  openPopup(webPanelController) {
    this.uuid = webPanelController.getUUID();

    this.restoreWebPanelButtonState = (event) => {
      if (event.target.id !== this.id) {
        return;
      }
      webPanelController.button.setOpen(webPanelController.isActive());
      this.removeEventListener("popuphidden", this.restoreWebPanelButtonState);
    };
    this.addEventListener("popuphidden", this.restoreWebPanelButtonState);

    super.openPopup(webPanelController.button);
  }
}
