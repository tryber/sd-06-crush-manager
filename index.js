const express = require('express');
const fs = require('fs').promises;
const crypto = require('crypto');

const app = express();
const SUCCESS = 200;
const port = 3000;

app.use(express.json());

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}
function validEmail(email) {
  return /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{3,8})?$/.test(email);
}
function validPassword(password) {
  return /[0-9]{6}/.test(password);
}
function validDate(date) {
  return /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/.test(date);
}

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// task 1
app.get('/crush', async (_req, res) => {
  const data = await fs.readFile('./crush.json', 'utf-8');
  if (data.length < 1) res.status(SUCCESS).send([]);
  res.status(SUCCESS).send(JSON.parse(data));
});

// task 7
app.get('/crush/search', async (req, res) => {
  const { authorization } = req.headers;
  const { nick } = req.query;

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });

  const data = JSON.parse(await fs.readFile('./crush.json', 'utf-8'));
  if (!nick || nick === '') return res.status(200).json(data);

  const CrushFinded = data.filter((el) => el.name.includes(nick));
  if (CrushFinded === false) return res.status(200).json([]);
  res.status(200).json(CrushFinded);
});

// task 2
app.get('/crush/:id', async (req, res) => {
  const data = JSON.parse(await fs.readFile('./crush.json', 'utf-8'));
  const { id } = req.params;
  const result = data.find((el) => el.id === Number(id));
  if (result === undefined) res.status(404).send({ message: 'Crush não encontrado' });
  res.status(SUCCESS).send(result);
});

// task 3
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (email === undefined) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (validEmail(email) === false) return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  if (password === undefined) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (validPassword(password) === false) return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  const token = generateToken();

  return res.send({ token });
});

// task 4

const validaToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  next();
};

app.post('/crush', validaToken, async (req, res) => {
  const data = await fs.readFile('./crush.json', 'utf-8');

  const { name, age, date } = req.body;

  if (!name || name === '') return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });

  if (!age || age === '') return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) return res.status(400).json({ message: 'O crush deve ser maior de idade' });

  if (!date || date === '' || !date.rate || date.datedAt === '' || !date.datedAt) return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });

  if (date.rate < 1 || date.rate > 5) return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });

  if (validDate(date.datedAt) === false) return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });

  const dataJson = JSON.parse(data);

  const id = dataJson.length + 1;

  const corpoValidate = { name, age, id, date };

  const novoCrush = JSON.stringify(dataJson.concat(corpoValidate));

  await fs.writeFile('./crush.json', novoCrush, 'utf-8');

  res.status(201).send(corpoValidate);
});

// task 6

app.delete('/crush/:id', async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });

  const data = JSON.parse(await fs.readFile('./crush.json'));
  const { id } = req.params;

  const deleted = data.filter((el) => el.id !== Number(id));

  const newFile = JSON.stringify(deleted);

  await fs.writeFile('./crush.json', newFile, 'utf-8');

  res.status(200).json({ message: 'Crush deletado com sucesso' });
});

app.listen(port, () => console.log('Server On'));
