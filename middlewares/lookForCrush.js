const { readFile } = require('../utils');

const lookForCrush = async (request, response) => {
  const queryParam = request.query.q;

  const crushList = await readFile();

  const crushListJSONParsed = JSON.parse(crushList);

  const searchResult = crushListJSONParsed.filter((crush) => crush.name.includes(queryParam));

  if (!searchResult || searchResult === '') {
    response.status(200).json({ crushListJSONParsed });
  }

  if (searchResult.length < 1) {
    response.status(200).json([]);
  }

  response.status(200).json(searchResult);
};

module.exports = {
  lookForCrush,
};
