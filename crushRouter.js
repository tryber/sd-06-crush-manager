const express = require('express');

const crushRouter = express.Router();

const { readFile, writeFile } = require('./useful/readAndWriteFiles');
const {
  characterCount,
  checkDate,
} = require('./useful/verifications');
const resError = require('./useful/resError');

crushRouter.get('/', async (_req, res) => {
  const crushTxt = await readFile('crush');
  return res.status(200).send(crushTxt);
});

crushRouter.get('/:id', async (req, res) => {
  const crushArray = await readFile('crush').then((chushTxt) => JSON.parse(chushTxt));
  const { id } = req.params;
  const crushObj = crushArray.find((objCrush) => objCrush.id === +id);
  const boolError = resError(!crushObj, res, 'Crush não encontrado', 404);
  if (!boolError) return;
  return res.status(200).send(crushObj);
});

crushRouter.use((req, res, next) => {
  const { authorization } = req.headers;
  const boolError = resError(
    !authorization,
    res,
    'Token não encontrado',
    401,
  )
  && resError(
    authorization.length !== 16,
    res,
    'Token inválido',
    401,
  );
  if (!boolError) return;
  next();
});

crushRouter.delete('/:id', async (req, res) => {
  const id = +req.params.id;
  const crushArray = await readFile('crush').then((chushTxt) => JSON.parse(chushTxt));
  const seilamap = crushArray.filter((crush) => crush.id !== id);
  await writeFile('crush', seilamap);
  return res.status(200).json({
    message: 'Crush deletado com sucesso',
  });
});

crushRouter.use((req, res, next) => {
  const {
    name,
    age,
    date,
  } = req.body;
  const boolError = resError(
    !name,
    res,
    'O campo "name" é obrigatório',
    400,
  )
  && resError(
    characterCount(name) < 3,
    res,
    'O "name" deve ter pelo menos 3 caracteres',
    400,
  )
  && resError(
    !age,
    res,
    'O campo "age" é obrigatório',
    400,
  )
  && resError(
    age < 18,
    res,
    'O crush deve ser maior de idade',
    400,
  )
  && resError(
    !date || !date.datedAt || !date.rate,
    res,
    'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    // e não pode ter mes ou dia impossíveis
    400,
  )
  && resError(
    checkDate(date.datedAt),
    res,
    'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    400,
  )
  && resError(
    date.rate < 1 || date.rate > 5,
    res,
    'O campo "rate" deve ser um inteiro de 1 à 5',
    400,
  );
  if (!boolError) return;
  next();
});

crushRouter.post('/', async (req, res) => {
  const crushArray = await readFile('crush').then((chushTxt) => JSON.parse(chushTxt));
  const { body } = req;
  const seila = [body, ...crushArray];
  const seilamap = seila.map((crush, index) => ({
    ...crush,
    id: index + 1,
  }));
  await writeFile('crush', seilamap);
  return res.status(201).json(seilamap[0]);
});

crushRouter.put('/:id', async (req, res) => {
  const id = +req.params.id;
  const crushArray = await readFile('crush').then((chushTxt) => JSON.parse(chushTxt));
  const { body } = req;
  const seilamap = crushArray.map((crush) => {
    if (crush.id === id) {
      return {
        ...body,
        id,
      };
    }
    return crush;
  });
  await writeFile('crush', seilamap);
  return res.status(200).json({
    ...body,
    id,
  });
});

module.exports = crushRouter;
