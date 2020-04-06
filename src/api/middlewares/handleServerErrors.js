const Debug = require('debug')
const debug = Debug('app:api:middlewares:handleServerErrors')

function handleServerErrors(err, req, res) {
  let status = 500;
  if(typeof res.locals !== 'undefined') {
    debug('Setting locals data for message and error')
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
  }
  if(typeof err.status !== "undefined" && err.status !== null) {
    debug('Setting error status')
    status = err.status
  }
  if(typeof res.status === 'function') {
    debug('Setting status on response')
    res.status(status)
  }
}

module.exports = handleServerErrors
