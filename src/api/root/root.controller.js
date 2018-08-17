'use strict';

import PdfPostModel from '../../models/pdf-post-model';
import PdfGetModel from '../../models/pdf-get-model';
import RecognizerManager from '../../recognizer/recognizer-manager';
let PNG = require('pngjs').PNG;

let recognizerManager = new RecognizerManager();

export async function getPage(ctx, next) {
  let model;
  try {
    model = await PdfGetModel.fromRequest(ctx);
  } catch (err) {
    ctx.throw(400, err.message);
  }
  ctx.status = 200;
  ctx.body = 'getPage';
  await next();
}

export async function postPdf(ctx, next) {
  console.log('postPdf');
  let model;
  try {
    model = await PdfPostModel.fromRequest(ctx);
    recognizerManager.recognizePdf(model);
    ctx.status = 200;
    ctx.body = {
      message: 'working'
    };
  } catch (err) {
    ctx.throw(400, err.message);
  }
  await next();
}

export async function postGetPage(ctx, next) {
  console.log('postGetPage');
  let model;
  try {
    model = PdfPostModel.fromRequest(ctx);
    let imgObj = await recognizerManager.recognizePagePdf(model);
    ctx.status = 200;
    ctx.body = imgObj.data;
    ctx.type = 'image/png';
  } catch (err) {
    ctx.throw(400, err.message);
  }
  await next();
}
