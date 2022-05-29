const { v4 } = require('uuid');
const { addMap } = require('../db/requests');

module.exports = (fastify) =>
  fastify.route({
    method: 'POST',
    url: '/map',
    handler: async (request) => {
      const id = v4();
      const response = await addMap({ ...request.body.params.map, id });
      response.id = id;
      return { response };
    },
  });
