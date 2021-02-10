const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const { parsedData } = require('./utils/readCrushData');
const { modifyFile } = require('./utils/writeCrushData');

app.use(bodyParser.json());

async function editCrush(request, response) {
  const { id } = request.params.id;
  const data = await parsedData();
  const crushId = data.findIndex((crush) => crush.id === parseInt(id, 10));
  const { name, age, date } = request.body;

  const updateCrush = { id: parseInt(id, 10), name, age, date };
  if (crushId > 0) modifyFile(updateCrush);
  console.log(updateCrush);

  response.status(200).json(updateCrush);
}

module.exports = {
  editCrush,
};
