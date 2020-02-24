const debug = require('debug')('app:api:routes:v1')
const express = require('express');
const router = express.Router();

debug('On routes/v1.js file')

debug('Configuring routes for /v1/parkings')
router.use('/parkings', require('../api/v1/parkings'))

debug('End of routes/v1.js file')

module.exports = router
