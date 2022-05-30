const fastify = require('fastify')({ logger: true });

fastify.register(require('@fastify/cors'));

const getMaps = require('./routes/getMaps');
const getMap = require('./routes/getMap');
const addMap = require('./routes/addMap');
const updateMap = require('./routes/updateMap');

require('dotenv-flow');

const PORT = process.env.SERVER_PORT || 5000;

getMaps(fastify);
getMap(fastify);
addMap(fastify);
updateMap(fastify);

const start = async () => {
  try {
    await fastify.listen(PORT);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start().then();
