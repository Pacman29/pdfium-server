import SaveFileCommand from './commands/save-file-command';
import * as configFile from '../../config.json';
import RecognizePdfCommand from './commands/recognize-pdf-commang';
import RecognizePagePdfCommand from "./commands/recognize-page-pdf-command";
import LoadFileCommand from "./commands/load-file-command";

let instance;
export default class RecognizerActions {
  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;
  }

  saveImage(obj) {
    let command = new SaveFileCommand(`${configFile.imageStorage}${obj.pageNo}.png`,obj.data);
    return command.execute();
  }

  savePdf(obj) {
    let command = new SaveFileCommand(`${configFile.pdfStorage}${obj.pdfId}.pdf`, obj.pdfFile);
    return command.execute();
  }

  recognizePdf(obj) {
    let command = new RecognizePdfCommand({
      pdfFile: obj.pdfFile,
      dpi: obj.dpi
    });
    return command.execute();
  }

  recognizePagePdf(obj) {
    let command = new RecognizePagePdfCommand({
      pdfFile: obj.pdfFile,
      dpi: obj.dpi,
      pageNo: obj.pageNo
    });
    return command.execute();
  }

  loadPdf(obj) {
    let command = new LoadFileCommand(`${configFile.pdfStorage}${obj.pdfId}.pdf`);
    return command.execute();
  }
}
