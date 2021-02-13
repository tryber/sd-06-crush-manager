const fs = require('fs').promises;
const path = require('path').resolve;
const crypto = require('crypto');

const readFromFile = async () => {
  const data = await fs.readFile(`${path()}/crush.json`, 'utf-8');
  const allCrushes = JSON.parse(data);

  return allCrushes;
};

const writeToFile = async (data) => {
  await fs.writeFile('../crush.json', JSON.stringify(data, 0, 2), 'utf-8');
};

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePassword = (password) => password.length >= 6;

const createToken = () => crypto.randomBytes(8).toString('hex');

const validateDate = (date) =>
  /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/.test(date);

const validateRate = (rate) => /^([1-5])$/.test(rate);

module.exports = {
  readFromFile,
  writeToFile,
  validateEmail,
  validatePassword,
  validateDate,
  validateRate,
  createToken,
};
