const readFile = require('./readFiles');

const findAll = async (require, response) => {
  const crushEndPoint = await readFile('./crush.json');
  response.status(200).send(JSON.parse(crushEndPoint));
};
module.exports = findAll;
