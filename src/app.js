const express = require('express');
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
const logger = require('morgan');

dotenv.config()

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('./middlewares/addHeaders'))

app.use('/', require('./routes/index'));

app.use(require('./middlewares/handleNotFound'))
app.use(require('./middlewares/handleServerErrors'))

module.exports = app;
