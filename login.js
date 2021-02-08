const crypto = require('crypto');

const validateEmail = (email) => {
  const pattern = /\S+@\S+.\S+/;
  return pattern.test(email);
};

const validatePassword = (password) => {
  const pattern = /^.{6,}$/;
  return pattern.test(password);
};

const login = async (request, response) => {
  const { email, password } = request.body;
  if (!email) return response.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (!validateEmail(email)) return response.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  if (!password) return response.status(400).send({ message: 'O campo "password" é obrigatório' });
  if (!validatePassword(password)) return response.status(400).send({ message: 'A "senha" ter pelo menos 6 caracteres' });
  const token = crypto.randomBytes(8).toString('hex');
  response.send({ token });
};

module.exports = login;
