const {
  getCrushes,
  getCrush,
  createCrush,
  updateCrush,
} = require('../controllers/crushes');

const express = require('express');
const router = express.Router();

// req1
router.get('/', getCrushes);

// req2
router.get('/:id', getCrush);

// req4
router.post('/', createCrush);

// req5
router.put('/:id', updateCrush);

module.exports = router;
