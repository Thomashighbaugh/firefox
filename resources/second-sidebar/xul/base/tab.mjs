import { Browser } from "./browser.mjs";
import { XULElement } from "./xul_element.mjs";

export class Tab extends XULElement {
  constructor({ id = null, classList = [], element } = {}) {
    super({ tag: "tab", id, classList, element });
  }

  get linkedBrowser() {
    return new Browser({ element: this.element.linkedBrowser });
  }

  get selected() {
    return this.element.selected ?? false;
  }

  get soundPlaying() {
    return this.element.soundPlaying;
  }

  get muted() {
    return this.element.muted;
  }

  get image() {
    return this.element.image;
  }

  toggleMuteAudio() {
    this.element.toggleMuteAudio();
    return this;
  }
}
