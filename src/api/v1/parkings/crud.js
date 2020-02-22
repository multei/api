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
  googleCloudStorage.sendUploadedFileToGCS,
  async (req, res, next) => {
    debug('Getting request body data')
    let data = req.body;

    debug('Checking if an image was uploaded...')
    const wasAnImageUploaded = req["file"] && req["file"].cloudStoragePublicUrl

    if (!wasAnImageUploaded) {
      debug('No image was uploaded because no image was detected')
      return next(createError(400, 'No valid image was detected on request'))
    }

    data.imageUrl = req["file"].cloudStoragePublicUrl
    debug('An image was uploaded. Image URL is %o', data.imageUrl)

    const successCallback = savedData => {
      debug('Row saved at database with success: %o', savedData)
      res.status(200).json({
        baseUrl: req.baseUrl,
        data: savedData,
        id: savedData.id,
        uuid: savedData.uuid
      })
    }

    const errorCallback = error => {
      console.error(error)
      next(createError(500, 'Internal server error'))
    }

    debug('Saving on database...')
    create(data).then(successCallback).catch(errorCallback)
  }
)

debug('After configuring POST /v1/parkings route')

module.exports = router
