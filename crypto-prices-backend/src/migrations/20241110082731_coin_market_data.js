/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('coin_market_data', (t) => {
    t.uuid('coin_id').primary().references('id', 'coin');
    t.decimal('current_price', 10, 2).notNullable();
    t.bigint('market_cap').notNullable();
    t.decimal('price_change_24h', 10, 2);
    t.integer('market_cap_rank');
    t.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable('coin_market_data');
};
