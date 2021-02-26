const Model = require('../models/createCrushModel');

const createCrush = async (req, res) => {
  const { name, age, date } = req.body;
  const result = await Model.createCrush(name, age, date);

  res
    .status(201)
    .json(result);
};

module.exports = createCrush;
