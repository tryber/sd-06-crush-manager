const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { validateEmail, validatePassword } = require('./utils/validateUsers');

app.use(bodyParser.json());

async function handleLogin(request, response) {
  const { email, password } = request.body;
  const emailIsValid = validateEmail(email);
  const passwordIsValid = validatePassword(password);
  if (emailIsValid && passwordIsValid) {
    const token = crypto.randomBytes(16).toString('hex');
    response.status(200).send(token);
  }
}

module.exports = {
  handleLogin,
};
