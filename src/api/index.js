const createError = require('http-errors')

module.exports = {
  get: (req, res) => res.status(204).send(),
  post: (req, res, next) => next(createError(405, 'Can not POST to this endpoint'))
}
