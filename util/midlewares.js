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
    const crushFound = myFile.filter((crush) => crush.id === +id);
    console.log(crushFound);
    response.status(200).send(JSON.parse(crushFound));
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
};

module.exports = {
  read,
  parser,
  getById,
};
