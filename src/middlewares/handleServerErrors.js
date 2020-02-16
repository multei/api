function handleServerErrors(err, req, res) {
  if(typeof res.locals !== 'undefined') {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  }
  if(typeof res.status !== 'undefined') {
    res.status(err.status || 500);
  }
}

module.exports = handleServerErrors;
