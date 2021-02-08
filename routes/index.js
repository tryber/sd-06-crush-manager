const express = require('express');

const router = express();

const {
  getAllCrushes,
  getSpecificCrush,
} = require('../controllers');

router.get('/crush/:id', getSpecificCrush);

router.get('/crush', getAllCrushes);

module.exports = router;
