const name = 'parkings';

exports.up = (knex, Promise) => knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').then(
  () =>
    knex.schema.createTable(name, table => {

      knex.raw();

      table.increments('id').notNullable().primary().unique();
      table.uuid('uuid').defaultTo(knex.raw('uuid_generate_v4()')).unique();

      table.string('car_color').notNullable();
      table.string('car_make').notNullable();
      table.string('car_make_model').notNullable();
      table.string('car_plate', 7).notNullable();

      table.specificType('coordinates', 'POINT').nullable();

      table.index('car_plate');
      table.index('uuid');

    }));

exports.down = knex => knex.schema.dropTable(name);

