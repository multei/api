const { ApiProblem } = require('express-api-problem');

function handleNotFound(req, res, next) {
  next(new ApiProblem(404, `Endpoint not found`, `Please check the request URL`, {
    url: req.url
  }));
}

module.exports = handleNotFound;
