const fs = require('fs').promises;
const { getData } = require('./getData');

const updateCrush = async (crush, id) => {
  const editData = await JSON.parse(getData());
  editData.forEach((element, index) => {
    if (element.id === id) {
      editData.splice(index, 1);
    }
  });
  const updateList = [...editData, crush];
  fs.writeFile('./crush.json', JSON.stringify(updateList), (err) => {
    if (err) throw new Error(err);
  });
};

const editCrush = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const editedCrush = { id, ...req.body };
  updateCrush(editedCrush, id);
  res.status(200).json(editedCrush);
};

module.exports = { editCrush };
