const express = require('express');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const api = require('./api');
const { colorfulLog } = require('./lib/logger');

const app = express();

app.use(morgan(colorfulLog, {
  stream: process.stderr,
}));

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '200kb' }));
app.use(expressValidator());
app.use('/api', api);

module.exports = app;
