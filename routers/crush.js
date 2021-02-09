const express = require('express');

const { readFile, writeFile } = require('../file');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

const validatePayload = ({ name, age, date }, next) => {
  if (!name) return next('O campo "name" é obrigatório');
  if (name.length < 3) return next('O "name" deve ter pelo menos 3 caracteres');

  if (!age) return next('O campo "age" é obrigatório');
  if (age < 18) return next('O crush deve ser maior de idade');

  if (!date || !date.datedAt || !date.rate) return next('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');

  const validateDate = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
  if (date && !validateDate.test(date.datedAt)) {
    return next('O campo "datedAt" deve ter o formato "dd/mm/aaaa"');
  }
  if (date.rate < 1 || date.rate > 5) return next('O campo "rate" deve ser um inteiro de 1 à 5');
};

router.route('/')
  .get(async (req, res, next) => {
    try {
      const crushData = await readFile();

      if (crushData && Array.isArray(crushData) && crushData.length === 0) return res.json([]);

      return res.json(crushData);
    } catch (error) {
      res.statusCode = 500;
      next(error);
    }
  })
  .post(validateToken, async (req, res, next) => {
    try {
      // status code when name, age or date are invalid. It will change to 201 if they are valid
      res.statusCode = 400;
      validatePayload(req.body, next);

      const crushData = await readFile();

      const newCrush = { id: crushData.length + 1, ...req.body };

      const newCrushData = crushData.concat(newCrush);

      await writeFile(JSON.stringify(newCrushData));

      return res.status(201).json(newCrush);
    } catch (error) {
      res.statusCode = 500;
      next(error);
    }
  });

router.route('/:id')
  .get(async (req, res, next) => {
    try {
      const { id } = req.params;
      const crushData = await readFile();

      const foundCrush = crushData.find((crush) => crush.id === Number(id));

      if (!foundCrush) {
        res.statusCode = 404;
        return next('Crush não encontrado');
      }
      return res.json(foundCrush);
    } catch (error) {
      res.statusCode = 500;
      next(error);
    }
  });

module.exports = router;
