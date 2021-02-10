const path = require('path');
const fs = require('fs').promises;

module.exports = async (req, _res, next) => {
  const crushPath = path.join('', 'crush.json');
  const crushJson = await fs.readFile(crushPath);
  const crush = await JSON.parse(crushJson);
  req.crushes = crush;
  next();
};
