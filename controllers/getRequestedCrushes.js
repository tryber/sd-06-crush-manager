const { getCrush } = require('../services/utils');
const { objectify } = require('../services/utils');
const { error } = require('../services/dictionary');

module.exports = async (req, res, next) => {
  try {
    const { id = 'all' } = req.params;
    const data = await getCrush(id);
    if (!data) return next(error.noCrush);
    res.status(200).json(data);
  } catch (err) {
    err.message = objectify(err.message);
    next(err);
  }
};
