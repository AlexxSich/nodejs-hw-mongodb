import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserSession,
  resetPassword,
} from '../services/auth.js';
import { ONE_MONTH } from '../constants/index.js';
import createHttpError from 'http-errors';
import { isHttpError } from 'http-errors';
import { requestResetToken } from '../services/auth.js';

import { generateAuthUrl } from '../utils/googleOAuth2.js';
import { loginOrSignupWithGoogle } from '../services/auth.js';

async function registerUserController(req, res) {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const registredUser = await registerUser(user);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered an user!',
    data: registredUser,
  });
}

async function loginController(req, res) {
  const session = await loginUser(req.body);
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_MONTH),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_MONTH),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user',
    data: {
      accessToken: session.accessToken,
    },
  });
}

const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_MONTH),
  });

  res.cookie('sessionId', session._id, {
    httpOnlyL: true,
    expires: new Date(Date.now() + ONE_MONTH),
  });
};

const refreshUserSessionController = async (req, res) => {
  const session = await refreshUserSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

const requestResetEmailController = async (req, res) => {
  try {
    await requestResetToken(req.body.email);
    res.json({
      message: 'Reset password email was successfully sent',
      status: 200,
      data: {},
    });
  } catch (error) {
    if (isHttpError(error) === true) {
      res
        .status(error.status)
        .send({ status: error.status, message: error.message });
    } else {
      throw createHttpError(
        500,
        'Failed to send the email, please try again later.',
      );
    }
  }
};

async function resetPasswordController(req, res, next) {
  await resetPassword(req.body);

  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
}

// ==================================

export const getGoogleOAuthUrlController = async (req, res) => {
  const url = generateAuthUrl();
  res.json({
    status: 200,
    message: 'Successfully get Google OAuth url!',
    data: {
      url,
    },
  });
};

export const loginWithGoogleController = async (req, res) => {
  const session = await loginOrSignupWithGoogle(req.body.code);
  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in via Google OAuth!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

// =================================

export {
  registerUserController,
  loginController,
  logoutUserController,
  refreshUserSessionController,
  requestResetEmailController,
  resetPasswordController,
};
