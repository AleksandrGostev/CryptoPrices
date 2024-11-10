export interface DbCoin {
  id: string;
  symbol: string;
  name: string;
  icon: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface DbCoinExternalProvider {
  id: string;
  external_id: string;
  symbol: string;
  name: string;
  provider: string;
  coin_id: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface DbCoinMarketdata {
  coin_id: string;
  current_price: number;
  market_cap: number;
  price_change_24h: number;
  market_cap_rank: number;
  created_at: Date;
  updated_at: Date;
}
