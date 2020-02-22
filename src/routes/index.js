const debug = require('debug')('app:api:routes')
const express = require('express');
const router = express.Router();

debug('On routes/index.js file')

const indexRoute = require('../api/index')

debug('Configuring routes for GET / and POST /')
router.route('/').get(indexRoute.get).post(indexRoute.post);

debug('Configuring routes for /v1/*')
router.use('/v1', require('./v1'))

debug('End of routes/index.js file')

module.exports = router;

