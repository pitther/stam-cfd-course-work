const { updateMap } = require('../db/requests');

module.exports = (fastify) =>
  fastify.route({
    method: 'PUT',
    url: '/map',
    handler: async (request, reply) => {
      // eslint-disable-next-line no-return-await
      const response = await updateMap(request.body.params.map);
      reply.send(response);
    },
  });
