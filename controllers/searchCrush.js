const { objectify, querySearchCrush } = require('../services/utils');

module.exports = async (req, res, next) => {
  try {
    const { q } = req.query;
    const filteredCrushes = await querySearchCrush(q);
    res.status(200).json(filteredCrushes);
  } catch (err) {
    err.message = objectify(err.message);
    next(err);
  }
};
