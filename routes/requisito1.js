const crushJson = require('../crush.json');

const SUCCESS = 200;

const getCrushes = (_request, response) => {
  if (!crushJson[0]) {
    response.status(SUCCESS).send([]);
  }
  response.status(SUCCESS).send(crushJson);
};

module.exports = getCrushes;
