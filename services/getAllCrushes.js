const { readFile } = require('../utils/manageFiles');

const getAllCrushes = async (req, res) => {
  const dataFromJson = await readFile();
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
