/* eslint-disable no-nested-ternary */
const chalk = require('chalk');
const path = require('path');
const winston = require('winston');

const { padLeft, padRight } = require('./utils');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: './logs/file.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

const logServerConfig = () => {
  const url = ['http://', process.env.HOST, ':', process.env.PORT].join('');

  logger.info(chalk.red('=========================================='));
  logger.info(`${chalk.blue('Environment:')} ${process.env.NODE_ENV}`);
  logger.info(`${chalk.blue('Listening at:')} ${url}`);
  logger.info(`${chalk.blue('Directory:')} ${path.resolve('src')}`);
  logger.info(chalk.red('=========================================='));
};

const colorfulLog = (tokens, req, res) => {
  const status = tokens.status(req, res);
  const statusColor = status >= 500
    ? 'red'
    : status >= 400
      ? 'yellow'
      : status >= 300
        ? 'cyan'
        : 'green';

  const log = `${chalk.reset.white(
    padRight(`${tokens.method(req, res)} ${tokens.url(req, res)}`, 30),
  )} ${chalk[statusColor](status)} ${
    chalk.reset.blue(padLeft(`${tokens['response-time'](req, res)} ms`, 8))
  } ${chalk.reset('-')} ${
    chalk.reset.yellow(tokens.res(req, res, 'content-length') || '-')}`;
  return log;
};

module.exports = {
  logger, logServerConfig, colorfulLog,
};
