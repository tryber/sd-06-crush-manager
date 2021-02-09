const fs = require('fs').promises;
const { getCrushes } = require('../helpers');

const addCrushToJson = async (crush, arrayCrush) => {
  const newArray = [...arrayCrush, crush];
  await fs.writeFile('../crush.json', JSON.stringify(newArray));
};

const addNewCrush = async (req, res) => {
  const currentCrushes = await getCrushes();
  const id = currentCrushes.length + 1;
  const newCrush = {
    id,
    ...req.body,
  };
  addCrushToJson(newCrush, currentCrushes);

  res.status(201).json(newCrush);
};

module.exports = { addNewCrush };
