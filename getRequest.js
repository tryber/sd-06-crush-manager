const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
const { parsedData } = require('./utils/readCrushData');

async function getCrush(_request, response) {
  const data = await parsedData();
  return response.status(200).json(data);
}

async function getCrushId(request, response) {
  const data = await parsedData();
  const crushId = parseInt(request.params.id, 10);
  const crushById = data.find((item) => item.id === crushId);
  if (crushById) return response.status(200).json(crushById);

  response.status(404).send({ message: 'Crush não encontrado' });
}

async function getCrushByTerm(request, response) {
  const data = await parsedData();
  const { q } = request.query;
  console.log(q);
  // const searchTerm = data.includes(q);
  const crushes = data.filter((crush) => crush.name.includes(q));
  if (crushes) return response.status(200).json(crushes);
  if (!q) return response.status(200).json(data);
}

module.exports = {
  getCrush,
  getCrushId,
  getCrushByTerm,
};
