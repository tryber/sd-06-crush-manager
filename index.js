const express = require('express');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const SUCCESS = 200;

app.use(express.json());

const read = async () => {
  const data = await fs.readFileSync('crush.json', 'utf8');
  return JSON.parse(data);
};

const valEmail = (email) => {
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.com$/i;
  return emailRegex.test(email);
};

const valPassword = (password) => {
  if (!password) {
    return false;
  }
  const validate = password.toString();
  return validate.length >= 6;
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (req, res) => {
  const dataCrush = await read();
  res.status(SUCCESS).send(dataCrush);
});

app.get('/crush/:id', async (req, res) => {
  const dataCrush = await read();
  if (dataCrush[req.params.id - 1]) {
    res.status(SUCCESS).json(dataCrush[req.params.id - 1]);
  } else {
    res.status(404).json({ message: 'Crush não encontrado' });
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } else if (!valEmail(email)) {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } else if (!valPassword(password)) {
    res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  if (valEmail(email) && valPassword(password)) {
    const token = crypto.randomBytes(8).toString('hex');
    res.status(SUCCESS).json({ token });
  }
});

app.listen(3000);
