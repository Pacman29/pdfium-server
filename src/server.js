'use strict';

import config from './config';
import configRoutes from './config/routes';
import Koa from 'koa';
import configKoa from './config/koa';

let Datastore = require('nedb');
var db = new Datastore({ filename: 'path/to/datafile', autoload: true });

const app = new Koa();
app.port = config.port;

configKoa(app);
configRoutes(app);

export default app;
