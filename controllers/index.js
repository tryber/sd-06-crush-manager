const fs = require('fs');

// Task 1
const getAllCrushes = require('./task1');

// Task 2
const getSpecificCrush = require('./task2');

// Task 3
const generateToken = require('./task3');

// Task 4
const checkToken = (token) => {
  let msg = 'ok';
  if (token === '') {
    msg = 'Token não encontrado';
  } else if (token.length !== 16) {
    msg = 'Token inválido';
  }
  return msg;
};

const checkName = (name) => {
  let msg = 'ok';
  if (name === '') {
    msg = 'O campo "name" é obrigatório';
  } else if (name.length < 3) {
    msg = 'O "name" deve ter pelo menos 3 caracteres';
  }
  return msg;
};

const checkAge = (age) => {
  let msg = 'ok';
  if (age === '') {
    msg = 'O campo "age" é obrigatório';
  } else if (parseInt(age, 10) < 18) {
    msg = 'O crush deve ser maior de idade';
  }
  return msg;
};

const checkDate = (date, rate) => {
  let msg = 'ok';
  const regEx = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

  if (!regEx.test(date)) {
    msg = 'O campo "datedAt" eve ter o formato "dd/mm/aaaa"';
  } else if (rate >= 1 && rate <= 5) {
    msg = 'O campo "rate" deve ser um inteiro de 1 à 5';
  } else if (date === '' || rate === '') {
    msg = 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';
  }
  return msg;
};

const postCrush = (req, res) => {
  const { token = '' } = req.headers;
  const { name = '', age = '', date: { datedAt = '', rate = '' } } = req.body;

  const msgToken = checkToken(token);
  if (msgToken !== 'ok') res.status(400).send(msgToken);

  const msgName = checkName(name);
  if (msgName !== 'ok') res.status(400).send(msgName);

  const msgAge = checkAge(age);
  if (msgAge !== 'ok') res.status(400).send(msgAge);

  const msgDate = checkDate(datedAt, rate);
  if (msgDate !== 'ok') res.status(400).send(msgDate);

  res.status(201).send(req.body);
};

module.exports = {
  getAllCrushes,
  getSpecificCrush,
  generateToken,
  postCrush,
};
