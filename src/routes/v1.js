const express = require('express');
const router = express.Router();

router.get('/parkings', require('../api/v1/parkings'))
router.get('/parkings/:uuid', require('../api/v1/parkings/get'))
router.post('/parkings', require('../api/v1/parkings/post'))

module.exports = router
