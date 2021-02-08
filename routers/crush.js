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

module.exports = router;
