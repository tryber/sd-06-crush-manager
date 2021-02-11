const { writeFile, readFile } = require('../utils/manageFiles');
const {
  handleAuth,
  handleCrushInfo,
} = require('../utils/errorFunctions');

const SUCCESS = 200;
const ERROR401 = 401;
const ERROR400 = 400;
const fileName = 'crush.json';

const editCrush = async (request, response, _next) => {
  const { authorization } = request.headers;
  const crushToEdit = request.body;
  const id = parseInt(request.params.id, 10);

  const authStatus = handleAuth(authorization);
  const crushInfoStatus = handleCrushInfo(crushToEdit);

  if (authStatus) return response.status(ERROR401).json(authStatus);
  if (crushInfoStatus) return response.status(ERROR400).json(crushInfoStatus);

  const file = await readFile(fileName);
  const fileToUpdate = JSON.parse(file);
  const filterToEdit = fileToUpdate.filter((crush) => crush.id !== id);
  const { name, age, date } = crushToEdit;
  const updatedCrush = {
    id,
    name,
    age,
    date,
  };

  const updatedFile = [...filterToEdit, updatedCrush];

  await writeFile(fileName, JSON.stringify(updatedFile, 0, 2));
  return response.status(SUCCESS).send(updatedCrush);
};

module.exports = editCrush;
