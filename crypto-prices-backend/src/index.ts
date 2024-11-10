import dotenv from 'dotenv';
import { mainRouter } from "./routes";
import { getWebApp } from "./utils/server";
import { runMigrations } from './knex';

dotenv.config();

export const start = async () => {
  await runMigrations();
  const app = getWebApp();
  app.use(mainRouter);

  const port = process.env.PORT || 8000;
  return app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
};

void (async () => {
  await start();
})();

