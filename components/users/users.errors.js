const { logger } = require('./../../libraries');

const errorHandler = () => {
  this.handleError = async (err) => {
    await logger.logError(err);
  };
};

module.exports = {
  handler: errorHandler,
};
