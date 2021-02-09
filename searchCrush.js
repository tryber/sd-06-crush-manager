const fileContent = require('./fileContent');

const file = './crush.json';

const searchCrush = async (request, response) => {
  const crushList = await fileContent(file);
  const crushListJSON = JSON.parse(crushList);
  if (!request.query.q || request.query.q === '') return response.status(200).send(crushListJSON);
  const crushSearched = crushListJSON
    .filter((crush) => crush.name.includes(request.query.q));
  response.status(200).send(crushSearched);
};

module.exports = searchCrush;
