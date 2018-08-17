import * as configFile from '../../config';
import { imageResolutionValidator } from '../common/image-resolution-validator';
import { pageNumberValidator } from '../common/page-number-validator';

export default class PdfGetModel {
  _imageResolution = configFile.defaultImageResolution || null;
  _pdfId = null;
  _pageNo = null;

  _ctx = null;
  static fromRequest(request) {
    let result = new PdfGetModel();
    if (request.params.imageResolution) {
      result.imageResolution = imageResolutionValidator(request.params.imageResolution);
    }
    if (request.params.pageNo) {
      result.pageNo = pageNumberValidator(request.params.pageNo);
    } else {
      throw new Error('no page number');
    }
    result.pdfId = request.params.pdfId;
    result.ctx = request;
    return result;
  }


  get imageResolution() {
    return this._imageResolution;
  }

  set imageResolution(value) {
    this._imageResolution = value;
  }

  get pdfId() {
    return this._pdfId;
  }

  set pdfId(value) {
    this._pdfId = value;
  }

  get pageNo() {
    return this._pageNo;
  }

  set pageNo(value) {
    this._pageNo = value;
  }

  get ctx() {
    return this._ctx;
  }

  set ctx(value) {
    this._ctx = value;
  }
}
