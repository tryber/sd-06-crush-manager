const { readFile, writeFile } = require('../utils/manageFiles');

const deleteCrush = async (id) => {
  const result = await readFile();

  result.forEach((element, index) => {
    if (element.id === parseInt(id, 10)) {
      result.splice(index, 1);
    }
  });

  await writeFile(JSON.stringify(result));
};

module.exports = { deleteCrush };
