const fs = require('fs').promises;

module.exports = async (req, res) => {
  const searchedCrush = Number(req.params.id);
  const crushsId = JSON.parse(
    await fs.readFile('crush.json', 'utf-8', (err, data) => {
      if (err) {
        console.log('Erro', err);
      }
      return data;
    }),
  );

  const foundCrush = crushsId.find((crush) => crush.id === searchedCrush);
  const filteredCrush = crushsId.filter((crush) => foundCrush !== crush);
  await fs.writeFile('crush.json', 'utf-8', (err) => {
    if (err) {
      return console.log('Erro', err);
    }
    return filteredCrush;
  });

  res.status(200).json({ message: 'Crush deletado com sucesso' });
};
