const { getAllMaps } = require('../db/requests');

module.exports = (fastify) =>
  fastify.route({
    method: 'GET',
    url: '/maps',
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            maps: { type: 'array' },
          },
        },
      },
    },
    handler: async () => {
      const maps = await getAllMaps();
      return { maps };
    },
  });
