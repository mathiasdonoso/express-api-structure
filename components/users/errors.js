const { logger } = require('../../lib/logger');

const errorHandler = () => {
  this.handleError = (err) => {
    logger.logError(err);
  };
};

module.exports = {
  handler: errorHandler,
};
