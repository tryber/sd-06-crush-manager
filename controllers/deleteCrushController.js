const Model = require('../models/deleteCrushModel');

const deleteCrush = async (req, res) => {
  const { id } = req.params;

  await Model.deleteCrush(id);

  res
    .status(200)
    .json({ message: 'Crush deletado com sucesso' });
};

module.exports = deleteCrush;
