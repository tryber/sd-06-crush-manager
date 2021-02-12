const apis = require('../services/generateData');

const userLogin = async (req, res) => {
  const tokenGenerate = await apis.generateToken();
  const bodyData = req.body;
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
  if (!bodyData.email || bodyData.email === '') return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (!regexEmail.test(bodyData.email)) return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  if (!bodyData.password || bodyData.password === '') return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  if (String(bodyData.password).length < 6) return res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  return res.send({ token: tokenGenerate });
};

module.exports = { userLogin };
