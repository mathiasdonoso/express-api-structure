const dotenv = require('dotenv');
const fs = require('fs');
const { logger } = require('./../lib/logger.js');

if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' });
} else {
  logger.debug('Using .env.example file to supply config environment variables');
  dotenv.config({ path: '.env.example' });
}

const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === 'production';

// eslint-disable-next-line prefer-destructuring
const SESSION_SECRET = process.env.SESSION_SECRET;
const MONGODB_URI = prod ? process.env.MONGODB_URI : process.env.MONGODB_URI_LOCAL;

if (!SESSION_SECRET) {
  logger.error('No client secret. Set SESSION_SECRET environment variable.');
  process.exit(1);
}

if (!MONGODB_URI) {
  logger.error('No mongo connection string. Set MONGODB_URI environment variable.');
  process.exit(1);
}

module.exports = {
  ENVIRONMENT,
  SESSION_SECRET,
  MONGODB_URI,
};
