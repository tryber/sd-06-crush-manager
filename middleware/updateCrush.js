const crushReader = require('../utils/crushReader.js');
const crushWriter = require('../utils/crushWriter.js');

const crushUpdater = (req, crushToUpdate) => {
  const { name, age, date, date: { datedAt, rate } } = req.body;
  const updatedCrush = { ...crushToUpdate };
  updatedCrush.name = name;
  updatedCrush.age = age;
  updatedCrush.date = date;
  updatedCrush.date.datedAt = datedAt;
  updatedCrush.date.rate = rate;

  return updatedCrush;
};

const updateCrush = async (req, res) => {
  const crushId = Number(req.params.id);
  const currentCrushes = await crushReader();
  const crushIndexInFile = currentCrushes.findIndex((crush) => crush.id === crushId);
  const crushToUpdate = currentCrushes.find((crush) => crush.id === crushId);
  const updatedCrush = crushUpdater(req, crushToUpdate);

  currentCrushes.splice(crushIndexInFile, 1, updatedCrush);

  await crushWriter(currentCrushes);

  res.status(200).json(updatedCrush);
};

module.exports = updateCrush;
