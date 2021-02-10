const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');
const utils = require('./utils');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = 3000;

app.use(middlewares.logger);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// req 1
app.get('/crush',
  async (_req, res) => {
    const file = await utils.readFile();
    res.status(200).json(JSON.parse(file));
  });
// req 7
app.get('/crush/search',
  async (req, res) => {
    // validação token
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
    if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
    const query = req.query.q;
    const file = JSON.parse(await utils.readFile());
    if (!query) return res.status(200).json(file);
    const response = file.filter((people) => people.name.includes(query));
    res.json(response);
  });
// req 2
app.get('/crush/:id',
  async (req, res) => {
    const { id } = req.params;
    const file = await utils.readFile();
    if (id > 4) res.status(404).json({ message: 'Crush não encontrado' });
    const response = JSON.parse(file).find((people) => people.id === Number(id));
    res.status(200).json(response);
  });
// req 3
app.post('/login',
  async (req, res) => {
    const token = await utils.token();
    const { email, password } = req.body;
    const validator = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const isValid = validator.test(String(email).toLowerCase());
    if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    if (!isValid) return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    if (password.length < 6) return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
    return res.status(200).json({ token });
  });
app.post('/crush',
  async (req, res) => {
    const { name, age, date } = req.body;
    const { authorization } = req.headers;

    // validação token
    if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
    if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });

    // name authentication
    if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    if (name.length < 4) return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });

    // age authentication
    if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    if (age < 18) return res.status(400).json({ message: 'O crush deve ser maior de idade' });

    // date authentication
    if (!date) return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
    if (date.rate < 1 || date.rate > 5) return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    if (!date.datedAt || !date.rate) return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
    const dateValidator = (dates) => {
      const regex = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
      return regex.test(String(dates).toLocaleLowerCase());
    };
    if (!dateValidator(date.datedAt)) return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });

    // escrever arquivo
    const file = JSON.parse(await utils.readFile());
    const id = file.length + 1;
    file.push({ id, name, age, date });
    // utils.writeFile(JSON.stringify(file));
    utils.writeFile(file);
    return res.status(201).json({ id, name, age, date });
  });

app.put('/crush/:id',
  async (req, res) => {
    const { name, age, date } = req.body;
    const { authorization } = req.headers;
    const id = +req.params.id;
    // validação token
    if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
    if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });

    // name authentication
    if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    if (name.length < 3) return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });

    // age authentication
    if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    if (age < 18) return res.status(400).json({ message: 'O crush deve ser maior de idade' });

    // date authentication
    if (!date) return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
    if (date.rate < 1 || date.rate > 5) return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    if (!date.datedAt || !date.rate) return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
    const dateValidator = (dates) => {
      const regex = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
      return regex.test(String(dates).toLocaleLowerCase());
    };
    if (!dateValidator(date.datedAt)) return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
    // escrever arquivo
    const file = JSON.parse(await utils.readFile());
    const personIndex = file.findIndex((person) => person.id === id);
    const newCrush = { id, name, age, date };
    file[personIndex] = newCrush;
    utils.writeFile(file);
    return res.status(200).json(file[personIndex]);
  });

app.delete('/crush/:id',
  async (req, res) => {
    // validação token
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
    if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });

    const id = +req.params.id;
    const file = JSON.parse(await utils.readFile());
    file.splice(id - 1, 1);
    utils.writeFile(file);
    res.status(200).json({ message: 'Crush deletado com sucesso' });
  });

app.use(middlewares.error);

app.listen(PORT, () => {
  console.log(`App rodando na porta ${PORT}`);
});
