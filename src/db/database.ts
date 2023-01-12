import mongoose from 'mongoose';

import { config } from '../config';
import { logger } from '../logger';

async function connect() {
  logger.info('Attempting to connect to database');

  mongoose.set('strictQuery', false);
  await mongoose.connect(config.mongodbURI);

  logger.info('Connected to database successfully');
}

async function disconnect() {
  logger.info('Attempting to disconnect from database');
  await mongoose.connection.close();
  logger.info('Disconnected from database');
}

export const database = { connect, disconnect };
