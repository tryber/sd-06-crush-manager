const express = require('express');

const router = express();

const {
  getAllCrushes,
  getSpecificCrush,
  generateToken,
  postCrush,
} = require('../controllers');

router.get('/crush', getAllCrushes);

router.get('/crush/:id', getSpecificCrush);

router.post('/login', generateToken);

router.post('/crush', postCrush);

module.exports = router;
