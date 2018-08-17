import RecognizerActions from "./recognizer-actions";

let instance;
export default class RecognizerManager {
  constructor() {
    if (instance) {
      return instance;
    }

    this.actions = new RecognizerActions();

    instance = this;
  }

  async recognizePdf(model){
    try {
      let savePdfPromise = await this.actions.savePdf({
        pdfFile: model.pdfFile.buffer,
        pdfId: model.pdfId,
      });

      let imagesPromises = await this.actions.recognizePdf({
        pdfFile: model.pdfFile.buffer,
        dpi: model.dpi
      });

      imagesPromises.forEach(promise => {
        promise.then(imgObject => {
          console.log(imgObject.pageNo);
          let result = this.actions.saveImage(imgObject);
          console.log('save '+ imgObject.pageNo);
        });
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  async recognizePagePdf(model){
    try {
      return this.actions.recognizePagePdf({
        pdfFile: model.pdfFile.buffer,
        dpi: model.dpi,
        pageNo: model.pageNo
      });
    } catch (e) {
      console.log(e.message);
    }
  }
}
