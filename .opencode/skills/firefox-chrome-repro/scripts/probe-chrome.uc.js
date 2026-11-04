// ==UserScript==
// @name           chrome probe (repro harness)
// @include        main
// ==/UserScript==

/**
 * Chrome-context probe template for the repro harness.
 *
 * Installed by `repro.sh probe` as chrome/JS/zzz_probe.uc.js. Results land in
 * /tmp/opencode/probe.txt as `key=value` lines. Retarget by editing SNAPSHOT()
 * and the wrap() calls at the bottom — everything else is boilerplate.
 *
 * Do NOT copy this file into JS/ of the repo: fx-autoconfig loads every script
 * there into the user's live browser.
 */
(function () {
  "use strict";

  const OUT = "/tmp/opencode/probe.txt";
  const DELAY_MS = 4000;

  // --- file output -------------------------------------------------------
  // IOUtils is not importable from a chrome window on Fx 158; nsIFileOutputStream
  // append flags are WRITE(0x02)|CREATE(0x08)|APPEND(0x10).
  function w(line) {
    try {
      const file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsIFile);
      file.initWithPath(OUT);
      const fos = Cc["@mozilla.org/network/file-output-stream;1"].createInstance(
        Ci.nsIFileOutputStream,
      );
      fos.init(file, 0x02 | 0x08 | 0x10, 0o644, 0);
      const cos = Cc["@mozilla.org/intl/converter-output-stream;1"].createInstance(
        Ci.nsIConverterOutputStream,
      );
      cos.init(fos, "UTF-8");
      cos.writeString(line + "\n");
      cos.close();
    } catch (e) {
      console.error("probe write failed: " + e);
    }
  }

  function wrap(obj, name, tag) {
    if (!obj || typeof obj[name] !== "function") {
      w(`wrap-failed=${tag}`);
      return;
    }
    const orig = obj[name];
    obj[name] = function (...args) {
      w(`CALLED=${tag}`);
      try {
        return orig.apply(this, args);
      } catch (e) {
        w(`THREW=${tag}: ${e}`);
        throw e;
      }
    };
  }

  // --- snapshot ----------------------------------------------------------
  // Worked example: the downloads button on a custom toolbar.
  function snapshot() {
    const btn = document.getElementById("downloads-button");
    w(`button=${!!btn}`);
    if (!btn) return;

    w(`parent=${btn.parentNode.localName}#${btn.parentNode.id}`);
    const r = btn.getBoundingClientRect();
    w(`rect=${[r.x, r.y, r.width, r.height].join(",")}`);
    w(`parent-visible=${isElementVisible(btn.parentNode)}`);
    w(`onclick=${btn.onclick}`);
    w(`oncommand-attr=${btn.getAttribute("oncommand")}`);

    const widget = CustomizableUI.getWidget("downloads-button");
    w(`widget.type=${widget.type} areaType=${widget.areaType} area=${widget.currentArea}`);
    w(`widget-registered-areas=${Object.keys(CustomizableUI.areas).join("|")}`);

    const dv = window.DownloadsIndicatorView;
    w(`indicator=${!!(dv && dv.indicator)}`);
    w(`badgeStack=${!!(dv && dv.indicator && dv.indicator.badgeStack)}`);
    w(`has-DownloadsButton.onCommand=${typeof window.DownloadsButton?.onCommand}`);

    const panel = document.getElementById("downloadsPanel");
    w(`panel=${!!panel} hidden=${panel?.hidden} state=${panel?.state}`);

    let anchor = null;
    try {
      anchor = window.DownloadsButton?.getAnchor?.() ?? null;
    } catch (e) {
      w(`getAnchor-threw=${e}`);
    }
    w(`anchor=${anchor ? `${anchor.localName}#${anchor.id}` : String(anchor)}`);
  }

  async function probe() {
    w(`=== probe ${new Date().toISOString()}`);

    // 1. Observe the unharmed state.
    snapshot();

    // 2. Instrument the suspects.
    wrap(window.DownloadsPanel, "showPanel", "DownloadsPanel.showPanel");
    wrap(window.DownloadsButton, "onCommand", "DownloadsButton.onCommand");
    window.addEventListener(
      "click",
      (e) => w(`click-capture=${e.target.localName}#${e.target.id} defaultPrevented=${e.defaultPrevented}`),
      true,
    );

    // 3. Drive the code path directly. Comment out when you want a pure click test.
    try {
      window.DownloadsPanel.showPanel(true);
    } catch (e) {
      w(`showPanel-threw=${e}\n${e.stack}`);
    }
    await new Promise((res) => setTimeout(res, 2000));
    w(`after.isPanelShowing=${window.DownloadsPanel.isPanelShowing}`);
    w(`after.state=${panelState()}`);
    w(`=== done`);
  }

  function panelState() {
    const p = document.getElementById("downloadsPanel");
    if (!p) return "no-panel";
    const r = p.getBoundingClientRect();
    return `state=${p.state} hidden=${p.hidden} rect=${[r.x, r.y, r.width, r.height].join(",")}`;
  }

  setTimeout(probe, DELAY_MS);
})();
