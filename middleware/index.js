const getAllCrushes = require('./getAllCrushes');
const getCrushById = require('./getCrushById');
const { login, emailValidator, passwordValidator } = require('./login');

module.exports = {
  getAllCrushes, getCrushById, login, emailValidator, passwordValidator,
};
