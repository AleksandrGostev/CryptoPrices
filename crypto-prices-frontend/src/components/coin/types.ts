export interface CoinData {
  current_price: number;
  external_id: string;
  icon: string;
  market_cap: string;
  market_cap_rank: number;
  name: string;
  price_change_24h: number;
  symbol: string;
}

export interface Ticker {
  base: string;
  is_anomaly: boolean;
  is_stale: boolean;
  last: number;
  market: TickerMarket;
  target: string;
  trade_url: string;
  trust_score: string;
  volume: number;
}

interface TickerMarket {
  name: string;
}
