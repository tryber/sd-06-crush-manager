const { readFile } = require('../utils/manageFiles');
const {
  handleAuth,
} = require('../utils/errorFunctions');

const SUCCESS = 200;
const ERROR401 = 401;
const fileName = 'crush.json';

const findCrush = async (request, response, _next) => {
  const { authorization } = request.headers;
  const searchTerm = request.query.q;
  const file = await readFile(fileName);
  const fileToSearch = JSON.parse(file);
  const authStatus = handleAuth(authorization);

  if (authStatus) return response.status(ERROR401).json(authStatus);

  if (!searchTerm) return response.status(SUCCESS).send(fileToSearch);
  if (searchTerm) {
    const searchResult = fileToSearch.filter((crush) => (crush.name).includes(searchTerm));

    if (!searchResult) return response.status(SUCCESS).send([]);

    return response.status(SUCCESS).send(searchResult);
  }
};

module.exports = findCrush;
