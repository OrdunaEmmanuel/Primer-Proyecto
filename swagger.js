// swagger.js
const yaml = require('yamljs');
const swaggerUi = require('swagger-ui-express');

// Load the YAML file
let swaggerDocument = yaml.load('./swagger.yaml');

const apiUrl = process.env.API_URL || 'http://localhost:2000';
swaggerDocument.servers = [{ url: apiUrl, description: 'Servidor de desarrollo' }];

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

module.exports = setupSwagger;
