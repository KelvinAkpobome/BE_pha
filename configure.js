const dotenv = require('dotenv');
const express = require('express');

const auth = require('./routes/auth');
const listing = require('./routes/listings');
const inspection = require('./routes/inspections');
const admin = require('./routes/admin');
const errorHandler = require('./utils/error-handler');
const cors = require('cors');

const app = express();

// load environment config vars
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if (process.env.NODE_ENV === 'production') {
  app.use(cors({ origin: ['*'] }));
} else {
  const whitelist = ['http://localhost:9000', 'http://localhost:4000'];
  const corsOptions = {
    origin(origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };
  app.use(cors(corsOptions));
}
dotenv.config()
app.use('/api/v1', auth);
app.use('/api/v1', listing);
app.use('/api/v1', admin);
app.use('/api/v1', inspection);
// To catch all unhandled routes
app.get('/', (req, res, next) => res.status(200).send('Welcome to PHA API, lets improve your search'));
app.all('*', (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} on this server!`));
});
app.use(errorHandler); // global error handler

module.exports = app;
