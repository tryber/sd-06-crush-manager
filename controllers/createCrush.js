const { objectify, addNewCrush } = require('../services/utils');

module.exports = async (req, res, next) => {
  try {
    const { body } = req;
    const newCrush = await addNewCrush(body);
    res.status(201).json(newCrush);
  } catch (err) {
    err.message = objectify(err.message);
    next(err);
  }
};
