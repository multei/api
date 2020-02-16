const name = 'parkings';

exports.up = knex => knex.schema.createTable(name, table => {
  table.increments('id').notNullable();
  table.uuid('uuid');

  table.string('car_color').notNullable();
  table.string('car_make_model').notNullable();
  table.string('car_model').notNullable();
  table.string('car_plate', 7).notNullable();

  table.specificType('coordinates', 'POINT').nullable();
});

exports.down = knex => knex.schema.dropTable(name);

