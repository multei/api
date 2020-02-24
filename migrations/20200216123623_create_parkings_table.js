const name = 'parkings';

exports.up = (knex, Promise) => knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').then(
  () =>
    knex.schema.createTable(name, table => {

      knex.raw();

      table.increments('id').notNullable().primary().unique();
      table.uuid('uuid').defaultTo(knex.raw('uuid_generate_v4()')).unique();

      table.string('car_color');
      table.string('car_make');
      table.string('car_make_model');
      table.string('car_plate', 7);
      table.string('car_front_photo_uri', 2083);
      table.json('car_openalpr_recognition_data').nullable();
      table.string('car_rear_photo_uri', 2083);

      table.specificType('coordinates', 'POINT').nullable();

      table.index('car_plate');
      table.index('uuid');

    }));

exports.down = knex => knex.schema.dropTable(name);

