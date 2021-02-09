const express = require('express');

const router = express();

const {
  getAllCrushes,
  getSpecificCrush,
  generateToken,
  postCrush,
  putCrush,
} = require('../controllers');

// Task 1
router.get('/crush', getAllCrushes);

// Task 2
router.get('/crush/:id', getSpecificCrush);

// Task 3
router.post('/login', generateToken);

// Task 4
router.post('/crush', postCrush);

// Task 5
router.put('/crush/:id', putCrush);

module.exports = router;
