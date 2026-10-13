import { Browser } from "./base/browser.mjs";

const MOBILE_USER_AGENT =
  "Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.2 Chrome/87.0.4280.141 Mobile Safari/537.36";

export class WebPanelBrowser extends Browser {
  constructor(element) {
    super({ element });
  }

  setMobileUserAgent() {
    return this.setCustomUserAgent(MOBILE_USER_AGENT);
  }

  unsetMobileUserAgent() {
    return this.setCustomUserAgent("");
  }
}
