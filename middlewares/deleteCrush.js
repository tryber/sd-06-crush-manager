const fs = require('fs').promises;
const { getCrushes } = require('../helpers');

const updateArrayCrushes = async (id) => {
  const currentArray = await getCrushes();
  const index = currentArray.findIndex((element) => element.id === id);
  currentArray.splice(index, 1);
  fs.writeFile('./crush.json', JSON.stringify(currentArray));
};

const deleteCrush = (req, res) => {
  const id = parseInt(req.params.id, 10);
  updateArrayCrushes(id);

  res.status(200).json({ message: 'Crush deletado com sucesso' });
};

module.exports = { deleteCrush };
