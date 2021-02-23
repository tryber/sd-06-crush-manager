const express = require('express');
const {
  getCrushes,
  getCrush,
  createCrush,
  editCrush,
  deleteCrush,
  searchCrush,
} = require('../controllers/crushes');

const router = express.Router();

// req7
router.get('/search?', searchCrush);

// req1
router.get('/', getCrushes);

// req2
router.get('/:id', getCrush);

// req4
router.post('/', createCrush);

// req5
router.put('/:id', editCrush);

// req6
router.delete('/:id', deleteCrush);

module.exports = router;
