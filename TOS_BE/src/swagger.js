const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');

// Load options from JSON file
const optionsPath = path.join(__dirname, './api.json');
const options = JSON.parse(fs.readFileSync(optionsPath, 'utf8'));

const specs = swaggerJsdoc({ definition: options, apis: ['./src/routes/*.js'] });

module.exports = {
  swaggerUi,
  specs,
};