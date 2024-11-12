import axios from 'axios';

export const fetchCoinGeckoActualPrice = async (
  coinIds: { id: string; external_id: string }[]
) => {
  if (!coinIds.length) return [];

  const response = await axios.get(
    'https://api.coingecko.com/api/v3/coins/markets',
    {
      params: {
        vs_currency: 'usd',
        ids: coinIds.map((c) => c.external_id).join(',')
      },
      headers: {
        Accept: 'application/json',
        'x-cg-demo-api-key': process.env.COIN_GECKO_API_KEY
      }
    }
  );

  if (response.status === 200) {
    const { data } = response;
    const coinData = data.map((coin: any) => {
      const coinGeckoId = coin.id;
      const dbCoinId = coinIds.find((c) => c.external_id === coinGeckoId);
      if (!dbCoinId) throw new Error('Coin not found');
      return {
        coin_id: dbCoinId.id,
        current_price: coin.current_price,
        market_cap: coin.market_cap,
        price_change_24h: coin.price_change_24h,
        market_cap_rank: coin.market_cap_rank
      };
    });
    return coinData;
  }
  return [];
};
