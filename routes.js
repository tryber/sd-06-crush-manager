const express = require('express');
const getAllCrushes = require('./middleware/getAllCrushes.js');
const getCrushById = require('./middleware/getCrushById.js');
const { handleError } = require('./middleware/errorHandling/helpers');

const router = express.Router();

router.get('/crush', getAllCrushes);
router.get('/crush/:id', getCrushById);

router.use((err, _req, res, _next) => {
  handleError(err, res);
});

module.exports = router;
