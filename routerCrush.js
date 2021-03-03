const express = require('express');

const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const bodyParser = require('body-parser');
const validateToken = require('./middlewareValidateToken');

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

router.post('/', validateToken, async (req, res) => {
  const { name, age, date } = req.body;
  const arrayCrush = await readCrushJson();
  const id = arrayCrush.length + 1;
  const newCrush = { id, name, age, date };

  const regexData = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

  if (!name) { return res.status(400).json({ message: 'O campo "name" é obrigatório' }); }
  if (name.length < 3) { return res.status(400).json({ message: 'O "nome" deve ter pelo menos 3 caracteres' }); }

  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (+age < 18) { return res.status(400).json({ message: 'O crush deve ser maior de idade' }); }

  if (!date || !date.datedAt || !date.rate) { return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' }); }

  if (!regexData.test(date.datedAt)) { return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' }); }

  if (date.rate < 1 || date.rate > 5) { return res.status(400).json({ message: 'O campo "rate" deve ser um número inteiro de 1 à 5' }); }

  addNewCrush(newCrush);
  return res.status(201).json(newCrush);
});

module.exports = router;

// comentário teste
