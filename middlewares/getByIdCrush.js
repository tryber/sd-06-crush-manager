const fs = require('fs').promises;

const readIndexCrush = async () => {
  const crush = await fs.readFile('crush.json', 'utf-8', (err) => {
    if (err) throw new Error();
  });
  return JSON.parse(crush);
};
// const readDB = async () => fs.readFile('./crush.json', 'utf-8', (crushes) => {
//   if (!crushes) throw new Error('error');
//   return JSON.parse(crushes);
// });

const getByIdCrush = async (req, res) => {
  const results = await readIndexCrush();
  const { id } = req.params;
  const filteredCrush = results.find((crush) => crush.id === Number(id));
  if (!filteredCrush) {
    res.status(404).send({ message: 'Crush não encontrado' });
  }
  res.status(200).send(filteredCrush);
};

module.exports = { getByIdCrush };
