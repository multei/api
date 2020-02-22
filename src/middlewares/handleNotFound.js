const createError = require('http-errors');
const debug = require('debug')('app:middlewares:handleNotFound')

debug('On handleNotFound.js')

function handleNotFound(req, res, next) {
  debug('Handling Not Found...')
  next(createError(404, `Endpoint ${req.url} not found`));
}

module.exports = handleNotFound;
