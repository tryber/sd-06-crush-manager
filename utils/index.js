const fs = require('fs').promises;
const path = require('path').resolve;

const readCrushFile = async () => {
  const data = await fs.readFile(`${path()}/crush.json`, 'utf-8');
  const allCrushes = JSON.parse(data);
  return allCrushes;
};

const writeCrushFile = async (newData) => {
  await fs.writeFile(`${path()}/crush.json`, newData, 'utf-8', (err) => console.log(err));
};

const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

const isValidPassword = (password) => (password.toString().length >= 6);

const isValidDate = (date) => /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/.test(date);

const isValidRate = (rate) => /^([1-5])$/.test(rate);

module.exports = {
  readCrushFile,
  isValidEmail,
  isValidPassword,
  isValidDate,
  isValidRate,
  writeCrushFile,
};
