// Creates a Button for about:config access
// UC.aboutConfigPage = {
//   // config
//   showVersion: true,
//   showHidden: false,
//   showDisabled: true,
//   enabledFirst: true,
//   blackListArray: [],
//   init: function () {
//     if (location != "chrome://browser/content/browser.xul") return;

//     try {
//       CustomizableUI.createWidget({
//         id: "aboutconfig-ToolBarButton",
//         label: "Advanced Preferences",

//         type: "custom",
//         defaultArea: CustomizableUI.AREA_NAVBAR,
//         onBuild: function (aDocument) {
//           var toolbaritem = aDocument.createElementNS(
//             "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",
//             "toolbarbutton"
//           );
//           var props = {
//             id: "aboutconfig-ToolBarButton",
//             class: "toolbarbutton-1 chromeclass-toolbar-additional",
//             label: "About:Config",
//             tooltiptext: "About:Config",
//             style:
//               "list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACkUlEQVQ4ja2SX0hTcRTHv27euz/qLvfqdtO8lRmEoLm2RTTUmWHFtlgYIlFPleNuI5cggYTJpDGIVnP+CaVQ3FtCkYQvPfYSprewxCZCUYwgUKIeHIidHvSKiPrUef2ez/ec3/l9gf9VoijmhcPhq7FYbKizszNSUVFRvFOfATggsqgEUA5AtynYbDb78PDwfCaToaWlJUokEk8A6LfxZfHThsG3rcKk38reA3Bwq8hJktQSiUSmstksLS8vr9XX11/cokv3bRih0fI1Shyi+euGNMfAAQCMw+E4KoriSQD5jY2NiUwmQ0REsiz3qnDMhhEaMBNN24nuFtH4GShGwA4AOo/Hc01RFOrq6nqZTCa/K4pCCwtpejqammIY5kTMiiHqK1yjaTtRTwk9d2sWLDoEAZgAACzLVvb393+amZmh2dlZGhsbo0g0Sg/jiWz0WO7HvwlhVYVfuDWLJgZBAGYAOer7dDqd7qzX632dSqXoZlvbvBzu+BFv2E+rj0ykwuPnMcczCAEQdvohlud5r8fjeceybDOg9QdrKn/+8YMouo8mzmmpLI95ACB/jzSgiGGY4wDMDoejnYio54p35VldLk1UW+mWif/WUlratJcBALBOpzNAROSX5UkA0RqN/utEtZXSPh/Fef53myR1ANDuBBe6XK4gEVEgEHgFoA5AIQe0tHPc5w+1tZT2+aiX4+h2SUkfAIMKakRRbKCNktcnuwGwG7oxH2jqtli+vKmqotaCgulujlu5xPNu1UAbCoVGVQNBEG4A4LZtZ+CBy3fM5sUBSfrl57j3xRtBAgCjy+UaTCaTcxaLpQfA4V3uUyBotc2n9PrHPHABgHHTHUA1ACeAI7sdSB2G9RwYAeT8A0L0/bjRXZQXAAAAAElFTkSuQmCC)",
//             onclick:
//               'if (event.button == 0) { \
// 										openTrustedLinkIn("about:config", "tab");\
// 								 }; '
//           };
//           for (var p in props) toolbaritem.setAttribute(p, props[p]);
//           return toolbaritem;
//         }
//       });
//     } catch (e) {}
//   }
// };
// UC.aboutConfigPage.init();
// ==UserScript==
// @name            Extension Options Menu
// @author          xiaoxiaoflood
// @include         main
// @shutdown        UC.aboutConfigPage.destroy();
// @onlyonce
// ==/UserScript==

// inspired by https://addons.mozilla.org/en-US/firefox/addon/extension-options-menu/

UC.aboutConfigPage = {
  // config
  showVersion: true,
  showHidden: false,
  showDisabled: true,
  enabledFirst: true,
  blackListArray: [],

  init: function () {
    CustomizableUI.createWidget({
      id: "eom-button",
      type: "custom",
      defaultArea: CustomizableUI.AREA_NAVBAR,
      onBuild: function (doc) {
        let btn = _uc.createElement(doc, "toolbarbutton", {
          id: "eom-button",
          label: "Advanced Preferences",
          tooltiptext: "Advanced Preferences Page",
          class: "toolbarbutton-1 chromeclass-toolbar-additional",
          image:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACkUlEQVQ4ja2SX0hTcRTHv27euz/qLvfqdtO8lRmEoLm2RTTUmWHFtlgYIlFPleNuI5cggYTJpDGIVnP+CaVQ3FtCkYQvPfYSprewxCZCUYwgUKIeHIidHvSKiPrUef2ez/ec3/l9gf9VoijmhcPhq7FYbKizszNSUVFRvFOfATggsqgEUA5AtynYbDb78PDwfCaToaWlJUokEk8A6LfxZfHThsG3rcKk38reA3Bwq8hJktQSiUSmstksLS8vr9XX11/cokv3bRih0fI1Shyi+euGNMfAAQCMw+E4KoriSQD5jY2NiUwmQ0REsiz3qnDMhhEaMBNN24nuFtH4GShGwA4AOo/Hc01RFOrq6nqZTCa/K4pCCwtpejqammIY5kTMiiHqK1yjaTtRTwk9d2sWLDoEAZgAACzLVvb393+amZmh2dlZGhsbo0g0Sg/jiWz0WO7HvwlhVYVfuDWLJgZBAGYAOer7dDqd7qzX632dSqXoZlvbvBzu+BFv2E+rj0ykwuPnMcczCAEQdvohlud5r8fjeceybDOg9QdrKn/+8YMouo8mzmmpLI95ACB/jzSgiGGY4wDMDoejnYio54p35VldLk1UW+mWif/WUlratJcBALBOpzNAROSX5UkA0RqN/utEtZXSPh/Fef53myR1ANDuBBe6XK4gEVEgEHgFoA5AIQe0tHPc5w+1tZT2+aiX4+h2SUkfAIMKakRRbKCNktcnuwGwG7oxH2jqtli+vKmqotaCgulujlu5xPNu1UAbCoVGVQNBEG4A4LZtZ+CBy3fM5sUBSfrl57j3xRtBAgCjy+UaTCaTcxaLpQfA4V3uUyBotc2n9PrHPHABgHHTHUA1ACeAI7sdSB2G9RwYAeT8A0L0/bjRXZQXAAAAAElFTkSuQmCC",
          onclick:
            'if (event.button == 0) { openTrustedLinkIn("about:config", "tab"); }; '
        });

        return btn;
      }
    });

    this.setStyle();
    _uc.sss.loadAndRegisterSheet(this.STYLE.url, this.STYLE.type);
  },

  iconURL:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABaUlEQVQ4y6WTW0sCQRiG/SEpVBDUVVfphbAEhWAlqYhrLWUlER2IIgrqYkEp6SBmudWiFf0SiSCwpAI7bJnprq6H/sTbGhJiEyt28fAN7zfz8DHDaABo/oPqBpovX7j4T1gOS6dNCcYiZbhOSrCHi2hugqNCwskVYNmXbxoSuPkCN3NWhCdahLLGKCfDcSBjOJiHeTeHPr8EyifCwGb9RMF0RIaHl+E+zoMJ5+AM5WALSBjaEWHayqLXm4GR/YB+Iw2iYIKTMB6WwIRE0EER9r0s+r1pGNZT6F55ReeigPb5F7TOPpMFTDCDkUAGA753GFYFdC08QedJEvkR2DbfzuntFBz+1K2ZFdCz9Ii2qQfo3Pck2MoZpVI/AqtXQAXjchIdk3fQMok/Ib6CaS0Z1c8pdlc8pqXjUOF7AqVSxDvQOq7RKERBi/UKdbDVnK3vkQWWS9Si1vstGIyxCqiBquZUXc429BfU+AL9Tqy8Q2Za8AAAAABJRU5ErkJggg==",

  setStyle: function () {
    this.STYLE = {
      url: Services.io.newURI(
        "data:text/css;charset=UTF-8," +
          encodeURIComponent(`
        @-moz-document url('${_uc.BROWSERCHROME}') {
          .enabling label:after { content: "+" !important; }
          .disabling label:after { content: "-" !important; }
          .uninstalling label:after { content: '!' !important; }
          .noOptions { color: gray; }
          .disabled { color: gray; font-style: italic; }
        }
      `)
      ),
      type: _uc.sss.USER_SHEET
    };
  },

  destroy: function () {
    CustomizableUI.destroyWidget("eom-button");
    _uc.sss.unregisterSheet(this.STYLE.url, this.STYLE.type);
    delete UC.aboutConfigPage;
  }
};

UC.aboutConfigPage.init();
