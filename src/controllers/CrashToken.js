const express = require('express');
const cryptoRandomString = require('crypto-random-string');

// const crushs = '../../crush.json';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const token = cryptoRandomString({ length: 16 });
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (!email) {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }
  if (!regex.test(email.toLowerCase())) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
  if (String(password).length < 6) {
    return res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }

  return res.status(200).send({ token });
});

module.exports = router;
