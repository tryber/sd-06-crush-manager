const arrayCrushs = require('../../crush.json');
// const { writeCrushFile } = require('../utils/manageFiles');

const updateCrushs = async (req, res) => {
  const idCrush = req.params.id;
  // const { name, age, date: { datedAt, rate } } = req.body;

  const resultFilterIdCrush = arrayCrushs.find((crush) => crush.id === Number(idCrush));

  console.log();

  res.status(200).send(resultFilterIdCrush);
};

module.exports = updateCrushs;
