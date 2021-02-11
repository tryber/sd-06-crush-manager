// const { writeFile, readFile } = require('../utils/manageFiles');
const {
  handleAuth,
} = require('../utils/errorFunctions');

const SUCCESS = 200;
const ERROR401 = 401;
// const fileName = 'crush.json';

const findCrush = async (request, response, _next) => {
  const { authorization } = request.headers;
  const teste = request.query;
  console.log(teste);
  const authStatus = handleAuth(authorization);

  if (authStatus) return response.status(ERROR401).json(authStatus);

  // const file = await readFile(fileName);
  // const fileToSearch = JSON.parse(file);

  // await writeFile(fileName, JSON.stringify(fileToSearch, 0, 2));
  return response.status(SUCCESS).send('saco');
};

module.exports = findCrush;
