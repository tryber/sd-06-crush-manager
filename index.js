const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');
const utils = require('./utils');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = 3000;

app.use(middlewares.logger);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response, next) => {
  response.status(SUCCESS).send();
  next();
});

app.post('/login',
  async (req, res) => {
    const token = await utils.token();
    const { email, senha } = req.body;
    const validator = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const isValid = validator.test(String(email).toLowerCase());
    if (email === '') return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    if (!isValid) return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    if (senha === '') return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    if (senha.length < 6) return res.status(400).json({ message: 'O "password" ter pelo menos 6 caracteres' });
    res.status(200).json({ token });
  });

app.get('/crush',
  async (_req, res) => {
    const file = await utils.readFile();
    res.status(200).json(JSON.parse(file));
  });

app.get('/crush/:id',
  async (req, res) => {
    const { id } = req.params;
    const file = await utils.readFile();
    if (id > 4) res.status(400).json({ message: 'Crush não encontrado' });
    const response = JSON.parse(file).find((people) => people.id === Number(id));
    res.status(200).json(response);
  });

app.use(middlewares.error);

app.listen(PORT, () => {
  console.log(`App rodando na porta ${PORT}`);
});
