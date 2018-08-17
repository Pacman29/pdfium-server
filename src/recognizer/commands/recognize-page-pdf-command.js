import BaseCommand from './base-command';
import PdfiumDecorator from '../pdfium/pdfium-decorator';

export default class RecognizePagePdfCommand extends BaseCommand {
  constructor(opt) {
    super();
    this.dpi = opt.dpi;
    this.pageNo = opt.pageNo;
    this.pdfFile = opt.pdfFile;
  }

  execute() {
    let opt = {
      dpi: this.dpi,
      pdfFile: this.pdfFile
    };
    return new Promise((resolve) => {
      let pdfium = new PdfiumDecorator(opt);
      pdfium.getImage(this.pageNo).then(imgObject => {
        resolve(imgObject);
      });
    });
  }
}
