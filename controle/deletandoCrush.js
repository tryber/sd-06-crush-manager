const fs = require('fs').promises;
const { pegandoCrushs } = require('../servicos');

const deletandoCrush = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const crushData = await pegandoCrushs();
  crushData.forEach((crush, index) => {
    if (crush.id === id) {
      crushData.splice(index, 1);
    }
  });
  fs.writeFile('./crush.json', JSON.stringify(crushData), (err) => {
    if (err) throw new Error(err);
    console.log('File deleted');
  });
  res.status(200).json({ message: 'Crush deletado com sucesso' });
};

module.exports = { deletandoCrush };
