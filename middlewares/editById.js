const express = require('express');
const bodyParser = require('body-parser');
const utils = require('../utils');

const app = express();
app.use(bodyParser.json());

module.exports = async (req, res) => {
  const { name, age, date } = req.body;
  const id = +req.params.id;

  // name authentication
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });

  // age authentication
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) return res.status(400).json({ message: 'O crush deve ser maior de idade' });

  // date authentication
  if (!date) return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  if (date.rate < 1 || date.rate > 5) return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  if (!date.datedAt || !date.rate) return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  const dateValidator = (dates) => {
    const regex = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
    return regex.test(String(dates).toLocaleLowerCase());
  };
  if (!dateValidator(date.datedAt)) return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  // escrever arquivo
  const file = JSON.parse(await utils.readFile());
  const personIndex = file.findIndex((person) => person.id === id);
  const newCrush = { id, name, age, date };
  file[personIndex] = newCrush;
  utils.writeFile(file);
  return res.status(200).json(file[personIndex]);
};
