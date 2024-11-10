import PromiseRouter from "express-promise-router";
import { pingRouter } from "./features/ping/routes";
import { coinsRouter } from "./features/coins/routes";

export const mainRouter = PromiseRouter();

mainRouter.use('/ping', pingRouter);
mainRouter.use('/coins', coinsRouter);
