let pdf = global.pdfium;

import concat from 'gather-stream';
let PNG = require('pngjs').PNG;
export default class PdfiumDecorator {

  constructor(obj) {
    pdf.cwrap('set_scale', null, ['number'])(300 / 100);
    let ptr = pdf.cwrap('get_content_buffer', 'number', ['number'])(obj.pdfFile.length);
    for (let i = 0, l = obj.pdfFile.length; i < l; ++i) {
      pdf.HEAP8[ptr + i] = obj.pdfFile[i];
    }
    pdf.cwrap('load', null, [])();
  }

  get pageCount() {
    return pdf.cwrap('get_page_count', 'number', [])();
  }

  getImage(pageNo) {
    return new Promise((resolve, reject) => {
      pdf.render = (page_no, buf, stride, width, height) => {
        new Promise(resolve1 => {
          console.log('buffer copy' + pageNo);
          let data = new Buffer(width * height * 4);
          let off = 0;
          for (let h = 0; h < height; ++h) {
            let ptr = buf + stride * h;
            for (let w = 0; w < width; ++w) {
              data[off++] = pdf.HEAP8[(ptr + 2)] & 255;
              data[off++] = pdf.HEAP8[(ptr + 1)] & 255;
              data[off++] = pdf.HEAP8[(ptr)] & 255;
              data[off++] = 255;
              ptr += 4;
            }
          }
          resolve1(data);
        }).then(data => {
          let png = new PNG({
            filterType: 4,
            width,
            height
          });
          png.data = data;
          let pack = png.pack().pipe(concat((err, buffer) => {
            console.log('write data' + pageNo);
            if (err) {
              reject(err);
            } else {
              resolve({
                pageNo: pageNo + 1,
                data: buffer
              });
            }
          }));
        });
      };
      pdf.cwrap('render_page', null, ['number'])(pageNo);
    });
  }
}
