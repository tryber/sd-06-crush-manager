const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const fileContent = (filePath) => readFile(filePath, 'utf8');

module.exports = fileContent;
