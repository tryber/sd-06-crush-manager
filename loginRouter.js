const express = require('express');
const crypto = require('crypto');

const { checkEmail } = require('./useful/verifications');

const loginRouter = express.Router();

loginRouter.use((req, res, next) => {
  const { email, password } = req.body;
  if (!email) return res.json({ message: 'O campo "email" é obrigatório' });
  if (checkEmail(email)) return res.json({ message: 'O "email" deve ter o formato "email@email.com"' });
  if (!password) return res.json({ message: 'O campo "password" é obrigatório' });
  const passwordString = password.toString();
  // console.log(passwordString.length);
  if (passwordString.length < 6) return res.json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  next();
});

loginRouter.post('/', (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.json({ token });
});

module.exports = loginRouter;
