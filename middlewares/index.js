const auth = require('./auth');
const error = require('./error');
const logger = require('./logger');
const { getCrushs, getCrushById } = require('./gets');
const { postLogin } = require('./posts');

module.exports = {
  auth,
  error,
  logger,
  getCrushs,
  getCrushById,
  postLogin,
};
