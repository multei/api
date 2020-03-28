const { ApiProblem } = require('express-api-problem');
const debug = require('debug')('app:api:routes:index')
const express = require('express');
const router = express.Router();

debug('On routes/index.js file')

debug('Configuring route for GET /')
router.get('/', (req, res) => {
  res.status(204).send()
})

debug('Configuring route for POST /')
router.post('/', (req, res, next) => {
  next(new ApiProblem(405, 'Can not POST to / endpoint', 'Please check the request URL. Given /'))
})

debug('End of routes/index.js file')

module.exports = router;
