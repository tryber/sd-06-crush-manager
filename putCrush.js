const fs = require('fs').promises;
const { validateInfo } = require('./validateCrushInfo');
const crushs = require('./crush.json');

const changeCrush = (req, res) => {
  const crushID = req.params.id;
  const crushInfo = req.body;
  const { name, age, date } = req.body;
  const id = crushs.length + 1;

  validateInfo(name, age, date, res);

  const newCrushInfo = {
    id,
    ...crushInfo,
  };
  const allInfo = [...crushs];
  allInfo.splice(crushID - 1, 1, newCrushInfo);

  fs.writeFile('./crush.json', JSON.stringify(allInfo));
  res.status(200).send(newCrushInfo);
};

module.exports = { changeCrush };
