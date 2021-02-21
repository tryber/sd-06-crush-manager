const express = require('express');

const { checkEmail, characterCount } = require('./useful/verifications');
const tokenGenerator = require('./useful/tokenGenerator');
const resError = require('./useful/resError');

const loginRouter = express.Router();

loginRouter.use((req, res, next) => {
  const { email, password } = req.body;
  const { boolSaida } = resError(res)
    .resError2(
      !email,
      'O campo "email" é obrigatório',
      400,
    )
    .resError2(
      checkEmail(email),
      'O "email" deve ter o formato "email@email.com"',
      400,
    )
    .resError2(
      !password,
      'O campo "password" é obrigatório',
      400,
    )
    .resError2(
      characterCount(password) < 6,
      'A "senha" deve ter pelo menos 6 caracteres',
      400,
    );
  if (boolSaida) return;
  // console.log('token foi feito: passou do return');
  next();
});

loginRouter.post('/', (_req, res) => res.json({ token: tokenGenerator(16) }));

module.exports = loginRouter;
