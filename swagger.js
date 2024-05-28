// swagger.js
const yaml = require('yamljs');
const swaggerUi = require('swagger-ui-express');

// Load the YAML file
const swaggerDocument = yaml.load('./swagger.yaml');

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

module.exports = setupSwagger;
