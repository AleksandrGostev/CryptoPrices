import nock from 'nock';
import { fetchCoinGeckoActualPrice } from './helpers';
import assert from 'assert';

describe('helpers', () => {
  let coinGeckoScope: nock.Scope;
  beforeEach(() => {
    coinGeckoScope = nock('https://api.coingecko.com')
        .get('/api/v3/coins/markets')
        .query(true)
        .reply(200, [{id: 'bitcoin', current_price: 1, market_cap: 100, price_change_24h: 0, market_cap_rank: 1 }]);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should should call coin gecko api when coins are provided', async () => {
    const coins = [{id: '1', external_id: 'bitcoin'}];
    const coinsMarketData = await fetchCoinGeckoActualPrice(coins);
    assert.equal(coinGeckoScope.isDone(), true);
    assert.deepEqual(coinsMarketData, [{coin_id: '1', current_price: 1, market_cap: 100, price_change_24h: 0, market_cap_rank: 1}]);
  });

  it('should not call coin gecko api if provided coins list is empty', async () => {
    await fetchCoinGeckoActualPrice([]);
    assert.equal(coinGeckoScope.isDone(), false);
  })
});
