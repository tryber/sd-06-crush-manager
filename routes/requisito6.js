const { writeFile, readFile } = require('../utils/manageFiles');
const {
  handleAuth,
} = require('../utils/errorFunctions');

const SUCCESS = 200;
const ERROR401 = 401;
const fileName = 'crush.json';

const deleteCrush = async (request, response, _next) => {
  const { authorization } = request.headers;
  const id = parseInt(request.params.id, 10);

  const authStatus = handleAuth(authorization);

  if (authStatus) return response.status(ERROR401).json(authStatus);

  const file = await readFile(fileName);
  const fileToUpdate = JSON.parse(file);
  const filterToEdit = fileToUpdate.filter((crush) => crush.id !== id);

  await writeFile(fileName, JSON.stringify(filterToEdit, 0, 2));
  return response.status(SUCCESS).json({ message: 'Crush deletado com sucesso' });
};

module.exports = deleteCrush;
