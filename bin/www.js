const cluster = require('cluster');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const numCPUs = require('os').cpus().length;
const app = require('./../app');
const { logger } = require('./../lib/logger');
const { MONGODB_URI } = require('./../config/secrets');

dotenv.config();

if (cluster.isMaster) {
  logger.info('Starting components...');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    logger.log(`worker ${worker.process.pid} died`);
  });
} else {
  const port = process.env.PORT || 3000;

  app.set('port', port);

  app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({
      error: err,
    });
  });

  const mongoUrl = MONGODB_URI;

  mongoose.set('useCreateIndex', true);

  mongoose.connect(mongoUrl, { useNewUrlParser: true })
    .then(() => app.listen(port))
    .catch(err => logger.error('MongoDB connection error.', err));
}
