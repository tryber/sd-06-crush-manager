const { getAllCrushes } = require('./getAllCrushes');
const { getCrushById } = require('./getCrushById');
const { generateLoginToken } = require('./generateToken');
const { authToken } = require('./authToken');
const { validateCrush } = require('./validateCrush');
const { createANewCrush } = require('./createNewCrush');

module.exports = {
  getAllCrushes,
  getCrushById,
  generateLoginToken,
  authToken,
  validateCrush,
  createANewCrush,
};
