const express = require('express');
const router = express.Router();

router.get('/parkings', require('./parkings'));
router.post('/parkings', require('./parkings/post'));
router.get('/parkings/:uuid', require('./parkings/single'));

module.exports = router;
