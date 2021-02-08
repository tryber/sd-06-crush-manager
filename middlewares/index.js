const auth = require('./auth');
const logger = require('./logger');
const { getCrushs, getCrushById } = require('./gets');

module.exports = {
  auth,
  logger,
  getCrushs,
  getCrushById,
};
