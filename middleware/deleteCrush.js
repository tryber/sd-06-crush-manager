const crushReader = require('../utils/crushReader.js');
const crushWriter = require('../utils/crushWriter.js');

const deleteCrush = async (req, res) => {
  const crushId = Number(req.params.id);
  const currentCrushes = await crushReader();
  const indexToDelete = currentCrushes.findIndex((crush) => crush.id === crushId);
  currentCrushes.splice(indexToDelete, 1);
  await crushWriter(currentCrushes);
  res.status(200).json({
    message: 'Crush deletado com sucesso',
  });
};

module.exports = deleteCrush;
