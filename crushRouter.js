const express = require('express');
const fs = require('fs').promises;
const validToken = require('./middlewares/validToken');
const validateCrushData = require('./middlewares/validateCrushData');
const getCrushData = require('./middlewares/getCrushData');

const router = express.Router();

const SUCCESS = 200;
const CREATED = 201;
const notFound = 404;

router.use(getCrushData);

router.get('/search?', validToken, (req, res) => {
  const searchTerm = req.query.q;
  if (!searchTerm || searchTerm === '') return res.status(SUCCESS).send(req.crushes);

  const results = req.crushes.filter((person) => person.name.includes(searchTerm));
  if (results.length === 0) return res.status(SUCCESS).send([]);
  res.status(SUCCESS).send(results);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const result = (id && id >= 0) && req.crushes.find((person) => person.id === Number(id));

  if (result) return res.status(SUCCESS).send(result);

  res.status(notFound).send({ message: 'Crush não encontrado' });
});

router.get('/', (req, res) => {
  const { crushes } = req;
  if (!crushes || crushes.length === 0) return res.status(200).send([]);

  if (crushes && crushes.length > 0) return res.status(SUCCESS).send(crushes);
});

router.post('/', validToken, validateCrushData, async (req, res) => {
  const maxId = req.crushes.reduce((max, curr) => {
    if (max > curr.id) return max;
    return curr.id;
  });

  req.body.id = maxId + 1;
  const newCrushes = [...req.crushes, req.body];
  const newCrushJson = JSON.stringify(newCrushes);
  await fs.writeFile('crush.json', newCrushJson, 'utf-8');
  res.status(CREATED).send(req.body);
});

router.put('/:id', validToken, validateCrushData, async (req, res) => {
  const { id } = req.params;
  const crushIndex = req.crushes.findIndex((person) => person.id === Number(id));

  const updatedCrush = { ...req.body, id: Number(id) };
  if (crushIndex >= 0) {
    req.crushes[crushIndex] = updatedCrush;
    const crushesJson = await JSON.stringify(req.crushes);
    await fs.writeFile('crush.json', crushesJson, 'utf-8');
  }
  res.status(SUCCESS).send(updatedCrush);
});

router.delete('/:id', validToken, async (req, res) => {
  const { id } = req.params;
  const crushIndex = req.crushes.findIndex((person) => person.id === Number(id));

  if (crushIndex > -1) {
    try {
      const deleteCrush = req.crushes.filter((person) => person.id !== Number(id));
      const crushJson = await JSON.stringify(deleteCrush);
      await fs.writeFile('crush.json', crushJson, 'utf-8');
    } catch (e) {
      throw new Error(e);
    }
  }
  res.status(SUCCESS).send({ message: 'Crush deletado com sucesso' });
});

module.exports = router;
