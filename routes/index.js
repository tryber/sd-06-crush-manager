const express = require('express');

const router = express();

const {
  getAllCrushes,
  getSpecificCrush,
  generateToken,
} = require('../controllers');

router.get('/crush/:id', getSpecificCrush);

router.get('/crush', getAllCrushes);

router.post('/login', generateToken);

module.exports = router;
