// ==UserScript==
// @name           PDF Tools (userChrome.js)
// @version        2.0.0
// @description    Adds a "download each page as an image" tool to the pdf.js viewer.
// @author         Thomas Leon Highbaugh (rewritten for fx-autoconfig / Firefox 157), adapted from a userscript by jerone
// @include        resource://pdf.js/web/viewer.html*
// ==/UserScript==

/**
 * Rewrite notes
 * -------------
 * The previous version used the `==UserChromeJS==` header (which fx-autoconfig
 * does not parse) and no `@include`, so it only ever loaded in the browser
 * window and immediately bailed on its `location.href.match(/\.pdf/)` guard.
 * It also reached into pdf.js internals (`pdfViewer._pages`, `page.canvas`)
 * and used `document.createElement("a")` as a fake image container.
 *
 * This version targets the viewer document directly and uses the documented
 * `PDFViewerApplication` / `pdfDocument` API to render pages to a canvas and
 * download them as PNG files.
 */

(function () {
  "use strict";

  const RENDER_SCALE = 1.5;
  let panel = null;
  let toolbarButton = null;

  function buildUI() {
    const pdfDocument = window.PDFViewerApplication?.pdfDocument;
    const toolbar =
      document.getElementById("toolbarViewerRight") ||
      document.getElementById("toolbarViewerLeft");
    const container = document.getElementById("mainContainer");
    if (!pdfDocument || !toolbar || !container) {
      return;
    }

    // Toolbar button ------------------------------------------------------
    toolbarButton = document.createElement("button");
    toolbarButton.id = "uc-pdf-pages-button";
    toolbarButton.className = "toolbarButton";
    toolbarButton.title = "Download each page as an image";
    toolbarButton.setAttribute("tabindex", "0");
    toolbarButton.textContent = "Pages";
    toolbar.insertBefore(toolbarButton, toolbar.firstChild);

    // Floating panel ------------------------------------------------------
    panel = document.createElement("div");
    panel.id = "uc-pdf-pages-panel";
    panel.className = "hidden";
    panel.style.cssText = [
      "position:absolute",
      "top:40px",
      "inset-inline-end:12px",
      "z-index:10",
      "max-height:70vh",
      "overflow:auto",
      "padding:8px",
      "background:var(--doorhanger-bg-color,#fff)",
      "color:var(--doorhanger-color,#000)",
      "border:1px solid var(--doorhanger-border-color,#888)",
      "border-radius:6px",
      "box-shadow:0 2px 8px rgba(0,0,0,.35)",
    ].join(";");

    const header = document.createElement("div");
    header.style.cssText = "font-weight:600;margin-bottom:6px;";
    header.textContent = "Download page as image";
    panel.appendChild(header);

    for (let i = 1; i <= pdfDocument.numPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.className = "secondaryToolbarButton";
      pageButton.textContent = `Page ${i}`;
      pageButton.addEventListener("click", () => {
        downloadPage(pdfDocument, i).catch((e) => console.error(e));
      });
      panel.appendChild(pageButton);
    }

    container.appendChild(panel);

    toolbarButton.addEventListener("click", () => {
      panel.classList.toggle("hidden");
    });

    const onKeyDown = (e) => {
      if (e.key === "Escape" && !panel.classList.contains("hidden")) {
        panel.classList.add("hidden");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(
      "unload",
      () => window.removeEventListener("keydown", onKeyDown),
      { once: true },
    );
  }

  /**
   * Render one page to a canvas and trigger a PNG download.
   * @param {object} pdfDocument
   * @param {number} pageNumber
   */
  async function downloadPage(pdfDocument, pageNumber) {
    const page = await pdfDocument.getPage(pageNumber);
    const viewport = page.getViewport({ scale: RENDER_SCALE });
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    const ctx = canvas.getContext("2d");
    await page.render({ canvasContext: ctx, viewport }).promise;

    await new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          resolve();
          return;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `page-${pageNumber}.png`;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 10000);
        resolve();
      }, "image/png");
    });
  }

  // The viewer builds PDFViewerApplication asynchronously; wait for it.
  let retries = 0;
  function whenReady() {
    const app = window.PDFViewerApplication;
    if (app?.initializedPromise) {
      app.initializedPromise.then(buildUI).catch((e) => console.error(e));
    } else if (++retries < 200) {
      setTimeout(whenReady, 50);
    }
  }
  whenReady();
})();
