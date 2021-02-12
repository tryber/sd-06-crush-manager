const express = require('express');
const router = express.Router();

const { getAllCrushes } = require('./middlewares');

router.get('/crush', getAllCrushes);

module.exports = router;
