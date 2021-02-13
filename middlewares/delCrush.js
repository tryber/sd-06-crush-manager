const fs = require('fs').promises;

const readDB = async () => {
  const crush = await fs.readFile('crush.json', 'utf-8', (err) => {
    if (err) throw new Error('error');
  });
  return JSON.parse(crush);
};

const writeDB = async (crush) => {
  fs.writeFile('crush.json', JSON.stringify(crush), (err) => {
    if (err) throw new Error('error');
  });
};

const delCrush = async (req, res) => {
  const read = await readDB();
  const { id } = Number(req.params);
  const filterById = read.filter((crush) => crush.id !== id);

  await writeDB('./crush.json', filterById);
  return res.status(200).json({ message: 'Crush deletado com sucesso' });
};

module.exports = { delCrush };
