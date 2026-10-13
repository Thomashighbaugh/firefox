import { Image } from "./base/elements.mjs";

export class WebPanelSoundIcon extends Image {
  constructor() {
    super({ classList: ["sb2-sound-icon"] });
  }

  setSoundPlaying(value) {
    return this.toggleAttribute("soundplaying", value);
  }

  setMuted(value) {
    return this.toggleAttribute("muted", value);
  }
}
