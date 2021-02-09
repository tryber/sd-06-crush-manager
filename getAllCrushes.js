const fs = require('fs');
const util = require('util');

// https://nodejs.org/api/util.html#util_util_promisify_original
const readFilePromise = util.promisify(fs.readFile);

const getAllCrushes = async (_req, res) => {
  const file = './crush.json';

  readFilePromise(file)
    .then((content) => {
      res.status(200);
      return res.send(JSON.parse(content));
    })
    .catch((error) => console.log(error));
};

module.exports = { getAllCrushes };
