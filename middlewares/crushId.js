const fs = require('fs').promises;

const lerCrush = async () => {
  const lista = await fs.readFile('crush.json', 'utf-8', (err) => {
    if (err) throw console.log('Error Code');
  });
  return JSON.parse(lista);
};

module.exports = async (req, res) => {
  const resultado = await lerCrush();
  const { id } = req.params;
  const filtrarCrush = resultado.find((crush) => crush.id === Number(id));
  if (!filtrarCrush) {
    res.status(404).send({ message: 'Crush não encontrado' });
  }
  res.status(200).send(filtrarCrush);
};
