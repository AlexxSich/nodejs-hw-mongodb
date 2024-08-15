import express from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';

import {
  registerUserController,
  loginController,
  logoutUserController,
  refreshUserSessionController,
  requestResetEmailController,
  resetPasswordController,
  loginWithGoogleController,
} from '../controllers/auth.js';

import { validateBody } from '../middleware/validateBody.js';

import {
  registerUserSchema,
  loginSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
  loginWithGoogleOAuthSchema,
} from '../validations/auth.js';

import { getGoogleOAuthUrlController } from '../controllers/auth.js';

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

registerRouter.post(
  '/auth/send-reset-email',
  jsonParser,
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

registerRouter.post(
  '/auth/reset-pwd',
  jsonParser,
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

registerRouter.get(
  '/auth/get-oauth-url',
  ctrlWrapper(getGoogleOAuthUrlController),
);
registerRouter.post(
  '/auth/confirm-oauth',
  jsonParser,
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleController),
);

export default registerRouter;
