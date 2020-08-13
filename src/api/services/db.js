'use strict'

const db = require('../../lib/knex');
const tableName = 'parkings';

const columns = [
  'uuid',
  'car_color',
  'car_front_photo_uri',
  'car_make',
  'car_make_model',
  'car_rear_photo_uri',
  'car_plate',
  'coordinates',
  'created_at',
  'completed_at'
];

function list() {
  return db(tableName).select(columns)
}

function read(whereObject, whereNotObject) {
  if(whereNotObject)
    return db(tableName).select(columns).where(whereObject).whereNot(whereNotObject)
  else
    return db(tableName).select(columns).where(whereObject)

}

function create(data) {
  return db(tableName).insert(data, 'uuid')
}

function update(whereObject, updateObject, completed) {
  if (completed) updateObject['completed_at'] =  db.fn.now()
  return db(tableName).where(whereObject).update(updateObject)
}

module.exports = {
  create,
  list,
  read,
  update
}
