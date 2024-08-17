import pino from 'pino-http';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import registerRouter from './routers/auth.js';
import { UPLOAD_DIR } from './constants/index.js';

import { swaggerDocs } from './middleware/swaggerDocs.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use('/api-docs', swaggerDocs());

  app.use(cookieParser());
  app.use(registerRouter);
  app.use(contactsRouter);

  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.use('/uploads', express.static(UPLOAD_DIR));

  // ================

  // app.use('/api-docs', swaggerDocs());

  // ================

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
