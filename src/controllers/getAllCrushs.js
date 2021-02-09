const { readDatabase } = require('../utils/manageDatabase');

const getAllCrushs = async (_request, response) => {
  const data = await readDatabase();
  response.status(200).json(data);
};

module.exports = {
  getAllCrushs,
};
