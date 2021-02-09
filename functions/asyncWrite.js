const fs = require('fs').promises;

function asyncWrite(data) {
  fs.writeFile('./crush.json', data);
}

module.exports = asyncWrite;
