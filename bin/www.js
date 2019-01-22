const dotenv = require('dotenv');
const app = require('./../app');
const { logServerConfig } = require('./../lib/logger');

dotenv.config();

const port = process.env.PORT || 3000;

app.set('port', port);

app.listen(port, () => logServerConfig());
