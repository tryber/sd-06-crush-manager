const { objectify, updateCrush } = require('../services/utils');

module.exports = async (req, res, next) => {
  try {
    const { body, params: { id } } = req;
    const updatedCrush = await updateCrush(body, id);
    res.status(200).json(updatedCrush);
  } catch (err) {
    err.message = objectify(err.message);
    next(err);
  }
};
