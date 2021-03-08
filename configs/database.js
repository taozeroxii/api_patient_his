const { Pool, Client } = require('pg') //connect to postgresql
const pgconnection = new Pool({
  host: 'yourhost',
  user: 'user',
  password: 'password',
  database: 'database',
  charset:'utf8',
  port: 5432
});

module.exports = pgconnection;
