const fs = require('fs').promises;
const { getCrushes } = require('../helpers');

const updateArrayCrushes = async (crush, id) => {
  const currentArray = await getCrushes();
  const index = currentArray.findIndex((element) => element.id === id);
  currentArray.splice(index, 1);
  const updatedArray = [...currentArray, crush];
  fs.writeFile('./crush.json', JSON.stringify(updatedArray));
};

const updateCrush = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const newCrush = { id, ...req.body };
  updateArrayCrushes(newCrush, id);
  res.status(200).json(newCrush);
};

module.exports = { updateCrush };
