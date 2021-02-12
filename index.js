const express = require('express');
const fs = require('fs').promises;
const { isEmail, isSize, receiveNewToken, isADate } = require('./utils');

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

// Requisito-2         obs: id da url vem formato string, por isso o Number(id)
// res com o crush doo id da rota ou { "message": "Crush não encontrado" } e o status 404;
app.get('/crush/:id', async (req, res) => {
  const crushes = await fs.readFile(crushArray);
  const crushesJson = JSON.parse(crushes);
  console.log(crushesJson);
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
  const token = receiveNewToken();
  return res.status(200).json({ token });
});

// Requisito-4
// res deve adicionar um novo crush ao seu arquivo com token, name com 3 caracteres, age >= 18anos,
// chave datedAt deve ser uma data no formato dd/mm/aaaa e obrigatório, rate de 1 a 5
// e error tratado;
app.post('/crush', async (req, res) => { // fazer função mid authorization
  const { authorization } = req.headers;
  // console.log(authorization);
  const crushes = await fs.readFile(crushArray, 'utf-8');
  const crushesJson = JSON.parse(crushes);
  // postCrush
  const newIdCrush = crushesJson.length + 1;
  const postCrush = { ...req.body, id: newIdCrush };
  const { name, age, date } = postCrush;
  // token
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
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
  if (!isADate(date.datedAt)) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (date.rate < 1 || date.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  crushesJson.push(postCrush);
  await fs.writeFile(crushArray, JSON.stringify(crushesJson));
  return res.status(201).json(postCrush);
});

// Requisito-5        obs: id da url vem formato string, por isso o Number(id)
// res deve ser capaz, através do endpoint()params,
// editar um crush baseado no id da rota, sem alterar o id registrado;
app.put('/crush/:id', async (req, res) => { // fazer função mid authorization
  const { authorization } = req.headers;
  const crushes = await fs.readFile(crushArray, 'utf-8');
  let crushesJson = JSON.parse(crushes);
  // postCrush + id(url)
  const { id } = req.params;
  const { name, age, date } = req.body;
  // token
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
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
  if (!isADate(date.datedAt)) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (date.rate < 1 || date.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  const postCrush = { name, age, date, id: Number(id) };
  crushesJson = crushesJson.map((toUpdateCrush) => (toUpdateCrush.id === postCrush.id
    ? postCrush : toUpdateCrush));
  await fs.writeFile(crushArray, JSON.stringify(crushesJson));
  return res.status(200).json(postCrush);
});

// Requisito-6
// res deve deletar um crush baseado no id da rota
// e retornar { "message": "Crush deletado com sucesso" };
app.delete('/crush/:id', async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const crushes = await fs.readFile(crushArray, 'utf-8');
  let crushesJson = JSON.parse(crushes);
  // token
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  crushesJson = crushesJson.filter((crushJson) => crushJson.id !== Number(id));
  await fs.writeFile(crushArray, JSON.stringify(crushesJson));
  return res.status(200).json({ message: 'Crush deletado com sucesso' });
});
app.listen(3000, () => console.log(`Using port: ${port}`));// authorization 78afe01ee29f9cb9 (Header)
