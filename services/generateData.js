const fs = require('fs').promises;
const crypto = require('crypto');

async function getData(arq) {
  const data = await fs.readFile(arq);
  return JSON.parse(data);
}

function generateToken() {
  const token = crypto.randomBytes(8).toString('hex');
  return token;
}

function writingNewCrush(pathArq, newData) {
  fs.writeFile(pathArq, newData);
}

module.exports = { getData, generateToken, writingNewCrush };
