const { getCrushList } = require('./getCrushList');
const { getCrushById } = require('./getCrushById');
const { generateLoginToken } = require('./generateToken');
const { authToken } = require('./authToken');
const { validateCrush } = require('./validateCrush');
const { createANewCrush } = require('./createNewCrush');
const { editCrush } = require('./editCrush');
const { deleteCrush } = require('./deleteCrush');
const { lookForCrush } = require('./lookForCrush');

module.exports = {
  getCrushList,
  getCrushById,
  generateLoginToken,
  authToken,
  validateCrush,
  createANewCrush,
  editCrush,
  deleteCrush,
  lookForCrush,
};
