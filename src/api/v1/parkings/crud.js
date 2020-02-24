const bodyParser = require('body-parser')
const createError = require('http-errors')
const debug = require('debug')('app:api:parkings:crud')
const express = require('express')
const googleCloudStorage = require('../../../middlewares/googleCloudStorage')
const multerUpload = require('../../../middlewares/multerUpload')
const { create } = require('./db')

debug('On crud.js file')

const router = express.Router()

debug('Before setting body parser to URL encoded')
/**
 * Automatically parse request body as form data
 */
router.use(bodyParser.urlencoded({extended: false, limit: '1mb'}))
debug('After setting body parser to URL encoded')

debug('Configuring POST /v1/parkings')




debug('After configuring POST /v1/parkings route')

module.exports = router
