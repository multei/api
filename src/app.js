const express = require('express');
const logger = require('morgan');

const handleNotFound = require('./middlewares/handleNotFound');
const handleServerErrors = require('./middlewares/handleServerErrors');
const addHeaders = require('./middlewares/addHeaders');

const app = express();

app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({extended: false}));
app.use(addHeaders);

app.use('/', require('./api'));

app.use(handleNotFound);
app.use(handleServerErrors);

module.exports = app;
