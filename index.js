const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

const app = express();
const SUCCESS = 200;
// app.use(express.json()); mesma funcionalidade que o bodyParser
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// readFile
const read = async () => {
  const crush = await fs.readFile('./crush.json', 'utf-8');
  // console.log(crush);
  return JSON.parse(crush);
};
// read();
// writeFile
const write = async (newCrush) => {
  await fs.writeFile('./crush.json', newCrush, 'utf-8');
  return true;
};

// req 1 rota crush
app.get('/crush', async (_req, res) => {
  try {
    const crushes = await read();
    res.status(200).send(crushes);
  } catch (error) {
    // console.error(error.message);
    res.status(200).json([]);
  }
});

// req 2
app.get('/crush/:id', async (req, res) => {
  const { id } = req.params;
  const crushList = await read();
  // '+' antes de id, funciona como o parseInt
  const paramsId = crushList.filter((crush) => crush.id === +id);
  if (paramsId.length) {
    return res.status(200).json(paramsId[0]);
  }
  return res.status(404).json({ message: 'Crush não encontrado' });
});

// req 3
app.post('/login', (req, res) => {
  // geração de token, conforme atividade(formato hexadecimal, size/2)
  const token = crypto.randomBytes(8).toString('hex');
  const { email, password } = req.body;
  // console.log(email, password);
  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  // validate email
  const rgxEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  if (!rgxEmail.test(email)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  if (!password || password === '') {
    return res
      .status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  }
  // validate password
  const rgxPassword = /^\d{6,}$/gm;
  if (!rgxPassword.test(password)) {
    return res
      .status(400)
      .json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }

  return res.status(200).json({ token });
});

// req4
app.post('/crush', async (req, res) => {
  const crushList = await read();
  // console.log(crushList);
  const { name, age, date } = req.body;
  // console.log(name, age, date);
  const tokenAuthorization = req.headers.authorization;
  // console.log(tokenAuthorization);
  if (!tokenAuthorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (tokenAuthorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  }

  if (!date || !date.datedAt || (!date.rate && date.rate !== 0)) {
    return res.status(400).send({
      message:
        'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  // Number.isInteger verifica se o numero é inteiro
  if (!Number.isInteger(date.rate) || date.rate < 1 || date.rate > 5) {
    return res.status(400).send({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  // regex para datas xx/xx/xxxx
  const rgxDate = /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
  if (!rgxDate.test(date.datedAt)) {
    return res.status(400).send({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  const newCrush = { id: crushList.length + 1, ...req.body };
  await write(JSON.stringify([...crushList, newCrush], 0, 2));
  return res.status(201).send(newCrush);
});

app.put('/crush/:id', async (req, res) => {
  const token = req.headers.authorization;
  const { name, age, date } = req.body;
  const { id } = req.params;
  const idInt = parseInt(id, 10);

  // validações
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

  if (!date || !date.datedAt || (!date.rate && date.rate !== 0)) {
    return res.status(400).send({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  if (!Number.isInteger(date.rate) || date.rate < 1 || date.rate > 5) {
    return res.status(400).send({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  const rgxDate = /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
  if (!rgxDate.test(date.datedAt)) {
    return res.status(400).send({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  const crushList = await read();
  const newCrush = { id: idInt, name, age, date };
  crushList.splice(idInt, 1, newCrush);
  await write(JSON.stringify([...crushList], 0, 2));
  return res.status(200).json(newCrush);
});

app.delete('/crush/:id', async (req, res) => {
  const { id } = req.params;
  const idInt = parseInt(id, 10);
  const { authorization } = req.headers;
  // validações
  if (authorization === '' || !authorization) {
    return res.status(401).send({
      message: 'Token não encontrado',
    });
  }
  if (authorization.length !== 16) {
    return res.status(401).send({
      message: 'Token inválido',
    });
  }

  const crushList = await read();
  // console.log(crushList);
  crushList.splice(idInt, 1);
  await write(JSON.stringify([...crushList], 0, 2));
  return res.status(200).json({ message: 'Crush deletado com sucesso' });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Executando na ${port}`);
});
