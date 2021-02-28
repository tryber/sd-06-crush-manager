
const fs = require('fs').promises;

module.exports = async (req, res) => {
  const file = JSON.parse(await fs.readFile('./crush.json', 'utf8'));
  const index = file.findIndex((el) => el.id === Number(req.params.id));
  const newCrush = { ...file[index], ...req.body };
  file[index] = newCrush;
  await fs.writeFile('./crush.json', JSON.stringify(file));
  res.status(200).json(newCrush);
};
