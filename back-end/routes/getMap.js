const { getMap } = require('../db/requests');

module.exports = (fastify) =>
  fastify.route({
    method: 'GET',
    url: '/map',
    handler: async (request, reply) => {
      const map = await getMap(request?.query?.id);
      reply.send({ map });
    },
  });
