exports.seed = function (knex) {
  const tableName = 'parkings'
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableName).insert([
        {
          id: 1,
          uuid: '1a27f95a-97dd-461f-8dbd-7d03165adb8b',
          car_color: 'white',
          car_make: 'kia',
          car_make_model: 'kia_carens',
          car_plate: 'ABC1234',
          car_front_photo_uri: 'https://storage.googleapis.com/multei-photos-dev/1582751206378kia-cerato.jpg',
          car_rear_photo_uri: 'https://storage.googleapis.com/multei-photos-dev/1582751208271example-image.jpg',
          coordinates: '-19.9209351,-43.921136'
        }
      ]);
    });
};
