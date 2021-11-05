const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const fullMessage = require('./utils/welcomeMessage');
const { AppError } = require('./utils/response');

const auth = require('./routes/auth');
const listing = require('./routes/listings');
const inspection = require('./routes/inspections');
const admin = require('./routes/admin');
const errorHandler = require('./utils/error-handler');
// const test = message('http')
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
dotenv.config();
app.use('/api/v1', auth);
app.use('/api/v1', listing);
app.use('/api/v1', admin);
app.use('/api/v1', inspection);
// To catch all unhandled routes
app.get('/', (req, res, next) => res.status(200).send(fullMessage));
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorHandler); // global error handler

module.exports = app;
