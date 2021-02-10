const express = require('express');
const bodyParser = require('body-parser');
const utils = require('../utils');

const app = express();
app.use(bodyParser.json());

module.exports = async (req, res) => {
  const id = +req.params.id;
  const file = JSON.parse(await utils.readFile());
  file.splice(id - 1, 1);
  utils.writeFile(file);
  res.status(200).json({ message: 'Crush deletado com sucesso' });
};
