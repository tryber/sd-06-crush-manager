const { readCrushs, writeCrushFile } = require('../utils/manageFiles');

const pathCrush = '../../crush.json';

const updateCrushs = async (req, res) => {
  const { id } = req.params;
  const { name, age, date: { datedAt, rate } } = req.body;

  const arrayCrushs = await readCrushs(pathCrush);

  const crushIndex = arrayCrushs.findIndex((crush) => crush.id === Number(id));

  if (crushIndex === -1) {
    return res.status(401).send({ message: 'Id inválido' });
  }

  arrayCrushs[crushIndex] = {
    name,
    age,
    id: Number(id),
    date: {
      datedAt,
      rate,
    },
  };

  writeCrushFile(pathCrush, arrayCrushs);

  res.status(200).send(arrayCrushs[crushIndex]);
};

module.exports = updateCrushs;
