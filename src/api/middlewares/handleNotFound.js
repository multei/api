const createError = require('http-errors');

function handleNotFound(req, res, next) {
  next(createError(404, `Endpoint ${req.url} not found`));
}

module.exports = handleNotFound;
