const routes = require('express').Router();
const crypto = require('crypto');
const { readFile } = require('../utils/fileFunctions');
const { validateEmail, validatePassword } = require('../utils/loginFunctions');

routes.get('/crush/:id', async (req, res) => {
  const crushId = parseInt(req.params.id, 10);
  const fullFile = await readFile('crush');
  const idFile = JSON.parse(fullFile).find((crush) => crush.id === crushId);
  if (idFile === undefined) res.status(404).json({ message: 'Crush não encontrado' });
  res.status(200).json(idFile);
});

routes.get('/crush', async (req, res) => {
  const file = await readFile('crush');
  res.status(200).json(JSON.parse(file));
});

const validatingEmail = (err, req, res, next) => {
  const { email } = req.body;
  const emailValidation = email && email !== '' ? validateEmail(email) : '';
  if (emailValidation === '' || emailValidation === undefined) res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (emailValidation === false) res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  next();
};

const validatingPassword = (req, res, next) => {
  const { password } = req.body;
  const passwordValidation = password && password !== '' ? validatePassword(password) : '';
  if (passwordValidation === '' || passwordValidation === undefined) res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (passwordValidation === false) res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  next();
};

routes.post('/login', validatingEmail, validatingPassword, (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).send({ token });
});

module.exports = routes;
