const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const verifyEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
};

const verifyPassword = (password) => {
  const passwordRegex = /^[a-zA-Z0-9]{6,}$/;
  return passwordRegex.test(password);
};

const readCrushFile = async () => {
  const content = await fs.readFile(path.resolve(__dirname, '.', 'crush.json'));
  return JSON.parse(content.toString('utf-8'));
};

const writeCrushFile = async (content) => (
  fs.writeFile(
    path.resolve(__dirname, '.', 'crush.json'),
    JSON.stringify(content),
    (err) => {
      if (err) throw err;
    },
  ));

module.exports = {
  async login(request, response) {
    const { email, password } = request.body;

    if (email === '' || !email) return response.status(400).json({ message: 'O campo "email" é obrigatório' });

    if (verifyEmail(email) === false) return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });

    if (password === '' || !password) return response.status(400).json({ message: 'O campo "password" é obrigatório' });

    if (verifyPassword(password) === false) return response.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });

    const token = crypto.randomBytes(8).toString('hex');
    return response.json({ token });
  },

  async add(request, response) {
    const { name, age, date } = request.body;

    const { datedAt, rate } = request.body.date;

    const { authorization } = request.headers;

    const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;

    if (!authorization) return response.status(401).json({ message: 'Token não encontrado' });

    if (authorization.length < 16) return response.status(401).json({ message: 'Token inválido' });

    if (!name) return response.status(400).json({ message: 'O campo "name" é obrigatório' });

    if (name.length < 3) return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });

    if (!age) return response.status(400).json({ message: 'O campo "age" é obrigatório' });

    if (age < 18) return response.status(400).json({ message: 'O crush deve ser maior de idade' });

    if (rate < 1 || rate > 5) return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });

    if (!date || !datedAt || !rate) return response.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });

    if (!dateRegex.test(datedAt)) return response.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });

    const oldCrushArray = await readCrushFile();

    const newCrushArray = [...oldCrushArray, { ...request.body, id: oldCrushArray.length + 1 }];

    await writeCrushFile(newCrushArray);

    return response.status(201).json({ ...request.body, id: oldCrushArray.length + 1 });
  },
};
