const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const { parsedData } = require('./utils/readCrushData');
const { modifyFile } = require('./utils/writeCrushData');

app.use(bodyParser.json());

async function editCrush(request, response) {
  const { id } = request.params;
  const data = await parsedData();
  const crushId = data.findIndex((crush) => crush.id === parseInt(id, 10));

  const { name, age, date } = request.body;
  const parsedId = parseInt(id, 10);
  const updateCrush = { id: parsedId, name, age, date };
  const newCrushArray = data.concat({ name, age, id, date });
  if (parsedId > 0) modifyFile(newCrushArray);
  // console.log(typeof parsedId);
  console.log(crushId);
  // console.log(updateCrush);

  response.status(200).json(updateCrush);
}

module.exports = {
  editCrush,
};
