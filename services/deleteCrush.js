const { readFile, writeFile } = require('../utils/manageFiles');

const deleteCrush = async (req, res) => {
  const { id } = req.params;
  const result = await readFile();

  result.forEach((element, index) => {
    if (element.id === parseInt(id, 10)) {
      result.splice(index, 1);
    }
  });

  await writeFile(JSON.stringify(result));

  res
    .status(200)
    .json({ message: 'Crush deletado com sucesso' });
};

module.exports = deleteCrush;
