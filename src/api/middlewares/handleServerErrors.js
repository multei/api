function handleServerErrors(err, req, res) {
  let status = 500;
  if(typeof res.locals !== 'undefined') {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
  }
  if(typeof err.status !== "undefined" && err.status !== null) {
    status = err.status
  }
  if(typeof res.status === 'function') {
    res.status(status)
  }
}

module.exports = handleServerErrors
