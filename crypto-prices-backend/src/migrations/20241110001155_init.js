const chunk = require('lodash/chunk');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const { default: axios } = require("axios");

const coingeckoMapping = {
  tether: 'usdt',
  'the-open-network': 'ton',
  'bitcoin': 'btc',
  'ethereum': 'eth'
};

exports.up = async function(knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  await knex.schema.createTable('coin', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    t.text('symbol').notNullable();
    t.text('name').notNullable();
    t.text('icon');
    t.timestamps(true, true);
  });

  const dbCoins = await knex('coin').insert([
    {
      symbol: 'ton',
      name: 'Toncoin',
      icon: 'ton'
    },
    {
      symbol: 'usdt',
      name: 'Tether',
      icon: 'usdt'
    },
    {
      symbol: 'btc',
      name: 'Bitcoin',
      icon: 'btc'
    },
    {
      symbol: 'eth',
      name: 'Ethereum',
      icon: 'eth'
    }
  ]).returning('*');

  await knex.schema.createTable('coin_external_provider', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    t.text('external_id').notNullable();
    t.text('symbol').notNullable();
    t.text('name').notNullable();
    t.text('provider').notNullable();
    t.uuid('coin_id').nullable().references('id', 'coin');
    t.timestamps(true, true);
    t.unique(['external_id', 'provider', 'coin_id'])
  });

  // Load coin list from CoinGecko
  const response = await axios.get('https://api.coingecko.com/api/v3/coins/list', {
    headers: {
      'Accept': 'application/json',
      'x-cg-demo-api-key': process.env.COIN_GECKO_API_KEY
    }
  });

  if(response && response.status === 200) {
    const batchSize = 1000;
    const chunks = chunk(response.data, batchSize);

    for(const batch of chunks) {
      const coinsWithProvider = batch.map((coin) => {
        const coinData = {
          external_id: coin.id,
          symbol: coin.symbol,
          name: coin.name,
          provider: 'coingecko'
        };
        if(Object.keys(coingeckoMapping).includes(coin.id)) {
          const dbCoinSymbol = coingeckoMapping[coin.id];
          const coinId = dbCoins.find(c => c.symbol === dbCoinSymbol);
          if(coinId) {
            return {...coinData, coin_id: coinId.id};
          }
        }
        return coinData;
      })
      await knex('coin_external_provider').insert(coinsWithProvider);
    }
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp";');

  await knex.schema.dropTable('coin_external_provider');
  await knex.schema.dropTable('coin');
};
