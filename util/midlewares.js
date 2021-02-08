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

// const getById = async (request, response) => {
//   const { fileName, id } = request.params;
//   // const myFile = await JSON.parse(readFile(fileName));
//   console.log(`id: ${id}, filename: ${fileName}`);
//   // const crushFound = myFile.filter((crush) => crush.id === parseInt(id));

//   // response.status(200).json(JSON.parse(crushFound));
// };

module.exports = {
  read,
  parser,
  // getById,
};
