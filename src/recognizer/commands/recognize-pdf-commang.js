import BaseCommand from './base-command';
import PdfiumDecorator from '../pdfium/pdfium-decorator';

export default class RecognizePdfCommand extends BaseCommand {
  constructor(opt) {
    super();
    this.dpi = opt.dpi;
    this.pdfFile = opt.pdfFile;
  }

  execute() {
    let opt = {
      dpi: this.dpi,
      pdfFile: this.pdfFile
    };
    return new Promise((resolve) => {
      console.log('load pdfium');
      let pdfium = new PdfiumDecorator(opt);
      console.log('loaded pdfium');
      let promises = [];
      let pageCount = pdfium.pageCount;
      for (let i = 0; i < pageCount; ++i) {
        console.log('get image ' + i);
        promises = pdfium.getImage(i);
      }
      resolve(promises);
    });
  }
}
