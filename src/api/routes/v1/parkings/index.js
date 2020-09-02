const { ApiProblem } = require('express-api-problem');
const bodyParser = require('body-parser')
const Debug = require('debug')
const express = require('express')
const openALPR = require('../../../middlewares/__mocks__/express-middleware')
const router = express.Router()
const { create, list, read } = require('../../../services/db')
const { saveInitializedComplaint, finishComplaint } = require('./index.domain')

const googleCloudStorage = require('../../../middlewares/__mocks__/googleCloudStorage')
const multerUpload = require('../../../middlewares/multerUpload')

const debug = Debug('app:api:routes:v1:parkings')
debug('On /v1/parkings/index.js file')

router.use(bodyParser.urlencoded({extended: false, limit: '1mb'}))

/**
 * GET /v1/parkings
 *
 * Retrieve a list of illegal parkings
 */
router.get('/', bodyParser.json(), async function (req, res, next) {
  const handleSuccess = data => {
    debug('Success on listing parkings!')
    res.status(200).json({status: 'success', data: {parkings: data}});
  }
  const handleError = error => {
    debug('Error on listing parkings: %o', error)
    next(new ApiProblem({ status: 500, title: 'Error when trying to return parkings list', detail: 'It is an internal API issue' }))
  }

  debug('Listing parkings...')
  list().then(handleSuccess).catch(handleError)
})

/**
 * GET /v1/parkings/:car_plate
 *
 * Retrieve illegal parkings for a specific car plate
 */
router.get('/:car_plate', async function (req, res, next) {

  const car_plate = req.params['car_plate'];

  const handleSuccess = data => {

    debug('Success on listing data')

    if(data.length === 0) {
      return next(new ApiProblem({ status: 404, title: 'No parkings found with this plate', detail: 'Please check if car_plate is correct', additional: {car_plate}}));
    }

    res.status(200).json({status: 'success', data: {parkings: data}});
  };

  const handleError = error => {
    debug('Error: %o', error)
    return next(new ApiProblem({ status: 500, title: 'Can not retrieve parkings', detail: 'This is an internal API error' }))
  };

  debug('Reading from database, looking for car plate %o', car_plate)
  read({car_plate},{'completed_at':null}).then(handleSuccess).catch(handleError)

})

/**
 * POST /v1/parkings
 */
router.post(
  '/',
  [
    multerUpload.fields([{name: 'car_front_photo', maxCount: 1}]),
    openALPR('car_front_photo'),
    googleCloudStorage.uploadFile('car_front_photo'),
  ],
  async function(req, res, next) {
    const data = createComplaintObject(req)
    saveInitializedComplaint(data, res, next);
  }
)

/**
 * PATCH /v1/parkings/
 */
router.patch('/', bodyParser.json(), async (req, res, next) => {
  const { uuid, coordinates } = req.body
  finishComplaint(res, next, uuid, coordinates);
})


/**
 * DELETE /v1/parkings/:car_plate
 *
 * Can not delete a illegal parking
 */
router.delete('/:param', bodyParser.json(), async (req, res, next) => {
  next(new ApiProblem({ status: 405, title: 'Deleting parking is not allowed' }))
})

function createComplaintObject(req) {
  const { files, recognitionData } = req;
    const { car_front_photo } = recognitionData;
    const { plate, vehicle: { color, make, make_model } } = recognitionData['car_front_photo'].results[0];

  return {
    ...req.body,
    car_color: color[0].name,
    car_front_photo_uri: files['car_front_photo'].cloudStoragePublicUrl,
    car_front_photo_recognition_data: car_front_photo,
    car_make: make[0].name,
    car_make_model: make_model[0].name,
    car_plate: plate,
  };
}

module.exports = router

