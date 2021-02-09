const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');
const utils = require('./utils');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = 3000;

app.use(middlewares.logger);

const tokenValidator = (req, res, next) => {
  if (!req.headers.token) return res.status(401).json({ message: 'Token não encontrado' });
  if (req.headers.token.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  next();
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.post('/login',
  async (req, res) => {
    const token = await utils.token();
    const { email, senha } = req.body;
    const validator = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const isValid = validator.test(String(email).toLowerCase());
    if (email === '') return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    if (!isValid) return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    if (senha === '') return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    if (toString(senha).length < 6) return res.status(400).json({ message: 'O "password" ter pelo menos 6 caracteres' });
    res.status(200).json({ token });
  });

app.get('/crush',
  async (_req, res) => {
    console.log('a');
    const file = await utils.readFile();
    res.status(200).json(JSON.parse(file));
  });

app.get('/crush/search', tokenValidator,
  async (req, res) => {
    const { name } = req.query;
    const file = JSON.parse(await utils.readFile());
    const response = file.filter((people) => people.name.includes(name));
    res.json(response);
  });

app.get('/crush/:id', tokenValidator,
  async (req, res) => {
    const { id } = req.params;
    const file = await utils.readFile();
    if (id > 4) res.status(400).json({ message: 'Crush não encontrado' });
    const response = JSON.parse(file).find((people) => people.id === Number(id));
    res.status(200).json(response);
  });

app.post('/crush', tokenValidator,
  async (req, res) => {
    const { name, age, dateNow, rate } = req.body;
    const date = { datedAt: dateNow, rate };
    const file = JSON.parse(await utils.readFile());
    const id = file.length + 1;
    const dateValidator = (dates) => {
      const regex = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
      return regex.test(String(dates).toLocaleLowerCase());
    };
    // name authentication
    if (!name) return res.status(400).json({ messag: 'O campo "name" é obrigatório' });
    if (name.length < 4) return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    // age authentication
    if (!age || age === '') return res.status(400).json({ messag: 'O campo "age" é obrigatório' });
    if (age < 18) return res.status(400).json({ message: 'O crush deve ser maior de idade' });
    // date authentication
    if (!date || date === '' || !date.datedAt || date.rate === undefined) return ({ message: 'O campo date é obrigatório e datedAt e rate não podem ser vazios' });
    if (rate > 5 || rate < 1) return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    if (!dateValidator(dateNow)) return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
    file.push({ id, name, age, date });
    res.status(201).json(file);
  });

app.put('/crush/:id', tokenValidator,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, dateNow, rate } = req.body;
    const date = { datedAt: dateNow, rate };
    const file = JSON.parse(await utils.readFile());
    const dateValidator = (dates) => {
      const regex = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
      return regex.test(String(dates).toLocaleLowerCase());
    };
    // name authentication
    if (!name) return res.status(400).json({ messag: 'O campo "name" é obrigatório' });
    if (name.length < 4) return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    // age authentication
    if (!age || age === '') return res.status(400).json({ messag: 'O campo "age" é obrigatório' });
    if (age < 18) return res.status(400).json({ message: 'O crush deve ser maior de idade' });
    // date authentication
    if (!date || date === '' || !date.datedAt || date.rate === undefined) return ({ message: 'O campo date é obrigatório e datedAt e rate não podem ser vazios' });
    if (rate > 5 || rate < 1) return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    if (!dateValidator(dateNow)) return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
    const personIndex = file.findIndex((person) => person.id === id);
    res.status(200).json(file[personIndex] = { id, name, age, date, rate });
  });

app.delete('/crush/:id', tokenValidator,
  async (req, res) => {
    const { id } = req.params;
    const file = JSON.parse(await utils.readFile());
    file.splice(id - 1, 1);
    res.status(200).json({ message: 'Crush deletado com sucesso' });
  });

app.use(middlewares.error);

app.listen(PORT, () => {
  console.log(`App rodando na porta ${PORT}`);
});
