const { readFile } = require('../utils/manageFiles');

const searchCrush = async (query) => {
  const arrayJson = await readFile();

  return arrayJson.filter((el) => el.name.toLowerCase().includes(query.toLowerCase()));
};

module.exports = {
  searchCrush,
};
