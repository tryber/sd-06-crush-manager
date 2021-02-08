const crushJson = require('../crush.json');

const SUCCESS = 200;

const getCrushes = (_request, response) => {
  if (!crushJson.length) {
    response.status(SUCCESS).send([]);
  }
  response.status(SUCCESS).send(crushJson);
};

module.exports = getCrushes;
