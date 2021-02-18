const express = require('express');
const bodyParser = require('body-parser');
const readFile = require('./manageFiles');
const geraToken = require('./generateToken');

const app = express();
const SUCCESS = 200;
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (req, res) => {
  const result = await readFile();
  if (result === []) return res.status(200).json('[]');
  res.status(200).send(result);
});

app.get('/crush/:id', async (req, res) => {
  const { id } = req.params;
  const result = await readFile();
  const filteredID = result.find((crush) => crush.id === parseInt(id, 10));
  if (filteredID === undefined) return res.status(404).send({ message: 'Crush não encontrado' });
  res.status(200).send(filteredID);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === '' || !email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });

  const emailMask = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (emailMask.test(email) === false) return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });

  if (password === '' || !password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });

  const token = geraToken();
  res.status(200).json({ token });
});

app.listen(PORT, () => console.log('Server rolando na porta %s', PORT));
