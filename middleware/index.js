const getAllCrushes = require('./getAllCrushes');
const getCrushById = require('./getCrushById');
const { login, emailValidator, passwordValidator } = require('./login');
const { createCrush } = require('./createCrush');
const { validateToken } = require('./validators/validateToken');
const validateName = require('./validators/validateName');
const validateAge = require('./validators/validateAge');
const validateDate = require('./validators/validateDate');
const updateCrush = require('./updateCrush');

module.exports = {
  getAllCrushes,
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
};
