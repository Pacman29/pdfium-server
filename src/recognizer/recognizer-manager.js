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
      let promises = [];
      promises.push(this.actions.savePdf({
        pdfFile: model.pdfFile.buffer,
        pdfId: model.pdfId,
      }));
      promises.push(this.actions.recognizePdf({
        pdfFile: model.pdfFile.buffer,
        dpi: model.dpi
      }));
      let result = await Promise.all(promises);
      console.log('recognize pdf');
    } catch (e) {
      console.log(e.message);
    }
  }
}
