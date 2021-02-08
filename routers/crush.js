const express = require('express');

const { readFile } = require('../file');

const router = express.Router();

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
