
exports.up = (knex) => {
  return knex.schema.table('parkings', table => table.timestamp('completed_at'))
};

exports.down = (knex) => {
  return knex.schema.table('parkings', table => table.dropColumn('completed_at'))
};
