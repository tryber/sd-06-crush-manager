const fs = require('fs').promises;

module.exports = (data) => fs.writeFile('./crush.json', JSON.stringify(data));
