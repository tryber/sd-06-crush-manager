const express = require('express');
const bodyParser = require('body-parser');
const utils = require('../utils');

const app = express();
app.use(bodyParser.json());

module.exports = async (req, res) => {
  const query = req.query.q;
  const file = JSON.parse(await utils.readFile());
  if (!query) return res.status(200).json(file);
  const response = file.filter((people) => people.name.includes(query));
  res.status(200).json(response);
};
