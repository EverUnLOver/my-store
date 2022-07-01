require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  dbName: process.env.DB_NAME || 'my_store',
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: process.env.DB_PORT || 5432,
  dbUser: process.env.DB_USER || 'Sebas',
  dbPassword: process.env.DB_PASSWORD || 'admin32|',
}

module.exports = { config }