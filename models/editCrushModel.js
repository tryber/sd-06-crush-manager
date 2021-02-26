const { readFile, writeFile } = require('../utils/manageFiles');

const editCrush = async (id, name, age, date) => {
  const result = await readFile();
  const newCrush = { name, age, id: parseInt(id, 10), date };

  result.forEach((element, index) => {
    if (element.id === parseInt(id, 10)) {
      result.splice(index, 1, newCrush);
    }
  });

  await writeFile(JSON.stringify(result));

  return newCrush;
};

module.exports = { editCrush };
