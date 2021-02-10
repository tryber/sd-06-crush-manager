const fileContent = require('./fileContent');

const file = './crush.json';

const getAllCrushs = async (request, response) => {
  const data = await fileContent(file);
  response.status(200).send(JSON.parse(data));
};

module.exports = getAllCrushs;
