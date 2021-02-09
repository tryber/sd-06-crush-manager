const fs = require('fs');
const path = require('path');
const util = require('util');

// https://nodejs.org/api/util.html#util_util_promisify_original
const readFilePromise = util.promisify(fs.readFile);

const getAllCrushes = async (_req, res) => {
  const file = path.join(__dirname, 'crush.json');

  const allCrushes = await readFilePromise(file);

  res.status(200);
  return res.send(JSON.parse(allCrushes));
};

module.exports = { getAllCrushes };
