'use strict';

import PdfPostModel from '../../models/pdf-post-model';
import PdfGetModel from '../../models/pdf-get-model';
import RecognizerManager from "../../recognizer/recognizer-manager";

let recognizerManager = new RecognizerManager()

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
    await recognizerManager.recognizePdf(model);
  } catch (err) {
    ctx.throw(400, err.message);
  }
  ctx.status = 200;
  ctx.body = 'setPdf';
  await next();
}

export async function postGetPage(ctx, next) {
  console.log('postGetPage');
  let model;
  try {
    model = PdfPostModel.fromRequest(ctx);
  } catch (err) {
    console.log(JSON.stringify(err));
    ctx.throw(400, err.message);
  }
  ctx.status = 200;
  ctx.body = 'postGetPage';
  await next();
}
