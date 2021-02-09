const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());

// const authToken = require('./token.json').token;

const validateCrush = async (req, res, next) => {
  const reqToken = req.headers.authorization;
  const { name, age, date } = req.body;
  const regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
  // console.log(reqToken);
  if (!reqToken) {
    return res.status(401).send({ message: 'Token não encontrado' });
  }
  if (reqToken.length !== 16) {
    return res.status(401).send({ message: 'Token inválido' });
  }

  if (!name || name === undefined) {
    return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  }
  if (name && name === '') {
    return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  }
  if (name && name.length < 3) {
    return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  if (!age || age === null || age === undefined) {
    return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  }
  if (age && age === '') {
    return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  }
  if (age && typeof age !== 'number') {
    return res.status(400).send({ message: 'O campo "age" deve ser um inteiro' });
  }
  if (age && age < 18) {
    return res.status(400).send({ message: 'O crush deve ser maior de idade' });
  }

  if (!date || date === undefined) {
    return res.status(400).send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (!date.datedAt || date.datedAt === undefined) {
    return res.status(400).send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (date.datedAt === '' || date.rate === '') {
    return res.status(400).send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (!regex.test(date.datedAt)) {
    return res.status(400).send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (Number(date.rate) < 1 || Number(date.rate) > 5) {
    return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!date.rate || date.rate === undefined) {
    return res.status(400).send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }

  next();
};

module.exports = validateCrush;
