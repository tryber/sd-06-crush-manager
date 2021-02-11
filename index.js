const express = require('express');

const app = express();
const SUCCESS = 200;
const fs = require('fs').promises;
const bodyParser = require('body-parser');
const randtoken = require('rand-token');

app.use(bodyParser.json());
const fileName = 'crush.json';

app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// desafio 1
app.get('/crush', async (req, res) => {
  const file = await fs.readFile(fileName);
  if (!file) {
    return res.status(200).send([]);
  }
  return res.status(200).send(JSON.parse(file));
});

// desafio 2
app.get('/crush/:id', async (req, res) => {
  const file = await fs.readFile(fileName);
  const crushes = JSON.parse(file);
  const id = Number(req.params.id);
  let crush = null;

  if (id > 0) {
    crush = crushes.find((item) => id === item.id);
  }

  if (!crush) {
    return res.status(404).send({ message: 'Crush não encontrado' });
  }
  return res.status(200).send(crush);
});

// desafio 3
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;

  if (!email || email === '') {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }
  if (!regex.test(email)) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password || password === '') {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
  if (password.toString().length < 6) {
    return res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }

  const token = randtoken.generate(16);
  return res.status(200).send({ token: `${token}` });
});

// validação token
const tokenValidation = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Token não encontrado' });
  }
  if (req.headers.authorization.length < 16) {
    return res.status(401).send({ message: 'Token inválido' });
  }
  next();
};

// desafio 4
app.post('/crush', tokenValidation, async (req, res) => {
  const file = await fs.readFile(fileName);
  const crushes = JSON.parse(file);
  const { name, age, date } = req.body;

  const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

  if (!name || name === '') return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  if (!age || age === '' || !Number.isInteger(age)) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  if (!date || !date.datedAt || !date.rate || date === '' || date.datedAt === '' || date.rate === '') {
    return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (!Number.isInteger(date.rate) || date.rate < 1 || date.rate > 5) return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  if (regex.test(date.datedAt) === false) return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });

  const newCrush = {
    name,
    age,
    id: crushes.length + 1,
    date: {
      datedAt: date.datedAt,
      rate: date.rate,
    },
  };

  crushes.push(newCrush);
  const jsonCrush = JSON.stringify(crushes);
  await fs.writeFile('crush.json', jsonCrush);
  return res.status(201).json(newCrush);
});

// desafio 5
app.put('/crush/:id', tokenValidation, async (req, res) => {
  const file = await fs.readFile(fileName);
  const crushes = JSON.parse(file);
  const id = Number(req.params.id);
  const { name, age, date } = req.body;

  const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

  if (!name || name === '') return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  if (!age || age === '' || !Number.isInteger(age)) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  if (date === undefined || !date || date.datedAt === '' || date.datedAt === undefined || date.rate === '' || date.rate === undefined) {
    return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (!Number.isInteger(date.rate) || date.rate < 1 || date.rate > 5) return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  if (regex.test(date.datedAt) === false) return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });

  const mapCrush = crushes.map((item) => {
    if (item.id === id) {
      return {
        name,
        age,
        id,
        date: {
          datedAt: date.datedAt,
          rate: date.rate,
        },
      };
    }
    return item;
  });

  const findCrush = mapCrush.find((crush) => crush.id === id);

  const jsonCrush = JSON.stringify(findCrush);
  await fs.writeFile('crush.json', jsonCrush);
  return res.status(200).json(findCrush);
});

app.listen(3000, () => console.log('listening port 3000'));
