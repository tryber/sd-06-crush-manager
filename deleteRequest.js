const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const { parsedData } = require('./utils/readCrushData');
const { modifyFile } = require('./utils/writeCrushData');

app.use(bodyParser.json());

async function deleteCrush(request, response) {
  const { id } = request.params;
  const data = await parsedData();
  const crushId = parseInt(id, 10);
  const crushIndex = data.findIndex((item) => item.id === crushId);

  const crushDeleted = data.splice(crushIndex, 1);
  const crushes = data.map((crush) => (crush.id === crushId ? crushDeleted : crush));

  if (crushId > 0) modifyFile(crushes);

  response.status(200).json({ message: 'Crush deletado com sucesso' });
}

module.exports = { deleteCrush };
