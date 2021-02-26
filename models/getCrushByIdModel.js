const { readFile } = require('../utils/manageFiles');

const getCrushById = async (id) => {
  const result = await readFile();
  return result.find((crush) => crush.id === parseInt(id, 10));
};

module.exports = { getCrushById };
