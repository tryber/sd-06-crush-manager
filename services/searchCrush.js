const readFile = require('./readFile.js');

const SUCCESS = 200;

const searchCrush = async (request, response) => {
  // console.log(queryTerm);
  const data = await readFile();
  if (!request.query.q || request.query.q === '') return response.status(SUCCESS).send(data);
  // const queryTerm = request.query.q;
  const query = data.filter((crush) => crush.name.includes(request.query.q));
  // console.log(query);
  response.status(SUCCESS).send(query);
};

module.exports = searchCrush;
