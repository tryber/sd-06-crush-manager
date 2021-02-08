const fs = require('fs').promises;

const lerCrush = async () => {
  const lista = await fs.readFile('crush.json', 'utf8', (error) => {
    if (error) throw console.log(' Erro ao ler o arquivo');
  });
  return JSON.parse(lista);
};

module.exports = async (req, res) => {
  const crushList = await lerCrush();
  if (crushList === '') return res.status(200).json(crushList);
  return res.status(200).json(crushList);
};
