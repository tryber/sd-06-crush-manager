const express = require('express');
const getAllCrushes = require('./middleware/getAllCrushes.js');

const router = express.Router();

router.get('/crush', getAllCrushes);

module.exports = router;
