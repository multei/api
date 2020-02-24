const cookieParser = require('cookie-parser');
const debug = require('debug')('app')
const dotenv = require('dotenv')
const express = require('express');
const logger = require('morgan');

debug('On app.js file')
dotenv.config()

const app = express();

app.disable('etag')
app.disable('x-powered-by')
app.use(logger('dev'));
app.use(cookieParser());
app.use(require('./middlewares/addHeaders'))

debug('Configuring routes...')
app.use('/', require('./routes/index'));

debug('Configuring middleware for handling Not Found error...')
app.use(require('./middlewares/handleNotFound'))

debug('Configuring middleware for handling another server errors...')
app.use(require('./middlewares/handleServerErrors'))

debug('After configure API on app.js')

module.exports = app;
