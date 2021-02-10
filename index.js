const express = require('express');
const fs = require('fs');
// const util = require('util');
// const bodyParser = require('body-parser');

const app = express();
const SUCCESS = 200;

// app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(express.json());

const verifyToken = ((request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization) return response.status(401).send({ message: 'Token não encontrado' });
  if (authorization !== '7mqaVRXJSp886CGr') return response.status(401).send({ message: 'Token inválido' });
  next();
});

// não remova esse endpoint, e para o avaliador funcionar

app.get('/crush', (_request, response) => {
  const readData = fs.readFileSync('/.crush.json', 'utf-8');
  if (readData) {
    const dataJson = JSON.parse(readData);
    return response.status(200).send(dataJson);
  }
  return response.status(200).json([]);
});

app.get('/crush/:id', (request, response) => {
  const id = parseInt(request.params.id, 10);
  const readData = fs.readFileSync('crush.json');
  const dataJson = JSON.parse(readData);
  const dataFiltered = dataJson.filter((item) => item.id === id);
  if (dataFiltered.length === 0) {
    return response.status(404).send({ message: 'Crush não encontrado' });
  }
  return response.status(200).send(dataFiltered);
});

app.post('/login', (request, response) => {
  const { email, password } = request.body;
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  if (!email) return response.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (!(emailRegex.test(email))) return response.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  if (!password) return response.status(400).send({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) return response.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  const token = '7mqaVRXJSp886CGr';
  return response.status(200).send({ token });
});

const verifyCrush = (request, response, next) => {
  const { name, age, date } = request.body;
  if (!name || name === '') return response.status(400).send({ message: 'O campo "name" é obrigatório' });

  if (name.length < 3) return response.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });

  if (!age || age === '') return response.status(400).send({ message: 'O campo "age" é obrigatório' });
  if (age < 18) return response.status(400).send({ message: 'O crush deve ser maior de idade' });

  if (!date || !date.datedAt || (!date.rate && date.rate !== 0)) return response.status(400).send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  if (!((/^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/).test(date.datedAt))) return response.status(400).send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });

  if (date.rate < 1 || date.rate > 5) return response.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });

  next();
};

app.post('/crush', verifyToken, verifyCrush, async (request, response) => {
  const readData = fs.readFileSync('crush.json');
  const dataJson = await JSON.parse(readData);
  const newCrush = { id: dataJson.length + 1, ...request.body };
  dataJson.push(newCrush);
  fs.writeFileSync('./crush.json', JSON.stringify(dataJson));
  return response.status(201).send(newCrush);
});

app.put('/crush/:id', verifyToken, verifyCrush, async (request, response) => {
  const id = parseInt(request.params.id, 10);
  const readData = fs.readFileSync('crush.json');
  const dataJson = JSON.parse(readData);
  const newData = dataJson.filter((item) => item.id !== id);
  const itemModified = { id, ...request.body };
  newData.push(itemModified);
  fs.writeFileSync('./crush.json', JSON.stringify(newData));
  return response.status(200).send(itemModified);
});

app.delete('/crush/:id', verifyToken, (request, response) => {
  const id = parseInt(request.params.id, 10);

  const readData = fs.readFileSync('crush.send');
  const dataJson = JSON.parse(readData);
  const newData = dataJson.filter((item) => item.id !== id);
  fs.writeFileSync('./crush.json', JSON.stringify(newData));
  return response.status(200).send({ message: 'Crush deletado com sucesso' });
});

app.listen(3000);
