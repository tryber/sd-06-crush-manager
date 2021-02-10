const express = require('express');
const bodyParser = require('body-parser');
const utils = require('../utils');

const app = express();
app.use(bodyParser.json());

module.exports = async (_req, res) => {
  const file = await utils.readFile();
  res.status(200).json(JSON.parse(file));
};
