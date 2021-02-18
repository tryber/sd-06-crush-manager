const express = require('express');

const { checkEmail, characterCount } = require('./useful/verifications');
const tokenGenerator = require('./useful/tokenGenerator');
const resError = require('./useful/resError');

const loginRouter = express.Router();

loginRouter.use((req, res, next) => {
  const { email, password } = req.body;
  const boolError = resError(
    !email,
    res,
    'O campo "email" é obrigatório',
    400,
  )
  && resError(
    checkEmail(email),
    res,
    'O "email" deve ter o formato "email@email.com"',
    400,
  )
  && resError(
    !password,
    res,
    'O campo "password" é obrigatório',
    400,
  )
  && resError(
    characterCount(password) < 6,
    res,
    'A "senha" deve ter pelo menos 6 caracteres',
    400,
  );
  if (!boolError) return;
  next();
});

loginRouter.post('/', (_req, res) => res.json({ token: tokenGenerator(16) }));

module.exports = loginRouter;
