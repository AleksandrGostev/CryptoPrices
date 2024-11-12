import PromiseRouter from "express-promise-router";
import { getAllCoinsBasicData, getCoinDataById, getCoinExternalIdByCoinId, getCoinsWithOutdatedData, getCompareToExternalIds, upsertCoinMarketData } from "./database";
import { fetchCoinGeckoActualPrice } from "./helpers";
import { cacheMiddleware } from "../../utils/cache";
import { result, wrap } from "lodash";
import axios from "axios";
import { Ticker } from "./types";


export const coinsRouter = PromiseRouter();

coinsRouter.get('/', cacheMiddleware, async (_, res) => {
  const coinsWithOutdatedData = await getCoinsWithOutdatedData();
  const coinGeckoData = await fetchCoinGeckoActualPrice(coinsWithOutdatedData);
  if(coinGeckoData.length) {
    await upsertCoinMarketData(coinGeckoData);
  }
  const coins = await getAllCoinsBasicData();  
 
  return res.json(coins);
});


coinsRouter.get('/:coinId', cacheMiddleware, async (req, res) => {
  const {coinId} = req.params;

  const [coinData] = await getCoinDataById(coinId);

  if(!coinData) return res.status(404).send();

  return res.json(coinData);
});

coinsRouter.get('/:coinId/tickers', cacheMiddleware, async (req, res) => {
  const {coinId} = req.params;
  const [coinData] = await getCoinExternalIdByCoinId(coinId);

  // get exchange tickers from coin gecko
  const tickersResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinData.external_id}/tickers`, {
    params: {
      'exchange_ids': 'binance',
    },
    headers: {
      'x-cg-demo-api-key': process.env.COIN_GECKO_API_KEY
    }
  });

  if(!tickersResponse) {
    throw new Error('Could not fetch information');
  }

  let data = tickersResponse.data.tickers;

  const chartDataResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinData.external_id}/market_chart`, {
    params: {
      'vs_currency': 'usd',
      days: 30
    },
    headers: {
      'x-cg-demo-api-key': process.env.COIN_GECKO_API_KEY
    }
  });

  const prices = chartDataResponse.data.prices.map(([time, price]) => ({ time: new Date(time).toUTCString(), price}));

  return res.json({tickers: data, prices});
});
