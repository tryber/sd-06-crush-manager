const { readFile } = require('./manageFiles');

const read = async (request, response) => {
  const { fileName } = request.params;
  const myFile = await readFile(fileName);
  response.status(200).json(JSON.parse(myFile));
};

const parser = (request, _response, next) => {
  console.log({
    data: new Date(),
    method: request.method,
    route: request.originalUrl,
  });
  next();
};

const getById = async (request, response) => {
  try {
    const { fileName, id } = request.params;
    const crushes = await readFile(fileName);
    const myFile = JSON.parse(crushes);
    const crushFound = myFile.find((crush) => crush.id === parseInt(id, 10));
    if (!crushFound) return response.status(404).json({ message: 'Crush não encontrado' });
    return response.status(200).json(crushFound);
  } catch (err) {
    return response.status(404).json({ message: 'Crush não encontrado' });
  }
};

module.exports = {
  read,
  parser,
  getById,
};
