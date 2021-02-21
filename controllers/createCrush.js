const fs = require('fs').promises;

module.exports = async (req, res) => {
  const file = JSON.parse(await fs.readFile('./crush.json', 'utf8'));
  const id = file.length + 1;
  const newCrush = { ...req.body, id };
  const newFile = [...file, newCrush];
  await fs.writeFile('./crush.json', JSON.stringify(newFile));
  res.status(201).json(newCrush);
};
