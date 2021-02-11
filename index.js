const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());
app.listen(3000, () => console.log('running'));
const { readFile, writeFile } = require('./src/utils/manageFiles');
const { emailValid, passwordValid, dateValid } = require('./src/utils/validations');

// ------- Requisito 1 --------

app.get('/crush', async (_request, response) => {
  const crushes = await readFile('crush');

  try {
    response.status(200).json(JSON.parse(crushes));
  } catch (error) {
    console.log(error);
    response.status(200).json([]);
  }
});

// ------- Requisito 2 --------

app.get('/crush/:id', async (request, response) => {
  const { id } = request.params;
  const myCrushes = await readFile('crush');
  const element = JSON.parse(myCrushes).find((e) => e.id === parseInt(id, 10));

  if (element) {
    response.status(200).json(element);
  } else {
    response.status(404).json({ message: 'Crush não encontrado' });
  }
});

// ------- Requisito 3 --------

app.post('/login', (request, response) => {
  const token = crypto.randomBytes(8).toString('hex');
  const { email, password } = request.body;

  if (!email || email === '') return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!password || password === '') return response.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (emailValid(email)) return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  if (passwordValid(password)) return response.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });

  return response.status(200).json({ token });
});

// ------- Requisito 4 --------

app.post('/crush', async (request, response) => {
  const token = request.headers.authorization;
  const { name, age, date } = request.body;

  if (!token) return response.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16) return response.status(401).json({ message: 'Token inválido' });

  if (!name) return response.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length <= 3) return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });

  if (!age || age === '') return response.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) return response.status(400).json({ message: 'O crush deve ser maior de idade' });

  if (!date || date === '' || !date.datedAt || date.rate === undefined) {
    return response.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (date.rate < 1 || date.rate > 5) return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  if (dateValid(date.datedAt)) return response.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });

  const crushes = await readFile('crush');
  const parsedCrushes = JSON.parse(crushes);
  const crushesObject = { id: parsedCrushes.length + 1, ...request.body };
  const crushesData = crushes.concat(crushesObject);

  await writeFile(JSON.stringify('crush', crushesData));

  return response.status(201).json(crushesObject);
});
