// ==UserChromeJS==
// @name           PDF Tools (userChrome.js)
// @description    Enhances the pdf.js window in Firefox as a userChrome.js script.
// @version        1.0
// @author         Thomas Leon Highbaugh adapted from userscript by jerone
// ==/UserChromeJS==

(function () {
  // Only run in PDF.js viewer window
  if (!location.href.match(/\.pdf([?#].*)?$/)) return;

  // Wait for PDF.js to load
  function runWhenReady() {
    const mainContainer = document.getElementById("mainContainer");
    const toolbar = document.getElementById("toolbarViewerRight");
    if (
      !mainContainer ||
      !toolbar ||
      !window.PDFViewerApplication ||
      !window.PDFViewerApplication.pdfViewer
    ) {
      setTimeout(runWhenReady, 500);
      return;
    }

    var mimetype = "png";

    var SecondaryToolbar = {
      opened: false,
      initialize: function secondaryToolbarInitialize() {
        this.toolbar = document.createElement("div");
        this.toolbar.classList.add(
          "secondaryToolbar",
          "doorHangerRight",
          "hidden",
        );
        this.toolbar.style.right = "180px";
        mainContainer.appendChild(this.toolbar);

        this.buttonContainer = document.createElement("div");
        this.buttonContainer.classList.add("secondaryToolbarButtonContainer");
        this.toolbar.appendChild(this.buttonContainer);

        this.attachEvents();
      },

      attachEvents: function () {
        window.addEventListener(
          "click",
          function click(evt) {
            if (
              SecondaryToolbar.opened &&
              window.PDFViewerApplication.pdfViewer.viewer.contains(evt.target)
            ) {
              SecondaryToolbar.close();
            }
          },
          false,
        );
        window.addEventListener("keydown", function keydown(evt) {
          if (
            SecondaryToolbar.opened &&
            (evt.key === "Escape" || evt.keyCode === 27)
          ) {
            SecondaryToolbar.close();
          }
        });
      },

      render: function () {
        var pages = window.PDFViewerApplication.pdfViewer._pages;

        for (var i = 0, ii = pages.length; i < ii; i++) {
          var page = pages[i];
          var img = document.createElement("a");
          img.classList.add("secondaryToolbarButton", "download");
          img.dataset.pageIndex = i;
          img.setAttribute("download", "page" + page.id + "." + mimetype);
          img.setAttribute(
            "title",
            "Download 'page" + page.id + "." + mimetype + "'",
          );
          img.style.display = "inline-block";
          img.style.boxSizing = "border-box";
          img.appendChild(document.createTextNode("Page " + page.id));
          img.addEventListener("click", function () {
            var page = pages[this.dataset.pageIndex];
            if (!page.canvas) {
              page.draw();
            }
            this.href = page.canvas.toDataURL("image/" + mimetype);
          });

          var img2 = document.createElement("img");
          img2.style.height = "16px";
          img2.style.border = "1px solid red";
          img2.src =
            (page.canvas && page.canvas.toDataURL("image/" + mimetype)) || "";
          this.buttonContainer.appendChild(img2);
        }
      },

      empty: function () {
        while (this.buttonContainer.hasChildNodes()) {
          this.buttonContainer.removeChild(this.buttonContainer.lastChild);
        }
      },

      open: function secondaryToolbarOpen() {
        if (this.opened) {
          return;
        }
        this.opened = true;
        this.toolbar.classList.remove("hidden");
        this.render();
      },

      close: function secondaryToolbarClose(target) {
        if (!this.opened) {
          return;
        } else if (target && !this.toolbar.contains(target)) {
          return;
        }
        this.opened = false;
        this.toolbar.classList.add("hidden");
        this.empty();
      },

      toggle: function secondaryToolbarToggle() {
        if (this.opened) {
          this.close();
        } else {
          this.open();
        }
      },
    };

    SecondaryToolbar.initialize();

    var btn = document.createElement("button");
    btn.classList.add("toolbarButton", "zoomIn");
    toolbar.insertBefore(btn, toolbar.firstChild);
    btn.addEventListener("click", function () {
      SecondaryToolbar.toggle();
    });
  }

  // Run when DOM is ready
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    runWhenReady();
  } else {
    document.addEventListener("DOMContentLoaded", runWhenReady, { once: true });
  }
})();
