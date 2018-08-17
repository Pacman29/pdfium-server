'use strict';

import { getPage, postGetPage, postPdf } from './root.controller';
import router from 'koa-router';
import multer from 'koa-multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const root = router();

root.get('/pdfPage/:pdfId/:imageResolution/:pageNo', getPage);
root.get('/pdfPage/:pdfId/:pageNo', getPage);

root.use('/pdf', upload.single('pdf'));
root.post('/pdf/:pdfId/:imageResolution/:pageNo', postGetPage);
root.post('/pdf/:pdfId', postPdf);

export default root;
