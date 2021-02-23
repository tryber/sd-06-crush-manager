const { readFile, writeFile } = require('../utils/manageFiles');

const editCrush = async (req, res) => {
  const { name, age, date } = req.body;
  const { id } = req.params;
  const result = await readFile();

  const newCrush = { name, age, id: parseInt(id, 10), date };

  result.forEach((element, index) => {
    if (element.id === parseInt(id, 10)) {
      result.splice(index, 1, newCrush);
    }
  });

  await writeFile(JSON.stringify(result));
  res
    .status(200)
    .json(newCrush);
};

module.exports = editCrush;
