const fs = require('fs').promises;
const path = require('path').resolve;
const crypto = require('crypto');

const readFromFile = async () => {
  const data = await fs.readFile(`${path()}/crush.json`, 'utf-8');
  const allCrushes = JSON.parse(data);

  return allCrushes;
};

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePassword = (password) => password.length >= 6;

const createToken = () => crypto.randomBytes(8).toString('hex');

module.exports = {
  readFromFile,
  validateEmail,
  validatePassword,
  createToken,
};
