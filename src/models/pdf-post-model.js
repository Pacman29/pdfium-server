import { imageResolutionValidator } from '../common/image-resolution-validator';
import * as configFile from '../../config.json';
import {pageNumberValidator} from "../common/page-number-validator";


export default class PdfPostModel {
  _imageResolution = configFile.defaultImageResolution || null;

  _pdfId = null;
  _pageNo = null;
  _pdfFile = null;
  _dpi = configFile.dpi || null;

  _ctx = null;

  static fromRequest(request) {
    let result = new PdfPostModel();
    if (request.params.imageResolution) {
      result.imageResolution = imageResolutionValidator(request.params.imageResolution);
    }
    if (request.params.pageNo) {
      result.pageNo = pageNumberValidator(request.params.pageNo);
    }
    result.pdfId = request.params.pdfId;
    if (request.req.file) {
      result._pdfFile = request.req.file;
    } else {
      throw new Error('pdf file not found');
    }
    result.ctx = request;
    return result;
  }


  get ctx() {
    return this._ctx;
  }

  set ctx(value) {
    this._ctx = value;
  }

  get pdfFile() {
    return this._pdfFile;
  }

  set pdfFile(value) {
    this._pdfFile = value;
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

  get imageResolution() {
    return this._imageResolution;
  }

  set imageResolution(value) {
    this._imageResolution = value;
  }


  get dpi() {
    return this._dpi;
  }

  set dpi(value) {
    this._dpi = value;
  }
}
