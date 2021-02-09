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
    res.status(200).send(crushes);
  } else {
    console.log([]);
    res.status(200).send([]);
  }
});

app.get('/crush/:id', async (req, res) => {
  const crushes = JSON.parse(await fs.readFile('./crush.json'));
  const crush = await crushes.find((c) => c.id === parseInt(req.params.id, 10));
  if (!crush) return res.status(404).send({ message: 'Crush não encontrado' });
  res.status(200).send(crush);
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

  res.send({ token: myToken });
});

app.listen(port, () => console.log('Listening on 3000...'));

// app.get('/crush/:id', async (req, res) => {
//   const crushes = await JSON.parse(fs.readFile('./crush.json'));
//   const crush = crushes.find((c) => c.id === parseInt(req.params.id, 10));
//   if (!crush) return res.status(404).send({ message: 'Crush não encontrado' });
//   res.status(200).send(crush);
// });

// app.post('/login', (req, res) => {
//   const myToken = gen(16);

//   // VALIDAÇÃO
//   const schema = Joi.object({
//     email: Joi.string()
//       .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
//       .required()
//       .messages({
//         'any.required': 'O campo "email" é obrigatório',
//         'string.email': 'O "email" deve ter o formato "email@email.com"',
//       }),
//     password: Joi.string()
//       .min(6)
//       .required()
//       .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
//       .messages({
//         'any.required': 'O campo "password" é obrigatório',
//         'string.empty': 'O campo "password" é obrigatório',
//         'string.min': 'A "senha" deve ter pelo menos 6 caracteres',
//       }),
//   });

//   const result = schema.validate({ email: req.body.email, password: req.body.password });

//   if (result.error) {
//     return res.status(400).send(result.error.details[0].message);
//   }
//   // --

//   const data = req.body;
//   fileCrush.push(data);

//   fs.writeFileSync('crush.json', JSON.stringify(fileCrush));

//   res.send({ token: myToken });
// });
