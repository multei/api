const { ApiProblem } = require('express-api-problem');

function handleNotFound(req, res, next) {
  next(new ApiProblem({ status: 404, title: `Endpoint not found`, detail: `Please check the request URL`, additional: {
    url: req.url
  }}));
}

module.exports = handleNotFound;
