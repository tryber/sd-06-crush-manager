const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const app = express();
const SUCCESS = 200;
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(3000, () => console.log('running'));

const readFile = require('./uteis/readFile');
const writeFile = require('./uteis/writeFile');
const validarEmail = require('./uteis/validarEmail');
const validarPassword = require('./uteis/validarPassword');
const validarData = require('./uteis/validarData');

app.get('/crush', async (_request, response) => {
  const crushes = await readFile('crush');

  try {
    response.status(200).json(JSON.parse(crushes));
  } catch (error) {
    console.log(error);
    response.status(200).json([]);
  }
});

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

app.post('/login', (request, response) => {
  const token = crypto.randomBytes(8).toString('hex');
  const { email, password } = request.body;

  if (!email || email === '') return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!password || password === '') return response.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (validarEmail(email)) return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  if (validarPassword(password)) return response.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });

  return response.status(200).json({ token });
});

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
  if (validarData(date.datedAt)) return response.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });

  const crushes = await readFile('crush');
  const parsedCrushes = JSON.parse(crushes);
  const crushesObject = { id: parsedCrushes.length + 1, ...request.body };
  parsedCrushes.push(crushesObject);

  await writeFile('crush', JSON.stringify(parsedCrushes));

  return response.status(201).json(crushesObject);
});

app.put('/crush/:id', async (request, response) => {
  const { name, age, date } = request.body;
  const token = request.headers.authorization;

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
  if (validarData(date.datedAt)) return response.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });

  const crushes = await readFile('crush');
  const parsedCrushes = JSON.parse(crushes);
  const crushId = parseInt(request.params.id, 10);
  const crushesWithoutId = parsedCrushes.filter((crush) => crush.id !== crushId);
  const crushEdited = ({ name, age, id: crushId, date });
  crushesWithoutId.push(crushEdited);

  await writeFile('crush', JSON.stringify(crushesWithoutId));

  response.status(200).send(crushEdited);
});

app.delete('/crush/:id', async (request, response) => {
  const token = request.headers.authorization;

  if (!token) return response.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16) return response.status(401).json({ message: 'Token inválido' });

  const crushes = await readFile('crush');
  const parsedCrushes = JSON.parse(crushes);
  const crushId = parseInt(request.params.id, 10);
  const crushToDelete = parsedCrushes.find((crush) => crush.id === crushId);
  const newCrushesArray = parsedCrushes.filter((crush) => crush !== crushToDelete);

  await writeFile('crush', JSON.stringify(newCrushesArray));

  response.status(200).json({ message: 'Crush deletado com sucesso' });
});
