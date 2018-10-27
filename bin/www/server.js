const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load(path.join(__dirname, './swagger/api.yaml'));
const app = require('./../../app');

const port = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.set('port', port);

app.listen(port);
