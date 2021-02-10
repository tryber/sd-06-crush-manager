const fs = require('fs').promises;

module.exports = () => fs.readFile('./crush.json', 'utf8');
