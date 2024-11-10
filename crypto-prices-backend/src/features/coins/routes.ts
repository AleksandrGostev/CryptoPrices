import PromiseRouter from "express-promise-router";
import { getAllCoinsBasicData, getCoinDataById, getCoinsWithOutdatedData, getCompareToExternalIds, upsertCoinMarketData } from "./database";
import { fetchCoinGeckoActualPrice } from "./helpers";
import { cacheMiddleware } from "../../utils/cache";
import { result, wrap } from "lodash";
import axios from "axios";


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

coinsRouter.get('/:coinId/compare-list', cacheMiddleware, async (req, res) => {
  const {coinId} = req.params;
  const [coinData] = await getCoinDataById(coinId);

  // get exchange tickers from coin gecko
  const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinData.external_id}/tickers`, {
    params: {
      'exchange_ids': 'binance',
    },
    headers: {
      'x-cg-demo-api-key': process.env.COIN_GECKO_API_KEY
    }
  });

  let data = response.data.tickers; 

  // coingecko supports tether only as target
  if (coinData.external_id === 'tether') {
    data = response.data.tickers.map((ticker: any) => {
      return {
        ...ticker,
        base: ticker.target,
        target: ticker.base,
        last: 1 / ticker.last,
      }
    })
  }
  
  const result = {
    symbol: coinData.symbol,
    tradeData: data,
  }
  return res.json(result);
});
