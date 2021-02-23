const fs = require('fs');

const util = require('util');

const promissifica = util.promisify(fs.readFile);

const readFile = (path) => promissifica(path, 'utf-8');

module.exports = readFile;
