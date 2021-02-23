const fs = require('fs').promises;
const { pegandoCrushs } = require('../servicos');

const modificandoCrush = async (crush, id) => {
  const crushData = await pegandoCrushs();
  crushData.forEach((element, index) => {
    if (element.id === id) {
      crushData.splice(index, 1);
    }
  });
  const listaModificada = [...crushData, crush];
  fs.writeFile('./crush.json', JSON.stringify(listaModificada), (err) => {
    if (err) throw new Error(err);
    console.log('File saved');
  });
};

const editandoCrush = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const crushEditado = { id, ...req.body };
  modificandoCrush(crushEditado, id);
  res.status(200).json(crushEditado);
};

module.exports = { editandoCrush };
