const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

pool.on('connect', () => {
  console.log('✅ Connected to the PostgreSQL database');
});

// REFACTOR: Add Error Listener
pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
  process.exit(-1); // Exit app so Docker/Process Manager can restart it
});

module.exports = pool;
