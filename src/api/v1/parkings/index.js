const bodyParser = require('body-parser')
const createError = require('http-errors')
const debug = require('debug')('app:parkings')
const express = require('express')
const { create } = require('./db')
const googleCloudStorage = require('../../../middlewares/googleCloudStorage')
const multerUpload = require('../../../middlewares/multerUpload')
const openALPR = require('../../../middlewares/openalpr')
const saveOnParkings = require('../../../middlewares/saveOnParkings')
const router = express.Router()

debug('On /v1/parkings/index.js file')

router.use(bodyParser.urlencoded({extended: false, limit: '1mb'}))

/**
 * POST /v1/parkings
 */
router.post(
  '/',
  [
    multerUpload.single('carFrontPhoto'),
    openALPR,
    googleCloudStorage.uploadFile
  ],
  saveOnParkings
)

module.exports = router
