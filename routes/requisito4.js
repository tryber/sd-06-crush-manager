const { writeFile, readFile } = require('../utils/manageFiles');
const {
  handleAuth,
  handleCrushInfo,
} = require('../utils/errorFunctions');

const SUCCESS = 201;
const ERROR401 = 401;
const ERROR400 = 400;
const fileName = 'crush.json';

const addCrush = async (request, response, _next) => {
  const { authorization } = request.headers;
  const crushToAdd = request.body;

  const authStatus = handleAuth(authorization);
  const crushInfoStatus = handleCrushInfo(crushToAdd);

  if (authStatus) return response.status(ERROR401).json(authStatus);
  if (crushInfoStatus) return response.status(ERROR400).json(crushInfoStatus);

  const file = await readFile(fileName);
  const fileToUpdate = JSON.parse(file);
  const id = fileToUpdate.length + 1;
  const dataToInsert = { id, ...crushToAdd };

  fileToUpdate.push(dataToInsert);

  await writeFile(fileName, JSON.stringify(fileToUpdate, 0, 2));
  return response.status(SUCCESS).send(dataToInsert);
};

module.exports = addCrush;
