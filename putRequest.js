const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const { parsedData } = require('./utils/readCrushData');
const { modifyFile } = require('./utils/writeCrushData');

app.use(bodyParser.json());

async function editCrush(request, response) {
  const { id } = request.params;
  const data = await parsedData();
  const { name, age, date } = request.body;
  const parsedId = parseInt(id, 10);
  const updateCrush = { id: parsedId, name, age, date };
  const crushes = data.map((crush) => (crush.id === parsedId ? updateCrush : crush));

  console.log(crushes);
  if (parsedId > 0) modifyFile(crushes);
  // console.log(typeof parsedId);
  // console.log(crushId);

  response.status(200).json(updateCrush);
}

module.exports = {
  editCrush,
};
