const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ticket Order System API',
      version: '1.0.0',
    },
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            username: {
              type: 'string',
              example: 'JohnDoe',
            },
            email: {
              type: 'string',
              example: 'johndoe@example.com',
            },
            password: {
              type: 'string',
              example: 'password123',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              example: '2023-10-01T12:00:00Z',
            },
          },
        },
        Event: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            event_name: {
              type: 'string',
              example: 'Concert',
            },
            event_start: {
              type: 'string',
              format: 'date',
              example: '2023-10-01',
            },
            event_end: {
              type: 'string',
              format: 'date',
              example: '2023-10-01',
            },
            status: {
              type: 'string',
              example: 'active',
            },
            description: {
              type: 'string',
              example: 'A great concert event.',
            },
            seller_id: {
              type: 'integer',
              example: 1,
            },
          },
        },
        Ticket: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            event_id: {
              type: 'integer',
              example: 1,
            },
            ticket_name: {
              type: 'string',
              example: 'VIP Ticket',
            },
            ticket_start: {
              type: 'string',
              format: 'date',
              example: '2023-10-01',
            },
            ticket_end: {
              type: 'string',
              format: 'date',
              example: '2023-10-02',
            },
            price: {
              type: 'number',
              format: 'float',
              example: 99.99,
            },
            status: {
              type: 'string',
              example: 'available',
            },
            quantity: {
              type: 'integer',
              example: 100,
            },
            description: {
              type: 'string',
              example: 'VIP access to the concert.',
            },
            image_path: {
              type: 'string',
              example: '/images/vip_ticket.png',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};