const express = require('express');
const { getAllCrushes, getCrushById, login, emailValidator, passwordValidator } = require('./middleware');
const { handleError } = require('./middleware/errorHandling/helpers');

const router = express.Router();

router.get('/crush', getAllCrushes);
router.get('/crush/:id', getCrushById);
router.post('/login', emailValidator, passwordValidator, login);

router.use((err, _req, res, _next) => {
  handleError(err, res);
});

module.exports = router;
