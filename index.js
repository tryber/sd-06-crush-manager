const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());

const authToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).send({ message: 'Token inválido' });
  next();
};

app.get('/crush/search', authToken, async (req, res) => {
  const search = req.query.q;
  // regEX by LughWalle !!
  const regex = new RegExp(`^${search}\\w*`, 'i');
  const crushs = await fs.readFile('./crush.json');
  const crushsJson = JSON.parse(crushs);
  const filteredCrushs = crushsJson.filter((crush) => regex.test(crush.name));
  console.log(filteredCrushs, search);
  res.status(200).send(filteredCrushs);
});

app.get('/crush', async (_req, res) => {
  try {
    const possiblesCrush = await fs.readFile('./crush.json');
    if (possiblesCrush.length === 0) {
      return res.status(SUCCESS).json([]);
    }
    res.status(SUCCESS).json(JSON.parse(possiblesCrush));
  } catch (error) {
    console.log(error);
  }
});

app.get('/crush/:id', async (req, res) => {
  const possiblesCrush = await fs.readFile('./crush.json');
  const id = parseInt(req.params.id, 10);
  const filterCrush = JSON.parse(possiblesCrush)
    .find((crush) => id === crush.id);
  if (!filterCrush) {
    return res.status(404).send({ message: 'Crush não encontrado' });
  }

  res.status(SUCCESS).json(filterCrush);
});

// regEX by LughWalle !!
const validEmail = (email) => {
  const pattern = /[\w]{3,30}@[\w]{3,8}.[\w]{2,7}/mg;
  return pattern.test(email);
};

// regEX by LughWalle !!
const validPassword = (pass) => {
  const pattern = /[\w]{6,30}/mg;
  return pattern.test(pass);
};

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (!validEmail(email)) return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  if (!password) return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  if (!validPassword(password)) return res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  const token = await crypto.randomBytes(8).toString('hex');
  res.send({ token });
  // console.log(req.body);
});

// regEX by LughWalle !!
const validDateAt = (datedAt) => {
  const pattern = /(((^0|^1|^2)[0-9])|(^3[0-1]))\/((0[0-9])|(1[0-2]))\/(((19|20)[0-9]{2}$))/mg;
  return pattern.test(datedAt);
};

app.post('/crush', authToken, async (req, res) => {
  const { name, age, date } = req.body;
  if (!name) return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  if (!age) return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  if (age < 18) return res.status(400).send({ message: 'O crush deve ser maior de idade' });
  if (!date || !date.datedAt || !date.rate) {
    return res.status(400)
      .send({
        message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
      });
  }
  if (!validDateAt(date.datedAt)) return res.status(400).send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  if (date.rate < 1 || date.rate > 5) return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });

  const allCrush = JSON.parse(await fs.readFile('./crush.json'));
  const id = allCrush.length + 1;
  const newCrushAdded = { id, ...req.body };
  const addInList = JSON.stringify([newCrushAdded, ...allCrush]);
  await fs.writeFile('./crush.json', addInList);

  res.status(201).send(newCrushAdded);
});

app.put('/crush/:id', authToken, async (req, res) => {
  const { name, age, date } = req.body;
  if (!name) return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  if (!age) return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  if (age < 18) return res.status(400).send({ message: 'O crush deve ser maior de idade' });

  if (!date || !date.datedAt || (!date.rate && date.rate !== 0)) {
    return res.status(400)
      .send({
        message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
      });
  }
  if (date.rate < 1 || date.rate > 5) return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  if (!validDateAt(date.datedAt)) return res.status(400).send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });

  const id = JSON.parse(req.params.id);
  const crushs = await fs.readFile('./crush.json');
  const jsonCrushs = JSON.parse(crushs).filter((theCrush) => theCrush.id !== id);
  const addId = { id, name, age, date };
  jsonCrushs.push(addId);

  await fs.writeFile('./crush.json', JSON.stringify(jsonCrushs));
  res.status(200).send(addId);
});

app.listen(3000, () => console.log('porta 3000 on !'));
