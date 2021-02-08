const fs = require('fs');

const path = require('path');

const filePath = path.basename('../crush.json');

const crushReader = async () => {
  const file = await fs.readFile(filePath, (error, data) => {
    if (error) throw new Error('file could not be read');
    return data;
  });
  return JSON.parse(file);
};

module.exports = crushReader;
