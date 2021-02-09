const readFile = require('./readFile.js');

const SUCCESS = 200;

const searchCrush = async (request, response) => {
  const queryTerm = request.query.q;
  // console.log(queryTerm);
  const data = await readFile();
  const query = data.filter((crush) => crush.name.includes(queryTerm));
  response.status(SUCCESS).send(query);
};

module.exports = searchCrush;
