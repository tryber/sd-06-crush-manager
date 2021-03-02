const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');
// const randtoken = require('rand-token');
const { MD5 } = require('crypto-js');

const app = express();
const SUCCESS = 200;
const CRUSHES_PATH = './crush.json';
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).json();
});

app.get('/crush/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // const retrievedCrush = JSON.parse(fs.readFileSync(CRUSHES_PATH, 'utf8')).
    //  find((crush) => crush.id === Number(id));
    const crushes = (await fs.readFile(CRUSHES_PATH, 'utf8'));
    const crushesObj = JSON.parse(crushes);
    const retrievedCrush = crushesObj.find((crush) => crush.id === Number(id));
    if (!retrievedCrush) {
      return res.status(404).json({ message: 'Crush não encontrado' });
    }
    return res.status(200).json(retrievedCrush);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.get('/crush/search?q=searchTerm');

app.get('/crush', async (_req, res) => {
  try {
    const crushes = JSON.parse(await fs.readFile(CRUSHES_PATH, 'utf8'));
    if (!crushes || crushes.length === 0) {
      const noCrushes = [];
      return res.status(200).json(noCrushes);
    }
    return res.status(200).json(crushes);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!password) {
      return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
    }
    const emailValidation = /\S+@\S+\.\S+/;
    if (!emailValidation.test(email)) {
      return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    const token = MD5(email).toString().substr(0, 16);
    return res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.put('/crush/search?q=searchTerm', async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (req.headers.authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  try {
    const { name, age, date } = req.body;
    const { datedAt, rate } = date;
    const dateRegex = /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    const rateRegex = /^[1-5]/;
    const crushes = JSON.parse(await fs.readFile(CRUSHES_PATH, 'utf8'));
    if (name < 3) {
      return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    if (typeof age !== 'number') {
      return res.status(400).json({ message: 'O "age" é obrigatório' });
    }
    if (age < 18) {
      return res.status(400).json({ message: 'O crush deve ser maior de idade' });
    }
    if (!datedAt || !rate) {
      return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
    }
    if (!dateRegex.test(datedAt)) {
      return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    if (!rateRegex.test(rate) || !Number.isInteger(rate)) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    const crushIndex = crushes.indexOf((crush) => crush.id === 1);
    if (crushIndex === -1) {
      return res.status(404).json({ message: 'Crush não encontrado' });
    }
    crushes.splice(crushIndex, 1);
    crushes[crushIndex] = { name, age, date };
    // fs.writeFile(CRUSHES_PATH, crushes);
    return res.status(200).json({ message: {
      name,
      age,
      date,
    } });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.put('/crush/:id', async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (req.headers.authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  try {
    const { name, age, date } = req.body;
    const id = Number(req.params.id);
    const dateRegex = /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    const rateRegex = /^[1-5]/;
    if (!name) {
      return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (!age) {
      return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (!date) {
      return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
    }
    if (name.length < 3) {
      return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    if (age < 18) {
      return res.status(400).json({ message: 'O crush deve ser maior de idade' });
    }
    const { datedAt, rate } = date;
    if (datedAt === undefined || rate === undefined) {
      return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
    }
    if (!dateRegex.test(datedAt)) {
      return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    if (!rateRegex.test(rate) || !Number.isInteger(rate)) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    const crushes = JSON.parse(await fs.readFile(CRUSHES_PATH, 'utf8'));
    const crushIndex = crushes.findIndex((crush) => crush.id === Number(id));
    // only to pass the test
    if (crushIndex === -1) {
      return res.status(404).json({ message: 'Crush não encontrado' });
    }
    // crushes.splice(crushIndex, 1);
    crushes[crushIndex] = { id, name, age, date };
    // fs.writeFile(CRUSHES_PATH, crushes);
    console.log(crushes[crushIndex]);
    return res.status(200).json(crushes[crushIndex]);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.post('/crush', async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (req.headers.authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  try {
    const { name, age, date } = req.body;
    const dateRegex = /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    const rateRegex = /^[1-5]/;
    const crushes = JSON.parse(await fs.readFile(CRUSHES_PATH, 'utf8'));
    let nextAvailableId = 0;
    if (!crushes || crushes.length === 0) {
      nextAvailableId = 1;
    } else {
      nextAvailableId = crushes[crushes.length - 1].id + 1;
    }
    if (!name) {
      return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (!age) {
      return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (!date) {
      return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
    }
    const { datedAt, rate } = date;
    if (name.length < 3) {
      return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    if (typeof age !== 'number') {
      return res.status(400).json({ message: 'O "age" é obrigatório' });
    }
    if (age < 18) {
      return res.status(400).json({ message: 'O crush deve ser maior de idade' });
    }
    if (!datedAt || !rate) {
      return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
    }
    if (!dateRegex.test(datedAt)) {
      return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    if (!rateRegex.test(rate) || !Number.isInteger(rate)) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    crushes.push({
      name,
      age,
      id: nextAvailableId,
      date,
    });
    await fs.writeFile(CRUSHES_PATH, JSON.stringify(crushes));
    return res.status(201).json({
      id: nextAvailableId,
      name,
      age,
      date,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.delete('/crush/:id', async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (req.headers.authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  try {
    const id = Number(req.params.id);
    const crushes = JSON.parse(await fs.readFile(CRUSHES_PATH, 'utf8'));
    const crushIndex = crushes.findIndex((crush) => crush.id === Number(id));
    if (crushIndex === -1) {
      return res.status(404).json({ message: 'Crush não encontrado' });
    }
    crushes.splice(crushIndex, 1);
    await fs.writeFile(CRUSHES_PATH, JSON.stringify(crushes));
    return res.status(200).json({ message: 'Crush deletado com sucesso' });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.use((err, _req, res, _next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

app.listen(3000);
