const { objectify, removeCrush } = require('../services/utils');
const { success } = require('../services/dictionary');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    await removeCrush(id);
    res.status(200).json({ message: success.crushDeleted });
  } catch (err) {
    err.message = objectify(err.message);
    next(err);
  }
};
