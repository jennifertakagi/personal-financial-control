const express = require('express');
const cors = require('cors');
const winston = require('winston');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const { combine, timestamp, label, printf } = winston.format;
const formatter = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: 'silly',
  format: combine(
      label({ label: 'grade-control.log'}),
      timestamp(),
      formatter
  ),
  transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'grades-control.log' }),
  ]
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/', (_, response) => {
  response.send({
    message: 'Welcome to Personal Financial Control API!'
  })
})

app.use('/api/transaction', routes);

const { DB_CONNECTION } = process.env;

logger.info('Starting the MongoDB connection');
mongoose.connect(
  DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      connectedToMongoDB = false;
      logger.error(`Error connecting to MongoDB - ${error}`);
    }
  }
);

const { connection } = mongoose;

connection.once('open', () => {
  connectedToMongoDB = true;
  logger.info('Connected to MongoDB!');

  const APP_PORT = process.env.PORT || 3001;
  app.listen(APP_PORT, () => {
    try {
      logger.info('API started');
    } catch(error) {
      logger.error(error);
    }
  });
});
