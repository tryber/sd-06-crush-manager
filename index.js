const express = require('express');
const fs = require('fs').promises;
const { gen } = require('n-digit-token');
const Joi = require('joi');
// const fileCrush = require('./crush.json');

const app = express();
const SUCCESS = 200;
const port = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (_req, res) => {
  const crushes = JSON.parse(await fs.readFile('./crush.json'));
  if (crushes.length > 0) {
    return res.status(200).send(crushes);
  }
  console.log([]);
  return res.status(200).send([]);
});

app.post('/crush', async (req, res) => {
  const crushes = JSON.parse(await fs.readFile('./crush.json', 'utf-8'));

  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Token não encontrado' });
  }
  if (req.headers.authorization.length < 16) {
    return res.status(401).send({ message: 'Token inválido' });
  }
  // console.log(req.headers.mytoken);

  //  VALIDAÇÃO
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .min(3)
      .messages({
        'any.required': 'O campo "name" é obrigatório',
        'string.empty': 'O campo "name" é obrigatório',
        'string.min': 'O "name" deve ter pelo menos 3 caracteres',
      }),
    age: Joi.number()
      .required()
      .integer()
      .greater(17)
      .messages({
        'any.required': 'O campo "age" é obrigatório',
        'number.greater': 'O crush deve ser maior de idade',
      }),
    date: Joi.object()
      .required()
      .keys({
        datedAt: Joi.string()
          .required()
          .regex(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/)
          .messages({
            'any.required': 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
            'string.pattern.base': 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
          }),
        rate: Joi.number()
          .required()
          .greater(0)
          .max(5)
          .messages({
            'any.required': 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
            'number.greater': 'O campo "rate" deve ser um inteiro de 1 à 5',
            'number.max': 'O campo "rate" deve ser um inteiro de 1 à 5',
          }),
      })
      .messages({
        'any.required': 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
      }),
  });

  const result = schema.validate({
    name: req.body.name,
    age: req.body.age,
    date: req.body.date,
  });

  if (result.error) {
    return res.status(400).send(result.error.details[0]);
  }
  // --

  req.body.id = crushes.length + 1;
  crushes.push(req.body);
  await fs.writeFile('./crush.json', JSON.stringify(crushes));

  return res.status(201).json(req.body);
});

// CRUSH/:ID GET
app.get('/crush/:id', async (req, res) => {
  const crushes = JSON.parse(await fs.readFile('./crush.json'));
  const crush = await crushes.find((c) => c.id === parseInt(req.params.id, 10));
  if (!crush) return res.status(404).send({ message: 'Crush não encontrado' });
  return res.status(200).send(crush);
});

// CRUSH/:ID PUT
app.put('/crush/:id', async (req, res) => {
  const crushes = JSON.parse(await fs.readFile('./crush.json', 'utf-8'));

  const myCrush = crushes.find((c) => c.id === parseInt(req.params.id, 10));
  if (!myCrush) return res.status(404).send('Esse id não existe!');

  // Token
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Token não encontrado' });
  }
  if (req.headers.authorization.length < 16) {
    return res.status(401).send({ message: 'Token inválido' });
  }

  //  VALIDAÇÃO
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .min(3)
      .messages({
        'any.required': 'O campo "name" é obrigatório',
        'string.empty': 'O campo "name" é obrigatório',
        'string.min': 'O "name" deve ter pelo menos 3 caracteres',
      }),
    age: Joi.number()
      .required()
      .integer()
      .greater(17)
      .messages({
        'any.required': 'O campo "age" é obrigatório',
        'number.greater': 'O crush deve ser maior de idade',
      }),
    date: Joi.object()
      .required()
      .keys({
        datedAt: Joi.string()
          .required()
          .regex(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/)
          .messages({
            'any.required': 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
            'string.pattern.base': 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
          }),
        rate: Joi.number()
          .required()
          .greater(0)
          .max(5)
          .messages({
            'any.required': 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
            'number.greater': 'O campo "rate" deve ser um inteiro de 1 à 5',
            'number.max': 'O campo "rate" deve ser um inteiro de 1 à 5',
          }),
      })
      .messages({
        'any.required': 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
      }),
  });

  const result = schema.validate({
    name: req.body.name,
    age: req.body.age,
    date: req.body.date,
  });

  if (result.error) {
    return res.status(400).send(result.error.details[0]);
  }
  // --

  crushes[parseInt(req.params.id - 1, 10)] = req.body;
  crushes[parseInt(req.params.id - 1, 10)].id = parseInt(req.params.id, 10);

  await fs.writeFile('./crush.json', JSON.stringify(crushes));

  console.log(crushes[parseInt(req.params.id - 1, 10)]);
  return res.status(200).json(crushes[parseInt(req.params.id - 1, 10)]);
});

// CRUSH/:ID DELETE
app.delete('/crush/:id', async (req, res) => {
  const crushes = JSON.parse(await fs.readFile('./crush.json', 'utf-8'));

  const myCrush = crushes.find((c) => c.id === parseInt(req.params.id, 10));
  if (!myCrush) return res.status(404).send('Esse id não existe!');

  // Token
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Token não encontrado' });
  }
  if (req.headers.authorization.length < 16) {
    return res.status(401).send({ message: 'Token inválido' });
  }

  const index = crushes.indexOf(myCrush);
  crushes.splice(index, 1);

  await fs.writeFile('./crush.json', JSON.stringify(crushes));

  res.status(200).send({ message: 'Crush deletado com sucesso' });
});

app.post('/login', async (req, res) => {
  const myToken = gen(16);

  // VALIDAÇÃO
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required()
      .messages({
        'any.required': 'O campo "email" é obrigatório',
        'string.email': 'O "email" deve ter o formato "email@email.com"',
      }),
    password: Joi.string()
      .min(6)
      .required()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .messages({
        'any.required': 'O campo "password" é obrigatório',
        'string.empty': 'O campo "password" é obrigatório',
        'string.min': 'A "senha" deve ter pelo menos 6 caracteres',
      }),
  });

  const result = schema.validate({ email: req.body.email, password: req.body.password });

  if (result.error) {
    return res.status(400).send(result.error.details[0]);
  }
  // --

  return res.send({ token: myToken });
});

app.listen(port, () => console.log('Listening on 3000...'));
