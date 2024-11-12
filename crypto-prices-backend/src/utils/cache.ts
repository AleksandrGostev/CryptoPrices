import NodeCache from 'node-cache';

const timeToLiveInSeconds = 60;
const cache = new NodeCache({ stdTTL: timeToLiveInSeconds });

export const cacheMiddleware = (req: any, res: any, next: any) => {
  const key = req.originalUrl || req.url;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    return res.json(cachedResponse);
  }

  const originalJson = res.json.bind(res);
  res.json = (body: any) => {
    cache.set(key, body);
    return originalJson(body);
  };

  next();
};
