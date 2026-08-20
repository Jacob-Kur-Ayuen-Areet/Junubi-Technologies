require('dotenv').config();
const app = require('./src/app');
const logger = require('./src/config/logger');
const db = require('./src/config/db');

const PORT = process.env.PORT || 4000;
const MAX_RETRIES = 10;
const RETRY_DELAY_MS = 3000;

async function waitForDatabase(retries = MAX_RETRIES) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await db.raw('SELECT 1');
      logger.info('Database connection established successfully.');
      return;
    } catch (err) {
      logger.warn(`Database not ready (attempt ${attempt}/${retries}). Retrying in ${RETRY_DELAY_MS / 1000}s...`, {
        error: err.message,
      });
      if (attempt === retries) {
        logger.error('Could not connect to database after maximum retries. Exiting.');
        process.exit(1);
      }
      await new Promise((res) => setTimeout(res, RETRY_DELAY_MS));
    }
  }
}

async function start() {
  await waitForDatabase();
  app.listen(PORT, () => {
    logger.info(`Junubi Tech API running on port ${PORT}`, {
      env: process.env.NODE_ENV,
      port: PORT,
    });
  });
}

start();
