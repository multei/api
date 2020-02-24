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
router.post(
  '/',
  multerUpload.single('carFrontPhoto'),
  googleCloudStorage.uploadFile,
  async (req, res, next) => {

    debug('Getting request body data')
    let data = req.body;

    data.car_front_photo_uri = req["file"].cloudStoragePublicUrl

    const successCallback = savedData => {
      debug('Row saved at database with success: %o', data)
      res.status(200).json({
        data
      })
    }

    const errorCallback = error => {
      debug('Row not saved at database. Error: %o', error)
      next(createError(500, 'Internal server error'))
    }

    debug('Saving on database...')
    create(data).then(successCallback).catch(errorCallback)
  }
)

debug('After configuring POST /v1/parkings route')

module.exports = router
