const { readCrushFile } = require('../util');

const SUCCESS = 200;

const standardResponse = (_request, response) => {
  response.status(SUCCESS).send();
};

const getCrushes = async (_req, res) => {
  const allCrushes = await readCrushFile();
  res.status(SUCCESS).send(allCrushes);
};

const getCrush = async (req, res) => {
  const allCrushes = await readCrushFile();
  const { id } = req.params;
  const crush = allCrushes.find((each) => each.id === +id);
  if (crush) {
    res.status(SUCCESS).send(crush);
  } else {
    const message = 'Crush não encontrado';
    res.status(404).send({ message });
  }
};

module.exports = {
  getCrushes,
  getCrush,
  standardResponse,
};
