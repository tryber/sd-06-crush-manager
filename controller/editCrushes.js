const fs = require('fs').promises;
const { getCrushes } = require('../services');

const updateCrush = async (crush, id) => {
  const crushData = await getCrushes();
  crushData.forEach((element, index) => {
    if (element.id === id) {
      crushData.splice(index, 1);
    }
  });
  const updatedList = [...crushData, crush];
  fs.writeFile('./crush.json', JSON.stringify(updatedList), (err) => {
    if (err) throw new Error(err);
    console.log('File saved');
  });
};

const editCrushes = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedCrush = { id, ...req.body };
  updateCrush(updatedCrush, id);
  res.status(200).json(updatedCrush);
};

module.exports = { editCrushes };
