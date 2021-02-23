const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// Requisito 1

const readFile = (file) => new Promise((resolve, reject) => {
  fs.readFile(file, 'utf-8', (err, content) => {
    if (err) return reject(err);
    resolve(JSON.parse(content));
  });
});

app.get('/crush', async (req, res) => {
  const file = await readFile(path.join(__dirname, '.', 'crush.json'));
  // console.log(file);
  if (file.length === 0) return res.status(200).send([]);
  return res.status(200).json(file);
});

// Requisito 7

const validateToken = (auth) => {
  if (!auth) return 'Token não encontrado';
  if (auth.length < 16) return 'Token inválido';
  return false;
};

app.get('/crush/search', async (req, res) => {
  const auth = req.headers.authorization;
  const token = validateToken(auth);
  if (token) return res.status(401).json({ message: token });
  const { q } = req.query;
  const data = await readFile(path.join(__dirname, '.', 'crush.json'));
  if (!q) return res.status(200).json(data);
  const result = data.filter((crush) => crush.name.includes(q));
  // console.log(result);
  if (result.length === 0) return res.status(200).send([]);
  res.status(200).send(result);
});

// Requisito 2

app.get('/crush/:id', async (req, res) => {
  const file = await readFile(path.join(__dirname, '.', 'crush.json'));
  const { id } = req.params;
  const result = file.filter((el) => el.id === +id)[0];
  if (!result) return res.status(404).json({ message: 'Crush não encontrado' });
  return res.status(200).send(result);
});

// Requisito 3

const isValid = (email, password) => {
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
  if (!email) return 'O campo "email" é obrigatório';
  if (!regexEmail.test(email)) return 'O "email" deve ter o formato "email@email.com"';
  if (!password) return 'O campo "password" é obrigatório';
  if (password.length < 6) return 'A "senha" deve ter pelo menos 6 caracteres';
  return false;
};

app.post('/login', (req, res) => {
  const randomToken = crypto.randomBytes(8).toString('hex');
  const { email, password } = req.body;
  const result = isValid(email, password);
  if (result) return res.status(400).json({ message: result });
  return res.status(200).json({ token: randomToken });
});

// Requisito 4

const addNewCrush = async (content) => {
  fs.writeFile(path.resolve(__dirname, '.', 'crush.json'), JSON.stringify(content), (err) => {
    if (err) throw err;
    return JSON.stringify(content);
  });
};

const validateData = (name, age, date) => {
  const regexDate = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
  if (!name) return 'O campo "name" é obrigatório';
  if (name.length < 3) return 'O "name" deve ter pelo menos 3 caracteres';
  if (!age) return 'O campo "age" é obrigatório';
  if (age < 18) return 'O crush deve ser maior de idade';
  if (!date || date === '' || !date.datedAt || date.rate === undefined) return 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';
  if (!regexDate.test(date.datedAt) && date.datedAt.length) return 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"';
  if (!Number.isInteger(date.rate) || date.rate > 5 || date.rate < 1) return 'O campo "rate" deve ser um inteiro de 1 à 5';
  return false;
};

app.post('/crush', async (req, res) => {
  const auth = req.headers.authorization;
  const resultToken = validateToken(auth);
  if (resultToken) return res.status(401).json({ message: resultToken });
  const { name, age, date } = req.body;
  const resultData = validateData(name, age, date);
  if (resultData) return res.status(400).json({ message: resultData });
  const prevList = await readFile(path.join(__dirname, '.', 'crush.json'));
  // console.log('passou por aqui');
  const id = prevList.length + 1;
  const newCrushList = [...prevList, { id, name, age, date }];
  await addNewCrush(newCrushList);
  res.status(201).send(newCrushList[newCrushList.length - 1]);
});

// Requisito 5

const editCrush = async (content) => {
  fs.writeFile(path.resolve(__dirname, '.', 'crush.json'), JSON.stringify(content), (err) => {
    if (err) throw err;
    return JSON.stringify(content);
  });
};

app.put('/crush/:id', async (req, res) => {
  const auth = req.headers.authorization;
  const token = validateToken(auth);
  if (token) return res.status(401).json({ message: token });
  const { name, age, date } = req.body;
  const data = validateData(name, age, date);
  if (data) return res.status(400).json({ message: data });
  const prevData = await readFile(path.join(__dirname, '.', 'crush.json'));
  const { id } = req.params;
  const index = prevData.findIndex((el) => el.id === +id);
  prevData[index] = { ...prevData[index], name, age, date };
  await editCrush(prevData);
  res.status(200).send(prevData[index]);
});

// Requisito 6

const deleteCrush = async (content) => {
  fs.writeFile(path.resolve(__dirname, '.', 'crush.json'), JSON.stringify(content), (err) => {
    if (err) throw err;
    return JSON.stringify(content);
  });
};

app.delete('/crush/:id', async (req, res) => {
  const auth = req.headers.authorization;
  const token = validateToken(auth);
  if (token) return res.status(401).json({ message: token });
  const prevData = await readFile(path.join(__dirname, '.', 'crush.json'));
  const { id } = req.params;
  const index = prevData.findIndex((el) => el.id === +id);
  prevData.splice(index, 1);
  await deleteCrush(prevData);
  res.status(200).send({ message: 'Crush deletado com sucesso' });
});

app.listen(3000, () => console.log('aqui'));
