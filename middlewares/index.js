const auth = require('./auth');
const error = require('./error');
const logger = require('./logger');
const { getCrushs, getCrushById } = require('./gets');
const { postLogin, postToken } = require('./posts');
const { putCrushId } = require('./puts');
const { deleteCrushById } = require('./deletes');

module.exports = {
  auth,
  error,
  logger,
  getCrushs,
  getCrushById,
  postLogin,
  postToken,
  putCrushId,
  deleteCrushById,
};
