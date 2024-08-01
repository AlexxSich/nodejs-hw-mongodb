import express from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';

import {
  registerUserController,
  loginController,
  logoutUserController,
  refreshUserSessionController,
} from '../controllers/auth.js';

import { validateBody } from '../middleware/validateBody.js';
import { registerUserSchema } from '../validations/auth.js';
import { loginSchema } from '../validations/auth.js';

const registerRouter = express.Router();
const jsonParser = express.json();

registerRouter.post(
  '/auth/register',
  jsonParser,
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

registerRouter.post(
  '/auth/login',
  jsonParser,
  validateBody(loginSchema),
  ctrlWrapper(loginController),
);

registerRouter.post('/auth/logout', ctrlWrapper(logoutUserController));

registerRouter.post('/auth/refresh', ctrlWrapper(refreshUserSessionController));

export default registerRouter;
