const { readFile } = require('./manageFiles');

const read = async (request, response) => {
  const { fileName } = request.params;
  const myFile = await readFile(fileName);
  response.status(200).json(myFile);
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
    const myFile = await readFile(fileName);
    const crushFound = myFile.find((crush) => crush.id === parseInt(id, 10));
    if (!crushFound) throw new Error('Crush não encontrado');
    return response.status(200).json(crushFound);
  } catch (err) {
    return response.status(404).json({ message: err.message });
  }
};

module.exports = {
  read,
  parser,
  getById,
};
