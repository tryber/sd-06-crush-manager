const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const { parsedData } = require('./utils/readCrushData');

app.use(bodyParser.json());

async function editCrush(request, response) {
  const { id } = request.params.id;
  const data = await parsedData();
  const crushId = data.findIndex((crush) => crush.id === parseInt(id, 10));
  const { name, age, date } = request.body;

  data[crushId] = { ...data[crushId], name, age, date };
  const crusheddited = data[crushId];

  response.status(200).json(crusheddited);
}

module.exports = {
  editCrush,
};
