const express = require('express');
const crypto = require('crypto');

const loginRouter = express.Router();
const SUCCESS = 200;
const BAD_REQUEST = 400;

loginRouter.post('/login', (req, res) => {
  const { email, password } = req.body;
  const isValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  if (!email) return res.status(BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
  if (!isValidEmail) return res.status(BAD_REQUEST).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  if (!password) return res.status(BAD_REQUEST).json({ message: 'O campo "password" é obrigatório' });
  if (String(password).length < 6) return res.status(BAD_REQUEST).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  res.status(SUCCESS).json({ token: crypto.randomBytes(8).toString('hex') });
});

module.exports = loginRouter;
