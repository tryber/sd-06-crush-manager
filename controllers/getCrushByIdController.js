const Model = require('../models/getCrushByIdModel');

const getCrushById = async (req, res) => {
  const { id } = req.params;
  const filteredID = await Model.getCrushById(id);

  if (filteredID === undefined) return res.status(404).send({ message: 'Crush não encontrado' });

  res
    .status(200)
    .json(filteredID);
};

module.exports = getCrushById;
