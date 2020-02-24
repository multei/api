'use strict'

const db = require('../../../knex');
const tableName = 'parkings';

const columns = ['car_color', 'car_front_photo_uri', 'car_make', 'car_make_model', 'car_plate', 'coordinates'];

function list() {
  return db(tableName).select(columns)
}

function read(uuid) {
  return db(tableName).select(columns).where({uuid})
}

function create(data) {
  return db(tableName).insert(data)
}

module.exports = {
  create,
  list,
  read
}
