const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const SUCCESS = 200;

router.use((req, _res, next) => {
  const crushPath = path.join('', 'crush.json');
  const crushJson = fs.readFileSync(crushPath);
  const crush = JSON.parse(crushJson);
  req.crushes = crush;
  next();
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const result = (id && id >= 0) && req.crushes.find((person) => person.id === Number(id));

  if (result) return res.status(SUCCESS).send(result);

  res.status(404).send({ message: 'Crush não encontrado' });
});

router.get('/', (req, res) => {
  const { crushes } = req;
  if (!crushes || crushes.length === 0) return res.status(200).send([]);

  if (crushes && crushes.length > 0) return res.status(SUCCESS).send(crushes);
});

module.exports = router;
