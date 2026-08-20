require('dotenv').config();
const app = require('./src/app');
const logger = require('./src/config/logger');

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  logger.info(`Junubi Tech API running on port ${PORT}`, {
    env: process.env.NODE_ENV,
    port: PORT,
  });
});
