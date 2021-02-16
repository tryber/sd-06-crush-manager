const fs = require('fs');

const crushData = 'crush.json';

const readCrush = () => {
  const file = JSON.parse(fs.readFileSync(crushData, 'utf8'));
  return file;
};

const formatEmail = (email) => {
  const expectedFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
  return expectedFormat.test(email);
};

module.exports = {
  readCrush,
  formatEmail,
};
