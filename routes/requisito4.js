const { writeFile } = require('../utils/manageFiles');

const SUCCESS = 200;
const ERROR = 400;

const addCrush = (_request, _response, _next) => {
  console.log(SUCCESS, ERROR);
  writeFile();
};

module.exports = addCrush;
