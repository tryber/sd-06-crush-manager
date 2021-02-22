const readCrushId = require('./readCrushId');
const readCrushes = require('./readCrushes');
const validateCrush = require('./validateCrush');
const validateLogin = require('./validateLogin');
const editCrush = require('./editCrush');
const deleteCrush = require('./deleteCrush');

module.exports = {
  readCrushes,
  readCrushId,
  validateCrush,
  validateLogin,
  deleteCrush,
  editCrush,
};
