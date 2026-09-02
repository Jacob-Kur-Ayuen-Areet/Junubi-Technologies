require('dotenv').config();
const path = require('path');
const knex = require('knex');

const db = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'junubi_tech',
  },
  pool: { min: 2, max: 10 },
  migrations: {
    directory: path.join(__dirname, '../../migrations'),
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: path.join(__dirname, '../../seeds'),
  },
});

module.exports = db;
