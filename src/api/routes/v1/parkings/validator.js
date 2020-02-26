const ApiProblem = require('express-api-problem');

module.exports = (req, res, next) => {
  if(typeof req.files["car_front_photo"] === "undefined") {
    return next(new ApiProblem(422, 'Car front photo is missing', 'Please check if you are including `car_front_photo` file field on your request'))
  }
  if(typeof req.files["car_rear_photo"] === "undefined") {
    return next(new ApiProblem(422, 'Car rear photo is missing', 'Please check if you are including `car_rear_photo` file field on your request'))
  }
  next()
}
