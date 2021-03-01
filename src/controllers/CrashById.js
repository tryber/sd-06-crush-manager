const { readCrushs } = require('../utils/manageFiles');

const crushs = '../../crush.json';

const searchCrushById = async (req, res) => {
  const contentCrushs = await readCrushs(crushs);
  const idCrush = req.params.id;

  const resultFilterIdCrush = contentCrushs.find((crush) => crush.id === Number(idCrush));

  if (!resultFilterIdCrush) {
    return res.status(404).send({ message: 'Crush não encontrado' });
  }
  return res.status(200).send(resultFilterIdCrush);
};

module.exports = searchCrushById;
