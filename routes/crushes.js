const express = require('express');
const {
  getCrushes,
  getCrush,
  createCrush,
  updateCrush,
  deleteCrush,
} = require('../controllers/crushes');

const router = express.Router();

// req1
router.get('/', getCrushes);

// req2
router.get('/:id', getCrush);

// req4
router.post('/', createCrush);

// req5
router.put('/:id', updateCrush);

// req6
router.delete('/:id', deleteCrush);

module.exports = router;
