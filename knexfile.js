const debug = require('debug')('app:knexfile')
require('dotenv').config();

debug('On knexfile.js')

module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  },

  test: {
    client: 'pg',
    connect: process.env.DATABASE_URL
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};

debug('End of knexfile.js')
