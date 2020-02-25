const debug = require('debug')('app:api:routes:index')
const express = require('express');
const router = express.Router();

debug('On routes/index.js file')

debug('Configuring route for GET /')
router.get('/', (req, res) => {
  res.status(204).send()
})

debug('Configuring route for POST /')
router.post('/', (req, res) => {
  res.status(405).send('Can not POST to this endpoint')
})

debug('End of routes/index.js file')

module.exports = router;
