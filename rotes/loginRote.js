const express = require('express');

const router = express.Router();

const { checkEmail, checkPassword, createToken } = require('../functions/verifyLogin');

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const emailCheck = checkEmail(email);
  const passwordCheck = checkPassword(password);

  if (emailCheck === 'null') return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (emailCheck === 'regex') return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  if (passwordCheck === 'null') return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  if (passwordCheck === 'length') return res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });

  const token = createToken();

  res.status(200).send({ token });
});

module.exports = router;
