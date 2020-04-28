const cookieParser = require('cookie-parser');
const debug = require('debug')('app')
const dotenv = require('dotenv')
const express = require('express');
const logger = require('morgan');

const { ExpressMiddleware } = require('express-api-problem')
const expressMiddleware = ExpressMiddleware()

const addHeadersMiddleware = require('./api/middlewares/addHeaders')
const corsMiddleware = require('./api/middlewares/cors')
const notFoundHandler = require('./api/middlewares/handleNotFound')
const serverErrorsHandler = require('./api/middlewares/handleServerErrors')

const apiRootRouteHandler = require('./api/routes')
const v1RouteHandler = require('./api/routes/v1')

debug('On app.js file')
dotenv.config()

const app = express();

app.disable('etag')
app.disable('x-powered-by')
app.use(logger('dev'));
app.use(cookieParser());
app.use(addHeadersMiddleware)

debug('Configuring CORS...')
app.use(corsMiddleware)

debug('Configuring routes for /...')
app.use('/', apiRootRouteHandler);

debug('Configuring routes for /v1/*...')
app.use('/v1', v1RouteHandler);

debug('Configuring middleware for handling Not Found error...')
app.use(notFoundHandler)

debug('Configuring middleware for handling another server errors...')
app.use(serverErrorsHandler)

debug('Configuring middleware for generating problem+json errors...')
app.use(expressMiddleware)

debug('After configure API on app.js')
module.exports = app;
