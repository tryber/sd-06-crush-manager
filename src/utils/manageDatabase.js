const fs = require('fs/promises');

const databasePathname = './crush.json';

const readDatabase = async () => {
  const file = await fs.readFile(databasePathname, 'utf-8');
  const JSONfile = JSON.parse(file);
  return JSONfile;
};

const writeDatabase = async (pathname, content) => {
  await fs.writeFile(pathname, content, 'utf-8');
  return true;
};

module.exports = {
  readDatabase,
  writeDatabase,
};
