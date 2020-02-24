const bodyParser = require('body-parser')
const createError = require('http-errors')
const express = require('express')
const { create, list, read } = require('./db')

const router = express.Router()
router.use(bodyParser.json())

/**
 * GET /v1/parkings
 *
 * Retrieve a list of illegal parkings
 */
router.get('/', async (req, res) => {
  const successCallback = rows => res.json(rows);
  const errorCallback = error => { res.status(500).json; };

  const columns = ['car_color', 'car_make', 'car_make_model', 'car_plate', 'coordinates'];
  list().then(successCallback).catch(errorCallback);
})

/**
 * GET /v1/parkings/:uuid
 */
router.get('/:parking', async (req, res, next) => {
  const uuid = req.params["parking"];
  const uuidPattern = new RegExp('[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}');
  const uuidIsValid = uuidPattern.test(uuid);

  if(!uuidIsValid) {
    return next(createError(400, `Please provide a valid UUID for this parking. Received: ${uuid}`))
  }

  const successCallback = rows => {
    if(rows.length === 0) {
      res.status(404).send(`No parking found with this UUID. Received: ${uuid}`);
      next();
    }
    res.status(200).send(rows);
  };
  const errorCallback = error => {
    console.error(error);
    res.status(500).send('Server error');
  };
  read(uuid).then(successCallback).catch(errorCallback);

})

/**
 * DELETE /v1/parkings/:uuid
 *
 * Can not delete a illegal parking
 */
router.delete('/:parking', async (req, res, next) => {
  next(createError(405, 'Deleting parking is not allowed'))
})

module.exports = router
