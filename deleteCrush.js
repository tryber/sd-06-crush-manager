const fs = require('fs').promises;
const crushs = require('./crush.json');

const deleteCrushId = (req, res) => {
  const crushID = req.params.id;

  const allInfo = [...crushs];
  allInfo.splice(crushID - 1, 1);

  fs.writeFile('./crush.json', JSON.stringify(allInfo));
  res.status(200).send({ message: 'Crush deletado com sucesso' });
};

module.exports = { deleteCrushId };
