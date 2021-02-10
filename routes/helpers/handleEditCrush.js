const fs = require('fs');

const handleEditCrush = async (req, res) => {
  const { id, ...rest } = req.body;
  const { readData } = res.locals;

  let el = readData.filter((crush) => crush.id === id)[0];
  el = { id, ...rest };
  readData[el.parsedId - 1] = el;
  fs.writeFileSync('./crush.json', JSON.stringify(readData), 'utf8');
  res.status(200).json({ id, ...rest });
};
module.exports = handleEditCrush;
