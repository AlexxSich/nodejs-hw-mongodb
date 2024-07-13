import mongoose from 'mongoose';

import { env } from '../utils/env.js';

export const initMongoConnection = async () => {
  try {
    const user = env('MONGODB_USER', 'alexxsich');
    const pwd = env('MONGODB_PASSWORD', '9Hg3OJ8kPwvlxM8e');
    const url = env('MONGODB_URL', 'cluster0.qguctbw.mongodb.net');
    const db = env('MONGODB_DB', 'contacts');

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`,
    );

    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log('Error while setting up mongo connection', error);
    throw error;
  }
};
