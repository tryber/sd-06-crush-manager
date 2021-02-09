const { readCrushFile } = require('../services/utils');
const { objectify } = require('../services/utils');

module.exports = async (req, res, next) => {
  try {
    const data = JSON.parse(await readCrushFile());
    res.status(200).json(data);
  } catch (err) {
    err.message = objectify(err.message);
    next(err);
  }
};
