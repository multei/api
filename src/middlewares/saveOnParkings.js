const { create } = require('../api/v1/parkings/db')
const Debug = require('debug')
const debug = Debug('app:middlewares:saveOnParkings')

async function saveOnParkings(req, res, next) {

  debug('Getting request body data')
  let data = req.body;

  data.car_front_photo_uri = req["file"].cloudStoragePublicUrl
  data.car_plate = req["vehicleData"].results[0]["plate"]

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
