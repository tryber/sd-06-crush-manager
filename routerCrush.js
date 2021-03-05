const express = require('express');

const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const bodyParser = require('body-parser');
const validateToken = require('./middlewareValidateToken');
const { validateName, validateAge, validateDate } = require('./validationMiddleware');

router.use(bodyParser.json());

/* função alterada novamente: agora com tratamento do caso de erro, com a ajuda
do Gargani que me esclareceu como lidar neste caso o erro */
const readCrushJson = async () => {
  const content = await fs.readFile('./crush.json', 'utf-8')
    .then((response) => JSON.parse(response))
    .catch((err) => new Error('Não foi possível ler o arquivo', err));
  return content;
};

router.get('/', async (_req, res) => {
  const crushList = await readCrushJson();
  if (!crushList) return res.status(200).send([]);
  res.status(200).send(crushList);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const crushList = await readCrushJson();
  const filteredCrushById = crushList.find((crush) => crush.id === +id);
  if (!filteredCrushById) return res.status(404).json({ message: 'Crush não encontrado' });
  return res.status(200).send(filteredCrushById);
});

const WriteCrushJson = async (content) => {
  fs.writeFile(
    path.resolve(__dirname, '.', 'crush.json'),
    JSON.stringify(content),
    (err) => { if (err) throw err; },
  );
};

const addNewCrush = async (crush) => {
  const oldCrushJson = await readCrushJson();
  const newCrushJson = [...oldCrushJson, crush];
  await WriteCrushJson(newCrushJson);
};

router.post('/', validateToken, validateName, validateAge, validateDate, async (req, res) => {
  const { name, age, date } = req.body;
  const arrayCrush = await readCrushJson();
  const id = arrayCrush.length + 1;
  const newCrush = { id, name, age, date };

  addNewCrush(newCrush);
  return res.status(201).json(newCrush);
});

router.put('/:id', validateToken, validateName, validateAge, validateDate, async (req, res) => {
  const { id } = req.params;
  const { name, age, date } = req.body;

  const crushList = await readCrushJson();
  const crushJsonWithoutFilteredCrush = crushList.filter((crush) => crush.id !== +id);

  await WriteCrushJson(crushJsonWithoutFilteredCrush);

  const editedCrush = { id: parseInt(id, 10), name, age, date };
  await addNewCrush(editedCrush);

  res.status(200).json(editedCrush);
});

module.exports = router;
