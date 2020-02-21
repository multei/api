const knexConfig = {
  client: 'pg',
  connection: () => process.env.DATABASE_URL
}

const knex = require('knex')(knexConfig);

module.exports = knex;
module.exports.knexConfig = knexConfig;
