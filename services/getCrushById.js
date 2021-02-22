const { readFile } = require('../utils/manageFiles');

const getCrushById = async (req, res) => {
  const { id } = req.params;
  const result = await readFile();
  const filteredID = await result.find((crush) => crush.id === parseInt(id, 10));
  if (filteredID === undefined) return res.status(404).send({ message: 'Crush não encontrado' });

  res
    .status(200)
    .json(filteredID);
};

module.exports = getCrushById;
