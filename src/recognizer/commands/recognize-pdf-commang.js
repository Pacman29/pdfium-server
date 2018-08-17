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
      let pdfium = new PdfiumDecorator(opt);
      let promises = [];
      let pageCount = pdfium.pageCount;
      for (let i = 0; i < pageCount; ++i) {
        promises.push(pdfium.getImage(i));
      }
      resolve(promises);
    });
  }
}
