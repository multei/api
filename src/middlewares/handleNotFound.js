function handleNotFound(req, res, next) {
  res.status(404).send({status: 'error', message: `Endpoint ${req.url} not found.`});
  next();
}

module.exports = handleNotFound;
