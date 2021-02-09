const { getData, getDataById } = require('./getCrush');
const validateCrush = require('./validateCrush');
const validateCrushId = require('./validateCrushId');
const validateInfo = require('./validateUser');
const validateToken = require('./validateToken');
const deleteCrush = require('./deleteCrush');
const searchCrush = require('./searchCrush');

module.exports = {
  getData,
  getDataById,
  validateCrush,
  validateCrushId,
  validateInfo,
  validateToken,
  deleteCrush,
  searchCrush,
};
