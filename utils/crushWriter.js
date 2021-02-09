const fs = require('fs').promises;

const path = require('path');

const filePath = path.basename('../crush.json');

const crushWriter = async (crushes) => {
  await fs.writeFile(filePath, JSON.stringify(crushes), (error, data) => {
    if (error) throw new Error('coudl not write to file');
  });
};

module.exports = crushWriter;
