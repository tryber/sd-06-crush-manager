const express = require('express');
const bodyParser = require('body-parser');
const utils = require('../utils');

const app = express();
app.use(bodyParser.json());

module.exports = async (req, res) => {
  const { id } = req.params;
  const file = await utils.readFile();
  if (id > 4) res.status(404).json({ message: 'Crush não encontrado' });
  const response = JSON.parse(file).find((people) => people.id === Number(id));
  res.status(200).json(response);
};
