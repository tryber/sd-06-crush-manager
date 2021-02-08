const express = require('express');

const { readFile } = require('../file');

const router = express.Router();

router.route('/')
  .get(async (req, res, next) => {
    try {
      const crushData = await readFile();

      if (crushData && Array.isArray(crushData) && crushData.length === 0) return res.json([]);

      return res.status(200).json(crushData);
    } catch (error) {
      req.statusCode = 500;
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
        req.statusCode = 404;
        return next('Crush não encontrado');
      }
      return res.status(200).json(foundCrush);
    } catch (error) {
      req.statusCode = 500;
      next(error);
    }
  });

module.exports = router;
