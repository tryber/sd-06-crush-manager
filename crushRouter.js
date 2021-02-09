const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const SUCCESS = 200;
const CREATED = 201;
const badRequest = 400;
const Unauthorized = 401;
const notFound = 404;

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

  res.status(notFound).send({ message: 'Crush não encontrado' });
});

router.get('/', (req, res) => {
  const { crushes } = req;
  if (!crushes || crushes.length === 0) return res.status(200).send([]);

  if (crushes && crushes.length > 0) return res.status(SUCCESS).send(crushes);
});

router.post('/', (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(Unauthorized).send({ message: 'Token não encontrado' });
  if (authorization && authorization.length !== 16) return res.status(Unauthorized).send({ message: 'Token inválido' });

  const { name, age, date } = req.body;
  if (!name || name === '') return res.status(badRequest).send({ message: 'O campo "name" é obrigatório' });
  if (name && name.length < 3) return res.status(badRequest).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });

  if (!age || age === null || !Number.isInteger(age)) return res.status(badRequest).send({ message: 'O campo "age" é obrigatório' });
  if (age && Number.isInteger(age) && age < 18) return res.status(badRequest).send({ message: 'O crush deve ser maior de idade' });

  if (!date || date === null || !date.datedAt || !date.rate) {
    return res.status(badRequest)
      .send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  const reg = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
  const validDatedAt = reg.test(String(date.datedAt).toLowerCase());
  if (!validDatedAt) return res.status(badRequest).send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  if (!Number.isInteger(date.rate) || date.rate < 1 || date.rate > 5) {
    return res.status(badRequest)
      .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  const maxId = req.crushes.reduce((max, curr) => {
    if (max > curr.id) return max;
    return curr.id;
  });

  req.body.id = maxId + 1;
  res.status(CREATED).send(req.body);
});

router.put('/:id', (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(Unauthorized).send({ message: 'Token não encontrado' });
  if (authorization && authorization.length !== 16) return res.status(Unauthorized).send({ message: 'Token inválido' });

  const { name, age, date } = req.body;
  if (!name || name === '') return res.status(badRequest).send({ message: 'O campo "name" é obrigatório' });
  if (name && name.length < 3) return res.status(badRequest).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });

  if (!age || age === null || !Number.isInteger(age)) return res.status(badRequest).send({ message: 'O campo "age" é obrigatório' });
  if (age && Number.isInteger(age) && age < 18) return res.status(badRequest).send({ message: 'O crush deve ser maior de idade' });

  if (!date
    || !date.datedAt || (!date.rate && date.rate !== 0)) {
    return res.status(badRequest)
      .send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  const reg = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
  const validDatedAt = reg.test(String(date.datedAt).toLowerCase());
  if (!validDatedAt) return res.status(badRequest).send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  if (!Number.isInteger(date.rate) || date.rate < 1 || date.rate > 5) {
    return res.status(badRequest)
      .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  const { id } = req.params;
  const crushIndex = req.crushes.findIndex((person) => person.id === Number(id));

  const updatedCrush = { ...req.body, id: Number(id) };
  if (crushIndex >= 0) {
    req.crushes[crushIndex] = updatedCrush;
  }
  res.status(SUCCESS).send(updatedCrush);
});

router.delete('/:id', async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(Unauthorized).send({ message: 'Token não encontrado' });
  if (authorization && authorization.length !== 16) return res.status(Unauthorized).send({ message: 'Token inválido' });

  const { id } = req.params;
  const crushIndex = req.crushes.findIndex((person) => person.id === Number(id));

  if (crushIndex >= 0) {
    try {
      const deleteCrush = req.crushes.filter((person) => person.id !== Number(id));
      const crushJson = await JSON.parse(deleteCrush);
      await fs.writeFile('crush.json', crushJson, 'utf-8');
      res.status(SUCCESS).send({ message: 'Crush deletado com sucesso' });
    } catch (e) {
      throw new Error(e);
    }
  }
});

module.exports = router;
