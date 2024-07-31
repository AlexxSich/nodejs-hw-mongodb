import express from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import {
  registerUserController,
  loginController,
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

export default registerRouter;
