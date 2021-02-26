const Model = require('../models/editCrushModel');

const editCrush = async (req, res) => {
  const { name, age, date } = req.body;
  const { id } = req.params;

  const result = await Model.editCrush(id, name, age, date);

  res
    .status(200)
    .json(result);
};

module.exports = editCrush;
