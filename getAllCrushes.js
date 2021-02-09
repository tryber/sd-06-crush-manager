const fs = require('fs').promises;
// const util = require('util');

// https://nodejs.org/api/util.html#util_util_promisify_original
const readFilePromise = fs.readFile;

const getAllCrushes = async (_req, res) => {
  const file = 'crush.json';

  readFilePromise(file)
    .then((content) => res.status(200).send(JSON.parse(content)))
    .catch((error) => console.log(error));
};

module.exports = { getAllCrushes };
