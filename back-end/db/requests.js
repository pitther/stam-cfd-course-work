const { MongoClient } = require('mongodb');
require('dotenv-flow').config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const url = `mongodb+srv://${username}:${password}@icfd.lwisl.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url);

const dbName = 'ICFD';
const collectionName = 'MAPS';

async function connectCollection() {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  return { collection };
}

async function getAllMaps() {
  const { collection } = await connectCollection();
  return collection.find({}).toArray();
}

async function getMap(findId) {
  const { collection } = await connectCollection();
  return collection.findOne({ id: findId });
}

async function updateMap(map) {
  const { collection } = await connectCollection();
  return collection.updateOne(
    { id: map.id },
    {
      $set: {
        objects: map.objects,
        resolution: map.resolution,
        viscosity: map.viscosity,
        diffuse: map.diffuse,
      },
    },
  );
}

async function addMap(map) {
  const { collection } = await connectCollection();
  return collection.insertOne(map);
}

module.exports = { getAllMaps, getMap, addMap, updateMap };
