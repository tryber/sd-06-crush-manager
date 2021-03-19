const readFile = require('./read.js');

const searchCrush = async (request, response) => {
  const data = await readFile();
  if (!request.query.q || request.query.q === '') return response.status(200).send(data);
  const queryTerm = request.query.q;
  const query = data.filter((crush) => crush.name.includes(queryTerm));
  response.status(200).send(query);
};

module.exports = searchCrush;
