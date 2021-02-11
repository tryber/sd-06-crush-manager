const fs = require('fs').promises;
const path = require('path').resolve;

const readCrushFile = async () => {
  const data = await fs.readFile(`${path()}/crush.json`, 'utf-8');
  const allCrushes = JSON.parse(data);
  return allCrushes;
};

const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

const isValidPassword = (password) => (password.toString().length >= 6);

module.exports = {
  readCrushFile,
  isValidEmail,
  isValidPassword,
};
