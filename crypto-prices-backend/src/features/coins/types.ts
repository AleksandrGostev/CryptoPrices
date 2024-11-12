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
