import knex from "knex";
import pg, { Client } from 'pg';
import { cloneDeep } from 'lodash';

const dbConfig = require('../knexfile.js');

const numericTypeId = 1700;
pg.types.setTypeParser(numericTypeId, (val: any) => {
    return parseFloat(val);
});

export const ensureDatabaseExists = async () => {
  const dbName = dbConfig.connection.database;
  const postgresDbConfig = {
    ...dbConfig.connection,
    database: 'postgres',
  };

  const client = new Client(postgresDbConfig);
  try {
    await client.connect();

    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);
    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database "${dbName}" created successfully.`);
    } else {
      console.log(`Database "${dbName}" already exists.`);
    }
  } catch (error) {
    console.error('Error ensuring database exists:', error);
  } finally {
    await client.end();
  }
}

export const runMigrations = async () => {
  try {
    await ensureDatabaseExists();
    await db.migrate.latest();
    console.log('Migrations ran successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
  }
}

export const db = knex(cloneDeep(dbConfig));
