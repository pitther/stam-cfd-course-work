const { v4 } = require('uuid');
const { addMap } = require('../db/requests');

module.exports = (fastify) =>
  fastify.route({
    method: 'POST',
    url: '/mapvxv',
    schema: {
      querystring: {
        id: { type: 'string' },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            map: { type: 'object' },
          },
        },
      },
    },
    handler: async () => {
      const response = await addMap({ kek: 'lol', id: v4() });
      return { response };
    },
  });
