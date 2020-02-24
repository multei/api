const { create } = require('../api/v1/parkings/db')
const Debug = require('debug')
const debug = Debug('app:middlewares:saveOnParkings')

async function saveOnParkings(req, res, next) {

  debug('Getting request body data')

  const { file, recognitionData } = req;
  const { plate, vehicle: { color, make, make_model } } = recognitionData.results[0];

  const data = {
    ...req.body,
    car_front_photo_uri: file.cloudStoragePublicUrl,
    car_color: color[0].name,
    car_make: make[0].name,
    car_make_model: make_model[0].name,
    car_openalpr_recognition_data: recognitionData,
    car_plate: plate,
  }

  debug('Data to be persisted: %o', data)

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

module.exports = saveOnParkings
