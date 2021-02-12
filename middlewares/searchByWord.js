const fs = require('fs').promises;

const readDB = async () => fs.readFile('./crush.json', 'utf-8', (crushes) => {
  if (!crushes) throw new Error('error');
  return JSON.parse(crushes);
});

const searchByWord = async (req, res) => {
  const finder = req.query.q;
  const crushes = await readDB();

  if (!finder || finder === '') return res.status(200).json(crushes);

  const research = crushes.filter((crush) => crush.name.includes(finder));
  if (!research) return res.status(200).json([]);
  return res.status(200).json(research);
};

module.exports = { searchByWord };
