const logger = require('./logger.js');
const error = require('./error.js');
const getAll = require('./getAll.js');
const searchByQuery = require('./searchByQuery.js');
const getById = require('./getById.js');
const login = require('./login.js');
const add = require('./add.js');
const editById = require('./editById.js');
const deleteById = require('./deleteById.js');

module.exports = {
  logger,
  error,
  getAll,
  searchByQuery,
  getById,
  login,
  add,
  editById,
  deleteById,
};
