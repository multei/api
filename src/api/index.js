const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.status(204).send());
router.post('/', (req, res) => res.status(403).json({status: 'error', message: 'Can not POST this endpoint'}));
router.use('/v1', require('./v1'));

module.exports = router;
