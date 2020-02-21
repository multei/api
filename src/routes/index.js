const express = require('express');
const router = express.Router();

const indexRoute = require('../api/index')
router.route('/').get(indexRoute.get).post(indexRoute.post);
router.use('/v1', require('./v1'))

module.exports = router;

