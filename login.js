const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const router = express.Router();

const SUCCESS = 200;
const badRequest = 400;

router.use((req, _res, next) => {
  const crushPath = path.join('', 'crush.json');
  const crushJson = fs.readFileSync(crushPath);
  const crush = JSON.parse(crushJson);
  req.crushes = crush;
  next();
});

router.post('/', (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emptyEmail = (!email || email === '');
  const validEmail = (email) && reg.test(String(email).toLowerCase());
  const emptyPassword = (!password || password.length === 0);
  const validPassword = (password && password.length >= 6);

  if (emptyEmail) return res.status(badRequest).send({ message: 'O campo "email" é obrigatório' });
  if (!emptyEmail && !validEmail) return res.status(badRequest).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  if (emptyPassword) return res.status(badRequest).send({ message: 'O campo "password" é obrigatório' });
  if (!emptyPassword && !validPassword) return res.status(badRequest).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });

  const token = crypto.randomBytes(16).toString('hex');

  res.status(SUCCESS).send({ token });
});

module.exports = router;
