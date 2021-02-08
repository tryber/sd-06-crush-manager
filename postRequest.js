const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { validateEmail, validatePassword } = require('./utils/validateUsers');

app.use(bodyParser.json());

async function handleLogin(request, response, next) {
  const { email, password } = request.body;
  const emailIsValid = validateEmail(email);
  const passwordIsValid = validatePassword(password);
  if (emailIsValid && passwordIsValid) {
    const token = crypto.randomBytes(16).toString('hex');
    response.status(200).json({ token });
  }
  if (emailIsValid === undefined) return next({ message: 'O campo email é obrigatório', statusCode: 400 });
  if (!emailIsValid) return next({ message: 'O email deve ter o formato email@email.com', statusCode: 400 });
  if (passwordIsValid === undefined) return next({ message: 'O campo password é obrigatório', statusCode: 400 });
  if (!passwordIsValid) return next({ message: 'A senha deve ter pelo menos 6 caracteres', statusCode: 400 });
}

module.exports = {
  handleLogin,
};
