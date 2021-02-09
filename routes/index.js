const routes = require('express').Router();
const { readFile } = require('../utils/fileFunctions');

routes.get('/crush', async (req, res) => {
  const file = await readFile('crush');
  res.status(200).json(JSON.parse(file));
});

routes.get('/crush/:id', async (req, res) => {
  const crushId = parseInt(req.params.id, 10);
  const fullFile = await readFile('crush');
  const idFile = JSON.parse(fullFile).find((crush) => crush.id === crushId);
  res.status(200).json(idFile);
});

module.exports = routes;
