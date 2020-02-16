const knex = require('../../../knex');

const getSingleParking = async (req, res, next) => {

  const {uuid} = req.params;
  const uuidPattern = new RegExp('[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}');
  const uuidIsValid = uuidPattern.test(uuid);

  if(!uuidIsValid) {
    res.status(400).send(`Please provide a valid UUID for this parking. Received: ${uuid}`);
    next();
  }

  const columns = ['car_color', 'car_make', 'car_make_model', 'car_plate', 'coordinates'];
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

  knex('parkings')
    .select(columns)
    .where({uuid: req.params.uuid})
    .then(successCallback).catch(errorCallback);
};

module.exports = getSingleParking;
