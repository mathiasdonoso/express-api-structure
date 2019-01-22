const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const components = require('./components');

const app = express();

const loggerFormat = ':id [:date[web]] ":method :url" :status :response-time';

app.use(morgan(loggerFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: process.stderr,
}));

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', components);

module.exports = app;
