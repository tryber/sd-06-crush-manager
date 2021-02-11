const express = require('express');

const router = express.Router();

const fs = require('fs');

const verifyCrush = require('../functions/verifyCrush');

const asyncWrite = require('../functions/asyncWrite');

const tokenPass = require('../middlewares/tokenPass');

const SUCCESS = 200;

router.get('/crush', (_req, res) => {
  const data = fs.readFileSync('./crush.json', 'utf8');
  const crushList = JSON.parse(data);

  if (crushList && crushList.length > 0) return res.status(SUCCESS).send(crushList);

  if (!crushList || crushList.length === 0) return res.status(SUCCESS).send([]);
});

router.get('/crush/search', tokenPass, (req, res) => {
  const data = fs.readFileSync('./crush.json', 'utf8');
  const crushList = JSON.parse(data);
  const searchTerm = req.query.q;

  if (!searchTerm) return res.status(200).send(crushList);

  const responseList = crushList.filter((crush) => crush.name.includes(searchTerm));

  if (searchTerm.length === 0) return res.status(200).send([]);

  res.status(200).send(responseList);
});

router.get('/crush/:id', (req, res) => {
  const data = fs.readFileSync('./crush.json', 'utf8');
  const crushList = JSON.parse(data);
  const { id } = req.params;

  const crushIndex = crushList.findIndex((e) => e.id === parseInt(id, 10));

  if (crushIndex === -1) return res.status(404).send({ message: 'Crush não encontrado' });

  res.status(SUCCESS).send(crushList[crushIndex]);
});

router.post('/crush', tokenPass, (req, res) => {
  const data = fs.readFileSync('./crush.json', 'utf8');
  const crushList = JSON.parse(data);
  const { name, age, date } = req.body;

  const crushCheck = verifyCrush(name, age, date);

  if (crushCheck !== true) return res.status(400).send({ message: crushCheck });

  const newCrush = {
    id: crushList.length + 1,
    name,
    age,
    date,
  };

  const newList = crushList.concat(newCrush);
  const file = JSON.stringify(newList);

  asyncWrite(file);

  res.status(201).send(newCrush);
});

router.put('/crush/:id', tokenPass, (req, res) => {
  const data = fs.readFileSync('./crush.json', 'utf8');
  const crushList = JSON.parse(data);
  const { id } = req.params;
  const { name, age, date } = req.body;

  const crushIndex = crushList.findIndex((e) => e.id === parseInt(id, 10));

  if (crushIndex === -1) return res.status(404).send({ message: 'Crush não encontrado' });

  const crushCheck = verifyCrush(name, age, date);

  if (crushCheck !== true) return res.status(400).send({ message: crushCheck });

  const editedCrush = { id: parseInt(id, 10), name, age, date };

  crushList[crushIndex] = editedCrush;

  const file = JSON.stringify(crushList);

  asyncWrite(file);

  res.status(200).send(editedCrush);
});

router.delete('/crush/:id', tokenPass, (req, res) => {
  const data = fs.readFileSync('./crush.json', 'utf8');
  const crushList = JSON.parse(data);
  const { id } = req.params;
  const crushIndex = crushList.findIndex((e) => e.id === parseInt(id, 10));

  if (crushIndex === -1) return res.status(404).send({ message: 'Crush não encontrado' });

  const newList = crushList.slice(crushList[crushIndex], 1);

  const file = JSON.stringify(newList);

  asyncWrite(file);

  res.status(200).send({ message: 'Crush deletado com sucesso' });
});

module.exports = router;
