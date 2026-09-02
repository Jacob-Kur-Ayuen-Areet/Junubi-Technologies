require('dotenv').config({ override: false }); // Docker env vars always take priority
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

async function runMigrations() {
  try {
    logger.info('Running database migrations...');
    await db.migrate.latest();
    logger.info('Migrations completed successfully.');
  } catch (err) {
    logger.error('Migration failed:', { error: err.message });
    process.exit(1);
  }
}

async function runSeeds() {
  try {
    // Only seed if the users table is empty (avoid re-seeding on restart)
    const [{ count }] = await db('users').count('id as count');
    if (parseInt(count) === 0) {
      logger.info('Running database seeds...');
      await db.seed.run();
      logger.info('Seeds completed successfully.');
    } else {
      logger.info('Database already seeded, skipping.');
    }
  } catch (err) {
    logger.warn('Seed step skipped or failed (non-fatal):', { error: err.message });
  }
}

async function start() {
  await waitForDatabase();
  await runMigrations();
  await runSeeds();
  app.listen(PORT, () => {
    logger.info(`Junubi Tech API running on port ${PORT}`, {
      env: process.env.NODE_ENV,
      port: PORT,
    });
  });
}

start();
