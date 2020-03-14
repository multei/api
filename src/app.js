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
app.use(require('./api/middlewares/addHeaders'))

debug('Configuring CORS...')
app.use(require('./api/middlewares/cors'))

debug('Configuring routes for /...')
app.use('/', require('./api/routes'));

debug('Configuring routes for /v1/*...')
app.use('/v1', require('./api/routes/v1'));

debug('Configuring middleware for handling Not Found error...')
app.use(require('./api/middlewares/handleNotFound'))

debug('Configuring middleware for handling another server errors...')
app.use(require('./api/middlewares/handleServerErrors'))

debug('Configuring middleware for generating problem+json errors...')
// @todo Update app code to work with express-api-problem 2.x
app.use(require('express-api-problem/middleware'))

debug('After configure API on app.js')

module.exports = app;
