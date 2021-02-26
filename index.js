const express = require('express');
const fs = require('fs');

const app = express();

const useToken = { token: '7mqaVRXJSp886CGr' };

app.use(express.json());

const useAuth = (req, res, next) => {
  const { auth } = req.headers;

  if (!auth) return res.status(401).json({ message: 'Token não encontrado' });
  if (auth !== useToken.token) return res.status(401).json({ message: 'Token inválido' });

  next();
};
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(200).send();
});

const getCrushes = () => JSON.parse(fs.readFileSync('./crush.json', 'utf8'));
const jsonFile = async (content) => fs.writeFileSync('./crush.json', content);

app.get('/crush', (_req, res) => {
  res.status(200).send(getCrushes());
});

app.get('/crush/search', useAuth, (req, res) => {
  const searchText = req.query;
  const allCrushes = getCrushes();
  if (!searchText) res.status(200).json(allCrushes);
  console.log('query', searchText);
  console.log('test');
  const findCrush = allCrushes.filter((crush) => crush.name.includes(searchText));
  res.status(200).json(findCrush);
});

app.get('/crush/:id', (req, res) => {
  const { id } = req.params;
  const reqCrush = getCrushes().find((crush) => crush.id === +id);
  if (!reqCrush) return res.status(404).json({ message: 'Crush não encontrado' });
  res.status(200).json(reqCrush);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!regexEmail.test(email)) return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });

  res.status(200).json(useToken);
});

app.use(useAuth);

const infoValid = (name, age, date) => {
  if (!name) return 'O campo "name" é obrigatório';
  if (name.length < 3) return 'O "name" deve ter pelo menos 3 caracteres';
  if (!age) return 'O campo "age" é obrigatório';
  if (age < 18) return 'O crush deve ser maior de idade';
  if (!date || !date.datedAt || date.rate === undefined) {
    return 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';
  }

  const regexDate = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
  if (date && !regexDate.test(date.datedAt)) return 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"';
  if (date.rate < 1 || date.rate > 5) return 'O campo "rate" deve ser um inteiro de 1 à 5';

  return 'OK';
};

app.post('/crush', async (req, res) => {
  const { name, age, date } = req.body;
  const message = infoValid(name, age, date);

  if (message !== 'OK') {
    return res.status(400).json({ message });
  }

  const allCrushes = getCrushes();
  const freshCrush = { id: allCrushes.length + 1, ...req.body };
  const freshData = allCrushes.concat(freshCrush);
  await jsonFile(JSON.stringify(freshData));
  res.status(201).json(freshCrush);
});

app.put('/crush/:id', async (req, res) => {
  const { name, age, date } = req.body;
  const message = infoValid(name, age, date);
  if (message !== 'OK') {
    return res.status(400).json({ message });
  }

  const { id } = req.params;
  const allCrushes = getCrushes();
  const freshInformation = ({ name, age, id: +id, date });
  allCrushes[id] = freshInformation;
  await jsonFile(JSON.stringify(allCrushes));
  res.status(200).json(freshInformation);
});

app.delete('/crush/:id', async (req, res) => {
  const { id } = req.params;
  const filterAllCrushes = getCrushes().filter((crush) => crush.id !== +id);
  await jsonFile(JSON.stringify(filterAllCrushes));
  res.status(200).json({ message: 'Crush deletado com sucesso' });
});

app.listen(3000, console.log('Servidor funcionando'));
