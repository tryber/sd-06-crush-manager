const { verifyCrushes } = require('./verifyCrushes');
const { getByIdCrush } = require('./getByIdCrush');
const login = require('./login');
const searchCrush = require('./searchCrush');
const { putCrush } = require('./putCrush');
const { delCrush } = require('./delCrush');
const { authToken } = require('./authToken');

module.exports = {
  verifyCrushes,
  getByIdCrush,
  login,
  searchCrush,
  putCrush,
  delCrush,
  authToken,
};
