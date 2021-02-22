const fs = require('fs').promises;
const { getData } = require('./getData');

const deleteCrush = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const delData = await getData();
  const deletedData = JSON.parse(delData);
  const index = deletedData.findIndex((element) => element.id === id);
  if (index !== -1) {
    deletedData.splice(index, 1);
  }
  fs.writeFile('./crush.json', JSON.stringify(deletedData), (err) => {
    if (err) throw new Error(err);
  });
  res.status(200).json({ message: 'Crush deletado com sucesso' });
};

module.exports = { deleteCrush };
