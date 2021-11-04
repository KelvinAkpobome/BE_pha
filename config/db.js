const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const logger = require('../utils/logger');
// load config
dotenv.config();

const DB_URL = process.env.NODE_ENV === 'development' || 'test'
  ? process.env.DB_DEV_URI
  : process.env.DB_LIVE_URI;

const client = new MongoClient(DB_URL);
// //connect to Mongo
exports.connectDB = async () => {
  try {
    await client.connect();

    console.log('mongoDB Connected');
  } catch(err) {
    logger.error(err.message);
  }
};

exports.db = client.db();
