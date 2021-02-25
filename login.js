// const fs = require('fs').promises;

const login = async (req, res) => {
  const { email = 0, password = 0 } = req.body;
  const emailRegEx = /^[^\s@;*&%^="!?#+]+@[^\s@;*&%^="!?#+]+\.[^\s@;*&%^="!?#+]+$/;
  const emailIsValid = emailRegEx.test(email);
  const passwordIsValid = password.length >= 6;

  if (!email) return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (!password) return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  if (!emailIsValid) return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  if (!passwordIsValid) return res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });

  return res.status(200).send({ token: '7mqaVRXJSp886CGr' });
};

module.exports = { login };
