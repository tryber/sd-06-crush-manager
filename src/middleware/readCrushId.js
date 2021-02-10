const { readFile } = require('../utils/managefile');

const readCrushId = async (req, res) => {
  const crushes = await readFile('crush');
  const id = parseInt(req.params.id, 10);
  const element = JSON.parse(crushes).find((e) => e.id === id);

  if (element) {
    res.status(200).json(element);
  } else {
    res.status(404).json({ message: 'Crush não encontrado' });
  }
};

module.exports = readCrushId;
