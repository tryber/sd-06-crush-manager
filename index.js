const fs = require('fs').promises;
const express = require('express');
const bodyParser = require('body-parser');
const {
  validateEmail,
  validatePassword,
  checkRequestField,
  generateToken,
  validateName,
  validateAge,
  datingValidation,
  validateDate,
  rateValidation } = require('./utils');

const authenticate = require('./middlewares/authenticate');

const app = express();
const SUCCESS = 200;
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (request, response) => {
  const fileName = './crush.json';
  const rawData = await fs.readFile(fileName);
  const crushes = JSON.parse(rawData);
  response.status(SUCCESS).json(crushes);
});

app.get('/crush/:id', async (request, response) => {
  const id = parseInt(request.params.id, 10);
  const fileName = './crush.json';
  const rawData = await fs.readFile(fileName);
  const crushes = JSON.parse(rawData);
  const retrievedCrush = crushes.find((crush) => crush.id === id);
  if (!retrievedCrush) response.status(404).json({ message: 'Crush não encontrado' });
  response.status(SUCCESS).send(retrievedCrush);
});

app.post('/login', (request, response) => {
  const requestObject = request.body;

  if (!checkRequestField(requestObject, 'email')) {
    return response.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }

  if (!checkRequestField(requestObject, 'password')) {
    return response.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }

  if (!validateEmail(requestObject.email)) {
    return response.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  if (!validatePassword(requestObject.password)) {
    return response.status(400).json({
      message: 'A "senha" deve ter pelo menos 6 caracteres',
    });
  }

  response.status(SUCCESS).send(
    {
      token: `${generateToken(16)}`,
    },
  );
});

app.post('/crush', authenticate, async (request, response) => {
  const requestBody = request.body;

  if (!checkRequestField(requestBody, 'name')) {
    return response.status(400).json(
      {
        message: 'O campo "name" é obrigatório',
      },
    );
  }

  if (!validateName(requestBody.name)) {
    return response.status(400).json(
      {
        message: 'O "name" deve ter pelo menos 3 caracteres',
      },
    );
  }

  if (!checkRequestField(requestBody, 'age')) {
    return response.status(400).json(
      {
        message: 'O campo "age" é obrigatório',
      },
    );
  }

  if (!validateAge(requestBody.age)) {
    return response.status(400).json(
      {
        message: 'O crush deve ser maior de idade',
      },
    );
  }

  if (!datingValidation(requestBody.date)) {
    return response.status(400).json(
      {
        message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
      },
    );
  }

  if (!validateDate(requestBody.date.datedAt)) {
    return response.status(400).json(
      {
        message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
      },
    );
  }

  if (!rateValidation(requestBody.date.rate)) {
    return response.status(400).json(
      {
        message: 'O campo "rate" deve ser um inteiro de 1 à 5',
      },
    );
  }

  const fileName = './crush.json';
  const rawData = await fs.readFile(fileName);
  const crushes = JSON.parse(rawData);
  const lastIndex = crushes.length - 1;
  const lastId = crushes[lastIndex].id;
  const nextId = lastId + 1;
  const newCrush = { ...requestBody, id: nextId };
  crushes.push(newCrush);
  await fs.writeFile(fileName, JSON.stringify(crushes));
  response.status(201).json(newCrush);
});

app.put('/crush/:id', authenticate, async (request, response) => {
  const id = parseInt(request.params.id, 10);
  const requestBody = request.body;

  if (!checkRequestField(requestBody, 'name')) {
    return response.status(400).json(
      {
        message: 'O campo "name" é obrigatório',
      },
    );
  }

  if (!validateName(requestBody.name)) {
    return response.status(400).json(
      {
        message: 'O "name" deve ter pelo menos 3 caracteres',
      },
    );
  }

  if (!checkRequestField(requestBody, 'age')) {
    return response.status(400).json(
      {
        message: 'O campo "age" é obrigatório',
      },
    );
  }

  if (!validateAge(requestBody.age)) {
    return response.status(400).json(
      {
        message: 'O crush deve ser maior de idade',
      },
    );
  }

  if (!datingValidation(requestBody.date)) {
    return response.status(400).json(
      {
        message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
      },
    );
  }

  if (!validateDate(requestBody.date.datedAt)) {
    return response.status(400).json(
      {
        message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
      },
    );
  }

  if (!rateValidation(requestBody.date.rate)) {
    return response.status(400).json(
      {
        message: 'O campo "rate" deve ser um inteiro de 1 à 5',
      },
    );
  }

  const fileName = './crush.json';
  const rawData = await fs.readFile(fileName);
  const crushes = JSON.parse(rawData);
  const retrievedCrush = crushes.find((crush) => crush.id === id);
  if (!retrievedCrush) response.status(404).json({ message: 'Crush não encontrado' });
  const newCrushes = crushes.map((crush) => {
    if (crush.id === id) {
      return requestBody;
    }
    return crush;
  });
  await fs.writeFile(fileName, JSON.stringify(newCrushes));
  response.status(201).json(requestBody);
});

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});
