const { getAllCrushs } = require('./readCrushFile');
const { checkEmailAndPass } = require('./checkEmailAndPass');
const { checkAuthentication } = require('./validateAuthToken');
const { checkBody } = require('./checkCrushBody');
const { writeNewCrush } = require('./writeCrushFile');
const { editCrush } = require('./editCrushBody');
const { deleteCrush } = require('./deleteCrush');

module.exports = {
  getAllCrushs,
  checkEmailAndPass,
  checkAuthentication,
  checkBody,
  writeNewCrush,
  editCrush,
  deleteCrush,
};
