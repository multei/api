const knex = require('../../../knex');

module.exports= async (req, res) => {
  const successCallback = rows => res.json(rows);
  const errorCallback = error => { console.log(error); res.status(500).json; };
  const columns = ['car_color', 'car_make', 'car_make_model', 'car_plate', 'coordinates'];
  knex('parkings').select(columns)
    .then(successCallback)
    .catch(errorCallback);
};
