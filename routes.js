const express = require('express');
const { getAllCrushes, getCrushById, login } = require('./middleware');
const { handleError } = require('./middleware/errorHandling/helpers');

const router = express.Router();

router.get('/crush', getAllCrushes);
router.get('/crush/:id', getCrushById);
router.post('/login', login);

router.use((err, _req, res, _next) => {
  handleError(err, res);
});

module.exports = router;
