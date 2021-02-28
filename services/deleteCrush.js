const fs = require('fs').promises;

module.exports = async (req, res) => {
  const file = JSON.parse(await fs.readFile('./crush.json', 'utf8'));
  const newFile = file.filter((el) => el.id !== Number(req.params.id));
  await fs.writeFile('./crush.json', JSON.stringify(newFile));
  res.status(200).json({ message: 'Crush deletado com sucesso' });
};
