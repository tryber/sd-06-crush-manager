const crypto = require('crypto');
const fs = require('fs').promises;

const crushData = 'crush.json';
const regex = require('./regex');

module.exports = {
  async login(request, response) {
    const { email, password } = request.body;

    if (email === '' || !email) return response.status(400).json({ message: 'O campo "email" é obrigatório' });

    if (regex.verifyEmail(email) === false) return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });

    if (password === '' || !password) return response.status(400).json({ message: 'O campo "password" é obrigatório' });

    if (regex.verifyPassword(password) === false) return response.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });

    const token = crypto.randomBytes(8).toString('hex');
    return response.json({ token });
  },

  async addCrush(request, response) {
    const file = await fs.readFile(crushData, 'utf-8');

    const fileJson = JSON.parse(file);

    const lastID = fileJson[fileJson.length - 1].id;
    
    const newCrush = { ...request.body, id: lastID + 1 };

    const { name, age, date } = newCrush;

    const { authorization } = request.headers;
  
    if (!authorization) return response.status(401).json({ message: 'Token não encontrado' });

    if (authorization.length < 16) return response.status(401).json({ message: 'Token inválido' });

    if (!name || name === '') return response.status(400).json({ message: 'O campo "name" é obrigatório' });

    if (name.length < 3) return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });

    if (!age || age === '') return response.status(400).json({ message: 'O campo "age" é obrigatório' });

    if (age < 18) return response.status(400).json({ message: 'O crush deve ser maior de idade' });

    if (date === undefined || !date || date.datedAt === '' || date.datedAt === undefined || date.rate === '' || date.rate === undefined) return response.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });

    if (regex.verifyDate(date.datedAt) === false) return response.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });

    if (date.rate < 1 || date.rate > 5) return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });

    fileJson.push(newCrush);

    await fs.writeFile(crushData, JSON.stringify(fileJson));

    return response.status(201).json(newCrush);
  },

};
