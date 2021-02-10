const express = require('express');
const crypto = require('crypto');

const router = express.Router();

const verifyEmail = (email) => /\S+@\S+\.\S+/.test(email);
const verifyPassword = (pwd) => pwd && pwd.length >= 6;
const generateToken = () => crypto.randomBytes(8).toString('hex');

router.route('/')
  .post(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email) {
        res.statusCode = 400;
        return next('O campo "email" é obrigatório');
      }
      if (!verifyEmail(email)) {
        res.statusCode = 400;
        return next('O "email" deve ter o formato "email@email.com"');
      }
      if (!password) {
        res.statusCode = 400;
        return next('O campo "password" é obrigatório');
      }
      if (!verifyPassword(String(password))) {
        res.statusCode = 400;
        return next('A "senha" deve ter pelo menos 6 caracteres');
      }

      const token = generateToken();
      return res.json({ token });
    } catch (error) {
      res.statusCode = 500;
      return next(error);
    }
  });

module.exports = router;
