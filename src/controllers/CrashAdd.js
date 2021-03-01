const arrayCrushs = require('../../crush.json');

const pathCrushs = '../../crush.json';

const { writeCrushFile } = require('../utils/manageFiles');

const addNewCrush = async (req, res) => {
  const { name, age, date: { datedAt, rate } } = req.body;

  // console.log(arrayCrushs[arrayCrushs.length - 1]);

  const newCrush = {
    name,
    age,
    id: arrayCrushs[arrayCrushs.length - 1].id + 1,
    date: {
      datedAt,
      rate,
    },
  };

  writeCrushFile(pathCrushs, [...arrayCrushs, newCrush]);

  return res.status(201).send(newCrush);
};

module.exports = addNewCrush;
