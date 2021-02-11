const validateEmail = require('./validateEmail');
const validatePassword = require('./validatePassword');
const checkRequestField = require('./checkRequestField');
const generateToken = require('./generateToken');
const validateToken = require('./validateToken');
const validateName = require('./validateName');
const validateAge = require('./validateAge');
const datingValidation = require('./datingValidation');
const validateDate = require('./validateDate');
const rateValidation = require('./rateValidation');

module.exports = {
  validateEmail,
  validatePassword,
  checkRequestField,
  generateToken,
  validateToken,
  validateName,
  validateAge,
  datingValidation,
  validateDate,
  rateValidation,
};
