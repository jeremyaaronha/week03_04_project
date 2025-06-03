// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library System API',
      version: '1.0.0',
      description: 'API for managing books and authors',
    },
    servers: [
      {
        url: 'https://week03-04-project.onrender.com',
      }
    ],
    components: {   
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'connect.sid', 
        },
      },
    },
    security: [     
      {
        cookieAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };