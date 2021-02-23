const express = require('express');
const fs = require('fs');
const authentication = require('./middlewares/authentication');
// so pra testar
const app = express();
const port = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, res) => {
  res.status(200).send();
});

const getAllCrushes = () => JSON.parse(fs.readFileSync('./crush.json', 'utf8'));
const writeFile = async (content) => fs.writeFileSync('./crush.json', content);

app.get('/crush', (req, res) => {
  res.status(200).send(getAllCrushes());
});

app.get('/crush/search', authentication, (req, res) => {
  const searchText = req.query.q;
  const crushes = getAllCrushes();
  if (!searchText) res.status(200).json(crushes);
  console.log('query', searchText);
  console.log('test');
  const crushFound = crushes.filter((crush) => crush.name.includes(searchText));
  res.status(200).json(crushFound);
});

app.get('/crush/:id', (req, res) => {
  const { id } = req.params;
  const crushRequired = getAllCrushes().find((crush) => crush.id === +id);
  res.status(200).json(crushRequired);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const emailFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!emailFormat.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }

  res.status(200).json(authentication);
});

app.use(authentication);

const validateCrushInformation = (name, age, date) => {
  if (!name) return 'O campo "name" é obrigatório';
  if (name.length < 3) return 'O "name" deve ter pelo menos 3 caracteres';
  if (!age) return 'O campo "age" é obrigatório';
  if (age < 18) return 'O crush deve ser maior de idade';
  if (!date || !date.datedAt || date.rate === undefined) {
    return 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';
  }

  const validateDate = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
  if (date && !validateDate.test(date.datedAt)) {
    return 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"';
  }

  if (date.rate < 1 || date.rate > 5) return 'O campo "rate" deve ser um inteiro de 1 à 5';

  return 'OK';
};

app.post('/crush', async (req, res) => {
  const { name, age, date } = req.body;
  const message = validateCrushInformation(name, age, date);

  if (message !== 'OK') {
    return res.status(400).json({ message });
  }

  const crushes = getAllCrushes();
  const newCrush = { id: crushes.length + 1, ...req.body };
  const newCrushData = crushes.concat(newCrush);

  await writeFile(JSON.stringify(newCrushData));

  res.status(201).json(newCrush);
});

app.put('/crush/:id', async (req, res) => {
  const { name, age, date } = req.body;
  const message = validateCrushInformation(name, age, date);
  if (message !== 'OK') {
    return res.status(400).json({ message });
  }

  const { id } = req.params;
  const crushes = getAllCrushes();
  const crushNewInfo = ({ name, age, id: +id, date });
  crushes[id] = crushNewInfo;
  await writeFile(JSON.stringify(crushes));

  res.status(200).json(crushNewInfo);
});

app.delete('/crush/:id', async (req, res) => {
  const { id } = req.params;
  const filteredCrushes = getAllCrushes().filter((crush) => crush.id !== +id);

  await writeFile(JSON.stringify(filteredCrushes));

  res.status(200).json({ message: 'Crush deletado com sucesso' });
});

app.listen(port, console.log(`Servidor rodando na porta ${port}`));
