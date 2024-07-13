import express from 'express';
import { env } from './utils/env.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.get('/', (req, res) => {
    res.json('Hello world!');
  });

  app.use((req, res, next) => {
    res.status(404).send({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
