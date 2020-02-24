const bodyParser = require('body-parser')
const express = require('express')
const multerUpload = require('../../../middlewares/multerUpload')
const openALPR = require('../../../middlewares/openalpr')
const router = express.Router()

router.use(bodyParser.urlencoded({extended: false, limit: '1mb'}))

/**
 * POST /v1/parkings
 */
router.post(
  '/',
  multerUpload.single('carFrontPhoto'),
  openALPR,
  (req, res, next) => {

    debug('Checking if an image was uploaded...')
    const wasAnImageUploaded = req["file"] && req["file"].cloudStoragePublicUrl

    if (!wasAnImageUploaded) {
      debug('No image was uploaded because no image was detected')
      return next(createError(400, 'No valid image was detected on request'))
    }

    console.log(req["file"])
    res.status(200)

  }
)

module.exports = router
