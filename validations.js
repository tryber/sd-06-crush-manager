const crypto = require('crypto');

const checkEmail = (email) => {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return regex.test(email);
};

const checkPasswordCont = (password) => {
  const passwordCont = password.toString().length >= 6;
  return passwordCont;
};

const createToken = () => {
  const token = crypto.randomBytes(8).toString('hex');
  return token;
};

const verifyToken = (token) => {
  const tokenRegex = /^(\d|\w){16}$/gm;
  return tokenRegex.test(token);
};

const checkCrushName = (name) => {
  if (!name || name === '') {
    return false;
  }
  return true;
};

const checkCrushNameLength = (name) => {
  if (name.length < 3) {
    return false;
  }
  return true;
};

const checkAgeCrush = (age) => {
  if (!age || age === '') {
    return false;
  }
  return true;
};

const checkAgeOlder = (age) => {
  if (age < 18) {
    return false;
  }
  return true;
};

const formatDate = (date) => {
  const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  return dateRegex.test(date.datedAt);
};

const checkRate = (date) => {
  if (!Number.isInteger(date.rate) || date.rate < 1 || date.rate > 5 || !date.rate || date.rate === '') {
    return false;
  }
  return true;
};

const checkDateRate = (date) => {
  if (!date || !date.datedAt || date.datedAt === '' || !date.rate || date.rate === '') {
    return false;
  }
  return true;
};

const getNextId = (data) => {
  const arrId = data.map((crush) => crush.id);
  const nextId = Math.max.apply(this, arrId) + 1;
  return nextId;
};

module.exports = {
  checkEmail,
  checkPasswordCont,
  createToken,
  verifyToken,
  checkCrushName,
  checkCrushNameLength,
  checkAgeCrush,
  checkAgeOlder,
  formatDate,
  checkRate,
  checkDateRate,
  getNextId,
};
