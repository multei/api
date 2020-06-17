const { ApiProblem } = require('express-api-problem');

module.exports = (req, res, next) => {
  if(typeof req.files["car_front_photo"] === "undefined") {
    return next(new ApiProblem({ status: 422, title: 'Car front photo is missing', detail: 'Please check if you are including `car_front_photo` file field on your request' }))
  }
  next()
}
