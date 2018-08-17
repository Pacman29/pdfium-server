import Jimp from 'jimp';
let pdf = require('./pdfium.js');

export default class PdfiumDecorator {
  constructor(obj) {
    this.pdf = pdf;
    this.pdf.cwrap('init', null, [])();
    this.pdf.cwrap('set_scale', null, ['number'])(obj.dpi / 100);
    let ptr = this.pdf.cwrap('get_content_buffer', 'number', ['number'])(obj.pdfFile.length);
    for (let i = 0, l = obj.pdfFile.length; i < l; ++i) {
      this.pdf.HEAP8[ptr + i] = obj.pdfFile[i];
    }
    this.pdf.cwrap('load', null, [])();
  }

  get pageCount() {
    this.pdf = this.pdf.cwrap('get_page_count', 'number', [])();
  }

  getImage(pageNo) {
    let self = this;
    return new Promise(resolve => {
      self.render = (page_no, buf, stride, width, height) => {
        let data = new Buffer(width * height * 4);
        console.log('recognize ' + page_no);
        let off = 0;
        for (let h = 0; h < height; ++h) {
          let ptr = buf + stride * h;
          for (let w = 0; w < width; ++w) {
            data[off++] = self.pdf.HEAP8[(ptr + 2)] & 255;
            data[off++] = self.pdf.HEAP8[(ptr + 1)] & 255;
            data[off++] = self.pdf.HEAP8[(ptr)] & 255;
            data[off++] = 255;
            ptr += 4;
          }
        }
        console.log('recognize data ' + page_no);
        new Jimp(width, height, (err, image) => {
          image.bitmap.data = data;
          console.log(pageNo);
          resolve({ pageNo, image });
        });
      };
      self.pdf.cwrap('render_page', null, ['number'])(pageNo);
    });
  }
}
