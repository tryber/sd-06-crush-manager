const { getData, getDataById } = require('./getCrush');
const validateCrush = require('./validateCrush');
const validateCrushId = require('./validateCrushId');
const validateUser = require('./validateUser');
const validateToken = require('./validateToken');
const deleteCrush = require('./deleteCrush');
const searchCrush = require('./searchCrush');

module.exports = {
  getData,
  getDataById,
  validateCrush,
  validateCrushId,
  validateUser,
  validateToken,
  deleteCrush,
  searchCrush,
};
