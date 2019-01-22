const { logger } = require('./../../lib/logger');

const hello = (req, res) => {
  logger.info('Hello function');
  res.status(200).json({
    message: 'Hello world',
  });
};

module.exports = {
  hello,
};
