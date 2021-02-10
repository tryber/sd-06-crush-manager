const express = require('express');
const bodyParser = require('body-parser');
const utils = require('../utils');

const app = express();
app.use(bodyParser.json());

module.exports = async (req, res) => {
  const token = await utils.token();
  const { email, password } = req.body;
  const validator = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const isValid = validator.test(String(email).toLowerCase());
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!isValid) return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  return res.status(200).json({ token });
};
