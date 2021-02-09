const express = require('express');

const { checkEmail } = require('./useful/verifications');
const tokenGenerator = require('./useful/tokenGenerator');

const loginRouter = express.Router();

loginRouter.use((req, res, next) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (checkEmail(email)) return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  const passwordString = password.toString();
  if (passwordString.length < 6) return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  next();
});

loginRouter.post('/', (_req, res) => res.json({ token: tokenGenerator(16) }));

module.exports = loginRouter;
