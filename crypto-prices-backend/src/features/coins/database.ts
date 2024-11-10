import { wrap } from "lodash";
import { db } from "../../knex";

export const getAllCoinsBasicData = async () => {
  const {rows} = await db.raw(`
    SELECT
      c.id,
      c.symbol,
      c.name,
      c.icon,
      cep.external_id,
      cmd.current_price,
      cmd.market_cap,
      cmd.price_change_24h,
      cmd.market_cap_rank,
      cmd.updated_at
    FROM coin c
    LEFT JOIN coin_external_provider cep on c.id = cep.coin_id
    LEFT JOIN coin_market_data cmd on c.id = cmd.coin_id
    ORDER BY cmd.market_cap_rank
  `);
  return rows;
}

export const getCoinsWithOutdatedData = async () => {
  return db('coin as c')
    .leftJoin('coin_external_provider as cep', 'c.id', 'cep.coin_id')
    .leftJoin('coin_market_data as cmd', 'c.id', 'cmd.coin_id')
    .select(['c.id', 'cep.external_id'])
    .whereRaw(`cmd.updated_at is null OR (EXTRACT(EPOCH FROM (? - cmd.updated_at)) / 60 > 30)`, [db.fn.now()]);
}

export const upsertCoinMarketData = async (data: any) => {
  await db('coin_market_data')
    .insert(data)
    .onConflict('coin_id')
    .merge({updated_at: db.fn.now()});
}

export const getCoinDataById = async (coinId: string) => {
  return db('coin as c')
    .innerJoin('coin_external_provider as cep', 'c.id', 'cep.coin_id')
    .select(['c.symbol', 'c.name', 'c.icon', 'cep.external_id'])
    .where('c.id', coinId);
}

export const getCompareToExternalIds = async (coinId: string) => {
  return db('coin_external_provider').whereNotNull('coin_id').andWhereNot('coin_id', coinId).pluck('external_id');
}
