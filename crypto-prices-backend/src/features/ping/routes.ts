import PromiseRouter from "express-promise-router";

export const pingRouter = PromiseRouter();

pingRouter.get('/', async (_, res) => {
  return res.json('pong');
});
