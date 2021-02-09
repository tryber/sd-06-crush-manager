const express = require('express');
const { getAllCrushes,
  getCrushById,
  login,
  emailValidator,
  passwordValidator,
  createCrush,
  validateToken,
  validateName,
  validateAge,
  validateDate,
  updateCrush,
  deleteCrush,
} = require('./middleware');
const { handleError } = require('./middleware/errorHandling/helpers');

const router = express.Router();

router.get('/crush', getAllCrushes);
router.get('/crush/:id', getCrushById);
router.post('/login', emailValidator, passwordValidator, login);

router.delete('/crush/:id', validateToken, deleteCrush);

router.use(validateToken, validateName, validateAge, validateDate);
router.post('/crush', createCrush);
router.put('/crush/:id', updateCrush);

router.use((err, _req, res, _next) => {
  handleError(err, res);
});

module.exports = router;
