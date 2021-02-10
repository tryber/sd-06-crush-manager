const fs = require('fs').promises;
const { validateInfo } = require('./validateCrushInfo');
const crushs = require('./crush.json');

const newCrush = (req, res) => {
  const crushInfo = req.body;
  const { name, age, date } = req.body;

  validateInfo(name, age, date, res);

  const allInfo = [...crushs];
  const id = crushs.length + 1;
  const newCrushInfo = {
    id,
    ...crushInfo,
  };
  allInfo.push(newCrushInfo);

  fs.writeFile('./crush.json', JSON.stringify(allInfo));
  res.status(201).send(newCrushInfo);
};

module.exports = { newCrush };
