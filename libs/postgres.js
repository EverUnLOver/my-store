const { Client  } = require('pg');

async function getConnection() {
  const client = new Client({
    user: 'Sebas',
    host: 'localhost',
    database: 'my_store',
    password: 'admin32|',
    port: 5432,
  });
  await client.connect();
  return client;
}

module.exports = getConnection;
