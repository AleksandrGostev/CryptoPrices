import { DbCoin, DbCoinExternalProvider, DbCoinMarketdata } from "./types";

declare module 'knex/types/tables' {
  interface Tables {
    coin: DbCoin,
    coin_external_provider: DbCoinExternalProvider,
    coin_market_data: DbCoinMarketdata,
  }
}
