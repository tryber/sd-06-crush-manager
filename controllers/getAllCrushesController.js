const Model = require('../models/getAllCrushesModel');

const getAllCrushes = async (req, res) => {
  const dataFromJson = await Model.getAllCrushes();
  if (dataFromJson === []) {
    return res
      .status(200)
      .json([]);
  }
  return res
    .status(200)
    .json(dataFromJson);
};

module.exports = getAllCrushes;
