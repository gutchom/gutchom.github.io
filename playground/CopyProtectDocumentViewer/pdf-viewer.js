// サンプル
const url = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf';

// Loaded via <script> tag, create shortcut to access PDF.js exports.
// PDF.jsのインポート
const pdfjsLib = window['pdfjs-dist/build/pdf'];

// The workerSrc property shall be specified.
// WebWorkerのオプションを起動する
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.2.228/build/pdf.worker.js';

class MultiPagePDFViewer {
  constructor(url) {
    this.pdf = null;
    this.totalPages = 1;
    this.currentPage = 1;

    pdfjsLib.getDocument(url).promise.then(pdf => {
      this.pdf = pdf;
      this.totalPages = pdf.numPages;
      this.renderPage(this.currentPage);
    });
  }

  renderPage(num) {
    this.pdf.getPage(num).then(page => {
      const canvas = document.createElement('canvas');
      const canvasContext = canvas.getContext('2d');
      const viewport = page.getViewport({scale: 2});
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      document.getElementById('pdf-container').append(canvas);

      page.render({canvasContext, viewport}).promise.then(() => {
        if (this.currentPage++ < this.totalPages) {
          this.renderPage(this.currentPage);
        }
      });
    });
  }
}

new MultiPagePDFViewer(url);
