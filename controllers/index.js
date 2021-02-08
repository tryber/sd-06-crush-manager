const fs = require('fs');

const getAllCrushes = async (req, res) => {
  await fs.readFile('./crush.json', (err, data) => {
    if (err) throw new Error('oijaojd');
    res.send(JSON.parse(data));
  });
};

const getSpecificCrush = async (req, res) => {
  const { id } = req.params;
  await fs.readFile('./crush.json', (err, data) => {
    if (err) throw new Error('oijaojd');
    const crush = JSON.parse(data).filter((crushObj) => crushObj.id === parseInt(id));
    const response = crush.length > 0 ? crush : { message: 'Crush não encontrado' };
    res.send(response);
  });
};

module.exports = { getAllCrushes, getSpecificCrush };
