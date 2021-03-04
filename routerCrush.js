const express = require('express');

const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const bodyParser = require('body-parser');
const validateToken = require('./middlewareValidateToken');
const { validateName, validateAge, validateDate } = require('./validationMiddleware');

router.use(bodyParser.json());

/* estava com um erro no retorno da função abaixo e não consegui resolver de outro modo
que não fosse mudando um pouco sua estrutura. O PR do Leo Cavachini me ajudou a perceber
que implementar a função fs.readFile, como vimos nas aulas, passando apenas o caminho e
o como o arquivo será lido é mais simples de lidar do que da maneira que fiz anteriormente:
seguindo a resolução de exercícios do bloco.
link do PR: https://github.com/tryber/sd-06-crush-manager/pull/89/files */
const readCrushJson = async () => {
  const content = await fs.readFile('./crush.json', 'utf-8');
  return JSON.parse(content);
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

module.exports = router;
