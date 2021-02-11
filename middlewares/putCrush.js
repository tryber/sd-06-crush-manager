const fs = require('fs').promises;

const readDB = async () => {
  const crush = await fs.readFile('crush.json', 'utf-8', (err) => {
    if (err) throw new Error(err);
  });
  return JSON.parse(crush);
};

const putCrush = async (req, res) => {
  const read = await readDB();
  const { id } = req.params;
  const filterById = read.find((crush) => crush.id === Number(id));
  if (!filterById) {
    res.status(404).send({ message: 'Crush não encontrado' });
  }
  res.status(200).send(filterById);
};

module.exports = { putCrush };
