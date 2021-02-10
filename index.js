const express = require('express');
const fs = require('fs').promises;
const crypto = require('crypto');
const { isEmail, isSize } = require('./utils');

const app = express();
const SUCCESS = 200;
const port = 3000;
const crushArray = 'crush.json';
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// Requisito -1 obs: '_' p/ quando um parãmetro não é usado
// res com todos os crushs cadastrados ou um array vazio e o status 200;
app.get('/crush', async (_req, res) => {
  const crushes = await fs.readFile(crushArray);
  if (!crushes) {
    return res.status(200).json([]);
  }
  return res.status(200).json(JSON.parse(crushes));
});

// Requisito-2 obs: id da url vem formato string, por isso o Number(id)
// res com o crush doo id da rota ou { "message": "Crush não encontrado" } e o status 404;
app.get('/crush/:id', async (req, res) => {
  const crushes = await fs.readFile(crushArray);
  const crushesJson = JSON.parse(crushes);
  const { id } = req.params;
  const crush = crushesJson.find((crushJson) => crushJson.id === Number(id));
  if (!crush) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  return res.status(200).json(crush);
});

// Requisito-3
// res deve retornar um token aleatório de 16 caracteres, email válido e
//  password deverá ter pelo menos 6 caracteres;
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!isEmail(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (isSize(password) < 6) {
    return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  // Zambelli plantão 10/02
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token });
});
app.listen(3000, () => console.log(`Using port: ${port}`));
