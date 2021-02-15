const express = require('express');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
app.use(express.json());

// ?
const SUCCESS = 200;

// Necessário para o avaliador
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// Requisito 1
app.get('/crush', async (req, res) => {
  if (res.statusCode === SUCCESS) {
    res.send(JSON.parse(fs.readFileSync('./crush.json')));
  }
});

// Requisito 2
app.get('/crush/:id', async (req, res) => {
  const { id: paramID } = req.params;
  const file = await fs.readFileSync('./crush.json');
  const checkIfTheUserExists = file.some((id) => id === Number(paramID));

  if (!checkIfTheUserExists) res.status(404).json({ message: 'Crush não encontrado' });

  const response = JSON.parse(file).find((people) => people.id === Number(paramID));
  res.status(200).json(response);
});

// Requisito 3
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const emailFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;

  if (!email || email === '') {
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

  res.status(200).json({ token: crypto.randomBytes(8).toString('hex') });
});

// Requisito 4
app.post('/crush', async (req, res) => {
  const { token } = req.headers;

  const file = await (fs.readFileSync('./crush.json', 'utf-8'));
  const newID = file.length + 1;

  const newCrush = { ...req.body, id: newID };

  const { name, age, date } = newCrush;

  const dateFormat = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  }

  if (!date || date.datedAt === '' || date.rate === '' || date === undefined || date.datedAt === undefined || date.rate === undefined) {
    return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }

  if (!dateFormat.test(date.datedAt)) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  if (date.rate < 1 || date.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  file.concat(newCrush);

  fs.writeFile('crush.json', JSON.stringify(file), (err, data) => {
    if (err) {
      return console.log(err);
    }
    res.status(201).json(data);
  });
});

// Requisito 5

app.listen(3000, () => {
  console.log('ouvindo a porta 3000');
});
