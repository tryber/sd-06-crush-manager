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

routes.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const token = crypto.randomBytes(8).toString('hex');
  const emailValidation = email && email !== '' ? validateEmail(email) : '';
  const passwordValidation = password && password !== '' ? validatePassword(password) : '';
  if (emailValidation === '' || emailValidation === undefined) res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (passwordValidation === '' || passwordValidation === undefined) res.status(400).json({ message: 'O campo "password  " é obrigatório' });
  if (emailValidation === false) res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com' });
  if (passwordValidation === false) res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  res.status(200).send({ emailValidation, passwordValidation, token });
});

module.exports = routes;
