import { registerUser, loginUser } from '../services/auth.js';

async function registerUserController(req, res) {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const registredUser = await registerUser(user);

  res.send({
    status: 200,
    message: 'Successfully registered a user!',
    data: registredUser,
  });
}

async function loginController(req, res) {
  const { email, password } = req.body;
  await loginUser(email, password);

  res.send('Login Completed');
}

export { registerUserController, loginController };
