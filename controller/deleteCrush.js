const fs = require('fs').promises;
const { getCrushes } = require('../services');

const deleteCrush = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const crushData = await getCrushes();
  crushData.forEach((element, index) => {
    if (element.id === id) {
      crushData.splice(index, 1);
    }
  });
  fs.writeFile('./crush.json', JSON.stringify(crushData), (err) => {
    if (err) throw new Error(err);
    console.log('File deleted');
  });
  res.status(200).json({ message: 'Crush deletado com sucesso' });
};

module.exports = { deleteCrush };
