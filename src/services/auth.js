import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

import { UserCollection } from '../db/models/user.js';

async function registerUser(user) {
  const maybeUser = await UserCollection.findOne({ email: user.email });

  if (maybeUser !== null) {
    throw createHttpError(409, 'Email in use');
  }

  user.password = await bcrypt.hash(user.password, 10);
  return UserCollection.create(user);
}

async function loginUser(email, password) {
  const maybeUser = await UserCollection.findOne({ email });

  if (maybeUser === null) {
    throw createHttpError(404, 'User not found');
  }

  const isPassMatch = await bcrypt.compare(password, maybeUser.password);

  if (isPassMatch === false) {
    throw createHttpError(401, 'Unauthorize');
  }
}

export { registerUser, loginUser };
