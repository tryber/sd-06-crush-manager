const fs = require('fs');

const getSpecificCrush = async (req, res) => {
  const { id } = req.params;
  await fs.readFile('./crush.json', (err, data) => {
    if (err) throw new Error('oijaojd');
    const crush = JSON.parse(data).filter((crushObj) => crushObj.id === parseInt(id, 10));
    if (crush.length > 0) {
      res.status(200).send(...crush);
    } else {
      res.status(404).send({ message: 'Crush não encontrado' });
    }
  });
};

module.exports = getSpecificCrush;
