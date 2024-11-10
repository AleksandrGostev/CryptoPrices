module.exports = {
  client: 'pg',
  connection: {
    host: process.env.PG_HOST || 'localhost',
    user: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASSWORD || 'postgres',
    database: process.env.PG_DATABASE || 'crypto-prices',
    port: parseInt(process.env.PG_PORT || '5432', 10),
    keepAlive: true
  },
  migrations: {
    directory: './src/migrations'
  }
}

